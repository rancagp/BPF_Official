// Profil Perusahaan

import CardVisiMisi from "@/components/atoms/CardVisiMisi";
import TitleH3 from "@/components/atoms/TitleH3";
import ProfilContainer from "@/components/templates/PageContainer/ProfilContainer";
import PageTemplate from "@/components/templates/PageTemplate";

export default function WakilPialang() {
    const WakilPialangList = [
        "AXA Tower - Jakarta",
        "DBS Tower - Jakarta",
        "Medan",
        "Solo",
        "Surabaya Ciputra",
        "Balikpapan",
        "Palembang",
        "Bandung",
        "Pekanbaru",
        "Surabaya Pakuwon",
        "Semarang",
        "Yogyakarta",
    ];

    return (
        <PageTemplate title="Wakil Pialang - PT Solid Gold Berjangka">
            <div className="my-10 mx-52">
                <ProfilContainer title="Wakil Pialang">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-20 gap-6">
                        {WakilPialangList.map((item) => (
                            <a href="/profil/wakil-pialang/daftar" className="border-2 border-green-500 p-10 text-2xl uppercase rounded-lg bg-zinc-200 text-green-500 hover:border-green-600 hover:bg-zinc-300 hover:text-green-600 transition-all ease-in duration-300">{item}</a>
                        ))}
                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate >
    );
}
