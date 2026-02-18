<template>
<v-select
  :items="pick(field)"
  :label="field.title"
  v-model="item[field.name]"
  outlined
  :disabled="field.readonly || !allow('edit')"
  ></v-select>
</template>

<style lang="scss"></style>

<script>
export default {
  props: {
    field: {
      type: Object,
      required: true,
    },
    param: {
      type: Object,
      default: ()=>({})
    },
  },
    
  data () {
    return {
    }
  },

  created () {
    let custom = this.custom = this.field.custom || {}
    custom.allow = custom.allow || (()=>true)
  },

  computed: {
    item() {
      return this.param.item
    }
  },
  
  methods: {
    pick (field) {
      let kinds = field.kind && Object.entries(field.kind) || []
      let picks = kinds
          .filter(this.makeFieldFilter(field))
          .map(([n,d])=>({text:d.title,value:n}))
      
      // Filter based on current user profile - same logic as BasicLed.vue
      if (this.$store && this.$store.state.current_user) {
        // If current user is Admin (sea), remove System Owner (gea) from options
        if (this.$store.state.current_user.profile === 'sea') {
          picks = picks.filter(item => item.value !== 'gea');
        }
        
        // If current user is User (ob), remove System Owner and Admin from options
        if (this.$store.state.current_user.profile === 'ob') {
          picks = picks.filter(item => item.value !== 'gea' && item.value !== 'sea');
        }
      }
      
      return picks
    },

    makeFieldFilter (field) {
      let custom = this.custom
      let filter =
          custom.field &&
          custom.field[field.name] &&
          custom.field[field.name].filter

      return filter || (()=>true)
    },
    
    allow(...args) {
      return this.custom.allow(...args)
    },
  }
}
</script>
