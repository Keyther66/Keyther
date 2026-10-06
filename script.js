// Texto que se escribe solo en el Hero
const roles = ["Full-Stack Developer", "AI Engineer", "Cyberpunk Coder"];
const typed = document.getElementById("typed");
let r = 0, c = 0, deleting = false;
(function type() {
  const word = roles[r];
  typed.textContent = word.slice(0, deleting ? --c : ++c);
  let delay = deleting ? 45 : 95;
  if (!deleting && c === word.length) { deleting = true; delay = 1400; }
  else if (deleting && c === 0) { deleting = false; r = (r + 1) % roles.length; delay = 300; }
  setTimeout(type, delay);
})();

// Proyectos: edita esta lista con los tuyos (c = categoría: web, ia o backend)
const projects = [
  { n: "NeuroChat", c: "ia", d: "Asistente conversacional con LLM y memoria de contexto.", t: ["Python", "LLM", "FastAPI"], u: "#" },
  { n: "Neon Store", c: "web", d: "Tienda en línea responsiva con carrito y pagos simulados.", t: ["HTML", "CSS", "JS"], u: "#" },
  { n: "API Core", c: "backend", d: "API REST con autenticación JWT y base de datos relacional.", t: ["Node.js", "SQL", "JWT"], u: "#" },
  { n: "Vision Scan", c: "ia", d: "Clasificador de imágenes entrenado con redes neuronales.", t: ["Python", "TensorFlow"], u: "#" },
  { n: "CyberBoard", c: "web", d: "Tablero de tareas con arrastrar y soltar y modo oscuro.", t: ["JS", "Bootstrap"], u: "#" },
  { n: "DataForge", c: "backend", d: "Servicio que limpia y expone datos para dashboards.", t: ["Python", "PostgreSQL"], u: "#" }
];

const techIcons = {
  Python: "devicon-python-plain", FastAPI: "devicon-fastapi-plain", HTML: "devicon-html5-plain", CSS: "devicon-css3-plain",
  JS: "devicon-javascript-plain", Bootstrap: "devicon-bootstrap-plain", "Node.js": "devicon-nodejs-plain",
  PostgreSQL: "devicon-postgresql-plain", TensorFlow: "devicon-tensorflow-original"
};

document.getElementById("projGrid").innerHTML = projects.map(p => `
  <div class="col-md-6 col-lg-4 proj-item" data-cat="${p.c}">
    <div class="proj">
      <h4>${p.n}</h4>
      <p>${p.d}</p>
      ${p.t.map(x => `<span class="badge badge-neon">${techIcons[x] ? `<i class="${techIcons[x]}"></i> ` : ""}${x}</span>`).join("")}
      <a href="${p.u}" class="d-block mt-3 link-neon" target="_blank" rel="noopener">Ver repositorio <i class="bi bi-arrow-up-right"></i></a>
    </div>
  </div>`).join("");

// Filtros interactivos
const filters = document.querySelectorAll("[data-filter]");
filters.forEach(btn => btn.addEventListener("click", () => {
  filters.forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  const f = btn.dataset.filter;
  document.querySelectorAll(".proj-item").forEach(item =>
    item.classList.toggle("d-none", f !== "all" && item.dataset.cat !== f));
}));

// Certificaciones: edita el título (t), la institución (o) y el estado (e) con tus datos reales
const certs = [
  { i: "bi bi-mortarboard-fill", t: "Ingeniería en Sistemas y Computación", o: "Universidad Dominicana O&M", e: "En curso", ok: true },
  { i: "devicon-html5-plain", t: "HTML y CSS básico", o: '<i class="fa-brands fa-udemy"></i> Udemy', e: "Completado", ok: true },
  { i: "devicon-javascript-plain", t: "JavaScript básico", o: '<i class="fa-brands fa-udemy"></i> Udemy', e: "Completado", ok: true },
  { i: "devicon-git-plain", t: "Git y GitHub", o: '<i class="fa-brands fa-udemy"></i> Udemy', e: "Completado", ok: true }
];
document.getElementById("certGrid").innerHTML = certs.map(x => `
  <div class="col-sm-6 col-lg-3">
    <div class="cert">
      <i class="${x.i}"></i>
      <h5>${x.t}</h5>
      <p>${x.o}</p>
      <span class="chip ${x.ok ? "ok" : ""}">${x.e}</span>
    </div>
  </div>`).join("");

// Botón "Volver arriba" y año del footer
const btnTop = document.getElementById("topBtn");
window.addEventListener("scroll", () => btnTop.classList.toggle("show", window.scrollY > 400));
btnTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
document.getElementById("year").textContent = new Date().getFullYear();
