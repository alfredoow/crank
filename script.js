max_energy = 10;
energy = 0;

crank_force = 0.35;
kforce = 0;
friction = 0.965;

max_force = 1;
force = 0;

temp = 0;
max_temp = 50;

lastFrame = 0;
nowFrame = 0;

let logs = [];

window.onblur = function () {
  force = 0;
  kforce = 0;
};

function start() {
  let empty_log

  for (let i=0;i<5;i++) {
    empty_log = document.createElement("li");
    logs[i] = empty_log;
    notifications.appendChild(empty_log);
  }
}

function update(dt) {
  let notifications = document.getElementById("notifications");
  //document.getElementById("debug").innerHTML = ((temp / max_temp) * 100).toFixed(1) + "%/" + ((1 - (temp / max_temp)) * 100).toFixed(1) + "%";

  let energy_bar = document.getElementById("energy-bar").querySelector(".progress-bar");
  let energy_bar_text = document.getElementById("energy-bar").querySelector(".progress-text");
  let energy_btn = document.getElementById("energy-btn");

  let battery_bar = document.getElementById("battery-bar").querySelector(".vprogress-bar");
  let battery_text = document.getElementById("battery-bar").querySelector(".vprogress-text");

  let temp_bar = document.getElementById("temp-bar").querySelector(".vprogress-bar");
  let temp_text = document.getElementById("temp-bar").querySelector(".vprogress-text");
  
  battery_bar.style.height = (energy / max_energy) * 100 + "%";
  battery_text.innerHTML = energy.toFixed(1) + "J/" + max_energy.toFixed(1) + "J";

  temp_bar.style.height = (temp / max_temp) * 100 + "%";
  temp_bar.style.backgroundColor = "rgb(" + (temp / max_temp) * 510 + "," + (1.25 - (temp / max_temp)) * 255 + ",0)";
  temp_text.innerHTML = Math.round(temp) + "°C";

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
  temp += force * 10 * dt;

  energy = jclamp(energy, 0, max_energy);
  temp = jclamp(temp, 0, max_temp);
}

function add_log(message) {
  let new_log = document.createElement("li");
  new_log.innerHTML = message;

  notifications.removeChild(logs[0]);
  logs = reorganize_logs(logs, new_log);

  notifications.appendChild(new_log);
}

function reorganize_logs(log_arr, new_log) {
  for (let i = 0; i < log_arr.length;i++) {
    if (i != 4) {
      log_arr[i] = log_arr[i+1];
    }else{
      log_arr[i] = new_log;
    }
  }

  return log_arr;
}

function rndstring(length) {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

let startOnce = true;

window.setInterval(function() {
  add_log(rndstring(10));
}, 1000)

window.setInterval(function() {
  delta = (new Date().getTime() - lastFrame) / 1000;
  if (startOnce) {
    start();
    startOnce = false;
  }
  update(delta);
  lastFrame = new Date().getTime();
}, 16);

function turnCrank() {
  kforce += crank_force;
}

function dissipateEnergy() {
  add_log(toughts[Math.floor(Math.random() * toughts.length)]);
  energy = 0;
}