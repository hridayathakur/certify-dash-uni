import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Set proper page title
document.title = "University Digital Certificate & NAAC Management System";

createRoot(document.getElementById("root")!).render(<App />);
