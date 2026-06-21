/* =========================================================
   Gabbard's Barbershop — Interactions
   ========================================================= */
(function () {
  "use strict";

  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const stickyBook = document.getElementById("stickyBook");

  /* ---------- Navbar background on scroll + sticky book button ---------- */
  function onScroll() {
    const y = window.scrollY;
    navbar.classList.toggle("scrolled", y > 40);
    // Show sticky mobile "Book Now" after leaving the hero
    if (stickyBook) {
      stickyBook.classList.toggle("show", y > window.innerHeight * 0.6);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu toggle ---------- */
  function closeMenu() {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  navToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when a link is tapped
  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  // Close menu on outside click
  document.addEventListener("click", function (e) {
    if (
      navLinks.classList.contains("open") &&
      !navLinks.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // Close menu on Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            // small stagger for groups
            const delay = Math.min(i * 60, 240);
            setTimeout(function () {
              entry.target.classList.add("visible");
            }, delay);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* ---------- Booking form (emails submissions via FormSubmit) ---------- */
  // Appointment requests are emailed to this address. FormSubmit sends a
  // one-time activation email here on the first submission — confirm it once
  // and every later submission is delivered automatically. To change the
  // destination, update this address (and confirm the new activation email).
  var BOOKING_EMAIL = "therealnatboss@gmail.com";

  const form = document.getElementById("bookingForm");
  const note = document.getElementById("formNote");

  if (form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const defaultBtnText = submitBtn ? submitBtn.textContent : "";

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      note.classList.remove("error");

      // Look up fields by id (avoid `form.name`, which resolves to the
      // form's own name property rather than the name input).
      const name = document.getElementById("bf-name").value.trim();
      const phone = document.getElementById("bf-phone").value.trim();
      const service = document.getElementById("bf-service").value;
      const time = document.getElementById("bf-time").value;

      if (!name || !phone || !service) {
        note.textContent = "Please fill in your name, phone, and service.";
        note.classList.add("error");
        return;
      }

      // Basic phone sanity check (at least 7 digits)
      const digits = phone.replace(/\D/g, "");
      if (digits.length < 7) {
        note.textContent = "Please enter a valid phone number.";
        note.classList.add("error");
        return;
      }

      // Send the request to the shop's inbox via FormSubmit (no backend needed).
      note.textContent = "Sending your request…";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }

      fetch("https://formsubmit.co/ajax/" + encodeURIComponent(BOOKING_EMAIL), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          _subject: "New appointment request — Gabbard's Barbershop",
          _template: "table",
          _captcha: "false",
          Name: name,
          Phone: phone,
          Service: service,
          "Preferred time": time || "Not specified"
        })
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Request failed (" + res.status + ")");
          return res.json();
        })
        .then(function () {
          note.classList.remove("error");
          note.textContent =
            "Thanks, " + name + "! Your request was sent — we'll call you to confirm your " +
            service + " appointment.";
          form.reset();
        })
        .catch(function () {
          note.classList.add("error");
          note.textContent =
            "Sorry — we couldn't send that. Please call us at (555) 555-5555.";
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = defaultBtnText;
          }
        });
    });
  }

  /* ---------- Current year in footer ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
