import { ReactNode } from "react";

interface ProfilContainerProps {
    children: ReactNode;
    title?: string;
    description?: string;
    hideTitle?: boolean;
}

export default function ProfilContainer({ children, title, description, hideTitle = false }: ProfilContainerProps) {
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {!hideTitle && title && (
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 sm:p-6">
                    <div className="text-center">
                        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
                            {title}
                        </h1>
                        {description && (
                            <p className="mt-2 text-white/90 font-light max-w-3xl mx-auto">
                                {description}
                            </p>
                        )}
                    </div>
                </div>
            )}
            <div className="p-5 md:p-10">
                {children}
            </div>
        </div>
    );
}
