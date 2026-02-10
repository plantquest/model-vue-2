<template>
  <div 
    class="stage" 
    :class="{ 'activated': isActive }"
    @click="emit('select')"
  >
    <h3 style="font-size: 13px;">STAGE {{ index + 1 }}</h3>
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
</script>

<style lang="scss" scoped>
.stage {
  width: 95%;
  height: 85px;
  margin: 0px 4px 0px 7px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  background-color: white;

  &:hover {
    opacity: 0.9;
    background-color: #f0f0f0 !important;
    border-color: #1976D2;
  }

  &:active {
    transform: scale(0.98);
  }
}

.stage h3 {
  position: relative;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-synthesis: none;
  font-weight: 700;
  top: 4px;
  left: 13px;
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
}

.stage.activated {
  background-color: #C0E28B !important;
}
</style>
