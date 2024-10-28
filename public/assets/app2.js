import { g as gsapWithCSS$1, S as ScrollTrigger$1, a as gsap$1, C as CSSPlugin, s as screen, P as Power3, b as Power0, B as Back, c as Power2, d as Power1, e as ScrollSmoother } from "./all.js";
import { chat } from "./chat.js";

var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

var require_app2 = __commonJS({
  "assets/app2.js"(exports, module) {

    function toElementArray(selector) {
      if (typeof selector == "string") {
        return Array.from(document.querySelectorAll(selector));
      } else if (selector instanceof Array) {
        return selector;
      } else if (selector instanceof HTMLCollection || selector instanceof NodeList) {
        return Array.from(selector);
      } else if (selector instanceof HTMLElement) {
        return [selector];
      } else {
        console.error("O que é isso? ", selector);
      }
    }
    function onClickOutside(internalAreas, callback, options) {
      const {
        autoStop = true,
        autoStart = true,
        once: once2 = false
      } = options ? options : {};
      const obj = {
        areas: toElementArray(internalAreas),
        clickInside: false,
        cb: callback,
        autoStop,
        once: once2,
        in: (ev) => {
          obj.clickInside = true;
        },
        out: (ev) => {
          if (!obj.clickInside) {
            obj.cb(ev);
            if (obj.autoStop)
              obj.stop();
            if (obj.once)
              obj.destroy();
          }
          obj.clickInside = false;
        },
        start() {
          setTimeout(() => {
            this.areas.forEach((el) => el.addEventListener("click", this.in));
            document.addEventListener("click", this.out);
          }, 0);
        },
        stop() {
          this.areas.forEach((el) => el.removeEventListener("click", this.in));
          document.removeEventListener("click", this.out);
        },
        destroy() {
          this.stop();
          this.areas = null;
          this.cb = null;
        }
      };
      if (autoStart)
        obj.start();
      return obj;
    }
    (function () {
      const menuactive = "menu-active";
      const menuleave = "menu-leave";
      const bodycl = document.body.classList;
      Array.from(document.querySelectorAll(".menu--wrapper, #bt-menu, [data-modal],.modal"));
      const menu = {
        get isOpen() {
          return bodycl.contains(menuactive);
        },
        open() {
          bodycl.add(menuactive);
        },
        close(time = 800) {
          if (!bodycl.contains(menuactive)) {
            return;
          }
          bodycl.remove(menuactive);
          bodycl.add(menuleave);
          setTimeout(() => {
            bodycl.remove(menuleave);
          }, 800);
        }
      };
      const btnMenu = document.getElementById("bt-menu");
      if (btnMenu) {
        btnMenu.addEventListener("click", () => {
          menu.isOpen ? menu.close() : menu.open();
        });
      }
      const btnMenuClose = document.querySelectorAll("[data-menu-close]");
      if (btnMenuClose) {
        btnMenuClose.forEach((el) => {
          el.addEventListener("click", () => menu.close());
        });
      }
    })();
    function parseAnimation(strAr) {
      let animation = "", duration = ".8s", timingFunction = "ease-in-out", delay2 = "", iteration = "", fill = "both";
      for (let i = 0; i < strAr.length; i++) {
        const str = strAr[i];
        const n = Number.parseFloat(str);
        if (i == 0) {
          animation = str;
          continue;
        }
        if (i == 1) {
          if (!isNaN(n)) {
            duration = str;
          } else if (isEase(str)) {
            timingFunction = timingDict[str];
          } else if (str === "infinite") {
            delay2 = "0s";
            iteration = str;
          }
          continue;
        }
        if (i == 2) {
          if (!isNaN(n)) {
            delay2 = str;
          } else if (str == "-") {
            delay2 = "0s";
          } else if (isEase(str)) {
            timingFunction = timingDict[str];
          } else if (str === "infinite") {
            delay2 = "0s";
            iteration = str;
          }
          continue;
        }
        if (i == 3) {
          if (!isNaN(n) && !delay2) {
            delay2 = str;
          } else if (!isNaN(n) && delay2) {
            iteration = str;
          } else if (str == "-") {
            delay2 = "0s";
          } else if (isEase(str)) {
            timingFunction = timingDict[str];
          } else if (str === "infinite") {
            delay2 = "0s";
            iteration = str;
          }
          continue;
        }
        if (i == 4) {
          if (!isNaN(str)) {
            iteration = str;
          } else if (str === "infinite") {
            iteration = str;
          }
        }
      }
      let result = `${animation} ${duration} ${timingFunction}`;
      if (delay2)
        result += " " + delay2;
      if (iteration)
        result += " " + iteration;
      result += " " + fill;
      return result;
    }
    function isEase(str) {
      if (timingDict[str]) {
        return true;
      } else {
        return false;
      }
    }
    const timingDict = {
      "ease": "ease",
      "linear": "linear",
      "ease-in": "ease-in",
      "ease-out": "ease-out",
      "ease-in-out": "ease-in-out",
      "ease-in-quad": "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
      "ease-in-cubic": "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
      "ease-in-quart": "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
      "ease-in-quint": "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
      "ease-in-sine": "cubic-bezier(0.470, 0.000, 0.745, 0.715)",
      "ease-in-expo": "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
      "ease-in-circ": "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
      "ease-in-back": "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
      "ease-out-quad": "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
      "ease-out-cubic": "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
      "ease-out-quart": "cubic-bezier(0.165, 0.840, 0.440, 1.000)",
      "ease-out-quint": "cubic-bezier(0.230, 1.000, 0.320, 1.000)",
      "ease-out-sine": "cubic-bezier(0.390, 0.575, 0.565, 1.000)",
      "ease-out-expo": "cubic-bezier(0.190, 1.000, 0.220, 1.000)",
      "ease-out-circ": "cubic-bezier(0.075, 0.820, 0.165, 1.000)",
      "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
      "ease-in-out-quad": "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
      "ease-in-out-cubic": "cubic-bezier(0.645, 0.045, 0.355, 1.000)",
      "ease-in-out-quart": "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
      "ease-in-out-quint": "cubic-bezier(0.860, 0.000, 0.070, 1.000)",
      "ease-in-out-sine": "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
      "ease-in-out-expo": "cubic-bezier(1.000, 0.000, 0.000, 1.000)",
      "ease-in-out-circ": "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
      "ease-in-out-back": "cubic-bezier(0.680, -0.550, 0.265, 1.550)"
    };
    function tokenizer(input) {
      const regTokens = /([^,\s].[^,]*)/g;
      const regKey = /.+?(?=:)/;
      const regValues = /(?!.+?:)[^:\s]\S+|-|\d+/g;
      const result = [];
      const tokens2 = input.match(regTokens);
      if (!tokens2)
        return null;
      tokens2.forEach((t) => {
        const key2 = t.match(regKey);
        const values = t.match(regValues);
        result.push({ key: key2 ? key2[0] : null, values });
      });
      return result;
    }
    let watched = [];
    let screenSize = "";
    const getsize = function () {
      const iw = window.innerWidth;
      if (iw < 768)
        screenSize = "phone";
      if (iw >= 768 && iw <= 1200)
        screenSize = "tablet";
      if (iw > 1200)
        screenSize = "desktop";
    };
    getsize();
    window.addEventListener("resize", getsize);
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const defs = watched.filter((t) => t.trigger === entry.target);
        const vis = entry.isIntersecting;
        const scrollingDown = entry.boundingClientRect.top < 0;
        defs.forEach((def) => {
          if (!def.el.isConnected || vis && !def.isConnected) {
            def.isConnected = def.el.isConnected;
            return;
          }
          if (vis && !def.animated || vis && def.loop[screenSize]) {
            let animate = function () {
              def.animated = true;
              def.el.classList.add("aos-animate");
              if (def[screenSize]) {
                def.el.style.animation = def[screenSize];
                def.el.classList.add(def[screenSize].match(/^\S+/)[0]);
              }
            };
            let delay2 = 0;
            if (screenSize == "phone" && def.el.dataset.delayPhone) {
              delay2 = def.el.dataset.delayPhone;
            } else if (screenSize == "tablet" && def.el.dataset.delayTablet) {
              delay2 = def.el.dataset.delayTablet;
            } else if (screenSize == "desktop" && def.el.dataset.delayDesktop) {
              delay2 = def.el.dataset.delayDesktop;
            } else if (def.el.dataset.delay) {
              delay2 = def.el.dataset.delay;
            }
            if (delay2 > 0) {
              setTimeout(() => {
                animate();
              }, delay2);
            } else {
              animate();
            }
          }
          if (!vis && def.loop[screenSize] && !scrollingDown) {
            if (def[screenSize]) {
              def.el.style.animation = "";
              const elclass = def[screenSize].match(/^\S+/);
              if (elclass)
                def.el.classList.remove(elclass[0]);
            }
            def.el.classList.remove("aos-animate");
          }
        });
      });
    });
    const obsAttrbutes = new MutationObserver(() => {
      updateWatched();
    });
    const updateWatched = function () {
      watched = [];
      obs.disconnect();
      obsAttrbutes.disconnect();
      const els = document.querySelectorAll("[data-aos]");
      els.forEach((el) => {
        createAosParams(el);
      });
    };
    function createAosParams(el) {
      const aosdef = {
        el,
        isConnected: el.isConnected,
        trigger: el,
        loop: {
          desktop: false,
          tablet: false,
          phone: false
        },
        animated: false,
        desktop: null,
        tablet: null,
        phone: null
      };
      const tokens2 = tokenizer(el.dataset.aos);
      if (tokens2) {
        tokens2.forEach((t) => {
          if (t.key === "trigger") {
            let trigger2 = el.closest(t.values[0]);
            if (!trigger2) {
              trigger2 = document.querySelector(t.values[0]);
            }
            aosdef.trigger = trigger2;
            return;
          }
          if (t.values[0] === "loop") {
            if (!t.key) {
              aosdef.loop.desktop = true;
              aosdef.loop.tablet = true;
              aosdef.loop.phone = true;
            } else {
              if (t.key.includes("d"))
                aosdef.loop.desktop = true;
              if (t.key.includes("t"))
                aosdef.loop.tablet = true;
              if (t.key.includes("p"))
                aosdef.loop.phone = true;
            }
            return;
          }
          const v = parseAnimation(t.values);
          if (!t.key) {
            aosdef.desktop = v;
            aosdef.tablet = v;
            aosdef.phone = v;
            return;
          }
          if (t.key.includes("d"))
            aosdef.desktop = v;
          if (t.key.includes("t"))
            aosdef.tablet = v;
          if (t.key.includes("p"))
            aosdef.phone = v;
        });
      }
      obs.observe(aosdef.trigger);
      obsAttrbutes.observe(aosdef.el, { attributeFilter: ["data-aos"] });
      watched.push(aosdef);
    }
    const defaultConfig = {
      rootMargin: "0px",
      threshold: 0,
      load: function load(a) {
        if ("picture" === a.nodeName.toLowerCase()) {
          let src = a.querySelector("source").getAttribute("srcset");
          let image = new Image();
          image.src = src;
          a.append(image);
          image.onload = function () {
            markAsLoaded(a);
          };
        }
        "iframe" === a.nodeName.toLowerCase() && a.getAttribute("data-src") && (a.setAttribute("src", a.getAttribute("data-src")), a.setAttribute("data-loaded", "true"));
        if ("video" === a.nodeName.toLowerCase() && !a.getAttribute("data-src") && a.children) {
          a.setAttribute("poster", a.getAttribute("data-poster"));
          b = a.children;
          for (var d, c = 0; c <= b.length - 1; c++)
            if (d = b[c].getAttribute("data-src"))
              b[c].src = d;
          a.load();
        }
        a.getAttribute("data-src") && (a.src = a.getAttribute("data-src"));
        a.getAttribute("data-srcset") && a.setAttribute("srcset", a.getAttribute("data-srcset"));
        a.getAttribute("data-background-image") && (a.style.backgroundImage = "url('" + a.getAttribute("data-background-image") + "')");
        a.getAttribute("data-toggle-class") && a.classList.toggle(a.getAttribute("data-toggle-class"));
      },
      loaded: function loaded(e) {
        e.onload = (e2) => {
          markAsLoaded(e2.target);
        };
      }
    };
    function markAsLoaded(element) {
      element.setAttribute("data-loaded", true);
      element.parentElement.setAttribute("data-loaded", true);
    }
    const isLoaded = function (element) {
      return element.getAttribute("data-loaded") === "true";
    };
    const onIntersection = function onIntersection2(load, loaded) {
      return function (entries, observer2) {
        entries.forEach(function (entry) {
          if (entry.intersectionRatio > 0 || entry.isIntersecting) {
            observer2.unobserve(entry.target);
            if (!isLoaded(entry.target)) {
              load(entry.target);
              loaded(entry.target);
            }
          }
        });
      };
    };
    const getElements$1 = function getElements2(selector) {
      var root = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : document;
      if (selector instanceof Element) {
        return [selector];
      }
      if (selector instanceof NodeList) {
        return selector;
      }
      return root.querySelectorAll(selector);
    };
    function lozad(selector = ".lozad", options = {}) {
      var selector = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ".lozad";
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var _Object$assign = Object.assign({}, defaultConfig, options), root = _Object$assign.root, rootMargin = _Object$assign.rootMargin, threshold = _Object$assign.threshold, load = _Object$assign.load, loaded = _Object$assign.loaded;
      var observer2 = void 0;
      if (typeof window !== "undefined" && window.IntersectionObserver) {
        observer2 = new IntersectionObserver(onIntersection(load, loaded), {
          root,
          rootMargin,
          threshold
        });
      }
      return {
        observe: function observe() {
          var elements = getElements$1(selector, root);
          for (var i = 0; i < elements.length; i++) {
            if (isLoaded(elements[i])) {
              continue;
            }
            if (observer2) {
              observer2.observe(elements[i]);
              continue;
            }
            load(elements[i]);
            markAsLoaded(elements[i]);
            loaded(elements[i]);
          }
        },
        triggerLoad: function triggerLoad(element) {
          if (isLoaded(element)) {
            return;
          }
          load(element);
          markAsLoaded(element);
          loaded(element);
        },
        observer: observer2
      };
    }
    function observers() {
      var pictureObserver = lozad("[data-lazy]", {
        threshold: 0.01,
        rootMargin: "1000px 0px"
      });
      pictureObserver.observe();
      let video = document.querySelectorAll("video[data-play-pause]");
      let videoObserver = new IntersectionObserver(function (entries, videoObserver2) {
        entries.forEach(function (entry, key2) {
          if (entry.intersectionRatio == 0 && !entry.target.paused) {
            entry.target.pause();
            this["isPaused" + key2] = true;
          } else if (this["isPaused" + key2] == true || entry.target.hasAttribute("autoplay")) {
            entry.target.play();
            this["isPaused" + key2] = false;
          }
        });
      }, {
        threshold: 0
      });
      video.forEach(function (video2) {
        videoObserver.observe(video2);
      });
      let play = document.querySelectorAll("[data-play-toggle]");
      let playObserver = new IntersectionObserver(function (entries, playObserver2) {
        entries.forEach(function (entry) {
          setTimeout(() => {
            var slide2 = entry.target.swiper;
            if (entry.intersectionRatio > 0) {
              slide2.autoplay.start();
            } else {
              slide2.autoplay.stop();
            }
            if (entry.intersectionRatio > 0) {
              slide2.autoplay.start();
            } else {
              slide2.autoplay.stop();
            }
          }, 1500);
        });
      }, {
        threshold: 0,
        rootMargin: "0px"
      });
      play.forEach(function (play2) {
        playObserver.observe(play2);
      });
    }
    var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
    function getDefaultExportFromCjs(x) {
      return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
    }
    var pjax = { exports: {} };
    var foreachEls = function (els, fn, context) {
      if (els instanceof HTMLCollection || els instanceof NodeList || els instanceof Array) {
        return Array.prototype.forEach.call(els, fn, context);
      }
      return fn.call(context, els);
    };
    var evalScript$1 = function (el) {
      var code = el.text || el.textContent || el.innerHTML || "";
      var src = el.src || "";
      var parent = el.parentNode || document.querySelector("head") || document.documentElement;
      var script = document.createElement("script");
      if (code.match("document.write")) {
        if (console && console.log) {
          console.log(
            "Script contains document.write. Can’t be executed correctly. Code skipped ",
            el
          );
        }
        return false;
      }
      script.type = "text/javascript";
      script.id = el.id;
      if (src !== "") {
        script.src = src;
        script.async = false;
      }
      if (code !== "") {
        try {
          script.appendChild(document.createTextNode(code));
        } catch (e) {
          script.text = code;
        }
      }
      parent.appendChild(script);
      if ((parent instanceof HTMLHeadElement || parent instanceof HTMLBodyElement) && parent.contains(script)) {
        parent.removeChild(script);
      }
      return true;
    };
    var forEachEls$3 = foreachEls;
    var evalScript = evalScript$1;
    var executeScripts$1 = function (el) {
      if (el.tagName.toLowerCase() === "script") {
        evalScript(el);
      }
      forEachEls$3(el.querySelectorAll("script"), function (script) {
        if (!script.type || script.type.toLowerCase() === "text/javascript") {
          if (script.parentNode) {
            script.parentNode.removeChild(script);
          }
          evalScript(script);
        }
      });
    };
    var forEachEls$2 = foreachEls;
    var on$3 = function (els, events2, listener, useCapture) {
      events2 = typeof events2 === "string" ? events2.split(" ") : events2;
      events2.forEach(function (e) {
        forEachEls$2(els, function (el) {
          el.addEventListener(e, listener, useCapture);
        });
      });
    };
    var on$2 = on$3;
    var switches$1 = {
      outerHTML: function (oldEl, newEl) {
        oldEl.outerHTML = newEl.outerHTML;
        this.onSwitch();
      },
      innerHTML: function (oldEl, newEl) {
        oldEl.innerHTML = newEl.innerHTML;
        if (newEl.className === "") {
          oldEl.removeAttribute("class");
        } else {
          oldEl.className = newEl.className;
        }
        this.onSwitch();
      },
      switchElementsAlt: function (oldEl, newEl) {
        oldEl.innerHTML = newEl.innerHTML;
        if (newEl.hasAttributes()) {
          var attrs = newEl.attributes;
          for (var i = 0; i < attrs.length; i++) {
            oldEl.attributes.setNamedItem(attrs[i].cloneNode());
          }
        }
        this.onSwitch();
      },
      // Equivalent to outerHTML(), but doesn't require switchElementsAlt() for <head> and <body>
      replaceNode: function (oldEl, newEl) {
        oldEl.parentNode.replaceChild(newEl, oldEl);
        this.onSwitch();
      },
      sideBySide: function (oldEl, newEl, options, switchOptions) {
        var forEach = Array.prototype.forEach;
        var elsToRemove = [];
        var elsToAdd = [];
        var fragToAppend = document.createDocumentFragment();
        var animationEventNames = "animationend webkitAnimationEnd MSAnimationEnd oanimationend";
        var animatedElsNumber = 0;
        var sexyAnimationEnd = (function (e) {
          if (e.target !== e.currentTarget) {
            return;
          }
          animatedElsNumber--;
          if (animatedElsNumber <= 0 && elsToRemove) {
            elsToRemove.forEach(function (el) {
              if (el.parentNode) {
                el.parentNode.removeChild(el);
              }
            });
            elsToAdd.forEach(function (el) {
              el.className = el.className.replace(
                el.getAttribute("data-pjax-classes"),
                ""
              );
              el.removeAttribute("data-pjax-classes");
            });
            elsToAdd = null;
            elsToRemove = null;
            this.onSwitch();
          }
        }).bind(this);
        switchOptions = switchOptions || {};
        forEach.call(oldEl.childNodes, function (el) {
          elsToRemove.push(el);
          if (el.classList && !el.classList.contains("js-Pjax-remove")) {
            if (el.hasAttribute("data-pjax-classes")) {
              el.className = el.className.replace(
                el.getAttribute("data-pjax-classes"),
                ""
              );
              el.removeAttribute("data-pjax-classes");
            }
            el.classList.add("js-Pjax-remove");
            if (switchOptions.callbacks && switchOptions.callbacks.removeElement) {
              switchOptions.callbacks.removeElement(el);
            }
            if (switchOptions.classNames) {
              el.className += " " + switchOptions.classNames.remove + " " + (options.backward ? switchOptions.classNames.backward : switchOptions.classNames.forward);
            }
            animatedElsNumber++;
            on$2(el, animationEventNames, sexyAnimationEnd, true);
          }
        });
        forEach.call(newEl.childNodes, function (el) {
          if (el.classList) {
            var addClasses2 = "";
            if (switchOptions.classNames) {
              addClasses2 = " js-Pjax-add " + switchOptions.classNames.add + " " + (options.backward ? switchOptions.classNames.forward : switchOptions.classNames.backward);
            }
            if (switchOptions.callbacks && switchOptions.callbacks.addElement) {
              switchOptions.callbacks.addElement(el);
            }
            el.className += addClasses2;
            el.setAttribute("data-pjax-classes", addClasses2);
            elsToAdd.push(el);
            fragToAppend.appendChild(el);
            animatedElsNumber++;
            on$2(el, animationEventNames, sexyAnimationEnd, true);
          }
        });
        oldEl.className = newEl.className;
        oldEl.appendChild(fragToAppend);
      }
    };
    var defaultSwitches = switches$1;
    var parseOptions$1 = function (options) {
      options = options || {};
      options.elements = options.elements || "a[href], form[action]";
      options.selectors = options.selectors || ["title", ".js-Pjax"];
      options.switches = options.switches || {};
      options.switchesOptions = options.switchesOptions || {};
      options.history = typeof options.history === "undefined" ? true : options.history;
      options.analytics = typeof options.analytics === "function" || options.analytics === false ? options.analytics : defaultAnalytics;
      options.scrollTo = typeof options.scrollTo === "undefined" ? 0 : options.scrollTo;
      options.scrollRestoration = typeof options.scrollRestoration !== "undefined" ? options.scrollRestoration : true;
      options.cacheBust = typeof options.cacheBust === "undefined" ? true : options.cacheBust;
      options.debug = options.debug || false;
      options.timeout = options.timeout || 0;
      options.currentUrlFullReload = typeof options.currentUrlFullReload === "undefined" ? false : options.currentUrlFullReload;
      if (!options.switches.head) {
        options.switches.head = defaultSwitches.switchElementsAlt;
      }
      if (!options.switches.body) {
        options.switches.body = defaultSwitches.switchElementsAlt;
      }
      return options;
    };
    function defaultAnalytics() {
      if (window._gaq) {
        _gaq.push(["_trackPageview"]);
      }
      if (window.ga) {
        ga("send", "pageview", { page: location.pathname, title: document.title });
      }
    }
    var uniqueid = function () {
      var counter = 0;
      return function () {
        var id = "pjax" + (/* @__PURE__ */ new Date()).getTime() + "_" + counter;
        counter++;
        return id;
      };
    }();
    var forEachEls$1 = foreachEls;
    var trigger$2 = function (els, events2, opts) {
      events2 = typeof events2 === "string" ? events2.split(" ") : events2;
      events2.forEach(function (e) {
        var event;
        event = document.createEvent("HTMLEvents");
        event.initEvent(e, true, true);
        event.eventName = e;
        if (opts) {
          Object.keys(opts).forEach(function (key2) {
            event[key2] = opts[key2];
          });
        }
        forEachEls$1(els, function (el) {
          var domFix = false;
          if (!el.parentNode && el !== document && el !== window) {
            domFix = true;
            document.body.appendChild(el);
          }
          el.dispatchEvent(event);
          if (domFix) {
            el.parentNode.removeChild(el);
          }
        });
      });
    };
    var clone$3 = function (obj) {
      if (null === obj || "object" !== typeof obj) {
        return obj;
      }
      var copy = obj.constructor();
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) {
          copy[attr] = obj[attr];
        }
      }
      return copy;
    };
    var contains$1 = function contains2(doc, selectors, el) {
      for (var i = 0; i < selectors.length; i++) {
        var selectedEls = doc.querySelectorAll(selectors[i]);
        for (var j = 0; j < selectedEls.length; j++) {
          if (selectedEls[j].contains(el)) {
            return true;
          }
        }
      }
      return false;
    };
    var extend$5 = function (target) {
      if (target == null) {
        return null;
      }
      var to2 = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var source2 = arguments[i];
        if (source2 != null) {
          for (var key2 in source2) {
            if (Object.prototype.hasOwnProperty.call(source2, key2)) {
              to2[key2] = source2[key2];
            }
          }
        }
      }
      return to2;
    };
    var noop$2 = function () {
    };
    var log;
    var hasRequiredLog;
    function requireLog() {
      if (hasRequiredLog)
        return log;
      hasRequiredLog = 1;
      log = function () {
        if (this.options.debug && console) {
          if (typeof console.log === "function") {
            console.log.apply(console, arguments);
          } else if (console.log) {
            console.log(arguments);
          }
        }
      };
      return log;
    }
    var parseElement;
    var hasRequiredParseElement;

    function requireParseElement() {
      if (hasRequiredParseElement)
        return parseElement;
      hasRequiredParseElement = 1;
      var attrState = "data-pjax-state";
      parseElement = function (el) {
        switch (el.tagName.toLowerCase()) {
          case "a":
            if (!el.hasAttribute(attrState)) {
              // this.attachLink(el);
            }
            break;
          case "form":
            if (!el.hasAttribute(attrState)) {
              this.attachForm(el);
            }
            break;
          default:
            throw "Pjax can only be applied on <a> or <form> submit";
        }
      };
      return parseElement;
    }
    var attachLink;
    var hasRequiredAttachLink;
    function requireAttachLink() {
      if (hasRequiredAttachLink)
        return attachLink;
      hasRequiredAttachLink = 1;
      var on2 = on$3;
      var clone2 = clone$3;
      var attrState = "data-pjax-state";
      var linkAction = function (el, event) {
        if (isDefaultPrevented(event)) {
          return;
        }
        var options = clone2(this.options);
        var attrValue = checkIfShouldAbort(el, event);
        if (attrValue) {
          el.setAttribute(attrState, attrValue);
          return;
        }
        event.preventDefault();
        if (this.options.currentUrlFullReload && el.href === window.location.href.split("#")[0]) {
          el.setAttribute(attrState, "reload");
          this.reload();
          return;
        }
        el.setAttribute(attrState, "load");
        options.triggerElement = el;
        this.loadUrl(el.href, options);
      };
      function checkIfShouldAbort(el, event) {
        if (event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
          return "modifier";
        }
        if (el.protocol !== window.location.protocol || el.host !== window.location.host) {
          return "external";
        }
        if (el.hash && el.href.replace(el.hash, "") === window.location.href.replace(location.hash, "")) {
          return "anchor";
        }
        if (el.href === window.location.href.split("#")[0] + "#") {
          return "anchor-empty";
        }
      }
      var isDefaultPrevented = function (event) {
        return event.defaultPrevented || event.returnValue === false;
      };
      attachLink = function (el) {
        var that = this;
        el.setAttribute(attrState, "");
        on2(el, "click", function (event) {
          linkAction.call(that, el, event);
        });
        on2(
          el,
          "keyup",
          (function (event) {
            if (event.keyCode === 13) {
              linkAction.call(that, el, event);
            }
          }).bind(this)
        );
      };
      return attachLink;
    }
    var attachForm;
    var hasRequiredAttachForm;
    function requireAttachForm() {
      if (hasRequiredAttachForm)
        return attachForm;
      hasRequiredAttachForm = 1;
      var on2 = on$3;
      var clone2 = clone$3;
      var attrState = "data-pjax-state";
      var formAction = function (el, event) {
        if (isDefaultPrevented(event)) {
          return;
        }
        var options = clone2(this.options);
        options.requestOptions = {
          requestUrl: el.getAttribute("action") || window.location.href,
          requestMethod: el.getAttribute("method") || "GET"
        };
        var virtLinkElement = document.createElement("a");
        virtLinkElement.setAttribute("href", options.requestOptions.requestUrl);
        var attrValue = checkIfShouldAbort(virtLinkElement, options);
        if (attrValue) {
          el.setAttribute(attrState, attrValue);
          return;
        }
        event.preventDefault();
        if (el.enctype === "multipart/form-data") {
          options.requestOptions.formData = new FormData(el);
        } else {
          options.requestOptions.requestParams = parseFormElements(el);
        }
        el.setAttribute(attrState, "submit");
        options.triggerElement = el;
        this.loadUrl(virtLinkElement.href, options);
      };
      function parseFormElements(el) {
        var requestParams = [];
        var formElements = el.elements;
        for (var i = 0; i < formElements.length; i++) {
          var element = formElements[i];
          var tagName = element.tagName.toLowerCase();
          if (!!element.name && element.attributes !== void 0 && tagName !== "button") {
            var type = element.attributes.type;
            if (!type || type.value !== "checkbox" && type.value !== "radio" || element.checked) {
              var values = [];
              if (tagName === "select") {
                var opt;
                for (var j = 0; j < element.options.length; j++) {
                  opt = element.options[j];
                  if (opt.selected && !opt.disabled) {
                    values.push(opt.hasAttribute("value") ? opt.value : opt.text);
                  }
                }
              } else {
                values.push(element.value);
              }
              for (var k = 0; k < values.length; k++) {
                requestParams.push({
                  name: encodeURIComponent(element.name),
                  value: encodeURIComponent(values[k])
                });
              }
            }
          }
        }
        return requestParams;
      }
      function checkIfShouldAbort(virtLinkElement, options) {
        if (virtLinkElement.protocol !== window.location.protocol || virtLinkElement.host !== window.location.host) {
          return "external";
        }
        if (virtLinkElement.hash && virtLinkElement.href.replace(virtLinkElement.hash, "") === window.location.href.replace(location.hash, "")) {
          return "anchor";
        }
        if (virtLinkElement.href === window.location.href.split("#")[0] + "#") {
          return "anchor-empty";
        }
        if (options.currentUrlFullReload && virtLinkElement.href === window.location.href.split("#")[0]) {
          return "reload";
        }
      }
      var isDefaultPrevented = function (event) {
        return event.defaultPrevented || event.returnValue === false;
      };
      attachForm = function (el) {
        var that = this;
        el.setAttribute(attrState, "");
        on2(el, "submit", function (event) {
          formAction.call(that, el, event);
        });
      };
      return attachForm;
    }
    var foreachSelectors;
    var hasRequiredForeachSelectors;
    function requireForeachSelectors() {
      if (hasRequiredForeachSelectors)
        return foreachSelectors;
      hasRequiredForeachSelectors = 1;
      var forEachEls2 = foreachEls;
      foreachSelectors = function (selectors, cb, context, DOMcontext) {
        DOMcontext = DOMcontext || document;
        selectors.forEach(function (selector) {
          forEachEls2(DOMcontext.querySelectorAll(selector), cb, context);
        });
      };
      return foreachSelectors;
    }
    var switchesSelectors;
    var hasRequiredSwitchesSelectors;
    function requireSwitchesSelectors() {
      if (hasRequiredSwitchesSelectors)
        return switchesSelectors;
      hasRequiredSwitchesSelectors = 1;
      var forEachEls2 = foreachEls;
      var defaultSwitches2 = switches$1;
      switchesSelectors = function (switches2, switchesOptions, selectors, fromEl, toEl, options) {
        var switchesQueue = [];
        selectors.forEach(function (selector) {
          var newEls = fromEl.querySelectorAll(selector);
          var oldEls = toEl.querySelectorAll(selector);
          if (this.log) {
            this.log("Pjax switch", selector, newEls, oldEls);
          }
          if (newEls.length !== oldEls.length) {
            throw "DOM doesn’t look the same on new loaded page: ’" + selector + "’ - new " + newEls.length + ", old " + oldEls.length;
          }
          forEachEls2(
            newEls,
            function (newEl, i) {
              var oldEl = oldEls[i];
              if (this.log) {
                this.log("newEl", newEl, "oldEl", oldEl);
              }
              var callback = switches2[selector] ? switches2[selector].bind(
                this,
                oldEl,
                newEl,
                options,
                switchesOptions[selector]
              ) : defaultSwitches2.outerHTML.bind(this, oldEl, newEl, options);
              switchesQueue.push(callback);
            },
            this
          );
        }, this);
        this.state.numPendingSwitches = switchesQueue.length;
        switchesQueue.forEach(function (queuedSwitch) {
          queuedSwitch();
        });
      };
      return switchesSelectors;
    }
    var abortRequest;
    var hasRequiredAbortRequest;
    function requireAbortRequest() {
      if (hasRequiredAbortRequest)
        return abortRequest;
      hasRequiredAbortRequest = 1;
      var noop2 = noop$2;
      abortRequest = function (request) {
        if (request && request.readyState < 4) {
          request.onreadystatechange = noop2;
          request.abort();
        }
      };
      return abortRequest;
    }
    var updateQueryString;
    var hasRequiredUpdateQueryString;
    function requireUpdateQueryString() {
      if (hasRequiredUpdateQueryString)
        return updateQueryString;
      hasRequiredUpdateQueryString = 1;
      updateQueryString = function (uri, key2, value) {
        var re = new RegExp("([?&])" + key2 + "=.*?(&|$)", "i");
        var separator = uri.indexOf("?") !== -1 ? "&" : "?";
        if (uri.match(re)) {
          return uri.replace(re, "$1" + key2 + "=" + value + "$2");
        } else {
          return uri + separator + key2 + "=" + value;
        }
      };
      return updateQueryString;
    }
    var sendRequest;
    var hasRequiredSendRequest;
    function requireSendRequest() {
      if (hasRequiredSendRequest)
        return sendRequest;
      hasRequiredSendRequest = 1;
      var updateQueryString2 = requireUpdateQueryString();
      sendRequest = function (location2, options, callback) {
        options = options || {};
        var queryString;
        var requestOptions = options.requestOptions || {};
        var requestMethod = (requestOptions.requestMethod || "GET").toUpperCase();
        var requestParams = requestOptions.requestParams || null;
        var formData = requestOptions.formData || null;
        var requestPayload = null;
        var request = new XMLHttpRequest();
        var timeout = options.timeout || 0;
        request.onreadystatechange = function () {
          if (request.readyState === 4) {
            if (request.status === 200) {
              callback(request.responseText, request, location2, options);
            } else if (request.status !== 0) {
              callback(null, request, location2, options);
            }
          }
        };
        request.onerror = function (e) {
          console.log(e);
          callback(null, request, location2, options);
        };
        request.ontimeout = function () {
          callback(null, request, location2, options);
        };
        if (requestParams && requestParams.length) {
          queryString = requestParams.map(function (param) {
            return param.name + "=" + param.value;
          }).join("&");
          switch (requestMethod) {
            case "GET":
              location2 = location2.split("?")[0];
              location2 += "?" + queryString;
              break;
            case "POST":
              requestPayload = queryString;
              break;
          }
        } else if (formData) {
          requestPayload = formData;
        }
        if (options.cacheBust) {
          location2 = updateQueryString2(location2, "t", Date.now());
        }
        request.open(requestMethod, location2, true);
        request.timeout = timeout;
        request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        request.setRequestHeader("X-PJAX", "true");
        request.setRequestHeader(
          "X-PJAX-Selectors",
          JSON.stringify(options.selectors)
        );
        if (requestPayload && requestMethod === "POST" && !formData) {
          request.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
          );
        }
        request.send(requestPayload);
        return request;
      };
      return sendRequest;
    }
    var handleResponse;
    var hasRequiredHandleResponse;
    function requireHandleResponse() {
      if (hasRequiredHandleResponse)
        return handleResponse;
      hasRequiredHandleResponse = 1;
      var clone2 = clone$3;
      var newUid2 = uniqueid;
      var trigger2 = trigger$2;
      handleResponse = function (responseText, request, href, options) {
        options = clone2(options || this.options);
        options.request = request;
        if (responseText === false) {
          trigger2(document, "pjax:complete pjax:error", options);
          return;
        }
        var currentState = window.history.state || {};
        window.history.replaceState(
          {
            url: currentState.url || window.location.href,
            title: currentState.title || document.title,
            uid: currentState.uid || newUid2(),
            scrollPos: [
              document.documentElement.scrollLeft || document.body.scrollLeft,
              document.documentElement.scrollTop || document.body.scrollTop
            ]
          },
          document.title,
          window.location.href
        );
        var oldHref = href;
        if (request.responseURL) {
          if (href !== request.responseURL) {
            href = request.responseURL;
          }
        } else if (request.getResponseHeader("X-PJAX-URL")) {
          href = request.getResponseHeader("X-PJAX-URL");
        } else if (request.getResponseHeader("X-XHR-Redirected-To")) {
          href = request.getResponseHeader("X-XHR-Redirected-To");
        }
        var a = document.createElement("a");
        a.href = oldHref;
        var oldHash = a.hash;
        a.href = href;
        if (oldHash && !a.hash) {
          a.hash = oldHash;
          href = a.href;
        }
        this.state.href = href;
        this.state.options = options;
        try {
          this.loadContent(responseText, options);
        } catch (e) {
          trigger2(document, "pjax:error", options);
          if (!this.options.debug) {
            if (console && console.error) {
              console.error("Pjax switch fail: ", e);
            }
            return this.latestChance(href);
          } else {
            throw e;
          }
        }
      };
      return handleResponse;
    }
    var isSupported;
    var hasRequiredIsSupported;
    function requireIsSupported() {
      if (hasRequiredIsSupported)
        return isSupported;
      hasRequiredIsSupported = 1;
      isSupported = function () {
        return false
        // return window.history && window.history.pushState && window.history.replaceState && // pushState isn’t reliable on iOS until 5.
        // !navigator.userAgent.match(
        //   /((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/
        // );
      };
      return isSupported;
    }
    var executeScripts = executeScripts$1;
    var forEachEls = foreachEls;
    var parseOptions = parseOptions$1;
    var switches = switches$1;
    var newUid = uniqueid;
    var on$1 = on$3;
    var trigger$1 = trigger$2;
    var clone$2 = clone$3;
    var contains = contains$1;
    var extend$4 = extend$5;
    var noop$1 = noop$2;
    var Pjax = function (options) {
      this.state = {
        numPendingSwitches: 0,
        href: null,
        options: null
      };
      this.options = parseOptions(options);
      this.log("Pjax options", this.options);
      if (this.options.scrollRestoration && "scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
      this.maxUid = this.lastUid = newUid();
      this.parseDOM(document);
      on$1(
        window,
        "popstate",
        (function (st) {
          if (st.state) {
            var opt = clone$2(this.options);
            opt.url = st.state.url;
            opt.title = st.state.title;
            opt.history = false;
            opt.scrollPos = st.state.scrollPos;
            if (st.state.uid < this.lastUid) {
              opt.backward = true;
            } else {
              opt.forward = true;
            }
            this.lastUid = st.state.uid;
            this.loadUrl(st.state.url, opt);
          }
        }).bind(this)
      );
    };
    Pjax.switches = switches;
    Pjax.prototype = {
      log: requireLog(),
      getElements: function (el) {
        return el.querySelectorAll(this.options.elements);
      },
      parseDOM: function (el) {
        var parseElement2 = requireParseElement();
        forEachEls(this.getElements(el), parseElement2, this);
      },
      refresh: function (el) {
        this.parseDOM(el || document);
      },
      reload: function () {
        // window.location.reload();
      },
      attachLink: requireAttachLink(),
      attachForm: requireAttachForm(),
      forEachSelectors: function (cb, context, DOMcontext) {
        return requireForeachSelectors().bind(this)(
          this.options.selectors,
          cb,
          context,
          DOMcontext
        );
      },
      switchSelectors: function (selectors, fromEl, toEl, options) {
        return requireSwitchesSelectors().bind(this)(
          this.options.switches,
          this.options.switchesOptions,
          selectors,
          fromEl,
          toEl,
          options
        );
      },
      latestChance: function (href) {
        window.location = href;
      },
      onSwitch: function () {
        trigger$1(window, "resize scroll");
        this.state.numPendingSwitches--;
        if (this.state.numPendingSwitches === 0) {
          this.afterAllSwitches();
        }
      },
      loadContent: function (html, options) {
        if (typeof html !== "string") {
          trigger$1(document, "pjax:complete pjax:error", options);
          return;
        }
        var tmpEl = document.implementation.createHTMLDocument("pjax");
        var htmlRegex = /<html[^>]+>/gi;
        var htmlAttribsRegex = /\s?[a-z:]+(?:=['"][^'">]+['"])*/gi;
        var matches2 = html.match(htmlRegex);
        if (matches2 && matches2.length) {
          matches2 = matches2[0].match(htmlAttribsRegex);
          if (matches2.length) {
            matches2.shift();
            matches2.forEach(function (htmlAttrib) {
              var attr = htmlAttrib.trim().split("=");
              if (attr.length === 1) {
                tmpEl.documentElement.setAttribute(attr[0], true);
              } else {
                tmpEl.documentElement.setAttribute(attr[0], attr[1].slice(1, -1));
              }
            });
          }
        }
        tmpEl.documentElement.innerHTML = html;
        this.log(
          "load content",
          tmpEl.documentElement.attributes,
          tmpEl.documentElement.innerHTML.length
        );
        if (document.activeElement && contains(document, this.options.selectors, document.activeElement)) {
          try {
            document.activeElement.blur();
          } catch (e) {
          }
        }
        this.switchSelectors(this.options.selectors, tmpEl, document, options);
      },
      abortRequest: requireAbortRequest(),
      doRequest: requireSendRequest(),
      handleResponse: requireHandleResponse(),
      loadUrl: function (href, options) {
        options = typeof options === "object" ? extend$4({}, this.options, options) : clone$2(this.options);
        this.log("load href", href, options);
        this.abortRequest(this.request);
        trigger$1(document, "pjax:send", options);
        this.request = this.doRequest(
          href,
          options,
          this.handleResponse.bind(this)
        );
      },
      afterAllSwitches: function () {
        var autofocusEl = Array.prototype.slice.call(document.querySelectorAll("[autofocus]")).pop();
        if (autofocusEl && document.activeElement !== autofocusEl) {
          autofocusEl.focus();
        }
        this.options.selectors.forEach(function (selector) {
          forEachEls(document.querySelectorAll(selector), function (el) {
            executeScripts(el);
          });
        });
        var state = this.state;
        if (state.options.history) {
          if (!window.history.state) {
            this.lastUid = this.maxUid = newUid();
            window.history.replaceState(
              {
                url: window.location.href,
                title: document.title,
                uid: this.maxUid,
                scrollPos: [0, 0]
              },
              document.title
            );
          }
          this.lastUid = this.maxUid = newUid();
          window.history.pushState(
            {
              url: state.href,
              title: state.options.title,
              uid: this.maxUid,
              scrollPos: [0, 0]
            },
            state.options.title,
            state.href
          );
        }
        this.forEachSelectors(function (el) {
          this.parseDOM(el);
        }, this);
        trigger$1(document, "pjax:complete pjax:success", state.options);
        if (typeof state.options.analytics === "function") {
          state.options.analytics();
        }
        if (state.options.history) {
          var a = document.createElement("a");
          a.href = this.state.href;
          if (a.hash) {
            var name = a.hash.slice(1);
            name = decodeURIComponent(name);
            var curtop = 0;
            var target = document.getElementById(name) || document.getElementsByName(name)[0];
            if (target) {
              if (target.offsetParent) {
                do {
                  curtop += target.offsetTop;
                  target = target.offsetParent;
                } while (target);
              }
            }
            window.scrollTo(0, curtop);
          } else if (state.options.scrollTo !== false) {
            if (state.options.scrollTo.length > 1) {
              window.scrollTo(state.options.scrollTo[0], state.options.scrollTo[1]);
            } else {
              window.scrollTo(0, state.options.scrollTo);
            }
          }
        } else if (state.options.scrollRestoration && state.options.scrollPos) {
          window.scrollTo(state.options.scrollPos[0], state.options.scrollPos[1]);
        }
        this.state = {
          numPendingSwitches: 0,
          href: null,
          options: null
        };
      }
    };
    Pjax.isSupported = requireIsSupported();
    if (Pjax.isSupported()) {
      pjax.exports = Pjax;
    } else {
      var stupidPjax = noop$1;
      for (var key in Pjax.prototype) {
        if (Pjax.prototype.hasOwnProperty(key) && typeof Pjax.prototype[key] === "function") {
          stupidPjax[key] = noop$1;
        }
      }
      pjax.exports = stupidPjax;
    }
    var pjaxExports = pjax.exports;
    const Pjax$1 = /* @__PURE__ */ getDefaultExportFromCjs(pjaxExports);
    let _currentPageId = "";
    let _nextPageId = "";
    class geral {
      /* -------------------------------------------------------------------------- */
      /*                                 CONSTRUCTOR                                */
      /* -------------------------------------------------------------------------- */
      constructor() {
        this.currentPageId = document.querySelector(".wrapper").id;
      }
      /* -------------------------------------------------------------------------- */
      /*                               IDs das páginas                              */
      /* -------------------------------------------------------------------------- */
      get currentPageId() {
        return _currentPageId;
      }
      set currentPageId(newId) {
        _currentPageId = newId.substring(3);
        document.body.dataset.pg = newId;
        this.nextPageId = "";
      }
      get nextPageId() {
        return _nextPageId;
      }
      set nextPageId(newId) {
        _nextPageId = newId.substring(3);
        document.body.dataset.pgNext = newId.length > 0 ? "pg-" + _nextPageId : "";
      }
      /* -------------------------------------------------------------------------- */
      /*                                    TOKEN                                   */
      /* -------------------------------------------------------------------------- */
      get token() {
        return document.querySelector('meta[name="csrf-token"]').content;
      }
    }
    const geral$1 = new geral();
    function manualModalClose() {
      document.querySelectorAll("modal-group.active", "modal-item.active").forEach((element) => {
        document.dispatchEvent(new CustomEvent("modal:close"));
        document.removeEventListener("keydown", this);
        document.body.dataset.modalState = "leave";
        element.classList.remove("active");
        element.classList.add("leave");
        setTimeout(() => {
          element.classList.remove("leave");
          delete document.body.dataset.modalState;
          delete document.body.dataset.modal;
          delete document.body.dataset.modalItem;
        }, 800);
      });
    }
    Pjax$1.prototype.getElements = function () {
      let links = Array.from(document.querySelectorAll("a:not(.no-pjax):not([data-fancybox])"));
      links = links.filter((el) => el.href.includes(location.hostname));
      links.forEach((element) => {
        element.addEventListener("click", function () {
          manualModalClose();
          document.body.dataset.pgPrev = document.body.dataset.pg;
          if (element.dataset.pgActive)
            document.body.dataset.pgNext = element.dataset.pgActive;
        });
      });
      let dataUrl = Array.from(document.querySelectorAll("[data-url]"));
      dataUrl.forEach((el) => el.onclick = () => {
        singlePjaxInstance.loadUrl(el.dataset.url);
      });
      function serializeFormData(form) {
        const formData = new URLSearchParams(new FormData(form)).toString();
        return formData;
      }
      function clearQueryParams(url) {
        return url.split("?")[0];
      }
      function handleSelectChange(event) {
        const serializedData = serializeFormData(event.target.form);
        const baseActionUrl = clearQueryParams(event.target.form.action);
        const fullUrl = serializedData ? `${baseActionUrl}?${serializedData}` : baseActionUrl;
        document.body.dataset.pgPrev = document.body.dataset.pg;
        if (event.target.form.dataset.pgActive)
          document.body.dataset.pgNext = event.target.form.dataset.pgActive;
        singlePjaxInstance.loadUrl(fullUrl);
      }
      let forms = Array.from(document.querySelectorAll("form[data-pjax]"));
      forms.forEach((form) => {
        if (form.dataset.eventsAttached) {
          return;
        }
        let selects = form.querySelectorAll("select.submit-on-change");
        selects.forEach((select) => {
          select.addEventListener("change", handleSelectChange);
        });
        form.addEventListener("submit", function (event) {
          event.preventDefault();
          document.body.dataset.pgPrev = document.body.dataset.pg;
          if (form.dataset.pgActive)
            document.body.dataset.pgNext = form.dataset.pgActive;
          if (form.method.toUpperCase() === "GET") {
            const serializedData = serializeFormData(form);
            const baseActionUrl = clearQueryParams(form.action);
            const fullUrl = serializedData ? `${baseActionUrl}?${serializedData}` : baseActionUrl;
            singlePjaxInstance.loadUrl(fullUrl);
          }
        });
        form.dataset.eventsAttached = "true";
      });
      return links;
    };
    const delay = window.innerWidth < 1025 ? 800 : 800;
    const singlePjaxInstance = new Pjax$1({
      elements: "a[href]",
      cacheBust: false,
      debug: false,
      selectors: [
        "title",
        "#scripts",
        ".wrapper"
        // ,".language--list"
      ],
      maxCacheLength: 20,
      timeout: 0,
      scrollTo: 0,
      switches: {
        "title": function (oldEl, newEl, options) {
          setTimeout(() => {
            document.title = newEl.textContent;
            this.onSwitch();
          }, delay);
        },
        "#scripts": function (oldEl, newEl, options) {
          setTimeout(() => {
            oldEl.innerHTML = newEl.innerHTML;
            this.onSwitch();
          }, delay);
        },
        ".wrapper": function (oldEl, newEl, options) {
          geral$1.nextPageId = newEl.id;
          setTimeout(() => {
            document.dispatchEvent(new CustomEvent("pjax:switch"));
          }, delay - 10);
          setTimeout(() => {
            oldEl.outerHTML = newEl.outerHTML;
            geral$1.currentPageId = newEl.id;
            this.onSwitch();
          }, delay);
        }
        // ".language--list": function (oldEl, newEl, options) {
        //     setTimeout(() => {
        //         oldEl.innerHTML = newEl.innerHTML;
        //         this.onSwitch();
        //     }, delay);
        // },
      }
    });
    (function () {
      const AddActive = function (options) {
        const addactive = active.bind(this);
        addactive(true, options);
      };
      const RemoveActive = function (options) {
        const removeactive = active.bind(this);
        removeactive(false, options);
      };
      const active = function (active2 = true, options) {
        const {
          delay: delay2 = -1,
          leave = true,
          leaveDelay = 600
        } = options ? options : {};
        if (active2) {
          this.futureActiveState = true;
          if (delay2 < 0) {
            this.classList.remove("leave");
            this.classList.add("active");
          } else {
            setTimeout(() => {
              if (this.futureActiveState) {
                this.classList.remove("leave");
                this.classList.add("active");
              }
            }, delay2);
          }
        } else {
          this.futureActiveState = false;
          let remove = removeActive.bind(this);
          if (delay2 < 0) {
            remove();
          } else {
            setTimeout(() => {
              if (this.futureActiveState === false) {
                remove();
              }
            }, delay2);
          }
        }
        function removeActive() {
          if (this.classList.contains("active")) {
            this.classList.remove("active");
            if (leave) {
              this.classList.add("leave");
              setTimeout(() => {
                this.classList.remove("leave");
              }, leaveDelay);
            }
          }
        }
      };
      HTMLElement.prototype.addActive = AddActive;
      HTMLElement.prototype.removeActive = RemoveActive;
    })();
    function cursor(options) {
      const {
        disabledState = "",
        clickDiv = false,
        baseElement = document.getElementById("wrapper-cursor"),
        cursorElement = baseElement,
        defaultCursor = "default"
      } = options ? options : {};
      let y = 0;
      let x = 0;
      let waitingRecalc = false;
      let elementsStack = [];
      let cursorData = defaultCursor;
      let cursorTitle = "";
      let cursorInWindow = true;
      let lastFrame = performance.now();
      let elementsDefault = [];
      document.addEventListener("mousemove", mouseMove, { passive: true });
      document.addEventListener("click", click, { passive: true });
      document.addEventListener("mouseout", mouseOut, { passive: true });
      document.addEventListener("scroll", scroll, { passive: true });
      function mouseOut(e) {
        if (e.toElement === null) {
          cursorInWindow = false;
        }
      }
      function scroll() {
        if (waitingRecalc === false) {
          waitingRecalc = true;
          setTimeout(recalcStack, 100);
        }
      }
      function click() {
        baseElement.dataset.clicked = true;
        setTimeout(() => {
          baseElement.dataset.clicked = false;
        }, 350);
        recalcStack();
        if (clickDiv) {
          let node = document.createElement("div");
          node.dataset.cursor = cursorData != "" ? `${cursorData}-click` : "click";
          node.style.top = y + "px";
          node.style.left = x + "px";
          node.style.position = "fixed";
          document.body.appendChild(node);
          setTimeout(document.body.removeChild, 1e3, node);
        }
      }
      function mouseMove(e) {
        x = e.clientX;
        y = e.clientY;
        cursorInWindow = true;
        if (waitingRecalc === false) {
          waitingRecalc = true;
          setTimeout(recalcStack, 100);
        }
        if (performance.now() - lastFrame > 10) {
          window.requestAnimationFrame(function (animationStart) {
            cursorElement.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
            lastFrame = animationStart;
          });
        }
      }
      function recalcStack() {
        elementsStack = document.elementsFromPoint(x, y);
        let hasMouseClass = false;
        let hasDefaultClass = false;
        let hasMouseTitle = false;
        elementsStack.slice().reverse().forEach((e) => {
          if (e.nodeName === "IFRAME") {
            cursorInWindow = false;
          }
          if ("cursorTitle" in e.dataset) {
            cursorTitle = e.dataset.cursorTitle;
            hasMouseTitle = true;
          }
          if ("cursorStyle" in e.dataset) {
            cursorData = e.dataset.cursorStyle;
            hasMouseClass = true;
          }
          if (hasMouseClass == false && elementsDefault.length > 0) {
            let thisDefault = elementsDefault.find((d) => d.e === e.nodeName.toLowerCase());
            if (thisDefault != void 0) {
              cursorData = thisDefault.r;
              hasDefaultClass = true;
            }
          }
        });
        if (hasMouseTitle === false) {
          cursorTitle = "";
        }
        if (hasMouseClass === false && hasDefaultClass === false) {
          cursorData = defaultCursor;
        }
        waitingRecalc = false;
        baseElement.dataset.cursorTitle = cursorInWindow ? cursorTitle : "";
        baseElement.dataset.cursor = cursorInWindow ? cursorData : disabledState;
      }
      function AddDefault(element, rule) {
        elementsDefault.push({ e: element, r: rule });
      }
      return {
        AddDefault
      };
    }
    class Page {
      /**
       * Objeto definindo uma página
       * @param {object} params
       * @param {string} params.pageName Nome da página sem o "pg"
       * @param {function} params.init Primeira função a ser chamada, no primeiro carregamento é no "readyState interactive" no pjax, "success"
       * @param {function} params.main Principal função, chamada no primeiro carregamento no "readyState complete"
       * @param {function} params.destroy Chamada 
       */
      constructor({ pageName: pageName2, main: main2, init, destroy }) {
        this.pageName = pageName2;
        this.init = init ? init : empty;
        this.main = main2;
        this.destroy = destroy ? destroy : empty;
        this.transitionDelayDesktop = 600;
        this.transitionDelayMobile = 300;
        function empty() {
          return true;
        }
      }
    }
    class PageController {
      constructor() {
        this.pages = [];
        this.currentPage = {};
        this.lastPage = {};
        this.firstPage = true;
        document.addEventListener("pjax:send", this);
        document.addEventListener("pjax:complete", this);
        document.addEventListener("pjax:error", this);
      }
      /**
       * @param {Event} ev 
       */
      handleEvent(ev) {
        switch (ev.type) {
          case "pjax:send":
            if (this.currentPage) {
              this.currentPage.destroy();
            }
            break;
          case "pjax:complete":
            this.firstPage = false;
            if (this.updateCurrent()) {
              this.runCurrent();
            }
            break;
          case "pjax:error":
            const problematicUrl = ev.triggerElement.href;
            location.assign(problematicUrl);
            break;
        }
      }
      updateCurrent() {
        const pg = this.pages.find((e) => e.pageName.includes(geral$1.currentPageId));
        if (!pg) {
          console.warn(`js da página ${geral$1.currentPageId} não encontrado`);
          this.currentPage = null;
          return false;
        }
        if (this.firstPage) {
          this.currentPage = pg;
          return true;
        } else {
          this.lastPage = this.currentPage;
          this.currentPage = pg;
          return true;
        }
      }
      runCurrent() {
        const pg = this.currentPage;
        try {
          pg.init();
        } catch (error) {
          console.error(`Erro no init da página ${pg.pageName}: ${error}`);
        }
        try {
          pg.main();
        } catch (error) {
          console.error(`Erro no main da página ${pg.pageName}: ${error}`);
        }
      }
      add(page) {
        this.pages.push(page);
      }
    }
    function isObject$4(obj) {
      return obj !== null && typeof obj === "object" && "constructor" in obj && obj.constructor === Object;
    }
    function extend$3(target = {}, src = {}) {
      Object.keys(src).forEach((key2) => {
        if (typeof target[key2] === "undefined")
          target[key2] = src[key2];
        else if (isObject$4(src[key2]) && isObject$4(target[key2]) && Object.keys(src[key2]).length > 0) {
          extend$3(target[key2], src[key2]);
        }
      });
    }
    const ssrDocument = {
      body: {},
      addEventListener() {
      },
      removeEventListener() {
      },
      activeElement: {
        blur() {
        },
        nodeName: ""
      },
      querySelector() {
        return null;
      },
      querySelectorAll() {
        return [];
      },
      getElementById() {
        return null;
      },
      createEvent() {
        return {
          initEvent() {
          }
        };
      },
      createElement() {
        return {
          children: [],
          childNodes: [],
          style: {},
          setAttribute() {
          },
          getElementsByTagName() {
            return [];
          }
        };
      },
      createElementNS() {
        return {};
      },
      importNode() {
        return null;
      },
      location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: ""
      }
    };
    function getDocument() {
      const doc = typeof document !== "undefined" ? document : {};
      extend$3(doc, ssrDocument);
      return doc;
    }
    const ssrWindow = {
      document: ssrDocument,
      navigator: {
        userAgent: ""
      },
      location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: ""
      },
      history: {
        replaceState() {
        },
        pushState() {
        },
        go() {
        },
        back() {
        }
      },
      CustomEvent: function CustomEvent2() {
        return this;
      },
      addEventListener() {
      },
      removeEventListener() {
      },
      getComputedStyle() {
        return {
          getPropertyValue() {
            return "";
          }
        };
      },
      Image() {
      },
      Date() {
      },
      screen: {},
      setTimeout() {
      },
      clearTimeout() {
      },
      matchMedia() {
        return {};
      },
      requestAnimationFrame(callback) {
        if (typeof setTimeout === "undefined") {
          callback();
          return null;
        }
        return setTimeout(callback, 0);
      },
      cancelAnimationFrame(id) {
        if (typeof setTimeout === "undefined") {
          return;
        }
        clearTimeout(id);
      }
    };
    function getWindow() {
      const win = typeof window !== "undefined" ? window : {};
      extend$3(win, ssrWindow);
      return win;
    }
    function deleteProps(obj) {
      const object = obj;
      Object.keys(object).forEach((key2) => {
        try {
          object[key2] = null;
        } catch (e) {
        }
        try {
          delete object[key2];
        } catch (e) {
        }
      });
    }
    function nextTick(callback, delay2 = 0) {
      return setTimeout(callback, delay2);
    }
    function now$1() {
      return Date.now();
    }
    function getComputedStyle$1(el) {
      const window2 = getWindow();
      let style;
      if (window2.getComputedStyle) {
        style = window2.getComputedStyle(el, null);
      }
      if (!style && el.currentStyle) {
        style = el.currentStyle;
      }
      if (!style) {
        style = el.style;
      }
      return style;
    }
    function getTranslate(el, axis = "x") {
      const window2 = getWindow();
      let matrix;
      let curTransform;
      let transformMatrix;
      const curStyle = getComputedStyle$1(el);
      if (window2.WebKitCSSMatrix) {
        curTransform = curStyle.transform || curStyle.webkitTransform;
        if (curTransform.split(",").length > 6) {
          curTransform = curTransform.split(", ").map((a) => a.replace(",", ".")).join(", ");
        }
        transformMatrix = new window2.WebKitCSSMatrix(curTransform === "none" ? "" : curTransform);
      } else {
        transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
        matrix = transformMatrix.toString().split(",");
      }
      if (axis === "x") {
        if (window2.WebKitCSSMatrix)
          curTransform = transformMatrix.m41;
        else if (matrix.length === 16)
          curTransform = parseFloat(matrix[12]);
        else
          curTransform = parseFloat(matrix[4]);
      }
      if (axis === "y") {
        if (window2.WebKitCSSMatrix)
          curTransform = transformMatrix.m42;
        else if (matrix.length === 16)
          curTransform = parseFloat(matrix[13]);
        else
          curTransform = parseFloat(matrix[5]);
      }
      return curTransform || 0;
    }
    function isObject$3(o) {
      return typeof o === "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object";
    }
    function isNode(node) {
      if (typeof window !== "undefined" && typeof window.HTMLElement !== "undefined") {
        return node instanceof HTMLElement;
      }
      return node && (node.nodeType === 1 || node.nodeType === 11);
    }
    function extend$2(...args) {
      const to2 = Object(args[0]);
      const noExtend = ["__proto__", "constructor", "prototype"];
      for (let i = 1; i < args.length; i += 1) {
        const nextSource = args[i];
        if (nextSource !== void 0 && nextSource !== null && !isNode(nextSource)) {
          const keysArray = Object.keys(Object(nextSource)).filter((key2) => noExtend.indexOf(key2) < 0);
          for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
            const nextKey = keysArray[nextIndex];
            const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
            if (desc !== void 0 && desc.enumerable) {
              if (isObject$3(to2[nextKey]) && isObject$3(nextSource[nextKey])) {
                if (nextSource[nextKey].__swiper__) {
                  to2[nextKey] = nextSource[nextKey];
                } else {
                  extend$2(to2[nextKey], nextSource[nextKey]);
                }
              } else if (!isObject$3(to2[nextKey]) && isObject$3(nextSource[nextKey])) {
                to2[nextKey] = {};
                if (nextSource[nextKey].__swiper__) {
                  to2[nextKey] = nextSource[nextKey];
                } else {
                  extend$2(to2[nextKey], nextSource[nextKey]);
                }
              } else {
                to2[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
      }
      return to2;
    }
    function setCSSProperty(el, varName, varValue) {
      el.style.setProperty(varName, varValue);
    }
    function animateCSSModeScroll({
      swiper,
      targetPosition,
      side
    }) {
      const window2 = getWindow();
      const startPosition = -swiper.translate;
      let startTime = null;
      let time;
      const duration = swiper.params.speed;
      swiper.wrapperEl.style.scrollSnapType = "none";
      window2.cancelAnimationFrame(swiper.cssModeFrameID);
      const dir = targetPosition > startPosition ? "next" : "prev";
      const isOutOfBound = (current, target) => {
        return dir === "next" && current >= target || dir === "prev" && current <= target;
      };
      const animate = () => {
        time = (/* @__PURE__ */ new Date()).getTime();
        if (startTime === null) {
          startTime = time;
        }
        const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
        const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
        let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
        if (isOutOfBound(currentPosition, targetPosition)) {
          currentPosition = targetPosition;
        }
        swiper.wrapperEl.scrollTo({
          [side]: currentPosition
        });
        if (isOutOfBound(currentPosition, targetPosition)) {
          swiper.wrapperEl.style.overflow = "hidden";
          swiper.wrapperEl.style.scrollSnapType = "";
          setTimeout(() => {
            swiper.wrapperEl.style.overflow = "";
            swiper.wrapperEl.scrollTo({
              [side]: currentPosition
            });
          });
          window2.cancelAnimationFrame(swiper.cssModeFrameID);
          return;
        }
        swiper.cssModeFrameID = window2.requestAnimationFrame(animate);
      };
      animate();
    }
    function getSlideTransformEl(slideEl) {
      return slideEl.querySelector(".swiper-slide-transform") || slideEl.shadowEl && slideEl.shadowEl.querySelector(".swiper-slide-transform") || slideEl;
    }
    function elementChildren(element, selector = "") {
      return [...element.children].filter((el) => el.matches(selector));
    }
    function createElement$1(tag, classes2 = []) {
      const el = document.createElement(tag);
      el.classList.add(...Array.isArray(classes2) ? classes2 : [classes2]);
      return el;
    }
    function elementPrevAll(el, selector) {
      const prevEls = [];
      while (el.previousElementSibling) {
        const prev = el.previousElementSibling;
        if (selector) {
          if (prev.matches(selector))
            prevEls.push(prev);
        } else
          prevEls.push(prev);
        el = prev;
      }
      return prevEls;
    }
    function elementNextAll(el, selector) {
      const nextEls = [];
      while (el.nextElementSibling) {
        const next = el.nextElementSibling;
        if (selector) {
          if (next.matches(selector))
            nextEls.push(next);
        } else
          nextEls.push(next);
        el = next;
      }
      return nextEls;
    }
    function elementStyle(el, prop) {
      const window2 = getWindow();
      return window2.getComputedStyle(el, null).getPropertyValue(prop);
    }
    function elementIndex(el) {
      let child = el;
      let i;
      if (child) {
        i = 0;
        while ((child = child.previousSibling) !== null) {
          if (child.nodeType === 1)
            i += 1;
        }
        return i;
      }
      return void 0;
    }
    function elementParents(el, selector) {
      const parents = [];
      let parent = el.parentElement;
      while (parent) {
        if (selector) {
          if (parent.matches(selector))
            parents.push(parent);
        } else {
          parents.push(parent);
        }
        parent = parent.parentElement;
      }
      return parents;
    }
    function elementTransitionEnd(el, callback) {
      function fireCallBack(e) {
        if (e.target !== el)
          return;
        callback.call(el, e);
        el.removeEventListener("transitionend", fireCallBack);
      }
      if (callback) {
        el.addEventListener("transitionend", fireCallBack);
      }
    }
    function elementOuterSize(el, size, includeMargins) {
      const window2 = getWindow();
      if (includeMargins) {
        return el[size === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(window2.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-right" : "margin-top")) + parseFloat(window2.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-left" : "margin-bottom"));
      }
      return el.offsetWidth;
    }
    let support$1;
    function calcSupport() {
      const window2 = getWindow();
      const document2 = getDocument();
      return {
        smoothScroll: document2.documentElement && document2.documentElement.style && "scrollBehavior" in document2.documentElement.style,
        touch: !!("ontouchstart" in window2 || window2.DocumentTouch && document2 instanceof window2.DocumentTouch)
      };
    }
    function getSupport() {
      if (!support$1) {
        support$1 = calcSupport();
      }
      return support$1;
    }
    let deviceCached;
    function calcDevice({
      userAgent
    } = {}) {
      const support2 = getSupport();
      const window2 = getWindow();
      const platform = window2.navigator.platform;
      const ua = userAgent || window2.navigator.userAgent;
      const device = {
        ios: false,
        android: false
      };
      const screenWidth = window2.screen.width;
      const screenHeight = window2.screen.height;
      const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
      let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
      const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
      const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
      const windows = platform === "Win32";
      let macos = platform === "MacIntel";
      const iPadScreens = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
      if (!ipad && macos && support2.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
        ipad = ua.match(/(Version)\/([\d.]+)/);
        if (!ipad)
          ipad = [0, 1, "13_0_0"];
        macos = false;
      }
      if (android && !windows) {
        device.os = "android";
        device.android = true;
      }
      if (ipad || iphone || ipod) {
        device.os = "ios";
        device.ios = true;
      }
      return device;
    }
    function getDevice(overrides = {}) {
      if (!deviceCached) {
        deviceCached = calcDevice(overrides);
      }
      return deviceCached;
    }
    let browser$1;
    function calcBrowser() {
      const window2 = getWindow();
      let needPerspectiveFix = false;
      function isSafari() {
        const ua = window2.navigator.userAgent.toLowerCase();
        return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
      }
      if (isSafari()) {
        const ua = String(window2.navigator.userAgent);
        if (ua.includes("Version/")) {
          const [major, minor] = ua.split("Version/")[1].split(" ")[0].split(".").map((num) => Number(num));
          needPerspectiveFix = major < 16 || major === 16 && minor < 2;
        }
      }
      return {
        isSafari: needPerspectiveFix || isSafari(),
        needPerspectiveFix,
        isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window2.navigator.userAgent)
      };
    }
    function getBrowser() {
      if (!browser$1) {
        browser$1 = calcBrowser();
      }
      return browser$1;
    }
    function Resize({
      swiper,
      on: on2,
      emit
    }) {
      const window2 = getWindow();
      let observer2 = null;
      let animationFrame = null;
      const resizeHandler = () => {
        if (!swiper || swiper.destroyed || !swiper.initialized)
          return;
        emit("beforeResize");
        emit("resize");
      };
      const createObserver = () => {
        if (!swiper || swiper.destroyed || !swiper.initialized)
          return;
        observer2 = new ResizeObserver((entries) => {
          animationFrame = window2.requestAnimationFrame(() => {
            const {
              width,
              height
            } = swiper;
            let newWidth = width;
            let newHeight = height;
            entries.forEach(({
              contentBoxSize,
              contentRect,
              target
            }) => {
              if (target && target !== swiper.el)
                return;
              newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
              newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
            });
            if (newWidth !== width || newHeight !== height) {
              resizeHandler();
            }
          });
        });
        observer2.observe(swiper.el);
      };
      const removeObserver = () => {
        if (animationFrame) {
          window2.cancelAnimationFrame(animationFrame);
        }
        if (observer2 && observer2.unobserve && swiper.el) {
          observer2.unobserve(swiper.el);
          observer2 = null;
        }
      };
      const orientationChangeHandler = () => {
        if (!swiper || swiper.destroyed || !swiper.initialized)
          return;
        emit("orientationchange");
      };
      on2("init", () => {
        if (swiper.params.resizeObserver && typeof window2.ResizeObserver !== "undefined") {
          createObserver();
          return;
        }
        window2.addEventListener("resize", resizeHandler);
        window2.addEventListener("orientationchange", orientationChangeHandler);
      });
      on2("destroy", () => {
        removeObserver();
        window2.removeEventListener("resize", resizeHandler);
        window2.removeEventListener("orientationchange", orientationChangeHandler);
      });
    }
    function Observer({
      swiper,
      extendParams,
      on: on2,
      emit
    }) {
      const observers2 = [];
      const window2 = getWindow();
      const attach = (target, options = {}) => {
        const ObserverFunc = window2.MutationObserver || window2.WebkitMutationObserver;
        const observer2 = new ObserverFunc((mutations) => {
          if (swiper.__preventObserver__)
            return;
          if (mutations.length === 1) {
            emit("observerUpdate", mutations[0]);
            return;
          }
          const observerUpdate = function observerUpdate2() {
            emit("observerUpdate", mutations[0]);
          };
          if (window2.requestAnimationFrame) {
            window2.requestAnimationFrame(observerUpdate);
          } else {
            window2.setTimeout(observerUpdate, 0);
          }
        });
        observer2.observe(target, {
          attributes: typeof options.attributes === "undefined" ? true : options.attributes,
          childList: typeof options.childList === "undefined" ? true : options.childList,
          characterData: typeof options.characterData === "undefined" ? true : options.characterData
        });
        observers2.push(observer2);
      };
      const init = () => {
        if (!swiper.params.observer)
          return;
        if (swiper.params.observeParents) {
          const containerParents = elementParents(swiper.el);
          for (let i = 0; i < containerParents.length; i += 1) {
            attach(containerParents[i]);
          }
        }
        attach(swiper.el, {
          childList: swiper.params.observeSlideChildren
        });
        attach(swiper.wrapperEl, {
          attributes: false
        });
      };
      const destroy = () => {
        observers2.forEach((observer2) => {
          observer2.disconnect();
        });
        observers2.splice(0, observers2.length);
      };
      extendParams({
        observer: false,
        observeParents: false,
        observeSlideChildren: false
      });
      on2("init", init);
      on2("destroy", destroy);
    }
    const eventsEmitter = {
      on(events2, handler, priority) {
        const self2 = this;
        if (!self2.eventsListeners || self2.destroyed)
          return self2;
        if (typeof handler !== "function")
          return self2;
        const method = priority ? "unshift" : "push";
        events2.split(" ").forEach((event) => {
          if (!self2.eventsListeners[event])
            self2.eventsListeners[event] = [];
          self2.eventsListeners[event][method](handler);
        });
        return self2;
      },
      once(events2, handler, priority) {
        const self2 = this;
        if (!self2.eventsListeners || self2.destroyed)
          return self2;
        if (typeof handler !== "function")
          return self2;
        function onceHandler(...args) {
          self2.off(events2, onceHandler);
          if (onceHandler.__emitterProxy) {
            delete onceHandler.__emitterProxy;
          }
          handler.apply(self2, args);
        }
        onceHandler.__emitterProxy = handler;
        return self2.on(events2, onceHandler, priority);
      },
      onAny(handler, priority) {
        const self2 = this;
        if (!self2.eventsListeners || self2.destroyed)
          return self2;
        if (typeof handler !== "function")
          return self2;
        const method = priority ? "unshift" : "push";
        if (self2.eventsAnyListeners.indexOf(handler) < 0) {
          self2.eventsAnyListeners[method](handler);
        }
        return self2;
      },
      offAny(handler) {
        const self2 = this;
        if (!self2.eventsListeners || self2.destroyed)
          return self2;
        if (!self2.eventsAnyListeners)
          return self2;
        const index = self2.eventsAnyListeners.indexOf(handler);
        if (index >= 0) {
          self2.eventsAnyListeners.splice(index, 1);
        }
        return self2;
      },
      off(events2, handler) {
        const self2 = this;
        if (!self2.eventsListeners || self2.destroyed)
          return self2;
        if (!self2.eventsListeners)
          return self2;
        events2.split(" ").forEach((event) => {
          if (typeof handler === "undefined") {
            self2.eventsListeners[event] = [];
          } else if (self2.eventsListeners[event]) {
            self2.eventsListeners[event].forEach((eventHandler, index) => {
              if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {
                self2.eventsListeners[event].splice(index, 1);
              }
            });
          }
        });
        return self2;
      },
      emit(...args) {
        const self2 = this;
        if (!self2.eventsListeners || self2.destroyed)
          return self2;
        if (!self2.eventsListeners)
          return self2;
        let events2;
        let data;
        let context;
        if (typeof args[0] === "string" || Array.isArray(args[0])) {
          events2 = args[0];
          data = args.slice(1, args.length);
          context = self2;
        } else {
          events2 = args[0].events;
          data = args[0].data;
          context = args[0].context || self2;
        }
        data.unshift(context);
        const eventsArray = Array.isArray(events2) ? events2 : events2.split(" ");
        eventsArray.forEach((event) => {
          if (self2.eventsAnyListeners && self2.eventsAnyListeners.length) {
            self2.eventsAnyListeners.forEach((eventHandler) => {
              eventHandler.apply(context, [event, ...data]);
            });
          }
          if (self2.eventsListeners && self2.eventsListeners[event]) {
            self2.eventsListeners[event].forEach((eventHandler) => {
              eventHandler.apply(context, data);
            });
          }
        });
        return self2;
      }
    };
    function updateSize() {
      const swiper = this;
      let width;
      let height;
      const el = swiper.el;
      if (typeof swiper.params.width !== "undefined" && swiper.params.width !== null) {
        width = swiper.params.width;
      } else {
        width = el.clientWidth;
      }
      if (typeof swiper.params.height !== "undefined" && swiper.params.height !== null) {
        height = swiper.params.height;
      } else {
        height = el.clientHeight;
      }
      if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
        return;
      }
      width = width - parseInt(elementStyle(el, "padding-left") || 0, 10) - parseInt(elementStyle(el, "padding-right") || 0, 10);
      height = height - parseInt(elementStyle(el, "padding-top") || 0, 10) - parseInt(elementStyle(el, "padding-bottom") || 0, 10);
      if (Number.isNaN(width))
        width = 0;
      if (Number.isNaN(height))
        height = 0;
      Object.assign(swiper, {
        width,
        height,
        size: swiper.isHorizontal() ? width : height
      });
    }
    function updateSlides() {
      const swiper = this;
      function getDirectionLabel(property) {
        if (swiper.isHorizontal()) {
          return property;
        }
        return {
          "width": "height",
          "margin-top": "margin-left",
          "margin-bottom ": "margin-right",
          "margin-left": "margin-top",
          "margin-right": "margin-bottom",
          "padding-left": "padding-top",
          "padding-right": "padding-bottom",
          "marginRight": "marginBottom"
        }[property];
      }
      function getDirectionPropertyValue(node, label) {
        return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
      }
      const params = swiper.params;
      const {
        wrapperEl,
        slidesEl,
        size: swiperSize,
        rtlTranslate: rtl,
        wrongRTL
      } = swiper;
      const isVirtual = swiper.virtual && params.virtual.enabled;
      const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
      const slides = elementChildren(slidesEl, `.${swiper.params.slideClass}, swiper-slide`);
      const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
      let snapGrid = [];
      const slidesGrid = [];
      const slidesSizesGrid = [];
      let offsetBefore = params.slidesOffsetBefore;
      if (typeof offsetBefore === "function") {
        offsetBefore = params.slidesOffsetBefore.call(swiper);
      }
      let offsetAfter = params.slidesOffsetAfter;
      if (typeof offsetAfter === "function") {
        offsetAfter = params.slidesOffsetAfter.call(swiper);
      }
      const previousSnapGridLength = swiper.snapGrid.length;
      const previousSlidesGridLength = swiper.slidesGrid.length;
      let spaceBetween = params.spaceBetween;
      let slidePosition = -offsetBefore;
      let prevSlideSize = 0;
      let index = 0;
      if (typeof swiperSize === "undefined") {
        return;
      }
      if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
        spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize;
      } else if (typeof spaceBetween === "string") {
        spaceBetween = parseFloat(spaceBetween);
      }
      swiper.virtualSize = -spaceBetween;
      slides.forEach((slideEl) => {
        if (rtl) {
          slideEl.style.marginLeft = "";
        } else {
          slideEl.style.marginRight = "";
        }
        slideEl.style.marginBottom = "";
        slideEl.style.marginTop = "";
      });
      if (params.centeredSlides && params.cssMode) {
        setCSSProperty(wrapperEl, "--swiper-centered-offset-before", "");
        setCSSProperty(wrapperEl, "--swiper-centered-offset-after", "");
      }
      const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
      if (gridEnabled) {
        swiper.grid.initSlides(slidesLength);
      }
      let slideSize;
      const shouldResetSlideSize = params.slidesPerView === "auto" && params.breakpoints && Object.keys(params.breakpoints).filter((key2) => {
        return typeof params.breakpoints[key2].slidesPerView !== "undefined";
      }).length > 0;
      for (let i = 0; i < slidesLength; i += 1) {
        slideSize = 0;
        let slide2;
        if (slides[i])
          slide2 = slides[i];
        if (gridEnabled) {
          swiper.grid.updateSlide(i, slide2, slidesLength, getDirectionLabel);
        }
        if (slides[i] && elementStyle(slide2, "display") === "none")
          continue;
        if (params.slidesPerView === "auto") {
          if (shouldResetSlideSize) {
            slides[i].style[getDirectionLabel("width")] = ``;
          }
          const slideStyles = getComputedStyle(slide2);
          const currentTransform = slide2.style.transform;
          const currentWebKitTransform = slide2.style.webkitTransform;
          if (currentTransform) {
            slide2.style.transform = "none";
          }
          if (currentWebKitTransform) {
            slide2.style.webkitTransform = "none";
          }
          if (params.roundLengths) {
            slideSize = swiper.isHorizontal() ? elementOuterSize(slide2, "width", true) : elementOuterSize(slide2, "height", true);
          } else {
            const width = getDirectionPropertyValue(slideStyles, "width");
            const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
            const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
            const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
            const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
            const boxSizing = slideStyles.getPropertyValue("box-sizing");
            if (boxSizing && boxSizing === "border-box") {
              slideSize = width + marginLeft + marginRight;
            } else {
              const {
                clientWidth,
                offsetWidth
              } = slide2;
              slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
            }
          }
          if (currentTransform) {
            slide2.style.transform = currentTransform;
          }
          if (currentWebKitTransform) {
            slide2.style.webkitTransform = currentWebKitTransform;
          }
          if (params.roundLengths)
            slideSize = Math.floor(slideSize);
        } else {
          slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
          if (params.roundLengths)
            slideSize = Math.floor(slideSize);
          if (slides[i]) {
            slides[i].style[getDirectionLabel("width")] = `${slideSize}px`;
          }
        }
        if (slides[i]) {
          slides[i].swiperSlideSize = slideSize;
        }
        slidesSizesGrid.push(slideSize);
        if (params.centeredSlides) {
          slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
          if (prevSlideSize === 0 && i !== 0)
            slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
          if (i === 0)
            slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
          if (Math.abs(slidePosition) < 1 / 1e3)
            slidePosition = 0;
          if (params.roundLengths)
            slidePosition = Math.floor(slidePosition);
          if (index % params.slidesPerGroup === 0)
            snapGrid.push(slidePosition);
          slidesGrid.push(slidePosition);
        } else {
          if (params.roundLengths)
            slidePosition = Math.floor(slidePosition);
          if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0)
            snapGrid.push(slidePosition);
          slidesGrid.push(slidePosition);
          slidePosition = slidePosition + slideSize + spaceBetween;
        }
        swiper.virtualSize += slideSize + spaceBetween;
        prevSlideSize = slideSize;
        index += 1;
      }
      swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
      if (rtl && wrongRTL && (params.effect === "slide" || params.effect === "coverflow")) {
        wrapperEl.style.width = `${swiper.virtualSize + spaceBetween}px`;
      }
      if (params.setWrapperSize) {
        wrapperEl.style[getDirectionLabel("width")] = `${swiper.virtualSize + spaceBetween}px`;
      }
      if (gridEnabled) {
        swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
      }
      if (!params.centeredSlides) {
        const newSlidesGrid = [];
        for (let i = 0; i < snapGrid.length; i += 1) {
          let slidesGridItem = snapGrid[i];
          if (params.roundLengths)
            slidesGridItem = Math.floor(slidesGridItem);
          if (snapGrid[i] <= swiper.virtualSize - swiperSize) {
            newSlidesGrid.push(slidesGridItem);
          }
        }
        snapGrid = newSlidesGrid;
        if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
          snapGrid.push(swiper.virtualSize - swiperSize);
        }
      }
      if (isVirtual && params.loop) {
        const size = slidesSizesGrid[0] + spaceBetween;
        if (params.slidesPerGroup > 1) {
          const groups = Math.ceil((swiper.virtual.slidesBefore + swiper.virtual.slidesAfter) / params.slidesPerGroup);
          const groupSize = size * params.slidesPerGroup;
          for (let i = 0; i < groups; i += 1) {
            snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
          }
        }
        for (let i = 0; i < swiper.virtual.slidesBefore + swiper.virtual.slidesAfter; i += 1) {
          if (params.slidesPerGroup === 1) {
            snapGrid.push(snapGrid[snapGrid.length - 1] + size);
          }
          slidesGrid.push(slidesGrid[slidesGrid.length - 1] + size);
          swiper.virtualSize += size;
        }
      }
      if (snapGrid.length === 0)
        snapGrid = [0];
      if (spaceBetween !== 0) {
        const key2 = swiper.isHorizontal() && rtl ? "marginLeft" : getDirectionLabel("marginRight");
        slides.filter((_, slideIndex) => {
          if (!params.cssMode || params.loop)
            return true;
          if (slideIndex === slides.length - 1) {
            return false;
          }
          return true;
        }).forEach((slideEl) => {
          slideEl.style[key2] = `${spaceBetween}px`;
        });
      }
      if (params.centeredSlides && params.centeredSlidesBounds) {
        let allSlidesSize = 0;
        slidesSizesGrid.forEach((slideSizeValue) => {
          allSlidesSize += slideSizeValue + (spaceBetween || 0);
        });
        allSlidesSize -= spaceBetween;
        const maxSnap = allSlidesSize - swiperSize;
        snapGrid = snapGrid.map((snap) => {
          if (snap <= 0)
            return -offsetBefore;
          if (snap > maxSnap)
            return maxSnap + offsetAfter;
          return snap;
        });
      }
      if (params.centerInsufficientSlides) {
        let allSlidesSize = 0;
        slidesSizesGrid.forEach((slideSizeValue) => {
          allSlidesSize += slideSizeValue + (spaceBetween || 0);
        });
        allSlidesSize -= spaceBetween;
        if (allSlidesSize < swiperSize) {
          const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
          snapGrid.forEach((snap, snapIndex) => {
            snapGrid[snapIndex] = snap - allSlidesOffset;
          });
          slidesGrid.forEach((snap, snapIndex) => {
            slidesGrid[snapIndex] = snap + allSlidesOffset;
          });
        }
      }
      Object.assign(swiper, {
        slides,
        snapGrid,
        slidesGrid,
        slidesSizesGrid
      });
      if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
        setCSSProperty(wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
        setCSSProperty(wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
        const addToSnapGrid = -swiper.snapGrid[0];
        const addToSlidesGrid = -swiper.slidesGrid[0];
        swiper.snapGrid = swiper.snapGrid.map((v) => v + addToSnapGrid);
        swiper.slidesGrid = swiper.slidesGrid.map((v) => v + addToSlidesGrid);
      }
      if (slidesLength !== previousSlidesLength) {
        swiper.emit("slidesLengthChange");
      }
      if (snapGrid.length !== previousSnapGridLength) {
        if (swiper.params.watchOverflow)
          swiper.checkOverflow();
        swiper.emit("snapGridLengthChange");
      }
      if (slidesGrid.length !== previousSlidesGridLength) {
        swiper.emit("slidesGridLengthChange");
      }
      if (params.watchSlidesProgress) {
        swiper.updateSlidesOffset();
      }
      if (!isVirtual && !params.cssMode && (params.effect === "slide" || params.effect === "fade")) {
        const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
        const hasClassBackfaceClassAdded = swiper.el.classList.contains(backFaceHiddenClass);
        if (slidesLength <= params.maxBackfaceHiddenSlides) {
          if (!hasClassBackfaceClassAdded)
            swiper.el.classList.add(backFaceHiddenClass);
        } else if (hasClassBackfaceClassAdded) {
          swiper.el.classList.remove(backFaceHiddenClass);
        }
      }
    }
    function updateAutoHeight(speed) {
      const swiper = this;
      const activeSlides = [];
      const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
      let newHeight = 0;
      let i;
      if (typeof speed === "number") {
        swiper.setTransition(speed);
      } else if (speed === true) {
        swiper.setTransition(swiper.params.speed);
      }
      const getSlideByIndex = (index) => {
        if (isVirtual) {
          return swiper.slides[swiper.getSlideIndexByData(index)];
        }
        return swiper.slides[index];
      };
      if (swiper.params.slidesPerView !== "auto" && swiper.params.slidesPerView > 1) {
        if (swiper.params.centeredSlides) {
          (swiper.visibleSlides || []).forEach((slide2) => {
            activeSlides.push(slide2);
          });
        } else {
          for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
            const index = swiper.activeIndex + i;
            if (index > swiper.slides.length && !isVirtual)
              break;
            activeSlides.push(getSlideByIndex(index));
          }
        }
      } else {
        activeSlides.push(getSlideByIndex(swiper.activeIndex));
      }
      for (i = 0; i < activeSlides.length; i += 1) {
        if (typeof activeSlides[i] !== "undefined") {
          const height = activeSlides[i].offsetHeight;
          newHeight = height > newHeight ? height : newHeight;
        }
      }
      if (newHeight || newHeight === 0)
        swiper.wrapperEl.style.height = `${newHeight}px`;
    }
    function updateSlidesOffset() {
      const swiper = this;
      const slides = swiper.slides;
      const minusOffset = swiper.isElement ? swiper.isHorizontal() ? swiper.wrapperEl.offsetLeft : swiper.wrapperEl.offsetTop : 0;
      for (let i = 0; i < slides.length; i += 1) {
        slides[i].swiperSlideOffset = (swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop) - minusOffset - swiper.cssOverflowAdjustment();
      }
    }
    function updateSlidesProgress(translate2 = this && this.translate || 0) {
      const swiper = this;
      const params = swiper.params;
      const {
        slides,
        rtlTranslate: rtl,
        snapGrid
      } = swiper;
      if (slides.length === 0)
        return;
      if (typeof slides[0].swiperSlideOffset === "undefined")
        swiper.updateSlidesOffset();
      let offsetCenter = -translate2;
      if (rtl)
        offsetCenter = translate2;
      slides.forEach((slideEl) => {
        slideEl.classList.remove(params.slideVisibleClass);
      });
      swiper.visibleSlidesIndexes = [];
      swiper.visibleSlides = [];
      let spaceBetween = params.spaceBetween;
      if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
        spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiper.size;
      } else if (typeof spaceBetween === "string") {
        spaceBetween = parseFloat(spaceBetween);
      }
      for (let i = 0; i < slides.length; i += 1) {
        const slide2 = slides[i];
        let slideOffset = slide2.swiperSlideOffset;
        if (params.cssMode && params.centeredSlides) {
          slideOffset -= slides[0].swiperSlideOffset;
        }
        const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide2.swiperSlideSize + spaceBetween);
        const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide2.swiperSlideSize + spaceBetween);
        const slideBefore = -(offsetCenter - slideOffset);
        const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
        const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
        if (isVisible) {
          swiper.visibleSlides.push(slide2);
          swiper.visibleSlidesIndexes.push(i);
          slides[i].classList.add(params.slideVisibleClass);
        }
        slide2.progress = rtl ? -slideProgress : slideProgress;
        slide2.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
      }
    }
    function updateProgress(translate2) {
      const swiper = this;
      if (typeof translate2 === "undefined") {
        const multiplier = swiper.rtlTranslate ? -1 : 1;
        translate2 = swiper && swiper.translate && swiper.translate * multiplier || 0;
      }
      const params = swiper.params;
      const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
      let {
        progress,
        isBeginning,
        isEnd,
        progressLoop
      } = swiper;
      const wasBeginning = isBeginning;
      const wasEnd = isEnd;
      if (translatesDiff === 0) {
        progress = 0;
        isBeginning = true;
        isEnd = true;
      } else {
        progress = (translate2 - swiper.minTranslate()) / translatesDiff;
        const isBeginningRounded = Math.abs(translate2 - swiper.minTranslate()) < 1;
        const isEndRounded = Math.abs(translate2 - swiper.maxTranslate()) < 1;
        isBeginning = isBeginningRounded || progress <= 0;
        isEnd = isEndRounded || progress >= 1;
        if (isBeginningRounded)
          progress = 0;
        if (isEndRounded)
          progress = 1;
      }
      if (params.loop) {
        const firstSlideIndex = swiper.getSlideIndexByData(0);
        const lastSlideIndex = swiper.getSlideIndexByData(swiper.slides.length - 1);
        const firstSlideTranslate = swiper.slidesGrid[firstSlideIndex];
        const lastSlideTranslate = swiper.slidesGrid[lastSlideIndex];
        const translateMax = swiper.slidesGrid[swiper.slidesGrid.length - 1];
        const translateAbs = Math.abs(translate2);
        if (translateAbs >= firstSlideTranslate) {
          progressLoop = (translateAbs - firstSlideTranslate) / translateMax;
        } else {
          progressLoop = (translateAbs + translateMax - lastSlideTranslate) / translateMax;
        }
        if (progressLoop > 1)
          progressLoop -= 1;
      }
      Object.assign(swiper, {
        progress,
        progressLoop,
        isBeginning,
        isEnd
      });
      if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight)
        swiper.updateSlidesProgress(translate2);
      if (isBeginning && !wasBeginning) {
        swiper.emit("reachBeginning toEdge");
      }
      if (isEnd && !wasEnd) {
        swiper.emit("reachEnd toEdge");
      }
      if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
        swiper.emit("fromEdge");
      }
      swiper.emit("progress", progress);
    }
    function updateSlidesClasses() {
      const swiper = this;
      const {
        slides,
        params,
        slidesEl,
        activeIndex
      } = swiper;
      const isVirtual = swiper.virtual && params.virtual.enabled;
      const getFilteredSlide = (selector) => {
        return elementChildren(slidesEl, `.${params.slideClass}${selector}, swiper-slide${selector}`)[0];
      };
      slides.forEach((slideEl) => {
        slideEl.classList.remove(params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
      });
      let activeSlide;
      if (isVirtual) {
        if (params.loop) {
          let slideIndex = activeIndex - swiper.virtual.slidesBefore;
          if (slideIndex < 0)
            slideIndex = swiper.virtual.slides.length + slideIndex;
          if (slideIndex >= swiper.virtual.slides.length)
            slideIndex -= swiper.virtual.slides.length;
          activeSlide = getFilteredSlide(`[data-swiper-slide-index="${slideIndex}"]`);
        } else {
          activeSlide = getFilteredSlide(`[data-swiper-slide-index="${activeIndex}"]`);
        }
      } else {
        activeSlide = slides[activeIndex];
      }
      if (activeSlide) {
        activeSlide.classList.add(params.slideActiveClass);
        let nextSlide = elementNextAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
        if (params.loop && !nextSlide) {
          nextSlide = slides[0];
        }
        if (nextSlide) {
          nextSlide.classList.add(params.slideNextClass);
        }
        let prevSlide = elementPrevAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
        if (params.loop && !prevSlide === 0) {
          prevSlide = slides[slides.length - 1];
        }
        if (prevSlide) {
          prevSlide.classList.add(params.slidePrevClass);
        }
      }
      swiper.emitSlidesClasses();
    }
    const processLazyPreloader = (swiper, imageEl) => {
      if (!swiper || swiper.destroyed || !swiper.params)
        return;
      const slideSelector = () => swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
      const slideEl = imageEl.closest(slideSelector());
      if (slideEl) {
        const lazyEl = slideEl.querySelector(`.${swiper.params.lazyPreloaderClass}`);
        if (lazyEl)
          lazyEl.remove();
      }
    };
    const unlazy = (swiper, index) => {
      if (!swiper.slides[index])
        return;
      const imageEl = swiper.slides[index].querySelector('[loading="lazy"]');
      if (imageEl)
        imageEl.removeAttribute("loading");
    };
    const preload = (swiper) => {
      if (!swiper || swiper.destroyed || !swiper.params)
        return;
      let amount = swiper.params.lazyPreloadPrevNext;
      const len = swiper.slides.length;
      if (!len || !amount || amount < 0)
        return;
      amount = Math.min(amount, len);
      const slidesPerView = swiper.params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(swiper.params.slidesPerView);
      const activeIndex = swiper.activeIndex;
      if (swiper.params.grid && swiper.params.grid.rows > 1) {
        const activeColumn = activeIndex;
        const preloadColumns = [activeColumn - amount];
        preloadColumns.push(...Array.from({
          length: amount
        }).map((_, i) => {
          return activeColumn + slidesPerView + i;
        }));
        swiper.slides.forEach((slideEl, i) => {
          if (preloadColumns.includes(slideEl.column))
            unlazy(swiper, i);
        });
        return;
      }
      const slideIndexLastInView = activeIndex + slidesPerView - 1;
      if (swiper.params.rewind || swiper.params.loop) {
        for (let i = activeIndex - amount; i <= slideIndexLastInView + amount; i += 1) {
          const realIndex = (i % len + len) % len;
          if (realIndex < activeIndex || realIndex > slideIndexLastInView)
            unlazy(swiper, realIndex);
        }
      } else {
        for (let i = Math.max(activeIndex - amount, 0); i <= Math.min(slideIndexLastInView + amount, len - 1); i += 1) {
          if (i !== activeIndex && (i > slideIndexLastInView || i < activeIndex)) {
            unlazy(swiper, i);
          }
        }
      }
    };
    function getActiveIndexByTranslate(swiper) {
      const {
        slidesGrid,
        params
      } = swiper;
      const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
      let activeIndex;
      for (let i = 0; i < slidesGrid.length; i += 1) {
        if (typeof slidesGrid[i + 1] !== "undefined") {
          if (translate2 >= slidesGrid[i] && translate2 < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {
            activeIndex = i;
          } else if (translate2 >= slidesGrid[i] && translate2 < slidesGrid[i + 1]) {
            activeIndex = i + 1;
          }
        } else if (translate2 >= slidesGrid[i]) {
          activeIndex = i;
        }
      }
      if (params.normalizeSlideIndex) {
        if (activeIndex < 0 || typeof activeIndex === "undefined")
          activeIndex = 0;
      }
      return activeIndex;
    }
    function updateActiveIndex(newActiveIndex) {
      const swiper = this;
      const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
      const {
        snapGrid,
        params,
        activeIndex: previousIndex,
        realIndex: previousRealIndex,
        snapIndex: previousSnapIndex
      } = swiper;
      let activeIndex = newActiveIndex;
      let snapIndex;
      const getVirtualRealIndex = (aIndex) => {
        let realIndex2 = aIndex - swiper.virtual.slidesBefore;
        if (realIndex2 < 0) {
          realIndex2 = swiper.virtual.slides.length + realIndex2;
        }
        if (realIndex2 >= swiper.virtual.slides.length) {
          realIndex2 -= swiper.virtual.slides.length;
        }
        return realIndex2;
      };
      if (typeof activeIndex === "undefined") {
        activeIndex = getActiveIndexByTranslate(swiper);
      }
      if (snapGrid.indexOf(translate2) >= 0) {
        snapIndex = snapGrid.indexOf(translate2);
      } else {
        const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
        snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
      }
      if (snapIndex >= snapGrid.length)
        snapIndex = snapGrid.length - 1;
      if (activeIndex === previousIndex) {
        if (snapIndex !== previousSnapIndex) {
          swiper.snapIndex = snapIndex;
          swiper.emit("snapIndexChange");
        }
        if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
          swiper.realIndex = getVirtualRealIndex(activeIndex);
        }
        return;
      }
      let realIndex;
      if (swiper.virtual && params.virtual.enabled && params.loop) {
        realIndex = getVirtualRealIndex(activeIndex);
      } else if (swiper.slides[activeIndex]) {
        realIndex = parseInt(swiper.slides[activeIndex].getAttribute("data-swiper-slide-index") || activeIndex, 10);
      } else {
        realIndex = activeIndex;
      }
      Object.assign(swiper, {
        previousSnapIndex,
        snapIndex,
        previousRealIndex,
        realIndex,
        previousIndex,
        activeIndex
      });
      if (swiper.initialized) {
        preload(swiper);
      }
      swiper.emit("activeIndexChange");
      swiper.emit("snapIndexChange");
      if (previousRealIndex !== realIndex) {
        swiper.emit("realIndexChange");
      }
      if (swiper.initialized || swiper.params.runCallbacksOnInit) {
        swiper.emit("slideChange");
      }
    }
    function updateClickedSlide(e) {
      const swiper = this;
      const params = swiper.params;
      const slide2 = e.closest(`.${params.slideClass}, swiper-slide`);
      let slideFound = false;
      let slideIndex;
      if (slide2) {
        for (let i = 0; i < swiper.slides.length; i += 1) {
          if (swiper.slides[i] === slide2) {
            slideFound = true;
            slideIndex = i;
            break;
          }
        }
      }
      if (slide2 && slideFound) {
        swiper.clickedSlide = slide2;
        if (swiper.virtual && swiper.params.virtual.enabled) {
          swiper.clickedIndex = parseInt(slide2.getAttribute("data-swiper-slide-index"), 10);
        } else {
          swiper.clickedIndex = slideIndex;
        }
      } else {
        swiper.clickedSlide = void 0;
        swiper.clickedIndex = void 0;
        return;
      }
      if (params.slideToClickedSlide && swiper.clickedIndex !== void 0 && swiper.clickedIndex !== swiper.activeIndex) {
        swiper.slideToClickedSlide();
      }
    }
    const update = {
      updateSize,
      updateSlides,
      updateAutoHeight,
      updateSlidesOffset,
      updateSlidesProgress,
      updateProgress,
      updateSlidesClasses,
      updateActiveIndex,
      updateClickedSlide
    };
    function getSwiperTranslate(axis = this.isHorizontal() ? "x" : "y") {
      const swiper = this;
      const {
        params,
        rtlTranslate: rtl,
        translate: translate2,
        wrapperEl
      } = swiper;
      if (params.virtualTranslate) {
        return rtl ? -translate2 : translate2;
      }
      if (params.cssMode) {
        return translate2;
      }
      let currentTranslate = getTranslate(wrapperEl, axis);
      currentTranslate += swiper.cssOverflowAdjustment();
      if (rtl)
        currentTranslate = -currentTranslate;
      return currentTranslate || 0;
    }
    function setTranslate(translate2, byController) {
      const swiper = this;
      const {
        rtlTranslate: rtl,
        params,
        wrapperEl,
        progress
      } = swiper;
      let x = 0;
      let y = 0;
      const z = 0;
      if (swiper.isHorizontal()) {
        x = rtl ? -translate2 : translate2;
      } else {
        y = translate2;
      }
      if (params.roundLengths) {
        x = Math.floor(x);
        y = Math.floor(y);
      }
      swiper.previousTranslate = swiper.translate;
      swiper.translate = swiper.isHorizontal() ? x : y;
      if (params.cssMode) {
        wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x : -y;
      } else if (!params.virtualTranslate) {
        if (swiper.isHorizontal()) {
          x -= swiper.cssOverflowAdjustment();
        } else {
          y -= swiper.cssOverflowAdjustment();
        }
        wrapperEl.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
      }
      let newProgress;
      const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
      if (translatesDiff === 0) {
        newProgress = 0;
      } else {
        newProgress = (translate2 - swiper.minTranslate()) / translatesDiff;
      }
      if (newProgress !== progress) {
        swiper.updateProgress(translate2);
      }
      swiper.emit("setTranslate", swiper.translate, byController);
    }
    function minTranslate() {
      return -this.snapGrid[0];
    }
    function maxTranslate() {
      return -this.snapGrid[this.snapGrid.length - 1];
    }
    function translateTo(translate2 = 0, speed = this.params.speed, runCallbacks = true, translateBounds = true, internal) {
      const swiper = this;
      const {
        params,
        wrapperEl
      } = swiper;
      if (swiper.animating && params.preventInteractionOnTransition) {
        return false;
      }
      const minTranslate2 = swiper.minTranslate();
      const maxTranslate2 = swiper.maxTranslate();
      let newTranslate;
      if (translateBounds && translate2 > minTranslate2)
        newTranslate = minTranslate2;
      else if (translateBounds && translate2 < maxTranslate2)
        newTranslate = maxTranslate2;
      else
        newTranslate = translate2;
      swiper.updateProgress(newTranslate);
      if (params.cssMode) {
        const isH = swiper.isHorizontal();
        if (speed === 0) {
          wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate;
        } else {
          if (!swiper.support.smoothScroll) {
            animateCSSModeScroll({
              swiper,
              targetPosition: -newTranslate,
              side: isH ? "left" : "top"
            });
            return true;
          }
          wrapperEl.scrollTo({
            [isH ? "left" : "top"]: -newTranslate,
            behavior: "smooth"
          });
        }
        return true;
      }
      if (speed === 0) {
        swiper.setTransition(0);
        swiper.setTranslate(newTranslate);
        if (runCallbacks) {
          swiper.emit("beforeTransitionStart", speed, internal);
          swiper.emit("transitionEnd");
        }
      } else {
        swiper.setTransition(speed);
        swiper.setTranslate(newTranslate);
        if (runCallbacks) {
          swiper.emit("beforeTransitionStart", speed, internal);
          swiper.emit("transitionStart");
        }
        if (!swiper.animating) {
          swiper.animating = true;
          if (!swiper.onTranslateToWrapperTransitionEnd) {
            swiper.onTranslateToWrapperTransitionEnd = function transitionEnd2(e) {
              if (!swiper || swiper.destroyed)
                return;
              if (e.target !== this)
                return;
              swiper.wrapperEl.removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
              swiper.onTranslateToWrapperTransitionEnd = null;
              delete swiper.onTranslateToWrapperTransitionEnd;
              if (runCallbacks) {
                swiper.emit("transitionEnd");
              }
            };
          }
          swiper.wrapperEl.addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
        }
      }
      return true;
    }
    const translate = {
      getTranslate: getSwiperTranslate,
      setTranslate,
      minTranslate,
      maxTranslate,
      translateTo
    };
    function setTransition(duration, byController) {
      const swiper = this;
      if (!swiper.params.cssMode) {
        swiper.wrapperEl.style.transitionDuration = `${duration}ms`;
      }
      swiper.emit("setTransition", duration, byController);
    }
    function transitionEmit({
      swiper,
      runCallbacks,
      direction,
      step
    }) {
      const {
        activeIndex,
        previousIndex
      } = swiper;
      let dir = direction;
      if (!dir) {
        if (activeIndex > previousIndex)
          dir = "next";
        else if (activeIndex < previousIndex)
          dir = "prev";
        else
          dir = "reset";
      }
      swiper.emit(`transition${step}`);
      if (runCallbacks && activeIndex !== previousIndex) {
        if (dir === "reset") {
          swiper.emit(`slideResetTransition${step}`);
          return;
        }
        swiper.emit(`slideChangeTransition${step}`);
        if (dir === "next") {
          swiper.emit(`slideNextTransition${step}`);
        } else {
          swiper.emit(`slidePrevTransition${step}`);
        }
      }
    }
    function transitionStart(runCallbacks = true, direction) {
      const swiper = this;
      const {
        params
      } = swiper;
      if (params.cssMode)
        return;
      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }
      transitionEmit({
        swiper,
        runCallbacks,
        direction,
        step: "Start"
      });
    }
    function transitionEnd(runCallbacks = true, direction) {
      const swiper = this;
      const {
        params
      } = swiper;
      swiper.animating = false;
      if (params.cssMode)
        return;
      swiper.setTransition(0);
      transitionEmit({
        swiper,
        runCallbacks,
        direction,
        step: "End"
      });
    }
    const transition = {
      setTransition,
      transitionStart,
      transitionEnd
    };
    function slideTo(index = 0, speed = this.params.speed, runCallbacks = true, internal, initial) {
      if (typeof index === "string") {
        index = parseInt(index, 10);
      }
      const swiper = this;
      let slideIndex = index;
      if (slideIndex < 0)
        slideIndex = 0;
      const {
        params,
        snapGrid,
        slidesGrid,
        previousIndex,
        activeIndex,
        rtlTranslate: rtl,
        wrapperEl,
        enabled
      } = swiper;
      if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) {
        return false;
      }
      const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
      let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
      if (snapIndex >= snapGrid.length)
        snapIndex = snapGrid.length - 1;
      const translate2 = -snapGrid[snapIndex];
      if (params.normalizeSlideIndex) {
        for (let i = 0; i < slidesGrid.length; i += 1) {
          const normalizedTranslate = -Math.floor(translate2 * 100);
          const normalizedGrid = Math.floor(slidesGrid[i] * 100);
          const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
          if (typeof slidesGrid[i + 1] !== "undefined") {
            if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) {
              slideIndex = i;
            } else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
              slideIndex = i + 1;
            }
          } else if (normalizedTranslate >= normalizedGrid) {
            slideIndex = i;
          }
        }
      }
      if (swiper.initialized && slideIndex !== activeIndex) {
        if (!swiper.allowSlideNext && (rtl ? translate2 > swiper.translate && translate2 > swiper.minTranslate() : translate2 < swiper.translate && translate2 < swiper.minTranslate())) {
          return false;
        }
        if (!swiper.allowSlidePrev && translate2 > swiper.translate && translate2 > swiper.maxTranslate()) {
          if ((activeIndex || 0) !== slideIndex) {
            return false;
          }
        }
      }
      if (slideIndex !== (previousIndex || 0) && runCallbacks) {
        swiper.emit("beforeSlideChangeStart");
      }
      swiper.updateProgress(translate2);
      let direction;
      if (slideIndex > activeIndex)
        direction = "next";
      else if (slideIndex < activeIndex)
        direction = "prev";
      else
        direction = "reset";
      if (rtl && -translate2 === swiper.translate || !rtl && translate2 === swiper.translate) {
        swiper.updateActiveIndex(slideIndex);
        if (params.autoHeight) {
          swiper.updateAutoHeight();
        }
        swiper.updateSlidesClasses();
        if (params.effect !== "slide") {
          swiper.setTranslate(translate2);
        }
        if (direction !== "reset") {
          swiper.transitionStart(runCallbacks, direction);
          swiper.transitionEnd(runCallbacks, direction);
        }
        return false;
      }
      if (params.cssMode) {
        const isH = swiper.isHorizontal();
        const t = rtl ? translate2 : -translate2;
        if (speed === 0) {
          const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
          if (isVirtual) {
            swiper.wrapperEl.style.scrollSnapType = "none";
            swiper._immediateVirtual = true;
          }
          if (isVirtual && !swiper._cssModeVirtualInitialSet && swiper.params.initialSlide > 0) {
            swiper._cssModeVirtualInitialSet = true;
            requestAnimationFrame(() => {
              wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
            });
          } else {
            wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
          }
          if (isVirtual) {
            requestAnimationFrame(() => {
              swiper.wrapperEl.style.scrollSnapType = "";
              swiper._immediateVirtual = false;
            });
          }
        } else {
          if (!swiper.support.smoothScroll) {
            animateCSSModeScroll({
              swiper,
              targetPosition: t,
              side: isH ? "left" : "top"
            });
            return true;
          }
          wrapperEl.scrollTo({
            [isH ? "left" : "top"]: t,
            behavior: "smooth"
          });
        }
        return true;
      }
      swiper.setTransition(speed);
      swiper.setTranslate(translate2);
      swiper.updateActiveIndex(slideIndex);
      swiper.updateSlidesClasses();
      swiper.emit("beforeTransitionStart", speed, internal);
      swiper.transitionStart(runCallbacks, direction);
      if (speed === 0) {
        swiper.transitionEnd(runCallbacks, direction);
      } else if (!swiper.animating) {
        swiper.animating = true;
        if (!swiper.onSlideToWrapperTransitionEnd) {
          swiper.onSlideToWrapperTransitionEnd = function transitionEnd2(e) {
            if (!swiper || swiper.destroyed)
              return;
            if (e.target !== this)
              return;
            swiper.wrapperEl.removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
            swiper.onSlideToWrapperTransitionEnd = null;
            delete swiper.onSlideToWrapperTransitionEnd;
            swiper.transitionEnd(runCallbacks, direction);
          };
        }
        swiper.wrapperEl.addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
      }
      return true;
    }
    function slideToLoop(index = 0, speed = this.params.speed, runCallbacks = true, internal) {
      if (typeof index === "string") {
        const indexAsNumber = parseInt(index, 10);
        index = indexAsNumber;
      }
      const swiper = this;
      let newIndex = index;
      if (swiper.params.loop) {
        if (swiper.virtual && swiper.params.virtual.enabled) {
          newIndex = newIndex + swiper.virtual.slidesBefore;
        } else {
          newIndex = swiper.getSlideIndexByData(newIndex);
        }
      }
      return swiper.slideTo(newIndex, speed, runCallbacks, internal);
    }
    function slideNext(speed = this.params.speed, runCallbacks = true, internal) {
      const swiper = this;
      const {
        enabled,
        params,
        animating
      } = swiper;
      if (!enabled)
        return swiper;
      let perGroup = params.slidesPerGroup;
      if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
        perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
      }
      const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
      const isVirtual = swiper.virtual && params.virtual.enabled;
      if (params.loop) {
        if (animating && !isVirtual && params.loopPreventsSliding)
          return false;
        swiper.loopFix({
          direction: "next"
        });
        swiper._clientLeft = swiper.wrapperEl.clientLeft;
      }
      if (params.rewind && swiper.isEnd) {
        return swiper.slideTo(0, speed, runCallbacks, internal);
      }
      return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
    }
    function slidePrev(speed = this.params.speed, runCallbacks = true, internal) {
      const swiper = this;
      const {
        params,
        snapGrid,
        slidesGrid,
        rtlTranslate,
        enabled,
        animating
      } = swiper;
      if (!enabled)
        return swiper;
      const isVirtual = swiper.virtual && params.virtual.enabled;
      if (params.loop) {
        if (animating && !isVirtual && params.loopPreventsSliding)
          return false;
        swiper.loopFix({
          direction: "prev"
        });
        swiper._clientLeft = swiper.wrapperEl.clientLeft;
      }
      const translate2 = rtlTranslate ? swiper.translate : -swiper.translate;
      function normalize(val) {
        if (val < 0)
          return -Math.floor(Math.abs(val));
        return Math.floor(val);
      }
      const normalizedTranslate = normalize(translate2);
      const normalizedSnapGrid = snapGrid.map((val) => normalize(val));
      let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
      if (typeof prevSnap === "undefined" && params.cssMode) {
        let prevSnapIndex;
        snapGrid.forEach((snap, snapIndex) => {
          if (normalizedTranslate >= snap) {
            prevSnapIndex = snapIndex;
          }
        });
        if (typeof prevSnapIndex !== "undefined") {
          prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
        }
      }
      let prevIndex = 0;
      if (typeof prevSnap !== "undefined") {
        prevIndex = slidesGrid.indexOf(prevSnap);
        if (prevIndex < 0)
          prevIndex = swiper.activeIndex - 1;
        if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
          prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
          prevIndex = Math.max(prevIndex, 0);
        }
      }
      if (params.rewind && swiper.isBeginning) {
        const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
        return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
      }
      return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
    }
    function slideReset(speed = this.params.speed, runCallbacks = true, internal) {
      const swiper = this;
      return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
    }
    function slideToClosest(speed = this.params.speed, runCallbacks = true, internal, threshold = 0.5) {
      const swiper = this;
      let index = swiper.activeIndex;
      const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
      const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
      const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
      if (translate2 >= swiper.snapGrid[snapIndex]) {
        const currentSnap = swiper.snapGrid[snapIndex];
        const nextSnap = swiper.snapGrid[snapIndex + 1];
        if (translate2 - currentSnap > (nextSnap - currentSnap) * threshold) {
          index += swiper.params.slidesPerGroup;
        }
      } else {
        const prevSnap = swiper.snapGrid[snapIndex - 1];
        const currentSnap = swiper.snapGrid[snapIndex];
        if (translate2 - prevSnap <= (currentSnap - prevSnap) * threshold) {
          index -= swiper.params.slidesPerGroup;
        }
      }
      index = Math.max(index, 0);
      index = Math.min(index, swiper.slidesGrid.length - 1);
      return swiper.slideTo(index, speed, runCallbacks, internal);
    }
    function slideToClickedSlide() {
      const swiper = this;
      const {
        params,
        slidesEl
      } = swiper;
      const slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : params.slidesPerView;
      let slideToIndex = swiper.clickedIndex;
      let realIndex;
      const slideSelector = swiper.isElement ? `swiper-slide` : `.${params.slideClass}`;
      if (params.loop) {
        if (swiper.animating)
          return;
        realIndex = parseInt(swiper.clickedSlide.getAttribute("data-swiper-slide-index"), 10);
        if (params.centeredSlides) {
          if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
            swiper.loopFix();
            slideToIndex = swiper.getSlideIndex(elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
            nextTick(() => {
              swiper.slideTo(slideToIndex);
            });
          } else {
            swiper.slideTo(slideToIndex);
          }
        } else if (slideToIndex > swiper.slides.length - slidesPerView) {
          swiper.loopFix();
          slideToIndex = swiper.getSlideIndex(elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
          nextTick(() => {
            swiper.slideTo(slideToIndex);
          });
        } else {
          swiper.slideTo(slideToIndex);
        }
      } else {
        swiper.slideTo(slideToIndex);
      }
    }
    const slide = {
      slideTo,
      slideToLoop,
      slideNext,
      slidePrev,
      slideReset,
      slideToClosest,
      slideToClickedSlide
    };
    function loopCreate(slideRealIndex) {
      const swiper = this;
      const {
        params,
        slidesEl
      } = swiper;
      if (!params.loop || swiper.virtual && swiper.params.virtual.enabled)
        return;
      const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
      slides.forEach((el, index) => {
        el.setAttribute("data-swiper-slide-index", index);
      });
      swiper.loopFix({
        slideRealIndex,
        direction: params.centeredSlides ? void 0 : "next"
      });
    }
    function loopFix({
      slideRealIndex,
      slideTo: slideTo2 = true,
      direction,
      setTranslate: setTranslate2,
      activeSlideIndex,
      byController,
      byMousewheel
    } = {}) {
      const swiper = this;
      if (!swiper.params.loop)
        return;
      swiper.emit("beforeLoopFix");
      const {
        slides,
        allowSlidePrev,
        allowSlideNext,
        slidesEl,
        params
      } = swiper;
      swiper.allowSlidePrev = true;
      swiper.allowSlideNext = true;
      if (swiper.virtual && params.virtual.enabled) {
        if (slideTo2) {
          if (!params.centeredSlides && swiper.snapIndex === 0) {
            swiper.slideTo(swiper.virtual.slides.length, 0, false, true);
          } else if (params.centeredSlides && swiper.snapIndex < params.slidesPerView) {
            swiper.slideTo(swiper.virtual.slides.length + swiper.snapIndex, 0, false, true);
          } else if (swiper.snapIndex === swiper.snapGrid.length - 1) {
            swiper.slideTo(swiper.virtual.slidesBefore, 0, false, true);
          }
        }
        swiper.allowSlidePrev = allowSlidePrev;
        swiper.allowSlideNext = allowSlideNext;
        swiper.emit("loopFix");
        return;
      }
      const slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10));
      let loopedSlides = params.loopedSlides || slidesPerView;
      if (loopedSlides % params.slidesPerGroup !== 0) {
        loopedSlides += params.slidesPerGroup - loopedSlides % params.slidesPerGroup;
      }
      swiper.loopedSlides = loopedSlides;
      const prependSlidesIndexes = [];
      const appendSlidesIndexes = [];
      let activeIndex = swiper.activeIndex;
      if (typeof activeSlideIndex === "undefined") {
        activeSlideIndex = swiper.getSlideIndex(swiper.slides.filter((el) => el.classList.contains(params.slideActiveClass))[0]);
      } else {
        activeIndex = activeSlideIndex;
      }
      const isNext = direction === "next" || !direction;
      const isPrev = direction === "prev" || !direction;
      let slidesPrepended = 0;
      let slidesAppended = 0;
      if (activeSlideIndex < loopedSlides) {
        slidesPrepended = Math.max(loopedSlides - activeSlideIndex, params.slidesPerGroup);
        for (let i = 0; i < loopedSlides - activeSlideIndex; i += 1) {
          const index = i - Math.floor(i / slides.length) * slides.length;
          prependSlidesIndexes.push(slides.length - index - 1);
        }
      } else if (activeSlideIndex > swiper.slides.length - loopedSlides * 2) {
        slidesAppended = Math.max(activeSlideIndex - (swiper.slides.length - loopedSlides * 2), params.slidesPerGroup);
        for (let i = 0; i < slidesAppended; i += 1) {
          const index = i - Math.floor(i / slides.length) * slides.length;
          appendSlidesIndexes.push(index);
        }
      }
      if (isPrev) {
        prependSlidesIndexes.forEach((index) => {
          swiper.slides[index].swiperLoopMoveDOM = true;
          slidesEl.prepend(swiper.slides[index]);
          swiper.slides[index].swiperLoopMoveDOM = false;
        });
      }
      if (isNext) {
        appendSlidesIndexes.forEach((index) => {
          swiper.slides[index].swiperLoopMoveDOM = true;
          slidesEl.append(swiper.slides[index]);
          swiper.slides[index].swiperLoopMoveDOM = false;
        });
      }
      swiper.recalcSlides();
      if (params.slidesPerView === "auto") {
        swiper.updateSlides();
      }
      if (params.watchSlidesProgress) {
        swiper.updateSlidesOffset();
      }
      if (slideTo2) {
        if (prependSlidesIndexes.length > 0 && isPrev) {
          if (typeof slideRealIndex === "undefined") {
            const currentSlideTranslate = swiper.slidesGrid[activeIndex];
            const newSlideTranslate = swiper.slidesGrid[activeIndex + slidesPrepended];
            const diff2 = newSlideTranslate - currentSlideTranslate;
            if (byMousewheel) {
              swiper.setTranslate(swiper.translate - diff2);
            } else {
              swiper.slideTo(activeIndex + slidesPrepended, 0, false, true);
              if (setTranslate2) {
                swiper.touches[swiper.isHorizontal() ? "startX" : "startY"] += diff2;
              }
            }
          } else {
            if (setTranslate2) {
              swiper.slideToLoop(slideRealIndex, 0, false, true);
            }
          }
        } else if (appendSlidesIndexes.length > 0 && isNext) {
          if (typeof slideRealIndex === "undefined") {
            const currentSlideTranslate = swiper.slidesGrid[activeIndex];
            const newSlideTranslate = swiper.slidesGrid[activeIndex - slidesAppended];
            const diff2 = newSlideTranslate - currentSlideTranslate;
            if (byMousewheel) {
              swiper.setTranslate(swiper.translate - diff2);
            } else {
              swiper.slideTo(activeIndex - slidesAppended, 0, false, true);
              if (setTranslate2) {
                swiper.touches[swiper.isHorizontal() ? "startX" : "startY"] += diff2;
              }
            }
          } else {
            swiper.slideToLoop(slideRealIndex, 0, false, true);
          }
        }
      }
      swiper.allowSlidePrev = allowSlidePrev;
      swiper.allowSlideNext = allowSlideNext;
      if (swiper.controller && swiper.controller.control && !byController) {
        const loopParams = {
          slideRealIndex,
          slideTo: false,
          direction,
          setTranslate: setTranslate2,
          activeSlideIndex,
          byController: true
        };
        if (Array.isArray(swiper.controller.control)) {
          swiper.controller.control.forEach((c) => {
            if (!c.destroyed && c.params.loop)
              c.loopFix(loopParams);
          });
        } else if (swiper.controller.control instanceof swiper.constructor && swiper.controller.control.params.loop) {
          swiper.controller.control.loopFix(loopParams);
        }
      }
      swiper.emit("loopFix");
    }
    function loopDestroy() {
      const swiper = this;
      const {
        params,
        slidesEl
      } = swiper;
      if (!params.loop || swiper.virtual && swiper.params.virtual.enabled)
        return;
      swiper.recalcSlides();
      const newSlidesOrder = [];
      swiper.slides.forEach((slideEl) => {
        const index = typeof slideEl.swiperSlideIndex === "undefined" ? slideEl.getAttribute("data-swiper-slide-index") * 1 : slideEl.swiperSlideIndex;
        newSlidesOrder[index] = slideEl;
      });
      swiper.slides.forEach((slideEl) => {
        slideEl.removeAttribute("data-swiper-slide-index");
      });
      newSlidesOrder.forEach((slideEl) => {
        slidesEl.append(slideEl);
      });
      swiper.recalcSlides();
      swiper.slideTo(swiper.realIndex, 0);
    }
    const loop = {
      loopCreate,
      loopFix,
      loopDestroy
    };
    function setGrabCursor(moving) {
      const swiper = this;
      if (!swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode)
        return;
      const el = swiper.params.touchEventsTarget === "container" ? swiper.el : swiper.wrapperEl;
      if (swiper.isElement) {
        swiper.__preventObserver__ = true;
      }
      el.style.cursor = "move";
      el.style.cursor = moving ? "grabbing" : "grab";
      if (swiper.isElement) {
        requestAnimationFrame(() => {
          swiper.__preventObserver__ = false;
        });
      }
    }
    function unsetGrabCursor() {
      const swiper = this;
      if (swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) {
        return;
      }
      if (swiper.isElement) {
        swiper.__preventObserver__ = true;
      }
      swiper[swiper.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "";
      if (swiper.isElement) {
        requestAnimationFrame(() => {
          swiper.__preventObserver__ = false;
        });
      }
    }
    const grabCursor = {
      setGrabCursor,
      unsetGrabCursor
    };
    function closestElement(selector, base = this) {
      function __closestFrom(el) {
        if (!el || el === getDocument() || el === getWindow())
          return null;
        if (el.assignedSlot)
          el = el.assignedSlot;
        const found = el.closest(selector);
        if (!found && !el.getRootNode) {
          return null;
        }
        return found || __closestFrom(el.getRootNode().host);
      }
      return __closestFrom(base);
    }
    function onTouchStart(event) {
      const swiper = this;
      const document2 = getDocument();
      const window2 = getWindow();
      const data = swiper.touchEventsData;
      data.evCache.push(event);
      const {
        params,
        touches,
        enabled
      } = swiper;
      if (!enabled)
        return;
      if (!params.simulateTouch && event.pointerType === "mouse")
        return;
      if (swiper.animating && params.preventInteractionOnTransition) {
        return;
      }
      if (!swiper.animating && params.cssMode && params.loop) {
        swiper.loopFix();
      }
      let e = event;
      if (e.originalEvent)
        e = e.originalEvent;
      let targetEl = e.target;
      if (params.touchEventsTarget === "wrapper") {
        if (!swiper.wrapperEl.contains(targetEl))
          return;
      }
      if ("which" in e && e.which === 3)
        return;
      if ("button" in e && e.button > 0)
        return;
      if (data.isTouched && data.isMoved)
        return;
      const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== "";
      const eventPath = event.composedPath ? event.composedPath() : event.path;
      if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) {
        targetEl = eventPath[0];
      }
      const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
      const isTargetShadow = !!(e.target && e.target.shadowRoot);
      if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
        swiper.allowClick = true;
        return;
      }
      if (params.swipeHandler) {
        if (!targetEl.closest(params.swipeHandler))
          return;
      }
      touches.currentX = e.pageX;
      touches.currentY = e.pageY;
      const startX = touches.currentX;
      const startY = touches.currentY;
      const edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
      const edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
      if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window2.innerWidth - edgeSwipeThreshold)) {
        if (edgeSwipeDetection === "prevent") {
          event.preventDefault();
        } else {
          return;
        }
      }
      Object.assign(data, {
        isTouched: true,
        isMoved: false,
        allowTouchCallbacks: true,
        isScrolling: void 0,
        startMoving: void 0
      });
      touches.startX = startX;
      touches.startY = startY;
      data.touchStartTime = now$1();
      swiper.allowClick = true;
      swiper.updateSize();
      swiper.swipeDirection = void 0;
      if (params.threshold > 0)
        data.allowThresholdMove = false;
      let preventDefault = true;
      if (targetEl.matches(data.focusableElements)) {
        preventDefault = false;
        if (targetEl.nodeName === "SELECT") {
          data.isTouched = false;
        }
      }
      if (document2.activeElement && document2.activeElement.matches(data.focusableElements) && document2.activeElement !== targetEl) {
        document2.activeElement.blur();
      }
      const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
      if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !targetEl.isContentEditable) {
        e.preventDefault();
      }
      if (params.freeMode && params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) {
        swiper.freeMode.onTouchStart();
      }
      swiper.emit("touchStart", e);
    }
    function onTouchMove(event) {
      const document2 = getDocument();
      const swiper = this;
      const data = swiper.touchEventsData;
      const {
        params,
        touches,
        rtlTranslate: rtl,
        enabled
      } = swiper;
      if (!enabled)
        return;
      if (!params.simulateTouch && event.pointerType === "mouse")
        return;
      let e = event;
      if (e.originalEvent)
        e = e.originalEvent;
      if (!data.isTouched) {
        if (data.startMoving && data.isScrolling) {
          swiper.emit("touchMoveOpposite", e);
        }
        return;
      }
      const pointerIndex = data.evCache.findIndex((cachedEv) => cachedEv.pointerId === e.pointerId);
      if (pointerIndex >= 0)
        data.evCache[pointerIndex] = e;
      const targetTouch = data.evCache.length > 1 ? data.evCache[0] : e;
      const pageX = targetTouch.pageX;
      const pageY = targetTouch.pageY;
      if (e.preventedByNestedSwiper) {
        touches.startX = pageX;
        touches.startY = pageY;
        return;
      }
      if (!swiper.allowTouchMove) {
        if (!e.target.matches(data.focusableElements)) {
          swiper.allowClick = false;
        }
        if (data.isTouched) {
          Object.assign(touches, {
            startX: pageX,
            startY: pageY,
            prevX: swiper.touches.currentX,
            prevY: swiper.touches.currentY,
            currentX: pageX,
            currentY: pageY
          });
          data.touchStartTime = now$1();
        }
        return;
      }
      if (params.touchReleaseOnEdges && !params.loop) {
        if (swiper.isVertical()) {
          if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
            data.isTouched = false;
            data.isMoved = false;
            return;
          }
        } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) {
          return;
        }
      }
      if (document2.activeElement) {
        if (e.target === document2.activeElement && e.target.matches(data.focusableElements)) {
          data.isMoved = true;
          swiper.allowClick = false;
          return;
        }
      }
      if (data.allowTouchCallbacks) {
        swiper.emit("touchMove", e);
      }
      if (e.targetTouches && e.targetTouches.length > 1)
        return;
      touches.currentX = pageX;
      touches.currentY = pageY;
      const diffX = touches.currentX - touches.startX;
      const diffY = touches.currentY - touches.startY;
      if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold)
        return;
      if (typeof data.isScrolling === "undefined") {
        let touchAngle;
        if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
          data.isScrolling = false;
        } else {
          if (diffX * diffX + diffY * diffY >= 25) {
            touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
            data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
          }
        }
      }
      if (data.isScrolling) {
        swiper.emit("touchMoveOpposite", e);
      }
      if (typeof data.startMoving === "undefined") {
        if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
          data.startMoving = true;
        }
      }
      if (data.isScrolling || swiper.zoom && swiper.params.zoom && swiper.params.zoom.enabled && data.evCache.length > 1) {
        data.isTouched = false;
        return;
      }
      if (!data.startMoving) {
        return;
      }
      swiper.allowClick = false;
      if (!params.cssMode && e.cancelable) {
        e.preventDefault();
      }
      if (params.touchMoveStopPropagation && !params.nested) {
        e.stopPropagation();
      }
      let diff2 = swiper.isHorizontal() ? diffX : diffY;
      let touchesDiff = swiper.isHorizontal() ? touches.currentX - touches.previousX : touches.currentY - touches.previousY;
      if (params.oneWayMovement) {
        diff2 = Math.abs(diff2) * (rtl ? 1 : -1);
        touchesDiff = Math.abs(touchesDiff) * (rtl ? 1 : -1);
      }
      touches.diff = diff2;
      diff2 *= params.touchRatio;
      if (rtl) {
        diff2 = -diff2;
        touchesDiff = -touchesDiff;
      }
      const prevTouchesDirection = swiper.touchesDirection;
      swiper.swipeDirection = diff2 > 0 ? "prev" : "next";
      swiper.touchesDirection = touchesDiff > 0 ? "prev" : "next";
      const isLoop = swiper.params.loop && !params.cssMode;
      if (!data.isMoved) {
        if (isLoop) {
          swiper.loopFix({
            direction: swiper.swipeDirection
          });
        }
        data.startTranslate = swiper.getTranslate();
        swiper.setTransition(0);
        if (swiper.animating) {
          const evt = new window.CustomEvent("transitionend", {
            bubbles: true,
            cancelable: true
          });
          swiper.wrapperEl.dispatchEvent(evt);
        }
        data.allowMomentumBounce = false;
        if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
          swiper.setGrabCursor(true);
        }
        swiper.emit("sliderFirstMove", e);
      }
      let loopFixed;
      if (data.isMoved && prevTouchesDirection !== swiper.touchesDirection && isLoop && Math.abs(diff2) >= 1) {
        swiper.loopFix({
          direction: swiper.swipeDirection,
          setTranslate: true
        });
        loopFixed = true;
      }
      swiper.emit("sliderMove", e);
      data.isMoved = true;
      data.currentTranslate = diff2 + data.startTranslate;
      let disableParentSwiper = true;
      let resistanceRatio = params.resistanceRatio;
      if (params.touchReleaseOnEdges) {
        resistanceRatio = 0;
      }
      if (diff2 > 0) {
        if (isLoop && !loopFixed && data.currentTranslate > (params.centeredSlides ? swiper.minTranslate() - swiper.size / 2 : swiper.minTranslate())) {
          swiper.loopFix({
            direction: "prev",
            setTranslate: true,
            activeSlideIndex: 0
          });
        }
        if (data.currentTranslate > swiper.minTranslate()) {
          disableParentSwiper = false;
          if (params.resistance) {
            data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff2) ** resistanceRatio;
          }
        }
      } else if (diff2 < 0) {
        if (isLoop && !loopFixed && data.currentTranslate < (params.centeredSlides ? swiper.maxTranslate() + swiper.size / 2 : swiper.maxTranslate())) {
          swiper.loopFix({
            direction: "next",
            setTranslate: true,
            activeSlideIndex: swiper.slides.length - (params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10)))
          });
        }
        if (data.currentTranslate < swiper.maxTranslate()) {
          disableParentSwiper = false;
          if (params.resistance) {
            data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff2) ** resistanceRatio;
          }
        }
      }
      if (disableParentSwiper) {
        e.preventedByNestedSwiper = true;
      }
      if (!swiper.allowSlideNext && swiper.swipeDirection === "next" && data.currentTranslate < data.startTranslate) {
        data.currentTranslate = data.startTranslate;
      }
      if (!swiper.allowSlidePrev && swiper.swipeDirection === "prev" && data.currentTranslate > data.startTranslate) {
        data.currentTranslate = data.startTranslate;
      }
      if (!swiper.allowSlidePrev && !swiper.allowSlideNext) {
        data.currentTranslate = data.startTranslate;
      }
      if (params.threshold > 0) {
        if (Math.abs(diff2) > params.threshold || data.allowThresholdMove) {
          if (!data.allowThresholdMove) {
            data.allowThresholdMove = true;
            touches.startX = touches.currentX;
            touches.startY = touches.currentY;
            data.currentTranslate = data.startTranslate;
            touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
            return;
          }
        } else {
          data.currentTranslate = data.startTranslate;
          return;
        }
      }
      if (!params.followFinger || params.cssMode)
        return;
      if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }
      if (params.freeMode && params.freeMode.enabled && swiper.freeMode) {
        swiper.freeMode.onTouchMove();
      }
      swiper.updateProgress(data.currentTranslate);
      swiper.setTranslate(data.currentTranslate);
    }
    function onTouchEnd(event) {
      const swiper = this;
      const data = swiper.touchEventsData;
      const pointerIndex = data.evCache.findIndex((cachedEv) => cachedEv.pointerId === event.pointerId);
      if (pointerIndex >= 0) {
        data.evCache.splice(pointerIndex, 1);
      }
      if (["pointercancel", "pointerout", "pointerleave"].includes(event.type)) {
        const proceed = event.type === "pointercancel" && (swiper.browser.isSafari || swiper.browser.isWebView);
        if (!proceed) {
          return;
        }
      }
      const {
        params,
        touches,
        rtlTranslate: rtl,
        slidesGrid,
        enabled
      } = swiper;
      if (!enabled)
        return;
      if (!params.simulateTouch && event.pointerType === "mouse")
        return;
      let e = event;
      if (e.originalEvent)
        e = e.originalEvent;
      if (data.allowTouchCallbacks) {
        swiper.emit("touchEnd", e);
      }
      data.allowTouchCallbacks = false;
      if (!data.isTouched) {
        if (data.isMoved && params.grabCursor) {
          swiper.setGrabCursor(false);
        }
        data.isMoved = false;
        data.startMoving = false;
        return;
      }
      if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
        swiper.setGrabCursor(false);
      }
      const touchEndTime = now$1();
      const timeDiff = touchEndTime - data.touchStartTime;
      if (swiper.allowClick) {
        const pathTree = e.path || e.composedPath && e.composedPath();
        swiper.updateClickedSlide(pathTree && pathTree[0] || e.target);
        swiper.emit("tap click", e);
        if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
          swiper.emit("doubleTap doubleClick", e);
        }
      }
      data.lastClickTime = now$1();
      nextTick(() => {
        if (!swiper.destroyed)
          swiper.allowClick = true;
      });
      if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
        data.isTouched = false;
        data.isMoved = false;
        data.startMoving = false;
        return;
      }
      data.isTouched = false;
      data.isMoved = false;
      data.startMoving = false;
      let currentPos;
      if (params.followFinger) {
        currentPos = rtl ? swiper.translate : -swiper.translate;
      } else {
        currentPos = -data.currentTranslate;
      }
      if (params.cssMode) {
        return;
      }
      if (params.freeMode && params.freeMode.enabled) {
        swiper.freeMode.onTouchEnd({
          currentPos
        });
        return;
      }
      let stopIndex = 0;
      let groupSize = swiper.slidesSizesGrid[0];
      for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
        const increment2 = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
        if (typeof slidesGrid[i + increment2] !== "undefined") {
          if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment2]) {
            stopIndex = i;
            groupSize = slidesGrid[i + increment2] - slidesGrid[i];
          }
        } else if (currentPos >= slidesGrid[i]) {
          stopIndex = i;
          groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
        }
      }
      let rewindFirstIndex = null;
      let rewindLastIndex = null;
      if (params.rewind) {
        if (swiper.isBeginning) {
          rewindLastIndex = params.virtual && params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
        } else if (swiper.isEnd) {
          rewindFirstIndex = 0;
        }
      }
      const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
      const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
      if (timeDiff > params.longSwipesMs) {
        if (!params.longSwipes) {
          swiper.slideTo(swiper.activeIndex);
          return;
        }
        if (swiper.swipeDirection === "next") {
          if (ratio >= params.longSwipesRatio)
            swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment);
          else
            swiper.slideTo(stopIndex);
        }
        if (swiper.swipeDirection === "prev") {
          if (ratio > 1 - params.longSwipesRatio) {
            swiper.slideTo(stopIndex + increment);
          } else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) {
            swiper.slideTo(rewindLastIndex);
          } else {
            swiper.slideTo(stopIndex);
          }
        }
      } else {
        if (!params.shortSwipes) {
          swiper.slideTo(swiper.activeIndex);
          return;
        }
        const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
        if (!isNavButtonTarget) {
          if (swiper.swipeDirection === "next") {
            swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
          }
          if (swiper.swipeDirection === "prev") {
            swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
          }
        } else if (e.target === swiper.navigation.nextEl) {
          swiper.slideTo(stopIndex + increment);
        } else {
          swiper.slideTo(stopIndex);
        }
      }
    }
    function onResize() {
      const swiper = this;
      const {
        params,
        el
      } = swiper;
      if (el && el.offsetWidth === 0)
        return;
      if (params.breakpoints) {
        swiper.setBreakpoint();
      }
      const {
        allowSlideNext,
        allowSlidePrev,
        snapGrid
      } = swiper;
      const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
      swiper.allowSlideNext = true;
      swiper.allowSlidePrev = true;
      swiper.updateSize();
      swiper.updateSlides();
      swiper.updateSlidesClasses();
      const isVirtualLoop = isVirtual && params.loop;
      if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides && !isVirtualLoop) {
        swiper.slideTo(swiper.slides.length - 1, 0, false, true);
      } else {
        if (swiper.params.loop && !isVirtual) {
          swiper.slideToLoop(swiper.realIndex, 0, false, true);
        } else {
          swiper.slideTo(swiper.activeIndex, 0, false, true);
        }
      }
      if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
        clearTimeout(swiper.autoplay.resizeTimeout);
        swiper.autoplay.resizeTimeout = setTimeout(() => {
          if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
            swiper.autoplay.resume();
          }
        }, 500);
      }
      swiper.allowSlidePrev = allowSlidePrev;
      swiper.allowSlideNext = allowSlideNext;
      if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
        swiper.checkOverflow();
      }
    }
    function onClick(e) {
      const swiper = this;
      if (!swiper.enabled)
        return;
      if (!swiper.allowClick) {
        if (swiper.params.preventClicks)
          e.preventDefault();
        if (swiper.params.preventClicksPropagation && swiper.animating) {
          e.stopPropagation();
          e.stopImmediatePropagation();
        }
      }
    }
    function onScroll() {
      const swiper = this;
      const {
        wrapperEl,
        rtlTranslate,
        enabled
      } = swiper;
      if (!enabled)
        return;
      swiper.previousTranslate = swiper.translate;
      if (swiper.isHorizontal()) {
        swiper.translate = -wrapperEl.scrollLeft;
      } else {
        swiper.translate = -wrapperEl.scrollTop;
      }
      if (swiper.translate === 0)
        swiper.translate = 0;
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
      let newProgress;
      const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
      if (translatesDiff === 0) {
        newProgress = 0;
      } else {
        newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
      }
      if (newProgress !== swiper.progress) {
        swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
      }
      swiper.emit("setTranslate", swiper.translate, false);
    }
    function onLoad(e) {
      const swiper = this;
      processLazyPreloader(swiper, e.target);
      if (swiper.params.cssMode || swiper.params.slidesPerView !== "auto" && !swiper.params.autoHeight) {
        return;
      }
      swiper.update();
    }
    let dummyEventAttached = false;
    function dummyEventListener() {
    }
    const events = (swiper, method) => {
      const document2 = getDocument();
      const {
        params,
        el,
        wrapperEl,
        device
      } = swiper;
      const capture = !!params.nested;
      const domMethod = method === "on" ? "addEventListener" : "removeEventListener";
      const swiperMethod = method;
      el[domMethod]("pointerdown", swiper.onTouchStart, {
        passive: false
      });
      document2[domMethod]("pointermove", swiper.onTouchMove, {
        passive: false,
        capture
      });
      document2[domMethod]("pointerup", swiper.onTouchEnd, {
        passive: true
      });
      document2[domMethod]("pointercancel", swiper.onTouchEnd, {
        passive: true
      });
      document2[domMethod]("pointerout", swiper.onTouchEnd, {
        passive: true
      });
      document2[domMethod]("pointerleave", swiper.onTouchEnd, {
        passive: true
      });
      if (params.preventClicks || params.preventClicksPropagation) {
        el[domMethod]("click", swiper.onClick, true);
      }
      if (params.cssMode) {
        wrapperEl[domMethod]("scroll", swiper.onScroll);
      }
      if (params.updateOnWindowResize) {
        swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true);
      } else {
        swiper[swiperMethod]("observerUpdate", onResize, true);
      }
      el[domMethod]("load", swiper.onLoad, {
        capture: true
      });
    };
    function attachEvents() {
      const swiper = this;
      const document2 = getDocument();
      const {
        params
      } = swiper;
      swiper.onTouchStart = onTouchStart.bind(swiper);
      swiper.onTouchMove = onTouchMove.bind(swiper);
      swiper.onTouchEnd = onTouchEnd.bind(swiper);
      if (params.cssMode) {
        swiper.onScroll = onScroll.bind(swiper);
      }
      swiper.onClick = onClick.bind(swiper);
      swiper.onLoad = onLoad.bind(swiper);
      if (!dummyEventAttached) {
        document2.addEventListener("touchstart", dummyEventListener);
        dummyEventAttached = true;
      }
      events(swiper, "on");
    }
    function detachEvents() {
      const swiper = this;
      events(swiper, "off");
    }
    const events$1 = {
      attachEvents,
      detachEvents
    };
    const isGridEnabled = (swiper, params) => {
      return swiper.grid && params.grid && params.grid.rows > 1;
    };
    function setBreakpoint() {
      const swiper = this;
      const {
        realIndex,
        initialized,
        params,
        el
      } = swiper;
      const breakpoints2 = params.breakpoints;
      if (!breakpoints2 || breakpoints2 && Object.keys(breakpoints2).length === 0)
        return;
      const breakpoint = swiper.getBreakpoint(breakpoints2, swiper.params.breakpointsBase, swiper.el);
      if (!breakpoint || swiper.currentBreakpoint === breakpoint)
        return;
      const breakpointOnlyParams = breakpoint in breakpoints2 ? breakpoints2[breakpoint] : void 0;
      const breakpointParams = breakpointOnlyParams || swiper.originalParams;
      const wasMultiRow = isGridEnabled(swiper, params);
      const isMultiRow = isGridEnabled(swiper, breakpointParams);
      const wasEnabled = params.enabled;
      if (wasMultiRow && !isMultiRow) {
        el.classList.remove(`${params.containerModifierClass}grid`, `${params.containerModifierClass}grid-column`);
        swiper.emitContainerClasses();
      } else if (!wasMultiRow && isMultiRow) {
        el.classList.add(`${params.containerModifierClass}grid`);
        if (breakpointParams.grid.fill && breakpointParams.grid.fill === "column" || !breakpointParams.grid.fill && params.grid.fill === "column") {
          el.classList.add(`${params.containerModifierClass}grid-column`);
        }
        swiper.emitContainerClasses();
      }
      ["navigation", "pagination", "scrollbar"].forEach((prop) => {
        if (typeof breakpointParams[prop] === "undefined")
          return;
        const wasModuleEnabled = params[prop] && params[prop].enabled;
        const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
        if (wasModuleEnabled && !isModuleEnabled) {
          swiper[prop].disable();
        }
        if (!wasModuleEnabled && isModuleEnabled) {
          swiper[prop].enable();
        }
      });
      const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
      const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
      if (directionChanged && initialized) {
        swiper.changeDirection();
      }
      extend$2(swiper.params, breakpointParams);
      const isEnabled = swiper.params.enabled;
      Object.assign(swiper, {
        allowTouchMove: swiper.params.allowTouchMove,
        allowSlideNext: swiper.params.allowSlideNext,
        allowSlidePrev: swiper.params.allowSlidePrev
      });
      if (wasEnabled && !isEnabled) {
        swiper.disable();
      } else if (!wasEnabled && isEnabled) {
        swiper.enable();
      }
      swiper.currentBreakpoint = breakpoint;
      swiper.emit("_beforeBreakpoint", breakpointParams);
      if (needsReLoop && initialized) {
        swiper.loopDestroy();
        swiper.loopCreate(realIndex);
        swiper.updateSlides();
      }
      swiper.emit("breakpoint", breakpointParams);
    }
    function getBreakpoint(breakpoints2, base = "window", containerEl) {
      if (!breakpoints2 || base === "container" && !containerEl)
        return void 0;
      let breakpoint = false;
      const window2 = getWindow();
      const currentHeight = base === "window" ? window2.innerHeight : containerEl.clientHeight;
      const points = Object.keys(breakpoints2).map((point) => {
        if (typeof point === "string" && point.indexOf("@") === 0) {
          const minRatio = parseFloat(point.substr(1));
          const value = currentHeight * minRatio;
          return {
            value,
            point
          };
        }
        return {
          value: point,
          point
        };
      });
      points.sort((a, b2) => parseInt(a.value, 10) - parseInt(b2.value, 10));
      for (let i = 0; i < points.length; i += 1) {
        const {
          point,
          value
        } = points[i];
        if (base === "window") {
          if (window2.matchMedia(`(min-width: ${value}px)`).matches) {
            breakpoint = point;
          }
        } else if (value <= containerEl.clientWidth) {
          breakpoint = point;
        }
      }
      return breakpoint || "max";
    }
    const breakpoints = {
      setBreakpoint,
      getBreakpoint
    };
    function prepareClasses(entries, prefix) {
      const resultClasses = [];
      entries.forEach((item) => {
        if (typeof item === "object") {
          Object.keys(item).forEach((classNames) => {
            if (item[classNames]) {
              resultClasses.push(prefix + classNames);
            }
          });
        } else if (typeof item === "string") {
          resultClasses.push(prefix + item);
        }
      });
      return resultClasses;
    }
    function addClasses() {
      const swiper = this;
      const {
        classNames,
        params,
        rtl,
        el,
        device
      } = swiper;
      const suffixes = prepareClasses(["initialized", params.direction, {
        "free-mode": swiper.params.freeMode && params.freeMode.enabled
      }, {
          "autoheight": params.autoHeight
        }, {
          "rtl": rtl
        }, {
          "grid": params.grid && params.grid.rows > 1
        }, {
          "grid-column": params.grid && params.grid.rows > 1 && params.grid.fill === "column"
        }, {
          "android": device.android
        }, {
          "ios": device.ios
        }, {
          "css-mode": params.cssMode
        }, {
          "centered": params.cssMode && params.centeredSlides
        }, {
          "watch-progress": params.watchSlidesProgress
        }], params.containerModifierClass);
      classNames.push(...suffixes);
      el.classList.add(...classNames);
      swiper.emitContainerClasses();
    }
    function removeClasses() {
      const swiper = this;
      const {
        el,
        classNames
      } = swiper;
      el.classList.remove(...classNames);
      swiper.emitContainerClasses();
    }
    const classes = {
      addClasses,
      removeClasses
    };
    function checkOverflow$1() {
      const swiper = this;
      const {
        isLocked: wasLocked,
        params
      } = swiper;
      const {
        slidesOffsetBefore
      } = params;
      if (slidesOffsetBefore) {
        const lastSlideIndex = swiper.slides.length - 1;
        const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
        swiper.isLocked = swiper.size > lastSlideRightEdge;
      } else {
        swiper.isLocked = swiper.snapGrid.length === 1;
      }
      if (params.allowSlideNext === true) {
        swiper.allowSlideNext = !swiper.isLocked;
      }
      if (params.allowSlidePrev === true) {
        swiper.allowSlidePrev = !swiper.isLocked;
      }
      if (wasLocked && wasLocked !== swiper.isLocked) {
        swiper.isEnd = false;
      }
      if (wasLocked !== swiper.isLocked) {
        swiper.emit(swiper.isLocked ? "lock" : "unlock");
      }
    }
    const checkOverflow$2 = {
      checkOverflow: checkOverflow$1
    };
    const defaults$3 = {
      init: true,
      direction: "horizontal",
      oneWayMovement: false,
      touchEventsTarget: "wrapper",
      initialSlide: 0,
      speed: 300,
      cssMode: false,
      updateOnWindowResize: true,
      resizeObserver: true,
      nested: false,
      createElements: false,
      enabled: true,
      focusableElements: "input, select, option, textarea, button, video, label",
      // Overrides
      width: null,
      height: null,
      //
      preventInteractionOnTransition: false,
      // ssr
      userAgent: null,
      url: null,
      // To support iOS's swipe-to-go-back gesture (when being used in-app).
      edgeSwipeDetection: false,
      edgeSwipeThreshold: 20,
      // Autoheight
      autoHeight: false,
      // Set wrapper width
      setWrapperSize: false,
      // Virtual Translate
      virtualTranslate: false,
      // Effects
      effect: "slide",
      // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
      // Breakpoints
      breakpoints: void 0,
      breakpointsBase: "window",
      // Slides grid
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerGroup: 1,
      slidesPerGroupSkip: 0,
      slidesPerGroupAuto: false,
      centeredSlides: false,
      centeredSlidesBounds: false,
      slidesOffsetBefore: 0,
      // in px
      slidesOffsetAfter: 0,
      // in px
      normalizeSlideIndex: true,
      centerInsufficientSlides: false,
      // Disable swiper and hide navigation when container not overflow
      watchOverflow: true,
      // Round length
      roundLengths: false,
      // Touches
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: true,
      shortSwipes: true,
      longSwipes: true,
      longSwipesRatio: 0.5,
      longSwipesMs: 300,
      followFinger: true,
      allowTouchMove: true,
      threshold: 5,
      touchMoveStopPropagation: false,
      touchStartPreventDefault: true,
      touchStartForcePreventDefault: false,
      touchReleaseOnEdges: false,
      // Unique Navigation Elements
      uniqueNavElements: true,
      // Resistance
      resistance: true,
      resistanceRatio: 0.85,
      // Progress
      watchSlidesProgress: false,
      // Cursor
      grabCursor: false,
      // Clicks
      preventClicks: true,
      preventClicksPropagation: true,
      slideToClickedSlide: false,
      // loop
      loop: false,
      loopedSlides: null,
      loopPreventsSliding: true,
      // rewind
      rewind: false,
      // Swiping/no swiping
      allowSlidePrev: true,
      allowSlideNext: true,
      swipeHandler: null,
      // '.swipe-handler',
      noSwiping: true,
      noSwipingClass: "swiper-no-swiping",
      noSwipingSelector: null,
      // Passive Listeners
      passiveListeners: true,
      maxBackfaceHiddenSlides: 10,
      // NS
      containerModifierClass: "swiper-",
      // NEW
      slideClass: "swiper-slide",
      slideActiveClass: "swiper-slide-active",
      slideVisibleClass: "swiper-slide-visible",
      slideNextClass: "swiper-slide-next",
      slidePrevClass: "swiper-slide-prev",
      wrapperClass: "swiper-wrapper",
      lazyPreloaderClass: "swiper-lazy-preloader",
      lazyPreloadPrevNext: 0,
      // Callbacks
      runCallbacksOnInit: true,
      // Internals
      _emitClasses: false
    };
    function moduleExtendParams(params, allModulesParams) {
      return function extendParams(obj = {}) {
        const moduleParamName = Object.keys(obj)[0];
        const moduleParams = obj[moduleParamName];
        if (typeof moduleParams !== "object" || moduleParams === null) {
          extend$2(allModulesParams, obj);
          return;
        }
        if (["navigation", "pagination", "scrollbar"].indexOf(moduleParamName) >= 0 && params[moduleParamName] === true) {
          params[moduleParamName] = {
            auto: true
          };
        }
        if (!(moduleParamName in params && "enabled" in moduleParams)) {
          extend$2(allModulesParams, obj);
          return;
        }
        if (params[moduleParamName] === true) {
          params[moduleParamName] = {
            enabled: true
          };
        }
        if (typeof params[moduleParamName] === "object" && !("enabled" in params[moduleParamName])) {
          params[moduleParamName].enabled = true;
        }
        if (!params[moduleParamName])
          params[moduleParamName] = {
            enabled: false
          };
        extend$2(allModulesParams, obj);
      };
    }
    const prototypes = {
      eventsEmitter,
      update,
      translate,
      transition,
      slide,
      loop,
      grabCursor,
      events: events$1,
      breakpoints,
      checkOverflow: checkOverflow$2,
      classes
    };
    const extendedDefaults = {};
    class Swiper {
      constructor(...args) {
        let el;
        let params;
        if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === "Object") {
          params = args[0];
        } else {
          [el, params] = args;
        }
        if (!params)
          params = {};
        params = extend$2({}, params);
        if (el && !params.el)
          params.el = el;
        const document2 = getDocument();
        if (params.el && typeof params.el === "string" && document2.querySelectorAll(params.el).length > 1) {
          const swipers = [];
          document2.querySelectorAll(params.el).forEach((containerEl) => {
            const newParams = extend$2({}, params, {
              el: containerEl
            });
            swipers.push(new Swiper(newParams));
          });
          return swipers;
        }
        const swiper = this;
        swiper.__swiper__ = true;
        swiper.support = getSupport();
        swiper.device = getDevice({
          userAgent: params.userAgent
        });
        swiper.browser = getBrowser();
        swiper.eventsListeners = {};
        swiper.eventsAnyListeners = [];
        swiper.modules = [...swiper.__modules__];
        if (params.modules && Array.isArray(params.modules)) {
          swiper.modules.push(...params.modules);
        }
        const allModulesParams = {};
        swiper.modules.forEach((mod2) => {
          mod2({
            params,
            swiper,
            extendParams: moduleExtendParams(params, allModulesParams),
            on: swiper.on.bind(swiper),
            once: swiper.once.bind(swiper),
            off: swiper.off.bind(swiper),
            emit: swiper.emit.bind(swiper)
          });
        });
        const swiperParams = extend$2({}, defaults$3, allModulesParams);
        swiper.params = extend$2({}, swiperParams, extendedDefaults, params);
        swiper.originalParams = extend$2({}, swiper.params);
        swiper.passedParams = extend$2({}, params);
        if (swiper.params && swiper.params.on) {
          Object.keys(swiper.params.on).forEach((eventName) => {
            swiper.on(eventName, swiper.params.on[eventName]);
          });
        }
        if (swiper.params && swiper.params.onAny) {
          swiper.onAny(swiper.params.onAny);
        }
        Object.assign(swiper, {
          enabled: swiper.params.enabled,
          el,
          // Classes
          classNames: [],
          // Slides
          slides: [],
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          // isDirection
          isHorizontal() {
            return swiper.params.direction === "horizontal";
          },
          isVertical() {
            return swiper.params.direction === "vertical";
          },
          // Indexes
          activeIndex: 0,
          realIndex: 0,
          //
          isBeginning: true,
          isEnd: false,
          // Props
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: false,
          cssOverflowAdjustment() {
            return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
          },
          // Locks
          allowSlideNext: swiper.params.allowSlideNext,
          allowSlidePrev: swiper.params.allowSlidePrev,
          // Touch Events
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            // Form elements to match
            focusableElements: swiper.params.focusableElements,
            // Last click time
            lastClickTime: 0,
            clickTimeout: void 0,
            // Velocities
            velocities: [],
            allowMomentumBounce: void 0,
            startMoving: void 0,
            evCache: []
          },
          // Clicks
          allowClick: true,
          // Touches
          allowTouchMove: swiper.params.allowTouchMove,
          touches: {
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            diff: 0
          },
          // Images
          imagesToLoad: [],
          imagesLoaded: 0
        });
        swiper.emit("_swiper");
        if (swiper.params.init) {
          swiper.init();
        }
        return swiper;
      }
      getSlideIndex(slideEl) {
        const {
          slidesEl,
          params
        } = this;
        const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
        const firstSlideIndex = elementIndex(slides[0]);
        return elementIndex(slideEl) - firstSlideIndex;
      }
      getSlideIndexByData(index) {
        return this.getSlideIndex(this.slides.filter((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === index)[0]);
      }
      recalcSlides() {
        const swiper = this;
        const {
          slidesEl,
          params
        } = swiper;
        swiper.slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
      }
      enable() {
        const swiper = this;
        if (swiper.enabled)
          return;
        swiper.enabled = true;
        if (swiper.params.grabCursor) {
          swiper.setGrabCursor();
        }
        swiper.emit("enable");
      }
      disable() {
        const swiper = this;
        if (!swiper.enabled)
          return;
        swiper.enabled = false;
        if (swiper.params.grabCursor) {
          swiper.unsetGrabCursor();
        }
        swiper.emit("disable");
      }
      setProgress(progress, speed) {
        const swiper = this;
        progress = Math.min(Math.max(progress, 0), 1);
        const min2 = swiper.minTranslate();
        const max2 = swiper.maxTranslate();
        const current = (max2 - min2) * progress + min2;
        swiper.translateTo(current, typeof speed === "undefined" ? 0 : speed);
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }
      emitContainerClasses() {
        const swiper = this;
        if (!swiper.params._emitClasses || !swiper.el)
          return;
        const cls = swiper.el.className.split(" ").filter((className) => {
          return className.indexOf("swiper") === 0 || className.indexOf(swiper.params.containerModifierClass) === 0;
        });
        swiper.emit("_containerClasses", cls.join(" "));
      }
      getSlideClasses(slideEl) {
        const swiper = this;
        if (swiper.destroyed)
          return "";
        return slideEl.className.split(" ").filter((className) => {
          return className.indexOf("swiper-slide") === 0 || className.indexOf(swiper.params.slideClass) === 0;
        }).join(" ");
      }
      emitSlidesClasses() {
        const swiper = this;
        if (!swiper.params._emitClasses || !swiper.el)
          return;
        const updates = [];
        swiper.slides.forEach((slideEl) => {
          const classNames = swiper.getSlideClasses(slideEl);
          updates.push({
            slideEl,
            classNames
          });
          swiper.emit("_slideClass", slideEl, classNames);
        });
        swiper.emit("_slideClasses", updates);
      }
      slidesPerViewDynamic(view = "current", exact = false) {
        const swiper = this;
        const {
          params,
          slides,
          slidesGrid,
          slidesSizesGrid,
          size: swiperSize,
          activeIndex
        } = swiper;
        let spv = 1;
        if (params.centeredSlides) {
          let slideSize = slides[activeIndex] ? slides[activeIndex].swiperSlideSize : 0;
          let breakLoop;
          for (let i = activeIndex + 1; i < slides.length; i += 1) {
            if (slides[i] && !breakLoop) {
              slideSize += slides[i].swiperSlideSize;
              spv += 1;
              if (slideSize > swiperSize)
                breakLoop = true;
            }
          }
          for (let i = activeIndex - 1; i >= 0; i -= 1) {
            if (slides[i] && !breakLoop) {
              slideSize += slides[i].swiperSlideSize;
              spv += 1;
              if (slideSize > swiperSize)
                breakLoop = true;
            }
          }
        } else {
          if (view === "current") {
            for (let i = activeIndex + 1; i < slides.length; i += 1) {
              const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
              if (slideInView) {
                spv += 1;
              }
            }
          } else {
            for (let i = activeIndex - 1; i >= 0; i -= 1) {
              const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
              if (slideInView) {
                spv += 1;
              }
            }
          }
        }
        return spv;
      }
      update() {
        const swiper = this;
        if (!swiper || swiper.destroyed)
          return;
        const {
          snapGrid,
          params
        } = swiper;
        if (params.breakpoints) {
          swiper.setBreakpoint();
        }
        [...swiper.el.querySelectorAll('[loading="lazy"]')].forEach((imageEl) => {
          if (imageEl.complete) {
            processLazyPreloader(swiper, imageEl);
          }
        });
        swiper.updateSize();
        swiper.updateSlides();
        swiper.updateProgress();
        swiper.updateSlidesClasses();
        function setTranslate2() {
          const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
          const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
          swiper.setTranslate(newTranslate);
          swiper.updateActiveIndex();
          swiper.updateSlidesClasses();
        }
        let translated;
        if (params.freeMode && params.freeMode.enabled && !params.cssMode) {
          setTranslate2();
          if (params.autoHeight) {
            swiper.updateAutoHeight();
          }
        } else {
          if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !params.centeredSlides) {
            const slides = swiper.virtual && params.virtual.enabled ? swiper.virtual.slides : swiper.slides;
            translated = swiper.slideTo(slides.length - 1, 0, false, true);
          } else {
            translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
          }
          if (!translated) {
            setTranslate2();
          }
        }
        if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
          swiper.checkOverflow();
        }
        swiper.emit("update");
      }
      changeDirection(newDirection, needUpdate = true) {
        const swiper = this;
        const currentDirection = swiper.params.direction;
        if (!newDirection) {
          newDirection = currentDirection === "horizontal" ? "vertical" : "horizontal";
        }
        if (newDirection === currentDirection || newDirection !== "horizontal" && newDirection !== "vertical") {
          return swiper;
        }
        swiper.el.classList.remove(`${swiper.params.containerModifierClass}${currentDirection}`);
        swiper.el.classList.add(`${swiper.params.containerModifierClass}${newDirection}`);
        swiper.emitContainerClasses();
        swiper.params.direction = newDirection;
        swiper.slides.forEach((slideEl) => {
          if (newDirection === "vertical") {
            slideEl.style.width = "";
          } else {
            slideEl.style.height = "";
          }
        });
        swiper.emit("changeDirection");
        if (needUpdate)
          swiper.update();
        return swiper;
      }
      changeLanguageDirection(direction) {
        const swiper = this;
        if (swiper.rtl && direction === "rtl" || !swiper.rtl && direction === "ltr")
          return;
        swiper.rtl = direction === "rtl";
        swiper.rtlTranslate = swiper.params.direction === "horizontal" && swiper.rtl;
        if (swiper.rtl) {
          swiper.el.classList.add(`${swiper.params.containerModifierClass}rtl`);
          swiper.el.dir = "rtl";
        } else {
          swiper.el.classList.remove(`${swiper.params.containerModifierClass}rtl`);
          swiper.el.dir = "ltr";
        }
        swiper.update();
      }
      mount(element) {
        const swiper = this;
        if (swiper.mounted)
          return true;
        let el = element || swiper.params.el;
        if (typeof el === "string") {
          el = document.querySelector(el);
        }
        if (!el) {
          return false;
        }
        el.swiper = swiper;
        if (el.shadowEl) {
          swiper.isElement = true;
        }
        const getWrapperSelector = () => {
          return `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
        };
        const getWrapper = () => {
          if (el && el.shadowRoot && el.shadowRoot.querySelector) {
            const res = el.shadowRoot.querySelector(getWrapperSelector());
            return res;
          }
          return elementChildren(el, getWrapperSelector())[0];
        };
        let wrapperEl = getWrapper();
        if (!wrapperEl && swiper.params.createElements) {
          wrapperEl = createElement$1("div", swiper.params.wrapperClass);
          el.append(wrapperEl);
          elementChildren(el, `.${swiper.params.slideClass}`).forEach((slideEl) => {
            wrapperEl.append(slideEl);
          });
        }
        Object.assign(swiper, {
          el,
          wrapperEl,
          slidesEl: swiper.isElement ? el : wrapperEl,
          mounted: true,
          // RTL
          rtl: el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl",
          rtlTranslate: swiper.params.direction === "horizontal" && (el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl"),
          wrongRTL: elementStyle(wrapperEl, "display") === "-webkit-box"
        });
        return true;
      }
      init(el) {
        const swiper = this;
        if (swiper.initialized)
          return swiper;
        const mounted = swiper.mount(el);
        if (mounted === false)
          return swiper;
        swiper.emit("beforeInit");
        if (swiper.params.breakpoints) {
          swiper.setBreakpoint();
        }
        swiper.addClasses();
        swiper.updateSize();
        swiper.updateSlides();
        if (swiper.params.watchOverflow) {
          swiper.checkOverflow();
        }
        if (swiper.params.grabCursor && swiper.enabled) {
          swiper.setGrabCursor();
        }
        if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
          swiper.slideTo(swiper.params.initialSlide + swiper.virtual.slidesBefore, 0, swiper.params.runCallbacksOnInit, false, true);
        } else {
          swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
        }
        if (swiper.params.loop) {
          swiper.loopCreate();
        }
        swiper.attachEvents();
        [...swiper.el.querySelectorAll('[loading="lazy"]')].forEach((imageEl) => {
          if (imageEl.complete) {
            processLazyPreloader(swiper, imageEl);
          } else {
            imageEl.addEventListener("load", (e) => {
              processLazyPreloader(swiper, e.target);
            });
          }
        });
        preload(swiper);
        swiper.initialized = true;
        preload(swiper);
        swiper.emit("init");
        swiper.emit("afterInit");
        return swiper;
      }
      destroy(deleteInstance = true, cleanStyles = true) {
        const swiper = this;
        const {
          params,
          el,
          wrapperEl,
          slides
        } = swiper;
        if (typeof swiper.params === "undefined" || swiper.destroyed) {
          return null;
        }
        swiper.emit("beforeDestroy");
        swiper.initialized = false;
        swiper.detachEvents();
        if (params.loop) {
          swiper.loopDestroy();
        }
        if (cleanStyles) {
          swiper.removeClasses();
          el.removeAttribute("style");
          wrapperEl.removeAttribute("style");
          if (slides && slides.length) {
            slides.forEach((slideEl) => {
              slideEl.classList.remove(params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
              slideEl.removeAttribute("style");
              slideEl.removeAttribute("data-swiper-slide-index");
            });
          }
        }
        swiper.emit("destroy");
        Object.keys(swiper.eventsListeners).forEach((eventName) => {
          swiper.off(eventName);
        });
        if (deleteInstance !== false) {
          swiper.el.swiper = null;
          deleteProps(swiper);
        }
        swiper.destroyed = true;
        return null;
      }
      static extendDefaults(newDefaults) {
        extend$2(extendedDefaults, newDefaults);
      }
      static get extendedDefaults() {
        return extendedDefaults;
      }
      static get defaults() {
        return defaults$3;
      }
      static installModule(mod2) {
        if (!Swiper.prototype.__modules__)
          Swiper.prototype.__modules__ = [];
        const modules = Swiper.prototype.__modules__;
        if (typeof mod2 === "function" && modules.indexOf(mod2) < 0) {
          modules.push(mod2);
        }
      }
      static use(module2) {
        if (Array.isArray(module2)) {
          module2.forEach((m) => Swiper.installModule(m));
          return Swiper;
        }
        Swiper.installModule(module2);
        return Swiper;
      }
    }
    Object.keys(prototypes).forEach((prototypeGroup) => {
      Object.keys(prototypes[prototypeGroup]).forEach((protoMethod) => {
        Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
      });
    });
    Swiper.use([Resize, Observer]);
    function createElementIfNotDefined(swiper, originalParams, params, checkProps) {
      if (swiper.params.createElements) {
        Object.keys(checkProps).forEach((key2) => {
          if (!params[key2] && params.auto === true) {
            let element = elementChildren(swiper.el, `.${checkProps[key2]}`)[0];
            if (!element) {
              element = createElement$1("div", checkProps[key2]);
              element.className = checkProps[key2];
              swiper.el.append(element);
            }
            params[key2] = element;
            originalParams[key2] = element;
          }
        });
      }
      return params;
    }
    function Navigation({
      swiper,
      extendParams,
      on: on2,
      emit
    }) {
      extendParams({
        navigation: {
          nextEl: null,
          prevEl: null,
          hideOnClick: false,
          disabledClass: "swiper-button-disabled",
          hiddenClass: "swiper-button-hidden",
          lockClass: "swiper-button-lock",
          navigationDisabledClass: "swiper-navigation-disabled"
        }
      });
      swiper.navigation = {
        nextEl: null,
        prevEl: null
      };
      const makeElementsArray = (el) => {
        if (!Array.isArray(el))
          el = [el].filter((e) => !!e);
        return el;
      };
      function getEl(el) {
        let res;
        if (el && typeof el === "string" && swiper.isElement) {
          res = swiper.el.shadowRoot.querySelector(el);
          if (res)
            return res;
        }
        if (el) {
          if (typeof el === "string")
            res = [...document.querySelectorAll(el)];
          if (swiper.params.uniqueNavElements && typeof el === "string" && res.length > 1 && swiper.el.querySelectorAll(el).length === 1) {
            res = swiper.el.querySelector(el);
          }
        }
        if (el && !res)
          return el;
        return res;
      }
      function toggleEl(el, disabled) {
        const params = swiper.params.navigation;
        el = makeElementsArray(el);
        el.forEach((subEl) => {
          if (subEl) {
            subEl.classList[disabled ? "add" : "remove"](...params.disabledClass.split(" "));
            if (subEl.tagName === "BUTTON")
              subEl.disabled = disabled;
            if (swiper.params.watchOverflow && swiper.enabled) {
              subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
            }
          }
        });
      }
      function update2() {
        const {
          nextEl,
          prevEl
        } = swiper.navigation;
        if (swiper.params.loop) {
          toggleEl(prevEl, false);
          toggleEl(nextEl, false);
          return;
        }
        toggleEl(prevEl, swiper.isBeginning && !swiper.params.rewind);
        toggleEl(nextEl, swiper.isEnd && !swiper.params.rewind);
      }
      function onPrevClick(e) {
        e.preventDefault();
        if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind)
          return;
        swiper.slidePrev();
        emit("navigationPrev");
      }
      function onNextClick(e) {
        e.preventDefault();
        if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind)
          return;
        swiper.slideNext();
        emit("navigationNext");
      }
      function init() {
        const params = swiper.params.navigation;
        swiper.params.navigation = createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
          nextEl: "swiper-button-next",
          prevEl: "swiper-button-prev"
        });
        if (!(params.nextEl || params.prevEl))
          return;
        let nextEl = getEl(params.nextEl);
        let prevEl = getEl(params.prevEl);
        Object.assign(swiper.navigation, {
          nextEl,
          prevEl
        });
        nextEl = makeElementsArray(nextEl);
        prevEl = makeElementsArray(prevEl);
        const initButton = (el, dir) => {
          if (el) {
            el.addEventListener("click", dir === "next" ? onNextClick : onPrevClick);
          }
          if (!swiper.enabled && el) {
            el.classList.add(...params.lockClass.split(" "));
          }
        };
        nextEl.forEach((el) => initButton(el, "next"));
        prevEl.forEach((el) => initButton(el, "prev"));
      }
      function destroy() {
        let {
          nextEl,
          prevEl
        } = swiper.navigation;
        nextEl = makeElementsArray(nextEl);
        prevEl = makeElementsArray(prevEl);
        const destroyButton = (el, dir) => {
          el.removeEventListener("click", dir === "next" ? onNextClick : onPrevClick);
          el.classList.remove(...swiper.params.navigation.disabledClass.split(" "));
        };
        nextEl.forEach((el) => destroyButton(el, "next"));
        prevEl.forEach((el) => destroyButton(el, "prev"));
      }
      on2("init", () => {
        if (swiper.params.navigation.enabled === false) {
          disable();
        } else {
          init();
          update2();
        }
      });
      on2("toEdge fromEdge lock unlock", () => {
        update2();
      });
      on2("destroy", () => {
        destroy();
      });
      on2("enable disable", () => {
        let {
          nextEl,
          prevEl
        } = swiper.navigation;
        nextEl = makeElementsArray(nextEl);
        prevEl = makeElementsArray(prevEl);
        [...nextEl, ...prevEl].filter((el) => !!el).forEach((el) => el.classList[swiper.enabled ? "remove" : "add"](swiper.params.navigation.lockClass));
      });
      on2("click", (_s, e) => {
        let {
          nextEl,
          prevEl
        } = swiper.navigation;
        nextEl = makeElementsArray(nextEl);
        prevEl = makeElementsArray(prevEl);
        const targetEl = e.target;
        if (swiper.params.navigation.hideOnClick && !prevEl.includes(targetEl) && !nextEl.includes(targetEl)) {
          if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl)))
            return;
          let isHidden;
          if (nextEl.length) {
            isHidden = nextEl[0].classList.contains(swiper.params.navigation.hiddenClass);
          } else if (prevEl.length) {
            isHidden = prevEl[0].classList.contains(swiper.params.navigation.hiddenClass);
          }
          if (isHidden === true) {
            emit("navigationShow");
          } else {
            emit("navigationHide");
          }
          [...nextEl, ...prevEl].filter((el) => !!el).forEach((el) => el.classList.toggle(swiper.params.navigation.hiddenClass));
        }
      });
      const enable = () => {
        swiper.el.classList.remove(...swiper.params.navigation.navigationDisabledClass.split(" "));
        init();
        update2();
      };
      const disable = () => {
        swiper.el.classList.add(...swiper.params.navigation.navigationDisabledClass.split(" "));
        destroy();
      };
      Object.assign(swiper.navigation, {
        enable,
        disable,
        update: update2,
        init,
        destroy
      });
    }
    function classesToSelector(classes2 = "") {
      return `.${classes2.trim().replace(/([\.:!+\/])/g, "\\$1").replace(/ /g, ".")}`;
    }
    function Pagination({
      swiper,
      extendParams,
      on: on2,
      emit
    }) {
      const pfx = "swiper-pagination";
      extendParams({
        pagination: {
          el: null,
          bulletElement: "span",
          clickable: false,
          hideOnClick: false,
          renderBullet: null,
          renderProgressbar: null,
          renderFraction: null,
          renderCustom: null,
          progressbarOpposite: false,
          type: "bullets",
          // 'bullets' or 'progressbar' or 'fraction' or 'custom'
          dynamicBullets: false,
          dynamicMainBullets: 1,
          formatFractionCurrent: (number) => number,
          formatFractionTotal: (number) => number,
          bulletClass: `${pfx}-bullet`,
          bulletActiveClass: `${pfx}-bullet-active`,
          modifierClass: `${pfx}-`,
          currentClass: `${pfx}-current`,
          totalClass: `${pfx}-total`,
          hiddenClass: `${pfx}-hidden`,
          progressbarFillClass: `${pfx}-progressbar-fill`,
          progressbarOppositeClass: `${pfx}-progressbar-opposite`,
          clickableClass: `${pfx}-clickable`,
          lockClass: `${pfx}-lock`,
          horizontalClass: `${pfx}-horizontal`,
          verticalClass: `${pfx}-vertical`,
          paginationDisabledClass: `${pfx}-disabled`
        }
      });
      swiper.pagination = {
        el: null,
        bullets: []
      };
      let bulletSize;
      let dynamicBulletIndex = 0;
      const makeElementsArray = (el) => {
        if (!Array.isArray(el))
          el = [el].filter((e) => !!e);
        return el;
      };
      function isPaginationDisabled() {
        return !swiper.params.pagination.el || !swiper.pagination.el || Array.isArray(swiper.pagination.el) && swiper.pagination.el.length === 0;
      }
      function setSideBullets(bulletEl, position) {
        const {
          bulletActiveClass
        } = swiper.params.pagination;
        if (!bulletEl)
          return;
        bulletEl = bulletEl[`${position === "prev" ? "previous" : "next"}ElementSibling`];
        if (bulletEl) {
          bulletEl.classList.add(`${bulletActiveClass}-${position}`);
          bulletEl = bulletEl[`${position === "prev" ? "previous" : "next"}ElementSibling`];
          if (bulletEl) {
            bulletEl.classList.add(`${bulletActiveClass}-${position}-${position}`);
          }
        }
      }
      function onBulletClick(e) {
        const bulletEl = e.target.closest(classesToSelector(swiper.params.pagination.bulletClass));
        if (!bulletEl) {
          return;
        }
        e.preventDefault();
        const index = elementIndex(bulletEl) * swiper.params.slidesPerGroup;
        if (swiper.params.loop) {
          if (swiper.realIndex === index)
            return;
          const newSlideIndex = swiper.getSlideIndexByData(index);
          const currentSlideIndex = swiper.getSlideIndexByData(swiper.realIndex);
          if (newSlideIndex > swiper.slides.length - swiper.loopedSlides) {
            swiper.loopFix({
              direction: newSlideIndex > currentSlideIndex ? "next" : "prev",
              activeSlideIndex: newSlideIndex,
              slideTo: false
            });
          }
          swiper.slideToLoop(index);
        } else {
          swiper.slideTo(index);
        }
      }
      function update2() {
        const rtl = swiper.rtl;
        const params = swiper.params.pagination;
        if (isPaginationDisabled())
          return;
        let el = swiper.pagination.el;
        el = makeElementsArray(el);
        let current;
        let previousIndex;
        const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
        const total = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
        if (swiper.params.loop) {
          previousIndex = swiper.previousRealIndex || 0;
          current = swiper.params.slidesPerGroup > 1 ? Math.floor(swiper.realIndex / swiper.params.slidesPerGroup) : swiper.realIndex;
        } else if (typeof swiper.snapIndex !== "undefined") {
          current = swiper.snapIndex;
          previousIndex = swiper.previousSnapIndex;
        } else {
          previousIndex = swiper.previousIndex || 0;
          current = swiper.activeIndex || 0;
        }
        if (params.type === "bullets" && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
          const bullets = swiper.pagination.bullets;
          let firstIndex;
          let lastIndex;
          let midIndex;
          if (params.dynamicBullets) {
            bulletSize = elementOuterSize(bullets[0], swiper.isHorizontal() ? "width" : "height", true);
            el.forEach((subEl) => {
              subEl.style[swiper.isHorizontal() ? "width" : "height"] = `${bulletSize * (params.dynamicMainBullets + 4)}px`;
            });
            if (params.dynamicMainBullets > 1 && previousIndex !== void 0) {
              dynamicBulletIndex += current - (previousIndex || 0);
              if (dynamicBulletIndex > params.dynamicMainBullets - 1) {
                dynamicBulletIndex = params.dynamicMainBullets - 1;
              } else if (dynamicBulletIndex < 0) {
                dynamicBulletIndex = 0;
              }
            }
            firstIndex = Math.max(current - dynamicBulletIndex, 0);
            lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
            midIndex = (lastIndex + firstIndex) / 2;
          }
          bullets.forEach((bulletEl) => {
            const classesToRemove = [...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map((suffix) => `${params.bulletActiveClass}${suffix}`)].map((s) => typeof s === "string" && s.includes(" ") ? s.split(" ") : s).flat();
            bulletEl.classList.remove(...classesToRemove);
          });
          if (el.length > 1) {
            bullets.forEach((bullet) => {
              const bulletIndex = elementIndex(bullet);
              if (bulletIndex === current) {
                bullet.classList.add(...params.bulletActiveClass.split(" "));
              } else if (swiper.isElement) {
                bullet.setAttribute("part", "bullet");
              }
              if (params.dynamicBullets) {
                if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
                  bullet.classList.add(...`${params.bulletActiveClass}-main`.split(" "));
                }
                if (bulletIndex === firstIndex) {
                  setSideBullets(bullet, "prev");
                }
                if (bulletIndex === lastIndex) {
                  setSideBullets(bullet, "next");
                }
              }
            });
          } else {
            const bullet = bullets[current];
            if (bullet) {
              bullet.classList.add(...params.bulletActiveClass.split(" "));
            }
            if (swiper.isElement) {
              bullets.forEach((bulletEl, bulletIndex) => {
                bulletEl.setAttribute("part", bulletIndex === current ? "bullet-active" : "bullet");
              });
            }
            if (params.dynamicBullets) {
              const firstDisplayedBullet = bullets[firstIndex];
              const lastDisplayedBullet = bullets[lastIndex];
              for (let i = firstIndex; i <= lastIndex; i += 1) {
                if (bullets[i]) {
                  bullets[i].classList.add(...`${params.bulletActiveClass}-main`.split(" "));
                }
              }
              setSideBullets(firstDisplayedBullet, "prev");
              setSideBullets(lastDisplayedBullet, "next");
            }
          }
          if (params.dynamicBullets) {
            const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
            const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
            const offsetProp = rtl ? "right" : "left";
            bullets.forEach((bullet) => {
              bullet.style[swiper.isHorizontal() ? offsetProp : "top"] = `${bulletsOffset}px`;
            });
          }
        }
        el.forEach((subEl, subElIndex) => {
          if (params.type === "fraction") {
            subEl.querySelectorAll(classesToSelector(params.currentClass)).forEach((fractionEl) => {
              fractionEl.textContent = params.formatFractionCurrent(current + 1);
            });
            subEl.querySelectorAll(classesToSelector(params.totalClass)).forEach((totalEl) => {
              totalEl.textContent = params.formatFractionTotal(total);
            });
          }
          if (params.type === "progressbar") {
            let progressbarDirection;
            if (params.progressbarOpposite) {
              progressbarDirection = swiper.isHorizontal() ? "vertical" : "horizontal";
            } else {
              progressbarDirection = swiper.isHorizontal() ? "horizontal" : "vertical";
            }
            const scale = (current + 1) / total;
            let scaleX = 1;
            let scaleY = 1;
            if (progressbarDirection === "horizontal") {
              scaleX = scale;
            } else {
              scaleY = scale;
            }
            subEl.querySelectorAll(classesToSelector(params.progressbarFillClass)).forEach((progressEl) => {
              progressEl.style.transform = `translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`;
              progressEl.style.transitionDuration = `${swiper.params.speed}ms`;
            });
          }
          if (params.type === "custom" && params.renderCustom) {
            subEl.innerHTML = params.renderCustom(swiper, current + 1, total);
            if (subElIndex === 0)
              emit("paginationRender", subEl);
          } else {
            if (subElIndex === 0)
              emit("paginationRender", subEl);
            emit("paginationUpdate", subEl);
          }
          if (swiper.params.watchOverflow && swiper.enabled) {
            subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
          }
        });
      }
      function render() {
        const params = swiper.params.pagination;
        if (isPaginationDisabled())
          return;
        const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
        let el = swiper.pagination.el;
        el = makeElementsArray(el);
        let paginationHTML = "";
        if (params.type === "bullets") {
          let numberOfBullets = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
          if (swiper.params.freeMode && swiper.params.freeMode.enabled && numberOfBullets > slidesLength) {
            numberOfBullets = slidesLength;
          }
          for (let i = 0; i < numberOfBullets; i += 1) {
            if (params.renderBullet) {
              paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
            } else {
              paginationHTML += `<${params.bulletElement} ${swiper.isElement ? 'part="bullet"' : ""} class="${params.bulletClass}"></${params.bulletElement}>`;
            }
          }
        }
        if (params.type === "fraction") {
          if (params.renderFraction) {
            paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
          } else {
            paginationHTML = `<span class="${params.currentClass}"></span> / <span class="${params.totalClass}"></span>`;
          }
        }
        if (params.type === "progressbar") {
          if (params.renderProgressbar) {
            paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
          } else {
            paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
          }
        }
        swiper.pagination.bullets = [];
        el.forEach((subEl) => {
          if (params.type !== "custom") {
            subEl.innerHTML = paginationHTML || "";
          }
          if (params.type === "bullets") {
            swiper.pagination.bullets.push(...subEl.querySelectorAll(classesToSelector(params.bulletClass)));
          }
        });
        if (params.type !== "custom") {
          emit("paginationRender", el[0]);
        }
      }
      function init() {
        swiper.params.pagination = createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
          el: "swiper-pagination"
        });
        const params = swiper.params.pagination;
        if (!params.el)
          return;
        let el;
        if (typeof params.el === "string" && swiper.isElement) {
          el = swiper.el.shadowRoot.querySelector(params.el);
        }
        if (!el && typeof params.el === "string") {
          el = [...document.querySelectorAll(params.el)];
        }
        if (!el) {
          el = params.el;
        }
        if (!el || el.length === 0)
          return;
        if (swiper.params.uniqueNavElements && typeof params.el === "string" && Array.isArray(el) && el.length > 1) {
          el = [...swiper.el.querySelectorAll(params.el)];
          if (el.length > 1) {
            el = el.filter((subEl) => {
              if (elementParents(subEl, ".swiper")[0] !== swiper.el)
                return false;
              return true;
            })[0];
          }
        }
        if (Array.isArray(el) && el.length === 1)
          el = el[0];
        Object.assign(swiper.pagination, {
          el
        });
        el = makeElementsArray(el);
        el.forEach((subEl) => {
          if (params.type === "bullets" && params.clickable) {
            subEl.classList.add(params.clickableClass);
          }
          subEl.classList.add(params.modifierClass + params.type);
          subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
          if (params.type === "bullets" && params.dynamicBullets) {
            subEl.classList.add(`${params.modifierClass}${params.type}-dynamic`);
            dynamicBulletIndex = 0;
            if (params.dynamicMainBullets < 1) {
              params.dynamicMainBullets = 1;
            }
          }
          if (params.type === "progressbar" && params.progressbarOpposite) {
            subEl.classList.add(params.progressbarOppositeClass);
          }
          if (params.clickable) {
            subEl.addEventListener("click", onBulletClick);
          }
          if (!swiper.enabled) {
            subEl.classList.add(params.lockClass);
          }
        });
      }
      function destroy() {
        const params = swiper.params.pagination;
        if (isPaginationDisabled())
          return;
        let el = swiper.pagination.el;
        if (el) {
          el = makeElementsArray(el);
          el.forEach((subEl) => {
            subEl.classList.remove(params.hiddenClass);
            subEl.classList.remove(params.modifierClass + params.type);
            subEl.classList.remove(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
            if (params.clickable) {
              subEl.removeEventListener("click", onBulletClick);
            }
          });
        }
        if (swiper.pagination.bullets)
          swiper.pagination.bullets.forEach((subEl) => subEl.classList.remove(...params.bulletActiveClass.split(" ")));
      }
      on2("changeDirection", () => {
        if (!swiper.pagination || !swiper.pagination.el)
          return;
        const params = swiper.params.pagination;
        let {
          el
        } = swiper.pagination;
        el = makeElementsArray(el);
        el.forEach((subEl) => {
          subEl.classList.remove(params.horizontalClass, params.verticalClass);
          subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
        });
      });
      on2("init", () => {
        if (swiper.params.pagination.enabled === false) {
          disable();
        } else {
          init();
          render();
          update2();
        }
      });
      on2("activeIndexChange", () => {
        if (typeof swiper.snapIndex === "undefined") {
          update2();
        }
      });
      on2("snapIndexChange", () => {
        update2();
      });
      on2("snapGridLengthChange", () => {
        render();
        update2();
      });
      on2("destroy", () => {
        destroy();
      });
      on2("enable disable", () => {
        let {
          el
        } = swiper.pagination;
        if (el) {
          el = makeElementsArray(el);
          el.forEach((subEl) => subEl.classList[swiper.enabled ? "remove" : "add"](swiper.params.pagination.lockClass));
        }
      });
      on2("lock unlock", () => {
        update2();
      });
      on2("click", (_s, e) => {
        const targetEl = e.target;
        let {
          el
        } = swiper.pagination;
        if (!Array.isArray(el))
          el = [el].filter((element) => !!element);
        if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && el && el.length > 0 && !targetEl.classList.contains(swiper.params.pagination.bulletClass)) {
          if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl))
            return;
          const isHidden = el[0].classList.contains(swiper.params.pagination.hiddenClass);
          if (isHidden === true) {
            emit("paginationShow");
          } else {
            emit("paginationHide");
          }
          el.forEach((subEl) => subEl.classList.toggle(swiper.params.pagination.hiddenClass));
        }
      });
      const enable = () => {
        swiper.el.classList.remove(swiper.params.pagination.paginationDisabledClass);
        let {
          el
        } = swiper.pagination;
        if (el) {
          el = makeElementsArray(el);
          el.forEach((subEl) => subEl.classList.remove(swiper.params.pagination.paginationDisabledClass));
        }
        init();
        render();
        update2();
      };
      const disable = () => {
        swiper.el.classList.add(swiper.params.pagination.paginationDisabledClass);
        let {
          el
        } = swiper.pagination;
        if (el) {
          el = makeElementsArray(el);
          el.forEach((subEl) => subEl.classList.add(swiper.params.pagination.paginationDisabledClass));
        }
        destroy();
      };
      Object.assign(swiper.pagination, {
        enable,
        disable,
        render,
        update: update2,
        init,
        destroy
      });
    }
    function Autoplay({
      swiper,
      extendParams,
      on: on2,
      emit,
      params
    }) {
      swiper.autoplay = {
        running: false,
        paused: false,
        timeLeft: 0
      };
      extendParams({
        autoplay: {
          enabled: false,
          delay: 3e3,
          waitForTransition: true,
          disableOnInteraction: true,
          stopOnLastSlide: false,
          reverseDirection: false,
          pauseOnMouseEnter: false
        }
      });
      let timeout;
      let raf;
      let autoplayDelayTotal = params && params.autoplay ? params.autoplay.delay : 3e3;
      let autoplayDelayCurrent = params && params.autoplay ? params.autoplay.delay : 3e3;
      let autoplayTimeLeft;
      let autoplayStartTime = (/* @__PURE__ */ new Date()).getTime;
      let wasPaused;
      let isTouched;
      let pausedByTouch;
      let touchStartTimeout;
      let slideChanged;
      let pausedByInteraction;
      function onTransitionEnd(e) {
        if (!swiper || swiper.destroyed || !swiper.wrapperEl)
          return;
        if (e.target !== swiper.wrapperEl)
          return;
        swiper.wrapperEl.removeEventListener("transitionend", onTransitionEnd);
        resume();
      }
      const calcTimeLeft = () => {
        if (swiper.destroyed || !swiper.autoplay.running)
          return;
        if (swiper.autoplay.paused) {
          wasPaused = true;
        } else if (wasPaused) {
          autoplayDelayCurrent = autoplayTimeLeft;
          wasPaused = false;
        }
        const timeLeft = swiper.autoplay.paused ? autoplayTimeLeft : autoplayStartTime + autoplayDelayCurrent - (/* @__PURE__ */ new Date()).getTime();
        swiper.autoplay.timeLeft = timeLeft;
        emit("autoplayTimeLeft", timeLeft, timeLeft / autoplayDelayTotal);
        raf = requestAnimationFrame(() => {
          calcTimeLeft();
        });
      };
      const getSlideDelay = () => {
        let activeSlideEl;
        if (swiper.virtual && swiper.params.virtual.enabled) {
          activeSlideEl = swiper.slides.filter((slideEl) => slideEl.classList.contains("swiper-slide-active"))[0];
        } else {
          activeSlideEl = swiper.slides[swiper.activeIndex];
        }
        if (!activeSlideEl)
          return void 0;
        const currentSlideDelay = parseInt(activeSlideEl.getAttribute("data-swiper-autoplay"), 10);
        return currentSlideDelay;
      };
      const run = (delayForce) => {
        if (swiper.destroyed || !swiper.autoplay.running)
          return;
        cancelAnimationFrame(raf);
        calcTimeLeft();
        let delay2 = typeof delayForce === "undefined" ? swiper.params.autoplay.delay : delayForce;
        autoplayDelayTotal = swiper.params.autoplay.delay;
        autoplayDelayCurrent = swiper.params.autoplay.delay;
        const currentSlideDelay = getSlideDelay();
        if (!Number.isNaN(currentSlideDelay) && currentSlideDelay > 0 && typeof delayForce === "undefined") {
          delay2 = currentSlideDelay;
          autoplayDelayTotal = currentSlideDelay;
          autoplayDelayCurrent = currentSlideDelay;
        }
        autoplayTimeLeft = delay2;
        const speed = swiper.params.speed;
        const proceed = () => {
          if (!swiper || swiper.destroyed)
            return;
          if (swiper.params.autoplay.reverseDirection) {
            if (!swiper.isBeginning || swiper.params.loop || swiper.params.rewind) {
              swiper.slidePrev(speed, true, true);
              emit("autoplay");
            } else if (!swiper.params.autoplay.stopOnLastSlide) {
              swiper.slideTo(swiper.slides.length - 1, speed, true, true);
              emit("autoplay");
            }
          } else {
            if (!swiper.isEnd || swiper.params.loop || swiper.params.rewind) {
              swiper.slideNext(speed, true, true);
              emit("autoplay");
            } else if (!swiper.params.autoplay.stopOnLastSlide) {
              swiper.slideTo(0, speed, true, true);
              emit("autoplay");
            }
          }
          if (swiper.params.cssMode) {
            autoplayStartTime = (/* @__PURE__ */ new Date()).getTime();
            requestAnimationFrame(() => {
              run();
            });
          }
        };
        if (delay2 > 0) {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            proceed();
          }, delay2);
        } else {
          requestAnimationFrame(() => {
            proceed();
          });
        }
        return delay2;
      };
      const start = () => {
        swiper.autoplay.running = true;
        run();
        emit("autoplayStart");
      };
      const stop = () => {
        swiper.autoplay.running = false;
        clearTimeout(timeout);
        cancelAnimationFrame(raf);
        emit("autoplayStop");
      };
      const pause = (internal, reset) => {
        if (swiper.destroyed || !swiper.autoplay.running)
          return;
        clearTimeout(timeout);
        if (!internal) {
          pausedByInteraction = true;
        }
        const proceed = () => {
          emit("autoplayPause");
          if (swiper.params.autoplay.waitForTransition) {
            swiper.wrapperEl.addEventListener("transitionend", onTransitionEnd);
          } else {
            resume();
          }
        };
        swiper.autoplay.paused = true;
        if (reset) {
          if (slideChanged) {
            autoplayTimeLeft = swiper.params.autoplay.delay;
          }
          slideChanged = false;
          proceed();
          return;
        }
        const delay2 = autoplayTimeLeft || swiper.params.autoplay.delay;
        autoplayTimeLeft = delay2 - ((/* @__PURE__ */ new Date()).getTime() - autoplayStartTime);
        if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop)
          return;
        if (autoplayTimeLeft < 0)
          autoplayTimeLeft = 0;
        proceed();
      };
      const resume = () => {
        if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop || swiper.destroyed || !swiper.autoplay.running)
          return;
        autoplayStartTime = (/* @__PURE__ */ new Date()).getTime();
        if (pausedByInteraction) {
          pausedByInteraction = false;
          run(autoplayTimeLeft);
        } else {
          run();
        }
        swiper.autoplay.paused = false;
        emit("autoplayResume");
      };
      const onVisibilityChange = () => {
        if (swiper.destroyed || !swiper.autoplay.running)
          return;
        const document2 = getDocument();
        if (document2.visibilityState === "hidden") {
          pausedByInteraction = true;
          pause(true);
        }
        if (document2.visibilityState === "visible") {
          resume();
        }
      };
      const onPointerEnter = (e) => {
        if (e.pointerType !== "mouse")
          return;
        pausedByInteraction = true;
        pause(true);
      };
      const onPointerLeave = (e) => {
        if (e.pointerType !== "mouse")
          return;
        if (swiper.autoplay.paused) {
          resume();
        }
      };
      const attachMouseEvents = () => {
        if (swiper.params.autoplay.pauseOnMouseEnter) {
          swiper.el.addEventListener("pointerenter", onPointerEnter);
          swiper.el.addEventListener("pointerleave", onPointerLeave);
        }
      };
      const detachMouseEvents = () => {
        swiper.el.removeEventListener("pointerenter", onPointerEnter);
        swiper.el.removeEventListener("pointerleave", onPointerLeave);
      };
      const attachDocumentEvents = () => {
        const document2 = getDocument();
        document2.addEventListener("visibilitychange", onVisibilityChange);
      };
      const detachDocumentEvents = () => {
        const document2 = getDocument();
        document2.removeEventListener("visibilitychange", onVisibilityChange);
      };
      on2("init", () => {
        if (swiper.params.autoplay.enabled) {
          attachMouseEvents();
          attachDocumentEvents();
          autoplayStartTime = (/* @__PURE__ */ new Date()).getTime();
          start();
        }
      });
      on2("destroy", () => {
        detachMouseEvents();
        detachDocumentEvents();
        if (swiper.autoplay.running) {
          stop();
        }
      });
      on2("beforeTransitionStart", (_s, speed, internal) => {
        if (swiper.destroyed || !swiper.autoplay.running)
          return;
        if (internal || !swiper.params.autoplay.disableOnInteraction) {
          pause(true, true);
        } else {
          stop();
        }
      });
      on2("sliderFirstMove", () => {
        if (swiper.destroyed || !swiper.autoplay.running)
          return;
        if (swiper.params.autoplay.disableOnInteraction) {
          stop();
          return;
        }
        isTouched = true;
        pausedByTouch = false;
        pausedByInteraction = false;
        touchStartTimeout = setTimeout(() => {
          pausedByInteraction = true;
          pausedByTouch = true;
          pause(true);
        }, 200);
      });
      on2("touchEnd", () => {
        if (swiper.destroyed || !swiper.autoplay.running || !isTouched)
          return;
        clearTimeout(touchStartTimeout);
        clearTimeout(timeout);
        if (swiper.params.autoplay.disableOnInteraction) {
          pausedByTouch = false;
          isTouched = false;
          return;
        }
        if (pausedByTouch && swiper.params.cssMode)
          resume();
        pausedByTouch = false;
        isTouched = false;
      });
      on2("slideChange", () => {
        if (swiper.destroyed || !swiper.autoplay.running)
          return;
        slideChanged = true;
      });
      Object.assign(swiper.autoplay, {
        start,
        stop,
        pause,
        resume
      });
    }
    function effectInit(params) {
      const {
        effect,
        swiper,
        on: on2,
        setTranslate: setTranslate2,
        setTransition: setTransition2,
        overwriteParams,
        perspective,
        recreateShadows,
        getEffectParams
      } = params;
      on2("beforeInit", () => {
        if (swiper.params.effect !== effect)
          return;
        swiper.classNames.push(`${swiper.params.containerModifierClass}${effect}`);
        if (perspective && perspective()) {
          swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
        }
        const overwriteParamsResult = overwriteParams ? overwriteParams() : {};
        Object.assign(swiper.params, overwriteParamsResult);
        Object.assign(swiper.originalParams, overwriteParamsResult);
      });
      on2("setTranslate", () => {
        if (swiper.params.effect !== effect)
          return;
        setTranslate2();
      });
      on2("setTransition", (_s, duration) => {
        if (swiper.params.effect !== effect)
          return;
        setTransition2(duration);
      });
      on2("transitionEnd", () => {
        if (swiper.params.effect !== effect)
          return;
        if (recreateShadows) {
          if (!getEffectParams || !getEffectParams().slideShadows)
            return;
          swiper.slides.forEach((slideEl) => {
            slideEl.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((shadowEl) => shadowEl.remove());
          });
          recreateShadows();
        }
      });
      let requireUpdateOnVirtual;
      on2("virtualUpdate", () => {
        if (swiper.params.effect !== effect)
          return;
        if (!swiper.slides.length) {
          requireUpdateOnVirtual = true;
        }
        requestAnimationFrame(() => {
          if (requireUpdateOnVirtual && swiper.slides && swiper.slides.length) {
            setTranslate2();
            requireUpdateOnVirtual = false;
          }
        });
      });
    }
    function effectTarget(effectParams, slideEl) {
      const transformEl = getSlideTransformEl(slideEl);
      if (transformEl !== slideEl) {
        transformEl.style.backfaceVisibility = "hidden";
        transformEl.style["-webkit-backface-visibility"] = "hidden";
      }
      return transformEl;
    }
    function effectVirtualTransitionEnd({
      swiper,
      duration,
      transformElements,
      allSlides
    }) {
      const {
        activeIndex
      } = swiper;
      const getSlide = (el) => {
        if (!el.parentElement) {
          const slide2 = swiper.slides.filter((slideEl) => slideEl.shadowEl && slideEl.shadowEl === el.parentNode)[0];
          return slide2;
        }
        return el.parentElement;
      };
      if (swiper.params.virtualTranslate && duration !== 0) {
        let eventTriggered = false;
        let transitionEndTarget;
        if (allSlides) {
          transitionEndTarget = transformElements;
        } else {
          transitionEndTarget = transformElements.filter((transformEl) => {
            const el = transformEl.classList.contains("swiper-slide-transform") ? getSlide(transformEl) : transformEl;
            return swiper.getSlideIndex(el) === activeIndex;
          });
        }
        transitionEndTarget.forEach((el) => {
          elementTransitionEnd(el, () => {
            if (eventTriggered)
              return;
            if (!swiper || swiper.destroyed)
              return;
            eventTriggered = true;
            swiper.animating = false;
            const evt = new window.CustomEvent("transitionend", {
              bubbles: true,
              cancelable: true
            });
            swiper.wrapperEl.dispatchEvent(evt);
          });
        });
      }
    }
    function EffectFade({
      swiper,
      extendParams,
      on: on2
    }) {
      extendParams({
        fadeEffect: {
          crossFade: false
        }
      });
      const setTranslate2 = () => {
        const {
          slides
        } = swiper;
        const params = swiper.params.fadeEffect;
        for (let i = 0; i < slides.length; i += 1) {
          const slideEl = swiper.slides[i];
          const offset2 = slideEl.swiperSlideOffset;
          let tx = -offset2;
          if (!swiper.params.virtualTranslate)
            tx -= swiper.translate;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
          }
          const slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(slideEl.progress), 0) : 1 + Math.min(Math.max(slideEl.progress, -1), 0);
          const targetEl = effectTarget(params, slideEl);
          targetEl.style.opacity = slideOpacity;
          targetEl.style.transform = `translate3d(${tx}px, ${ty}px, 0px)`;
        }
      };
      const setTransition2 = (duration) => {
        const transformElements = swiper.slides.map((slideEl) => getSlideTransformEl(slideEl));
        transformElements.forEach((el) => {
          el.style.transitionDuration = `${duration}ms`;
        });
        effectVirtualTransitionEnd({
          swiper,
          duration,
          transformElements,
          allSlides: true
        });
      };
      effectInit({
        effect: "fade",
        swiper,
        on: on2,
        setTranslate: setTranslate2,
        setTransition: setTransition2,
        overwriteParams: () => ({
          slidesPerView: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: !swiper.params.cssMode
        })
      });
    }
    function sliderTestimony() {
      if (document.querySelectorAll(".slider-testimony")) {
        setTimeout(() => {
          let sliderGallery = document.querySelectorAll(".slider-testimony");
          sliderGallery.forEach((slider) => {
            slider = new Swiper(slider.querySelector(".swiper-container"), {
              modules: [Pagination, Navigation],
              slidesPerView: 1,
              spaceBetween: 12,
              slidesPerGroup: 1,
              loop: false,
              effect: "fade",
              speed: 800,
              slideToClickedSlide: true,
              pagination: {
                el: slider.querySelector(".swiper-pagination"),
                clickable: true,
                type: "fraction"
              },
              navigation: {
                nextEl: slider.querySelector(".swiper-button-next"),
                prevEl: slider.querySelector(".swiper-button-prev")
              },
              loopFillGroupWithBlank: false,
              centerInsufficientSlides: true,
              grabCursor: false,
              observer: true,
              preloadImages: false,
              lazy: true,
              watchOverflow: true,
              breakpoints: {
                767: {
                  centeredSlides: true,
                  spaceBetween: 12
                },
                1025: {
                  centeredSlides: false,
                  spaceBetween: 0
                }
              }
            });
          });
        }, 1e3);
      }
    }
    function sliderBanner() {
      if (document.querySelectorAll(".slider-banner")) {
        setTimeout(() => {
          let sliderGallery = document.querySelectorAll(".slider-banner");
          sliderGallery.forEach((slider) => {
            let swiper = new Swiper(slider.querySelector(".swiper-container"), {
              modules: [Pagination, Navigation, Autoplay, EffectFade],
              slidesPerView: 1,
              spaceBetween: 0,
              slidesPerGroup: 1,
              loop: false,
              effect: "fade",
              speed: 800,
              slideToClickedSlide: true,
              watchSlidesProgress: true,
              autoplay: {
                delay: 6e3,
                disableOnInteraction: false
              },
              pagination: {
                el: slider.querySelector(".swiper-pagination"),
                clickable: true
              },
              on: {
                autoplayStart: function () {
                  updatePaginationBullet(this);
                },
                slideChangeTransitionStart: function () {
                  cancelAnimationFrame(this.autoplayAnimationFrame);
                  updatePaginationBullet(this);
                },
                autoplayStop: function () {
                  cancelAnimationFrame(this.autoplayAnimationFrame);
                  resetPaginationBulletProgress();
                },
                slideChange: function () {
                  let activeIndex = this.realIndex;
                  let bullets = slider.querySelectorAll(".swiper-pagination-bullet");
                  for (let i = 0; i <= activeIndex; i++) {
                    bullets[i].classList.add("active");
                  }
                },
                reachBeginning: function () {
                  let bullets = slider.querySelectorAll(".swiper-pagination-bullet");
                  bullets.forEach((bullet) => {
                    bullet.classList.remove("active");
                  });
                }
              },
              // navigation: {
              //   nextEl: slider.querySelector('.swiper-button-next'),
              //   prevEl: slider.querySelector('.swiper-button-prev'),
              // },
              loopFillGroupWithBlank: false,
              centerInsufficientSlides: true,
              grabCursor: false,
              observer: true,
              preloadImages: false,
              lazy: true,
              watchOverflow: true
            });
            function updatePaginationBullet(swiper2) {
              let activeIndex = swiper2.realIndex;
              let bullets = slider.querySelectorAll(".swiper-pagination-bullet");
              let startTime = performance.now();
              let duration = swiper2.params.autoplay.delay;
              function animate(timestamp) {
                let elapsedTime = timestamp - startTime;
                let progress = Math.min(elapsedTime / duration, 1);
                bullets.forEach((bullet, index) => {
                  if (index === activeIndex) {
                    bullet.style.setProperty("--progress", progress);
                  } else {
                    bullet.style.removeProperty("--progress");
                  }
                });
                if (progress < 1) {
                  swiper2.autoplayAnimationFrame = requestAnimationFrame(animate);
                }
              }
              swiper2.autoplayAnimationFrame = requestAnimationFrame(animate);
            }
            function resetPaginationBulletProgress(swiper2) {
              let bullets = slider.querySelectorAll(".swiper-pagination-bullet");
              bullets.forEach((bullet) => bullet.style.removeProperty("--progress"));
            }
            slider.swiper = swiper;
          });
        }, 1e3);
      }
    }
    new Promise((resolve) => {
      const image = new Image();
      image.addEventListener("error", () => resolve(false));
      image.addEventListener("load", () => resolve(image.width === 1));
      image.src = "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=";
    }).catch(() => false);
    /*!
     * ScrollToPlugin 3.12.5
     * https://gsap.com
     *
     * @license Copyright 2008-2024, GreenSock. All rights reserved.
     * Subject to the terms at https://gsap.com/standard-license or for
     * Club GSAP members, the agreement issued with that membership.
     * @author: Jack Doyle, jack@greensock.com
    */
    var gsap, _coreInitted, _window, _docEl, _body, _toArray, _config, ScrollTrigger, _windowExists = function _windowExists2() {
      return typeof window !== "undefined";
    }, _getGSAP = function _getGSAP2() {
      return gsap || _windowExists() && (gsap = window.gsap) && gsap.registerPlugin && gsap;
    }, _isString = function _isString2(value) {
      return typeof value === "string";
    }, _isFunction = function _isFunction2(value) {
      return typeof value === "function";
    }, _max = function _max2(element, axis) {
      var dim = axis === "x" ? "Width" : "Height", scroll = "scroll" + dim, client = "client" + dim;
      return element === _window || element === _docEl || element === _body ? Math.max(_docEl[scroll], _body[scroll]) - (_window["inner" + dim] || _docEl[client] || _body[client]) : element[scroll] - element["offset" + dim];
    }, _buildGetter = function _buildGetter2(e, axis) {
      var p = "scroll" + (axis === "x" ? "Left" : "Top");
      if (e === _window) {
        if (e.pageXOffset != null) {
          p = "page" + axis.toUpperCase() + "Offset";
        } else {
          e = _docEl[p] != null ? _docEl : _body;
        }
      }
      return function () {
        return e[p];
      };
    }, _clean = function _clean2(value, index, target, targets) {
      _isFunction(value) && (value = value(index, target, targets));
      if (typeof value !== "object") {
        return _isString(value) && value !== "max" && value.charAt(1) !== "=" ? {
          x: value,
          y: value
        } : {
          y: value
        };
      } else if (value.nodeType) {
        return {
          y: value,
          x: value
        };
      } else {
        var result = {}, p;
        for (p in value) {
          result[p] = p !== "onAutoKill" && _isFunction(value[p]) ? value[p](index, target, targets) : value[p];
        }
        return result;
      }
    }, _getOffset = function _getOffset2(element, container) {
      element = _toArray(element)[0];
      if (!element || !element.getBoundingClientRect) {
        return console.warn("scrollTo target doesn't exist. Using 0") || {
          x: 0,
          y: 0
        };
      }
      var rect = element.getBoundingClientRect(), isRoot = !container || container === _window || container === _body, cRect = isRoot ? {
        top: _docEl.clientTop - (_window.pageYOffset || _docEl.scrollTop || _body.scrollTop || 0),
        left: _docEl.clientLeft - (_window.pageXOffset || _docEl.scrollLeft || _body.scrollLeft || 0)
      } : container.getBoundingClientRect(), offsets = {
        x: rect.left - cRect.left,
        y: rect.top - cRect.top
      };
      if (!isRoot && container) {
        offsets.x += _buildGetter(container, "x")();
        offsets.y += _buildGetter(container, "y")();
      }
      return offsets;
    }, _parseVal = function _parseVal2(value, target, axis, currentVal, offset2) {
      return !isNaN(value) && typeof value !== "object" ? parseFloat(value) - offset2 : _isString(value) && value.charAt(1) === "=" ? parseFloat(value.substr(2)) * (value.charAt(0) === "-" ? -1 : 1) + currentVal - offset2 : value === "max" ? _max(target, axis) - offset2 : Math.min(_max(target, axis), _getOffset(value, target)[axis] - offset2);
    }, _initCore = function _initCore2() {
      gsap = _getGSAP();
      if (_windowExists() && gsap && typeof document !== "undefined" && document.body) {
        _window = window;
        _body = document.body;
        _docEl = document.documentElement;
        _toArray = gsap.utils.toArray;
        gsap.config({
          autoKillThreshold: 7
        });
        _config = gsap.config();
        _coreInitted = 1;
      }
    };
    var ScrollToPlugin = {
      version: "3.12.5",
      name: "scrollTo",
      rawVars: 1,
      register: function register(core) {
        gsap = core;
        _initCore();
      },
      init: function init(target, value, tween, index, targets) {
        _coreInitted || _initCore();
        var data = this, snapType = gsap.getProperty(target, "scrollSnapType");
        data.isWin = target === _window;
        data.target = target;
        data.tween = tween;
        value = _clean(value, index, target, targets);
        data.vars = value;
        data.autoKill = !!value.autoKill;
        data.getX = _buildGetter(target, "x");
        data.getY = _buildGetter(target, "y");
        data.x = data.xPrev = data.getX();
        data.y = data.yPrev = data.getY();
        ScrollTrigger || (ScrollTrigger = gsap.core.globals().ScrollTrigger);
        gsap.getProperty(target, "scrollBehavior") === "smooth" && gsap.set(target, {
          scrollBehavior: "auto"
        });
        if (snapType && snapType !== "none") {
          data.snap = 1;
          data.snapInline = target.style.scrollSnapType;
          target.style.scrollSnapType = "none";
        }
        if (value.x != null) {
          data.add(data, "x", data.x, _parseVal(value.x, target, "x", data.x, value.offsetX || 0), index, targets);
          data._props.push("scrollTo_x");
        } else {
          data.skipX = 1;
        }
        if (value.y != null) {
          data.add(data, "y", data.y, _parseVal(value.y, target, "y", data.y, value.offsetY || 0), index, targets);
          data._props.push("scrollTo_y");
        } else {
          data.skipY = 1;
        }
      },
      render: function render(ratio, data) {
        var pt = data._pt, target = data.target, tween = data.tween, autoKill = data.autoKill, xPrev = data.xPrev, yPrev = data.yPrev, isWin = data.isWin, snap = data.snap, snapInline = data.snapInline, x, y, yDif, xDif, threshold;
        while (pt) {
          pt.r(ratio, pt.d);
          pt = pt._next;
        }
        x = isWin || !data.skipX ? data.getX() : xPrev;
        y = isWin || !data.skipY ? data.getY() : yPrev;
        yDif = y - yPrev;
        xDif = x - xPrev;
        threshold = _config.autoKillThreshold;
        if (data.x < 0) {
          data.x = 0;
        }
        if (data.y < 0) {
          data.y = 0;
        }
        if (autoKill) {
          if (!data.skipX && (xDif > threshold || xDif < -threshold) && x < _max(target, "x")) {
            data.skipX = 1;
          }
          if (!data.skipY && (yDif > threshold || yDif < -threshold) && y < _max(target, "y")) {
            data.skipY = 1;
          }
          if (data.skipX && data.skipY) {
            tween.kill();
            data.vars.onAutoKill && data.vars.onAutoKill.apply(tween, data.vars.onAutoKillParams || []);
          }
        }
        if (isWin) {
          _window.scrollTo(!data.skipX ? data.x : x, !data.skipY ? data.y : y);
        } else {
          data.skipY || (target.scrollTop = data.y);
          data.skipX || (target.scrollLeft = data.x);
        }
        if (snap && (ratio === 1 || ratio === 0)) {
          y = target.scrollTop;
          x = target.scrollLeft;
          snapInline ? target.style.scrollSnapType = snapInline : target.style.removeProperty("scroll-snap-type");
          target.scrollTop = y + 1;
          target.scrollLeft = x + 1;
          target.scrollTop = y;
          target.scrollLeft = x;
        }
        data.xPrev = data.x;
        data.yPrev = data.y;
        ScrollTrigger && ScrollTrigger.update();
      },
      kill: function kill(property) {
        var both = property === "scrollTo", i = this._props.indexOf(property);
        if (both || property === "scrollTo_x") {
          this.skipX = 1;
        }
        if (both || property === "scrollTo_y") {
          this.skipY = 1;
        }
        i > -1 && this._props.splice(i, 1);
        return !this._props.length;
      }
    };
    ScrollToPlugin.max = _max;
    ScrollToPlugin.getOffset = _getOffset;
    ScrollToPlugin.buildGetter = _buildGetter;
    _getGSAP() && gsap.registerPlugin(ScrollToPlugin);
    gsapWithCSS$1.registerPlugin(ScrollTrigger$1);
    var gsapWithCSS = gsap$1.registerPlugin(CSSPlugin) || gsap$1;
    gsapWithCSS.core.Tween;
    gsapWithCSS.registerPlugin(ScrollTrigger$1);
    function scrollVideo(containerSelector, videoContainerSelector, videoUrl) {
      const container = document.querySelector(containerSelector);
      const videoContainer = document.querySelector(videoContainerSelector);
      const video = document.createElement("video");
      video.muted = true;
      video.loop = false;
      video.playsInline = true;
      video.style.width = "100%";
      video.style.height = "100%";
      videoContainer.appendChild(video);
      function loadAndPlayVideo(blobUrl) {
        video.src = blobUrl;
        video.load();
        video.onloadedmetadata = () => {
          setupScrollAnimation();
        };
      }
      function setupScrollAnimation() {
        const duration = video.duration;
        let isScrolling = false;
        ScrollTrigger$1.create({
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onEnter: () => {
            isScrolling = true;
          },
          onEnterBack: () => {
            isScrolling = true;
          },
          onLeave: () => {
            isScrolling = false;
          },
          onLeaveBack: () => {
            isScrolling = false;
          },
          onUpdate: (self2) => {
            if (isScrolling) {
              video.currentTime = self2.progress * duration;
            }
          },
          markers: false
        });
      }
      fetch(videoUrl).then((response) => response.blob()).then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        loadAndPlayVideo(blobUrl);
      }).catch((e) => console.error("Erro ao carregar o vídeo:", e));
    }
    gsapWithCSS.registerPlugin(ScrollTrigger$1);
    function scrollVideoToCanvas(containerSelector, containerVideoSelector, videoUrl) {
      const container = document.querySelector(containerSelector);
      const containerVideo = document.querySelector(containerVideoSelector);
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      containerVideo.appendChild(canvas);
      const video = document.createElement("video");
      video.src = videoUrl;
      video.muted = true;
      video.playsInline = true;
      video.loop = false;
      video.load();
      video.addEventListener("canplaythrough", () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        drawFrame();
        setupScrollAnimation();
      });
      function setupScrollAnimation() {
        // loader.state.scriptReady = true;
        ScrollTrigger$1.create({
          trigger: container,
          start: "top 70%",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self2) => {
            const newTime = self2.progress * video.duration;
            if (Math.abs(newTime - video.currentTime) > 0.1) {
              video.currentTime = newTime;
              drawFrame();
            }
          },
          markers: false
        });
      }
      function drawFrame() {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
      }
      video.addEventListener("loadeddata", () => {
        drawFrame();
      });
    }
    const pageName$8 = "home";
    function main$8() {
      const videoUrl = "assets/home-animation-min.mp4";
      // const videoUrlMobile = "https://video.wixstatic.com/video/0e0ac5_4d3569d323334543ba5defaac6a58640/1080p/mp4/file.mp4";
      const videoUrlMobile = "https://video.wixstatic.com/video/0e0ac5_274d16679fa74687b045944ce84187a9/720p/mp4/file.mp4";
      sliderTestimony();
      sliderBanner();
      if (screen.isMobile) {
        if (screen.isIphone) {
          scrollVideoToCanvas(".home-from-concept-to-reality", ".container-frame-by-frame", videoUrlMobile);
        } else {
          scrollVideo(".home-from-concept-to-reality", ".container-frame-by-frame", videoUrlMobile);
        }
      } else {
        scrollVideo(".home-from-concept-to-reality", ".container-frame-by-frame", videoUrl);
      }
    }
    const pgHome = new Page({
      pageName: pageName$8,
      main: main$8
    });
    (function scrollDetection() {
      let lastScrollTop = 0;
      let lastDirection = 0;
      let lastScrollPosition = 0;
      let vh = window.innerHeight;
      let containerHeight = sourceContainer().scrollHeight;
      document.body.dataset.scrollDirection = "initial";
      document.body.dataset.scrollPosition = "top";
      function scrollDetection2() {
        const currentScroll = scrollY;
        if (lastDirection != 0 && currentScroll <= 0) {
          document.body.dataset.scrollDirection = "initial";
          lastDirection = 0;
        } else if (lastDirection != 1 && lastScrollTop > currentScroll && currentScroll > 0) {
          document.body.dataset.scrollDirection = "up";
          lastDirection = 1;
        } else if (lastDirection != 2 && lastScrollTop < currentScroll && currentScroll > 0) {
          document.body.dataset.scrollDirection = "down";
          lastDirection = 2;
        }
        lastScrollTop = currentScroll;
        if (lastScrollPosition != 0 && currentScroll <= vh * 0.5) {
          document.body.dataset.scrollPosition = "top";
          lastScrollPosition = 0;
        } else if (lastScrollPosition != 1 && currentScroll >= vh * 0.5 && !(currentScroll + vh >= containerHeight - vh * 0.3)) {
          document.body.dataset.scrollPosition = "center";
          lastScrollPosition = 1;
        } else if (lastScrollPosition != 2 && currentScroll + vh >= containerHeight - vh * 0.3) {
          document.body.dataset.scrollPosition = "bottom";
          lastScrollPosition = 2;
        }
      }
      window.addEventListener("scroll", () => {
        scrollDetection2();
        if (document.getElementById("scroll-progress")) {
          document.getElementById("scroll-progress").style.setProperty("--scroll-progress", (scrollY + vh) / containerHeight);
        }
      }, {
        passive: true
      });
      window.addEventListener("resize", () => {
        vh = window.innerHeight;
        containerHeight = sourceContainer().scrollHeight;
        if (document.getElementById("scroll-progress")) {
          document.getElementById("scroll-progress").style.setProperty("--scroll-progress", (scrollY + vh) / containerHeight);
        }
      });
      const bodyObserver = new MutationObserver(() => {
        containerHeight = sourceContainer().scrollHeight;
        if (document.getElementById("scroll-progress")) {
          document.getElementById("scroll-progress").style.setProperty("--scroll-progress", (scrollY + vh) / containerHeight);
        }
      });
      bodyObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
      let vs;
      function vsScrollFix() {
        if (!vs) {
          vs = document.querySelector(".vs-scroll-view");
          if (!vs) {
            return;
          }
        }
        containerHeight = sourceContainer().scrollHeight;
        if (document.getElementById("scroll-progress")) {
          document.getElementById("scroll-progress").style.setProperty("--scroll-progress", (scrollY + vh) / containerHeight);
        }
      }
      setInterval(() => {
        vsScrollFix();
      }, 100);
      function sourceContainer() {
        let container;
        if (window.innerWidth > 1025) {
          container = document.body;
        } else {
          container = document.body;
        }
        return container;
      }
    })();
    class ModalGroup extends HTMLElement {
      constructor() {
        super();
        this.visible = false;
        this.leaveTime = 600;
      }
      connectedCallback() {
        const areas = this.querySelectorAll("[data-modal-area]");
        if (areas.length > 0) {
          this.hideOnClickOutside = onClickOutside(areas, this.close.bind(this), { autoStart: false });
        } else {
          this.hideOnClickOutside = null;
        }
      }
      disconnectedCallback() {
        if (this.hideOnClickOutside)
          this.hideOnClickOutside.stop();
      }
      static get observedAttributes() {
        return ["name", "active", "leave"];
      }
      attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
          case "active":
            queueMicrotask(() => {
              if (newValue === null) {
                this.close();
              } else {
                this.open(newValue);
              }
            });
            break;
          case "name":
            this.name = newValue;
            break;
          case "leave":
            this.leaveTime = Number.parseInt(newValue);
            break;
        }
      }
      handleEvent(ev) {
        if (ev.type === "keydown") {
          if (ev.key === "Escape" || ev.key === "Backspace")
            this.close();
        }
      }
      open(name) {
        const children = Array.from(this.querySelectorAll("modal-item"));
        const item = name ? children.find((c) => c.name == name) : children[0];
        this.bodyState("active", item.name);
        children.forEach((c) => c.close(0));
        this.addActive();
        item.open();
        this.dispatchEvent(new CustomEvent("modal:open", { detail: { item } }));
        if (this.hideOnClickOutside)
          this.hideOnClickOutside.start();
        document.addEventListener("keydown", this);
      }
      next() {
        const children = Array.from(this.querySelectorAll("modal-item"));
        const idx = children.indexOf(children.find((c) => c.visible));
        if (idx < children.length - 1) {
          children[idx].close();
          children[idx + 1].open();
        } else {
          children[idx].close();
          children[0].open();
        }
      }
      prev() {
        const children = Array.from(this.querySelectorAll("modal-item"));
        const idx = children.indexOf(children.find((c) => c.visible));
        if (idx > 0) {
          children[idx].close();
          children[idx - 1].open();
        } else {
          children[idx].close();
          children[children.length - 1].open();
        }
      }
      close() {
        const delay2 = this.leaveTime || 0;
        const children = Array.from(this.querySelectorAll("modal-item"));
        children.forEach((c) => {
          c.close(delay2);
        });
        this.removeActive({ leaveDelay: delay2 });
        if (delay2 > 0)
          this.bodyState("leave");
        setTimeout(() => {
          this.bodyState(null, null);
          this.dispatchEvent(new CustomEvent("modal:close"));
        }, delay2);
        if (this.hideOnClickOutside)
          this.hideOnClickOutside.stop();
        document.removeEventListener("keydown", this);
      }
      bodyState(state, item) {
        const ds = document.body.dataset;
        state ? ds.modalState = state : delete ds.modalState;
        item ? ds.modalItem = item : delete ds.modalItem;
        if (!state && !item) {
          delete ds.modal;
        } else {
          ds.modal = this.name;
        }
      }
    }
    function templateIframe(dataset) {
      const template = document.createElement("template");
      template.innerHTML = `
    <modal-group name="iframe" active>
      <modal-container>
        <modal-item>
        <div class="modal-container-iframe">
        <div class="modal-iframe" data-modal-area>
          <iframe src="${dataset.href}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
          
        <btn-modal-close></btn-modal-close>
        </modal-item>
      </modal-container>
      </modal-group>
      `;
      const modal = template.content;
      modal.firstElementChild.addEventListener("modal:close", function () {
        this.remove();
      }, {
        once: true
      });
      document.body.appendChild(modal);
    }
    function templateImage(dataset) {
      const template = document.createElement("template");
      let ext = dataset.href;
      ext = ext.substr(ext.lastIndexOf(".") + 1);
      let media2;
      if (["mp4", "webm"].includes(ext)) {
        media2 = `<video src="${dataset.href}" autoplay playsinline muted loop data-modal-area ></video>`;
      } else {
        media2 = `<img src="${dataset.href}" data-modal-area />`;
      }
      template.innerHTML = `
    <modal-group name="image" active data-cursor-style="default">
      <modal-container>
        <modal-item>
          <div class="modal-container-image">
            <div class="modal-image">

          
            ${media2}

            
              
            </div>
          </div>
        </modal-item>
      </modal-container>
      </modal-group>`;
      const modal = template.content;
      modal.firstElementChild.addEventListener("modal:close", function () {
        this.remove();
      }, { once: true });
      document.body.appendChild(modal);
    }
    function templateVideo(dataset) {
      const template = document.createElement("template");
      template.innerHTML = `
    <modal-group name="video" active>
      <modal-container>
        <modal-item>
          <div class="modal-container-video">
            <div class="modal-video" data-modal-area>
            <video autoplay loop controls src="${dataset.href}" />
              
            </div>
          </div>
        </modal-item>
      </modal-container>
      </modal-group>`;
      const modal = template.content;
      modal.firstElementChild.addEventListener("modal:close", function () {
        this.remove();
      }, { once: true });
      document.body.appendChild(modal);
    }
    const modalLocalName = "modal-group";
    class ModalItem extends HTMLElement {
      constructor() {
        super();
        this.visible = false;
      }
      connectedCallback() {
        this.modal = this.closest(modalLocalName);
      }
      disconnectedCallback() {
      }
      open() {
        if (this.visible)
          return;
        this.visible = true;
        this.addActive();
      }
      close(timeout) {
        if (!this.visible)
          return;
        this.visible = false;
        this.removeActive({
          leave: timeout > 0 ? true : false,
          leaveDelay: timeout
        });
      }
      static get observedAttributes() {
        return ["name", "hash"];
      }
      attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
      }
    }
    class ModalButton extends HTMLElement {
      constructor() {
        super();
      }
      connectedCallback() {
        this.modal = this.closest(modalLocalName);
        this.addEventListener("click", this.action);
      }
      disconnectedCallback() {
        this.removeEventListener("click", this.action);
      }
      attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
      }
    }
    class ModalNext extends ModalButton {
      action() {
        this.modal.next();
      }
    }
    class ModalPrevious extends ModalButton {
      action() {
        this.modal.prev();
      }
    }
    class ModalClose extends ModalButton {
      action() {
        this.modal.close();
      }
    }
    class ModalOpen extends ModalButton {
      action() {
        const template = this.template;
        if (template) {
          if (template === "iframe")
            templateIframe(this.dataset);
          if (template === "image")
            templateImage(this.dataset);
          if (template === "video")
            templateVideo(this.dataset);
        } else {
          const selector = `${modalLocalName}[name=${this.group}]`;
          const modal = document.querySelector(selector);
          if (!modal) {
            console.warn("não existe modal: " + selector);
            return;
          }
          modal.open(this.item);
        }
      }
      static get observedAttributes() {
        return ["group", "item", "template"];
      }
      connectedCallback() {
        this.addEventListener("click", this.action);
      }
    }
    window.customElements.define("modal-group", ModalGroup);
    window.customElements.define("modal-item", ModalItem);
    window.customElements.define("btn-modal-close", ModalClose);
    window.customElements.define("btn-modal-open", ModalOpen);
    window.customElements.define("btn-modal-next", ModalNext);
    window.customElements.define("btn-modal-prev", ModalPrevious);
    function inputMoney(input) {
      input.addEventListener("keydown", (ev) => {
        const v = input.value;
        let p = input.selectionStart;
        if (ev.key === "Delete") {
          const toDel = input.value.charAt(input.selectionStart);
          if (toDel === "," || toDel === ".") {
            ev.preventDefault();
            input.value = v.slice(0, p) + v.slice(p + 2);
            input.setSelectionRange(p, p);
            formatInput();
          }
        }
        if (ev.key === "Backspace") {
          const toDel = input.value.charAt(input.selectionStart - 1);
          if (toDel === "," || toDel === ".") {
            ev.preventDefault();
            input.value = v.slice(0, p - 2) + v.slice(p);
            input.setSelectionRange(p - 2, p - 2);
            formatInput();
          }
        }
      });
      input.addEventListener("input", formatInput);
      function formatInput() {
        const negative = input.value.includes("-");
        const n = input.value.replace(/[^\d]/g, "").replace(/^0+/g, "");
        const l = n.length;
        let c = input.selectionStart - input.value.replace(/[^,.]/g, "").length;
        let newValue = "";
        if (l > 2) {
          let milhar = n.substr(0, l - 2);
          let decimal = "," + n.substr(l - 2, l);
          c++;
          let formatted = "";
          for (let i = 0; i < milhar.length; i++) {
            if ((milhar.length - i) % 3 === 0 && i != 0) {
              formatted += ".";
              c++;
            }
            formatted += milhar[i];
          }
          newValue = formatted + decimal;
        } else if (l == 1) {
          newValue = "0,0" + n;
          c += 3;
        } else if (l == 2) {
          newValue = "0," + n;
          c += 2;
        }
        if (negative)
          newValue = "-" + newValue;
        input.value = newValue;
        if (c < 0)
          c = 0;
        input.setSelectionRange(c, c);
      }
    }
    //! moment.js
    //! version : 2.30.1
    //! authors : Tim Wood, Iskren Chernev, Moment.js contributors
    //! license : MIT
    //! momentjs.com
    var hookCallback;
    function hooks() {
      return hookCallback.apply(null, arguments);
    }
    function setHookCallback(callback) {
      hookCallback = callback;
    }
    function isArray$2(input) {
      return input instanceof Array || Object.prototype.toString.call(input) === "[object Array]";
    }
    function isObject$2(input) {
      return input != null && Object.prototype.toString.call(input) === "[object Object]";
    }
    function hasOwnProp(a, b2) {
      return Object.prototype.hasOwnProperty.call(a, b2);
    }
    function isObjectEmpty(obj) {
      if (Object.getOwnPropertyNames) {
        return Object.getOwnPropertyNames(obj).length === 0;
      } else {
        var k;
        for (k in obj) {
          if (hasOwnProp(obj, k)) {
            return false;
          }
        }
        return true;
      }
    }
    function isUndefined(input) {
      return input === void 0;
    }
    function isNumber$2(input) {
      return typeof input === "number" || Object.prototype.toString.call(input) === "[object Number]";
    }
    function isDate(input) {
      return input instanceof Date || Object.prototype.toString.call(input) === "[object Date]";
    }
    function map(arr, fn) {
      var res = [], i, arrLen = arr.length;
      for (i = 0; i < arrLen; ++i) {
        res.push(fn(arr[i], i));
      }
      return res;
    }
    function extend$1(a, b2) {
      for (var i in b2) {
        if (hasOwnProp(b2, i)) {
          a[i] = b2[i];
        }
      }
      if (hasOwnProp(b2, "toString")) {
        a.toString = b2.toString;
      }
      if (hasOwnProp(b2, "valueOf")) {
        a.valueOf = b2.valueOf;
      }
      return a;
    }
    function createUTC(input, format2, locale2, strict) {
      return createLocalOrUTC(input, format2, locale2, strict, true).utc();
    }
    function defaultParsingFlags() {
      return {
        empty: false,
        unusedTokens: [],
        unusedInput: [],
        overflow: -2,
        charsLeftOver: 0,
        nullInput: false,
        invalidEra: null,
        invalidMonth: null,
        invalidFormat: false,
        userInvalidated: false,
        iso: false,
        parsedDateParts: [],
        era: null,
        meridiem: null,
        rfc2822: false,
        weekdayMismatch: false
      };
    }
    function getParsingFlags(m) {
      if (m._pf == null) {
        m._pf = defaultParsingFlags();
      }
      return m._pf;
    }
    var some;
    if (Array.prototype.some) {
      some = Array.prototype.some;
    } else {
      some = function (fun) {
        var t = Object(this), len = t.length >>> 0, i;
        for (i = 0; i < len; i++) {
          if (i in t && fun.call(this, t[i], i, t)) {
            return true;
          }
        }
        return false;
      };
    }
    function isValid(m) {
      var flags = null, parsedParts = false, isNowValid = m._d && !isNaN(m._d.getTime());
      if (isNowValid) {
        flags = getParsingFlags(m);
        parsedParts = some.call(flags.parsedDateParts, function (i) {
          return i != null;
        });
        isNowValid = flags.overflow < 0 && !flags.empty && !flags.invalidEra && !flags.invalidMonth && !flags.invalidWeekday && !flags.weekdayMismatch && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);
        if (m._strict) {
          isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === void 0;
        }
      }
      if (Object.isFrozen == null || !Object.isFrozen(m)) {
        m._isValid = isNowValid;
      } else {
        return isNowValid;
      }
      return m._isValid;
    }
    function createInvalid(flags) {
      var m = createUTC(NaN);
      if (flags != null) {
        extend$1(getParsingFlags(m), flags);
      } else {
        getParsingFlags(m).userInvalidated = true;
      }
      return m;
    }
    var momentProperties = hooks.momentProperties = [], updateInProgress = false;
    function copyConfig(to2, from2) {
      var i, prop, val, momentPropertiesLen = momentProperties.length;
      if (!isUndefined(from2._isAMomentObject)) {
        to2._isAMomentObject = from2._isAMomentObject;
      }
      if (!isUndefined(from2._i)) {
        to2._i = from2._i;
      }
      if (!isUndefined(from2._f)) {
        to2._f = from2._f;
      }
      if (!isUndefined(from2._l)) {
        to2._l = from2._l;
      }
      if (!isUndefined(from2._strict)) {
        to2._strict = from2._strict;
      }
      if (!isUndefined(from2._tzm)) {
        to2._tzm = from2._tzm;
      }
      if (!isUndefined(from2._isUTC)) {
        to2._isUTC = from2._isUTC;
      }
      if (!isUndefined(from2._offset)) {
        to2._offset = from2._offset;
      }
      if (!isUndefined(from2._pf)) {
        to2._pf = getParsingFlags(from2);
      }
      if (!isUndefined(from2._locale)) {
        to2._locale = from2._locale;
      }
      if (momentPropertiesLen > 0) {
        for (i = 0; i < momentPropertiesLen; i++) {
          prop = momentProperties[i];
          val = from2[prop];
          if (!isUndefined(val)) {
            to2[prop] = val;
          }
        }
      }
      return to2;
    }
    function Moment(config) {
      copyConfig(this, config);
      this._d = new Date(config._d != null ? config._d.getTime() : NaN);
      if (!this.isValid()) {
        this._d = /* @__PURE__ */ new Date(NaN);
      }
      if (updateInProgress === false) {
        updateInProgress = true;
        hooks.updateOffset(this);
        updateInProgress = false;
      }
    }
    function isMoment(obj) {
      return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
    }
    function warn(msg) {
      if (hooks.suppressDeprecationWarnings === false && typeof console !== "undefined" && console.warn) {
        console.warn("Deprecation warning: " + msg);
      }
    }
    function deprecate(msg, fn) {
      var firstTime = true;
      return extend$1(function () {
        if (hooks.deprecationHandler != null) {
          hooks.deprecationHandler(null, msg);
        }
        if (firstTime) {
          var args = [], arg, i, key2, argLen = arguments.length;
          for (i = 0; i < argLen; i++) {
            arg = "";
            if (typeof arguments[i] === "object") {
              arg += "\n[" + i + "] ";
              for (key2 in arguments[0]) {
                if (hasOwnProp(arguments[0], key2)) {
                  arg += key2 + ": " + arguments[0][key2] + ", ";
                }
              }
              arg = arg.slice(0, -2);
            } else {
              arg = arguments[i];
            }
            args.push(arg);
          }
          warn(
            msg + "\nArguments: " + Array.prototype.slice.call(args).join("") + "\n" + new Error().stack
          );
          firstTime = false;
        }
        return fn.apply(this, arguments);
      }, fn);
    }
    var deprecations = {};
    function deprecateSimple(name, msg) {
      if (hooks.deprecationHandler != null) {
        hooks.deprecationHandler(name, msg);
      }
      if (!deprecations[name]) {
        warn(msg);
        deprecations[name] = true;
      }
    }
    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;
    function isFunction$2(input) {
      return typeof Function !== "undefined" && input instanceof Function || Object.prototype.toString.call(input) === "[object Function]";
    }
    function set(config) {
      var prop, i;
      for (i in config) {
        if (hasOwnProp(config, i)) {
          prop = config[i];
          if (isFunction$2(prop)) {
            this[i] = prop;
          } else {
            this["_" + i] = prop;
          }
        }
      }
      this._config = config;
      this._dayOfMonthOrdinalParseLenient = new RegExp(
        (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
      );
    }
    function mergeConfigs(parentConfig, childConfig) {
      var res = extend$1({}, parentConfig), prop;
      for (prop in childConfig) {
        if (hasOwnProp(childConfig, prop)) {
          if (isObject$2(parentConfig[prop]) && isObject$2(childConfig[prop])) {
            res[prop] = {};
            extend$1(res[prop], parentConfig[prop]);
            extend$1(res[prop], childConfig[prop]);
          } else if (childConfig[prop] != null) {
            res[prop] = childConfig[prop];
          } else {
            delete res[prop];
          }
        }
      }
      for (prop in parentConfig) {
        if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject$2(parentConfig[prop])) {
          res[prop] = extend$1({}, res[prop]);
        }
      }
      return res;
    }
    function Locale(config) {
      if (config != null) {
        this.set(config);
      }
    }
    var keys;
    if (Object.keys) {
      keys = Object.keys;
    } else {
      keys = function (obj) {
        var i, res = [];
        for (i in obj) {
          if (hasOwnProp(obj, i)) {
            res.push(i);
          }
        }
        return res;
      };
    }
    var defaultCalendar = {
      sameDay: "[Today at] LT",
      nextDay: "[Tomorrow at] LT",
      nextWeek: "dddd [at] LT",
      lastDay: "[Yesterday at] LT",
      lastWeek: "[Last] dddd [at] LT",
      sameElse: "L"
    };
    function calendar(key2, mom, now2) {
      var output = this._calendar[key2] || this._calendar["sameElse"];
      return isFunction$2(output) ? output.call(mom, now2) : output;
    }
    function zeroFill(number, targetLength, forceSign) {
      var absNumber = "" + Math.abs(number), zerosToFill = targetLength - absNumber.length, sign2 = number >= 0;
      return (sign2 ? forceSign ? "+" : "" : "-") + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }
    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, formatFunctions = {}, formatTokenFunctions = {};
    function addFormatToken(token2, padded, ordinal2, callback) {
      var func = callback;
      if (typeof callback === "string") {
        func = function () {
          return this[callback]();
        };
      }
      if (token2) {
        formatTokenFunctions[token2] = func;
      }
      if (padded) {
        formatTokenFunctions[padded[0]] = function () {
          return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
        };
      }
      if (ordinal2) {
        formatTokenFunctions[ordinal2] = function () {
          return this.localeData().ordinal(
            func.apply(this, arguments),
            token2
          );
        };
      }
    }
    function removeFormattingTokens(input) {
      if (input.match(/\[[\s\S]/)) {
        return input.replace(/^\[|\]$/g, "");
      }
      return input.replace(/\\/g, "");
    }
    function makeFormatFunction(format2) {
      var array = format2.match(formattingTokens), i, length;
      for (i = 0, length = array.length; i < length; i++) {
        if (formatTokenFunctions[array[i]]) {
          array[i] = formatTokenFunctions[array[i]];
        } else {
          array[i] = removeFormattingTokens(array[i]);
        }
      }
      return function (mom) {
        var output = "", i2;
        for (i2 = 0; i2 < length; i2++) {
          output += isFunction$2(array[i2]) ? array[i2].call(mom, format2) : array[i2];
        }
        return output;
      };
    }
    function formatMoment(m, format2) {
      if (!m.isValid()) {
        return m.localeData().invalidDate();
      }
      format2 = expandFormat(format2, m.localeData());
      formatFunctions[format2] = formatFunctions[format2] || makeFormatFunction(format2);
      return formatFunctions[format2](m);
    }
    function expandFormat(format2, locale2) {
      var i = 5;
      function replaceLongDateFormatTokens(input) {
        return locale2.longDateFormat(input) || input;
      }
      localFormattingTokens.lastIndex = 0;
      while (i >= 0 && localFormattingTokens.test(format2)) {
        format2 = format2.replace(
          localFormattingTokens,
          replaceLongDateFormatTokens
        );
        localFormattingTokens.lastIndex = 0;
        i -= 1;
      }
      return format2;
    }
    var defaultLongDateFormat = {
      LTS: "h:mm:ss A",
      LT: "h:mm A",
      L: "MM/DD/YYYY",
      LL: "MMMM D, YYYY",
      LLL: "MMMM D, YYYY h:mm A",
      LLLL: "dddd, MMMM D, YYYY h:mm A"
    };
    function longDateFormat(key2) {
      var format2 = this._longDateFormat[key2], formatUpper = this._longDateFormat[key2.toUpperCase()];
      if (format2 || !formatUpper) {
        return format2;
      }
      this._longDateFormat[key2] = formatUpper.match(formattingTokens).map(function (tok) {
        if (tok === "MMMM" || tok === "MM" || tok === "DD" || tok === "dddd") {
          return tok.slice(1);
        }
        return tok;
      }).join("");
      return this._longDateFormat[key2];
    }
    var defaultInvalidDate = "Invalid date";
    function invalidDate() {
      return this._invalidDate;
    }
    var defaultOrdinal = "%d", defaultDayOfMonthOrdinalParse = /\d{1,2}/;
    function ordinal(number) {
      return this._ordinal.replace("%d", number);
    }
    var defaultRelativeTime = {
      future: "in %s",
      past: "%s ago",
      s: "a few seconds",
      ss: "%d seconds",
      m: "a minute",
      mm: "%d minutes",
      h: "an hour",
      hh: "%d hours",
      d: "a day",
      dd: "%d days",
      w: "a week",
      ww: "%d weeks",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years"
    };
    function relativeTime(number, withoutSuffix, string, isFuture) {
      var output = this._relativeTime[string];
      return isFunction$2(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
    }
    function pastFuture(diff2, output) {
      var format2 = this._relativeTime[diff2 > 0 ? "future" : "past"];
      return isFunction$2(format2) ? format2(output) : format2.replace(/%s/i, output);
    }
    var aliases = {
      D: "date",
      dates: "date",
      date: "date",
      d: "day",
      days: "day",
      day: "day",
      e: "weekday",
      weekdays: "weekday",
      weekday: "weekday",
      E: "isoWeekday",
      isoweekdays: "isoWeekday",
      isoweekday: "isoWeekday",
      DDD: "dayOfYear",
      dayofyears: "dayOfYear",
      dayofyear: "dayOfYear",
      h: "hour",
      hours: "hour",
      hour: "hour",
      ms: "millisecond",
      milliseconds: "millisecond",
      millisecond: "millisecond",
      m: "minute",
      minutes: "minute",
      minute: "minute",
      M: "month",
      months: "month",
      month: "month",
      Q: "quarter",
      quarters: "quarter",
      quarter: "quarter",
      s: "second",
      seconds: "second",
      second: "second",
      gg: "weekYear",
      weekyears: "weekYear",
      weekyear: "weekYear",
      GG: "isoWeekYear",
      isoweekyears: "isoWeekYear",
      isoweekyear: "isoWeekYear",
      w: "week",
      weeks: "week",
      week: "week",
      W: "isoWeek",
      isoweeks: "isoWeek",
      isoweek: "isoWeek",
      y: "year",
      years: "year",
      year: "year"
    };
    function normalizeUnits(units) {
      return typeof units === "string" ? aliases[units] || aliases[units.toLowerCase()] : void 0;
    }
    function normalizeObjectUnits(inputObject) {
      var normalizedInput = {}, normalizedProp, prop;
      for (prop in inputObject) {
        if (hasOwnProp(inputObject, prop)) {
          normalizedProp = normalizeUnits(prop);
          if (normalizedProp) {
            normalizedInput[normalizedProp] = inputObject[prop];
          }
        }
      }
      return normalizedInput;
    }
    var priorities = {
      date: 9,
      day: 11,
      weekday: 11,
      isoWeekday: 11,
      dayOfYear: 4,
      hour: 13,
      millisecond: 16,
      minute: 14,
      month: 8,
      quarter: 7,
      second: 15,
      weekYear: 1,
      isoWeekYear: 1,
      week: 5,
      isoWeek: 5,
      year: 1
    };
    function getPrioritizedUnits(unitsObj) {
      var units = [], u;
      for (u in unitsObj) {
        if (hasOwnProp(unitsObj, u)) {
          units.push({ unit: u, priority: priorities[u] });
        }
      }
      units.sort(function (a, b2) {
        return a.priority - b2.priority;
      });
      return units;
    }
    var match1 = /\d/, match2 = /\d\d/, match3 = /\d{3}/, match4 = /\d{4}/, match6 = /[+-]?\d{6}/, match1to2 = /\d\d?/, match3to4 = /\d\d\d\d?/, match5to6 = /\d\d\d\d\d\d?/, match1to3 = /\d{1,3}/, match1to4 = /\d{1,4}/, match1to6 = /[+-]?\d{1,6}/, matchUnsigned = /\d+/, matchSigned = /[+-]?\d+/, matchOffset = /Z|[+-]\d\d:?\d\d/gi, matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, match1to2NoLeadingZero = /^[1-9]\d?/, match1to2HasZero = /^([1-9]\d|\d)/, regexes;
    regexes = {};
    function addRegexToken(token2, regex, strictRegex) {
      regexes[token2] = isFunction$2(regex) ? regex : function (isStrict, localeData2) {
        return isStrict && strictRegex ? strictRegex : regex;
      };
    }
    function getParseRegexForToken(token2, config) {
      if (!hasOwnProp(regexes, token2)) {
        return new RegExp(unescapeFormat(token2));
      }
      return regexes[token2](config._strict, config._locale);
    }
    function unescapeFormat(s) {
      return regexEscape(
        s.replace("\\", "").replace(
          /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
          function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
          }
        )
      );
    }
    function regexEscape(s) {
      return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    }
    function absFloor(number) {
      if (number < 0) {
        return Math.ceil(number) || 0;
      } else {
        return Math.floor(number);
      }
    }
    function toInt(argumentForCoercion) {
      var coercedNumber = +argumentForCoercion, value = 0;
      if (coercedNumber !== 0 && isFinite(coercedNumber)) {
        value = absFloor(coercedNumber);
      }
      return value;
    }
    var tokens = {};
    function addParseToken(token2, callback) {
      var i, func = callback, tokenLen;
      if (typeof token2 === "string") {
        token2 = [token2];
      }
      if (isNumber$2(callback)) {
        func = function (input, array) {
          array[callback] = toInt(input);
        };
      }
      tokenLen = token2.length;
      for (i = 0; i < tokenLen; i++) {
        tokens[token2[i]] = func;
      }
    }
    function addWeekParseToken(token2, callback) {
      addParseToken(token2, function (input, array, config, token3) {
        config._w = config._w || {};
        callback(input, config._w, config, token3);
      });
    }
    function addTimeToArrayFromToken(token2, input, config) {
      if (input != null && hasOwnProp(tokens, token2)) {
        tokens[token2](input, config._a, config, token2);
      }
    }
    function isLeapYear(year) {
      return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    }
    var YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6, WEEK = 7, WEEKDAY = 8;
    addFormatToken("Y", 0, 0, function () {
      var y = this.year();
      return y <= 9999 ? zeroFill(y, 4) : "+" + y;
    });
    addFormatToken(0, ["YY", 2], 0, function () {
      return this.year() % 100;
    });
    addFormatToken(0, ["YYYY", 4], 0, "year");
    addFormatToken(0, ["YYYYY", 5], 0, "year");
    addFormatToken(0, ["YYYYYY", 6, true], 0, "year");
    addRegexToken("Y", matchSigned);
    addRegexToken("YY", match1to2, match2);
    addRegexToken("YYYY", match1to4, match4);
    addRegexToken("YYYYY", match1to6, match6);
    addRegexToken("YYYYYY", match1to6, match6);
    addParseToken(["YYYYY", "YYYYYY"], YEAR);
    addParseToken("YYYY", function (input, array) {
      array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken("YY", function (input, array) {
      array[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken("Y", function (input, array) {
      array[YEAR] = parseInt(input, 10);
    });
    function daysInYear(year) {
      return isLeapYear(year) ? 366 : 365;
    }
    hooks.parseTwoDigitYear = function (input) {
      return toInt(input) + (toInt(input) > 68 ? 1900 : 2e3);
    };
    var getSetYear = makeGetSet("FullYear", true);
    function getIsLeapYear() {
      return isLeapYear(this.year());
    }
    function makeGetSet(unit, keepTime) {
      return function (value) {
        if (value != null) {
          set$1(this, unit, value);
          hooks.updateOffset(this, keepTime);
          return this;
        } else {
          return get(this, unit);
        }
      };
    }
    function get(mom, unit) {
      if (!mom.isValid()) {
        return NaN;
      }
      var d = mom._d, isUTC = mom._isUTC;
      switch (unit) {
        case "Milliseconds":
          return isUTC ? d.getUTCMilliseconds() : d.getMilliseconds();
        case "Seconds":
          return isUTC ? d.getUTCSeconds() : d.getSeconds();
        case "Minutes":
          return isUTC ? d.getUTCMinutes() : d.getMinutes();
        case "Hours":
          return isUTC ? d.getUTCHours() : d.getHours();
        case "Date":
          return isUTC ? d.getUTCDate() : d.getDate();
        case "Day":
          return isUTC ? d.getUTCDay() : d.getDay();
        case "Month":
          return isUTC ? d.getUTCMonth() : d.getMonth();
        case "FullYear":
          return isUTC ? d.getUTCFullYear() : d.getFullYear();
        default:
          return NaN;
      }
    }
    function set$1(mom, unit, value) {
      var d, isUTC, year, month, date;
      if (!mom.isValid() || isNaN(value)) {
        return;
      }
      d = mom._d;
      isUTC = mom._isUTC;
      switch (unit) {
        case "Milliseconds":
          return void (isUTC ? d.setUTCMilliseconds(value) : d.setMilliseconds(value));
        case "Seconds":
          return void (isUTC ? d.setUTCSeconds(value) : d.setSeconds(value));
        case "Minutes":
          return void (isUTC ? d.setUTCMinutes(value) : d.setMinutes(value));
        case "Hours":
          return void (isUTC ? d.setUTCHours(value) : d.setHours(value));
        case "Date":
          return void (isUTC ? d.setUTCDate(value) : d.setDate(value));
        case "FullYear":
          break;
        default:
          return;
      }
      year = value;
      month = mom.month();
      date = mom.date();
      date = date === 29 && month === 1 && !isLeapYear(year) ? 28 : date;
      void (isUTC ? d.setUTCFullYear(year, month, date) : d.setFullYear(year, month, date));
    }
    function stringGet(units) {
      units = normalizeUnits(units);
      if (isFunction$2(this[units])) {
        return this[units]();
      }
      return this;
    }
    function stringSet(units, value) {
      if (typeof units === "object") {
        units = normalizeObjectUnits(units);
        var prioritized = getPrioritizedUnits(units), i, prioritizedLen = prioritized.length;
        for (i = 0; i < prioritizedLen; i++) {
          this[prioritized[i].unit](units[prioritized[i].unit]);
        }
      } else {
        units = normalizeUnits(units);
        if (isFunction$2(this[units])) {
          return this[units](value);
        }
      }
      return this;
    }
    function mod(n, x) {
      return (n % x + x) % x;
    }
    var indexOf;
    if (Array.prototype.indexOf) {
      indexOf = Array.prototype.indexOf;
    } else {
      indexOf = function (o) {
        var i;
        for (i = 0; i < this.length; ++i) {
          if (this[i] === o) {
            return i;
          }
        }
        return -1;
      };
    }
    function daysInMonth(year, month) {
      if (isNaN(year) || isNaN(month)) {
        return NaN;
      }
      var modMonth = mod(month, 12);
      year += (month - modMonth) / 12;
      return modMonth === 1 ? isLeapYear(year) ? 29 : 28 : 31 - modMonth % 7 % 2;
    }
    addFormatToken("M", ["MM", 2], "Mo", function () {
      return this.month() + 1;
    });
    addFormatToken("MMM", 0, 0, function (format2) {
      return this.localeData().monthsShort(this, format2);
    });
    addFormatToken("MMMM", 0, 0, function (format2) {
      return this.localeData().months(this, format2);
    });
    addRegexToken("M", match1to2, match1to2NoLeadingZero);
    addRegexToken("MM", match1to2, match2);
    addRegexToken("MMM", function (isStrict, locale2) {
      return locale2.monthsShortRegex(isStrict);
    });
    addRegexToken("MMMM", function (isStrict, locale2) {
      return locale2.monthsRegex(isStrict);
    });
    addParseToken(["M", "MM"], function (input, array) {
      array[MONTH] = toInt(input) - 1;
    });
    addParseToken(["MMM", "MMMM"], function (input, array, config, token2) {
      var month = config._locale.monthsParse(input, token2, config._strict);
      if (month != null) {
        array[MONTH] = month;
      } else {
        getParsingFlags(config).invalidMonth = input;
      }
    });
    var defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split(
      "_"
    ), defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, defaultMonthsShortRegex = matchWord, defaultMonthsRegex = matchWord;
    function localeMonths(m, format2) {
      if (!m) {
        return isArray$2(this._months) ? this._months : this._months["standalone"];
      }
      return isArray$2(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format2) ? "format" : "standalone"][m.month()];
    }
    function localeMonthsShort(m, format2) {
      if (!m) {
        return isArray$2(this._monthsShort) ? this._monthsShort : this._monthsShort["standalone"];
      }
      return isArray$2(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format2) ? "format" : "standalone"][m.month()];
    }
    function handleStrictParse(monthName, format2, strict) {
      var i, ii, mom, llc = monthName.toLocaleLowerCase();
      if (!this._monthsParse) {
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
        for (i = 0; i < 12; ++i) {
          mom = createUTC([2e3, i]);
          this._shortMonthsParse[i] = this.monthsShort(
            mom,
            ""
          ).toLocaleLowerCase();
          this._longMonthsParse[i] = this.months(mom, "").toLocaleLowerCase();
        }
      }
      if (strict) {
        if (format2 === "MMM") {
          ii = indexOf.call(this._shortMonthsParse, llc);
          return ii !== -1 ? ii : null;
        } else {
          ii = indexOf.call(this._longMonthsParse, llc);
          return ii !== -1 ? ii : null;
        }
      } else {
        if (format2 === "MMM") {
          ii = indexOf.call(this._shortMonthsParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._longMonthsParse, llc);
          return ii !== -1 ? ii : null;
        } else {
          ii = indexOf.call(this._longMonthsParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._shortMonthsParse, llc);
          return ii !== -1 ? ii : null;
        }
      }
    }
    function localeMonthsParse(monthName, format2, strict) {
      var i, mom, regex;
      if (this._monthsParseExact) {
        return handleStrictParse.call(this, monthName, format2, strict);
      }
      if (!this._monthsParse) {
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
      }
      for (i = 0; i < 12; i++) {
        mom = createUTC([2e3, i]);
        if (strict && !this._longMonthsParse[i]) {
          this._longMonthsParse[i] = new RegExp(
            "^" + this.months(mom, "").replace(".", "") + "$",
            "i"
          );
          this._shortMonthsParse[i] = new RegExp(
            "^" + this.monthsShort(mom, "").replace(".", "") + "$",
            "i"
          );
        }
        if (!strict && !this._monthsParse[i]) {
          regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, "");
          this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i");
        }
        if (strict && format2 === "MMMM" && this._longMonthsParse[i].test(monthName)) {
          return i;
        } else if (strict && format2 === "MMM" && this._shortMonthsParse[i].test(monthName)) {
          return i;
        } else if (!strict && this._monthsParse[i].test(monthName)) {
          return i;
        }
      }
    }
    function setMonth(mom, value) {
      if (!mom.isValid()) {
        return mom;
      }
      if (typeof value === "string") {
        if (/^\d+$/.test(value)) {
          value = toInt(value);
        } else {
          value = mom.localeData().monthsParse(value);
          if (!isNumber$2(value)) {
            return mom;
          }
        }
      }
      var month = value, date = mom.date();
      date = date < 29 ? date : Math.min(date, daysInMonth(mom.year(), month));
      void (mom._isUTC ? mom._d.setUTCMonth(month, date) : mom._d.setMonth(month, date));
      return mom;
    }
    function getSetMonth(value) {
      if (value != null) {
        setMonth(this, value);
        hooks.updateOffset(this, true);
        return this;
      } else {
        return get(this, "Month");
      }
    }
    function getDaysInMonth() {
      return daysInMonth(this.year(), this.month());
    }
    function monthsShortRegex(isStrict) {
      if (this._monthsParseExact) {
        if (!hasOwnProp(this, "_monthsRegex")) {
          computeMonthsParse.call(this);
        }
        if (isStrict) {
          return this._monthsShortStrictRegex;
        } else {
          return this._monthsShortRegex;
        }
      } else {
        if (!hasOwnProp(this, "_monthsShortRegex")) {
          this._monthsShortRegex = defaultMonthsShortRegex;
        }
        return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
      }
    }
    function monthsRegex(isStrict) {
      if (this._monthsParseExact) {
        if (!hasOwnProp(this, "_monthsRegex")) {
          computeMonthsParse.call(this);
        }
        if (isStrict) {
          return this._monthsStrictRegex;
        } else {
          return this._monthsRegex;
        }
      } else {
        if (!hasOwnProp(this, "_monthsRegex")) {
          this._monthsRegex = defaultMonthsRegex;
        }
        return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
      }
    }
    function computeMonthsParse() {
      function cmpLenRev(a, b2) {
        return b2.length - a.length;
      }
      var shortPieces = [], longPieces = [], mixedPieces = [], i, mom, shortP, longP;
      for (i = 0; i < 12; i++) {
        mom = createUTC([2e3, i]);
        shortP = regexEscape(this.monthsShort(mom, ""));
        longP = regexEscape(this.months(mom, ""));
        shortPieces.push(shortP);
        longPieces.push(longP);
        mixedPieces.push(longP);
        mixedPieces.push(shortP);
      }
      shortPieces.sort(cmpLenRev);
      longPieces.sort(cmpLenRev);
      mixedPieces.sort(cmpLenRev);
      this._monthsRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
      this._monthsShortRegex = this._monthsRegex;
      this._monthsStrictRegex = new RegExp(
        "^(" + longPieces.join("|") + ")",
        "i"
      );
      this._monthsShortStrictRegex = new RegExp(
        "^(" + shortPieces.join("|") + ")",
        "i"
      );
    }
    function createDate(y, m, d, h, M, s, ms) {
      var date;
      if (y < 100 && y >= 0) {
        date = new Date(y + 400, m, d, h, M, s, ms);
        if (isFinite(date.getFullYear())) {
          date.setFullYear(y);
        }
      } else {
        date = new Date(y, m, d, h, M, s, ms);
      }
      return date;
    }
    function createUTCDate(y) {
      var date, args;
      if (y < 100 && y >= 0) {
        args = Array.prototype.slice.call(arguments);
        args[0] = y + 400;
        date = new Date(Date.UTC.apply(null, args));
        if (isFinite(date.getUTCFullYear())) {
          date.setUTCFullYear(y);
        }
      } else {
        date = new Date(Date.UTC.apply(null, arguments));
      }
      return date;
    }
    function firstWeekOffset(year, dow, doy) {
      var fwd = 7 + dow - doy, fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
      return -fwdlw + fwd - 1;
    }
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
      var localWeekday = (7 + weekday - dow) % 7, weekOffset = firstWeekOffset(year, dow, doy), dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset, resYear, resDayOfYear;
      if (dayOfYear <= 0) {
        resYear = year - 1;
        resDayOfYear = daysInYear(resYear) + dayOfYear;
      } else if (dayOfYear > daysInYear(year)) {
        resYear = year + 1;
        resDayOfYear = dayOfYear - daysInYear(year);
      } else {
        resYear = year;
        resDayOfYear = dayOfYear;
      }
      return {
        year: resYear,
        dayOfYear: resDayOfYear
      };
    }
    function weekOfYear(mom, dow, doy) {
      var weekOffset = firstWeekOffset(mom.year(), dow, doy), week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1, resWeek, resYear;
      if (week < 1) {
        resYear = mom.year() - 1;
        resWeek = week + weeksInYear(resYear, dow, doy);
      } else if (week > weeksInYear(mom.year(), dow, doy)) {
        resWeek = week - weeksInYear(mom.year(), dow, doy);
        resYear = mom.year() + 1;
      } else {
        resYear = mom.year();
        resWeek = week;
      }
      return {
        week: resWeek,
        year: resYear
      };
    }
    function weeksInYear(year, dow, doy) {
      var weekOffset = firstWeekOffset(year, dow, doy), weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
      return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }
    addFormatToken("w", ["ww", 2], "wo", "week");
    addFormatToken("W", ["WW", 2], "Wo", "isoWeek");
    addRegexToken("w", match1to2, match1to2NoLeadingZero);
    addRegexToken("ww", match1to2, match2);
    addRegexToken("W", match1to2, match1to2NoLeadingZero);
    addRegexToken("WW", match1to2, match2);
    addWeekParseToken(
      ["w", "ww", "W", "WW"],
      function (input, week, config, token2) {
        week[token2.substr(0, 1)] = toInt(input);
      }
    );
    function localeWeek(mom) {
      return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }
    var defaultLocaleWeek = {
      dow: 0,
      // Sunday is the first day of the week.
      doy: 6
      // The week that contains Jan 6th is the first week of the year.
    };
    function localeFirstDayOfWeek() {
      return this._week.dow;
    }
    function localeFirstDayOfYear() {
      return this._week.doy;
    }
    function getSetWeek(input) {
      var week = this.localeData().week(this);
      return input == null ? week : this.add((input - week) * 7, "d");
    }
    function getSetISOWeek(input) {
      var week = weekOfYear(this, 1, 4).week;
      return input == null ? week : this.add((input - week) * 7, "d");
    }
    addFormatToken("d", 0, "do", "day");
    addFormatToken("dd", 0, 0, function (format2) {
      return this.localeData().weekdaysMin(this, format2);
    });
    addFormatToken("ddd", 0, 0, function (format2) {
      return this.localeData().weekdaysShort(this, format2);
    });
    addFormatToken("dddd", 0, 0, function (format2) {
      return this.localeData().weekdays(this, format2);
    });
    addFormatToken("e", 0, 0, "weekday");
    addFormatToken("E", 0, 0, "isoWeekday");
    addRegexToken("d", match1to2);
    addRegexToken("e", match1to2);
    addRegexToken("E", match1to2);
    addRegexToken("dd", function (isStrict, locale2) {
      return locale2.weekdaysMinRegex(isStrict);
    });
    addRegexToken("ddd", function (isStrict, locale2) {
      return locale2.weekdaysShortRegex(isStrict);
    });
    addRegexToken("dddd", function (isStrict, locale2) {
      return locale2.weekdaysRegex(isStrict);
    });
    addWeekParseToken(["dd", "ddd", "dddd"], function (input, week, config, token2) {
      var weekday = config._locale.weekdaysParse(input, token2, config._strict);
      if (weekday != null) {
        week.d = weekday;
      } else {
        getParsingFlags(config).invalidWeekday = input;
      }
    });
    addWeekParseToken(["d", "e", "E"], function (input, week, config, token2) {
      week[token2] = toInt(input);
    });
    function parseWeekday(input, locale2) {
      if (typeof input !== "string") {
        return input;
      }
      if (!isNaN(input)) {
        return parseInt(input, 10);
      }
      input = locale2.weekdaysParse(input);
      if (typeof input === "number") {
        return input;
      }
      return null;
    }
    function parseIsoWeekday(input, locale2) {
      if (typeof input === "string") {
        return locale2.weekdaysParse(input) % 7 || 7;
      }
      return isNaN(input) ? null : input;
    }
    function shiftWeekdays(ws, n) {
      return ws.slice(n, 7).concat(ws.slice(0, n));
    }
    var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), defaultWeekdaysRegex = matchWord, defaultWeekdaysShortRegex = matchWord, defaultWeekdaysMinRegex = matchWord;
    function localeWeekdays(m, format2) {
      var weekdays = isArray$2(this._weekdays) ? this._weekdays : this._weekdays[m && m !== true && this._weekdays.isFormat.test(format2) ? "format" : "standalone"];
      return m === true ? shiftWeekdays(weekdays, this._week.dow) : m ? weekdays[m.day()] : weekdays;
    }
    function localeWeekdaysShort(m) {
      return m === true ? shiftWeekdays(this._weekdaysShort, this._week.dow) : m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
    }
    function localeWeekdaysMin(m) {
      return m === true ? shiftWeekdays(this._weekdaysMin, this._week.dow) : m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
    }
    function handleStrictParse$1(weekdayName, format2, strict) {
      var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
      if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._minWeekdaysParse = [];
        for (i = 0; i < 7; ++i) {
          mom = createUTC([2e3, 1]).day(i);
          this._minWeekdaysParse[i] = this.weekdaysMin(
            mom,
            ""
          ).toLocaleLowerCase();
          this._shortWeekdaysParse[i] = this.weekdaysShort(
            mom,
            ""
          ).toLocaleLowerCase();
          this._weekdaysParse[i] = this.weekdays(mom, "").toLocaleLowerCase();
        }
      }
      if (strict) {
        if (format2 === "dddd") {
          ii = indexOf.call(this._weekdaysParse, llc);
          return ii !== -1 ? ii : null;
        } else if (format2 === "ddd") {
          ii = indexOf.call(this._shortWeekdaysParse, llc);
          return ii !== -1 ? ii : null;
        } else {
          ii = indexOf.call(this._minWeekdaysParse, llc);
          return ii !== -1 ? ii : null;
        }
      } else {
        if (format2 === "dddd") {
          ii = indexOf.call(this._weekdaysParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._shortWeekdaysParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._minWeekdaysParse, llc);
          return ii !== -1 ? ii : null;
        } else if (format2 === "ddd") {
          ii = indexOf.call(this._shortWeekdaysParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._weekdaysParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._minWeekdaysParse, llc);
          return ii !== -1 ? ii : null;
        } else {
          ii = indexOf.call(this._minWeekdaysParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._weekdaysParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._shortWeekdaysParse, llc);
          return ii !== -1 ? ii : null;
        }
      }
    }
    function localeWeekdaysParse(weekdayName, format2, strict) {
      var i, mom, regex;
      if (this._weekdaysParseExact) {
        return handleStrictParse$1.call(this, weekdayName, format2, strict);
      }
      if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._minWeekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._fullWeekdaysParse = [];
      }
      for (i = 0; i < 7; i++) {
        mom = createUTC([2e3, 1]).day(i);
        if (strict && !this._fullWeekdaysParse[i]) {
          this._fullWeekdaysParse[i] = new RegExp(
            "^" + this.weekdays(mom, "").replace(".", "\\.?") + "$",
            "i"
          );
          this._shortWeekdaysParse[i] = new RegExp(
            "^" + this.weekdaysShort(mom, "").replace(".", "\\.?") + "$",
            "i"
          );
          this._minWeekdaysParse[i] = new RegExp(
            "^" + this.weekdaysMin(mom, "").replace(".", "\\.?") + "$",
            "i"
          );
        }
        if (!this._weekdaysParse[i]) {
          regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, "");
          this._weekdaysParse[i] = new RegExp(regex.replace(".", ""), "i");
        }
        if (strict && format2 === "dddd" && this._fullWeekdaysParse[i].test(weekdayName)) {
          return i;
        } else if (strict && format2 === "ddd" && this._shortWeekdaysParse[i].test(weekdayName)) {
          return i;
        } else if (strict && format2 === "dd" && this._minWeekdaysParse[i].test(weekdayName)) {
          return i;
        } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
          return i;
        }
      }
    }
    function getSetDayOfWeek(input) {
      if (!this.isValid()) {
        return input != null ? this : NaN;
      }
      var day = get(this, "Day");
      if (input != null) {
        input = parseWeekday(input, this.localeData());
        return this.add(input - day, "d");
      } else {
        return day;
      }
    }
    function getSetLocaleDayOfWeek(input) {
      if (!this.isValid()) {
        return input != null ? this : NaN;
      }
      var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
      return input == null ? weekday : this.add(input - weekday, "d");
    }
    function getSetISODayOfWeek(input) {
      if (!this.isValid()) {
        return input != null ? this : NaN;
      }
      if (input != null) {
        var weekday = parseIsoWeekday(input, this.localeData());
        return this.day(this.day() % 7 ? weekday : weekday - 7);
      } else {
        return this.day() || 7;
      }
    }
    function weekdaysRegex(isStrict) {
      if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, "_weekdaysRegex")) {
          computeWeekdaysParse.call(this);
        }
        if (isStrict) {
          return this._weekdaysStrictRegex;
        } else {
          return this._weekdaysRegex;
        }
      } else {
        if (!hasOwnProp(this, "_weekdaysRegex")) {
          this._weekdaysRegex = defaultWeekdaysRegex;
        }
        return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
      }
    }
    function weekdaysShortRegex(isStrict) {
      if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, "_weekdaysRegex")) {
          computeWeekdaysParse.call(this);
        }
        if (isStrict) {
          return this._weekdaysShortStrictRegex;
        } else {
          return this._weekdaysShortRegex;
        }
      } else {
        if (!hasOwnProp(this, "_weekdaysShortRegex")) {
          this._weekdaysShortRegex = defaultWeekdaysShortRegex;
        }
        return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
      }
    }
    function weekdaysMinRegex(isStrict) {
      if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, "_weekdaysRegex")) {
          computeWeekdaysParse.call(this);
        }
        if (isStrict) {
          return this._weekdaysMinStrictRegex;
        } else {
          return this._weekdaysMinRegex;
        }
      } else {
        if (!hasOwnProp(this, "_weekdaysMinRegex")) {
          this._weekdaysMinRegex = defaultWeekdaysMinRegex;
        }
        return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
      }
    }
    function computeWeekdaysParse() {
      function cmpLenRev(a, b2) {
        return b2.length - a.length;
      }
      var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [], i, mom, minp, shortp, longp;
      for (i = 0; i < 7; i++) {
        mom = createUTC([2e3, 1]).day(i);
        minp = regexEscape(this.weekdaysMin(mom, ""));
        shortp = regexEscape(this.weekdaysShort(mom, ""));
        longp = regexEscape(this.weekdays(mom, ""));
        minPieces.push(minp);
        shortPieces.push(shortp);
        longPieces.push(longp);
        mixedPieces.push(minp);
        mixedPieces.push(shortp);
        mixedPieces.push(longp);
      }
      minPieces.sort(cmpLenRev);
      shortPieces.sort(cmpLenRev);
      longPieces.sort(cmpLenRev);
      mixedPieces.sort(cmpLenRev);
      this._weekdaysRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
      this._weekdaysShortRegex = this._weekdaysRegex;
      this._weekdaysMinRegex = this._weekdaysRegex;
      this._weekdaysStrictRegex = new RegExp(
        "^(" + longPieces.join("|") + ")",
        "i"
      );
      this._weekdaysShortStrictRegex = new RegExp(
        "^(" + shortPieces.join("|") + ")",
        "i"
      );
      this._weekdaysMinStrictRegex = new RegExp(
        "^(" + minPieces.join("|") + ")",
        "i"
      );
    }
    function hFormat() {
      return this.hours() % 12 || 12;
    }
    function kFormat() {
      return this.hours() || 24;
    }
    addFormatToken("H", ["HH", 2], 0, "hour");
    addFormatToken("h", ["hh", 2], 0, hFormat);
    addFormatToken("k", ["kk", 2], 0, kFormat);
    addFormatToken("hmm", 0, 0, function () {
      return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });
    addFormatToken("hmmss", 0, 0, function () {
      return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
    });
    addFormatToken("Hmm", 0, 0, function () {
      return "" + this.hours() + zeroFill(this.minutes(), 2);
    });
    addFormatToken("Hmmss", 0, 0, function () {
      return "" + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
    });
    function meridiem(token2, lowercase) {
      addFormatToken(token2, 0, 0, function () {
        return this.localeData().meridiem(
          this.hours(),
          this.minutes(),
          lowercase
        );
      });
    }
    meridiem("a", true);
    meridiem("A", false);
    function matchMeridiem(isStrict, locale2) {
      return locale2._meridiemParse;
    }
    addRegexToken("a", matchMeridiem);
    addRegexToken("A", matchMeridiem);
    addRegexToken("H", match1to2, match1to2HasZero);
    addRegexToken("h", match1to2, match1to2NoLeadingZero);
    addRegexToken("k", match1to2, match1to2NoLeadingZero);
    addRegexToken("HH", match1to2, match2);
    addRegexToken("hh", match1to2, match2);
    addRegexToken("kk", match1to2, match2);
    addRegexToken("hmm", match3to4);
    addRegexToken("hmmss", match5to6);
    addRegexToken("Hmm", match3to4);
    addRegexToken("Hmmss", match5to6);
    addParseToken(["H", "HH"], HOUR);
    addParseToken(["k", "kk"], function (input, array, config) {
      var kInput = toInt(input);
      array[HOUR] = kInput === 24 ? 0 : kInput;
    });
    addParseToken(["a", "A"], function (input, array, config) {
      config._isPm = config._locale.isPM(input);
      config._meridiem = input;
    });
    addParseToken(["h", "hh"], function (input, array, config) {
      array[HOUR] = toInt(input);
      getParsingFlags(config).bigHour = true;
    });
    addParseToken("hmm", function (input, array, config) {
      var pos = input.length - 2;
      array[HOUR] = toInt(input.substr(0, pos));
      array[MINUTE] = toInt(input.substr(pos));
      getParsingFlags(config).bigHour = true;
    });
    addParseToken("hmmss", function (input, array, config) {
      var pos1 = input.length - 4, pos2 = input.length - 2;
      array[HOUR] = toInt(input.substr(0, pos1));
      array[MINUTE] = toInt(input.substr(pos1, 2));
      array[SECOND] = toInt(input.substr(pos2));
      getParsingFlags(config).bigHour = true;
    });
    addParseToken("Hmm", function (input, array, config) {
      var pos = input.length - 2;
      array[HOUR] = toInt(input.substr(0, pos));
      array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken("Hmmss", function (input, array, config) {
      var pos1 = input.length - 4, pos2 = input.length - 2;
      array[HOUR] = toInt(input.substr(0, pos1));
      array[MINUTE] = toInt(input.substr(pos1, 2));
      array[SECOND] = toInt(input.substr(pos2));
    });
    function localeIsPM(input) {
      return (input + "").toLowerCase().charAt(0) === "p";
    }
    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i, getSetHour = makeGetSet("Hours", true);
    function localeMeridiem(hours2, minutes2, isLower) {
      if (hours2 > 11) {
        return isLower ? "pm" : "PM";
      } else {
        return isLower ? "am" : "AM";
      }
    }
    var baseConfig = {
      calendar: defaultCalendar,
      longDateFormat: defaultLongDateFormat,
      invalidDate: defaultInvalidDate,
      ordinal: defaultOrdinal,
      dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
      relativeTime: defaultRelativeTime,
      months: defaultLocaleMonths,
      monthsShort: defaultLocaleMonthsShort,
      week: defaultLocaleWeek,
      weekdays: defaultLocaleWeekdays,
      weekdaysMin: defaultLocaleWeekdaysMin,
      weekdaysShort: defaultLocaleWeekdaysShort,
      meridiemParse: defaultLocaleMeridiemParse
    };
    var locales = {}, localeFamilies = {}, globalLocale;
    function commonPrefix(arr1, arr2) {
      var i, minl = Math.min(arr1.length, arr2.length);
      for (i = 0; i < minl; i += 1) {
        if (arr1[i] !== arr2[i]) {
          return i;
        }
      }
      return minl;
    }
    function normalizeLocale(key2) {
      return key2 ? key2.toLowerCase().replace("_", "-") : key2;
    }
    function chooseLocale(names) {
      var i = 0, j, next, locale2, split;
      while (i < names.length) {
        split = normalizeLocale(names[i]).split("-");
        j = split.length;
        next = normalizeLocale(names[i + 1]);
        next = next ? next.split("-") : null;
        while (j > 0) {
          locale2 = loadLocale(split.slice(0, j).join("-"));
          if (locale2) {
            return locale2;
          }
          if (next && next.length >= j && commonPrefix(split, next) >= j - 1) {
            break;
          }
          j--;
        }
        i++;
      }
      return globalLocale;
    }
    function isLocaleNameSane(name) {
      return !!(name && name.match("^[^/\\\\]*$"));
    }
    function loadLocale(name) {
      var oldLocale = null, aliasedRequire;
      if (locales[name] === void 0 && typeof module !== "undefined" && module && module.exports && isLocaleNameSane(name)) {
        try {
          oldLocale = globalLocale._abbr;
          aliasedRequire = require;
          aliasedRequire("./locale/" + name);
          getSetGlobalLocale(oldLocale);
        } catch (e) {
          locales[name] = null;
        }
      }
      return locales[name];
    }
    function getSetGlobalLocale(key2, values) {
      var data;
      if (key2) {
        if (isUndefined(values)) {
          data = getLocale(key2);
        } else {
          data = defineLocale(key2, values);
        }
        if (data) {
          globalLocale = data;
        } else {
          if (typeof console !== "undefined" && console.warn) {
            console.warn(
              "Locale " + key2 + " not found. Did you forget to load it?"
            );
          }
        }
      }
      return globalLocale._abbr;
    }
    function defineLocale(name, config) {
      if (config !== null) {
        var locale2, parentConfig = baseConfig;
        config.abbr = name;
        if (locales[name] != null) {
          deprecateSimple(
            "defineLocaleOverride",
            "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
          );
          parentConfig = locales[name]._config;
        } else if (config.parentLocale != null) {
          if (locales[config.parentLocale] != null) {
            parentConfig = locales[config.parentLocale]._config;
          } else {
            locale2 = loadLocale(config.parentLocale);
            if (locale2 != null) {
              parentConfig = locale2._config;
            } else {
              if (!localeFamilies[config.parentLocale]) {
                localeFamilies[config.parentLocale] = [];
              }
              localeFamilies[config.parentLocale].push({
                name,
                config
              });
              return null;
            }
          }
        }
        locales[name] = new Locale(mergeConfigs(parentConfig, config));
        if (localeFamilies[name]) {
          localeFamilies[name].forEach(function (x) {
            defineLocale(x.name, x.config);
          });
        }
        getSetGlobalLocale(name);
        return locales[name];
      } else {
        delete locales[name];
        return null;
      }
    }
    function updateLocale(name, config) {
      if (config != null) {
        var locale2, tmpLocale, parentConfig = baseConfig;
        if (locales[name] != null && locales[name].parentLocale != null) {
          locales[name].set(mergeConfigs(locales[name]._config, config));
        } else {
          tmpLocale = loadLocale(name);
          if (tmpLocale != null) {
            parentConfig = tmpLocale._config;
          }
          config = mergeConfigs(parentConfig, config);
          if (tmpLocale == null) {
            config.abbr = name;
          }
          locale2 = new Locale(config);
          locale2.parentLocale = locales[name];
          locales[name] = locale2;
        }
        getSetGlobalLocale(name);
      } else {
        if (locales[name] != null) {
          if (locales[name].parentLocale != null) {
            locales[name] = locales[name].parentLocale;
            if (name === getSetGlobalLocale()) {
              getSetGlobalLocale(name);
            }
          } else if (locales[name] != null) {
            delete locales[name];
          }
        }
      }
      return locales[name];
    }
    function getLocale(key2) {
      var locale2;
      if (key2 && key2._locale && key2._locale._abbr) {
        key2 = key2._locale._abbr;
      }
      if (!key2) {
        return globalLocale;
      }
      if (!isArray$2(key2)) {
        locale2 = loadLocale(key2);
        if (locale2) {
          return locale2;
        }
        key2 = [key2];
      }
      return chooseLocale(key2);
    }
    function listLocales() {
      return keys(locales);
    }
    function checkOverflow(m) {
      var overflow, a = m._a;
      if (a && getParsingFlags(m).overflow === -2) {
        overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;
        if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
          overflow = DATE;
        }
        if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
          overflow = WEEK;
        }
        if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
          overflow = WEEKDAY;
        }
        getParsingFlags(m).overflow = overflow;
      }
      return m;
    }
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, tzRegex = /Z|[+-]\d\d(?::?\d\d)?/, isoDates = [
      ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
      ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
      ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
      ["GGGG-[W]WW", /\d{4}-W\d\d/, false],
      ["YYYY-DDD", /\d{4}-\d{3}/],
      ["YYYY-MM", /\d{4}-\d\d/, false],
      ["YYYYYYMMDD", /[+-]\d{10}/],
      ["YYYYMMDD", /\d{8}/],
      ["GGGG[W]WWE", /\d{4}W\d{3}/],
      ["GGGG[W]WW", /\d{4}W\d{2}/, false],
      ["YYYYDDD", /\d{7}/],
      ["YYYYMM", /\d{6}/, false],
      ["YYYY", /\d{4}/, false]
    ], isoTimes = [
      ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
      ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
      ["HH:mm:ss", /\d\d:\d\d:\d\d/],
      ["HH:mm", /\d\d:\d\d/],
      ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
      ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
      ["HHmmss", /\d\d\d\d\d\d/],
      ["HHmm", /\d\d\d\d/],
      ["HH", /\d\d/]
    ], aspNetJsonRegex = /^\/?Date\((-?\d+)/i, rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, obsOffsets = {
      UT: 0,
      GMT: 0,
      EDT: -4 * 60,
      EST: -5 * 60,
      CDT: -5 * 60,
      CST: -6 * 60,
      MDT: -6 * 60,
      MST: -7 * 60,
      PDT: -7 * 60,
      PST: -8 * 60
    };
    function configFromISO(config) {
      var i, l, string = config._i, match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string), allowTime, dateFormat, timeFormat, tzFormat, isoDatesLen = isoDates.length, isoTimesLen = isoTimes.length;
      if (match) {
        getParsingFlags(config).iso = true;
        for (i = 0, l = isoDatesLen; i < l; i++) {
          if (isoDates[i][1].exec(match[1])) {
            dateFormat = isoDates[i][0];
            allowTime = isoDates[i][2] !== false;
            break;
          }
        }
        if (dateFormat == null) {
          config._isValid = false;
          return;
        }
        if (match[3]) {
          for (i = 0, l = isoTimesLen; i < l; i++) {
            if (isoTimes[i][1].exec(match[3])) {
              timeFormat = (match[2] || " ") + isoTimes[i][0];
              break;
            }
          }
          if (timeFormat == null) {
            config._isValid = false;
            return;
          }
        }
        if (!allowTime && timeFormat != null) {
          config._isValid = false;
          return;
        }
        if (match[4]) {
          if (tzRegex.exec(match[4])) {
            tzFormat = "Z";
          } else {
            config._isValid = false;
            return;
          }
        }
        config._f = dateFormat + (timeFormat || "") + (tzFormat || "");
        configFromStringAndFormat(config);
      } else {
        config._isValid = false;
      }
    }
    function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
      var result = [
        untruncateYear(yearStr),
        defaultLocaleMonthsShort.indexOf(monthStr),
        parseInt(dayStr, 10),
        parseInt(hourStr, 10),
        parseInt(minuteStr, 10)
      ];
      if (secondStr) {
        result.push(parseInt(secondStr, 10));
      }
      return result;
    }
    function untruncateYear(yearStr) {
      var year = parseInt(yearStr, 10);
      if (year <= 49) {
        return 2e3 + year;
      } else if (year <= 999) {
        return 1900 + year;
      }
      return year;
    }
    function preprocessRFC2822(s) {
      return s.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
    }
    function checkWeekday(weekdayStr, parsedInput, config) {
      if (weekdayStr) {
        var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr), weekdayActual = new Date(
          parsedInput[0],
          parsedInput[1],
          parsedInput[2]
        ).getDay();
        if (weekdayProvided !== weekdayActual) {
          getParsingFlags(config).weekdayMismatch = true;
          config._isValid = false;
          return false;
        }
      }
      return true;
    }
    function calculateOffset(obsOffset, militaryOffset, numOffset) {
      if (obsOffset) {
        return obsOffsets[obsOffset];
      } else if (militaryOffset) {
        return 0;
      } else {
        var hm = parseInt(numOffset, 10), m = hm % 100, h = (hm - m) / 100;
        return h * 60 + m;
      }
    }
    function configFromRFC2822(config) {
      var match = rfc2822.exec(preprocessRFC2822(config._i)), parsedArray;
      if (match) {
        parsedArray = extractFromRFC2822Strings(
          match[4],
          match[3],
          match[2],
          match[5],
          match[6],
          match[7]
        );
        if (!checkWeekday(match[1], parsedArray, config)) {
          return;
        }
        config._a = parsedArray;
        config._tzm = calculateOffset(match[8], match[9], match[10]);
        config._d = createUTCDate.apply(null, config._a);
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        getParsingFlags(config).rfc2822 = true;
      } else {
        config._isValid = false;
      }
    }
    function configFromString(config) {
      var matched = aspNetJsonRegex.exec(config._i);
      if (matched !== null) {
        config._d = /* @__PURE__ */ new Date(+matched[1]);
        return;
      }
      configFromISO(config);
      if (config._isValid === false) {
        delete config._isValid;
      } else {
        return;
      }
      configFromRFC2822(config);
      if (config._isValid === false) {
        delete config._isValid;
      } else {
        return;
      }
      if (config._strict) {
        config._isValid = false;
      } else {
        hooks.createFromInputFallback(config);
      }
    }
    hooks.createFromInputFallback = deprecate(
      "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
      function (config) {
        config._d = /* @__PURE__ */ new Date(config._i + (config._useUTC ? " UTC" : ""));
      }
    );
    function defaults$2(a, b2, c) {
      if (a != null) {
        return a;
      }
      if (b2 != null) {
        return b2;
      }
      return c;
    }
    function currentDateArray(config) {
      var nowValue = new Date(hooks.now());
      if (config._useUTC) {
        return [
          nowValue.getUTCFullYear(),
          nowValue.getUTCMonth(),
          nowValue.getUTCDate()
        ];
      }
      return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }
    function configFromArray(config) {
      var i, date, input = [], currentDate, expectedWeekday, yearToUse;
      if (config._d) {
        return;
      }
      currentDate = currentDateArray(config);
      if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
        dayOfYearFromWeekInfo(config);
      }
      if (config._dayOfYear != null) {
        yearToUse = defaults$2(config._a[YEAR], currentDate[YEAR]);
        if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
          getParsingFlags(config)._overflowDayOfYear = true;
        }
        date = createUTCDate(yearToUse, 0, config._dayOfYear);
        config._a[MONTH] = date.getUTCMonth();
        config._a[DATE] = date.getUTCDate();
      }
      for (i = 0; i < 3 && config._a[i] == null; ++i) {
        config._a[i] = input[i] = currentDate[i];
      }
      for (; i < 7; i++) {
        config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i];
      }
      if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
        config._nextDay = true;
        config._a[HOUR] = 0;
      }
      config._d = (config._useUTC ? createUTCDate : createDate).apply(
        null,
        input
      );
      expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();
      if (config._tzm != null) {
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
      }
      if (config._nextDay) {
        config._a[HOUR] = 24;
      }
      if (config._w && typeof config._w.d !== "undefined" && config._w.d !== expectedWeekday) {
        getParsingFlags(config).weekdayMismatch = true;
      }
    }
    function dayOfYearFromWeekInfo(config) {
      var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;
      w = config._w;
      if (w.GG != null || w.W != null || w.E != null) {
        dow = 1;
        doy = 4;
        weekYear = defaults$2(
          w.GG,
          config._a[YEAR],
          weekOfYear(createLocal(), 1, 4).year
        );
        week = defaults$2(w.W, 1);
        weekday = defaults$2(w.E, 1);
        if (weekday < 1 || weekday > 7) {
          weekdayOverflow = true;
        }
      } else {
        dow = config._locale._week.dow;
        doy = config._locale._week.doy;
        curWeek = weekOfYear(createLocal(), dow, doy);
        weekYear = defaults$2(w.gg, config._a[YEAR], curWeek.year);
        week = defaults$2(w.w, curWeek.week);
        if (w.d != null) {
          weekday = w.d;
          if (weekday < 0 || weekday > 6) {
            weekdayOverflow = true;
          }
        } else if (w.e != null) {
          weekday = w.e + dow;
          if (w.e < 0 || w.e > 6) {
            weekdayOverflow = true;
          }
        } else {
          weekday = dow;
        }
      }
      if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
        getParsingFlags(config)._overflowWeeks = true;
      } else if (weekdayOverflow != null) {
        getParsingFlags(config)._overflowWeekday = true;
      } else {
        temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
      }
    }
    hooks.ISO_8601 = function () {
    };
    hooks.RFC_2822 = function () {
    };
    function configFromStringAndFormat(config) {
      if (config._f === hooks.ISO_8601) {
        configFromISO(config);
        return;
      }
      if (config._f === hooks.RFC_2822) {
        configFromRFC2822(config);
        return;
      }
      config._a = [];
      getParsingFlags(config).empty = true;
      var string = "" + config._i, i, parsedInput, tokens2, token2, skipped, stringLength = string.length, totalParsedInputLength = 0, era, tokenLen;
      tokens2 = expandFormat(config._f, config._locale).match(formattingTokens) || [];
      tokenLen = tokens2.length;
      for (i = 0; i < tokenLen; i++) {
        token2 = tokens2[i];
        parsedInput = (string.match(getParseRegexForToken(token2, config)) || [])[0];
        if (parsedInput) {
          skipped = string.substr(0, string.indexOf(parsedInput));
          if (skipped.length > 0) {
            getParsingFlags(config).unusedInput.push(skipped);
          }
          string = string.slice(
            string.indexOf(parsedInput) + parsedInput.length
          );
          totalParsedInputLength += parsedInput.length;
        }
        if (formatTokenFunctions[token2]) {
          if (parsedInput) {
            getParsingFlags(config).empty = false;
          } else {
            getParsingFlags(config).unusedTokens.push(token2);
          }
          addTimeToArrayFromToken(token2, parsedInput, config);
        } else if (config._strict && !parsedInput) {
          getParsingFlags(config).unusedTokens.push(token2);
        }
      }
      getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
      if (string.length > 0) {
        getParsingFlags(config).unusedInput.push(string);
      }
      if (config._a[HOUR] <= 12 && getParsingFlags(config).bigHour === true && config._a[HOUR] > 0) {
        getParsingFlags(config).bigHour = void 0;
      }
      getParsingFlags(config).parsedDateParts = config._a.slice(0);
      getParsingFlags(config).meridiem = config._meridiem;
      config._a[HOUR] = meridiemFixWrap(
        config._locale,
        config._a[HOUR],
        config._meridiem
      );
      era = getParsingFlags(config).era;
      if (era !== null) {
        config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
      }
      configFromArray(config);
      checkOverflow(config);
    }
    function meridiemFixWrap(locale2, hour, meridiem2) {
      var isPm;
      if (meridiem2 == null) {
        return hour;
      }
      if (locale2.meridiemHour != null) {
        return locale2.meridiemHour(hour, meridiem2);
      } else if (locale2.isPM != null) {
        isPm = locale2.isPM(meridiem2);
        if (isPm && hour < 12) {
          hour += 12;
        }
        if (!isPm && hour === 12) {
          hour = 0;
        }
        return hour;
      } else {
        return hour;
      }
    }
    function configFromStringAndArray(config) {
      var tempConfig, bestMoment, scoreToBeat, i, currentScore, validFormatFound, bestFormatIsValid = false, configfLen = config._f.length;
      if (configfLen === 0) {
        getParsingFlags(config).invalidFormat = true;
        config._d = /* @__PURE__ */ new Date(NaN);
        return;
      }
      for (i = 0; i < configfLen; i++) {
        currentScore = 0;
        validFormatFound = false;
        tempConfig = copyConfig({}, config);
        if (config._useUTC != null) {
          tempConfig._useUTC = config._useUTC;
        }
        tempConfig._f = config._f[i];
        configFromStringAndFormat(tempConfig);
        if (isValid(tempConfig)) {
          validFormatFound = true;
        }
        currentScore += getParsingFlags(tempConfig).charsLeftOver;
        currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
        getParsingFlags(tempConfig).score = currentScore;
        if (!bestFormatIsValid) {
          if (scoreToBeat == null || currentScore < scoreToBeat || validFormatFound) {
            scoreToBeat = currentScore;
            bestMoment = tempConfig;
            if (validFormatFound) {
              bestFormatIsValid = true;
            }
          }
        } else {
          if (currentScore < scoreToBeat) {
            scoreToBeat = currentScore;
            bestMoment = tempConfig;
          }
        }
      }
      extend$1(config, bestMoment || tempConfig);
    }
    function configFromObject(config) {
      if (config._d) {
        return;
      }
      var i = normalizeObjectUnits(config._i), dayOrDate = i.day === void 0 ? i.date : i.day;
      config._a = map(
        [i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond],
        function (obj) {
          return obj && parseInt(obj, 10);
        }
      );
      configFromArray(config);
    }
    function createFromConfig(config) {
      var res = new Moment(checkOverflow(prepareConfig(config)));
      if (res._nextDay) {
        res.add(1, "d");
        res._nextDay = void 0;
      }
      return res;
    }
    function prepareConfig(config) {
      var input = config._i, format2 = config._f;
      config._locale = config._locale || getLocale(config._l);
      if (input === null || format2 === void 0 && input === "") {
        return createInvalid({ nullInput: true });
      }
      if (typeof input === "string") {
        config._i = input = config._locale.preparse(input);
      }
      if (isMoment(input)) {
        return new Moment(checkOverflow(input));
      } else if (isDate(input)) {
        config._d = input;
      } else if (isArray$2(format2)) {
        configFromStringAndArray(config);
      } else if (format2) {
        configFromStringAndFormat(config);
      } else {
        configFromInput(config);
      }
      if (!isValid(config)) {
        config._d = null;
      }
      return config;
    }
    function configFromInput(config) {
      var input = config._i;
      if (isUndefined(input)) {
        config._d = new Date(hooks.now());
      } else if (isDate(input)) {
        config._d = new Date(input.valueOf());
      } else if (typeof input === "string") {
        configFromString(config);
      } else if (isArray$2(input)) {
        config._a = map(input.slice(0), function (obj) {
          return parseInt(obj, 10);
        });
        configFromArray(config);
      } else if (isObject$2(input)) {
        configFromObject(config);
      } else if (isNumber$2(input)) {
        config._d = new Date(input);
      } else {
        hooks.createFromInputFallback(config);
      }
    }
    function createLocalOrUTC(input, format2, locale2, strict, isUTC) {
      var c = {};
      if (format2 === true || format2 === false) {
        strict = format2;
        format2 = void 0;
      }
      if (locale2 === true || locale2 === false) {
        strict = locale2;
        locale2 = void 0;
      }
      if (isObject$2(input) && isObjectEmpty(input) || isArray$2(input) && input.length === 0) {
        input = void 0;
      }
      c._isAMomentObject = true;
      c._useUTC = c._isUTC = isUTC;
      c._l = locale2;
      c._i = input;
      c._f = format2;
      c._strict = strict;
      return createFromConfig(c);
    }
    function createLocal(input, format2, locale2, strict) {
      return createLocalOrUTC(input, format2, locale2, strict, false);
    }
    var prototypeMin = deprecate(
      "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
      function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
          return other < this ? this : other;
        } else {
          return createInvalid();
        }
      }
    ), prototypeMax = deprecate(
      "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
      function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
          return other > this ? this : other;
        } else {
          return createInvalid();
        }
      }
    );
    function pickBy(fn, moments) {
      var res, i;
      if (moments.length === 1 && isArray$2(moments[0])) {
        moments = moments[0];
      }
      if (!moments.length) {
        return createLocal();
      }
      res = moments[0];
      for (i = 1; i < moments.length; ++i) {
        if (!moments[i].isValid() || moments[i][fn](res)) {
          res = moments[i];
        }
      }
      return res;
    }
    function min() {
      var args = [].slice.call(arguments, 0);
      return pickBy("isBefore", args);
    }
    function max() {
      var args = [].slice.call(arguments, 0);
      return pickBy("isAfter", args);
    }
    var now = function () {
      return Date.now ? Date.now() : +/* @__PURE__ */ new Date();
    };
    var ordering = [
      "year",
      "quarter",
      "month",
      "week",
      "day",
      "hour",
      "minute",
      "second",
      "millisecond"
    ];
    function isDurationValid(m) {
      var key2, unitHasDecimal = false, i, orderLen = ordering.length;
      for (key2 in m) {
        if (hasOwnProp(m, key2) && !(indexOf.call(ordering, key2) !== -1 && (m[key2] == null || !isNaN(m[key2])))) {
          return false;
        }
      }
      for (i = 0; i < orderLen; ++i) {
        if (m[ordering[i]]) {
          if (unitHasDecimal) {
            return false;
          }
          if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
            unitHasDecimal = true;
          }
        }
      }
      return true;
    }
    function isValid$1() {
      return this._isValid;
    }
    function createInvalid$1() {
      return createDuration(NaN);
    }
    function Duration(duration) {
      var normalizedInput = normalizeObjectUnits(duration), years2 = normalizedInput.year || 0, quarters = normalizedInput.quarter || 0, months2 = normalizedInput.month || 0, weeks2 = normalizedInput.week || normalizedInput.isoWeek || 0, days2 = normalizedInput.day || 0, hours2 = normalizedInput.hour || 0, minutes2 = normalizedInput.minute || 0, seconds2 = normalizedInput.second || 0, milliseconds2 = normalizedInput.millisecond || 0;
      this._isValid = isDurationValid(normalizedInput);
      this._milliseconds = +milliseconds2 + seconds2 * 1e3 + // 1000
        minutes2 * 6e4 + // 1000 * 60
        hours2 * 1e3 * 60 * 60;
      this._days = +days2 + weeks2 * 7;
      this._months = +months2 + quarters * 3 + years2 * 12;
      this._data = {};
      this._locale = getLocale();
      this._bubble();
    }
    function isDuration(obj) {
      return obj instanceof Duration;
    }
    function absRound(number) {
      if (number < 0) {
        return Math.round(-1 * number) * -1;
      } else {
        return Math.round(number);
      }
    }
    function compareArrays(array1, array2, dontConvert) {
      var len = Math.min(array1.length, array2.length), lengthDiff = Math.abs(array1.length - array2.length), diffs = 0, i;
      for (i = 0; i < len; i++) {
        if (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) {
          diffs++;
        }
      }
      return diffs + lengthDiff;
    }
    function offset(token2, separator) {
      addFormatToken(token2, 0, 0, function () {
        var offset2 = this.utcOffset(), sign2 = "+";
        if (offset2 < 0) {
          offset2 = -offset2;
          sign2 = "-";
        }
        return sign2 + zeroFill(~~(offset2 / 60), 2) + separator + zeroFill(~~offset2 % 60, 2);
      });
    }
    offset("Z", ":");
    offset("ZZ", "");
    addRegexToken("Z", matchShortOffset);
    addRegexToken("ZZ", matchShortOffset);
    addParseToken(["Z", "ZZ"], function (input, array, config) {
      config._useUTC = true;
      config._tzm = offsetFromString(matchShortOffset, input);
    });
    var chunkOffset = /([\+\-]|\d\d)/gi;
    function offsetFromString(matcher, string) {
      var matches2 = (string || "").match(matcher), chunk, parts, minutes2;
      if (matches2 === null) {
        return null;
      }
      chunk = matches2[matches2.length - 1] || [];
      parts = (chunk + "").match(chunkOffset) || ["-", 0, 0];
      minutes2 = +(parts[1] * 60) + toInt(parts[2]);
      return minutes2 === 0 ? 0 : parts[0] === "+" ? minutes2 : -minutes2;
    }
    function cloneWithOffset(input, model) {
      var res, diff2;
      if (model._isUTC) {
        res = model.clone();
        diff2 = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
        res._d.setTime(res._d.valueOf() + diff2);
        hooks.updateOffset(res, false);
        return res;
      } else {
        return createLocal(input).local();
      }
    }
    function getDateOffset(m) {
      return -Math.round(m._d.getTimezoneOffset());
    }
    hooks.updateOffset = function () {
    };
    function getSetOffset(input, keepLocalTime, keepMinutes) {
      var offset2 = this._offset || 0, localAdjust;
      if (!this.isValid()) {
        return input != null ? this : NaN;
      }
      if (input != null) {
        if (typeof input === "string") {
          input = offsetFromString(matchShortOffset, input);
          if (input === null) {
            return this;
          }
        } else if (Math.abs(input) < 16 && !keepMinutes) {
          input = input * 60;
        }
        if (!this._isUTC && keepLocalTime) {
          localAdjust = getDateOffset(this);
        }
        this._offset = input;
        this._isUTC = true;
        if (localAdjust != null) {
          this.add(localAdjust, "m");
        }
        if (offset2 !== input) {
          if (!keepLocalTime || this._changeInProgress) {
            addSubtract(
              this,
              createDuration(input - offset2, "m"),
              1,
              false
            );
          } else if (!this._changeInProgress) {
            this._changeInProgress = true;
            hooks.updateOffset(this, true);
            this._changeInProgress = null;
          }
        }
        return this;
      } else {
        return this._isUTC ? offset2 : getDateOffset(this);
      }
    }
    function getSetZone(input, keepLocalTime) {
      if (input != null) {
        if (typeof input !== "string") {
          input = -input;
        }
        this.utcOffset(input, keepLocalTime);
        return this;
      } else {
        return -this.utcOffset();
      }
    }
    function setOffsetToUTC(keepLocalTime) {
      return this.utcOffset(0, keepLocalTime);
    }
    function setOffsetToLocal(keepLocalTime) {
      if (this._isUTC) {
        this.utcOffset(0, keepLocalTime);
        this._isUTC = false;
        if (keepLocalTime) {
          this.subtract(getDateOffset(this), "m");
        }
      }
      return this;
    }
    function setOffsetToParsedOffset() {
      if (this._tzm != null) {
        this.utcOffset(this._tzm, false, true);
      } else if (typeof this._i === "string") {
        var tZone = offsetFromString(matchOffset, this._i);
        if (tZone != null) {
          this.utcOffset(tZone);
        } else {
          this.utcOffset(0, true);
        }
      }
      return this;
    }
    function hasAlignedHourOffset(input) {
      if (!this.isValid()) {
        return false;
      }
      input = input ? createLocal(input).utcOffset() : 0;
      return (this.utcOffset() - input) % 60 === 0;
    }
    function isDaylightSavingTime() {
      return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
    }
    function isDaylightSavingTimeShifted() {
      if (!isUndefined(this._isDSTShifted)) {
        return this._isDSTShifted;
      }
      var c = {}, other;
      copyConfig(c, this);
      c = prepareConfig(c);
      if (c._a) {
        other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
        this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
      } else {
        this._isDSTShifted = false;
      }
      return this._isDSTShifted;
    }
    function isLocal() {
      return this.isValid() ? !this._isUTC : false;
    }
    function isUtcOffset() {
      return this.isValid() ? this._isUTC : false;
    }
    function isUtc() {
      return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }
    var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
    function createDuration(input, key2) {
      var duration = input, match = null, sign2, ret, diffRes;
      if (isDuration(input)) {
        duration = {
          ms: input._milliseconds,
          d: input._days,
          M: input._months
        };
      } else if (isNumber$2(input) || !isNaN(+input)) {
        duration = {};
        if (key2) {
          duration[key2] = +input;
        } else {
          duration.milliseconds = +input;
        }
      } else if (match = aspNetRegex.exec(input)) {
        sign2 = match[1] === "-" ? -1 : 1;
        duration = {
          y: 0,
          d: toInt(match[DATE]) * sign2,
          h: toInt(match[HOUR]) * sign2,
          m: toInt(match[MINUTE]) * sign2,
          s: toInt(match[SECOND]) * sign2,
          ms: toInt(absRound(match[MILLISECOND] * 1e3)) * sign2
          // the millisecond decimal point is included in the match
        };
      } else if (match = isoRegex.exec(input)) {
        sign2 = match[1] === "-" ? -1 : 1;
        duration = {
          y: parseIso(match[2], sign2),
          M: parseIso(match[3], sign2),
          w: parseIso(match[4], sign2),
          d: parseIso(match[5], sign2),
          h: parseIso(match[6], sign2),
          m: parseIso(match[7], sign2),
          s: parseIso(match[8], sign2)
        };
      } else if (duration == null) {
        duration = {};
      } else if (typeof duration === "object" && ("from" in duration || "to" in duration)) {
        diffRes = momentsDifference(
          createLocal(duration.from),
          createLocal(duration.to)
        );
        duration = {};
        duration.ms = diffRes.milliseconds;
        duration.M = diffRes.months;
      }
      ret = new Duration(duration);
      if (isDuration(input) && hasOwnProp(input, "_locale")) {
        ret._locale = input._locale;
      }
      if (isDuration(input) && hasOwnProp(input, "_isValid")) {
        ret._isValid = input._isValid;
      }
      return ret;
    }
    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid$1;
    function parseIso(inp, sign2) {
      var res = inp && parseFloat(inp.replace(",", "."));
      return (isNaN(res) ? 0 : res) * sign2;
    }
    function positiveMomentsDifference(base, other) {
      var res = {};
      res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
      if (base.clone().add(res.months, "M").isAfter(other)) {
        --res.months;
      }
      res.milliseconds = +other - +base.clone().add(res.months, "M");
      return res;
    }
    function momentsDifference(base, other) {
      var res;
      if (!(base.isValid() && other.isValid())) {
        return { milliseconds: 0, months: 0 };
      }
      other = cloneWithOffset(other, base);
      if (base.isBefore(other)) {
        res = positiveMomentsDifference(base, other);
      } else {
        res = positiveMomentsDifference(other, base);
        res.milliseconds = -res.milliseconds;
        res.months = -res.months;
      }
      return res;
    }
    function createAdder(direction, name) {
      return function (val, period) {
        var dur, tmp;
        if (period !== null && !isNaN(+period)) {
          deprecateSimple(
            name,
            "moment()." + name + "(period, number) is deprecated. Please use moment()." + name + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
          );
          tmp = val;
          val = period;
          period = tmp;
        }
        dur = createDuration(val, period);
        addSubtract(this, dur, direction);
        return this;
      };
    }
    function addSubtract(mom, duration, isAdding, updateOffset) {
      var milliseconds2 = duration._milliseconds, days2 = absRound(duration._days), months2 = absRound(duration._months);
      if (!mom.isValid()) {
        return;
      }
      updateOffset = updateOffset == null ? true : updateOffset;
      if (months2) {
        setMonth(mom, get(mom, "Month") + months2 * isAdding);
      }
      if (days2) {
        set$1(mom, "Date", get(mom, "Date") + days2 * isAdding);
      }
      if (milliseconds2) {
        mom._d.setTime(mom._d.valueOf() + milliseconds2 * isAdding);
      }
      if (updateOffset) {
        hooks.updateOffset(mom, days2 || months2);
      }
    }
    var add = createAdder(1, "add"), subtract = createAdder(-1, "subtract");
    function isString$2(input) {
      return typeof input === "string" || input instanceof String;
    }
    function isMomentInput(input) {
      return isMoment(input) || isDate(input) || isString$2(input) || isNumber$2(input) || isNumberOrStringArray(input) || isMomentInputObject(input) || input === null || input === void 0;
    }
    function isMomentInputObject(input) {
      var objectTest = isObject$2(input) && !isObjectEmpty(input), propertyTest = false, properties = [
        "years",
        "year",
        "y",
        "months",
        "month",
        "M",
        "days",
        "day",
        "d",
        "dates",
        "date",
        "D",
        "hours",
        "hour",
        "h",
        "minutes",
        "minute",
        "m",
        "seconds",
        "second",
        "s",
        "milliseconds",
        "millisecond",
        "ms"
      ], i, property, propertyLen = properties.length;
      for (i = 0; i < propertyLen; i += 1) {
        property = properties[i];
        propertyTest = propertyTest || hasOwnProp(input, property);
      }
      return objectTest && propertyTest;
    }
    function isNumberOrStringArray(input) {
      var arrayTest = isArray$2(input), dataTypeTest = false;
      if (arrayTest) {
        dataTypeTest = input.filter(function (item) {
          return !isNumber$2(item) && isString$2(input);
        }).length === 0;
      }
      return arrayTest && dataTypeTest;
    }
    function isCalendarSpec(input) {
      var objectTest = isObject$2(input) && !isObjectEmpty(input), propertyTest = false, properties = [
        "sameDay",
        "nextDay",
        "lastDay",
        "nextWeek",
        "lastWeek",
        "sameElse"
      ], i, property;
      for (i = 0; i < properties.length; i += 1) {
        property = properties[i];
        propertyTest = propertyTest || hasOwnProp(input, property);
      }
      return objectTest && propertyTest;
    }
    function getCalendarFormat(myMoment, now2) {
      var diff2 = myMoment.diff(now2, "days", true);
      return diff2 < -6 ? "sameElse" : diff2 < -1 ? "lastWeek" : diff2 < 0 ? "lastDay" : diff2 < 1 ? "sameDay" : diff2 < 2 ? "nextDay" : diff2 < 7 ? "nextWeek" : "sameElse";
    }
    function calendar$1(time, formats) {
      if (arguments.length === 1) {
        if (!arguments[0]) {
          time = void 0;
          formats = void 0;
        } else if (isMomentInput(arguments[0])) {
          time = arguments[0];
          formats = void 0;
        } else if (isCalendarSpec(arguments[0])) {
          formats = arguments[0];
          time = void 0;
        }
      }
      var now2 = time || createLocal(), sod = cloneWithOffset(now2, this).startOf("day"), format2 = hooks.calendarFormat(this, sod) || "sameElse", output = formats && (isFunction$2(formats[format2]) ? formats[format2].call(this, now2) : formats[format2]);
      return this.format(
        output || this.localeData().calendar(format2, this, createLocal(now2))
      );
    }
    function clone() {
      return new Moment(this);
    }
    function isAfter(input, units) {
      var localInput = isMoment(input) ? input : createLocal(input);
      if (!(this.isValid() && localInput.isValid())) {
        return false;
      }
      units = normalizeUnits(units) || "millisecond";
      if (units === "millisecond") {
        return this.valueOf() > localInput.valueOf();
      } else {
        return localInput.valueOf() < this.clone().startOf(units).valueOf();
      }
    }
    function isBefore(input, units) {
      var localInput = isMoment(input) ? input : createLocal(input);
      if (!(this.isValid() && localInput.isValid())) {
        return false;
      }
      units = normalizeUnits(units) || "millisecond";
      if (units === "millisecond") {
        return this.valueOf() < localInput.valueOf();
      } else {
        return this.clone().endOf(units).valueOf() < localInput.valueOf();
      }
    }
    function isBetween(from2, to2, units, inclusivity) {
      var localFrom = isMoment(from2) ? from2 : createLocal(from2), localTo = isMoment(to2) ? to2 : createLocal(to2);
      if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
        return false;
      }
      inclusivity = inclusivity || "()";
      return (inclusivity[0] === "(" ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) && (inclusivity[1] === ")" ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
    }
    function isSame(input, units) {
      var localInput = isMoment(input) ? input : createLocal(input), inputMs;
      if (!(this.isValid() && localInput.isValid())) {
        return false;
      }
      units = normalizeUnits(units) || "millisecond";
      if (units === "millisecond") {
        return this.valueOf() === localInput.valueOf();
      } else {
        inputMs = localInput.valueOf();
        return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
      }
    }
    function isSameOrAfter(input, units) {
      return this.isSame(input, units) || this.isAfter(input, units);
    }
    function isSameOrBefore(input, units) {
      return this.isSame(input, units) || this.isBefore(input, units);
    }
    function diff(input, units, asFloat) {
      var that, zoneDelta, output;
      if (!this.isValid()) {
        return NaN;
      }
      that = cloneWithOffset(input, this);
      if (!that.isValid()) {
        return NaN;
      }
      zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
      units = normalizeUnits(units);
      switch (units) {
        case "year":
          output = monthDiff(this, that) / 12;
          break;
        case "month":
          output = monthDiff(this, that);
          break;
        case "quarter":
          output = monthDiff(this, that) / 3;
          break;
        case "second":
          output = (this - that) / 1e3;
          break;
        case "minute":
          output = (this - that) / 6e4;
          break;
        case "hour":
          output = (this - that) / 36e5;
          break;
        case "day":
          output = (this - that - zoneDelta) / 864e5;
          break;
        case "week":
          output = (this - that - zoneDelta) / 6048e5;
          break;
        default:
          output = this - that;
      }
      return asFloat ? output : absFloor(output);
    }
    function monthDiff(a, b2) {
      if (a.date() < b2.date()) {
        return -monthDiff(b2, a);
      }
      var wholeMonthDiff = (b2.year() - a.year()) * 12 + (b2.month() - a.month()), anchor = a.clone().add(wholeMonthDiff, "months"), anchor2, adjust;
      if (b2 - anchor < 0) {
        anchor2 = a.clone().add(wholeMonthDiff - 1, "months");
        adjust = (b2 - anchor) / (anchor - anchor2);
      } else {
        anchor2 = a.clone().add(wholeMonthDiff + 1, "months");
        adjust = (b2 - anchor) / (anchor2 - anchor);
      }
      return -(wholeMonthDiff + adjust) || 0;
    }
    hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
    hooks.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
    function toString() {
      return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
    }
    function toISOString(keepOffset) {
      if (!this.isValid()) {
        return null;
      }
      var utc = keepOffset !== true, m = utc ? this.clone().utc() : this;
      if (m.year() < 0 || m.year() > 9999) {
        return formatMoment(
          m,
          utc ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
        );
      }
      if (isFunction$2(Date.prototype.toISOString)) {
        if (utc) {
          return this.toDate().toISOString();
        } else {
          return new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", formatMoment(m, "Z"));
        }
      }
      return formatMoment(
        m,
        utc ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
      );
    }
    function inspect() {
      if (!this.isValid()) {
        return "moment.invalid(/* " + this._i + " */)";
      }
      var func = "moment", zone = "", prefix, year, datetime, suffix;
      if (!this.isLocal()) {
        func = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone";
        zone = "Z";
      }
      prefix = "[" + func + '("]';
      year = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY";
      datetime = "-MM-DD[T]HH:mm:ss.SSS";
      suffix = zone + '[")]';
      return this.format(prefix + year + datetime + suffix);
    }
    function format$1(inputString) {
      if (!inputString) {
        inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
      }
      var output = formatMoment(this, inputString);
      return this.localeData().postformat(output);
    }
    function from(time, withoutSuffix) {
      if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
        return createDuration({ to: this, from: time }).locale(this.locale()).humanize(!withoutSuffix);
      } else {
        return this.localeData().invalidDate();
      }
    }
    function fromNow(withoutSuffix) {
      return this.from(createLocal(), withoutSuffix);
    }
    function to(time, withoutSuffix) {
      if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
        return createDuration({ from: this, to: time }).locale(this.locale()).humanize(!withoutSuffix);
      } else {
        return this.localeData().invalidDate();
      }
    }
    function toNow(withoutSuffix) {
      return this.to(createLocal(), withoutSuffix);
    }
    function locale(key2) {
      var newLocaleData;
      if (key2 === void 0) {
        return this._locale._abbr;
      } else {
        newLocaleData = getLocale(key2);
        if (newLocaleData != null) {
          this._locale = newLocaleData;
        }
        return this;
      }
    }
    var lang = deprecate(
      "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
      function (key2) {
        if (key2 === void 0) {
          return this.localeData();
        } else {
          return this.locale(key2);
        }
      }
    );
    function localeData() {
      return this._locale;
    }
    var MS_PER_SECOND = 1e3, MS_PER_MINUTE = 60 * MS_PER_SECOND, MS_PER_HOUR = 60 * MS_PER_MINUTE, MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;
    function mod$1(dividend, divisor) {
      return (dividend % divisor + divisor) % divisor;
    }
    function localStartOfDate(y, m, d) {
      if (y < 100 && y >= 0) {
        return new Date(y + 400, m, d) - MS_PER_400_YEARS;
      } else {
        return new Date(y, m, d).valueOf();
      }
    }
    function utcStartOfDate(y, m, d) {
      if (y < 100 && y >= 0) {
        return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
      } else {
        return Date.UTC(y, m, d);
      }
    }
    function startOf(units) {
      var time, startOfDate;
      units = normalizeUnits(units);
      if (units === void 0 || units === "millisecond" || !this.isValid()) {
        return this;
      }
      startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
      switch (units) {
        case "year":
          time = startOfDate(this.year(), 0, 1);
          break;
        case "quarter":
          time = startOfDate(
            this.year(),
            this.month() - this.month() % 3,
            1
          );
          break;
        case "month":
          time = startOfDate(this.year(), this.month(), 1);
          break;
        case "week":
          time = startOfDate(
            this.year(),
            this.month(),
            this.date() - this.weekday()
          );
          break;
        case "isoWeek":
          time = startOfDate(
            this.year(),
            this.month(),
            this.date() - (this.isoWeekday() - 1)
          );
          break;
        case "day":
        case "date":
          time = startOfDate(this.year(), this.month(), this.date());
          break;
        case "hour":
          time = this._d.valueOf();
          time -= mod$1(
            time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
            MS_PER_HOUR
          );
          break;
        case "minute":
          time = this._d.valueOf();
          time -= mod$1(time, MS_PER_MINUTE);
          break;
        case "second":
          time = this._d.valueOf();
          time -= mod$1(time, MS_PER_SECOND);
          break;
      }
      this._d.setTime(time);
      hooks.updateOffset(this, true);
      return this;
    }
    function endOf(units) {
      var time, startOfDate;
      units = normalizeUnits(units);
      if (units === void 0 || units === "millisecond" || !this.isValid()) {
        return this;
      }
      startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
      switch (units) {
        case "year":
          time = startOfDate(this.year() + 1, 0, 1) - 1;
          break;
        case "quarter":
          time = startOfDate(
            this.year(),
            this.month() - this.month() % 3 + 3,
            1
          ) - 1;
          break;
        case "month":
          time = startOfDate(this.year(), this.month() + 1, 1) - 1;
          break;
        case "week":
          time = startOfDate(
            this.year(),
            this.month(),
            this.date() - this.weekday() + 7
          ) - 1;
          break;
        case "isoWeek":
          time = startOfDate(
            this.year(),
            this.month(),
            this.date() - (this.isoWeekday() - 1) + 7
          ) - 1;
          break;
        case "day":
        case "date":
          time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
          break;
        case "hour":
          time = this._d.valueOf();
          time += MS_PER_HOUR - mod$1(
            time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
            MS_PER_HOUR
          ) - 1;
          break;
        case "minute":
          time = this._d.valueOf();
          time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
          break;
        case "second":
          time = this._d.valueOf();
          time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
          break;
      }
      this._d.setTime(time);
      hooks.updateOffset(this, true);
      return this;
    }
    function valueOf() {
      return this._d.valueOf() - (this._offset || 0) * 6e4;
    }
    function unix() {
      return Math.floor(this.valueOf() / 1e3);
    }
    function toDate() {
      return new Date(this.valueOf());
    }
    function toArray() {
      var m = this;
      return [
        m.year(),
        m.month(),
        m.date(),
        m.hour(),
        m.minute(),
        m.second(),
        m.millisecond()
      ];
    }
    function toObject() {
      var m = this;
      return {
        years: m.year(),
        months: m.month(),
        date: m.date(),
        hours: m.hours(),
        minutes: m.minutes(),
        seconds: m.seconds(),
        milliseconds: m.milliseconds()
      };
    }
    function toJSON() {
      return this.isValid() ? this.toISOString() : null;
    }
    function isValid$2() {
      return isValid(this);
    }
    function parsingFlags() {
      return extend$1({}, getParsingFlags(this));
    }
    function invalidAt() {
      return getParsingFlags(this).overflow;
    }
    function creationData() {
      return {
        input: this._i,
        format: this._f,
        locale: this._locale,
        isUTC: this._isUTC,
        strict: this._strict
      };
    }
    addFormatToken("N", 0, 0, "eraAbbr");
    addFormatToken("NN", 0, 0, "eraAbbr");
    addFormatToken("NNN", 0, 0, "eraAbbr");
    addFormatToken("NNNN", 0, 0, "eraName");
    addFormatToken("NNNNN", 0, 0, "eraNarrow");
    addFormatToken("y", ["y", 1], "yo", "eraYear");
    addFormatToken("y", ["yy", 2], 0, "eraYear");
    addFormatToken("y", ["yyy", 3], 0, "eraYear");
    addFormatToken("y", ["yyyy", 4], 0, "eraYear");
    addRegexToken("N", matchEraAbbr);
    addRegexToken("NN", matchEraAbbr);
    addRegexToken("NNN", matchEraAbbr);
    addRegexToken("NNNN", matchEraName);
    addRegexToken("NNNNN", matchEraNarrow);
    addParseToken(
      ["N", "NN", "NNN", "NNNN", "NNNNN"],
      function (input, array, config, token2) {
        var era = config._locale.erasParse(input, token2, config._strict);
        if (era) {
          getParsingFlags(config).era = era;
        } else {
          getParsingFlags(config).invalidEra = input;
        }
      }
    );
    addRegexToken("y", matchUnsigned);
    addRegexToken("yy", matchUnsigned);
    addRegexToken("yyy", matchUnsigned);
    addRegexToken("yyyy", matchUnsigned);
    addRegexToken("yo", matchEraYearOrdinal);
    addParseToken(["y", "yy", "yyy", "yyyy"], YEAR);
    addParseToken(["yo"], function (input, array, config, token2) {
      var match;
      if (config._locale._eraYearOrdinalRegex) {
        match = input.match(config._locale._eraYearOrdinalRegex);
      }
      if (config._locale.eraYearOrdinalParse) {
        array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
      } else {
        array[YEAR] = parseInt(input, 10);
      }
    });
    function localeEras(m, format2) {
      var i, l, date, eras = this._eras || getLocale("en")._eras;
      for (i = 0, l = eras.length; i < l; ++i) {
        switch (typeof eras[i].since) {
          case "string":
            date = hooks(eras[i].since).startOf("day");
            eras[i].since = date.valueOf();
            break;
        }
        switch (typeof eras[i].until) {
          case "undefined":
            eras[i].until = Infinity;
            break;
          case "string":
            date = hooks(eras[i].until).startOf("day").valueOf();
            eras[i].until = date.valueOf();
            break;
        }
      }
      return eras;
    }
    function localeErasParse(eraName, format2, strict) {
      var i, l, eras = this.eras(), name, abbr, narrow;
      eraName = eraName.toUpperCase();
      for (i = 0, l = eras.length; i < l; ++i) {
        name = eras[i].name.toUpperCase();
        abbr = eras[i].abbr.toUpperCase();
        narrow = eras[i].narrow.toUpperCase();
        if (strict) {
          switch (format2) {
            case "N":
            case "NN":
            case "NNN":
              if (abbr === eraName) {
                return eras[i];
              }
              break;
            case "NNNN":
              if (name === eraName) {
                return eras[i];
              }
              break;
            case "NNNNN":
              if (narrow === eraName) {
                return eras[i];
              }
              break;
          }
        } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
          return eras[i];
        }
      }
    }
    function localeErasConvertYear(era, year) {
      var dir = era.since <= era.until ? 1 : -1;
      if (year === void 0) {
        return hooks(era.since).year();
      } else {
        return hooks(era.since).year() + (year - era.offset) * dir;
      }
    }
    function getEraName() {
      var i, l, val, eras = this.localeData().eras();
      for (i = 0, l = eras.length; i < l; ++i) {
        val = this.clone().startOf("day").valueOf();
        if (eras[i].since <= val && val <= eras[i].until) {
          return eras[i].name;
        }
        if (eras[i].until <= val && val <= eras[i].since) {
          return eras[i].name;
        }
      }
      return "";
    }
    function getEraNarrow() {
      var i, l, val, eras = this.localeData().eras();
      for (i = 0, l = eras.length; i < l; ++i) {
        val = this.clone().startOf("day").valueOf();
        if (eras[i].since <= val && val <= eras[i].until) {
          return eras[i].narrow;
        }
        if (eras[i].until <= val && val <= eras[i].since) {
          return eras[i].narrow;
        }
      }
      return "";
    }
    function getEraAbbr() {
      var i, l, val, eras = this.localeData().eras();
      for (i = 0, l = eras.length; i < l; ++i) {
        val = this.clone().startOf("day").valueOf();
        if (eras[i].since <= val && val <= eras[i].until) {
          return eras[i].abbr;
        }
        if (eras[i].until <= val && val <= eras[i].since) {
          return eras[i].abbr;
        }
      }
      return "";
    }
    function getEraYear() {
      var i, l, dir, val, eras = this.localeData().eras();
      for (i = 0, l = eras.length; i < l; ++i) {
        dir = eras[i].since <= eras[i].until ? 1 : -1;
        val = this.clone().startOf("day").valueOf();
        if (eras[i].since <= val && val <= eras[i].until || eras[i].until <= val && val <= eras[i].since) {
          return (this.year() - hooks(eras[i].since).year()) * dir + eras[i].offset;
        }
      }
      return this.year();
    }
    function erasNameRegex(isStrict) {
      if (!hasOwnProp(this, "_erasNameRegex")) {
        computeErasParse.call(this);
      }
      return isStrict ? this._erasNameRegex : this._erasRegex;
    }
    function erasAbbrRegex(isStrict) {
      if (!hasOwnProp(this, "_erasAbbrRegex")) {
        computeErasParse.call(this);
      }
      return isStrict ? this._erasAbbrRegex : this._erasRegex;
    }
    function erasNarrowRegex(isStrict) {
      if (!hasOwnProp(this, "_erasNarrowRegex")) {
        computeErasParse.call(this);
      }
      return isStrict ? this._erasNarrowRegex : this._erasRegex;
    }
    function matchEraAbbr(isStrict, locale2) {
      return locale2.erasAbbrRegex(isStrict);
    }
    function matchEraName(isStrict, locale2) {
      return locale2.erasNameRegex(isStrict);
    }
    function matchEraNarrow(isStrict, locale2) {
      return locale2.erasNarrowRegex(isStrict);
    }
    function matchEraYearOrdinal(isStrict, locale2) {
      return locale2._eraYearOrdinalRegex || matchUnsigned;
    }
    function computeErasParse() {
      var abbrPieces = [], namePieces = [], narrowPieces = [], mixedPieces = [], i, l, erasName, erasAbbr, erasNarrow, eras = this.eras();
      for (i = 0, l = eras.length; i < l; ++i) {
        erasName = regexEscape(eras[i].name);
        erasAbbr = regexEscape(eras[i].abbr);
        erasNarrow = regexEscape(eras[i].narrow);
        namePieces.push(erasName);
        abbrPieces.push(erasAbbr);
        narrowPieces.push(erasNarrow);
        mixedPieces.push(erasName);
        mixedPieces.push(erasAbbr);
        mixedPieces.push(erasNarrow);
      }
      this._erasRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
      this._erasNameRegex = new RegExp("^(" + namePieces.join("|") + ")", "i");
      this._erasAbbrRegex = new RegExp("^(" + abbrPieces.join("|") + ")", "i");
      this._erasNarrowRegex = new RegExp(
        "^(" + narrowPieces.join("|") + ")",
        "i"
      );
    }
    addFormatToken(0, ["gg", 2], 0, function () {
      return this.weekYear() % 100;
    });
    addFormatToken(0, ["GG", 2], 0, function () {
      return this.isoWeekYear() % 100;
    });
    function addWeekYearFormatToken(token2, getter) {
      addFormatToken(0, [token2, token2.length], 0, getter);
    }
    addWeekYearFormatToken("gggg", "weekYear");
    addWeekYearFormatToken("ggggg", "weekYear");
    addWeekYearFormatToken("GGGG", "isoWeekYear");
    addWeekYearFormatToken("GGGGG", "isoWeekYear");
    addRegexToken("G", matchSigned);
    addRegexToken("g", matchSigned);
    addRegexToken("GG", match1to2, match2);
    addRegexToken("gg", match1to2, match2);
    addRegexToken("GGGG", match1to4, match4);
    addRegexToken("gggg", match1to4, match4);
    addRegexToken("GGGGG", match1to6, match6);
    addRegexToken("ggggg", match1to6, match6);
    addWeekParseToken(
      ["gggg", "ggggg", "GGGG", "GGGGG"],
      function (input, week, config, token2) {
        week[token2.substr(0, 2)] = toInt(input);
      }
    );
    addWeekParseToken(["gg", "GG"], function (input, week, config, token2) {
      week[token2] = hooks.parseTwoDigitYear(input);
    });
    function getSetWeekYear(input) {
      return getSetWeekYearHelper.call(
        this,
        input,
        this.week(),
        this.weekday() + this.localeData()._week.dow,
        this.localeData()._week.dow,
        this.localeData()._week.doy
      );
    }
    function getSetISOWeekYear(input) {
      return getSetWeekYearHelper.call(
        this,
        input,
        this.isoWeek(),
        this.isoWeekday(),
        1,
        4
      );
    }
    function getISOWeeksInYear() {
      return weeksInYear(this.year(), 1, 4);
    }
    function getISOWeeksInISOWeekYear() {
      return weeksInYear(this.isoWeekYear(), 1, 4);
    }
    function getWeeksInYear() {
      var weekInfo = this.localeData()._week;
      return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }
    function getWeeksInWeekYear() {
      var weekInfo = this.localeData()._week;
      return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
    }
    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
      var weeksTarget;
      if (input == null) {
        return weekOfYear(this, dow, doy).year;
      } else {
        weeksTarget = weeksInYear(input, dow, doy);
        if (week > weeksTarget) {
          week = weeksTarget;
        }
        return setWeekAll.call(this, input, week, weekday, dow, doy);
      }
    }
    function setWeekAll(weekYear, week, weekday, dow, doy) {
      var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy), date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
      this.year(date.getUTCFullYear());
      this.month(date.getUTCMonth());
      this.date(date.getUTCDate());
      return this;
    }
    addFormatToken("Q", 0, "Qo", "quarter");
    addRegexToken("Q", match1);
    addParseToken("Q", function (input, array) {
      array[MONTH] = (toInt(input) - 1) * 3;
    });
    function getSetQuarter(input) {
      return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }
    addFormatToken("D", ["DD", 2], "Do", "date");
    addRegexToken("D", match1to2, match1to2NoLeadingZero);
    addRegexToken("DD", match1to2, match2);
    addRegexToken("Do", function (isStrict, locale2) {
      return isStrict ? locale2._dayOfMonthOrdinalParse || locale2._ordinalParse : locale2._dayOfMonthOrdinalParseLenient;
    });
    addParseToken(["D", "DD"], DATE);
    addParseToken("Do", function (input, array) {
      array[DATE] = toInt(input.match(match1to2)[0]);
    });
    var getSetDayOfMonth = makeGetSet("Date", true);
    addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
    addRegexToken("DDD", match1to3);
    addRegexToken("DDDD", match3);
    addParseToken(["DDD", "DDDD"], function (input, array, config) {
      config._dayOfYear = toInt(input);
    });
    function getSetDayOfYear(input) {
      var dayOfYear = Math.round(
        (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
      ) + 1;
      return input == null ? dayOfYear : this.add(input - dayOfYear, "d");
    }
    addFormatToken("m", ["mm", 2], 0, "minute");
    addRegexToken("m", match1to2, match1to2HasZero);
    addRegexToken("mm", match1to2, match2);
    addParseToken(["m", "mm"], MINUTE);
    var getSetMinute = makeGetSet("Minutes", false);
    addFormatToken("s", ["ss", 2], 0, "second");
    addRegexToken("s", match1to2, match1to2HasZero);
    addRegexToken("ss", match1to2, match2);
    addParseToken(["s", "ss"], SECOND);
    var getSetSecond = makeGetSet("Seconds", false);
    addFormatToken("S", 0, 0, function () {
      return ~~(this.millisecond() / 100);
    });
    addFormatToken(0, ["SS", 2], 0, function () {
      return ~~(this.millisecond() / 10);
    });
    addFormatToken(0, ["SSS", 3], 0, "millisecond");
    addFormatToken(0, ["SSSS", 4], 0, function () {
      return this.millisecond() * 10;
    });
    addFormatToken(0, ["SSSSS", 5], 0, function () {
      return this.millisecond() * 100;
    });
    addFormatToken(0, ["SSSSSS", 6], 0, function () {
      return this.millisecond() * 1e3;
    });
    addFormatToken(0, ["SSSSSSS", 7], 0, function () {
      return this.millisecond() * 1e4;
    });
    addFormatToken(0, ["SSSSSSSS", 8], 0, function () {
      return this.millisecond() * 1e5;
    });
    addFormatToken(0, ["SSSSSSSSS", 9], 0, function () {
      return this.millisecond() * 1e6;
    });
    addRegexToken("S", match1to3, match1);
    addRegexToken("SS", match1to3, match2);
    addRegexToken("SSS", match1to3, match3);
    var token, getSetMillisecond;
    for (token = "SSSS"; token.length <= 9; token += "S") {
      addRegexToken(token, matchUnsigned);
    }
    function parseMs(input, array) {
      array[MILLISECOND] = toInt(("0." + input) * 1e3);
    }
    for (token = "S"; token.length <= 9; token += "S") {
      addParseToken(token, parseMs);
    }
    getSetMillisecond = makeGetSet("Milliseconds", false);
    addFormatToken("z", 0, 0, "zoneAbbr");
    addFormatToken("zz", 0, 0, "zoneName");
    function getZoneAbbr() {
      return this._isUTC ? "UTC" : "";
    }
    function getZoneName() {
      return this._isUTC ? "Coordinated Universal Time" : "";
    }
    var proto = Moment.prototype;
    proto.add = add;
    proto.calendar = calendar$1;
    proto.clone = clone;
    proto.diff = diff;
    proto.endOf = endOf;
    proto.format = format$1;
    proto.from = from;
    proto.fromNow = fromNow;
    proto.to = to;
    proto.toNow = toNow;
    proto.get = stringGet;
    proto.invalidAt = invalidAt;
    proto.isAfter = isAfter;
    proto.isBefore = isBefore;
    proto.isBetween = isBetween;
    proto.isSame = isSame;
    proto.isSameOrAfter = isSameOrAfter;
    proto.isSameOrBefore = isSameOrBefore;
    proto.isValid = isValid$2;
    proto.lang = lang;
    proto.locale = locale;
    proto.localeData = localeData;
    proto.max = prototypeMax;
    proto.min = prototypeMin;
    proto.parsingFlags = parsingFlags;
    proto.set = stringSet;
    proto.startOf = startOf;
    proto.subtract = subtract;
    proto.toArray = toArray;
    proto.toObject = toObject;
    proto.toDate = toDate;
    proto.toISOString = toISOString;
    proto.inspect = inspect;
    if (typeof Symbol !== "undefined" && Symbol.for != null) {
      proto[Symbol.for("nodejs.util.inspect.custom")] = function () {
        return "Moment<" + this.format() + ">";
      };
    }
    proto.toJSON = toJSON;
    proto.toString = toString;
    proto.unix = unix;
    proto.valueOf = valueOf;
    proto.creationData = creationData;
    proto.eraName = getEraName;
    proto.eraNarrow = getEraNarrow;
    proto.eraAbbr = getEraAbbr;
    proto.eraYear = getEraYear;
    proto.year = getSetYear;
    proto.isLeapYear = getIsLeapYear;
    proto.weekYear = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;
    proto.quarter = proto.quarters = getSetQuarter;
    proto.month = getSetMonth;
    proto.daysInMonth = getDaysInMonth;
    proto.week = proto.weeks = getSetWeek;
    proto.isoWeek = proto.isoWeeks = getSetISOWeek;
    proto.weeksInYear = getWeeksInYear;
    proto.weeksInWeekYear = getWeeksInWeekYear;
    proto.isoWeeksInYear = getISOWeeksInYear;
    proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
    proto.date = getSetDayOfMonth;
    proto.day = proto.days = getSetDayOfWeek;
    proto.weekday = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear = getSetDayOfYear;
    proto.hour = proto.hours = getSetHour;
    proto.minute = proto.minutes = getSetMinute;
    proto.second = proto.seconds = getSetSecond;
    proto.millisecond = proto.milliseconds = getSetMillisecond;
    proto.utcOffset = getSetOffset;
    proto.utc = setOffsetToUTC;
    proto.local = setOffsetToLocal;
    proto.parseZone = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST = isDaylightSavingTime;
    proto.isLocal = isLocal;
    proto.isUtcOffset = isUtcOffset;
    proto.isUtc = isUtc;
    proto.isUTC = isUtc;
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;
    proto.dates = deprecate(
      "dates accessor is deprecated. Use date instead.",
      getSetDayOfMonth
    );
    proto.months = deprecate(
      "months accessor is deprecated. Use month instead",
      getSetMonth
    );
    proto.years = deprecate(
      "years accessor is deprecated. Use year instead",
      getSetYear
    );
    proto.zone = deprecate(
      "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
      getSetZone
    );
    proto.isDSTShifted = deprecate(
      "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
      isDaylightSavingTimeShifted
    );
    function createUnix(input) {
      return createLocal(input * 1e3);
    }
    function createInZone() {
      return createLocal.apply(null, arguments).parseZone();
    }
    function preParsePostFormat(string) {
      return string;
    }
    var proto$1 = Locale.prototype;
    proto$1.calendar = calendar;
    proto$1.longDateFormat = longDateFormat;
    proto$1.invalidDate = invalidDate;
    proto$1.ordinal = ordinal;
    proto$1.preparse = preParsePostFormat;
    proto$1.postformat = preParsePostFormat;
    proto$1.relativeTime = relativeTime;
    proto$1.pastFuture = pastFuture;
    proto$1.set = set;
    proto$1.eras = localeEras;
    proto$1.erasParse = localeErasParse;
    proto$1.erasConvertYear = localeErasConvertYear;
    proto$1.erasAbbrRegex = erasAbbrRegex;
    proto$1.erasNameRegex = erasNameRegex;
    proto$1.erasNarrowRegex = erasNarrowRegex;
    proto$1.months = localeMonths;
    proto$1.monthsShort = localeMonthsShort;
    proto$1.monthsParse = localeMonthsParse;
    proto$1.monthsRegex = monthsRegex;
    proto$1.monthsShortRegex = monthsShortRegex;
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;
    proto$1.weekdays = localeWeekdays;
    proto$1.weekdaysMin = localeWeekdaysMin;
    proto$1.weekdaysShort = localeWeekdaysShort;
    proto$1.weekdaysParse = localeWeekdaysParse;
    proto$1.weekdaysRegex = weekdaysRegex;
    proto$1.weekdaysShortRegex = weekdaysShortRegex;
    proto$1.weekdaysMinRegex = weekdaysMinRegex;
    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;
    function get$1(format2, index, field, setter) {
      var locale2 = getLocale(), utc = createUTC().set(setter, index);
      return locale2[field](utc, format2);
    }
    function listMonthsImpl(format2, index, field) {
      if (isNumber$2(format2)) {
        index = format2;
        format2 = void 0;
      }
      format2 = format2 || "";
      if (index != null) {
        return get$1(format2, index, field, "month");
      }
      var i, out = [];
      for (i = 0; i < 12; i++) {
        out[i] = get$1(format2, i, field, "month");
      }
      return out;
    }
    function listWeekdaysImpl(localeSorted, format2, index, field) {
      if (typeof localeSorted === "boolean") {
        if (isNumber$2(format2)) {
          index = format2;
          format2 = void 0;
        }
        format2 = format2 || "";
      } else {
        format2 = localeSorted;
        index = format2;
        localeSorted = false;
        if (isNumber$2(format2)) {
          index = format2;
          format2 = void 0;
        }
        format2 = format2 || "";
      }
      var locale2 = getLocale(), shift = localeSorted ? locale2._week.dow : 0, i, out = [];
      if (index != null) {
        return get$1(format2, (index + shift) % 7, field, "day");
      }
      for (i = 0; i < 7; i++) {
        out[i] = get$1(format2, (i + shift) % 7, field, "day");
      }
      return out;
    }
    function listMonths(format2, index) {
      return listMonthsImpl(format2, index, "months");
    }
    function listMonthsShort(format2, index) {
      return listMonthsImpl(format2, index, "monthsShort");
    }
    function listWeekdays(localeSorted, format2, index) {
      return listWeekdaysImpl(localeSorted, format2, index, "weekdays");
    }
    function listWeekdaysShort(localeSorted, format2, index) {
      return listWeekdaysImpl(localeSorted, format2, index, "weekdaysShort");
    }
    function listWeekdaysMin(localeSorted, format2, index) {
      return listWeekdaysImpl(localeSorted, format2, index, "weekdaysMin");
    }
    getSetGlobalLocale("en", {
      eras: [
        {
          since: "0001-01-01",
          until: Infinity,
          offset: 1,
          name: "Anno Domini",
          narrow: "AD",
          abbr: "AD"
        },
        {
          since: "0000-12-31",
          until: -Infinity,
          offset: 1,
          name: "Before Christ",
          narrow: "BC",
          abbr: "BC"
        }
      ],
      dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
      ordinal: function (number) {
        var b2 = number % 10, output = toInt(number % 100 / 10) === 1 ? "th" : b2 === 1 ? "st" : b2 === 2 ? "nd" : b2 === 3 ? "rd" : "th";
        return number + output;
      }
    });
    hooks.lang = deprecate(
      "moment.lang is deprecated. Use moment.locale instead.",
      getSetGlobalLocale
    );
    hooks.langData = deprecate(
      "moment.langData is deprecated. Use moment.localeData instead.",
      getLocale
    );
    var mathAbs = Math.abs;
    function abs() {
      var data = this._data;
      this._milliseconds = mathAbs(this._milliseconds);
      this._days = mathAbs(this._days);
      this._months = mathAbs(this._months);
      data.milliseconds = mathAbs(data.milliseconds);
      data.seconds = mathAbs(data.seconds);
      data.minutes = mathAbs(data.minutes);
      data.hours = mathAbs(data.hours);
      data.months = mathAbs(data.months);
      data.years = mathAbs(data.years);
      return this;
    }
    function addSubtract$1(duration, input, value, direction) {
      var other = createDuration(input, value);
      duration._milliseconds += direction * other._milliseconds;
      duration._days += direction * other._days;
      duration._months += direction * other._months;
      return duration._bubble();
    }
    function add$1(input, value) {
      return addSubtract$1(this, input, value, 1);
    }
    function subtract$1(input, value) {
      return addSubtract$1(this, input, value, -1);
    }
    function absCeil(number) {
      if (number < 0) {
        return Math.floor(number);
      } else {
        return Math.ceil(number);
      }
    }
    function bubble() {
      var milliseconds2 = this._milliseconds, days2 = this._days, months2 = this._months, data = this._data, seconds2, minutes2, hours2, years2, monthsFromDays;
      if (!(milliseconds2 >= 0 && days2 >= 0 && months2 >= 0 || milliseconds2 <= 0 && days2 <= 0 && months2 <= 0)) {
        milliseconds2 += absCeil(monthsToDays(months2) + days2) * 864e5;
        days2 = 0;
        months2 = 0;
      }
      data.milliseconds = milliseconds2 % 1e3;
      seconds2 = absFloor(milliseconds2 / 1e3);
      data.seconds = seconds2 % 60;
      minutes2 = absFloor(seconds2 / 60);
      data.minutes = minutes2 % 60;
      hours2 = absFloor(minutes2 / 60);
      data.hours = hours2 % 24;
      days2 += absFloor(hours2 / 24);
      monthsFromDays = absFloor(daysToMonths(days2));
      months2 += monthsFromDays;
      days2 -= absCeil(monthsToDays(monthsFromDays));
      years2 = absFloor(months2 / 12);
      months2 %= 12;
      data.days = days2;
      data.months = months2;
      data.years = years2;
      return this;
    }
    function daysToMonths(days2) {
      return days2 * 4800 / 146097;
    }
    function monthsToDays(months2) {
      return months2 * 146097 / 4800;
    }
    function as(units) {
      if (!this.isValid()) {
        return NaN;
      }
      var days2, months2, milliseconds2 = this._milliseconds;
      units = normalizeUnits(units);
      if (units === "month" || units === "quarter" || units === "year") {
        days2 = this._days + milliseconds2 / 864e5;
        months2 = this._months + daysToMonths(days2);
        switch (units) {
          case "month":
            return months2;
          case "quarter":
            return months2 / 3;
          case "year":
            return months2 / 12;
        }
      } else {
        days2 = this._days + Math.round(monthsToDays(this._months));
        switch (units) {
          case "week":
            return days2 / 7 + milliseconds2 / 6048e5;
          case "day":
            return days2 + milliseconds2 / 864e5;
          case "hour":
            return days2 * 24 + milliseconds2 / 36e5;
          case "minute":
            return days2 * 1440 + milliseconds2 / 6e4;
          case "second":
            return days2 * 86400 + milliseconds2 / 1e3;
          case "millisecond":
            return Math.floor(days2 * 864e5) + milliseconds2;
          default:
            throw new Error("Unknown unit " + units);
        }
      }
    }
    function makeAs(alias) {
      return function () {
        return this.as(alias);
      };
    }
    var asMilliseconds = makeAs("ms"), asSeconds = makeAs("s"), asMinutes = makeAs("m"), asHours = makeAs("h"), asDays = makeAs("d"), asWeeks = makeAs("w"), asMonths = makeAs("M"), asQuarters = makeAs("Q"), asYears = makeAs("y"), valueOf$1 = asMilliseconds;
    function clone$1() {
      return createDuration(this);
    }
    function get$2(units) {
      units = normalizeUnits(units);
      return this.isValid() ? this[units + "s"]() : NaN;
    }
    function makeGetter(name) {
      return function () {
        return this.isValid() ? this._data[name] : NaN;
      };
    }
    var milliseconds = makeGetter("milliseconds"), seconds = makeGetter("seconds"), minutes = makeGetter("minutes"), hours = makeGetter("hours"), days = makeGetter("days"), months = makeGetter("months"), years = makeGetter("years");
    function weeks() {
      return absFloor(this.days() / 7);
    }
    var round$1 = Math.round, thresholds = {
      ss: 44,
      // a few seconds to seconds
      s: 45,
      // seconds to minute
      m: 45,
      // minutes to hour
      h: 22,
      // hours to day
      d: 26,
      // days to month/week
      w: null,
      // weeks to month
      M: 11
      // months to year
    };
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale2) {
      return locale2.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }
    function relativeTime$1(posNegDuration, withoutSuffix, thresholds2, locale2) {
      var duration = createDuration(posNegDuration).abs(), seconds2 = round$1(duration.as("s")), minutes2 = round$1(duration.as("m")), hours2 = round$1(duration.as("h")), days2 = round$1(duration.as("d")), months2 = round$1(duration.as("M")), weeks2 = round$1(duration.as("w")), years2 = round$1(duration.as("y")), a = seconds2 <= thresholds2.ss && ["s", seconds2] || seconds2 < thresholds2.s && ["ss", seconds2] || minutes2 <= 1 && ["m"] || minutes2 < thresholds2.m && ["mm", minutes2] || hours2 <= 1 && ["h"] || hours2 < thresholds2.h && ["hh", hours2] || days2 <= 1 && ["d"] || days2 < thresholds2.d && ["dd", days2];
      if (thresholds2.w != null) {
        a = a || weeks2 <= 1 && ["w"] || weeks2 < thresholds2.w && ["ww", weeks2];
      }
      a = a || months2 <= 1 && ["M"] || months2 < thresholds2.M && ["MM", months2] || years2 <= 1 && ["y"] || ["yy", years2];
      a[2] = withoutSuffix;
      a[3] = +posNegDuration > 0;
      a[4] = locale2;
      return substituteTimeAgo.apply(null, a);
    }
    function getSetRelativeTimeRounding(roundingFunction) {
      if (roundingFunction === void 0) {
        return round$1;
      }
      if (typeof roundingFunction === "function") {
        round$1 = roundingFunction;
        return true;
      }
      return false;
    }
    function getSetRelativeTimeThreshold(threshold, limit) {
      if (thresholds[threshold] === void 0) {
        return false;
      }
      if (limit === void 0) {
        return thresholds[threshold];
      }
      thresholds[threshold] = limit;
      if (threshold === "s") {
        thresholds.ss = limit - 1;
      }
      return true;
    }
    function humanize(argWithSuffix, argThresholds) {
      if (!this.isValid()) {
        return this.localeData().invalidDate();
      }
      var withSuffix = false, th = thresholds, locale2, output;
      if (typeof argWithSuffix === "object") {
        argThresholds = argWithSuffix;
        argWithSuffix = false;
      }
      if (typeof argWithSuffix === "boolean") {
        withSuffix = argWithSuffix;
      }
      if (typeof argThresholds === "object") {
        th = Object.assign({}, thresholds, argThresholds);
        if (argThresholds.s != null && argThresholds.ss == null) {
          th.ss = argThresholds.s - 1;
        }
      }
      locale2 = this.localeData();
      output = relativeTime$1(this, !withSuffix, th, locale2);
      if (withSuffix) {
        output = locale2.pastFuture(+this, output);
      }
      return locale2.postformat(output);
    }
    var abs$1 = Math.abs;
    function sign(x) {
      return (x > 0) - (x < 0) || +x;
    }
    function toISOString$1() {
      if (!this.isValid()) {
        return this.localeData().invalidDate();
      }
      var seconds2 = abs$1(this._milliseconds) / 1e3, days2 = abs$1(this._days), months2 = abs$1(this._months), minutes2, hours2, years2, s, total = this.asSeconds(), totalSign, ymSign, daysSign, hmsSign;
      if (!total) {
        return "P0D";
      }
      minutes2 = absFloor(seconds2 / 60);
      hours2 = absFloor(minutes2 / 60);
      seconds2 %= 60;
      minutes2 %= 60;
      years2 = absFloor(months2 / 12);
      months2 %= 12;
      s = seconds2 ? seconds2.toFixed(3).replace(/\.?0+$/, "") : "";
      totalSign = total < 0 ? "-" : "";
      ymSign = sign(this._months) !== sign(total) ? "-" : "";
      daysSign = sign(this._days) !== sign(total) ? "-" : "";
      hmsSign = sign(this._milliseconds) !== sign(total) ? "-" : "";
      return totalSign + "P" + (years2 ? ymSign + years2 + "Y" : "") + (months2 ? ymSign + months2 + "M" : "") + (days2 ? daysSign + days2 + "D" : "") + (hours2 || minutes2 || seconds2 ? "T" : "") + (hours2 ? hmsSign + hours2 + "H" : "") + (minutes2 ? hmsSign + minutes2 + "M" : "") + (seconds2 ? hmsSign + s + "S" : "");
    }
    var proto$2 = Duration.prototype;
    proto$2.isValid = isValid$1;
    proto$2.abs = abs;
    proto$2.add = add$1;
    proto$2.subtract = subtract$1;
    proto$2.as = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds = asSeconds;
    proto$2.asMinutes = asMinutes;
    proto$2.asHours = asHours;
    proto$2.asDays = asDays;
    proto$2.asWeeks = asWeeks;
    proto$2.asMonths = asMonths;
    proto$2.asQuarters = asQuarters;
    proto$2.asYears = asYears;
    proto$2.valueOf = valueOf$1;
    proto$2._bubble = bubble;
    proto$2.clone = clone$1;
    proto$2.get = get$2;
    proto$2.milliseconds = milliseconds;
    proto$2.seconds = seconds;
    proto$2.minutes = minutes;
    proto$2.hours = hours;
    proto$2.days = days;
    proto$2.weeks = weeks;
    proto$2.months = months;
    proto$2.years = years;
    proto$2.humanize = humanize;
    proto$2.toISOString = toISOString$1;
    proto$2.toString = toISOString$1;
    proto$2.toJSON = toISOString$1;
    proto$2.locale = locale;
    proto$2.localeData = localeData;
    proto$2.toIsoString = deprecate(
      "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
      toISOString$1
    );
    proto$2.lang = lang;
    addFormatToken("X", 0, 0, "unix");
    addFormatToken("x", 0, 0, "valueOf");
    addRegexToken("x", matchSigned);
    addRegexToken("X", matchTimestamp);
    addParseToken("X", function (input, array, config) {
      config._d = new Date(parseFloat(input) * 1e3);
    });
    addParseToken("x", function (input, array, config) {
      config._d = new Date(toInt(input));
    });
    //! moment.js
    hooks.version = "2.30.1";
    setHookCallback(createLocal);
    hooks.fn = proto;
    hooks.min = min;
    hooks.max = max;
    hooks.now = now;
    hooks.utc = createUTC;
    hooks.unix = createUnix;
    hooks.months = listMonths;
    hooks.isDate = isDate;
    hooks.locale = getSetGlobalLocale;
    hooks.invalid = createInvalid;
    hooks.duration = createDuration;
    hooks.isMoment = isMoment;
    hooks.weekdays = listWeekdays;
    hooks.parseZone = createInZone;
    hooks.localeData = getLocale;
    hooks.isDuration = isDuration;
    hooks.monthsShort = listMonthsShort;
    hooks.weekdaysMin = listWeekdaysMin;
    hooks.defineLocale = defineLocale;
    hooks.updateLocale = updateLocale;
    hooks.locales = listLocales;
    hooks.weekdaysShort = listWeekdaysShort;
    hooks.normalizeUnits = normalizeUnits;
    hooks.relativeTimeRounding = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat = getCalendarFormat;
    hooks.prototype = proto;
    hooks.HTML5_FMT = {
      DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
      // <input type="datetime-local" />
      DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
      // <input type="datetime-local" step="1" />
      DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
      // <input type="datetime-local" step="0.001" />
      DATE: "YYYY-MM-DD",
      // <input type="date" />
      TIME: "HH:mm",
      // <input type="time" />
      TIME_SECONDS: "HH:mm:ss",
      // <input type="time" step="1" />
      TIME_MS: "HH:mm:ss.SSS",
      // <input type="time" step="0.001" />
      WEEK: "GGGG-[W]WW",
      // <input type="week" />
      MONTH: "YYYY-MM"
      // <input type="month" />
    };
    function validaCep(cep) {
      cep.addEventListener("input", (ev) => {
        let digits = ev.target.value.match(/\d/g);
        if (digits === null) {
          ev.target.value = "";
          return;
        }
        let newVal = "";
        for (let i = 0; i < (digits.length > 8 ? 8 : digits.length); i++) {
          if (i == 5) {
            newVal += "-";
          }
          newVal += digits[i];
        }
        ev.target.value = newVal;
        if (newVal.length === 9) {
          cep.setCustomValidity("");
        } else {
          cep.setCustomValidity("Campo inválido");
        }
      });
    }
    function maskCPF(cpf) {
      cpf = cpf.replace(/\D/g, "");
      cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
      cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
      cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      return cpf;
    }
    function validaTelefone(e) {
      var digits = e.value.match(/\d/g);
      console.log(digits);
      if (!digits) {
        e.value = "";
        return null;
      }
      if (digits[0] == 0 || digits[1] == 0) {
        e.value = "";
        return null;
      }
      let phone = digits[2] == 9 ? true : false;
      if (digits.length > phone ? 11 : 10) {
        digits = digits.slice(0, phone ? 11 : 10);
      }
      let newVal = "";
      for (let i = 0; i < digits.length; i++) {
        switch (i) {
          case 0:
            newVal += "(";
            break;
          case 2:
            newVal += ") ";
            break;
          case 3:
            if (phone) {
              newVal += " ";
            }
            break;
          case 6:
            if (!phone) {
              newVal += "-";
            }
            break;
          case 7:
            if (phone) {
              newVal += "-";
            }
            break;
        }
        newVal += digits[i];
      }
      e.value = newVal;
      switch (digits.length) {
        case 10:
          return "fixo";
        case 11:
          return "celular";
        default:
          return null;
      }
    }
    function formatDateInput(input) {
      input.addEventListener("input", (e) => {
        let v = input.value.replaceAll(/\D/g, "");
        if (v.length > 8)
          v = v.substring(0, 8);
        let date = "";
        for (let i = 0; i < v.length; i++) {
          const c = v[i];
          if (i == 2 || i == 4) {
            date += "/";
            date += c;
          } else {
            date += c;
          }
        }
        input.value = date;
        var newDate = hooks(date, "DD/MM/YYYY");
        if (newDate.isValid() && v.length == 8) {
          this.setDate();
          this.clearTBody();
          this.renderCalendar();
        }
      });
      input.addEventListener("focusout", (e) => {
        const d = input.value;
        const n = d.replaceAll(/\D/g, "");
        if (n.length === 6) {
          const year = parseInt(n.substring(4, 6));
          let century;
          if (year > 50) {
            century = "19";
          } else {
            century = "20";
          }
          input.value = d.substring(0, 6) + century + d.substring(6, 8);
        }
      });
    }
    function marcarFormPreenchido() {
      document.querySelectorAll("input.cep:not(.js-running)").forEach((el) => {
        validaCep(el);
      });
      document.querySelectorAll("input.cpf:not(.js-running)").forEach((el) => {
        el.addEventListener("input", function () {
          el.value = maskCPF(el.value);
        });
      });
      document.querySelectorAll("input.money").forEach((el) => {
        inputMoney(el);
      });
      document.querySelectorAll(".tel:not(.js-running)").forEach((el) => {
        el.addEventListener("input", function () {
          validaTelefone(el);
        });
        el.addEventListener("focusout", function () {
          validaTelefone(el);
          let type = validaTelefone(el);
          if (type === "fixo" && el.value.length !== 14 || type === "celular" && el.value.length !== 16 || !type) {
            el.value = "";
          }
        });
      });
      document.querySelectorAll("input.date:not(.js-running)").forEach((el) => {
        el.classList.add("js-running");
        formatDateInput(el);
      });
      document.querySelectorAll("input,textarea").forEach((element) => {
        element.addEventListener("focus", function () {
          this.closest("div").classList.add("preenchido");
        });
        element.addEventListener("input", function () {
          this.closest("div").classList.remove("error");
          if (this.dataset.error)
            this.setCustomValidity("");
        });
        element.addEventListener("focusout", function () {
          if (this.value.length === 0) {
            this.closest("div").classList.remove("preenchido");
          }
        });
        element.addEventListener("invalid", function oninvalid() {
          setFieldError(this);
        });
      });
      document.querySelectorAll("select").forEach((el) => {
        el.addEventListener("input", function preenchido() {
          if (this.selectedIndex >= 0) {
            this.closest("div.container-select").classList.add("preenchido");
          }
        });
        el.addEventListener("invalid", function oninvalid() {
          if (this.selectedIndex >= 0) {
            setFieldError(this, "div.container-select");
          }
        });
      });
      setTimeout(() => {
        document.querySelectorAll("input:-webkit-autofill,textarea:-webkit-autofill").forEach((element) => {
          element.closest("div").classList.add("preenchido");
        });
      }, 1e3);
    }
    function setFieldError(field, closest2 = "div") {
      field.closest(closest2).classList.add("error");
      field.focus();
      if (field.dataset.error)
        field.setCustomValidity(field.dataset.error);
    }
    function CookiesConsent() {
      const cookieContainer = document.querySelector(".container-cookies");
      const acceptBtn = cookieContainer.querySelector(".btn-cookies.accept");
      acceptBtn.addEventListener("click", function () {
        cookieDismiss();
      });
      function setCookie(name, value, days2) {
        var expires = "";
        if (days2) {
          var date = /* @__PURE__ */ new Date();
          date.setTime(date.getTime() + days2 * 24 * 60 * 60 * 1e3);
          expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
      }
      function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == " ")
            c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
        }
        return null;
      }
      function cookieConsent() {
        if (!getCookie("cookieDismiss")) {
          cookieContainer.classList.remove("d-none");
        }
      }
      function cookieDismiss() {
        setCookie("cookieDismiss", "1", 7);
        cookieContainer.dataset.aos = "fadeOut .4s";
        setTimeout(() => {
          cookieContainer.classList.add("d-none");
        }, 400);
      }
      window.onload = function () {
        cookieConsent();
      };
    }
    var smoothScroll_polyfills_min = { exports: {} };
    /*! smooth-scroll v16.1.3 | (c) 2020 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/smooth-scroll */
    (function (module2, exports2) {
      window.Element && !Element.prototype.closest && (Element.prototype.closest = function (e) {
        var t, n = (this.document || this.ownerDocument).querySelectorAll(e), o = this;
        do {
          for (t = n.length; 0 <= --t && n.item(t) !== o;)
            ;
        } while (t < 0 && (o = o.parentElement));
        return o;
      }), function () {
        if ("function" == typeof window.CustomEvent)
          return;
        function e(e2, t) {
          t = t || { bubbles: false, cancelable: false, detail: void 0 };
          var n = document.createEvent("CustomEvent");
          return n.initCustomEvent(e2, t.bubbles, t.cancelable, t.detail), n;
        }
        e.prototype = window.Event.prototype, window.CustomEvent = e;
      }(), function () {
        for (var r = 0, e = ["ms", "moz", "webkit", "o"], t = 0; t < e.length && !window.requestAnimationFrame; ++t)
          window.requestAnimationFrame = window[e[t] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[t] + "CancelAnimationFrame"] || window[e[t] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function (e2, t2) {
          var n = (/* @__PURE__ */ new Date()).getTime(), o = Math.max(0, 16 - (n - r)), a = window.setTimeout(function () {
            e2(n + o);
          }, o);
          return r = n + o, a;
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (e2) {
          clearTimeout(e2);
        });
      }(), function (e, t) {
        module2.exports = t(e);
      }("undefined" != typeof commonjsGlobal ? commonjsGlobal : "undefined" != typeof window ? window : commonjsGlobal, function (M) {
        var q = { ignore: "[data-scroll-ignore]", header: null, topOnEmptyHash: true, speed: 500, speedAsDuration: false, durationMax: null, durationMin: null, clip: true, offset: 0, easing: "easeInOutCubic", customEasing: null, updateURL: true, popstate: true, emitEvents: true }, I = function () {
          var n = {};
          return Array.prototype.forEach.call(arguments, function (e) {
            for (var t in e) {
              if (!e.hasOwnProperty(t))
                return;
              n[t] = e[t];
            }
          }), n;
        }, r = function (e) {
          "#" === e.charAt(0) && (e = e.substr(1));
          for (var t, n = String(e), o = n.length, a = -1, r2 = "", i = n.charCodeAt(0); ++a < o;) {
            if (0 === (t = n.charCodeAt(a)))
              throw new InvalidCharacterError("Invalid character: the input contains U+0000.");
            1 <= t && t <= 31 || 127 == t || 0 === a && 48 <= t && t <= 57 || 1 === a && 48 <= t && t <= 57 && 45 === i ? r2 += "\\" + t.toString(16) + " " : r2 += 128 <= t || 45 === t || 95 === t || 48 <= t && t <= 57 || 65 <= t && t <= 90 || 97 <= t && t <= 122 ? n.charAt(a) : "\\" + n.charAt(a);
          }
          return "#" + r2;
        }, F = function () {
          return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
        }, L = function (e) {
          return e ? (t = e, parseInt(M.getComputedStyle(t).height, 10) + e.offsetTop) : 0;
          var t;
        }, x = function (e, t, n) {
          0 === e && document.body.focus(), n || (e.focus(), document.activeElement !== e && (e.setAttribute("tabindex", "-1"), e.focus(), e.style.outline = "none"), M.scrollTo(0, t));
        }, H = function (e, t, n, o) {
          if (t.emitEvents && "function" == typeof M.CustomEvent) {
            var a = new CustomEvent(e, { bubbles: true, detail: { anchor: n, toggle: o } });
            document.dispatchEvent(a);
          }
        };
        return function (o, e) {
          var b2, a, A, O, C = {};
          C.cancelScroll = function (e2) {
            cancelAnimationFrame(O), O = null, e2 || H("scrollCancel", b2);
          }, C.animateScroll = function (a2, r2, e2) {
            C.cancelScroll();
            var i = I(b2 || q, e2 || {}), c = "[object Number]" === Object.prototype.toString.call(a2), t2 = c || !a2.tagName ? null : a2;
            if (c || t2) {
              var s = M.pageYOffset;
              i.header && !A && (A = document.querySelector(i.header));
              var n2, o2, u, l, m, d, f, h, p = L(A), g = c ? a2 : function (e3, t3, n3, o3) {
                var a3 = 0;
                if (e3.offsetParent)
                  for (; a3 += e3.offsetTop, e3 = e3.offsetParent;)
                    ;
                return a3 = Math.max(a3 - t3 - n3, 0), o3 && (a3 = Math.min(a3, F() - M.innerHeight)), a3;
              }(t2, p, parseInt("function" == typeof i.offset ? i.offset(a2, r2) : i.offset, 10), i.clip), y = g - s, v = F(), w = 0, S = (n2 = y, u = (o2 = i).speedAsDuration ? o2.speed : Math.abs(n2 / 1e3 * o2.speed), o2.durationMax && u > o2.durationMax ? o2.durationMax : o2.durationMin && u < o2.durationMin ? o2.durationMin : parseInt(u, 10)), E = function (e3) {
                var t3, n3, o3;
                l || (l = e3), w += e3 - l, d = s + y * (n3 = m = 1 < (m = 0 === S ? 0 : w / S) ? 1 : m, "easeInQuad" === (t3 = i).easing && (o3 = n3 * n3), "easeOutQuad" === t3.easing && (o3 = n3 * (2 - n3)), "easeInOutQuad" === t3.easing && (o3 = n3 < 0.5 ? 2 * n3 * n3 : (4 - 2 * n3) * n3 - 1), "easeInCubic" === t3.easing && (o3 = n3 * n3 * n3), "easeOutCubic" === t3.easing && (o3 = --n3 * n3 * n3 + 1), "easeInOutCubic" === t3.easing && (o3 = n3 < 0.5 ? 4 * n3 * n3 * n3 : (n3 - 1) * (2 * n3 - 2) * (2 * n3 - 2) + 1), "easeInQuart" === t3.easing && (o3 = n3 * n3 * n3 * n3), "easeOutQuart" === t3.easing && (o3 = 1 - --n3 * n3 * n3 * n3), "easeInOutQuart" === t3.easing && (o3 = n3 < 0.5 ? 8 * n3 * n3 * n3 * n3 : 1 - 8 * --n3 * n3 * n3 * n3), "easeInQuint" === t3.easing && (o3 = n3 * n3 * n3 * n3 * n3), "easeOutQuint" === t3.easing && (o3 = 1 + --n3 * n3 * n3 * n3 * n3), "easeInOutQuint" === t3.easing && (o3 = n3 < 0.5 ? 16 * n3 * n3 * n3 * n3 * n3 : 1 + 16 * --n3 * n3 * n3 * n3 * n3), t3.customEasing && (o3 = t3.customEasing(n3)), o3 || n3), M.scrollTo(0, Math.floor(d)), function (e4, t4) {
                  var n4 = M.pageYOffset;
                  if (e4 == t4 || n4 == t4 || (s < t4 && M.innerHeight + n4) >= v)
                    return C.cancelScroll(true), x(a2, t4, c), H("scrollStop", i, a2, r2), !(O = l = null);
                }(d, g) || (O = M.requestAnimationFrame(E), l = e3);
              };
              0 === M.pageYOffset && M.scrollTo(0, 0), f = a2, h = i, c || history.pushState && h.updateURL && history.pushState({ smoothScroll: JSON.stringify(h), anchor: f.id }, document.title, f === document.documentElement ? "#top" : "#" + f.id), "matchMedia" in M && M.matchMedia("(prefers-reduced-motion)").matches ? x(a2, Math.floor(g), false) : (H("scrollStart", i, a2, r2), C.cancelScroll(true), M.requestAnimationFrame(E));
            }
          };
          var t = function (e2) {
            if (!e2.defaultPrevented && !(0 !== e2.button || e2.metaKey || e2.ctrlKey || e2.shiftKey) && "closest" in e2.target && (a = e2.target.closest(o)) && "a" === a.tagName.toLowerCase() && !e2.target.closest(b2.ignore) && a.hostname === M.location.hostname && a.pathname === M.location.pathname && /#/.test(a.href)) {
              var t2, n2;
              try {
                t2 = r(decodeURIComponent(a.hash));
              } catch (e3) {
                t2 = r(a.hash);
              }
              if ("#" === t2) {
                if (!b2.topOnEmptyHash)
                  return;
                n2 = document.documentElement;
              } else
                n2 = document.querySelector(t2);
              (n2 = n2 || "#top" !== t2 ? n2 : document.documentElement) && (e2.preventDefault(), function (e3) {
                if (history.replaceState && e3.updateURL && !history.state) {
                  var t3 = M.location.hash;
                  t3 = t3 || "", history.replaceState({ smoothScroll: JSON.stringify(e3), anchor: t3 || M.pageYOffset }, document.title, t3 || M.location.href);
                }
              }(b2), C.animateScroll(n2, a));
            }
          }, n = function (e2) {
            if (null !== history.state && history.state.smoothScroll && history.state.smoothScroll === JSON.stringify(b2)) {
              var t2 = history.state.anchor;
              "string" == typeof t2 && t2 && !(t2 = document.querySelector(r(history.state.anchor))) || C.animateScroll(t2, null, { updateURL: false });
            }
          };
          C.destroy = function () {
            b2 && (document.removeEventListener("click", t, false), M.removeEventListener("popstate", n, false), C.cancelScroll(), O = A = a = b2 = null);
          };
          return function () {
            if (!("querySelector" in document && "addEventListener" in M && "requestAnimationFrame" in M && "closest" in M.Element.prototype))
              throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
            C.destroy(), b2 = I(q, e || {}), A = b2.header ? document.querySelector(b2.header) : null, document.addEventListener("click", t, false), b2.updateURL && b2.popstate && M.addEventListener("popstate", n, false);
          }(), C;
        };
      });
    })(smoothScroll_polyfills_min);
    var smoothScroll_polyfills_minExports = smoothScroll_polyfills_min.exports;
    const anchorScroll = /* @__PURE__ */ getDefaultExportFromCjs(smoothScroll_polyfills_minExports);
    function scrollTo(headerDesktop, headerMobile) {
      let scrollToArray = Array.from(document.querySelectorAll("[data-scrollto]:not(.js-running):not(btn-modal-open)"));
      scrollToArray.forEach((element) => {
        element.classList.add("js-running");
        element.addEventListener("click", function (ev) {
          ev.preventDefault();
          var name = element.dataset.scrollto;
          if (element.dataset.scrollto == "0") {
            let anchorscroll = new anchorScroll();
            anchorscroll.animateScroll(0, "", {
              speed: 800,
              speedAsDuration: true,
              easing: "easeOut"
            });
          } else {
            let id = document.querySelector(`#${element.dataset.scrollto}`);
            let header = screen.isDesktop ? headerDesktop : headerMobile;
            if (id) {
              if (parseInt(id.offsetTop) > parseInt(window.scrollY)) {
                header = "";
              }
              let anchorscroll = new anchorScroll();
              if (header.length > 0) {
                anchorscroll.animateScroll(id, "", {
                  speed: 800,
                  speedAsDuration: true,
                  easing: "easeOut",
                  header
                });
              } else {
                anchorscroll.animateScroll(id, "", {
                  speed: 800,
                  speedAsDuration: true,
                  easing: "easeOut"
                });
              }
            } else {
              singlePjaxInstance.loadUrl(element.dataset.href);
              document.addEventListener("pjax:complete", function () {
                let id2 = document.querySelector(`#${name}`);
                if (parseInt(id2.offsetTop) > parseInt(window.scrollY)) {
                  header = "";
                }
                let anchorscroll = new anchorScroll();
                anchorscroll.animateScroll(id2, "", {
                  speed: 800,
                  speedAsDuration: true,
                  easing: "easeOut",
                  header
                });
              }, { once: true });
            }
          }
        });
      });
      window.scrollto = new anchorScroll();
    }
    function toElement(selector) {
      if (typeof selector == "string") {
        return document.querySelector(selector);
      } else if (selector instanceof HTMLElement) {
        return selector;
      } else if (selector instanceof Array && selector[0] instanceof HTMLElement) {
        return selector[0];
      } else if (selector instanceof HTMLCollection) {
        return selector[0];
      } else if (selector instanceof NodeList) {
        return selector[0];
      } else {
        console.error("O que é isso? ", selector);
      }
    }
    let watchList = [];
    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const obj = watchList.find((item) => item.el == entry.target);
        if (obj.cb) {
          obj.cb(entry.isIntersecting, obj.el);
        } else {
          if (entry.isIntersecting) {
            if (obj.wasPlaying) {
              obj.el.play();
            }
          } else {
            if (!obj.el.paused) {
              obj.wasPlaying = true;
              obj.el.pause();
            } else {
              obj.wasPlaying = false;
            }
          }
        }
      });
    });
    document.addEventListener("pjax:send", () => {
      observer.disconnect();
      watchList = [];
    });
    function autoPause(element, callback) {
      let el = toElement(element);
      watchList.push({
        el,
        cb: callback,
        wasPlaying: false
      });
      observer.observe(el);
    }
    function initVideo() {
      document.querySelectorAll("video[data-autoplay]:not(.js-video-running)").forEach((el) => {
        el.classList.add("js-video-running");
        autoPause(el, (intersecting, el2) => {
          if (intersecting) {
            let promise = el2.play();
            if (promise !== void 0) {
              promise.then((_) => {
              }).catch((error) => {
                if (screen.isIphone) {
                  document.body.addEventListener("touchstart", function () {
                    const videosOnScreen = document.querySelectorAll("video[data-autoplay],video[data-autopause],video[autoplay]");
                    videosOnScreen.forEach((element) => {
                      if (element.playing)
                        ;
                      else {
                        element.play();
                        let promise2 = element.play();
                        if (promise2 !== void 0) {
                          promise2.then((_) => {
                          }).catch((error2) => {
                            element.play();
                            element.controls = true;
                          });
                        }
                      }
                    });
                  }, {
                    once: true
                  });
                }
              });
            }
          } else {
            el2.pause();
          }
        });
      });
      document.querySelectorAll("video[data-autopause]:not(.js-video-running)").forEach((el) => {
        el.classList.add("js-video-running");
        autoPause(el);
      });
    }
    function viewportHeight() {
      let vh;
      function calcVh() {
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      }
      if (screen.isMobile) {
        calcVh();
        setTimeout(() => {
          calcVh();
        }, 1e3);
        window.addEventListener("orientationchange", function () {
          setTimeout(() => {
            calcVh();
          }, 300);
        });
      }
    }
    function menuControls() {
      document.addEventListener("pjax:complete", update2);
      update2();
      let menuLinks = document.querySelectorAll("[data-menu-close]");
      menuLinks.forEach((element) => {
        element.addEventListener("click", function () {
          menuLinks.forEach((el) => {
            el.classList.remove("active");
          });
          element.addActive();
        });
      });
      function update2(ev) {
        const willget = document.querySelectorAll("[data-pg-active]");
        const pg = document.body.dataset.pg;
        const hash = window.location.hash;
        willget.forEach((el) => {
          const pga = el.dataset.pgActive.split(" ");
          if (pga.includes(pg) || pga === hash) {
            el.addActive();
          } else {
            el.removeActive();
          }
        });
      }
    }
    var splitting = { exports: {} };
    (function (module2, exports2) {
      (function (global2, factory) {
        module2.exports = factory();
      })(commonjsGlobal, function () {
        var root = document;
        var createText = root.createTextNode.bind(root);
        function setProperty(el, varName, value) {
          el.style.setProperty(varName, value);
        }
        function appendChild(el, child) {
          return el.appendChild(child);
        }
        function createElement2(parent, key2, text, whitespace) {
          var el = root.createElement("span");
          key2 && (el.className = key2);
          if (text) {
            !whitespace && el.setAttribute("data-" + key2, text);
            el.textContent = text;
          }
          return parent && appendChild(parent, el) || el;
        }
        function getData(el, key2) {
          return el.getAttribute("data-" + key2);
        }
        function $(e, parent) {
          return !e || e.length == 0 ? (
            // null or empty string returns empty array
            []
          ) : e.nodeName ? (
            // a single element is wrapped in an array
            [e]
          ) : (
            // selector and NodeList are converted to Element[]
            [].slice.call(e[0].nodeName ? e : (parent || root).querySelectorAll(e))
          );
        }
        function Array2D(len) {
          var a = [];
          for (; len--;) {
            a[len] = [];
          }
          return a;
        }
        function each(items, fn) {
          items && items.some(fn);
        }
        function selectFrom(obj) {
          return function (key2) {
            return obj[key2];
          };
        }
        function index(element, key2, items) {
          var prefix = "--" + key2;
          var cssVar = prefix + "-index";
          each(items, function (items2, i) {
            if (Array.isArray(items2)) {
              each(items2, function (item) {
                setProperty(item, cssVar, i);
              });
            } else {
              setProperty(items2, cssVar, i);
            }
          });
          setProperty(element, prefix + "-total", items.length);
        }
        var plugins = {};
        function resolvePlugins(by, parent, deps) {
          var index2 = deps.indexOf(by);
          if (index2 == -1) {
            deps.unshift(by);
            each(plugins[by].depends, function (p) {
              resolvePlugins(p, by, deps);
            });
          } else {
            var indexOfParent = deps.indexOf(parent);
            deps.splice(index2, 1);
            deps.splice(indexOfParent, 0, by);
          }
          return deps;
        }
        function createPlugin(by, depends, key2, split) {
          return {
            by,
            depends,
            key: key2,
            split
          };
        }
        function resolve(by) {
          return resolvePlugins(by, 0, []).map(selectFrom(plugins));
        }
        function add2(opts) {
          plugins[opts.by] = opts;
        }
        function splitText(el, key2, splitOn, includePrevious, preserveWhitespace) {
          el.normalize();
          var elements = [];
          var F = document.createDocumentFragment();
          if (includePrevious) {
            elements.push(el.previousSibling);
          }
          var allElements = [];
          $(el.childNodes).some(function (next) {
            if (next.tagName && !next.hasChildNodes()) {
              allElements.push(next);
              return;
            }
            if (next.childNodes && next.childNodes.length) {
              allElements.push(next);
              elements.push.apply(elements, splitText(next, key2, splitOn, includePrevious, preserveWhitespace));
              return;
            }
            var wholeText = next.wholeText || "";
            var contents = wholeText.trim();
            if (contents.length) {
              if (wholeText[0] === " ") {
                allElements.push(createText(" "));
              }
              each(contents.split(splitOn), function (splitText2, i) {
                if (i && preserveWhitespace) {
                  allElements.push(createElement2(F, "whitespace", " ", preserveWhitespace));
                }
                var splitEl = createElement2(F, key2, splitText2);
                elements.push(splitEl);
                allElements.push(splitEl);
              });
              if (wholeText[wholeText.length - 1] === " ") {
                allElements.push(createText(" "));
              }
            }
          });
          each(allElements, function (el2) {
            appendChild(F, el2);
          });
          el.innerHTML = "";
          appendChild(el, F);
          return elements;
        }
        var _ = 0;
        function copy(dest, src) {
          for (var k in src) {
            dest[k] = src[k];
          }
          return dest;
        }
        var WORDS = "words";
        var wordPlugin = createPlugin(
          /*by: */
          WORDS,
          /*depends: */
          _,
          /*key: */
          "word",
          /*split: */
          function (el) {
            return splitText(el, "word", /\s+/, 0, 1);
          }
        );
        var CHARS = "chars";
        var charPlugin = createPlugin(
          /*by: */
          CHARS,
          /*depends: */
          [WORDS],
          /*key: */
          "char",
          /*split: */
          function (el, options, ctx) {
            var results = [];
            each(ctx[WORDS], function (word, i) {
              results.push.apply(results, splitText(word, "char", "", options.whitespace && i));
            });
            return results;
          }
        );
        function Splitting2(opts) {
          opts = opts || {};
          var key2 = opts.key;
          return $(opts.target || "[data-splitting]").map(function (el) {
            var ctx = el["🍌"];
            if (!opts.force && ctx) {
              return ctx;
            }
            ctx = el["🍌"] = { el };
            var items = resolve(opts.by || getData(el, "splitting") || CHARS);
            var opts2 = copy({}, opts);
            each(items, function (plugin) {
              if (plugin.split) {
                var pluginBy = plugin.by;
                var key22 = (key2 ? "-" + key2 : "") + plugin.key;
                var results = plugin.split(el, opts2, ctx);
                key22 && index(el, key22, results);
                ctx[pluginBy] = results;
                el.classList.add(pluginBy);
              }
            });
            el.classList.add("splitting");
            return ctx;
          });
        }
        function html(opts) {
          opts = opts || {};
          var parent = opts.target = createElement2();
          parent.innerHTML = opts.content;
          Splitting2(opts);
          return parent.outerHTML;
        }
        Splitting2.html = html;
        Splitting2.add = add2;
        function detectGrid(el, options, side) {
          var items = $(options.matching || el.children, el);
          var c = {};
          each(items, function (w) {
            var val = Math.round(w[side]);
            (c[val] || (c[val] = [])).push(w);
          });
          return Object.keys(c).map(Number).sort(byNumber).map(selectFrom(c));
        }
        function byNumber(a, b2) {
          return a - b2;
        }
        var linePlugin = createPlugin(
          /*by: */
          "lines",
          /*depends: */
          [WORDS],
          /*key: */
          "line",
          /*split: */
          function (el, options, ctx) {
            return detectGrid(el, { matching: ctx[WORDS] }, "offsetTop");
          }
        );
        var itemPlugin = createPlugin(
          /*by: */
          "items",
          /*depends: */
          _,
          /*key: */
          "item",
          /*split: */
          function (el, options) {
            return $(options.matching || el.children, el);
          }
        );
        var rowPlugin = createPlugin(
          /*by: */
          "rows",
          /*depends: */
          _,
          /*key: */
          "row",
          /*split: */
          function (el, options) {
            return detectGrid(el, options, "offsetTop");
          }
        );
        var columnPlugin = createPlugin(
          /*by: */
          "cols",
          /*depends: */
          _,
          /*key: */
          "col",
          /*split: */
          function (el, options) {
            return detectGrid(el, options, "offsetLeft");
          }
        );
        var gridPlugin = createPlugin(
          /*by: */
          "grid",
          /*depends: */
          ["rows", "cols"]
        );
        var LAYOUT = "layout";
        var layoutPlugin = createPlugin(
          /*by: */
          LAYOUT,
          /*depends: */
          _,
          /*key: */
          _,
          /*split: */
          function (el, opts) {
            var rows = opts.rows = +(opts.rows || getData(el, "rows") || 1);
            var columns = opts.columns = +(opts.columns || getData(el, "columns") || 1);
            opts.image = opts.image || getData(el, "image") || el.currentSrc || el.src;
            if (opts.image) {
              var img = $("img", el)[0];
              opts.image = img && (img.currentSrc || img.src);
            }
            if (opts.image) {
              setProperty(el, "background-image", "url(" + opts.image + ")");
            }
            var totalCells = rows * columns;
            var elements = [];
            var container = createElement2(_, "cell-grid");
            while (totalCells--) {
              var cell = createElement2(container, "cell");
              createElement2(cell, "cell-inner");
              elements.push(cell);
            }
            appendChild(el, container);
            return elements;
          }
        );
        var cellRowPlugin = createPlugin(
          /*by: */
          "cellRows",
          /*depends: */
          [LAYOUT],
          /*key: */
          "row",
          /*split: */
          function (el, opts, ctx) {
            var rowCount = opts.rows;
            var result = Array2D(rowCount);
            each(ctx[LAYOUT], function (cell, i, src) {
              result[Math.floor(i / (src.length / rowCount))].push(cell);
            });
            return result;
          }
        );
        var cellColumnPlugin = createPlugin(
          /*by: */
          "cellColumns",
          /*depends: */
          [LAYOUT],
          /*key: */
          "col",
          /*split: */
          function (el, opts, ctx) {
            var columnCount = opts.columns;
            var result = Array2D(columnCount);
            each(ctx[LAYOUT], function (cell, i) {
              result[i % columnCount].push(cell);
            });
            return result;
          }
        );
        var cellPlugin = createPlugin(
          /*by: */
          "cells",
          /*depends: */
          ["cellRows", "cellColumns"],
          /*key: */
          "cell",
          /*split: */
          function (el, opt, ctx) {
            return ctx[LAYOUT];
          }
        );
        add2(wordPlugin);
        add2(charPlugin);
        add2(linePlugin);
        add2(itemPlugin);
        add2(rowPlugin);
        add2(columnPlugin);
        add2(gridPlugin);
        add2(layoutPlugin);
        add2(cellRowPlugin);
        add2(cellColumnPlugin);
        add2(cellPlugin);
        return Splitting2;
      });
    })(splitting);
    var splittingExports = splitting.exports;
    const Splitting = /* @__PURE__ */ getDefaultExportFromCjs(splittingExports);
    function splitWords() {
      document.querySelectorAll(".split-words:not(.splitting)").forEach((element) => {
        const results = Splitting({
          target: element,
          by: "lines"
        });
        new DocumentFragment();
        results[0].lines.forEach((ar, i) => {
          ar.forEach((el, j) => {
            if (j == 0) {
              el.classList.add("first-word");
            }
            el.classList.add("wrapper-mask");
            el.innerHTML = '<span class="line-' + i + '">' + el.innerHTML + "<span>&nbsp;</span></span>";
          });
        });
        element.querySelectorAll(".whitespace").forEach((el) => {
          el.remove();
        });
      });
    }
    document.addEventListener("pjax:complete", splitWords);
    function splitChars() {
      document.querySelectorAll(".split-chars:not(.splitting)").forEach((element) => {
        Splitting({
          target: element,
          by: "chars"
        });
      });
    }
    document.addEventListener("pjax:complete", splitChars);
    const mediaSize = {
      uhd: "only screen and (min-width: 1921px)",
      size1600: "only screen and (max-width: 1679.98px)",
      xl: "only screen and (min-width: 1200px)",
      lg: "only screen and (min-width: 1025.1px)",
      lgOnly: "only screen and (min-width: 1025.1px) and (max-width: 1366px)",
      desktop: "only screen and (min-width: 1025.1px)",
      mobile: "only screen and (max-width: 1025px)",
      tablet: "only screen and (min-width: 767.98px) and (max-width: 1025px)",
      phonePlus: "only screen and (min-width: 768px)",
      phone: "only screen and (max-width: 767.98px)",
      size300: "only screen and (max-width: 379.98px)",
      md: "only screen and (min-width: 768px)",
      sm: "only screen and (min-width: 576px)",
      xsm: "only screen and (min-width: 380px)",
      phonePortrait: "only screen and (max-width: 767.98px) and (orientation: portrait) ",
      landscape: "only screen and (max-width: 768px) and (max-height: 550px) and (orientation: landscape) and (min-width:420px)",
      landscapeX: "only screen and (min-width: 768px) and (max-width: 1025px) and (max-height: 550px) and (orientation: landscape)",
      height500: "only screen and (max-height: 550px)",
      height1080: "only screen and (min-height: 1080px)"
    };
    gsapWithCSS$1.registerPlugin(ScrollTrigger$1, Power3, Power0, ScrollToPlugin, Back);
    function Parallax() {
      let parallaxes = document.querySelectorAll('[data-parallax]:not(.js-running), [data-parallax-top]:not(.js-running)');
      let mm = gsapWithCSS$1.matchMedia();
      window.addEventListener("orientationchange", function () {
        ScrollTrigger$1.refresh();
      });
      window.ScrollTrigger = ScrollTrigger$1;
      parallaxes.forEach((element) => {
        element.classList.add("js-running");
        let yFrom = element.dataset.translateYFrom ? element.dataset.translateYFrom : "0";
        let yTo = element.dataset.translateY ? element.dataset.translateY : "0";
        let xFrom = element.dataset.translateXFrom ? element.dataset.translateXFrom : "0";
        let xTo = element.dataset.translateX ? element.dataset.translateX : "0";
        let rotateFrom = element.dataset.rotateFrom ? element.dataset.rotateFrom : "0deg";
        let rotateTo = element.dataset.rotateTo ? element.dataset.rotateTo : "0deg";
        let scaleFrom = element.dataset.scaleFrom ? element.dataset.scaleFrom : "1";
        let scaleTo = element.dataset.scale ? element.dataset.scale : "1";
        let duration = element.dataset.duration ? element.dataset.duration : 1;
        let repeat = element.dataset.repeat ? element.dataset.repeat : 0;
        let yoyo = element.dataset.yoyo ? element.dataset.yoyo : false;
        let ease = element.dataset.ease ? element.dataset.ease : "Power0.easeInOut";
        let delay2 = element.dataset.delay ? element.dataset.delay : 0;
        let repeatDelay = element.dataset.repeatDelay ? element.dataset.repeatDelay : 0;
        let opacity = element.dataset.opacity ? element.dataset.opacity : 1;
        let opacityFrom = element.dataset.opacityFrom ? element.dataset.opacityFrom : 1;
        let trigger2, endTrigger, start, end, markers;
        if (element.dataset.parallaxTop !== void 0) {
          trigger2 = element.dataset.trigger ? document.querySelector(element.dataset.trigger) : document.querySelector(".wrapper");
          endTrigger = element.dataset.endTrigger ? document.querySelector(element.dataset.endTrigger) : trigger2;
          start = element.dataset.start ? element.dataset.start : "top top";
          end = element.dataset.end ? element.dataset.end : window.innerHeight + " top";
          markers = false;
        } else {
          trigger2 = element.dataset.trigger ? document.querySelector(element.dataset.trigger) : element;
          endTrigger = element.dataset.endTrigger ? document.querySelector(element.dataset.endTrigger) : trigger2;
          start = element.dataset.start || "top bottom";
          end = element.dataset.end || "bottom top";
        }
        if (element.dataset.trigger && element.dataset.trigger == "parent")
          trigger2 = element.parentElement;
        let scrub = element.dataset.repeat && element.dataset.repeat == "-1" ? false : true;
        mm.add(`${mediaSize.phone}`, () => {
          if (element.dataset.parallaxNoPhone !== void 0 || element.dataset.parallaxNoMobile !== void 0)
            return;
          if (element.dataset.phoneTranslateYFrom)
            yFrom = element.dataset.phoneTranslateYFrom;
          if (element.dataset.phoneTranslateY)
            yTo = element.dataset.phoneTranslateY;
          if (element.dataset.phoneTranslateXFrom)
            xFrom = element.dataset.phoneTranslateXFrom;
          if (element.dataset.phoneTranslateX)
            xTo = element.dataset.phoneTranslateX;
          if (element.dataset.phoneRotateFrom)
            rotateFrom = element.dataset.phoneRotateFrom;
          if (element.dataset.phoneRotateTo)
            rotateTo = element.dataset.phoneRotateTo;
          if (element.dataset.phoneScaleFrom)
            scaleFrom = element.dataset.phoneScaleFrom;
          if (element.dataset.phoneScale)
            scaleTo = element.dataset.phoneScale;
          if (element.dataset.phoneDuration)
            duration = element.dataset.phoneDuration;
          if (element.dataset.phoneRepeat)
            repeat = element.dataset.phoneRepeat;
          if (element.dataset.phoneYoyo)
            yoyo = element.dataset.phoneYoyo;
          if (element.dataset.phoneTrigger)
            trigger2 = element.dataset.phoneTrigger;
          if (element.dataset.phoneEndTrigger)
            endTrigger = element.dataset.phoneEndTrigger;
          if (element.dataset.phoneEase)
            ease = element.dataset.phoneEase;
          if (element.dataset.phoneDelay)
            delay2 = element.dataset.phoneDelay;
          if (element.dataset.phoneRepeatDelay)
            repeatDelay = element.dataset.phoneRepeatDelay;
          if (element.dataset.phoneOpacity)
            opacity = element.dataset.phoneOpacity;
          if (element.dataset.phoneOpacityFrom)
            opacityFrom = element.dataset.phoneOpacityFrom;
          if (element.dataset.phoneStart)
            start = element.dataset.phoneStart;
          if (element.dataset.phoneEnd)
            end = element.dataset.phoneEnd;
          if (element.dataset.phoneTrigger && element.dataset.phoneTrigger == "parent")
            trigger2 = element.parentElement;
          const animation = gsapWithCSS$1.timeline({
            repeat,
            delay: delay2,
            repeatDelay,
            yoyo,
            scrollTrigger: {
              trigger: trigger2,
              endTrigger,
              start,
              end,
              markers,
              scrub,
              anticipatePin: true,
              invalidateOnRefresh: true,
              toggleActions: "play pause play pause",
              onUpdate: function (ev) {
              }
            }
          });
          animation.fromTo(element, { y: yFrom, x: xFrom, rotate: rotateFrom, opacity: opacityFrom, scale: scaleFrom, force3D: true }, { y: yTo, x: xTo, rotate: rotateTo, scale: scaleTo, duration, delay: 0, opacity, ease });
        });
        mm.add(`${mediaSize.tablet}`, () => {
          if (element.dataset.parallaxNoTablet !== void 0 || element.dataset.parallaxNoMobile !== void 0)
            return;
          if (element.dataset.tabletTranslateYFrom)
            yFrom = element.dataset.tabletTranslateYFrom;
          if (element.dataset.tabletTranslateY)
            yTo = element.dataset.tabletTranslateY;
          if (element.dataset.tabletTranslateXFrom)
            xFrom = element.dataset.tabletTranslateXFrom;
          if (element.dataset.tabletTranslateX)
            xTo = element.dataset.tabletTranslateX;
          if (element.dataset.tabletRotateFrom)
            rotateFrom = element.dataset.tabletRotateFrom;
          if (element.dataset.tabletRotateTo)
            rotateTo = element.dataset.tabletRotateTo;
          if (element.dataset.tabletScaleFrom)
            scaleFrom = element.dataset.tabletScaleFrom;
          if (element.dataset.tabletScale)
            scaleTo = element.dataset.tabletScale;
          if (element.dataset.tabletDuration)
            duration = element.dataset.tabletDuration;
          if (element.dataset.tabletRepeat)
            repeat = element.dataset.tabletRepeat;
          if (element.dataset.tabletYoyo)
            yoyo = element.dataset.tabletYoyo;
          if (element.dataset.tabletTrigger)
            trigger2 = element.dataset.tabletTrigger;
          if (element.dataset.tabletEndTrigger)
            endTrigger = element.dataset.tabletEndTrigger;
          if (element.dataset.tabletEase)
            ease = element.dataset.tabletEase;
          if (element.dataset.tabletDelay)
            delay2 = element.dataset.tabletDelay;
          if (element.dataset.tabletRepeatDelay)
            repeatDelay = element.dataset.tabletRepeatDelay;
          if (element.dataset.tabletOpacity)
            opacity = element.dataset.tabletOpacity;
          if (element.dataset.tabletOpacityFrom)
            opacityFrom = element.dataset.tabletOpacityFrom;
          if (element.dataset.tabletStart)
            start = element.dataset.tabletStart;
          if (element.dataset.tabletEnd)
            end = element.dataset.tabletEnd;
          if (element.dataset.tabletTrigger && element.dataset.tabletTrigger == "parent")
            trigger2 = element.parentElement;
          const animation = gsapWithCSS$1.timeline({
            repeat,
            delay: delay2,
            repeatDelay,
            yoyo,
            scrollTrigger: {
              trigger: trigger2,
              endTrigger,
              start,
              end,
              // pin: '.home-missao-bem-bolada .container-space',
              pinSpacing: false,
              //   pinReparent:true,
              markers,
              scrub,
              anticipatePin: true,
              invalidateOnRefresh: true,
              toggleActions: "play pause play pause",
              onUpdate: function (ev) {
              }
            }
          });
          animation.fromTo(element, { y: yFrom, x: xFrom, rotate: rotateFrom, opacity: opacityFrom, scale: scaleFrom, force3D: true }, { y: yTo, x: xTo, rotate: rotateTo, scale: scaleTo, duration, delay: 0, opacity, ease });
        });
        mm.add(`${mediaSize.desktop}`, () => {
          if (element.dataset.parallaxNoDesktop !== void 0)
            return;
          const animation = gsapWithCSS$1.timeline({
            repeat,
            delay: delay2,
            repeatDelay,
            yoyo,
            scrollTrigger: {
              trigger: trigger2,
              endTrigger,
              start,
              end,
              // pin: '.home-missao-bem-bolada .container-space',
              pinSpacing: false,
              //   pinReparent:true,
              markers,
              scrub,
              anticipatePin: true,
              invalidateOnRefresh: true,
              toggleActions: "play pause play pause",
              onUpdate: function (ev) {
              }
            }
          });
          animation.fromTo(element, { y: yFrom, x: xFrom, rotate: rotateFrom, opacity: opacityFrom, scale: scaleFrom, force3D: true }, { y: yTo, x: xTo, rotate: rotateTo, scale: scaleTo, duration, delay: 0, opacity, ease });
        });
      });
    }
    function accordion(elements, options) {
      let {
        removeActiveOptions = {},
        addActiveOptions = {},
        clickOutsideRemoveActive = false,
        clickOutsideEl = document,
        clickOutsideCallback = null,
        clickToggle = false,
        allowMultipleActive = false
      } = options ? options : {};
      if (clickOutsideEl != document) {
        clickOutsideEl = toElementArray(clickOutsideEl)[0];
      }
      let list = toElementArray(elements);
      let clickInside = false;
      if (clickOutsideRemoveActive) {
        clickOutsideEl.addEventListener("click", () => {
          if (clickInside == false) {
            list.forEach((item) => item.removeActive(removeActiveOptions));
            if (typeof clickOutsideCallback == "function") {
              clickOutsideCallback();
            }
          }
          clickInside = false;
        });
      }
      list.forEach((item) => {
        item.addEventListener("click", () => {
          clickInside = true;
          const isActive = item.classList.contains("active");
          if (!allowMultipleActive)
            list.forEach((item2) => item2.removeActive(removeActiveOptions));
          if (clickToggle && isActive) {
            item.removeActive(removeActiveOptions);
            return;
          } else {
            item.addActive(addActiveOptions);
          }
        });
      });
    }
    function checkOutTl() {
      let tlCheckOut = gsapWithCSS$1.timeline({
        scrollTrigger: {
          trigger: ".about-check-out",
          start: "25% bottom",
          end: "65% center",
          // pin: '.sobre-intro .about-img',
          pinSpacing: false,
          markers: false,
          scrub: true,
          ease: Power2,
          anticipatePin: true,
          invalidateOnRefresh: true
        }
      });
      tlCheckOut.fromTo(".about-check-out .container-box .bg-box", { scale: 1.5, y: "-26rem" }, { scale: 1, y: "0" });
      tlCheckOut.fromTo(".about-check-out .container-box .title .line-1", { y: "6rem" }, { y: 0, ease: "power2" }, "<");
      tlCheckOut.fromTo(".about-check-out .container-box .title .line-2", { y: "8rem" }, { y: 0, ease: "power2" }, "<+.1");
      tlCheckOut.fromTo(".about-check-out .container-box .container-img", { y: "15rem" }, { scale: 1, y: "0" }, "<+.1");
    }
    const pageName$7 = "about";
    function main$7() {
      sliderBanner();
      checkOutTl();
    }
    const pgAbout = new Page({
      pageName: pageName$7,
      main: main$7
    });
    function sliderFeaturedProducts() {
      if (document.querySelector(".slider-featured-products")) {
        new Swiper(".slider-featured-products .swiper-container", {
          modules: [Pagination, Navigation, Autoplay],
          slidesPerView: "auto",
          spaceBetween: 0,
          slidesPerGroup: 1,
          loop: false,
          effect: "slide",
          speed: 800,
          pagination: {
            el: ".slider-featured-products .swiper-pagination",
            clickable: true
          },
          navigation: {
            nextEl: ".slider-featured-products .swiper-button-next",
            prevEl: ".slider-featured-products .swiper-button-prev"
          },
          loopFillGroupWithBlank: false,
          centerInsufficientSlides: true,
          grabCursor: false,
          observer: true,
          preloadImages: false,
          lazy: true,
          watchOverflow: true,
          breakpoints: {
            767: {
              centeredSlides: true
            },
            1025: {
              centeredSlides: false
            }
          }
        });
      }
    }
    function copyLink() {
      var copyTextareaBtn = document.querySelector(".copy-link");
      copyTextareaBtn.addEventListener("click", function (event) {
        this.querySelector("span").innerText = "Copied!";
        this.classList.add("copied");
        document.querySelector(".copy-link-url").select();
        document.execCommand("copy");
      });
    }
    const pageName$6 = "project";
    function main$6() {
      sliderFeaturedProducts();
    }
    const pgPortfolioPost = new Page({
      pageName: pageName$6,
      main: main$6
    });
    function _defineProperty$1(e, t, i) {
      return t in e ? Object.defineProperty(e, t, { value: i, enumerable: true, configurable: true, writable: true }) : e[t] = i, e;
    }
    function _classCallCheck(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function _defineProperties(e, t) {
      for (var i = 0; i < t.length; i++) {
        var s = t[i];
        s.enumerable = s.enumerable || false, s.configurable = true, "value" in s && (s.writable = true), Object.defineProperty(e, s.key, s);
      }
    }
    function _createClass(e, t, i) {
      return t && _defineProperties(e.prototype, t), i && _defineProperties(e, i), e;
    }
    function _defineProperty(e, t, i) {
      return t in e ? Object.defineProperty(e, t, { value: i, enumerable: true, configurable: true, writable: true }) : e[t] = i, e;
    }
    function ownKeys(e, t) {
      var i = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var s = Object.getOwnPropertySymbols(e);
        t && (s = s.filter(function (t2) {
          return Object.getOwnPropertyDescriptor(e, t2).enumerable;
        })), i.push.apply(i, s);
      }
      return i;
    }
    function _objectSpread2(e) {
      for (var t = 1; t < arguments.length; t++) {
        var i = null != arguments[t] ? arguments[t] : {};
        t % 2 ? ownKeys(Object(i), true).forEach(function (t2) {
          _defineProperty(e, t2, i[t2]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : ownKeys(Object(i)).forEach(function (t2) {
          Object.defineProperty(e, t2, Object.getOwnPropertyDescriptor(i, t2));
        });
      }
      return e;
    }
    var defaults$1 = { addCSS: true, thumbWidth: 15, watch: true };
    function matches$1(e, t) {
      return (function () {
        return Array.from(document.querySelectorAll(t)).includes(this);
      }).call(e, t);
    }
    function trigger(e, t) {
      if (e && t) {
        var i = new Event(t, { bubbles: true });
        e.dispatchEvent(i);
      }
    }
    var getConstructor$1 = function (e) {
      return null != e ? e.constructor : null;
    }, instanceOf$1 = function (e, t) {
      return !!(e && t && e instanceof t);
    }, isNullOrUndefined$1 = function (e) {
      return null == e;
    }, isObject$1 = function (e) {
      return getConstructor$1(e) === Object;
    }, isNumber$1 = function (e) {
      return getConstructor$1(e) === Number && !Number.isNaN(e);
    }, isString$1 = function (e) {
      return getConstructor$1(e) === String;
    }, isBoolean$1 = function (e) {
      return getConstructor$1(e) === Boolean;
    }, isFunction$1 = function (e) {
      return getConstructor$1(e) === Function;
    }, isArray$1 = function (e) {
      return Array.isArray(e);
    }, isNodeList$1 = function (e) {
      return instanceOf$1(e, NodeList);
    }, isElement$1 = function (e) {
      return instanceOf$1(e, Element);
    }, isEvent$1 = function (e) {
      return instanceOf$1(e, Event);
    }, isEmpty$1 = function (e) {
      return isNullOrUndefined$1(e) || (isString$1(e) || isArray$1(e) || isNodeList$1(e)) && !e.length || isObject$1(e) && !Object.keys(e).length;
    }, is$1 = { nullOrUndefined: isNullOrUndefined$1, object: isObject$1, number: isNumber$1, string: isString$1, boolean: isBoolean$1, function: isFunction$1, array: isArray$1, nodeList: isNodeList$1, element: isElement$1, event: isEvent$1, empty: isEmpty$1 };
    function getDecimalPlaces(e) {
      var t = "".concat(e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
      return t ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0)) : 0;
    }
    function round(e, t) {
      if (1 > t) {
        var i = getDecimalPlaces(t);
        return parseFloat(e.toFixed(i));
      }
      return Math.round(e / t) * t;
    }
    var RangeTouch = function () {
      function e(t, i) {
        _classCallCheck(this, e), is$1.element(t) ? this.element = t : is$1.string(t) && (this.element = document.querySelector(t)), is$1.element(this.element) && is$1.empty(this.element.rangeTouch) && (this.config = _objectSpread2({}, defaults$1, {}, i), this.init());
      }
      return _createClass(e, [{
        key: "init", value: function () {
          e.enabled && (this.config.addCSS && (this.element.style.userSelect = "none", this.element.style.webKitUserSelect = "none", this.element.style.touchAction = "manipulation"), this.listeners(true), this.element.rangeTouch = this);
        }
      }, {
        key: "destroy", value: function () {
          e.enabled && (this.config.addCSS && (this.element.style.userSelect = "", this.element.style.webKitUserSelect = "", this.element.style.touchAction = ""), this.listeners(false), this.element.rangeTouch = null);
        }
      }, {
        key: "listeners", value: function (e2) {
          var t = this, i = e2 ? "addEventListener" : "removeEventListener";
          ["touchstart", "touchmove", "touchend"].forEach(function (e3) {
            t.element[i](e3, function (e4) {
              return t.set(e4);
            }, false);
          });
        }
      }, {
        key: "get", value: function (t) {
          if (!e.enabled || !is$1.event(t))
            return null;
          var i, s = t.target, n = t.changedTouches[0], r = parseFloat(s.getAttribute("min")) || 0, a = parseFloat(s.getAttribute("max")) || 100, o = parseFloat(s.getAttribute("step")) || 1, l = s.getBoundingClientRect(), c = 100 / l.width * (this.config.thumbWidth / 2) / 100;
          return 0 > (i = 100 / l.width * (n.clientX - l.left)) ? i = 0 : 100 < i && (i = 100), 50 > i ? i -= (100 - 2 * i) * c : 50 < i && (i += 2 * (i - 50) * c), r + round(i / 100 * (a - r), o);
        }
      }, {
        key: "set", value: function (t) {
          e.enabled && is$1.event(t) && !t.target.disabled && (t.preventDefault(), t.target.value = this.get(t), trigger(t.target, "touchend" === t.type ? "change" : "input"));
        }
      }], [{
        key: "setup", value: function (t) {
          var i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, s = null;
          if (is$1.empty(t) || is$1.string(t) ? s = Array.from(document.querySelectorAll(is$1.string(t) ? t : 'input[type="range"]')) : is$1.element(t) ? s = [t] : is$1.nodeList(t) ? s = Array.from(t) : is$1.array(t) && (s = t.filter(is$1.element)), is$1.empty(s))
            return null;
          var n = _objectSpread2({}, defaults$1, {}, i);
          if (is$1.string(t) && n.watch) {
            var r = new MutationObserver(function (i2) {
              Array.from(i2).forEach(function (i3) {
                Array.from(i3.addedNodes).forEach(function (i4) {
                  is$1.element(i4) && matches$1(i4, t) && new e(i4, n);
                });
              });
            });
            r.observe(document.body, { childList: true, subtree: true });
          }
          return s.map(function (t2) {
            return new e(t2, i);
          });
        }
      }, {
        key: "enabled", get: function () {
          return "ontouchstart" in document.documentElement;
        }
      }]), e;
    }();
    const getConstructor = (e) => null != e ? e.constructor : null, instanceOf = (e, t) => Boolean(e && t && e instanceof t), isNullOrUndefined = (e) => null == e, isObject = (e) => getConstructor(e) === Object, isNumber = (e) => getConstructor(e) === Number && !Number.isNaN(e), isString = (e) => getConstructor(e) === String, isBoolean = (e) => getConstructor(e) === Boolean, isFunction = (e) => "function" == typeof e, isArray = (e) => Array.isArray(e), isWeakMap = (e) => instanceOf(e, WeakMap), isNodeList = (e) => instanceOf(e, NodeList), isTextNode = (e) => getConstructor(e) === Text, isEvent = (e) => instanceOf(e, Event), isKeyboardEvent = (e) => instanceOf(e, KeyboardEvent), isCue = (e) => instanceOf(e, window.TextTrackCue) || instanceOf(e, window.VTTCue), isTrack = (e) => instanceOf(e, TextTrack) || !isNullOrUndefined(e) && isString(e.kind), isPromise = (e) => instanceOf(e, Promise) && isFunction(e.then), isElement = (e) => null !== e && "object" == typeof e && 1 === e.nodeType && "object" == typeof e.style && "object" == typeof e.ownerDocument, isEmpty = (e) => isNullOrUndefined(e) || (isString(e) || isArray(e) || isNodeList(e)) && !e.length || isObject(e) && !Object.keys(e).length, isUrl = (e) => {
      if (instanceOf(e, window.URL))
        return true;
      if (!isString(e))
        return false;
      let t = e;
      e.startsWith("http://") && e.startsWith("https://") || (t = `http://${e}`);
      try {
        return !isEmpty(new URL(t).hostname);
      } catch (e2) {
        return false;
      }
    };
    var is = { nullOrUndefined: isNullOrUndefined, object: isObject, number: isNumber, string: isString, boolean: isBoolean, function: isFunction, array: isArray, weakMap: isWeakMap, nodeList: isNodeList, element: isElement, textNode: isTextNode, event: isEvent, keyboardEvent: isKeyboardEvent, cue: isCue, track: isTrack, promise: isPromise, url: isUrl, empty: isEmpty };
    const transitionEndEvent = (() => {
      const e = document.createElement("span"), t = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend" }, i = Object.keys(t).find((t2) => void 0 !== e.style[t2]);
      return !!is.string(i) && t[i];
    })();
    function repaint(e, t) {
      setTimeout(() => {
        try {
          e.hidden = true, e.offsetHeight, e.hidden = false;
        } catch (e2) {
        }
      }, t);
    }
    const browser = { isIE: Boolean(window.document.documentMode), isEdge: /Edge/g.test(navigator.userAgent), isWebkit: "WebkitAppearance" in document.documentElement.style && !/Edge/g.test(navigator.userAgent), isIPhone: /iPhone|iPod/gi.test(navigator.userAgent) && navigator.maxTouchPoints > 1, isIos: /iPad|iPhone|iPod/gi.test(navigator.userAgent) && navigator.maxTouchPoints > 1 };
    function cloneDeep(e) {
      return JSON.parse(JSON.stringify(e));
    }
    function getDeep(e, t) {
      return t.split(".").reduce((e2, t2) => e2 && e2[t2], e);
    }
    function extend(e = {}, ...t) {
      if (!t.length)
        return e;
      const i = t.shift();
      return is.object(i) ? (Object.keys(i).forEach((t2) => {
        is.object(i[t2]) ? (Object.keys(e).includes(t2) || Object.assign(e, { [t2]: {} }), extend(e[t2], i[t2])) : Object.assign(e, { [t2]: i[t2] });
      }), extend(e, ...t)) : e;
    }
    function wrap(e, t) {
      const i = e.length ? e : [e];
      Array.from(i).reverse().forEach((e2, i2) => {
        const s = i2 > 0 ? t.cloneNode(true) : t, n = e2.parentNode, r = e2.nextSibling;
        s.appendChild(e2), r ? n.insertBefore(s, r) : n.appendChild(s);
      });
    }
    function setAttributes(e, t) {
      is.element(e) && !is.empty(t) && Object.entries(t).filter(([, e2]) => !is.nullOrUndefined(e2)).forEach(([t2, i]) => e.setAttribute(t2, i));
    }
    function createElement(e, t, i) {
      const s = document.createElement(e);
      return is.object(t) && setAttributes(s, t), is.string(i) && (s.innerText = i), s;
    }
    function insertAfter(e, t) {
      is.element(e) && is.element(t) && t.parentNode.insertBefore(e, t.nextSibling);
    }
    function insertElement(e, t, i, s) {
      is.element(t) && t.appendChild(createElement(e, i, s));
    }
    function removeElement(e) {
      is.nodeList(e) || is.array(e) ? Array.from(e).forEach(removeElement) : is.element(e) && is.element(e.parentNode) && e.parentNode.removeChild(e);
    }
    function emptyElement(e) {
      if (!is.element(e))
        return;
      let { length: t } = e.childNodes;
      for (; t > 0;)
        e.removeChild(e.lastChild), t -= 1;
    }
    function replaceElement(e, t) {
      return is.element(t) && is.element(t.parentNode) && is.element(e) ? (t.parentNode.replaceChild(e, t), e) : null;
    }
    function getAttributesFromSelector(e, t) {
      if (!is.string(e) || is.empty(e))
        return {};
      const i = {}, s = extend({}, t);
      return e.split(",").forEach((e2) => {
        const t2 = e2.trim(), n = t2.replace(".", ""), r = t2.replace(/[[\]]/g, "").split("="), [a] = r, o = r.length > 1 ? r[1].replace(/["']/g, "") : "";
        switch (t2.charAt(0)) {
          case ".":
            is.string(s.class) ? i.class = `${s.class} ${n}` : i.class = n;
            break;
          case "#":
            i.id = t2.replace("#", "");
            break;
          case "[":
            i[a] = o;
        }
      }), extend(s, i);
    }
    function toggleHidden(e, t) {
      if (!is.element(e))
        return;
      let i = t;
      is.boolean(i) || (i = !e.hidden), e.hidden = i;
    }
    function toggleClass(e, t, i) {
      if (is.nodeList(e))
        return Array.from(e).map((e2) => toggleClass(e2, t, i));
      if (is.element(e)) {
        let s = "toggle";
        return void 0 !== i && (s = i ? "add" : "remove"), e.classList[s](t), e.classList.contains(t);
      }
      return false;
    }
    function hasClass(e, t) {
      return is.element(e) && e.classList.contains(t);
    }
    function matches(e, t) {
      const { prototype: i } = Element;
      return (i.matches || i.webkitMatchesSelector || i.mozMatchesSelector || i.msMatchesSelector || function () {
        return Array.from(document.querySelectorAll(t)).includes(this);
      }).call(e, t);
    }
    function closest$1(e, t) {
      const { prototype: i } = Element;
      return (i.closest || function () {
        let e2 = this;
        do {
          if (matches.matches(e2, t))
            return e2;
          e2 = e2.parentElement || e2.parentNode;
        } while (null !== e2 && 1 === e2.nodeType);
        return null;
      }).call(e, t);
    }
    function getElements(e) {
      return this.elements.container.querySelectorAll(e);
    }
    function getElement(e) {
      return this.elements.container.querySelector(e);
    }
    function setFocus(e = null, t = false) {
      is.element(e) && (e.focus({ preventScroll: true }), t && toggleClass(e, this.config.classNames.tabFocus));
    }
    const defaultCodecs = { "audio/ogg": "vorbis", "audio/wav": "1", "video/webm": "vp8, vorbis", "video/mp4": "avc1.42E01E, mp4a.40.2", "video/ogg": "theora" }, support = {
      audio: "canPlayType" in document.createElement("audio"), video: "canPlayType" in document.createElement("video"), check(e, t, i) {
        const s = browser.isIPhone && i && support.playsinline, n = support[e] || "html5" !== t;
        return { api: n, ui: n && support.rangeInput && ("video" !== e || !browser.isIPhone || s) };
      }, pip: !(browser.isIPhone || !is.function(createElement("video").webkitSetPresentationMode) && (!document.pictureInPictureEnabled || createElement("video").disablePictureInPicture)), airplay: is.function(window.WebKitPlaybackTargetAvailabilityEvent), playsinline: "playsInline" in document.createElement("video"), mime(e) {
        if (is.empty(e))
          return false;
        const [t] = e.split("/");
        let i = e;
        if (!this.isHTML5 || t !== this.type)
          return false;
        Object.keys(defaultCodecs).includes(i) && (i += `; codecs="${defaultCodecs[e]}"`);
        try {
          return Boolean(i && this.media.canPlayType(i).replace(/no/, ""));
        } catch (e2) {
          return false;
        }
      }, textTracks: "textTracks" in document.createElement("video"), rangeInput: (() => {
        const e = document.createElement("input");
        return e.type = "range", "range" === e.type;
      })(), touch: "ontouchstart" in document.documentElement, transitions: false !== transitionEndEvent, reducedMotion: "matchMedia" in window && window.matchMedia("(prefers-reduced-motion)").matches
    }, supportsPassiveListeners = (() => {
      let e = false;
      try {
        const t = Object.defineProperty({}, "passive", { get: () => (e = true, null) });
        window.addEventListener("test", null, t), window.removeEventListener("test", null, t);
      } catch (e2) {
      }
      return e;
    })();
    function toggleListener(e, t, i, s = false, n = true, r = false) {
      if (!e || !("addEventListener" in e) || is.empty(t) || !is.function(i))
        return;
      const a = t.split(" ");
      let o = r;
      supportsPassiveListeners && (o = { passive: n, capture: r }), a.forEach((t2) => {
        this && this.eventListeners && s && this.eventListeners.push({ element: e, type: t2, callback: i, options: o }), e[s ? "addEventListener" : "removeEventListener"](t2, i, o);
      });
    }
    function on(e, t = "", i, s = true, n = false) {
      toggleListener.call(this, e, t, i, true, s, n);
    }
    function off(e, t = "", i, s = true, n = false) {
      toggleListener.call(this, e, t, i, false, s, n);
    }
    function once(e, t = "", i, s = true, n = false) {
      const r = (...a) => {
        off(e, t, r, s, n), i.apply(this, a);
      };
      toggleListener.call(this, e, t, r, true, s, n);
    }
    function triggerEvent(e, t = "", i = false, s = {}) {
      if (!is.element(e) || is.empty(t))
        return;
      const n = new CustomEvent(t, { bubbles: i, detail: { ...s, plyr: this } });
      e.dispatchEvent(n);
    }
    function unbindListeners() {
      this && this.eventListeners && (this.eventListeners.forEach((e) => {
        const { element: t, type: i, callback: s, options: n } = e;
        t.removeEventListener(i, s, n);
      }), this.eventListeners = []);
    }
    function ready() {
      return new Promise((e) => this.ready ? setTimeout(e, 0) : on.call(this, this.elements.container, "ready", e)).then(() => {
      });
    }
    function silencePromise(e) {
      is.promise(e) && e.then(null, () => {
      });
    }
    function dedupe(e) {
      return is.array(e) ? e.filter((t, i) => e.indexOf(t) === i) : e;
    }
    function closest(e, t) {
      return is.array(e) && e.length ? e.reduce((e2, i) => Math.abs(i - t) < Math.abs(e2 - t) ? i : e2) : null;
    }
    function supportsCSS(e) {
      return !(!window || !window.CSS) && window.CSS.supports(e);
    }
    const standardRatios = [[1, 1], [4, 3], [3, 4], [5, 4], [4, 5], [3, 2], [2, 3], [16, 10], [10, 16], [16, 9], [9, 16], [21, 9], [9, 21], [32, 9], [9, 32]].reduce((e, [t, i]) => ({ ...e, [t / i]: [t, i] }), {});
    function validateAspectRatio(e) {
      if (!(is.array(e) || is.string(e) && e.includes(":")))
        return false;
      return (is.array(e) ? e : e.split(":")).map(Number).every(is.number);
    }
    function reduceAspectRatio(e) {
      if (!is.array(e) || !e.every(is.number))
        return null;
      const [t, i] = e, s = (e2, t2) => 0 === t2 ? e2 : s(t2, e2 % t2), n = s(t, i);
      return [t / n, i / n];
    }
    function getAspectRatio(e) {
      const t = (e2) => validateAspectRatio(e2) ? e2.split(":").map(Number) : null;
      let i = t(e);
      if (null === i && (i = t(this.config.ratio)), null === i && !is.empty(this.embed) && is.array(this.embed.ratio) && ({ ratio: i } = this.embed), null === i && this.isHTML5) {
        const { videoWidth: e2, videoHeight: t2 } = this.media;
        i = [e2, t2];
      }
      return reduceAspectRatio(i);
    }
    function setAspectRatio(e) {
      if (!this.isVideo)
        return {};
      const { wrapper: t } = this.elements, i = getAspectRatio.call(this, e);
      if (!is.array(i))
        return {};
      const [s, n] = reduceAspectRatio(i), r = 100 / s * n;
      if (supportsCSS(`aspect-ratio: ${s}/${n}`) ? t.style.aspectRatio = `${s}/${n}` : t.style.paddingBottom = `${r}%`, this.isVimeo && !this.config.vimeo.premium && this.supported.ui) {
        const e2 = 100 / this.media.offsetWidth * parseInt(window.getComputedStyle(this.media).paddingBottom, 10), i2 = (e2 - r) / (e2 / 50);
        this.fullscreen.active ? t.style.paddingBottom = null : this.media.style.transform = `translateY(-${i2}%)`;
      } else
        this.isHTML5 && t.classList.add(this.config.classNames.videoFixedRatio);
      return { padding: r, ratio: i };
    }
    function roundAspectRatio(e, t, i = 0.05) {
      const s = e / t, n = closest(Object.keys(standardRatios), s);
      return Math.abs(n - s) <= i ? standardRatios[n] : [e, t];
    }
    function getViewportSize() {
      return [Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0), Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)];
    }
    const html5 = {
      getSources() {
        if (!this.isHTML5)
          return [];
        return Array.from(this.media.querySelectorAll("source")).filter((e) => {
          const t = e.getAttribute("type");
          return !!is.empty(t) || support.mime.call(this, t);
        });
      }, getQualityOptions() {
        return this.config.quality.forced ? this.config.quality.options : html5.getSources.call(this).map((e) => Number(e.getAttribute("size"))).filter(Boolean);
      }, setup() {
        if (!this.isHTML5)
          return;
        const e = this;
        e.options.speed = e.config.speed.options, is.empty(this.config.ratio) || setAspectRatio.call(e), Object.defineProperty(e.media, "quality", {
          get() {
            const t = html5.getSources.call(e).find((t2) => t2.getAttribute("src") === e.source);
            return t && Number(t.getAttribute("size"));
          }, set(t) {
            if (e.quality !== t) {
              if (e.config.quality.forced && is.function(e.config.quality.onChange))
                e.config.quality.onChange(t);
              else {
                const i = html5.getSources.call(e).find((e2) => Number(e2.getAttribute("size")) === t);
                if (!i)
                  return;
                const { currentTime: s, paused: n, preload: r, readyState: a, playbackRate: o } = e.media;
                e.media.src = i.getAttribute("src"), ("none" !== r || a) && (e.once("loadedmetadata", () => {
                  e.speed = o, e.currentTime = s, n || silencePromise(e.play());
                }), e.media.load());
              }
              triggerEvent.call(e, e.media, "qualitychange", false, { quality: t });
            }
          }
        });
      }, cancelRequests() {
        this.isHTML5 && (removeElement(html5.getSources.call(this)), this.media.setAttribute("src", this.config.blankVideo), this.media.load(), this.debug.log("Cancelled network requests"));
      }
    };
    function generateId(e) {
      return `${e}-${Math.floor(1e4 * Math.random())}`;
    }
    function format(e, ...t) {
      return is.empty(e) ? e : e.toString().replace(/{(\d+)}/g, (e2, i) => t[i].toString());
    }
    function getPercentage(e, t) {
      return 0 === e || 0 === t || Number.isNaN(e) || Number.isNaN(t) ? 0 : (e / t * 100).toFixed(2);
    }
    const replaceAll = (e = "", t = "", i = "") => e.replace(new RegExp(t.toString().replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1"), "g"), i.toString()), toTitleCase = (e = "") => e.toString().replace(/\w\S*/g, (e2) => e2.charAt(0).toUpperCase() + e2.slice(1).toLowerCase());
    function toPascalCase(e = "") {
      let t = e.toString();
      return t = replaceAll(t, "-", " "), t = replaceAll(t, "_", " "), t = toTitleCase(t), replaceAll(t, " ", "");
    }
    function toCamelCase(e = "") {
      let t = e.toString();
      return t = toPascalCase(t), t.charAt(0).toLowerCase() + t.slice(1);
    }
    function stripHTML(e) {
      const t = document.createDocumentFragment(), i = document.createElement("div");
      return t.appendChild(i), i.innerHTML = e, t.firstChild.innerText;
    }
    function getHTML(e) {
      const t = document.createElement("div");
      return t.appendChild(e), t.innerHTML;
    }
    const resources = { pip: "PIP", airplay: "AirPlay", html5: "HTML5", vimeo: "Vimeo", youtube: "YouTube" }, i18n = {
      get(e = "", t = {}) {
        if (is.empty(e) || is.empty(t))
          return "";
        let i = getDeep(t.i18n, e);
        if (is.empty(i))
          return Object.keys(resources).includes(e) ? resources[e] : "";
        const s = { "{seektime}": t.seekTime, "{title}": t.title };
        return Object.entries(s).forEach(([e2, t2]) => {
          i = replaceAll(i, e2, t2);
        }), i;
      }
    };
    class Storage {
      constructor(e) {
        _defineProperty$1(this, "get", (e2) => {
          if (!Storage.supported || !this.enabled)
            return null;
          const t = window.localStorage.getItem(this.key);
          if (is.empty(t))
            return null;
          const i = JSON.parse(t);
          return is.string(e2) && e2.length ? i[e2] : i;
        }), _defineProperty$1(this, "set", (e2) => {
          if (!Storage.supported || !this.enabled)
            return;
          if (!is.object(e2))
            return;
          let t = this.get();
          is.empty(t) && (t = {}), extend(t, e2);
          try {
            window.localStorage.setItem(this.key, JSON.stringify(t));
          } catch (e3) {
          }
        }), this.enabled = e.config.storage.enabled, this.key = e.config.storage.key;
      }
      static get supported() {
        try {
          if (!("localStorage" in window))
            return false;
          const e = "___test";
          return window.localStorage.setItem(e, e), window.localStorage.removeItem(e), true;
        } catch (e) {
          return false;
        }
      }
    }
    function fetch$1(e, t = "text") {
      return new Promise((i, s) => {
        try {
          const s2 = new XMLHttpRequest();
          if (!("withCredentials" in s2))
            return;
          s2.addEventListener("load", () => {
            if ("text" === t)
              try {
                i(JSON.parse(s2.responseText));
              } catch (e2) {
                i(s2.responseText);
              }
            else
              i(s2.response);
          }), s2.addEventListener("error", () => {
            throw new Error(s2.status);
          }), s2.open("GET", e, true), s2.responseType = t, s2.send();
        } catch (e2) {
          s(e2);
        }
      });
    }
    function loadSprite(e, t) {
      if (!is.string(e))
        return;
      const i = is.string(t);
      let s = false;
      const n = () => null !== document.getElementById(t), r = (e2, t2) => {
        e2.innerHTML = t2, i && n() || document.body.insertAdjacentElement("afterbegin", e2);
      };
      if (!i || !n()) {
        const n2 = Storage.supported, a = document.createElement("div");
        if (a.setAttribute("hidden", ""), i && a.setAttribute("id", t), n2) {
          const e2 = window.localStorage.getItem(`cache-${t}`);
          if (s = null !== e2, s) {
            const t2 = JSON.parse(e2);
            r(a, t2.content);
          }
        }
        fetch$1(e).then((e2) => {
          if (!is.empty(e2)) {
            if (n2)
              try {
                window.localStorage.setItem(`cache-${t}`, JSON.stringify({ content: e2 }));
              } catch (e3) {
              }
            r(a, e2);
          }
        }).catch(() => {
        });
      }
    }
    const getHours = (e) => Math.trunc(e / 60 / 60 % 60, 10), getSeconds = (e) => Math.trunc(e % 60, 10);
    function formatTime(e = 0, t = false, i = false) {
      if (!is.number(e))
        return formatTime(void 0, t, i);
      const s = (e2) => `0${e2}`.slice(-2);
      let n = getHours(e);
      const r = (a = e, Math.trunc(a / 60 % 60, 10));
      var a;
      const o = getSeconds(e);
      return n = t || n > 0 ? `${n}:` : "", `${i && e > 0 ? "-" : ""}${n}${s(r)}:${s(o)}`;
    }
    const controls = {
      getIconUrl() {
        const e = new URL(this.config.iconUrl, window.location), t = window.location.host ? window.location.host : window.top.location.host, i = e.host !== t || browser.isIE && !window.svg4everybody;
        return { url: this.config.iconUrl, cors: i };
      }, findElements() {
        try {
          return this.elements.controls = getElement.call(this, this.config.selectors.controls.wrapper), this.elements.buttons = { play: getElements.call(this, this.config.selectors.buttons.play), pause: getElement.call(this, this.config.selectors.buttons.pause), restart: getElement.call(this, this.config.selectors.buttons.restart), rewind: getElement.call(this, this.config.selectors.buttons.rewind), fastForward: getElement.call(this, this.config.selectors.buttons.fastForward), mute: getElement.call(this, this.config.selectors.buttons.mute), pip: getElement.call(this, this.config.selectors.buttons.pip), airplay: getElement.call(this, this.config.selectors.buttons.airplay), settings: getElement.call(this, this.config.selectors.buttons.settings), captions: getElement.call(this, this.config.selectors.buttons.captions), fullscreen: getElement.call(this, this.config.selectors.buttons.fullscreen) }, this.elements.progress = getElement.call(this, this.config.selectors.progress), this.elements.inputs = { seek: getElement.call(this, this.config.selectors.inputs.seek), volume: getElement.call(this, this.config.selectors.inputs.volume) }, this.elements.display = { buffer: getElement.call(this, this.config.selectors.display.buffer), currentTime: getElement.call(this, this.config.selectors.display.currentTime), duration: getElement.call(this, this.config.selectors.display.duration) }, is.element(this.elements.progress) && (this.elements.display.seekTooltip = this.elements.progress.querySelector(`.${this.config.classNames.tooltip}`)), true;
        } catch (e) {
          return this.debug.warn("It looks like there is a problem with your custom controls HTML", e), this.toggleNativeControls(true), false;
        }
      }, createIcon(e, t) {
        const i = "http://www.w3.org/2000/svg", s = controls.getIconUrl.call(this), n = `${s.cors ? "" : s.url}#${this.config.iconPrefix}`, r = document.createElementNS(i, "svg");
        setAttributes(r, extend(t, { "aria-hidden": "true", focusable: "false" }));
        const a = document.createElementNS(i, "use"), o = `${n}-${e}`;
        return "href" in a && a.setAttributeNS("http://www.w3.org/1999/xlink", "href", o), a.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", o), r.appendChild(a), r;
      }, createLabel(e, t = {}) {
        const i = i18n.get(e, this.config);
        return createElement("span", { ...t, class: [t.class, this.config.classNames.hidden].filter(Boolean).join(" ") }, i);
      }, createBadge(e) {
        if (is.empty(e))
          return null;
        const t = createElement("span", { class: this.config.classNames.menu.value });
        return t.appendChild(createElement("span", { class: this.config.classNames.menu.badge }, e)), t;
      }, createButton(e, t) {
        const i = extend({}, t);
        let s = toCamelCase(e);
        const n = { element: "button", toggle: false, label: null, icon: null, labelPressed: null, iconPressed: null };
        switch (["element", "icon", "label"].forEach((e2) => {
          Object.keys(i).includes(e2) && (n[e2] = i[e2], delete i[e2]);
        }), "button" !== n.element || Object.keys(i).includes("type") || (i.type = "button"), Object.keys(i).includes("class") ? i.class.split(" ").some((e2) => e2 === this.config.classNames.control) || extend(i, { class: `${i.class} ${this.config.classNames.control}` }) : i.class = this.config.classNames.control, e) {
          case "play":
            n.toggle = true, n.label = "play", n.labelPressed = "pause", n.icon = "play", n.iconPressed = "pause";
            break;
          case "mute":
            n.toggle = true, n.label = "mute", n.labelPressed = "unmute", n.icon = "volume", n.iconPressed = "muted";
            break;
          case "captions":
            n.toggle = true, n.label = "enableCaptions", n.labelPressed = "disableCaptions", n.icon = "captions-off", n.iconPressed = "captions-on";
            break;
          case "fullscreen":
            n.toggle = true, n.label = "enterFullscreen", n.labelPressed = "exitFullscreen", n.icon = "enter-fullscreen", n.iconPressed = "exit-fullscreen";
            break;
          case "play-large":
            i.class += ` ${this.config.classNames.control}--overlaid`, s = "play", n.label = "play", n.icon = "play";
            break;
          default:
            is.empty(n.label) && (n.label = s), is.empty(n.icon) && (n.icon = e);
        }
        const r = createElement(n.element);
        return n.toggle ? (r.appendChild(controls.createIcon.call(this, n.iconPressed, { class: "icon--pressed" })), r.appendChild(controls.createIcon.call(this, n.icon, { class: "icon--not-pressed" })), r.appendChild(controls.createLabel.call(this, n.labelPressed, { class: "label--pressed" })), r.appendChild(controls.createLabel.call(this, n.label, { class: "label--not-pressed" }))) : (r.appendChild(controls.createIcon.call(this, n.icon)), r.appendChild(controls.createLabel.call(this, n.label))), extend(i, getAttributesFromSelector(this.config.selectors.buttons[s], i)), setAttributes(r, i), "play" === s ? (is.array(this.elements.buttons[s]) || (this.elements.buttons[s] = []), this.elements.buttons[s].push(r)) : this.elements.buttons[s] = r, r;
      }, createRange(e, t) {
        const i = createElement("input", extend(getAttributesFromSelector(this.config.selectors.inputs[e]), { type: "range", min: 0, max: 100, step: 0.01, value: 0, autocomplete: "off", role: "slider", "aria-label": i18n.get(e, this.config), "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": 0 }, t));
        return this.elements.inputs[e] = i, controls.updateRangeFill.call(this, i), RangeTouch.setup(i), i;
      }, createProgress(e, t) {
        const i = createElement("progress", extend(getAttributesFromSelector(this.config.selectors.display[e]), { min: 0, max: 100, value: 0, role: "progressbar", "aria-hidden": true }, t));
        if ("volume" !== e) {
          i.appendChild(createElement("span", null, "0"));
          const t2 = { played: "played", buffer: "buffered" }[e], s = t2 ? i18n.get(t2, this.config) : "";
          i.innerText = `% ${s.toLowerCase()}`;
        }
        return this.elements.display[e] = i, i;
      }, createTime(e, t) {
        const i = getAttributesFromSelector(this.config.selectors.display[e], t), s = createElement("div", extend(i, { class: `${i.class ? i.class : ""} ${this.config.classNames.display.time} `.trim(), "aria-label": i18n.get(e, this.config) }), "00:00");
        return this.elements.display[e] = s, s;
      }, bindMenuItemShortcuts(e, t) {
        on.call(this, e, "keydown keyup", (i) => {
          if (!["Space", "ArrowUp", "ArrowDown", "ArrowRight"].includes(i.key))
            return;
          if (i.preventDefault(), i.stopPropagation(), "keydown" === i.type)
            return;
          const s = matches(e, '[role="menuitemradio"]');
          if (!s && ["Space", "ArrowRight"].includes(i.key))
            controls.showMenuPanel.call(this, t, true);
          else {
            let t2;
            "Space" !== i.key && ("ArrowDown" === i.key || s && "ArrowRight" === i.key ? (t2 = e.nextElementSibling, is.element(t2) || (t2 = e.parentNode.firstElementChild)) : (t2 = e.previousElementSibling, is.element(t2) || (t2 = e.parentNode.lastElementChild)), setFocus.call(this, t2, true));
          }
        }, false), on.call(this, e, "keyup", (e2) => {
          "Return" === e2.key && controls.focusFirstMenuItem.call(this, null, true);
        });
      }, createMenuItem({ value: e, list: t, type: i, title: s, badge: n = null, checked: r = false }) {
        const a = getAttributesFromSelector(this.config.selectors.inputs[i]), o = createElement("button", extend(a, { type: "button", role: "menuitemradio", class: `${this.config.classNames.control} ${a.class ? a.class : ""}`.trim(), "aria-checked": r, value: e })), l = createElement("span");
        l.innerHTML = s, is.element(n) && l.appendChild(n), o.appendChild(l), Object.defineProperty(o, "checked", {
          enumerable: true, get: () => "true" === o.getAttribute("aria-checked"), set(e2) {
            e2 && Array.from(o.parentNode.children).filter((e3) => matches(e3, '[role="menuitemradio"]')).forEach((e3) => e3.setAttribute("aria-checked", "false")), o.setAttribute("aria-checked", e2 ? "true" : "false");
          }
        }), this.listeners.bind(o, "click keyup", (t2) => {
          if (!is.keyboardEvent(t2) || "Space" === t2.key) {
            switch (t2.preventDefault(), t2.stopPropagation(), o.checked = true, i) {
              case "language":
                this.currentTrack = Number(e);
                break;
              case "quality":
                this.quality = e;
                break;
              case "speed":
                this.speed = parseFloat(e);
            }
            controls.showMenuPanel.call(this, "home", is.keyboardEvent(t2));
          }
        }, i, false), controls.bindMenuItemShortcuts.call(this, o, i), t.appendChild(o);
      }, formatTime(e = 0, t = false) {
        if (!is.number(e))
          return e;
        return formatTime(e, getHours(this.duration) > 0, t);
      }, updateTimeDisplay(e = null, t = 0, i = false) {
        is.element(e) && is.number(t) && (e.innerText = controls.formatTime(t, i));
      }, updateVolume() {
        this.supported.ui && (is.element(this.elements.inputs.volume) && controls.setRange.call(this, this.elements.inputs.volume, this.muted ? 0 : this.volume), is.element(this.elements.buttons.mute) && (this.elements.buttons.mute.pressed = this.muted || 0 === this.volume));
      }, setRange(e, t = 0) {
        is.element(e) && (e.value = t, controls.updateRangeFill.call(this, e));
      }, updateProgress(e) {
        if (!this.supported.ui || !is.event(e))
          return;
        let t = 0;
        const i = (e2, t2) => {
          const i2 = is.number(t2) ? t2 : 0, s = is.element(e2) ? e2 : this.elements.display.buffer;
          if (is.element(s)) {
            s.value = i2;
            const e3 = s.getElementsByTagName("span")[0];
            is.element(e3) && (e3.childNodes[0].nodeValue = i2);
          }
        };
        if (e)
          switch (e.type) {
            case "timeupdate":
            case "seeking":
            case "seeked":
              t = getPercentage(this.currentTime, this.duration), "timeupdate" === e.type && controls.setRange.call(this, this.elements.inputs.seek, t);
              break;
            case "playing":
            case "progress":
              i(this.elements.display.buffer, 100 * this.buffered);
          }
      }, updateRangeFill(e) {
        const t = is.event(e) ? e.target : e;
        if (is.element(t) && "range" === t.getAttribute("type")) {
          if (matches(t, this.config.selectors.inputs.seek)) {
            t.setAttribute("aria-valuenow", this.currentTime);
            const e2 = controls.formatTime(this.currentTime), i = controls.formatTime(this.duration), s = i18n.get("seekLabel", this.config);
            t.setAttribute("aria-valuetext", s.replace("{currentTime}", e2).replace("{duration}", i));
          } else if (matches(t, this.config.selectors.inputs.volume)) {
            const e2 = 100 * t.value;
            t.setAttribute("aria-valuenow", e2), t.setAttribute("aria-valuetext", `${e2.toFixed(1)}%`);
          } else
            t.setAttribute("aria-valuenow", t.value);
          browser.isWebkit && t.style.setProperty("--value", t.value / t.max * 100 + "%");
        }
      }, updateSeekTooltip(e) {
        var t, i;
        if (!this.config.tooltips.seek || !is.element(this.elements.inputs.seek) || !is.element(this.elements.display.seekTooltip) || 0 === this.duration)
          return;
        const s = this.elements.display.seekTooltip, n = `${this.config.classNames.tooltip}--visible`, r = (e2) => toggleClass(s, n, e2);
        if (this.touch)
          return void r(false);
        let a = 0;
        const o = this.elements.progress.getBoundingClientRect();
        if (is.event(e))
          a = 100 / o.width * (e.pageX - o.left);
        else {
          if (!hasClass(s, n))
            return;
          a = parseFloat(s.style.left, 10);
        }
        a < 0 ? a = 0 : a > 100 && (a = 100);
        const l = this.duration / 100 * a;
        s.innerText = controls.formatTime(l);
        const c = null === (t = this.config.markers) || void 0 === t || null === (i = t.points) || void 0 === i ? void 0 : i.find(({ time: e2 }) => e2 === Math.round(l));
        c && s.insertAdjacentHTML("afterbegin", `${c.label}<br>`), s.style.left = `${a}%`, is.event(e) && ["mouseenter", "mouseleave"].includes(e.type) && r("mouseenter" === e.type);
      }, timeUpdate(e) {
        const t = !is.element(this.elements.display.duration) && this.config.invertTime;
        controls.updateTimeDisplay.call(this, this.elements.display.currentTime, t ? this.duration - this.currentTime : this.currentTime, t), e && "timeupdate" === e.type && this.media.seeking || controls.updateProgress.call(this, e);
      }, durationUpdate() {
        if (!this.supported.ui || !this.config.invertTime && this.currentTime)
          return;
        if (this.duration >= 2 ** 32)
          return toggleHidden(this.elements.display.currentTime, true), void toggleHidden(this.elements.progress, true);
        is.element(this.elements.inputs.seek) && this.elements.inputs.seek.setAttribute("aria-valuemax", this.duration);
        const e = is.element(this.elements.display.duration);
        !e && this.config.displayDuration && this.paused && controls.updateTimeDisplay.call(this, this.elements.display.currentTime, this.duration), e && controls.updateTimeDisplay.call(this, this.elements.display.duration, this.duration), this.config.markers.enabled && controls.setMarkers.call(this), controls.updateSeekTooltip.call(this);
      }, toggleMenuButton(e, t) {
        toggleHidden(this.elements.settings.buttons[e], !t);
      }, updateSetting(e, t, i) {
        const s = this.elements.settings.panels[e];
        let n = null, r = t;
        if ("captions" === e)
          n = this.currentTrack;
        else {
          if (n = is.empty(i) ? this[e] : i, is.empty(n) && (n = this.config[e].default), !is.empty(this.options[e]) && !this.options[e].includes(n))
            return void this.debug.warn(`Unsupported value of '${n}' for ${e}`);
          if (!this.config[e].options.includes(n))
            return void this.debug.warn(`Disabled value of '${n}' for ${e}`);
        }
        if (is.element(r) || (r = s && s.querySelector('[role="menu"]')), !is.element(r))
          return;
        this.elements.settings.buttons[e].querySelector(`.${this.config.classNames.menu.value}`).innerHTML = controls.getLabel.call(this, e, n);
        const a = r && r.querySelector(`[value="${n}"]`);
        is.element(a) && (a.checked = true);
      }, getLabel(e, t) {
        switch (e) {
          case "speed":
            return 1 === t ? i18n.get("normal", this.config) : `${t}&times;`;
          case "quality":
            if (is.number(t)) {
              const e2 = i18n.get(`qualityLabel.${t}`, this.config);
              return e2.length ? e2 : `${t}p`;
            }
            return toTitleCase(t);
          case "captions":
            return captions.getLabel.call(this);
          default:
            return null;
        }
      }, setQualityMenu(e) {
        if (!is.element(this.elements.settings.panels.quality))
          return;
        const t = "quality", i = this.elements.settings.panels.quality.querySelector('[role="menu"]');
        is.array(e) && (this.options.quality = dedupe(e).filter((e2) => this.config.quality.options.includes(e2)));
        const s = !is.empty(this.options.quality) && this.options.quality.length > 1;
        if (controls.toggleMenuButton.call(this, t, s), emptyElement(i), controls.checkMenu.call(this), !s)
          return;
        const n = (e2) => {
          const t2 = i18n.get(`qualityBadge.${e2}`, this.config);
          return t2.length ? controls.createBadge.call(this, t2) : null;
        };
        this.options.quality.sort((e2, t2) => {
          const i2 = this.config.quality.options;
          return i2.indexOf(e2) > i2.indexOf(t2) ? 1 : -1;
        }).forEach((e2) => {
          controls.createMenuItem.call(this, { value: e2, list: i, type: t, title: controls.getLabel.call(this, "quality", e2), badge: n(e2) });
        }), controls.updateSetting.call(this, t, i);
      }, setCaptionsMenu() {
        if (!is.element(this.elements.settings.panels.captions))
          return;
        const e = "captions", t = this.elements.settings.panels.captions.querySelector('[role="menu"]'), i = captions.getTracks.call(this), s = Boolean(i.length);
        if (controls.toggleMenuButton.call(this, e, s), emptyElement(t), controls.checkMenu.call(this), !s)
          return;
        const n = i.map((e2, i2) => ({ value: i2, checked: this.captions.toggled && this.currentTrack === i2, title: captions.getLabel.call(this, e2), badge: e2.language && controls.createBadge.call(this, e2.language.toUpperCase()), list: t, type: "language" }));
        n.unshift({ value: -1, checked: !this.captions.toggled, title: i18n.get("disabled", this.config), list: t, type: "language" }), n.forEach(controls.createMenuItem.bind(this)), controls.updateSetting.call(this, e, t);
      }, setSpeedMenu() {
        if (!is.element(this.elements.settings.panels.speed))
          return;
        const e = "speed", t = this.elements.settings.panels.speed.querySelector('[role="menu"]');
        this.options.speed = this.options.speed.filter((e2) => e2 >= this.minimumSpeed && e2 <= this.maximumSpeed);
        const i = !is.empty(this.options.speed) && this.options.speed.length > 1;
        controls.toggleMenuButton.call(this, e, i), emptyElement(t), controls.checkMenu.call(this), i && (this.options.speed.forEach((i2) => {
          controls.createMenuItem.call(this, { value: i2, list: t, type: e, title: controls.getLabel.call(this, "speed", i2) });
        }), controls.updateSetting.call(this, e, t));
      }, checkMenu() {
        const { buttons: e } = this.elements.settings, t = !is.empty(e) && Object.values(e).some((e2) => !e2.hidden);
        toggleHidden(this.elements.settings.menu, !t);
      }, focusFirstMenuItem(e, t = false) {
        if (this.elements.settings.popup.hidden)
          return;
        let i = e;
        is.element(i) || (i = Object.values(this.elements.settings.panels).find((e2) => !e2.hidden));
        const s = i.querySelector('[role^="menuitem"]');
        setFocus.call(this, s, t);
      }, toggleMenu(e) {
        const { popup: t } = this.elements.settings, i = this.elements.buttons.settings;
        if (!is.element(t) || !is.element(i))
          return;
        const { hidden: s } = t;
        let n = s;
        if (is.boolean(e))
          n = e;
        else if (is.keyboardEvent(e) && "Escape" === e.key)
          n = false;
        else if (is.event(e)) {
          const s2 = is.function(e.composedPath) ? e.composedPath()[0] : e.target, r = t.contains(s2);
          if (r || !r && e.target !== i && n)
            return;
        }
        i.setAttribute("aria-expanded", n), toggleHidden(t, !n), toggleClass(this.elements.container, this.config.classNames.menu.open, n), n && is.keyboardEvent(e) ? controls.focusFirstMenuItem.call(this, null, true) : n || s || setFocus.call(this, i, is.keyboardEvent(e));
      }, getMenuSize(e) {
        const t = e.cloneNode(true);
        t.style.position = "absolute", t.style.opacity = 0, t.removeAttribute("hidden"), e.parentNode.appendChild(t);
        const i = t.scrollWidth, s = t.scrollHeight;
        return removeElement(t), { width: i, height: s };
      }, showMenuPanel(e = "", t = false) {
        const i = this.elements.container.querySelector(`#plyr-settings-${this.id}-${e}`);
        if (!is.element(i))
          return;
        const s = i.parentNode, n = Array.from(s.children).find((e2) => !e2.hidden);
        if (support.transitions && !support.reducedMotion) {
          s.style.width = `${n.scrollWidth}px`, s.style.height = `${n.scrollHeight}px`;
          const e2 = controls.getMenuSize.call(this, i), t2 = (e3) => {
            e3.target === s && ["width", "height"].includes(e3.propertyName) && (s.style.width = "", s.style.height = "", off.call(this, s, transitionEndEvent, t2));
          };
          on.call(this, s, transitionEndEvent, t2), s.style.width = `${e2.width}px`, s.style.height = `${e2.height}px`;
        }
        toggleHidden(n, true), toggleHidden(i, false), controls.focusFirstMenuItem.call(this, i, t);
      }, setDownloadUrl() {
        const e = this.elements.buttons.download;
        is.element(e) && e.setAttribute("href", this.download);
      }, create(e) {
        const { bindMenuItemShortcuts: t, createButton: i, createProgress: s, createRange: n, createTime: r, setQualityMenu: a, setSpeedMenu: o, showMenuPanel: l } = controls;
        this.elements.controls = null, is.array(this.config.controls) && this.config.controls.includes("play-large") && this.elements.container.appendChild(i.call(this, "play-large"));
        const c = createElement("div", getAttributesFromSelector(this.config.selectors.controls.wrapper));
        this.elements.controls = c;
        const u = { class: "plyr__controls__item" };
        return dedupe(is.array(this.config.controls) ? this.config.controls : []).forEach((a2) => {
          if ("restart" === a2 && c.appendChild(i.call(this, "restart", u)), "rewind" === a2 && c.appendChild(i.call(this, "rewind", u)), "play" === a2 && c.appendChild(i.call(this, "play", u)), "fast-forward" === a2 && c.appendChild(i.call(this, "fast-forward", u)), "progress" === a2) {
            const t2 = createElement("div", { class: `${u.class} plyr__progress__container` }), i2 = createElement("div", getAttributesFromSelector(this.config.selectors.progress));
            if (i2.appendChild(n.call(this, "seek", { id: `plyr-seek-${e.id}` })), i2.appendChild(s.call(this, "buffer")), this.config.tooltips.seek) {
              const e2 = createElement("span", { class: this.config.classNames.tooltip }, "00:00");
              i2.appendChild(e2), this.elements.display.seekTooltip = e2;
            }
            this.elements.progress = i2, t2.appendChild(this.elements.progress), c.appendChild(t2);
          }
          if ("current-time" === a2 && c.appendChild(r.call(this, "currentTime", u)), "duration" === a2 && c.appendChild(r.call(this, "duration", u)), "mute" === a2 || "volume" === a2) {
            let { volume: t2 } = this.elements;
            if (is.element(t2) && c.contains(t2) || (t2 = createElement("div", extend({}, u, { class: `${u.class} plyr__volume`.trim() })), this.elements.volume = t2, c.appendChild(t2)), "mute" === a2 && t2.appendChild(i.call(this, "mute")), "volume" === a2 && !browser.isIos) {
              const i2 = { max: 1, step: 0.05, value: this.config.volume };
              t2.appendChild(n.call(this, "volume", extend(i2, { id: `plyr-volume-${e.id}` })));
            }
          }
          if ("captions" === a2 && c.appendChild(i.call(this, "captions", u)), "settings" === a2 && !is.empty(this.config.settings)) {
            const s2 = createElement("div", extend({}, u, { class: `${u.class} plyr__menu`.trim(), hidden: "" }));
            s2.appendChild(i.call(this, "settings", { "aria-haspopup": true, "aria-controls": `plyr-settings-${e.id}`, "aria-expanded": false }));
            const n2 = createElement("div", { class: "plyr__menu__container", id: `plyr-settings-${e.id}`, hidden: "" }), r2 = createElement("div"), a3 = createElement("div", { id: `plyr-settings-${e.id}-home` }), o2 = createElement("div", { role: "menu" });
            a3.appendChild(o2), r2.appendChild(a3), this.elements.settings.panels.home = a3, this.config.settings.forEach((i2) => {
              const s3 = createElement("button", extend(getAttributesFromSelector(this.config.selectors.buttons.settings), { type: "button", class: `${this.config.classNames.control} ${this.config.classNames.control}--forward`, role: "menuitem", "aria-haspopup": true, hidden: "" }));
              t.call(this, s3, i2), on.call(this, s3, "click", () => {
                l.call(this, i2, false);
              });
              const n3 = createElement("span", null, i18n.get(i2, this.config)), a4 = createElement("span", { class: this.config.classNames.menu.value });
              a4.innerHTML = e[i2], n3.appendChild(a4), s3.appendChild(n3), o2.appendChild(s3);
              const c2 = createElement("div", { id: `plyr-settings-${e.id}-${i2}`, hidden: "" }), u2 = createElement("button", { type: "button", class: `${this.config.classNames.control} ${this.config.classNames.control}--back` });
              u2.appendChild(createElement("span", { "aria-hidden": true }, i18n.get(i2, this.config))), u2.appendChild(createElement("span", { class: this.config.classNames.hidden }, i18n.get("menuBack", this.config))), on.call(this, c2, "keydown", (e2) => {
                "ArrowLeft" === e2.key && (e2.preventDefault(), e2.stopPropagation(), l.call(this, "home", true));
              }, false), on.call(this, u2, "click", () => {
                l.call(this, "home", false);
              }), c2.appendChild(u2), c2.appendChild(createElement("div", { role: "menu" })), r2.appendChild(c2), this.elements.settings.buttons[i2] = s3, this.elements.settings.panels[i2] = c2;
            }), n2.appendChild(r2), s2.appendChild(n2), c.appendChild(s2), this.elements.settings.popup = n2, this.elements.settings.menu = s2;
          }
          if ("pip" === a2 && support.pip && c.appendChild(i.call(this, "pip", u)), "airplay" === a2 && support.airplay && c.appendChild(i.call(this, "airplay", u)), "download" === a2) {
            const e2 = extend({}, u, { element: "a", href: this.download, target: "_blank" });
            this.isHTML5 && (e2.download = "");
            const { download: t2 } = this.config.urls;
            !is.url(t2) && this.isEmbed && extend(e2, { icon: `logo-${this.provider}`, label: this.provider }), c.appendChild(i.call(this, "download", e2));
          }
          "fullscreen" === a2 && c.appendChild(i.call(this, "fullscreen", u));
        }), this.isHTML5 && a.call(this, html5.getQualityOptions.call(this)), o.call(this), c;
      }, inject() {
        if (this.config.loadSprite) {
          const e2 = controls.getIconUrl.call(this);
          e2.cors && loadSprite(e2.url, "sprite-plyr");
        }
        this.id = Math.floor(1e4 * Math.random());
        let e = null;
        this.elements.controls = null;
        const t = { id: this.id, seektime: this.config.seekTime, title: this.config.title };
        let i = true;
        is.function(this.config.controls) && (this.config.controls = this.config.controls.call(this, t)), this.config.controls || (this.config.controls = []), is.element(this.config.controls) || is.string(this.config.controls) ? e = this.config.controls : (e = controls.create.call(this, { id: this.id, seektime: this.config.seekTime, speed: this.speed, quality: this.quality, captions: captions.getLabel.call(this) }), i = false);
        let s;
        i && is.string(this.config.controls) && (e = ((e2) => {
          let i2 = e2;
          return Object.entries(t).forEach(([e3, t2]) => {
            i2 = replaceAll(i2, `{${e3}}`, t2);
          }), i2;
        })(e)), is.string(this.config.selectors.controls.container) && (s = document.querySelector(this.config.selectors.controls.container)), is.element(s) || (s = this.elements.container);
        if (s[is.element(e) ? "insertAdjacentElement" : "insertAdjacentHTML"]("afterbegin", e), is.element(this.elements.controls) || controls.findElements.call(this), !is.empty(this.elements.buttons)) {
          const e2 = (e3) => {
            const t2 = this.config.classNames.controlPressed;
            e3.setAttribute("aria-pressed", "false"), Object.defineProperty(e3, "pressed", {
              configurable: true, enumerable: true, get: () => hasClass(e3, t2), set(i2 = false) {
                toggleClass(e3, t2, i2), e3.setAttribute("aria-pressed", i2 ? "true" : "false");
              }
            });
          };
          Object.values(this.elements.buttons).filter(Boolean).forEach((t2) => {
            is.array(t2) || is.nodeList(t2) ? Array.from(t2).filter(Boolean).forEach(e2) : e2(t2);
          });
        }
        if (browser.isEdge && repaint(s), this.config.tooltips.controls) {
          const { classNames: e2, selectors: t2 } = this.config, i2 = `${t2.controls.wrapper} ${t2.labels} .${e2.hidden}`, s2 = getElements.call(this, i2);
          Array.from(s2).forEach((e3) => {
            toggleClass(e3, this.config.classNames.hidden, false), toggleClass(e3, this.config.classNames.tooltip, true);
          });
        }
      }, setMediaMetadata() {
        try {
          "mediaSession" in navigator && (navigator.mediaSession.metadata = new window.MediaMetadata({ title: this.config.mediaMetadata.title, artist: this.config.mediaMetadata.artist, album: this.config.mediaMetadata.album, artwork: this.config.mediaMetadata.artwork }));
        } catch (e) {
        }
      }, setMarkers() {
        var e, t;
        if (!this.duration || this.elements.markers)
          return;
        const i = null === (e = this.config.markers) || void 0 === e || null === (t = e.points) || void 0 === t ? void 0 : t.filter(({ time: e2 }) => e2 > 0 && e2 < this.duration);
        if (null == i || !i.length)
          return;
        const s = document.createDocumentFragment(), n = document.createDocumentFragment();
        let r = null;
        const a = `${this.config.classNames.tooltip}--visible`, o = (e2) => toggleClass(r, a, e2);
        i.forEach((e2) => {
          const t2 = createElement("span", { class: this.config.classNames.marker }, ""), i2 = e2.time / this.duration * 100 + "%";
          r && (t2.addEventListener("mouseenter", () => {
            e2.label || (r.style.left = i2, r.innerHTML = e2.label, o(true));
          }), t2.addEventListener("mouseleave", () => {
            o(false);
          })), t2.addEventListener("click", () => {
            this.currentTime = e2.time;
          }), t2.style.left = i2, n.appendChild(t2);
        }), s.appendChild(n), this.config.tooltips.seek || (r = createElement("span", { class: this.config.classNames.tooltip }, ""), s.appendChild(r)), this.elements.markers = { points: n, tip: r }, this.elements.progress.appendChild(s);
      }
    };
    function parseUrl(e, t = true) {
      let i = e;
      if (t) {
        const e2 = document.createElement("a");
        e2.href = i, i = e2.href;
      }
      try {
        return new URL(i);
      } catch (e2) {
        return null;
      }
    }
    function buildUrlParams(e) {
      const t = new URLSearchParams();
      return is.object(e) && Object.entries(e).forEach(([e2, i]) => {
        t.set(e2, i);
      }), t;
    }
    const captions = {
      setup() {
        if (!this.supported.ui)
          return;
        if (!this.isVideo || this.isYouTube || this.isHTML5 && !support.textTracks)
          return void (is.array(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && controls.setCaptionsMenu.call(this));
        if (is.element(this.elements.captions) || (this.elements.captions = createElement("div", getAttributesFromSelector(this.config.selectors.captions)), this.elements.captions.setAttribute("dir", "auto"), insertAfter(this.elements.captions, this.elements.wrapper)), browser.isIE && window.URL) {
          const e2 = this.media.querySelectorAll("track");
          Array.from(e2).forEach((e3) => {
            const t2 = e3.getAttribute("src"), i2 = parseUrl(t2);
            null !== i2 && i2.hostname !== window.location.href.hostname && ["http:", "https:"].includes(i2.protocol) && fetch$1(t2, "blob").then((t3) => {
              e3.setAttribute("src", window.URL.createObjectURL(t3));
            }).catch(() => {
              removeElement(e3);
            });
          });
        }
        const e = dedupe((navigator.languages || [navigator.language || navigator.userLanguage || "en"]).map((e2) => e2.split("-")[0]));
        let t = (this.storage.get("language") || this.config.captions.language || "auto").toLowerCase();
        "auto" === t && ([t] = e);
        let i = this.storage.get("captions");
        if (is.boolean(i) || ({ active: i } = this.config.captions), Object.assign(this.captions, { toggled: false, active: i, language: t, languages: e }), this.isHTML5) {
          const e2 = this.config.captions.update ? "addtrack removetrack" : "removetrack";
          on.call(this, this.media.textTracks, e2, captions.update.bind(this));
        }
        setTimeout(captions.update.bind(this), 0);
      }, update() {
        const e = captions.getTracks.call(this, true), { active: t, language: i, meta: s, currentTrackNode: n } = this.captions, r = Boolean(e.find((e2) => e2.language === i));
        this.isHTML5 && this.isVideo && e.filter((e2) => !s.get(e2)).forEach((e2) => {
          this.debug.log("Track added", e2), s.set(e2, { default: "showing" === e2.mode }), "showing" === e2.mode && (e2.mode = "hidden"), on.call(this, e2, "cuechange", () => captions.updateCues.call(this));
        }), (r && this.language !== i || !e.includes(n)) && (captions.setLanguage.call(this, i), captions.toggle.call(this, t && r)), this.elements && toggleClass(this.elements.container, this.config.classNames.captions.enabled, !is.empty(e)), is.array(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && controls.setCaptionsMenu.call(this);
      }, toggle(e, t = true) {
        if (!this.supported.ui)
          return;
        const { toggled: i } = this.captions, s = this.config.classNames.captions.active, n = is.nullOrUndefined(e) ? !i : e;
        if (n !== i) {
          if (t || (this.captions.active = n, this.storage.set({ captions: n })), !this.language && n && !t) {
            const e2 = captions.getTracks.call(this), t2 = captions.findTrack.call(this, [this.captions.language, ...this.captions.languages], true);
            return this.captions.language = t2.language, void captions.set.call(this, e2.indexOf(t2));
          }
          this.elements.buttons.captions && (this.elements.buttons.captions.pressed = n), toggleClass(this.elements.container, s, n), this.captions.toggled = n, controls.updateSetting.call(this, "captions"), triggerEvent.call(this, this.media, n ? "captionsenabled" : "captionsdisabled");
        }
        setTimeout(() => {
          n && this.captions.toggled && (this.captions.currentTrackNode.mode = "hidden");
        });
      }, set(e, t = true) {
        const i = captions.getTracks.call(this);
        if (-1 !== e)
          if (is.number(e))
            if (e in i) {
              if (this.captions.currentTrack !== e) {
                this.captions.currentTrack = e;
                const s = i[e], { language: n } = s || {};
                this.captions.currentTrackNode = s, controls.updateSetting.call(this, "captions"), t || (this.captions.language = n, this.storage.set({ language: n })), this.isVimeo && this.embed.enableTextTrack(n), triggerEvent.call(this, this.media, "languagechange");
              }
              captions.toggle.call(this, true, t), this.isHTML5 && this.isVideo && captions.updateCues.call(this);
            } else
              this.debug.warn("Track not found", e);
          else
            this.debug.warn("Invalid caption argument", e);
        else
          captions.toggle.call(this, false, t);
      }, setLanguage(e, t = true) {
        if (!is.string(e))
          return void this.debug.warn("Invalid language argument", e);
        const i = e.toLowerCase();
        this.captions.language = i;
        const s = captions.getTracks.call(this), n = captions.findTrack.call(this, [i]);
        captions.set.call(this, s.indexOf(n), t);
      }, getTracks(e = false) {
        return Array.from((this.media || {}).textTracks || []).filter((t) => !this.isHTML5 || e || this.captions.meta.has(t)).filter((e2) => ["captions", "subtitles"].includes(e2.kind));
      }, findTrack(e, t = false) {
        const i = captions.getTracks.call(this), s = (e2) => Number((this.captions.meta.get(e2) || {}).default), n = Array.from(i).sort((e2, t2) => s(t2) - s(e2));
        let r;
        return e.every((e2) => (r = n.find((t2) => t2.language === e2), !r)), r || (t ? n[0] : void 0);
      }, getCurrentTrack() {
        return captions.getTracks.call(this)[this.currentTrack];
      }, getLabel(e) {
        let t = e;
        return !is.track(t) && support.textTracks && this.captions.toggled && (t = captions.getCurrentTrack.call(this)), is.track(t) ? is.empty(t.label) ? is.empty(t.language) ? i18n.get("enabled", this.config) : e.language.toUpperCase() : t.label : i18n.get("disabled", this.config);
      }, updateCues(e) {
        if (!this.supported.ui)
          return;
        if (!is.element(this.elements.captions))
          return void this.debug.warn("No captions element to render to");
        if (!is.nullOrUndefined(e) && !Array.isArray(e))
          return void this.debug.warn("updateCues: Invalid input", e);
        let t = e;
        if (!t) {
          const e2 = captions.getCurrentTrack.call(this);
          t = Array.from((e2 || {}).activeCues || []).map((e3) => e3.getCueAsHTML()).map(getHTML);
        }
        const i = t.map((e2) => e2.trim()).join("\n");
        if (i !== this.elements.captions.innerHTML) {
          emptyElement(this.elements.captions);
          const e2 = createElement("span", getAttributesFromSelector(this.config.selectors.caption));
          e2.innerHTML = i, this.elements.captions.appendChild(e2), triggerEvent.call(this, this.media, "cuechange");
        }
      }
    }, defaults = { enabled: true, title: "", debug: false, autoplay: false, autopause: true, playsinline: true, seekTime: 10, volume: 1, muted: false, duration: null, displayDuration: true, invertTime: true, toggleInvert: true, ratio: null, clickToPlay: true, hideControls: true, resetOnEnd: false, disableContextMenu: true, loadSprite: true, iconPrefix: "plyr", iconUrl: "https://cdn.plyr.io/3.7.3/plyr.svg", blankVideo: "https://cdn.plyr.io/static/blank.mp4", quality: { default: 576, options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240], forced: false, onChange: null }, loop: { active: false }, speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 4] }, keyboard: { focused: true, global: false }, tooltips: { controls: false, seek: true }, captions: { active: false, language: "auto", update: false }, fullscreen: { enabled: true, fallback: true, iosNative: false }, storage: { enabled: true, key: "plyr" }, controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "captions", "settings", "pip", "airplay", "fullscreen"], settings: ["captions", "quality", "speed"], i18n: { restart: "Restart", rewind: "Rewind {seektime}s", play: "Play", pause: "Pause", fastForward: "Forward {seektime}s", seek: "Seek", seekLabel: "{currentTime} of {duration}", played: "Played", buffered: "Buffered", currentTime: "Current time", duration: "Duration", volume: "Volume", mute: "Mute", unmute: "Unmute", enableCaptions: "Enable captions", disableCaptions: "Disable captions", download: "Download", enterFullscreen: "Enter fullscreen", exitFullscreen: "Exit fullscreen", frameTitle: "Player for {title}", captions: "Captions", settings: "Settings", pip: "PIP", menuBack: "Go back to previous menu", speed: "Speed", normal: "Normal", quality: "Quality", loop: "Loop", start: "Start", end: "End", all: "All", reset: "Reset", disabled: "Disabled", enabled: "Enabled", advertisement: "Ad", qualityBadge: { 2160: "4K", 1440: "HD", 1080: "HD", 720: "HD", 576: "SD", 480: "SD" } }, urls: { download: null, vimeo: { sdk: "https://player.vimeo.com/api/player.js", iframe: "https://player.vimeo.com/video/{0}?{1}", api: "https://vimeo.com/api/oembed.json?url={0}" }, youtube: { sdk: "https://www.youtube.com/iframe_api", api: "https://noembed.com/embed?url=https://www.youtube.com/watch?v={0}" }, googleIMA: { sdk: "https://imasdk.googleapis.com/js/sdkloader/ima3.js" } }, listeners: { seek: null, play: null, pause: null, restart: null, rewind: null, fastForward: null, mute: null, volume: null, captions: null, download: null, fullscreen: null, pip: null, airplay: null, speed: null, quality: null, loop: null, language: null }, events: ["ended", "progress", "stalled", "playing", "waiting", "canplay", "canplaythrough", "loadstart", "loadeddata", "loadedmetadata", "timeupdate", "volumechange", "play", "pause", "error", "seeking", "seeked", "emptied", "ratechange", "cuechange", "download", "enterfullscreen", "exitfullscreen", "captionsenabled", "captionsdisabled", "languagechange", "controlshidden", "controlsshown", "ready", "statechange", "qualitychange", "adsloaded", "adscontentpause", "adscontentresume", "adstarted", "adsmidpoint", "adscomplete", "adsallcomplete", "adsimpression", "adsclick"], selectors: { editable: "input, textarea, select, [contenteditable]", container: ".plyr", controls: { container: null, wrapper: ".plyr__controls" }, labels: "[data-plyr]", buttons: { play: '[data-plyr="play"]', pause: '[data-plyr="pause"]', restart: '[data-plyr="restart"]', rewind: '[data-plyr="rewind"]', fastForward: '[data-plyr="fast-forward"]', mute: '[data-plyr="mute"]', captions: '[data-plyr="captions"]', download: '[data-plyr="download"]', fullscreen: '[data-plyr="fullscreen"]', pip: '[data-plyr="pip"]', airplay: '[data-plyr="airplay"]', settings: '[data-plyr="settings"]', loop: '[data-plyr="loop"]' }, inputs: { seek: '[data-plyr="seek"]', volume: '[data-plyr="volume"]', speed: '[data-plyr="speed"]', language: '[data-plyr="language"]', quality: '[data-plyr="quality"]' }, display: { currentTime: ".plyr__time--current", duration: ".plyr__time--duration", buffer: ".plyr__progress__buffer", loop: ".plyr__progress__loop", volume: ".plyr__volume--display" }, progress: ".plyr__progress", captions: ".plyr__captions", caption: ".plyr__caption" }, classNames: { type: "plyr--{0}", provider: "plyr--{0}", video: "plyr__video-wrapper", embed: "plyr__video-embed", videoFixedRatio: "plyr__video-wrapper--fixed-ratio", embedContainer: "plyr__video-embed__container", poster: "plyr__poster", posterEnabled: "plyr__poster-enabled", ads: "plyr__ads", control: "plyr__control", controlPressed: "plyr__control--pressed", playing: "plyr--playing", paused: "plyr--paused", stopped: "plyr--stopped", loading: "plyr--loading", hover: "plyr--hover", tooltip: "plyr__tooltip", cues: "plyr__cues", marker: "plyr__progress__marker", hidden: "plyr__sr-only", hideControls: "plyr--hide-controls", isIos: "plyr--is-ios", isTouch: "plyr--is-touch", uiSupported: "plyr--full-ui", noTransition: "plyr--no-transition", display: { time: "plyr__time" }, menu: { value: "plyr__menu__value", badge: "plyr__badge", open: "plyr--menu-open" }, captions: { enabled: "plyr--captions-enabled", active: "plyr--captions-active" }, fullscreen: { enabled: "plyr--fullscreen-enabled", fallback: "plyr--fullscreen-fallback" }, pip: { supported: "plyr--pip-supported", active: "plyr--pip-active" }, airplay: { supported: "plyr--airplay-supported", active: "plyr--airplay-active" }, tabFocus: "plyr__tab-focus", previewThumbnails: { thumbContainer: "plyr__preview-thumb", thumbContainerShown: "plyr__preview-thumb--is-shown", imageContainer: "plyr__preview-thumb__image-container", timeContainer: "plyr__preview-thumb__time-container", scrubbingContainer: "plyr__preview-scrubbing", scrubbingContainerShown: "plyr__preview-scrubbing--is-shown" } }, attributes: { embed: { provider: "data-plyr-provider", id: "data-plyr-embed-id", hash: "data-plyr-embed-hash" } }, ads: { enabled: false, publisherId: "", tagUrl: "" }, previewThumbnails: { enabled: false, src: "" }, vimeo: { byline: false, portrait: false, title: false, speed: true, transparent: false, customControls: true, referrerPolicy: null, premium: false }, youtube: { rel: 0, showinfo: 0, iv_load_policy: 3, modestbranding: 1, customControls: true, noCookie: false }, mediaMetadata: { title: "", artist: "", album: "", artwork: [] }, markers: { enabled: false, points: [] } }, pip = { active: "picture-in-picture", inactive: "inline" }, providers = { html5: "html5", youtube: "youtube", vimeo: "vimeo" }, types = { audio: "audio", video: "video" };
    function getProviderByUrl(e) {
      return /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(e) ? providers.youtube : /^https?:\/\/player.vimeo.com\/video\/\d{0,9}(?=\b|\/)/.test(e) ? providers.vimeo : null;
    }
    const noop = () => {
    };
    class Console {
      constructor(e = false) {
        this.enabled = window.console && e, this.enabled && this.log("Debugging enabled");
      }
      get log() {
        return this.enabled ? Function.prototype.bind.call(console.log, console) : noop;
      }
      get warn() {
        return this.enabled ? Function.prototype.bind.call(console.warn, console) : noop;
      }
      get error() {
        return this.enabled ? Function.prototype.bind.call(console.error, console) : noop;
      }
    }
    class Fullscreen {
      constructor(e) {
        _defineProperty$1(this, "onChange", () => {
          if (!this.enabled)
            return;
          const e2 = this.player.elements.buttons.fullscreen;
          is.element(e2) && (e2.pressed = this.active);
          const t = this.target === this.player.media ? this.target : this.player.elements.container;
          triggerEvent.call(this.player, t, this.active ? "enterfullscreen" : "exitfullscreen", true);
        }), _defineProperty$1(this, "toggleFallback", (e2 = false) => {
          if (e2 ? this.scrollPosition = { x: window.scrollX || 0, y: window.scrollY || 0 } : window.scrollTo(this.scrollPosition.x, this.scrollPosition.y), document.body.style.overflow = e2 ? "hidden" : "", toggleClass(this.target, this.player.config.classNames.fullscreen.fallback, e2), browser.isIos) {
            let t = document.head.querySelector('meta[name="viewport"]');
            const i = "viewport-fit=cover";
            t || (t = document.createElement("meta"), t.setAttribute("name", "viewport"));
            const s = is.string(t.content) && t.content.includes(i);
            e2 ? (this.cleanupViewport = !s, s || (t.content += `,${i}`)) : this.cleanupViewport && (t.content = t.content.split(",").filter((e3) => e3.trim() !== i).join(","));
          }
          this.onChange();
        }), _defineProperty$1(this, "trapFocus", (e2) => {
          if (browser.isIos || !this.active || "Tab" !== e2.key)
            return;
          const t = document.activeElement, i = getElements.call(this.player, "a[href], button:not(:disabled), input:not(:disabled), [tabindex]"), [s] = i, n = i[i.length - 1];
          t !== n || e2.shiftKey ? t === s && e2.shiftKey && (n.focus(), e2.preventDefault()) : (s.focus(), e2.preventDefault());
        }), _defineProperty$1(this, "update", () => {
          if (this.enabled) {
            let e2;
            e2 = this.forceFallback ? "Fallback (forced)" : Fullscreen.native ? "Native" : "Fallback", this.player.debug.log(`${e2} fullscreen enabled`);
          } else
            this.player.debug.log("Fullscreen not supported and fallback disabled");
          toggleClass(this.player.elements.container, this.player.config.classNames.fullscreen.enabled, this.enabled);
        }), _defineProperty$1(this, "enter", () => {
          this.enabled && (browser.isIos && this.player.config.fullscreen.iosNative ? this.player.isVimeo ? this.player.embed.requestFullscreen() : this.target.webkitEnterFullscreen() : !Fullscreen.native || this.forceFallback ? this.toggleFallback(true) : this.prefix ? is.empty(this.prefix) || this.target[`${this.prefix}Request${this.property}`]() : this.target.requestFullscreen({ navigationUI: "hide" }));
        }), _defineProperty$1(this, "exit", () => {
          if (this.enabled)
            if (browser.isIos && this.player.config.fullscreen.iosNative)
              this.target.webkitExitFullscreen(), silencePromise(this.player.play());
            else if (!Fullscreen.native || this.forceFallback)
              this.toggleFallback(false);
            else if (this.prefix) {
              if (!is.empty(this.prefix)) {
                const e2 = "moz" === this.prefix ? "Cancel" : "Exit";
                document[`${this.prefix}${e2}${this.property}`]();
              }
            } else
              (document.cancelFullScreen || document.exitFullscreen).call(document);
        }), _defineProperty$1(this, "toggle", () => {
          this.active ? this.exit() : this.enter();
        }), this.player = e, this.prefix = Fullscreen.prefix, this.property = Fullscreen.property, this.scrollPosition = { x: 0, y: 0 }, this.forceFallback = "force" === e.config.fullscreen.fallback, this.player.elements.fullscreen = e.config.fullscreen.container && closest$1(this.player.elements.container, e.config.fullscreen.container), on.call(this.player, document, "ms" === this.prefix ? "MSFullscreenChange" : `${this.prefix}fullscreenchange`, () => {
          this.onChange();
        }), on.call(this.player, this.player.elements.container, "dblclick", (e2) => {
          is.element(this.player.elements.controls) && this.player.elements.controls.contains(e2.target) || this.player.listeners.proxy(e2, this.toggle, "fullscreen");
        }), on.call(this, this.player.elements.container, "keydown", (e2) => this.trapFocus(e2)), this.update();
      }
      static get native() {
        return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled);
      }
      get usingNative() {
        return Fullscreen.native && !this.forceFallback;
      }
      static get prefix() {
        if (is.function(document.exitFullscreen))
          return "";
        let e = "";
        return ["webkit", "moz", "ms"].some((t) => !(!is.function(document[`${t}ExitFullscreen`]) && !is.function(document[`${t}CancelFullScreen`])) && (e = t, true)), e;
      }
      static get property() {
        return "moz" === this.prefix ? "FullScreen" : "Fullscreen";
      }
      get enabled() {
        return (Fullscreen.native || this.player.config.fullscreen.fallback) && this.player.config.fullscreen.enabled && this.player.supported.ui && this.player.isVideo;
      }
      get active() {
        if (!this.enabled)
          return false;
        if (!Fullscreen.native || this.forceFallback)
          return hasClass(this.target, this.player.config.classNames.fullscreen.fallback);
        const e = this.prefix ? this.target.getRootNode()[`${this.prefix}${this.property}Element`] : this.target.getRootNode().fullscreenElement;
        return e && e.shadowRoot ? e === this.target.getRootNode().host : e === this.target;
      }
      get target() {
        return browser.isIos && this.player.config.fullscreen.iosNative ? this.player.media : this.player.elements.fullscreen || this.player.elements.container;
      }
    }
    function loadImage(e, t = 1) {
      return new Promise((i, s) => {
        const n = new Image(), r = () => {
          delete n.onload, delete n.onerror, (n.naturalWidth >= t ? i : s)(n);
        };
        Object.assign(n, { onload: r, onerror: r, src: e });
      });
    }
    const ui = {
      addStyleHook() {
        toggleClass(this.elements.container, this.config.selectors.container.replace(".", ""), true), toggleClass(this.elements.container, this.config.classNames.uiSupported, this.supported.ui);
      }, toggleNativeControls(e = false) {
        e && this.isHTML5 ? this.media.setAttribute("controls", "") : this.media.removeAttribute("controls");
      }, build() {
        if (this.listeners.media(), !this.supported.ui)
          return this.debug.warn(`Basic support only for ${this.provider} ${this.type}`), void ui.toggleNativeControls.call(this, true);
        is.element(this.elements.controls) || (controls.inject.call(this), this.listeners.controls()), ui.toggleNativeControls.call(this), this.isHTML5 && captions.setup.call(this), this.volume = null, this.muted = null, this.loop = null, this.quality = null, this.speed = null, controls.updateVolume.call(this), controls.timeUpdate.call(this), controls.durationUpdate.call(this), ui.checkPlaying.call(this), toggleClass(this.elements.container, this.config.classNames.pip.supported, support.pip && this.isHTML5 && this.isVideo), toggleClass(this.elements.container, this.config.classNames.airplay.supported, support.airplay && this.isHTML5), toggleClass(this.elements.container, this.config.classNames.isIos, browser.isIos), toggleClass(this.elements.container, this.config.classNames.isTouch, this.touch), this.ready = true, setTimeout(() => {
          triggerEvent.call(this, this.media, "ready");
        }, 0), ui.setTitle.call(this), this.poster && ui.setPoster.call(this, this.poster, false).catch(() => {
        }), this.config.duration && controls.durationUpdate.call(this), this.config.mediaMetadata && controls.setMediaMetadata.call(this);
      }, setTitle() {
        let e = i18n.get("play", this.config);
        if (is.string(this.config.title) && !is.empty(this.config.title) && (e += `, ${this.config.title}`), Array.from(this.elements.buttons.play || []).forEach((t) => {
          t.setAttribute("aria-label", e);
        }), this.isEmbed) {
          const e2 = getElement.call(this, "iframe");
          if (!is.element(e2))
            return;
          const t = is.empty(this.config.title) ? "video" : this.config.title, i = i18n.get("frameTitle", this.config);
          e2.setAttribute("title", i.replace("{title}", t));
        }
      }, togglePoster(e) {
        toggleClass(this.elements.container, this.config.classNames.posterEnabled, e);
      }, setPoster(e, t = true) {
        return t && this.poster ? Promise.reject(new Error("Poster already set")) : (this.media.setAttribute("data-poster", e), this.elements.poster.removeAttribute("hidden"), ready.call(this).then(() => loadImage(e)).catch((t2) => {
          throw e === this.poster && ui.togglePoster.call(this, false), t2;
        }).then(() => {
          if (e !== this.poster)
            throw new Error("setPoster cancelled by later call to setPoster");
        }).then(() => (Object.assign(this.elements.poster.style, { backgroundImage: `url('${e}')`, backgroundSize: "" }), ui.togglePoster.call(this, true), e)));
      }, checkPlaying(e) {
        toggleClass(this.elements.container, this.config.classNames.playing, this.playing), toggleClass(this.elements.container, this.config.classNames.paused, this.paused), toggleClass(this.elements.container, this.config.classNames.stopped, this.stopped), Array.from(this.elements.buttons.play || []).forEach((e2) => {
          Object.assign(e2, { pressed: this.playing }), e2.setAttribute("aria-label", i18n.get(this.playing ? "pause" : "play", this.config));
        }), is.event(e) && "timeupdate" === e.type || ui.toggleControls.call(this);
      }, checkLoading(e) {
        this.loading = ["stalled", "waiting"].includes(e.type), clearTimeout(this.timers.loading), this.timers.loading = setTimeout(() => {
          toggleClass(this.elements.container, this.config.classNames.loading, this.loading), ui.toggleControls.call(this);
        }, this.loading ? 250 : 0);
      }, toggleControls(e) {
        const { controls: t } = this.elements;
        if (t && this.config.hideControls) {
          const i = this.touch && this.lastSeekTime + 2e3 > Date.now();
          this.toggleControls(Boolean(e || this.loading || this.paused || t.pressed || t.hover || i));
        }
      }, migrateStyles() {
        Object.values({ ...this.media.style }).filter((e) => !is.empty(e) && is.string(e) && e.startsWith("--plyr")).forEach((e) => {
          this.elements.container.style.setProperty(e, this.media.style.getPropertyValue(e)), this.media.style.removeProperty(e);
        }), is.empty(this.media.style) && this.media.removeAttribute("style");
      }
    };
    class Listeners {
      constructor(e) {
        _defineProperty$1(this, "firstTouch", () => {
          const { player: e2 } = this, { elements: t } = e2;
          e2.touch = true, toggleClass(t.container, e2.config.classNames.isTouch, true);
        }), _defineProperty$1(this, "setTabFocus", (e2) => {
          const { player: t } = this, { elements: i } = t, { key: s, type: n, timeStamp: r } = e2;
          if (clearTimeout(this.focusTimer), "keydown" === n && "Tab" !== s)
            return;
          "keydown" === n && (this.lastKeyDown = r);
          const a = r - this.lastKeyDown <= 20;
          ("focus" !== n || a) && ((() => {
            const e3 = t.config.classNames.tabFocus;
            toggleClass(getElements.call(t, `.${e3}`), e3, false);
          })(), "focusout" !== n && (this.focusTimer = setTimeout(() => {
            const e3 = document.activeElement;
            i.container.contains(e3) && toggleClass(document.activeElement, t.config.classNames.tabFocus, true);
          }, 10)));
        }), _defineProperty$1(this, "global", (e2 = true) => {
          const { player: t } = this;
          t.config.keyboard.global && toggleListener.call(t, window, "keydown keyup", this.handleKey, e2, false), toggleListener.call(t, document.body, "click", this.toggleMenu, e2), once.call(t, document.body, "touchstart", this.firstTouch), toggleListener.call(t, document.body, "keydown focus blur focusout", this.setTabFocus, e2, false, true);
        }), _defineProperty$1(this, "container", () => {
          const { player: e2 } = this, { config: t, elements: i, timers: s } = e2;
          !t.keyboard.global && t.keyboard.focused && on.call(e2, i.container, "keydown keyup", this.handleKey, false), on.call(e2, i.container, "mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen", (t2) => {
            const { controls: n2 } = i;
            n2 && "enterfullscreen" === t2.type && (n2.pressed = false, n2.hover = false);
            let r2 = 0;
            ["touchstart", "touchmove", "mousemove"].includes(t2.type) && (ui.toggleControls.call(e2, true), r2 = e2.touch ? 3e3 : 2e3), clearTimeout(s.controls), s.controls = setTimeout(() => ui.toggleControls.call(e2, false), r2);
          });
          const n = () => {
            if (!e2.isVimeo || e2.config.vimeo.premium)
              return;
            const t2 = i.wrapper, { active: s2 } = e2.fullscreen, [n2, r2] = getAspectRatio.call(e2), a = supportsCSS(`aspect-ratio: ${n2} / ${r2}`);
            if (!s2)
              return void (a ? (t2.style.width = null, t2.style.height = null) : (t2.style.maxWidth = null, t2.style.margin = null));
            const [o, l] = getViewportSize(), c = o / l > n2 / r2;
            a ? (t2.style.width = c ? "auto" : "100%", t2.style.height = c ? "100%" : "auto") : (t2.style.maxWidth = c ? l / r2 * n2 + "px" : null, t2.style.margin = c ? "0 auto" : null);
          }, r = () => {
            clearTimeout(s.resized), s.resized = setTimeout(n, 50);
          };
          on.call(e2, i.container, "enterfullscreen exitfullscreen", (t2) => {
            const { target: s2 } = e2.fullscreen;
            if (s2 !== i.container)
              return;
            if (!e2.isEmbed && is.empty(e2.config.ratio))
              return;
            n();
            ("enterfullscreen" === t2.type ? on : off).call(e2, window, "resize", r);
          });
        }), _defineProperty$1(this, "media", () => {
          const { player: e2 } = this, { elements: t } = e2;
          if (on.call(e2, e2.media, "timeupdate seeking seeked", (t2) => controls.timeUpdate.call(e2, t2)), on.call(e2, e2.media, "durationchange loadeddata loadedmetadata", (t2) => controls.durationUpdate.call(e2, t2)), on.call(e2, e2.media, "ended", () => {
            e2.isHTML5 && e2.isVideo && e2.config.resetOnEnd && (e2.restart(), e2.pause());
          }), on.call(e2, e2.media, "progress playing seeking seeked", (t2) => controls.updateProgress.call(e2, t2)), on.call(e2, e2.media, "volumechange", (t2) => controls.updateVolume.call(e2, t2)), on.call(e2, e2.media, "playing play pause ended emptied timeupdate", (t2) => ui.checkPlaying.call(e2, t2)), on.call(e2, e2.media, "waiting canplay seeked playing", (t2) => ui.checkLoading.call(e2, t2)), e2.supported.ui && e2.config.clickToPlay && !e2.isAudio) {
            const i2 = getElement.call(e2, `.${e2.config.classNames.video}`);
            if (!is.element(i2))
              return;
            on.call(e2, t.container, "click", (s) => {
              ([t.container, i2].includes(s.target) || i2.contains(s.target)) && (e2.touch && e2.config.hideControls || (e2.ended ? (this.proxy(s, e2.restart, "restart"), this.proxy(s, () => {
                silencePromise(e2.play());
              }, "play")) : this.proxy(s, () => {
                silencePromise(e2.togglePlay());
              }, "play")));
            });
          }
          e2.supported.ui && e2.config.disableContextMenu && on.call(e2, t.wrapper, "contextmenu", (e3) => {
            e3.preventDefault();
          }, false), on.call(e2, e2.media, "volumechange", () => {
            e2.storage.set({ volume: e2.volume, muted: e2.muted });
          }), on.call(e2, e2.media, "ratechange", () => {
            controls.updateSetting.call(e2, "speed"), e2.storage.set({ speed: e2.speed });
          }), on.call(e2, e2.media, "qualitychange", (t2) => {
            controls.updateSetting.call(e2, "quality", null, t2.detail.quality);
          }), on.call(e2, e2.media, "ready qualitychange", () => {
            controls.setDownloadUrl.call(e2);
          });
          const i = e2.config.events.concat(["keyup", "keydown"]).join(" ");
          on.call(e2, e2.media, i, (i2) => {
            let { detail: s = {} } = i2;
            "error" === i2.type && (s = e2.media.error), triggerEvent.call(e2, t.container, i2.type, true, s);
          });
        }), _defineProperty$1(this, "proxy", (e2, t, i) => {
          const { player: s } = this, n = s.config.listeners[i];
          let r = true;
          is.function(n) && (r = n.call(s, e2)), false !== r && is.function(t) && t.call(s, e2);
        }), _defineProperty$1(this, "bind", (e2, t, i, s, n = true) => {
          const { player: r } = this, a = r.config.listeners[s], o = is.function(a);
          on.call(r, e2, t, (e3) => this.proxy(e3, i, s), n && !o);
        }), _defineProperty$1(this, "controls", () => {
          const { player: e2 } = this, { elements: t } = e2, i = browser.isIE ? "change" : "input";
          if (t.buttons.play && Array.from(t.buttons.play).forEach((t2) => {
            this.bind(t2, "click", () => {
              silencePromise(e2.togglePlay());
            }, "play");
          }), this.bind(t.buttons.restart, "click", e2.restart, "restart"), this.bind(t.buttons.rewind, "click", () => {
            e2.lastSeekTime = Date.now(), e2.rewind();
          }, "rewind"), this.bind(t.buttons.fastForward, "click", () => {
            e2.lastSeekTime = Date.now(), e2.forward();
          }, "fastForward"), this.bind(t.buttons.mute, "click", () => {
            e2.muted = !e2.muted;
          }, "mute"), this.bind(t.buttons.captions, "click", () => e2.toggleCaptions()), this.bind(t.buttons.download, "click", () => {
            triggerEvent.call(e2, e2.media, "download");
          }, "download"), this.bind(t.buttons.fullscreen, "click", () => {
            e2.fullscreen.toggle();
          }, "fullscreen"), this.bind(t.buttons.pip, "click", () => {
            e2.pip = "toggle";
          }, "pip"), this.bind(t.buttons.airplay, "click", e2.airplay, "airplay"), this.bind(t.buttons.settings, "click", (t2) => {
            t2.stopPropagation(), t2.preventDefault(), controls.toggleMenu.call(e2, t2);
          }, null, false), this.bind(t.buttons.settings, "keyup", (t2) => {
            ["Space", "Enter"].includes(t2.key) && ("Enter" !== t2.key ? (t2.preventDefault(), t2.stopPropagation(), controls.toggleMenu.call(e2, t2)) : controls.focusFirstMenuItem.call(e2, null, true));
          }, null, false), this.bind(t.settings.menu, "keydown", (t2) => {
            "Escape" === t2.key && controls.toggleMenu.call(e2, t2);
          }), this.bind(t.inputs.seek, "mousedown mousemove", (e3) => {
            const i2 = t.progress.getBoundingClientRect(), s = 100 / i2.width * (e3.pageX - i2.left);
            e3.currentTarget.setAttribute("seek-value", s);
          }), this.bind(t.inputs.seek, "mousedown mouseup keydown keyup touchstart touchend", (t2) => {
            const i2 = t2.currentTarget, s = "play-on-seeked";
            if (is.keyboardEvent(t2) && !["ArrowLeft", "ArrowRight"].includes(t2.key))
              return;
            e2.lastSeekTime = Date.now();
            const n = i2.hasAttribute(s), r = ["mouseup", "touchend", "keyup"].includes(t2.type);
            n && r ? (i2.removeAttribute(s), silencePromise(e2.play())) : !r && e2.playing && (i2.setAttribute(s, ""), e2.pause());
          }), browser.isIos) {
            const t2 = getElements.call(e2, 'input[type="range"]');
            Array.from(t2).forEach((e3) => this.bind(e3, i, (e4) => repaint(e4.target)));
          }
          this.bind(t.inputs.seek, i, (t2) => {
            const i2 = t2.currentTarget;
            let s = i2.getAttribute("seek-value");
            is.empty(s) && (s = i2.value), i2.removeAttribute("seek-value"), e2.currentTime = s / i2.max * e2.duration;
          }, "seek"), this.bind(t.progress, "mouseenter mouseleave mousemove", (t2) => controls.updateSeekTooltip.call(e2, t2)), this.bind(t.progress, "mousemove touchmove", (t2) => {
            const { previewThumbnails: i2 } = e2;
            i2 && i2.loaded && i2.startMove(t2);
          }), this.bind(t.progress, "mouseleave touchend click", () => {
            const { previewThumbnails: t2 } = e2;
            t2 && t2.loaded && t2.endMove(false, true);
          }), this.bind(t.progress, "mousedown touchstart", (t2) => {
            const { previewThumbnails: i2 } = e2;
            i2 && i2.loaded && i2.startScrubbing(t2);
          }), this.bind(t.progress, "mouseup touchend", (t2) => {
            const { previewThumbnails: i2 } = e2;
            i2 && i2.loaded && i2.endScrubbing(t2);
          }), browser.isWebkit && Array.from(getElements.call(e2, 'input[type="range"]')).forEach((t2) => {
            this.bind(t2, "input", (t3) => controls.updateRangeFill.call(e2, t3.target));
          }), e2.config.toggleInvert && !is.element(t.display.duration) && this.bind(t.display.currentTime, "click", () => {
            0 !== e2.currentTime && (e2.config.invertTime = !e2.config.invertTime, controls.timeUpdate.call(e2));
          }), this.bind(t.inputs.volume, i, (t2) => {
            e2.volume = t2.target.value;
          }, "volume"), this.bind(t.controls, "mouseenter mouseleave", (i2) => {
            t.controls.hover = !e2.touch && "mouseenter" === i2.type;
          }), t.fullscreen && Array.from(t.fullscreen.children).filter((e3) => !e3.contains(t.container)).forEach((i2) => {
            this.bind(i2, "mouseenter mouseleave", (i3) => {
              t.controls && (t.controls.hover = !e2.touch && "mouseenter" === i3.type);
            });
          }), this.bind(t.controls, "mousedown mouseup touchstart touchend touchcancel", (e3) => {
            t.controls.pressed = ["mousedown", "touchstart"].includes(e3.type);
          }), this.bind(t.controls, "focusin", () => {
            const { config: i2, timers: s } = e2;
            toggleClass(t.controls, i2.classNames.noTransition, true), ui.toggleControls.call(e2, true), setTimeout(() => {
              toggleClass(t.controls, i2.classNames.noTransition, false);
            }, 0);
            const n = this.touch ? 3e3 : 4e3;
            clearTimeout(s.controls), s.controls = setTimeout(() => ui.toggleControls.call(e2, false), n);
          }), this.bind(t.inputs.volume, "wheel", (t2) => {
            const i2 = t2.webkitDirectionInvertedFromDevice, [s, n] = [t2.deltaX, -t2.deltaY].map((e3) => i2 ? -e3 : e3), r = Math.sign(Math.abs(s) > Math.abs(n) ? s : n);
            e2.increaseVolume(r / 50);
            const { volume: a } = e2.media;
            (1 === r && a < 1 || -1 === r && a > 0) && t2.preventDefault();
          }, "volume", false);
        }), this.player = e, this.lastKey = null, this.focusTimer = null, this.lastKeyDown = null, this.handleKey = this.handleKey.bind(this), this.toggleMenu = this.toggleMenu.bind(this), this.setTabFocus = this.setTabFocus.bind(this), this.firstTouch = this.firstTouch.bind(this);
      }
      handleKey(e) {
        const { player: t } = this, { elements: i } = t, { key: s, type: n, altKey: r, ctrlKey: a, metaKey: o, shiftKey: l } = e, c = "keydown" === n, u = c && s === this.lastKey;
        if (r || a || o || l)
          return;
        if (!s)
          return;
        if (c) {
          const n2 = document.activeElement;
          if (is.element(n2)) {
            const { editable: s2 } = t.config.selectors, { seek: r2 } = i.inputs;
            if (n2 !== r2 && matches(n2, s2))
              return;
            if ("Space" === e.key && matches(n2, 'button, [role^="menuitem"]'))
              return;
          }
          switch (["Space", "ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "c", "f", "k", "l", "m"].includes(s) && (e.preventDefault(), e.stopPropagation()), s) {
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
              u || (d = parseInt(s, 10), t.currentTime = t.duration / 10 * d);
              break;
            case "Space":
            case "k":
              u || silencePromise(t.togglePlay());
              break;
            case "ArrowUp":
              t.increaseVolume(0.1);
              break;
            case "ArrowDown":
              t.decreaseVolume(0.1);
              break;
            case "m":
              u || (t.muted = !t.muted);
              break;
            case "ArrowRight":
              t.forward();
              break;
            case "ArrowLeft":
              t.rewind();
              break;
            case "f":
              t.fullscreen.toggle();
              break;
            case "c":
              u || t.toggleCaptions();
              break;
            case "l":
              t.loop = !t.loop;
          }
          "Escape" === s && !t.fullscreen.usingNative && t.fullscreen.active && t.fullscreen.toggle(), this.lastKey = s;
        } else
          this.lastKey = null;
        var d;
      }
      toggleMenu(e) {
        controls.toggleMenu.call(this.player, e);
      }
    }
    function createCommonjsModule(e, t) {
      return e(t = { exports: {} }, t.exports), t.exports;
    }
    var loadjs_umd = createCommonjsModule(function (e, t) {
      e.exports = function () {
        var e2 = function () {
        }, t2 = {}, i = {}, s = {};
        function n(e3, t3) {
          e3 = e3.push ? e3 : [e3];
          var n2, r2, a2, o2 = [], l2 = e3.length, c2 = l2;
          for (n2 = function (e4, i2) {
            i2.length && o2.push(e4), --c2 || t3(o2);
          }; l2--;)
            r2 = e3[l2], (a2 = i[r2]) ? n2(r2, a2) : (s[r2] = s[r2] || []).push(n2);
        }
        function r(e3, t3) {
          if (e3) {
            var n2 = s[e3];
            if (i[e3] = t3, n2)
              for (; n2.length;)
                n2[0](e3, t3), n2.splice(0, 1);
          }
        }
        function a(t3, i2) {
          t3.call && (t3 = { success: t3 }), i2.length ? (t3.error || e2)(i2) : (t3.success || e2)(t3);
        }
        function o(t3, i2, s2, n2) {
          var r2, a2, l2 = document, c2 = s2.async, u = (s2.numRetries || 0) + 1, d = s2.before || e2, h = t3.replace(/[\?|#].*$/, ""), m = t3.replace(/^(css|img)!/, "");
          n2 = n2 || 0, /(^css!|\.css$)/.test(h) ? ((a2 = l2.createElement("link")).rel = "stylesheet", a2.href = m, (r2 = "hideFocus" in a2) && a2.relList && (r2 = 0, a2.rel = "preload", a2.as = "style")) : /(^img!|\.(png|gif|jpg|svg|webp)$)/.test(h) ? (a2 = l2.createElement("img")).src = m : ((a2 = l2.createElement("script")).src = t3, a2.async = void 0 === c2 || c2), a2.onload = a2.onerror = a2.onbeforeload = function (e3) {
            var l3 = e3.type[0];
            if (r2)
              try {
                a2.sheet.cssText.length || (l3 = "e");
              } catch (e4) {
                18 != e4.code && (l3 = "e");
              }
            if ("e" == l3) {
              if ((n2 += 1) < u)
                return o(t3, i2, s2, n2);
            } else if ("preload" == a2.rel && "style" == a2.as)
              return a2.rel = "stylesheet";
            i2(t3, l3, e3.defaultPrevented);
          }, false !== d(t3, a2) && l2.head.appendChild(a2);
        }
        function l(e3, t3, i2) {
          var s2, n2, r2 = (e3 = e3.push ? e3 : [e3]).length, a2 = r2, l2 = [];
          for (s2 = function (e4, i3, s3) {
            if ("e" == i3 && l2.push(e4), "b" == i3) {
              if (!s3)
                return;
              l2.push(e4);
            }
            --r2 || t3(l2);
          }, n2 = 0; n2 < a2; n2++)
            o(e3[n2], s2, i2);
        }
        function c(e3, i2, s2) {
          var n2, o2;
          if (i2 && i2.trim && (n2 = i2), o2 = (n2 ? s2 : i2) || {}, n2) {
            if (n2 in t2)
              throw "LoadJS";
            t2[n2] = true;
          }
          function c2(t3, i3) {
            l(e3, function (e4) {
              a(o2, e4), t3 && a({ success: t3, error: i3 }, e4), r(n2, e4);
            }, o2);
          }
          if (o2.returnPromise)
            return new Promise(c2);
          c2();
        }
        return c.ready = function (e3, t3) {
          return n(e3, function (e4) {
            a(t3, e4);
          }), c;
        }, c.done = function (e3) {
          r(e3, []);
        }, c.reset = function () {
          t2 = {}, i = {}, s = {};
        }, c.isDefined = function (e3) {
          return e3 in t2;
        }, c;
      }();
    });
    function loadScript(e) {
      return new Promise((t, i) => {
        loadjs_umd(e, { success: t, error: i });
      });
    }
    function parseId$1(e) {
      if (is.empty(e))
        return null;
      if (is.number(Number(e)))
        return e;
      return e.match(/^.*(vimeo.com\/|video\/)(\d+).*/) ? RegExp.$2 : e;
    }
    function parseHash(e) {
      const t = e.match(/^.*(vimeo.com\/|video\/)(\d+)(\?.*&*h=|\/)+([\d,a-f]+)/);
      return t && 5 === t.length ? t[4] : null;
    }
    function assurePlaybackState$1(e) {
      e && !this.embed.hasPlayed && (this.embed.hasPlayed = true), this.media.paused === e && (this.media.paused = !e, triggerEvent.call(this, this.media, e ? "play" : "pause"));
    }
    const vimeo = {
      setup() {
        const e = this;
        toggleClass(e.elements.wrapper, e.config.classNames.embed, true), e.options.speed = e.config.speed.options, setAspectRatio.call(e), is.object(window.Vimeo) ? vimeo.ready.call(e) : loadScript(e.config.urls.vimeo.sdk).then(() => {
          vimeo.ready.call(e);
        }).catch((t) => {
          e.debug.warn("Vimeo SDK (player.js) failed to load", t);
        });
      }, ready() {
        const e = this, t = e.config.vimeo, { premium: i, referrerPolicy: s, ...n } = t;
        let r = e.media.getAttribute("src"), a = "";
        is.empty(r) ? (r = e.media.getAttribute(e.config.attributes.embed.id), a = e.media.getAttribute(e.config.attributes.embed.hash)) : a = parseHash(r);
        const o = a ? { h: a } : {};
        i && Object.assign(n, { controls: false, sidedock: false });
        const l = buildUrlParams({ loop: e.config.loop.active, autoplay: e.autoplay, muted: e.muted, gesture: "media", playsinline: !this.config.fullscreen.iosNative, ...o, ...n }), c = parseId$1(r), u = createElement("iframe"), d = format(e.config.urls.vimeo.iframe, c, l);
        if (u.setAttribute("src", d), u.setAttribute("allowfullscreen", ""), u.setAttribute("allow", ["autoplay", "fullscreen", "picture-in-picture", "encrypted-media", "accelerometer", "gyroscope"].join("; ")), is.empty(s) || u.setAttribute("referrerPolicy", s), i || !t.customControls)
          u.setAttribute("data-poster", e.poster), e.media = replaceElement(u, e.media);
        else {
          const t2 = createElement("div", { class: e.config.classNames.embedContainer, "data-poster": e.poster });
          t2.appendChild(u), e.media = replaceElement(t2, e.media);
        }
        t.customControls || fetch$1(format(e.config.urls.vimeo.api, d)).then((t2) => {
          !is.empty(t2) && t2.thumbnail_url && ui.setPoster.call(e, t2.thumbnail_url).catch(() => {
          });
        }), e.embed = new window.Vimeo.Player(u, { autopause: e.config.autopause, muted: e.muted }), e.media.paused = true, e.media.currentTime = 0, e.supported.ui && e.embed.disableTextTrack(), e.media.play = () => (assurePlaybackState$1.call(e, true), e.embed.play()), e.media.pause = () => (assurePlaybackState$1.call(e, false), e.embed.pause()), e.media.stop = () => {
          e.pause(), e.currentTime = 0;
        };
        let { currentTime: h } = e.media;
        Object.defineProperty(e.media, "currentTime", {
          get: () => h, set(t2) {
            const { embed: i2, media: s2, paused: n2, volume: r2 } = e, a2 = n2 && !i2.hasPlayed;
            s2.seeking = true, triggerEvent.call(e, s2, "seeking"), Promise.resolve(a2 && i2.setVolume(0)).then(() => i2.setCurrentTime(t2)).then(() => a2 && i2.pause()).then(() => a2 && i2.setVolume(r2)).catch(() => {
            });
          }
        });
        let m = e.config.speed.selected;
        Object.defineProperty(e.media, "playbackRate", {
          get: () => m, set(t2) {
            e.embed.setPlaybackRate(t2).then(() => {
              m = t2, triggerEvent.call(e, e.media, "ratechange");
            }).catch(() => {
              e.options.speed = [1];
            });
          }
        });
        let { volume: p } = e.config;
        Object.defineProperty(e.media, "volume", {
          get: () => p, set(t2) {
            e.embed.setVolume(t2).then(() => {
              p = t2, triggerEvent.call(e, e.media, "volumechange");
            });
          }
        });
        let { muted: g } = e.config;
        Object.defineProperty(e.media, "muted", {
          get: () => g, set(t2) {
            const i2 = !!is.boolean(t2) && t2;
            e.embed.setVolume(i2 ? 0 : e.config.volume).then(() => {
              g = i2, triggerEvent.call(e, e.media, "volumechange");
            });
          }
        });
        let f, { loop: y } = e.config;
        Object.defineProperty(e.media, "loop", {
          get: () => y, set(t2) {
            const i2 = is.boolean(t2) ? t2 : e.config.loop.active;
            e.embed.setLoop(i2).then(() => {
              y = i2;
            });
          }
        }), e.embed.getVideoUrl().then((t2) => {
          f = t2, controls.setDownloadUrl.call(e);
        }).catch((e2) => {
          this.debug.warn(e2);
        }), Object.defineProperty(e.media, "currentSrc", { get: () => f }), Object.defineProperty(e.media, "ended", { get: () => e.currentTime === e.duration }), Promise.all([e.embed.getVideoWidth(), e.embed.getVideoHeight()]).then((t2) => {
          const [i2, s2] = t2;
          e.embed.ratio = roundAspectRatio(i2, s2), setAspectRatio.call(this);
        }), e.embed.setAutopause(e.config.autopause).then((t2) => {
          e.config.autopause = t2;
        }), e.embed.getVideoTitle().then((t2) => {
          e.config.title = t2, ui.setTitle.call(this);
        }), e.embed.getCurrentTime().then((t2) => {
          h = t2, triggerEvent.call(e, e.media, "timeupdate");
        }), e.embed.getDuration().then((t2) => {
          e.media.duration = t2, triggerEvent.call(e, e.media, "durationchange");
        }), e.embed.getTextTracks().then((t2) => {
          e.media.textTracks = t2, captions.setup.call(e);
        }), e.embed.on("cuechange", ({ cues: t2 = [] }) => {
          const i2 = t2.map((e2) => stripHTML(e2.text));
          captions.updateCues.call(e, i2);
        }), e.embed.on("loaded", () => {
          if (e.embed.getPaused().then((t2) => {
            assurePlaybackState$1.call(e, !t2), t2 || triggerEvent.call(e, e.media, "playing");
          }), is.element(e.embed.element) && e.supported.ui) {
            e.embed.element.setAttribute("tabindex", -1);
          }
        }), e.embed.on("bufferstart", () => {
          triggerEvent.call(e, e.media, "waiting");
        }), e.embed.on("bufferend", () => {
          triggerEvent.call(e, e.media, "playing");
        }), e.embed.on("play", () => {
          assurePlaybackState$1.call(e, true), triggerEvent.call(e, e.media, "playing");
        }), e.embed.on("pause", () => {
          assurePlaybackState$1.call(e, false);
        }), e.embed.on("timeupdate", (t2) => {
          e.media.seeking = false, h = t2.seconds, triggerEvent.call(e, e.media, "timeupdate");
        }), e.embed.on("progress", (t2) => {
          e.media.buffered = t2.percent, triggerEvent.call(e, e.media, "progress"), 1 === parseInt(t2.percent, 10) && triggerEvent.call(e, e.media, "canplaythrough"), e.embed.getDuration().then((t3) => {
            t3 !== e.media.duration && (e.media.duration = t3, triggerEvent.call(e, e.media, "durationchange"));
          });
        }), e.embed.on("seeked", () => {
          e.media.seeking = false, triggerEvent.call(e, e.media, "seeked");
        }), e.embed.on("ended", () => {
          e.media.paused = true, triggerEvent.call(e, e.media, "ended");
        }), e.embed.on("error", (t2) => {
          e.media.error = t2, triggerEvent.call(e, e.media, "error");
        }), t.customControls && setTimeout(() => ui.build.call(e), 0);
      }
    };
    function parseId(e) {
      if (is.empty(e))
        return null;
      return e.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/) ? RegExp.$2 : e;
    }
    function assurePlaybackState(e) {
      e && !this.embed.hasPlayed && (this.embed.hasPlayed = true), this.media.paused === e && (this.media.paused = !e, triggerEvent.call(this, this.media, e ? "play" : "pause"));
    }
    function getHost(e) {
      return e.noCookie ? "https://www.youtube-nocookie.com" : "http:" === window.location.protocol ? "http://www.youtube.com" : void 0;
    }
    const youtube = {
      setup() {
        if (toggleClass(this.elements.wrapper, this.config.classNames.embed, true), is.object(window.YT) && is.function(window.YT.Player))
          youtube.ready.call(this);
        else {
          const e = window.onYouTubeIframeAPIReady;
          window.onYouTubeIframeAPIReady = () => {
            is.function(e) && e(), youtube.ready.call(this);
          }, loadScript(this.config.urls.youtube.sdk).catch((e2) => {
            this.debug.warn("YouTube API failed to load", e2);
          });
        }
      }, getTitle(e) {
        fetch$1(format(this.config.urls.youtube.api, e)).then((e2) => {
          if (is.object(e2)) {
            const { title: t, height: i, width: s } = e2;
            this.config.title = t, ui.setTitle.call(this), this.embed.ratio = roundAspectRatio(s, i);
          }
          setAspectRatio.call(this);
        }).catch(() => {
          setAspectRatio.call(this);
        });
      }, ready() {
        const e = this, t = e.config.youtube, i = e.media && e.media.getAttribute("id");
        if (!is.empty(i) && i.startsWith("youtube-"))
          return;
        let s = e.media.getAttribute("src");
        is.empty(s) && (s = e.media.getAttribute(this.config.attributes.embed.id));
        const n = parseId(s), r = createElement("div", { id: generateId(e.provider), "data-poster": t.customControls ? e.poster : void 0 });
        if (e.media = replaceElement(r, e.media), t.customControls) {
          const t2 = (e2) => `https://i.ytimg.com/vi/${n}/${e2}default.jpg`;
          loadImage(t2("maxres"), 121).catch(() => loadImage(t2("sd"), 121)).catch(() => loadImage(t2("hq"))).then((t3) => ui.setPoster.call(e, t3.src)).then((t3) => {
            t3.includes("maxres") || (e.elements.poster.style.backgroundSize = "cover");
          }).catch(() => {
          });
        }
        e.embed = new window.YT.Player(e.media, {
          videoId: n, host: getHost(t), playerVars: extend({}, { autoplay: e.config.autoplay ? 1 : 0, hl: e.config.hl, controls: e.supported.ui && t.customControls ? 0 : 1, disablekb: 1, playsinline: e.config.fullscreen.iosNative ? 0 : 1, cc_load_policy: e.captions.active ? 1 : 0, cc_lang_pref: e.config.captions.language, widget_referrer: window ? window.location.href : null }, t), events: {
            onError(t2) {
              if (!e.media.error) {
                const i2 = t2.data, s2 = { 2: "The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.", 5: "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.", 100: "The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.", 101: "The owner of the requested video does not allow it to be played in embedded players.", 150: "The owner of the requested video does not allow it to be played in embedded players." }[i2] || "An unknown error occured";
                e.media.error = { code: i2, message: s2 }, triggerEvent.call(e, e.media, "error");
              }
            }, onPlaybackRateChange(t2) {
              const i2 = t2.target;
              e.media.playbackRate = i2.getPlaybackRate(), triggerEvent.call(e, e.media, "ratechange");
            }, onReady(i2) {
              if (is.function(e.media.play))
                return;
              const s2 = i2.target;
              youtube.getTitle.call(e, n), e.media.play = () => {
                assurePlaybackState.call(e, true), s2.playVideo();
              }, e.media.pause = () => {
                assurePlaybackState.call(e, false), s2.pauseVideo();
              }, e.media.stop = () => {
                s2.stopVideo();
              }, e.media.duration = s2.getDuration(), e.media.paused = true, e.media.currentTime = 0, Object.defineProperty(e.media, "currentTime", {
                get: () => Number(s2.getCurrentTime()), set(t2) {
                  e.paused && !e.embed.hasPlayed && e.embed.mute(), e.media.seeking = true, triggerEvent.call(e, e.media, "seeking"), s2.seekTo(t2);
                }
              }), Object.defineProperty(e.media, "playbackRate", {
                get: () => s2.getPlaybackRate(), set(e2) {
                  s2.setPlaybackRate(e2);
                }
              });
              let { volume: r2 } = e.config;
              Object.defineProperty(e.media, "volume", {
                get: () => r2, set(t2) {
                  r2 = t2, s2.setVolume(100 * r2), triggerEvent.call(e, e.media, "volumechange");
                }
              });
              let { muted: a } = e.config;
              Object.defineProperty(e.media, "muted", {
                get: () => a, set(t2) {
                  const i3 = is.boolean(t2) ? t2 : a;
                  a = i3, s2[i3 ? "mute" : "unMute"](), s2.setVolume(100 * r2), triggerEvent.call(e, e.media, "volumechange");
                }
              }), Object.defineProperty(e.media, "currentSrc", { get: () => s2.getVideoUrl() }), Object.defineProperty(e.media, "ended", { get: () => e.currentTime === e.duration });
              const o = s2.getAvailablePlaybackRates();
              e.options.speed = o.filter((t2) => e.config.speed.options.includes(t2)), e.supported.ui && t.customControls && e.media.setAttribute("tabindex", -1), triggerEvent.call(e, e.media, "timeupdate"), triggerEvent.call(e, e.media, "durationchange"), clearInterval(e.timers.buffering), e.timers.buffering = setInterval(() => {
                e.media.buffered = s2.getVideoLoadedFraction(), (null === e.media.lastBuffered || e.media.lastBuffered < e.media.buffered) && triggerEvent.call(e, e.media, "progress"), e.media.lastBuffered = e.media.buffered, 1 === e.media.buffered && (clearInterval(e.timers.buffering), triggerEvent.call(e, e.media, "canplaythrough"));
              }, 200), t.customControls && setTimeout(() => ui.build.call(e), 50);
            }, onStateChange(i2) {
              const s2 = i2.target;
              clearInterval(e.timers.playing);
              switch (e.media.seeking && [1, 2].includes(i2.data) && (e.media.seeking = false, triggerEvent.call(e, e.media, "seeked")), i2.data) {
                case -1:
                  triggerEvent.call(e, e.media, "timeupdate"), e.media.buffered = s2.getVideoLoadedFraction(), triggerEvent.call(e, e.media, "progress");
                  break;
                case 0:
                  assurePlaybackState.call(e, false), e.media.loop ? (s2.stopVideo(), s2.playVideo()) : triggerEvent.call(e, e.media, "ended");
                  break;
                case 1:
                  t.customControls && !e.config.autoplay && e.media.paused && !e.embed.hasPlayed ? e.media.pause() : (assurePlaybackState.call(e, true), triggerEvent.call(e, e.media, "playing"), e.timers.playing = setInterval(() => {
                    triggerEvent.call(e, e.media, "timeupdate");
                  }, 50), e.media.duration !== s2.getDuration() && (e.media.duration = s2.getDuration(), triggerEvent.call(e, e.media, "durationchange")));
                  break;
                case 2:
                  e.muted || e.embed.unMute(), assurePlaybackState.call(e, false);
                  break;
                case 3:
                  triggerEvent.call(e, e.media, "waiting");
              }
              triggerEvent.call(e, e.elements.container, "statechange", false, { code: i2.data });
            }
          }
        });
      }
    }, media = {
      setup() {
        this.media ? (toggleClass(this.elements.container, this.config.classNames.type.replace("{0}", this.type), true), toggleClass(this.elements.container, this.config.classNames.provider.replace("{0}", this.provider), true), this.isEmbed && toggleClass(this.elements.container, this.config.classNames.type.replace("{0}", "video"), true), this.isVideo && (this.elements.wrapper = createElement("div", { class: this.config.classNames.video }), wrap(this.media, this.elements.wrapper), this.elements.poster = createElement("div", { class: this.config.classNames.poster }), this.elements.wrapper.appendChild(this.elements.poster)), this.isHTML5 ? html5.setup.call(this) : this.isYouTube ? youtube.setup.call(this) : this.isVimeo && vimeo.setup.call(this)) : this.debug.warn("No media element found!");
      }
    };
    class Ads {
      constructor(e) {
        _defineProperty$1(this, "load", () => {
          this.enabled && (is.object(window.google) && is.object(window.google.ima) ? this.ready() : loadScript(this.player.config.urls.googleIMA.sdk).then(() => {
            this.ready();
          }).catch(() => {
            this.trigger("error", new Error("Google IMA SDK failed to load"));
          }));
        }), _defineProperty$1(this, "ready", () => {
          var e2;
          this.enabled || ((e2 = this).manager && e2.manager.destroy(), e2.elements.displayContainer && e2.elements.displayContainer.destroy(), e2.elements.container.remove()), this.startSafetyTimer(12e3, "ready()"), this.managerPromise.then(() => {
            this.clearSafetyTimer("onAdsManagerLoaded()");
          }), this.listeners(), this.setupIMA();
        }), _defineProperty$1(this, "setupIMA", () => {
          this.elements.container = createElement("div", { class: this.player.config.classNames.ads }), this.player.elements.container.appendChild(this.elements.container), google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED), google.ima.settings.setLocale(this.player.config.ads.language), google.ima.settings.setDisableCustomPlaybackForIOS10Plus(this.player.config.playsinline), this.elements.displayContainer = new google.ima.AdDisplayContainer(this.elements.container, this.player.media), this.loader = new google.ima.AdsLoader(this.elements.displayContainer), this.loader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, (e2) => this.onAdsManagerLoaded(e2), false), this.loader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, (e2) => this.onAdError(e2), false), this.requestAds();
        }), _defineProperty$1(this, "requestAds", () => {
          const { container: e2 } = this.player.elements;
          try {
            const t = new google.ima.AdsRequest();
            t.adTagUrl = this.tagUrl, t.linearAdSlotWidth = e2.offsetWidth, t.linearAdSlotHeight = e2.offsetHeight, t.nonLinearAdSlotWidth = e2.offsetWidth, t.nonLinearAdSlotHeight = e2.offsetHeight, t.forceNonLinearFullSlot = false, t.setAdWillPlayMuted(!this.player.muted), this.loader.requestAds(t);
          } catch (e3) {
            this.onAdError(e3);
          }
        }), _defineProperty$1(this, "pollCountdown", (e2 = false) => {
          if (!e2)
            return clearInterval(this.countdownTimer), void this.elements.container.removeAttribute("data-badge-text");
          this.countdownTimer = setInterval(() => {
            const e3 = formatTime(Math.max(this.manager.getRemainingTime(), 0)), t = `${i18n.get("advertisement", this.player.config)} - ${e3}`;
            this.elements.container.setAttribute("data-badge-text", t);
          }, 100);
        }), _defineProperty$1(this, "onAdsManagerLoaded", (e2) => {
          if (!this.enabled)
            return;
          const t = new google.ima.AdsRenderingSettings();
          t.restoreCustomPlaybackStateOnAdBreakComplete = true, t.enablePreloading = true, this.manager = e2.getAdsManager(this.player, t), this.cuePoints = this.manager.getCuePoints(), this.manager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, (e3) => this.onAdError(e3)), Object.keys(google.ima.AdEvent.Type).forEach((e3) => {
            this.manager.addEventListener(google.ima.AdEvent.Type[e3], (e4) => this.onAdEvent(e4));
          }), this.trigger("loaded");
        }), _defineProperty$1(this, "addCuePoints", () => {
          is.empty(this.cuePoints) || this.cuePoints.forEach((e2) => {
            if (0 !== e2 && -1 !== e2 && e2 < this.player.duration) {
              const t = this.player.elements.progress;
              if (is.element(t)) {
                const i = 100 / this.player.duration * e2, s = createElement("span", { class: this.player.config.classNames.cues });
                s.style.left = `${i.toString()}%`, t.appendChild(s);
              }
            }
          });
        }), _defineProperty$1(this, "onAdEvent", (e2) => {
          const { container: t } = this.player.elements, i = e2.getAd(), s = e2.getAdData();
          switch (((e3) => {
            triggerEvent.call(this.player, this.player.media, `ads${e3.replace(/_/g, "").toLowerCase()}`);
          })(e2.type), e2.type) {
            case google.ima.AdEvent.Type.LOADED:
              this.trigger("loaded"), this.pollCountdown(true), i.isLinear() || (i.width = t.offsetWidth, i.height = t.offsetHeight);
              break;
            case google.ima.AdEvent.Type.STARTED:
              this.manager.setVolume(this.player.volume);
              break;
            case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
              this.player.ended ? this.loadAds() : this.loader.contentComplete();
              break;
            case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:
              this.pauseContent();
              break;
            case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:
              this.pollCountdown(), this.resumeContent();
              break;
            case google.ima.AdEvent.Type.LOG:
              s.adError && this.player.debug.warn(`Non-fatal ad error: ${s.adError.getMessage()}`);
          }
        }), _defineProperty$1(this, "onAdError", (e2) => {
          this.cancel(), this.player.debug.warn("Ads error", e2);
        }), _defineProperty$1(this, "listeners", () => {
          const { container: e2 } = this.player.elements;
          let t;
          this.player.on("canplay", () => {
            this.addCuePoints();
          }), this.player.on("ended", () => {
            this.loader.contentComplete();
          }), this.player.on("timeupdate", () => {
            t = this.player.currentTime;
          }), this.player.on("seeked", () => {
            const e3 = this.player.currentTime;
            is.empty(this.cuePoints) || this.cuePoints.forEach((i, s) => {
              t < i && i < e3 && (this.manager.discardAdBreak(), this.cuePoints.splice(s, 1));
            });
          }), window.addEventListener("resize", () => {
            this.manager && this.manager.resize(e2.offsetWidth, e2.offsetHeight, google.ima.ViewMode.NORMAL);
          });
        }), _defineProperty$1(this, "play", () => {
          const { container: e2 } = this.player.elements;
          this.managerPromise || this.resumeContent(), this.managerPromise.then(() => {
            this.manager.setVolume(this.player.volume), this.elements.displayContainer.initialize();
            try {
              this.initialized || (this.manager.init(e2.offsetWidth, e2.offsetHeight, google.ima.ViewMode.NORMAL), this.manager.start()), this.initialized = true;
            } catch (e3) {
              this.onAdError(e3);
            }
          }).catch(() => {
          });
        }), _defineProperty$1(this, "resumeContent", () => {
          this.elements.container.style.zIndex = "", this.playing = false, silencePromise(this.player.media.play());
        }), _defineProperty$1(this, "pauseContent", () => {
          this.elements.container.style.zIndex = 3, this.playing = true, this.player.media.pause();
        }), _defineProperty$1(this, "cancel", () => {
          this.initialized && this.resumeContent(), this.trigger("error"), this.loadAds();
        }), _defineProperty$1(this, "loadAds", () => {
          this.managerPromise.then(() => {
            this.manager && this.manager.destroy(), this.managerPromise = new Promise((e2) => {
              this.on("loaded", e2), this.player.debug.log(this.manager);
            }), this.initialized = false, this.requestAds();
          }).catch(() => {
          });
        }), _defineProperty$1(this, "trigger", (e2, ...t) => {
          const i = this.events[e2];
          is.array(i) && i.forEach((e3) => {
            is.function(e3) && e3.apply(this, t);
          });
        }), _defineProperty$1(this, "on", (e2, t) => (is.array(this.events[e2]) || (this.events[e2] = []), this.events[e2].push(t), this)), _defineProperty$1(this, "startSafetyTimer", (e2, t) => {
          this.player.debug.log(`Safety timer invoked from: ${t}`), this.safetyTimer = setTimeout(() => {
            this.cancel(), this.clearSafetyTimer("startSafetyTimer()");
          }, e2);
        }), _defineProperty$1(this, "clearSafetyTimer", (e2) => {
          is.nullOrUndefined(this.safetyTimer) || (this.player.debug.log(`Safety timer cleared from: ${e2}`), clearTimeout(this.safetyTimer), this.safetyTimer = null);
        }), this.player = e, this.config = e.config.ads, this.playing = false, this.initialized = false, this.elements = { container: null, displayContainer: null }, this.manager = null, this.loader = null, this.cuePoints = null, this.events = {}, this.safetyTimer = null, this.countdownTimer = null, this.managerPromise = new Promise((e2, t) => {
          this.on("loaded", e2), this.on("error", t);
        }), this.load();
      }
      get enabled() {
        const { config: e } = this;
        return this.player.isHTML5 && this.player.isVideo && e.enabled && (!is.empty(e.publisherId) || is.url(e.tagUrl));
      }
      get tagUrl() {
        const { config: e } = this;
        if (is.url(e.tagUrl))
          return e.tagUrl;
        return `https://go.aniview.com/api/adserver6/vast/?${buildUrlParams({ AV_PUBLISHERID: "58c25bb0073ef448b1087ad6", AV_CHANNELID: "5a0458dc28a06145e4519d21", AV_URL: window.location.hostname, cb: Date.now(), AV_WIDTH: 640, AV_HEIGHT: 480, AV_CDIM2: e.publisherId })}`;
      }
    }
    function clamp(e = 0, t = 0, i = 255) {
      return Math.min(Math.max(e, t), i);
    }
    const parseVtt = (e) => {
      const t = [];
      return e.split(/\r\n\r\n|\n\n|\r\r/).forEach((e2) => {
        const i = {};
        e2.split(/\r\n|\n|\r/).forEach((e3) => {
          if (is.number(i.startTime)) {
            if (!is.empty(e3.trim()) && is.empty(i.text)) {
              const t2 = e3.trim().split("#xywh=");
              [i.text] = t2, t2[1] && ([i.x, i.y, i.w, i.h] = t2[1].split(","));
            }
          } else {
            const t2 = e3.match(/([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})( ?--> ?)([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})/);
            t2 && (i.startTime = 60 * Number(t2[1] || 0) * 60 + 60 * Number(t2[2]) + Number(t2[3]) + Number(`0.${t2[4]}`), i.endTime = 60 * Number(t2[6] || 0) * 60 + 60 * Number(t2[7]) + Number(t2[8]) + Number(`0.${t2[9]}`));
          }
        }), i.text && t.push(i);
      }), t;
    }, fitRatio = (e, t) => {
      const i = {};
      return e > t.width / t.height ? (i.width = t.width, i.height = 1 / e * t.width) : (i.height = t.height, i.width = e * t.height), i;
    };
    class PreviewThumbnails {
      constructor(e) {
        _defineProperty$1(this, "load", () => {
          this.player.elements.display.seekTooltip && (this.player.elements.display.seekTooltip.hidden = this.enabled), this.enabled && this.getThumbnails().then(() => {
            this.enabled && (this.render(), this.determineContainerAutoSizing(), this.loaded = true);
          });
        }), _defineProperty$1(this, "getThumbnails", () => new Promise((e2) => {
          const { src: t } = this.player.config.previewThumbnails;
          if (is.empty(t))
            throw new Error("Missing previewThumbnails.src config attribute");
          const i = () => {
            this.thumbnails.sort((e3, t2) => e3.height - t2.height), this.player.debug.log("Preview thumbnails", this.thumbnails), e2();
          };
          if (is.function(t))
            t((e3) => {
              this.thumbnails = e3, i();
            });
          else {
            const e3 = (is.string(t) ? [t] : t).map((e4) => this.getThumbnail(e4));
            Promise.all(e3).then(i);
          }
        })), _defineProperty$1(this, "getThumbnail", (e2) => new Promise((t) => {
          fetch$1(e2).then((i) => {
            const s = { frames: parseVtt(i), height: null, urlPrefix: "" };
            s.frames[0].text.startsWith("/") || s.frames[0].text.startsWith("http://") || s.frames[0].text.startsWith("https://") || (s.urlPrefix = e2.substring(0, e2.lastIndexOf("/") + 1));
            const n = new Image();
            n.onload = () => {
              s.height = n.naturalHeight, s.width = n.naturalWidth, this.thumbnails.push(s), t();
            }, n.src = s.urlPrefix + s.frames[0].text;
          });
        })), _defineProperty$1(this, "startMove", (e2) => {
          if (this.loaded && is.event(e2) && ["touchmove", "mousemove"].includes(e2.type) && this.player.media.duration) {
            if ("touchmove" === e2.type)
              this.seekTime = this.player.media.duration * (this.player.elements.inputs.seek.value / 100);
            else {
              var t, i;
              const s = this.player.elements.progress.getBoundingClientRect(), n = 100 / s.width * (e2.pageX - s.left);
              this.seekTime = this.player.media.duration * (n / 100), this.seekTime < 0 && (this.seekTime = 0), this.seekTime > this.player.media.duration - 1 && (this.seekTime = this.player.media.duration - 1), this.mousePosX = e2.pageX, this.elements.thumb.time.innerText = formatTime(this.seekTime);
              const r = null === (t = this.player.config.markers) || void 0 === t || null === (i = t.points) || void 0 === i ? void 0 : i.find(({ time: e3 }) => e3 === Math.round(this.seekTime));
              r && this.elements.thumb.time.insertAdjacentHTML("afterbegin", `${r.label}<br>`);
            }
            this.showImageAtCurrentTime();
          }
        }), _defineProperty$1(this, "endMove", () => {
          this.toggleThumbContainer(false, true);
        }), _defineProperty$1(this, "startScrubbing", (e2) => {
          (is.nullOrUndefined(e2.button) || false === e2.button || 0 === e2.button) && (this.mouseDown = true, this.player.media.duration && (this.toggleScrubbingContainer(true), this.toggleThumbContainer(false, true), this.showImageAtCurrentTime()));
        }), _defineProperty$1(this, "endScrubbing", () => {
          this.mouseDown = false, Math.ceil(this.lastTime) === Math.ceil(this.player.media.currentTime) ? this.toggleScrubbingContainer(false) : once.call(this.player, this.player.media, "timeupdate", () => {
            this.mouseDown || this.toggleScrubbingContainer(false);
          });
        }), _defineProperty$1(this, "listeners", () => {
          this.player.on("play", () => {
            this.toggleThumbContainer(false, true);
          }), this.player.on("seeked", () => {
            this.toggleThumbContainer(false);
          }), this.player.on("timeupdate", () => {
            this.lastTime = this.player.media.currentTime;
          });
        }), _defineProperty$1(this, "render", () => {
          this.elements.thumb.container = createElement("div", { class: this.player.config.classNames.previewThumbnails.thumbContainer }), this.elements.thumb.imageContainer = createElement("div", { class: this.player.config.classNames.previewThumbnails.imageContainer }), this.elements.thumb.container.appendChild(this.elements.thumb.imageContainer);
          const e2 = createElement("div", { class: this.player.config.classNames.previewThumbnails.timeContainer });
          this.elements.thumb.time = createElement("span", {}, "00:00"), e2.appendChild(this.elements.thumb.time), this.elements.thumb.imageContainer.appendChild(e2), is.element(this.player.elements.progress) && this.player.elements.progress.appendChild(this.elements.thumb.container), this.elements.scrubbing.container = createElement("div", { class: this.player.config.classNames.previewThumbnails.scrubbingContainer }), this.player.elements.wrapper.appendChild(this.elements.scrubbing.container);
        }), _defineProperty$1(this, "destroy", () => {
          this.elements.thumb.container && this.elements.thumb.container.remove(), this.elements.scrubbing.container && this.elements.scrubbing.container.remove();
        }), _defineProperty$1(this, "showImageAtCurrentTime", () => {
          this.mouseDown ? this.setScrubbingContainerSize() : this.setThumbContainerSizeAndPos();
          const e2 = this.thumbnails[0].frames.findIndex((e3) => this.seekTime >= e3.startTime && this.seekTime <= e3.endTime), t = e2 >= 0;
          let i = 0;
          this.mouseDown || this.toggleThumbContainer(t), t && (this.thumbnails.forEach((t2, s) => {
            this.loadedImages.includes(t2.frames[e2].text) && (i = s);
          }), e2 !== this.showingThumb && (this.showingThumb = e2, this.loadImage(i)));
        }), _defineProperty$1(this, "loadImage", (e2 = 0) => {
          const t = this.showingThumb, i = this.thumbnails[e2], { urlPrefix: s } = i, n = i.frames[t], r = i.frames[t].text, a = s + r;
          if (this.currentImageElement && this.currentImageElement.dataset.filename === r)
            this.showImage(this.currentImageElement, n, e2, t, r, false), this.currentImageElement.dataset.index = t, this.removeOldImages(this.currentImageElement);
          else {
            this.loadingImage && this.usingSprites && (this.loadingImage.onload = null);
            const i2 = new Image();
            i2.src = a, i2.dataset.index = t, i2.dataset.filename = r, this.showingThumbFilename = r, this.player.debug.log(`Loading image: ${a}`), i2.onload = () => this.showImage(i2, n, e2, t, r, true), this.loadingImage = i2, this.removeOldImages(i2);
          }
        }), _defineProperty$1(this, "showImage", (e2, t, i, s, n, r = true) => {
          this.player.debug.log(`Showing thumb: ${n}. num: ${s}. qual: ${i}. newimg: ${r}`), this.setImageSizeAndOffset(e2, t), r && (this.currentImageContainer.appendChild(e2), this.currentImageElement = e2, this.loadedImages.includes(n) || this.loadedImages.push(n)), this.preloadNearby(s, true).then(this.preloadNearby(s, false)).then(this.getHigherQuality(i, e2, t, n));
        }), _defineProperty$1(this, "removeOldImages", (e2) => {
          Array.from(this.currentImageContainer.children).forEach((t) => {
            if ("img" !== t.tagName.toLowerCase())
              return;
            const i = this.usingSprites ? 500 : 1e3;
            if (t.dataset.index !== e2.dataset.index && !t.dataset.deleting) {
              t.dataset.deleting = true;
              const { currentImageContainer: e3 } = this;
              setTimeout(() => {
                e3.removeChild(t), this.player.debug.log(`Removing thumb: ${t.dataset.filename}`);
              }, i);
            }
          });
        }), _defineProperty$1(this, "preloadNearby", (e2, t = true) => new Promise((i) => {
          setTimeout(() => {
            const s = this.thumbnails[0].frames[e2].text;
            if (this.showingThumbFilename === s) {
              let n;
              n = t ? this.thumbnails[0].frames.slice(e2) : this.thumbnails[0].frames.slice(0, e2).reverse();
              let r = false;
              n.forEach((e3) => {
                const t2 = e3.text;
                if (t2 !== s && !this.loadedImages.includes(t2)) {
                  r = true, this.player.debug.log(`Preloading thumb filename: ${t2}`);
                  const { urlPrefix: e4 } = this.thumbnails[0], s2 = e4 + t2, n2 = new Image();
                  n2.src = s2, n2.onload = () => {
                    this.player.debug.log(`Preloaded thumb filename: ${t2}`), this.loadedImages.includes(t2) || this.loadedImages.push(t2), i();
                  };
                }
              }), r || i();
            }
          }, 300);
        })), _defineProperty$1(this, "getHigherQuality", (e2, t, i, s) => {
          if (e2 < this.thumbnails.length - 1) {
            let n = t.naturalHeight;
            this.usingSprites && (n = i.h), n < this.thumbContainerHeight && setTimeout(() => {
              this.showingThumbFilename === s && (this.player.debug.log(`Showing higher quality thumb for: ${s}`), this.loadImage(e2 + 1));
            }, 300);
          }
        }), _defineProperty$1(this, "toggleThumbContainer", (e2 = false, t = false) => {
          const i = this.player.config.classNames.previewThumbnails.thumbContainerShown;
          this.elements.thumb.container.classList.toggle(i, e2), !e2 && t && (this.showingThumb = null, this.showingThumbFilename = null);
        }), _defineProperty$1(this, "toggleScrubbingContainer", (e2 = false) => {
          const t = this.player.config.classNames.previewThumbnails.scrubbingContainerShown;
          this.elements.scrubbing.container.classList.toggle(t, e2), e2 || (this.showingThumb = null, this.showingThumbFilename = null);
        }), _defineProperty$1(this, "determineContainerAutoSizing", () => {
          (this.elements.thumb.imageContainer.clientHeight > 20 || this.elements.thumb.imageContainer.clientWidth > 20) && (this.sizeSpecifiedInCSS = true);
        }), _defineProperty$1(this, "setThumbContainerSizeAndPos", () => {
          const { imageContainer: e2 } = this.elements.thumb;
          if (this.sizeSpecifiedInCSS) {
            if (e2.clientHeight > 20 && e2.clientWidth < 20) {
              const t = Math.floor(e2.clientHeight * this.thumbAspectRatio);
              e2.style.width = `${t}px`;
            } else if (e2.clientHeight < 20 && e2.clientWidth > 20) {
              const t = Math.floor(e2.clientWidth / this.thumbAspectRatio);
              e2.style.height = `${t}px`;
            }
          } else {
            const t = Math.floor(this.thumbContainerHeight * this.thumbAspectRatio);
            e2.style.height = `${this.thumbContainerHeight}px`, e2.style.width = `${t}px`;
          }
          this.setThumbContainerPos();
        }), _defineProperty$1(this, "setThumbContainerPos", () => {
          const e2 = this.player.elements.progress.getBoundingClientRect(), t = this.player.elements.container.getBoundingClientRect(), { container: i } = this.elements.thumb, s = t.left - e2.left + 10, n = t.right - e2.left - i.clientWidth - 10, r = this.mousePosX - e2.left - i.clientWidth / 2, a = clamp(r, s, n);
          i.style.left = `${a}px`, i.style.setProperty("--preview-arrow-offset", r - a + "px");
        }), _defineProperty$1(this, "setScrubbingContainerSize", () => {
          const { width: e2, height: t } = fitRatio(this.thumbAspectRatio, { width: this.player.media.clientWidth, height: this.player.media.clientHeight });
          this.elements.scrubbing.container.style.width = `${e2}px`, this.elements.scrubbing.container.style.height = `${t}px`;
        }), _defineProperty$1(this, "setImageSizeAndOffset", (e2, t) => {
          if (!this.usingSprites)
            return;
          const i = this.thumbContainerHeight / t.h;
          e2.style.height = e2.naturalHeight * i + "px", e2.style.width = e2.naturalWidth * i + "px", e2.style.left = `-${t.x * i}px`, e2.style.top = `-${t.y * i}px`;
        }), this.player = e, this.thumbnails = [], this.loaded = false, this.lastMouseMoveTime = Date.now(), this.mouseDown = false, this.loadedImages = [], this.elements = { thumb: {}, scrubbing: {} }, this.load();
      }
      get enabled() {
        return this.player.isHTML5 && this.player.isVideo && this.player.config.previewThumbnails.enabled;
      }
      get currentImageContainer() {
        return this.mouseDown ? this.elements.scrubbing.container : this.elements.thumb.imageContainer;
      }
      get usingSprites() {
        return Object.keys(this.thumbnails[0].frames[0]).includes("w");
      }
      get thumbAspectRatio() {
        return this.usingSprites ? this.thumbnails[0].frames[0].w / this.thumbnails[0].frames[0].h : this.thumbnails[0].width / this.thumbnails[0].height;
      }
      get thumbContainerHeight() {
        if (this.mouseDown) {
          const { height: e } = fitRatio(this.thumbAspectRatio, { width: this.player.media.clientWidth, height: this.player.media.clientHeight });
          return e;
        }
        return this.sizeSpecifiedInCSS ? this.elements.thumb.imageContainer.clientHeight : Math.floor(this.player.media.clientWidth / this.thumbAspectRatio / 4);
      }
      get currentImageElement() {
        return this.mouseDown ? this.currentScrubbingImageElement : this.currentThumbnailImageElement;
      }
      set currentImageElement(e) {
        this.mouseDown ? this.currentScrubbingImageElement = e : this.currentThumbnailImageElement = e;
      }
    }
    const source = {
      insertElements(e, t) {
        is.string(t) ? insertElement(e, this.media, { src: t }) : is.array(t) && t.forEach((t2) => {
          insertElement(e, this.media, t2);
        });
      }, change(e) {
        getDeep(e, "sources.length") ? (html5.cancelRequests.call(this), this.destroy.call(this, () => {
          this.options.quality = [], removeElement(this.media), this.media = null, is.element(this.elements.container) && this.elements.container.removeAttribute("class");
          const { sources: t, type: i } = e, [{ provider: s = providers.html5, src: n }] = t, r = "html5" === s ? i : "div", a = "html5" === s ? {} : { src: n };
          Object.assign(this, { provider: s, type: i, supported: support.check(i, s, this.config.playsinline), media: createElement(r, a) }), this.elements.container.appendChild(this.media), is.boolean(e.autoplay) && (this.config.autoplay = e.autoplay), this.isHTML5 && (this.config.crossorigin && this.media.setAttribute("crossorigin", ""), this.config.autoplay && this.media.setAttribute("autoplay", ""), is.empty(e.poster) || (this.poster = e.poster), this.config.loop.active && this.media.setAttribute("loop", ""), this.config.muted && this.media.setAttribute("muted", ""), this.config.playsinline && this.media.setAttribute("playsinline", "")), ui.addStyleHook.call(this), this.isHTML5 && source.insertElements.call(this, "source", t), this.config.title = e.title, media.setup.call(this), this.isHTML5 && Object.keys(e).includes("tracks") && source.insertElements.call(this, "track", e.tracks), (this.isHTML5 || this.isEmbed && !this.supported.ui) && ui.build.call(this), this.isHTML5 && this.media.load(), is.empty(e.previewThumbnails) || (Object.assign(this.config.previewThumbnails, e.previewThumbnails), this.previewThumbnails && this.previewThumbnails.loaded && (this.previewThumbnails.destroy(), this.previewThumbnails = null), this.config.previewThumbnails.enabled && (this.previewThumbnails = new PreviewThumbnails(this))), this.fullscreen.update();
        }, true)) : this.debug.warn("Invalid source format");
      }
    };
    class Plyr {
      constructor(e, t) {
        if (_defineProperty$1(this, "play", () => is.function(this.media.play) ? (this.ads && this.ads.enabled && this.ads.managerPromise.then(() => this.ads.play()).catch(() => silencePromise(this.media.play())), this.media.play()) : null), _defineProperty$1(this, "pause", () => this.playing && is.function(this.media.pause) ? this.media.pause() : null), _defineProperty$1(this, "togglePlay", (e2) => (is.boolean(e2) ? e2 : !this.playing) ? this.play() : this.pause()), _defineProperty$1(this, "stop", () => {
          this.isHTML5 ? (this.pause(), this.restart()) : is.function(this.media.stop) && this.media.stop();
        }), _defineProperty$1(this, "restart", () => {
          this.currentTime = 0;
        }), _defineProperty$1(this, "rewind", (e2) => {
          this.currentTime -= is.number(e2) ? e2 : this.config.seekTime;
        }), _defineProperty$1(this, "forward", (e2) => {
          this.currentTime += is.number(e2) ? e2 : this.config.seekTime;
        }), _defineProperty$1(this, "increaseVolume", (e2) => {
          const t2 = this.media.muted ? 0 : this.volume;
          this.volume = t2 + (is.number(e2) ? e2 : 0);
        }), _defineProperty$1(this, "decreaseVolume", (e2) => {
          this.increaseVolume(-e2);
        }), _defineProperty$1(this, "airplay", () => {
          support.airplay && this.media.webkitShowPlaybackTargetPicker();
        }), _defineProperty$1(this, "toggleControls", (e2) => {
          if (this.supported.ui && !this.isAudio) {
            const t2 = hasClass(this.elements.container, this.config.classNames.hideControls), i2 = void 0 === e2 ? void 0 : !e2, s2 = toggleClass(this.elements.container, this.config.classNames.hideControls, i2);
            if (s2 && is.array(this.config.controls) && this.config.controls.includes("settings") && !is.empty(this.config.settings) && controls.toggleMenu.call(this, false), s2 !== t2) {
              const e3 = s2 ? "controlshidden" : "controlsshown";
              triggerEvent.call(this, this.media, e3);
            }
            return !s2;
          }
          return false;
        }), _defineProperty$1(this, "on", (e2, t2) => {
          on.call(this, this.elements.container, e2, t2);
        }), _defineProperty$1(this, "once", (e2, t2) => {
          once.call(this, this.elements.container, e2, t2);
        }), _defineProperty$1(this, "off", (e2, t2) => {
          off(this.elements.container, e2, t2);
        }), _defineProperty$1(this, "destroy", (e2, t2 = false) => {
          if (!this.ready)
            return;
          const i2 = () => {
            document.body.style.overflow = "", this.embed = null, t2 ? (Object.keys(this.elements).length && (removeElement(this.elements.buttons.play), removeElement(this.elements.captions), removeElement(this.elements.controls), removeElement(this.elements.wrapper), this.elements.buttons.play = null, this.elements.captions = null, this.elements.controls = null, this.elements.wrapper = null), is.function(e2) && e2()) : (unbindListeners.call(this), html5.cancelRequests.call(this), replaceElement(this.elements.original, this.elements.container), triggerEvent.call(this, this.elements.original, "destroyed", true), is.function(e2) && e2.call(this.elements.original), this.ready = false, setTimeout(() => {
              this.elements = null, this.media = null;
            }, 200));
          };
          this.stop(), clearTimeout(this.timers.loading), clearTimeout(this.timers.controls), clearTimeout(this.timers.resized), this.isHTML5 ? (ui.toggleNativeControls.call(this, true), i2()) : this.isYouTube ? (clearInterval(this.timers.buffering), clearInterval(this.timers.playing), null !== this.embed && is.function(this.embed.destroy) && this.embed.destroy(), i2()) : this.isVimeo && (null !== this.embed && this.embed.unload().then(i2), setTimeout(i2, 200));
        }), _defineProperty$1(this, "supports", (e2) => support.mime.call(this, e2)), this.timers = {}, this.ready = false, this.loading = false, this.failed = false, this.touch = support.touch, this.media = e, is.string(this.media) && (this.media = document.querySelectorAll(this.media)), (window.jQuery && this.media instanceof jQuery || is.nodeList(this.media) || is.array(this.media)) && (this.media = this.media[0]), this.config = extend({}, defaults, Plyr.defaults, t || {}, (() => {
          try {
            return JSON.parse(this.media.getAttribute("data-plyr-config"));
          } catch (e2) {
            return {};
          }
        })()), this.elements = { container: null, fullscreen: null, captions: null, buttons: {}, display: {}, progress: {}, inputs: {}, settings: { popup: null, menu: null, panels: {}, buttons: {} } }, this.captions = { active: null, currentTrack: -1, meta: /* @__PURE__ */ new WeakMap() }, this.fullscreen = { active: false }, this.options = { speed: [], quality: [] }, this.debug = new Console(this.config.debug), this.debug.log("Config", this.config), this.debug.log("Support", support), is.nullOrUndefined(this.media) || !is.element(this.media))
          return void this.debug.error("Setup failed: no suitable element passed");
        if (this.media.plyr)
          return void this.debug.warn("Target already setup");
        if (!this.config.enabled)
          return void this.debug.error("Setup failed: disabled by config");
        if (!support.check().api)
          return void this.debug.error("Setup failed: no support");
        const i = this.media.cloneNode(true);
        i.autoplay = false, this.elements.original = i;
        const s = this.media.tagName.toLowerCase();
        let n = null, r = null;
        switch (s) {
          case "div":
            if (n = this.media.querySelector("iframe"), is.element(n)) {
              if (r = parseUrl(n.getAttribute("src")), this.provider = getProviderByUrl(r.toString()), this.elements.container = this.media, this.media = n, this.elements.container.className = "", r.search.length) {
                const e2 = ["1", "true"];
                e2.includes(r.searchParams.get("autoplay")) && (this.config.autoplay = true), e2.includes(r.searchParams.get("loop")) && (this.config.loop.active = true), this.isYouTube ? (this.config.playsinline = e2.includes(r.searchParams.get("playsinline")), this.config.youtube.hl = r.searchParams.get("hl")) : this.config.playsinline = true;
              }
            } else
              this.provider = this.media.getAttribute(this.config.attributes.embed.provider), this.media.removeAttribute(this.config.attributes.embed.provider);
            if (is.empty(this.provider) || !Object.values(providers).includes(this.provider))
              return void this.debug.error("Setup failed: Invalid provider");
            this.type = types.video;
            break;
          case "video":
          case "audio":
            this.type = s, this.provider = providers.html5, this.media.hasAttribute("crossorigin") && (this.config.crossorigin = true), this.media.hasAttribute("autoplay") && (this.config.autoplay = true), (this.media.hasAttribute("playsinline") || this.media.hasAttribute("webkit-playsinline")) && (this.config.playsinline = true), this.media.hasAttribute("muted") && (this.config.muted = true), this.media.hasAttribute("loop") && (this.config.loop.active = true);
            break;
          default:
            return void this.debug.error("Setup failed: unsupported type");
        }
        this.supported = support.check(this.type, this.provider, this.config.playsinline), this.supported.api ? (this.eventListeners = [], this.listeners = new Listeners(this), this.storage = new Storage(this), this.media.plyr = this, is.element(this.elements.container) || (this.elements.container = createElement("div", { tabindex: 0 }), wrap(this.media, this.elements.container)), ui.migrateStyles.call(this), ui.addStyleHook.call(this), media.setup.call(this), this.config.debug && on.call(this, this.elements.container, this.config.events.join(" "), (e2) => {
          this.debug.log(`event: ${e2.type}`);
        }), this.fullscreen = new Fullscreen(this), (this.isHTML5 || this.isEmbed && !this.supported.ui) && ui.build.call(this), this.listeners.container(), this.listeners.global(), this.config.ads.enabled && (this.ads = new Ads(this)), this.isHTML5 && this.config.autoplay && this.once("canplay", () => silencePromise(this.play())), this.lastSeekTime = 0, this.config.previewThumbnails.enabled && (this.previewThumbnails = new PreviewThumbnails(this))) : this.debug.error("Setup failed: no support");
      }
      get isHTML5() {
        return this.provider === providers.html5;
      }
      get isEmbed() {
        return this.isYouTube || this.isVimeo;
      }
      get isYouTube() {
        return this.provider === providers.youtube;
      }
      get isVimeo() {
        return this.provider === providers.vimeo;
      }
      get isVideo() {
        return this.type === types.video;
      }
      get isAudio() {
        return this.type === types.audio;
      }
      get playing() {
        return Boolean(this.ready && !this.paused && !this.ended);
      }
      get paused() {
        return Boolean(this.media.paused);
      }
      get stopped() {
        return Boolean(this.paused && 0 === this.currentTime);
      }
      get ended() {
        return Boolean(this.media.ended);
      }
      set currentTime(e) {
        if (!this.duration)
          return;
        const t = is.number(e) && e > 0;
        this.media.currentTime = t ? Math.min(e, this.duration) : 0, this.debug.log(`Seeking to ${this.currentTime} seconds`);
      }
      get currentTime() {
        return Number(this.media.currentTime);
      }
      get buffered() {
        const { buffered: e } = this.media;
        return is.number(e) ? e : e && e.length && this.duration > 0 ? e.end(0) / this.duration : 0;
      }
      get seeking() {
        return Boolean(this.media.seeking);
      }
      get duration() {
        const e = parseFloat(this.config.duration), t = (this.media || {}).duration, i = is.number(t) && t !== 1 / 0 ? t : 0;
        return e || i;
      }
      set volume(e) {
        let t = e;
        is.string(t) && (t = Number(t)), is.number(t) || (t = this.storage.get("volume")), is.number(t) || ({ volume: t } = this.config), t > 1 && (t = 1), t < 0 && (t = 0), this.config.volume = t, this.media.volume = t, !is.empty(e) && this.muted && t > 0 && (this.muted = false);
      }
      get volume() {
        return Number(this.media.volume);
      }
      set muted(e) {
        let t = e;
        is.boolean(t) || (t = this.storage.get("muted")), is.boolean(t) || (t = this.config.muted), this.config.muted = t, this.media.muted = t;
      }
      get muted() {
        return Boolean(this.media.muted);
      }
      get hasAudio() {
        return !this.isHTML5 || (!!this.isAudio || (Boolean(this.media.mozHasAudio) || Boolean(this.media.webkitAudioDecodedByteCount) || Boolean(this.media.audioTracks && this.media.audioTracks.length)));
      }
      set speed(e) {
        let t = null;
        is.number(e) && (t = e), is.number(t) || (t = this.storage.get("speed")), is.number(t) || (t = this.config.speed.selected);
        const { minimumSpeed: i, maximumSpeed: s } = this;
        t = clamp(t, i, s), this.config.speed.selected = t, setTimeout(() => {
          this.media && (this.media.playbackRate = t);
        }, 0);
      }
      get speed() {
        return Number(this.media.playbackRate);
      }
      get minimumSpeed() {
        return this.isYouTube ? Math.min(...this.options.speed) : this.isVimeo ? 0.5 : 0.0625;
      }
      get maximumSpeed() {
        return this.isYouTube ? Math.max(...this.options.speed) : this.isVimeo ? 2 : 16;
      }
      set quality(e) {
        const t = this.config.quality, i = this.options.quality;
        if (!i.length)
          return;
        let s = [!is.empty(e) && Number(e), this.storage.get("quality"), t.selected, t.default].find(is.number), n = true;
        if (!i.includes(s)) {
          const e2 = closest(i, s);
          this.debug.warn(`Unsupported quality option: ${s}, using ${e2} instead`), s = e2, n = false;
        }
        t.selected = s, this.media.quality = s, n && this.storage.set({ quality: s });
      }
      get quality() {
        return this.media.quality;
      }
      set loop(e) {
        const t = is.boolean(e) ? e : this.config.loop.active;
        this.config.loop.active = t, this.media.loop = t;
      }
      get loop() {
        return Boolean(this.media.loop);
      }
      set source(e) {
        source.change.call(this, e);
      }
      get source() {
        return this.media.currentSrc;
      }
      get download() {
        const { download: e } = this.config.urls;
        return is.url(e) ? e : this.source;
      }
      set download(e) {
        is.url(e) && (this.config.urls.download = e, controls.setDownloadUrl.call(this));
      }
      set poster(e) {
        this.isVideo ? ui.setPoster.call(this, e, false).catch(() => {
        }) : this.debug.warn("Poster can only be set for video");
      }
      get poster() {
        return this.isVideo ? this.media.getAttribute("poster") || this.media.getAttribute("data-poster") : null;
      }
      get ratio() {
        if (!this.isVideo)
          return null;
        const e = reduceAspectRatio(getAspectRatio.call(this));
        return is.array(e) ? e.join(":") : e;
      }
      set ratio(e) {
        this.isVideo ? is.string(e) && validateAspectRatio(e) ? (this.config.ratio = reduceAspectRatio(e), setAspectRatio.call(this)) : this.debug.error(`Invalid aspect ratio specified (${e})`) : this.debug.warn("Aspect ratio can only be set for video");
      }
      set autoplay(e) {
        this.config.autoplay = is.boolean(e) ? e : this.config.autoplay;
      }
      get autoplay() {
        return Boolean(this.config.autoplay);
      }
      toggleCaptions(e) {
        captions.toggle.call(this, e, false);
      }
      set currentTrack(e) {
        captions.set.call(this, e, false), captions.setup.call(this);
      }
      get currentTrack() {
        const { toggled: e, currentTrack: t } = this.captions;
        return e ? t : -1;
      }
      set language(e) {
        captions.setLanguage.call(this, e, false);
      }
      get language() {
        return (captions.getCurrentTrack.call(this) || {}).language;
      }
      set pip(e) {
        if (!support.pip)
          return;
        const t = is.boolean(e) ? e : !this.pip;
        is.function(this.media.webkitSetPresentationMode) && this.media.webkitSetPresentationMode(t ? pip.active : pip.inactive), is.function(this.media.requestPictureInPicture) && (!this.pip && t ? this.media.requestPictureInPicture() : this.pip && !t && document.exitPictureInPicture());
      }
      get pip() {
        return support.pip ? is.empty(this.media.webkitPresentationMode) ? this.media === document.pictureInPictureElement : this.media.webkitPresentationMode === pip.active : null;
      }
      setPreviewThumbnails(e) {
        this.previewThumbnails && this.previewThumbnails.loaded && (this.previewThumbnails.destroy(), this.previewThumbnails = null), Object.assign(this.config.previewThumbnails, e), this.config.previewThumbnails.enabled && (this.previewThumbnails = new PreviewThumbnails(this));
      }
      static supported(e, t, i) {
        return support.check(e, t, i);
      }
      static loadSprite(e, t) {
        return loadSprite(e, t);
      }
      static setup(e, t = {}) {
        let i = null;
        return is.string(e) ? i = Array.from(document.querySelectorAll(e)) : is.nodeList(e) ? i = Array.from(e) : is.array(e) && (i = e.filter(is.element)), is.empty(i) ? null : i.map((e2) => new Plyr(e2, t));
      }
    }
    Plyr.defaults = cloneDeep(defaults);
    const pageName$5 = "market";
    function main$5() {
      sliderTestimony();
      const introVideo = document.querySelector(".market-intro-video .player-video");
      if (introVideo) {
        new Plyr(introVideo, {
          controls: ["play-large"],
          settings: ["quality", "speed"],
          autoplay: false,
          seekTime: 15,
          fullscreen: { iosNative: true }
        });
      }

    }
    const pgMarketPost = new Page({
      pageName: pageName$5,
      main: main$5
    });
    const pageName$4 = "article";
    function main$4() {
      sliderFeaturedProducts();
      // copyLink();
      if (document.querySelectorAll(".slider-article")) {
        let sliderGallery = document.querySelectorAll(".slider-article");
        sliderGallery.forEach((slider) => {
          slider = new Swiper(slider.querySelector(".swiper-container"), {
            modules: [Pagination, Navigation, EffectFade],
            slidesPerView: 1,
            spaceBetween: 0,
            slidesPerGroup: 1,
            loop: false,
            effect: "fade",
            fadeEffect: { crossFade: true },
            speed: 800,
            autoHeight: true,
            slideToClickedSlide: true,
            navigation: {
              nextEl: slider.querySelector(".swiper-button-next"),
              prevEl: slider.querySelector(".swiper-button-prev")
            },
            loopFillGroupWithBlank: false,
            centerInsufficientSlides: true,
            grabCursor: false,
            observer: true,
            preloadImages: false,
            lazy: true,
            watchOverflow: true
          });
        });
      }
    }
    const pgBlogPost = new Page({
      pageName: pageName$4,
      main: main$4
    });
    class DataSetGet {
      constructor({
        dataGetSelector = "[data-get]",
        dataSetSelector = "[data-set]",
        dataCloseSelector = "[data-close]",
        parentContainer = "[data-parent]",
        defaultActive = "[data-default-active]",
        listener = "click",
        toggle = true,
        multiple = false,
        deactivateOnClickOutside = false,
        leaveDelay = 800,
        debounceDelay = 100,
        // tempo em milissegundos
        onClose = () => {
        },
        onActivate = () => {
        },
        onComplete = () => {
        },
        onDeactivate = () => {
        }
      } = {}) {
        this.dataGetSelector = dataGetSelector;
        this.dataSetSelector = dataSetSelector;
        this.parentContainer = parentContainer;
        this.defaultActive = defaultActive;
        this.dataCloseSelector = dataCloseSelector;
        this.listener = listener;
        this.toggle = toggle;
        this.leaveDelay = leaveDelay;
        this.multiple = multiple;
        this.debounceDelay = debounceDelay;
        this.resetTimeout = null;
        this.onClose = onClose;
        this.onActivate = onActivate;
        this.onComplete = onComplete;
        this.onDeactivate = onDeactivate;
        this.deactivateOnClickOutside = deactivateOnClickOutside;
        this.initialize();
        this.reset();
      }
      removeBrackets(str) {
        return str.replace(/[\[\]]+/g, "");
      }
      getValueFromDataSet(selector) {
        return selector.getAttribute(this.removeBrackets(this.dataSetSelector));
      }
      initialize() {
        this.dataSets = document.querySelectorAll(this.dataSetSelector);
        this.container = document.querySelector(this.parentContainer);
        this.dataGets = document.querySelectorAll(this.dataGetSelector);
        this.closeButtons = document.querySelectorAll(this.dataCloseSelector);
        if (this.deactivateOnClickOutside) {
          this.addOutsideClickListener();
        }
        this.addEventListeners();
      }
      reset() {
        this.deactivateItems();
        this.activateDefault();
        if (!this.container)
          return;
        this.container.dataset.activeValue = "";
        if (this.container.dataset.state == "active" && this.container.dataset.activeValue == "") {
          this.container.dataset.state = "leave";
          setTimeout(() => {
            if (this.container.dataset.activeValue == "") {
              this.container.dataset.state = "";
            }
          }, 800);
        }
      }
      debounceReset() {
        if (this.resetTimeout) {
          clearTimeout(this.resetTimeout);
        }
        this.resetTimeout = setTimeout(() => {
          if (this.getActiveItems().length === 0 && this.getActiveDatasets().length === 0) {
            this.reset();
          }
        }, this.debounceDelay);
      }
      addEventListeners() {
        if (this.listener == "hover") {
          this.dataSets.forEach((dataSet) => {
            dataSet.addEventListener("mouseenter", (event) => {
              const value = this.getValueFromDataSet(dataSet);
              this.activateItems(value);
            });
            dataSet.addEventListener("mouseleave", () => {
              this.reset();
            });
          });
        } else {
          this.dataSets.forEach((dataSet) => {
            dataSet.addEventListener("click", () => {
              const value = this.getValueFromDataSet(dataSet);
              this.activateItems(value);
            });
          });
          this.closeButtons.forEach((item) => {
            item.addEventListener("click", () => {
              this.reset();
            });
          });
        }
      }
      addOutsideClickListener() {
        document.addEventListener("click", (event) => {
          const clickedInsideDataSet = Array.from(this.dataSets).some((dataSet) => dataSet.contains(event.target));
          const clickedInsideDataGet = Array.from(this.dataGets).some((dataGet) => dataGet.contains(event.target));
          if (!clickedInsideDataSet && !clickedInsideDataGet) {
            this.deactivateItems();
          }
        });
      }
      getActiveItems() {
        return Array.from(this.dataGets).filter((detail) => {
          return detail.classList.contains("active");
        });
      }
      getActiveDatasets() {
        return Array.from(this.dataSets).filter((detail) => {
          return detail.classList.contains("active");
        });
      }
      findItems(dataSet) {
        return Array.from(this.dataGets).filter((detail) => {
          return detail.getAttribute(this.removeBrackets(this.dataGetSelector)) === dataSet;
        });
      }
      findDatasets(dataSet) {
        return Array.from(this.dataSets).filter((detail) => {
          return detail.getAttribute(this.removeBrackets(this.dataSetSelector)) === dataSet;
        });
      }
      activateDefault() {
        let defaultActiveElements = document.querySelectorAll(this.defaultActive);
        defaultActiveElements.forEach((element) => {
          element.classList.add("active");
        });
        if (this.container && defaultActiveElements.length > 0) {
          const defaultValue = this.getValueFromDataSet(defaultActiveElements[0]);
          this.container.dataset.activeValue = defaultValue;
        }
      }
      activateItems(value) {
        let items = this.findItems(value);
        let datasets = this.findDatasets(value);
        if (this.toggle) {
          if (!this.multiple) {
            this.deactivateAllExcept(value);
          }
          datasets.forEach((dataset) => {
            if (dataset.getAttribute(this.removeBrackets(this.dataSetSelector)) === value) {
              this.toggleActive(dataset);
            }
          });
          items.forEach((item) => {
            if (item.getAttribute(this.removeBrackets(this.dataGetSelector)) === value) {
              this.toggleActive(item);
            }
          });
        } else {
          if (!this.multiple) {
            this.deactivateItems();
          }
          datasets.forEach((dataset) => dataset.addActive());
          items.forEach((item) => {
            item.addActive();
            this.onActivate(item);
          });
        }
        if (this.container) {
          this.container.dataset.activeValue = value;
          this.container.dataset.state = "active";
        }
        this.debounceReset();
        this.onComplete();
      }
      deactivateAllExcept(value) {
        this.getActiveDatasets().forEach((dataset) => {
          if (dataset.getAttribute(this.removeBrackets(this.dataSetSelector)) !== value) {
            dataset.removeActive({ leaveDelay: this.leaveDelay });
            this.onDeactivate(dataset);
          }
        });
        this.getActiveItems().forEach((item) => {
          if (item.getAttribute(this.removeBrackets(this.dataGetSelector)) !== value) {
            item.removeActive({ leaveDelay: this.leaveDelay });
            this.onDeactivate(item);
          }
        });
      }
      toggleActive(item) {
        if (item.classList.contains("active")) {
          this.onDeactivate(item);
          item.removeActive({ leaveDelay: this.leaveDelay });
        } else {
          item.addActive();
          this.onActivate(item);
        }
      }
      deactivateItems() {
        const activeList = this.getActiveItems();
        const activeDatasetList = this.getActiveDatasets();
        activeDatasetList.forEach((item) => item.removeActive({ leaveDelay: this.leaveDelay }));
        activeList.forEach((item) => {
          item.removeActive({ leaveDelay: this.leaveDelay });
          this.onDeactivate(item);
        });
        this.onClose();
      }
    }
    function accordionGsap(list, toggle = true) {
      let isAnimating = false;

      if (!list)
        list = document;
      let toggleItems = list.querySelectorAll(":scope > .accordion-item");
      toggleItems = Array.prototype.slice.call(toggleItems);
      const updateAccordionSize = (element) => {
        if (element.classList.contains("active")) {
          let content = element.querySelector(":scope > .accordion-content");
          gsapWithCSS.set(content, { height: "auto" });
          let newHeight = content.offsetHeight;
          gsapWithCSS.from(content, 0.6, {
            height: newHeight,
            immediateRender: false,
            ease: Power1.easeInOut
          });
        }
      };
      toggleItems.forEach(function (element) {
        let header = element.querySelector(":scope > .accordion-header");
        if (header) {
          if (element.classList.contains("active")) {
            let content = element.querySelector(":scope > .accordion-content");
            gsapWithCSS.set(content, { height: "auto" });
            gsapWithCSS.from(content, 0.6, {
              height: 0,
              immediateRender: false,
              ease: Power1.easeOut
            });
          }
          header.addEventListener("click", function () {
            if (isAnimating) return;

            let content = element.querySelector(":scope > .accordion-content");
            if (element.classList.contains("active")) {
              element.removeActive();
              isAnimating = true;
              element.style.pointerEvents = "none";
              gsapWithCSS.to(content, 0.6, {
                height: 0,
                immediateRender: false,
                ease: Power1.easeOut,
                onComplete: function () {
                  isAnimating = false;
                  element.style.pointerEvents = "auto";
                }
              });
            } else {
              if (toggle) {
                let lastActives = list.querySelectorAll(":scope > .accordion-item.active");
                lastActives.forEach((lastActive) => {
                  lastActive.removeActive();
                  let content2 = lastActive.querySelector(":scope > .accordion-content");
                  gsapWithCSS.to(content2, 0.6, {
                    height: 0,
                    immediateRender: false,
                    ease: Power1.easeOut
                  });
                });
              }
              element.addActive();
              isAnimating = true;
              element.style.pointerEvents = "none";
              gsapWithCSS.set(content, { height: "auto" });
              gsapWithCSS.from(content, 0.6, {
                height: 0,
                immediateRender: false,
                ease: Power1.easeInOut,
                onComplete: function () {
                  isAnimating = false;
                  element.style.pointerEvents = "auto";
                  let parentAccordion = header.parentNode.parentNode.closest(".accordion-item");
                  if (parentAccordion) {
                    let parentContent = parentAccordion.querySelector(":scope > .accordion-content");
                    gsapWithCSS.to(parentContent, 0.6, {
                      height: "auto",
                      immediateRender: false,
                      ease: Power1.easeInOut
                    });
                  }
                }
              });
            }
          });
        }
      });
      list.updateAccordionSize = updateAccordionSize;
    }

    const pageName$3 = "services";
    function main$3() {
      sliderTestimony();
      sliderBanner();
    }
    const pgServicesPost = new Page({
      pageName: pageName$3,
      main: main$3
    });
    function sliderContentMobile() {
      let mm = gsapWithCSS.matchMedia();
      let sliderGallery = document.querySelectorAll(".slider-content-mobile");
      let media2 = mediaSize.phone;
      if (document.body.dataset.pg == "pg-market")
        media2 = mediaSize.mobile;
      setTimeout(() => {
        mm.add(media2, () => {
          sliderGallery.forEach((slider) => {
            let swiper = new Swiper(slider.querySelector(".swiper-container"), {
              modules: [Pagination, Navigation],
              slidesPerView: "auto",
              spaceBetween: 0,
              slidesPerGroup: 1,
              loop: false,
              effect: "fade",
              speed: 800,
              slideToClickedSlide: true,
              loopFillGroupWithBlank: false,
              centerInsufficientSlides: true,
              grabCursor: false,
              observer: true,
              preloadImages: false,
              lazy: true,
              watchOverflow: true,
              centeredSlides: true
            });
            slider.swiper = swiper;
          });
          return () => {
            sliderGallery.forEach((element) => {
              if (element.swiper)
                element.swiper.destroy();
            });
          };
        });
      }, 1e3);
      if (!screen.isDesktop) {
        if (document.querySelector(".slider-content-search-blog")) {
          setTimeout(() => {
            let sliderGallery2 = document.querySelectorAll(".slider-content-search-blog");
            sliderGallery2.forEach((slider) => {
              slider = new Swiper(slider.querySelector(".swiper-container"), {
                modules: [Pagination, Navigation],
                slidesPerView: "auto",
                spaceBetween: 0,
                slidesPerGroup: 1,
                loop: false,
                effect: "fade",
                speed: 800,
                slideToClickedSlide: true,
                loopFillGroupWithBlank: false,
                centerInsufficientSlides: true,
                grabCursor: false,
                observer: true,
                preloadImages: false,
                lazy: true,
                watchOverflow: true
              });
            });
          }, 1e3);
        }
      }
      if (screen.isPhone) {
        if (document.querySelector(".slider-content-phone")) {
          setTimeout(() => {
            let sliderGallery2 = document.querySelectorAll(".slider-content-phone");
            sliderGallery2.forEach((slider) => {
              slider = new Swiper(slider.querySelector(".swiper-container"), {
                modules: [Pagination, Navigation],
                slidesPerView: "auto",
                spaceBetween: 0,
                slidesPerGroup: 1,
                loop: false,
                effect: "fade",
                speed: 800,
                slideToClickedSlide: true,
                loopFillGroupWithBlank: false,
                centerInsufficientSlides: true,
                grabCursor: false,
                observer: true,
                preloadImages: false,
                lazy: true,
                watchOverflow: true
              });
            });
          }, 1e3);
        }
      }
    }
    gsapWithCSS$1.registerPlugin(ScrollTrigger$1, Back, ScrollToPlugin);
    function footer() {
      if (!screen.isDesktop)
        return;
      let tl = gsapWithCSS$1.timeline({
        scrollTrigger: {
          trigger: "#footer",
          start: "top bottom",
          end: "bottom bottom",
          // pin: containerScroll,
          pinSpacing: false,
          markers: false,
          scrub: true,
          anticipatePin: true,
          invalidateOnRefresh: true,
          onUpdate: function (ev) {
          }
        }
      });
      tl.fromTo("#footer .container-fluid", { y: "-40rem" }, { y: "0" });
    }
    gsapWithCSS$1.registerPlugin(ScrollTrigger$1, Back, ScrollToPlugin);
    const pageName$2 = "contact";
    function main$2() {
    }
    const pgContact = new Page({
      pageName: pageName$2,
      main: main$2
    });
    gsapWithCSS$1.registerPlugin(ScrollTrigger$1);
    function sticky() {
      let stickies = document.querySelectorAll("[data-sticky]:not(.js-running)");
      stickies.forEach((element) => {
        element.classList.add("js-running");
        let start = element.dataset.start ? element.dataset.start : "top top";
        let end = element.dataset.end ? element.dataset.end : "bottom top";
        let trigger2 = element.dataset.trigger ? document.querySelector(element.dataset.trigger) : element;
        if (element.dataset.trigger && element.dataset.trigger == "parent")
          trigger2 = element.parentElement;
        let endTrigger = element.dataset.endTrigger ? document.querySelector(element.dataset.endTrigger) : trigger2;
        let offsetEl = element.dataset.offset ? element.dataset.offset : 0;
        let offset2 = 0;
        if (offsetEl != 0 && document.querySelector(offsetEl)) {
          offset2 = document.querySelector(offsetEl).clientHeight;
        }
        if (element.dataset.trigger && element.dataset.trigger == "parent") {
          start = () => {
            return `top-=${offset2} top`;
          };
          end = () => {
            const offsetSum = element.offsetHeight + offset2;
            return `bottom-=${offsetSum} top`;
          };
        }
        ScrollTrigger$1.create({
          trigger: trigger2,
          endTrigger,
          start,
          end,
          pin: element,
          pinSpacing: false,
          markers: false,
          scrub: true,
          anticipatePin: true,
          invalidateOnRefresh: true
        });
      });
    }
    function dropdownTags() {
      if (!document.querySelector(".list-dropdown-tags"))
        return;
      let mm = gsapWithCSS$1.matchMedia();
      let jsRunning = false;
      mm.add(`${mediaSize.mobile}`, () => {
        if (jsRunning)
          return;
        new DataSetGet({
          dataGetSelector: "[data-get-tag]",
          dataSetSelector: "[data-set-tag]",
          listener: "click",
          //'hover' ou 'click'
          toggle: true,
          multiple: false,
          deactivateOnClickOutside: true,
          onClose: () => {
          },
          onComplete: () => {
          },
          onActivate: (item) => {
          },
          onDeactivate: (item) => {
          }
        });
        jsRunning = true;
      });
    }
    const pageName$1 = "portfolio";
    function main$1() {
      dropdownTags();
    }
    function main$careers() {
      sliderTestimony();
      const containerVideo = document.querySelector(".container-video");
      const video = document.querySelector(".player-video.careers-video");

      const thumb = document.querySelector(".thumb video");
      const player = new Plyr(video, {
        controls: ["play-large", "progress", "fullscreen", "mute", "volume"],
        settings: ["quality", "speed"],
        autoplay: false,
        fullscreen: { iosNative: true },
        clickToPlay: true
      });
      containerVideo.video = player;
      // containerVideo.addEventListener("click", function () {
      //   if (player.paused) {
      //     player.play();
      //     containerVideo.classList.add("playing");
      //     setTimeout(() => {
      //       thumb.pause();
      //     }, 600);
      //   } else {
      //     player.pause();
      //     if (containerVideo.classList.contains("playing")) {
      //       containerVideo.classList.remove("playing");
      //       thumb.play();
      //     }
      //   }
      // });
    }
    const pgPortfolio = new Page({
      pageName: pageName$1,
      main: main$1
    });
    const pageName = "blog";
    function main() {
      dropdownTags();
    }
    const pgBlog = new Page({
      pageName,
      main
    });
    gsapWithCSS$1.registerPlugin(ScrollSmoother, ScrollTrigger$1);
    if (!screen.isMobile)
      cursor();
    CookiesConsent();
    viewportHeight();
    menuControls();
    function closeSearch() {
      if (document.body.dataset.searchState == "success") {
        document.body.dataset.searchState = "leave";
        setTimeout(() => {
          document.body.dataset.searchState = "";
        }, 1100);
      }
    }
    document.querySelectorAll("[data-search-remove]:not(.js-running)").forEach((element) => {
      element.classList.add("js-running");
      element.addEventListener("click", closeSearch);
    });

    const submenu = new DataSetGet({
      dataGetSelector: "[data-get-submenu]",
      dataSetSelector: "[data-set-submenu]",
      listener: "click",
      //'hover' ou 'click'
      toggle: true,
      multiple: false,
      deactivateOnClickOutside: true,
      leaveDelay: 800,
      onClose: () => {
        let smoother = ScrollSmoother.get();
        if (smoother)
          smoother.paused(false);
        closeSearch();
      },
      onComplete: () => {
        let smoother = ScrollSmoother.get();
        if (smoother)
          smoother.paused(true);
        closeSearch();
      },
      onActivate: (item) => {
      },
      onDeactivate: (item) => {
      }
    });
    document.addEventListener("pjax:send", function () {
      submenu.deactivateItems();
    });
    let btnSubClose = document.querySelectorAll("[data-submenu-close]");
    let submenuItem = document.querySelectorAll(".submenu");
    btnSubClose.forEach((el) => {
      el.addEventListener("click", () => {
        submenuItem.forEach((sub) => {
          if (sub.classList.contains("active")) {
            sub.removeActive();
          }
        });
      });
    });

    var firstLoad = true;

    function loadVideoPlayer(elem) {
      new Plyr(elem, {
        controls: ["play-large", "play", "progress", "fullscreen", "mute", "volume"],
        settings: ["quality", "speed"],
        autoplay: false,
        seekTime: 15,
        fullscreen: { iosNative: true }
      });
    }

    function whenContainerReady() {
      document.body.classList.add("container-ready");
      
      if (!screen.isMobile) {
        let smooth = 2;
        if (screen.isSafariDesktop)
          smooth = 1.5;
        ScrollSmoother.create({
          wrapper: "#main-transition",
          content: "[data-scroll-container]",
          smooth,
          normalizeScroll: true,
          // prevents address bar from showing/hiding on most devices, solves various other browser inconsistencies
          ignoreMobileResize: true,
          // skips ScrollTrigger.refresh() on mobile resizes from address bar showing/hiding
          effects: true,
          preventDefault: true
        });
      }
      if (firstLoad) {
        firstLoad = false;
      }

      setTimeout(() => {
        ScrollTrigger$1.refresh();
      }, 1e3);

      // About functions
      const page = window.location.pathname.trim() === "/" ? "home" : location.pathname.substring(1);
      const page_name = page.split("/")[0].trim();
      switch (page_name) {
        case 'home':
          main$8();
          break;
        case 'about':
          main$7();
          break;
        case 'careers':
          main$careers();
          break;
        case 'project':
          main$6();
          break;
        case 'market':
          main$5();
          break;
        case 'article':
          main$4();
          break;
        case 'services':
          main$3();
          break;
        case 'contact':
          main$2();
        case 'portfolio':
          main$1();
          break;
        default:
          break;
      }

      sticky();
      observers();
      marcarFormPreenchido();
      initVideo();
      scrollTo("", "");
      Parallax();
      splitWords();
      splitChars();
      sliderContentMobile();
      footer();
      let sectionHeresWhatPeopleAreSaying = document.querySelector(".section-heres-what-people-are-saying");
      if (sectionHeresWhatPeopleAreSaying) {
        let bg = gsapWithCSS$1.timeline({
          scrollTrigger: {
            trigger: ".section-heres-what-people-are-saying",
            start: "top center",
            end: "bottom 30%",
            // pin: containerScroll,
            pinSpacing: false,
            markers: false,
            scrub: false,
            anticipatePin: true,
            invalidateOnRefresh: true,
            toggleActions: "play reverse play reverse",
            onUpdate: function (ev) {
            }
          }
        });
        bg.fromTo("body", {
          backgroundColor: "#f2f2f2",
          duration: 0.3
        }, {
          backgroundColor: "#87C3E7",
          duration: 0.3
        });
        document.addEventListener("pjax:switch", function () {
          document.body.style.backgroundColor = "";
        }, { once: true });
      }
      if (document.querySelector(".accordion-list-studios:not(.js-running)")) {
        if (screen.isDesktop) {
          accordion(".accordion-list-studios .accordion-item", {
            clickToggle: true,
            allowMultipleActive: false
          });
        } else {
          document.querySelectorAll(".accordion-list-studios").forEach((element) => {
            accordionGsap(element);
          });
        }
        document.querySelector(".accordion-list-studios").classList.add("js-running");
      }


      // Market Video Events
      const introVideo = document.querySelector(".market-intro-video .player-video");
      const markets_video_modal = document.querySelector("modal-group[name='modal-markets-video']");
      const introVideoPoster = document.querySelector(".market-intro-video .plyr__poster");
      const markets_video_playbutton = document.querySelector(".market-intro-video button.plyr__control.plyr__control--overlaid[data-plyr='play']");

      const openModalAndPlayVideo = () => {
        const introModalVideo = document.querySelector(".market-intro-video-modal .player-video");
        loadVideoPlayer(introModalVideo);
        introModalVideo.currentTime = introVideo?.currentTime;
        introModalVideo.plyr.muted = introVideo.plyr.muted;
        introModalVideo.play();

        setTimeout(() => {
          introVideo.currentTime = introModalVideo?.currentTime;
          introVideo.plyr.muted = introModalVideo.plyr.muted;
          introVideo.pause();
        }, 200);
        markets_video_modal.open();
      }
      if (markets_video_modal) {
        markets_video_modal.addEventListener("click", (e) => {
          if (e.target !== e.currentTarget) return;
          const introVideo = document.querySelector(".market-intro-video .player-video");
          const introModalVideo = document.querySelector(".market-intro-video-modal .player-video");
          introVideo.currentTime = introModalVideo?.currentTime;
          introVideo.plyr.muted = introModalVideo.plyr.muted;
          if (introModalVideo.plyr.playing) {
            introVideo.play();
          } else {
            introVideo.pause();
          }
          setTimeout(() => {
            introModalVideo.pause();
          }, 200);
          markets_video_modal.close();
        });
      }

      introVideoPoster?.addEventListener("click", () => {
        if (!introVideo.plyr.playing) {
          openModalAndPlayVideo();
        }
      });
      markets_video_playbutton?.addEventListener("click", openModalAndPlayVideo);
      // Market Video Events End

      // about video
      const modal_about_video_button = document.querySelector("btn-modal-open[group='modal-about-video");
      const about_video = document.querySelector(".about-modal-video .player-video");
      modal_about_video_button?.addEventListener("click", () => {
        loadVideoPlayer(about_video);
        about_video.play();
      })

      const modal_about_video = document.querySelector("modal-group[name='modal-about-video']");
      if (modal_about_video) {
        modal_about_video.addEventListener("click", (e) => {
          if (e.target !== e.currentTarget) return;
          modal_about_video.close();
          document.querySelectorAll(".player-video").forEach((x) => {
            x.pause();
            setTimeout(() => {
              x.currentTime = 0;
            }, 500);
          });
        });
      }

      // about magazine modal
      const magazine_modal = document.querySelector("modal-group[name='modal-about-magazine']");
      if (magazine_modal) {
        magazine_modal.addEventListener("click", (e) => {
          if (e.target !== e.currentTarget) return;
          magazine_modal.close();
        });
      }
    }

    document.querySelector(".initScript").addEventListener("click", () => {
      whenContainerReady();
      if (!firstLoad) {
        closeSearch();
      }
    });

    document.querySelector(".updateWatchedTrigger").addEventListener("customUpdateWatch", () => {
      initVideo();
      dropdownTags();
      updateWatched();
      ScrollTrigger$1.refresh();
    });

    setTimeout(() => {
      window.scrollTo({ top: 0 });
      const containerLoaded = document.body.classList.contains("container-ready");      
      if (!containerLoaded) {
        whenContainerReady();
        updateWatched();
        chat();
      }
    }, 1000);
  }
});
export default require_app2();