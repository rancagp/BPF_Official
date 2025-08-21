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
              <div className="w-20 h-1 bg-green-500 mb-6"></div>
              <div className="space-y-6">
                {/* Day Trade Profit */}
                <div className="p-6 border rounded-lg">
                  <h4 className="font-bold mb-2">
                    {t('ilustrasiTransaksi.contohTransaksi.dayTradeProfit.title')}
                  </h4>
                  <p className="mb-4">
                    {t('ilustrasiTransaksi.contohTransaksi.dayTradeProfit.description')}
                  </p>
                  <div className="p-4 bg-gray-100 rounded-md font-mono text-xs sm:text-sm">
                    {(t('ilustrasiTransaksi.contohTransaksi.dayTradeProfit.calculation', { returnObjects: true }) as string[]).map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                    <div className="mt-1">
                      <strong className="text-green-600">
                        {t('ilustrasiTransaksi.contohTransaksi.dayTradeProfit.result')}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Day Trade Loss */}
                <div className="p-6 border rounded-lg">
                  <h4 className="font-bold mb-2">
                    {t('ilustrasiTransaksi.contohTransaksi.dayTradeLoss.title')}
                  </h4>
                  <p className="mb-4">
                    {t('ilustrasiTransaksi.contohTransaksi.dayTradeLoss.description')}
                  </p>
                  <div className="p-4 bg-gray-100 rounded-md font-mono text-xs sm:text-sm">
                    {(t('ilustrasiTransaksi.contohTransaksi.dayTradeLoss.calculation', { returnObjects: true }) as string[]).map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                    <div className="mt-1">
                      <strong className="text-red-600">
                        {t('ilustrasiTransaksi.contohTransaksi.dayTradeLoss.result')}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Overnight Trade */}
                <div className="p-6 border rounded-lg">
                  <h4 className="font-bold mb-2">
                    {t('ilustrasiTransaksi.contohTransaksi.overnightTrade.title')}
                  </h4>
                  <p className="mb-4">
                    {t('ilustrasiTransaksi.contohTransaksi.overnightTrade.description')}
                  </p>
                  <div className="p-4 bg-gray-100 rounded-md font-mono text-xs sm:text-sm">
                    {(t('ilustrasiTransaksi.contohTransaksi.overnightTrade.calculation', { returnObjects: true }) as string[]).map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                    <div className="mt-1">
                      <strong className="text-green-600">
                        {t('ilustrasiTransaksi.contohTransaksi.overnightTrade.result')}
                      </strong>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    *{t('ilustrasiTransaksi.contohTransaksi.overnightTrade.note')}
                  </p>
                </div>
              </div>
            </section>

            {/* Catatan Penting */}
            <section className="p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                {t('ilustrasiTransaksi.catatanPenting.title')}
              </h3>
              <ul className="list-disc list-inside space-y-2">
                {(t('ilustrasiTransaksi.catatanPenting.items', { returnObjects: true }) as string[]).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Kode & Jenis Kontrak */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {t('ilustrasiTransaksi.kodeJenisKontrak.title')}
              </h2>
              <div className="w-20 h-1 bg-green-500 mb-6"></div>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-collapse text-xs sm:text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-4 border-b border-r">
                        {t('ilustrasiTransaksi.kodeJenisKontrak.table.headers.kodeKontrak')}
                      </th>
                      <th className="py-2 px-4 border-b border-r">
                        {t('ilustrasiTransaksi.kodeJenisKontrak.table.headers.dasar')}
                      </th>
                      <th className="py-2 px-4 border-b border-r">
                        {t('ilustrasiTransaksi.kodeJenisKontrak.table.headers.kategori')}
                      </th>
                      <th className="py-2 px-4 border-b">
                        {t('ilustrasiTransaksi.kodeJenisKontrak.table.headers.jenisKontrak')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { kodeKontrak: 'GU1010_BBJ', dasar: 'GBP/USD', kategori: 'DIRECT', jenisKontrak: t('ilustrasiTransaksi.kodeJenisKontrak.types.spotGbpUsd') },
                      { kodeKontrak: 'EU1010_BBJ', dasar: 'EUR/USD', kategori: 'DIRECT', jenisKontrak: t('ilustrasiTransaksi.kodeJenisKontrak.types.spotEurUsd') },
                      { kodeKontrak: 'AU1010_BBJ', dasar: 'AUD/USD', kategori: 'DIRECT', jenisKontrak: t('ilustrasiTransaksi.kodeJenisKontrak.types.spotAudUsd') },
                      { kodeKontrak: 'UC1010_BBJ', dasar: 'USD/CHF', kategori: 'INDIRECT', jenisKontrak: t('ilustrasiTransaksi.kodeJenisKontrak.types.spotUsdChf') },
                      { kodeKontrak: 'UJ1010_BBJ', dasar: 'USD/JPY', kategori: 'INDIRECT', jenisKontrak: t('ilustrasiTransaksi.kodeJenisKontrak.types.spotUsdJpy') }
                    ].map((item, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4 border-b border-r">{item.kodeKontrak}</td>
                        <td className="py-2 px-4 border-b border-r">{item.dasar}</td>
                        <td className="py-2 px-4 border-b border-r">{item.kategori}</td>
                        <td className="py-2 px-4 border-b">{item.jenisKontrak}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Ilustrasi Perhitungan Transaksi */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {t('ilustrasiTransaksi.ilustrasiPerhitungan.title')}
              </h2>
              <div className="w-20 h-1 bg-green-500 mb-6"></div>
              <div className="space-y-6">
                {/* Direct Rates Example */}
                <div className="p-6 border rounded-lg">
                  <h4 className="font-bold mb-2">
                    {t('ilustrasiTransaksi.ilustrasiPerhitungan.directRates.title')}
                  </h4>
                  <div className="p-4 mb-4 font-mono text-center text-white bg-gray-800 rounded-md text-xs sm:text-sm">
                    {t('ilustrasiTransaksi.ilustrasiPerhitungan.directRates.formula')}
                  </div>
                  <p className="mb-4">
                    {t('ilustrasiTransaksi.ilustrasiPerhitungan.directRates.example1')}
                  </p>
                  <div className="p-4 bg-gray-100 rounded-md font-mono text-xs sm:text-sm mb-4">
                    P/L = (1.3540 - 1.3530) x 100.000 x 2 - [(US$30 + US$3.3) x 2]<br />
                    P/L = 0,0010 x 100.000 x 2 - (US$33.3 x 2)<br />
                    <strong className="text-green-600">
                      {t('ilustrasiTransaksi.ilustrasiPerhitungan.directRates.results.profit')}
                    </strong>
                  </div>
                  <p className="mb-4">
                    {t('ilustrasiTransaksi.ilustrasiPerhitungan.directRates.example2')}
                  </p>
                  <div className="p-4 bg-gray-100 rounded-md font-mono text-xs sm:text-sm">
                    P/L = (1.3525 - 1.3530) x 100.000 x 2 - [(US$30 + US$3.3) x 2]<br />
                    P/L = -0,0005 x 100.000 x 2 - (US$33.3 x 2)<br />
                    <strong className="text-red-600">
                      {t('ilustrasiTransaksi.ilustrasiPerhitungan.directRates.results.loss')}
                    </strong>
                  </div>
                </div>

                {/* Indirect Rates Example */}
                <div className="p-6 border rounded-lg">
                  <h4 className="font-bold mb-2">
                    {t('ilustrasiTransaksi.ilustrasiPerhitungan.indirectRates.title')}
                  </h4>
                  <div className="p-4 mb-4 font-mono text-center text-white bg-gray-800 rounded-md text-xs sm:text-sm">
                    {t('ilustrasiTransaksi.ilustrasiPerhitungan.indirectRates.formula')}
                  </div>
                  <p className="mb-4">
                    {t('ilustrasiTransaksi.ilustrasiPerhitungan.indirectRates.example')}
                  </p>
                  <div className="p-4 bg-gray-100 rounded-md font-mono text-xs sm:text-sm">
                    P/L = ((102.20 - 102.12) / 102.12) x 100.000 x 1 - [(US$30 + US$3.3) x 1]<br />
                    P/L = (0.0007834 x 100.000) - US$33.3<br />
                    <strong className="text-green-600">
                      {t('ilustrasiTransaksi.ilustrasiPerhitungan.indirectRates.result')}
                    </strong>
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
