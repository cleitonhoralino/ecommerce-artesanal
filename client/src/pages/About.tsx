export default function About() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container max-w-4xl">
        <h1 className="text-5xl font-bold text-primary mb-8">
          Sobre Nós
        </h1>

        <div className="bg-card rounded-lg shadow-artisan p-8 space-y-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            A Artesanato Shop nasceu com o objetivo de valorizar
            produtos artesanais únicos, feitos à mão com carinho
            e dedicação.
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Trabalhamos com artesãos locais e peças exclusivas
            para oferecer qualidade, autenticidade e beleza
            em cada produto.
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Nosso compromisso é conectar pessoas a produtos
            especiais que carregam história e personalidade.
          </p>
        </div>
      </div>
    </div>
  );
}