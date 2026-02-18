/**
 * Composable Return Types
 * TypeScript definitions for composable functions
 */
import { ComputedRef, Ref } from 'vue';
import { VxgState, VxgComponentState, ComponentFlags } from './vxg';
/**
 * useVxgStore composable return type
 * Provides access to Vxg state in Vuex or Pinia
 */
export interface UseVxgStoreReturn {
    /**
     * Computed reference to entire Vxg state
     */
    vxgState: ComputedRef<VxgState>;
    /**
     * Get state for a specific component
     */
    componentState: (name: string) => ComputedRef<VxgComponentState | undefined>;
    /**
     * Update component flags
     */
    setComponentFlags: (name: string, flags: ComponentFlags) => void;
    /**
     * Get nested state value
     */
    getState: (path: string) => ComputedRef<any>;
}
/**
 * useVxgPermissions composable return type
 * Handles permission checks for actions
 */
export interface UseVxgPermissionsReturn {
    /**
     * Check if action is allowed
     */
    allow: (action: string) => ComputedRef<boolean>;
    /**
     * Check if action should be shown
     */
    show: (action: string) => ComputedRef<boolean>;
    /**
     * Check multiple permissions
     */
    allowMultiple: (actions: string[]) => ComputedRef<Record<string, boolean>>;
}
/**
 * useHeadSearch composable return type
 * Search functionality for BasicHead component
 */
export interface UseHeadSearchReturn {
    /**
     * Search query
     */
    searchQuery: Ref<string>;
    /**
     * Search results
     */
    searchResults: Ref<Array<any>>;
    /**
     * Whether search is in progress
     */
    isSearching: Ref<boolean>;
    /**
     * Perform search
     */
    handleSearch: (query: string) => Promise<void>;
    /**
     * Clear search
     */
    clearSearch: () => void;
    /**
     * Index searchable items
     */
    indexItems: (items: Array<any>) => void;
}
/**
 * useHeadActions composable return type
 * Action handling for BasicHead component
 */
export interface UseHeadActionsReturn {
    /**
     * Available actions
     */
    actions: ComputedRef<Array<Action>>;
    /**
     * Handle action click
     */
    handleAction: (action: Action) => void;
    /**
     * Register custom action handler
     */
    registerHandler: (actionType: string, handler: (action: Action) => void) => void;
}
/**
 * Action definition
 */
export interface Action {
    /**
     * Action identifier
     */
    name: string;
    /**
     * Action type
     */
    type: 'navigate' | 'dispatch' | 'emit' | 'custom';
    /**
     * Action label
     */
    label?: string;
    /**
     * Icon name
     */
    icon?: string;
    /**
     * Route to navigate to (for type: 'navigate')
     */
    route?: string;
    /**
     * Event to dispatch (for type: 'dispatch')
     */
    event?: string;
    /**
     * Payload for event
     */
    payload?: any;
    /**
     * Custom data
     */
    [key: string]: any;
}
/**
 * useNavStages composable return type
 * Stage navigation logic
 */
export interface UseNavStagesReturn {
    /**
     * Current stage
     */
    currentStage: ComputedRef<number>;
    /**
     * Available stages
     */
    stages: ComputedRef<Array<any>>;
    /**
     * Go to specific stage
     */
    goToStage: (stageId: number) => void;
    /**
     * Go to next stage
     */
    nextStage: () => void;
    /**
     * Go to previous stage
     */
    prevStage: () => void;
    /**
     * Check if can proceed to stage
     */
    canGoToStage: (stageId: number) => boolean;
}
/**
 * useStageRouting composable return type
 * Routing logic for stages
 */
export interface UseStageRoutingReturn {
    /**
     * Navigate to stage route
     */
    navigateToStage: (stage: any) => void;
    /**
     * Current route name
     */
    currentRoute: ComputedRef<string | undefined>;
    /**
     * Get route for stage
     */
    getStageRoute: (stageId: number) => string | undefined;
}
