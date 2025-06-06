import React, { useState } from 'react';
import ClientForm from './components/ClientForm';
import ClientList from './components/ClientList';

export default function App() {
  const [activePage, setActivePage] = useState('list'); // 'form' or 'list'

  return (
    <div className="container">
      <h1>Imob</h1>
      <h2>Gerencie seus clientes de forma simples e eficiente</h2>

      <div className="button-group" style={{ marginBottom: '1rem' }}>
        <button onClick={() => setActivePage('form')} style={{ marginRight: '0.5rem' }}>
          + Adicionar Cliente
        </button>
        <button onClick={() => setActivePage('list')}>📋 Ver Lista de Clientes</button>
      </div>

      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-lg">
        {activePage === 'form' && <ClientForm />}
        {activePage === 'list' && <ClientList />}
      </div>
    </div>
  );
}
