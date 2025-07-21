interface VideoCardProps {
    title: string;
    description: string;
    videoUrl: string; // embed YouTube URL
    onClick?: () => void;
}

export default function VideoCard({ title, description, videoUrl, onClick }: VideoCardProps) {
    const videoId = videoUrl.split('/').pop();
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden group cursor-pointer" onClick={onClick}>
            <div className="relative bg-black aspect-video">
                <img
                    src={thumbnailUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white/80 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
                </div>
            </div>

            <div className="p-4 text-center space-y-2">
                <h3 className="text-blue-900 font-bold text-sm sm:text-base">{title}</h3>
                <p className="text-blue-600 text-xs sm:text-sm italic">{description}</p>
            </div>
        </div>
    );
}
