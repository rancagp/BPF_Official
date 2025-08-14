"use client";

import { useEffect, useState } from "react";
import { useTranslation } from 'next-i18next';
import LanguageSwitcher from "@/components/atoms/LanguageSwitcher";

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
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-1.5 space-y-1 md:space-y-0">
                    {/* Date Section */}
                    <div className="flex items-center">
                        <i className="far fa-calendar-alt text-gray-400 mr-1.5"></i>
                        <span>{currentDate}</span>
                    </div>

                    {/* Time Zones */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                        <div className="flex items-center">
                            <span className="w-16 font-medium">{timezones.jakarta}</span>
                            <span className="ml-1">{currentTimeJKT}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="w-16 font-medium">{timezones.tokyo}</span>
                            <span className="ml-1">{currentTimeTKY}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="w-16 font-medium">{timezones.hongkong}</span>
                            <span className="ml-1">{currentTimeHK}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="w-16 font-medium">{timezones.newyork}</span>
                            <span className="ml-1">{currentTimeNY}</span>
                        </div>
                    </div>

                    <LanguageSwitcher />
                </div>
            </div>
        </div>
    );
};

export default DateTimeDisplay;
