<template>
  <v-app-bar app class="vxg-app-bar">

    <v-icon
      v-if="!drawerOpen && tool.expandSide.active"
      large
      @click="openDrawer"
      style="display:inline-block;"
      light
      >mdi-chevron-right</v-icon>
    <v-divider
      v-if="!drawerOpen && tool.expandSide.active"
      vertical style="margin:0px 16px;"></v-divider>
  
  
    <!-- <v-btn
      v-if="show('clear') && tool.clear.active"
      outlined
      style="max-width:16%;display:inline-block;margin-left:2px;"
      @click="clearFilter"
    >Clear</v-btn> -->
  
    <!-- <v-btn
      v-if="show('go') && tool.go.active"
      style="max-width:16%;display:inline-block;margin-left:6px;"
      outlined
      :disabled="filterDisabled"
      @click="filterAssets"
    >Go</v-btn> -->
  <h2 style="margin-left: 10px;">{{ $store.state.vxg.ent.meta.name }}</h2>
    <v-select
      v-if="show('select') && tool.select.active"
      style="max-width:20%;display:inline-block;margin-left:10px;"
      :items="selectItems()"
      ref="select"
      :label="tool.select.title"
      v-model="select"
      tile
      outlined
      hide-details
      dense
      > 
  
    </v-select>
  
    
    <!-- <v-divider
      v-if="(show('select') && tool.select.active) || (show('go') && tool.go.active)"
      vertical style="margin:0px 16px;"></v-divider> -->
  
  
    <v-btn
      v-if="show('add') && tool.add.active"
      tile
      class="vxg-head-btn"
      @click="addItem"
      >
      <v-icon left medium>
        mdi-map-marker-path
      </v-icon>
      Add {{ itemName == 'Asset' ? 'Fixed Asset' : itemName }}
    </v-btn>
    
    <v-btn
      v-if="show('addmobile') && tool.add.active"
      tile
      class="vxg-head-btn"
      @click="addMobileAsset"
      >
      <v-icon left medium>
        mdi-map-marker-path
      </v-icon>
      Add Mobile Asset
    </v-btn>
  
    <v-divider
      v-if="show('add') && tool.add.active"
      vertical style="margin:0px 16px;"></v-divider>
  
  
    <v-btn
      v-if="show('remove') && tool.remove.active"
      tile
      class="vxg-head-btn"
      @click="removeItem"
      >
      <v-icon left medium>
        mdi-map-marker-path
      </v-icon>
      Remove {{ itemName }}
    </v-btn>
    
    <v-divider
      v-if="show('remove') && tool.remove.active"
      vertical style="margin:0px 16px;"></v-divider>
  
    <v-combobox ref="search" class="comboxSearch d-flex justify-space-between" v-model="search"
          @keydown="changeSearch($event)" @click:clear="changeSearch($event)" @change="handleChangeSearch($event)"
           flat hide-details outlined dense clearable placeholder="" @click:append="filter"
          :filter="customFilter" :prepend-inner-icon="prependIcon" @click="handleClick" @blur="handleBlur">
