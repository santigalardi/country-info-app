'use client';

import { BorderCountry } from '@/hooks/useFetchCountry';

interface BorderCountriesWidgetProps {
  borderCountries: BorderCountry[];
}

const BorderCountriesWidget: React.FC<BorderCountriesWidgetProps> = ({
  borderCountries,
}) => {
  return (
    <div className="p-6 shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-white">
        Border Countries
      </h2>
      {borderCountries.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {borderCountries.map((country, index) => (
            <a
              key={index}
              href={`/country/${country.countryCode}`}
              className="text-blue-500 hover:underline"
            >
              {country.commonName}
            </a>
          ))}
        </div>
      ) : (
        <p>No border countries available</p>
      )}
    </div>
  );
};

export default BorderCountriesWidget;
