import { Link } from 'wouter';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';

export default function Header() {
const [user, setUser] = useState<any>(null);

useEffect(() => {

  const storedUser = localStorage.getItem('user');

  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }

}, []);

  const handleLogout = () => {

  localStorage.removeItem('token');

  localStorage.removeItem('user');

  window.location.href = '/login';
};
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-card shadow-artisan sticky top-0 z-50">
        <div className="flex items-center gap-4">

      {/* USER / LOGIN */}
      {user ? (

        <div className="flex items-center gap-3">

          <span className="text-sm font-medium text-foreground">
              Olá, {user.name}
              </span>

              {user?.role === 'admin' && (

                <Link href="/admin">

                  <button className="text-sm bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">

                    Painel Admin

                  </button>

                </Link>

              )}

              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Sair
              </button>

        </div>

      ) : (

        <Link href="/login">

          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">

            Login

          </button>

        </Link>

      )}

      {/* Cart */}
      <Link
        href="/cart"
        className="relative p-2 hover:bg-secondary/10 rounded-lg transition-colors"
      >

        <ShoppingCart className="w-6 h-6 text-foreground" />

        {cartCount > 0 && (
          <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}

      </Link>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden p-2 hover:bg-secondary/10 rounded-lg transition-colors"
      >

        {isMenuOpen ? (
          <X className="w-6 h-6 text-foreground" />
        ) : (
          <Menu className="w-6 h-6 text-foreground" />
        )}

      </button>

    </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <nav className="hidden md:flex items-center gap-8">
           <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
           Loja
           </Link>

            <Link
               href="/about"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
             Sobre
            </Link>

            <Link
               href="/contact"
               className="text-foreground hover:text-primary transition-colors font-medium"
            >
            Contato
           </Link>
          </nav>
        </div>
      )}
    </header>
  );
}