import NewsCard from "@/components/moleculs/Newscard";
import Header2 from "@/components/moleculs/Header2";
import beritaList from "@/data/BeritaList";
import { useTranslation } from 'next-i18next';

interface BeritaSectionProps {
    limit?: number;
    showHeader?: boolean;
    className?: string;
}

export default function BeritaSection({ className, limit, showHeader = true }: BeritaSectionProps) {
    const { t } = useTranslation('berita');
    const data = typeof limit === "number" ? beritaList.slice(0, limit) : beritaList;

    return (
        <div className={`${className} mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`}>
            {showHeader && (
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 text-xs font-semibold text-green-700 bg-green-100 rounded-full mb-3">
                        {t('latestUpdate')}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 bg-black bg-clip-text text-transparent">
                        {t('title')}
                    </h2>
                    <div className="w-24 h-1 bg-green-600 rounded-full mx-auto mb-6"></div>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        {t('description')}
                    </p>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.map((berita, index) => (
                    <div 
                        key={index}
                        className="transform transition-transform duration-300 hover:-translate-y-1"
                        data-aos="fade-up"
                        data-aos-delay={`${(index % 3) * 100}`}
                    >
                        <NewsCard
                            title={berita.title}
                            date={berita.date}
                            content={berita.content}
                            slug={berita.slug}
                            img={berita.img}
                        />
                    </div>
                ))}
            </div>
            
            {(!limit || beritaList.length > limit) && (
                <div className="text-center mt-12">
                    <a 
                        href="/analisis/berita"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-800 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        {t('viewAllNews')}
                        <svg className="ml-2 -mr-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </a>
                </div>
            )}
        </div>
    );
}
