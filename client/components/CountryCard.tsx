import Link from 'next/link';

interface CountryCardProps {
  countryCode: string;
  name: string;
}

const CountryCard: React.FC<CountryCardProps> = ({ countryCode, name }) => {
  return (
    <li className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <Link href={`/country/${countryCode}`}>
        <div className="block p-4 hover:bg-gray-100 transition-colors duration-200 ease-in-out">
          <h3 className="text-lg font-semibold text-black">{name}</h3>
        </div>
      </Link>
    </li>
  );
};

export default CountryCard;
