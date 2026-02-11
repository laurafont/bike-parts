/**
 * Bicycle parts and products data.
 * Each product includes placeholder price and image URL.
 */
export const PARTS = [
  {
    id: "cuadro",
    label: "Cuadro",
    image: "/images/cuadro.webp",
    products: [
      {
        id: "cuadro-diamond",
        name: "Diamond",
        description: "Classic diamond frame for stability and comfort.",
        image: "/images/diamond.jpg",
        price: 199,
      },
      {
        id: "cuadro-pull-suspension",
        name: "Pull suspension",
        description: "Frame with pull suspension for smoother rides.",
        image: "/images/pull-suspension.jpg",
        price: 249,
      },
      {
        id: "cuadro-step-through",
        name: "Step through",
        description: "Step-through frame for easy mounting.",
        image: "/images/step-through.webp",
        price: 179,
      },
    ],
  },
  {
    id: "acabado-cuadro",
    label: "Acabado cuadro",
    image: "/images/acabado.avif",
    products: [
      {
        id: "acabado-brillo",
        name: "Brillo",
        description: "Glossy finish for a shiny look.",
        image: "/images/brillo.jpg",
        price: 29,
      },
      {
        id: "acabado-mate",
        name: "Mate",
        description: "Matte finish for a subtle appearance.",
        image: "/images/mate.avif",
        price: 29,
      },
    ],
  },
  {
    id: "tipo-rueda",
    label: "Tipo rueda",
    image: "/images/rueda.jpg",
    products: [
      {
        id: "rueda-carretera",
        name: "Carretera",
        description: "Road wheels for speed on pavement.",
        image: "/images/carretera.jpg",
        price: 149,
      },
      {
        id: "rueda-montana",
        name: "Montaña",
        description: "Mountain wheels for off-road trails.",
        image: "/images/montaña.avif",
        price: 169,
      },
      {
        id: "rueda-fat-wheel",
        name: "Fat wheel",
        description: "Fat wheels for sand and snow.",
        image: "/images/fat-wheel.jpg",
        price: 199,
      },
    ],
  },
  {
    id: "color-rueda",
    label: "Color rueda",
    image: "/images/color.jpg",
    products: [
      {
        id: "color-negro",
        name: "Negro",
        description: "Black wheel finish.",
        image: "/images/negro.jpg",
        price: 0,
      },
      {
        id: "color-rojo",
        name: "Rojo",
        description: "Red wheel finish.",
        image: "/images/rojo.avif",
        price: 15,
      },
      {
        id: "color-azul",
        name: "Azul",
        description: "Blue wheel finish.",
        image: "/images/azul.png",
        price: 15,
      },
    ],
  },
  {
    id: "tipo-cambio",
    label: "Tipo cambio",
    image: "/images/cambio.webp",
    products: [
      {
        id: "cambio-6vel",
        name: "6 velocidades",
        description: "6-speed gear system for varied terrain.",
        image: "/images/6-velocidades.jpg",
        price: 89,
      },
      {
        id: "cambio-pinon-fijo",
        name: "Piñón fijo",
        description: "Fixed gear for a direct, simple ride.",
        image: "/images/piñon-fijo.jpg",
        price: 69,
      },
    ],
  },
];

/**
 * Pairs of product IDs that cannot be selected together.
 * Each pair is entered once; compatibility check is symmetric (works both ways).
 */
export const INCOMPATIBILITIES = [
  ["cuadro-pull-suspension", "cambio-pinon-fijo"],
  ["rueda-montana", "cambio-pinon-fijo"],
  ["rueda-fat-wheel", "cambio-pinon-fijo"],
];
