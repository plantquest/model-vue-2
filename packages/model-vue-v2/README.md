# @plantquest/model-vue-v2

**Vue 2 Component Library** for PlantQuest applications (Maintenance Mode).

## Status

⚠️ **Maintenance Mode** - This is the Vue 2 version, maintained for backward compatibility only.

Current version: `0.18.240`

**New projects should use [@plantquest/model-vue](../model-vue/README.md) (Vue 3).**

## Installation

```bash
npm install @plantquest/model-vue-v2
# or
pnpm add @plantquest/model-vue-v2
```

## Usage

```javascript
import Vue from 'vue'
import Vxg from '@plantquest/model-vue-v2'

Vue.use(Vxg)

new Vue({
  // Your app
}).$mount('#app')
```

## Migration to Vue 3

We strongly recommend migrating to Vue 3. See:
- [@plantquest/model-vue](../model-vue/README.md) - Vue 3 version
- [Migration Guide](../../docs/migration-guide.md) (coming soon)
- [Migration Planning](../../provenance/VUE3-MIGRATION-INDEX.md)

## Maintenance Policy

This package will be maintained for **12 months** after the stable Vue 3 version (v1.0.0) is released:

- ✅ **Security fixes**: Critical security issues will be patched
- ✅ **Bug fixes**: P0/P1 bugs will be fixed
- ❌ **New features**: No new features will be added
- ❌ **Enhancements**: No enhancements will be added

**Sunset Date**: To be determined (12 months after v1.0.0 stable release)

## Components

All Vue 2 components are fully functional:

- BasicHead
- BasicSide
- BasicMain
- BasicNavStages
- BasicAuth
- BasicAdmin
- BasicFieldPick
- BasicFoot
- BasicLed

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run vue-build

# Run tests
npm test
```

## License

MIT © PlantQuest

## See Also

- [Vue 2 Documentation](https://v2.vuejs.org/) (End of Life: Dec 31, 2023)
- [Vue 3 Version](../model-vue/README.md)
- [Risk Analysis](../../provenance/drafts/VUE2-RISK-ANALYSIS.md)
