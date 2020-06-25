
(()=>{

    interface Card {
        suit: string;
        card: number;
    }
    interface Deck {
        suits: string[];
        cards: number[];
        createCardPicker(this: Deck): () => Card;
    }

    let deck: Deck = {
        suits: ["hearts", "spades", "clubs", "diamonds"],
        cards: Array(52),
        createCardPicker: function(this: Deck) {

            // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
            return () => {
                let pickedCard = Math.floor(Math.random() * 52);
                let pickedSuit = Math.floor(pickedCard / 13);

                return {suit: this.suits[pickedSuit], card: pickedCard % 13};
            }
        }
    }

    const provenance = 'https://www.typescriptlang.org/docs/handbook/functions.html';
    console.log(`code from: ${provenance}`);
    console.log('');

    let cardPicker = deck.createCardPicker();
    let pickedCard = cardPicker();
    console.log(`card: ${pickedCard.card} of ${pickedCard.suit}`);

})();

(()=>{
    function identity<T>(arg: T): T {
        return arg;
    }

    console.log(identity<string>('foo'));
})();


(()=>{
    function identity<T>(arg: T[]): T[] {
        console.log(`len is: ${arg.length}`);
        return arg;
    }

    console.log(identity<string>(['foo', 'boo']));
})();

(()=>{
    function identity<T>(arg: T[]): T[] {
        console.log(`len is: ${arg.length}`);
        return arg;
    }

    const f: <U>(x:U[])=>U[] = identity;

    console.log(f(['foo', 'boo']));
})();