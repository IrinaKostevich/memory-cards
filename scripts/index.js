import { MemoryCardElement } from "./ui/memory-card.js";
import { MemoryCardService } from "./core/memory-card-service.js";
import { App } from "./ui/app.js";

customElements.define('memory-card', MemoryCardElement);

document.addEventListener('DOMContentLoaded', () => {
    const memoryCardService = new MemoryCardService();
    const app = new App(document, memoryCardService);

    app.start(15);
});
