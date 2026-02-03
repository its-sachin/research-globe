# Background Switching Guide

This project now has two background components that can be swapped easily.

## Components

1. **ParticleBackground** - Canvas-based animated particles with orange/yellow colors and mouse interaction
2. **GridBackground** - THREE.js-based 3D grid with animated particles in cyan/green colors

## How to Switch Backgrounds

### To Use GridBackground (3D Grid)

Edit [src/App.tsx](src/App.tsx) and change line 3:

```tsx
// FROM:
import ParticleBackground from './components/ParticleBackground';

// TO:
import GridBackground from './components/GridBackground';
```

Then change line 25 (in the JSX):

```tsx
// FROM:
<ParticleBackground />

// TO:
<GridBackground />
```

**Full example:**
```tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GridBackground from './components/GridBackground';  // ← CHANGED
import ResearchGlobe from './components/ResearchGlobe';
// ... rest of imports
```

### To Switch Back to ParticleBackground (Canvas)

Reverse the changes above:

```tsx
// Change import:
import ParticleBackground from './components/ParticleBackground';

// Change JSX:
<ParticleBackground />
```

## Variable Name Consistency

Both components now use consistent naming conventions:

| ParticleBackground | GridBackground |
|---|---|
| `canvasRef` | `canvasRef` |
| `animationRef` | `animationRef` |
| `handleResize` | `handleResize` |
| `particleCount` | `particleCount` |
| `ambientLight` | `ambientLight` |
| `fillLight` | `fillLight` |
| N/A | `gridGeometry` |
| N/A | `gridMaterial` |
| N/A | `particleGeometry` |
| N/A | `particleMaterial` |

Both components return `null` and manage their own canvas/renderer lifecycle.

## Technical Details

- **ParticleBackground**: Uses HTML5 Canvas 2D for better performance on lower-end devices
- **GridBackground**: Uses THREE.js for 3D effects; appends canvas directly to `document.body`
- Both are fullscreen, fixed-position elements with `zIndex: 0`
- Both handle window resize events properly
- Both clean up resources on unmount
