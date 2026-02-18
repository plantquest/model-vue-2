<template>
  <div class="head-utilities">
    <!-- Print button -->
    <template v-if="showPrint">
      <v-divider vertical></v-divider>
      <v-tooltip bottom v-once>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            large
            elevation="0"
            class="pa-1 ma-1"
            color="white"
            style="height: 55px"
            :disabled="printDisabled"
            @click="handlePrint"
          >
            <v-icon large class="vxg-icon">mdi-printer</v-icon>
          </v-btn>
        </template>
        <span>PRINT</span>
      </v-tooltip>
      <v-divider vertical></v-divider>
    </template>

    <!-- Bookmark button -->
    <template v-if="showBookmark">
      <v-tooltip bottom v-once>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            large
            elevation="0"
            class="pa-1 ma-1"
            color="white"
            style="height: 55px"
            :disabled="!bookmarkVisible"
            @click="handleBookmark"
          >
            <v-icon large class="vxg-icon">mdi-bookmark-minus-outline</v-icon>
          </v-btn>
        </template>
        <span>{{ bookmarkTooltipText }}</span>
      </v-tooltip>
      <v-divider vertical></v-divider>
    </template>

    <!-- Collect button -->
    <template v-if="showCollect">
      <v-tooltip bottom v-once>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            large
            elevation="0"
            class="pa-1 ma-1"
            color="white"
            style="height: 55px"
            @click="handleCollect"
          >
            <v-icon large class="vxg-icon">mdi-folder-open-outline</v-icon>
          </v-btn>
        </template>
        <span>ASSET COLLECTION</span>
      </v-tooltip>
      <v-divider vertical></v-divider>
    </template>
  </div>
</template>

<script setup lang="ts">
/**
 * HeadUtilities Component
 * 
 * Provides utility action buttons for BasicHead toolbar:
 * - Print map
 * - Show/hide tags (bookmark)
 * - Asset collection
 * 
 * Part of the BasicHead toolbar component suite.
 * 
 * @component
 */

import { computed } from 'vue'

interface Props {
  /** Whether to show print button */
  showPrint?: boolean
  /** Whether to show bookmark button */
  showBookmark?: boolean
  /** Whether to show collect button */
  showCollect?: boolean
  /** Whether print button is disabled */
  printDisabled?: boolean
  /** Whether bookmark button is enabled */
  bookmarkVisible?: boolean
  /** Whether tags are currently shown (bookmark active) */
  bookmarkActive?: boolean
}

interface Emits {
  /** Emitted when print button is clicked */
  (e: 'print'): void
  /** Emitted when bookmark button is clicked */
  (e: 'bookmark'): void
  /** Emitted when collect button is clicked */
  (e: 'collect'): void
}

const props = withDefaults(defineProps<Props>(), {
  showPrint: false,
  showBookmark: false,
  showCollect: false,
  printDisabled: false,
  bookmarkVisible: false,
  bookmarkActive: false
})

const emit = defineEmits<Emits>()

/**
 * Bookmark tooltip text based on active state
 */
const bookmarkTooltipText = computed<string>(() => {
  return props.bookmarkActive ? 'HIDE TAGS' : 'SHOW TAGS'
})

/**
 * Handle print button click
 */
const handlePrint = (): void => {
  emit('print')
}

/**
 * Handle bookmark button click
 */
const handleBookmark = (): void => {
  emit('bookmark')
}

/**
 * Handle collect button click
 */
const handleCollect = (): void => {
  emit('collect')
}
</script>

<style lang="scss" scoped>
.head-utilities {
  display: inline-flex;
  align-items: center;
}

.vxg-icon {
  padding: 20px;
}
</style>
