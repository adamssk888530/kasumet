/* KASUMET 3D MARKET — mobile-first */

import * as THREE from
"https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

import { OrbitControls } from
"https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/OrbitControls.js";


const container =
document.getElementById("market3d");


if(!container){

 console.error(
  "KASUMET 3D: #market3d not found."
 );

}else{


const scene =
new THREE.Scene();


scene.background =
new THREE.Color(0x06120c);


scene.fog =
new THREE.Fog(
 0x06120c,
 75,
 240
);


/* CAMERA */

const camera =
new THREE.PerspectiveCamera(
 48,
 1,
 .1,
 600
);

camera.position.set(
 72,
 58,
 78
);


/* RENDERER */

const renderer =
new THREE.WebGLRenderer({
 antialias:true,
 powerPreference:
 "high-performance"
});

renderer.setPixelRatio(
 Math.min(
  devicePixelRatio,
  1.8
 )
);

renderer.outputColorSpace =
THREE.SRGBColorSpace;

renderer.shadowMap.enabled =
true;

renderer.shadowMap.type =
THREE.PCFSoftShadowMap;

container.appendChild(
 renderer.domElement
);


/* CONTROLS */

const controls =
new OrbitControls(
 camera,
 renderer.domElement
);

controls.enableDamping =
true;

controls.dampingFactor =
.07;

controls.minDistance =
28;

controls.maxDistance =
190;

controls.maxPolarAngle =
Math.PI / 2.08;

controls.minPolarAngle =
Math.PI / 5.5;

controls.target.set(
 0,
 5,
 0
);


/* LIGHT */

scene.add(
 new THREE.HemisphereLight(
  0xd8ffe5,
  0x06100a,
  2.8
 )
);


const sun =
new THREE.DirectionalLight(
  0xffffff,
  4
);

sun.position.set(
 70,
 120,
 50
);

sun.castShadow =
true;

sun.shadow.mapSize.set(
 1536,
 1536
);

scene.add(sun);


const glow =
new THREE.PointLight(
 0x20ff72,
 14,
 120
);

glow.position.set(
 0,
 20,
 0
);

scene.add(glow);


/* COLORS */

const C = {

 ground:0x06120c,

 road:0x17201b,

 building:0x26342d,

 roof:0x101914,

 green:0x22e66b,

 blue:0x2491ff,

 purple:0x9b52ff,

 gold:0xf0bd3e,

 pink:0xff4db8,

 orange:0xff8a38
};


/* MATERIAL */

const mat =
(
 color,
 rough=.7,
 metal=0
)=>
new THREE.MeshStandardMaterial({
 color,
 roughness:rough,
 metalness:metal
});


/* GROUND */

const ground =
new THREE.Mesh(
 new THREE.PlaneGeometry(
  320,
  320
 ),
 mat(
  C.ground,
  .96
 )
);

ground.rotation.x =
-Math.PI / 2;

ground.receiveShadow =
true;

scene.add(ground);


/* ROADS */

function road(
 w,
 d,
 x,
 z
){

 const m =
 new THREE.Mesh(
  new THREE.BoxGeometry(
   w,
   .2,
   d
  ),
  mat(
   C.road,
   .9
  )
 );

 m.position.set(
  x,
  .1,
  z
 );

 m.receiveShadow =
 true;

 scene.add(m);
}


road(
 300,
 24,
 0,
 0
);

road(
 24,
 300,
 0,
 0
);

road(
 250,
 15,
 0,
 -58
);

road(
 250,
 15,
 0,
 58
);

road(
 15,
 250,
 -58,
 0
);

road(
 15,
 250,
 58,
 0
);


/* ROAD LINES */

function roadLine(
 x,
 z,
 w,
 d
){

 const m =
 new THREE.Mesh(
  new THREE.BoxGeometry(
   w,
   .035,
   d
  ),
  mat(
   0x7c877f,
   .8
  )
 );

 m.position.set(
  x,
  .22,
  z
 );

 scene.add(m);
}


for(
 let x=-145;
 x<=145;
 x+=18
){

 roadLine(
  x,
  0,
  7,
  .28
 );

}


for(
 let z=-145;
 z<=145;
 z+=18
){

 roadLine(
  0,
  z,
  .28,
  7
 );

}


/* TEXTURE */

function textTexture(
 text,
 bg="#0b2014",
 fg="#22e66b"
){

 const c =
 document.createElement(
  "canvas"
 );

 c.width =
 1024;

 c.height =
 256;

 const ctx =
 c.getContext("2d");

 ctx.fillStyle =
 bg;

 ctx.fillRect(
  0,
  0,
  c.width,
  c.height
 );

 ctx.font =
 "900 78px Arial";

 ctx.textAlign =
 "center";

 ctx.textBaseline =
 "middle";

 ctx.fillStyle =
 fg;

 ctx.fillText(
  text.toUpperCase(),
  512,
  128
 );

 const t =
 new THREE.CanvasTexture(c);

 t.colorSpace =
 THREE.SRGBColorSpace;

 return t;
}


/* SHOPS */

const shops=[];


function createShop({
 name,
 x,
 z,
 w=25,
 d=17,
 h=13,
 color=C.green
}){

 const g =
 new THREE.Group();

 g.name =
 name;

 g.userData.shopName =
 name;


 const building =
 new THREE.Mesh(
  new THREE.BoxGeometry(
   w,
   h,
   d
  ),
  mat(
   C.building,
   .58,
   .18
  )
 );

 building.position.y =
 h/2;

 building.castShadow =
 true;

 building.receiveShadow =
 true;

 g.add(building);


 const roof =
 new THREE.Mesh(
  new THREE.BoxGeometry(
   w+1,
   1,
   d+1
  ),
  mat(
   C.roof,
   .5,
   .2
  )
 );

 roof.position.y =
 h+.5;

 roof.castShadow =
 true;

 g.add(roof);


 const glass =
 new THREE.Mesh(
  new THREE.BoxGeometry(
   w*.8,
   h*.55,
   .3
  ),
  new THREE.MeshPhysicalMaterial({
   color:0x174537,
   transparent:true,
   opacity:.8,
   roughness:.1,
   metalness:.45
  })
 );

 glass.position.set(
  0,
  h*.38,
  d/2+.18
 );

 g.add(glass);


 const door =
 new THREE.Mesh(
  new THREE.BoxGeometry(
   3.5,
   5,
   .4
  ),
  mat(
   0x050b08,
   .2,
   .55
  )
 );

 door.position.set(
  0,
  2.5,
  d/2+.35
 );

 g.add(door);


 const sign =
 new THREE.Mesh(
  new THREE.BoxGeometry(
   w*.72,
   2.1,
   .3
  ),
  new THREE.MeshStandardMaterial({
   map:textTexture(name),
   emissive:color,
   emissiveIntensity:.22
  })
 );

 sign.position.set(
  0,
  h+1.7,
  d/2
 );

 g.add(sign);


 const edge =
 new THREE.Mesh(
  new THREE.BoxGeometry(
   w+.4,
   .25,
   d+.4
  ),
  new THREE.MeshStandardMaterial({
   color,
   emissive:color,
   emissiveIntensity:.5
  })
 );

 edge.position.y =
 .22;

 g.add(edge);


 g.position.set(
  x,
  0,
  z
 );

 scene.add(g);

 shops.push(g);

 return g;
}


/* MAIN SHOPS */

createShop({
 name:"GADGET WORLD",
 x:0,
 z:-34,
 w:25,
 d:17,
 h:14,
 color:C.green
});


createShop({
 name:"FASHION STREET",
 x:-40,
 z:0,
 w:28,
 d:17,
 h:13,
 color:C.pink
});


createShop({
 name:"ELECTRONICS MALL",
 x:40,
 z:0,
 w:28,
 d:18,
 h:14,
 color:C.blue
});


createShop({
 name:"FURNITURE CITY",
 x:-40,
 z:42,
 w:30,
 d:18,
 h:12,
 color:C.gold
});


createShop({
 name:"FOOD COURT",
 x:0,
 z:42,
 w:28,
 d:18,
 h:10,
 color:C.orange
});


createShop({
 name:"CAR SHOWROOM",
 x:-40,
 z:-42,
 w:30,
 d:18,
 h:12,
 color:0x4aa3ff
});


createShop({
 name:"TECH HUB",
 x:40,
 z:-42,
 w:30,
 d:18,
 h:15,
 color:0x3d9cff
});


/* BANK */

function createBank(){

 const g =
 new THREE.Group();

 g.name =
 "BANK";


 const b =
 new THREE.Mesh(
  new THREE.BoxGeometry(
   31,
   16,
   23
  ),
  mat(
   0x263b47,
   .5,
   .2
  )
 );

 b.position.y =
 8;

 b.castShadow =
 true;

 g.add(b);


 const roof =
 new THREE.Mesh(
  new THREE.BoxGeometry(
   33,
   1.5,
   25
  ),
  mat(
   0x18252d,
   .5,
   .2
  )
 );

 roof.position.y =
 16.5;

 g.add(roof);


 const s =
 new THREE.Mesh(
  new THREE.BoxGeometry(
   14,
   3.2,
   .4
  ),
  new THREE.MeshStandardMaterial({
   map:textTexture(
    "BANK",
    "#10294a",
    "#fff"
   )
  })
 );

 s.position.set(
  0,
  15.4,
  12
 );

 g.add(s);


 g.position.set(
  0,
  0,
  -78
 );

 scene.add(g);
}

createBank();


/* EVENT CENTER */

function createEventCenter(){

 const g =
 new THREE.Group();

 g.name =
 "EVENT CENTER";


 const b =
 new THREE.Mesh(
  new THREE.CylinderGeometry(
   20,
   20,
   7,
   48
  ),
  mat(
   0x252337,
   .5,
   .2
  )
 );

 b.position.y =
 3.5;

 b.castShadow =
 true;

 g.add(b);


 const d =
 new THREE.Mesh(
  new THREE.SphereGeometry(
   20,
   48,
   24,
   0,
   Math.PI*2,
   0,
   Math.PI/2
  ),
  new THREE.MeshStandardMaterial({
   color:C.purple,
   emissive:C.purple,
   emissiveIntensity:.35,
   transparent:true,
   opacity:.9
  })
 );

 d.position.y =
 7;

 g.add(d);


 g.position.set(
  70,
  0,
  55
 );

 scene.add(g);
}

createEventCenter();


/* TREES */

function createTree(
 x,
 z,
 s=1
){

 const g =
 new THREE.Group();


 const t =
 new THREE.Mesh(
  new THREE.CylinderGeometry(
   .5,
   .7,
   4,
   10
  ),
  mat(
   0x55351f,
   .9
  )
 );

 t.position.y =
 2;

 g.add(t);


 const c =
 new THREE.Mesh(
  new THREE.SphereGeometry(
   2.8,
   16,
   12
  ),
  mat(
   0x159447,
   .9
  )
 );

 c.position.y =
 5;

 g.add(c);


 g.scale.setScalar(s);

 g.position.set(
  x,
  0,
  z
 );

 scene.add(g);
}


[
 [-12,-12,.8],
 [12,-12,.8],
 [-18,18,1],
 [18,18,1],
 [-68,-15,1.2],
 [-68,18,1],
 [68,-15,1.2],
 [68,18,1],
 [-15,68,1],
 [15,68,1],
 [-85,55,1.2],
 [85,55,1.2],
 [-85,-55,1.2],
 [85,-55,1.2]
].forEach(
 p=>createTree(...p)
);


/* STREET LIGHT */

function createStreetLight(
 x,
 z
){

 const g =
 new THREE.Group();


 const pole =
 new THREE.Mesh(
  new THREE.CylinderGeometry(
   .12,
   .18,
   7,
   8
  ),
  mat(
   0x505b54,
   .5,
   .3
  )
 );

 pole.position.y =
 3.5;

 g.add(pole);


 const lamp =
 new THREE.PointLight(
  0x9affbd,
  2.5,
  18
 );

 lamp.position.y =
 7;

 g.add(lamp);


 const bulb =
 new THREE.Mesh(
  new THREE.SphereGeometry(
   .35,
   12,
   12
  ),
  new THREE.MeshStandardMaterial({
   color:0xcaffd8,
   emissive:C.green,
   emissiveIntensity:2
  })
 );

 bulb.position.y =
 7;

 g.add(bulb);


 g.position.set(
  x,
  0,
  z
 );

 scene.add(g);
}


[
 [-13,-24],
 [13,-24],
 [-13,24],
 [13,24],
 [-24,-13],
 [-24,13],
 [24,-13],
 [24,13],
 [-58,-24],
 [58,-24],
 [-58,24],
 [58,24]
].forEach(
 p=>createStreetLight(...p)
);


/* CARS */

function createCar(
 x,
 z,
 color,
 r=0
){

 const g =
 new THREE.Group();


 const body =
 new THREE.Mesh(
  new THREE.BoxGeometry(
   4.5,
   1.1,
   2.2
  ),
  mat(
   color,
   .35,
   .3
  )
 );

 body.position.y =
 1.1;

 g.add(body);


 const cabin =
 new THREE.Mesh(
  new THREE.BoxGeometry(
   2.4,
   1,
   1.7
  ),
  mat(
   0x17242b,
   .15,
   .5
  )
 );

 cabin.position.set(
  -.1,
  1.9,
  0
 );

 g.add(cabin);


 [
  [-1.5,.65,1.15],
  [-1.5,.65,-1.15],
  [1.5,.65,1.15],
  [1.5,.65,-1.15]
 ].forEach(
  p=>{

   const w =
   new THREE.Mesh(
    new THREE.CylinderGeometry(
     .55,
     .55,
     .35,
     16
    ),
    mat(
     0x080808,
     .8
    )
   );

   w.rotation.z =
   Math.PI/2;

   w.position.set(
    ...p
   );

   g.add(w);

  }
 );


 g.position.set(
  x,
  0,
  z
 );

 g.rotation.y =
 r;

 scene.add(g);
}


createCar(
 -32,
 -5,
 0xff3333
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
 Math.PI/2
);

createCar(
 5,
 -32,
 0xffffff,
 -Math.PI/2
);

createCar(
 -70,
 0,
 0x222222
);

createCar(
 70,
 0,
 0xff5533,
 Math.PI
);


/* FOUNTAIN */

function createFountain(){

 const base =
 new THREE.Mesh(
  new THREE.CylinderGeometry(
   9,
   9,
   .8,
   48
  ),
  mat(
   0x23352b,
   .5
  )
 );

 base.position.y =
 .4;

 scene.add(base);


 const water =
 new THREE.Mesh(
  new THREE.CylinderGeometry(
   7.5,
   7.5,
   .25,
   48
  ),
  new THREE.MeshStandardMaterial({
   color:0x168f8f,
   transparent:true,
   opacity:.8,
   metalness:.5,
   roughness:.1
  })
 );

 water.position.y =
 .9;

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
   color:C.green,
   emissive:C.green,
   emissiveIntensity:.5
  })
 );

 center.position.y =
 2.2;

 scene.add(center);


 const l =
 new THREE.PointLight(
  C.green,
  5,
  25
 );

 l.position.y =
 4;

 scene.add(l);
}

