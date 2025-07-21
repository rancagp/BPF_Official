import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

export default function InformasiUmum() {
    return (
        <PageTemplate title="Informasi">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title="Informasi Umum">
                    <p>Konten informasi umum akan ditampilkan di sini.</p>
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
