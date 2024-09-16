import { useState, useEffect } from 'react';

export interface BorderCountry {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: string[] | null;
}

interface CountryInfo {
  country: {
    commonName: string;
    officialName: string;
    countryCode: string;
    region: string;
    borders: BorderCountry[];
  };
  population: {
    year: string;
    population: number;
  }[];
  flag: string;
}

interface UseFetchCountryResult {
  countryInfo: CountryInfo | null;
  loading: boolean;
  error: string | null;
}

const useFetchCountry = (countryCode: string): UseFetchCountryResult => {
  const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountryInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/country/${countryCode}`
        );
        if (!response.ok) {
          throw new Error('Error fetching country info');
        }
        const data = await response.json();
        setCountryInfo(data);
      } catch (error) {
        setError('Error fetching country info');
        console.error('Error fetching country info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryInfo();
  }, [countryCode]);

  return { countryInfo, loading, error };
};

export default useFetchCountry;
