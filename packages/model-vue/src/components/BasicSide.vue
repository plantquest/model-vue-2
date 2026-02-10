<template>
  <v-navigation-drawer 
    v-model="open"
    app 
    :location="location"
    class="vxg-side" 
    :width="280"
    permanent 
    :touchless="true" 
    :temporary="false"
  >
    <v-sheet class="d-flex flex-column h-100">
      <!-- Header -->
      <div class="d-flex justify-space-between" style="background: var(--vxg-header-bg, #1976d2); padding: 12px;">
        <div v-html="logo"></div>
      </div>

      <!-- Menu Toggle and Clear Button -->
      <v-btn 
        v-if="show('clear') && tool.clear.active" 
        text
        style="max-width:200px;display:inline-block;margin-left:48%;text-transform: none;font-size:12px; color: var(--vxg-text-color, #333);top:10px"
        class="btn-clear" 
        @click="clearFilter"
      >
        {{ showSearch2 ? 'Close Navigation Mode' : 'Clear Search' }}
      </v-btn>

      <!-- Search and Navigation for pqview and side routes -->
      <div v-if="currentRoute === 'pqview' || currentRoute === 'side'" style="position: relative; padding: 0;">
        <!-- Layer 5 Icon (Search Mode only) -->
        <div v-show="!showSearch2" style="position: absolute; top: 8px; left: 16px; z-index: 10; pointer-events: auto;">
          <img 
            :src="`${publicPath}Layer_5.svg`" 
            alt="Layer_5" 
            class="Layer_5"
            style="cursor: pointer; width: 24px; height: 24px;"
            @click="toggleSearch2(); toggleExpansion(); handleRoute()" 
          />
        </div>

        <!-- Navigation Icon (Navigation Mode only) -->
        <div 
          v-if="showSearch2" 
          style="position: absolute; top: 8px; left: 16px; z-index: 5; pointer-events: none;"
        >
          <img 
            :src="`${publicPath}navigation_1.svg`" 
            alt="navigation_1" 
            class="navigation_1"
            style="height: 60px; display: block;" 
          />
        </div>

        <!-- Primary Search Combobox (Start Location) -->
        <div :style="{
          position: 'relative',
          zIndex: 1,
          marginBottom: 0,
          marginLeft: showSearch2 ? '48px' : '0'
        }">
          <v-combobox 
            ref="searchRef" 
            class="comboxSearch d-flex justify-space-between" 
            v-model="search"
            @keydown="changeSearch($event)" 
            @click:clear="changeSearch($event)" 
            @change="handleChangeSearch($event)"
            :items="tagItems" 
            flat 
            hide-details 
            outlined 
            dense 
            clearable 
            :placeholder="showSearch2 ? 'Start location...' : 'Search...'" 
            @click:append="filter"
            :filter="customFilter" 
            :prepend-inner-icon="prependIcon" 
            @click="handleClick" 
            @blur="handleBlur"
          />
        </div>

        <!-- Filter Icon (Search Mode only) -->
        <img 
          :src="`${publicPath}Clip_path_group.svg`" 
          alt="Clip_Path_group" 
          style="cursor: pointer; position: relative; top: -33px; left: calc(100% - 33px); border-left: solid 1px; padding-left: 2px; z-index: 10;" 
          class="clip-path-group" 
          v-if="filterIcon && !showSearch2" 
          @click.stop.prevent="filter" 
        />

        <!-- Horizontal Divider Line (Navigation Mode only) -->
        <div v-if="showSearch2" style="position: relative; height: 1px; background-color: #4CAF50; margin: -6px 48px 6px 48px; z-index: 4;"></div>

        <!-- Secondary Search Combobox (Destination - Navigation Mode) -->
        <div v-if="showSearch2" style="position: relative; z-index: 1; margin-top: 0; margin-left: 48px;">
          <v-combobox 
            class="comboxSearch2" 
            ref="search2Ref" 
            v-model="search2"
            @keydown="changeSearch2($event)" 
            @click:clear="changeSearch2($event)" 
            :items="tagItems2" 
            flat 
            hide-details
            outlined 
            dense 
            clearable 
            placeholder="Destination..."
            :filter="customFilter"
          />
        </div>

        <!-- Reverse Inputs Button (Swap start/destination) -->
        <div v-if="showSearch2">
          <v-icon
            size="18"
            color="black"
            style="cursor: pointer; position: relative; top: -49px; left: calc(100% - 29px); margin-left: -18px; background: white; z-index: 999; border-radius: 2px;"
            @click="reverseInputs"
          >
            mdi-swap-vertical
          </v-icon>
        </div>

        <!-- Path Data Display -->
        <div 
          v-if="showSearch2 && search2 && pathData && Object.keys(pathData).length > 0" 
          style="color: #000;background-color:rgb(220 238 239); height: 33px; width: calc(100% - 8px); left: 4px; padding-top: 3px; padding-left: 13px; position: absolute; z-index: 9999; top: 185px;"
        >
          <v-icon style="margin: -7px 0;color: black;" aria-hidden="true" aria-label="Route to Asset">
            mdi-clock-time-four-outline
          </v-icon>
          <span v-if="aprxTime >= 60">
            {{ Math.trunc(aprxTime / 60) }}:{{ (aprxTime % 60).toString().padStart(2, '0') }} minutes ({{ aprxDistance.toFixed(0) }} meters)
          </span>
          <span v-else>
            {{ aprxTime }} seconds ({{ aprxDistance.toFixed(0) }} meters)
          </span>
        </div>

        <!-- Navigation Stages -->
        <BasicNavStages v-if="showSearch2" :spec="spec" />
      </div>

      <!-- Menu Items -->
      <div class="Menu Items" style="margin-top:15px;height: calc(100vh - 332px);">
        <template v-if="menuView.mode === 'standard'">
          <div class="router_items">
            <template v-for="item in menu" :key="item.code">
              <router-link 
                v-if="item && allow(item) && item.code !== 'admin' && item.title !== 'Devices' && item.code !== 'devices'"
                :to="`/${item.code}`" 
                :class="['vxg-router-link', item.klass]"
              >
                <v-icon v-once>mdi-{{ item.icon }}</v-icon> {{ item.title }}
              </router-link>
            </template>
          </div>
        </template>

        <component 
          v-else-if="menuView.mode === 'custom'" 
          :is="menuView.cmp" 
          :spec="menuView.view.spec" 
        />
      </div>

      <v-spacer></v-spacer>
      <v-divider style="margin-top: 65px;"></v-divider>

      <!-- Footer -->
      <component 
        v-if="spec.footer.active" 
        :is="spec.footer.cmp" 
        :spec="spec.footer.spec" 
      />
    </v-sheet>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { useSide, useSideSearch } from '@/composables/useSide'
