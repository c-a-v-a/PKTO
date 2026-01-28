import Consumer from "./Consumer";

let dayCounter = 0;
let isRunning = false;
let interval = null;

const consumer = Consumer.getInstance();

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const nextButton = document.getElementById("next-button") as HTMLButtonElement;
const startButton = document.getElementById("start-button") as HTMLButtonElement;
const stopButton = document.getElementById("stop-button") as HTMLButtonElement;
const dispaly = document.getElementById("display") as HTMLDivElement;

function draw() {
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const producerA = consumer.getProducer();

  ctx.strokeStyle = "lightgray";
  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.arc(producerA.getX(), producerA.getY(), 100, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(producerA.getX(), producerA.getY(), 200, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(producerA.getX(), producerA.getY(), 300, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(producerA.getX(), producerA.getY(), 400, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(producerA.getX(), producerA.getY(), 500, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(producerA.getX(), producerA.getY(), 600, 0, Math.PI * 2);
  ctx.stroke();


  for (const p of producerA.getSubproducers()) {
    ctx.beginPath();
    ctx.arc(p.getX(), p.getY(), 10, 0, Math.PI * 2);
    ctx.fillStyle = "cyan";
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.font = "15px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(p.getName(), p.getX(), p.getY() + 20);
  }

  for (const c of producerA.getContracts()) {
    ctx.beginPath();
    ctx.moveTo(producerA.getX(), producerA.getY());
    ctx.lineTo(c.getFrom().getX(), c.getFrom().getY());
    ctx.strokeStyle = "cyan";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.arc(producerA.getX(), producerA.getY(), 15, 0, Math.PI * 2);
  ctx.fillStyle = "green";
  ctx.fill();

  ctx.fillStyle = "white";
  ctx.font = "15px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText(producerA.getName(), producerA.getX(), producerA.getY() + 20);
}

function displayInfo() {
  dispaly.innerHTML = "";
  
  dispaly.innerHTML += `
    <p> DAY: ${dayCounter} </p>
    <hr>
    <p>WEEKLY QUOTA: ${consumer.getQuota()}, LAST ${consumer.getWasMet() ? 'WAS' : 'WAS NOT'} MET</p>
    <hr>
    <p>${consumer.getProducer().getName()} Production: ${consumer.getProducer().getProductionRate()}/d</p>
    <p>${consumer.getProducer().getName()} Stockpile A: ${consumer.getProducer().getStockpile()}</p>
    <p>${consumer.getProducer().getName()} Stockpile B: ${consumer.getProducer().getStockpileB()}</p>
    <hr>
  `

  for (const p of consumer.getProducer().getSubproducers()) {
    dispaly.innerHTML += `
      <p>${p.getName()} Production: ${p.getProductionRate()}/d</p>
      <p>${p.getName()} Stockpile: ${p.getStockpile()}</p>
      <hr>
    `
  }

  for (const c of consumer.getProducer().getContracts()) {
    dispaly.innerHTML += `
      <p>CONTRACT: ${c.getFrom().getName()}, FOR: ${c.getAmount()}, IN: ${c.getTime()} days</p>
    `
  }
}

function nextDay() {
  dayCounter++;
  consumer.dialyUpdate();

  if (dayCounter % 7 === 0) {
    consumer.weeklyUpdate();
  }

  draw();
  displayInfo();
}

nextButton.onclick = () => {
  if (!isRunning) {
    nextDay();
  }
}

startButton.onclick = () => {
  if (!isRunning) {
    isRunning = true;

    interval = setInterval(() => {
      if (isRunning) {
        nextDay();
      }
    }, 1000);
  }
}

stopButton.onclick = () => {
  isRunning = false;
  clearInterval(interval!);
}

draw();