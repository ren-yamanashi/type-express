export type User = { id: number; name: string };
export const users: User[] = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
];

export const createUser = (user: User): User[] => {
  const cloneUser = users;
  cloneUser.push(user);
  return cloneUser;
};

export const updateUser = (newUser: User): User[] => {
  const newUsers = users.map((user) => {
    if (user.id === newUser.id) return newUser;
    else return user;
  });
  return newUsers;
};

export const deleteUser = (id: number): User[] => {
  const cloneUser = users;
  const newUsers = cloneUser.filter((user) => user.id !== id);
  return newUsers;
};
