# Redfin UXE Gallery Challenge
We would like you to build an application to display images in a gallery.


## App Requirements / Mini-Spec
The application must:

- Show photos in a grid view on the initial load
- Support a fullscreen mode
    - When the user clicks on an image, it will show the entire image fullscreen
    - When the user clicks on a "close" button or the background, it will close and return to the grid view
- Works in Chrome; we will not be evaluating other browsers for compatibility
- Support different viewports such as phone/tablet and notebook/desktop viewports
- Query an API for a set of photos
    - Sample data is provided in the attached photos.json file, but you must access it via a HTTP request as if it was an API endpoint
- Use only vanilla JavaScript; we won't accept solutions that use frameworks like React, Vue, etc. or libraries like jQuery, Axios, etc.
    - ES6/ESNext and any required polyfills are perfectly acceptable, but not required

Example mockups are provided in the `examples` folder of the challenge download; _you do not need to match them precisely_, but be prepared to explain the reasoning behind your design decisions!


## Quickstart with Python SimpleHTTPServer

1. Download the [template code][code] provided and unzip anywhere, such as `~/code/myfolder`.
2. From the command line:

	      cd ~/code/myfolder
	      python -m SimpleHTTPServer 8887

3. Open `http://localhost:8887/index.html` and
`http://localhost:8887/data/photos.json` in your browser. You should see a “Hello, World!” page and JSON data.

##DEMO
https://drive.google.com/file/d/1UPyZKTvZlgrXzbH9b1Abs9m_4qvn8bf3/view

## Enhancements For Consideration
1. Pagination on the grid view for thumbnail, limiting number of images displayed on initial page load to improve load times.
2. Consider lazy load function to improve page load times.
3. Consider adding a preloader to lightbox(detail view) - some of these images are rather large and take a few seconds to load in.
4. Social Share Tags on the lightbox to allow users to share specific images.
5. Include additional support for other types of media, including video (YouTube, Vimeo, etc), and virtual tours for homes.
6. Could use front-end frameworks like react which could segregate code into separate components and lead to faster pre-rendering.

## Main Features
* Fully responsive.
* Animated thumbnails.
* Previous and Next buttons for the lightbox so users can cycle through all the images without having to close the lightbox each time.
* Image captions on the lightbox to provide a brief description of each image.

## Design Challenges
* Used fetch API to load image data from the JSON file
* Used es6 and closures to keep track of image id for prev/next image functionality
* Used SASS to consolidate the css used. Set up the SASS watch in the css folder by running: sass --watch css/sass
* Used vanilla.js only for rendering