import { galleryItems } from "./gallery-items.js";
// // // // Change code below this line
const container = document.querySelector(".gallery");

function createMarkup(arr) {
    return arr
        .map(
            ({ preview, original, description }) => `
        <li class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}">
            </a>
        </li>`
        )
        .join("");
}

container.insertAdjacentHTML("beforeend", createMarkup(galleryItems));

container.addEventListener("click", function(evt) {
    evt.preventDefault();
    const target = evt.target;

    if (target.classList.contains("gallery__image")) {
        const currentItem = target.closest(".gallery__item");
        const { source } = target.dataset;
        const item = galleryItems.find((item) => item.original === source);

        const instance = basicLightbox.create(`
                <img src="${item.original}" alt="${item.description}" width="800" height="600">
    
        `);
        instance.show();

        const escapeWindow = (escEvent) => {
            if (escEvent.key === "Escape") {
                instance.close();
                document.removeEventListener("keydown", escapeWindow);
            }
        };
        document.addEventListener("keydown", escapeWindow);
    }
});