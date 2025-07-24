export const components = [
  {
    category: "Cards",
    items: [
      {
        name : "Product Card D1",
        slug: "ProductCard",
        path: "/docs/ProductCard",
        tag: "update",
        import: () => import('@/Components/Cards/Productcard/ProductCard'),
        raw: () => import('@/Components/Cards/Productcard/ProductCard?raw'),
        rawcss: () => import('@/Components/Cards/Productcard/Productcard.css?raw'),
      },
      {
        name : "Product Card D2",
        slug: "ProductCard2",
        path: "/docs/productcard2",
        tag: "new",
        import: () => import('@/Components/Cards/Productcard2/Productcard2'),
        raw: () => import('@/Components/Cards/Productcard2/Productcard2?raw'),
        rawcss: () => import('@/Components/Cards/Productcard2/Productcard2.css?raw'),
      },
    ],
  },
  {
    category: "Forms",
    items: [
      {
        name : "Ai InputField",
        slug: "aiinput",
        path: "/docs/aiinput",
        tag: "new",
        import: () => import('@/Components/Forms/AiInput/AiInput'),
        raw: () => import('@/Components/Forms/AiInput/AiInput?raw'),
        rawcss: () => import('@/Components/Forms/AiInput/AiInput.css?raw'),
      },
    ],
  },
  {
    category: "Profile Cards",
    items: [
      {
        name: "glasscard",
        path: "/docs/glasscard",
        // import: () => import('@/Components/ProfileCards/GlassCard'),
        // raw: () => import('@/Components/ProfileCards/GlassCard?raw'),
      },
    ],
  },
];
