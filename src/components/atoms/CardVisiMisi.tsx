import { ReactNode } from "react";

interface CardVisiMisiProps {
    children: ReactNode;
    className?: string;
}

export default function CardVisiMisi({ children, className = "" }: CardVisiMisiProps) {
    return (
        <div className={`${className} bg-zinc-200 rounded-lg w-fit px-5 py-2`}>
            {children}
        </div>
    );
}
