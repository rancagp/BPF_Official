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
    const trimmedExcerpt = trimText(excerpt, 250);

    // Fungsi untuk format tanggal ke DD MMMM YYYY
    const formatDate = (inputDate: string) => {
        const options: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "long",
            year: "numeric",
        };
        const parsedDate = new Date(inputDate);
        return parsedDate.toLocaleDateString("id-ID", options);
    };

    // Fungsi truncate
    const truncate = (text: string, maxLength: number) =>
        text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

    return (
        <div className="rounded-lg h-full flex flex-col bg-zinc-100 hover:bg-zinc-200 p-5 transition-all duration-300">
            <p className="text-base text-gray-500 mb-1 uppercase">{formatDate(date)}</p>
            <h3 className="text-2xl font-semibold text-green-600 mb-2">{title}</h3>
            <p className="text-gray-600 mb-4 text-lg">{trimmedExcerpt}</p>
            <CardDetail link={link} />
        </div>
    );
}
