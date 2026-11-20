import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CompareFloatingBar from '../common/CompareFloatingBar';

interface LayoutProps {
  children: React.ReactNode;
  hideNavbar?: boolean;
  hideFooter?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  hideNavbar = false,
  hideFooter = false,
}) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-ivory selection:bg-gold/20 selection:text-forest">
      {!hideNavbar && <Navbar />}
      <main className="flex-1">{children}</main>
      <CompareFloatingBar />
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;

