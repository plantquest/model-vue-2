/**
 * Tests for useHeadActions composable
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createStore } from 'vuex'
import { useHeadActions } from '@/composables/useHeadActions'

describe('useHeadActions', () => {
  let store: any

  beforeEach(() => {
    store = createStore({
      state: {},
      actions: {
        trigger_led_add: vi.fn().mockResolvedValue(undefined),
        trigger_led_add_mobile: vi.fn().mockResolvedValue(undefined),
        trigger_led_remove: vi.fn().mockResolvedValue(undefined),
        vxg_trigger_printMap: vi.fn().mockResolvedValue(undefined),
        vxg_trigger_collect: vi.fn().mockResolvedValue(undefined),
        adjust_trigger_bookmark: vi.fn().mockResolvedValue(undefined),
        vxg_trigger_go: vi.fn().mockResolvedValue(undefined),
        vxg_trigger_clear: vi.fn().mockResolvedValue(undefined),
        trigger_toggle_filter: vi.fn().mockResolvedValue(undefined)
      }
    })
  })

  it('dispatches add item action', () => {
    const { addItem } = useHeadActions(store)
    
    addItem()
    
    expect(store.dispatch).toHaveBeenCalledWith('trigger_led_add')
  })

  it('dispatches add mobile asset action', () => {
    const { addMobileAsset } = useHeadActions(store)
    
    addMobileAsset()
    
    expect(store.dispatch).toHaveBeenCalledWith('trigger_led_add_mobile')
  })

  it('dispatches remove item action', () => {
    const { removeItem } = useHeadActions(store)
    
    removeItem()
    
    expect(store.dispatch).toHaveBeenCalledWith('trigger_led_remove')
  })

  it('dispatches print action', () => {
    const { print } = useHeadActions(store)
    
    print()
    
    expect(store.dispatch).toHaveBeenCalledWith('vxg_trigger_printMap')
  })

  it('dispatches collect action', () => {
    const { collect } = useHeadActions(store)
    
    collect()
    
    expect(store.dispatch).toHaveBeenCalledWith('vxg_trigger_collect')
  })

  it('dispatches show tags action', () => {
    const { showTags } = useHeadActions(store)
    
    showTags()
    
    expect(store.dispatch).toHaveBeenCalledWith('adjust_trigger_bookmark')
  })

  it('dispatches filter assets action', () => {
    const { filterAssets } = useHeadActions(store)
    
    filterAssets()
    
    expect(store.dispatch).toHaveBeenCalledWith('vxg_trigger_go')
  })

  it('dispatches clear filter action', () => {
    const { clearFilter } = useHeadActions(store)
    
    clearFilter()
    
    expect(store.dispatch).toHaveBeenCalledWith('vxg_trigger_clear')
  })

  it('dispatches toggle filter action', () => {
    const { toggleFilter } = useHeadActions(store)
    
    toggleFilter()
    
    expect(store.dispatch).toHaveBeenCalledWith('trigger_toggle_filter')
  })

  it('handles action dispatch errors gracefully', async () => {
    store.actions.trigger_led_add = vi.fn().mockRejectedValue(new Error('Action failed'))
    
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const { addItem } = useHeadActions(store)
    
    addItem()
    
    // Wait for promise to reject
    await new Promise(resolve => setTimeout(resolve, 10))
    
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      '[useHeadActions] Add item error:',
      expect.any(Error)
    )
    
    consoleErrorSpy.mockRestore()
  })
})
