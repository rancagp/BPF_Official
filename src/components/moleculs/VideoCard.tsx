interface VideoCardProps {
    title: string;
    description: string;
    videoUrl: string;
    category?: string;
    duration?: string;
    date?: string;
    onClick?: () => void;
}

export default function VideoCard({ 
    title, 
    description, 
    videoUrl, 
    category = 'Uncategorized',
    duration = '0:00',
    date = '',
    onClick 
}: VideoCardProps) {
    const videoId = videoUrl.split('/').pop();
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    return (
        <div 
            className="bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100"
            onClick={onClick}
        >
            <div className="relative bg-[#080031] aspect-video">
                <img
                    src={thumbnailUrl}
                    alt={title}
                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080031]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div className="w-full">
                        <div className="flex justify-between items-center text-white/90 text-xs mb-2">
                            <span className="bg-[#FF0000] text-white px-3 py-1 rounded-full font-medium">
                                {duration}
                            </span>
                            {date && (
                                <span className="bg-[#080031]/80 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                                    {new Date(date).toLocaleDateString('id-ID')}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-[#FF0000] transition-colors">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="p-6">
                {category && (
                    <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-[#FF0000] rounded-full mb-3">
                        {category}
                    </span>
                )}
                <h3 className="text-lg font-bold text-[#080031] mb-2 line-clamp-2 leading-tight group-hover:text-[#FF0000] transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {description}
                </p>
                <div className="flex items-center text-xs text-gray-500">
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {duration} • {new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
            </div>
        </div>
    );
}