import Nua from 'nua'
import { Gubu, Open, Required, Skip, Value } from 'gubu'
import BasicNavStages from './BasicNavStages.vue'

// Props
interface Props {
  spec: {
    footer?: {
      active?: boolean
      cmp?: any
      spec?: any
    }
    view?: any
  }
  logo?: string
  location?: 'left' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  logo: '',
  location: 'left'
})

// Emits
const emit = defineEmits<{
  action: [name: string]
}>()

// Composables
const store = useStore()
const router = useRouter()
const route = useRoute()
const { close: closeSide } = useSide()
const { 
  search, 
  search2, 
  showSearch2, 
  tagItems, 
  tagItems2, 
  items, 
  items2,
  toggleSearch2,
  toggleExpansion,
  clearFilter: clearFilterComposable,
  reverseInputs: reverseInputsComposable,
  loadAssets 
} = useSideSearch()

// Template refs
const searchRef = ref()
const search2Ref = ref()

// Local state
const open = ref(true)
const menuShowTitle = ref(false)
const menuViewList = ref<any[]>([])
const menuViewIndex = ref<number | null>(null)
const menuView = ref<any>({ mode: 'standard', menu: { items: {}, order: '' } })
const roomName = ref('')
// Define publicPath without process.env (not available in browser)
const publicPath = '/'  // Base path for assets
const showIcon = ref(true)

// Computed properties
const currentRoute = computed(() => route.name as string)

const showSearch2State = computed(() => store.state.showSearch2 || false)

const showExpansion = computed(() => store.state.showExpansion !== false)

