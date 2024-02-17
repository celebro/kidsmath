import Calculator from '~/components/calculator';

export default function Mul() {
    return <Calculator createCalc={createCalculation} options={['Pr', 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} />;
}

function createCalculation(selected: string[]): { calc: string; result: number } {
    // const a = selected.length ? +getRandom(selected) : getRandom(allNums);
    // const b = getRandom(allNums);
    const numberRanges = selected.filter((x) => !Number.isNaN(+x));
    const canCross = selected.includes('Pr');

    let result = 0;
    let a = 0;

    if (canCross) {
        if (numberRanges.length === 1) {
            const range = +numberRanges[0];
            result = getRandomInt(range - 10 + 2, range);
            a = randomWithoutCrossing(result);
        } else if (numberRanges.length > 1) {
            const range = +getRandom(numberRanges.slice(1));
            const remainingRanges = numberRanges.filter((x) => +x < range);
            const otherRange = +getRandom(remainingRanges);
            result = getRandomInt(range - 10 + 2, range);
            a = getRandomInt(otherRange - 10, otherRange);
        } else {
            result = getRandomInt(2, 100);
            a = getRandomInt(1, result - 1);
        }
    } else {
        if (numberRanges.length) {
            const range = +getRandom(numberRanges);
            result = getRandomInt(range - 10 + 2, range);
        } else {
            result = result = getRandomInt(2, 100);
        }
        a = randomWithoutCrossing(result);
    }

    // if (numberRanges.length) {
    //     const range = +getRandom(numberRanges);
    //     result = getRandomInt(range - 10 + 2, range);
    //     if (canCross && numberRanges.length > 1) {
    //         const remainingRanges = numberRanges.filter((x) => +x < range);
    //         const otherRange = +getRandom(remainingRanges);
    //         a = getRandomInt(otherRange - 10, otherRange);
    //     } else {
    //         a = randomWithoutCrossing(result);
    //     }
    // } else {
    //     result = getRandomInt(2, 100);
    //     if (canCross) {
    //         a = getRandomInt(1, result - 1);
    //     } else {
    //         a = randomWithoutCrossing(result);
    //     }
    // }

    let b = result - a;

    if (Math.random() < 0.5) {
        [a, b] = [b, a];
    }

    return {
        calc: `${a} + ${b}`,
        result: result
    };
}

function getRandom<T>(options: T[]) {
    return options[Math.floor(Math.random() * options.length)];
}

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomWithoutCrossing(result: number) {
    return getRandomInt(result - (result % 10), result - 1);
}