</v-combobox> 
  
    <v-spacer
      v-if="tool.avatar.active || tool.expandMain.active"
      ></v-spacer>
  
    <v-icon
      v-if="tool.avatar.active"
      large
      @click="action('avatar')"
      style="display:inline-block;"
      light
      >mdi-account</v-icon>
  
  
    <v-divider
      v-if="!detailOpen && tool.expandMain.active"
      vertical style="margin:0px 16px;"></v-divider>
  

  
    <v-icon
      v-if="!detailOpen && tool.expandMain.active"
      large
      @click="closeDetail"
      style="display:inline-block;"
      light
      >mdi-chevron-left</v-icon>
  
    <v-divider vertical v-if="show('print')"></v-divider>
  
    <v-tooltip bottom v-if="show('print')" v-once> 
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-if="tool.print.active && show('print')" v-bind="attrs" v-on="on"
          large elevation="0" class="pa-1 ma-1" color="white" style="height: 55px" @click="print()"
    :disabled="tool.print.disabled"
         >
          <v-icon large class="vxg-icon">mdi-printer</v-icon>
        </v-btn>
       </template>
       <span>{{ 'PRINT' }}</span>
    </v-tooltip>
  
    <v-divider vertical v-if="show('print')"></v-divider>
  
    <v-tooltip bottom v-if="show('bookmark')" v-once>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-if="tool.bookmark.active && show('bookmark')" v-bind="attrs" v-on="on"
          large elevation="0" class="pa-1 ma-1" color="white" style="height: 55px" @click="showTags()" :disabled="!bookmarkVisible">
          <v-icon large class="vxg-icon">mdi-bookmark-minus-outline</v-icon>
        </v-btn>
       </template>
       <span>{{ (bookmark ? 'HIDE' : 'SHOW') + ' TAGS' }}</span>
    </v-tooltip>
  
  
    <v-divider vertical v-if="show('bookmark')"></v-divider>
  
    <v-tooltip bottom v-if="show('collect')" v-once>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-if="tool['collect'].active && show('collect')" v-bind="attrs" v-on="on"
          large elevation="0" class="pa-1 ma-1" color="white" style="height: 55px" @click="collect()">
          <v-icon large class="vxg-icon">mdi-folder-open-outline</v-icon>
        </v-btn>
       </template>
       <span>{{ 'ASSET COLLECTION' }}</span>
    </v-tooltip>
  
    <v-divider vertical v-if="show('collect')"></v-divider>
  
  </v-app-bar>
  </template>
  
  <style lang="scss">
  .vxg-icon {
      padding: 20px;
  }
  
  .vxg-app-bar {
      height: 64px;
      background-color: white;
      margin-left: 25px;
  }
  
  .vxg-head-btn {
  
      height: 100%;
      background-color: white !important;
      color: rgb(var(--vxg-ct0));
      text-transform: none !important;
      box-shadow: none !important;
      margin-left: 10px;
      
      .v-icon {
          color: rgb(var(--vxg-ci0)) !important;
      }
  }
  </style>
  
  <script>
  
  
  function tag_alias(asset) {
    // Add null check for asset
    if (!asset || !asset.tag) {
      return null;  // Return null for invalid assets
    }
    
    if (null != asset.custom12) {
      return asset.tag + '(' + asset.custom12 + ')'
    }
    return asset.tag
  }
  
  
  export default {
    props: ['logo'],
  
    data () {
      return {
        search: '',
        select: '',
        view: {
          tool: {}
        },
        featuresMenu: [],
        items: [],
        tag_items: [],
      }
    },
  
    async created () {
      let tool = {}
      let tag_items = []
  
      let load_assets = setInterval(async ()=>{
        await this.$store.dispatch('vxg_get_assets', tool)
        this.items = tool.assets
        
        if(this.items.length != 0) {
          // Filter out null values
          this.tag_items = this.items
            .map(tag_alias)
            .filter(item => item !== null)
          this.setupMiniSearch(this.items)
          clearInterval(load_assets)
        } 
      }, 111)
      
    },
    
    mounted () {
      
    },
    
  
    watch: {
      '$store.state.trigger.search.term' (term) {
        if(term == '' && this.$refs.search2) {  // Restored to search2
          this.$refs.search2.reset()
          // Filter out null values
          this.tag_items = this.items
            .map(tag_alias)
            .filter(item => item !== null)
        }
      },
      
      select () {
        this.$store.dispatch('trigger_select', {value:this.select})
      },
      '$store.state.trigger.select.value' (val) {
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
        handler (val) {
          let name = this.$route.name
          
          let view = this.$model.main.app.web.view[name]
          if(view && view.head) {
            this.view.tool = view.head.tool
          }

          // DESKTOP-771: Don't clear search when in assetsearch mode or staying in admin context
          const preserveSearch = this.$route && (
            this.$route.query.mode === 'assetsearch' || 
            (this.$route.name === 'admin' && this.$route.query.tab === 'assets')
          );
          
          if (!preserveSearch) {
            // Clear search when switching routes
            this.search = ''
            this.$store.state.trigger.search.term = ''
            if (this.$refs.search2) {
              this.$refs.search2.reset()
            }
            // Reset tag_items to show all items
            if (this.items && this.items.length > 0) {
              this.tag_items = this.items.map(tag_alias)
            }
          }

          this.defaults()

        }
      }
    },
    
    computed: {
      filterDisabled () {
        return this.$store.state.trigger.filter_disabled.value
      },
      filterIcon (){
        return this.$store.state.vxg.cmp.BasicHead.show.filter
      },
      bookmarkVisible() {
        return this.$store.state.trigger.bookmark.visible
      },
      bookmark () {
        return this.$store.state.trigger.bookmark.value
      },
      drawerOpen() {
        return this.$store.state.vxg.cmp.BasicSide.show
      },
      detailOpen() {
        return !this.$store.state.vxg.cmp.BasicMain.show
      },
      itemName() {
        return this.$store.state.vxg.ent.meta.name
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
      async setupMiniSearch(items) {
        for(const item of items) {
          // item = {...item}
          this.$seneca.post('sys:search, cmd:add', { doc: item, })
        }
      },
      
      async performSearch(term) {
        try {
          if(term) {
            let out = await this.$seneca.post('sys:search, cmd:search', 
              { query: term, params: this.search_config }
            )
            // Filter out null values after mapping
            this.tag_items = out.data.hits
              .map(v => tag_alias(v.doc))
              .filter(item => item !== null)
          } else {
            if (this.items && this.items.length > 0) {
              // Filter out null values after mapping
              this.tag_items = this.items
                .map(tag_alias)
                .filter(item => item !== null)
            }
          }
        } catch (error) {
          console.error('Search error:', error)
        }
      },
      
      // Custom filter for combobox autosuggest
      customFilter (item, queryText, itemText) {
        if (!queryText) return true
        
        // Filter items that contain the query text (case insensitive)
        const searchText = queryText.toLowerCase()
        const itemContent = (item || '').toLowerCase()
        
        return itemContent.includes(searchText)
      },
  
      changeSearch(event) {
  
        setTimeout(async ()=> { // wait for input
          let term
          term = event.target ? event.target.value : null
          
          console.log('searching.. term', term)
          
          // Update BOTH store properties for complete Assets search integration
          this.$store.state.trigger.search.term = term || ''  // For BasicLed data table
          this.$store.state.trigger.search.a = term || ''     // For BasicSide search 1
          
          // Always update tag_items for autosuggest functionality
          await this.performSearch(term)
          
          // Skip URL navigation if other components are handling search
          if (this.$route.query.mode === 'assetsearch' || 
              this.$route.query.mode === 'filtersearch' || 
              this.$route.query.mode === 'route') {
            return
          }
          
          // Use URL-based search for consistency
          if (term) {
            this.$router.push({
              path: this.$route.path,
              query: {
                mode: 'headsearch',
                term: term
              }
            }).catch(err => {
              if (err.name !== 'NavigationDuplicated') {
                console.error('Router navigation error:', err);
              }
            })
          } else {
            // Clear search by removing query parameters
            this.$router.push({
              path: this.$route.path,
              query: {}
            }).catch(err => {
              if (err.name !== 'NavigationDuplicated') {
                console.error('Router navigation error:', err);
              }
            })
          }
          
        }, 11)
      },
      
      filterAssets () {
        this.$store.dispatch('vxg_trigger_go')
      },
      clearFilter () {
        this.$store.dispatch('vxg_trigger_clear')
      },
      defaults () {
        if(this.tool.select.active) {
          this.select = this.tool.select.initial
        }
      },
      print () {
        this.$store.dispatch('vxg_trigger_printMap')
      },
      
      collect () {
        this.$store.dispatch('vxg_trigger_collect')
      },
      
      showTags() {
        console.log('showTags triggered');
        this.$store.dispatch('adjust_trigger_bookmark')
      },
      
      getTags() {
        let tool = {}
        this.$store.dispatch('vxg_get_assets', tool)
        return tool.assets.map(v=>v.tag)
      },
  
      addItem () {
        this.$store.dispatch('trigger_led_add')
      },
  
      addMobileAsset () {
        this.$store.dispatch('trigger_led_add_mobile')
      },
  
      removeItem () {
        this.$store.dispatch('trigger_led_remove')
      },
  
      selectItems () {
        let items = []
        if(this.tool.select.items) {
          Object.entries(this.tool.select.items).reduce((items, entry)=>{
            items.push({value:entry[0], text:entry[1].title})
            return items
          }, items)
        }
        return items
      },
  
      filter() {
        this.$store.dispatch('trigger_toggle_filter')
      },
      
      show(action) {
        return this.allow(action) &&
          this.$store.state.vxg.cmp.BasicHead.show[action] 
      },
      
      allow(action) {
        let allowed = this.$store.state.vxg.cmp.BasicHead.allow[action]
        return null == allowed ? true : allowed
      },
      openDrawer() {
        this.$store.dispatch('set_cmp_flags',{name:'BasicSide', flags:{show:true}})
      },
      closeDetail() {
        this.$store.dispatch('set_cmp_flags',{name:'BasicMain', flags:{show:false}})
      },
  
      action(name) {
        this.$emit('action', name)
      },
      handleChangeSearch(event) {
        console.log('handleChangeSearch called with:', this.search)
        // Update both store states
        this.$store.state.trigger.search.term = this.search || ''  // For BasicLed
        this.$store.state.trigger.search.a = this.search || ''     // For BasicSide search 1
      }
    }
  };
  </script>
  <template>
  <v-app-bar app class="vxg-app-bar">
  
    <v-icon
      v-if="!drawerOpen && tool.expandSide.active"
      large
      @click="openDrawer"
      style="display:inline-block;"
      light
      >mdi-chevron-right</v-icon>
    <v-divider
      v-if="!drawerOpen && tool.expandSide.active"
      vertical style="margin:0px 16px;"></v-divider>
  
  
    <!-- <v-btn
      v-if="show('clear') && tool.clear.active"
      outlined
      style="max-width:16%;display:inline-block;margin-left:2px;"
      @click="clearFilter"
    >Clear</v-btn> -->
  
    <!-- <v-btn
      v-if="show('go') && tool.go.active"
      style="max-width:16%;display:inline-block;margin-left:6px;"
      outlined
      :disabled="filterDisabled"
      @click="filterAssets"
    >Go</v-btn> -->
  <!-- <h2 style="margin-left: 10px;">{{ $store.state.vxg.ent.meta.name }}</h2>-->
    <v-select
      v-if="show('select') && tool.select.active"
      style="max-width:20%;display:inline-block;margin-left:10px;"
      :items="selectItems()"
      ref="select"
      :label="tool.select.title"
      v-model="select"
      tile
      outlined
      hide-details
      dense
      > 
  
    </v-select>
  
    
    <!-- <v-divider
      v-if="(show('select') && tool.select.active) || (show('go') && tool.go.active)"
      vertical style="margin:0px 16px;"></v-divider> -->
  
  
  <v-btn
      v-if="show('add') && tool.add.active"
      tile
      class="vxg-head-btn"
      @click="addItem"
      >
      <v-icon left medium>
        mdi-map-marker-path
      </v-icon>
      Add {{ itemName == 'Asset' ? 'Fixed Asset' : itemName }}
    </v-btn>
 
  
  
    
   <!-- <v-btn
      v-if="show('addmobile') && tool.add.active"
      tile
      class="vxg-head-btn"
      @click="addMobileAsset"
      >
      <v-icon left medium>
        mdi-map-marker-path
      </v-icon>
      Add Mobile Asset
    </v-btn> 
    -->
  
    <v-divider
      v-if="show('add') && tool.add.active"
      vertical style="margin:0px 16px;"></v-divider>
  
  
    <v-btn
      v-if="show('remove') && tool.remove.active"
      tile
      class="vxg-head-btn"
      @click="removeItem"
      >
      <v-icon left medium>
        mdi-map-marker-path
      </v-icon>
      Remove {{ itemName }}
    </v-btn>
    
    <v-divider
      v-if="show('remove') && tool.remove.active"
      vertical style="margin:0px 16px;"></v-divider>
  
    <v-combobox
      ref="search2"
     
      v-model="search"
      @keydown="changeSearch($event)"
      @click:clear="changeSearch($event)"
      @change="handleChangeSearch($event)"
      :items="tag_items"
      flat
      hide-details
      outlined
      dense
      clearable
      placeholder="Search"
      :append-icon="null"
      @click:append="filter"
      :filter="customFilter"
      >
    </v-combobox> 
  
  
    <v-spacer
      v-if="tool.avatar.active || tool.expandMain.active"
      ></v-spacer>
  
    <v-icon
      v-if="tool.avatar.active"
      large
      @click="action('avatar')"
      style="display:inline-block;"
      light
      >mdi-account</v-icon>
  
  
    <v-divider
      v-if="!detailOpen && tool.expandMain.active"
      vertical style="margin:0px 16px;"></v-divider>
  
  
    <v-icon
      v-if="!detailOpen && tool.expandMain.active"
      large
      @click="closeDetail"
      style="display:inline-block;"
      light
      >mdi-chevron-left</v-icon>
  
    <v-divider vertical v-if="show('print')"></v-divider>
  
    <v-tooltip bottom v-if="show('print')" v-once> 
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-if="tool.print.active && show('print')" v-bind="attrs" v-on="on"
          large elevation="0" class="pa-1 ma-1" color="white" style="height: 55px" @click="print()"
    :disabled="tool.print.disabled"
         >
          <v-icon large class="vxg-icon">mdi-printer</v-icon>
        </v-btn>
       </template>
       <span>{{ 'PRINT' }}</span>
    </v-tooltip>
  
    <v-divider vertical v-if="show('print')"></v-divider>
  
    <v-tooltip bottom v-if="show('bookmark')" v-once>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-if="tool.bookmark.active && show('bookmark')" v-bind="attrs" v-on="on"
          large elevation="0" class="pa-1 ma-1" color="white" style="height: 55px" @click="showTags()" :disabled="!bookmarkVisible">
          <v-icon large class="vxg-icon">mdi-bookmark-minus-outline</v-icon>
        </v-btn>
       </template>
       <span>{{ (bookmark ? 'HIDE' : 'SHOW') + ' TAGS' }}</span>
    </v-tooltip>
  
  
    <v-divider vertical v-if="show('bookmark')"></v-divider>
  
    <v-tooltip bottom v-if="show('collect')" v-once>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-if="tool['collect'].active && show('collect')" v-bind="attrs" v-on="on"
          large elevation="0" class="pa-1 ma-1" color="white" style="height: 55px" @click="collect()">
          <v-icon large class="vxg-icon">mdi-folder-open-outline</v-icon>
        </v-btn>
       </template>
       <span>{{ 'ASSET COLLECTION' }}</span>
    </v-tooltip>
  
    <v-divider vertical v-if="show('collect')"></v-divider>
  
  </v-app-bar>
  </template>
  
  <style lang="scss">
  .vxg-icon {
      padding: 20px;
  }
  
  .vxg-app-bar {
      height: 64px;
      background-color: white;
      margin-left: 25px;
  }
  
  .vxg-head-btn {
  
      height: 100%;
      background-color: white !important;
      color: rgb(var(--vxg-ct0));
      text-transform: none !important;
      box-shadow: none !important;
      margin-left: 10px;
      
      .v-icon {
          color: rgb(var(--vxg-ci0)) !important;
      }
  }
  </style>
  
  <script>
  
  
  function tag_alias(asset) {
    // Add null check for asset
    if (!asset || !asset.tag) {
      return null;  // Return null for invalid assets
    }
    
    if (null != asset.custom12) {
      return asset.tag + '(' + asset.custom12 + ')'
    }
    return asset.tag
  }
  
  
  export default {
    props: ['logo'],
  
    data () {
      return {
        search: '',
        select: '',
        view: {
          tool: {}
        },
        featuresMenu: [],
        items: [],
        tag_items: [],
      }
    },
  
    async created () {
      let tool = {}
      let tag_items = []
  
      let load_assets = setInterval(async ()=>{
        await this.$store.dispatch('vxg_get_assets', tool)
        this.items = tool.assets
        
        if(this.items.length != 0) {
          // Filter out null values
          this.tag_items = this.items
            .map(tag_alias)
            .filter(item => item !== null)
          this.setupMiniSearch(this.items)
          clearInterval(load_assets)
        } 
      }, 111)
      
    },
    
    mounted () {
      
    },
    
  
    watchd: {
      '$store.state.trigger.search.term' (term) {
        if(term == '' && this.$refs.search2) {  // Restored to search2
          this.$refs.search2.reset()
          // Filter out null values
          this.tag_items = this.items
            .map(tag_alias)
            .filter(item => item !== null)
        }
      },
      
      select () {
        this.$store.dispatch('trigger_select', {value:this.select})
      },
      '$store.state.trigger.select.value' (val) {
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
  handler (val) {
    let name = this.$route.name;
    let view = this.$model.main.app.web.view[name];
    if(view && view.head) {
      this.view.tool = view.head.tool;
    }

    // Always blur and close dropdown when leaving /asset
    if (this.$refs.search2) {
      // Blur first to remove focus
      this.$refs.search2.blur && this.$refs.search2.blur();
      // Then, after DOM updates, close the dropdown
      this.$nextTick(() => {
        if (this.$refs.search2) {
          this.$refs.search2.isMenuActive = false;
        }
      });
    }

    // DESKTOP-771: Don't clear search when in assetsearch mode or staying in admin context
    const preserveSearch = this.$route && (
      this.$route.query.mode === 'assetsearch' || 
      (this.$route.name === 'admin' && this.$route.query.tab === 'assets')
    );
    
    if (!preserveSearch) {
      // Clear search when switching routes
      this.search = '';
      this.$store.state.trigger.search.term = '';
      if (this.$refs.search2) {
        this.$refs.search2.reset();
      }

      // Reset tag_items to show all items
      if (this.items && this.items.length > 0) {
        this.tag_items = this.items.map(tag_alias).filter(item => item !== null);
      }
    }

  

          this.defaults()

        }
      }
    },
    
    computed: {
      filterDisabled () {
        return this.$store.state.trigger.filter_disabled.value
      },
      filterIcon (){
        return this.$store.state.vxg.cmp.BasicHead.show.filter
      },
      bookmarkVisible() {
        return this.$store.state.trigger.bookmark.visible
      },
      bookmark () {
        return this.$store.state.trigger.bookmark.value
      },
      drawerOpen() {
        return this.$store.state.vxg.cmp.BasicSide.show
      },
      detailOpen() {
        return !this.$store.state.vxg.cmp.BasicMain.show
      },
      itemName() {
        if(this.$store.state.vxg.ent.meta.name == 'Item')
        {
        //check the url route e.g. /device
        if(this.$route.path.includes('/device')){ return 'Device'
        }
        if(this.$route.path.includes('/user')){
          return 'User'
        }
      }
        return this.$store.state.vxg.ent.meta.name
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
      async setupMiniSearch(items) {
        for(const item of items) {
          // item = {...item}
          this.$seneca.post('sys:search, cmd:add', { doc: item, })
        }
      },
      
      async performSearch(term) {
        try {
          if(term) {
            let out = await this.$seneca.post('sys:search, cmd:search', 
              { query: term, params: this.search_config }
            )
            // Filter out null values after mapping
            this.tag_items = out.data.hits
              .map(v => tag_alias(v.doc))
              .filter(item => item !== null)
          } else {
            if (this.items && this.items.length > 0) {
              // Filter out null values after mapping
              this.tag_items = this.items
                .map(tag_alias)
                .filter(item => item !== null)
            }
          }
        } catch (error) {
          console.error('Search error:', error)
        }
      },
      
      // Custom filter for combobox autosuggest
      customFilter (item, queryText, itemText) {
        if (!queryText) return true
        
        // Filter items that contain the query text (case insensitive)
        const searchText = queryText.toLowerCase()
        const itemContent = (item || '').toLowerCase()
        
        return itemContent.includes(searchText)
      },
  
      changeSearch(event) {
  
        setTimeout(async ()=> { // wait for input
          let term
          term = event.target ? event.target.value : null
          
          console.log('searching.. term', term)
          
          // Update BOTH store properties for complete Assets search integration
          this.$store.state.trigger.search.term = term || ''  // For BasicLed data table
          this.$store.state.trigger.search.a = term || ''     // For BasicSide search 1
          
          // Always update tag_items for autosuggest functionality
          await this.performSearch(term)
          
          // Skip URL navigation if other components are handling search
          if (this.$route.query.mode === 'assetsearch' || 
              this.$route.query.mode === 'filtersearch' || 
              this.$route.query.mode === 'route') {
            return
          }
          
          // Use URL-based search for consistency
          if (term) {
            this.$router.push({
              path: this.$route.path,
              query: {
                mode: 'headsearch',
                term: term
              }
            }).catch(err => {
              if (err.name !== 'NavigationDuplicated') {
                console.error('Router navigation error:', err);
              }
            })
          } else {
            // Clear search by removing query parameters
            this.$router.push({
              path: this.$route.path,
              query: {}
            }).catch(err => {
              if (err.name !== 'NavigationDuplicated') {
                console.error('Router navigation error:', err);
              }
            })
          }
          
        }, 11)
      },
      
      filterAssets () {
        this.$store.dispatch('vxg_trigger_go')
      },
      clearFilter () {
        this.$store.dispatch('vxg_trigger_clear')
      },
      defaults () {
        if(this.tool.select.active) {
          this.select = this.tool.select.initial
        }
      },
      print () {
        this.$store.dispatch('vxg_trigger_printMap')
      },
      
      collect () {
        this.$store.dispatch('vxg_trigger_collect')
      },
      
      showTags() {
        this.$store.dispatch('adjust_trigger_bookmark')
      },
      
      getTags() {
        let tool = {}
        this.$store.dispatch('vxg_get_assets', tool)
        return tool.assets.map(v=>v.tag)
      },
  
      addItem () {
        this.$store.dispatch('trigger_led_add')
      },
  
      addMobileAsset () {
        this.$store.dispatch('trigger_led_add_mobile')
      },
  
      removeItem () {
        this.$store.dispatch('trigger_led_remove')
      },
  
      selectItems () {
        let items = []
        if(this.tool.select.items) {
          Object.entries(this.tool.select.items).reduce((items, entry)=>{
            items.push({value:entry[0], text:entry[1].title})
            return items
          }, items)
        }
        return items
      },
  
      filter() {
        this.$store.dispatch('trigger_toggle_filter')
      },
      
      show(action) {
        return this.allow(action) &&
          this.$store.state.vxg.cmp.BasicHead.show[action] 
      },
      
      allow(action) {
        let allowed = this.$store.state.vxg.cmp.BasicHead.allow[action]
        return null == allowed ? true : allowed
      },
      openDrawer() {
        this.$store.dispatch('set_cmp_flags',{name:'BasicSide', flags:{show:true}})
      },
      closeDetail() {
        this.$store.dispatch('set_cmp_flags',{name:'BasicMain', flags:{show:false}})
      },
  
      action(name) {
        this.$emit('action', name)
      },
      handleChangeSearch(event) {
        console.log('handleChangeSearch called with:', this.search)
        // Update both store states
        this.$store.state.trigger.search.term = this.search || ''  // For BasicLed
        this.$store.state.trigger.search.a = this.search || ''     // For BasicSide search 1
      }
    }
  };
  </script>