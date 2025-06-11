import React from 'react';
import { useState } from 'react';

export default function ClientForm() {
  const [form, setForm] = useState({
    nome: '',
    telefone: '',
    endereco: '',
    linkAnuncio: '',
    observacoes: '',
    tipo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.nome,
      phone: form.telefone,
      address: form.endereco,
      listingLink: form.linkAnuncio,
      notes: form.observacoes,
      type: form.tipo
    };

    try {
      const res = await fetch('http://localhost:8080/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Erro do servidor: ${errorText}`);
      }

      const result = await res.json();
      alert('Cliente salvo com sucesso!');
      console.log('Resposta do backend:', result);

      setForm({
        nome: '',
        telefone: '',
        endereco: '',
        linkAnuncio: '',
        observacoes: '',
        tipo: ''
      });
    } catch (err) {
      console.error('Erro ao salvar cliente:', err.message);
      alert('Erro ao salvar cliente. Veja o console para detalhes.');
    }
  };


  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold text-gray-800">Adicionar Cliente</h2>

      <input type="text" name ="nome" value={form.nome} onChange={handleChange} placeholder="Nome" className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      <input type="text" name="telefone" value={form.telefone} onChange={handleChange} placeholder="Telefone" className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      <input type="text" name="endereco" value={form.endereco} onChange={handleChange} placeholder="Endereço" className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      <input type="text" name="linkAnuncio" value={form.linkAnuncio} onChange={handleChange} placeholder="Link do Anúncio" className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      <textarea name="observacoes" value={form.observacoes} onChange={handleChange} placeholder="Observações" rows={4} className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
      <label>
      Tipo de Cliente:
      <select name="tipo" value={form.tipo} onChange={handleChange} placeholder="Tipo" className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
        <option value="Null">Selecione</option>
        <option value="sale">Venda</option>
        <option value="rent">Aluguel</option>
      </select>
    </label>
      <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">
        Salvar
      </button>
    </form>
  );
}
