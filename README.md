# JP — Developer World

An interactive, mouse-controlled 3D portfolio starter built with React, TypeScript, Vite, React Three Fiber, Drei, Framer Motion, and Lucide.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build for production

```bash
npm run build
npm run preview
```

## Mouse controls

- Drag on the 3D scene to rotate the camera.
- Scroll to zoom.
- Click a building, floating label, or matching item in the left navigation to select a destination.
- Click the JP mascot to open or close its dialogue.
- Use the reset button to return to the starting state.

## Customize your portfolio

Edit `src/data/locations.ts` to update the destination names, descriptions, story text, and grid positions.

### Add your real JP mascot

The current mascot in `src/components/World.tsx` is a procedural placeholder made from basic 3D shapes. To use your custom character, export it as `.glb` and place it in `public/models/jp-mascot.glb`. Then replace the `Mascot` placeholder with Drei's `useGLTF`:

```tsx
import { useGLTF } from '@react-three/drei'

function MascotModel() {
  const { scene } = useGLTF('/models/jp-mascot.glb')
  return <primitive object={scene} scale={1} />
}
```

Use a rigged GLB if you want animated walking, waving, or pointing poses. A PNG character can be used in the dialogue card, but a 3D GLB is better for a mascot that belongs in the world.

## Notes

- The grid and buildings are generated from code; each destination is clickable.
- This is a starter experience. Replace the sample descriptions with your real projects, links, skills, and contact details.
- Google Fonts are loaded remotely; the app otherwise runs locally after dependencies are installed.
