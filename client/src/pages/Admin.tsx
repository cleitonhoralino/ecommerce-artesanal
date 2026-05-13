import { useEffect, useState } from 'react';

export default function Admin() {

  const user = JSON.parse(
    localStorage.getItem('user') || 'null'
  );

  // PROTEÇÃO
  if (!user || user.role !== 'admin') {

    return (
      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-3xl font-bold text-red-500">
          Acesso negado
        </h1>

      </div>
    );
  }

  // STATES
  const [name, setName] = useState('');

  const [description, setDescription] = useState('');

  const [price, setPrice] = useState('');

  const [imageUrl, setImageUrl] = useState('');

  const [stock, setStock] = useState('');

  const [category, setCategory] = useState('');

  const [products, setProducts] = useState<any[]>([]);

  const [users, setUsers] = useState<any[]>([]);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  // BUSCAR PRODUTOS
  const fetchProducts = async () => {

    try {

      const response = await fetch(
        'http://localhost:5000/api/products'
      );

      const data = await response.json();

      setProducts(data);

    } catch (error) {

      console.error(error);

    }
  };

  // BUSCAR USUÁRIOS
  const fetchUsers = async () => {

    try {

      const token =
        localStorage.getItem('token');

      const response = await fetch(
        'http://localhost:5000/api/auth/users',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setUsers(data);

    } catch (error) {

      console.error(error);

    }
  };

  // CARREGAR DADOS
  useEffect(() => {

    fetchProducts();

    fetchUsers();

  }, []);

  // CRIAR / EDITAR PRODUTO
  const handleCreateProduct = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem('token');

      const url = editingId
        ? `http://localhost:5000/api/products/${editingId}`
        : 'http://localhost:5000/api/products';

      const method = editingId
        ? 'PUT'
        : 'POST';

      const response = await fetch(
        url,
        {
          method,

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            name,
            description,
            price: Number(price),
            image_url: imageUrl,
            stock: Number(stock),
            category,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {

        alert(data.message);

        return;
      }

      alert(
        editingId
          ? 'Produto atualizado com sucesso!'
          : 'Produto criado com sucesso!'
      );

      fetchProducts();

      setEditingId(null);

      setName('');

      setDescription('');

      setPrice('');

      setImageUrl('');

      setStock('');

      setCategory('');

    } catch (error) {

      console.error(error);

      alert('Erro ao salvar produto');

    }
  };

  // EDITAR PRODUTO
  const handleEditProduct = (
    product: any
  ) => {

    setEditingId(product._id);

    setName(product.name);

    setDescription(product.description);

    setPrice(product.price.toString());

    setImageUrl(product.image_url);

    setStock(product.stock.toString());

    setCategory(product.category);
  };

  // DELETAR PRODUTO
  const handleDeleteProduct = async (
    id: string
  ) => {

    const confirmDelete = confirm(
      'Deseja remover este produto?'
    );

    if (!confirmDelete) return;

    try {

      const token = localStorage.getItem('token');

      const response = await fetch(
        `http://localhost:5000/api/products/${id}`,
        {
          method: 'DELETE',

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {

        alert(data.message);

        return;
      }

      alert('Produto removido!');

      fetchProducts();

    } catch (error) {

      console.error(error);

      alert('Erro ao remover produto');

    }
  };

  // ALTERAR ROLE
  const handleChangeRole = async (
    id: string,
    role: string
  ) => {

    try {

      const token =
        localStorage.getItem('token');

      const newRole =
        role === 'admin'
          ? 'user'
          : 'admin';

      const response = await fetch(
        `http://localhost:5000/api/auth/users/${id}/role`,
        {
          method: 'PUT',

          headers: {
            'Content-Type': 'application/json',

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            role: newRole,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {

        alert(data.message);

        return;
      }

      alert('Cargo atualizado!');

      fetchUsers();

    } catch (error) {

      console.error(error);

      alert('Erro ao atualizar cargo');

    }
  };

  return (
    <div className="min-h-screen p-10">

      <h1 className="text-4xl font-bold mb-6">
        Painel Admin
      </h1>

      <p className="text-lg text-muted-foreground mb-10">
        Bem-vindo, {user.name}
      </p>

      {/* FORMULÁRIO */}
      <form
        onSubmit={handleCreateProduct}
        className="max-w-2xl space-y-4"
      >

        <input
          type="text"
          placeholder="Nome do produto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <input
          type="text"
          placeholder="URL da imagem"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <input
          type="number"
          placeholder="Estoque"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <button
          type="submit"
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90"
        >
          {editingId
            ? 'Atualizar Produto'
            : 'Cadastrar Produto'}
        </button>

      </form>

      {/* PRODUTOS */}
      <div className="mt-12">

        <h2 className="text-2xl font-bold mb-6">
          Produtos Cadastrados
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {products.map((product) => (

            <div
              key={product._id}
              className="border rounded-xl p-4 shadow-md"
            >

              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-52 object-cover rounded-lg mb-4"
              />

              <h3 className="text-xl font-bold">
                {product.name}
              </h3>

              <p className="text-muted-foreground mb-2">
                {product.description}
              </p>

              <p className="font-semibold">
                R$ {product.price}
              </p>

              <p className="text-sm">
                Estoque: {product.stock}
              </p>

              <p className="text-sm">
                Categoria: {product.category}
              </p>

              <div className="flex gap-3 mt-4">

                <button
                  type="button"
                  onClick={() =>
                    handleEditProduct(product)
                  }
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Editar
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDeleteProduct(product._id)
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Excluir
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* USUÁRIOS */}
      <div className="mt-16">

        <h2 className="text-2xl font-bold mb-6">
          Usuários Cadastrados
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {users.map((userItem) => (

            <div
              key={userItem._id}
              className="border rounded-xl p-4 shadow-md"
            >

              <h3 className="text-xl font-bold">
                {userItem.name}
              </h3>

              <p className="text-sm">
                Email: {userItem.email}
              </p>

              <p className="text-sm">
                CPF: {userItem.cpf}
              </p>

              <p className="text-sm">
                Endereço: {userItem.address}
              </p>

              <p className="text-sm font-semibold mb-4">
                Cargo: {userItem.role}
              </p>

              <button
                type="button"
                onClick={() =>
                  handleChangeRole(
                    userItem._id,
                    userItem.role
                  )
                }
                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
              >
                {userItem.role === 'admin'
                  ? 'Tornar User'
                  : 'Tornar Admin'}
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}