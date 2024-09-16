'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import useFetchCountry from '@/hooks/useFetchCountry';
import BorderCountriesWidget from '@/components/BorderCountriesWidget';
import PopulationChart from '@/components/PopulationChart';

const CountryPage: React.FC = () => {
  const router = useRouter();
  const { code } = useParams();

  const countryCode = typeof code === 'string' ? code : '';

  const { countryInfo, loading } = useFetchCountry(countryCode);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-20 h-20 animate-spin" />
      </div>
    );
  }

  if (!countryInfo) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-4">
        <p className="text-xl">No country data available</p>
        <button
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => window.history.back()}
          aria-label="Go back to the previous page"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Go back</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-6xl font-bold text-center mb-8">
        {countryInfo.country.commonName}
      </h1>
      <div className="flex justify-center mb-8">
        <Image
          src={countryInfo.flag}
          alt={`${countryInfo.country.commonName} flag`}
          width={400}
          height={200}
          className="object-cover"
          priority
        />
      </div>
      <BorderCountriesWidget borderCountries={countryInfo.country.borders} />
      <PopulationChart data={countryInfo.population} />
      <button
        className="w-full mt-8 py-2 text-blue-600 border border-blue-600 rounded hover:text-white hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => router.push('/')}
      >
        Countries List
      </button>
    </div>
  );
};

export default CountryPage;
