# Anaiah Enterprise Website

Welcome to the Anaiah Enterprise website repository! This is a premium, single-page static website designed for Anaiah Enterprise, a construction and building company based in Mongu, Zambia.

## 🌟 Overview

The website is designed with a modern luxury aesthetic, featuring a deep navy and gold color palette, high-quality imagery, and smooth scroll reveal animations. It showcases the company's services, their commitment to quality, and provides an easy way for potential clients to get in touch.

## 🚀 Features

- **Responsive Design:** Looks great on desktop, tablet, and mobile devices.
- **Scroll Animations:** Elements fade and slide in smoothly as you scroll down the page.
- **Service Showcase:** Highlights key services (House Planning, Renovating, Roof Designing, Painting) with dedicated custom images.
- **WhatsApp Integration:** 
  - A dedicated WhatsApp contact card for instant messaging.
  - The contact form automatically compiles user inputs (Name, Phone, Email, Service, Message) and opens a pre-filled WhatsApp chat directly with the business.
- **No Build Step Required:** It's a pure HTML/CSS/JS static site. Just open `index.html` in your browser.

## 📁 Project Structure

- `index.html`: The main structural layout of the single-page website.
- `style.css`: All styling, CSS variables, typography, flex/grid layouts, and responsive media queries.
- `main.js`: Handles navbar scroll effects, mobile menu toggling, intersection observers for scroll animations, and the WhatsApp form submission logic.
- **Images:**
  - `hero.png`: The stunning luxury home background for the hero section.
  - `svc_planning.png`: Image for the House Planning service.
  - `svc_renovating.png`: Image for the Renovating service.
  - `svc_roofing.png`: Image for the Roof Designing service.
  - `svc_painting.png`: Image for the Painting service.

## 🎨 Design System

- **Colors:**
  - Primary Navy: `#0D1B3E` (and variations for backgrounds and cards)
  - Primary Gold: `#C9A84C` (used for highlights, buttons, and accents)
  - Text: `#FFFFFF` (white) and `#8899b8` (muted blue-grey)
- **Typography:**
  - Body Text: 'Outfit', sans-serif
  - Headings/Script: 'Playfair Display', serif

## 🛠️ How to Use

1. Download or clone this repository to your local machine.
2. Ensure all image files (`.png`), `index.html`, `style.css`, and `main.js` are in the same folder.
3. Double-click `index.html` to open it in your default web browser.

## 📞 Contact Configuration

The contact form is currently configured to send messages to the WhatsApp number: **+260 971 627 899**. 
To change this number, open `main.js` and update the `WA_NUMBER` constant at line 63.

---
*We Plan. We Design. We Build. - Anaiah Enterprise*
