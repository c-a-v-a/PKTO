import Simulation from "./Simulation";
import SimulationHistory from "./SimulationHistory";
import type SimulationMemento from "./SimulationMemento";
import type Specimen from "./Specimen";

let simulation = new Simulation(100, 100, 100);
const history = new SimulationHistory();

let isRunning: boolean = false;
let interval: NodeJS.Timeout | null = null;
const intervalDelta: number = 1000 / 25;

function start() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  canvas.width = simulation.getN() / simulation.getM() * 1000;

  let fromLastUpdate: number = 0;
  let fromLastSpawned: number = 0;
  let t: number = 0;

  isRunning = true;
  interval = setInterval(() => {
    if (!isRunning && fromLastUpdate >= 1000) {
      return;
    }

    simulation.step(intervalDelta);
    draw(simulation.getSpecimens(), simulation.getN(), simulation.getM());
    infoText(simulation.getSpecimens(), t);

    if (fromLastUpdate >= 1000) {
      fromLastUpdate -= 1000;
      t++;

      history.add(simulation.snapshot());
    }
    
    if (fromLastSpawned >= 5 * simulation.getI()) {
      fromLastSpawned -= 5 * simulation.getI();
      
      simulation.spawnNewSpecimen();
    }

    fromLastUpdate += intervalDelta;
    fromLastSpawned += intervalDelta;
  }, intervalDelta);
}

function stop() {
  if (interval === null) {
    return;
  }

  clearInterval(interval);

  interval = null;
  isRunning = false;
}

function infoText(specimens: Specimen[], t: number) {
  const healthy = specimens.filter(x => x.getState().getName() === "healthy").length;
  const resistant = specimens.filter(x => x.getState().getName() === "resistant").length;
  const infected = specimens.filter(x => x.getState().getName() === "infected").length;
  const symptomatic = specimens.filter(x => x.getState().getName() === "symptomatic").length;

  document.getElementById('info')!.innerText =
    `T: ${t}s | Total: ${specimens.length} | Healthy: ${healthy} | Resistant: ${resistant} | Infected: ${infected} | Symptomatic: ${symptomatic}`;
}

function draw(specimens: Specimen[], n: number, m: number) {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let specimen of specimens) {
    switch(specimen.getState().getName()) {
      case "healthy":
        ctx.fillStyle = 'green';
        break;
      case "infected":
        ctx.fillStyle = 'purple';
        break;
      case "resistant":
        ctx.fillStyle = 'blue';
        break;
      case "symptomatic":
        ctx.fillStyle = 'red';
        break;
    }
    ctx.beginPath();
    ctx.arc(specimen.getX() / n * canvas.width, specimen.getY() / m * canvas.height, 5, 0, Math.PI * 2);
    ctx.fill();
    
    if (specimen.getState().getName() === "symptomatic" || specimen.getState().getName() === "infected") {
      ctx.beginPath();
      ctx.arc(specimen.getX() / n * canvas.width, specimen.getY() / m * canvas.height, 2 / m * canvas.height, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}

function openDB(callback: (db: IDBDatabase) => void) {
  const request = indexedDB.open("MyDatabase", 1);

  request.onupgradeneeded = () => {
    const db = request.result;
    if (!db.objectStoreNames.contains("history")) {
      db.createObjectStore("history");
    }
  };

  request.onsuccess = () => callback(request.result);
  request.onerror = () => console.error("DB open error:", request.error);
}

function loadJson(callback: (data: any | null) => void) {
  openDB((db) => {
    const tx = db.transaction("history", "readonly");
    const store = tx.objectStore("history");

    const req = store.get("app-data");

    req.onsuccess = () => callback(req.result ?? null);
    req.onerror = () => {
      console.error("Load error:", req.error);
      callback(null);
    };
  });
}

document.getElementById('start-button')!.onclick = () => start();
document.getElementById('stop-button')!.onclick = () => stop();
document.getElementById('settings-button')!.onclick = () => {
  const n = parseInt(prompt(`N:`, `100`) ?? "");
  const m = parseInt(prompt(`M:`, `100`) ?? "");
  const i = parseInt(prompt(`I:`, `100`) ?? "");

  if (!n || !m || !i || n < 0 || m < 0 || i < 0) {
    alert("Invalid parameters. Simulation will run with defaults.");
    return;
  }

  simulation = new Simulation(n, m, i);

  alert("Settings saved.");
}
document.getElementById('save-button')!.onclick = () => {
  openDB((db) => {
    const tx = db.transaction("history", "readwrite");
    const store = tx.objectStore("history");

    store.put(history.toJSON(), "app-data");

    tx.oncomplete = () => alert("Saved history.");
    tx.onerror = () => console.error("Save error:", tx.error);
  });
}
document.getElementById('load-button')!.onclick = () => {
  stop();

  loadJson((json) => {
    if (!json) {
      alert('Failed to load the history. Probably not saved.');
      return;
    }
    
    history.fromJSON(json);
    
    const input = prompt(`Select the time to load from 0 to ${history.getLength()}`, `${history.getLength()}`);
    
    if (!input) {
      alert("Could not load history.");
      return;
    }
    
    const index = parseInt(input, 10);
    
    if (index < 0 || index > history.getLength()) {
      alert("Could not load history. Invalid input.");
      return;
    }
    
    simulation.restore(history.get(index) as SimulationMemento);
  });
}