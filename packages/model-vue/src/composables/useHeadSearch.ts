/**
 * useHeadSearch Composable
 *
 * Handles all search functionality for BasicHead component including:
 * - Asset loading with polling
 * - MiniSearch integration via Seneca
 * - Search query execution
 * - Autosuggest functionality
 * - Vuex state synchronization
 * - URL-based search navigation
 *
 * @module composables/useHeadSearch
 */

import { ref, computed, watch, onUnmounted, type Ref, type ComputedRef } from 'vue'
import type { Store } from 'vuex'
import type { Router, RouteLocationNormalized } from 'vue-router'

/**
 * Asset interface matching the application data structure.
 * Re-exported from types/components.ts for convenience.
 * Full field schema: see provenance/schema/pqs-asset.schema.json
 */
export type { Asset } from '../types/components'

/**
 * Search configuration from model
 */
export interface SearchConfig {
  fields?: string[]
  fuzzy?: number
  prefix?: boolean
  boost?: Record<string, number>
  [key: string]: any
}

/**
 * MiniSearch hit result
 */
export interface SearchHit {
  doc: Asset
  score: number
  [key: string]: any
}

/**
 * Return type for useHeadSearch composable
 */
export interface UseHeadSearchReturn {
  /** Current search term */
  search: Ref<string>
  /** Filtered tag items for autosuggest dropdown */
  tagItems: Ref<string[]>
  /** All loaded assets */
  items: Ref<Asset[]>
  /** Setup MiniSearch with asset data */
  setupMiniSearch: (items: Asset[]) => Promise<void>
  /** Execute search query via MiniSearch */
  performSearch: (term: string) => Promise<void>
  /** Custom filter function for v-combobox */
  customFilter: (item: string, queryText: string, itemText: string) => boolean
  /** Handle search input change events */
  handleSearchChange: (event: Event) => void
  /** Handle search selection from dropdown */
  handleSearchSelect: (value: string) => void
  /** Initialize asset loading */
  initializeAssetLoading: () => void
  /** Clean up resources */
  cleanup: () => void
}

/**
 * Helper function to format asset tag with alias
 * Returns "TAG(ALIAS)" or "TAG"
 */
function tagAlias(asset: Asset | null | undefined): string | null {
  if (!asset || !asset.tag) {
    return null
  }

  if (asset.custom12 != null) {
    return `${asset.tag}(${asset.custom12})`
  }
  return asset.tag
}

/**
 * useHeadSearch Composable
 *
 * @param store - Vuex store instance
 * @param router - Vue Router instance
 * @param route - Current route location
 * @param seneca - Seneca client for MiniSearch
 * @param model - Application model with search config
 * @returns Search functionality and state
 */
