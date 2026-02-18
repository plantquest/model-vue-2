<template>
  <v-navigation-drawer app class="vxg-side" :style="drawerStyle" permanent :touchless="true" :clipped="false"
    :mini-variant="false" :temporary="false">

    <v-sheet class="d-flex flex-column h-100">
      <!-- Header -->
      <div class="d-flex justify-space-between " style="background:#27324A">
        <div v-html="logo"></div>

        <!-- 
        <v-icon v-once large @click="openDrawer" class="drawer-toggle"  style="color: white ;font-size: 29px;">
          mdi-chevron-left-circle-outline
        </v-icon>  -->
        <!-- <v-icon v-once large @click="closeDrawer" class="drawer-toggle" dark>
          mdi-chevron-left
          </v-icon> -->


      </div>

      <!-- Menu Toggle -->
      <!-- <v-btn-toggle v-model="menuViewIndex" mandatory class="vxg-toggle">
        <v-btn
          v-for="menuView in menuViewList"
          :key="menuView.name"
          @click="moveRoute(menuView)"
          outlined
          :ref="menuView.name"
          class="pa-4 text-center secondary text-no-wrap rounded-sm btn-style text-capitalize"
          :class="{ 'selected-btn': menuViewIndex === menuViewList.indexOf(menuView) }"
          color="white"
        >
          <div>
            
            <v-icon v-once color="white">
              {{ menuView.name === custom.special.view.name ? 'mdi-fit-to-screen-outline' : 'mdi-dots-square' }}
            </v-icon>
            <span class="d-block font-size-13 pt-2">{{ menuView.btnTitle }}</span>
          </div>
        </v-btn>
      </v-btn-toggle> -->

      <v-btn v-if="show('clear') && tool.clear.active" text
        style="max-width:200px;display:inline-block;margin-left:48%;text-transform: none;font-size:12px; color: #fff;top:10px"
        class="btn-clear" @click="clearFilter();">{{ showSearch2 ? 'Close Navigation Mode' : 'Clear Search' }}</v-btn>


      <div v-if="$route.name == 'pqview'">
        <div v-show="!showSearch2">
          <img :src="`${publicPath}Layer_5.svg`" alt="Layer_5" class="Layer_5"
            style="position:absolute; z-index:1; margin:10px 0; margin-left:16px"
            @click="toggleSearch2(); toggleExpansion(); handleRoute()" />


        </div>


        <div v-if="showSearch2" style="display: flex;
          align-items: center;
          position: absolute;
          z-index: 10;
          margin-top: 36px;">
          <img :src="`${publicPath}navigation_1.svg`" alt="navigation_1" class="navigation_1"
            style="position:absolute; z-index:1; margin:10px 0; margin-left:16px;height: 60px;padding-top: 4px;" />
          <div style="width: 253px;padding-left: 35px;">
            <hr aria-orientation="horizontal" style=" margin: 0 5px !important;" />
          </div>

        </div>




        <v-combobox ref="search" class="comboxSearch d-flex justify-space-between" v-model="search"
          @keydown="changeSearch($event)" @click:clear="changeSearch($event)" @change="handleChangeSearch($event)"
          :items="tag_items" flat hide-details outlined dense clearable placeholder="" @click:append="filter"
          :filter="customFilter" :prepend-inner-icon="prependIcon" @click="handleClick" @blur="handleBlur">

          <!-- <template v-slot:append>
         
          
          <div class="searchIcons d-flex justify-space-between ">
            
            
            
            <v-divider vertical></v-divider>
            
          </div>
        </template> -->

        </v-combobox>
        <img :src="`${publicPath}Clip_path_group.svg`" alt="Clip_Path_group" style="cursor: pointer;
    cursor: pointer; position: relative; top: -33px; left: calc(100% - 33px); border-left: solid 1px;
    padding-left: 2px;" class="clip-path-group" v-if="filterIcon && !showSearch2" @click.stop.prevent="filter" />



        <v-combobox class="comboxSearch2" ref="search2" v-show="showSearch2" v-model="search2"
          @keydown="changeSearch2($event)" @click:clear="changeSearch2($event)" :items="tag_items2" flat hide-details
          outlined dense clearable :filter="customFilter">

        </v-combobox>
        <div v-if="showSearch2">

          <img :src="`${publicPath}two-opposite-up-and-down-arrows-side-by-side.svg`"
            alt="two-opposite-arrows-side-by-side"
            style="cursor: pointer;position: relative;top: -49px; left: calc(100% - 29px); width:18px;margin-left: -18px; background: white; z-index: 999;"
            @click="reverseInputs" />

          <button @click="handleButtonClick" style="">
            <v-icon
              style="font-size: 12px !important;bottom: 78px;right: calc(100% - 250px);background-color: #dbe9f5;border-radius: 6px;color: #283348;"></v-icon>
          </button>
        </div>


        <!-- <button
          v-if="showSearch2"
          style="cursor: pointer;position: relative;color: white;top:-24px; size:9px; font-size: 10px; left: 65%;"
    
      >Add Destination +</button> -->
        <!-- <div v-if="showSearch2 === true" style="color: #fff;" >
        <v-icon style="margin: -7px 0;color: white;" aria-hidden="true" aria-label="Route to Asset">
          mdi-clock-time-four
        </v-icon>
        {{ Math.floor(aprxTime / 60) }}:{{ (aprxTime % 60).toString().padStart(2, '0') }} minutes ({{ aprxDistance.toFixed(2) }} meters)

      </div> -->


        <div v-if="showSearch2 && search2 && pathData && Object.keys(pathData).length > 0" style="color: #000;background-color:rgb(220 238 239);
        height: 33px;
        width: calc(100% - 8px);
        left: 4px;
        padding-top: 3px;
        padding-left: 13px;
        position: absolute;
        z-index: 9999;
        top: 185px;">
          <v-icon style="margin: -7px 0;color: black;" aria-hidden="true" aria-label="Route to Asset">
            mdi-clock-time-four-outline
          </v-icon>
          {{ Math.trunc(aprxTime / 60) }}:{{ (aprxTime % 60).toString().padStart(2, '0') }} minutes ({{
            aprxDistance.toFixed(0) }}
          meters)

        </div>


        <div v-if="showSearch2 && search2 && pathData && Object.keys(pathData).length > 0" style="color: #000;background-color:rgb(220 238 239);
        height: 33px;
        width: calc(100% - 8px);
        left: 4px;
        padding-top: 3px;
        padding-left: 13px;
        position: absolute;
        z-index: 9999;
        top: 185px;">
          <v-icon style="margin: -7px 0;color: black;" aria-hidden="true" aria-label="Route to Asset">
            mdi-clock-time-four-outline
          </v-icon>
          <span v-if="aprxTime >= 60">
            {{ Math.trunc(aprxTime / 60) }}:{{ (aprxTime % 60).toString().padStart(2, '0') }} minutes ({{
              aprxDistance.toFixed(0) }} meters)
          </span>
          <span v-else>
            {{ aprxTime }} seconds ({{ aprxDistance.toFixed(0) }} meters)
          </span>
        </div>

        <BasicNavStages v-if="showSearch2 === true" :spec="spec" />




      </div>

      <!-- <v-combobox
            
          
          @click:append="filter"
          :filter="customFilter"
          >
        </v-combobox>  -->
      <!-- Menu Items -->
      <div class="Menu Items" style="margin-top:15px;height: calc(100vh - 332px);">
        <template v-if="menuView.mode === 'standard'">
          <div class="router_items">
            <router-link v-for="item in menu"
              v-if="allow(item) && item.code !== 'admin' && item.title !== 'Devices' && item.code !== 'devices'"
              :key="item.code" :to="`/${item.code}`" :class="['vxg-router-link', item.klass]">
              <v-icon v-once>mdi-{{ item.icon }}</v-icon> {{ item.title }}
            </router-link>
          </div>

        </template>

        <component v-else-if="menuView.mode === 'custom'" :is="menuView.cmp" :spec="menuView.view.spec" />
      </div>
      <div>

      </div>

      <v-spacer></v-spacer>
      <v-divider style="margin-top: 65px;"></v-divider>


      <!-- Footer -->
      <component v-if="spec.footer.active" :is="spec.footer.cmp" :spec="spec.footer.spec" />
    </v-sheet>

  </v-navigation-drawer>
