/**
 * Tests for useHeadNavigation composable
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createStore } from 'vuex'
import { useHeadNavigation } from '@/composables/useHeadNavigation'

describe('useHeadNavigation', () => {
  let store: any

  beforeEach(() => {
    store = createStore({
      state: {
        vxg: {
          cmp: {
            BasicSide: {
              show: false
            },
            BasicMain: {
              show: true
            }
          }
        }
      },
      actions: {
        set_cmp_flags: vi.fn().mockResolvedValue(undefined)
      }
    })
  })

  it('drawerOpen reflects BasicSide.show state', () => {
    const { drawerOpen } = useHeadNavigation(store)
    
    expect(drawerOpen.value).toBe(false)
    
    store.state.vxg.cmp.BasicSide.show = true
    expect(drawerOpen.value).toBe(true)
  })

  it('detailOpen reflects inverted BasicMain.show state', () => {
    const { detailOpen } = useHeadNavigation(store)
    
    // BasicMain.show = true → detail is NOT open
    expect(detailOpen.value).toBe(false)
    
    // BasicMain.show = false → detail IS open
    store.state.vxg.cmp.BasicMain.show = false
    expect(detailOpen.value).toBe(true)
  })

  it('openDrawer dispatches set_cmp_flags for BasicSide', () => {
    const { openDrawer } = useHeadNavigation(store)
    
    openDrawer()
    
    expect(store.dispatch).toHaveBeenCalledWith('set_cmp_flags', {
      name: 'BasicSide',
      flags: { show: true }
    })
  })

  it('closeDetail dispatches set_cmp_flags for BasicMain', () => {
    const { closeDetail } = useHeadNavigation(store)
    
    closeDetail()
    
    expect(store.dispatch).toHaveBeenCalledWith('set_cmp_flags', {
      name: 'BasicMain',
      flags: { show: false }
    })
  })

  it('handles dispatch errors gracefully', async () => {
    store.actions.set_cmp_flags = vi.fn().mockRejectedValue(new Error('Dispatch failed'))
    
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const { openDrawer } = useHeadNavigation(store)
    
    openDrawer()
    
    // Wait for promise to reject
    await new Promise(resolve => setTimeout(resolve, 10))
    
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      '[useHeadNavigation] Open drawer error:',
      expect.any(Error)
    )
    
    consoleErrorSpy.mockRestore()
  })

  it('handles missing state gracefully', () => {
    store.state = {}
    
    const { drawerOpen, detailOpen } = useHeadNavigation(store)
    
    expect(drawerOpen.value).toBe(false)
    expect(detailOpen.value).toBe(true) // Inverted from undefined
  })
})
