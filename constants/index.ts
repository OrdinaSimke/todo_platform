export const headerLinks = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Create Todo',
    route: '/todos/create',
  },
  {
    label: 'My Profile',
    route: '/profile',
  },
];

export const todoDefaultValues = {
  title: '',
  description: '',
  imageUrl: '',
  startDateTime: new Date(),
  estimatedHours: undefined,
  projectId: '',
  isPrivate: false,
  url: '',
};
