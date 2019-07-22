export class App {
    constructor(document, memoryCardService) {
        if (!memoryCardService) throw new Error('memoryCardService is not provided.');
        if (!document) throw new Error('document is not provided.');

        this._document = document;
        this._memoryCardService = memoryCardService;
        this._deck = null;
    }

    start(cardsCount) {
        this._deck = this._memoryCardService.createDeck(cardsCount);
        const cardElements = this._createCardElements(this._deck);
        const cardsList = this._createCardsList(cardElements);

        const cardsContainer = this._document.querySelector('.js-cards-container');
        cardsContainer.append(cardsList);

        cardsContainer.addEventListener('click', this._onCardClick.bind(this));
    }

    _onCardClick(event) {
        const memoryCard = event.target.closest('memory-card');

        if (!memoryCard) return;

        this._memoryCardService.tryToFlipCard(memoryCard.dataset.id, this._deck);
        this._memoryCardService.checkCardMatch(this._deck);
        this._rerenderCards();
    }

    _rerenderCards() {
        const allCards = this._document.querySelectorAll('memory-card');

        for (const card of allCards) {
            const currentCardObject = this._deck.find(c => c.id === Number(card.dataset.id));
            card.flipped = currentCardObject.isFlipped;
            card.matched = currentCardObject.isMatched;
        }
    }

    _createCardElements(deck) {
        return deck.map((card) => {
            const cardElement = this._document.createElement('memory-card');
            cardElement.dataset.id = card.id;
            cardElement.subject = card.subject;
            cardElement.flipped = false;
            cardElement.matched = false;

            return cardElement;
        });
    }

    _createCardsList(cardElements) {
        const list = this._document.createElement('ul');
        list.classList.add('l-cards-list');

        list.append(...cardElements);

        return list;
    }
}