</template>

<script>

import Nua from 'nua'
import { mapState, mapMutations, mapActions } from 'vuex';
import BasicNavStages from './BasicNavStages.vue';
import { Gubu, Open, Required, Skip, Value } from 'gubu'


const SpecShape = Gubu({
  spec: Required(Open({
    footer: {
      active: false,
      cmp: Skip(String),
      spec: Open({}),
    },

    view: Value(Open({
      mode: String
    }), Open({}))
  })),
  logo: String,
})

function tag_alias(asset) {
  // Handle null/undefined asset
  if (!asset || typeof asset !== 'object') {
    return null
  }

  // Handle missing tag property
  if (!asset.tag) {
    return null
  }

  if (null != asset.custom12) {
    return asset.tag + '(' + asset.custom12 + ')'
  }
  return asset.tag
}

export default {

  components: {
    BasicNavStages
  },

  props: {
    spec: {
      type: Object,
      required: true,
    },
    logo: String,
  },

  data() {
    return {
      //  showSearch2: true,
      open: true,
      menuShowTitle: false,
      menuViewList: [],
      menuViewIndex: null,
      menuView: null,
      roomName: '',
      search: '',
      //aprxTime: 0,
      // aprxDistance: 0,

      tag_items: [],
      search2: '',
      tag_items2: [],
      publicPath: process.env.BASE_URL || '/',
      showIcon: true, // Data property to control icon visibility
      //  showSearch2: false, // Control the visibility of search2 combobox and Layer_5 icon
    }
  },

  beforeCreate() {
    Nua(this.$options.propsData, SpecShape(this.$options.propsData))
  },

  created() {
    // Set showExpansion to false when the component is created
    if (this.showSearch2) {
      this.$store.state.showExpansion = false;
    }

    let menuViewList = []
    for (let name in this.spec.view) {
      let menuView = this.spec.view[name]
      menuView.name = name
      menuViewList.push(menuView)
    }
    console.log('menuViewList:', menuViewList);
    this.menuViewList = menuViewList
    let route = this.findRouteName(this.$route.name)

    this.menuView = this.menuViewList[route.index]
    this.menuViewIndex = route.index

    let tool = {}

    let load_assets = setInterval(async () => {
      await this.$store.dispatch('vxg_get_assets', tool)
      this.items = tool.assets
      
      // Simple approach: check the current route to determine what data to use for search2
      if (this.$route.path.includes('/user')) {
        // If we're on a user route, try to get user data for search2
        try {
          // Try to load users from the store if available
          if (this.$store.state.main_user && this.$store.state.main_user.length > 0) {
            this.items2 = this.$store.state.main_user
          } else {
            // Fallback to assets if no user data
            this.items2 = [...tool.assets]
          }
        } catch (error) {
          this.items2 = [...tool.assets]
        }
      } else {
        // For asset routes, use assets for both searches
        this.items2 = [...tool.assets]
      }
      
      if (this.items.length != 0) {
        // Assets for search 1
        this.tag_items = this.items.filter(v => v && v.tag).map(tag_alias).filter(item => item !== null)
        
        // Determine how to map search2 items based on data type
        if (this.items2.length > 0 && this.items2[0].email) {
          // User data mapping
          this.tag_items2 = this.items2
            .filter(v => v && (v.email || v.name))
            .map(user => user.email || user.name)
            .filter(item => item !== null)
        } else {
          // Asset data mapping
          this.tag_items2 = this.items2.filter(v => v && v.tag).map(tag_alias).filter(item => item !== null)
        }
        
        this.setupMiniSearch(this.items)
        this.setupMiniSearch(this.items2)
        clearInterval(load_assets)  // This ensures the loop stops
      }
    }, 111)
  },

  watch: {

    showSearch2(newVal) {
      if (newVal) {
        this.$store.state.showExpansion = false;
      }
    },
    menuViewIndex(index) {
      let pathname = null
      pathname = this.menuView.name
      /*
      if('custom' === this.menuView.mode) {
        pathname = this.menuView.name
      }
      else {
        if(this.$route.path == this.portal.path) {
          pathname = this.menuView.menu.default
        }
        else {
          pathname = this.$route.name
        }
      }

      if(pathname && pathname !== this.$route.name ) {
        this.$router.push(pathname)
      }
      */
    },

    '$store.state.trigger.search.a'(term) {

      this.search = term
      if (typeof term === 'object') {
        term = term.tag
      }
      if (term == '' && this.$refs.search) {
        this.$refs.search.reset()
        this.tag_items = this.items.filter(v => v && v.tag).map(tag_alias).filter(item => item !== null)
        console.log('query changes search is being triggerecd')
        // Set pathData to null
        // this.$store.commit('set_path_data', null)
        
      }
      let search_mode = ''
     // search_mode = this.$router.query.mode
      // use the js way to get the mode from the url using window.location.search
      search_mode = new URLSearchParams(window.location.search).get('mode')
      let asset = new URLSearchParams(window.location.search).get('asset')
      console.log('asset is ', asset)
      
      if (search_mode == 'route') {
        this.$router.replace({
          path: this.$route.path,
          query: {
            mode: 'route',
            a: this.search,
            b: this.search2
          }
        }).catch(err => {
          // Ignore NavigationDuplicated errors
          if (err.name !== 'NavigationDuplicated') {
            console.error('Router navigation error:', err);
          }
        })

      }
      if(search_mode == 'assetsearch'){
        console.log('search_mode is assetsearch')
        
        // Trigger search when in assetsearch mode
        if(term) {
          this.performAssetSearch(term);
        }
      }
    },

    '$store.state.trigger.search.b'(term) {

      //   const pathData = this.$store.dispatch('get_path_data', { 
      //   assetId: 'asset123' 
      // }).then((data) => {
      //   console.log('PathData: ', data)
      // })

      // if term is an object then return term.tag
      if (typeof term === 'object') {
        term = term.tag
      }
      const termStr = String(term);
      term = termStr.replace(/\(.*?\)/g, "").trim();
      console.log('search2 is being triggered', term)
      
      this.search2 = term
      if (term == '' && this.$refs.search2) {
        this.$refs.search2.reset()
        // this.tag_items = this.items.map(v => v.tag)
        this.tag_items2 = this.items2.filter(v => v && v.tag).map(tag_alias).filter(item => item !== null)
        //  this.$store.commit('set_path_data', null)
      }
      this.$router.replace({
        path: this.$route.path,
        query: {
          mode: 'route',
          a: this.search,
          b: this.search2
        }
      }).catch(err => {
        // Ignore NavigationDuplicated errors
        if (err.name !== 'NavigationDuplicated') {
          console.error('Router navigation error:', err);
        }
      })
    },
     removeAlias(term) {
    // Handle null, undefined, or non-string values
    if (!term && term !== 0) {
      return '';
    }
    
    // Convert to string, handling numbers and other types
    const termStr = String(term);
    return termStr.replace(/\(.*?\)/g, "").trim();
  },
    search(val) {
      let term = val || ''
      term = term.trim()
      // Todo: Is it necessary?
      // let m = term.match(/^([^(]+)\s*\([^)]+\)$/)
      // if(m) {
      //   term = m[1].trim()
      // }
      // this.$store.dispatch('trigger_search', {term:this.search})
      this.$store.dispatch('trigger_search', { a: term })
    },
    search2(val) {
      let term = val || ''
      // Ensure term is a string before calling trim()

   
    
    // Convert to string, handling numbers and other types
      this.$store.dispatch('trigger_search', { b: term })

      // this.search2 = val
      // let pathData = this.$store.dispatch('set_path_data', {
      //   assetId: 'asset123'
      // });
      // console.log('PathData: ', pathData)

    },
    select() {
      this.$store.dispatch('trigger_select', { value: this.select })
    },
    '$store.state.trigger.select.value'(val) {
      this.select = val
    },
    '$store.vxg.cmp.BasicHead.allow.add': {
      handler() {
        this.$forceUpdate()
      }
    },
    '$store.vxg.cmp.BasicHead.allow.remove': {
      handler() {
        this.$forceUpdate()
      }
    },




    '$route.name': {
      immediate: true,
      handler(val) {
        if (!val && this.defaultFound()) {
          this.$router.push(this.menuView.menu.default)
        }

        let route = this.findRouteName(val)

        this.menuView = this.menuViewList[route.index]
      }
    },
    '$route.query': {
      immediate: true,
      handler(query) {
        // Handle route initialization when mode is 'route'
        //console.log('query:', query.a, query.b)

        if (query.mode == 'route') {
          // check that this only on first dom load else skip

          // Enable navigation mode
          // if (!this.showSearch2) {
          //   this.toggleSearch2();

          //   console.log('mode _Search2 toggled', this.search);
          // }

          // Set search values from URL parameters
          this.search = query.a || ''
          this.search2 = query.b || ''

          // Update store state
          //TODO fix the NaN number when the next line is uncommented
          this.$store.state.trigger.search.a = this.search
          this.$store.state.trigger.search.b = this.search2
          //next tick to update the search fields
          this.$nextTick(() => {
            this.search = query.a || ''
            this.search2 = query.b || ''
          })

          //lets change the search fields to the url parameters
        }
      }
    },
    '$store.state.trigger.select.value': {
      handler(newVal) {
        try {
          if (newVal) {
            const room = this.getRoom()
            if (room) {
              this.select = newVal
            }
          }
        } catch (error) {
          console.error('Error processing room selection:', error)
        }
      },
      immediate: true
    }
  },


  computed: {
    ...mapState(['showSearch2', 'showExpansion', 'pathData', 'currentStage']

    ),
    ...mapState({
      aprxTime: state => state.pathEstimation?.time,
      aprxDistance: state => state.pathEstimation?.distance,
    }),
    triggerSelect() {
      return this.$store.state.trigger.select;
    },

    filterDisabled() {
      return this.$store.state.trigger.filter_disabled.value
    },

    prependIcon() {

      return !(this.showSearch2) && this.showIcon ? 'mdi-magnify magnifierIcon' : ''; // Conditionally bind the icon
    },


    menu() {
      if (this.menuView.mode !== 'standard') return [];

      const { items, order } = this.menuView.menu;
      return order.split(/\s*,\s*/).map(code => ({
        ...items[code],
        code,
        klass: { 'vxg-router-link': true }
      }));
    },
    filterIcon() {
      return this.$store.state.vxg.cmp.BasicHead.show.filter
    },

    drawerStyle() {
      return DRAWER_STYLE;
    },
    custom() {
      return this.$model.main.ux.custom
    },

    view() {
      //return this.custom.special.view
      const result = this.custom.special.view;
      console.log('view:', result);
      return result;
    },

    portal() {
      return this.custom.special.portal
    },
    tool() {
      // TODO: better if main.app.web.parts.head was provided directly
      let headtool = this.$model.main.app.web.parts.head.tool
      let viewtool = this.view.tool
      let tool = this.$main.seneca.util.deep(headtool, viewtool)
      return tool
    },

    search_config() {
      return this.$model.main.ux.custom.search_config
    }
  },

  methods: {
    ...mapActions(['toggleSideInfoCardVisibility']),
    ...mapMutations(['toggleSearch2', 'toggleExpansion', 'setCurrentStage']),
    toggleSearchMode() {
      this.toggleSearch2();
    },
    closeSideInfoCard() {
      this.toggleSideInfoCardVisibility(false);

    },

    // toggleSearch2() {
    //     this.showSearch2 = !this.showSearch2;
    //   },
    reverseInputs() {
      //this.$store.commit('resetActiveStage');
      this.$store.commit('setCurrentStage', 1);
      this.$store.dispatch('setCurrentStage', 1);
      console.log(this.$store.state.currentStage);

      // Store original values
      const temp = this.search;

      // Swap the search values
      this.search = this.search2;
      this.search2 = temp;

      // Update showSearch2 through the store mutation instead of direct assignment
      if (!this.showSearch2) {
        this.toggleSearch2();
      }

      // Update URL parameters with swapped values (with error handling)
      this.$router.replace({
        path: this.$route.path,
        query: {
          mode: 'route',
          a: this.search,  // Note: using this.search (which is now the old search2)
          b: this.search2  // Note: using this.search2 (which is now the old search)
        }
      }).catch(err => {
        // Ignore NavigationDuplicated errors
        if (err.name !== 'NavigationDuplicated') {
          console.error('Router navigation error:', err);
        }
      });
    },

    handleNavigationMode() {
      console.log('Trigger select:', this.triggerSelect);
      // Update showSearch2 through the store mutation instead of direct assignment
      if (!this.showSearch2) {
        this.toggleSearch2();
      }
      //this.$store.dispatch('vxg_trigger_clear');
    },


    moveRoute(menuView) {
      console.log('menuView.mode:', menuView.mode);

      const path = this.$route.name;
      const targetPath = menuView.mode === 'standard' ? menuView.menu.default : menuView.name;

      if (path !== targetPath) {
        this.$router.push(`/${targetPath}`);
      }
    },

    async setupMiniSearch() {

    },


    // bypass default combobox filter
    customFilter(item, queryText, itemText) {
      return 1
    },

    handleClick() {
      this.showIcon = false; // Hide the icon when the combobox is clicked
    },

    handleBlur() {
      this.showIcon = true; // Show the icon when the combobox is blurred
    },

    handleChangeSearch(event) {
      if (!this.showSearch2) {
        this.$router.push({
          path: this.$route.path,
          query: {
            mode: 'assetsearch',
            term: event,
          }
        })
      } else {
        this.$router.replace({
          path: this.$route.path,
          query: {
            mode: 'route',
            a: this.search,
            b: this.search2
          }
        }).catch(err => {
          if (err.name !== 'NavigationDuplicated') {
            console.error('Router navigation error:', err);
          }
        })
      }
    },

    changeSearch(event) {
      // Handle Enter key submission for assetsearch mode
      if (event.key === 'Enter' && this.$route.query.mode === 'assetsearch') {
        const term = event.target?.value?.trim();
        if (term) {
          this.performAssetSearch(term);
          return;
        }
      }

      setTimeout(async () => { // wait for input
        let term
        term = event.target ? event.target.value : null
        this.$router.push({
          path: this.$route.path,
          query: {
            mode: 'assetsearch',
            term: event.target?.value,
          }
        })
        if (term) {
          let out = await this.$seneca.post('sys:search, cmd:search',
            { query: term, params: this.search_config }
          )
          // this.tag_items = out.data.hits.map(v => v.id)
          this.tag_items = out.data.hits
            .filter(v => v && v.doc)  // Filter out null/undefined items
            .map(v => tag_alias(v.doc)) .filter(item => item !== null)
        }
        else {
          // this.tag_items = this.items.map(v => v.tag)
          if (this.items != undefined)
            this.tag_items = this.items.filter(v => v && v.tag).map(tag_alias).filter(item => item !== null)
        }

      }, 11)

    },
    changeSearch2(event) {
      setTimeout(async () => { // wait for input
        let term
        term = event.target ? event.target.value : null
        if (term) {
          let out = await this.$seneca.post('sys:search, cmd:search',
            { query: term, params: this.search_config }
          )


          this.tag_items2 = out.data.hits
            .filter(v => v && v.doc)  // Filter out null/undefined items
            .map(v => tag_alias(v.doc))
            .filter(item => item !== null)
          console.log('tag items are ', this.tag_items2)
        }
        else {

          if (this.items2 != undefined)
            this.tag_items2 = this.items2.filter(v => v && v.tag).map(tag_alias).filter(item => item !== null)
        }


      }, 11)
    },

    handleRoute() {
      // When transitioning to navigation mode, preserve search context
      let prevQuery = this.$route.query;
      let aValue = this.search || '';
      let bValue = this.search2 || '';
      
      // When transitioning from assetsearch to route mode
      if (prevQuery.mode === 'assetsearch' && prevQuery.term && !bValue) {
        // Only populate destination if it's empty
        // Keep source (a) unchanged to preserve user's search context
        bValue = prevQuery.term;
        this.search2 = bValue;
      }
      
      if (!this.showSearch2) {
        this.toggleSearch2();
      }
      
      // Hide the side info card (blue route start box) when entering navigation mode
      this.toggleSideInfoCardVisibility(false);
      
      this.$router.replace({
        path: this.$route.path,
        query: {
          mode: 'route',
          a: aValue,
          b: bValue
        }
      }).catch(err => {
        // Ignore NavigationDuplicated errors
        if (err.name !== 'NavigationDuplicated') {
          console.error('Router navigation error:', err);
        }
      })
    },

    clearFilter() {
      console.log('clearFilter activated')

      this.$store.dispatch('vxg_trigger_clear');
      this.search = '';
      this.$store.state.trigger.search.a = '';
      this.search = '';
      this.$store.state.trigger.search.b = '';
      this.$store.dispatch('setLastTrackedSearch', null);
      this.$store.state.showSearch2 = false;
      this.$store.commit('clear_path_data');
      this.$store.state.showExpansion = true;
      this.$store.commit('clearMatchingConnectorData');
      //need to clear the routes on the map 
      this.$store.dispatch('clear_path_data');
      // next lets update the search fields
      this.$nextTick(() => {
        this.$store.dispatch('set_cmp_flags',{name:'BasicMain', flags:{show:false}})
        this.search = '';
        this.search2 = '';
      })
      //  this.$root.$emit('clear-nav-stages');
      this.$router.replace({
        path: this.$route.path,
        query: {}
      }).catch(err => {
        if (err.name !== 'NavigationDuplicated') {
          console.error('Router navigation error:', err);
        }
      })

    },
    show(action) {
      return this.allow(action) &&
        this.$store.state.vxg.cmp.BasicHead.show[action]
    },


    //   handleClickOutside(event) {
    //   const search = this.$refs.search.$el;
    //   const search2 = this.$refs.search2 ? this.$refs.search2.$el : null;
    //   if (!search.contains(event.target) && (!search2 || !search2.contains(event.target))) {
    //     this.showSearch2 = true;
    //   }
    // },


    filter(event) {
      // Don't switch to filter mode if we're in navigation mode (route mode)
      if (this.$route.query.mode === 'route') {
        console.log('Filter ignored - currently in navigation mode');
        return;
      }
      
      if (this.$route.query.mode !== 'filtersearch') {
        this.$router.replace({
          path: this.$route.path,
          query: {
            mode: 'filtersearch',
            area: '',
            level: '',
            systemtype: '',
            assettype: '',
          }
        }).catch(err => {
          // Ignore NavigationDuplicated errors
          if (err.name !== 'NavigationDuplicated') {
            console.error('Router navigation error:', err);
          }
        })
      }
      this.$store.dispatch('trigger_toggle_filter');

    },

    defaultFound() {
      return this.menuView && this.menuView.menu && this.menuView.menu.default
    },

    findRouteName(name) {
      const specialRoutes = this.custom.special;
      for (let route in specialRoutes) {
        const currentRoute = specialRoutes[route];
        if (currentRoute.name === name) {
          return currentRoute;
        }
        if (currentRoute.sub && currentRoute.sub.includes(name)) {
          return currentRoute;
        }
      }
      return { index: 1 }; // default index
    },
    allow(item) {
      let out = (item && item.allow) ? this.$vxg.allow(item.allow) : true
      return out
    },
    openDrawer() {
      this.$store.dispatch('set_cmp_flags', { name: 'BasicSide', flags: { show: true } })
    },
    closeDrawer() {
      this.$store.dispatch('set_cmp_flags', { name: 'BasicSide', flags: { show: false } })
    },
    action(name) {
      this.$emit('action', name)
    },
    getRoom() {
      const room = this.$store.state.room
      if (!room) {
        console.warn('Room is not available')
        return null
      }
      return room
    },
    handleButtonClick() {
      // Implementation of handleButtonClick method
    },

    async performAssetSearch(term) {
      try {
        console.log('Performing asset search for term:', term);
        
        if (term && term.trim()) {
          
          const searchTerm = term.trim();
          let out = await this.$seneca.post('sys:search, cmd:search',
            { query: searchTerm, params: this.search_config }
          );
          
          // Update search results
          this.tag_items = out.data.hits
            .filter(v => v && v.doc)  // Filter out null/undefined items
            .map(v => tag_alias(v.doc))
            .filter(item => item !== null);
            
          console.log('Asset search results:', this.tag_items);
          
          // Emit search event for other components to listen to
          this.$emit('asset-search-completed', {
            term: searchTerm,
            results: out.data.hits
          });
          
          // Dispatch to trigger system for PqsOneView.vue integration
          this.$store.dispatch('trigger_asset_search', {
            term: searchTerm,
            results: out.data.hits,
            mode: 'assetsearch'
          });
          
        } else {
          // Reset to show all items when search is empty
          if (this.items != undefined) {
            this.tag_items = this.items.filter(v => v && v.tag).map(tag_alias).filter(item => item !== null);
          }
        }
      } catch (error) {
        console.error('Error performing asset search:', error);
      }
    }
  },

  mounted() {
    const mode = this.$route.query.mode
    if (mode === 'filtersearch') {
      //this.$store.dispatch('trigger_toggle_filter');
    }
  },
  // beforeDestroy() {
  //   document.removeEventListener('click', this.handleClickOutside);
  // }



}



