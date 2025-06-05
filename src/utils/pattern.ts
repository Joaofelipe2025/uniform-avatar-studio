
import * as THREE from 'three';

export function applyPatternToModel(model: THREE.Object3D, customization: any) {
  const loader = new THREE.TextureLoader();

  if (customization.pattern === 'solid') {
    model.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.material.map = null;
        child.material.color = new THREE.Color(customization.patternColor || customization.baseColor);
        child.material.needsUpdate = true;
      }
    });
  } else {
    loader.load(`/textures/${customization.pattern}.png`, (texture) => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 1); // pode ser ajustável no futuro

      model.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          child.material.map = texture;
          child.material.color = new THREE.Color(customization.patternColor || customization.baseColor); // cor base aplicada junto
          child.material.needsUpdate = true;
        }
      });
    }, undefined, (error) => {
      console.warn(`Failed to load pattern texture: ${customization.pattern}`, error);
      // Fallback to solid color if texture fails to load
      model.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          child.material.map = null;
          child.material.color = new THREE.Color(customization.patternColor || customization.baseColor);
          child.material.needsUpdate = true;
        }
      });
    });
  }
}
