/* =========================================================
   KASUMET V1
   3D VIRTUAL CITY MARKET
========================================================= */

import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

import { OrbitControls } from
    "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/OrbitControls.js";


/* =========================================================
   MARKET CONTAINER
========================================================= */

const container = document.getElementById("market3d");

if (!container) {
    console.error("KASUMET 3D: #market3d not found.");
} else {

    /* =====================================================
       SCENE
    ===================================================== */

    const scene = new THREE.Scene();

    scene.background = new THREE.Color(0x07130c);

    scene.fog = new THREE.Fog(
        0x07130c,
        90,
        260
    );


    /* =====================================================
       CAMERA
    ===================================================== */

    const camera = new THREE.PerspectiveCamera(
        48,
        container.clientWidth /
            container.clientHeight,
        0.1,
        600
    );

    camera.position.set(
        95,
        85,
        110
    );


    /* =====================================================
       RENDERER
    ===================================================== */

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance"
    });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

    renderer.shadowMap.enabled = true;

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

    const controls = new OrbitControls(
        camera,
        renderer.domElement
    );

    controls.enableDamping = true;
    controls.dampingFactor = 0.06;

    controls.minDistance = 35;
    controls.maxDistance = 210;

    controls.maxPolarAngle =
        Math.PI / 2.08;

    controls.minPolarAngle =
        Math.PI / 5;

    controls.target.set(
        0,
        4,
        0
    );


    /* =====================================================
       LIGHTING
    ===================================================== */

    const ambient = new THREE.AmbientLight(
        0xb9ffd0,
        1.7
    );

    scene.add(ambient);


    const sun = new THREE.DirectionalLight(
        0xffffff,
        2.8
    );

    sun.position.set(
        70,
        120,
        50
    );

    sun.castShadow = true;

    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;

    sun.shadow.camera.left = -150;
    sun.shadow.camera.right = 150;
    sun.shadow.camera.top = 150;
    sun.shadow.camera.bottom = -150;

    scene.add(sun);


    const greenLight = new THREE.PointLight(
        0x19ff70,
        12,
        100
    );

    greenLight.position.set(
        0,
        18,
        0
    );

    scene.add(greenLight);


    /* =====================================================
       COLORS
    ===================================================== */

    const COLORS = {

        ground: 0x07130c,
        grass: 0x0b2113,

        road: 0x1a211e,
        roadLine: 0x777d77,

        building: 0x26312b,
        buildingDark: 0x17221c,

        glass: 0x183b30,

        green: 0x28e36b,
        greenDark: 0x0b6b35,

        white: 0xffffff,

        tree: 0x159447,
        treeDark: 0x0b5b2d,

        gold: 0xf2c94c,
        blue: 0x2474d8,
        purple: 0x8d4cff
    };


    /* =====================================================
       MATERIAL HELPERS
    ===================================================== */

    function material(
        color,
        roughness = 0.7,
        metalness = 0
    ) {

        return new THREE.MeshStandardMaterial({
            color,
            roughness,
            metalness
        });
    }


    /* =====================================================
       GROUND
    ===================================================== */

    const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(
            320,
            320
        ),
        material(
            COLORS.ground,
            0.95
        )
    );

    ground.rotation.x =
        -Math.PI / 2;

    ground.receiveShadow = true;

    scene.add(ground);


    /* =====================================================
       GRASS AREAS
    ===================================================== */

    function createGrass(
        x,
        z,
        width,
        depth
    ) {

        const grass = new THREE.Mesh(
            new THREE.BoxGeometry(
                width,
                0.15,
                depth
            ),
            material(
                COLORS.grass,
                0.9
            )
        );

        grass.position.set(
            x,
            0.08,
            z
        );

        grass.receiveShadow = true;

        scene.add(grass);
    }


    createGrass(
        -85,
        -85,
        45,
        45
    );

    createGrass(
        85,
        -85,
        45,
        45
    );

    createGrass(
        -85,
        85,
        45,
        45
    );

    createGrass(
        85,
        85,
        45,
        45
    );


    /* =====================================================
       ROAD
    ===================================================== */

    const roadMaterial = material(
        COLORS.road,
        0.88
    );


    function createRoad(
        width,
        depth,
        x,
        z
    ) {

        const road = new THREE.Mesh(
            new THREE.BoxGeometry(
                width,
                0.18,
                depth
            ),
            roadMaterial
        );

        road.position.set(
            x,
            0.09,
            z
        );

        road.receiveShadow = true;

        scene.add(road);

        return road;
    }


    /* MAIN ROADS */

    createRoad(
        300,
        22,
        0,
        0
    );

    createRoad(
        22,
        300,
        0,
        0
    );


    /* SECONDARY ROADS */

    createRoad(
        240,
        14,
        0,
        -55
    );

    createRoad(
        240,
        14,
        0,
        55
    );

    createRoad(
        14,
        240,
        -55,
        0
    );

    createRoad(
        14,
        240,
        55,
        0
    );


    /* =====================================================
       ROAD LINES
    ===================================================== */

    function createRoadLine(
        x,
        z,
        width,
        depth
    ) {

        const line = new THREE.Mesh(
            new THREE.BoxGeometry(
                width,
                0.03,
                depth
            ),
            material(
                COLORS.roadLine,
                0.8
            )
        );

        line.position.set(
            x,
            0.2,
            z
        );

        scene.add(line);
    }


    for (
        let x = -140;
        x <= 140;
        x += 18
    ) {

        createRoadLine(
            x,
            0,
            7,
            0.25
        );
    }


    for (
        let z = -140;
        z <= 140;
        z += 18
    ) {

        createRoadLine(
            0,
            z,
            0.25,
            7
        );
    }


    /* =====================================================
       CROSSWALK
    ===================================================== */

    function createCrosswalk(
        x,
        z,
        horizontal = true
    ) {

        for (
            let i = -5;
            i <= 5;
            i++
        ) {

            const stripe = new THREE.Mesh(
                new THREE.BoxGeometry(
                    horizontal ? 3 : 0.45,
                    0.04,
                    horizontal ? 0.45 : 3
                ),
                material(
                    0xbfc8c1,
                    0.8
                )
            );

            stripe.position.set(
                horizontal
                    ? x + i * 0.8
                    : x,
                0.21,
                horizontal
                    ? z
                    : z + i * 0.8
            );

            scene.add(stripe);
        }
    }


    createCrosswalk(
        -11,
        -22,
        true
    );

    createCrosswalk(
        11,
        22,
        true
    );

    createCrosswalk(
        -22,
        -11,
        false
    );

    createCrosswalk(
        22,
        11,
        false
    );


    /* =====================================================
       BUILDING MATERIALS
    ===================================================== */

    const wallMaterial = material(
        COLORS.building,
        0.62,
        0.15
    );

    const darkWallMaterial = material(
        COLORS.buildingDark,
        0.65,
        0.15
    );

    const glassMaterial =
        new THREE.MeshPhysicalMaterial({
            color: COLORS.glass,
            transparent: true,
            opacity: 0.72,
            roughness: 0.12,
            metalness: 0.45
        });


    /* =====================================================
       TEXTURE SIGN
    ===================================================== */

    function createTextTexture(
        text,
        background = "#102319",
        color = "#28e36b"
    ) {

        const canvas =
            document.createElement("canvas");

        canvas.width = 1024;
        canvas.height = 256;

        const ctx =
            canvas.getContext("2d");

        ctx.fillStyle =
            background;

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.font =
            "bold 90px Arial";

        ctx.textAlign =
            "center";

        ctx.textBaseline =
            "middle";

        ctx.fillStyle =
            color;

        ctx.fillText(
            text.toUpperCase(),
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

    const shopObjects = [];


    function createShop({
        name,
        x,
        z,
        width = 20,
        depth = 16,
        height = 12,
        color = COLORS.green
    }) {

        const group =
            new THREE.Group();

        group.name = name;

        group.userData.shopName =
            name;


        /* BUILDING */

        const building =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    width,
                    height,
                    depth
                ),
                wallMaterial
            );

        building.position.y =
            height / 2;

        building.castShadow = true;
        building.receiveShadow = true;

        group.add(building);


        /* ROOF */

        const roof =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    width + 1,
                    1,
                    depth + 1
                ),
                material(
                    0x101914,
                    0.55,
                    0.2
                )
            );

        roof.position.y =
            height + 0.5;

        roof.castShadow = true;

        group.add(roof);


        /* GLASS FRONT */

        const glass =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    width * 0.78,
                    height * 0.55,
                    0.25
                ),
                glassMaterial
            );

        glass.position.set(
            0,
            height * 0.39,
            depth / 2 + 0.15
        );

        group.add(glass);


        /* ENTRANCE */

        const door =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    3,
                    5,
                    0.35
                ),
                material(
                    0x07100b,
                    0.25,
                    0.5
                )
            );

        door.position.set(
            0,
            2.5,
            depth / 2 + 0.32
        );

        group.add(door);


        /* SIGN */

        const signTexture =
            createTextTexture(
                name
            );

        const sign =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    width * 0.72,
                    2.1,
                    0.3
                ),
                new THREE.MeshStandardMaterial({
                    map: signTexture,
                    emissive: color,
                    emissiveIntensity: 0.25
                })
            );

        sign.position.set(
            0,
            height + 1.8,
            depth / 2
        );

        group.add(sign);


        /* GREEN EDGE */

        const edge =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    width + 0.3,
                    0.25,
                    depth + 0.3
                ),
                new THREE.MeshStandardMaterial({
                    color,
                    emissive: color,
                    emissiveIntensity: 0.5
                })
            );

        edge.position.y =
            0.2;

        group.add(edge);


        /* POSITION */

        group.position.set(
            x,
            0,
            z
        );

        scene.add(group);

        shopObjects.push(group);

        return group;
    }


    /* =====================================================
       MAIN SHOPS
    ===================================================== */

    createShop({
        name: "GADGET WORLD",
        x: 0,
        z: -34,
        width: 25,
        depth: 17,
        height: 14,
        color: 0x28e36b
    });


    createShop({
        name: "FASHION STREET",
        x: -40,
        z: 0,
        width: 28,
        depth: 17,
        height: 13,
        color: 0xff4db8
    });


    createShop({
        name: "ELECTRONICS MALL",
        x: 40,
        z: 0,
        width: 28,
        depth: 18,
        height: 14,
        color: 0x2491ff
    });


    createShop({
        name: "FURNITURE CITY",
        x: -40,
        z: 42,
        width: 30,
        depth: 18,
        height: 12,
        color: 0xffc857
    });


    createShop({
        name: "FOOD COURT",
        x: 0,
        z: 42,
        width: 28,
        depth: 18,
        height: 10,
        color: 0xff9d3d
    });


    /* =====================================================
       CAR SHOWROOM
    ===================================================== */

    createShop({
        name: "CAR SHOWROOM",
        x: -40,
        z: -42,
        width: 30,
        depth: 18,
        height: 12,
        color: 0x4aa3ff
    });


    /* =====================================================
       TECH HUB
    ===================================================== */

    createShop({
        name: "TECH HUB",
        x: 40,
        z: -42,
        width: 30,
        depth: 18,
        height: 15,
        color: 0x3d9cff
    });


    /* =====================================================
       BANK
    ===================================================== */

    function createBank() {

        const group =
            new THREE.Group();

        group.name =
            "BANK";


        const base =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    30,
                    15,
                    22
                ),
                material(
                    0x263b47,
                    0.55,
                    0.2
                )
            );

        base.position.y =
            7.5;

        base.castShadow = true;

        group.add(base);


        const roof =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    32,
                    1.5,
                    24
                ),
                material(
                    0x1b2630,
                    0.5
                )
            );

        roof.position.y =
            15.7;

        group.add(roof);


        const sign =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    13,
                    3.2,
                    0.4
                ),
                new THREE.MeshStandardMaterial({
                    map: createTextTexture(
                        "BANK",
                        "#10294a",
                        "#ffffff"
                    )
                })
            );

        sign.position.set(
            0,
            15,
            11.5
        );

        group.add(sign);


        group.position.set(
            0,
            0,
            -78
        );

        scene.add(group);
    }

    createBank();


    /* =====================================================
       EVENT CENTER
    ===================================================== */

    function createEventCenter() {

        const group =
            new THREE.Group();

        group.name =
            "EVENT CENTER";


        const base =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    20,
                    20,
                    7,
                    48
                ),
                material(
                    0x252337,
                    0.5,
                    0.2
                )
            );

        base.position.y =
            3.5;

        base.castShadow = true;

        group.add(base);


        const dome =
            new THREE.Mesh(
                new THREE.SphereGeometry(
                    20,
                    48,
                    24,
                    0,
                    Math.PI * 2,
                    0,
                    Math.PI / 2
                ),
                new THREE.MeshStandardMaterial({
                    color: COLORS.purple,
                    emissive: COLORS.purple,
                    emissiveIntensity: 0.35,
                    transparent: true,
                    opacity: 0.9
                })
            );

        dome.position.y =
            7;

        group.add(dome);


        group.position.set(
            70,
            0,
            55
        );

        scene.add(group);
    }

    createEventCenter();


    /* =====================================================
       TREES
    ===================================================== */

    function createTree(
        x,
        z,
        scale = 1
    ) {

        const group =
            new THREE.Group();


        const trunk =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.5,
                    0.7,
                    4,
                    10
                ),
                material(
                    0x55351f,
                    0.9
                )
            );

        trunk.position.y =
            2;

        trunk.castShadow = true;

        group.add(trunk);


        const crown =
            new THREE.Mesh(
                new THREE.SphereGeometry(
                    2.8,
                    16,
                    12
                ),
                material(
                    COLORS.tree,
                    0.9
                )
            );

        crown.position.y =
            5;

        crown.castShadow = true;

        group.add(crown);


        group.scale.setScalar(
            scale
        );

        group.position.set(
            x,
            0,
            z
        );

        scene.add(group);
    }


    const treePositions = [

        [-12, -12, 0.8],
        [12, -12, 0.8],

        [-18, 18, 1],
        [18, 18, 1],

        [-68, -15, 1.2],
        [-68, 18, 1],

        [68, -15, 1.2],
        [68, 18, 1],

        [-15, 68, 1],
        [15, 68, 1],

        [-85, 55, 1.2],
        [85, 55, 1.2],

        [-85, -55, 1.2],
        [85, -55, 1.2]
    ];


    treePositions.forEach(
        p =>
            createTree(
                p[0],
                p[1],
                p[2]
            )
    );


    /* =====================================================
       STREET LIGHT
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
                    7,
                    8
                ),
                material(
                    0x505b54,
                    0.5,
                    0.3
                )
            );

        pole.position.y =
            3.5;

        group.add(pole);


        const lamp =
            new THREE.PointLight(
                0x9affbd,
                2.5,
                18
            );

        lamp.position.y =
            7;

        group.add(lamp);


        const bulb =
            new THREE.Mesh(
                new THREE.SphereGeometry(
                    0.35,
                    12,
                    12
                ),
                new THREE.MeshStandardMaterial({
                    color: 0xcaffd8,
                    emissive: COLORS.green,
                    emissiveIntensity: 2
                })
            );

        bulb.position.y =
            7;

        group.add(bulb);


        group.position.set(
            x,
            0,
            z
        );

        scene.add(group);
    }


    [
        [-13, -24],
        [13, -24],
        [-13, 24],
        [13, 24],

        [-24, -13],
        [-24, 13],
        [24, -13],
        [24, 13],

        [-58, -24],
        [58, -24],
        [-58, 24],
        [58, 24]
    ].forEach(
        p =>
            createStreetLight(
                p[0],
                p[1]
            )
    );


    /* =====================================================
       CARS
    ===================================================== */

    function createCar(
        x,
        z,
        color,
        rotation = 0
    ) {

        const group =
            new THREE.Group();


        const body =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    4.5,
                    1.1,
                    2.2
                ),
                material(
                    color,
                    0.35,
                    0.3
                )
            );

        body.position.y =
            1.1;

        body.castShadow = true;

        group.add(body);


        const cabin =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    2.4,
                    1,
                    1.7
                ),
                new THREE.MeshStandardMaterial({
                    color: 0x17242b,
                    roughness: 0.15,
                    metalness: 0.5
                })
            );

        cabin.position.set(
            -0.1,
            1.9,
            0
        );

        cabin.castShadow = true;

        group.add(cabin);


        const wheelMaterial =
            material(
                0x080808,
                0.8
            );


        const wheelPositions = [
            [-1.5, 0.65, 1.15],
            [-1.5, 0.65, -1.15],
            [1.5, 0.65, 1.15],
            [1.5, 0.65, -1.15]
        ];


        wheelPositions.forEach(
            p => {

                const wheel =
                    new THREE.Mesh(
                        new THREE.CylinderGeometry(
                            0.55,
                            0.55,
                            0.35,
                            16
                        ),
                        wheelMaterial
                    );

                wheel.rotation.z =
                    Math.PI / 2;

                wheel.position.set(
                    p[0],
                    p[1],
                    p[2]
                );

                group.add(wheel);
            }
        );


        group.position.set(
            x,
            0,
            z
        );

        group.rotation.y =
            rotation;

        scene.add(group);
    }


    createCar(
        -32,
        -5,
        0xff3333,
        0
    );

    createCar(
        32,
        5,
        0xffcc22,
        Math.PI
    );

    createCar(
        -5,
        32,
        0x287cff,
        Math.PI / 2
    );

    createCar(
        5,
        -32,
        0xffffff,
        -Math.PI / 2
    );

    createCar(
        -70,
        0,
        0x222222,
        0
    );

    createCar(
        70,
        0,
        0xff5533,
        Math.PI
    );


    /* =====================================================
       FOUNTAIN
    ===================================================== */

    function createFountain() {

        const base =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    9,
                    9,
                    0.8,
                    48
                ),
                material(
                    0x23352b,
                    0.5
                )
            );

        base.position.y =
            0.4;

        scene.add(base);


        const water =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    7.5,
                    7.5,
                    0.25,
                    48
                ),
                new THREE.MeshStandardMaterial({
                    color: 0x168f8f,
                    transparent: true,
                    opacity: 0.8,
                    metalness: 0.5,
                    roughness: 0.1
                })
            );

        water.position.y =
            0.9;

        scene.add(water);


        const center =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    1.4,
                    1.4,
                    3,
                    24
                ),
                new THREE.MeshStandardMaterial({
                    color: COLORS.green,
                    emissive: COLORS.green,
                    emissiveIntensity: 0.5
                })
            );

        center.position.y =
            2.2;

        scene.add(center);


        const fountainLight =
            new THREE.PointLight(
                COLORS.green,
                5,
                25
            );

        fountainLight.position.y =
            4;

        scene.add(
            fountainLight
        );
    }

    createFountain();


    /* =====================================================
       BILLBOARD
    ===================================================== */

    function createBillboard(
        x,
        z
    ) {

        const group =
            new THREE.Group();


        const pole =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.35,
                    0.45,
                    13,
                    8
                ),
                material(
                    0x303936,
                    0.7
                )
            );

        pole.position.y =
            6.5;

        group.add(pole);


        const boardTexture =
            createTextTexture(
                "ADVERTISE YOUR BUSINESS",
                "#24104b",
                "#ffffff"
            );


        const board =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    18,
                    8,
                    0.5
                ),
                new THREE.MeshStandardMaterial({
                    map: boardTexture,
                    emissive: 0x5424a0,
                    emissiveIntensity: 0.3
                })
            );

        board.position.y =
            12;

        group.add(board);


        group.position.set(
            x,
            0,
            z
        );

        scene.add(group);
    }


    createBillboard(
        88,
        -15
    );


    /* =====================================================
       SHOP CLICK
    ===================================================== */

    const raycaster =
        new THREE.Raycaster();

    const pointer =
        new THREE.Vector2();


    renderer.domElement.addEventListener(
        "pointerdown",
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


            if (!hits.length) {
                return;
            }


            let selected =
                hits[0].object;


            while (
                selected.parent &&
                !selected.userData.shopName
            ) {

                selected =
                    selected.parent;
            }


            const shopName =
                selected.userData.shopName;


            if (!shopName) {
                return;
            }


            console.log(
                "KASUMET SHOP:",
                shopName
            );


            window.dispatchEvent(
                new CustomEvent(
                    "kasumetShopSelected",
                    {
                        detail: {
                            shop: shopName
                        }
                    }
                )
            );


            /* Future shop page */

            const slug =
                shopName
                    .toLowerCase()
                    .replace(
                        /[^a-z0-9]+/g,
                        "-"
                    )
                    .replace(
                        /(^-|-$)/g,
                        ""
                    );


            console.log(
                "Shop slug:",
                slug
            );
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


        if (
            width <= 0 ||
            height <= 0
        ) {
            return;
        }


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


        renderer.render(
            scene,
            camera
        );
    }


    resize();

    animate();


    console.log(
        "KASUMET 3D CITY MARKET READY"
    );
}
