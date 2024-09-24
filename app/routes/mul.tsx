import Calculator from '~/components/calculator';

let allNums = [2, 3, 4, 5, 6, 7, 8, 9, 10];
export default function Mul() {
    return <Calculator createCalc={createCalculation} options={['·', '÷', ...allNums]} />;
}

function createCalculation(selected: string[]): { calc: string; result: number } {
    let numbers = selected.filter((x) => !Number.isNaN(+x)).map((x) => +x);
    if (numbers.length === 0) {
        numbers = allNums;
    }

    let a = getRandom(numbers);
    let b = getRandom(allNums);

    if (Math.random() < 0.5) {
        [a, b] = [b, a];
    }

    let op = getRandom(['mul', 'div']);
    if (selected.includes('·') && selected.includes('÷')) {
        //
    } else if (selected.includes('·')) {
        op = 'mul';
    } else if (selected.includes('÷')) {
        op = 'mod';
    }

    if (op === 'mul') {
        return {
            calc: `${a} · ${b}`,
            result: a * b
        };
    } else {
        return {
            calc: `${a * b} ÷ ${b}`,
            result: a
        };
    }
}

function getRandom<T>(options: T[]) {
    return options[Math.floor(Math.random() * options.length)];
}
