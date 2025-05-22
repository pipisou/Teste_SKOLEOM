import React from "react";

interface Props {
  search: string;
  onSearch: (value: string) => void;
}

const SearchBarComponent = ({ search, onSearch }: Props) => (
<div className="search-bar-container">
  <div className="search-input-wrapper">
    <input
      type="text"
      value={search}
      onChange={(e) => onSearch(e.target.value)}
      placeholder="Rechercher par nom ou email..."
      className="search-bar-input"
    />
    <span className="search-icon">🔍</span> 
  </div>
</div>

);

export const SearchBar = React.memo(SearchBarComponent);
