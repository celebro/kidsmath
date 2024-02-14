import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from '@remix-run/cloudflare';
import { Form, useLoaderData, useParams, useSearchParams } from '@remix-run/react';
import { useEffect, useState } from 'react';

const selectNums = Array.from({ length: 9 }, (_, i) => i + 2);
const dialNums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];

export default function Index() {
    const [searchParams] = useSearchParams();
    const selectedNums = searchParams.getAll('nums').map((x) => +x);
    const usableNums = selectedNums.length ? selectedNums : selectNums;

    const [calc, setCalc] = useState(undefined as undefined | { a: number; b: number });
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([] as React.ReactNode[]);

    useEffect(() => {
        setCalc(getCalc(usableNums));
    }, []);

    function check() {
        if (!input) {
            return;
        }
        const result = +input;

        setCalc(getCalc(usableNums));
        setInput('');

        if (!calc) {
            return;
        }

        const correct = result === calc.a * calc.b;
        const entry = (
            <div key={history.length}>
                <span className="inline-block w-8">{correct ? '✅' : ' ✗ '}</span>
                {`${calc.a} · ${calc.b} = ${result}`}
            </div>
        );

        setHistory((old) => [entry, ...old]);
    }

    return (
        <div>
            <Form
                onInput={(evt) => {
                    evt.currentTarget.submit();
                }}
            >
                <div className="flex gap-4">
                    {selectNums.map((num) => (
                        <label key={num}>
                            <input type="checkbox" name="nums" value={num} className="hidden peer" defaultChecked={selectedNums.includes(num)} />
                            <Box className="peer-checked:bg-green" key={num}>
                                {num}
                            </Box>
                        </label>
                    ))}
                </div>
            </Form>

            <div className=" grid grid-cols-[1fr_auto] gap-4 mt-10">
                <div className="bg-black/20 text-white/80 p-8 text-7xl flex items-center">
                    &#8203;{calc ? `${calc.a} · ${calc.b} = ` : ''}
                    {input}
                </div>

                <div className="grid grid-cols-3 grid-rows-4 gap-4 w-auto">
                    {dialNums.map((num) => (
                        <Box onClick={() => setInput(input + num)} key={num}>
                            {num}
                        </Box>
                    ))}
                    <Box className="col-span-2 w-24" onClick={() => setInput(input.slice(0, -1))}>
                        {'<'}
                    </Box>
                </div>
            </div>
            <div className="text-lg text-center p-2 bg-blue mt-4 cursor-pointer" onClick={check}>
                Preveri
            </div>

            <div className="pt-4 text-white">{history}</div>
        </div>
    );
}

function Box({ children, className, ...rest }: { children: React.ReactNode; className?: string } & React.ButtonHTMLAttributes<HTMLDivElement>) {
    return (
        <div className={'bg-yellow w-10 h-10 flex justify-center items-center cursor-pointer' + (className ? ' ' + className : '')} {...rest}>
            {children}
        </div>
    );
}

function getCalc(nums: number[]) {
    console.log('numbs', nums);
    return { a: getRandom(nums), b: getRandom(selectNums) };
}

function getRandom(nums: number[]) {
    return nums[Math.floor(Math.random() * nums.length)];
}
