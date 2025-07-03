import CardDetail from "../atoms/CardDetail";

interface NewsCardProps {
    title: string;
    date: string;
    excerpt: string;
    link: string;
}

function trimText(text: string, maxChars: number) {
    return text.length > maxChars ? text.slice(0, maxChars).trim() + "..." : text;
}

export default function NewsCard({
    title,
    date,
    excerpt,
    link,
}: NewsCardProps) {
    const trimmedExcerpt = trimText(excerpt, 250); // Sesuaikan jumlah karakter agar mirip 6 baris

    return (
        <div className="rounded-lg h-full flex flex-col bg-zinc-100 hover:bg-zinc-200 p-5 transition-all duration-300">
            <p className="text-base text-gray-500 mb-1 uppercase">{date}</p>
            <h3 className="text-2xl font-semibold text-green-600 mb-2">{title}</h3>
            <p className="text-gray-600 mb-4 text-lg">{trimmedExcerpt}</p>
            <CardDetail link={link} />
        </div>
    );
}
