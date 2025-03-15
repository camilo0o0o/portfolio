# Custom Fonts in Next.js Project

This document explains how to add and use custom fonts in this Next.js project.

## Adding Custom Fonts

1. Place your font files (OTF, TTF, WOFF, WOFF2) in the `public/fonts` directory.
2. Update the `src/app/fonts.ts` file to include your custom font:

```typescript
import localFont from 'next/font/local'

export const customFont = localFont({
    src: [
        {
            path: '../public/fonts/your-font-file.otf',
            weight: '400',
            style: 'normal',
        },
        // Add additional weights/styles if available
    ],
    display: 'swap',
    variable: '--font-custom', // CSS variable name for the font
})
```

3. Make sure the font is included in the layout by adding it to the `className` in `src/app/layout.tsx`:

```tsx
<body className={`${customFont.variable} ...other classes`}>
```

## Using Custom Fonts

### Method 1: Using the Font Class Directly

```tsx
import { customFont } from '@/app/fonts'

function MyComponent() {
  return <div className={customFont.className}>This text uses the custom font</div>
}
```

### Method 2: Using CSS Variables

In your CSS:
```css
.my-element {
  font-family: var(--font-custom);
}
```

### Method 3: Using Utility Classes

We've added some utility classes in `globals.css` that you can use:

```tsx
function MyComponent() {
  return <div className="custom-font">This text uses the custom font</div>
}
```

## Available Font Utility Classes

- `.custom-font`: Basic custom font styling
- `.custom-font-heading`: Custom font styling for headings with bold weight and adjusted letter spacing

## Current Implementation

In this project, we've implemented the custom font in the Navigation component, where the "UX/UI DESIGN" button uses the custom font while the other buttons use the default Spline Sans Mono font.

To change which elements use the custom font, modify the `useCustomFont` property in the `navButtons` array in `src/components/navbar/Navigation.tsx`. 