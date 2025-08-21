import { useTranslation } from 'next-i18next';

interface CardDetailProps {
    link?: string;
    text?: string;
}

export default function CardDetail({ link, text }: CardDetailProps) {
    const { t } = useTranslation('common');
    const buttonText = text || t('readMore', 'Baca Selengkapnya');
    
    return (
        <a
            href={link || "#"}
            className="bg-green-600 hover:bg-green-700 w-fit text-white px-3 py-1 rounded-lg font-medium inline-flex items-center mt-auto space-x-3 transition-all duration-300"
        >
            <i className="fa-solid fa-magnifying-glass"></i>
            <span>{buttonText}</span>
        </a>
    );
}
