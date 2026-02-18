<template>
<v-app id="app">

  <vxg-basic-head
    :spec="spec.parts.head"
    :logo="logo"
    @action="action('BasicHead', $event)"
    />

  <vxg-basic-side
    v-if="showSide"
    :spec="spec.parts.side"
    :logo="logo"
    @action="action('BasicSide', $event)"
    />

  <vxg-basic-main
    :spec="spec.parts.main"
    />

  
  <vxg-basic-foot
    :spec="spec.parts.foot"
    />

</v-app>
</template>

<style lang="scss"></style>

<script>
export default {
  props: ['logo'],
  data () {
    return {
      spec: this.$model.main.app.web
    }
  },

  created () {
    console.log('BasicAdmin side', this.spec.parts)
  },

  computed: {
    showSide() {
      return this.$store.state.vxg.cmp.BasicSide.show
    }
  },

  methods: {
    action(part, ev) {
      this.$emit('action', {part,event:ev})
    }
  }
}
</script>
