const app = document.querySelector("#app");

if (app) {
  const status = document.createElement("p");
  status.textContent = "JavaScript is bundled and running.";
  app.append(status);
}
