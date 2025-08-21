import React from 'react';

interface ProductCardProps {
    title: string;
    image: string;
    className?: string;
    description?: string;
    href: string;
    ctaText?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
    title,
    image,
    className = "",
    description,
    href,
    ctaText = "View Details"
}) => {
    return (
        <div className={`${className} bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full`}>
            <a href={href} className="block h-full">
                <div className="relative h-40 overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-green-600 text-center mb-2">{title}</h3>
                    {description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {description}
                        </p>
                    )}
                    <span className="mt-auto text-green-600 text-sm font-medium hover:underline">
                        {ctaText}
                    </span>
                </div>
            </a>
        </div>
    );
};

export default ProductCard;
