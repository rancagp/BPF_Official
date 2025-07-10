"use client";

import { useEffect, useState } from "react";

const DateTimeDisplay = () => {
    const [currentDate, setCurrentDate] = useState("");
    const [currentTimeJKT, setCurrentTimeJKT] = useState("");
    const [currentTimeTKY, setCurrentTimeTKY] = useState("");
    const [currentTimeHK, setCurrentTimeHK] = useState("");
    const [currentTimeNY, setCurrentTimeNY] = useState("");
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);

    const updateDateTime = () => {
        const now = new Date();
        const daysOfWeek = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        
        // Format tanggal
        const formattedDate = `${daysOfWeek[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
        setCurrentDate(formattedDate);

        // Format waktu untuk berbagai zona waktu
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
        updateDateTime(); // Panggil sekali di awal
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="bg-gray-800 text-white text-sm py-1 px-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Tanggal */}
                <div className="flex items-center">
                    <i className="far fa-calendar-alt mr-2"></i>
                    <span>{currentDate}</span>
                </div>

                {/* Waktu */}
                <div className="hidden md:flex items-center space-x-6">
                    <div className="flex items-center">
                        <span className="text-xs text-gray-400 mr-1">JKT</span>
                        <span className="font-mono">{currentTimeJKT}</span>
                        <span className="text-xs ml-1 text-green-400">WIB</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-xs text-gray-400 mr-1">TKY</span>
                        <span className="font-mono">{currentTimeTKY}</span>
                        <span className="text-xs ml-1 text-yellow-400">JST</span>
                    </div>
                    <div className="lg:flex items-center hidden">
                        <span className="text-xs text-gray-400 mr-1">HKG</span>
                        <span className="font-mono">{currentTimeHK}</span>
                        <span className="text-xs ml-1 text-blue-400">HKT</span>
                    </div>
                    <div className="xl:flex items-center hidden">
                        <span className="text-xs text-gray-400 mr-1">NYC</span>
                        <span className="font-mono">{currentTimeNY}</span>
                        <span className="text-xs ml-1 text-red-400">EST</span>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    {/* Language Selector */}
                    <div className="hidden md:block">
                        <select className="bg-transparent border border-gray-600 rounded text-white px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-green-400">
                            <option className="bg-gray-800 text-white" value="id">Bahasa</option>
                            <option className="bg-gray-800 text-white" value="en">English</option>
                            <option className="bg-gray-800 text-white" value="cn">中文</option>
                        </select>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="md:hidden flex items-center">
                        <button 
                            className="flex items-center text-xs text-gray-300 hover:text-white"
                            onClick={() => setShowTime(!showTime)}
                        >
                            <i className="far fa-clock mr-1"></i>
                            <span>Lihat Waktu</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Time Dropdown */}
            {showTime && (
                <div className="md:hidden mt-2 bg-gray-700 p-3 rounded">
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <div className="text-xs text-gray-400">Jakarta</div>
                            <div className="font-mono">{currentTimeJKT} <span className="text-green-400">WIB</span></div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-400">Tokyo</div>
                            <div className="font-mono">{currentTimeTKY} <span className="text-yellow-400">JST</span></div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-400">Hong Kong</div>
                            <div className="font-mono">{currentTimeHK} <span className="text-blue-400">HKT</span></div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-400">New York</div>
                            <div className="font-mono">{currentTimeNY} <span className="text-red-400">EST</span></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DateTimeDisplay;
