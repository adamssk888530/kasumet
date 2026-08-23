/* =========================================================
   KASUMET V1
   3D VIRTUAL MARKET ENGINE
========================================================= */

import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

import { OrbitControls } from
    "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/OrbitControls.js";


/* =========================================================
   START MARKET
========================================================= */

const container = document.getElementById("market3d");

if (!container) {
    console.error("KASUMET 3D: #market3d not found.");
} else {

    /* =====================================================
       SCENE
    ===================================================== */

    const scene = new THREE.Scene();

    scene.background =
        new THREE.Color(0x06100a);

    scene.fog =
        new THREE.Fog(
            0x06100a,
            35,
            180
        );


    /* =====================================================
       CAMERA
    ===================================================== */

    const camera =
        new THREE.PerspectiveCamera(
            55,
            container.clientWidth /
                container.clientHeight,
            0.1,
            500
        );

    camera.position.set(
        35,
        32,
        42
    );


    /* =====================================================
       RENDERER
    ===================================================== */

    const renderer =
        new THREE.WebGLRenderer({
            antialias: true,
            powerPreference: "high-performance"
        });

    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

    renderer.shadowMap.enabled = true;

    renderer.shadowMap.type =
        THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);


    /* =====================================================
       CONTROLS
    ===================================================== */

    const controls =
        new OrbitControls(
            camera,
            renderer.domElement
        );

    controls.enableDamping = true;

    controls.dampingFactor = 0.06;

    controls.minDistance = 15;

    controls.maxDistance = 100;

    controls.maxPolarAngle =
        Math.PI / 2.15;

    controls.target.set(
        0,
        0,
        0
    );


    /* =====================================================
       LIGHTING
    ===================================================== */

    const ambientLight =
        new THREE.AmbientLight(
            0xffffff,
            1.4
        );

    scene.add(ambientLight);


    const moonLight =
        new THREE.DirectionalLight(
            0xffffff,
            2
        );

    moonLight.position.set(
        30,
        60,
        20
    );

    moonLight.castShadow = true;

    moonLight.shadow.mapSize.width =
        2048;

    moonLight.shadow.mapSize.height =
        2048;

    scene.add(moonLight);


    /* =====================================================
       MARKET GROUND
    ===================================================== */

    const groundGeometry =
        new THREE.PlaneGeometry(
            180,
            180
        );

    const groundMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x07120b,
            roughness: 0.85,
            metalness: 0.05
        });

    const ground =
        new THREE.Mesh(
            groundGeometry,
            groundMaterial
        );

    ground.rotation.x =
        -Math.PI / 2;

    ground.receiveShadow = true;

    scene.add(ground);


    /* =====================================================
       ROAD MATERIAL
    ===================================================== */

    const roadMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x18201c,
            roughness: 0.8
        });


    /* =====================================================
       ROAD CREATOR
    ===================================================== */

    function createRoad(
        width,
        depth,
        x,
        z
    ) {

        const geometry =
            new THREE.BoxGeometry(
                width,
                0.12,
                depth
            );

        const road =
            new THREE.Mesh(
                geometry,
                roadMaterial
            );

        road.position.set(
            x,
            0.06,
            z
        );

        road.receiveShadow = true;

        scene.add(road);

        return road;
    }


    /* MAIN ROADS */

    createRoad(
        180,
        14,
        0,
        0
    );

    createRoad(
        14,
        180,
        0,
        0
    );

    createRoad(
        120,
        10,
        0,
        -42
    );

    createRoad(
        120,
        10,
        0,
        42
    );


    /* =====================================================
       BUILDING MATERIAL
    ===================================================== */

    const buildingMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x17241b,
            roughness: 0.65,
            metalness: 0.15
        });


    const roofMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x26382b,
            roughness: 0.55
        });


    /* =====================================================
       SHOP CREATOR
    ===================================================== */

    function createShop(
        name,
        x,
        z,
        width = 12,
        depth = 10,
        height = 8
    ) {

        const group =
            new THREE.Group();

        group.name = name;


        /* BUILDING */

        const buildingGeometry =
            new THREE.BoxGeometry(
                width,
                height,
                depth
            );

        const building =
            new THREE.Mesh(
                buildingGeometry,
                buildingMaterial
            );

        building.position.y =
            height / 2;

        building.castShadow = true;

        building.receiveShadow = true;

        group.add(building);


        /* ROOF */

        const roofGeometry =
            new THREE.BoxGeometry(
                width + 0.8,
                0.8,
                depth + 0.8
            );

        const roof =
            new THREE.Mesh(
                roofGeometry,
                roofMaterial
            );

        roof.position.y =
            height + 0.4;

        roof.castShadow = true;

        group.add(roof);


        /* SHOP FRONT */

        const glassMaterial =
            new THREE.MeshStandardMaterial({
                color: 0x28e36b,
                transparent: true,
                opacity: 0.35,
                metalness: 0.4,
                roughness: 0.2
            });

        const glassGeometry =
            new THREE.BoxGeometry(
                width * 0.7,
                height * 0.45,
                0.15
            );

        const glass =
            new THREE.Mesh(
                glassGeometry,
                glassMaterial
            );

        glass.position.set(
            0,
            height * 0.42,
            depth / 2 + 0.08
        );

        group.add(glass);


        /* SHOP SIGN */

        const signMaterial =
            new THREE.MeshStandardMaterial({
                color: 0x28e36b,
                emissive: 0x28e36b,
                emissiveIntensity: 0.4
            });

        const signGeometry =
            new THREE.BoxGeometry(
                width * 0.65,
                0.8,
                0.25
            );

        const sign =
            new THREE.Mesh(
                signGeometry,
                signMaterial
            );

        sign.position.set(
            0,
            height + 1.1,
            depth / 2
        );

        group.add(sign);


        /* POSITION */

        group.position.set(
            x,
            0,
            z
        );


        scene.add(group);

        return group;
    }


    /* =====================================================
       KASUMET SHOPS
    ===================================================== */

    createShop(
        "Gadget World",
        -28,
        -28,
        14,
        11,
        9
    );

    createShop(
        "Fashion House",
        28,
        -28,
        14,
        11,
        9
    );

    createShop(
        "Car Empire",
        -28,
        28,
        16,
        13,
        8
    );

    createShop(
        "Home Comforts",
        28,
        28,
        15,
        12,
        8
    );

    createShop(
        "Electronics Mall",
        0,
        -58,
        22,
        12,
        10
    );

    createShop(
        "Food Court",
        0,
        58,
        22,
        12,
        8
    );


    /* =====================================================
       MARKET PLAZA
    ===================================================== */

    const plazaGeometry =
        new THREE.CylinderGeometry(
            9,
            9,
            0.4,
            48
        );

    const plazaMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x123c20,
            emissive: 0x0b351a,
            emissiveIntensity: 0.4
        });

    const plaza =
        new THREE.Mesh(
            plazaGeometry,
            plazaMaterial
        );

    plaza.position.y =
        0.25;

    plaza.receiveShadow = true;

    scene.add(plaza);


    /* =====================================================
       PLAZA CENTER
    ===================================================== */

    const centerGeometry =
        new THREE.CylinderGeometry(
            4,
            4,
            2,
            32
        );

    const centerMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x28e36b,
            emissive: 0x28e36b,
            emissiveIntensity: 0.5
        });

    const center =
        new THREE.Mesh(
            centerGeometry,
            centerMaterial
        );

    center.position.y = 1;

    center.castShadow = true;

    scene.add(center);


    /* =====================================================
       TREES
    ===================================================== */

    function createTree(x, z) {

        const group =
            new THREE.Group();


        const trunk =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.35,
                    0.45,
                    2.5,
                    8
                ),
                new THREE.MeshStandardMaterial({
                    color: 0x55351f
                })
            );

        trunk.position.y =
            1.25;

        trunk.castShadow = true;

        group.add(trunk);


        const leaves =
            new THREE.Mesh(
                new THREE.SphereGeometry(
                    2.1,
                    12,
                    12
                ),
                new THREE.MeshStandardMaterial({
                    color: 0x16813b
                })
            );

        leaves.position.y =
            3.3;

        leaves.castShadow = true;

        group.add(leaves);


        group.position.set(
            x,
            0,
            z
        );

        scene.add(group);
    }


    const treePositions = [
        [-12, -15],
        [12, -15],
        [-15, 15],
        [15, 15],
        [-42, -12],
        [42, -12],
        [-42, 12],
        [42, 12],
        [-12, -42],
        [12, -42],
        [-12, 42],
        [12, 42]
    ];

    treePositions.forEach(
        position =>
            createTree(
                position[0],
                position[1]
            )
    );


    /* =====================================================
       STREET LIGHTS
    ===================================================== */

    function createStreetLight(
        x,
        z
    ) {

        const pole =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.12,
                    0.15,
                    5,
                    8
                ),
                new THREE.MeshStandardMaterial({
                    color: 0x4a554e
                })
            );

        pole.position.set(
            x,
            2.5,
            z
        );

        scene.add(pole);


        const light =
            new THREE.PointLight(
                0x8affb0,
                2,
                12
            );

        light.position.set(
            x,
            5.2,
            z
        );

        scene.add(light);


        const bulb =
            new THREE.Mesh(
                new THREE.SphereGeometry(
                    0.3,
                    12,
                    12
                ),
                new THREE.MeshStandardMaterial({
                    color: 0x9affb8,
                    emissive: 0x28e36b,
                    emissiveIntensity: 1
                })
            );

        bulb.position.set(
            x,
            5.2,
            z
        );

        scene.add(bulb);
    }


    [
        [-7, -12],
        [7, -12],
        [-7, 12],
        [7, 12],
        [-12, -7],
        [12, -7],
        [-12, 7],
        [12, 7]
    ].forEach(
        p =>
            createStreetLight(
                p[0],
                p[1]
            )
    );


    /* =====================================================
       CLICKABLE SHOPS
    ===================================================== */

    const raycaster =
        new THREE.Raycaster();

    const mouse =
        new THREE.Vector2();

    renderer.domElement.addEventListener(
        "pointerdown",
        event => {

            const rect =
                renderer.domElement
                    .getBoundingClientRect();

            mouse.x =
                (
                    (event.clientX - rect.left)
                    / rect.width
                ) * 2 - 1;

            mouse.y =
                -(
                    (event.clientY - rect.top)
                    / rect.height
                ) * 2 + 1;

            raycaster.setFromCamera(
                mouse,
                camera
            );

            const objects =
                raycaster.intersectObjects(
                    scene.children,
                    true
                );

            if (
                objects.length === 0
            ) {
                return;
            }

            let selected =
                objects[0].object;

            while (
                selected.parent &&
                selected.parent !== scene
            ) {
                selected =
                    selected.parent;
            }

            if (
                selected.name
            ) {

                console.log(
                    "Kasumet Shop:",
                    selected.name
                );

                window.dispatchEvent(
                    new CustomEvent(
                        "kasumetShopSelected",
                        {
                            detail: {
                                shop:
                                    selected.name
                            }
                        }
                    )
                );
            }
        }
    );


    /* =====================================================
       RESIZE
    ===================================================== */

    function resize() {

        const width =
            container.clientWidth;

        const height =
            container.clientHeight;

        camera.aspect =
            width / height;

        camera.updateProjectionMatrix();

        renderer.setSize(
            width,
            height
        );
    }

    window.addEventListener(
        "resize",
        resize
    );


    /* =====================================================
       ANIMATION
    ===================================================== */

    function animate() {

        requestAnimationFrame(
            animate
        );

        controls.update();

        plaza.rotation.y +=
            0.001;

        center.rotation.y +=
            0.004;

        renderer.render(
            scene,
            camera
        );
    }


    resize();

    animate();

    console.log(
        "KASUMET 3D MARKET READY"
    );
          }
