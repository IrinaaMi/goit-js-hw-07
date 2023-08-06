import { galleryItems } from "./gallery-items.js";

// Change code below this line

console.log(galleryItems);
const container = document.querySelector(".gallery");

function createMarkup(arr) {
    return arr
        .map(
            ({ preview, original, description }) =>
            `<li class="gallery__item">
        <a class="gallery__link" href="${original}" data-lightbox="gallery">
           <img class="gallery__image" src="${preview}" alt="${description}" />
        </a>
     </li>`
        )
        .join("");
}
container.insertAdjacentHTML("beforeend", createMarkup(galleryItems));
container.addEventListener("click", function(evt) {
    evt.preventDefault();
    const target = evt.target;
    const lightbox = new SimpleLightbox(".gallery a", {
        captions: true,
        captionsData: "alt",
        captionDelay: 250,
    });

    if (target.classList.contains("gallery__image")) {
        const currentItem = target.closest(".gallery__item");
        const { source } = target.dataset;
        const item = galleryItems.find((item) => item.original === source);

        const escapeWindow = (escEvent) => {
            if (escEvent.key === "Escape") {
                lightbox.close();
                document.removeEventListener("keydown", escapeWindow);
            }
        };
        document.addEventListener("keydown", escapeWindow);
    }
});