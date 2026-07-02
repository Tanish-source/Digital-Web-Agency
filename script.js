window.addEventListener("resize", function () {
  guitarHr();
});

function AutoTyping() {
  try {
    if (!document.querySelector(".auto-type")) {
      throw new Error("Element '.auto-type' not found in the DOM.");
    }

    new Typed(".auto-type", {
      strings: ["Get  In  Touch", "Let's Connect"],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true, // Fixed: loop should be a boolean, not a number
    });
  } catch (error) {
    console.error("Error in AutoTyping:", error);
  }
}

function circleMouseFollower() {
  try {
    var cursor = document.querySelector("#cursor");
    if (!cursor) return;

    document.addEventListener("mousemove", function (dets) {
      gsap.to(cursor, {
        opacity: 1,
        x: dets.clientX,
        y: dets.clientY,
        duration: 0.5,
      });
    });
    document.addEventListener("mouseleave", function () {
      gsap.to(cursor, {
        opacity: 0,
      });
    });
  } catch (error) {
    console.warn("circleMouseFollower: Cursor element not found");
  }
}

function guitarHr() {
  try {
    var string = document.querySelector(".string");
    var svgElement = document.querySelector(".string svg");
    var pathElement = document.querySelector(".string svg path");

    if (!string || !svgElement || window.innerWidth < 1300) return;

    width = window.innerWidth;
    width = width - 85;
    var initialPath = `M 0 175 Q ${Math.floor(width / 2)} 175 ${width} 175`;
    var finalPath = `M 0 175 Q ${Math.floor(width / 2)} 175 ${width} 175`;
    svgElement.style.width = `${width}`;
    pathElement.setAttribute("d", initialPath);

    string.addEventListener("mousemove", function (dets) {
      var rect = svgElement.getBoundingClientRect();

      var relativeX = dets.clientX - rect.left;
      var relativeY = dets.clientY - rect.top;

      initialPath = `M 0 175 Q ${relativeX} ${relativeY} ${width} 175`;

      gsap.to(".string svg path", {
        attr: { d: initialPath },
        duration: 0.3,
        ease: "Power1.out",
      });
    });

    string.addEventListener("mouseleave", function () {
      gsap.to("svg path", {
        attr: { d: finalPath },
        duration: 1.5,
        ease: "elastic.out(2,0.01)",
      });
    });
  } catch (error) {
    console.warn(error);
  }
}

function FooterAnimation() {
  try {
    var elems = document.querySelectorAll(".elem");
    const tickSound = document.getElementById("tickSound");

    if (elems.length === 0) return;

    elems.forEach(function (elem) {
      var rotate = 0;
      var Rdiff = 0;

      elem.addEventListener("mouseenter", () => {
        tickSound.currentTime = 0;
        tickSound.playbackRate = 2.0;
        tickSound.play();
      });

      elem.addEventListener("mousemove", function (dets) {
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        Rdiff = dets.clientX - rotate;
        rotate = dets.clientX;

        gsap.to(elem.querySelector("img"), {
          opacity: 1,
          ease: Power1,
          top: diff,
          left: dets.clientX - 150,
          rotate: gsap.utils.clamp(-15, 15, Rdiff),
        });
      });

      elem.addEventListener("mouseleave", function (dets) {
        gsap.to(elem.querySelector("img"), {
          opacity: 0,
          ease: Power1,
        });
      });
    });
  } catch (error) {
    console.warn("FooterAnimation: Elements not found");
  }
}

