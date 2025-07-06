import UmumSection from "@/components/organisms/UmumSection";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

export default function Umum() {
    return (
        <PageTemplate title="Informasi Umum">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title="PT Rifan Financindo Berjangka - RFB">
                    <UmumSection />
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
