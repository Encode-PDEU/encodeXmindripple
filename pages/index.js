import React from 'react';
import { useRouter } from 'next/router';
import Home from './home';
import Login from './login';
import Signup from './signup';
import Riddles from './riddles';

export default function App() {
  const router = useRouter();
  const { pathname } = router;

  let activeComponent = <Home />;

  if (pathname === '/login') {
    activeComponent = <Login />;
  } else if (pathname === '/signup') {
    activeComponent = <Signup />;
  }
  else if (pathname === '/riddles') {
    activeComponent=<Riddles />
  }

  return (
    <div>
      {activeComponent}
    </div>
  );
}
