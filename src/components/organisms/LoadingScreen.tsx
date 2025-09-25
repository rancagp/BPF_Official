import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  show: boolean;
}

export default function LoadingScreen({ show }: LoadingScreenProps) {
    const [visible, setVisible] = useState(show);

    useEffect(() => {
        if (!show) {
            const timeout = setTimeout(() => setVisible(false), 500);
            return () => clearTimeout(timeout);
        } else {
            setVisible(true);
        }
    }, [show]);

    return visible ? (
        <div className={`fixed inset-0 bg-white z-[9999] flex items-center justify-center transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col items-center gap-4">
                <div className="animate-bounce-slow">
                    <img 
                        src="/assets/bpf-logo.png" 
                        alt="Loading" 
                        className="w-32 h-auto" 
                    />
                </div>
                <p className="text-lg font-semibold text-[#FF0000] mt-2">Memuat...</p>
            </div>
        </div>
    ) : null;
}