const DRAWER_STYLE = Object.freeze({ width: "282px", visibility: "visible !important", transform: "none !important" });


</script>


<style lang="scss">
.v-navigation-drawer {
  position: fixed !important;
  background: #141B2D;
}



.v-navigation-drawer__content {
  overflow-y: hidden;

}

nav.vxg-side {
  background-color: #141B2D !important;

  .v-sheet {
    background-color: #141B2D !important;
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

  margin: 4px !important; // Added margin for spacing between buttons

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
  padding: 10px !important; // Added padding to the toggle container
  padding-bottom: 10px;
  padding-top: 10px;
  margin-right: 10px;

}



a.vxg-router-link {
  display: block;
  margin: 0px 8px;
  padding: 16px 8px;
  text-decoration: none !important;
  color: rgb(var(--vxg-ct1)) !important;
  border-radius: 8px;

  .v-icon {
    color: rgb(var(--vxg-ct2)) !important;
  }

  &.router-link-active {
    background-color: rgb(var(--vxg-cb2)) !important;
    color: rgb(var(--vxg-ct1)) !important;

    .v-icon {
      color: rgb(var(--vxg-ct1)) !important;
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

  color: #141b2d;
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
  /* Adjust size as needed */
  height: 24px;
  /* Adjust size as needed */
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
