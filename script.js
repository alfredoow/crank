max_energy = 2;
energy = 0;

crank_force = 0.35;
kforce = 0;
friction = 0.965;

max_force = 1;
force = 0;

lastFrame = 0;
nowFrame = 0;

window.onblur = function () {
  force = 0;
  kforce = 0;
}; 

function update(dt) {
  let energy_bar = document.getElementById("energy-bar").querySelector(".progress-bar");
  let energy_bar_text = document.getElementById("energy-bar").querySelector(".progress-text");
  let energy_btn = document.getElementById("energy-btn");

  document.getElementById("total_energy").innerHTML = energy.toFixed(1) + "J/" + max_energy.toFixed(1) + "J";
  document.getElementById("debug").innerHTML = "how do you know the voice in your head is really you?";

  energy_bar.style.width = (force / max_force) * 100 + "%";
  energy_bar_text.innerHTML = force.toFixed(1) + "J/s";

  kforce *= friction;
  kforce = jclamp(kforce, 0, 100);

  force = jlerp(force, kforce, 2 * dt);
  force = jclamp(force, 0, max_force);

  if (force <= 0.0125 && kforce <= 0.0125) {
    force = 0;
  }

  energy += force * dt;
  energy = jclamp(energy, 0, max_energy);

  if (energy == max_energy) {
    energy_btn.disabled = true;
  }else{
    energy_btn.disabled = false;
  }
}

window.setInterval(function() {
  t_sec++;
}, 1000)

window.setInterval(function() {
  delta = (new Date().getTime() - lastFrame) / 1000;
  update(delta);
  lastFrame = new Date().getTime();
}, 16);

function turnCrank() {
  kforce += crank_force;
}