createFountain();


/* BILLBOARD */

function createBillboard(
 x,
 z
){

 const g =
 new THREE.Group();


 const pole =
 new THREE.Mesh(
  new THREE.CylinderGeometry(
   .35,
   .45,
   13,
   8
  ),
  mat(
   0x303936,
   .7
  )
 );

 pole.position.y =
 6.5;

 g.add(pole);


 const board =
 new THREE.Mesh(
  new THREE.BoxGeometry(
   18,
   8,
   .5
  ),
  new THREE.MeshStandardMaterial({
   map:textTexture(
    "ADVERTISE YOUR BUSINESS",
    "#24104b",
    "#fff"
   ),
   emissive:0x5424a0,
   emissiveIntensity:.3
  })
 );

 board.position.y =
 12;

 g.add(board);


 g.position.set(
  x,
  0,
  z
 );

 scene.add(g);
}


createBillboard(
 88,
 -15
);


/* CLICK SHOP */

const ray =
new THREE.Raycaster();

const pointer =
new THREE.Vector2();


renderer.domElement.addEventListener(
 "pointerdown",
 e=>{

  const r =
  renderer.domElement
  .getBoundingClientRect();


  pointer.x =
  ((e.clientX-r.left)/r.width)
  *2-1;


  pointer.y =
  -((e.clientY-r.top)/r.height)
  *2+1;


  ray.setFromCamera(
   pointer,
   camera
  );


  const hits =
  ray.intersectObjects(
   shops,
   true
  );


  if(!hits.length)
  return;


  let selected =
  hits[0].object;


  while(
   selected.parent &&
   !selected.userData.shopName
  ){

   selected =
   selected.parent;

  }


  if(
   selected.userData.shopName
  ){

   window.dispatchEvent(
    new CustomEvent(
     "kasumetShopSelected",
     {
      detail:{
       shop:
       selected.userData.shopName
      }
     }
    )
   );

  }

 }
);


