import CardDetail from "../atoms/CardDetail";
import { useTranslation } from 'next-i18next';

interface NewsCardProps {
    title: string;
    date: string;
    content: string;
    slug: string;
    img?: string;
}

export default function NewsCard({
    title,
    date,
    content,
    slug,
    img,
}: NewsCardProps) {
    const { t } = useTranslation('berita');

    // Fungsi untuk memotong teks tanpa memotong di tengah kata
    function stripHtml(html: string = ""): string {
        if (typeof html !== "string") return "";
        return html.replace(/<[^>]*>/g, "").trim();
    }

    function trimText(text: string = "", maxChars: number) {
        const plainText = stripHtml(text);
        return plainText.length > maxChars ? plainText.slice(0, maxChars).trim() + "..." : plainText;
    }

    const trimmedExcerpt = trimText(content, 200);  // Ubah jadi 200 atau sesuai kebutuhan

    const formatDate = (inputDate: string) => {
        const options: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "long",
            year: "numeric",
        };
        const parsedDate = new Date(inputDate);
        return parsedDate.toLocaleDateString("id-ID", options);
    };

    const fullLink = `/analisis/berita/${slug}`;

    return (
        <div className="group h-full flex flex-col rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-green-100">
            <div className="relative h-48 bg-gray-100 overflow-hidden">
                {img ? (
                    <>
                        <img 
                            src={img} 
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18bad83a944%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18bad83a944%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22290.5625%22%20y%3D%22217.7%22%3ENo%20Image%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                    </div>
                )}
            </div>
            <div className="p-6 flex-1 flex flex-col">
                <p className="text-sm font-medium text-green-600 mb-2">{formatDate(date)}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
                    {title}
                </h3>
                <p className="text-gray-600 mb-5 text-base line-clamp-3">{trimmedExcerpt}</p>
                <div className="mt-auto pt-4 border-t border-gray-100">
                    <CardDetail link={fullLink} text={t('readMore')} />
                </div>
            </div>
        </div>
    );
}
