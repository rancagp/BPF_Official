"use client";

import { useEffect, useState } from "react";
import { useTranslation } from 'next-i18next';

const DateTimeDisplay = () => {
    const { t, i18n } = useTranslation('common');
    const [currentDate, setCurrentDate] = useState("");
    const [currentTimeJKT, setCurrentTimeJKT] = useState("");
    const [currentTimeTKY, setCurrentTimeTKY] = useState("");
    const [currentTimeHK, setCurrentTimeHK] = useState("");
    const [currentTimeNY, setCurrentTimeNY] = useState("");
    const [showTime, setShowTime] = useState(false);
    
    // Dapatkan terjemahan untuk timezone
    interface Timezones {
        jakarta: string;
        tokyo: string;
        hongkong: string;
        newyork: string;
        [key: string]: string; // Index signature
    }
    
    const timezones = t('timezones', { returnObjects: true }) as Timezones;

    const updateDateTime = () => {
        const now = new Date();
        
        // Format tanggal sesuai dengan locale yang aktif
        const formattedDate = new Intl.DateTimeFormat(i18n.language, {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(now);
        
        setCurrentDate(formattedDate);

        const formatTime = (timezone: string) => {
            return new Intl.DateTimeFormat(i18n.language, {
                timeZone: timezone,
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }).format(now);
        };

        setCurrentTimeJKT(formatTime("Asia/Jakarta"));
        setCurrentTimeTKY(formatTime("Asia/Tokyo"));
        setCurrentTimeHK(formatTime("Asia/Hong_Kong"));
        setCurrentTimeNY(formatTime("America/New_York"));
    };

    useEffect(() => {
        const intervalId = setInterval(updateDateTime, 1000);
        updateDateTime();
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="bg-stone-50 text-gray-600 text-xs border-b border-gray-100">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-1.5">
                    {/* Date Section */}
                    <div className="flex items-center">
                        <i className="far fa-calendar-alt text-gray-400 mr-1.5"></i>
                        <span>{currentDate}</span>
                    </div>

                    {/* Time Zones - Desktop */}
                    <div className="hidden md:flex items-center space-x-4">
                        {[
                            { code: 'JKT', time: currentTimeJKT, tz: 'WIB', color: 'text-green-500' },
                            { code: 'TKY', time: currentTimeTKY, tz: 'JST', color: 'text-amber-500' },
                            { code: 'HKG', time: currentTimeHK, tz: 'HKT', color: 'text-blue-500', className: 'lg:flex hidden' },
                            { code: 'NYC', time: currentTimeNY, tz: 'EST', color: 'text-red-500', className: 'xl:flex hidden' }
                        ].map((zone, index) => (
                            <div key={index} className={`flex items-center ${zone.className || ''}`}>
                                <span className="text-gray-400 mr-1">{zone.code}:</span>
                                <span className="font-mono">{zone.time}</span>
                                <span className={`ml-1 ${zone.color}`}>{zone.tz}</span>
                            </div>
                        ))}
                    </div>

                    {/* Language Selector */}
                    <div className="flex items-center space-x-3">
                        {/* Language Selector - Mobile & Desktop */}
                        <div className="relative">
                            <select className="appearance-none bg-transparent border-0 text-gray-500 focus:outline-none focus:ring-0 py-1 pr-6 pl-2 cursor-pointer text-xs border border-gray-200 rounded">
                                <option value="id">ID</option>
                                <option value="en">EN</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-gray-500">
                                <i className="fas fa-chevron-down text-xs"></i>
                            </div>
                        </div>

                        {/* Mobile Toggle */}
                        <div className="flex items-center justify-between">
                            <div className="text-xs text-gray-400">{t('lastUpdate')}: {currentDate}</div>
                            <button 
                                onClick={() => setShowTime(!showTime)}
                                className="text-xs text-blue-500 hover:underline flex items-center gap-1"
                                aria-label={showTime ? t('hide') : t('toggleTimeButton')}
                            >
                                <span>{showTime ? t('hide') : t('toggleTimeButton')}</span>
                                <span className="text-xs">{showTime ? '▲' : '▼'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DateTimeDisplay;
