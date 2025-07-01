interface Header1Props {
    title: string;
    center?: boolean;
    className?: string;
}

export default function Header1({ title, center = false, className = "" }: Header1Props) {
    const baseClass = "text-4xl text-gray-800";
    const centerClass = center ? "text-center" : "";
    return (
        <h1 className={`${baseClass} ${centerClass} ${className}`}>
            {title}
        </h1>
    );
}
