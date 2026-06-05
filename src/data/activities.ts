// Datos para las 7 actividades pedagógicas
export interface Shape {
  name: string;
  nameEn: string;
  color: string;
  bgClass: string;
  borderClass: string;
  svg: string;
  emoji: string;
}

export const shapes: Shape[] = [
  {
    name: "Círculo",
    nameEn: "Circle",
    color: "#f56565",
    bgClass: "bg-rose-100",
    borderClass: "border-rose-400",
    emoji: "🔴",
    svg: '<svg viewBox="0 0 100 100" class="w-20 h-20 mx-auto"><circle cx="50" cy="50" r="40" fill="#f56565"/></svg>',
  },
  {
    name: "Cuadrado",
    nameEn: "Square",
    color: "#3b82f6",
    bgClass: "bg-blue-100",
    borderClass: "border-blue-400",
    emoji: "🟦",
    svg: '<svg viewBox="0 0 100 100" class="w-20 h-20 mx-auto"><rect x="15" y="15" width="70" height="70" fill="#3b82f6" rx="10"/></svg>',
  },
  {
    name: "Triángulo",
    nameEn: "Triangle",
    color: "#22c55e",
    bgClass: "bg-green-100",
    borderClass: "border-green-400",
    emoji: "🔺",
    svg: '<svg viewBox="0 0 100 100" class="w-20 h-20 mx-auto"><polygon points="50,15 90,85 10,85" fill="#22c55e"/></svg>',
  },
  {
    name: "Estrella",
    nameEn: "Star",
    color: "#eab308",
    bgClass: "bg-yellow-100",
    borderClass: "border-yellow-400",
    emoji: "⭐",
    svg: '<svg viewBox="0 0 100 100" class="w-20 h-20 mx-auto"><polygon points="50,10 61,38 91,38 67,57 77,86 50,68 23,86 33,57 9,38 39,38" fill="#eab308"/></svg>',
  },
  {
    name: "Corazón",
    nameEn: "Heart",
    color: "#ec4899",
    bgClass: "bg-pink-100",
    borderClass: "border-pink-400",
    emoji: "❤️",
    svg: '<svg viewBox="0 0 100 100" class="w-20 h-20 mx-auto"><path d="M50 88 C25 65 10 50 10 32 C10 18 22 10 32 10 C40 10 47 14 50 22 C53 14 60 10 68 10 C78 10 90 18 90 32 C90 50 75 65 50 88Z" fill="#ec4899"/></svg>',
  },
  {
    name: "Rectángulo",
    nameEn: "Rectangle",
    color: "#a855f7",
    bgClass: "bg-purple-100",
    borderClass: "border-purple-400",
    emoji: "🟪",
    svg: '<svg viewBox="0 0 100 100" class="w-20 h-20 mx-auto"><rect x="10" y="30" width="80" height="40" fill="#a855f7" rx="6"/></svg>',
  },
];

export const paintColors = [
  { name: "Rojo", hex: "#ef4444", class: "bg-red-500" },
  { name: "Azul", hex: "#3b82f6", class: "bg-blue-500" },
  { name: "Amarillo", hex: "#eab308", class: "bg-yellow-500" },
  { name: "Verde", hex: "#22c55e", class: "bg-green-500" },
  { name: "Morado", hex: "#a855f7", class: "bg-purple-500" },
  { name: "Naranja", hex: "#f97316", class: "bg-orange-500" },
  { name: "Rosa", hex: "#ec4899", class: "bg-pink-500" },
  { name: "Cielo", hex: "#0ea5e9", class: "bg-sky-500" },
];

// Emojis para memoria (8 pares = 16 cartas)
export const memoryEmojis = ["🐶", "🐱", "🐰", "🦊", "🐻", "🐼", "🐨", "🦁"];

export interface StoryPage {
  text: string;
  emoji: string;
}

