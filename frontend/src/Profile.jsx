import { Navigate } from "react-router-dom";
import { getCurrentUser } from "./authService";
import "./Auth.css";

export default function Profile() {
  const user = getCurrentUser();
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">My Profile</h2>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
}