import React from 'react';
import NavBar from './NavBar';
import BodyCard from './BodyCard';

const Layout = () => (
  <div>
    <div>
      <NavBar />
    </div>
    <div className="BodyCard">
      <BodyCard />
    </div>
  </div>
);

export default Layout;
