/**
 * Tests for useHeadConfig composable
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createStore } from 'vuex'
import { createRouter, createMemoryHistory } from 'vue-router'
import { nextTick } from 'vue'
import { useHeadConfig } from '@/composables/useHeadConfig'

describe('useHeadConfig', () => {
  let store: any
  let router: any
  let model: any
  let senecaUtil: any

  beforeEach(() => {
    // Mock store
    store = createStore({
      state: {
        vxg: {
          ent: {
            meta: {
              name: 'Asset'
            }
          }
        },
        trigger: {
          select: {
            value: ''
          }
        }
      },
      actions: {
        trigger_select: vi.fn().mockResolvedValue(undefined)
      }
    })

    // Mock router
    router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/assets', name: 'assets', component: { template: '<div>Assets</div>' } },
        { path: '/device', name: 'device', component: { template: '<div>Device</div>' } },
        { path: '/user', name: 'user', component: { template: '<div>User</div>' } }
      ]
    })

    // Mock model
    model = {
      main: {
        app: {
          web: {
            parts: {
              head: {
                tool: {
                  expandSide: { active: true },
                  expandMain: { active: true },
                  select: {
                    active: true,
                    title: 'Select Entity',
                    initial: 'default',
                    items: {
                      default: { title: 'Default' },
                      custom: { title: 'Custom' }
                    }
                  },
                  add: { active: true },
                  remove: { active: true },
                  avatar: { active: true },
                  print: { active: true, disabled: false }
                }
              }
            },
            view: {
              assets: {
                head: {
                  tool: {
                    add: { active: false } // Override
                  }
                }
              }
            }
          }
        }
      }
    }

    // Mock senecaUtil with deep merge
    senecaUtil = {
      deep: vi.fn().mockImplementation((base, override) => {
        return {
          ...base,
          ...override,
          select: override.select ? { ...base.select, ...override.select } : base.select
        }
      })
    }
  })

  it('initializes with empty select value', () => {
    const route = router.currentRoute.value
    const { select } = useHeadConfig(store, route, model, senecaUtil)

    expect(select.value).toBe('')
  })

  it('tool computed merges head and view tool configs', async () => {
    await router.push('/assets')
    const route = router.currentRoute.value
    const { tool } = useHeadConfig(store, route, model, senecaUtil)

    await nextTick()

    expect(tool.value.expandSide.active).toBe(true)
    expect(senecaUtil.deep).toHaveBeenCalled()
  })

  it('itemName returns entity name from store', () => {
    const route = router.currentRoute.value
    const { itemName } = useHeadConfig(store, route, model, senecaUtil)

    expect(itemName.value).toBe('Asset')
  })

  it('itemName returns "Device" for device route when entity is Item', async () => {
    store.state.vxg.ent.meta.name = 'Item'
    await router.push('/device')
    const route = router.currentRoute.value
    const { itemName } = useHeadConfig(store, route, model, senecaUtil)

    expect(itemName.value).toBe('Device')
  })

  it('itemName returns "User" for user route when entity is Item', async () => {
    store.state.vxg.ent.meta.name = 'Item'
    await router.push('/user')
    const route = router.currentRoute.value
    const { itemName } = useHeadConfig(store, route, model, senecaUtil)

    expect(itemName.value).toBe('User')
  })

  it('selectItems transforms tool.select.items into dropdown format', () => {
    const route = router.currentRoute.value
    const { selectItems } = useHeadConfig(store, route, model, senecaUtil)

    expect(selectItems.value).toEqual([
      { value: 'default', text: 'Default' },
      { value: 'custom', text: 'Custom' }
    ])
  })

  it('defaults() sets select to initial value', async () => {
    await router.push('/assets')
    const route = router.currentRoute.value
    const { select, defaults, tool } = useHeadConfig(store, route, model, senecaUtil)

    await nextTick()

    // Should be called automatically on route change
    expect(select.value).toBe('default')
  })

  it('select watcher dispatches trigger_select action', async () => {
    const route = router.currentRoute.value
    const { select } = useHeadConfig(store, route, model, senecaUtil)

    select.value = 'custom'

    await nextTick()

    expect(store.dispatch).toHaveBeenCalledWith('trigger_select', { value: 'custom' })
  })

  it('syncs with external select value changes', async () => {
    const route = router.currentRoute.value
    const { select } = useHeadConfig(store, route, model, senecaUtil)

    store.state.trigger.select.value = 'external'

    await nextTick()

    expect(select.value).toBe('external')
  })

  it('route watcher updates view tool on route change', async () => {
    await router.push('/assets')
    const route = router.currentRoute.value
    const { viewTool } = useHeadConfig(store, route, model, senecaUtil)

    await nextTick()

    expect(viewTool.value).toEqual({ add: { active: false } })
  })

  it('handles missing view configuration', async () => {
    await router.push('/nonexistent')
    const route = router.currentRoute.value
    const { viewTool } = useHeadConfig(store, route, model, senecaUtil)

    await nextTick()

    expect(viewTool.value).toEqual({})
  })

  it('handles missing select configuration', () => {
    model.main.app.web.parts.head.tool.select = undefined
    const route = router.currentRoute.value
    const { selectItems } = useHeadConfig(store, route, model, senecaUtil)

    expect(selectItems.value).toEqual([])
  })

  it('handles select dispatch errors gracefully', async () => {
    store.actions.trigger_select = vi.fn().mockRejectedValue(new Error('Dispatch failed'))
    
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const route = router.currentRoute.value
    const { select } = useHeadConfig(store, route, model, senecaUtil)

    select.value = 'test'

    await new Promise(resolve => setTimeout(resolve, 10))

    expect(consoleErrorSpy).toHaveBeenCalled()
    consoleErrorSpy.mockRestore()
  })

  it('handles missing entity meta gracefully', () => {
    store.state.vxg.ent.meta = {}
    const route = router.currentRoute.value
    const { itemName } = useHeadConfig(store, route, model, senecaUtil)

    expect(itemName.value).toBe('Item') // Default
  })
})
