# PlayGrid Media Website

A premium, multi page, animated website for **PlayGrid Media**, a talent management company.
Built with plain HTML, CSS, and JavaScript, so it uploads straight to Hostinger with no build step.

## Pages
- `index.html` , Home (animated hero, stats, brand marquee, teaser)
- `about.html` , About (story, philosophy, feature cards)
- `talent.html` , Our Talent (request form, future ready creator cards)
- `contact.html` , Contact (details, social links, contact form)
- `privacy-policy.html`, `cookies-policy.html`, `terms-and-conditions.html` , Legal pages (linked in the footer)

## File structure
```
playgrid-media/
  index.html
  about.html
  talent.html
  contact.html
  privacy-policy.html
  cookies-policy.html
  terms-and-conditions.html
  robots.txt
  sitemap.xml
  css/
    style.css
  js/
    main.js
  assets/
    favicon.svg
    images/         <- drop your photos here (see images/README.txt)
```

---

## 1. Deploy to Hostinger (File Manager)
1. Select everything **inside** the `playgrid-media` folder (all the HTML files plus the `css`, `js`, and `assets` folders).
2. Put them into a single `.zip` file.
3. In Hostinger, open **hPanel > Files > File Manager**.
4. Go to your site's `public_html` folder.
5. Upload the `.zip`, then right click it and choose **Extract**.
6. Make sure `index.html` sits directly inside `public_html` (not inside a sub folder).
7. Visit your domain. Done.

> If your domain is not `playgridmedia.com`, do a find and replace for `playgridmedia.com` across the HTML files (used in the canonical tags, social tags, and sitemap).

---

## 2. Make the contact forms actually deliver
Out of the box, both forms open the visitor's email app with the details filled in and addressed to `contact@playgridmedia.com`. That works immediately with no setup.

For a smoother experience (the message sends without leaving the site), connect a free form service:

**Using Web3Forms or Formspree**
1. Create a free account and get your form endpoint URL or access key.
2. Open `talent.html` and `contact.html`.
3. Find the `<form ... data-form ...>` tag and add your endpoint:
   ```html
   <form class="form" data-form data-endpoint="https://formspree.io/f/yourID" ...>
   ```
4. The script will POST to that endpoint and show a success message. If the request ever fails, it automatically falls back to the email method.

---

## 3. Add real creators to the Our Talent page
1. Open `talent.html`. Between the page hero and the request form there is a comment block with a ready to use card template.
2. To show a roster, add a `<section class="section">` containing a `<div class="grid grid--3 roster">`, then drop in one `.talent-card` per creator using the template in that comment.
3. Fill in the name, role, and social links, and drop a portrait photo into `assets/images/`.

The card styling is already built, so new creators will match the design automatically.

---

## 4. Easy customisations
- **Social links:** your Instagram (`instagram.com/playgridmedia`) and LinkedIn profile are already linked and shown as icons in the footer and on the contact page. To change them, search the HTML for those URLs.
- **Legal pages:** Privacy Policy, Cookies Policy, and Terms and Conditions are linked in the footer. The Terms page has a short comment in the Governing Law section where you can name the country or state whose laws apply.
- **Colours:** open `css/style.css` and edit the variables at the top under `:root` (for example `--accent` is the gold highlight, `--bg` is the background).
- **Fonts:** the display font is **Syne** and the body font is **Inter**, both loaded from Google Fonts in the `<head>` of each page.
- **Brand marquee:** edit the brand names inside the `.marquee__group` in `index.html`.
- **Stats:** change the `data-target` numbers in the stats section of `index.html`.

---

## Notes
- Fully responsive with a mobile hamburger menu.
- Animations respect the visitor's "reduce motion" system setting.
- Includes SEO basics: meta descriptions, Open Graph tags, structured data, `sitemap.xml`, and `robots.txt`.
- Writing style follows the brand rule: no long dashes anywhere, commas are used instead.
- Add an `assets/images/og-image.jpg` (1200 x 630) so links shared on social media show a preview image.
