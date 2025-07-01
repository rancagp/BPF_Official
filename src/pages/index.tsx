// Home

import PageTemplate from "@/components/templates/PageTemplate";
import CarouselWithContent from "@/components/organisms/CarouselWithContent";
import ProdukContainer from "@/components/organisms/ProdukContainer";
import BeritaSection from "@/components/organisms/BeritaSection";
import AboutUs from "@/components/organisms/AboutUs";
import Iso from "@/components/organisms/Iso";
import Pengumuman from "@/components/organisms/Pengumuman";

export default function HomePage() {
  return (
    <PageTemplate title="Home - PT Solid Gold Berjangka">
      {/* Corousel */}
      <CarouselWithContent />

      {/* Content */}
      <div className="py-10 bg-white space-y-10">
        <div className="space-y-10 mb-20">
          <div className="px-52"><AboutUs /></div>

          <hr className="border-gray-200" />

          <div className="px-52">
            <ProdukContainer />
          </div>

          <hr className="border-gray-200" />

          <div className="px-52"><BeritaSection /></div>
        </div>

        <Iso />

        <div className="px-52 my-20">
          <Pengumuman />
        </div>
      </div>
    </PageTemplate >
  );
}
