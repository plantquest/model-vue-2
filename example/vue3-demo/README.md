# Vue 3 Demo - Model-Vue Library Testing

This demo application showcases all Vue 3 migrated components from `@plantquest/model-vue` v1.0.0-alpha.1.

## Purpose

- **Test** all 9 migrated components in a real Vue 3 application
- **Demonstrate** component functionality and features
- **Validate** integration with Vue 3, Vue Router 4, Vuex 4, and Vuetify 3
- **Verify** composables work correctly
- **Showcase** migration patterns and best practices

## Quick Start

```bash
# From the root of the monorepo
pnpm install

# Start the demo app
cd example/vue3-demo
pnpm dev
```

The demo will open at `http://localhost:3000`

## What's Included

### Components Demonstrated

1. **BasicLed** - Status indicators with 4 states
2. **BasicFoot** - Footer with links and version info
3. **BasicFieldPick** - Field picker with autocomplete
4. **BasicAuth** - Authentication form with validation
5. **BasicAdmin** - Admin panel (basic demo)
6. **BasicSide** - Side navigation drawer
7. **BasicNavStages** - Multi-stage navigation with route sync
8. **BasicHead** - Header with search, actions, notifications (you're using it!)

### Composables Demonstrated

- `useAuth()` - Authentication state management
- `useSide()` - Side drawer control
- `useNavStages()` - Stage progression
- `useHeadPermissions()` - Permission checks
- `useHeadSearch()` - MiniSearch integration (in header)

### Features

- ✅ Vue 3 Composition API
- ✅ TypeScript support
- ✅ Vuex 4 store integration
- ✅ Vue Router 4 navigation
- ✅ Vuetify 3 UI framework
- ✅ Hot Module Replacement (HMR)
- ✅ MiniSearch integration with <40ms latency

## Pages

- **Home** (`/`) - Overview and quick navigation
- **Components** (`/components`) - Component showcase with interactive demos
- **Stages** (`/stages`) - BasicNavStages workflow demonstration
- **Auth** (`/auth`) - Authentication flow demo

## Build

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Type Checking

```bash
# Check TypeScript types
pnpm type-check
```

## Notes

- This demo uses the **local workspace package** via `@plantquest/model-vue: "workspace:*"`
- Any changes to the library will be reflected immediately with HMR
- Perfect for testing and development of new components

## Migration Status

- ✅ Week 1: Infrastructure (monorepo, Vite, TypeScript, Vitest)
- ✅ Week 2-3: Component migration (all 9 components)
- ✅ Integration: Week 1 + Week 2 complete
- ⏭️ Week 4-5: Ecosystem (Vuetify 3, Day.js)

**Status**: All components ready for testing and demonstration!
