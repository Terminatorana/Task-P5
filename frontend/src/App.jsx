import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import "./App.css";
import Profile from "./Profile";
import Post from "./Post"; // NEW

export default function App() {
  return (
    <Routes>
      {/* Layout = NavBar + page + Footer, shared by every route */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post" element={<Post />} /> {/* NEW */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}