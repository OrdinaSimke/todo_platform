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
  deadline: new Date(new Date().setDate(new Date().getDate() + parseInt('7'))),
  estimatedHours: 8,
  projectId: '',
  isPrivate: false,
  isCompleted: false,
  url: '',
};
