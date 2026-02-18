// This is a test-bed used to launch App.vue (also a test-bed) with
// $ npm run serve
// The exported component is defined by ./root.js

import Vue from 'vue'

import Vxg from './vxg.js'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(Vxg)

var vue = new Vue({
  render: (h) => h(App),
}).$mount('#app')
