import "./style.css";

/**
 * Module to start the image carousel and assign interactivity.
 * Preconditions: the HTML has the images hardcoded in and the respective 
 * amount of bubble buttons.
 */
(function startImgCarousel(doc) {
  const FIVE_SECONDS = 5 * 1000;

  const frame = doc.querySelector("#frame");
  const menuLeft = frame.querySelector("#menu-arrow-left");
  const menuRight = frame.querySelector("#menu-arrow-right");
  const slidesReel = frame.querySelector("#slides-reel");
  const slides = frame.querySelectorAll("#slides-reel .slide");
  const bubbles = frame.querySelectorAll("#bubbles-row .bubble");

  /**
   * Module defining the scrolling mechanism. Crucially, it holds the index of 
   * the current image.
   * @param {Number} numImgs The number of images in the carousel
   */
  const controller = ((numImgs) => {
    const n = numImgs; // alias
    let imgIndex = 0;

    function incrementIndex() {
      imgIndex++;
      imgIndex %= n;
      return imgIndex;
    }

    function decrementIndex() {
      imgIndex--;
      imgIndex = ((imgIndex % n) + n) % n; // circumvent the default way negatives are modded in JS
      return imgIndex;
    }

    function setIndex(index) {
      imgIndex = index;
    }

    return {
      incrementIndex,
      decrementIndex,
      setIndex,
    };
  })(bubbles.length);

  (function init() {
    bubbles[0].classList.add("current");
    slides[0].classList.add("current");
    setInterval(scrollRight, FIVE_SECONDS);

    menuRight.addEventListener("click", scrollRight);
    menuLeft.addEventListener("click", scrollLeft);
    bubbles.forEach((bubble, i) => {
      bubble.addEventListener("click", () => {
        scrollTo(i);
      });
    });
  })();

  function scrollRight() {
    const newIndex = controller.incrementIndex();
    render(newIndex);
  }

  function scrollLeft() {
    const newIndex = controller.decrementIndex();
    render(newIndex);
  }

  function scrollTo(newIndex) {
    controller.setIndex(newIndex);
    render(newIndex);
  }

  /**
   * To be called each time the image index is changed in the controller module.
   * @param {Number} imgIndex
   */
  function render(imgIndex) {
    renderImage(imgIndex);
    renderBubbles(imgIndex);

    // move the slidereel over to the selected image and make it visible
    function renderImage(index) {
      slidesReel.style.right = `calc(${index} * 100%)`;

      frame.querySelector(".current.slide").classList.remove("current");
      slides[index].classList.add("current");
    }

    // fill in the bubble for the current image
    function renderBubbles(index) {
      frame.querySelector(".current.bubble").classList.remove("current");
      bubbles[index].classList.add("current");
    }
  }
})(document);
