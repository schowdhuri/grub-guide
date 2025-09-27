import React from 'react';

type Status = 'Detailed' | 'Starting' | 'Planning';

interface Country {
  flag: string;
  name: string;
  dishes: string;
  status: Status;
}

export function CountryStats(): React.JSX.Element {
  const countries: Country[] = [
    { flag: '🇹🇭', name: 'Thailand', dishes: '50+', status: 'Detailed' },
    { flag: '🇻🇳', name: 'Vietnam', dishes: '2', status: 'Starting' },
    { flag: '🇲🇾', name: 'Malaysia', dishes: '1', status: 'Starting' },
    { flag: '🇱🇦', name: 'Laos', dishes: '1', status: 'Starting' },
    { flag: '🇰🇭', name: 'Cambodia', dishes: '1', status: 'Starting' },
    { flag: '🇵🇭', name: 'Philippines', dishes: '3', status: 'Starting' },
    { flag: '🇪🇬', name: 'Egypt', dishes: '4', status: 'Starting' },
    { flag: '🇺🇿', name: 'Uzbekistan', dishes: '2', status: 'Starting' },
    { flag: '🇰🇿', name: 'Kazakhstan', dishes: '4', status: 'Starting' }
  ];

  const getStatusColor = (status: Status): string => {
    switch (status) {
      case 'Detailed': return 'var(--ifm-color-success)';
      case 'Starting': return 'var(--ifm-color-warning)';
      default: return 'var(--ifm-color-emphasis-600)';
    }
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1rem',
      margin: '2rem 0'
    }}>
      {countries.map((country, index) => (
        <div
          key={index}
          style={{
            padding: '1rem',
            border: '1px solid var(--ifm-color-emphasis-300)',
            borderRadius: '8px',
            textAlign: 'center',
            background: 'var(--ifm-background-color)'
          }}
        >
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            {country.flag}
          </div>
          <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
            {country.name}
          </div>
          <div style={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: 'var(--ifm-color-primary)',
            marginBottom: '0.25rem'
          }}>
            {country.dishes} dishes
          </div>
          <div style={{
            fontSize: '0.8rem',
            color: getStatusColor(country.status),
            fontWeight: 'bold'
          }}>
            {country.status}
          </div>
        </div>
      ))}
    </div>
  );
}