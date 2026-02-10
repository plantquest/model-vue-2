# CSS Conventions & Style Guide - @plantquest/model-vue

**Project**: @plantquest/model-vue (Vue 3 Migration)  
**Date**: February 10, 2026  
**Phase**: Week 4-5 - Task 4.1  
**Author**: frontend-coder-1

---

## Table of Contents

1. [Overview](#overview)
2. [Styling Architecture](#styling-architecture)
3. [Scoped vs Global Styles](#scoped-vs-global-styles)
4. [Naming Conventions](#naming-conventions)
5. [Color System](#color-system)
6. [Spacing & Layout](#spacing--layout)
7. [Typography](#typography)
8. [Component Styling Patterns](#component-styling-patterns)
9. [Best Practices](#best-practices)
10. [Anti-Patterns to Avoid](#anti-patterns-to-avoid)

---

## Overview

This document defines CSS and styling conventions for the @plantquest/model-vue component library. Following these conventions ensures:

- **Consistency**: Predictable styling across all components
- **Maintainability**: Easy to update and refactor styles
- **Performance**: Optimized CSS output and minimal conflicts
- **Developer Experience**: Clear patterns and reduced cognitive load

### Technology Stack

- **CSS Preprocessor**: SCSS (Sass)
- **Framework**: Vuetify 3
- **Scoping**: Vue SFC `<style scoped>`
- **Variables**: CSS Custom Properties + SCSS variables
- **Naming**: BEM-inspired with `vxg-` prefix

---

## Styling Architecture

### File Organization

```
src/
├── plugins/
│   └── vuetify.js           # Vuetify theme configuration
├── styles/
│   ├── variables.scss       # SCSS variables
│   ├── mixins.scss          # Reusable SCSS mixins
│   ├── utilities.scss       # Utility classes
│   └── global.scss          # Global styles (minimal)
└── components/
    ├── BasicHead.vue        # Component with scoped styles
    │   ├── <template>
    │   ├── <script setup>
    │   └── <style lang="scss" scoped>
    └── ...
```

### Style Loading Order

1. **Vuetify base styles** (loaded by Vuetify plugin)
2. **Global styles** (`styles/global.scss` if needed)
3. **Component scoped styles** (component `<style scoped>`)
4. **Theme overrides** (via Vuetify theme system)

---

## Scoped vs Global Styles

### Use Scoped Styles (Default)

**Always** use `<style scoped>` for component-specific styles:

```vue
<template>
  <div class="vxg-my-component">
    <h2 class="title">Hello</h2>
  </div>
</template>

<style lang="scss" scoped>
.vxg-my-component {
  padding: 16px;
  
  .title {
    font-size: 24px;
    color: rgb(var(--v-theme-primary));
  }
}
</style>
```

**Why scoped?**
- Prevents style conflicts
- Makes component styling self-contained
- Easier to reason about and maintain
- Automatically adds unique attributes to scope styles

### Use Global Styles (Rarely)

Only use global styles for:
1. CSS resets/normalizations
2. True global utilities (very rare)
3. Vuetify overrides (use `:deep()` instead when possible)

**Global Style Example** (`styles/global.scss`):

```scss
// Only truly global resets
*,
*::before,
*::after {
  box-sizing: border-box;
}

html, body {
  overflow-x: hidden;
  max-width: 100vw;
}
```

### Deep Selectors

When you need to style Vuetify components from within a scoped component:

```vue
<style lang="scss" scoped>
// ✅ Correct: Vue 3 deep selector
:deep(.v-btn__content) {
  text-transform: none;
}

:deep(.v-expansion-panel-text__wrapper) {
  padding: 0 !important;
}

// ❌ Wrong: Old Vue 2 syntax
::v-deep .v-btn__content { }  // Deprecated
/deep/ .v-btn__content { }     // Deprecated
>>> .v-btn__content { }        // Deprecated
</style>
```

---

## Naming Conventions

### Component Class Names

Use BEM-inspired naming with `vxg-` prefix:

```scss
// Block
.vxg-component-name { }

// Element
.vxg-component-name__element { }

// Modifier
.vxg-component-name--modifier { }

// State
.vxg-component-name.is-active { }
.vxg-component-name.has-error { }
```

**Examples**:

```vue
<template>
  <div class="vxg-nav-stages">
    <div class="vxg-nav-stages__item vxg-nav-stages__item--active">
      Stage 1
    </div>
    <div class="vxg-nav-stages__item vxg-nav-stages__item--disabled">
      Stage 2
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vxg-nav-stages {
  display: flex;
  flex-direction: column;
  
  &__item {
    padding: 12px;
    background: white;
    
    &--active {
      background: rgb(var(--v-theme-pqs-green));
      font-weight: bold;
    }
    
    &--disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
}
</style>
```

### SCSS Variable Names

```scss
// ✅ Good: Semantic, kebab-case
$primary-color: #2196F3;
$spacing-base: 16px;
$border-radius-default: 4px;

// ❌ Bad: Abbreviated, unclear
$pc: #2196F3;
$s: 16px;
$br: 4px;
```

### CSS Custom Properties

```scss
// ✅ Good: Prefixed, semantic
--vxg-primary-bg: #141B2D;
--vxg-text-primary: #FFFFFF;
--vxg-spacing-lg: 24px;

// Also use Vuetify theme variables
--v-theme-primary
--v-theme-secondary
--v-theme-pqs-green
```

---

## Color System

### Vuetify Theme Colors

**Primary palette** (defined in `src/plugins/vuetify.js`):

```scss
// Standard Vuetify colors
rgb(var(--v-theme-primary))     // #2196F3 (PlantQuest blue)
rgb(var(--v-theme-secondary))   // #4CAF50 (PlantQuest green)
rgb(var(--v-theme-error))       // #FF5252
rgb(var(--v-theme-success))     // #4CAF50
rgb(var(--v-theme-warning))     // #FB8C00
rgb(var(--v-theme-info))        // #2196F3

// PlantQuest custom colors
rgb(var(--v-theme-pqs-green))      // #4CAF50
rgb(var(--v-theme-pqs-blue))       // #2196F3
rgb(var(--v-theme-pqs-dark-blue))  // #141B2D
rgb(var(--v-theme-pqs-mid-blue))   // #27324A
```

### Using Colors in Components

```vue
<style lang="scss" scoped>
.my-component {
  // ✅ Use Vuetify theme colors
  color: rgb(var(--v-theme-on-surface));
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgb(var(--v-theme-primary));
}

// ❌ Avoid hardcoded colors
.my-component {
  color: #333;
  background: #FFFFFF;
  border: 1px solid #2196F3;
}
</style>
```

### Color Variants

Vuetify 3 provides color variants:

```scss
// Base color
rgb(var(--v-theme-primary))

// Variants (automatically generated)
rgb(var(--v-theme-on-primary))      // Contrasting text color
rgb(var(--v-theme-primary-lighten-1))
rgb(var(--v-theme-primary-darken-1))
```

### Legacy VXG Color Variables

Components currently use these custom variables (to be migrated):

```scss
--vxg-cb1  // Component background 1 (primary)
--vxg-cb2  // Component background 2 (secondary)
--vxg-ct0  // Component text 0 (primary dark)
--vxg-ct1  // Component text 1 (light/white)
--vxg-ct2  // Component text 2 (muted)
--vxg-ci0  // Component icon 0 (primary)
```

**Migration path**: Replace with Vuetify theme colors:

```scss
// Old
color: rgb(var(--vxg-ct1));

// New
color: rgb(var(--v-theme-on-surface));
```

---

## Spacing & Layout

### Vuetify Spacing System

Use Vuetify utility classes for spacing (4px base unit):

```vue
<!-- Margin utilities -->
<div class="ma-4">       <!-- margin: 16px all sides -->
<div class="mt-2">       <!-- margin-top: 8px -->
<div class="mx-6">       <!-- margin-left & right: 24px -->
<div class="my-3">       <!-- margin-top & bottom: 12px -->

<!-- Padding utilities -->
<div class="pa-4">       <!-- padding: 16px all sides -->
<div class="pt-2">       <!-- padding-top: 8px -->
<div class="px-6">       <!-- padding-left & right: 24px -->
<div class="py-3">       <!-- padding-top & bottom: 12px -->

<!-- Responsive spacing -->
<div class="pa-2 pa-md-4 pa-lg-6">
  <!-- 8px (xs-sm), 16px (md), 24px (lg+) -->
</div>
```

### Custom Spacing

When Vuetify utilities aren't sufficient:

```scss
.my-component {
  // ✅ Use multiples of 4px (align with Vuetify system)
  padding: 12px;      // 3 units
  margin-bottom: 20px; // 5 units
  gap: 16px;          // 4 units
  
  // ❌ Avoid arbitrary values
  padding: 13px;
  margin-bottom: 17px;
}
```

### SCSS Spacing Variables

```scss
// Define in styles/variables.scss
$spacing-xs: 4px;    // 1 unit
$spacing-sm: 8px;    // 2 units
$spacing-md: 16px;   // 4 units (base)
$spacing-lg: 24px;   // 6 units
$spacing-xl: 32px;   // 8 units
$spacing-2xl: 48px;  // 12 units

// Usage
.my-component {
  padding: $spacing-md;
  margin-bottom: $spacing-lg;
}
```

### Flexbox & Grid

```vue
<!-- Use Vuetify's v-row and v-col -->
<v-row>
  <v-col cols="12" md="6">
    <!-- Responsive columns -->
  </v-col>
</v-row>

<!-- Or use flex utilities -->
<div class="d-flex justify-space-between align-center">
  <!-- Flexbox layout -->
</div>
```

---

## Typography

### Vuetify Typography Classes

```vue
<!-- Headings -->
<h1 class="text-h1">      <!-- 96px -->
<h2 class="text-h2">      <!-- 60px -->
<h3 class="text-h3">      <!-- 48px -->
<h4 class="text-h4">      <!-- 34px -->
<h5 class="text-h5">      <!-- 24px -->
<h6 class="text-h6">      <!-- 20px -->

<!-- Body text -->
<p class="text-body-1">   <!-- 16px (default) -->
<p class="text-body-2">   <!-- 14px -->

<!-- Captions & overlines -->
<span class="text-caption">  <!-- 12px -->
<span class="text-overline"> <!-- 10px -->

<!-- Utilities -->
<div class="text-uppercase">
<div class="text-lowercase">
<div class="text-capitalize">
<div class="font-weight-bold">
<div class="font-weight-medium">
<div class="font-weight-regular">
<div class="font-weight-light">
<div class="font-italic">
<div class="text-decoration-none">
<div class="text-decoration-underline">
```

### Custom Typography

```scss
.my-component {
  // ✅ Use relative units for scalability
  font-size: 1rem;      // 16px base
  line-height: 1.5;     // 24px (16px * 1.5)
  
  // ❌ Avoid fixed pixel sizes
  font-size: 16px;
}
```

### Font Weights

```scss
// Standard font weights
font-weight: 300; // Light
font-weight: 400; // Regular
font-weight: 500; // Medium
font-weight: 700; // Bold
```

---

## Component Styling Patterns

### Pattern 1: Container-Presentation

Separate layout container from visual presentation:

```vue
<template>
  <div class="vxg-my-component">
    <div class="vxg-my-component__container">
      <div class="vxg-my-component__content">
        <!-- content -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// Layout container
.vxg-my-component {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

// Spacing container
.vxg-my-component__container {
  padding: 24px;
}

// Visual presentation
.vxg-my-component__content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>
```

### Pattern 2: State-Based Styling

Use classes for state instead of inline styles:

```vue
<template>
  <div 
    class="vxg-stage"
    :class="{
      'vxg-stage--active': isActive,
      'vxg-stage--disabled': isDisabled,
      'vxg-stage--error': hasError
    }"
  >
    <!-- content -->
  </div>
</template>

<style lang="scss" scoped>
.vxg-stage {
  padding: 12px;
  background: white;
  transition: all 0.2s ease;
  
  &--active {
    background: rgb(var(--v-theme-pqs-green));
    color: white;
    font-weight: bold;
  }
  
  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  
  &--error {
    border: 2px solid rgb(var(--v-theme-error));
  }
}
</style>
```

### Pattern 3: Responsive Component

```vue
<template>
  <div class="vxg-responsive-component">
    <div class="vxg-responsive-component__mobile d-md-none">
      <!-- Mobile view -->
    </div>
    <div class="vxg-responsive-component__desktop d-none d-md-block">
      <!-- Desktop view -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vxg-responsive-component {
  padding: 8px;
  
  // Tablet
  @media (min-width: 600px) {
    padding: 16px;
  }
  
  // Desktop
  @media (min-width: 960px) {
    padding: 24px;
  }
  
  &__mobile {
    // Mobile-specific styles
  }
  
  &__desktop {
    // Desktop-specific styles
  }
}
</style>
```

### Pattern 4: Vuetify Component Overrides

```vue
<template>
  <v-btn class="vxg-custom-btn">
    Click Me
  </v-btn>
</template>

<style lang="scss" scoped>
.vxg-custom-btn {
  // ✅ Override Vuetify styles with scoped class
  text-transform: none;
  letter-spacing: normal;
  
  // ✅ Use :deep() for nested Vuetify elements
  :deep(.v-btn__content) {
    font-weight: 500;
  }
}
</style>
```

---

## Best Practices

### 1. Prefer Utility Classes

```vue
<!-- ✅ Good: Use Vuetify utilities -->
<div class="d-flex justify-space-between align-center pa-4">
  <span class="text-h6 font-weight-bold">Title</span>
  <v-icon>mdi-check</v-icon>
</div>

<!-- ❌ Bad: Custom CSS for common patterns -->
<div class="custom-flex-container">
  <span class="custom-title">Title</span>
  <v-icon>mdi-check</v-icon>
</div>

<style scoped>
.custom-flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}
.custom-title {
  font-size: 20px;
  font-weight: bold;
}
</style>
```

### 2. Minimize Inline Styles

```vue
<!-- ❌ Bad: Inline styles -->
<div style="padding: 16px; background: #141B2D; color: white;">
  Content
</div>

<!-- ✅ Good: Use classes -->
<div class="vxg-content-box">
  Content
</div>

<style scoped>
.vxg-content-box {
  padding: 16px;
  background: rgb(var(--v-theme-pqs-dark-blue));
  color: white;
}
</style>
```

**Exceptions** - Inline styles acceptable for:
- Dynamic calculated values (e.g., `width: ${percentage}%`)
- One-off positioning adjustments
- Values from props/state

### 3. Use SCSS Features

```scss
// ✅ Nesting
.vxg-component {
  padding: 16px;
  
  &__item {
    margin-bottom: 8px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  &--active {
    background: rgb(var(--v-theme-primary));
  }
}

// ✅ Variables
$component-spacing: 16px;
$component-radius: 8px;

.vxg-component {
  padding: $component-spacing;
  border-radius: $component-radius;
}

// ✅ Mixins
@mixin truncate-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.vxg-component__title {
  @include truncate-text;
}
```

### 4. Avoid !important

```scss
// ❌ Bad: Using !important
.vxg-component {
  color: white !important;
  background: #141B2D !important;
}

// ✅ Good: Increase specificity or use :deep()
.vxg-component {
  color: white;
  background: rgb(var(--v-theme-pqs-dark-blue));
}

// ✅ Good: Override Vuetify with scoped specificity
.vxg-custom-btn.v-btn {
  background: rgb(var(--v-theme-primary));
}
```

### 5. Group Related Properties

```scss
.vxg-component {
  // Positioning
  position: relative;
  top: 0;
  left: 0;
  z-index: 1;
  
  // Box model
  display: flex;
  width: 100%;
  padding: 16px;
  margin-bottom: 24px;
  
  // Typography
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  
  // Visual
  color: white;
  background: rgb(var(--v-theme-primary));
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  // Animation
  transition: all 0.2s ease;
}
```

### 6. Consistent Transitions

```scss
// Define standard transitions
$transition-fast: 0.1s ease;
$transition-base: 0.2s ease;
$transition-slow: 0.3s ease;

.vxg-component {
  transition: all $transition-base;
  
  &:hover {
    transform: scale(1.05);
  }
}
```

---

## Anti-Patterns to Avoid

### ❌ 1. Excessive Inline Styles

```vue
<!-- ❌ Bad -->
<div 
  style="position: absolute; top: 8px; left: 16px; z-index: 10; 
         background: #141B2D; color: white; padding: 12px; 
         border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"
>
  Content
</div>

<!-- ✅ Good -->
<div class="vxg-overlay-box">
  Content
</div>

<style scoped>
.vxg-overlay-box {
  position: absolute;
  top: 8px;
  left: 16px;
  z-index: 10;
  padding: 12px;
  color: white;
  background: rgb(var(--v-theme-pqs-dark-blue));
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>
```

### ❌ 2. Unscoped Component Styles

```vue
<!-- ❌ Bad -->
<style lang="scss">
.my-component {
  /* Global pollution! */
}
</style>

<!-- ✅ Good -->
<style lang="scss" scoped>
.vxg-my-component {
  /* Scoped to component */
}
</style>
```

### ❌ 3. Hardcoded Colors

```scss
// ❌ Bad
.vxg-component {
  color: #333;
  background: #FFFFFF;
  border: 1px solid #2196F3;
}

// ✅ Good
.vxg-component {
  color: rgb(var(--v-theme-on-surface));
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgb(var(--v-theme-primary));
}
```

### ❌ 4. Non-Responsive Fixed Widths

```scss
// ❌ Bad
.vxg-component {
  width: 400px;  // Breaks on small screens
}

// ✅ Good
.vxg-component {
  width: 100%;
  max-width: 400px;
}

// ✅ Better: Responsive
.vxg-component {
  width: 100%;
  
  @media (min-width: 600px) {
    width: 400px;
  }
}
```

### ❌ 5. Overly Specific Selectors

```scss
// ❌ Bad: Too specific
.vxg-app > .vxg-container > .vxg-content > .vxg-box > .vxg-item {
  color: red;
}

// ✅ Good: Minimal specificity
.vxg-item {
  color: red;
}

// ✅ Good: Use scoping instead
<style scoped>
.vxg-item {
  color: red;
}
</style>
```

### ❌ 6. Magic Numbers

```scss
// ❌ Bad: What do these numbers mean?
.vxg-component {
  top: 237px;
  left: 143px;
  padding: 13px 17px;
}

// ✅ Good: Use meaningful values or variables
.vxg-component {
  top: $header-height + $spacing-md;
  left: $sidebar-width + $spacing-sm;
  padding: $spacing-md $spacing-lg;
}
```

---

## Code Review Checklist

When reviewing CSS/SCSS code, check:

- [ ] **Scoped**: `<style scoped>` used for component styles
- [ ] **Naming**: Uses `vxg-` prefix and BEM-inspired naming
- [ ] **Colors**: Uses Vuetify theme colors, no hardcoded values
- [ ] **Spacing**: Uses Vuetify utilities or multiples of 4px
- [ ] **Responsive**: Uses responsive classes or media queries
- [ ] **No !important**: Avoids `!important` unless absolutely necessary
- [ ] **No inline styles**: Minimal inline styles (only for dynamic values)
- [ ] **Utilities**: Prefers Vuetify utilities over custom CSS
- [ ] **Deep selectors**: Uses `:deep()` syntax for Vue 3
- [ ] **Transitions**: Consistent transition timing
- [ ] **Comments**: Complex CSS has explanatory comments
- [ ] **Browser support**: No vendor prefixes needed (handled by build)

---

## Migration Checklist

When updating old components:

- [ ] Add `<style lang="scss" scoped>` if missing
- [ ] Replace hardcoded colors with theme colors
- [ ] Extract inline styles to scoped CSS
- [ ] Use Vuetify utilities for common patterns
- [ ] Add `vxg-` prefix to custom classes
- [ ] Update Vue 2 deep selectors (`/deep/`, `>>>`) to `:deep()`
- [ ] Replace deprecated Vuetify 2 props/classes
- [ ] Add responsive behavior where needed
- [ ] Remove `!important` declarations
- [ ] Test visual appearance matches original

---

## Resources

- [Vuetify 3 Styling Documentation](https://vuetifyjs.com/en/features/sass-variables/)
- [Vue 3 SFC CSS Features](https://vuejs.org/api/sfc-css-features.html)
- [BEM Naming Convention](http://getbem.com/naming/)
- [CSS Guidelines by Harry Roberts](https://cssguidelin.es/)
- [SCSS Documentation](https://sass-lang.com/documentation)

---

**Next Steps**:
1. Apply these conventions to all existing components
2. Set up linting rules to enforce conventions
3. Create component style templates for common patterns
4. Document component-specific style patterns
5. Train team on CSS conventions

**Prepared by**: frontend-coder-1  
**Review Status**: Ready for Team Review
