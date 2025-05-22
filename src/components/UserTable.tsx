import { useMemo } from "react";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface Props {
  users: User[];
  onSelect: (user: User) => void;
  search: string;
  sortKey: "name" | "email";
  sortAsc: boolean;
  onSortChange: (key: "name" | "email") => void;
  currentPage: number;
  perPage: number;
}

export const UserTable = ({
  users,
  onSelect,
  search,
  sortKey,
  sortAsc,
  onSortChange,
  currentPage,
  perPage,
}: Props) => {

  const filtered = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(lowerSearch) ||
        u.email.toLowerCase().includes(lowerSearch)
    );
  }, [users, search]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const valA = a[sortKey].toLowerCase();
      const valB = b[sortKey].toLowerCase();
      return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
  }, [filtered, sortKey, sortAsc]);

  const paginated = useMemo(() => {
    return sorted.slice((currentPage - 1) * perPage, currentPage * perPage);
  }, [sorted, currentPage, perPage]);

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => onSortChange("name")}>
            Nom {sortKey === "name" && (sortAsc ? "↑" : "↓")}
          </th>
          <th onClick={() => onSortChange("email")}>
            Email {sortKey === "email" && (sortAsc ? "↑" : "↓")}
          </th>
          <th>Nom d'utilisateur</th>
          <th>Téléphone</th>
          <th>Site web</th>
          <th>Ville</th>
          <th>Entreprise</th>
        </tr>
      </thead>
      <tbody>
        {paginated.map((user) => (
          <tr key={user.id} onClick={() => onSelect(user)} style={{ cursor: "pointer" }}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.username}</td>
            <td>{user.phone}</td>
            <td>{user.website}</td>
            <td>{user.address.city}</td>
            <td>{user.company.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
