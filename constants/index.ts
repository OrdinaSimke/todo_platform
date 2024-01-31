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
  project: '',
  description: '',
  imageUrl: '',
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: '',
  isPrivate: false,
  url: '',
};
