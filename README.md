# Anaiah Enterprise Website

Welcome to the Anaiah Enterprise website repository! This is a premium, single-page static website designed for Anaiah Enterprise, a construction and building company based in Mongu, Zambia.

## 🌟 Overview

The website is designed with a modern luxury aesthetic, featuring a deep navy and gold color palette, high-quality imagery, and smooth scroll reveal animations. It showcases the company's services, their commitment to quality, and provides an easy way for potential clients to get in touch.

## 🚀 Features

- **Responsive Design:** Looks great on desktop, tablet, and mobile devices.
- **Scroll Animations:** Elements fade and slide in smoothly as you scroll down the page.
- **Service Showcase:** Highlights key services (House Planning, Renovating, Roof Designing, Painting) with dedicated custom images.
- **Smart Contact System:**
  - **PHP Email Integration:** Server-side email delivery when PHP is available
  - **Automatic Fallback:** Falls back to mailto links if PHP is not configured
  - **WhatsApp Integration:** Opens pre-filled WhatsApp chat for instant messaging
- **No Build Step Required:** Works as static site with optional PHP enhancement

## 📁 Project Structure

- `index.html`: The main structural layout of the single-page website.
- `contact.php`: PHP backend for processing contact form submissions and sending emails.
- `style.css`: All styling, CSS variables, typography, flex/grid layouts, and responsive media queries.
- `main.js`: Handles navbar scroll effects, mobile menu toggling, intersection observers for scroll animations, and form validation.
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

### Basic Static Version (Always Works)
1. Download or clone this repository to your local machine.
2. Ensure all image files (`.png`), `index.html`, `style.css`, and `main.js` are in the same folder.
3. Double-click `index.html` to open it in your default web browser.
4. **Contact form automatically falls back to email client** if PHP is not available.

### Enhanced Version with PHP Email (Recommended)
To enable actual email delivery from the contact form:

#### Option 1: Local PHP Server
1. Install PHP on your system (download from php.net)
2. Navigate to the project folder in terminal/command prompt
3. Run: `php -S localhost:8000`
4. Open `http://localhost:8000` in your browser
5. **Contact form sends real emails** to marcusmutonyi44@gmail.com

#### Option 2: XAMPP/WAMP (Easiest for Windows)
1. Download and install XAMPP (https://www.apachefriends.org/)
2. Place the project folder in the `htdocs` directory
3. Start Apache server from the XAMPP control panel
4. Open `http://localhost/Anaiah Enterprise` in your browser
5. **Contact form sends real emails** to marcusmutonyi44@gmail.com

#### Option 3: Web Hosting (Production)
Upload all files to a PHP-enabled web hosting service like Hostinger, Bluehost, or SiteGround.

### Automatic Fallback
- **With PHP:** Form sends actual emails via server
- **Without PHP:** Form opens user's email client with pre-filled message
- **WhatsApp:** Always works regardless of PHP availability

## 📞 Contact Configuration

The contact form supports two contact methods:

### Email Configuration
- **Recipient:** mututwas@gmail.com
- **Method:** PHP mail() function for server-side email delivery
- **Form Action:** Submits to `contact.php` for processing

### WhatsApp Configuration
- **Number:** +260 971 627 899
- **Method:** Opens pre-filled WhatsApp chat in new tab

### Customization
To change contact details:
- **Email:** Update the `$recipient_email` variable in `contact.php`
- **WhatsApp:** Update the `WA_NUMBER` constant in `main.js` (line 63)

---
*We Plan. We Design. We Build. - Anaiah Enterprise*