function HoverButton() {
  try {
    var btns = document.querySelectorAll(".btn");
    if (btns.length === 0) return;

    btns.forEach(function (ele) {
      var hover = ele.querySelector(".hover");
      var i = ele.querySelector("i");
      var h2 = ele.querySelector(".h2");
      ele.addEventListener("mouseenter", function () {
        gsap.to(ele, {
          scale: 1.1,
          duration: 0.5,
          delay: 0.1,
          ease: Expo.easeInOut,
        });
        gsap.to(hover, {
          scale: 27,
          duration: 0.5,
          delay: 0.1,
          ease: Expo.easeInOut,
        });
        gsap.to(i, {
          opacity: 1,
          scale: 1 / 27,
          duration: 0.5,
          delay: 0.2,
          ease: Expo.easeInOut,
        });
      });
      ele.addEventListener("mouseleave", function () {
        gsap.to(ele, {
          scale: 1,
          duration: 0.3,
          delay: 0.2,
          ease: Expo.easeInOut,
        });
        gsap.to(hover, {
          scale: 1,
          duration: 0.5,
          delay: 0.2,
          ease: Expo.easeInOut,
        });
        gsap.to(i, {
          opacity: 0,
          scale: 1,
          duration: 0.5,
          delay: 0.2,
          ease: Expo.easeInOut,
        });
      });
    });

    var button = document.querySelector(".button");
    var buttonH2 = document.querySelector(".button h2");
    if (button && buttonH2) {
      button.addEventListener("mouseenter", function () {
        gsap.to(buttonH2, {
          color: "#fafafa",
          delay: 0.5,
          duration: 0.5,
          ease: Expo.easeInOut,
        });
      });
      button.addEventListener("mouseleave", function () {
        gsap.to(buttonH2, {
          color: "#111",
          delay: 0.3,
          duration: 0.5,
          ease: Expo.easeInOut,
        });
      });
    }
  } catch (error) {
    console.warn("HoverButton: Elements not found");
  }
}

function MarqueAnimation() {
  try {
    var marque = document.querySelector(".marque");
    if (!marque) return;

    window.addEventListener("wheel", function (dets) {
      if (dets.deltaY > 0) {
        gsap.to(".marque", {
          transform: "translateX(-200%)",
          duration: 1.5,
          repeat: -1,
          ease: "none",
        });
        gsap.to(".marque img", {
          rotate: -180,
        });
      } else {
        gsap.to(".marque", {
          transform: "translateX(0%)",
          duration: 1.5,
          repeat: -1,
          ease: "none",
        });
        gsap.to(".marque img", {
          rotate: 0,
        });
      }
    });
  } catch (error) {
    console.warn("MarqueAnimation: Elements not found");
  }
}

function ServiceButton() {
  try {
    var btns = document.querySelectorAll(".hidden-btn");
    if (btns.length === 0) return;

    btns.forEach(function (ele) {
      var display = ele.querySelector(".display");
      var hidden = ele.querySelector(".hidden");
      ele.addEventListener("mouseenter", function () {
        gsap.to(hidden, {
          top: "0%",
          duration: 0.3,
          ease: Expo.easeInOut,
        });
        gsap.to(display, {
          scale: 0.5,
          y: "8",
          duration: 0.25,
          ease: Expo.easeInOut,
        });
      });
      ele.addEventListener("mouseleave", function () {
        gsap.to(display, {
          scale: 1,
          y: "0",
          duration: 0.4,
          ease: Expo.easeInOut,
        });
        gsap.to(hidden, {
          top: "100%",
          duration: 0.4,
          ease: Expo.easeInOut,
        });
      });
    });
  } catch (error) {
    console.warn("ServiceButton: Elements not found");
  }
}

