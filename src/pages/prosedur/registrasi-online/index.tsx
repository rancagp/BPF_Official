import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { FaCheckCircle, FaChevronRight } from 'react-icons/fa';
import ProfilContainer from "@/components/templates/PageContainer/Container";
import PageTemplate from "@/components/templates/PageTemplate";

export const getStaticProps: GetStaticProps = async ({ locale = 'id' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'prosedur', 'footer'])),
    },
  };
};

const StepItem = ({ title, children }: { title: string; children?: React.ReactNode }) => (
  <div className="mb-2">
    <h3 className="text-lg font-semibold text-[#4C4C4C] flex items-center">
      <FaCheckCircle className="text-[#F2AC59] mr-2 text-xl" />
      {title}
    </h3>
    {children && <div className="ml-8">{children}</div>}
  </div>
);

const BankAccount = ({ bank, idr, usd }: { bank: string; idr: string; usd?: string }) => (
  <div className="bg-white p-4 border border-[#E5E7EB] rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
    <h4 className="font-semibold text-[#1F2937] mb-2">{bank}</h4>
    <div className="space-y-1">
      <p className="text-sm text-[#4B5563] flex items-center">
        <span className="inline-block w-2 h-2 rounded-full bg-[#F2AC59] mr-2"></span>
        {idr}
      </p>
      {usd && (
        <p className="text-sm text-[#4B5563] flex items-center">
          <span className="inline-block w-2 h-2 rounded-full bg-[#9B9FA7] mr-2"></span>
          {usd}
        </p>
      )}
    </div>
  </div>
);

export default function RegistrasiOnline() {
  const { t } = useTranslation('prosedur');
  const steps = t('registrationFlow.steps', { returnObjects: true }) as any[];
  
  // Data rekening bank
  const bankAccounts = t('bankAccounts', { returnObjects: true }) as Array<{
    bank: string;
    idr: string;
    usd?: string;
  }>;
  
  return (
    <PageTemplate title={t('registrationFlow.title')}>
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-52 my-10">
        <ProfilContainer title={t('registrationFlow.title')}>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={index} className="bg-white p-4 sm:p-5 rounded-lg border border-[#E5E7EB] shadow-sm">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-[#F2AC59] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-0.5">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#4C4C4C] mb-2">
                      {step.title}
                      {step.title.endsWith(':') ? '' : ':'}
                    </h3>
                    
                    {step.description && (
                      <p className="text-[#4B5563] mb-2">{step.description}</p>
                    )}
                    
                    {step.items && step.items.length > 0 && (
                      <ul className="space-y-2 mt-3 pl-2">
                        {step.items.map((item: string, itemIndex: number) => (
                          <li key={itemIndex} className="flex items-start">
                            <FaChevronRight className="text-[#F2AC59] text-xs mt-1.5 mr-2 flex-shrink-0" />
                            <span className="text-[#4B5563]">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {/* Tambahan khusus untuk langkah 5 - Rekening Bank */}
                    {index === 4 && (
                      <>
                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                          {bankAccounts.map((account, i) => (
                            <BankAccount 
                              key={i}
                              bank={account.bank}
                              idr={account.idr}
                              usd={account.usd}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-[#4B5563] mt-4 italic">
                          {t('segregatedAccountNote')}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ProfilContainer>
      </div>
    </PageTemplate>
  );
}
