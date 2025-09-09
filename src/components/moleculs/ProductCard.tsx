import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

interface ProductCardProps {
    product: {
        id: number;
        name: string;
        image: string;
        slug: string;
        category: string;
        deskripsi?: string;
    };
    onClick?: (category: string, slug: string) => void;
    className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
    product = { 
        id: 0, 
        name: 'Produk', 
        image: '', 
        slug: 'produk', 
        category: 'produk' 
    }, 
    onClick, 
    className = '' 
}) => {
    const { t } = useTranslation('produk');
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onClick) {
            onClick(product.category, product.slug);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (onClick) {
                onClick(product.category, product.slug);
            }
        }
    };

    return (
        <div 
            className={`group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-100 ${className}`}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            <Link href={`/produk/${product?.category?.toLowerCase() || 'produk'}/${product?.slug || 'produk'}`} className="flex flex-col h-full">
                <div className="relative h-48 overflow-hidden">
                    {/* Category Badge */}
                    <div className="absolute top-3 right-3 z-10">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-white text-green-700 border border-green-200">
                            {product.category || 'Produk'}
                        </span>
                    </div>
                    <Image
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/img/produk/${product.image}`}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-green-600/20 to-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                        {product.name}
                    </h3>
                    {product.deskripsi && (
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                            {product.deskripsi}
                        </p>
                    )}
                    <div className="mt-auto pt-4 border-t border-gray-100">
                        <button className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300 text-sm font-medium">
                            {t('viewDetails')}
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
