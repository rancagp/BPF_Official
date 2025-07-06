import pengumumanList from "@/data/PengumumanList";
import NewsCard2 from "@/components/moleculs/NewsCard2";
import PageTemplate from "@/components/templates/PageTemplate";
import ProfilContainer from "@/components/templates/PageContainer/Container";

export default function InformasiUmum() {
    return (
        <PageTemplate title="Informasi Umum">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title="Informasi Umum">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {pengumumanList.map((item, index) => (
                            <NewsCard2
                                key={index}
                                title={item.title}
                                date={item.date}
                                content={item.content}
                                link={`/informasi/umum/${item.slug}`}
                            />
                        ))}
                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
