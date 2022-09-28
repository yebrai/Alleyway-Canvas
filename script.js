console.log("test");

const canvas = document.querySelector("#my-canvas");
const ctx = canvas.getContext("2d");
canvas.style.backgroundColor = "black";

// variables globales
let ballX = 50;
let ballY = 50;
let ballDirectionX = 1;
// la pelotita va hacia la derecha: 1
// la pelotita va hacia la izquierda: -1
let ballDirectionY = 1;
let paletaX = 230;
let paletaY = 560;
let canvasWidth = canvas.width - 10
let paletaHeightCollision = -10
let paletaHeight = 150
let speed = 1
let randomColor = "white"
//"Math.floor(Math.random()*16777215).toString(16)"
let isGameOn = true // el juego sigue andando

// funciones del juego
const drawBall = () => {
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.arc(ballX, ballY, 10, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
};
const paletaCollision= () => {
  paletaHeight = paletaHeight - 10
}

const drawPaleta = () => {
  ctx.fillStyle = "grey";
  ctx.fillRect(paletaX, paletaY, paletaHeight, 20)
};

const movePelotita = () => {
  ballX = ballX + ballDirectionX * speed;
  ballY = ballY + ballDirectionY * speed;
  
};

const pelotitaPaletaCollision = () => {

    // ballX
    // paletaX 
    
    // ballY
    // paletaY
    if (ballY > paletaY + paletaHeightCollision && ballX > paletaX && ballX < (paletaX + 150)) {
        // la pelota ha pasado el punto de la paleta
        console.log("botes")
        ballDirectionY = -1
        paletaCollision()
        speed = speed + 0.5
        
        
        
    }

    // estan colisionando
}


const pelotitaWallCollision = () => {
  if (ballX > canvasWidth) {
    //colision con pared derecha
    //cambiar la direccion de la pelotita
    ballDirectionX = -1;
  }

  if (ballY > canvas.height) {
    isGameOn = false;

  }

  if (ballX < 0) {
    ballDirectionX = 1;
  }

  if (ballY < 0) {
    ballDirectionY = 1;
  }
};


const gameLoop = () => {
  //console.log("Ejecutando la recursion del juego")

  // 1. Limpiar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 2. Acciones y movimientos de los elementos del juego
  movePelotita();
  pelotitaWallCollision();
  pelotitaPaletaCollision();

  // 3. dibujado de los elementos
  drawBall();
  drawPaleta()

  // controlar la recuersion del juego
  if (isGameOn === true ) {

      requestAnimationFrame(gameLoop);
    }
};

window.addEventListener("keydown", (event) => {
 //   console.log(event.code)
    if (event.code === "ArrowRight" && paletaX < canvas.width - paletaHeight) {
        paletaX = paletaX + 20
    }
    
    if (event.code === "ArrowLeft" && paletaX > 0) {
        paletaX = paletaX - 20
    }
})

gameLoop();


//bonus limpiar colisiones.
// incluir score
// aumentar velocidad
//boton para reiniciar (Window.reload)
// mejorar forma de paleta y que esta no salga de los bordes "Siempre se mueve a la derecha o izquierda"
//reducir paleta cuanto mas rebotes