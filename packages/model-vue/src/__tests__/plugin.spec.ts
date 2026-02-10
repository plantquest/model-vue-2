/**
 * Plugin Tests
 * Test Vue 3 plugin registration and integration
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createApp } from 'vue'
import { createStore } from 'vuex'
import VxgPlugin, { Vxg, createVxgVuexModule, StoreAdapter } from '../index'

describe('VxgPlugin', () => {
  describe('Plugin Installation', () => {
    it('installs plugin correctly', () => {
      const app = createApp({})
      app.use(VxgPlugin)
      
      expect(app.config.globalProperties.$vxg).toBeInstanceOf(Vxg)
      expect(app.config.globalProperties.$vxgVersion).toBe('1.0.0-alpha.1')
    })
    
    it('creates Vxg instance with default config', () => {
      const app = createApp({})
      app.use(VxgPlugin)
      
      const vxg = app.config.globalProperties.$vxg
      expect(vxg).toBeDefined()
      expect(vxg.state).toEqual({
        cmp: {},
        ent: { meta: {} }
      })
    })
    
    it('accepts custom configuration', () => {
      const app = createApp({})
      app.use(VxgPlugin, {
        allow: {
          match: [{ role: 'admin' }]
        }
      })
      
      const vxg = app.config.globalProperties.$vxg
      expect(vxg.config.allow.match).toEqual([{ role: 'admin' }])
    })
    
    it('accepts initial state', () => {
      const app = createApp({})
      app.use(VxgPlugin, {
        initialState: {
          cmp: {
            'basic-head': { show: true }
          }
        }
      })
      
      const vxg = app.config.globalProperties.$vxg
      expect(vxg.state.cmp['basic-head']).toEqual({ show: true })
    })
    
    it('disables component registration when components: false', () => {
      const app = createApp({})
      const consoleLog = vi.spyOn(console, 'log')
      
      app.use(VxgPlugin, { components: false })
      
      expect(consoleLog).toHaveBeenCalledWith(
        expect.stringContaining('[Vxg] Vue 3 plugin installed')
      )
    })
  })
  
  describe('Vxg Class', () => {
    let vxg: Vxg
    
    beforeEach(() => {
      vxg = new Vxg()
    })
    
    it('creates instance with default state', () => {
      expect(vxg.state).toEqual({
        cmp: {},
        ent: { meta: {} }
      })
    })
    
    it('configures with custom options', () => {
      const customVxg = new Vxg({
        allow: {
          match: [{ role: 'admin' }]
        }
      })
      
      expect(customVxg.config.allow.match).toEqual([{ role: 'admin' }])
    })
    
    describe('State Management', () => {
      it('gets component state', () => {
        vxg.state.cmp['test-component'] = { show: true }
        
        const state = vxg.getComponentState('test-component')
        expect(state).toEqual({ show: true })
      })
      
      it('returns empty object for non-existent component', () => {
        const state = vxg.getComponentState('non-existent')
        expect(state).toEqual({})
      })
      
      it('sets component flags', () => {
        vxg.setComponentFlags('test-component', { show: true })
        
        expect(vxg.state.cmp['test-component']).toEqual({ show: true })
      })
      
      it('merges component flags', () => {
        vxg.setComponentFlags('test-component', { show: true })
        vxg.setComponentFlags('test-component', { allow: { edit: true } })
        
        expect(vxg.state.cmp['test-component']).toEqual({
          show: true,
          allow: { edit: true }
        })
      })
      
      it('gets nested state by path', () => {
        vxg.state.cmp['test-component'] = { show: true }
        
        expect(vxg.get('cmp.test-component.show')).toBe(true)
        expect(vxg.get('cmp.test-component')).toEqual({ show: true })
      })
      
      it('returns undefined for non-existent path', () => {
        expect(vxg.get('non.existent.path')).toBeUndefined()
      })
      
      it('sets nested state by path', () => {
        vxg.set('cmp.test-component.show', true)
        
        expect(vxg.state.cmp['test-component'].show).toBe(true)
      })
      
      it('creates nested objects when setting path', () => {
        vxg.set('ent.meta.name', 'Test Entity')
        
        expect(vxg.state.ent.meta.name).toBe('Test Entity')
      })
    })
    
    describe('Permission System', () => {
      beforeEach(() => {
        vxg = new Vxg({
          allow: {
            match: [
              { role: 'admin', modify: ['*'] },
              { role: 'editor', modify: ['posts'] }
            ]
          }
        })
      })
      
      it('allows matching patterns', () => {
        expect(vxg.allow({ role: 'admin' })).toBe(true)
        expect(vxg.allow({ role: 'editor' })).toBe(true)
      })
      
      it('denies non-matching patterns', () => {
        expect(vxg.allow({ role: 'guest' })).toBe(false)
        expect(vxg.allow({ role: 'user' })).toBe(false)
      })
      
      it('allows array of patterns', () => {
        expect(vxg.allow([{ role: 'admin' }])).toBe(true)
        expect(vxg.allow([{ role: 'editor' }])).toBe(true)
      })
      
      it('memoizes results', () => {
        const match = { role: 'admin' }
        
        vxg.allow(match)
        expect(vxg.memoizedAllow.has(JSON.stringify(match))).toBe(true)
        
        // Second call should use cache
        expect(vxg.allow(match)).toBe(true)
      })
      
      it('clears cache', () => {
        vxg.allow({ role: 'admin' })
        expect(vxg.memoizedAllow.size).toBeGreaterThan(0)
        
        vxg.clearCache()
        expect(vxg.memoizedAllow.size).toBe(0)
      })
    })
    
    describe('Component Registration', () => {
      it('registers components', () => {
        const component = { name: 'TestComponent' }
        vxg.registerComponent('test-component', component)
        
        expect(vxg.cmp['test-component']).toBe(component)
      })
    })
  })
  
  describe('Vuex 4 Integration', () => {
    let store: any
    let vxg: Vxg
    
    beforeEach(() => {
      store = createStore({
        modules: {
          vxg: createVxgVuexModule()
        }
      })
      
      vxg = new Vxg()
    })
    
    it('detects Vuex 4 store', () => {
      const storeType = vxg._detectStoreType(store)
      expect(storeType).toBe('vuex4')
    })
    
    it('connects to Vuex store', () => {
      vxg.connectStore(store)
      
      expect(vxg._store).toBe(store)
      expect(vxg._storeType).toBe('vuex4')
      expect(vxg.commit).toBeDefined()
      expect(vxg.dispatch).toBeDefined()
    })
    
    it('provides commit method', () => {
      vxg.connectStore(store)
      
      expect(typeof vxg.commit).toBe('function')
    })
    
    it('provides dispatch method', () => {
      vxg.connectStore(store)
      
      expect(typeof vxg.dispatch).toBe('function')
    })
  })
  
  describe('Vuex Module', () => {
    let store: any
    
    beforeEach(() => {
      store = createStore({
        modules: {
          vxg: createVxgVuexModule()
        }
      })
    })
    
    it('initializes with default state', () => {
      expect(store.state.vxg).toEqual({
        cmp: {},
        ent: { meta: {} }
      })
    })
    
    it('accepts initial state', () => {
      const customStore = createStore({
        modules: {
          vxg: createVxgVuexModule({
            cmp: { 'test': { show: true } }
          })
        }
      })
      
      expect(customStore.state.vxg.cmp).toEqual({
        'test': { show: true }
      })
    })
    
    it('sets component flags', () => {
      store.commit('vxg/SET_COMPONENT_FLAGS', {
        name: 'test-component',
        flags: { show: true }
      })
      
      expect(store.state.vxg.cmp['test-component']).toEqual({ show: true })
    })
    
    it('sets nested state', () => {
      store.commit('vxg/SET_VXG_STATE', {
        path: 'ent.meta.name',
        value: 'Test'
      })
      
      expect(store.state.vxg.ent.meta.name).toBe('Test')
    })
    
    it('resets state', () => {
      store.commit('vxg/SET_COMPONENT_FLAGS', {
        name: 'test',
        flags: { show: true }
      })
      
      store.commit('vxg/RESET_STATE')
      
      expect(store.state.vxg.cmp).toEqual({})
    })
    
    it('gets component state via getter', () => {
      store.commit('vxg/SET_COMPONENT_FLAGS', {
        name: 'test',
        flags: { show: true }
      })
      
      const state = store.getters['vxg/componentState']('test')
      expect(state).toEqual({ show: true })
    })
    
    it('gets state by path via getter', () => {
      store.commit('vxg/SET_VXG_STATE', {
        path: 'ent.meta.name',
        value: 'Test'
      })
      
      const value = store.getters['vxg/getByPath']('ent.meta.name')
      expect(value).toBe('Test')
    })
    
    it('dispatches actions', async () => {
      await store.dispatch('vxg/updateComponentFlags', {
        name: 'test',
        flags: { show: true }
      })
      
      expect(store.state.vxg.cmp['test']).toEqual({ show: true })
    })
  })
  
  describe('Plugin with Vuex Integration', () => {
    it('integrates with Vuex when store provided', () => {
      const store = createStore({
        modules: {
          vxg: createVxgVuexModule()
        }
      })
      
      const app = createApp({})
      app.use(VxgPlugin, { store })
      
      const vxg = app.config.globalProperties.$vxg
      expect(vxg._store).toBe(store)
      expect(vxg.commit).toBeDefined()
    })
  })
  
  describe('Store Adapter', () => {
    let store: any
    let vxg: Vxg
    let adapter: StoreAdapter
    
    beforeEach(() => {
      store = createStore({
        modules: {
          vxg: createVxgVuexModule()
        }
      })
      
      vxg = new Vxg()
      vxg.connectStore(store)
      
      adapter = new StoreAdapter(vxg, store)
    })
    
    it('connects to store', () => {
      adapter.connect()
      expect(vxg._store).toBe(store)
    })
    
    it('gets component state', () => {
      store.commit('vxg/SET_COMPONENT_FLAGS', {
        name: 'test',
        flags: { show: true }
      })
      
      const state = adapter.getComponentState('test')
      expect(state).toEqual({ show: true })
    })
    
    it('sets component flags', () => {
      adapter.setComponentFlags('test', { show: true })
      expect(store.state.vxg.cmp['test']).toEqual({ show: true })
    })
    
    it('gets vxg state', () => {
      const state = adapter.getVxgState()
      expect(state).toBeDefined()
      expect(state.cmp).toBeDefined()
    })
    
    it('gets state by path', () => {
      store.commit('vxg/SET_VXG_STATE', {
        path: 'ent.meta.name',
        value: 'Test'
      })
      
      const value = adapter.getState('ent.meta.name')
      expect(value).toBe('Test')
    })
  })
  
  describe('Error Handling', () => {
    it('handles unknown store type gracefully', () => {
      const consoleWarn = vi.spyOn(console, 'warn')
      const vxg = new Vxg()
      const unknownStore = { unknown: true }
      
      vxg.connectStore(unknownStore)
      
      expect(consoleWarn).toHaveBeenCalledWith(
        '[Vxg] Unknown store type, store integration disabled'
      )
    })
    
    it('handles invalid match patterns', () => {
      const consoleWarn = vi.spyOn(console, 'warn')
      const vxg = new Vxg()
      
      // Test with invalid string
      const result = vxg.allow('{ invalid json')
      
      expect(result).toBe(false)
      expect(consoleWarn).toHaveBeenCalled()
    })
  })
})
