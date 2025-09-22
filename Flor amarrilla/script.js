const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Sunflower {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);

    // pétalos (más delgados y más cantidad que en la flor amarilla simple)
    for (let i = 0; i < 20; i++) {
      ctx.rotate((Math.PI * 2) / 20);
      ctx.beginPath();
      ctx.ellipse(0, this.size, this.size / 4, this.size, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#FFD700"; // amarillo dorado
      ctx.fill();
      ctx.strokeStyle = "#E6AC00"; // borde más oscuro
      ctx.stroke();
    }

    // centro (marrón oscuro)
    ctx.beginPath();
    ctx.arc(0, 0, this.size * 0.6, 0, Math.PI * 2);
    ctx.fillStyle = "#4B2E2E"; // marrón oscuro
    ctx.fill();

    ctx.restore();
  }

  update() {
    this.y -= this.speed;
    if (this.y + this.size < 0) {
      this.y = canvas.height + this.size;
      this.x = Math.random() * canvas.width;
    }
    this.draw();
  }
}

// Crear girasoles aleatorios
const sunflowers = [];
for (let i = 0; i < 25; i++) {
  let size = Math.random() * 20 + 15;
  let x = Math.random() * canvas.width;
  let y = Math.random() * canvas.height;
  let speed = Math.random() * 0.5 + 0.2;
  sunflowers.push(new Sunflower(x, y, size, speed));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  sunflowers.forEach(sunflower => sunflower.update());
  requestAnimationFrame(animate);
}

animate();

// Ajuste cuando se cambia el tamaño de la ventana
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});