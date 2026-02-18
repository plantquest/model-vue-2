<template>
  <v-footer app class="basic-footer">
    <v-row>
      <v-col>
        <v-btn
          v-for="link in links"
          :key="link.id"
          :variant="'text'"
          @click="handleLinkClick(link)"
        >
          {{ link.label }}
        </v-btn>
      </v-col>
      <v-col class="text-right">
        <span>{{ copyright }} {{ currentYear }}</span>
        <span v-if="version" class="ml-2">v{{ version }}</span>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { FooterLink } from '../types/components'

/**
 * BasicFoot component props
 */
interface Props {
  /** Array of footer links */
  links?: FooterLink[]
  /** Application version string */
  version?: string
  /** Copyright text */
  copyright?: string
}

const props = withDefaults(defineProps<Props>(), {
  links: () => [],
  version: '',
  copyright: '© PlantQuest'
})

/**
 * Component emits
 */
const emit = defineEmits<{
  /** Emitted when a footer link is clicked */
  linkClick: [link: FooterLink]
}>()

const router = useRouter()

/**
 * Current year for copyright display
 */
const currentYear = computed(() => new Date().getFullYear())

/**
 * Handle link click events
 * @param link - The clicked link object
 */
const handleLinkClick = (link: FooterLink) => {
  if (link.route) {
    router.push(link.route)
  } else if (link.href) {
    window.open(link.href, '_blank')
  }
  emit('linkClick', link)
}
</script>

<style lang="scss" scoped>
.basic-footer {
  text-align: center;
  color: #333;
  position: absolute;
  bottom: 0;
  z-index: 9999;
  width: max-content;
  height: 23px;
  right: 0;
  background: transparent;
}
</style>
