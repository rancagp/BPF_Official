import { ReactNode } from "react";

interface TitleH3Props {
    children: ReactNode;
    className?: string;
}

export default function TitleH3({ children, className }: TitleH3Props) {
    return (
        <h3 className={`${className} text-2xl font-bold text-zinc-700`}>{children}</h3>
    );
}