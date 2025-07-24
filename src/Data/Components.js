export const components = [
  {
    category: "Cards",
    items: [
      {
        name: "Product Card v1",
        slug: "productcard",
        path: "/docs/productcard",
        tag: "update",
        description: "A sleek product display card with image, price and actions.",
        import: () => import('@/Components/Cards/Productcard/ProductCard'),
        raw: () => import('@/Components/Cards/Productcard/ProductCard?raw'),
        rawcss: () => import('@/Components/Cards/Productcard/Productcard.css?raw'),
      },
      {
        name: "Product Card v2",
        slug: "productcard2",
        path: "/docs/productcard2",
        tag: "new",
        description: "A sleek product display card with image, price and actions.",
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
        name: "Ai InputField",
        slug: "aiinput",
        path: "/docs/aiinput",
        tag: "new",
        description: "A sleek product display card with image, price and actions.",
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
