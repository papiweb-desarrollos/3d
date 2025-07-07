import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const CoffeeCup3D: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const currentMount = mountRef.current;

        // Scene
        const scene = new THREE.Scene();

        // Camera
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.set(0, 1.5, 4);

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 1.5, 100);
        pointLight.position.set(2, 5, 5);
        scene.add(pointLight);

        // Cup Group
        const cupGroup = new THREE.Group();
        scene.add(cupGroup);

        // Materials
        const cupMaterial = new THREE.MeshStandardMaterial({
            color: 0xb25239, // Terracotta red
            roughness: 0.4, // Slightly more matte for a ceramic feel
            metalness: 0.1,
        });

        const coffeeMaterial = new THREE.MeshStandardMaterial({
            color: 0x3a241c, // Dark brown
            roughness: 0.8,
            metalness: 0.0
        });

        // Cup Body
        const cupBodyGeometry = new THREE.CylinderGeometry(1, 0.8, 2, 32);
        const cupBody = new THREE.Mesh(cupBodyGeometry, cupMaterial);
        cupBody.position.y = 1;
        cupGroup.add(cupBody);

        // Coffee
        const coffeeGeometry = new THREE.CylinderGeometry(0.95, 0.95, 0.1, 32);
        const coffee = new THREE.Mesh(coffeeGeometry, coffeeMaterial);
        coffee.position.y = 1.95;
        cupGroup.add(coffee);

        // Handle
        const handleGeometry = new THREE.TorusGeometry(0.5, 0.15, 16, 100);
        const handle = new THREE.Mesh(handleGeometry, cupMaterial);
        handle.position.x = 1;
        handle.position.y = 1.2;
        handle.rotation.y = Math.PI / 2;
        cupGroup.add(handle);

        // Steam Particles
        const steamParticlesGeometry = new THREE.BufferGeometry();
        const particleCount = 50;
        const posArray = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            posArray[i3] = (Math.random() - 0.5) * 1.5;
            posArray[i3 + 1] = (Math.random() - 0.5) * 0.5;
            posArray[i3 + 2] = (Math.random() - 0.5) * 1.5;
        }
        steamParticlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const steamMaterial = new THREE.PointsMaterial({
            size: 0.08,
            color: 0xffffff,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });
        const steam = new THREE.Points(steamParticlesGeometry, steamMaterial);
        steam.position.y = 2.2;
        cupGroup.add(steam);

        // Animation
        let animationFrameId: number;
        const clock = new THREE.Clock();
        
        const animate = () => {
            const elapsedTime = clock.getElapsedTime();
            
            // Rotate cup
            cupGroup.rotation.y = elapsedTime * 0.3;

            // Animate steam
            const positions = steam.geometry.attributes.position.array as Float32Array;
            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                positions[i3 + 1] += 0.01; 
                if (positions[i3 + 1] > 2) {
                    positions[i3 + 1] = (Math.random() - 0.5) * 0.5;
                }
            }
            steam.geometry.attributes.position.needsUpdate = true;
            steam.rotation.y = elapsedTime * 0.1;

            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();
        
        // Handle Resize
        const handleResize = () => {
            if (!currentMount) return;
            const width = currentMount.clientWidth;
            const height = currentMount.clientHeight;
            
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            if (currentMount && renderer.domElement) {
                currentMount.removeChild(renderer.domElement);
            }
            scene.traverse(object => {
                if (object instanceof THREE.Mesh) {
                    object.geometry.dispose();
                    if(Array.isArray(object.material)) {
                        object.material.forEach(material => material.dispose());
                    } else if (object.material) {
                        object.material.dispose();
                    }
                }
            });
            steamMaterial.dispose();
            steamParticlesGeometry.dispose();
            renderer.dispose();
        };

    }, []);

    return <div ref={mountRef} className="w-full h-full" />;
};

export default CoffeeCup3D;