# Tailwind CSS Configuration Guide

## Installation Complete ✓

Tailwind CSS has been successfully installed and configured for the Try Your Ideas project.

### What Was Installed

- **tailwindcss** (v4.1.18) - Utility-first CSS framework
- **@tailwindcss/postcss** (v4.1.18) - PostCSS plugin for Tailwind v4
- **postcss** (v8.5.6) - CSS processing tool

### Configuration Files Created

#### 1. **tailwind.config.ts**
- Defines the content paths that Tailwind scans for class usage
- Configured with component, layout, page, and markdown content paths
- Uses standard Tailwind color palette with sky blue as primary

#### 2. **app/assets/css/main.css**
- Main CSS entry point with Tailwind import directive
- Uses the new `@import "tailwindcss"` syntax for v4
- Ready for custom component extensions via `@layer` (Tailwind v4)

#### 3. **nuxt.config.ts** (Updated)
- Added CSS import path for main.css
- Configured PostCSS with `@tailwindcss/postcss` plugin in the `postcss` config option
- This is the Nuxt-recommended approach (no separate postcss.config.js file)

### Quick Start

#### Using Tailwind Classes in Components

```vue
<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h1 class="text-3xl font-bold text-sky-600 mb-4">Welcome</h1>
      <p class="text-gray-600 mb-6">Get started with Tailwind CSS v4</p>
      <button class="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors">
        Get Started
      </button>
    </div>
  </div>
</template>
```

#### Using Standard Tailwind Components

```vue
<template>
  <div>
    <!-- Alert component with Tailwind styling -->
    <Alert type="success">Project created successfully!</Alert>
    
    <!-- Status badge -->
    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
      Active
    </span>
  </div>
</template>
```

### Common Tailwind Classes

#### Layout
```
flex, grid, block, inline, absolute, relative, fixed
gap, p-*, m-*, w-*, h-*, max-w-*, min-h-*
```

#### Typography
```
text-*, font-bold, font-medium, font-light
leading-*, tracking-*
text-center, text-left, text-right
```

#### Colors
```
bg-sky-600, text-sky-700, border-blue-200
bg-blue-50, text-red-800, bg-green-100
opacity-50, opacity-75
```

#### Effects
```
shadow-md, shadow-lg, shadow-xl
rounded-lg, rounded-full
border-*, border-2
hover:*, focus:*, active:*
transition-*, duration-200
```

#### Responsive Design
```
sm:, md:, lg:, xl:, 2xl:
<div class="w-full md:w-1/2 lg:w-1/3">Responsive width</div>
```

### Customization

#### Adding Custom Colors

Since Tailwind v4 uses CSS-based configuration, add custom colors to `main.css`:

```css
@import "tailwindcss";

@theme {
  --color-brand: {
    50: #f0f9ff;
    500: #0ea5e9;
    900: #0c3d66;
  }
}
```

Then use in components:
```vue
<div class="bg-brand-500 text-brand-50">Custom branded element</div>
```

#### Adding Custom Components

Add to `app/assets/css/main.css` after the import:

```css
@import "tailwindcss";

@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors;
  }

  .card {
    @apply bg-white rounded-lg shadow-md p-6;
  }
}
```

### Running the Project

```bash
# Development server (watch mode)
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run tests
pnpm test
```

### Updated Components

#### Alert.vue
- Refactored to use Tailwind CSS classes
- Props: `type` (info, success, warning, error)
- Automatic styling based on alert type
- Responsive and accessible

Example usage:
```vue
<Alert type="success">Your project was created successfully!</Alert>
<Alert type="warning">Please review the terms before proceeding</Alert>
<Alert type="error">An error occurred while saving</Alert>
```

### Build Status

✅ **Build tested and passing** - The project builds successfully with Tailwind CSS v4

### Next Steps

1. **Update Existing Components**: Replace all CSS with Tailwind classes
2. **Create Reusable Components**: Build component library with Tailwind
3. **Theme Customization**: Extend colors and spacing in main.css using `@theme`
4. **Dark Mode**: Add dark mode support via `@media (prefers-color-scheme: dark)`
5. **Typography Plugin**: Consider using Tailwind prose classes for markdown content

### Useful Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs/v4/overview)
- [Tailwind CSS Components](https://tailwindui.com)
- [Headless UI Components](https://headlessui.com) (pairs well with Tailwind)
- [Nuxt Integration Guide](https://nuxt.com/docs/getting-started/styling)

### Troubleshooting

**Q: Tailwind classes not applying?**
- Check that files are in the `content` array in `tailwind.config.ts`
- Verify `main.css` is imported in `nuxt.config.ts`
- Clear `.nuxt` directory: `rm -rf .nuxt && pnpm dev`

**Q: Custom colors not showing in v4?**
- Add custom colors to `@theme` block in `main.css`
- Ensure proper syntax with color stops (50, 100, etc.)

**Q: Build size concerns?**
- Tailwind v4 automatically purges unused classes in production
- Run `pnpm build` to see actual bundle size
- Check CSS file size: typically 15-30KB gzipped

**Q: Can't use class that should exist?**
- Make sure you're using the correct Tailwind class syntax
- Check for typos in class names
- Some arbitrary values may need safelist in config

### Support

For issues or questions about Tailwind CSS setup:
- Check [Tailwind v4 Migration Guide](https://tailwindcss.com/docs/v4)
- Review official Tailwind documentation
- Check project's issue tracker

---

## Build Test Results

```
✔ Client built in 2283ms
✔ Server built in 2132ms
✔ Nuxt Nitro server built
```

Project builds successfully and is ready for development!
