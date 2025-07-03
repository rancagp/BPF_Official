// Profil Perusahaan

import ProdukContainer2 from "@/components/organisms/ProdukContainerMultilateral";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

export default function Multilateral() {
    return (
        <PageTemplate title="Legalitas - PT Solid Gold Berjangka">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title="Produk Multilateral">
                    <ProdukContainer2 />
                </ProfilContainer>
            </div>
        </PageTemplate >
    );
}
