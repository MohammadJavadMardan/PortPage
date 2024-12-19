function Background3D() {
    const canvasRef = React.useRef();

    React.useEffect(() => {
        try {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ alpha: true });
            
            renderer.setSize(window.innerWidth, window.innerHeight);
            canvasRef.current.appendChild(renderer.domElement);

            const geometry = new THREE.IcosahedronGeometry(2, 1);
            const material = new THREE.MeshBasicMaterial({
                color: 0x333333,
                wireframe: true,
                transparent: true,
                opacity: 0.3
            });
            const sphere = new THREE.Mesh(geometry, material);
            scene.add(sphere);

            // Add outer sphere
            const outerGeometry = new THREE.IcosahedronGeometry(4, 1);
            const outerMaterial = new THREE.MeshBasicMaterial({
                color: 0x222222,
                wireframe: true,
                transparent: true,
                opacity: 0.1
            });
            const outerSphere = new THREE.Mesh(outerGeometry, outerMaterial);
            scene.add(outerSphere);

            camera.position.z = 5;

            const animate = () => {
                requestAnimationFrame(animate);
                sphere.rotation.x += 0.0005;
                sphere.rotation.y += 0.0005;
                sphere.rotation.z += 0.0005;

                outerSphere.rotation.x -= 0.0003;
                outerSphere.rotation.y -= 0.0003;
                outerSphere.rotation.z -= 0.0003;

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
                canvasRef.current.removeChild(renderer.domElement);
            };
        } catch (error) {
            reportError(error);
        }
    }, []);

    return (
        <div data-name="background-3d" ref={canvasRef} className="fixed top-0 left-0 -z-20 w-full h-full opacity-40" />
    );
}
