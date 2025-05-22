import { useUsers } from "./hooks/useUsers";
import { useState, useCallback } from "react";
import { SearchBar } from "./components/SearchBar";
import { UserTable } from "./components/UserTable";
import { UserDetailModal } from "./components/UserDetailModal";
import './App.css';
import { User } from "./types/User"

function App() {
  const { users, error, loading } = useUsers();
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<"name" | "email">("name");
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const perPage = 5;

  const handleSortChange = useCallback((key: "name" | "email") => {
    if (sortKey === key) {
      setSortAsc((prev) => !prev);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  }, [sortKey]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="app-container">
      <h1>Liste des utilisateurs</h1>
  
      <SearchBar search={search} onSearch={setSearch} />
  
      <div className="table-container">
        <UserTable
          users={users}
          onSelect={setSelectedUser}
          search={search}
          sortKey={sortKey}
          sortAsc={sortAsc}
          onSortChange={handleSortChange}
          currentPage={currentPage}
          perPage={perPage}
        />
      </div>
  
      <div style={{ marginTop: "1rem" }}>
        {[1, 2].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            style={{
              padding: "0.5rem 1rem",
              margin: "0 0.25rem",
              borderRadius: "4px",
              backgroundColor: currentPage === page ? "#007bff" : "#dee2e6",
              color: currentPage === page ? "#fff" : "#000",
              border: "none",
            }}
          >
            {page}
          </button>
        ))}
      </div>
  
      <UserDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
  ;
  
}

export default App;
