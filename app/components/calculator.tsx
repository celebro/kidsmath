import { Form, useSearchParams } from '@remix-run/react';
import { useState } from 'react';
import { useHydrated } from 'remix-utils/use-hydrated';
import { Box } from '../components/box';

type MathProps = {
    options: Array<string | number>;
    createCalc: (selected: Array<string>) => Calc;
};

type Calc = {
    calc: string;
    result: number;
};

type Entry = {
    id: number;
    calc: string;
    result: number;
    input: number;
    correct: boolean;
};

let id = 0;

export default function Calculator({ options, createCalc }: MathProps) {
    const [searchParams] = useSearchParams();
    const selected = searchParams.getAll('nums');

    const [calc, setCalc] = useState<Calc | undefined>();
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<Array<Entry>>([]);

    const isHydrated = useHydrated();
    if (isHydrated && !calc) {
        setCalc(createCalc(selected));
    }

    return (
        <>
            <Form
                onInput={(evt) => {
                    evt.currentTarget.querySelector('button')?.click();
                }}
            >
                <div className="flex gap-4">
                    {options.map((opt) => (
                        <label key={opt}>
                            <input type="checkbox" name="nums" value={opt} className="hidden peer" defaultChecked={selected.includes(String(opt))} />
                            <Box className="peer-checked:bg-green" key={opt}>
                                {opt}
                            </Box>
                        </label>
                    ))}
                </div>
                <button type="submit" className="hidden"></button>
            </Form>

            <div className=" grid grid-cols-[1fr_auto] gap-4 mt-10">
                <div className="bg-black/20 text-white/80 p-8 text-7xl flex items-center">
                    &#8203;{calc ? `${calc.calc} = ` : ''}
                    {input}
                </div>

                <div className="grid grid-cols-3 grid-rows-4 gap-4 w-auto">
                    {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
                        <Box
                            onClick={() => {
                                if (input.length < 3) {
                                    setInput(input + num);
                                }
                            }}
                            key={num}
                        >
                            {num}
                        </Box>
                    ))}
                    <Box className="col-span-2 w-32" onClick={() => setInput(input.slice(0, -1))}>
                        {'<'}
                    </Box>
                </div>
            </div>
            <div
                className="text-lg text-center p-2 bg-blue mt-4 cursor-pointer active:translate-y-[1px] select-none"
                onClick={() => {
                    if (!input || !calc) {
                        return;
                    }

                    const entry = {
                        id: id++,
                        calc: calc.calc,
                        result: calc.result,
                        input: +input,
                        correct: calc.result === +input
                    };

                    setHistory((old) => [entry, ...old]);
                    setInput('');
                    setCalc(createCalc(selected));
                }}
            >
                Preveri
            </div>

            <div className="pt-4 text-white">
                {history.map((entry) => (
                    <div key={entry.id}>
                        <span className="inline-block w-8">{entry.correct ? '✅' : ' ✗ '}</span>
                        {entry.calc} = {entry.input}
                        {!entry.correct ? <span className="inline-block w-16 text-center"> ... ({entry.result})</span> : undefined}
                    </div>
                ))}
            </div>
        </>
    );
}
