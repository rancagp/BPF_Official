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
        <div className="bg-white text-gray-600 text-xs border-b border-gray-100">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-2">
                    {/* Date */}
                    <div className="flex items-center text-gray-500">
                        <i className="far fa-calendar-alt mr-2"></i>
                        <span>{currentDate}</span>
                    </div>
                    
                    {/* Time Zones */}
                    <div className="hidden md:flex items-center space-x-5">
                        <div className="flex items-center">
                            <span className="w-12 text-right font-medium">{timezones.jakarta}</span>
                            <span className="ml-1 w-10">{currentTimeJKT}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="w-12 text-right font-medium">{timezones.tokyo}</span>
                            <span className="ml-1 w-10">{currentTimeTKY}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="whitespace-nowrap font-medium">{timezones.hongkong}</span>
                            <span className="ml-1 w-10">{currentTimeHK}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="w-14 text-right font-medium">{timezones.newyork}</span>
                            <span className="ml-1 w-10">{currentTimeNY}</span>
                        </div>
                    </div>
                    
                    {/* Language Switcher */}
                    <div className="ml-4">
                        <LanguageSwitcher />
                    </div>
                </div>
                
                {/* Time Zones - Mobile */}
                <div className="md:hidden flex items-center space-x-4 overflow-x-auto py-2 -mx-4 px-4">
                    <div className="flex items-center flex-shrink-0">
                        <span className="w-10 text-right font-medium">JKT</span>
                        <span className="ml-1">{currentTimeJKT}</span>
                    </div>
                    <div className="flex items-center flex-shrink-0">
                        <span className="w-10 text-right font-medium">TKY</span>
                        <span className="ml-1">{currentTimeTKY}</span>
                    </div>
                    <div className="flex items-center flex-shrink-0">
                        <span className="w-10 text-right font-medium">HKG</span>
                        <span className="ml-1">{currentTimeHK}</span>
                    </div>
                    <div className="flex items-center flex-shrink-0">
                        <span className="w-10 text-right font-medium">NYC</span>
                        <span className="ml-1">{currentTimeNY}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DateTimeDisplay;
