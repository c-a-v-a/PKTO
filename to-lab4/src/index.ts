import Constants from "./Constants";
import Request from "./Request";
import Requests from "./Requests";
import RequestState from "./RequestState";
import SKKM from "./SKKM";

const requests = new Requests;
const intervalDelta: number = 1000 / 25;
const skkm = new SKKM();

let isRunning: boolean = false;
let interval: NodeJS.Timeout | null = null;

function start() {
  if (interval !== null) {
    isRunning = true;

    return;
  }

  const iterator = requests.getIterator();
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  let elapsed = 0;
  
  canvas.width = Constants.CANVAS_SIZE;
  isRunning = true;
  
  interval = setInterval(() => {
    if (elapsed >= 1000) {
      if (Math.random() > 0.25 && isRunning) {

        const request = iterator.next();
        
        skkm.onNewRequest(request);
      }

      elapsed = 0;
    }
    
    draw();

    elapsed += intervalDelta;
  }, intervalDelta);
}

function stop() {
  if (interval === null) {
    return;
  }

  // clearInterval(interval);

  // interval = null;
  isRunning = false;
}

function draw() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const request of skkm.getRequestQueue()) {
    const coordinates = toCoords(request.getX(), request.getY());

    ctx.beginPath();
    ctx.arc(coordinates[0], coordinates[1], 10, 0, Math.PI * 2);
    if (request.getState() === RequestState.LocalDanger) {
      ctx.fillStyle = "orange";
    } else {
      ctx.fillStyle = "red";
    }
    ctx.fill();
  }
  
  for (const unit of skkm.getUnits()) {
    const unitCoordinates = toCoords(unit.getX(), unit.getY());

    for (const request of unit.getRequests()) {
      const coordinates = toCoords(request.getX(), request.getY());

      ctx.beginPath();
      ctx.arc(coordinates[0], coordinates[1], 10, 0, Math.PI * 2);
      if (request.getState() === RequestState.LocalDanger) {
        ctx.fillStyle = "orange";
      } else {
        ctx.fillStyle = "red";
      }
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(unitCoordinates[0], unitCoordinates[1]);
      ctx.lineTo(coordinates[0], coordinates[1]);
      ctx.strokeStyle = ctx.fillStyle;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(unitCoordinates[0], unitCoordinates[1], 10, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.font = "15px Arial"
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(unit.getLabel(), unitCoordinates[0], unitCoordinates[1] + 15);
  }
}

function toCoords(x: number, y: number): [number, number] {
  return [
    (x - Constants.MIN_X) / (Constants.MAX_X - Constants.MIN_X) * Constants.CANVAS_SIZE,
    (y - Constants.MIN_Y) / (Constants.MAX_Y - Constants.MIN_Y) * Constants.CANVAS_SIZE,
  ];
}

draw();

document.getElementById('start-button')!.onclick = () => start();
document.getElementById('stop-button')!.onclick = () => stop();