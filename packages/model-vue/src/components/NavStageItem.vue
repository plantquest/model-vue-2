<template>
  <div
    class="stage"
    :class="{ 'stage--active': isActive }"
    :data-active="isActive"
    :data-index="index"
    @click="handleClick"
  >
    <h3 class="stage__title">
      STAGE {{ index + 1 }}
      <span v-if="isActive" class="stage__check"> ✓</span>
    </h3>
    <p class="stage__message">{{ stage.msg }}</p>
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
  emit('select')
}
</script>

<style lang="scss" scoped>
.stage {
  width: 95%;
  height: 85px;
  margin: 4px 4px 5px 7px;
  padding: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: rgb(var(--v-theme-surface));
  border: 2px solid transparent;
  border-radius: 4px;
  display: block;
  position: relative;

  &:hover:not(&--active) {
    opacity: 0.9;
  }

  &--active {
    background-color: #C0E28B;
    border-color: rgb(var(--v-theme-pqs-green));
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    opacity: 1;
  }

  &__title {
    position: relative;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-synthesis: none;
    font-weight: 700;
    font-size: 13px;
    top: 4px;
    left: 13px;
    color: rgb(var(--v-theme-on-surface));
  }

  &__check {
    color: rgb(var(--v-theme-pqs-green));
    font-weight: bold;
  }

  &__message {
    position: relative;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-synthesis: none;
    font-weight: 400;
    font-size: 15px;
    width: 94%;
    top: 3px;
    left: 13px;
    color: rgb(var(--v-theme-on-surface));
    opacity: 0.8;
  }
}
</style>
