import { render, screen, fireEvent } from '@testing-library/react';
import { UserTable } from '../UserTable';
import { User } from '../../types/User';

const mockUsers: User[] = [
  {
    id: 1,
    name: 'Alice',
    username: 'alice123',
    email: 'alice@example.com',
    address: {
      street: 'Main St',
      suite: 'Apt 1',
      city: 'Paris',
      zipcode: '75000',
      geo: { lat: '0', lng: '0' },
    },
    phone: '0102030405',
    website: 'alice.com',
    company: {
      name: 'Alice Corp',
      catchPhrase: 'Innovation',
      bs: 'tech',
    },
  },
];

describe('UserTable', () => {
  it('affiche les utilisateurs filtrés', () => {
    render(
      <UserTable
        users={mockUsers}
        onSelect={jest.fn()}
        search="alice"
        sortKey="name"
        sortAsc={true}
        onSortChange={jest.fn()}
        currentPage={1}
        perPage={10}
      />
    );

    // On récupère la ligne <tr> contenant l'email unique
    const row = screen.getByText(/alice@example.com/).closest('tr');
    expect(row).not.toBeNull();

    // On vérifie que dans cette ligne, on trouve bien le nom "Alice"
    expect(row).toHaveTextContent('Alice');

    // Vérifie que l'email est présent
    expect(screen.getByText(/alice@example.com/)).toBeInTheDocument();
  });

  it('déclenche onSelect quand un utilisateur est cliqué', () => {
    const onSelectMock = jest.fn();

    render(
      <UserTable
        users={mockUsers}
        onSelect={onSelectMock}
        search=""
        sortKey="name"
        sortAsc={true}
        onSortChange={jest.fn()}
        currentPage={1}
        perPage={10}
      />
    );

    // Récupère la ligne <tr> contenant l'email
    const row = screen.getByText(/alice@example.com/).closest('tr');
    expect(row).not.toBeNull();

    // Clique sur cette ligne entière
    fireEvent.click(row!);

    expect(onSelectMock).toHaveBeenCalledWith(mockUsers[0]);
  });
});
