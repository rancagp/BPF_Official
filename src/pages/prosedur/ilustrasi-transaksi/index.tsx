import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

// Interface untuk data terjemahan
interface FormulaData {
  title: string;
  formula: string;
  items: string[];
  rollOverFees: string[];
  subtitle: string;
  rollOverTitle: string;
}

interface ExampleData {
  title: string;
  description: string;
  calculation: string[];
  result: string;
  note?: string;
  alternative?: {
    description: string;
    calculation: string[];
  };
}

interface DetailItem {
  key: string;
  label: string;
  value: string;
}

interface ContractCodeData {
  code: string;
  base: string;
  rateCategory: string;
  contractType: string;
}

export const getStaticProps: GetStaticProps = async ({ locale = 'id' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'footer', 'ilustrasi-transaksi'])),
    },
  };
};

export default function IlustrasiTransaksi() {
  const { t, ready } = useTranslation('ilustrasi-transaksi');
  
  // Pastikan data terjemahan sudah dimuat
  if (!ready) {
    return (
      <PageTemplate title="Memuat...">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#080031]"></div>
        </div>
      </PageTemplate>
    );
  }

  // Mengambil data terjemahan dengan tipe yang sesuai
  const formulaData = t('formula', { returnObjects: true }) as FormulaData;
  const examplesData = t('examples', { returnObjects: true }) as ExampleData[];
  const contractCodesData = t('contractCodes', { returnObjects: true }) as ContractCodeData[];

  // Contoh transaksi
  const tradingExamples: ExampleData[] = [
    {
      title: 'Transaksi EU1010_BBJ (Daytrade)',
      description: 'Nasabah membeli EU1010_BBJ di 1.3530 (2 lot) dan menjual di 1.3540',
      calculation: [
        'P/L = (1.3540-1.3530) x 100,000 x 2 - [($30 + $3.3) x 2]',
        'P/L = 0.0010 x 100,000 x 2 - $66.6',
        'P/L = $200 - $66.6 = $133.4 (laba)'
      ],
      result: 'P/L = $133.4 (laba)',
      alternative: {
        description: 'Jika harga turun ke 1.3525:',
        calculation: [
          'P/L = (1.3525-1.3530) x 100,000 x 2 - $66.6',
          'P/L = -0.0005 x 100,000 x 2 - $66.6',
          'P/L = -$100 - $66.6 = -$166.6 (rugi)'
        ]
      }
    },
    {
      title: 'Transaksi UJ10101_BBJ (Daytrade)',
      description: 'Nasabah menjual UJ1010_BBJ di 102.20 (1 lot) dan menutup di 102.12',
      calculation: [
        'P/L = (102.20-102.12)/102.12 x 100,000 x 1 - $33.3',
        'P/L = 0.0007834 x 100,000 - $33.3',
        'P/L = $78.34 - $33.3 = $45.04 (laba)'
      ],
      result: 'P/L = $45.04 (laba)',
      alternative: {
        description: 'Jika harga naik ke 102.27:',
        calculation: [
          'P/L = (102.20-102.27)/102.27 x 100,000 - $33.3',
          'P/L = -0.0006844 x 100,000 - $33.3',
          'P/L = -$68.44 - $33.3 = -$101.74 (rugi)'
        ]
      }
    }
  ];

  return (
    <PageTemplate title={t('title')}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 my-6">
        <ProfilContainer title={t('title')}>
          <div className="space-y-8 text-[#080031] text-sm sm:text-base leading-relaxed">

            {/* Rumus Perhitungan */}
            <section className="p-6 bg-[#080031]/5 rounded-lg border border-[#080031]/10">
              <h3 className="text-lg font-bold text-[#080031] mb-4 border-b-2 border-[#FF0000] pb-2 inline-block">
                {formulaData.title}
              </h3>
              <div className="p-4 mb-4 font-mono text-center text-white bg-[#080031] rounded-md text-sm">
                {formulaData.formula}
              </div>
              <h4 className="font-semibold mb-2 text-[#080031]">
                {t('formula.subtitle')}:
              </h4>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                {Array.isArray(formulaData.items) && formulaData.items.map((item: string, index: number) => (
                  <li key={index} className="text-justify">{item}</li>
                ))}
              </ul>
              
              <h4 className="font-semibold mt-6 mb-2 text-[#080031]">
                {t('formula.rollOverTitle')}:
              </h4>
              <ul className="list-disc pl-5 space-y-1">
                {Array.isArray(formulaData.rollOverFees) && formulaData.rollOverFees.map((fee: string, index: number) => (
                  <li key={`fee-${index}`} className="mb-1">{fee}</li>
                ))}
              </ul>
            </section>

            {/* Contoh Transaksi */}
            <section className="space-y-8">
              <h3 className="text-xl font-bold text-[#080031] border-b-2 border-[#FF0000] pb-2 inline-block">
                {t('examplesTitle', 'Contoh Transaksi')}
              </h3>
              
              {/* Transaction Examples */}
              <div className="space-y-8">
                {examplesData.map((example, index) => (
                  <div key={index} className="p-6 bg-white rounded-lg border border-[#080031]/10 hover:shadow-md transition-shadow">
                    <h5 className="font-bold text-[#080031] mb-3">{example.title}</h5>
                    <p className="mb-4 text-justify">{example.description}</p>
                    
                    <div className="bg-[#080031]/5 p-4 rounded-md mb-2">
                      {example.calculation.map((step, i) => (
                        <p key={i} className="font-mono text-sm mb-1">{step}</p>
                      ))}
                      <p className="font-mono text-sm font-bold mt-2 text-[#FF0000]">
                        {example.result}
                      </p>
                      {example.note && (
                        <p className="text-sm mt-2 italic">* {example.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section className="p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
              <h3 className="text-lg font-bold text-[#080031] mb-3">
                Catatan Penting
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li className="text-justify">Transaksi dapat dilakukan kapan saja selama jam perdagangan berlangsung</li>
                <li className="text-justify">Biaya dan komisi akan dikenakan sesuai dengan ketentuan yang berlaku</li>
                <li className="text-justify">Nilai tukar dapat berubah sewaktu-waktu sesuai dengan kondisi pasar</li>
                <li className="text-justify">Pastikan saldo mencukupi sebelum melakukan transaksi</li>
                <li className="text-justify">Biaya roll over akan dikenakan untuk transaksi yang melebihi 1 hari perdagangan</li>
                <li className="text-justify">Perhitungan di atas adalah simulasi dan dapat berubah sesuai kondisi pasar aktual</li>
              </ul>
            </section>

            {/* Kode & Jenis Kontrak */}
            <section>
              <h3 className="text-xl font-bold text-[#080031] border-b-2 border-[#FF0000] pb-2 inline-block">
                Kode & Jenis Kontrak
              </h3>
              
              <div className="overflow-x-auto mt-6">
                <table className="min-w-full bg-white border border-[#080031]/20">
                  <thead>
                    <tr className="bg-[#080031] text-white">
                      <th className="py-3 px-4 text-left border-b border-r border-white/20">Kode Kontrak</th>
                      <th className="py-3 px-4 text-left border-b border-r border-white/20">Dasar</th>
                      <th className="py-3 px-4 text-left border-b border-r border-white/20">Kategori Rates</th>
                      <th className="py-3 px-4 text-left border-b">Jenis Kontrak</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contractCodesData.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-[#080031]/5'}>
                        <td className="py-3 px-4 border-b border-r border-[#080031]/10">{item.code}</td>
                        <td className="py-3 px-4 border-b border-r border-[#080031]/10">{item.base}</td>
                        <td className="py-3 px-4 border-b border-r border-[#080031]/10">{item.rateCategory}</td>
                        <td className="py-3 px-4 border-b border-[#080031]/10">{item.contractType}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Ilustrasi Perhitungan Transaksi */}
            <section className="space-y-6">
              <h3 className="text-xl font-bold text-[#080031] border-b-2 border-[#FF0000] pb-2 inline-block">
                Ilustrasi Perhitungan Transaksi
              </h3>
              
              <div className="space-y-2">
                <p><span className="font-semibold">Perhitungan Profit or Loss (P/L):</span></p>
                <p>Untuk <span className="font-semibold">DIRECT RATES</span>:</p>
                <div className="p-4 bg-[#080031]/5 rounded-md font-mono text-sm mb-4">
                  P/L = (Harga Jual - Harga Beli) x Contract Size x Jumlah Lot
                </div>
                
                <p>Untuk <span className="font-semibold">INDIRECT RATES</span>:</p>
                <div className="p-4 bg-[#080031]/5 rounded-md font-mono text-sm mb-6">
                  P/L = (Harga Jual - Harga Beli) / Harga Likuidasi x Contract Size x Jumlah Lot
                </div>
              </div>

              {/* Trading Examples */}
              <div className="space-y-8">
                {tradingExamples.map((example, index) => (
                  <div key={index} className="p-6 bg-white rounded-lg border border-[#080031]/10 hover:shadow-md transition-shadow">
                    <h5 className="font-bold text-[#080031] mb-3">{example.title}</h5>
                    <p className="mb-4">{example.description}</p>
                    
                    <div className="bg-[#080031]/5 p-4 rounded-md mb-2">
                      {example.calculation.map((step, i) => (
                        <p key={i} className="font-mono text-sm mb-1">{step}</p>
                      ))}
                    </div>
                    
                    {example.alternative && (
                      <div className="mt-4">
                        <p className="text-sm mb-2">{example.alternative.description}</p>
                        <div className="bg-[#080031]/5 p-4 rounded-md">
                          {example.alternative.calculation.map((step, i) => (
                            <p key={`alt-${i}`} className="font-mono text-sm mb-1">{step}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </ProfilContainer>
      </div>
    </PageTemplate>
  );
}
