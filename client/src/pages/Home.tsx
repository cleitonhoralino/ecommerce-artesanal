import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
}

interface Category {
  id: number;
  name: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const { addItem } = useCart();

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const response = await fetch(
          'http://localhost:5000/api/products'
        );

        const data = await response.json();

        setProducts(data);

        // Categorias automáticas
        const uniqueCategories = [
          ...new Set(data.map((p: Product) => p.category))
        ];

        const formattedCategories = uniqueCategories.map(
          (cat, index) => ({
            id: index + 1,
            name: cat
          })
        );

        setCategories(formattedCategories);

      } catch (error) {

        console.error(
          'Erro ao buscar produtos:',
          error
        );

      } finally {

        setLoading(false);

      }
    };

    fetchProducts();

  }, []);

  const filteredProducts = products.filter((p) => {

    const matchesCategory = selectedCategory
      ? p.category === selectedCategory
      : true;

    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: Product) => {

    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image_url: product.image_url,
    });

    toast.success(
      `${product.name} adicionado ao carrinho!`
    );
  };

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="relative w-full h-96 md:h-[500px] overflow-hidden">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663059118433/gj9rqKppoKKs8GWdKKHuyP/hero-artesanato-Z7c2YGZ9ZErDqvBhxPiKom.webp"
          alt="Artesanato Shop"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Artesanato Shop
            </h1>

            <p className="text-xl md:text-2xl">
              Produtos artesanais autênticos feitos com amor
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-card rounded-lg shadow-lg p-6">

              <h2 className="text-2xl font-bold mb-6 text-foreground">
                Categorias
              </h2>

              <div className="space-y-3">

                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                    selectedCategory === null
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-secondary/20 text-foreground'
                  }`}
                >
                  Todos os Produtos
                </button>

                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                      selectedCategory === cat.name
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-secondary/20 text-foreground'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Produtos */}
          <main className="lg:col-span-3">

            <div className="mb-8">

              {/* Busca */}
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full md:w-96 px-4 py-2 border border-border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
              />

              <h2 className="text-3xl font-bold mb-2 text-foreground">
                {selectedCategory
                  ? 'Produtos Selecionados'
                  : 'Todos os Produtos'}
              </h2>

              <p className="text-muted-foreground">
                {filteredProducts.length} produtos disponíveis
              </p>
            </div>

            {loading ? (

              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>

            ) : filteredProducts.length === 0 ? (

              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  Nenhum produto encontrado
                </p>
              </div>

            ) : (

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {filteredProducts.map((product) => (

                  <div
                    key={product._id}
                    className="bg-card rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
                  >

                    {/* Imagem */}
                    <div className="relative h-64 overflow-hidden bg-secondary/10">

                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />

                      <button className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all">
                        <Heart className="w-5 h-5 text-primary" />
                      </button>

                    </div>

                    {/* Infos */}
                    <div className="p-4">

                      <div className="mb-2">
                        <span className="text-xs font-semibold text-accent uppercase">
                          {product.category}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                        {product.name}
                      </h3>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-4">

                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}

                        <span className="text-xs text-muted-foreground ml-2">
                          (12)
                        </span>

                      </div>

                      {/* Preço */}
                      <div className="flex items-center justify-between">

                        <span className="text-2xl font-bold text-primary">
                          R$ {product.price.toFixed(2)}
                        </span>

                        <Button
                          onClick={() => handleAddToCart(product)}
                          disabled={product.stock === 0}
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          size="sm"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </Button>

                      </div>

                      {product.stock === 0 && (
                        <p className="text-xs text-destructive mt-2 font-semibold">
                          Fora de estoque
                        </p>
                      )}

                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}