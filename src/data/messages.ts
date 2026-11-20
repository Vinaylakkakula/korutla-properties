import { Message, User } from '../types/property';

export const messages: Message[] = [
  {
    id: 'msg-1',
    senderId: 'agent-1',
    senderName: 'Rajesh Goud',
    receiverId: 'user-1',
    receiverName: 'Vinay Kumar',
    content: 'Namaste Vinay! I have scheduled your site visit for the Venkateshwara Colony Villa in Korutla on Saturday at 11 AM. Let me know if you need any assistance.',
    isRead: false,
    createdAt: '2024-04-18T10:45:00Z',
  },
  {
    id: 'msg-2',
    senderId: 'user-1',
    senderName: 'Vinay Kumar',
    receiverId: 'agent-1',
    receiverName: 'Rajesh Goud',
    content: 'Thank you Rajesh. Yes, please share the live location pin near Sai Baba Temple on WhatsApp so we can drive directly.',
    isRead: true,
    createdAt: '2024-04-18T11:00:00Z',
  },
  {
    id: 'msg-3',
    senderId: 'agent-2',
    senderName: 'Priya Reddy',
    receiverId: 'user-1',
    receiverName: 'Vinay Kumar',
    content: 'Hi Vinay, the new phase of Korutla Metpally Road residential layout has just been released at pre-launch prices. Thought of sharing with you first.',
    isRead: false,
    createdAt: '2024-04-17T15:20:00Z',
  },
  {
    id: 'msg-4',
    senderId: 'agent-3',
    senderName: 'Venkat Rao',
    receiverId: 'user-1',
    receiverName: 'Vinay Kumar',
    content: 'Hello sir, the Dharani title search report for the Dharmapuri agricultural land is complete. Clear title with single owner and clear passbook.',
    isRead: true,
    createdAt: '2024-04-16T17:05:00Z',
  },
];

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
