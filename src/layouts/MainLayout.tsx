import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/** Shell used by the main browsing pages: Navbar + page content + Footer. */
const MainLayout = () => (
  <div className="flex min-h-screen flex-col bg-netflix-black">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default MainLayout;
