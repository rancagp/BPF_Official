import { useRouter } from "next/router";
import pengumumanList from "@/data/PengumumanList";
import PageTemplate from "@/components/templates/PageTemplate";
import Header1 from "@/components/moleculs/Header1";
import ProfilContainer from "@/components/templates/PageContainer/Container";

export default function PengumumanDetail() {
    const router = useRouter();
    const { slug } = router.query;

    const data = pengumumanList.find(item => item.slug === slug);

    if (!data) {
        return (
            <PageTemplate title="Pengumuman Tidak Ditemukan">
                <div className="px-4 py-20 text-center text-gray-500">Pengumuman tidak ditemukan.</div>
            </PageTemplate>
        );
    }

    return (
        <PageTemplate title={data.title}>
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title={data.title}>
                    <div className="space-y-5">
                        <p className="text-gray-500">
                            {new Date(data.date).toLocaleDateString("id-ID", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric"
                            })}
                        </p>

                        <div
                            className="text-lg leading-relaxed text-gray-700"
                            dangerouslySetInnerHTML={{ __html: data.content }}
                        />
                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
