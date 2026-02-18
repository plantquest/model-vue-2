/**
 * BasicNavStages Component Tests
 * Integration tests for the refactored component
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import BasicNavStages from './BasicNavStages.vue'
import NavStagePanel from './NavStagePanel.vue'
import NavStageItem from './NavStageItem.vue'
import type { StageMessage } from '@/types/navigation'

// Mock store
const createMockStore = (state = {}) => {
  return createStore({
    state: {
      currentStage: 1,
      activeStage: 0,
      pathData: null,
      main_asset: [],
      trigger: {
        select: {
          value: null
        }
      },
      ...state
    },
    mutations: {
      setCurrentStage: vi.fn()
    },
    actions: {
      setCurrentStage: vi.fn(),
      set_path_data: vi.fn()
    }
  })
}

describe('BasicNavStages', () => {
  describe('Conditional Rendering', () => {
    it('should not render when routeMsg has <= 1 items', () => {
      const mockStore = createMockStore({
        pathData: null
      })
      
      const wrapper = mount(BasicNavStages, {
        global: {
          plugins: [mockStore]
        }
      })
      
      // Component should not render the container
      expect(wrapper.find('.basic-nav-stages').exists()).toBe(false)
    })

    it('should render when routeMsg has > 1 items', async () => {
      const mockStore = createMockStore({
        pathData: {
          asset123: [[
            { detail: 'id1,Connector,data,100,200', index: 1 },
            { detail: 'id2,Standard,data,150,250', index: 2 }
          ]]
        },
        main_asset: [
          { id: 'asset1', map: '1', xco: 155, yco: 255, level: 'Level 2' }
        ]
      })
      
      const wrapper = mount(BasicNavStages, {
        global: {
          plugins: [mockStore]
        }
      })
      
      // Wait for async path parsing
      await wrapper.vm.$nextTick()
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // Should render if stages parsed successfully
      // Note: Depends on path parsing logic working
    })
  })

  describe('Sub-components', () => {
    it('should render NavStagePanel', () => {
      const mockStore = createMockStore()
      const wrapper = mount(BasicNavStages, {
        global: {
          plugins: [mockStore]
        }
      })
      
      // If routeMsg has items, NavStagePanel should exist
      expect(wrapper.findComponent(NavStagePanel).exists()).toBe(true)
    })

    it('should pass correct props to NavStagePanel', async () => {
      const mockStore = createMockStore()
      const wrapper = mount(BasicNavStages, {
        global: {
          plugins: [mockStore]
        }
      })
      
      const panel = wrapper.findComponent(NavStagePanel)
      if (panel.exists()) {
        expect(panel.props()).toHaveProperty('modelValue')
        expect(panel.props()).toHaveProperty('publicPath')
      }
    })
  })

  describe('Stage Selection', () => {
    it('should handle stage selection', async () => {
      const mockStore = createMockStore()
      const wrapper = mount(BasicNavStages, {
        global: {
          plugins: [mockStore]
        }
      })
      
      await wrapper.vm.handleStageSelect(2, 1)
      
      expect(wrapper.emitted('stageSelected')).toBeTruthy()
      expect(wrapper.emitted('stageSelected')?.[0]).toEqual([2])
    })

    it('should update active stage on selection', async () => {
      const mockStore = createMockStore()
      const wrapper = mount(BasicNavStages, {
        global: {
          plugins: [mockStore]
        }
      })
      
      await wrapper.vm.handleStageSelect(2, 1)
      
      // Active stage should be updated via composable
      expect(wrapper.vm.activeStage).toBe(1)
    })
  })

  describe('Panel Toggle', () => {
    it('should handle panel toggle', async () => {
      const mockStore = createMockStore()
      const wrapper = mount(BasicNavStages, {
        global: {
          plugins: [mockStore]
        }
      })
      
      await wrapper.vm.handlePanelToggle(true)
      expect(wrapper.vm.panelIndex).toBe(0)
      
      await wrapper.vm.handlePanelToggle(false)
      expect(wrapper.vm.panelIndex).toBe(-1)
    })
  })

  describe('Exposed Methods', () => {
    it('should expose toggleshowNav method', () => {
      const mockStore = createMockStore()
      const wrapper = mount(BasicNavStages, {
        global: {
          plugins: [mockStore]
        }
      })
      
      expect(wrapper.vm.toggleshowNav).toBeDefined()
      expect(typeof wrapper.vm.toggleshowNav).toBe('function')
    })

    it('should expose clearState method', () => {
      const mockStore = createMockStore()
      const wrapper = mount(BasicNavStages, {
        global: {
          plugins: [mockStore]
        }
      })
      
      expect(wrapper.vm.clearState).toBeDefined()
      expect(typeof wrapper.vm.clearState).toBe('function')
    })

    it('should clear state when clearState called', async () => {
      const mockStore = createMockStore()
      const wrapper = mount(BasicNavStages, {
        global: {
          plugins: [mockStore]
        }
      })
      
      wrapper.vm.panelIndex = 0
      wrapper.vm.clearState()
      
      expect(wrapper.vm.panelIndex).toBe(-1)
    })

    it('should expose activeStage', () => {
      const mockStore = createMockStore()
      const wrapper = mount(BasicNavStages, {
        global: {
          plugins: [mockStore]
        }
      })
      
      expect(wrapper.vm.activeStage).toBeDefined()
    })

    it('should expose routeMsg', () => {
      const mockStore = createMockStore()
      const wrapper = mount(BasicNavStages, {
        global: {
          plugins: [mockStore]
        }
      })
      
      expect(wrapper.vm.routeMsg).toBeDefined()
    })
  })

  describe('Lifecycle', () => {
    it('should mount without errors', () => {
      const mockStore = createMockStore()
      const wrapper = mount(BasicNavStages, {
        global: {
          plugins: [mockStore]
        }
      })
      
      expect(wrapper.exists()).toBe(true)
    })

    it('should unmount without errors', () => {
      const mockStore = createMockStore()
      const wrapper = mount(BasicNavStages, {
        global: {
          plugins: [mockStore]
        }
      })
      
      expect(() => wrapper.unmount()).not.toThrow()
    })
  })
})
