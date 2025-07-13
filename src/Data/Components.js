export const components = [
  {
    category: "Cards",
    items: [
      {
        name: "Cardone",
        path: "/docs/cardone",
        tag: "update",
        import: () => import('@/Components/Cards/Cardone'),
        raw: () => import('@/Components/Cards/Cardone?raw'),
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