const pathData = computed(() => store.state.pathData || null)

const currentStage = computed(() => store.state.currentStage || 0)

const triggerSelect = computed(() => store.state.trigger?.select || {})

const filterDisabled = computed(() => store.state.trigger?.filter_disabled?.value || false)

const prependIcon = computed(() => {
  return !(showSearch2State.value) && showIcon.value ? 'mdi-magnify magnifierIcon' : ''
})

const menu = computed(() => {
  if (menuView.value.mode !== 'standard') return []

  const { items = {}, order = '' } = menuView.value.menu || {}
  
  // Return empty array if no order defined
  if (!order) return []
  
  // Split order and filter out undefined items
  return order
    .split(/\s*,\s*/)
    .filter((code: string) => code && items[code]) // Only include valid items
    .map((code: string) => ({
      ...items[code],
      code,
      klass: { 'vxg-router-link': true }
    }))
})

const filterIcon = computed(() => store.state.vxg?.cmp?.BasicHead?.show?.filter || false)

const drawerStyle = computed(() => DRAWER_STYLE)

const custom = computed(() => (window as any).$model?.main?.ux?.custom || {})

const view = computed(() => custom.value.special?.view || {})

const portal = computed(() => custom.value.special?.portal || {})

const tool = computed(() => {
  const headtool = (window as any).$model?.main?.app?.web?.parts?.head?.tool || {}
  const viewtool = view.value.tool || {}
  // Provide demo defaults for required tools
  return { 
    clear: { active: true },
    select: { active: false },
    ...headtool, 
    ...viewtool 
  }
})

const searchConfig = computed(() => custom.value.search_config || {})

const aprxTime = computed(() => store.state.pathEstimation?.time || 0)

const aprxDistance = computed(() => store.state.pathEstimation?.distance || 0)

// Methods
const tag_alias = (asset: any): string | null => {
  if (!asset || typeof asset !== 'object') return null
  if (!asset.tag) return null
  if (asset.custom12 != null) {
    return asset.tag + '(' + asset.custom12 + ')'
  }
  return asset.tag
}

const removeAlias = (term: any): string => {
  if (!term && term !== 0) return ''
  const termStr = String(term)
  return termStr.replace(/\(.*?\)/g, "").trim()
}

const customFilter = (item: any, queryText: string, itemText: string) => {
  return 1 // bypass default combobox filter
}

const handleClick = () => {
  showIcon.value = false
}

const handleBlur = () => {
  showIcon.value = true
}

// Helper: Handle router navigation errors
const handleRouterError = (err: any) => {
  if (err.name !== 'NavigationDuplicated') {
    console.error('Router navigation error:', err)
  }
}

// Helper: Execute search API call and update results
const executeSearch = async (term: string | null, targetItems: any, sourceItems: any) => {
  if (term) {
    const seneca = (window as any).$seneca
    if (seneca) {
      const out = await seneca.post('sys:search, cmd:search',
        { query: term, params: searchConfig.value }
      )
      targetItems.value = out.data.hits
        .filter((v: any) => v && v.doc)
        .map((v: any) => tag_alias(v.doc))
        .filter((item: any) => item !== null)
    }
  } else {
    // Reset to full list when search is empty
    if (sourceItems.value != undefined) {
      targetItems.value = sourceItems.value
        .filter((v: any) => v && v.tag)
        .map(tag_alias)
        .filter((item: any) => item !== null)
    }
  }
}

const handleChangeSearch = (event: any) => {
  if (!showSearch2State.value) {
    router.push({
      path: route.path,
      query: {
        mode: 'assetsearch',
        term: event,
      }
    }).catch(handleRouterError)
  } else {
    router.replace({
      path: route.path,
      query: {
        mode: 'route',
        a: search.value,
        b: search2.value
      }
    }).catch(handleRouterError)
  }
}

