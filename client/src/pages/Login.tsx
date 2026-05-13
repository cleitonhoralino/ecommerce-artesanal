import { useState } from 'react';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {

    e.preventDefault();

    try {

      const response = await fetch(
        'http://localhost:5000/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      // salva token
      localStorage.setItem(
        'token',
        data.token
      );

      // salva usuário
      localStorage.setItem(
        'user',
        JSON.stringify(data.user)
      );

      alert('Login realizado com sucesso!');

      if (data.user.role === 'admin') {

        window.location.href = '/admin';

      } else {

        window.location.href = '/';
     }

      console.log(data);

    } catch (error) {

      console.error(error);

      alert('Erro ao fazer login');

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">

      <form
        onSubmit={handleLogin}
        className="bg-card p-8 rounded-lg shadow-lg w-full max-w-md"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg"
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg"
        >
            Entrar
          </button>
          <p className="text-center text-sm">

            Não possui conta?

            <a
            href="/register"
           className="text-primary font-semibold ml-1 hover:underline"
          >
            Criar conta
        </a>

          </p>

        </form>
      </div>
    );
}