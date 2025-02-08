interface DemoUser {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  avatar: string;
}

export const demoUsers: DemoUser[] = [
  {
    id: "1",
    email: "demo@example.com",
    name: "Demo User",
    role: "user",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo",
  },
  {
    id: "2",
    email: "admin@example.com",
    name: "Admin User",
    role: "admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
  },
];

export const findDemoUser = (email: string) => {
  return demoUsers.find((user) => user.email === email);
};
