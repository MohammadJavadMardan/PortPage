function GlowingOrbs() {
    const orbsRef = React.useRef();

    React.useEffect(() => {
        try {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ alpha: true });
            
            renderer.setSize(window.innerWidth, window.innerHeight);
            orbsRef.current.appendChild(renderer.domElement);

            const orbs = [];
            const orbCount = 8; // Increased number of orbs

            for (let i = 0; i < orbCount; i++) {
                const geometry = new THREE.SphereGeometry(0.3, 32, 32);
                const material = new THREE.MeshBasicMaterial({
                    color: new THREE.Color(0.5 + Math.random() * 0.5, 0.5 + Math.random() * 0.5, 0.5 + Math.random() * 0.5),
                    transparent: true,
                    opacity: 0.3
                });
                const orb = new THREE.Mesh(geometry, material);
                
                // Wider distribution
                orb.position.x = (Math.random() - 0.5) * 15;
                orb.position.y = (Math.random() - 0.5) * 15;
                orb.position.z = (Math.random() - 0.5) * 15;
                
                orbs.push({
                    mesh: orb,
                    speed: 0.001 + Math.random() * 0.002,
                    rotation: new THREE.Vector3(
                        Math.random() - 0.5,
                        Math.random() - 0.5,
                        Math.random() - 0.5
                    ).normalize(),
                    originalPosition: orb.position.clone(),
                    time: Math.random() * Math.PI * 2
                });
                
                scene.add(orb);
            }

            camera.position.z = 5;

            const animate = () => {
                requestAnimationFrame(animate);
                
                orbs.forEach(orb => {
                    // Complex orbital movement
                    orb.time += orb.speed;
                    orb.mesh.position.x = orb.originalPosition.x + Math.sin(orb.time) * 2;
                    orb.mesh.position.y = orb.originalPosition.y + Math.cos(orb.time) * 2;
                    orb.mesh.position.z = orb.originalPosition.z + Math.sin(orb.time * 0.5) * 2;

                    // Rotation
                    orb.mesh.rotation.x += orb.speed * orb.rotation.x;
                    orb.mesh.rotation.y += orb.speed * orb.rotation.y;
                    orb.mesh.rotation.z += orb.speed * orb.rotation.z;

                    // Pulsating size
                    const scale = 1 + Math.sin(orb.time * 2) * 0.2;
                    orb.mesh.scale.set(scale, scale, scale);
                });

                renderer.render(scene, camera);
            };

            animate();

            const handleResize = () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                orbsRef.current.removeChild(renderer.domElement);
            };
        } catch (error) {
            reportError(error);
        }
    }, []);

    return (
        <div data-name="glowing-orbs" ref={orbsRef} className="fixed top-0 left-0 -z-10 w-full h-full opacity-30" />
    );
}
