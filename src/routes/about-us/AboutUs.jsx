import React from 'react';

/**
 * AboutUs component
 * @returns {jsx}
 */
const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-brand mb-2">Sobre nosotros</h1>
      <p className="text-lg mb-8">
        Bienvenido a <span className="text-brand">PACIFIC REEF</span>, donde esperamos 
        proveerte la mejor experiencia para reservar habitaciones en hoteles a lo largo del mundo
      </p>

      <h2 className="text-3xl font-extrabold text-brand mb-2">Nuestra visión</h2>
      <p className="text-lg mb-8">
        En <span className="text-brand">EASY STAY</span>, donde nuestro objetivo es un mundo en el que
        cada viajero encuentre las herramientas perfectas que satisfagan sus necesidades y preferencias.
        Apuntamos a que simplificar el proceso de reserva, ofreciendo un amplio rango de opciones para todos los bolsillos
      </p>

      <h2 className="text-3xl font-extrabold text-brand mb-2">
        Porqué nosotros?
      </h2>
      <ul className="list-disc ml-6 mb-8">
        <li className="text-lg mb-3">
          Ofrecemos un diverso rango de hoteles, desde lujosos a comodos, asegurando satisfacer tus necesidades personales
        </li>
        <li className="text-lg mb-3">
          Nuestra interfaz amigable hace simple y rapido agendar tu habitación ideal, con apenas unos clicks puedes asegurar tu reserva sin molestias
        </li>
       
        <li className="text-lg mb-3">
          We prioritize the security of your personal information and
          transactions. Book with confidence, knowing that your data is safe
          with us.
        </li>
      </ul>

  
     
      <p className="text-lg">
        Thank you for choosing <span className="text-brand">STAY BOOKER</span>.
        We look forward to being your go-to platform for all your hotel booking
        needs.
      </p>
    </div>
  );
};

export default AboutUs;
