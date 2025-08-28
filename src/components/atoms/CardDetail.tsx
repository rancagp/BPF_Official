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
            className="bg-green-600 hover:bg-green-700 w-fit text-white px-3 py-1 rounded-lg font-medium inline-flex items-center mt-auto space-x-3 transition-all duration-300"
            passHref
        >
            <i className="fa-solid fa-magnifying-glass"></i>
            <span>{buttonText}</span>
        </Link>
    );
}
