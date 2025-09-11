import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

interface DetailItem {
  key: string;
  label: string;
  value: string;
}

interface CalculationExample {
  title: string;
  description: string;
  calculation: string[];
  alternative?: {
    description: string;
    calculation: string[];
  };
}

interface ProfitLossExample {
  title: string;
  calculation: string[];
}

interface CalculationIllustration {
  title: string;
  description: string;
  profit: ProfitLossExample;
  loss: ProfitLossExample;
}

interface TransactionExample {
  title: string;
  description: string;
  calculation: string[];
  alternative?: {
    description: string;
    calculation: string[];
  };
}

interface DayTradeExample extends TransactionExample {
  alternative?: {
    description: string;
    calculation: string[];
  };
}

interface OvernightTradeExample extends TransactionExample {}

interface TransactionExamples {
  dayTrade: {
    title: string;
    examples: DayTradeExample[];
  };
  overnightTrade: {
    title: string;
    examples: OvernightTradeExample[];
  };
}

interface ContractCode {
  kodeKontrak: string;
  dasar: string;
  kategori: string;
  jenisKontrak: string;
}

export const getStaticProps: GetStaticProps = async ({ locale = 'id' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'prosedur', 'footer'])),
    },
  };
};

export default function IlustrasiTransaksi() {
  const { t } = useTranslation('prosedur');
  
  return (
    <PageTemplate title={t('ilustrasiTransaksi.title')}>
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
        <ProfilContainer title={t('ilustrasiTransaksi.title')}>
          <div className="space-y-8 text-gray-700 text-sm sm:text-base leading-relaxed">
            <p>{t('ilustrasiTransaksi.description')}</p>

            {/* Rumus Perhitungan */}
            <section className="p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                {t('ilustrasiTransaksi.rumusPerhitungan.title')}
              </h3>
              <div className="p-4 mb-4 font-mono text-center text-white bg-gray-800 rounded-md text-xs sm:text-sm">
                {t('ilustrasiTransaksi.rumusPerhitungan.formula')}
              </div>
              <h4 className="font-semibold mb-2">
                {t('ilustrasiTransaksi.rumusPerhitungan.keterangan')}
              </h4>
              <ul className="list-disc list-inside space-y-2">
                {(t('ilustrasiTransaksi.rumusPerhitungan.details', { returnObjects: true }) as DetailItem[]).map((item) => (
                  <li key={item.key}>
                    <strong>{item.label}:</strong> {item.value}
                  </li>
                ))}
              </ul>
              <h4 className="font-semibold mt-4 mb-2">
                {t('ilustrasiTransaksi.rumusPerhitungan.rollOverFee.title')}
              </h4>
              <ul className="list-disc list-inside space-y-1">
                {(t('ilustrasiTransaksi.rumusPerhitungan.rollOverFee.items', { returnObjects: true }) as string[]).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Contoh Transaksi */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {t('ilustrasiTransaksi.contohTransaksi.title')}
              </h2>
              <div className="w-20 h-1 bg-[#F2AC59] mb-6"></div>
              <div className="space-y-6">
                {/* Day Trade Examples */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {t('ilustrasiTransaksi.contohTransaksi.dayTrade.title')}
                  </h3>
                  
                  {(t('ilustrasiTransaksi.contohTransaksi.dayTrade.examples', { returnObjects: true }) as DayTradeExample[]).map((example, index) => (
                    <div key={index} className="p-6 border rounded-lg">
                      <h4 className="font-bold mb-2">
                        {example.title}
                      </h4>
                      <p className="mb-4">
                        {example.description}
                      </p>
                      <div className="p-4 bg-gray-100 rounded-md font-mono text-xs sm:text-sm">
                        {example.calculation.map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                        {example.alternative && (
                          <div className="mt-4">
                            <p className="font-medium">{example.alternative.description}</p>
                            {example.alternative.calculation.map((line: string, i: number) => (
                              <div key={`alt-${i}`}>{line}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Overnight Trade Examples */}
                <div className="space-y-6 mt-8">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {t('ilustrasiTransaksi.contohTransaksi.overnightTrade.title')}
                  </h3>
                  
                  {(t('ilustrasiTransaksi.contohTransaksi.overnightTrade.examples', { returnObjects: true }) as OvernightTradeExample[]).map((example, index) => (
                    <div key={index} className="p-6 border rounded-lg">
                      <h4 className="font-bold mb-2">
                        {example.title}
                      </h4>
                      <p className="mb-4">
                        {example.description}
                      </p>
                      <div className="p-4 bg-gray-100 rounded-md font-mono text-xs sm:text-sm">
                        {example.calculation.map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Catatan Penting */}
            <section className="p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                Catatan Penting
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Transaksi dapat dilakukan kapan saja selama jam perdagangan berlangsung</li>
                <li>Biaya dan komisi akan dikenakan sesuai dengan ketentuan yang berlaku</li>
                <li>Nilai tukar dapat berubah sewaktu-waktu sesuai dengan kondisi pasar</li>
                <li>Pastikan saldo mencukupi sebelum melakukan transaksi</li>
              </ul>
            </section>

            {/* Kode & Jenis Kontrak */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {t('ilustrasiTransaksi.kodeKontrak.title')}
              </h2>
              <div className="w-20 h-1 bg-[#F2AC59] mb-6"></div>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-collapse text-xs sm:text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-4 border-b border-r">
                        {t('ilustrasiTransaksi.kodeKontrak.table.headers.0')}
                      </th>
                      <th className="py-2 px-4 border-b border-r">
                        {t('ilustrasiTransaksi.kodeKontrak.table.headers.1')}
                      </th>
                      <th className="py-2 px-4 border-b border-r">
                        {t('ilustrasiTransaksi.kodeKontrak.table.headers.2')}
                      </th>
                      <th className="py-2 px-4 border-b">
                        {t('ilustrasiTransaksi.kodeKontrak.table.headers.3')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(t('ilustrasiTransaksi.kodeKontrak.table.rows', { returnObjects: true }) as string[][]).map((row, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4 border-b border-r">{row[0]}</td>
                        <td className="py-2 px-4 border-b border-r">{row[1]}</td>
                        <td className="py-2 px-4 border-b border-r">{row[2]}</td>
                        <td className="py-2 px-4 border-b">{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Ilustrasi Perhitungan Transaksi */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {t('ilustrasiTransaksi.kodeKontrak.ilustrasiPerhitungan.title')}
              </h2>
              <div className="w-20 h-1 bg-[#F2AC59] mb-6"></div>
              <div className="space-y-6">
                {/* Direct Rates Example */}
                <div className="p-6 border rounded-lg">
                  <h4 className="font-bold mb-2">
                    {t('ilustrasiTransaksi.kodeKontrak.ilustrasiPerhitungan.directRates.title')}
                  </h4>
                  <div className="p-4 mb-4 font-mono text-center text-white bg-gray-800 rounded-md text-xs sm:text-sm">
                    {t('ilustrasiTransaksi.kodeKontrak.ilustrasiPerhitungan.directRates.formula')}
                  </div>
                  <p className="mb-4">
                    {t('ilustrasiTransaksi.kodeKontrak.ilustrasiPerhitungan.example1.description')}
                  </p>
                  <div className="p-4 bg-gray-100 rounded-md font-mono text-xs sm:text-sm space-y-2">
                    <div className="font-semibold">
                      {t('ilustrasiTransaksi.kodeKontrak.ilustrasiPerhitungan.example1.profit.title')}:
                    </div>
                    {(t('ilustrasiTransaksi.kodeKontrak.ilustrasiPerhitungan.example1.profit.calculation', { returnObjects: true }) as string[]).map((line, i) => (
                      <div key={i} className="ml-4">{line}</div>
                    ))}
                    
                    <div className="font-semibold mt-4">
                      {t('ilustrasiTransaksi.kodeKontrak.ilustrasiPerhitungan.example1.loss.title')}:
                    </div>
                    {(t('ilustrasiTransaksi.kodeKontrak.ilustrasiPerhitungan.example1.loss.calculation', { returnObjects: true }) as string[]).map((line, i) => (
                      <div key={`loss-${i}`} className="ml-4">{line}</div>
                    ))}
                  </div>
                </div>

                {/* Indirect Rates Example */}
                <div className="p-6 border rounded-lg">
                  <h4 className="font-bold mb-2">
                    {t('ilustrasiTransaksi.kodeKontrak.ilustrasiPerhitungan.indirectRates.title')}
                  </h4>
                  <div className="p-4 mb-4 font-mono text-center text-white bg-gray-800 rounded-md text-xs sm:text-sm">
                    {t('ilustrasiTransaksi.kodeKontrak.ilustrasiPerhitungan.indirectRates.formula')}
                  </div>
                  <p className="mb-4">
                    {t('ilustrasiTransaksi.kodeKontrak.ilustrasiPerhitungan.example2.description')}
                  </p>
                  <div className="p-4 bg-gray-100 rounded-md font-mono text-xs sm:text-sm space-y-2">
                    <div className="font-semibold">
                      {t('ilustrasiTransaksi.kodeKontrak.ilustrasiPerhitungan.example2.profit.title')}:
                    </div>
                    {(t('ilustrasiTransaksi.kodeKontrak.ilustrasiPerhitungan.example2.profit.calculation', { returnObjects: true }) as string[]).map((line, i) => (
                      <div key={i} className="ml-4">{line}</div>
                    ))}
                    
                    <div className="font-semibold mt-4">
                      {t('ilustrasiTransaksi.kodeKontrak.ilustrasiPerhitungan.example2.loss.title')}:
                    </div>
                    {(t('ilustrasiTransaksi.kodeKontrak.ilustrasiPerhitungan.example2.loss.calculation', { returnObjects: true }) as string[]).map((line, i) => (
                      <div key={`loss-${i}`} className="ml-4">{line}</div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </ProfilContainer>
      </div>
    </PageTemplate>
  );
}
