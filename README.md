# Inventory Application

## Overview

This site is my submission for the The Odin Project's (TOP)"Inventory Application" assignment. (https://www.theodinproject.com/lessons/nodejs-inventory-application)

The site is an inventory management tool styled as an online gallery. Basic users can view information on paintings and artists, and users with correct credentials can create, update, and delete paintings and artists from the database.

The live site can be viewed at https://virtual-gallery-morning-fire-4767.fly.dev/catalog.

## Technologies

This site is built using Express, Node.js, and MongoDB. Pages are rendered in the Pug templating engine, and user authentication is handled with Passport.js.

## Challenges/To-dos

This was my first independent project utilizing Express, Node.js, and MongoDB, so there was more room to explore beyond what had been covered in tutorial projects. I decided early on that since it had been so long since I'd worked on style-heavy project, and wanted a change of pace from commerce-focused projects, I'd create a page themed around art with emphasis on images. This also meant working through the challenge of adding files to POST routes along with typical form inputs.

As of this writing I still need to resolve the following:
- When testing using the site from another computer, I found that creating a new painting does not save the associated image, or at least it is not visible anywhere except for from the computer that did the upload. I need to test this further and work out an alternative to let the curator's newly-added pieces be fully visible.

## Credits
The site is modeled after the official website of The National Gallery of the UK. All images used are available for free download, and information on artists and paintings is abbreviated from details given on that site. https://www.nationalgallery.org.uk/