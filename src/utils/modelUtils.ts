
import * as THREE from 'three';
import { Object3D, Mesh, MeshStandardMaterial } from 'three';
import { applyPatternTexture } from './textureUtils';

export function centerAndScaleModel(model: Object3D) {
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = 2.5 / maxDim;
  
  model.scale.setScalar(scale);
  model.position.set(-center.x * scale, -center.y * scale + 0.2, -center.z * scale);
}

export function applyCustomization(
  model: Object3D,
  options: {
    baseColor: string;
    pattern: string;
    patternColor?: string;
  }
) {
  model.traverse((child) => {
    if (child instanceof Mesh && child.name.startsWith("Cloth_mesh")) {
      if (child.material instanceof MeshStandardMaterial) {
        child.material = child.material.clone();
        child.material.color.set(options.baseColor);

        if (options.pattern && options.pattern !== 'solid' && options.patternColor) {
          applyPatternTexture(
            options.pattern,
            options.patternColor,
            (texture) => {
              if (texture) {
                child.material.map = texture;
              } else {
                child.material.map = null;
              }
              child.material.needsUpdate = true;
            }
          );
        } else {
          child.material.map = null;
          child.material.needsUpdate = true;
        }
      }
    }
  });
}
