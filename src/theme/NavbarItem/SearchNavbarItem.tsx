import React from 'react';
import { SearchComponent } from '@site/src/components/SearchComponent';

export default function SearchNavbarItem(): React.JSX.Element {
  return (
    <div className="search-navbar-wrapper">
      <SearchComponent />
    </div>
  );
}