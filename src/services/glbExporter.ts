import * as THREE from 'three';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import { ExportOptions } from '../types';

const downloadBlob = (blob: Blob, filename: string) => {
  const link = document.createElement('a');
  link.style.display = 'none';
  document.body.appendChild(link);

  const url = window.URL.createObjectURL(blob);
  link.href = url;
  link.download = filename;
  link.click();

  window.URL.revokeObjectURL(url);
  document.body.removeChild(link);
};

export const generateAndExportGlb = (
  imageUrl: string,
  imageType: string,
  originalFileName: string,
  options: ExportOptions
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const loader = new THREE.TextureLoader();
    loader.load(
      imageUrl,
      (texture) => {
        // The user request about flipping texture for OpenGL is what three.js does by default.
        // `texture.flipY = true;` is default, which correctly orients the image.
        // The GLTFExporter then handles the UV coordinate system conversion. No change needed.
        texture.colorSpace = THREE.SRGBColorSpace;

        const image = texture.image as HTMLImageElement;
        const aspectRatio = image.width / image.height;

        let planeWidth = options.maxSize;
        let planeHeight = options.maxSize;

        if (aspectRatio > 1) {
          // Wider than tall
          planeHeight = options.maxSize / aspectRatio;
        } else {
          // Taller than wide or square
          planeWidth = options.maxSize * aspectRatio;
        }

        const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
        const material = new THREE.MeshStandardMaterial({
          map: texture,
          side: options.doubleSided ? THREE.DoubleSide : THREE.FrontSide,
          metalness: options.metalness,
          roughness: options.roughness,
        });

        // Handle transparency for PNG images
        if (imageType === 'image/png') {
          material.transparent = true;
          material.alphaTest = 0.5; // common practice to avoid z-fighting on transparent edges
        }

        const mesh = new THREE.Mesh(geometry, material);
        // By default, PlaneGeometry is in the XY plane and faces +Z. This matches the requirement.

        const scene = new THREE.Scene();
        scene.add(mesh);
        
        // Optional: add a soft light to the scene for better material preview in viewers
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(0, 1, 1);
        scene.add(directionalLight);

        const exporter = new GLTFExporter();
        exporter.parse(
          scene,
          (gltf) => {
            if (gltf instanceof ArrayBuffer) {
              const blob = new Blob([gltf], { type: 'model/gltf-binary' });
              const outputFileName = originalFileName.replace(/\.[^/.]+$/, "") + ".glb";
              downloadBlob(blob, outputFileName);
              resolve();
            } else {
              // Should not happen with binary: true, but for completeness
              const output = JSON.stringify(gltf, null, 2);
              const blob = new Blob([output], { type: 'text/plain' });
              const outputFileName = originalFileName.replace(/\.[^/.]+$/, "") + ".gltf";
              downloadBlob(blob, outputFileName);
              resolve();
            }
          },
          (error) => {
            console.error('An error happened during GLTF exportation:', error);
            reject(new Error('Failed to export GLTF model.'));
          },
          { binary: true }
        );
      },
      undefined, // onProgress callback not needed
      (error) => {
        console.error('An error happened loading the texture:', error);
        reject(new Error('Failed to load image texture for 3D model.'));
      }
    );
  });
};