/* CAMERA CONTROLS */

const startPos =
camera.position.clone();


document
.getElementById("zoomIn")
?.addEventListener(
 "click",
 ()=>{

  camera.position.lerp(
   controls.target,
   .12
  );

 }
);


document
.getElementById("zoomOut")
?.addEventListener(
 "click",
 ()=>{

  camera.position.lerp(
   startPos,
   .12
  );

 }
);


document
.getElementById("resetMarket")
?.addEventListener(
 "click",
 ()=>{

  camera.position.copy(
   startPos
  );

  controls.target.set(
   0,
   5,
   0
  );

  controls.update();

 }
);


document
.getElementById("marketMapButton")
?.addEventListener(
 "click",
 ()=>{

  camera.position.set(
   95,
   105,
   125
  );

  controls.target.set(
   0,
   0,
   0
  );

  controls.update();

 }
);


/* RESIZE */

function resize(){

 const w =
 container.clientWidth;

 const h =
 container.clientHeight;

 if(!w || !h)
 return;


 camera.aspect =
 w/h;

 camera.updateProjectionMatrix();


 renderer.setSize(
  w,
  h,
  false
 );
}

addEventListener(
 "resize",
 resize
);

resize();


/* ANIMATION */

(function animate(){

 requestAnimationFrame(
  animate
 );

 controls.update();

 renderer.render(
  scene,
  camera
 );

})();


console.log(
 "KASUMET 3D MARKET READY"
);

}
