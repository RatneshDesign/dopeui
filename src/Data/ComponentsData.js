export const componentsData = [
  {
    category: "Cards",
    items: [
      {
        name: "Product Card v1",
        slug: "productcard",
        path: "/docs/productcard",
        tag: "update",
        description: "A sleek product display card with image, price and actions.",
        import: () => import('@/Components/Cards/Productcard/Demo'),
        raw: () => import('@/Components/Cards/Productcard/ProductCard?raw'),
        rawcss: () => import('@/Components/Cards/Productcard/Productcard.css?raw'),
        usage: () => import('@/Components/Cards/Productcard/Demo?raw'),
        dependencies: ['framer-motion'],
      },
      {
        name: "Product Card v2",
        slug: "productcard2",
        path: "/docs/productcard2",
        tag: "new",
        description: "A sleek product display card with image, price and actions.",
        import: () => import('@/Components/Cards/Productcard2/Demo'),
        raw: () => import('@/Components/Cards/Productcard2/Productcard2?raw'),
        rawcss: () => import('@/Components/Cards/Productcard2/Productcard2.css?raw'),
        usage: () => import('@/Components/Cards/Productcard2/Demo?raw'),
        // dependencies: ['framer-motion'],
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
        usage: () => import('@/Components/Forms/AiInput/Demo?raw'),
        dependencies: ['framer-motion'],
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
