import { Outlet } from 'react-router-dom';
import { Navbar } from '../Navbar';

export const Layout = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};