import { User } from '../types/property';

export const users: User[] = [
  {
    id: 'user-1',
    name: 'Vinay Kumar',
    email: 'vinay@korutlaproperties.com',
    phone: '+91 98765 00112',
    photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
    role: 'buyer',
    favorites: ['prop-1', 'prop-3', 'prop-6', 'prop-11'],
    createdAt: '2024-01-10T08:00:00Z',
  },
  {
    id: 'user-2',
    name: 'Ananya Deshmukh',
    email: 'ananya@example.com',
    phone: '+91 98220 33445',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    role: 'seller',
    favorites: ['prop-2', 'prop-5'],
    createdAt: '2024-02-14T09:30:00Z',
  },
];
