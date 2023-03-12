!(function (t) {
  "use strict";
  function e(t, e, i) {
    var s;
    return function () {
      var o = this,
        n = arguments,
        r = function () {
          (s = null), i || t.apply(o, n);
        },
        c = i && !s;
      clearTimeout(s), (s = setTimeout(r, e)), c && t.apply(o, n);
    };
  }
  var i = {
      barType: "default",
      minBarSize: 10,
      alwaysShowBars: !1,
      containerClass: "mb-container",
      contentClass: "mb-content",
      trackClass: "mb-track",
      barClass: "mb-bar",
      visibleClass: "mb-visible",
      progressClass: "mb-progress",
    },
    s = function (t, e) {
      if (null == t)
        throw new TypeError("Cannot convert undefined or null to object");
      for (var i = Object(t), s = 1; s < arguments.length; s++) {
        var o = arguments[s];
        if (null != o)
          for (var n in o)
            Object.prototype.hasOwnProperty.call(o, n) && (i[n] = o[n]);
      }
      return i;
    },
    o = function (t, e, i) {
      if ("[object Object]" === Object.prototype.toString.call(t))
        for (var s in t)
          Object.prototype.hasOwnProperty.call(t, s) && e.call(i, s, t[s]);
      else for (var o = 0, n = t.length; o < n; o++) e.call(i, o, t[o]);
    },
    n = function (t, e, i) {
      t.addEventListener(e, i, !1);
    },
    r = function (t, e, i) {
      t.removeEventListener(e, i);
    },
    c = function (t, e, i) {
      var s = t && t.style,
        n = "[object Object]" === Object.prototype.toString.call(e);
      if (s) {
        if (void 0 === i && !n)
          return (i = window.getComputedStyle(t)), void 0 === e ? i : i[e];
        n
          ? o(e, function (t, e) {
              t in s || (t = "-webkit-" + t),
                (s[t] =
                  e +
                  ("string" == typeof e ? "" : "opacity" === t ? "" : "px"));
            })
          : (e in s || (e = "-webkit-" + e),
            (s[e] =
              i + ("string" == typeof i ? "" : "opacity" === e ? "" : "px")));
      }
    },
    a = function (t) {
      var e = window,
        i = document,
        s = i.body,
        o = t.getBoundingClientRect(),
        n =
          void 0 !== e.pageXOffset
            ? e.pageXOffset
            : (i.documentElement || s.parentNode || s).scrollLeft,
        r =
          void 0 !== e.pageYOffset
            ? e.pageYOffset
            : (i.documentElement || s.parentNode || s).scrollTop;
      return {
        x: o.left + n,
        y: o.top + r,
        height: Math.round(o.height),
        width: Math.round(o.width),
      };
    },
    l =
      window.requestAnimationFrame ||
      (function () {
        var t = 0;
        return (
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          function (e) {
            var i,
              s = new Date().getTime();
            return (
              (i = Math.max(0, 16 - (s - t))),
              (t = s + i),
              setTimeout(function () {
                e(s + i);
              }, i)
            );
          }
        );
      })(),
    d = function () {
      var t = 0,
        e = document.createElement("div");
      return (
        (e.style.cssText =
          "width: 100; height: 100; overflow: scroll; position: absolute; top: -9999;"),
        document.body.appendChild(e),
        (t = e.offsetWidth - e.clientWidth),
        document.body.removeChild(e),
        t
      );
    },
    u = function (t, o) {
      (this.container = t),
        "string" == typeof content &&
          (this.container = document.querySelector(t)),
        (this.config = s({}, i, o || window.MiniBarOptions || {})),
        (this.css = window.getComputedStyle(this.container)),
        (this.scrollbarSize = d()),
        (this.bars = {
          x: {},
          y: {},
        }),
        (this.tracks = {
          x: {},
          y: {},
        }),
        (this.trackPos = {
          x: "left",
          y: "top",
        }),
        (this.trackSize = {
          x: "width",
          y: "height",
        }),
        (this.scrollPos = {
          x: "scrollLeft",
          y: "scrollTop",
        }),
        (this.scrollSize = {
          x: "scrollWidth",
          y: "scrollHeight",
        }),
        (this.offsetAxis = {
          x: "offsetX",
          y: "offsetY",
        }),
        (this.mouseAxis = {
          x: "pageX",
          y: "pageY",
        }),
        (this.events = {
          update: this.update.bind(this),
          scroll: this.scroll.bind(this),
          mouseenter: this.mouseenter.bind(this),
          mousedown: this.mousedown.bind(this),
          mousemove: this.mousemove.bind(this),
          mouseup: this.mouseup.bind(this),
        }),
        (this.events.debounce = e(this.events.update, 50)),
        this.init();
    };
  (u.prototype.init = function () {
    var t = this;
    if (!t.initialised) {
      for (
        t.container.classList.add(t.config.containerClass),
          t.content = document.createElement("div"),
          t.content.classList.add(t.config.contentClass),
          t.config.alwaysShowBars &&
            t.container.classList.add(t.config.visibleClass);
        t.container.firstChild;

      )
        t.content.appendChild(t.container.firstChild);
      o(t.tracks, function (e, i) {
        (t.bars[e].node = document.createElement("div")),
          (i.node = document.createElement("div")),
          i.node.classList.add(
            t.config.trackClass,
            t.config.trackClass + "-" + e
          ),
          t.bars[e].node.classList.add(t.config.barClass),
          i.node.appendChild(t.bars[e].node),
          t.container.appendChild(i.node),
          "progress" === t.config.barType
            ? (i.node.classList.add(t.config.progressClass),
              n(i.node, "mousedown", t.events.mousedown))
            : n(t.bars[e].node, "mousedown", t.events.mousedown);
      }),
        t.container.appendChild(t.content),
        (t.container.style.position =
          "static" === t.css.position ? "relative" : t.css.position),
        t.update(),
        n(t.content, "scroll", t.events.scroll),
        n(t.container, "mouseenter", t.events.mouseenter),
        n(window, "resize", t.events.debounce),
        n(document, "DOMContentLoaded", t.events.update),
        n(window, "load", t.events.update),
        (t.initialised = !0);
    }
  }),
    (u.prototype.scroll = function () {
      this.updateScrollBars();
    }),
    (u.prototype.mouseenter = function () {
      this.updateScrollBars();
    }),
    (u.prototype.mousedown = function (t) {
      t.preventDefault();
      var e = "progress" === this.config.barType ? "tracks" : "bars",
        i = t.target === this[e].x.node ? "x" : "y";
      (this.currentAxis = i),
        this.update(),
        this.container.classList.add(this.config.visibleClass),
        "progress" === this.config.barType
          ? ((this.origin = {
              x: t.pageX - this.tracks[i].x,
              y: t.pageY - this.tracks[i].y,
            }),
            this.mousemove(t))
          : (this.origin = {
              x: t.pageX - this.bars[i].x,
              y: t.pageY - this.bars[i].y,
            }),
        n(document, "mousemove", this.events.mousemove),
        n(document, "mouseup", this.events.mouseup);
    }),
    (u.prototype.mousemove = function (t) {
      t.preventDefault();
      var e,
        i,
        s = this,
        o = this.origin,
        n = s.tracks[s.currentAxis],
        r = n[s.trackSize[s.currentAxis]],
        c = s.rect[s.trackSize[s.currentAxis]];
      "progress" === s.config.barType
        ? ((e = t[s.mouseAxis[s.currentAxis]] - n[s.currentAxis]),
          (i = (e / r) * (s.content[s.scrollSize[s.currentAxis]] - c)))
        : ((e =
            t[s.mouseAxis[s.currentAxis]] -
            o[s.currentAxis] -
            n[s.currentAxis]),
          (i = (e / r) * s[s.scrollSize[s.currentAxis]])),
        l(function () {
          s.content[s.scrollPos[s.currentAxis]] = i;
        });
    }),
    (u.prototype.mouseup = function () {
      (this.origin = {}),
        (this.currentAxis = null),
        this.container.classList.toggle(
          this.config.visibleClass,
          this.config.alwaysShowBars
        ),
        r(document, "mousemove", this.events.mousemove),
        r(document, "mouseup", this.events.mouseup);
    }),
    (u.prototype.update = function () {
      var t = this;
      (this.rect = a(this.container)),
        (this.scrollTop = this.content.scrollTop),
        (this.scrollLeft = this.content.scrollLeft),
        (this.scrollHeight = this.content.scrollHeight),
        (this.scrollWidth = this.content.scrollWidth);
      var e = this.scrollWidth > this.rect.width,
        i = this.scrollHeight > this.rect.height;
      this.container.classList.toggle("mb-scroll-x", e),
        this.container.classList.toggle("mb-scroll-y", i),
        c(this.content, {
          overflow: "auto",
          marginBottom: e ? -this.scrollbarSize : "",
          paddingBottom: e ? this.scrollbarSize : "",
          marginRight: i ? -this.scrollbarSize : "",
          paddingRight: i ? this.scrollbarSize : "",
        }),
        (this.scrollX = e),
        (this.scrollY = i),
        o(this.tracks, function (e, i) {
          s(i, a(i.node)), s(t.bars[e], a(t.bars[e].node));
        }),
        this.updateScrollBars();
    }),
    (u.prototype.updateScrollBar = function (t) {
      var e = this,
        i = {},
        s = e.tracks[t][e.trackSize[t]],
        o = e.rect[e.trackSize[t]],
        n = e.content[e.scrollPos[t]],
        r = s / e[e.scrollSize[t]],
        a = n / (e[e.scrollSize[t]] - o);
      "progress" === e.config.barType
        ? (i[e.trackSize[t]] = Math.floor(s * a))
        : ((i[e.trackSize[t]] = Math.max(
            Math.floor(r * o),
            e.config.minBarSize
          )),
          (i[e.trackPos[t]] = Math.floor((s - i[e.trackSize[t]]) * a))),
        l(function () {
          c(e.bars[t].node, i);
        });
    }),
    (u.prototype.updateScrollBars = function () {
      o(
        this.bars,
        function (t, e) {
          this.updateScrollBar(t);
        },
        this
      );
    }),
    (u.prototype.destroy = function () {
      var t = this;
      if (t.initialised) {
        for (
          r(t.container, "mouseenter", t.events.mouseenter),
            r(window, "resize", t.events.debounce),
            t.container.classList.remove(t.config.visibleClass),
            t.container.classList.remove(t.config.containerClass);
          t.content.firstChild;

        )
          t.container.appendChild(t.content.firstChild);
        o(t.tracks, function (e, i) {
          t.container.removeChild(i.node),
            t.container.classList.remove("mb-scroll-" + e);
        }),
          t.container.removeChild(t.content),
          (t.bars = {
            x: {},
            y: {},
          }),
          (t.tracks = {
            x: {},
            y: {},
          }),
          (t.content = null),
          (t.initialised = !1);
      }
    }),
    (t.MiniBar = u);
})(this);
