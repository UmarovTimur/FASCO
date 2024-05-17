// Подключение функционала "Чертогов Фрилансера"
import { isMobile, IsReduceMotion, clone, roll, bodyLock, bodyUnlock, bodyLockToggle } from "./functions.js";
// Подключение списка активных модулей
// import { flsModules } from "./modules.js";
// Подключение библиотеки для анимаций
import { gsap, ScrollTrigger } from "gsap/all.js";

import LocomotiveScroll from 'locomotive-scroll';

gsap.registerPlugin(ScrollTrigger);








/**
 * Locomotive Scroll
 * https://github.com/locomotivemtl/locomotive-scroll

*/
// const scroll = new LocomotiveScroll({
//   el: document.querySelector('[data-scroll-container]'),
//   smooth: true,
//   getDirection: true
// });


let scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  getDirection: true,
});


window.addEventListener("load", function (e) {
  window.addEventListener("resize", (e) => {
    productsTitlesAnimation();
    scroll.update();
  });
  productsTitlesAnimation();
  timer();

  ScrollTrigger.addEventListener("refresh", () => scroll.update());
  scroll.update();

  if (IsReduceMotion) { // Animation preference
    rollingText();
    socialRolling();

    if (!isMobile.any()) { // for Desktop
      circleCursor(0.15, 120); //speed, smoothly
      magnetLinks();
      circleFillAnimation();
    }
  }
});






