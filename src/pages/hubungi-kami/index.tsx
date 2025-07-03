// Profil Perusahaan

import ProdukContainer2 from "@/components/organisms/ProdukContainerMultilateral";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

export default function Multilateral() {
    return (
        <PageTemplate title="Hubungi Kami - PT Solid Gold Berjangka">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title="Hubungi Kami: PT. Rifan Financindo Berjangka">
                    <div className="space-y-5 text-left">
                        <div className="space-y-5">
                            <h2 className="text-2xl uppercase font-bold">Kantor Pusat</h2>
                            <div className="">
                                <h5 className="text-lg uppercase font-medium">Jakarta</h5>
                                <a href="https://maps.google.com/?q=AXA+Tower+Kuningan+City+Lt.+23%2C+25%2C+30+%26+35%0D%0AJl.+Prof.+DR.+Satrio+Kav.+18%2C+Kuningan+Setiabudi%2C+Jakarta+12940"
                                    className="hover:underline hover:text-green-500 text-base">AXA Tower Kuningan City Lt. 23, 25, 30 & 35 Jl. Prof. DR. Satrio Kav. 18, Kuningan Setiabudi, Jakarta 12940</a>
                                <p><strong>Telepon:</strong> (021) 30056300</p>
                                <p><strong>Email:</strong> <a href="mailto:info@rfb.co.id">corporate@rifan-financindo-berjangka.co.id</a></p>
                            </div>
                        </div>

                        <hr className="border-zinc-300" />

                        <div className="flex flex-col gap-3">
                            <a href="https://pengaduan.bappebti.go.id/" className="uppercase font-bold text-lg md:text-xl text-green-500 hover:text-green-600">Pengaduan Online</a>
                            <a href="mailto:corporate@rifan-financindo-berjangka.co.id" className="uppercase font-bold text-lg md:text-xl text-green-500 hover:text-green-600">Pengaduan Online</a>
                        </div>
                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate >
    );
}
