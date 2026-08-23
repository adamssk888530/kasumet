// KASUMET market viewport.
// The supplied reference image is used as the visual master so the homepage
// stays faithful to the approved design. Pointer/touch controls provide
// smooth pan/zoom/rotate-like movement without replacing the visual layout.

const stage = document.getElementById("marketStage");
const image = stage.querySelector(".market-image");
let scale = 1, rx = 0, ry = 0, tx = 0, ty = 0;
let dragging = false, sx = 0, sy = 0;

function render(){
  image.style.transform = `translate(${tx}px,${ty}px) scale(${scale}) rotate(${ry}deg)`;
}

stage.addEventListener("pointerdown", e=>{
  dragging=true; sx=e.clientX; sy=e.clientY; stage.setPointerCapture(e.pointerId);
});
stage.addEventListener("pointermove", e=>{
  if(!dragging) return;
  tx += (e.clientX-sx); ty += (e.clientY-sy);
  sx=e.clientX; sy=e.clientY; render();
});
stage.addEventListener("pointerup", ()=>dragging=false);
stage.addEventListener("pointercancel", ()=>dragging=false);

document.getElementById("zoomIn").onclick=()=>{scale=Math.min(1.55,scale+.08);render()};
document.getElementById("zoomOut").onclick=()=>{scale=Math.max(1,scale-.08);render()};
document.getElementById("reset").onclick=()=>{scale=1;tx=0;ty=0;ry=0;render()};
document.getElementById("move").onclick=()=>{
  tx = tx === 0 ? -30 : 0;
  render();
};

stage.addEventListener("wheel", e=>{
  e.preventDefault();
  scale += e.deltaY < 0 ? .05 : -.05;
  scale=Math.max(1,Math.min(1.55,scale));
  render();
},{passive:false});
