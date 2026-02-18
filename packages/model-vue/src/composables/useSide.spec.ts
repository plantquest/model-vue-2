/**
 * Tests for useSide composable
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createStore } from 'vuex'
import { useSide, useSideSearch } from '@/composables/useSide'

describe('useSide', () => {
  let store: any

  beforeEach(() => {
    store = createStore({
      state: {
        vxg: {
          cmp: {
            BasicSide: {
              show: false,
              content: null
            }
          }
        }
      },
      actions: {
        set_cmp_flags: vi.fn()
      },
      mutations: {
        toggleSearch2: vi.fn(),
        clear_path_data: vi.fn(),
        clearMatchingConnectorData: vi.fn()
      }
    })
  })

  it('returns isOpen as false when drawer is closed', () => {
    const { isOpen } = useSide()
    expect(isOpen.value).toBe(false)
  })

  it('returns isOpen as true when drawer is open', () => {
    store.state.vxg.cmp.BasicSide.show = true
    const { isOpen } = useSide()
    expect(isOpen.value).toBe(true)
  })

  it('returns drawer content', () => {
    const content = { type: 'test', data: 'content' }
    store.state.vxg.cmp.BasicSide.content = content
    const { content: drawerContent } = useSide()
    expect(drawerContent.value).toEqual(content)
  })

  it('toggles drawer open/close', async () => {
    const { toggle } = useSide()
    
    await toggle(true)
    
    expect(store._actions.set_cmp_flags).toHaveBeenCalledWith(
      expect.any(Object),
      {
        name: 'BasicSide',
        flags: { show: true }
      }
    )
  })

  it('opens drawer', async () => {
    const { open } = useSide()
    
    await open()
    
    expect(store._actions.set_cmp_flags).toHaveBeenCalledWith(
      expect.any(Object),
      {
        name: 'BasicSide',
        flags: { show: true }
      }
    )
  })

  it('closes drawer', async () => {
    const { close } = useSide()
    
    await close()
    
    expect(store._actions.set_cmp_flags).toHaveBeenCalledWith(
      expect.any(Object),
      {
        name: 'BasicSide',
        flags: { show: false }
      }
    )
  })

  it('sets drawer content', async () => {
    const { setContent } = useSide()
    const content = { type: 'test', data: 'new content' }
    
    await setContent(content)
    
    expect(store._actions.set_cmp_flags).toHaveBeenCalledWith(
      expect.any(Object),
      {
        name: 'BasicSide',
        flags: { content }
      }
    )
  })

  it('closes drawer on mobile viewport', () => {
    const { handleResize } = useSide()
    
    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 800
    })
    
    handleResize()
    
    expect(store._actions.set_cmp_flags).toHaveBeenCalledWith(
      expect.any(Object),
      {
        name: 'BasicSide',
        flags: { show: false }
      }
    )
  })

  it('keeps drawer open on desktop viewport', () => {
    const { handleResize } = useSide()
    
    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200
    })
    
    store._actions.set_cmp_flags.mockClear()
    handleResize()
    
    // Should not close drawer on desktop
    expect(store._actions.set_cmp_flags).not.toHaveBeenCalled()
  })
})

describe('useSideSearch', () => {
  let store: any

  beforeEach(() => {
    store = createStore({
      state: {
        showSearch2: false,
        showExpansion: true,
        pathData: null,
        trigger: {
          search: {
            a: '',
            b: ''
          }
        }
      },
      mutations: {
        toggleSearch2: vi.fn(),
        clear_path_data: vi.fn(),
        clearMatchingConnectorData: vi.fn(),
        setCurrentStage: vi.fn()
      },
      actions: {
        vxg_trigger_clear: vi.fn(),
        setLastTrackedSearch: vi.fn(),
        clear_path_data: vi.fn(),
        vxg_get_assets: vi.fn(),
        set_cmp_flags: vi.fn()
      }
    })
  })

  it('initializes search state', () => {
    const { search, search2, showSearch2 } = useSideSearch()
    expect(search.value).toBe('')
    expect(search2.value).toBe('')
    expect(showSearch2.value).toBe(false)
  })

  it('toggles navigation search mode', () => {
    const { toggleSearch2 } = useSideSearch()
    
    toggleSearch2()
    
    expect(store._mutations.toggleSearch2).toHaveBeenCalled()
  })

  it('clears search filters', () => {
    const { clearFilter, search, search2 } = useSideSearch()
    
    search.value = 'test search'
    search2.value = 'test search 2'
    
    clearFilter()
    
    expect(store._actions.vxg_trigger_clear).toHaveBeenCalled()
    expect(search.value).toBe('')
    expect(search2.value).toBe('')
  })

  it('reverses search inputs', () => {
    const { reverseInputs, search, search2, toggleSearch2: toggle } = useSideSearch()
    
    search.value = 'source'
    search2.value = 'destination'
    
    reverseInputs()
    
    expect(search.value).toBe('destination')
    expect(search2.value).toBe('source')
  })

  it('loads assets', async () => {
    const { loadAssets } = useSideSearch()
    
    const mockAssets = [
      { id: '1', tag: 'Asset 1' },
      { id: '2', tag: 'Asset 2' }
    ]
    
    store._actions.vxg_get_assets.mockImplementation((context: any, tool: any) => {
      tool.assets = mockAssets
      return Promise.resolve()
    })
    
    const assets = await loadAssets()
    
    expect(store._actions.vxg_get_assets).toHaveBeenCalled()
    expect(assets).toEqual(mockAssets)
  })
})
