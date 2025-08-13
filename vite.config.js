import { defineConfig } from 'vite'
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
plugins:[wasm() , topLevelAwait(),   tailwindcss(),topLevelAwait()],
 build: {
        sourcemap: true,

          rollupOptions: {
      external: ['ammo.js'],
    }
    },
  //   ssr: {
  // //   noExternal: ['ammo.js'] 
  // // },

    
   assetsInclude: [
  '**/*.glb',
  '**/*.gltf',
  '**/*.fbx',
  '**/*.obj',
  '**/*.bin',
  '**/*.mp3',
  '**/*.ogg',
  '**/*.wav',
  '**/*.jpg',
  '**/*.jpeg',
  '**/*.png',
  '**/*.gif',
  '**/*.svg',
  '**/*.tga',
  '**/*.mtl'
],
})
