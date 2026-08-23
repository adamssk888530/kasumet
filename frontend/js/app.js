document.querySelectorAll(".bottom-nav a").forEach(a=>{
  a.addEventListener("click",()=>{
    document.querySelectorAll(".bottom-nav a").forEach(x=>x.classList.remove("active"));
    a.classList.add("active");
  });
});
document.querySelector(".primary").addEventListener("click",()=>{
  document.getElementById("market").scrollIntoView({behavior:"smooth"});
});
document.getElementById("menuBtn").addEventListener("click",()=>alert("KASUMET menu"));