function ImageTrailing() {
  try {
    var Page = document.querySelector(".ArPage-1");
    if (!Page) return;

    const images = [
      ...Array.from({ length: 52 }, (_, i) => i + 1)
        .filter((num) => ![8, 12, 29, 38, 42, 45, 46].includes(num))
        .map(
          (num) =>
            `assets/images/${num}.${[43, 44].includes(num) ? "webp" : "jpg"}`
        ),
    ];

    var lastX = 0;
    var lastY = 0;
    const distanceThreshold = 10;

    Page.addEventListener("mousemove", (e) => {
      const rect = Page.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const dx = mouseX - lastX;
      const dy = mouseY - lastY;
      const distance = Math.sqrt(dx ** 2 + dy ** 2);

      if (distance > distanceThreshold) {
        const img = document.createElement("img");
        img.src = images[Math.floor(Math.random() * images.length)];
        img.style.position = "absolute";
        img.style.left = `${mouseX}px`;
        img.style.top = `${mouseY}px`;
        img.style.transform = `translate(-50%, -50%)`;

        Page.appendChild(img);

        gsap.fromTo(
          img,
          {
            scale: 0,
            rotate: 15,
          },
          {
            scale: 1,
            rotate: 0,
            duration: 0.5,
          }
        );

        setTimeout(() => {
          gsap.to(img, {
            y: 100,
            scale: 0,
            duration: 0.5,
            ease: Expo.easeInOut,
            onComplete: () => {
              img.remove();
            },
          });
        }, 1500);

        lastX = mouseX;
        lastY = mouseY;
      }
    });
  } catch (error) {
    console.warn("ImageTrailing: Elements not found");
  }
}

function ArchiveHeading() {
  try {
    var headings = document.querySelectorAll(".ArHeading .cover h1");
    if (headings.length === 0) return;

    gsap.from(headings, {
      y: -500,
      x: -300,
      rotate: 180,
      delay: 0.1,
      duration: 1.4,
      ease: Expo.easeInOut,
      stagger: 0.2,
    });
  } catch (error) {
    console.warn("ArchiveHeading: Elements not found");
  }
}

function WASHeadingAnimation() {
  try {
    if (!document.querySelector(".AllHeading .bounding")) {
      throw new Error("Element '.AllHeading .bounding' not found in the DOM.");
    }

    gsap.from(".AllHeading .bounding", {
      y: 500,
      delay: 0.1,
      duration: 1,
      stagger: 0.3,
      ease: "Expo.easeInOut",
      onError: (error) => {
        console.error("GSAP Animation Error:", error);
      },
    });
  } catch (error) {
    console.error("Error in WASHeadingAnimation:", error);
  }
}

function NavAnimation() {
  try {
    var navbar = document.querySelector(".navbar");
    if (!navbar) return;

    window.addEventListener("wheel", function (dets) {
      if (dets.deltaY > 0) {
        gsap.to(navbar, {
          position: "absolute",
          top: -100,
          duration: 0.8,
          delay: -0.3,
          ease: Expo.easeInOut,
        });
      } else if (dets.deltaY < 0) {
        gsap.to(navbar, {
          position: "absolute",
          top: 0,
          duration: 0.5,
          delay: -0.2,
          ease: Expo.easeInOut,
        });
      }
    });
  } catch (error) {
    console.warn("NavAnimation: Navbar element not found");
  }
}

function MenuBarOpen() {
  try {
    var menuBar = document.querySelector(".menuBar");
    var content = document.querySelector(".content");

    if (!menuBar) throw new Error("Element '.menuBar' not found in the DOM.");
    if (!content) throw new Error("Element '.content' not found in the DOM.");

    var tl1 = gsap.timeline();
    tl1
      .to(menuBar, {
        right: "0%",
        duration: 0.5,
        scale: 1,
        ease: Power1,
      })
      .from(content, {
        x: -800,
        scale: 0,
        duration: 0.5,
        ease: Power2,
      });
  } catch (error) {
    console.error("Error in MenuBarOpen:", error);
  }
}

function MenuBarClose() {
  try {
    var menuBar = document.querySelector(".menuBar");

    if (!menuBar) throw new Error("Element '.menuBar' not found in the DOM.");

    gsap.to(menuBar, {
      right: "-100%",
      scale: 0.9,
      duration: 0.8,
      ease: Power3,
    });
  } catch (error) {
    console.error("Error in MenuBarClose:", error);
  }
}

AutoTyping();
NavAnimation();
ArchiveHeading();
WASHeadingAnimation();
ImageTrailing();
MarqueAnimation();
FooterAnimation();
circleMouseFollower();
ServiceButton();
HoverButton();
guitarHr();
