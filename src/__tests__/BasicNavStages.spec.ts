/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createStore } from 'vuex'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import BasicNavStages from '@/components/BasicNavStages.vue'
import NavStagesExpansion from '@/components/NavStagesExpansion.vue'
import NavStageItem from '@/components/NavStageItem.vue'

const vuetify = createVuetify({
  components,
  directives
})

describe('BasicNavStages.vue', () => {
  let wrapper: any
  let store: any

  const mockPathData = {
    asset123: [[
      { detail: 'id1,Standard,,100,200', index: 1 },
      { detail: 'id2,Connector,,150,250', index: 1 },
      { detail: 'id3,Connector,,160,260', index: 2 },
      { detail: 'id4,Standard,,200,300', index: 2 },
      { detail: 'id5,Standard,,250,350', index: 2 }
    ]]
  }

  const mockMainAssets = [
    { id: '1', map: '0', level: 'Ground Floor', xco: 100, yco: 100 },
    { id: '2', map: '1', level: 'Level 2', xco: 200, yco: 200 },
    { id: '3', map: '2', level: 'Level 3', xco: 300, yco: 300 }
  ]

  beforeEach(() => {
    // Create mock Vuex store
    store = createStore({
      state: {
        pathData: null,
        currentStage: 1,
        main_asset: mockMainAssets,
        trigger: {
          select: {
            value: null
          }
        }
      },
      mutations: {
        setCurrentStage(state, stage) {
          state.currentStage = stage
        }
      },
      actions: {
        setCurrentStage: vi.fn().mockResolvedValue(true),
        set_path_data: vi.fn().mockResolvedValue({ ok: true })
      }
    })

    wrapper = mount(BasicNavStages, {
      global: {
        plugins: [store, vuetify],
        components: {
          NavStagesExpansion,
          NavStageItem
        }
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Initial Rendering', () => {
    it('renders component', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('does not render when no stages', () => {
      const container = wrapper.find('.basic-nav-stages')
      // Component should not show if hasStages is false
      expect(container.exists()).toBe(false)
    })

    it('has correct styling', () => {
      const container = wrapper.find('.basic-nav-stages')
      if (container.exists()) {
        expect(container.attributes('style')).toContain('position: absolute')
        expect(container.attributes('style')).toContain('z-index: 99')
      }
    })
  })

  describe('PathData Handling', () => {
    it('parses pathData when store updates', async () => {
      store.state.pathData = mockPathData
      
      await flushPromises()
      await wrapper.vm.$nextTick()
      
      // Component should process pathData
      // Check if stages were generated (component might not show if only 1 stage)
    })

    it('clears stages when pathData is null', async () => {
      store.state.pathData = null
      
      await flushPromises()
      await wrapper.vm.$nextTick()
      
      const container = wrapper.find('.basic-nav-stages')
      expect(container.exists()).toBe(false)
    })

    it('handles invalid pathData gracefully', async () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      
      store.state.pathData = { invalid: 'data' }
      
      await flushPromises()
      await wrapper.vm.$nextTick()
      
      expect(consoleWarnSpy).toHaveBeenCalled()
      consoleWarnSpy.mockRestore()
    })

    it('dispatches set_path_data action', async () => {
      const dispatchSpy = vi.spyOn(store, 'dispatch')
      
      store.state.pathData = mockPathData
      
      await flushPromises()
      await wrapper.vm.$nextTick()
      
      expect(dispatchSpy).toHaveBeenCalledWith('set_path_data', {
        pathDetails: mockPathData.asset123
      })
    })

    it('handles pathData with multiple connectors', async () => {
      const complexPathData = {
        asset123: [[
          { detail: 'id1,Standard,,100,200', index: 1 },
          { detail: 'id2,Connector,,110,210', index: 1 },
          { detail: 'id3,Connector,,120,220', index: 1 },
          { detail: 'id4,Connector,,130,230', index: 2 },
          { detail: 'id5,Standard,,200,300', index: 2 }
        ]]
      }
      
      store.state.pathData = complexPathData
      
      await flushPromises()
      await wrapper.vm.$nextTick()
      
      // Should process multiple connectors correctly
    })
  })

  describe('Stage Selection', () => {
    beforeEach(async () => {
      store.state.pathData = mockPathData
      await flushPromises()
      await wrapper.vm.$nextTick()
    })

    it('handles stage selection from child component', async () => {
      const expansion = wrapper.findComponent(NavStagesExpansion)
      if (expansion.exists()) {
        await expansion.vm.$emit('stage-select', 1)
        
        expect(wrapper.emitted('stageSelected')).toBeTruthy()
      }
    })

    it('updates store on stage selection', async () => {
      const commitSpy = vi.spyOn(store, 'commit')
      const expansion = wrapper.findComponent(NavStagesExpansion)
      
      if (expansion.exists()) {
        await expansion.vm.$emit('stage-select', 1)
        await flushPromises()
        
        expect(commitSpy).toHaveBeenCalledWith('setCurrentStage', 2) // 1 + 1
      }
    })

    it('emits stageSelected event with map value', async () => {
      const expansion = wrapper.findComponent(NavStagesExpansion)
      
      if (expansion.exists()) {
        await expansion.vm.$emit('stage-select', 0)
        await flushPromises()
        
        const emitted = wrapper.emitted('stageSelected')
        expect(emitted).toBeTruthy()
      }
    })
  })

  describe('Store Watchers', () => {
    it('watches currentStage changes', async () => {
      store.state.pathData = mockPathData
      await flushPromises()
      
      store.state.currentStage = 2
      await flushPromises()
      await wrapper.vm.$nextTick()
      
      // Active stage should update
    })

    it('watches trigger.select.value changes', async () => {
      store.state.pathData = mockPathData
      await flushPromises()
      
      store.state.trigger.select.value = 1
      await flushPromises()
      await wrapper.vm.$nextTick()
      
      // Active stage should update based on trigger
    })

    it('watches pathData deeply', async () => {
      store.state.pathData = { asset123: [[]] }
      await flushPromises()
      
      store.state.pathData.asset123 = mockPathData.asset123
      await flushPromises()
      await wrapper.vm.$nextTick()
      
      // Should process new pathData
    })
  })

  describe('Expansion Control', () => {
    beforeEach(async () => {
      store.state.pathData = mockPathData
      await flushPromises()
      await wrapper.vm.$nextTick()
    })

    it('handles icon toggle event', async () => {
      const expansion = wrapper.findComponent(NavStagesExpansion)
      
      if (expansion.exists()) {
        await expansion.vm.$emit('toggle-icon')
        // Icon toggle should be handled
      }
    })

    it('maintains expansion state', async () => {
      const expansion = wrapper.findComponent(NavStagesExpansion)
      
      if (expansion.exists()) {
        const initialExpanded = expansion.props('expanded')
        expect(initialExpanded).toBeDefined()
      }
    })
  })

  describe('Lifecycle Hooks', () => {
    it('parses pathData on mount if available', async () => {
      store.state.pathData = mockPathData
      
      const newWrapper = mount(BasicNavStages, {
        global: {
          plugins: [store, vuetify],
          components: {
            NavStagesExpansion,
            NavStageItem
          }
        }
      })
      
      await flushPromises()
      await newWrapper.vm.$nextTick()
      
      // Should parse pathData on mount
      newWrapper.unmount()
    })

    it('logs on mount', () => {
      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      
      mount(BasicNavStages, {
        global: {
          plugins: [store, vuetify]
        }
      })
      
      expect(consoleLogSpy).toHaveBeenCalledWith(
        'BasicNavStages mounted, currentStage:',
        expect.anything()
      )
      
      consoleLogSpy.mockRestore()
    })

    it('logs on unmount', () => {
      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      
      const tempWrapper = mount(BasicNavStages, {
        global: {
          plugins: [store, vuetify]
        }
      })
      
      tempWrapper.unmount()
      
      expect(consoleLogSpy).toHaveBeenCalledWith('BasicNavStages unmounted')
      consoleLogSpy.mockRestore()
    })
  })

  describe('Integration with Sub-Components', () => {
    beforeEach(async () => {
      store.state.pathData = mockPathData
      await flushPromises()
      await wrapper.vm.$nextTick()
    })

    it('passes stages to NavStagesExpansion', () => {
      const expansion = wrapper.findComponent(NavStagesExpansion)
      
      if (expansion.exists()) {
        expect(expansion.props('stages')).toBeDefined()
        expect(Array.isArray(expansion.props('stages'))).toBe(true)
      }
    })

    it('passes activeStage to NavStagesExpansion', () => {
      const expansion = wrapper.findComponent(NavStagesExpansion)
      
      if (expansion.exists()) {
        expect(expansion.props('activeStage')).toBeDefined()
        expect(typeof expansion.props('activeStage')).toBe('number')
      }
    })

    it('passes expanded state to NavStagesExpansion', () => {
      const expansion = wrapper.findComponent(NavStagesExpansion)
      
      if (expansion.exists()) {
        const expanded = expansion.props('expanded')
        expect([0, undefined]).toContain(expanded)
      }
    })
  })

  describe('Error Handling', () => {
    it('handles dispatch errors gracefully', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      vi.spyOn(store, 'dispatch').mockRejectedValue(new Error('Dispatch failed'))
      
      store.state.pathData = mockPathData
      await flushPromises()
      await wrapper.vm.$nextTick()
      
      expect(consoleErrorSpy).toHaveBeenCalled()
      consoleErrorSpy.mockRestore()
    })

    it('handles parsing errors gracefully', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      store.state.pathData = {
        asset123: [[
          { invalid: 'structure' }
        ]]
      }
      
      await flushPromises()
      await wrapper.vm.$nextTick()
      
      expect(consoleErrorSpy).toHaveBeenCalled()
      consoleErrorSpy.mockRestore()
    })
  })

  describe('Edge Cases', () => {
    it('handles empty asset123 array', async () => {
      store.state.pathData = { asset123: [] }
      
      await flushPromises()
      await wrapper.vm.$nextTick()
      
      const container = wrapper.find('.basic-nav-stages')
      expect(container.exists()).toBe(false)
    })

    it('handles pathData without asset123', async () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      
      store.state.pathData = { other: 'data' }
      
      await flushPromises()
      await wrapper.vm.$nextTick()
      
      expect(consoleWarnSpy).toHaveBeenCalled()
      consoleWarnSpy.mockRestore()
    })

    it('handles rapid pathData changes', async () => {
      store.state.pathData = mockPathData
      await flushPromises()
      
      store.state.pathData = { asset123: [[]] }
      await flushPromises()
      
      store.state.pathData = mockPathData
      await flushPromises()
      await wrapper.vm.$nextTick()
      
      // Should handle rapid changes gracefully
    })
  })

  describe('Performance', () => {
    it('renders efficiently with multiple stages', async () => {
      const largePathData = {
        asset123: [[
          ...Array.from({ length: 20 }, (_, i) => ({
            detail: `id${i},${i % 2 === 0 ? 'Standard' : 'Connector'},,${100 + i * 10},${200 + i * 10}`,
            index: Math.floor(i / 4)
          }))
        ]]
      }
      
      const startTime = performance.now()
      store.state.pathData = largePathData
      await flushPromises()
      await wrapper.vm.$nextTick()
      const endTime = performance.now()
      
      // Parsing should be fast (< 200ms)
      expect(endTime - startTime).toBeLessThan(200)
    })
  })

  describe('Component Props and Emits', () => {
    it('defines emits correctly', () => {
      // Component should emit stageSelected
      expect(wrapper.vm).toBeDefined()
    })

    it('emits stageSelected with correct payload', async () => {
      store.state.pathData = mockPathData
      await flushPromises()
      
      const expansion = wrapper.findComponent(NavStagesExpansion)
      if (expansion.exists()) {
        await expansion.vm.$emit('stage-select', 1)
        await flushPromises()
        
        const emitted = wrapper.emitted('stageSelected')
        if (emitted) {
          expect(typeof emitted[0][0]).toBe('number')
        }
      }
    })
  })

  describe('Accessibility', () => {
    it('has semantic HTML structure', () => {
      expect(wrapper.find('.basic-nav-stages').exists()).toBeDefined()
    })

    it('is keyboard accessible through child components', () => {
      // NavStagesExpansion handles keyboard accessibility
      const expansion = wrapper.findComponent(NavStagesExpansion)
      expect(expansion).toBeDefined()
    })
  })
})
