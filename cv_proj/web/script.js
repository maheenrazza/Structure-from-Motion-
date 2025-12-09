let scene, camera, renderer, controls;
const cameras = [];

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    
    camera = new THREE.PerspectiveCamera(
        75, window.innerWidth/window.innerHeight, 0.1, 2000
    );

    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;

    // Add some lighting to help visualize
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Load point cloud
    const loader = new THREE.PLYLoader();
    loader.load("/merged_room.ply", (geometry) => {
        geometry.computeVertexNormals();
        const material = new THREE.PointsMaterial({ 
            size: 0.05, 
            vertexColors: true 
        });
        const pointCloud = new THREE.Points(geometry, material);
        scene.add(pointCloud);
        console.log('Point cloud loaded:', geometry.attributes.position.count, 'points');
    }, undefined, (error) => {
        console.error('Error loading point cloud:', error);
    });

    // Load camera poses
    fetch("/camera_poses.json")
        .then(r => r.json())
        .then(data => {
            data.cameras.forEach(c => {
                // Handle nested array format [[x], [y], [z]]
                const trans = c.translation;
                const pos = new THREE.Vector3(
                    Array.isArray(trans[0]) ? trans[0][0] : trans[0],
                    Array.isArray(trans[1]) ? trans[1][0] : trans[1],
                    Array.isArray(trans[2]) ? trans[2][0] : trans[2]
                );
                cameras.push(pos);
            });

            console.log('Loaded', cameras.length, 'camera positions');
            if (cameras.length > 0) {
                camera.position.copy(cameras[0]);
                camera.position.z += 5; // Move camera back a bit to see the scene
            }
            animate();
        })
        .catch(err => {
            console.error('Error loading camera poses:', err);
            // Set a default camera position if loading fails
            camera.position.set(0, 0, 10);
            animate();
        });

    window.addEventListener("resize", onResize);
}

function onResize() {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function goToCamera(i) {
    if (i < 0 || i >= cameras.length) return;

    new TWEEN.Tween(camera.position)
        .to(cameras[i], 1500)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start();
}

function animate(time) {
    requestAnimationFrame(animate);
    if (typeof TWEEN !== 'undefined') {
        TWEEN.update(time);
    }
    controls.update();
    renderer.render(scene, camera);
}

init();

// Example: move to camera 2 after 2 seconds
setTimeout(() => goToCamera(2), 2000);
