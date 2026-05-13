import { useState } from 'react';

export default function Register() {

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [cpf, setCpf] = useState('');

  const [address, setAddress] = useState('');

  const handleRegister = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      const response = await fetch(
        'http://localhost:5000/api/auth/register',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            name,
            email,
            password,
            cpf,
            address,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {

        alert(data.message);

        return;
      }

      alert('Cadastro realizado com sucesso!');

      window.location.href = '/login';

    } catch (error) {

      console.error(error);

      alert('Erro ao cadastrar');

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">

      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-card p-8 rounded-xl shadow-lg space-y-4"
      >

        <h1 className="text-3xl font-bold text-center">
          Criar Conta
        </h1>

        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <input
          type="text"
          placeholder="Endereço"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90"
        >
          Cadastrar
        </button>

      </form>

    </div>
  );
}