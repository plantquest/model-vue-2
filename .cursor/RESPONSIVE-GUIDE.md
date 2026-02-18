# Responsive Design Guide - @plantquest/model-vue

**Project**: @plantquest/model-vue (Vue 3 Migration)  
**Date**: February 10, 2026  
**Phase**: Week 4-5 - Task 4.1  
**Author**: frontend-coder-1

---

## Table of Contents

1. [Vuetify 3 Breakpoints](#vuetify-3-breakpoints)
2. [Responsive Patterns](#responsive-patterns)
3. [Component-Specific Behavior](#component-specific-behavior)
4. [Testing Strategy](#testing-strategy)
5. [Common Issues & Solutions](#common-issues--solutions)

---

## Vuetify 3 Breakpoints

### Standard Breakpoints

Vuetify 3 uses the following breakpoint system:

| Breakpoint | Range | Device Type | CSS Media Query |
|------------|-------|-------------|-----------------|
| **xs** | 0px - 599px | Mobile (portrait) | `@media (max-width: 599px)` |
| **sm** | 600px - 959px | Mobile (landscape) / Tablet (portrait) | `@media (min-width: 600px) and (max-width: 959px)` |
| **md** | 960px - 1279px | Tablet (landscape) / Small Desktop | `@media (min-width: 960px) and (max-width: 1279px)` |
| **lg** | 1280px - 1919px | Desktop | `@media (min-width: 1280px) and (max-width: 1919px)` |
| **xl** | 1920px+ | Large Desktop / 4K | `@media (min-width: 1920px)` |

### Configuration

Breakpoints are defined in `src/plugins/vuetify.js`:

```javascript
const breakpoints = {
  thresholds: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
}
```

### Accessing Breakpoints in Components

#### Using Display Helper

```vue
<script setup>
import { useDisplay } from 'vuetify'

const { xs, sm, md, lg, xl, mobile, name } = useDisplay()

// xs, sm, md, lg, xl are reactive booleans
// mobile is true when xs or sm
// name is the current breakpoint name: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
</script>

<template>
  <div>
    <div v-if="mobile">Mobile View</div>
    <div v-else>Desktop View</div>
    
    <div>Current breakpoint: {{ name }}</div>
  </div>
</template>
```

#### Using CSS Media Queries

```scss
.my-component {
  padding: 16px;
  
  // Mobile (xs)
  @media (max-width: 599px) {
    padding: 8px;
  }
  
  // Tablet (sm)
  @media (min-width: 600px) and (max-width: 959px) {
    padding: 12px;
  }
  
  // Desktop (md+)
  @media (min-width: 960px) {
    padding: 20px;
  }
}
```

---

## Responsive Patterns

### 1. Responsive Spacing

#### Using Vuetify Utility Classes

```vue
<!-- Responsive padding -->
<div class="pa-2 pa-sm-4 pa-md-6 pa-lg-8">
  <!-- Padding: 8px (xs), 16px (sm), 24px (md), 32px (lg+) -->
</div>

<!-- Responsive margin -->
<div class="ma-2 ma-sm-3 ma-md-4 ma-lg-5">
  <!-- Margin: 8px (xs), 12px (sm), 16px (md), 20px (lg+) -->
</div>

<!-- Directional spacing -->
<div class="mt-4 mt-md-8">
  <!-- Margin-top: 16px (xs-sm), 32px (md+) -->
</div>

<div class="mx-2 mx-md-6">
  <!-- Horizontal margin: 8px (xs-sm), 24px (md+) -->
</div>
```

#### Spacing Scale Reference

Each unit = 4px:
- `0` = 0px
- `1` = 4px
- `2` = 8px
- `3` = 12px
- `4` = 16px
- `6` = 24px
- `8` = 32px
- `12` = 48px
- `16` = 64px

### 2. Responsive Typography

```vue
<!-- Responsive text size -->
<h1 class="text-h4 text-md-h3 text-lg-h2">
  <!-- h4 on mobile, h3 on tablet, h2 on desktop -->
</h1>

<!-- Responsive text alignment -->
<div class="text-center text-md-left">
  <!-- Centered on mobile, left-aligned on tablet+ -->
</div>
```

### 3. Responsive Visibility

```vue
<!-- Hide on specific breakpoints -->
<div class="d-none d-md-block">
  <!-- Hidden on xs/sm, visible on md+ -->
</div>

<div class="d-block d-md-none">
  <!-- Visible on xs/sm, hidden on md+ -->
</div>

<!-- Show only on mobile -->
<div class="d-sm-none">
  <!-- Visible only on xs -->
</div>
```

### 4. Responsive Columns

```vue
<v-row>
  <v-col cols="12" sm="6" md="4" lg="3">
    <!-- Full width (xs), half (sm), third (md), quarter (lg+) -->
  </v-col>
</v-row>
```

### 5. Responsive Components

```vue
<!-- Responsive v-btn -->
<v-btn 
  size="small" 
  :class="{ 'text-none': $vuetify.display.xs }"
>
  <span class="d-none d-sm-inline">Full Text</span>
  <span class="d-inline d-sm-none">Short</span>
</v-btn>

<!-- Responsive v-navigation-drawer -->
<v-navigation-drawer
  v-model="drawer"
  :temporary="$vuetify.display.mobile"
  :permanent="!$vuetify.display.mobile"
  :width="$vuetify.display.xs ? 280 : 320"
>
  <!-- Temporary on mobile, permanent on desktop -->
</v-navigation-drawer>
```

---

## Component-Specific Behavior

### BasicHead (v-app-bar)

**Desktop (lg+)**:
- Full toolbar with all elements visible
- Horizontal layout
- Search bar expanded
- All utility buttons visible

**Tablet (md)**:
- Slightly compressed layout
- Search bar medium size
- All elements still visible

**Mobile (sm/xs)**:
- Hamburger menu icon
- Collapsed search (expand on click)
- Dropdown for utility buttons
- Responsive padding

**Implementation**:

```vue
<template>
  <v-app-bar app :height="mobile ? 56 : 64">
    <!-- Mobile: hamburger menu -->
    <v-app-bar-nav-icon 
      v-if="mobile" 
      @click="toggleDrawer"
    />
    
    <!-- Desktop: full toolbar -->
    <HeadToolbar v-if="!mobile" />
    
    <!-- Responsive search -->
    <HeadSearch 
      :class="{ 'search-mobile': mobile, 'search-desktop': !mobile }"
    />
  </v-app-bar>
</template>

<script setup>
import { useDisplay } from 'vuetify'

const { mobile, xs, sm, md, lg, xl } = useDisplay()
</script>

<style lang="scss" scoped>
.search-mobile {
  width: 100%;
  max-width: 200px;
}

.search-desktop {
  width: 100%;
  max-width: 400px;
}
</style>
```

### BasicSide (v-navigation-drawer)

**Desktop (lg+)**:
- Permanent drawer
- Width: 280px
- Full menu items with icons and text

**Tablet (md)**:
- Permanent drawer (optional: temporary)
- Width: 280px
- Full menu items

**Mobile (sm/xs)**:
- Temporary drawer (overlay)
- Width: 280px (full viewport width on xs)
- Collapsed menu items (icons only) or full overlay

**Implementation**:

```vue
<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    :temporary="mobile"
    :permanent="!mobile"
    :width="xs ? '100%' : 280"
    :touchless="!mobile"
  >
    <!-- Menu content -->
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'
import { useDisplay } from 'vuetify'

const { mobile, xs } = useDisplay()
const drawer = ref(!mobile.value)
</script>
```

### BasicNavStages (v-expansion-panels)

**Desktop (lg+)**:
- Expansion panel width: auto
- Stage items: full height (85px)
- Text: full descriptions

**Tablet (md)**:
- Expansion panel width: auto
- Stage items: medium height (75px)
- Text: abbreviated

**Mobile (sm/xs)**:
- Expansion panel width: 100%
- Stage items: compact height (60px)
- Text: short descriptions
- Scrollable if many stages

**Implementation**:

```vue
<template>
  <div 
    class="basic-nav-stages"
    :style="navStagesStyle"
  >
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-text>
          <NavStageItem
            v-for="(stage, index) in stages"
            :key="index"
            :stage="stage"
            :compact="mobile"
          />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDisplay } from 'vuetify'

const { mobile, xs, sm } = useDisplay()

const navStagesStyle = computed(() => ({
  width: xs.value ? '100%' : sm.value ? 'calc(100% - 16px)' : 'auto',
  maxHeight: mobile.value ? '300px' : '400px',
  overflowY: 'auto'
}))
</script>
```

### BasicDataTable (v-data-table)

**Desktop (lg+)**:
- All columns visible
- Rows per page: 25, 50, 75, 100
- Column filters in header
- Inline editing

**Tablet (md)**:
- All columns visible
- Rows per page: 25, 50
- Column filters in header
- Inline editing

**Mobile (sm/xs)**:
- Important columns only (configurable)
- Rows per page: 10, 25
- Column filters in sheet/dialog
- Edit in dialog (not inline)
- Horizontal scroll for remaining columns

**Implementation**:

```vue
<template>
  <v-data-table
    :headers="responsiveHeaders"
    :items="items"
    :items-per-page="mobile ? 10 : 25"
    :density="mobile ? 'compact' : 'default'"
    :mobile-breakpoint="sm ? 600 : 960"
  >
    <!-- Mobile: card layout -->
    <template v-if="mobile" v-slot:item="{ item }">
      <v-card class="mb-2">
        <v-card-text>
          <div v-for="header in responsiveHeaders" :key="header.value">
            <strong>{{ header.text }}:</strong> {{ item[header.value] }}
          </div>
        </v-card-text>
      </v-card>
    </template>
  </v-data-table>
</template>

<script setup>
import { computed } from 'vue'
import { useDisplay } from 'vuetify'

const { mobile, xs, sm } = useDisplay()

// Show fewer columns on mobile
const responsiveHeaders = computed(() => {
  if (xs.value) {
    return headers.filter(h => h.priority === 'high')
  }
  if (sm.value) {
    return headers.filter(h => h.priority !== 'low')
  }
  return headers
})
</script>
```

### BasicFoot (v-footer)

**Desktop (lg+)**:
- Full footer with links and copyright
- Horizontal layout

**Mobile (sm/xs)**:
- Vertical stacked layout
- Condensed padding

```vue
<template>
  <v-footer app>
    <v-row :class="{ 'flex-column': mobile }">
      <v-col :cols="mobile ? 12 : 'auto'">
        <!-- Links -->
      </v-col>
      <v-col :cols="mobile ? 12 : 'auto'" :class="mobile ? 'text-center' : 'text-right'">
        <!-- Copyright -->
      </v-col>
    </v-row>
  </v-footer>
</template>
```

---

## Testing Strategy

### Manual Testing Checklist

Test each component at all breakpoints:

#### 1. BasicHead
- [ ] **xs (< 600px)**: iPhone SE, mobile portrait
  - [ ] Hamburger menu icon visible
  - [ ] Search bar compact
  - [ ] No overflow/horizontal scroll
  - [ ] Touch targets ≥ 44px × 44px
  
- [ ] **sm (600-959px)**: iPad portrait, large phone landscape
  - [ ] Menu items visible/collapsed appropriately
  - [ ] Search bar medium size
  - [ ] Utility buttons accessible
  
- [ ] **md (960-1279px)**: iPad landscape, small laptop
  - [ ] Full toolbar layout
  - [ ] All elements visible
  - [ ] Proper spacing
  
- [ ] **lg (1280-1919px)**: Desktop
  - [ ] Optimal layout
  - [ ] All features accessible
  
- [ ] **xl (1920px+)**: Large desktop
  - [ ] No excessive whitespace
  - [ ] Centered or max-width constrained

#### 2. BasicSide
- [ ] **xs**: Temporary drawer, full viewport width
- [ ] **sm**: Temporary drawer, 280px width
- [ ] **md+**: Permanent drawer, 280px width
- [ ] Drawer opens/closes smoothly
- [ ] Menu items readable at all sizes
- [ ] No content clipping

#### 3. BasicNavStages
- [ ] **xs**: Compact stages, scrollable
- [ ] **sm**: Medium stages
- [ ] **md+**: Full-size stages
- [ ] Text truncation handled gracefully
- [ ] Stage selection works on touch devices

#### 4. BasicDataTable
- [ ] **xs**: Card layout, priority columns only
- [ ] **sm**: Important columns, compact density
- [ ] **md+**: All columns, default density
- [ ] Horizontal scroll on xs/sm if needed
- [ ] Filter dialogs usable on mobile
- [ ] Edit functionality accessible

### Device Testing Matrix

| Device | Breakpoint | Orientation | Priority |
|--------|-----------|-------------|----------|
| iPhone SE | xs | Portrait | HIGH |
| iPhone 14 Pro | xs/sm | Portrait/Landscape | HIGH |
| iPad Mini | sm/md | Portrait/Landscape | MEDIUM |
| iPad Pro 11" | md/lg | Portrait/Landscape | MEDIUM |
| Desktop 1440p | lg | - | HIGH |
| Desktop 4K | xl | - | LOW |

### Browser DevTools Testing

```javascript
// Test all breakpoints in Chrome DevTools

// Open DevTools → Toggle Device Toolbar (Cmd+Shift+M)
// Add custom devices:

{
  name: "PlantQuest Mobile",
  width: 375,
  height: 667,
  devicePixelRatio: 2
}

{
  name: "PlantQuest Tablet",
  width: 768,
  height: 1024,
  devicePixelRatio: 2
}

{
  name: "PlantQuest Desktop",
  width: 1440,
  height: 900,
  devicePixelRatio: 1
}
```

### Automated Testing

Create responsive tests with Vitest:

```typescript
// src/__tests__/responsive/BasicHead.spec.ts
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import BasicHead from '@/components/BasicHead.vue'

describe('BasicHead Responsive', () => {
  it('renders mobile layout at xs breakpoint', () => {
    const vuetify = createVuetify({
      display: {
        mobileBreakpoint: 'xs',
        thresholds: { xs: 0, sm: 600 }
      }
    })
    
    // Mock window.innerWidth
    global.innerWidth = 375
    
    const wrapper = mount(BasicHead, {
      global: {
        plugins: [vuetify]
      }
    })
    
    expect(wrapper.find('.mobile-menu').exists()).toBe(true)
  })
  
  it('renders desktop layout at lg breakpoint', () => {
    global.innerWidth = 1440
    
    const wrapper = mount(BasicHead, {
      global: {
        plugins: [createVuetify()]
      }
    })
    
    expect(wrapper.find('.desktop-toolbar').exists()).toBe(true)
  })
})
```

---

## Common Issues & Solutions

### Issue 1: Content Overflow on Mobile

**Problem**: Content overflows viewport on xs breakpoint

**Solution**:
```scss
// Add to global styles or component
.container {
  max-width: 100vw;
  overflow-x: hidden;
  box-sizing: border-box;
}

// Ensure all child elements respect container
* {
  box-sizing: inherit;
}
```

### Issue 2: Touch Targets Too Small

**Problem**: Buttons/icons < 44px on mobile

**Solution**:
```vue
<v-btn
  :size="mobile ? 'default' : 'small'"
  :min-width="mobile ? 44 : undefined"
  :min-height="mobile ? 44 : undefined"
>
  Click Me
</v-btn>
```

### Issue 3: Text Truncation

**Problem**: Long text breaks layout on small screens

**Solution**:
```scss
.truncate-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

// Or use Vuetify utility
.text-truncate {
  /* Built-in Vuetify class */
}
```

### Issue 4: Fixed Widths Breaking Layout

**Problem**: Fixed pixel widths don't adapt

**Solution**:
```vue
<!-- ❌ Bad: Fixed width -->
<div style="width: 400px;">

<!-- ✅ Good: Responsive width -->
<div style="width: 100%; max-width: 400px;">

<!-- ✅ Better: Use Vuetify grid -->
<v-col cols="12" md="6" lg="4">
```

### Issue 5: Horizontal Scroll on Mobile

**Problem**: Page scrolls horizontally on xs

**Solution**:
```scss
// Add to main app styles
html, body {
  overflow-x: hidden;
  max-width: 100vw;
}

// Check for fixed widths and percentages > 100%
// Use this diagnostic
.debug-overflow {
  * {
    outline: 1px solid red !important;
  }
}
```

### Issue 6: Navigation Drawer Not Responsive

**Problem**: Drawer remains permanent on mobile

**Solution**:
```vue
<script setup>
import { useDisplay } from 'vuetify'
const { mobile } = useDisplay()
</script>

<template>
  <v-navigation-drawer
    :temporary="mobile"
    :permanent="!mobile"
  >
</template>
```

---

## Best Practices

### 1. Mobile-First Approach

Start with mobile styles, then add desktop enhancements:

```scss
// ✅ Mobile-first
.component {
  padding: 8px;
  font-size: 14px;
  
  // Tablet
  @media (min-width: 600px) {
    padding: 16px;
  }
  
  // Desktop
  @media (min-width: 960px) {
    padding: 24px;
    font-size: 16px;
  }
}
```

### 2. Use Vuetify Utilities

Prefer Vuetify responsive classes over custom CSS:

```vue
<!-- ✅ Use Vuetify utilities -->
<div class="pa-2 pa-md-4 text-center text-md-left">

<!-- ❌ Avoid custom media queries when utilities exist -->
<div class="custom-responsive">
```

### 3. Test Early and Often

Don't wait until the end to test responsive behavior:
- Test each component as you build it
- Use browser DevTools device emulation
- Test on real devices regularly

### 4. Consistent Breakpoints

Use the same breakpoint logic across all components:
```typescript
// Create composable for consistency
export const useResponsive = () => {
  const { xs, sm, md, lg, xl, mobile } = useDisplay()
  
  return {
    isXs: xs,
    isSm: sm,
    isMd: md,
    isLg: lg,
    isXl: xl,
    isMobile: mobile,
    isTablet: computed(() => sm.value || md.value),
    isDesktop: computed(() => lg.value || xl.value)
  }
}
```

---

## Resources

- [Vuetify 3 Display Documentation](https://vuetifyjs.com/en/features/display-and-platform/)
- [Vuetify 3 Breakpoints](https://vuetifyjs.com/en/features/breakpoints/)
- [Material Design Responsive Layout](https://m3.material.io/foundations/layout/understanding-layout/overview)
- [Web.dev Responsive Design](https://web.dev/responsive-web-design-basics/)

---

**Next Steps**:
1. Implement responsive behavior in all components
2. Add responsive unit tests
3. Test on physical devices
4. Document component-specific responsive patterns
5. Create responsive design system documentation

**Prepared by**: frontend-coder-1  
**Review Status**: Ready for Team Review
