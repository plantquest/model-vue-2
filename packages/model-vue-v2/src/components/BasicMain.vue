<template>
  <v-main app>
    <v-container fluid class="pa-0">
      <router-view :spec="viewSpec" />
    </v-container>
  </v-main>
</template>

<script>
export default {
  computed: {
    viewSpec() {
      const viewName = this.$route.meta.view || this.$model.main.app.web.defaults.view;
      return this.$model.main.app.web.view[viewName].spec;
    }
  }
};
</script>
