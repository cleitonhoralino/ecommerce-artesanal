export const mockCategories = [
  {
    id: 1,
    name: "Decoração"
  },
  {
    id: 2,
    name: "Casa"
  },
  {
    id: 3,
    name: "Cozinha"
  }
];

export const mockProducts = [
  {
    id: 1,
    name: "Vaso Artesanal",
    description: "Peça artesanal feita em cerâmica.",
    price: 59.90,
    image_url: "https://images.unsplash.com/photo-1517705008128-361805f42e86",
    category: {
      id: 1,
      name: "Decoração"
    },
    stock: 10
  },
  {
    id: 2,
    name: "Cesta de Palha",
    description: "Cesta feita à mão com fibras naturais.",
    price: 89.90,
    image_url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    category: {
      id: 2,
      name: "Casa"
    },
    stock: 5
  },
  {
    id: 3,
    name: "Caneca Artesanal",
    description: "Caneca personalizada em cerâmica.",
    price: 39.90,
    image_url: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d",
    category: {
      id: 3,
      name: "Cozinha"
    },
    stock: 8
  }
];