// Magnets button
// https://codepen.io/tdesero/pen/RmoxQg
function magnetLinks() {
  let magnets = document.querySelectorAll('[data-strength]');

  magnets.forEach((magnet) => {
    if (magnet.hasAttribute("data-strength-text")) {
      magnet.addEventListener('mousemove', textMoveMagnet);
      magnet.addEventListener('mouseout', function (event) {
        gsap.to(event.currentTarget, {
          x: 0,
          y: 0,
          duration: 1.5,
          rotation: "0.001deg",
          ease: "elastic"
        })
        gsap.to(event.currentTarget.querySelector('._magnets-text'), 1.5, {
          x: 0,
          y: 0,
          duration: 1.5,
          rotation: "0.001deg",
          ease: "elastic"
        })
      });

    } else if (magnet.hasAttribute("data-vertical-magnets")) {
      magnet.addEventListener('mousemove', verticalMoveMagnet);
      magnet.addEventListener('mouseout', function (event) {
        gsap.to(event.currentTarget, {
          y: 0,
          duration: 1.5,
          rotation: "0.001deg",
          ease: "elastic"
        })
      });
    } else {
      magnet.addEventListener('mousemove', moveMagnet);
      magnet.addEventListener('mouseout', function (event) {
        gsap.to(event.currentTarget, {
          x: 0,
          y: 0,
          duration: 1.5,
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

    gsap.to(magnetButton, {
      x: (((event.clientX - bounding.left) / magnetButton.offsetWidth) - 0.5) * strength,
      y: (((event.clientY - bounding.top) / magnetButton.offsetHeight) - 0.5) * strength,
      duration: 1.5,
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

    gsap.to(magnetButton, {
      x: (((event.clientX - bounding.left) / magnetButton.offsetWidth) - 0.5) * strength,
      y: (((event.clientY - bounding.top) / magnetButton.offsetHeight) - 0.5) * strength,
      duration: 1.5,
      rotation: "0.001deg",
      ease: "elastic"
    });

    gsap.to(magnetText, {
      x: (((event.clientX - boundingText.left) / magnetText.offsetWidth) - 0.5) * strengthText,
      y: (((event.clientY - boundingText.top) / magnetText.offsetHeight) - 0.5) * strengthText,
      rotation: "0.001deg",
      duration: 1.5,
      ease: "elastic"
    });


    //   magnetButton.style.transform = 'translate(' + (((( event.clientX - bounding.left)/(magnetButton.offsetWidth))) - 0.5) * strength + 'px,'+ (((( event.clientY - bounding.top)/(magnetButton.offsetHeight))) - 0.5) * strength + 'px)';
  }

  function verticalMoveMagnet(event) {
    let magnetButton = event.currentTarget
    let bounding = magnetButton.getBoundingClientRect();
    let strength = magnetButton.getAttribute("data-strength");

    gsap.to(magnetButton, {
      y: (((event.clientY - bounding.top) / magnetButton.offsetHeight) - 0.5) * strength,
      duration: 1.5,
      rotation: "0.001deg",
      ease: "elastic"
    });
  }
}

/**
 * circleCursor
 * YouTube Tutorial:
 * https://youtu.be/wG_5453Vq98
  */
function circleCursor(speed, smoothy) {

  // Select the circle element
  const circleElement = document.querySelector('._circle');

  // Create objects to track mouse position and custom cursor position
  const mouse = { x: 0, y: 0 }; // Track current mouse position
  const previousMouse = { x: 0, y: 0 } // Store the previous mouse position
  const circle = { x: 0, y: 0 }; // Track the circle position
  let scale = 1;

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

  window.addEventListener("mousedown", (e) => {
    scale = .9;
  });
  window.addEventListener("mouseup", (e) => {
    scale = 1;
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
    const mouseVelocity = Math.min(Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 4, smoothy);
    // 3. Convert mouse velocity to a value in the range [0, 0.5]
    const scaleValue = (mouseVelocity / smoothy) * 0.5;
    // 4. Smoothly update the current scale
    currentScale += (scaleValue - currentScale) * speed;
    // 5. Create a transformation string for scaling
    const scaleTransform = `scale(${(1 + currentScale) * scale}, ${(1 - currentScale) * scale})`;

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

*/
// rolling-logos
// rolling-logos-item
// clone(sliderItem,sliderContainer);

function rollingText() {
  let rolling = document.getElementById("rolling-logos");
  let rollingItem = document.getElementById("rolling-logos-item");
  let direction = -1;
  let directionName = "down"; // top

  if (!rolling) {
    console.error("Cannot find rollingText");
    return;
  }

  rolling.classList.add("_rolling");

  // if (rolling.clientWidth <= window.innerWidth) {
  //   clone(rollingItem,rolling);
  //   clone(rollingItem,rolling);
  //   clone(rollingItem,rolling);
  // } else {
  //   clone(rollingItem,rolling);
  //   clone(rollingItem,rolling);
  //   clone(rollingItem,rolling);
  // }

  const roll1 = roll("#rolling-logos #rolling-logos-item", { duration: 14 }),
    updateScroll = scroll.on("scroll", (self) => {
      const SelfDirection = self.direction == "down" ? -1 : 1;
      if (self.direction != directionName) {
        gsap.to(roll1, { timeScale: direction, overwrite: true });
        directionName = self.direction;
        direction = SelfDirection;
      }
    });



}

function socialRolling() {
  let directionName = "down"; // up


  let gallery = document.getElementById('gallery-rolling'),
    galleryItem = document.getElementById('gallery-rolling-item');

  if (!gallery) {
    return console.error("Cannot find rollingGallery");
  }

  clone(galleryItem, gallery);
  clone(galleryItem, gallery);
  if (galleryItem.offsetWidth * 1.3 < window.innerWidth) {
    clone(galleryItem, gallery);
  }



  const socialRoll = roll(galleryItem, { duration: 10, ease: 'none' },
    scroll.on('scroll', self => {
      if (typeof self.currentElements['social__scroll'] === 'object') {

        if (directionName != self.direction) {
          let dir = self.direction == 'down' ? -1 : 1;
          directionName = self.direction;
          gsap.to(socialRoll, { timeScale: dir, overwrite: true });
        }

      }
    })
  );

  // scroll.on('call', func => {
  //   this.call(...func);
  // });



  gsap.to(socialRoll, { timeScale: -1, overwrite: true });


  function roll(element, option, update) {
    option = option || {};
    option.ease || (option.ease == "none");

    let timeline = gsap.timeline({
      repeat: -1,
      onReverseComplete() {
        this.totalTime(this.rawTime() + this.duration() * 10); // otherwise when the playhead gets back to the beginning, it'd stop. So push the playhead forward 10 iterations (it could be any number)
      }
    });

    timeline.to(gallery, {
      x: update ? element.offsetWidth : -element.offsetWidth,
      ...option,
    });

    return timeline;
  }




  gallery.addEventListener('mousemove', (event) => {
    let step;
    if (event.screenX <= window.innerWidth / 2) {
      step = 1;
      directionName = 'up';
    } else {
      step = -1;
      directionName = 'down';
    }

    const timeScale = (event.screenX - window.innerWidth / 2) / (window.innerWidth / 2);


    gsap.to(socialRoll, {
      timeScale: step + timeScale * -1.5,
      overwrite: true,
    });

  });


  gallery.addEventListener("drag", (event) => {
    event.preventDefault();
    console.log(event);
  });
  gallery.addEventListener('mouseenter', (event) => {
    // socialRoll.play();
    // now = 400 * (event.screenX / window.innerWidth - 0.5) * 2;
  });
  gallery.addEventListener('mouseleave', (event) => {
    gsap.to(socialRoll, {
      timeScale: event.screenX <= window.innerWidth / 2 ? 1 : -1,
      overwrite: true
    });

    // galleryRolling.pause();
  });


}

function productsTitlesAnimation() {

  const productOpenButton = document.querySelector(".products__catalog-item-current");
  const productOpenIcon = document.querySelector(".products__catalog-mobile-icon");

  let currentCatalog = document.querySelector(".products__catalog-item._tab-active");
  const productsCatalog = document.querySelector(".products__catalog");


  // if (!mobileSortIcon) {
  //   console.error("Cannot find the mobileSortIcon")
  //   return;
  // }

  // if (window.innerWidth <= 991.98) {
  //   document.addEventListener("click", event => {

  //     if (event.target.closest('.products__catalog-item-current') || event.target.closest('.products__catalog-mobile-icon')) {
  //       productsCatalog.classList.toggle('_active');
  //       bodyLockToggle();
  //     } else if (!event.target.closest('.products__catalog') && productsCatalog.classList.contains('_active')) {


  //       productsCatalog.classList.toggle('_active');
  //       bodyLockToggle();
  //     } else if (event.target.closest('.products__catalog-item') && event.target.closest('.products__catalog-item') != currentCatalog) {
  //       currentCatalog = event.target.closest('.products__catalog-item');
  //       productsCatalog.classList.toggle('_active');
  //       bodyLockToggle();
  //     }


  //   });

  // }


}


function circleFillAnimation() {
  const elements = document.querySelectorAll('#_circleFill');
  const duration = .3;
  const scale = 1;

  elements.forEach((element) => {
    let backround = document.createElement('div');
    backround.classList.add('_circleFillBackground');
    element.prepend(backround);
    // let animationOn = false;

    let tl = gsap.timeline()


    element.addEventListener('mouseenter', (event) => {
      tl.clear();
      tl.to(backround, { yPercent: 0, duration: 0 })
      tl.to(backround, { yPercent: -100, duration: duration })
    });


    element.addEventListener('mouseout', (event) => {

      tl.to(backround, { yPercent: -203, duration: duration })
    });
  })
}


function timer() {
  let timer = {
    sec: document.getElementById('timerSeconds'),
    min: document.getElementById('timerMinutes'),
    hour: document.getElementById('timerHours'),
    day: document.getElementById('timerDays'),
  }

  function seconds() {
    if (!timer.sec) {
      return;
    }
    setTimeout(() => {
      if (+timer.sec.innerHTML <= 0) {
        minutes();
        timer.sec.innerHTML = 60
      } else {
        timer.sec.innerHTML = +timer.sec.innerHTML - 1;
        if (+timer.sec.innerHTML < 10) {
          timer.sec.innerHTML = `0${timer.sec.innerHTML}`;
        }
      }
      seconds()
    }, '1000  ')
  }

  function minutes() {
    if (+timer.min.innerHTML <= 0) {
      hours();
      timer.min.innerHTML = 60
    } else {
      timer.min.innerHTML = +timer.min.innerHTML - 1;
      if (+timer.min.innerHTML < 10) {
        timer.min.innerHTML = `0${timer.min.innerHTML}`;
      }
    }

  }

  function hours() {
    if (+timer.hour.innerHTML <= 0) {
      days();
      timer.hour.innerHTML = 24
    } else {
      timer.hour.innerHTML = +timer.hour.innerHTML - 1;
      if (+timer.hour.innerHTML < 10) {
        timer.hour.innerHTML = `0${timer.hour.innerHTML}`;
      }
    }
  }

  function days() {
    if (+timer.day.innerHTML <= 0) {
      hours();
      timer.day.innerHTML = 2
    } else {
      timer.day.innerHTML = +timer.day.innerHTML - 1;
      if (+timer.day.innerHTML < 10) {
        timer.day.innerHTML = `0${timer.day.innerHTML}`;
      }
    }
  }

  seconds()

}