/* =========================================================
   KASUMET V1
   3D VIRTUAL MARKET
========================================================= */

import * as THREE from
    "https://esm.sh/three@0.180.0";

import { OrbitControls } from
    "https://esm.sh/three@0.180.0/examples/jsm/controls/OrbitControls.js";


/* =========================================================
   MARKET CONTAINER
========================================================= */

const container =
    document.getElementById("market3d");


if (!container) {

    console.error(
        "KASUMET 3D: #market3d not found."
    );

} else {


    /* =====================================================
       SCENE
    ===================================================== */

    const scene =
        new THREE.Scene();

    scene.background =
        new THREE.Color(
            0x06100a
        );

    scene.fog =
        new THREE.Fog(
            0x06100a,
            70,
            190
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
        48,
        42,
        55
    );


    /* =====================================================
       RENDERER
    ===================================================== */

    const renderer =
        new THREE.WebGLRenderer({

            antialias: true,

            powerPreference:
                "high-performance"

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


    renderer.shadowMap.enabled =
        true;


    renderer.shadowMap.type =
        THREE.PCFSoftShadowMap;


    renderer.outputColorSpace =
        THREE.SRGBColorSpace;


    container.appendChild(
        renderer.domElement
    );


    /* =====================================================
       CONTROLS
    ===================================================== */

    const controls =
        new OrbitControls(
            camera,
            renderer.domElement
        );


    controls.enableDamping =
        true;

    controls.dampingFactor =
        0.06;


    controls.minDistance =
        25;

    controls.maxDistance =
        120;


    controls.maxPolarAngle =
        Math.PI / 2.25;


    controls.target.set(
        0,
        0,
        0
    );


    /* =====================================================
       LIGHTS
    ===================================================== */

    const ambient =
        new THREE.AmbientLight(
            0xffffff,
            1.5
        );

    scene.add(
        ambient
    );


    const sun =
        new THREE.DirectionalLight(
            0xffffff,
            2.2
        );


    sun.position.set(
        40,
        80,
        30
    );


    sun.castShadow =
        true;


    sun.shadow.mapSize.width =
        2048;

    sun.shadow.mapSize.height =
        2048;


    scene.add(
        sun
    );


    /* GREEN CITY LIGHT */

    const greenLight =
        new THREE.PointLight(
            0x28e36b,
            4,
            100
        );


    greenLight.position.set(
        0,
        15,
        0
    );


    scene.add(
        greenLight
    );


    /* =====================================================
       GROUND
    ===================================================== */

    const ground =
        new THREE.Mesh(

            new THREE.PlaneGeometry(
                180,
                180
            ),

            new THREE.MeshStandardMaterial({

                color:
                    0x07150c,

                roughness:
                    0.9,

                metalness:
                    0.05

            })

        );


    ground.rotation.x =
        -Math.PI / 2;


    ground.receiveShadow =
        true;


    scene.add(
        ground
    );


    /* =====================================================
       CITY GRID
    ===================================================== */

    const grid =
        new THREE.GridHelper(
            160,
            32,
            0x1d7d42,
            0x10331d
        );


    grid.position.y =
        0.03;


    scene.add(
        grid
    );


    /* =====================================================
       ROAD MATERIAL
    ===================================================== */

    const roadMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0x151d18,

            roughness:
                0.85

        });


    const roadLineMaterial =
        new THREE.MeshBasicMaterial({

            color:
                0x4e6657

        });


    /* =====================================================
       ROAD
    ===================================================== */

    function createRoad(
        width,
        depth,
        x,
        z
    ) {

        const road =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    width,
                    0.15,
                    depth
                ),

                roadMaterial

            );


        road.position.set(
            x,
            0.08,
            z
        );


        road.receiveShadow =
            true;


        scene.add(
            road
        );


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
        180,
        10,
        0,
        -45
    );


    createRoad(
        180,
        10,
        0,
        45
    );


    createRoad(
        10,
        180,
        -45,
        0
    );


    createRoad(
        10,
        180,
        45,
        0
    );


    /* =====================================================
       ROAD MARKINGS
    ===================================================== */

    function createRoadLine(
        x,
        z,
        width,
        depth
    ) {

        const line =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    width,
                    0.03,
                    depth
                ),

                roadLineMaterial

            );


        line.position.set(
            x,
            0.18,
            z
        );


        scene.add(
            line
        );

    }


    for (
        let i = -80;
        i <= 80;
        i += 12
    ) {

        createRoadLine(
            i,
            0,
            5,
            0.15
        );


        createRoadLine(
            i,
            -45,
            5,
            0.15
        );


        createRoadLine(
            i,
            45,
            5,
            0.15
        );


        createRoadLine(
            0,
            i,
            0.15,
            5
        );

    }


    /* =====================================================
       BUILDING MATERIALS
    ===================================================== */

    function buildingMaterial(
        color
    ) {

        return new THREE.MeshStandardMaterial({

            color:
                color,

            roughness:
                0.65,

            metalness:
                0.15

        });

    }


    /* =====================================================
       WINDOWS
    ===================================================== */

    function createWindows(
        group,
        width,
        height,
        depth
    ) {

        const windowMaterial =
            new THREE.MeshStandardMaterial({

                color:
                    0x153d29,

                emissive:
                    0x0b6b32,

                emissiveIntensity:
                    0.35,

                metalness:
                    0.3,

                roughness:
                    0.25

            });


        const rows =
            Math.max(
                1,
                Math.floor(
                    height / 3
                )
            );


        const columns =
            Math.max(
                2,
                Math.floor(
                    width / 3
                )
            );


        for (
            let r = 0;
            r < rows;
            r++
        ) {

            for (
                let c = 0;
                c < columns;
                c++
            ) {

                const windowMesh =
                    new THREE.Mesh(

                        new THREE.BoxGeometry(
                            1.5,
                            1.2,
                            0.12
                        ),

                        windowMaterial

                    );


                const gap =
                    width /
                    (columns + 1);


                windowMesh.position.set(

                    -width / 2 +
                    gap * (c + 1),

                    2.3 +
                    r * 2.5,

                    depth / 2 + 0.08

                );


                group.add(
                    windowMesh
                );

            }

        }

    }


    /* =====================================================
       SHOP SIGN
    ===================================================== */

    function createTextTexture(
        text
    ) {

        const canvas =
            document.createElement(
                "canvas"
            );


        canvas.width =
            1024;

        canvas.height =
            256;


        const ctx =
            canvas.getContext(
                "2d"
            );


        ctx.fillStyle =
            "#07100b";


        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        ctx.fillStyle =
            "#28e36b";


        ctx.font =
            "bold 82px Arial";


        ctx.textAlign =
            "center";


        ctx.textBaseline =
            "middle";


        ctx.fillText(
            text,
            canvas.width / 2,
            canvas.height / 2
        );


        const texture =
            new THREE.CanvasTexture(
                canvas
            );


        texture.colorSpace =
            THREE.SRGBColorSpace;


        return texture;

    }


    /* =====================================================
       SHOP CREATOR
    ===================================================== */

    const shopObjects =
        [];


    function createShop(
        name,
        x,
        z,
        width,
        depth,
        height,
        color = 0x17241b
    ) {

        const group =
            new THREE.Group();


        group.name =
            name;


        /* BUILDING */

        const building =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    width,
                    height,
                    depth
                ),

                buildingMaterial(
                    color
                )

            );


        building.position.y =
            height / 2;


        building.castShadow =
            true;


        building.receiveShadow =
            true;


        group.add(
            building
        );


        /* ROOF */

        const roof =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    width + 1,
                    1,
                    depth + 1
                ),

                buildingMaterial(
                    0x26382c
                )

            );


        roof.position.y =
            height + 0.5;


        roof.castShadow =
            true;


        group.add(
            roof
        );


        /* WINDOWS */

        createWindows(
            group,
            width,
            height,
            depth
        );


        /* GLASS FRONT */

        const glass =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    width * 0.72,
                    height * 0.48,
                    0.15
                ),

                new THREE.MeshStandardMaterial({

                    color:
                        0x1c6940,

                    transparent:
                        true,

                    opacity:
                        0.6,

                    metalness:
                        0.5,

                    roughness:
                        0.15

                })

            );


        glass.position.set(

            0,

            height * 0.4,

            depth / 2 + 0.1

        );


        group.add(
            glass
        );


        /* DOOR */

        const door =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    1.8,
                    height * 0.55,
                    0.18
                ),

                new THREE.MeshStandardMaterial({

                    color:
                        0x06110b,

                    emissive:
                        0x0b3b20,

                    emissiveIntensity:
                        0.4

                })

            );


        door.position.set(

            0,

            height * 0.275,

            depth / 2 + 0.2

        );


        group.add(
            door
        );


        /* SIGN */

        const sign =
            new THREE.Mesh(

                new THREE.PlaneGeometry(
                    width * 0.78,
                    1.8
                ),

                new THREE.MeshBasicMaterial({

                    map:
                        createTextTexture(
                            name
                        ),

                    transparent:
                        true

                })

            );


        sign.position.set(

            0,

            height + 1.6,

            depth / 2 + 0.2

        );


        group.add(
            sign
        );


        /* GREEN GLOW */

        const glow =
            new THREE.PointLight(
                0x28e36b,
                1.2,
                20
            );


        glow.position.set(
            0,
            4,
            depth / 2 + 3
        );


        group.add(
            glow
        );


        group.position.set(
            x,
            0,
            z
        );


        scene.add(
            group
        );


        shopObjects.push(
            group
        );


        return group;

    }


    /* =====================================================
       MARKET SHOPS
    ===================================================== */

    createShop(
        "GADGET WORLD",
        -28,
        -28,
        15,
        12,
        9,
        0x14291c
    );


    createShop(
        "FASHION HOUSE",
        28,
        -28,
        15,
        12,
        9,
        0x1c241e
    );


    createShop(
        "CAR EMPIRE",
        -28,
        28,
        17,
        14,
        8,
        0x202622
    );


    createShop(
        "HOME COMFORTS",
        28,
        28,
        17,
        14,
        8,
        0x22291f
    );


    createShop(
        "ELECTRONICS MALL",
        0,
        -65,
        25,
        15,
        11,
        0x15252b
    );


    createShop(
        "FOOD COURT",
        0,
        65,
        25,
        15,
        9,
        0x29251b
    );


    /* =====================================================
       BANK
    ===================================================== */

    const bank =
        createShop(
            "BANK",
            0,
            -35,
            18,
            12,
            12,
            0x172238
        );


    /* =====================================================
       EVENT CENTER
    ===================================================== */

    const eventGroup =
        new THREE.Group();


    eventGroup.name =
        "EVENT CENTER";


    const eventBuilding =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                13,
                13,
                7,
                48
            ),

            buildingMaterial(
                0x242044
            )

        );


    eventBuilding.position.y =
        3.5;


    eventBuilding.castShadow =
        true;


    eventGroup.add(
        eventBuilding
    );


    const eventRoof =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                13,
                4,
                6,
                48
            ),

            new THREE.MeshStandardMaterial({

                color:
                    0x3a2c73,

                emissive:
                    0x281d68,

                emissiveIntensity:
                    0.5

            })

        );


    eventRoof.position.y =
        9;


    eventGroup.add(
        eventRoof
    );


    eventGroup.position.set(
        62,
        0,
        28
    );


    scene.add(
        eventGroup
    );


    /* =====================================================
       BILLBOARD
    ===================================================== */

    const billboard =
        new THREE.Group();


    billboard.name =
        "BILLBOARD AREA";


    const billboardBoard =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                12,
                7,
                0.6
            ),

            new THREE.MeshStandardMaterial({

                color:
                    0x4a125c,

                emissive:
                    0x320d42,

                emissiveIntensity:
                    0.5

            })

        );


    billboardBoard.position.y =
        7;


    billboard.add(
        billboardBoard
    );


    const billboardTexture =
        createTextTexture(
            "ADVERTISE YOUR BUSINESS"
        );


    const billboardScreen =
        new THREE.Mesh(

            new THREE.PlaneGeometry(
                11,
                5.5
            ),

            new THREE.MeshBasicMaterial({
                map:
                    billboardTexture
            })

        );


    billboardScreen.position.set(
        0,
        7,
        0.35
    );


    billboard.add(
        billboardScreen
    );


    const pole =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                0.5,
                0.7,
                7,
                12
            ),

            buildingMaterial(
                0x333333
            )

        );


    pole.position.y =
        3.5;


    billboard.add(
        pole
    );


    billboard.position.set(
        68,
        0,
        -30
    );


    scene.add(
        billboard
    );


    /* =====================================================
       MARKET PLAZA
    ===================================================== */

    const plaza =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                11,
                11,
                0.5,
                48
            ),

            new THREE.MeshStandardMaterial({

                color:
                    0x123c20,

                emissive:
                    0x0b351a,

                emissiveIntensity:
                    0.6

            })

        );


    plaza.position.y =
        0.3;


    plaza.receiveShadow =
        true;


    scene.add(
        plaza
    );


    /* =====================================================
       PLAZA FOUNTAIN
    ===================================================== */

    const fountainBase =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                5,
                5,
                0.8,
                32
            ),

            new THREE.MeshStandardMaterial({

                color:
                    0x26382c,

                metalness:
                    0.4,

                roughness:
                    0.25

            })

        );


    fountainBase.position.y =
        0.7;


    scene.add(
        fountainBase
    );


    const fountainWater =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                3.8,
                3.8,
                0.2,
                32
            ),

            new THREE.MeshStandardMaterial({

                color:
                    0x1b9e5a,

                emissive:
                    0x0d5f32,

                emissiveIntensity:
                    0.5,

                transparent:
                    true,

                opacity:
                    0.8

            })

        );


    fountainWater.position.y =
        1.15;


    scene.add(
        fountainWater
    );


    /* =====================================================
       TREES
    ===================================================== */

    function createTree(
        x,
        z
    ) {

        const group =
            new THREE.Group();


        const trunk =
            new THREE.Mesh(

                new THREE.CylinderGeometry(
                    0.4,
                    0.55,
                    3,
                    8
                ),

                buildingMaterial(
                    0x55351f
                )

            );


        trunk.position.y =
            1.5;


        group.add(
            trunk
        );


        const leaves =
            new THREE.Mesh(

                new THREE.SphereGeometry(
                    2.3,
                    16,
                    16
                ),

                new THREE.MeshStandardMaterial({

                    color:
                        0x16813b,

                    roughness:
                        0.8

                })

            );


        leaves.position.y =
            3.8;


        leaves.castShadow =
            true;


        group.add(
            leaves
        );


        group.position.set(
            x,
            0,
            z
        );


        scene.add(
            group
        );

    }


    const treePositions = [

        [-15, -16],
        [15, -16],

        [-16, 16],
        [16, 16],

        [-55, -15],
        [55, -15],

        [-55, 15],
        [55, 15],

        [-15, -52],
        [15, -52],

        [-15, 52],
        [15, 52],

        [-60, 50],
        [60, -50]

    ];


    treePositions.forEach(
        position => {

            createTree(
                position[0],
                position[1]
            );

        }
    );


    /* =====================================================
       STREET LIGHTS
    ===================================================== */

    function createStreetLight(
        x,
        z
    ) {

        const group =
            new THREE.Group();


        const pole =
            new THREE.Mesh(

                new THREE.CylinderGeometry(
                    0.12,
                    0.18,
                    5,
                    8
                ),

                buildingMaterial(
                    0x4a554e
                )

            );


        pole.position.y =
            2.5;


        group.add(
            pole
        );


        const lamp =
            new THREE.Mesh(

                new THREE.SphereGeometry(
                    0.35,
                    12,
                    12
                ),

                new THREE.MeshStandardMaterial({

                    color:
                        0xaaffc2,

                    emissive:
                        0x28e36b,

                    emissiveIntensity:
                        2

                })

            );


        lamp.position.y =
            5.1;


        group.add(
            lamp
        );


        const light =
            new THREE.PointLight(
                0x63ff9b,
                1.5,
                15
            );


        light.position.y =
            5.1;


        group.add(
            light
        );


        group.position.set(
            x,
            0,
            z
        );


        scene.add(
            group
        );

    }


    [

        [-7, -12],
        [7, -12],

        [-7, 12],
        [7, 12],

        [-12, -7],
        [12, -7],

        [-12, 7],
        [12, 7],

        [-38, -12],
        [38, -12],

        [-38, 12],
        [38, 12]

    ].forEach(
        position => {

            createStreetLight(
                position[0],
                position[1]
            );

        }
    );


    /* =====================================================
       CLICKABLE SHOPS
    ===================================================== */

    const raycaster =
        new THREE.Raycaster();


    const pointer =
        new THREE.Vector2();


    renderer.domElement.addEventListener(
        "click",
        event => {

            const rect =
                renderer.domElement
                    .getBoundingClientRect();


            pointer.x =
                (
                    event.clientX -
                    rect.left
                ) /
                rect.width *
                2 -
                1;


            pointer.y =
                -(
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height
                ) *
                2 +
                1;


            raycaster.setFromCamera(
                pointer,
                camera
            );


            const hits =
                raycaster.intersectObjects(
                    shopObjects,
                    true
                );


            if (
                hits.length === 0
            ) {

                return;

            }


            let object =
                hits[0].object;


            while (
                object.parent &&
                object.parent !== scene
            ) {

                object =
                    object.parent;

            }


            if (
                object.name
            ) {

                console.log(
                    "Shop selected:",
                    object.name
                );


                window.dispatchEvent(

                    new CustomEvent(
                        "kasumetShopSelected",
                        {

                            detail: {

                                shop:
                                    object.name

                            }

                        }
                    )

                );

            }

        }
    );


    /* =====================================================
       ZOOM BUTTONS
    ===================================================== */

    const zoomIn =
        document.getElementById(
            "zoomIn"
        );


    const zoomOut =
        document.getElementById(
            "zoomOut"
        );


    const reset =
        document.getElementById(
            "resetMarket"
        );


    if (zoomIn) {

        zoomIn.addEventListener(
            "click",
            () => {

                camera.position.multiplyScalar(
                    0.85
                );

            }
        );

    }


    if (zoomOut) {

        zoomOut.addEventListener(
            "click",
            () => {

                camera.position.multiplyScalar(
                    1.18
                );

            }
        );

    }


    if (reset) {

        reset.addEventListener(
            "click",
            () => {

                camera.position.set(
                    48,
                    42,
                    55
                );


                controls.target.set(
                    0,
                    0,
                    0
                );


                controls.update();

            }
        );

    }


    /* =====================================================
       RESIZE
    ===================================================== */

    function resize() {

        const width =
            container.clientWidth;


        const height =
            Math.max(
                container.clientHeight,
                500
            );


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

    const clock =
        new THREE.Clock();


    function animate() {

        requestAnimationFrame(
            animate
        );


        const time =
            clock.getElapsedTime();


        controls.update();


        /* fountain animation */

        fountainWater.scale.y =
            1 +
            Math.sin(
                time * 2
            ) *
            0.03;


        /* plaza glow */

        greenLight.intensity =
            3.5 +
            Math.sin(
                time * 1.5
            ) *
            0.5;


        renderer.render(
            scene,
            camera
        );

    }


    /* =====================================================
       START
    ===================================================== */

    resize();

    animate();


    console.log(
        "KASUMET 3D MARKET READY"
    );

}
