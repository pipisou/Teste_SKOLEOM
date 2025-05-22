import React, { useState, useEffect } from 'react';

// Définition du type User pour le typage
interface User {
  id: number;
  name: string;
  email: string;
  // autres propriétés possibles...
}

// Composant dédié à la liste des utilisateurs
const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour récupérer les utilisateurs, séparée pour clarifier
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!res.ok) {
        throw new Error(`Erreur HTTP : ${res.status}`);
      }
      const data: User[] = await res.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  // useEffect sans fonction async directement
  useEffect(() => {
    fetchUsers();
  }, []);

  // Composant enfant pour afficher un utilisateur (séparation des responsabilités)
  const UserItem: React.FC<{ user: User }> = ({ user }) => (
    <div>{user.name}</div>
  );

  return (
    <div>
      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: 'red' }}>Erreur : {error}</p>}
      {!loading && !error && users.map(user => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserList;

/* 
Explications :

- Pas d’async directement dans useEffect : 
  On crée une fonction interne fetchUsers qui est async puis on l’appelle dans useEffect. 
  Cela évite des comportements inattendus.

- Gestion des erreurs : 
  Utilisation de try/catch pour capturer les erreurs réseau ou HTTP et afficher un message clair.

- Gestion du loading : 
  Le booléen loading permet d’afficher un message "Chargement..." pendant la récupération des données.

- Ajout de key dans la liste : 
  Chaque élément de la liste a une clé unique pour optimiser le rendu React et éviter les warnings.

- Séparation des responsabilités : 
  Le composant UserItem affiche chaque utilisateur. Cela rend le code plus modulaire et maintenable.

- Typage TypeScript : 
  L’interface User et les types des états améliorent la robustesse et facilitent la maintenance du code.
*/
