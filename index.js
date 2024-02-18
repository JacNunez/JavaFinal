class Card {
    constructor(suit, rank) {
        this.suit = suit; // Suit of the card, (Hearts, Diamonds, etc.)
        this.rank = rank; // Rank of the card, (2, 3, Jack, King, etc.)
    }
}

class Deck {
    constructor() {
        this.cards = [];
        // Initialize the deck with 52 cards. (4 suits with 13 ranks each)
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

        // Populate the deck with all possible cards,
        for (let suit of suits) {
            for (let rank of ranks) {
                this.cards.push(new Card(suit, rank));
            }
        }
        this.shuffle(); // Shuffle the deck before dealing.
    }

    shuffle() {
        // Shuffle the cards using Fisher-Yates algorithm.
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    deal() {
        // Deal a card from the top of the deck,
        return this.cards.shift();
    }
}

class Player {
    constructor(name) {
        this.name = name; // Name of the player.
        this.hand = []; // Cards in the player's hand.
        this.points = 0; // Points earned by the player.
    }

    playCard() {
        // Play a card from the top of the player's hand.
        return this.hand.pop();
    }

    receiveCard(card) {
        // Receive a card and add it to the top of the player's hand.
        this.hand.unshift(card);
    }
}

class WarGame {
    constructor() {
        this.deck = new Deck(); // Initialize a new deck.
        this.players = [new Player('Player 1'), new Player('Player 2')]; // Create two players.
        this.dealCards(); // Deal cards to players.
    }

    dealCards() {
        // Deal 26 cards to each player.
        for (let i = 0; i < 26; i++) {
            for (let player of this.players) {
                player.receiveCard(this.deck.deal());
            }
        }
    }

    playGame() {
        // Play the game.
        for (let i = 0; i < 26; i++) {
            console.log(`Round ${i + 1}:`);

            // Play a single round of the game.
            const cardsInPlay = this.players.map(player => player.playCard()); // Players play a card.
            const values = cardsInPlay.map(card => this.getCardValue(card)); // Get values of played cards.

            const winnerIndex = values.indexOf(Math.max(...values)); // Index of the winner.
            if (values[0] === values[1]) {
                console.log("It's a tie!"); // Display tie message if values are equal.
            } else {
                this.players[winnerIndex].points++; // Increment winner's points.
                console.log(`${this.players[winnerIndex].name} wins this round!`); // Display round winner.
            }
        }

        // Determine the winner based on points.
        const winner = this.players[0].points > this.players[1].points ? this.players[0] : this.players[1];
        console.log(`Game over! ${winner.name} wins with ${winner.points} points!`);
    }

    getCardValue(card) {
        // Assign numerical value to each card rank.
        const cardValues = {
            '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'Jack': 11, 'Queen': 12, 'King': 13, 'Ace': 14
        };
        return cardValues[card.rank];
    }
}

const war = new WarGame(); // Create a new instance of the WarGame.
war.playGame(); // start the game
