// Подключение функционала "Чертогов Фрилансера"
import { isMobile, IsReduceMotion, clone } from "./functions.js";
// Подключение списка активных модулей
// import { flsModules } from "./modules.js";
// Подключение библиотеки для анимаций
import { gsap, ScrollTrigger } from "gsap/all.js";

import LocomotiveScroll from 'locomotive-scroll';

gsap.registerPlugin(ScrollTrigger);




(function init() {
  
  
  
  

  if (IsReduceMotion) {
    // logosCarusel("#logos-slider","#logos-slider-item",8);
    rollingText();

    if (!isMobile.any()) {
      circleCursor(0.15,120);//speed, smoothly
      magnetLinks()
    }
  }
})();




/**
 * Locomotive Scroll
 * https://github.com/locomotivemtl/locomotive-scroll

*/
const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  getDirection: true
});

ScrollTrigger.create({
  trigger: document.querySelector('[data-scroll-container]'),

  onUpdate: (self) => {
    console.log(self.direction);
    // if (caruselDirection !== self.direction) {
      // caruselDirection *= -1;
    // }
  },
});

window.onresize = scroll.update();

scroll.on("scroll", () => ScrollTrigger.update());


ScrollTrigger.addEventListener("refresh", () => scroll.update());

ScrollTrigger.refresh();


// Magnets button
// https://codepen.io/tdesero/pen/RmoxQg
function magnetLinks() {
  let magnets = document.querySelectorAll('[data-strength]');    

  magnets.forEach((magnet) => {
    if (magnet.hasAttribute("data-strength-text")) {

      magnet.addEventListener('mousemove', textMoveMagnet );
      magnet.addEventListener('mouseout', function(event) {
        gsap.to( event.currentTarget, {
          x: 0,
          y: 0,
          duration:1.5,
          rotation: "0.001deg",
          ease: "elastic"})
        gsap.to( event.currentTarget.querySelector('._magnets-text'), 1.5, {
          x: 0,
          y: 0,
          duration:1.5,
          rotation: "0.001deg",
          ease: "elastic"})
        });

    } else {
      magnet.addEventListener('mousemove', moveMagnet );
      magnet.addEventListener('mouseout', function(event) {
        gsap.to( event.currentTarget, {
          x: 0,
          y: 0,
          duration:1.5,
          rotation: "0.001deg",
          ease: "elastic"
        })
        });
      }
  });
  
  function moveMagnet(event) {
    let magnetButton = event.currentTarget
    let bounding = magnetButton.getBoundingClientRect();
    let strength = magnetButton.getAttribute("data-strength");
      
    gsap.to( magnetButton, {
      x: ((( event.clientX - bounding.left)/magnetButton.offsetWidth) - 0.5) * strength,
      y: ((( event.clientY - bounding.top)/magnetButton.offsetHeight) - 0.5) * strength,
      duration:1.5,
      rotation: "0.001deg",
      ease: "elastic"
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
      
    gsap.to( magnetButton, {
      x: ((( event.clientX - bounding.left)/magnetButton.offsetWidth) - 0.5) * strength,
      y: ((( event.clientY - bounding.top)/magnetButton.offsetHeight) - 0.5) * strength,
      duration:1.5,
      rotation: "0.001deg",
      ease: "elastic"
    });

    gsap.to( magnetText, {
      x: ((( event.clientX - boundingText.left)/magnetText.offsetWidth) - 0.5) * strengthText,
      y: ((( event.clientY - boundingText.top)/magnetText.offsetHeight) - 0.5) * strengthText,
      rotation: "0.001deg",
      duration:1.5,
      ease: "elastic"
    });
  
  
  //   magnetButton.style.transform = 'translate(' + (((( event.clientX - bounding.left)/(magnetButton.offsetWidth))) - 0.5) * strength + 'px,'+ (((( event.clientY - bounding.top)/(magnetButton.offsetHeight))) - 0.5) * strength + 'px)';
  }
}

/**
 * circleCursor
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
    // console.log(circleElement.style.transform.translateX);

    // let style = window.getComputedStyle(circleElement);
    // let matrix = new WebKitCSSMatrix(style.transform);

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


/**
  // Scrolling Letters Both Direction
  // https://codepen.io/GreenSock/pen/rNjvgjo
  // Fixed example with resizing
  // https://codepen.io/GreenSock/pen/QWqoKBv?editors=0010
*/
// rolling-logos
// rolling-logos-item
// clone(sliderItem,sliderContainer);

function rollingText() {
  document.querySelector("#rolling-logos").classList.add("_rolling");
  
  let direction = 1;
  

  const roll1 = roll("#rolling-logos",{duration:10},),
        scroll = ScrollTrigger.create({
          scroller: document.querySelector('[data-scroll-container]'),
          // trigger: document.querySelector('[data-scroll-container]'),
          onUpdate(self) {
            if (self.direction !== direction) {
              direction *= -1;
              gsap.to(roll1, {timeScale: direction, overwrite: true});
            }
          }
        });

        function roll(targets, vars, reverse) {
          vars = vars || {};
        
          
        }
}







/**
* Scrolltrigger Scroll Letters Home
*/
function initScrollLetters() {
  // Scrolling Letters Both Direction
  // https://codepen.io/GreenSock/pen/rNjvgjo
  // Fixed example with resizing
  // https://codepen.io/GreenSock/pen/QWqoKBv?editors=0010

  let direction = 1; // 1 = forward, -1 = backward scroll

  const roll1 = roll(".big-name .name-wrap", {duration: 18}),
        scroll = ScrollTrigger.create({
          trigger: document.querySelector('[data-scroll-container]'),
          onUpdate(self) {
            if (self.direction !== direction) {
              direction *= -1;
              gsap.to(roll1, {timeScale: direction, overwrite: true});
            }
          }
        });

  // helper function that clones the targets, places them next to the original, then animates the xPercent in a loop to make it appear to roll across the screen in a seamless loop.
  function roll(targets, vars, reverse) {
    vars = vars || {};
    vars.ease || (vars.ease = "none");
    const tl = gsap.timeline({
      repeat: -1,
      onReverseComplete() { 
        this.totalTime(this.rawTime() + this.duration() * 10); // otherwise when the playhead gets back to the beginning, it'd stop. So push the playhead forward 10 iterations (it could be any number)
      }
    }), 
    elements = gsap.utils.toArray(targets),
    clones = elements.map(el => {
      let clone = el.cloneNode(true);
      el.parentNode.appendChild(clone);
      return clone;
    }),
    positionClones = () => elements.forEach((el, i) => gsap.set(clones[i], {position: "absolute", overwrite: false, top: el.offsetTop, left: el.offsetLeft + (reverse ? -el.offsetWidth : el.offsetWidth)}));
    positionClones();
    elements.forEach((el, i) => tl.to([el, clones[i]], {xPercent: reverse ? 100 : -100, ...vars}, 0));
    window.addEventListener("resize", () => {
      let time = tl.totalTime(); // record the current time
      tl.totalTime(0); // rewind and clear out the timeline
      positionClones(); // reposition
      tl.totalTime(time); // jump back to the proper time
    });
    return tl;
  }

}

