// Подключение функционала "Чертогов Фрилансера"
import { isMobile  } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";
// Подключение библиотеки для анимаций
// import { gsap } from "gsap";

import "../libs/TweenMax.min.js";


// Magnets button
// https://codepen.io/tdesero/pen/RmoxQg
if (!isMobile.any()) {
    let magnets = document.querySelectorAll('[data-strength]')

    magnets.forEach((magnet) => {
      if (magnet.hasAttribute("data-strength-text")) {

        magnet.addEventListener('mousemove', textMoveMagnet );
        magnet.addEventListener('mouseout', function(event) {
          TweenMax.to( event.currentTarget, 1.5, {
            x: 0,
            y: 0,
            rotate: "0.001deg",
            ease: Elastic.easeOut})
          TweenMax.to( event.currentTarget.querySelector('._magnets-text'), 1.5, {
            x: 0,
            y: 0,
            rotate: "0.001deg",
            ease: Elastic.easeOut})
          });

      } else {
        magnet.addEventListener('mousemove', moveMagnet );
        magnet.addEventListener('mouseout', function(event) {
          TweenMax.to( event.currentTarget, 1.5, {
            x: 0,
            y: 0,
            rotate: "0.001deg",
            ease: Elastic.easeOut})
          });
        }
    });
    
    function moveMagnet(event) {
      let magnetButton = event.currentTarget
      let bounding = magnetButton.getBoundingClientRect();
      let strength = magnetButton.getAttribute("data-strength");
        
      TweenMax.to( magnetButton, 1.5, {
        x: ((( event.clientX - bounding.left)/magnetButton.offsetWidth) - 0.5) * strength,
        y: ((( event.clientY - bounding.top)/magnetButton.offsetHeight) - 0.5) * strength,
        rotate: "0.001deg",
        ease: Power4.easeOut
      });
    
    
    //   magnetButton.style.transform = 'translate(' + (((( event.clientX - bounding.left)/(magnetButton.offsetWidth))) - 0.5) * strength + 'px,'+ (((( event.clientY - bounding.top)/(magnetButton.offsetHeight))) - 0.5) * strength + 'px)';
    }
    function textMoveMagnet(event) {
      let magnetButton = event.currentTarget
      let bounding = magnetButton.getBoundingClientRect();
      let strength = magnetButton.getAttribute("data-strength");

      let strengthText = magnetButton.getAttribute("data-strength-text");
      let magnetText = magnetButton.querySelector('._magnets-text');
      let boundingText = magnetText.getBoundingClientRect();
        
      TweenMax.to( magnetButton, 1.5, {
        x: ((( event.clientX - bounding.left)/magnetButton.offsetWidth) - 0.5) * strength,
        y: ((( event.clientY - bounding.top)/magnetButton.offsetHeight) - 0.5) * strength,
        rotate: "0.001deg",
        ease: Power4.easeOut
      });

      TweenMax.to( magnetText, 1.5, {
        x: ((( event.clientX - boundingText.left)/magnetText.offsetWidth) - 0.5) * strengthText,
        y: ((( event.clientY - boundingText.top)/magnetText.offsetHeight) - 0.5) * strengthText,
        rotate: "0.001deg",
        ease: Power4.easeOut
      });
    
    
    //   magnetButton.style.transform = 'translate(' + (((( event.clientX - bounding.left)/(magnetButton.offsetWidth))) - 0.5) * strength + 'px,'+ (((( event.clientY - bounding.top)/(magnetButton.offsetHeight))) - 0.5) * strength + 'px)';
    }
}

/**
 * YouTube Tutorial:
 * https://youtu.be/wG_5453Vq98
  */

function circleCursor(speed,smoothy) {
  // Select the circle element
  const circleElement = document.querySelector('._circle');

  // Create objects to track mouse position and custom cursor position
  const mouse = { x: 0, y: 0 }; // Track current mouse position
  const previousMouse = { x: 0, y: 0 } // Store the previous mouse position
  const circle = { x: 0, y: 0 }; // Track the circle position

  // Initialize variables to track scaling and rotation
  let currentScale = 0; // Track current scale value
  let currentAngle = 0; // Track current angle value

  // Update mouse position on the 'mousemove' event
  window.addEventListener('mousemove', (e) => {
    circleElement.style.display = "block";
    mouse.x = e.x;
    mouse.y = e.y;
  });
  window.addEventListener('mouseout', (e) => {
    circleElement.style.display = "none";
  });
  // Smoothing factor for cursor movement speed (0 = smoother, 1 = instant)

  // Start animation
  const tick = () => {
    // MOVE
    // Calculate circle movement based on mouse position and smoothing
    circle.x += (mouse.x - circle.x) * speed;
    circle.y += (mouse.y - circle.y) * speed;
    // Create a transformation string for cursor translation
    const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

    // SQUEEZE
    // 1. Calculate the change in mouse position (deltaMouse)
    const deltaMouseX = mouse.x - previousMouse.x;
    const deltaMouseY = mouse.y - previousMouse.y;
    // Update previous mouse position for the next frame
    previousMouse.x = mouse.x;
    previousMouse.y = mouse.y;
    // 2. Calculate mouse velocity using Pythagorean theorem and adjust speed
    const mouseVelocity = Math.min(Math.sqrt(deltaMouseX**2 + deltaMouseY**2) * 4, smoothy); 
    // 3. Convert mouse velocity to a value in the range [0, 0.5]
    const scaleValue = (mouseVelocity / smoothy) * 0.5;
    // 4. Smoothly update the current scale
    currentScale += (scaleValue - currentScale) * speed;
    // 5. Create a transformation string for scaling
    const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

    // ROTATE
    // 1. Calculate the angle using the atan2 function
    const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;
    // 2. Check for a threshold to reduce shakiness at low mouse velocity
    if (mouseVelocity > 20) {
      currentAngle = angle;
    }
    // 3. Create a transformation string for rotation
    const rotateTransform = `rotate(${currentAngle}deg)`;

    // Apply all transformations to the circle element in a specific order: translate -> rotate -> scale
    circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;

    // Request the next frame to continue the animation
    window.requestAnimationFrame(tick);
  }

  // Start the animation loop
  tick();
}
if (!isMobile.any()) {
  circleCursor(0.15,120);//speed, smoothly
}


function 

