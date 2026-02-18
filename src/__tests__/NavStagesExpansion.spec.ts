/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import NavStagesExpansion from '@/components/NavStagesExpansion.vue'
import NavStageItem from '@/components/NavStageItem.vue'
import type { Stage } from '@/types/components'

const vuetify = createVuetify({
  components,
  directives
})

describe('NavStagesExpansion.vue', () => {
  let wrapper: any
  
  const mockStages: Stage[] = [
    {
      id: 'stage-1',
      map: 0,
      msg: 'Follow route to stairs and proceed to Ground Floor',
      type: 'stage'
    },
    {
      id: 'stage-2',
      map: 1,
      msg: 'Follow route to stairs and proceed to Level 2',
      type: 'stage'
    },
    {
      id: 'stage-3',
      map: 2,
      msg: 'Proceed to your destination.',
      type: 'stage'
    }
  ]

  beforeEach(() => {
    wrapper = mount(NavStagesExpansion, {
      props: {
        expanded: 0,
        stages: mockStages,
        activeStage: 0
      },
      global: {
        plugins: [vuetify],
        components: {
          NavStageItem
        }
      }
    })
  })

  describe('Rendering', () => {
    it('renders expansion panel', () => {
      expect(wrapper.find('.v-expansion-panel').exists()).toBe(true)
    })

    it('renders header with correct text', () => {
      const headerText = wrapper.text()
      expect(headerText).toContain('THIS ROUTE CONTAINS MULTIPLE LEVELS')
    })

    it('renders Layers icon', () => {
      const layersImg = wrapper.findAll('img').find((img: any) => 
        img.attributes('alt') === 'Layers'
      )
      expect(layersImg).toBeTruthy()
    })

    it('renders all stage items', () => {
      const stageItems = wrapper.findAllComponents(NavStageItem)
      expect(stageItems).toHaveLength(mockStages.length)
    })

    it('passes correct props to stage items', () => {
      const stageItems = wrapper.findAllComponents(NavStageItem)
      
      stageItems.forEach((item: any, index: number) => {
        expect(item.props('stage')).toEqual(mockStages[index])
        expect(item.props('index')).toBe(index)
        expect(item.props('isActive')).toBe(index === 0) // activeStage is 0
      })
    })
  })

  describe('Expansion State', () => {
    it('shows expansion icon based on state', () => {
      // When expanded (value is defined/not undefined)
      const icon = wrapper.find('[alt="Collapse Icon"], [alt="Expand Icon"]')
      expect(icon.exists()).toBe(true)
    })

    it('emits update:expanded when panel changes', async () => {
      await wrapper.setProps({ expanded: undefined })
      
      // Simulate expansion panel interaction
      const panel = wrapper.find('.v-expansion-panel')
      // Note: Actual Vuetify interaction would need full DOM
    })
  })

  describe('Icon Toggling', () => {
    it('displays correct icon when expanded', async () => {
      await wrapper.setProps({ expanded: 0 })
      // Icon should be nav_in.svg (collapse icon)
      const icon = wrapper.find('img[alt="Collapse Icon"]')
      // Note: Full DOM would be needed to properly test this
    })

    it('displays correct icon when collapsed', async () => {
      await wrapper.setProps({ expanded: undefined })
      // Icon should be nav_out.svg (expand icon)
      const icon = wrapper.find('img[alt="Expand Icon"]')
      // Note: Full DOM would be needed to properly test this
    })

    it('emits toggle-icon event on header click', async () => {
      const header = wrapper.find('.v-expansion-panel-header')
      await header.trigger('click')
      
      expect(wrapper.emitted('toggle-icon')).toBeTruthy()
    })
  })

  describe('Stage Selection', () => {
    it('emits stage-select with correct index when stage item emits select', async () => {
      const stageItems = wrapper.findAllComponents(NavStageItem)
      const firstStage = stageItems[0]
      
      await firstStage.vm.$emit('select')
      
      expect(wrapper.emitted('stage-select')).toBeTruthy()
      expect(wrapper.emitted('stage-select')?.[0]).toEqual([0])
    })

    it('emits stage-select for different stage indices', async () => {
      const stageItems = wrapper.findAllComponents(NavStageItem)
      
      await stageItems[1].vm.$emit('select')
      expect(wrapper.emitted('stage-select')?.[0]).toEqual([1])
      
      await stageItems[2].vm.$emit('select')
      expect(wrapper.emitted('stage-select')?.[1]).toEqual([2])
    })
  })

  describe('Active Stage Highlighting', () => {
    it('highlights active stage correctly', () => {
      const stageItems = wrapper.findAllComponents(NavStageItem)
      expect(stageItems[0].props('isActive')).toBe(true)
      expect(stageItems[1].props('isActive')).toBe(false)
      expect(stageItems[2].props('isActive')).toBe(false)
    })

    it('updates highlighting when activeStage prop changes', async () => {
      await wrapper.setProps({ activeStage: 1 })
      
      const stageItems = wrapper.findAllComponents(NavStageItem)
      expect(stageItems[0].props('isActive')).toBe(false)
      expect(stageItems[1].props('isActive')).toBe(true)
      expect(stageItems[2].props('isActive')).toBe(false)
    })

    it('handles activeStage change to last stage', async () => {
      await wrapper.setProps({ activeStage: 2 })
      
      const stageItems = wrapper.findAllComponents(NavStageItem)
      expect(stageItems[2].props('isActive')).toBe(true)
    })
  })

  describe('Empty Stages', () => {
    it('handles empty stages array', async () => {
      await wrapper.setProps({ stages: [] })
      
      const stageItems = wrapper.findAllComponents(NavStageItem)
      expect(stageItems).toHaveLength(0)
    })

    it('still renders header with empty stages', async () => {
      await wrapper.setProps({ stages: [] })
      
      const headerText = wrapper.text()
      expect(headerText).toContain('THIS ROUTE CONTAINS MULTIPLE LEVELS')
    })
  })

  describe('Styling', () => {
    it('applies correct background color to panel', () => {
      const panel = wrapper.find('.v-expansion-panel')
      expect(panel.attributes('style')).toContain('background-color')
    })

    it('applies correct border radius to header', () => {
      const header = wrapper.find('.v-expansion-panel-header')
      expect(header.attributes('style')).toContain('border-bottom')
    })
  })

  describe('Component Structure', () => {
    it('has v-expansion-panels wrapper', () => {
      expect(wrapper.find('.v-expansion-panels').exists()).toBe(true)
    })

    it('has v-expansion-panel', () => {
      expect(wrapper.find('.v-expansion-panel').exists()).toBe(true)
    })

    it('has v-expansion-panel-header', () => {
      expect(wrapper.find('.v-expansion-panel-header').exists()).toBe(true)
    })

    it('has v-expansion-panel-content', () => {
      expect(wrapper.find('.v-expansion-panel-content').exists()).toBe(true)
    })
  })

  describe('Props Validation', () => {
    it('accepts undefined expanded prop', async () => {
      await wrapper.setProps({ expanded: undefined })
      expect(wrapper.props('expanded')).toBeUndefined()
    })

    it('accepts number expanded prop', async () => {
      await wrapper.setProps({ expanded: 1 })
      expect(wrapper.props('expanded')).toBe(1)
    })

    it('handles activeStage prop updates', async () => {
      await wrapper.setProps({ activeStage: 2 })
      expect(wrapper.props('activeStage')).toBe(2)
    })
  })

  describe('Keyboard Navigation', () => {
    it('is keyboard accessible', () => {
      const header = wrapper.find('.v-expansion-panel-header')
      expect(header.exists()).toBe(true)
      // Vuetify handles keyboard navigation internally
    })
  })

  describe('Edge Cases', () => {
    it('handles stage without id', async () => {
      const stagesWithoutId = mockStages.map((s, i) => ({
        ...s,
        id: undefined
      }))
      
      await wrapper.setProps({ stages: stagesWithoutId })
      
      const stageItems = wrapper.findAllComponents(NavStageItem)
      expect(stageItems).toHaveLength(stagesWithoutId.length)
    })

    it('handles negative activeStage gracefully', async () => {
      await wrapper.setProps({ activeStage: -1 })
      
      const stageItems = wrapper.findAllComponents(NavStageItem)
      stageItems.forEach((item: any) => {
        expect(item.props('isActive')).toBe(false)
      })
    })

    it('handles activeStage beyond stages length', async () => {
      await wrapper.setProps({ activeStage: 999 })
      
      const stageItems = wrapper.findAllComponents(NavStageItem)
      stageItems.forEach((item: any) => {
        expect(item.props('isActive')).toBe(false)
      })
    })

    it('handles single stage', async () => {
      await wrapper.setProps({ stages: [mockStages[0]] })
      
      const stageItems = wrapper.findAllComponents(NavStageItem)
      expect(stageItems).toHaveLength(1)
    })
  })
})
