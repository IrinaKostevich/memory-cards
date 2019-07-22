export class MemoryCardElement extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['subject', 'flipped', 'matched'];
    }

    get subject() {
        return this.getAttribute('subject');
    }

    set subject(value) {
        this.setAttribute('subject', value);
    }

    get flipped() {
        return this.hasAttribute('flipped');
    }

    set flipped(value) {
        if (value) {
            this.setAttribute('flipped', 'true');
        } else {
            this.removeAttribute('flipped');
        }
    }

    get matched() {
        return this.hasAttribute('matched');
    }

    set matched(value) {
        if (value) {
            this.setAttribute('matched', true);
        } else {
            this.removeAttribute('matched');
        }
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        this._update();
    }

    connectedCallback() {
        this._update();
    }

    _update() {
        this.innerHTML = `<div class="card"><i class="fas fa-${this.subject}"></i></div>`;
        const card = this.querySelector('.card');

        if (this.flipped) card.classList.add('card--flipped');
        if (this.matched) card.classList.add('card--matched');
    }
}
