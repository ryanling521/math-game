// Frank Poth 08/13/2017

var context, controller, rectangle, loop;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 220;
context.canvas.width = 320;

rectangle = {

  height:32,
  jumping:true,
  width:32,
  x:144, // center of the canvas
  x_velocity:0,
  y:0,
  y_velocity:0

};

controller = {

  left:false,
  right:false,
  up:false,
  keyListener:function(event) {

    var key_state = (event.type == "keydown")?true:false;

    switch(event.keyCode) {

      case 37:// left key
        controller.left = key_state;
      break;
      case 38:// up key
        controller.up = key_state;
      break;
      case 39:// right key
        controller.right = key_state;
      break;

    }

  }

};

loop = function() {

  if (controller.up && rectangle.jumping == false) {

    rectangle.y_velocity -= 20;
    rectangle.jumping = true;

  }

  if (controller.left) {

    rectangle.x_velocity -= 0.5;

  }

  if (controller.right) {

    rectangle.x_velocity += 0.5;

  }

  rectangle.y_velocity += 1.5;// gravity
  rectangle.x += rectangle.x_velocity;
  rectangle.y += rectangle.y_velocity;
  rectangle.x_velocity *= 0.9;// friction
  rectangle.y_velocity *= 0.9;// friction

  // if rectangle is falling below floor line
  if (rectangle.y > 180 - 16 - 32 - 4) {

    rectangle.jumping = false;
    rectangle.y = 180 - 16 - 32 - 4;
    rectangle.y_velocity = 0;

  }

  // if rectangle is going off the left of the screen
  if (rectangle.x < -32) {

    rectangle.x = 320;

  } else if (rectangle.x > 320) {// if rectangle goes past right boundary

    rectangle.x = -32;

  }

  // color canvas
  context.fillStyle = "#202020";
  context.fillRect(0, 0, 320, 220);// x, y, width, height

  // color rectangle
  context.strokeStyle = "#39FF14";// hex for red
  context.beginPath();
  context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  context.stroke();

  // color ground
  context.strokeStyle = "#202830";
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(0, 164);
  context.lineTo(320, 164);
  context.stroke();

  context.strokeStyle = "white";
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(40, 164);
  context.lineTo(100, 164);
  context.stroke();

  context.strokeStyle = "white";
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(130, 164);
  context.lineTo(190, 164);
  context.stroke();

  context.strokeStyle = "white";
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(220, 164);
  context.lineTo(280, 164);
  context.stroke();


//   context.strokeStyle = "white";
//   context.lineWidth = 4;
//   context.beginPath();
//   context.moveTo(40, 120);
//   context.lineTo(100, 120);
//   context.stroke();

//   context.strokeStyle = "white";
//   context.lineWidth = 4;
//   context.beginPath();
//   context.moveTo(220, 120);
//   context.lineTo(280, 120);
//   context.stroke();

//   context.strokeStyle = "white";
//   context.lineWidth = 4;
//   context.beginPath();
//   context.moveTo(130, 80);
//   context.lineTo(190, 80);
//   context.stroke();  

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);