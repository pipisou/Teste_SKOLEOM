
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
  user: User | null;
  onClose: () => void;
}

export const UserDetailModal = ({ user, onClose }: Props) => {
    if (!user) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded w-96">
          <h2 className="text-xl font-bold mb-2">{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Téléphone: {user.phone}</p>
          <p>Adresse: {user.address.city}, {user.address.street}</p>
          <p>Entreprise: {user.company.name}</p>
          <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Fermer</button>
        </div>
      </div>
    );
  };