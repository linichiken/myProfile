(function(){
  "use strict";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  // custom cursor ring
  if (fine && !reduced) {
    var ring = document.getElementById("cursor-ring");
    ring.classList.add("on");
    var rx = 0, ry = 0, tx = 0, ty = 0;
    window.addEventListener("mousemove", function(e){ tx = e.clientX; ty = e.clientY; });
    function loop(){
      rx += (tx - rx) * 0.22;
      ry += (ty - ry) * 0.22;
      ring.style.transform = "translate(" + rx + "px," + ry + "px) translate(-50%,-50%)";
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    document.querySelectorAll("[data-hover]").forEach(function(el){
      el.addEventListener("mouseenter", function(){ ring.classList.add("big"); });
      el.addEventListener("mouseleave", function(){ ring.classList.remove("big"); });
    });
  }

  // hero parallax
  if (fine && !reduced) {
    var els = document.querySelectorAll("[data-parallax]");
    window.addEventListener("mousemove", function(e){
      var cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      var dx = (e.clientX - cx), dy = (e.clientY - cy);
      els.forEach(function(el){
        var f = parseFloat(el.getAttribute("data-parallax"));
        el.style.setProperty("--px", (dx * f) + "px");
        el.style.setProperty("--py", (dy * f) + "px");
      });
    });
    els.forEach(function(el){
      el.style.transform = "rotate(var(--tilt)) translate(var(--px,0px), var(--py,0px))";
    });
  }

  // scroll settle
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) entry.target.classList.add("in");
      });
    }, { threshold: 0.3 });
    document.querySelectorAll("[data-settle]").forEach(function(el){ io.observe(el); });
  }
})();