const changeSearch = async (event: any) => {
  // Handle Enter key for asset search
  if (event.key === 'Enter' && route.query.mode === 'assetsearch') {
    const term = event.target?.value?.trim()
    if (term) {
      performAssetSearch(term)
      return
    }
  }

  setTimeout(async () => {
    const term = event.target ? event.target.value : null
    
    // Update URL based on current mode
    if (showSearch2State.value) {
      // Navigation mode: preserve both A and B fields
      router.replace({
        path: route.path,
        query: {
          mode: 'route',
          a: term,
          b: search2.value
        }
      }).catch(handleRouterError)
    } else {
      // Search mode: update term only
      router.push({
        path: route.path,
        query: {
          mode: 'assetsearch',
          term: term,
        }
      }).catch(handleRouterError)
    }
    
    // Execute search and update results
    await executeSearch(term, tagItems, items)
  }, 11)
}

const changeSearch2 = async (event: any) => {
  setTimeout(async () => {
    const term = event.target ? event.target.value : null
    
    // Update URL for navigation mode (FIX: was missing)
    if (showSearch2State.value) {
      router.replace({
        path: route.path,
        query: {
          mode: 'route',
          a: search.value,
          b: term
        }
      }).catch(handleRouterError)
    }
    
    // Execute search and update results
    await executeSearch(term, tagItems2, items2)
  }, 11)
}

const handleRoute = () => {
  const prevQuery = route.query
  let aValue = search.value || ''
  let bValue = search2.value || ''
  
  if (prevQuery.mode === 'assetsearch' && prevQuery.term && !bValue) {
    bValue = prevQuery.term as string
    search2.value = bValue
  }
  
  if (!showSearch2State.value) {
    toggleSearch2()
  }
  
  store.dispatch('toggleSideInfoCardVisibility', false)
  
  router.replace({
    path: route.path,
    query: {
      mode: 'route',
      a: aValue,
      b: bValue
    }
  }).catch(err => {
    if (err.name !== 'NavigationDuplicated') {
      console.error('Router navigation error:', err)
    }
  })
}

const clearFilter = () => {
  clearFilterComposable()
  nextTick(() => {
    store.dispatch('set_cmp_flags', { name: 'BasicMain', flags: { show: false } })
    search.value = ''
    search2.value = ''
  })
  router.replace({
    path: route.path,
    query: {}
  }).catch(err => {
    if (err.name !== 'NavigationDuplicated') {
      console.error('Router navigation error:', err)
    }
  })
}

const reverseInputs = () => {
  reverseInputsComposable()
  store.commit('setCurrentStage', 1)
  store.dispatch('setCurrentStage', 1)
  
  router.replace({
    path: route.path,
    query: {
      mode: 'route',
      a: search.value,
      b: search2.value
    }
  }).catch(err => {
    if (err.name !== 'NavigationDuplicated') {
      console.error('Router navigation error:', err)
    }
  })
}

const show = (action: string): boolean => {
  return allow(action) && store.state.vxg?.cmp?.BasicHead?.show?.[action]
}

const filter = (event: any) => {
  if (route.query.mode === 'route') {
    console.log('Filter ignored - currently in navigation mode')
    return
  }
  
  if (route.query.mode !== 'filtersearch') {
    router.replace({
      path: route.path,
      query: {
        mode: 'filtersearch',
        area: '',
        level: '',
        systemtype: '',
        assettype: '',
      }
    }).catch(err => {
      if (err.name !== 'NavigationDuplicated') {
        console.error('Router navigation error:', err)
      }
    })
  }
  store.dispatch('trigger_toggle_filter')
}

const defaultFound = (): boolean => {
  return menuView.value && menuView.value.menu && menuView.value.menu.default
}

const findRouteName = (name: string) => {
  const specialRoutes = custom.value.special || {}
  for (let routeKey in specialRoutes) {
    const currentRoute = specialRoutes[routeKey]
    if (currentRoute.name === name) {
      return currentRoute
    }
    if (currentRoute.sub && currentRoute.sub.includes(name)) {
      return currentRoute
    }
  }
  return { index: 1 }
}

const allow = (item: any): boolean => {
  const vxg = (window as any).$vxg
  const out = (item && item.allow && vxg) ? vxg.allow(item.allow) : true
  return out
}

const action = (name: string) => {
  emit('action', name)
}

