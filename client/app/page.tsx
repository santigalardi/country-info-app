// pages/index.tsx
'use client';

import CountryCard from '@/components/CountryCard';
import useFetchCountries from '@/hooks/useFetchCountries';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const { countries, loading, error } = useFetchCountries();

  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Country List</h1>
      {loading ? (
        <div className="flex justify-center mt-10">
          <Loader2 className="w-20 h-20 mx-auto animate-spin" />
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {countries.map((country) => (
            <CountryCard
              key={country.countryCode}
              countryCode={country.countryCode}
              name={country.name}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
