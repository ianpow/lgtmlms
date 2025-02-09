import { BrowserRouter as Router } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <MainLayout />
      </div>
    </Router>
  );
}

export default App;
