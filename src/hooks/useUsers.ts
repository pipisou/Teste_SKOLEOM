import { useEffect, useState } from "react";
import { User } from "../types/User";

  
  export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
          if (!res.ok) throw new Error("Erreur lors du chargement des données.");
          return res.json();
        })
        .then(setUsers)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }, []);
  
    return { users, error, loading };
  };
  