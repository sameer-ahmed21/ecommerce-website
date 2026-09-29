import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './navbar.jsx';

export default function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
