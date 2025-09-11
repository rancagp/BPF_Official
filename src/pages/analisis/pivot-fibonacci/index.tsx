import { useState } from "react";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import PageTemplate from "@/components/templates/PageTemplate";
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PivotSection from "@/components/organisms/PivotSection"; 
import FibonacciSection from "@/components/organisms/FIbonacciSection";
import HistoricalTable from "@/components/organisms/HistoricalDataContent";

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'id', ['pivot-fibonacci', 'common', 'footer', 'historical-data'])),
  },
});

export default function HistoricalData() {
    const { t } = useTranslation('pivot-fibonacci');
    const [activeTab, setActiveTab] = useState("Pivot");

    return (
        <PageTemplate title={t('title')}>
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
                <ProfilContainer title={t('title')}>
                    <div className="space-y-6">
                        {/* Tabs */}
                        <div className="flex border-b space-x-4">
                            {["Pivot", "Fibonacci"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 font-medium ${activeTab === tab
                                        ? "border-b-2 border-[#F2AC59] text-[#F2AC59]"
                                        : "text-gray-500 hover:text-[#F2AC59]"
                                        }`}
                                >
                                    {t(`tabs.${tab.toLowerCase()}`)}
                                </button>
                            ))}
                        </div>

                        {/* Dynamic Section */}
                        {activeTab === "Pivot" && <PivotSection />}
                        {activeTab === "Fibonacci" && <FibonacciSection />}

                        <hr className="border-zinc-200" />

                        <HistoricalTable />
                    </div>
                </ProfilContainer>
            </div>
        </PageTemplate>
    );
}