export const stories: StoryPage[][] = [
  [
    { text: "Había una vez un pingüino llamado Frost que vivía en la montaña más fría del bosque.", emoji: "🐧" },
    { text: "Frost tenía un secreto: cada noche, cantaba una canción a la luna para que no se sintiera sola.", emoji: "🌙" },
    { text: "Una noche, la luna le respondió con un copo de nieve gigante.", emoji: "❄️" },
    { text: "Frost entendió que la amistad puede cruzar el cielo entero.", emoji: "⭐" },
    { text: "Colorín colorado, este cuento ha terminado.", emoji: "🌟" },
  ],
  [
    { text: "En el Cold Woods, un oso pequeño buscaba a su mamá entre los pinos.", emoji: "🐻" },
    { text: "Los pinos susurraban: 'Sigue adelante, pequeño, ella te espera'.", emoji: "🌲" },
    { text: "Al fondo del bosque, encontró su abrazo enorme y cálido.", emoji: "🤗" },
    { text: "Mamá oso le dijo: 'Siempre te encontraré, mi amor'.", emoji: "❤️" },
    { text: "Y colorín colorado, este cuento ha terminado.", emoji: "🌟" },
  ],
  [
    { text: "Una niña llamada Monse plantó una semilla en la nieve.", emoji: "👧" },
    { text: "Le cantó todas las noches y la regó con lágrimas de esperanza.", emoji: "💧" },
    { text: "A la mañana siguiente, salió una flor que brillaba como el sol.", emoji: "🌻" },
    { text: "La flor le dijo: 'Gracias por creer en mí cuando nadie más lo hacía'.", emoji: "✨" },
    { text: "Y colorín colorado, este cuento ha terminado.", emoji: "🌟" },
  ],
];

export interface MonsterPart {
  id: string;
  emoji: string;
  label: string;
}

export const monsterParts: { heads: MonsterPart[]; bodies: MonsterPart[]; legs: MonsterPart[] } = {
  heads: [
    { id: "h-dragon", emoji: "🐲", label: "Dragón" },
    { id: "h-unicorn", emoji: "🦄", label: "Unicornio" },
    { id: "h-octopus", emoji: "🐙", label: "Pulpo" },
    { id: "h-fox", emoji: "🦊", label: "Zorro" },
  ],
  bodies: [
    { id: "b-frog", emoji: "🐸", label: "Rana" },
    { id: "b-bear", emoji: "🐻", label: "Oso" },
    { id: "b-pig", emoji: "🐷", label: "Cerdito" },
    { id: "b-dino", emoji: "🦖", label: "Dinosaurio" },
  ],
  legs: [
    { id: "l-duck", emoji: "🦆", label: "Pato" },
    { id: "l-bunny", emoji: "🐰", label: "Conejo" },
    { id: "l-crab", emoji: "🦀", label: "Cangrejo" },
    { id: "l-horse", emoji: "🐴", label: "Caballo" },
  ],
};

// Piezas de ropa para Frost el pingüino
export const clothingItems = {
  hats: [
    { id: "hat-none", emoji: "🚫", label: "Sin gorro" },
    { id: "hat-santa", emoji: "🎅", label: "Gorro Papá Noel" },
    { id: "hat-party", emoji: "🎉", label: "Gorro de fiesta" },
    { id: "hat-cowboy", emoji: "🤠", label: "Sombrero vaquero" },
  ],
  scarves: [
    { id: "scarf-none", emoji: "🚫", label: "Sin bufanda" },
    { id: "scarf-red", emoji: "🧣", label: "Bufanda roja" },
    { id: "scarf-rainbow", emoji: "🌈", label: "Bufanda arcoíris" },
  ],
  glasses: [
    { id: "glass-none", emoji: "🚫", label: "Sin lentes" },
    { id: "glass-sun", emoji: "🕶️", label: "Lentes de sol" },
    { id: "glass-nerd", emoji: "🤓", label: "Lentes de empollón" },
  ],
};
