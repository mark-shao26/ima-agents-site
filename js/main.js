/* ==========================================================
   站点交互：移动端菜单 / 导航高亮 / 滚动入场动画 / 年份
   无依赖，原生 JS
   ========================================================== */
(function () {
  "use strict";

  var I18N = window.SiteI18n || null;
  function tt(key, fallback) {
    return I18N ? I18N.t(key) : fallback;
  }

  /* 移动端菜单 */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("navMenu");

  toggle.setAttribute("aria-label", tt("nav.menuOpen", "打开菜单"));
  toggle.addEventListener("click", function () {
    var open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? tt("nav.menuClose", "关闭菜单") : tt("nav.menuOpen", "打开菜单"));
  });

  /* 点击菜单项后自动收起（移动端） */
  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  /* 语言切换后同步菜单按钮的无障碍标签 */
  document.addEventListener("site:langchange", function () {
    var open = menu.classList.contains("is-open");
    toggle.setAttribute("aria-label", open ? tt("nav.menuClose", "关闭菜单") : tt("nav.menuOpen", "打开菜单"));
  });

  /* 当前区块的导航高亮 */
  var navLinks = menu.querySelectorAll('a[href^="#"]');
  var sections = Array.prototype.map.call(navLinks, function (a) {
    return document.querySelector(a.getAttribute("href"));
  }).filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (a) {
            a.classList.toggle(
              "active",
              a.getAttribute("href") === "#" + entry.target.id
            );
          });
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });

    sections.forEach(function (s) { navObserver.observe(s); });
  }

  /* 滚动入场动画 */
  var revealEls = document.querySelectorAll(
    ".card, .agent, .faq__item, .hero__stats li, .panel, .step, .answer-flow, .kb-card, .contact__single, .section__title"
  );
  revealEls.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Agent 长条行手风琴展开 */
  document.querySelectorAll(".agent__row").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var agent = btn.closest(".agent");
      var open = agent.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  /* Hero 标题逐字浮现（语言切换后重建） */
  function splitHeroTitle() {
    if (reducedMotion) return;
    var h1 = document.querySelector(".hero__title");
    if (!h1) return;

    var count = 0;
    function wrapChars(node) {
      var frag = document.createDocumentFragment();
      Array.prototype.forEach.call(node.childNodes, function (child) {
        if (child.nodeType === 3) {
          var text = child.textContent;
          for (var i = 0; i < text.length; i++) {
            var ch = text[i];
            if (ch === " " || ch === "\n") {
              frag.appendChild(document.createTextNode(ch));
            } else {
              var sp = document.createElement("span");
              sp.className = "char";
              sp.style.setProperty("--i", String(count++));
              sp.textContent = ch;
              frag.appendChild(sp);
            }
          }
        } else if (child.nodeType === 1) {
          var clone = child.cloneNode(false);
          clone.appendChild(wrapChars(child));
          frag.appendChild(clone);
        }
      });
      return frag;
    }

    var fresh = h1.cloneNode(false);
    fresh.classList.add("is-split");
    fresh.appendChild(wrapChars(h1));
    h1.parentNode.replaceChild(fresh, h1);
  }
  splitHeroTitle();
  document.addEventListener("site:langchange", splitHeroTitle);

  /* 鼠标跟随光晕（lerp 平滑） */
  var glow = document.getElementById("cursorGlow");
  if (glow && window.matchMedia("(pointer: fine)").matches) {
    var tx = -999, ty = -999, cx = -999, cy = -999;
    var shown = false;

    window.addEventListener("mousemove", function (e) {
      tx = e.clientX;
      ty = e.clientY;
      if (!shown) {
        shown = true;
        glow.classList.add("is-on");
        cx = tx; cy = ty;
      }
    });

    (function follow() {
      cx += (tx - cx) * (reducedMotion ? 1 : 0.12);
      cy += (ty - cy) * (reducedMotion ? 1 : 0.12);
      glow.style.transform = "translate(" + (cx - 220) + "px," + (cy - 220) + "px)";
      requestAnimationFrame(follow);
    })();

    document.addEventListener("mouseleave", function () {
      glow.classList.remove("is-on");
      shown = false;
    });
  }

  /* 页脚年份自动更新 */
  document.getElementById("year").textContent = String(new Date().getFullYear());

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* 回到顶部：平滑滚动（含品牌 Logo 与页脚链接） */
  document.querySelectorAll('a[href="#top"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
      history.replaceState(null, "", "#top");
    });
  });

  /* Hero 数字滚动动画 */
  var statNums = document.querySelectorAll(".hero__stats strong");
  function countUp(el) {
    var text = el.textContent;
    var m = text.match(/^(\d+)(.*)$/);
    if (!m) return;
    var target = parseInt(m[1], 10);
    var suffix = m[2];
    var dur = 1200;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (!reducedMotion && "IntersectionObserver" in window && statNums.length) {
    var statObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          countUp(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statNums.forEach(function (el) { statObserver.observe(el); });
  }

  /* Hero 粒子网络背景 */
  var canvas = document.getElementById("heroCanvas");
  if (canvas && !reducedMotion) {
    var ctx = canvas.getContext("2d");
    var particles = [];
    var mouse = { x: -9999, y: -9999 };
    var LINK_DIST = 130;
    var running = true;

    function resize() {
      var hero = canvas.parentElement;
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
      initParticles();
    }

    function initParticles() {
      var count = Math.min(90, Math.floor((canvas.width * canvas.height) / 16000));
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.6 + 0.6
        });
      }
    }

    function draw() {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        /* 鼠标附近粒子轻微避让 */
        var dxm = p.x - mouse.x;
        var dym = p.y - mouse.y;
        var dm = Math.sqrt(dxm * dxm + dym * dym);
        if (dm < 100 && dm > 0) {
          p.x += (dxm / dm) * 0.6;
          p.y += (dym / dm) * 0.6;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(200, 150, 220, 0.55)";
        ctx.fill();
      }

      for (var a = 0; a < particles.length; a++) {
        for (var b = a + 1; b < particles.length; b++) {
          var dx = particles[a].x - particles[b].x;
          var dy = particles[a].y - particles[b].y;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK_DIST) {
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.strokeStyle = "rgba(176, 108, 192, " + (0.22 * (1 - d / LINK_DIST)) + ")";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    }

    canvas.parentElement.addEventListener("mousemove", function (e) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    canvas.parentElement.addEventListener("mouseleave", function () {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    /* 滚出视口时暂停，节省性能 */
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        running = entries[0].isIntersecting;
        if (running) draw();
      }).observe(canvas);
    }

    window.addEventListener("resize", resize);
    resize();
    draw();
  }

  /* 模拟对话演示 */
  var chatBody = document.getElementById("chatBody");
  var chatPlay = document.getElementById("chatPlay");
  if (chatBody && chatPlay) {
    function demoData() {
      return I18N ? I18N.demo() : null;
    }

    var timers = [];
    function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
    function clearDemo() {
      timers.forEach(clearTimeout);
      timers = [];
      chatBody.innerHTML = "";
    }

    function typeText(el, text, done) {
      if (reducedMotion) { el.textContent = text; done(); return; }
      var i = 0;
      var cursor = document.createElement("span");
      cursor.className = "msg__cursor";
      el.after(cursor);
      (function step() {
        el.textContent = text.slice(0, ++i);
        if (i < text.length) {
          timers.push(setTimeout(step, 22));
        } else {
          cursor.remove();
          done();
        }
      })();
    }

    function playDemo() {
      var DEMO = demoData();
      if (!DEMO) return;
      clearDemo();
      chatPlay.textContent = tt("demo.replay", "↻ 重新播放");

      /* 用户提问 */
      var userMsg = document.createElement("div");
      userMsg.className = "msg msg--user";
      var userP = document.createElement("p");
      userMsg.appendChild(userP);
      chatBody.appendChild(userMsg);

      typeText(userP, DEMO.user, function () {
        /* 思考中 */
        var typing = document.createElement("div");
        typing.className = "chat__typing";
        typing.innerHTML = "<i></i><i></i><i></i>";
        later(function () { chatBody.appendChild(typing); }, reducedMotion ? 0 : 400);

        /* AI 三段式回答 */
        later(function () {
          typing.remove();
          var aiMsg = document.createElement("div");
          aiMsg.className = "msg msg--ai";
          chatBody.appendChild(aiMsg);

          DEMO.rows.forEach(function (row, idx) {
            later(function () {
              var div = document.createElement("div");
              div.className = "msg__row";
              var label = document.createElement("span");
              label.className = "msg__label";
              label.textContent = "▍" + row.label;
              div.appendChild(label);
              if (row.tag) {
                var tag = document.createElement("span");
                tag.className = "tag tag--" + row.tag[0];
                tag.textContent = row.tag[1];
                label.appendChild(tag);
              }
              var p = document.createElement("p");
              if (row.conclusion) p.className = "msg__conclusion";
              p.textContent = row.text;
              div.appendChild(p);
              aiMsg.appendChild(div);
            }, reducedMotion ? 0 : idx * 700);
          });
        }, reducedMotion ? 0 : 1600);
      });
    }

    chatPlay.addEventListener("click", playDemo);

    /* 语言切换后清空对话并重置按钮 */
    document.addEventListener("site:langchange", function () {
      clearDemo();
      chatPlay.textContent = tt("demo.play", "▶ 播放演示");
    });

    /* 首次滚动到演示区时自动播放一次 */
    if ("IntersectionObserver" in window) {
      var played = false;
      new IntersectionObserver(function (entries, obs) {
        if (entries[0].isIntersecting && !played) {
          played = true;
          playDemo();
          obs.disconnect();
        }
      }, { threshold: 0.35 }).observe(document.getElementById("demoChat"));
    }
  }
})();
