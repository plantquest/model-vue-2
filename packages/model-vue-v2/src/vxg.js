import Patrun from 'patrun'
import Jsonic from '@jsonic/jsonic-next'

// Import components statically to avoid chunk loading issues
import VxgBasicAdmin from './components/BasicAdmin.vue'
import VxgBasicHead from './components/BasicHead.vue'
import VxgBasicFoot from './components/BasicFoot.vue'
import VxgBasicMain from './components/BasicMain.vue'
import VxgBasicSide from './components/BasicSide.vue'
console.log('%cHello World!', 'color: green; font-size: 20px; font-weight: bold; background-color: #f0f0f0; padding: 10px; border-radius: 5px; box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);');

import VxgBasicLed from './components/BasicLed.vue'
import VxgBasicFieldPick from './components/BasicFieldPick.vue'
import VxgBasicAuth from './components/BasicAuth.vue'

import Pkg from '../package.json'

const config_defaults = {}

const util = {}

console.log('VXG 01')

class Vxg {
  constructor(config) {
    console.log('%cHello World!', 'color: green; font-size: 20px; font-weight: bold; background-color: #f0f0f0; padding: 10px; border-radius: 5px; box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);');

    this.match = {
      allow: new Patrun({ gex: true }),
    }
    this.cmp = {}
    this.config(config)
    this.memoizedAllow = new Map()
  }

  config(custom_config) {
    // TODO: deep, validation
    Object.assign(this.config, config_defaults, custom_config || {})

    this.config.allow = this.config.allow || {}
    this.config.allow.modify = this.config.allow.modify || ((x) => x)
    this.config.allow.match = this.config.allow.match || []

    for (let entry of this.config.allow.match) {
      this.match.allow.add(entry, { allow: true })
    }
  }

  allow(match) {
    const key = JSON.stringify(match)
    if (this.memoizedAllow.has(key)) {
      return this.memoizedAllow.get(key)
    }

    let mm = Jsonic(match)
    let ms = Array.isArray(match) ? match : Object.keys(mm).map((x) => mm[x])
    let found = null

    for (let m of ms) {
      let pat = this.config.allow.modify({ ...(m || {}) })
      found = this.match.allow.find(pat)
      if (found) break
    }

    const result = found ? !!found.allow : false
    this.memoizedAllow.set(key, result)
    return result
  }

  install(Vue, options) {
    const components = {
      VxgBasicAdmin,
      VxgBasicHead,
      VxgBasicFoot,
      VxgBasicMain,
      VxgBasicSide,
      VxgBasicLed,
      VxgBasicFieldPick,
      VxgBasicAuth,
    }

    // Register components
    Object.entries(components).forEach(([name, component]) => {
      Vue.component(name, component)
      this.cmp[name] = component
    })

    // Use a getter for $vxg
    Object.defineProperty(Vue.prototype, '$vxg', {
      get: () => this
    })
  }
}

Vxg.info = {
  version: Pkg.version,
  note: 'KD 2',
}

export default Vxg
