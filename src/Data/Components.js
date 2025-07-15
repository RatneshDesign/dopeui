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
        name: "Cardtwo",
        path: "/docs/cardtwo",
        tag: "new",
        import: () => import('@/Components/Cards/Cardtwo'),
        raw: () => import('@/Components/Cards/Cardtwo?raw'),
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
