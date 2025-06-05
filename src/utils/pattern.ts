
import * as THREE from 'three';

export function applyPatternToModel(model: THREE.Object3D, customization: any) {
  const loader = new THREE.TextureLoader();
  const color = new THREE.Color(customization.patternColor || '#ffffff');

  const applyColorOnly = () => {
    model.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.material.map = null;
        child.material.color = color;
        child.material.needsUpdate = true;
      }
    });
  };

  if (!model) return;

  if (customization.pattern === 'solid') {
    applyColorOnly();
  } else {
    loader.load(`/textures/${customization.pattern}.png`,
      (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);

        model.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
            child.material.map = texture;
            child.material.color = color;
            child.material.needsUpdate = true;
          }
        });
      },
      undefined,
      () => {
        console.warn('Falha ao carregar o pattern. Aplicando apenas cor.');
        applyColorOnly();
      }
    );
  }
}