export function useHeadSearch(
  store: Store<any>,
  router: Router,
  route: RouteLocationNormalized,
  seneca: any,
  model: any
): UseHeadSearchReturn {

  // ============================================================================
  // State
  // ============================================================================

  const search = ref<string>('')
  const items = ref<Asset[]>([])
  const tagItems = ref<string[]>([])

  let loadAssetsInterval: ReturnType<typeof setInterval> | null = null
  let searchDebounceTimeout: ReturnType<typeof setTimeout> | null = null

  // ============================================================================
  // Computed
  // ============================================================================

  const searchConfig = computed<SearchConfig>(() => {
    return model?.main?.ux?.custom?.search_config || {}
  })

  // ============================================================================
  // MiniSearch Integration
  // ============================================================================

  /**
   * Setup MiniSearch by adding all assets to the search index
   * Uses Seneca message pattern: sys:search, cmd:add
   */
  const setupMiniSearch = (assetList: Asset[]): Promise<void> => {
    const addPromises = assetList.map(item => {
      return seneca.post('sys:search, cmd:add', { doc: item })
    })

    return Promise.all(addPromises)
      .then(() => {
        console.log(`[useHeadSearch] MiniSearch initialized with ${assetList.length} assets`)
      })
      .catch((error: Error) => {
        console.error('[useHeadSearch] MiniSearch setup error:', error)
        throw error
      })
  }

  /**
   * Perform search query via MiniSearch
   * Uses Seneca message pattern: sys:search, cmd:search
   */
  const performSearch = (term: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (term) {
        seneca.post('sys:search, cmd:search', {
          query: term,
          params: searchConfig.value
        })
          .then((out: any) => {
            const hits: SearchHit[] = out?.data?.hits || []

            // Map hits to tag alias format and filter nulls
            tagItems.value = hits
              .map((hit: SearchHit) => tagAlias(hit.doc))
              .filter((item): item is string => item !== null)

            console.log(`[useHeadSearch] Search results: ${tagItems.value.length} matches for "${term}"`)
            resolve()
          })
          .catch((error: Error) => {
            console.error('[useHeadSearch] Search error:', error)
            reject(error)
          })
      } else {
        // Empty term: restore all items
        if (items.value && items.value.length > 0) {
          tagItems.value = items.value
            .map(tagAlias)
            .filter((item): item is string => item !== null)
        }
        resolve()
      }
    })
  }

  // ============================================================================
  // Asset Loading
  // ============================================================================

  /**
   * Initialize asset loading with polling
   * Polls every 111ms until assets are loaded, then sets up MiniSearch
   */
  const initializeAssetLoading = (): void => {
    const tool: any = {}

    loadAssetsInterval = setInterval(() => {
      store.dispatch('vxg_get_assets', tool)
        .then(() => {
          items.value = tool.assets || []

          if (items.value.length !== 0) {
            // Filter and map to tag alias format
            tagItems.value = items.value
              .map(tagAlias)
              .filter((item): item is string => item !== null)

            // Setup MiniSearch with loaded assets
            setupMiniSearch(items.value)
              .then(() => {
                // Clear interval after successful load
                if (loadAssetsInterval) {
                  clearInterval(loadAssetsInterval)
                  loadAssetsInterval = null
                }
              })
              .catch((error: Error) => {
                console.error('[useHeadSearch] Failed to setup MiniSearch:', error)
              })
          }
        })
        .catch((error: Error) => {
          console.error('[useHeadSearch] Asset loading error:', error)
        })
    }, 111)
  }

  // ============================================================================
  // Event Handlers
  // ============================================================================

  /**
   * Custom filter for v-combobox autosuggest
   * Performs case-insensitive substring matching
   */
  const customFilter = (item: string, queryText: string, itemText: string): boolean => {
    if (!queryText) return true

    const searchText = queryText.toLowerCase()
    const itemContent = (item || '').toLowerCase()

    return itemContent.includes(searchText)
  }

  /**
   * Handle search input change with debouncing and state updates
   * Updates Vuex state and triggers URL navigation
   */
  const handleSearchChange = (event: Event): void => {
    // Clear existing timeout
    if (searchDebounceTimeout) {
      clearTimeout(searchDebounceTimeout)
    }

    // Debounce search input (11ms)
    searchDebounceTimeout = setTimeout(() => {
      const target = event.target as HTMLInputElement
      const term = target?.value || null

      console.log('[useHeadSearch] Search term:', term)

      // Update BOTH Vuex properties for component integration
      // Note: Direct state mutation is used here for performance (existing pattern)
      store.state.trigger.search.term = term || ''  // For BasicLed data table
      store.state.trigger.search.a = term || ''     // For BasicSide search

      // Update autosuggest items
      performSearch(term || '')
        .then(() => {
          // Handle URL navigation if not in specific search modes
          const currentMode = route.query.mode as string

          // Skip URL navigation if other components are handling search
          if (
            currentMode === 'assetsearch' ||
            currentMode === 'filtersearch' ||
            currentMode === 'route'
          ) {
            return
          }

          // Use URL-based search for consistency
          if (term) {
            router.push({
              path: route.path,
              query: {
                mode: 'headsearch',
                term: term
              }
            }).catch((err: Error) => {
              if (err.name !== 'NavigationDuplicated') {
                console.error('[useHeadSearch] Router navigation error:', err)
              }
            })
          } else {
            // Clear search by removing query parameters
            router.push({
              path: route.path,
              query: {}
            }).catch((err: Error) => {
              if (err.name !== 'NavigationDuplicated') {
                console.error('[useHeadSearch] Router navigation error:', err)
              }
            })
          }
        })
        .catch((error: Error) => {
          console.error('[useHeadSearch] Search handling error:', error)
        })
    }, 11)
  }

  /**
   * Handle search selection from autosuggest dropdown
   * Syncs selected value to Vuex state
   */
  const handleSearchSelect = (value: string): void => {
    console.log('[useHeadSearch] Search selected:', value)

    // Update both Vuex search properties
    store.state.trigger.search.term = value || ''
    store.state.trigger.search.a = value || ''
  }

  // ============================================================================
  // Watchers
  // ============================================================================

  /**
   * Watch for external search term changes (from other components)
   * Resets tag items when search is cleared externally
   */
  watch(
    () => store.state.trigger?.search?.term,
    (term: string) => {
      if (term === '' && items.value.length > 0) {
        // Restore all items when search is cleared
        tagItems.value = items.value
          .map(tagAlias)
          .filter((item): item is string => item !== null)
      }
    }
  )

  // ============================================================================
  // Cleanup
  // ============================================================================

  /**
   * Cleanup function to clear intervals and timeouts
   */
  const cleanup = (): void => {
    if (loadAssetsInterval) {
      clearInterval(loadAssetsInterval)
      loadAssetsInterval = null
    }

    if (searchDebounceTimeout) {
      clearTimeout(searchDebounceTimeout)
      searchDebounceTimeout = null
    }
  }

  /**
   * Auto-cleanup on component unmount
   */
  onUnmounted(() => {
    cleanup()
  })

  // ============================================================================
  // Return
  // ============================================================================

  return {
    search,
    tagItems,
    items,
    setupMiniSearch,
    performSearch,
    customFilter,
    handleSearchChange,
    handleSearchSelect,
    initializeAssetLoading,
    cleanup
  }
}
