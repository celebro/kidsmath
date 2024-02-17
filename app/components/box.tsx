export function Box({
    children,
    className,
    ...rest
}: { children: React.ReactNode; className?: string } & React.ButtonHTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={
                'bg-yellow active:bg-green active:translate-y-[1px] w-14 h-14 flex justify-center items-center cursor-pointer select-none' +
                (className ? ' ' + className : '')
            }
            {...rest}
        >
            {children}
        </div>
    );
}
