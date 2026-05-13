import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'wouter';
import { toast } from 'sonner';
import { CreditCard, Truck, CheckCircle } from 'lucide-react';

export default function Checkout() {
  const { items, total, clearCart } = useCart();

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  });

  const [orderId, setOrderId] = useState<string>('');

  // salvar dados finais antes de limpar o carrinho
  const [finalItems, setFinalItems] = useState(items);
  const [finalTotal, setFinalTotal] = useState(total);

  const shipping = 15;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.address ||
      !formData.city
    ) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.cardNumber ||
      !formData.cardExpiry ||
      !formData.cardCVC
    ) {
      toast.error('Preencha os dados do cartão');
      return;
    }

    // salva os dados antes de limpar o carrinho
    setFinalItems(items);
    setFinalTotal(total);

    const fakeOrderId = `ORD-${Date.now()}`;

    setOrderId(fakeOrderId);

    setStep('confirmation');

    clearCart();

    toast.success('Pedido confirmado com sucesso!');
  };

  // dados exibidos
  const displayItems =
    step === 'confirmation' ? finalItems : items;

  const displayTotal =
    step === 'confirmation' ? finalTotal : total;

  if (items.length === 0 && step !== 'confirmation') {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Seu carrinho está vazio
          </p>

          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Voltar à Loja
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-4xl">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-between items-center">
            {['shipping', 'payment', 'confirmation'].map((s, i) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step === s
                      ? 'bg-primary text-primary-foreground'
                      : ['shipping', 'payment', 'confirmation'].indexOf(step) > i
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {i + 1}
                </div>

                {i < 2 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      ['shipping', 'payment', 'confirmation'].indexOf(step) > i
                        ? 'bg-accent'
                        : 'bg-secondary'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4 text-sm font-semibold">
            <span className="text-foreground">Entrega</span>
            <span className="text-foreground">Pagamento</span>
            <span className="text-foreground">Confirmação</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {step === 'shipping' && (
              <form
                onSubmit={handleShippingSubmit}
                className="bg-card rounded-lg shadow-artisan p-8"
              >
                <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                  <Truck className="w-6 h-6 text-primary" />
                  Endereço de Entrega
                </h2>

                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg"
                    placeholder="Nome Completo"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg"
                    placeholder="Email"
                  />

                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg"
                    placeholder="Endereço"
                  />

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg"
                    placeholder="Cidade"
                  />

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Continuar para Pagamento
                  </Button>
                </div>
              </form>
            )}

            {step === 'payment' && (
              <form
                onSubmit={handlePaymentSubmit}
                className="bg-card rounded-lg shadow-artisan p-8"
              >
                <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-primary" />
                  Dados do Pagamento
                </h2>

                <div className="space-y-4">
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg"
                    placeholder="Número do Cartão"
                  />

                  <input
                    type="text"
                    name="cardExpiry"
                    value={formData.cardExpiry}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg"
                    placeholder="MM/AA"
                  />

                  <input
                    type="text"
                    name="cardCVC"
                    value={formData.cardCVC}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg"
                    placeholder="CVC"
                  />

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Confirmar Pedido
                  </Button>
                </div>
              </form>
            )}

            {step === 'confirmation' && (
              <div className="bg-card rounded-lg shadow-artisan p-8 text-center">
                <CheckCircle className="w-16 h-16 text-accent mx-auto mb-6" />

                <h2 className="text-3xl font-bold mb-4 text-foreground">
                  Pedido Confirmado!
                </h2>

                <p className="text-lg text-muted-foreground mb-6">
                  Obrigado pela sua compra.
                </p>

                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-6 mb-6">
                  <p className="text-sm text-muted-foreground mb-2">
                    Número do Pedido
                  </p>

                  <p className="text-2xl font-bold text-foreground">
                    {orderId}
                  </p>
                </div>

                <Link href="/">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Voltar à Loja
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg shadow-artisan p-6 sticky top-4">
              <h3 className="text-xl font-bold mb-6 text-foreground">
                Resumo do Pedido
              </h3>

              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {displayItems.map(item => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm text-foreground"
                  >
                    <span>
                      {item.name} x{item.quantity}
                    </span>

                    <span className="font-semibold">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-foreground">
                  <span>Subtotal:</span>
                  <span>R$ {displayTotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-foreground">
                  <span>Frete:</span>
                  <span className="font-semibold">
                    R$ {shipping.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between font-bold text-lg text-foreground border-t border-border pt-4">
                  <span>Total:</span>

                  <span className="text-primary">
                    R$ {(displayTotal + shipping).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}