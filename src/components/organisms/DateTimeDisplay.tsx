// components/organisms/DateTimeDisplay.tsx
"use client";

import { useEffect, useState } from "react";

const DateTimeDisplay = () => {
    const [currentDate, setCurrentDate] = useState("");
    const [currentTimeJKT, setCurrentTimeJKT] = useState("");
    const [currentTimeTKY, setCurrentTimeTKY] = useState("");
    const [currentTimeHK, setCurrentTimeHK] = useState("");
    const [currentTimeNY, setCurrentTimeNY] = useState("");

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const daysOfWeek = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
            const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
            const formattedDate = `${daysOfWeek[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
            setCurrentDate(formattedDate);

            const formatTime = (timezone: string) => {
                const formatter = new Intl.DateTimeFormat("en-GB", {
                    timeZone: timezone,
                    hour: "2-digit",
                    minute: "2-digit",
                });
                return formatter.format(now);
            };

            setCurrentTimeJKT(formatTime("Asia/Jakarta"));
            setCurrentTimeTKY(formatTime("Asia/Tokyo"));
            setCurrentTimeHK(formatTime("Asia/Hong_Kong"));
            setCurrentTimeNY(formatTime("America/New_York"));
        };

        const intervalId = setInterval(updateDateTime, 1000);
        updateDateTime();

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="w-full flex items-center justify-between bg-zinc-800 text-white px-3 py-1 text-sm">
            <div className="w-full flex items-center gap-5">
                <p><i className="fa-solid fa-calendar-days"></i> {currentDate}</p>
                <div className="flex items-center gap-3">
                    <p><strong>JKT</strong> {currentTimeJKT}</p>
                    <p><strong>TKY</strong> {currentTimeTKY}</p>
                    <p><strong>HK</strong> {currentTimeHK}</p>
                    <p><strong>NY</strong> {currentTimeNY}</p>
                </div>
            </div>

            {/* Bahasa */}
            <div>
                <div className="flex items-center gap-3">
                    <select className="border-2 border-gray-300 rounded">
                        <option value="id" className="bg-zinc-800 text-white">Indonesia</option>
                        <option value="en" className="bg-zinc-800 text-white">Inggris</option>
                        <option value="cn" className="bg-zinc-800 text-white">Cina</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default DateTimeDisplay;
