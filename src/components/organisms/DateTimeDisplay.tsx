"use client";

"use client";

import { useEffect, useState } from "react";

const DateTimeDisplay = () => {
    const [currentDate, setCurrentDate] = useState("");
    const [currentTimeJKT, setCurrentTimeJKT] = useState("");
    const [currentTimeTKY, setCurrentTimeTKY] = useState("");
    const [currentTimeHK, setCurrentTimeHK] = useState("");
    const [currentTimeNY, setCurrentTimeNY] = useState("");
    const [showTime, setShowTime] = useState(false);

    const updateDateTime = () => {
        const now = new Date();
        const daysOfWeek = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        
        const formattedDate = `${daysOfWeek[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
        setCurrentDate(formattedDate);

        const formatTime = (timezone: string) => {
            return new Intl.DateTimeFormat("en-GB", {
                timeZone: timezone,
                hour: "2-digit",
                minute: "2-digit",
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
                        <button 
                            className="md:hidden flex items-center text-gray-500 hover:text-gray-700"
                            onClick={() => setShowTime(!showTime)}
                            aria-label="Toggle time zones"
                        >
                            <i className="far fa-clock mr-1"></i>
                            <i className={`fas fa-chevron-${showTime ? 'up' : 'down'} text-xs`}></i>
                        </button>
                    </div>
                </div>

                {/* Mobile Time Zones Dropdown */}
                {showTime && (
                    <div className="md:hidden py-2 border-t border-gray-100">
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { code: 'JAKARTA', time: currentTimeJKT, tz: 'WIB', color: 'text-green-500' },
                                { code: 'TOKYO', time: currentTimeTKY, tz: 'JST', color: 'text-amber-500' },
                                { code: 'HONG KONG', time: currentTimeHK, tz: 'HKT', color: 'text-blue-500' },
                                { code: 'NEW YORK', time: currentTimeNY, tz: 'EST', color: 'text-red-500' }
                            ].map((zone, index) => (
                                <div key={index} className="flex items-center justify-between px-1 py-0.5">
                                    <span className="text-gray-500">{zone.code}</span>
                                    <span className="font-mono">{zone.time}</span>
                                    <span className={zone.color}>{zone.tz}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DateTimeDisplay;
