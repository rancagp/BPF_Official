import PageTemplate from "@/components/templates/PageTemplate";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import Image from "next/image";

const GlosariPage = () => {
    const tableData = [
        { multilateral: 'Dalam bursa', bilateral: 'Luar bursa (SPA)' },
        { multilateral: 'Aturan bursa', bilateral: 'Aturan penyelenggara SPA' },
        { multilateral: 'Sistem bursa (JAFeTS,J-Trader)', bilateral: 'Sistem penyelenggara' },
        { multilateral: 'Lawan tidak tetap', bilateral: 'Lawan tetap' },
        { multilateral: 'Umumnya Order Driven', bilateral: 'Semuanya Quote Driven' },
        { multilateral: 'Bisa tidak ada harga', bilateral: 'Pasti ada harga' },
        { multilateral: 'Bisa antri', bilateral: 'Harus makan harga yang ada' },
        { multilateral: 'Harga sama untuk satu kontrak', bilateral: 'Spread berbeda-beda' },
        { multilateral: 'Bursa netral', bilateral: 'Motivasi untung' },
    ];

    return (
        <PageTemplate title="Mekanisme Perdagangan - PT. Kresna Berjangka Investama">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
            <ProfilContainer title="Glosari">
                
            </ProfilContainer>
            </div>
        </PageTemplate>
    );
};

export default GlosariPage;
