import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface CardDetailProps {
    link?: string;
    text?: string;
    locale?: string;
}

export default function CardDetail({ link = "#", text, locale }: CardDetailProps) {
    const { t } = useTranslation('common');
    const router = useRouter();
    const currentLocale = locale || router.locale;
    const buttonText = text || t('readMore', 'Baca Selengkapnya');
    
    return (
        <Link
            href={link}
            locale={currentLocale}
            className="bg-gradient-to-r from-[#F2AC59] to-[#e09c4a] hover:from-[#e09c4a] hover:to-[#d08b3a] text-white px-4 py-2.5 rounded-lg font-medium inline-flex items-center mt-auto transition-all duration-300 whitespace-nowrap shadow-md hover:shadow-lg hover:scale-[1.02]"
            passHref
        >
            <i className="fa-solid fa-magnifying-glass text-sm"></i>
            <span className="ml-2 text-sm">{buttonText}</span>
        </Link>
    );
}
