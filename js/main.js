/** Variables **/

/**
 * Array that will store images fetched from Google Custom Search API
 * @type {Array}
 */
let fetchedImages = [];

/**
 * Keeping track of the total number of images created
 * @type {Number}
 */
let numberOfImages = 0;

/**
 * Current index of lightbox thumbnail for displaying purposes
 * @type {Number}
 */
let currentIndex = 0;

/**
 * Thumbnail gallery
 * @type {document.Element}
 */
const thumbnails = document.getElementById("thumbnails");

/**
 * Lightbox view when clicking on a thumbnail image
 * @type {document.Element}
 */
const lightbox = document.getElementById("lightbox");

/**
 * Lightbox view - image being shown
 * @type {document.Element}
 */
const lightboxImage = document.getElementById("image");

/**
 * Lightbox view - title of image being shown
 * @type {document.Element}
 */
const lightboxImageTitle = document.getElementById("title");

/**
 * Lightbox view - previous image button
 * @type {document.Element}
 */
const lightboxPrevious = document.getElementById("previous");

/**
 * Lightbox view - next image button
 * @type {document.Element}
 */
const lightboxNext = document.getElementById("next");

/**
 * Lightbox view - close view button
 * @type {document.Element}
 */
const lightboxClose = document.getElementById("close");
/** Loader **/

/**
 * Show loader animation of images
 * @param  {document.Element} targetElement
 */
const showLoader = targetElement => {
  if (targetElement) {
    const loader = document.createElement("div");
    loader.className = "loader";
    targetElement.appendChild(loader);
  }
};

/**
 * Hide loader animation of images
 * @param  {document.Element} targetElement
 */
const hideLoader = targetElement => {
  if (targetElement) {
    const loader = document.querySelector(
      `.thumbnail[data-id="${targetElement.getAttribute(
        "data-id"
      )}"] div.loader`
    );
    targetElement.removeChild(loader);
  }
};

/** Thumbnails **/

/**
 * Fetches images using url and then calls initialization methods
 */
const fetchAllImages = () => {
  const url = '/data/photos.json';
  fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    fetchedImages = fetchedImages.concat(data);
      if (data) {
        var keys = Object.keys(data);
        keys.forEach(key => {
          const item = data[key];
          loadThumbnail(numberOfImages);
          loadThumbnailImage(item, numberOfImages);
          numberOfImages++;
        });
      }
  })
  .catch(err => {
    console.log(err);
  });
};

/**
 * Create thumbnail DOM element based off ID
 * @param  {integer} id
 */
const loadThumbnail = id => {
  const thumbnail = document.createElement("div");
  thumbnail.className = "thumbnail";
  thumbnail.setAttribute("data-id", id);
  thumbnails.appendChild(thumbnail);
};

/**
 * Load images
 * @param  {[type]} image
 * @param  {[type]} id
 */
const loadThumbnailImage = (image, id) => {
  const thumbnail = document.querySelector(`.thumbnail[data-id="${id}"]`);
  showLoader(thumbnail);
  // The Image() constructor creates a new HTMLImageElement instance.
  // It is functionally equivalent to document.createElement('img').
  let imageContainer = new Image();
  // The onload property of the GlobalEventHandlers mixin is an event handler for the load event of a Window, XMLHttpRequest, <img> element, etc., which fires when the resource has loaded.
  imageContainer.onload = () => {
    // The Node.appendChild() method adds a node to the end of the list of children of a specified parent node.
    thumbnail.appendChild(imageContainer);
    hideLoader(thumbnail);
  };
  imageContainer.src = image.urls.small;
  if (image.description != null) {
    imageContainer.alt = image.description;
  } else {
    imageContainer.alt = 'Gallery Image';
  }
  imageContainer.onclick = () => loadLightboxView(id);
};

/** Lightbox View */

/**
 * Load lightbox view with fetched image
 * @param  {Integer} index
 */
const loadLightboxView = index => {
  currentIndex = index;
  lightbox.classList.remove("hide");
  lightboxImage.src = fetchedImages[index].urls.full;
  if (fetchedImages[index].description != null) {
    lightboxImageTitle.innerHTML = fetchedImages[index].description;
  } else {
    lightboxImageTitle.innerHTML = 'Gallery Image';
  }
};

/**
 * Load lightbox buttons
 */
const loadLightboxButtons = () => {
  lightboxPrevious.onclick = () => navigateLightboxView(-1);
  lightboxNext.onclick = () => navigateLightboxView(1);
  lightboxClose.onclick = () => closeLightboxView();
};

/**
 * Changes lightbox view to show next or previous image
 * @param  {integer} direction
 */
const navigateLightboxView = direction => {
  if (direction !== -1 && direction !== 1) {
    return;
  }
  lightboxImage.src = "";
  currentIndex += direction;
  if (currentIndex > fetchedImages.length - 1) {
    currentIndex = 0;
  }
  if (currentIndex < 0) {
    currentIndex = fetchedImages.length - 1;
  }
  loadLightboxView(currentIndex);
};

/**
 * Closes the lightbox view
 */
const closeLightboxView = () => {
  lightbox.classList.add("hide");
  lightboxImage.src = "";
  lightboxImageTitle.innerHTML = "";
};

/**
 * Fetch images from JSON file
 */
fetchAllImages();

/**
 * Load lightbox buttons
 */
loadLightboxButtons();