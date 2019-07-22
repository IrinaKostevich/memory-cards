import { pickRandomItems, shuffleItems } from './common.js';

const SUBJECTS = [
    'bath',
    'beer',
    'birthday-cake',
    'ambulance',
    'anchor',
    'dog',
    'award',
    'baby-carriage',
    'tree',
    'bomb',
    'bone',
    'box-open',
    'bus',
    'carrot',
    'cat',
    'cloud-moon',
    'crow',
    'phone',
    'fish',
    'sun',
    'glass-cheers',
    'ice-cream',
    'pizza-slice'
];

let counter = 0; 

export class MemoryCardService {
    constructor() {}

    createCard(subject) {
        counter += 1;
        const cardId = counter;
    
        return {
            subject,
            id: cardId,
            isFlipped: false,
            isMatched: false
        };
    }

    createDeck(cardsNumber) {
        const randomSubjects = pickRandomItems(SUBJECTS, cardsNumber);
        const subjectPairs = [...randomSubjects, ...randomSubjects];

        const cards = subjectPairs.map(subject => this.createCard(subject));
        const shuffledCards = shuffleItems(cards);

        return shuffledCards;
    }

    tryToFlipCard(targetCardId, deck) {
        let totalFlipped = 0;
        let totalMatched = 0;

        for (const card of deck) {
            if (card.isFlipped) totalFlipped += 1;
            if (card.isMatched) totalMatched += 1;
        }

        if (totalFlipped - totalMatched === 2) {
            deck.forEach((card) => {
                if (!card.isMatched) {
                    card.isFlipped = false;
                }
            });
        }

        if (totalFlipped - totalMatched < 2) {
            const targetCard = deck.find(card => card.id === Number(targetCardId));
            targetCard.isFlipped = true;
        }
    }
    
    checkCardMatch(deck) {
        const flippedPair = deck.filter((card) => {
            if (card.isFlipped && !card.isMatched) {
                return card;
            }
        });

        if (flippedPair.length !== 2) return;

        if (flippedPair[0].subject === flippedPair[1].subject) {
            flippedPair.forEach(card => card.isMatched = true);
        }
    }
}
