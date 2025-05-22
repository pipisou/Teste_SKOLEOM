
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
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h2 className="modal-title">{user.name}</h2>
  
          <div className="modal-section">
            <h3>Informations personnelles</h3>
            <p><strong>Nom d'utilisateur:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Téléphone:</strong> {user.phone}</p>
            <p><strong>Site web:</strong> <a href={`https://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a></p>
          </div>
  
          <div className="modal-section">
            <h3>Adresse</h3>
            <p>{user.address.suite}, {user.address.street}</p>
            <p>{user.address.city}, {user.address.zipcode}</p>
            <p><strong>Géolocalisation:</strong> {user.address.geo.lat}, {user.address.geo.lng}</p>
          </div>
  
          <div className="modal-section">
            <h3>Entreprise</h3>
            <p><strong>Nom:</strong> {user.company.name}</p>
            <p><strong>Slogan:</strong> {user.company.catchPhrase}</p>
            <p><strong>Domaine:</strong> {user.company.bs}</p>
          </div>
  
          <button className="modal-close-button" onClick={onClose}>Fermer</button>
        </div>
      </div>
    );
  };
  
  