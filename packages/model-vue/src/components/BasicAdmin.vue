<template>
  <v-app id="app">
    <vxg-basic-head
      :spec="spec.parts.head"
      :logo="logo"
      @action="handleAction('BasicHead', $event)"
    />

    <vxg-basic-side
      v-if="showSide"
      :spec="spec.parts.side"
      :logo="logo"
      @action="handleAction('BasicSide', $event)"
    />

    <vxg-basic-main
      :spec="spec.parts.main"
    />

    <vxg-basic-foot
      :spec="spec.parts.foot"
    />
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

/**
 * BasicAdmin Props
 */
interface Props {
  /** Logo HTML or image URL */
  logo?: string
}

const props = withDefaults(defineProps<Props>(), {
  logo: ''
})

/**
 * Component emits
 */
const emit = defineEmits<{
  /** Emitted when an action occurs from child components */
  action: [payload: { part: string; event: any }]
}>()

const store = useStore()

// Spec from model
const spec = ref<any>({})

/**
 * Whether to show sidebar
 */
const showSide = computed(() => 
  store.state.vxg?.cmp?.BasicSide?.show ?? false
)

/**
 * Handle action events from child components
 */
const handleAction = (part: string, ev: any) => {
  emit('action', { part, event: ev })
}

// Lifecycle
onMounted(() => {
  const model = (window as any).$model
  if (model) {
    spec.value = model.main?.app?.web || {}
    console.log('BasicAdmin spec.parts:', spec.value.parts)
  }
})
</script>

<style lang="scss" scoped>
/* BasicAdmin styles */
</style>
