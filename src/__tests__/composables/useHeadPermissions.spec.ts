/**
 * Tests for useHeadPermissions composable
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createStore } from 'vuex'
import { useHeadPermissions } from '@/composables/useHeadPermissions'

describe('useHeadPermissions', () => {
  let store: any

  beforeEach(() => {
    store = createStore({
      state: {
        vxg: {
          cmp: {
            BasicHead: {
              allow: {
                add: true,
                remove: false,
                print: undefined
              },
              show: {
                add: true,
                remove: true,
                print: false
              }
            }
          }
        },
        trigger: {
          filter_disabled: {
            value: false
          },
          bookmark: {
            visible: true,
            value: false
          }
        }
      }
    })
  })

  it('returns true for allowed actions', () => {
    const { allow } = useHeadPermissions(store)
    
    expect(allow('add')).toBe(true)
  })

  it('returns false for disallowed actions', () => {
    const { allow } = useHeadPermissions(store)
    
    expect(allow('remove')).toBe(false)
  })

  it('defaults to true for undefined permissions', () => {
    const { allow } = useHeadPermissions(store)
    
    expect(allow('print')).toBe(true)
    expect(allow('nonexistent')).toBe(true)
  })

  it('show() combines allow() and visibility state', () => {
    const { show } = useHeadPermissions(store)
    
    // add: allowed=true, show=true → should be visible
    expect(show('add')).toBe(true)
    
    // remove: allowed=false, show=true → should not be visible
    expect(show('remove')).toBe(false)
    
    // print: allowed=true (default), show=false → should not be visible
    expect(show('print')).toBe(false)
  })

  it('filterDisabled computed reflects store state', () => {
    const { filterDisabled } = useHeadPermissions(store)
    
    expect(filterDisabled.value).toBe(false)
    
    store.state.trigger.filter_disabled.value = true
    expect(filterDisabled.value).toBe(true)
  })

  it('filterIcon computed reflects store state', () => {
    const { filterIcon } = useHeadPermissions(store)
    
    expect(filterIcon.value).toBe(false)
    
    store.state.vxg.cmp.BasicHead.show.filter = true
    expect(filterIcon.value).toBe(true)
  })

  it('bookmarkVisible computed reflects store state', () => {
    const { bookmarkVisible } = useHeadPermissions(store)
    
    expect(bookmarkVisible.value).toBe(true)
    
    store.state.trigger.bookmark.visible = false
    expect(bookmarkVisible.value).toBe(false)
  })

  it('bookmarkActive computed reflects store state', () => {
    const { bookmarkActive } = useHeadPermissions(store)
    
    expect(bookmarkActive.value).toBe(false)
    
    store.state.trigger.bookmark.value = true
    expect(bookmarkActive.value).toBe(true)
  })

  it('printDisabled defaults to false', () => {
    const { printDisabled } = useHeadPermissions(store)
    
    expect(printDisabled.value).toBe(false)
  })

  it('handles missing state gracefully', () => {
    store.state = {}
    
    const { allow, show, filterDisabled, bookmarkVisible } = useHeadPermissions(store)
    
    expect(allow('add')).toBe(true) // Defaults to true
    expect(show('add')).toBe(false) // No show state
    expect(filterDisabled.value).toBe(false)
    expect(bookmarkVisible.value).toBe(false)
  })
})
