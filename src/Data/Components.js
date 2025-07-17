export const components = [
  {
    category: "Cards",
    items: [
      {
        name: "ProductCard",
        path: "/docs/ProductCard",
        tag: "update",
        import: () => import('@/Components/Cards/Productcard/ProductCard'),
        raw: () => import('@/Components/Cards/Productcard/ProductCard?raw'),
        rawcss: () => import('@/Components/Cards/Productcard/Productcard.css?raw'),
      },
      {
        name: "ProductCard 2",
        path: "/docs/productcard 2",
        tag: "new",
        import: () => import('@/Components/Cards/Productcard2/Productcard2'),
        raw: () => import('@/Components/Cards/Productcard2/Productcard2?raw'),
        rawcss: () => import('@/Components/Cards/Productcard2/Productcard2.css?raw'),
      },
    ],
  },
  {
    category: "Profile Cards",
    items: [
      {
        name: "GlassCard",
        path: "/docs/glasscard",
        // import: () => import('@/Components/ProfileCards/GlassCard'),
        // raw: () => import('@/Components/ProfileCards/GlassCard?raw'),
      },
    ],
  },
];
