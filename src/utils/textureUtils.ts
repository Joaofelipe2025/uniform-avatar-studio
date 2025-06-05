
import * as THREE from 'three';
import { hexToRGB } from './colorUtils';

export function applyPatternTexture(
  patternName: string,
  patternColor: string,
  callback: (texture: THREE.Texture | null) => void
) {
  if (patternName === 'solid') {
    callback(null);
    return;
  }

  const textureLoader = new THREE.TextureLoader();
  
  textureLoader.load(
    `/textures/${patternName}.png`,
    (texture) => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(2, 2);
      
      if (patternColor && patternColor !== '#ffffff') {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = () => {
          canvas.width = img.width || 512;
          canvas.height = img.height || 512;
          
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          const color = hexToRGB(patternColor);
          
          for (let i = 0; i < data.length; i += 4) {
            if (data[i] < 10 && data[i + 1] < 10 && data[i + 2] < 10 && data[i + 3] > 0) {
              data[i] = color.r;
              data[i + 1] = color.g;
              data[i + 2] = color.b;
            }
          }
          
          ctx.putImageData(imageData, 0, 0);
          
          const coloredTexture = new THREE.CanvasTexture(canvas);
          coloredTexture.wrapS = THREE.RepeatWrapping;
          coloredTexture.wrapT = THREE.RepeatWrapping;
          coloredTexture.repeat.set(2, 2);
          
          callback(coloredTexture);
        };
        
        img.src = `/textures/${patternName}.png`;
      } else {
        callback(texture);
      }
    },
    undefined,
    (error) => {
      console.warn(`Failed to load pattern: ${patternName}`, error);
      callback(null);
    }
  );
}
