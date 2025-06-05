
import * as THREE from 'three';

export function applyPatternToModel(model: THREE.Object3D, customization: any) {
  if (!model) return;

  const loader = new THREE.TextureLoader();
  const baseColor = new THREE.Color(customization.patternColor || '#ffffff');

  const applyOnlyColor = () => {
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: baseColor,
          roughness: 0.6,
          metalness: 0.1
        });
        child.material.needsUpdate = true;
      }
    });
  };

  if (customization.pattern === 'solid') {
    applyOnlyColor();
  } else {
    loader.load(
      `/textures/${customization.pattern}.png`,
      (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);

        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshStandardMaterial({
              map: texture,
              color: baseColor,
              roughness: 0.6,
              metalness: 0.1
            });
            child.material.needsUpdate = true;
          }
        });
      },
      undefined,
      () => {
        console.warn('Erro ao carregar textura, aplicando fallback de cor.');
        applyOnlyColor();
      }
    );
  }
}
