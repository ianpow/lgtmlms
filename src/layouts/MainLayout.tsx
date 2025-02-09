import { useRoutes } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";
import routes from "@/routes";

export default function MainLayout() {
  const isAdmin = true; // Default to admin for demo
  const routeElements = useRoutes(routes);

  // Check if we're on the home route
  const isHome = window.location.pathname === "/";

  // If we're on the home route, return just the Home component
  if (isHome) {
    return routeElements;
  }

  // Otherwise return the layout with sidebar
  return (
    <div className="flex h-screen bg-background">
      <Sidebar isAdmin={isAdmin} />
      <main className="flex-1 overflow-y-auto p-8">{routeElements}</main>
    </div>
  );
}
