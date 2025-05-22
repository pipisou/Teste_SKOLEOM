interface Props {
    search: string;
    onSearch: (value: string) => void;
  }
  
  export const SearchBar = ({ search, onSearch }: Props) => (
    <input
      type="text"
      value={search}
      onChange={(e) => onSearch(e.target.value)}
      placeholder="Rechercher par nom ou email..."
      className="p-4 text-lg border border-gray-400 rounded w-full mb-10"
      style={{ maxWidth: '600px', margin: '0 auto', display: 'block' }}
    />
  );
  
  