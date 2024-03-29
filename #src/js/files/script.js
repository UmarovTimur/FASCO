// Подключение функционала "Чертогов Фрилансера"
import { isMobile, IsReduceMotion, clone, roll } from "./functions.js";
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
const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  getDirection: true
});


window.onresize = scroll.update();

ScrollTrigger.addEventListener("refresh", () => scroll.update());

ScrollTrigger.refresh();



(function init() {


  window.addEventListener("resize", (e) => {
    productsTitlesAnimation();
  });
  productsTitlesAnimation();

  if (IsReduceMotion) {
    rollingText();
    // rollingGallery();
    socialRolling();

    if (!isMobile.any()) {
      circleCursor(0.15, 120);//speed, smoothly
      magnetLinks();
    }
  }

})();







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

*/
// rolling-logos
// rolling-logos-item
// clone(sliderItem,sliderContainer);

function rollingText() {
  let rolling = document.getElementById("rolling-logos");
  let rollingItem = document.querySelector("#rolling-logos-item");
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





function rollingGallery() {
  let direction = 1;

  if (isMobile.any()) {
    const galleryRolling = roll(".social__gallery .social__gallery-container", { duration: 13 }),
      scroll = ScrollTrigger.create({
        onUpdate(self) {
          if (-self.direction !== direction) {
            direction *= -1;
            gsap.to(galleryRolling, { timeScale: direction, overwrite: true });
          }
        }

      });
    return galleryRolling;
  }

  let gallery = document.getElementById('gallery-rolling'),
    galleryItem = document.getElementById('gallery-rolling-item'),
    now = 1;

  if (!gallery) {
    return console.error("Cannot find rollingGallery");
  }

  let directionName = "down"; // top

  // clone(galleryItem, galleryItemEl);

  const galleryRolling = roll(".social__gallery .social__gallery-container", { duration: 15 }),
    updateScroll = scroll.on("scroll", (self) => {
      const SelfDirection = self.direction == "down" ? 1 : -1;
      if (self.direction != directionName) {
        gsap.to(galleryRolling, { timeScale: direction, overwrite: true });
        directionName = self.direction;
        direction = SelfDirection;
      }
    });


  gallery.addEventListener('mousemove', (event) => {
    const step = event.screenX <= window.innerWidth / 2 ? 1 : -1;
    const timeScale = (event.screenX - window.innerWidth / 2) / (window.innerWidth / 2);

    gsap.to(galleryItem, {
      scale: 1.05,
    });
    gsap.to(galleryRolling, {
      timeScale: step + timeScale * -1.5,
      overwrite: true,
    });
  });

  gallery.addEventListener('mouseenter', (event) => {
    galleryRolling.play();
    // now = 400 * (event.screenX / window.innerWidth - 0.5) * 2;
  });
  gallery.addEventListener('mouseleave', (event) => {
    gsap.to(galleryRolling, {
      timeScale: event.screenX <= window.innerWidth / 2 ? 1 : -1,
      overwrite: true
    });
    gsap.to(galleryItem, {
      scale: 1,
    });
    // galleryRolling.pause();
  });
  // galleryRolling.pause();

}


function socialRolling() {
  let direction = 1;
  let directionName = "down"; // top


  let gallery = document.getElementById('gallery-rolling'),
    galleryItem = document.getElementById('gallery-rolling-item');

  if (!gallery) {
    return console.error("Cannot find rollingGallery");
  }

  clone(galleryItem, gallery);
  if (galleryItem.offsetWidth < window.innerWidth) {
    clone(galleryItem, gallery);
  }
  console.log(galleryItem.offsetWidth);



  const sociallRoll = roll(galleryItem, { duration: 10, ease: "none" }),
    rollUpdate = scroll.on("scroll", (self) => {
      const SelfDirection = self.direction == "down" ? 1 : -1;
      if (self.direction != directionName) {
        gsap.to(sociallRoll, { timeScale: direction, overwrite: true });
        directionName = self.direction;
        direction = SelfDirection;
      }
    });


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
      y: 0
    });

    return timeline;
  }




  gallery.addEventListener('mousemove', (event) => {
    const step = event.screenX <= window.innerWidth / 2 ? 1 : -1;
    const timeScale = (event.screenX - window.innerWidth / 2) / (window.innerWidth / 2);

    gsap.to(sociallRoll, {
      timeScale: step + timeScale * -1.5,
      overwrite: true,
    });
  });

  gallery.addEventListener('mouseenter', (event) => {
    // sociallRoll.play();
    // now = 400 * (event.screenX / window.innerWidth - 0.5) * 2;
  });
  gallery.addEventListener('mouseleave', (event) => {
    gsap.to(sociallRoll, {
      timeScale: event.screenX <= window.innerWidth / 2 ? 1 : -1,
      overwrite: true
    });

    // galleryRolling.pause();
  });


}

function productsTitlesAnimation() {

  const mobileSortIcon = document.querySelector(".products__catalog-mobile");
  const mobileMenutList = document.querySelector(".products__catalog");
  const productTitlesList = [...document.querySelectorAll('#productsCard')];
  let currentCatalog = document.querySelector(".products__catalog-item-current > .products__catalog-item");

  if (!mobileSortIcon) {
    console.error("Cannot find the mobileSortIcon")
    return;
  }


  if (window.innerWidth <= 991.98) {
    // gsap.to(mobileMenutList, {
    //   y: mobileMenutList.offsetWidth,
    //   opacity: 1
    // });

    mobileSortIcon.addEventListener("click", event => {
      mobileSortIcon.classList.toggle('_active');
      mobileMenutList.classList.toggle('_active');

      document.addEventListener("click", event => {
        if (!event.target.closest(".products__catalog") && !event.target.closest(".products__catalog-item-current") && !event.target.closest(".products__catalog-mobile-icon")) {
          mobileMenutList.classList.remove('_active');
          document.removeEventListener("click", event => { }, false);
        }
      });
      // if (mobileMenutList.classList.contains('_active')) {
      //   gsap.to(mobileMenutList, {
      //     y: 0,
      //     duration: .5,
      //     ease: "power1.out",
      //   });
      // } else {
      //   gsap.to(mobileMenutList, {
      //     y: mobileMenutList.offsetHeight,
      //     duration: .3,
      //     ease: "sine.in",
      //   });
      // }

    });
    productTitlesList.forEach(index => {

      index.addEventListener("click", event => {
        let el = event.target.closest("#productsCard");
        if (!el.classList.contains("_tab-active")) {
          mobileMenutList.classList.remove('_active');
          currentCatalog.innerHTML = el.querySelector("button").textContent;

          // gsap.to(mobileMenutList, {
          //   y: mobileMenutList.offsetHeight,
          //   duration: 1,
          // });
        }
      });
    })
  } else {
    // gsap.to(mobileMenutList, {
    //   y: 0,
    // });
  }



  let activeCard;

  // catalogList.forEach(card => {
  //   if (card.classList.contains("_active")) {
  //     activeCard = card
  //   }


  //   card.addEventListener("click", event => {
  //     let el = event.target.closest('#productsCard');

  //     console.log(activeCard);

  //     if (!el.classList.contains('_active')) {
  //       el.classList.add('_active')
  //       activeCard.classList.remove('_active');
  //       activeCard = el;

  //     }

  //   })

  // })
}
