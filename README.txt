PLACEHOLDER IMAGES
==================

This folder is where your real images go. The site currently uses styled
placeholder blocks (the boxes that say "Image goes here"). To use a real
photo, drop the file in this folder and point the placeholder at it.

HOW TO SWAP A PLACEHOLDER FOR A REAL IMAGE
------------------------------------------
Find a block like this in the HTML:

    <div class="media-ph" data-reveal>
      <span class="media-ph__label"> ... Image goes here ... </span>
    </div>

Replace the whole block with:

    <img class="media-ph" src="assets/images/your-photo.jpg"
         alt="Short description of the photo" loading="lazy" />

The image will keep the same rounded corners and sizing.

RECOMMENDED IMAGES
------------------
- og-image.jpg        1200 x 630   (social share preview, used by every page)
- about-team.jpg      square or 4:3 (about page story photo)
- creator-name.jpg    3:4 portrait  (future talent cards)

TIPS
----
- Keep files reasonably small (aim for under 300 KB each) for fast loading.
- JPG for photos, PNG for graphics with transparency, SVG for logos.
- Always fill in the alt text, it helps accessibility and SEO.