const performAssetSearch = async (term: string) => {
  try {
    console.log('Performing asset search for term:', term)
    
    if (term && term.trim()) {
      const searchTerm = term.trim()
      const seneca = (window as any).$seneca
      if (seneca) {
        const out = await seneca.post('sys:search, cmd:search',
          { query: searchTerm, params: searchConfig.value }
        )
        
        tagItems.value = out.data.hits
          .filter((v: any) => v && v.doc)
          .map((v: any) => tag_alias(v.doc))
          .filter((item: any) => item !== null)
          
        console.log('Asset search results:', tagItems.value)
        
        store.dispatch('trigger_asset_search', {
          term: searchTerm,
          results: out.data.hits,
          mode: 'assetsearch'
        })
      }
    } else {
      if (items.value != undefined) {
        tagItems.value = items.value
          .filter((v: any) => v && v.tag)
          .map(tag_alias)
          .filter((item: any) => item !== null)
      }
    }
  } catch (error) {
    console.error('Error performing asset search:', error)
  }
}

// Watchers
watch(() => showSearch2State.value, (newVal) => {
  if (newVal) {
    store.state.showExpansion = false
  }
})

watch(() => menuViewIndex.value, (index) => {
  // Handle menu view changes
})

watch(() => store.state.trigger?.search?.a, (term) => {
  search.value = term
  if (typeof term === 'object') {
    term = (term as any).tag
  }
  if (term == '' && searchRef.value) {
    searchRef.value.reset()
    tagItems.value = items.value
      .filter((v: any) => v && v.tag)
      .map(tag_alias)
      .filter((item: any) => item !== null)
  }
})

watch(() => store.state.trigger?.search?.b, (term) => {
  if (typeof term === 'object') {
    term = (term as any).tag
  }
  const termStr = String(term)
  term = termStr.replace(/\(.*?\)/g, "").trim()
  
  search2.value = term
  if (term == '' && search2Ref.value) {
    search2Ref.value.reset()
    tagItems2.value = items2.value
      .filter((v: any) => v && v.tag)
      .map(tag_alias)
      .filter((item: any) => item !== null)
  }
})

watch(search, (val) => {
  let term = val || ''
  term = term.trim()
  store.dispatch('trigger_search', { a: term })
})

watch(search2, (val) => {
  let term = val || ''
  store.dispatch('trigger_search', { b: term })
})

watch(() => route.name, (val) => {
  if (!val && defaultFound()) {
    router.push(menuView.value.menu.default)
  }
  const routeInfo = findRouteName(val as string)
  menuView.value = menuViewList.value[routeInfo.index] || menuView.value
}, { immediate: true })

watch(() => route.query, (query) => {
  if (query.mode == 'route') {
    // Only update values if they exist in the query (preserve existing values)
    if (query.a !== undefined) {
      search.value = (query.a as string) || ''
      store.state.trigger.search.a = search.value
    }
    if (query.b !== undefined) {
      search2.value = (query.b as string) || ''
      store.state.trigger.search.b = search2.value
    }
  }
}, { immediate: true })

// Lifecycle
onMounted(() => {
  if (showSearch2State.value) {
    store.state.showExpansion = false
  }

  // Initialize menu views
  const specView = props.spec.view || {}
  for (let name in specView) {
    let mv = specView[name]
    mv.name = name
    menuViewList.value.push(mv)
  }
  console.log('menuViewList:', menuViewList.value)
  
  const routeInfo = findRouteName(route.name as string)
  menuView.value = menuViewList.value[routeInfo.index] || menuView.value
  menuViewIndex.value = routeInfo.index

  // Load assets
  const intervalId = setInterval(async () => {
    const assets = await loadAssets()
    
    if (route.path.includes('/user')) {
      try {
        if (store.state.main_user && store.state.main_user.length > 0) {
          items2.value = store.state.main_user
        } else {
          items2.value = [...assets]
        }
      } catch (error) {
        items2.value = [...assets]
      }
    } else {
      items2.value = [...assets]
    }
    
    if (assets.length != 0) {
      tagItems.value = assets
        .filter((v: any) => v && v.tag)
        .map(tagAlias)
        .filter((item: any) => item !== null)
      
      if (items2.value.length > 0 && items2.value[0].email) {
        tagItems2.value = items2.value
          .filter((v: any) => v && (v.email || v.name))
          .map((user: any) => user.email || user.name)
          .filter((item: any) => item !== null)
      } else {
        tagItems2.value = items2.value
          .filter((v: any) => v && v.tag)
          .map(tagAlias)
          .filter((item: any) => item !== null)
      }
      
      clearInterval(intervalId)
      console.log('✅ Assets loaded and formatted:', tagItems.value.slice(0, 5))
    }
  }, 111)

  // Handle filter mode
  const mode = route.query.mode
  if (mode === 'filtersearch') {
    // store.dispatch('trigger_toggle_filter')
  }
})

