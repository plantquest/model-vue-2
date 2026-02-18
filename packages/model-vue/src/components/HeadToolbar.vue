<template>
  <div class="head-toolbar d-flex align-center">
    <!-- Drawer Toggle -->
    <v-icon
      v-if="!drawerOpen && tool.expandSide?.active"
      large
      @click="emit('openDrawer')"
      style="display:inline-block;"
      light
    >
      mdi-chevron-right
    </v-icon>
    
    <v-divider
      v-if="!drawerOpen && tool.expandSide?.active"
      vertical
      style="margin:0px 16px;"
    />

    <!-- Add Button -->
    <v-btn
      v-if="showAdd && tool.add?.active"
      tile
      class="vxg-head-btn"
      @click="emit('addItem')"
    >
      <v-icon left medium>mdi-map-marker-path</v-icon>
      Add {{ itemName === 'Asset' ? 'Fixed Asset' : itemName }}
    </v-btn>
    
    <v-divider
      v-if="showAdd && tool.add?.active"
      vertical
      style="margin:0px 16px;"
    />

    <!-- Remove Button -->
    <v-btn
      v-if="showRemove && tool.remove?.active"
      tile
      class="vxg-head-btn"
      @click="emit('removeItem')"
    >
      <v-icon left medium>mdi-map-marker-path</v-icon>
      Remove {{ itemName }}
    </v-btn>
    
    <v-divider
      v-if="showRemove && tool.remove?.active"
      vertical
      style="margin:0px 16px;"
    />
    
    <!-- Print Button -->
    <v-divider vertical v-if="showPrint" />
    
    <v-tooltip bottom v-if="showPrint">
      <template v-slot:activator="{ props: tooltipProps }">
        <v-btn
          v-if="tool.print?.active && showPrint"
          v-bind="tooltipProps"
          large
          elevation="0"
          class="pa-1 ma-1"
          color="white"
          style="height: 55px"
          @click="emit('print')"
          :disabled="tool.print?.disabled"
        >
          <v-icon large class="vxg-icon">mdi-printer</v-icon>
        </v-btn>
      </template>
      <span>PRINT</span>
    </v-tooltip>
    
    <v-divider vertical v-if="showPrint" />

    <!-- Bookmark Button -->
    <v-tooltip bottom v-if="showBookmark">
      <template v-slot:activator="{ props: tooltipProps }">
        <v-btn
          v-if="tool.bookmark?.active && showBookmark"
          v-bind="tooltipProps"
          large
          elevation="0"
          class="pa-1 ma-1"
          color="white"
          style="height: 55px"
          @click="emit('showTags')"
          :disabled="!bookmarkVisible"
        >
          <v-icon large class="vxg-icon">mdi-bookmark-minus-outline</v-icon>
        </v-btn>
      </template>
      <span>BOOKMARK</span>
    </v-tooltip>

    <!-- Collect Button -->
    <v-tooltip bottom v-if="show('collect')">
      <template v-slot:activator="{ props: tooltipProps }">
        <v-btn
          v-if="tool.collect?.active"
          v-bind="tooltipProps"
          large
          elevation="0"
          class="pa-1 ma-1"
          color="white"
          style="height: 55px"
          @click="emit('collect')"
          :disabled="tool.collect?.disabled"
        >
          <v-icon large class="vxg-icon">mdi-inbox-arrow-down</v-icon>
        </v-btn>
      </template>
      <span>COLLECT</span>
    </v-tooltip>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * HeadToolbar Props
 */
interface Props {
  /** Tool configuration */
  tool: any
  /** Whether drawer is open */
  drawerOpen: boolean
  /** Item name for display */
  itemName: string
  /** Bookmark visibility */
  bookmarkVisible: boolean
  /** Show function for permissions */
  show: (action: string) => boolean
  /** Show flags for actions */
  showAdd: boolean
  showRemove: boolean
  showPrint: boolean
  showBookmark: boolean
}

const props = defineProps<Props>()

/**
 * Component emits
 */
const emit = defineEmits<{
  openDrawer: []
  addItem: []
  removeItem: []
  print: []
  showTags: []
  collect: []
}>()
</script>

<style lang="scss" scoped>
.head-toolbar {
  display: flex;
  align-items: center;
  gap: 0;
}

.vxg-head-btn {
  text-transform: none;
}

.vxg-icon {
  color: rgb(var(--vxg-ct2, #666));
}
</style>
