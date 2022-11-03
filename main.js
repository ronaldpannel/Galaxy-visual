/**@type{HTMLCanvasElement} */

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let particles = [];
  let radians = 0;
  let colors = ["#2185c5", "#7ecefd", "#fff6ee", "#ff7f66"];
  let alpha = 1;
  let pointerDown = false;
  class Particle {
    constructor(x, y, radius, color) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 15;
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  function init() {
    for (let i = 0; i < 400; i++) {
      let canvasWidth = canvas.width + 300;
      let canvasHeight = canvas.height + 300;
      let x = Math.random() * canvasWidth - canvasWidth / 2;
      let y = Math.random() * canvasHeight - canvasHeight / 2;
      let radius = Math.random() * (2 - 0.5) + 0.5;
      let color = colors[Math.floor(Math.random() * colors.length)];
      particles.push(new Particle(x, y, radius, color));
    }
  }

  function animate() {
    ctx.fillStyle = `rgba(10, 10, 10,  ${alpha})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(radians);
    particles.forEach((particle) => {
      particle.draw();
    });
    ctx.restore();
    radians += 0.005;
    if (pointerDown && alpha >= 0.1) {
        alpha -= 0.02;
      }else if(!pointerDown && alpha <= 1){
         alpha += 0.02
      }
    requestAnimationFrame(animate);
  }
  init();
  animate();
  this.window.addEventListener("pointerdown", () => {
    pointerDown = true;
  });
  this.window.addEventListener('pointerup', () => {
    pointerDown = false;
  });

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  });

  // load end
});
