<template>
  <v-app id="app">
    <vxg-basic-head
      :spec="headSpec"
      :logo="logo"
      @action="handleAction('BasicHead', $event)"
    />

    <vxg-basic-side
      v-if="showSide"
      :spec="sideSpec"
      :logo="logo"
      @action="handleAction('BasicSide', $event)"
    />

    <vxg-basic-main
      :spec="mainSpec"
    />

    <vxg-basic-foot
      :spec="footSpec"
    />
  </v-app>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

// Props
interface Props {
  logo?: string
}

const props = withDefaults(defineProps<Props>(), {
  logo: ''
})

// Emits
const emit = defineEmits<{
  action: [event: { part: string; event: any }]
}>()

// Composables
const store = useStore()

// Access model data (maintain compatibility with existing patterns)
const model = computed(() => {
  return (window as any).$model || store.state.model
})

// Spec from model
const spec = computed(() => {
  return model.value?.main?.app?.web || {}
})

// Component specs
const headSpec = computed(() => {
  return spec.value.parts?.head || {}
})

const sideSpec = computed(() => {
  return spec.value.parts?.side || {}
})

const mainSpec = computed(() => {
  return spec.value.parts?.main || {}
})

const footSpec = computed(() => {
  return spec.value.parts?.foot || {}
})

// Vuex state
const showSide = computed(() => {
  return store.state.vxg?.cmp?.BasicSide?.show || false
})

// Methods
const handleAction = (part: string, event: any) => {
  emit('action', { part, event })
}

// Lifecycle
onMounted(() => {
  console.log('BasicAdmin mounted', spec.value.parts)
})
</script>

<style lang="scss" scoped>
// Component-specific styles
</style>