onUnmounted(() => {
  // Cleanup if needed
})

// Constants
const DRAWER_STYLE = Object.freeze({ 
  width: "282px", 
  visibility: "visible !important", 
  transform: "none !important" 
})
</script>

<style lang="scss">
.v-navigation-drawer {
  position: fixed !important;
  background: var(--vxg-side-bg, #f5f5f5);
}

.v-navigation-drawer__content {
  overflow-y: hidden;
}

nav.vxg-side {
  background-color: var(--vxg-side-bg, #f5f5f5) !important;

  .v-sheet {
    background-color: var(--vxg-side-bg, #f5f5f5) !important;
  }

  .v-divider {
    border-color: rgb(var(--vxg-ct2)) !important;
    margin: 16px 8px;
    height: 22px;
    position: absolute;
    z-index: 99999;
    left: -11px;
    width: 100%;
    bottom: 52px;
  }
}

.btn-style {
  background-color: rgb(40, 51, 72) !important;
  width: 141px;
  height: 281px;
  margin: 4px !important;

  &.selected-btn {
    background-color: rgb(var(--vxg-cb1)) !important;
    color: rgb(var(--vxg-ct1)) !important;

    .v-icon {
      color: rgb(var(--vxg-ct1)) !important;
    }
  }
}

.vxg-toggle {
  background-color: rgb(var(--vxg-cb1)) !important;
  padding: 10px !important;
  padding-bottom: 10px;
  padding-top: 10px;
  margin-right: 10px;
}

a.vxg-router-link {
  display: block;
  margin: 0px 8px;
  padding: 16px 8px;
  text-decoration: none !important;
  color: var(--vxg-link-color, #1976d2) !important;
  border-radius: 8px;

  .v-icon {
    color: var(--vxg-link-icon-color, #666) !important;
  }

  &.router-link-active {
    background-color: var(--vxg-link-active-bg, #e3f2fd) !important;
    color: var(--vxg-link-active-color, #1565c0) !important;

    .v-icon {
      color: var(--vxg-link-active-color, #1565c0) !important;
    }
  }
}

.vxg-side-open {
  width: 48px;
  height: 48px;
}

.drawer-toggle {
  width: 48px;
}

.magnifierIcon {
  margin: 3px 0 0 40px;
  font-size: large;
  color: var(--vxg-icon-color, #666);
}

img {
  &.clip-path-group {
    width: 20px;
  }

  &.Layer_5 {
    width: 20px;
  }

  &.catppuccin-search {
    width: 20px;
  }
}

.font-size-13 {
  font-size: 13px;
}

.searchIcons hr {
  margin: 0 5px !important;
}

.searchIcons svg {
  width: 20px;
  height: 20px;
}

.v-input__control {
  background: white;
  margin-top: auto;
  margin-left: 4px;
  margin-right: 4px;
}

.comboxSearch .v-select__slot {
  margin-left: 25px;
  margin-bottom: 4px;
}

.comboxSearch .v-input__slot {
  width: calc(100% - 30px);
}

.comboxSearch fieldset {
  border: none !important;
}

.catppuccin-search {
  width: 24px;
  height: 24px;
}

.comboxSearch .v-input__icon {
  position: absolute;
  margin-left: 187px;
}

.v-text-field {
  padding: 0 34px;
}

.comboxSearch2 .v-input__control {
  margin-top: -6px;
  border-radius: 0 !important;
}

.comboxSearch2 fieldset {
  color: transparent !important;
}

.comboxSearch2 .v-input__append-inner {
  visibility: hidden;
}

.comboxSearch2 .v-select__slot {
  margin-left: 25px;
  margin-bottom: 4px;
  border-radius: 0 !important;
}
</style>
