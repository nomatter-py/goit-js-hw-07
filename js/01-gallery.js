import { galleryItems } from './gallery-items.js';


let refs = {
    gallery: document.querySelector('.gallery'),
};

let blInstance;

createMarkup(galleryItems);

refs.gallery.addEventListener('click', onGalleryClick);

let onKeypressEvent = function(event) {
    event.preventDefault();
    if (event.code === 'Enter') blInstance.close(() => document.removeEventListener('keydown', onKeypressEvent));
}

function onGalleryClick(e) {

    if (e.target.nodeName !== 'IMG') {
        return;
    }
    
    e.preventDefault();

    blInstance = basicLightbox.create(`
        <img src="${e.target.dataset.source}" width="800" height="600">
    `);

    blInstance.show();

    document.addEventListener('keydown', onKeypressEvent);

}





function createMarkup(galleryItems) {

    let markup = galleryItems.map(el => {

        return `<a class="gallery__link" href="${el.original}"><img class="gallery__image" data-source=${el.original} src=${el.preview} alt=${el.description}></a>`;
      
    }).join(' ');

    refs.gallery.innerHTML = markup;
}
