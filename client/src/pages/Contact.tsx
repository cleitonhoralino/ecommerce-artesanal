import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container max-w-4xl">
        <h1 className="text-5xl font-bold text-primary mb-8">
          Contato
        </h1>

        <div className="bg-card rounded-lg shadow-artisan p-8 space-y-8">
          <div className="flex items-center gap-4">
            <Mail className="w-6 h-6 text-primary" />

            <div>
              <h2 className="font-bold text-lg">Email</h2>
              <p className="text-muted-foreground">
                contato@artesanatoshop.com
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Phone className="w-6 h-6 text-primary" />

            <div>
              <h2 className="font-bold text-lg">Telefone</h2>
              <p className="text-muted-foreground">
                (11) 99999-9999
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <MapPin className="w-6 h-6 text-primary" />

            <div>
              <h2 className="font-bold text-lg">Endereço</h2>
              <p className="text-muted-foreground">
                São Paulo - SP
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}