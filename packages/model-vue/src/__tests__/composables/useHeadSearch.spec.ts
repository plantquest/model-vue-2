/**
 * Tests for useHeadSearch composable
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createStore } from 'vuex'
import { createRouter, createMemoryHistory } from 'vue-router'
import { useHeadSearch } from '@/composables/useHeadSearch'

describe('useHeadSearch', () => {
  let store: any
  let router: any
  let seneca: any
  let model: any

  beforeEach(() => {
    // Mock store
    store = createStore({
      state: {
        trigger: {
          search: {
            term: '',
            a: ''
          }
        }
      },
      actions: {
        vxg_get_assets: vi.fn().mockImplementation((context, tool) => {
          tool.assets = [
            { tag: 'ASSET001', custom12: 'Alias1' },
            { tag: 'ASSET002', custom12: null },
            { tag: 'ASSET003', custom12: 'Alias3' }
          ]
          return Promise.resolve()
        })
      }
    })

    // Mock router
    router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/assets', name: 'assets', component: { template: '<div>Assets</div>' } },
        { path: '/admin', name: 'admin', component: { template: '<div>Admin</div>' } }
      ]
    })

    // Mock seneca
    seneca = {
      post: vi.fn().mockImplementation((pattern, data) => {
        if (pattern === 'sys:search, cmd:add') {
          return Promise.resolve({ ok: true })
        }
        if (pattern === 'sys:search, cmd:search') {
          // Mock search results
          return Promise.resolve({
            data: {
              hits: [
                { doc: { tag: 'ASSET001', custom12: 'Alias1' }, score: 0.9 },
                { doc: { tag: 'ASSET003', custom12: 'Alias3' }, score: 0.8 }
              ]
            }
          })
        }
        return Promise.resolve({})
      })
    }

    // Mock model
    model = {
      main: {
        ux: {
          custom: {
            search_config: {
              fields: ['tag', 'custom12'],
              fuzzy: 0.2
            }
          }
        }
      }
    }
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('initializes with empty search and items', () => {
    const route = router.currentRoute.value
    const { search, tagItems, items } = useHeadSearch(store, router, route, seneca, model)

    expect(search.value).toBe('')
    expect(tagItems.value).toEqual([])
    expect(items.value).toEqual([])
  })

  it('loads assets and initializes MiniSearch', async () => {
    const route = router.currentRoute.value
    const { initializeAssetLoading, items, tagItems } = useHeadSearch(store, router, route, seneca, model)

    initializeAssetLoading()

    // Wait for interval to fire
    await new Promise(resolve => setTimeout(resolve, 150))

    expect(items.value.length).toBeGreaterThan(0)
    expect(tagItems.value).toContain('ASSET001(Alias1)')
    expect(tagItems.value).toContain('ASSET002')
    expect(tagItems.value).toContain('ASSET003(Alias3)')
    expect(seneca.post).toHaveBeenCalledWith('sys:search, cmd:add', expect.any(Object))
  })

  it('performs search and updates tag items', async () => {
    const route = router.currentRoute.value
    const { performSearch, tagItems } = useHeadSearch(store, router, route, seneca, model)

    await performSearch('ASSET')

    expect(seneca.post).toHaveBeenCalledWith('sys:search, cmd:search', {
      query: 'ASSET',
      params: model.main.ux.custom.search_config
    })
    expect(tagItems.value).toContain('ASSET001(Alias1)')
    expect(tagItems.value).toContain('ASSET003(Alias3)')
  })

  it('restores all items when search term is empty', async () => {
    const route = router.currentRoute.value
    const { performSearch, tagItems, items, initializeAssetLoading } = useHeadSearch(store, router, route, seneca, model)

    initializeAssetLoading()
    await new Promise(resolve => setTimeout(resolve, 150))

    const originalLength = tagItems.value.length

    await performSearch('ASSET')
    expect(tagItems.value.length).toBeLessThanOrEqual(originalLength)

    await performSearch('')
    expect(tagItems.value.length).toBe(originalLength)
  })

  it('custom filter performs case-insensitive substring matching', () => {
    const route = router.currentRoute.value
    const { customFilter } = useHeadSearch(store, router, route, seneca, model)

    expect(customFilter('ASSET001', 'asset', 'ASSET001')).toBe(true)
    expect(customFilter('ASSET001', 'ASSET', 'ASSET001')).toBe(true)
    expect(customFilter('ASSET001', '001', 'ASSET001')).toBe(true)
    expect(customFilter('ASSET001', 'NOTFOUND', 'ASSET001')).toBe(false)
    expect(customFilter('ASSET001', '', 'ASSET001')).toBe(true)
  })

  it('handles search change with debouncing', async () => {
    const route = router.currentRoute.value
    const { handleSearchChange } = useHeadSearch(store, router, route, seneca, model)

    const event = {
      target: { value: 'ASSET' }
    } as any

    handleSearchChange(event)

    // Wait for debounce
    await new Promise(resolve => setTimeout(resolve, 50))

    expect(store.state.trigger.search.term).toBe('ASSET')
    expect(store.state.trigger.search.a).toBe('ASSET')
  })

  it('handles search clear', async () => {
    const route = router.currentRoute.value
    const { handleSearchChange } = useHeadSearch(store, router, route, seneca, model)

    const event = {
      target: { value: '' }
    } as any

    handleSearchChange(event)

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(store.state.trigger.search.term).toBe('')
    expect(store.state.trigger.search.a).toBe('')
  })

  it('handles search selection', () => {
    const route = router.currentRoute.value
    const { handleSearchSelect } = useHeadSearch(store, router, route, seneca, model)

    handleSearchSelect('ASSET001')

    expect(store.state.trigger.search.term).toBe('ASSET001')
    expect(store.state.trigger.search.a).toBe('ASSET001')
  })

  it('skips URL navigation in specific search modes', async () => {
    router.push({ path: '/assets', query: { mode: 'assetsearch', term: 'test' } })
    await router.isReady()

    const route = router.currentRoute.value
    const { handleSearchChange } = useHeadSearch(store, router, route, seneca, model)

    const routerPushSpy = vi.spyOn(router, 'push')

    const event = {
      target: { value: 'ASSET' }
    } as any

    handleSearchChange(event)

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(routerPushSpy).not.toHaveBeenCalled()
  })

  it('navigates with headsearch mode for normal search', async () => {
    router.push({ path: '/assets' })
    await router.isReady()

    const route = router.currentRoute.value
    const { handleSearchChange } = useHeadSearch(store, router, route, seneca, model)

    const routerPushSpy = vi.spyOn(router, 'push')

    const event = {
      target: { value: 'ASSET' }
    } as any

    handleSearchChange(event)

    await new Promise(resolve => setTimeout(resolve, 50))

    expect(routerPushSpy).toHaveBeenCalledWith({
      path: '/assets',
      query: { mode: 'headsearch', term: 'ASSET' }
    })
  })

  it('cleans up intervals on cleanup', () => {
    const route = router.currentRoute.value
    const { cleanup, initializeAssetLoading } = useHeadSearch(store, router, route, seneca, model)

    initializeAssetLoading()
    
    // Should not throw
    expect(() => cleanup()).not.toThrow()
  })

  it('handles null assets in tag alias formatting', async () => {
    store.actions.vxg_get_assets = vi.fn().mockImplementation((context, tool) => {
      tool.assets = [
        { tag: 'ASSET001', custom12: 'Alias1' },
        null,
        { tag: null },
        { tag: 'ASSET003' }
      ]
      return Promise.resolve()
    })

    const route = router.currentRoute.value
    const { initializeAssetLoading, tagItems } = useHeadSearch(store, router, route, seneca, model)

    initializeAssetLoading()
    await new Promise(resolve => setTimeout(resolve, 150))

    expect(tagItems.value).not.toContain(null)
    expect(tagItems.value.length).toBe(2) // Only valid assets
  })

  it('handles search errors gracefully', async () => {
    seneca.post = vi.fn().mockRejectedValue(new Error('Search failed'))

    const route = router.currentRoute.value
    const { performSearch } = useHeadSearch(store, router, route, seneca, model)

    await expect(performSearch('ASSET')).rejects.toThrow('Search failed')
  })
})
