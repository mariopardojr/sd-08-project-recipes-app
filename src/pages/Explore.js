import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function Explore() {
  return (
    <>
      <Link
        data-testid="explore-food"
        to="/explorar/comidas"
      >
        Explorar Comidas
      </Link>
      <br />
      <br />
      <Link
        data-testid="explore-drinks"
        to="/explorar/bebidas"
      >
        Explorar Bebidas
      </Link>
      <Footer />
    </>
  );
}

export default Explore;
