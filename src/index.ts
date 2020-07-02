if (false)
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

if (false)
(()=>{
    function identity<T>(arg: T): T {
        return arg;
    }

    console.log(identity<string>('foo'));
})();

if (false)
(()=>{
    function identity<T>(arg: T[]): T[] {
        console.log(`len is: ${arg.length}`);
        return arg;
    }

    console.log(identity<string>(['foo', 'boo']));
})();

if (false)
(()=>{
    function identity<T>(arg: T[]): T[] {
        console.log(`len is: ${arg.length}`);
        return arg;
    }

    const f: <U>(x:U[])=>U[] = identity;

    console.log(f(['foo', 'boo']));
})();

if (false)
(()=>{
    
    const StringUnion = <UnionType extends string>(...values: UnionType[]) => {
        Object.freeze(values);
        const valueSet: Set<string> = new Set(values);

        const guard = (value: string): value is UnionType => {
            return valueSet.has(value);
        };

        const check = (value: string): UnionType => {
            if (!guard(value)) {
                const actual = JSON.stringify(value);
                const expected = values.map(s => JSON.stringify(s)).join(' | ');
                throw new TypeError(`Value '${actual}' is not assignable to type '${expected}'.`);
            }
            return value;
        };

        const unionNamespace = {guard, check, values};
        return Object.freeze(unionNamespace as typeof unionNamespace & {type: UnionType});
    };

    const SPADES = 'spades';
    const DIAMONDS = 'diamonds';
    let Suits = StringUnion(SPADES, DIAMONDS);
    type Suits = typeof Suits.type;

    const f:()=>Suits = ()=>{ // declaring the type is necessary as it is otherwise inferred as ()=>string
        return 'spades';
    }

    const a: Suits = f();
    console.log(a);


}
)();

if (false)
(()=>{
    enum TSex {MALE= 'male', FEMALE='female'};

    type Male = {
        sex: TSex.MALE
        , age: number
        , penis: number};


    const male = 'male';
    // @ts-expect-error
    const m1 : Male = {sex: male, age: 32, penis: 17};

    const m2 : Male = {sex: TSex.MALE, age: 32, penis: 17};
    console.log(m1, m2);

})();

if (false)
(()=>{
    class A { constructor(public a1: string, public a2: string) {}}

    const v = typeof A;
    console.log(`const v = typeof A yields '${v}'`);

    type T = typeof A; // T is the constructor type

    const a2: A  = new A('a1', 'a2');               // A is the instance type
    const a1: InstanceType<T>  = new A('a1', 'a2'); // InstanceType<T> is the same as A


    const fn: T = A;

    const b = new fn('a1', 'a2');

    console.log(`are equal? ${(JSON.stringify(a1)===JSON.stringify(a2)) && (JSON.stringify(a2)===JSON.stringify(b))}`);
})();

(()=>{
    type A = {b: number};
    const a: A | null = {b: 42};
    function f( a: A | null = {b: 43}) {
        // @ts-expect-error
        console.log(a.b);
        /* The above complains with: "Object is possibly 'null'"
         * That's because if we pass null, we don't activate the default value; instead
         * null get's passed
         */
    }
    
    f(a);
    f(undefined);
    f();
    let exception_caught = false;
    try {
        f(null); // code actually breaks here!
    } catch (e) {
        exception_caught = true;
    }
    if (!exception_caught)
        throw 42;
})();

(()=>{
    enum T {
        A = 'alpha',
        B = 'beta'
    }

    const t: T = T.B;

    console.log(t);
})();