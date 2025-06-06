
import * as THREE from 'three';

export const applyPatternToModel = (
  model: THREE.Object3D,
  customization: {
    baseColor: string;
    pattern: string;
    patternColor: string;
  }
) => {
  // Verifica se é padrão sólido
  if (customization.pattern === 'solid') {
    model.traverse((child: any) => {
      if (child.isMesh) {
        child.material.map = null;
        child.material.alphaMap = null;
        child.material.transparent = false;
        child.material.color = new THREE.Color(customization.patternColor);
        child.material.needsUpdate = true;
      }
    });
    return;
  }

  // Tenta carregar o pattern como textura
  const loader = new THREE.TextureLoader();
  const texturePath = `/textures/${customization.pattern}.png`;

  loader.load(
    texturePath,
    (texture) => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(2, 2); // ajuste conforme o efeito desejado

      model.traverse((child: any) => {
        if (child.isMesh) {
          child.material.map = null;
          child.material.alphaMap = texture;
          child.material.transparent = true;
          child.material.color = new THREE.Color(customization.patternColor);
          child.material.needsUpdate = true;
        }
      });
    },
    undefined,
    (error) => {
      console.error('Erro ao carregar textura:', error);
      // fallback: usa só a cor
      model.traverse((child: any) => {
        if (child.isMesh) {
          child.material.map = null;
          child.material.alphaMap = null;
          child.material.transparent = false;
          child.material.color = new THREE.Color(customization.patternColor);
          child.material.needsUpdate = true;
        }
      });
    }
  );
};
