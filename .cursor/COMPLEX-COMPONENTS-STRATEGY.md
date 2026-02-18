# Complex Components Migration Strategy

**Purpose**: De-risk Vue 3 migration by tackling hardest components first  
**Date**: February 9, 2026  
**Approach**: Split → Composables → Tests

---

## Priority Order (Complexity-Based)

```
1. BasicNavStages  392 lines   Start here (practice splitting)
2. BasicSide       891 lines   Apply lessons learned
3. BasicHead      1101 lines   Final boss (most complex)
```

**Strategy**: Master splitting on BasicNavStages, then apply to others.

---

## 1. BasicNavStages (392 lines) - STARTING NOW

**Complexity**: HIGH  
**Timeline**: 1-2 days  
**Risk**: MEDIUM

### Features
- Multi-level stage navigation
- Path data parsing (complex async logic)
- Map/asset integration
- Expansion panel UI
- Vuex watchers (3)
- Distance calculations

### Splitting Strategy
```
BasicNavStages.vue (orchestrator ~80 lines)
├── NavStagePanel.vue (~50 lines)
├── NavStageItem.vue (~30 lines)
└── composables/
    ├── useNavStages.ts (~100 lines)
    ├── usePathParser.ts (~150 lines)
    └── useMapAssets.ts (~80 lines)
```

**Analysis**: `.cursor/BASICNAVSTAGES-ANALYSIS.md` ✅ COMPLETE

**Status**: 🔄 Ready to begin implementation

---

## 2. BasicSide (891 lines) - NEXT

**Complexity**: VERY HIGH  
**Timeline**: 2-3 days  
**Risk**: HIGH

### Features (from first 100 lines)
- Navigation drawer
- Dual search system (primary + navigation mode)
- Tag filtering
- Asset search with MiniSearch
- Filter controls
- Route handling
- Icon toggling
- Complex state management

### Splitting Strategy (Preliminary)
```
BasicSide.vue (orchestrator ~100 lines)
├── SideHeader.vue (~50 lines)
├── SideSearchPrimary.vue (~150 lines)
├── SideSearchNavigation.vue (~150 lines)
├── SideFilters.vue (~100 lines)
├── SideTagList.vue (~100 lines)
└── composables/
    ├── useSideSearch.ts (~200 lines)
    ├── useSideNavigation.ts (~150 lines)
    ├── useSideFilters.ts (~100 lines)
    └── useSideTags.ts (~100 lines)
```

**Analysis**: Needs detailed analysis (will create after BasicNavStages)

---

## 3. BasicHead (1101 lines) - FINAL

**Complexity**: VERY HIGH (CRITICAL)  
**Timeline**: 3-5 days  
**Risk**: HIGH

### Features (from first 100 lines)
- App bar with extensive toolbar
- Search with MiniSearch
- Multiple action buttons (add, remove, edit, save, etc.)
- Select dropdown
- Permission system (show/allow)
- Drawer controls
- Filter logic
- Tag management
- Asset operations

### Splitting Strategy (Preliminary)
```
BasicHead.vue (orchestrator ~100 lines)
├── HeadToolbar.vue (~200 lines)
├── HeadSearch.vue (~150 lines)
├── HeadSelect.vue (~100 lines)
├── HeadActions.vue (~200 lines)
├── HeadDrawer.vue (~100 lines)
└── composables/
    ├── useHeadSearch.ts (~200 lines)
    ├── useHeadActions.ts (~150 lines)
    ├── useHeadPermissions.ts (~100 lines)
    ├── useHeadFilters.ts (~150 lines)
    └── useHeadState.ts (~100 lines)
```

**Analysis**: Needs detailed analysis (will create after BasicSide)

---

## Migration Workflow

### For Each Complex Component:

**Day 1: Analysis & Composables**
1. Deep analysis of component (DONE for BasicNavStages)
2. Create splitting strategy
3. Create composables with business logic
4. Write composable tests

**Day 2: Sub-components**
1. Create sub-component files
2. Move template logic to sub-components
3. Write sub-component tests
4. Refactor main component as orchestrator

**Day 3: Integration & Testing**
1. Integration tests
2. Achieve >80% coverage
3. Visual regression tests
4. Documentation
5. Export from index.js

---

## Parallel Execution Plan

**If using 3 agents in parallel**:

```
Week 1 (Days 1-2):
├── Agent 1: BasicNavStages (Analysis + Composables)
├── Agent 2: BasicSide (Analysis + Composables)
└── Agent 3: BasicHead (Analysis + Composables)

Week 1 (Days 3-5):
├── Agent 1: BasicNavStages (Sub-components + Tests)
├── Agent 2: BasicSide (Sub-components + Tests)
└── Agent 3: BasicHead (Sub-components + Tests)

Week 2 (Days 6-7):
└── All Agents: Integration testing, polish, documentation

TOTAL: 7-10 days (1.5-2 weeks) with 3 parallel agents
```

**vs. Sequential**: Would take 6-10 days = 1.5-2.5 weeks

**Time Savings**: Minimal (due to coordination overhead)  
**Recommendation**: Do sequentially for quality

---

## Risk Mitigation

### Risk 1: Functionality Loss
**Mitigation**:
- Comprehensive tests before refactoring
- Side-by-side comparison during development
- Visual regression tests

### Risk 2: Store Integration Breaks
**Mitigation**:
- Test watchers extensively
- Verify all store mutations/actions
- Integration tests with mock store

### Risk 3: Event Bus Replacement ($root.$on)
**Mitigation**:
- Document all event bus usages
- Replace with provide/inject or props
- Test event flow

### Risk 4: Time Overrun
**Mitigation**:
- Start with BasicNavStages (smallest complex)
- Learn patterns, apply to others
- Adjust estimates based on first component

---

## Success Metrics

### Per Component
- [ ] Split into sub-components (2-5 per component)
- [ ] Extract composables (3-5 per component)
- [ ] TypeScript throughout
- [ ] >80% test coverage
- [ ] Visual parity maintained
- [ ] All features working
- [ ] Performance maintained

### Overall
- [ ] All 3 complex components migrated
- [ ] Patterns established for team
- [ ] De-risking complete
- [ ] Simple components trivial after this

---

## Current Status

**BasicNavStages**:
- [x] Analysis complete
- [x] Splitting strategy defined
- [ ] Composables implementation (NEXT)
- [ ] Sub-components creation
- [ ] Main component refactor
- [ ] Testing
- [ ] Documentation

**BasicSide**:
- [ ] Analysis (after BasicNavStages)
- [ ] Splitting strategy
- [ ] Implementation
- [ ] Testing

**BasicHead**:
- [ ] Analysis (after BasicSide)
- [ ] Splitting strategy
- [ ] Implementation
- [ ] Testing

---

## Next Immediate Steps

**Starting NOW with BasicNavStages**:

1. Create `packages/model-vue/src/composables/useNavStages.ts`
2. Create `packages/model-vue/src/composables/usePathParser.ts`
3. Create `packages/model-vue/src/composables/useMapAssets.ts`
4. Create `packages/model-vue/src/components/NavStagePanel.vue`
5. Create `packages/model-vue/src/components/NavStageItem.vue`
6. Refactor `packages/model-vue/src/components/BasicNavStages.vue`
7. Write comprehensive tests

**Timeline**: 1-2 days

---

**Team Lead**: Ready to assign BasicNavStages implementation to fullstack-coder  
**Status**: Analysis complete, implementation ready to begin  
**Estimated Completion**: BasicNavStages done in 1-2 days

**Would you like me to proceed with the implementation?**
