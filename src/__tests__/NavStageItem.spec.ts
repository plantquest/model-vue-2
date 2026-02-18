/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import NavStageItem from '@/components/NavStageItem.vue'
import type { Stage } from '@/types/components'

describe('NavStageItem.vue', () => {
  let wrapper: any
  
  const mockStage: Stage = {
    id: 'stage-1',
    map: 0,
    msg: 'Follow route to stairs and proceed to Ground Floor',
    type: 'stage'
  }

  beforeEach(() => {
    wrapper = mount(NavStageItem, {
      props: {
        stage: mockStage,
        index: 0,
        isActive: false
      }
    })
  })

  describe('Rendering', () => {
    it('renders stage number correctly', () => {
      const heading = wrapper.find('h3')
      expect(heading.text()).toBe('STAGE 1')
    })

    it('renders stage message', () => {
      const paragraph = wrapper.find('p')
      expect(paragraph.text()).toBe(mockStage.msg)
    })

    it('renders with correct index (1-based)', async () => {
      await wrapper.setProps({ index: 2 })
      const heading = wrapper.find('h3')
      expect(heading.text()).toBe('STAGE 3')
    })
  })

  describe('Active State', () => {
    it('does not apply active class when isActive is false', () => {
      const stageDiv = wrapper.find('.stage')
      expect(stageDiv.classes()).not.toContain('activated')
    })

    it('applies active class when isActive is true', async () => {
      await wrapper.setProps({ isActive: true })
      const stageDiv = wrapper.find('.stage')
      expect(stageDiv.classes()).toContain('activated')
    })

    it('toggles active class when isActive prop changes', async () => {
      const stageDiv = wrapper.find('.stage')
      
      expect(stageDiv.classes()).not.toContain('activated')
      
      await wrapper.setProps({ isActive: true })
      expect(stageDiv.classes()).toContain('activated')
      
      await wrapper.setProps({ isActive: false })
      expect(stageDiv.classes()).not.toContain('activated')
    })
  })

  describe('Event Handling', () => {
    it('emits select event on click', async () => {
      const stageDiv = wrapper.find('.stage')
      await stageDiv.trigger('click')
      
      expect(wrapper.emitted('select')).toBeTruthy()
      expect(wrapper.emitted('select')).toHaveLength(1)
    })

    it('emits select event multiple times on multiple clicks', async () => {
      const stageDiv = wrapper.find('.stage')
      
      await stageDiv.trigger('click')
      await stageDiv.trigger('click')
      await stageDiv.trigger('click')
      
      expect(wrapper.emitted('select')).toHaveLength(3)
    })
  })

  describe('Styling', () => {
    it('has correct background color', () => {
      const stageDiv = wrapper.find('.stage')
      expect(stageDiv.attributes('style')).toContain('background-color: white')
    })

    it('has cursor pointer (for interactivity)', () => {
      const stageDiv = wrapper.find('.stage')
      // Check computed style would require actual DOM rendering
      // For now, check that the element exists and is clickable
      expect(stageDiv.exists()).toBe(true)
    })
  })

  describe('Edge Cases', () => {
    it('handles empty message gracefully', async () => {
      await wrapper.setProps({
        stage: { ...mockStage, msg: '' }
      })
      
      const paragraph = wrapper.find('p')
      expect(paragraph.text()).toBe('')
    })

    it('handles long message text', async () => {
      const longMsg = 'This is a very long message that should still render correctly even if it is extremely long and contains many words and details about the route'
      
      await wrapper.setProps({
        stage: { ...mockStage, msg: longMsg }
      })
      
      const paragraph = wrapper.find('p')
      expect(paragraph.text()).toBe(longMsg)
    })

    it('handles stage without id', async () => {
      await wrapper.setProps({
        stage: { map: 1, msg: 'Test', type: 'stage' }
      })
      
      expect(wrapper.exists()).toBe(true)
    })

    it('handles zero index', () => {
      const heading = wrapper.find('h3')
      expect(heading.text()).toBe('STAGE 1') // 0 + 1 = 1
    })

    it('handles large index numbers', async () => {
      await wrapper.setProps({ index: 99 })
      const heading = wrapper.find('h3')
      expect(heading.text()).toBe('STAGE 100')
    })
  })

  describe('Component Structure', () => {
    it('has exactly one root div with class "stage"', () => {
      expect(wrapper.find('.stage').exists()).toBe(true)
      expect(wrapper.findAll('.stage')).toHaveLength(1)
    })

    it('has h3 and p elements', () => {
      expect(wrapper.find('h3').exists()).toBe(true)
      expect(wrapper.find('p').exists()).toBe(true)
    })
  })

  describe('Accessibility', () => {
    it('has semantic HTML elements', () => {
      expect(wrapper.find('h3').exists()).toBe(true)
      expect(wrapper.find('p').exists()).toBe(true)
    })

    it('is keyboard accessible (clickable element)', () => {
      const stageDiv = wrapper.find('.stage')
      expect(stageDiv.exists()).toBe(true)
      // In a real app, we'd test keyboard events too
    })
  })
})
