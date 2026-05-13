import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { toast } from 'sonner';

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();
  const [, navigate] = useLocation();

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Carrinho vazio');
      return;
    }

    toast.success('Redirecionando para checkout...');
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Seu Carrinho</h1>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-6">Seu carrinho está vazio</p>

            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Continuar Comprando
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg shadow-lg overflow-hidden">
                {items.map(item => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-6 border-b border-border last:border-b-0 hover:bg-secondary/5 transition-colors"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-secondary/10">
                      {item.image_url && (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-foreground mb-2">
                        {item.name}
                      </h3>

                      <p className="text-primary font-semibold mb-4">
                        R$ {item.price.toFixed(2)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1 hover:bg-secondary/20 rounded transition-colors"
                        >
                          <Minus className="w-4 h-4 text-foreground" />
                        </button>

                        <span className="w-8 text-center font-semibold text-foreground">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 hover:bg-secondary/20 rounded transition-colors"
                        >
                          <Plus className="w-4 h-4 text-foreground" />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal and Remove */}
                    <div className="text-right flex flex-col justify-between">
                      <p className="font-bold text-lg text-foreground">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </p>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive/80 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg shadow-lg p-6 sticky top-4">
                <h2 className="text-2xl font-bold mb-6 text-foreground">
                  Resumo do Pedido
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-foreground">
                    <span>Subtotal:</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-foreground">
                    <span>Frete:</span>
                    <span className="text-accent font-semibold">
                      R$ 15,00
                    </span>
                  </div>

                  <div className="border-t border-border pt-4 flex justify-between font-bold text-lg text-foreground">
                    <span>Total:</span>
                    <span className="text-primary">
                      R$ {(total + 15.0).toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mb-3"
                >
                  Ir para Checkout
                </Button>

                <Button
                  onClick={() => clearCart()}
                  variant="outline"
                  className="w-full"
                >
                  Limpar Carrinho
                </Button>

                <Link href="/">
                  <Button variant="ghost" className="w-full mt-3">
                    Continuar Comprando
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}