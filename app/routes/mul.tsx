import Calculator from '~/components/calculator';

const allNums = [2, 3, 4, 5, 6, 7, 8, 9, 10];
export default function Mul() {
    return <Calculator createCalc={createCalculation} options={allNums} />;
}

function createCalculation(selected: string[]): { calc: string; result: number } {
    const a = selected.length ? +getRandom(selected) : getRandom(allNums);
    const b = getRandom(allNums);

    return {
        calc: `${a} · ${b}`,
        result: a * b
    };
}

function getRandom<T>(options: T[]) {
    return options[Math.floor(Math.random() * options.length)];
}
