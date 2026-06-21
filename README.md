# 💈 Gabbard's Barbershop — Website

A modern, mobile-responsive marketing website for **Gabbard's Barbershop**, a
family-owned barber shop in New York. Built as a fast, self-contained static
site with no build step required.

## ✨ Features

- **Black / white / gold** barbershop aesthetic with bold, urban typography
- **Single-page layout** with smooth-scrolling navigation and a sticky top nav bar
- Sections: Hero, About, Services & Pricing, Gallery, Booking, Testimonials,
  Location (map embed), Footer
- **Fully responsive / mobile-first** with a slide-in mobile menu
- Sticky **"Book Now"** button on mobile
- Real barbershop **photography** in the hero, About section, and gallery
- Scroll-reveal animations, hover effects, animated marquee, and fade transitions
- **Booking request form** that emails submissions to the shop (via FormSubmit — no backend needed)
- **SEO optimized** for "barber shop in New York" — meta tags, Open Graph,
  and `LocalBusiness` / `HairSalon` structured data (JSON-LD)
- Respects `prefers-reduced-motion`

## 📁 Structure

```
.
├── index.html          # Page markup and content
├── css/
│   └── styles.css      # All styling (theme, layout, animations, responsive)
├── js/
│   └── main.js         # Nav, mobile menu, scroll reveal, sticky button, form
├── assets/
│   ├── favicon.svg     # Barber-pole favicon
│   └── img/            # Barbershop photography (hero, about, gallery)
└── README.md
```

## 🚀 Running locally

No build step needed — it's plain HTML/CSS/JS. Either open `index.html`
directly, or serve the folder:

```bash
# Python
python3 -m http.server 8000
# then visit http://localhost:8000

# or Node
npx serve .
```

## 🛠️ Customizing

All placeholder content is easy to swap:

| What | Where |
| --- | --- |
| Phone number | Search `(555) 555-5555` / `+15555555555` in `index.html` |
| Address | `Location` section + footer + JSON-LD in `index.html` |
| Hours | `Booking`, `Location`, and footer sections |
| Services & pricing | `Services` section cards in `index.html` |
| Social links | Footer `socials` in `index.html` |
| Map | `Location` section `<iframe>` `src` in `index.html` |
| Colors | CSS variables at the top of `css/styles.css` (`--gold`, `--black`, …) |
| Photos | Swap the files in `assets/img/` (keep the names) or repoint the `.art-*` / `.hero-bg` / `.about-art-inner` rules in `css/styles.css` |

### Booking form → email

The form validates input, then POSTs the request to [FormSubmit](https://formsubmit.co/),
which emails it to the shop. No server required.

- **Change the destination address:** edit `BOOKING_EMAIL` near the top of the
  booking handler in `js/main.js`.
- **First-time activation:** the first submission to a new address triggers a
  one-time confirmation email from FormSubmit — click the link in it once, and
  every later submission is delivered automatically.
- **Hide the address from the page (optional):** after activating, FormSubmit
  gives a random alias you can use in place of the raw email so bots can't
  scrape it.

## 🖼️ Photo credits & licensing

The photographs in `assets/img/` are royalty-free barbershop stock images
sourced from the free, open [`codewithsadee/barber`](https://github.com/codewithsadee/barber)
template (stated by its author as free to use). They're great for launching,
but for a real shop you'll get the most mileage from **photos of your own
barbers, cuts, and space** — just drop replacements into `assets/img/` using
the same filenames. Before any commercial launch, confirm you have the rights
to every image you ship.

---

_Placeholder phone numbers, address, and reviews are included for demo purposes —
replace them with real business details before going live._
