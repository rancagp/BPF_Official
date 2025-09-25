import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { ArrowRight } from 'lucide-react';

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
            className={`group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#FF0000]/30 ${className}`}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            <Link href={`/produk/${product?.category?.toLowerCase() || 'produk'}/${product?.slug || 'produk'}`} className="flex flex-col h-full">
                {/* Product Image with overlay */}
                <div className="relative h-48 overflow-hidden">
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#FF0000] text-white shadow-md">
                            {product.category || 'Produk'}
                        </span>
                    </div>
                    
                    {/* Product Image */}
                    <div className="relative h-full w-full">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/img/produk/${product.image}`}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#080031]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* View More Button (shown on hover) */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="inline-flex items-center px-4 py-2 bg-white text-[#FF0000] rounded-full text-sm font-medium shadow-lg">
                                {t('viewDetails')}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </span>
                        </div>
                    </div>
                </div>
                
                {/* Content */}
                <div className="p-5 flex flex-col flex-1 bg-white">
                    <h3 className="text-lg font-bold text-[#080031] mb-2 group-hover:text-[#FF0000] transition-colors duration-300">
                        {product.name}
                    </h3>
                    
                    {product.deskripsi && (
                        <p className="text-[#080031]/80 text-sm mb-4 line-clamp-2">
                            {product.deskripsi}
                        </p>
                    )}
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#FF0000] opacity-5 -translate-y-1/2 translate-x-1/2 rounded-full group-hover:opacity-10 transition-opacity duration-300"></div>
            </Link>
        </div>
    );
};

export default ProductCard;
