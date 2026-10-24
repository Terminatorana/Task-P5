import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

// Every page is rendered inside <Outlet />, so the NavBar and Footer
// appear identically on ALL pages.
export default function Layout() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
