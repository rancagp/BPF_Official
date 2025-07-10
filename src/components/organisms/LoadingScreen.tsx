import React, { useEffect, useState } from 'react';

export default function LoadingScreen({ show }) {
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
                    <img src="/assets/logo-kpf.png" alt="Loading" className="w-24 h-24" />
                </div>
                <p className="text-lg font-semibold text-green-800">Memuat...</p>
            </div>
        </div>
    ) : null;
}
