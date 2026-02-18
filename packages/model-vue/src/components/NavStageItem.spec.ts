/**
 * NavStageItem Component Tests
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NavStageItem from './NavStageItem.vue'
import type { StageMessage } from '@/types/navigation'

describe('NavStageItem', () => {
  const mockStage: StageMessage = {
    map: 2,
    msg: 'Follow route to stairs and proceed to Level 2'
  }

  describe('Props', () => {
    it('should render with required props', () => {
      const wrapper = mount(NavStageItem, {
        props: {
          stage: mockStage,
          index: 0,
          isActive: false
        }
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('should accept stage prop', () => {
      const wrapper = mount(NavStageItem, {
        props: {
          stage: mockStage,
          index: 0,
          isActive: false
        }
      })
      expect(wrapper.props('stage')).toEqual(mockStage)
    })

    it('should accept index prop', () => {
      const wrapper = mount(NavStageItem, {
        props: {
          stage: mockStage,
          index: 3,
          isActive: false
        }
      })
      expect(wrapper.props('index')).toBe(3)
    })

    it('should accept isActive prop', () => {
      const wrapper = mount(NavStageItem, {
        props: {
          stage: mockStage,
          index: 0,
          isActive: true
        }
      })
      expect(wrapper.props('isActive')).toBe(true)
    })
  })

  describe('Rendering', () => {
    it('should display stage number (1-indexed)', () => {
      const wrapper = mount(NavStageItem, {
        props: {
          stage: mockStage,
          index: 0,
          isActive: false
        }
      })
      expect(wrapper.text()).toContain('STAGE 1')
    })

    it('should display correct stage number for index 2', () => {
      const wrapper = mount(NavStageItem, {
        props: {
          stage: mockStage,
          index: 2,
          isActive: false
        }
      })
      expect(wrapper.text()).toContain('STAGE 3')
    })

    it('should display stage message', () => {
      const wrapper = mount(NavStageItem, {
        props: {
          stage: mockStage,
          index: 0,
          isActive: false
        }
      })
      expect(wrapper.text()).toContain('Follow route to stairs')
    })

    it('should have stage class', () => {
      const wrapper = mount(NavStageItem, {
        props: {
          stage: mockStage,
          index: 0,
          isActive: false
        }
      })
      expect(wrapper.classes()).toContain('stage')
    })

    it('should have activated class when active', () => {
      const wrapper = mount(NavStageItem, {
        props: {
          stage: mockStage,
          index: 0,
          isActive: true
        }
      })
      expect(wrapper.classes()).toContain('activated')
    })

    it('should not have activated class when inactive', () => {
      const wrapper = mount(NavStageItem, {
        props: {
          stage: mockStage,
          index: 0,
          isActive: false
        }
      })
      expect(wrapper.classes()).not.toContain('activated')
    })
  })

  describe('Interaction', () => {
    it('should emit select event on click', async () => {
      const wrapper = mount(NavStageItem, {
        props: {
          stage: mockStage,
          index: 2,
          isActive: false
        }
      })
      
      await wrapper.trigger('click')
      
      expect(wrapper.emitted('select')).toBeTruthy()
    })

    it('should emit correct parameters on click', async () => {
      const wrapper = mount(NavStageItem, {
        props: {
          stage: mockStage,
          index: 2,
          isActive: false
        }
      })
      
      await wrapper.trigger('click')
      
      const emitted = wrapper.emitted('select')
      expect(emitted).toBeTruthy()
      expect(emitted?.[0]).toEqual([2, 2]) // [map, index]
    })

    it('should be clickable', async () => {
      const wrapper = mount(NavStageItem, {
        props: {
          stage: mockStage,
          index: 0,
          isActive: false
        }
      })
      
      const clickable = wrapper.find('.stage')
      expect(clickable.exists()).toBe(true)
      
      await clickable.trigger('click')
      expect(wrapper.emitted('select')).toBeTruthy()
    })
  })

  describe('Stage Number Computation', () => {
    it('should compute stage number correctly', () => {
      const wrapper = mount(NavStageItem, {
        props: {
          stage: mockStage,
          index: 0,
          isActive: false
        }
      })
      expect(wrapper.vm.stageNumber).toBe(1)
    })

    it('should handle various indices', () => {
      for (let i = 0; i < 10; i++) {
        const wrapper = mount(NavStageItem, {
          props: {
            stage: mockStage,
            index: i,
            isActive: false
          }
        })
        expect(wrapper.vm.stageNumber).toBe(i + 1)
      }
    })
  })
})
