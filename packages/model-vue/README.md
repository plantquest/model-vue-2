# @plantquest/model-vue

**Vue 3 Component Library** for PlantQuest applications.

## Status

🚧 **Under Development** - Vue 3 Migration in Progress

Current version: `1.0.0-alpha.1`

## Installation

```bash
npm install @plantquest/model-vue@alpha
# or
pnpm add @plantquest/model-vue@alpha
```

## Usage

```javascript
import { createApp } from 'vue'
import Vxg from '@plantquest/model-vue'
import App from './App.vue'

const app = createApp(App)
app.use(Vxg, {
  // Configuration options
})

app.mount('#app')
```

## Migration from Vue 2

If you're currently using `@plantquest/model-vue-v2` (Vue 2 version), please see the [Migration Guide](../../docs/migration-guide.md) (coming soon).

## Development

This package is part of a monorepo. To work on it:

```bash
# Install dependencies
pnpm install

# Build the library
pnpm build

# Run tests (coming in Week 1.4)
pnpm test
```

## Features

- ✅ Vue 3 Composition API
- ✅ TypeScript support
- ✅ Tree-shakeable exports
- ✅ ESM, UMD, and CJS formats
- 🚧 Component migration in progress
- 🚧 Vuetify 3 integration
- 🚧 Comprehensive test coverage

## Components

Components will be documented here as they are migrated (Week 2-3):

- BasicHead (planned)
- BasicSide (planned)
- BasicMain (planned)
- BasicNavStages (planned)
- BasicAuth (planned)
- BasicAdmin (planned)
- BasicFieldPick (planned)
- BasicFoot (planned)
- BasicLed (planned)

## License

MIT © PlantQuest

## Links

- [Vue 3 Documentation](https://v3.vuejs.org/)
- [Migration Planning](../../provenance/VUE3-MIGRATION-INDEX.md)
- [Technical Specification](../../provenance/specs/SPEC-000002/spec.json)
