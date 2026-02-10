<template>
  <div 
    class="stage" 
    :class="{ 'activated': isActive }"
    :data-active="isActive"
    :data-index="index"
    @click="handleClick"
  >
    <h3 style="font-size: 13px;">
      STAGE {{ index + 1 }}
      <span v-if="isActive" style="color: #4CAF50; font-weight: bold;"> ✓</span>
    </h3>
    <p>{{ stage.msg }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Stage } from '@/types/components'

interface Props {
  stage: Stage
  index: number
  isActive: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  select: []
}>()

const handleClick = () => {
  console.log(`🎯 Stage ${props.index + 1} clicked, isActive=${props.isActive}, will become active`)
  emit('select')
  // Log again after a short delay to see if prop updated
  setTimeout(() => {
    console.log(`✨ Stage ${props.index + 1} after click: isActive=${props.isActive}`)
  }, 200)
}
</script>

<style lang="scss" scoped>
.stage {
  width: 95%;
  height: 85px;
  margin: 0px 4px 5px 7px;
  padding: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  background-color: white !important;
  border-radius: 4px;
  display: block;
  position: relative;

  &:hover:not(.activated) {
    opacity: 0.9;
  }
}

.stage h3 {
  position: relative;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-synthesis: none;
  font-weight: 700;
  top: 4px;
  left: 13px;
  color: #000 !important;
}

.stage p {
  position: relative;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-synthesis: none;
  font-weight: 400;
  font-size: 15px;
  width: 94%;
  top: 3px;
  left: 13px;
  color: #333 !important;
}

.stage.activated {
  background-color: #C0E28B !important;
  opacity: 1 !important;
  border: 2px solid #8BC34A !important;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
}
</style>
