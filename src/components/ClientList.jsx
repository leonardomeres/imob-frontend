import React, { useEffect, useState } from 'react';

export default function ClientList() {
  const [clients, setClients] = useState([]);
  const [expandedId, setExpandedId] = useState(null); // to track which card is expanded

  useEffect(() => {
    fetch('http://localhost:8080/api/customers')
      .then((res) => res.json())
      .then((data) => setClients(data))
      .catch((err) => console.error('Erro ao buscar clientes:', err));
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div>
      <h3 style={{ fontWeight: '600', marginBottom: '1rem' }}>Lista de Clientes</h3>
      {clients.map((client) => (
        <div
          key={client.id}
          className="card"
          onClick={() => toggleExpand(client.id)}
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '10px',
            cursor: 'pointer',
            backgroundColor: '#f9f9f9',
          }}
        >
          <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{client.name}</div>
          <div style={{ color: '#444' }}>{client.phone}</div>

          {expandedId === client.id && (
            <div style={{ marginTop: '8px', fontSize: '0.95rem', color: '#333' }}>
              <div><strong>Endereço:</strong> {client.address}</div>
              <div>
                <strong>Anúncio:</strong>{' '}
                <a href={client.listing_link} target="_blank" rel="noopener noreferrer">
                  Ver Anúncio
                </a>
              </div>
              <div><strong>Observações:</strong> {client.notes}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
