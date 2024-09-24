import Calculator from '~/components/calculator';

let allNumberRanges = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
export default function Mul() {
    return <Calculator createCalc={createCalculation} options={['Pr', '+', '-', ...allNumberRanges]} />;
}

function createCalculation(selected: string[]): { calc: string; result: number } {
    let numberRanges = selected.filter((x) => !Number.isNaN(+x)).map((x) => +x);
    if (numberRanges.length === 0) {
        numberRanges = allNumberRanges;
    }
    let canCross = selected.includes('Pr');

    let result = 0;
    let a = 0;

    if (canCross) {
        let max = getRandom(numberRanges);
        let min = max - 9;

        result = getRandomInt(min, max);
        a = getRandomInt(1, result - 1);
    } else {
        let range = getRandom(numberRanges);
        let tens = (range - 10) / 10;
        let ones = getRandomWeightedInt(0.8) + 1;

        result = 10 * tens + ones;
        a = 10 * getRandomInt(0, tens) + getRandomInt(0, ones);
    }

    let b = result - a;

    // if (Math.random() < 0.5) {
    //     [a, b] = [b, a];
    // }

    let op = getRandom(['add', 'sub']);
    if (selected.includes('+') && selected.includes('-')) {
        // noop
    } else if (selected.includes('+')) {
        op = 'add';
    } else if (selected.includes('-')) {
        op = 'sub';
    }

    if (op === 'add') {
        return {
            calc: `${a} + ${b}`,
            result: result
        };
    } else {
        return {
            calc: `${result} - ${a}`,
            result: b
        };
    }
}

function getRandom<T>(options: T[]) {
    return options[Math.floor(Math.random() * options.length)];
}

function getRandomWeightedInt(weight: number): number {
    const random = Math.random();
    // Use a fractional power close to 1 to create a smaller bias
    const biasedRandom = Math.pow(random, weight);
    return Math.floor(biasedRandom * 10);
}

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
