
interface ProductCardProps {
    title: string;
    image?: string;
    Classname?: string;
}

export default function ProductCard({ title, image, Classname = "" }: ProductCardProps) {
    return (
        <div className={`${Classname} bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-duration-300 w-full`}>
            {image && (
                <img
                    src={image}
                    alt={title}
                    className="w-full h-40 object-cover"
                />
            )}
            <div className="p-4">
                <h3 className="text-lg text-center font-semibold text-green-600 mb-2">{title}</h3>
            </div>
        </div>
    );
}

