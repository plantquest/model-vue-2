# @plantquest/model-vue

PlantQuest Model Vue Component Library - Supporting both Vue 2 and Vue 3.

## Packages

This is a monorepo containing two packages:

### [@plantquest/model-vue](./packages/model-vue) (Vue 3) ✨ **ACTIVE DEVELOPMENT**
- **Version**: 1.0.0-alpha.1
- **Status**: 🚧 Migration in Progress
- **Vue**: 3.3.0+
- **Recommendation**: **Use for all new projects**

Modern Vue 3 component library with:
- ✅ Composition API
- ✅ TypeScript support
- ✅ Tree-shakeable exports
- ✅ Vite build system
- 🚧 Component migration (Week 2-3)

[Read the documentation →](./packages/model-vue/README.md)

### [@plantquest/model-vue-v2](./packages/model-vue-v2) (Vue 2) ⚠️ **MAINTENANCE MODE**
- **Version**: 0.18.240
- **Status**: Maintenance only (12 months after Vue 3 stable)
- **Vue**: 2.6.12
- **Recommendation**: **Migrate to Vue 3**

Legacy Vue 2 version maintained for backward compatibility.

[Read the documentation →](./packages/model-vue-v2/README.md)

## Installation

### For New Projects (Vue 3)
```bash
npm install @plantquest/model-vue@alpha
```

### For Existing Projects (Vue 2)
```bash
npm install @plantquest/model-vue-v2
```

## Migration from Vue 2 to Vue 3

If you're currently using the Vue 2 version, we **strongly recommend** migrating to Vue 3.

**Why migrate?**
- ✅ Vue 2 reached End-of-Life on December 31, 2023
- ✅ No more security patches for Vue 2
- ✅ Better performance with Vue 3
- ✅ Modern ecosystem and tooling
- ✅ TypeScript support

**Migration Resources**:
- [Migration Index](./provenance/VUE3-MIGRATION-INDEX.md)
- [Executive Summary](./provenance/drafts/EXECUTIVE-DECISION-CARD.md)
- [Technical Specification](./provenance/specs/SPEC-000002/spec.json)
- [Risk Analysis](./provenance/drafts/VUE2-RISK-ANALYSIS.md)

## Development

This is a pnpm workspace monorepo.

### Prerequisites
- Node.js >= 16.0.0
- pnpm >= 8.0.0

### Setup
```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build:all

# Build specific package
pnpm build:v2  # Vue 2 version
pnpm build:v3  # Vue 3 version

# Run tests
pnpm test:all
```

### Project Structure
```
@plantquest/model-vue/
├── packages/
│   ├── model-vue/          # Vue 3 version (active development)
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── composables/
│   │   │   ├── types/
│   │   │   └── index.js
│   │   ├── dist/           # Build output
│   │   └── package.json
│   │
│   └── model-vue-v2/       # Vue 2 version (maintenance)
│       ├── src/
│       ├── dist/
│       └── package.json
│
├── provenance/             # ProvenanceCode documentation
│   ├── decisions/
│   ├── specs/
│   ├── risks/
│   └── drafts/
│
├── pnpm-workspace.yaml
└── package.json
```

## Migration Timeline

**Current Status**: Week 1 of 11 - Infrastructure Setup

- ✅ **Week 1** (Feb 17-21): Infrastructure (Monorepo, Vite, TypeScript, Testing) ← YOU ARE HERE
- 🔜 **Week 2-3**: Component Migration (All 9 components to Vue 3)
- 🔜 **Week 4-5**: Ecosystem Updates (Vuetify 3, Day.js, Testing)
- 🔜 **Week 6**: Alpha Testing & Bug Fixes
- 🔜 **Week 7-9**: Frontend Application Migration
- 🔜 **Week 10-11**: Stabilization & Production Deployment

See [VUE3-MIGRATION-TASK-SPEC.md](./provenance/VUE3-MIGRATION-TASK-SPEC.md) for detailed planning.

## ProvenanceCode

This project follows ProvenanceCode practices. All architectural decisions, specifications, and risks are documented in the `provenance/` directory.

Key documents:
- **DEC-000018**: Vue 3 Migration Decision
- **RA-000002**: Vue 2 Continuation Risk (CRITICAL)
- **SPEC-000002**: Technical Specification
- [Full Index](./provenance/VUE3-MIGRATION-INDEX.md)

## License

MIT © PlantQuest

## Contributing

This migration is currently managed by the PlantQuest team using an AI-assisted approach with parallel agents. See [WEEK-1-TASK-ASSIGNMENTS.md](./.cursor/WEEK-1-TASK-ASSIGNMENTS.md) for the current work plan.

## Links

- [Vue 2 Documentation](https://v2.vuejs.org/) (EOL: Dec 31, 2023)
- [Vue 3 Documentation](https://v3.vuejs.org/)
- [Migration Guide](https://v3-migration.vuejs.org/)
- [GitHub Repository](https://github.com/plantquest/model-vue-2)

---

**Status**: 🚧 Week 1 Infrastructure Setup in Progress  
**Last Updated**: February 9, 2026
