import renakoImg from './assets/images/renako.jpg';
import maiImg from './assets/images/mai.jpg';
import ajisaiImg from './assets/images/ajisai.jpg';
import groupImg from './assets/images/05.jpg'; // Usando una imagen local grande para el grupo
import lnImg from './assets/images/06.jpeg'; // Usando otra imagen local para el libro o similar

export interface Character {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
  title: string;
  shortText: string;
  imgSrc: string;
  birthday: string;
  likes: string[];
  fullDescription: string;
  variant: 'renako' | 'mai' | 'ajisai';
}

export interface GalleryImage {
  id: number;
  url: string;
  alt: string;
  category: 'oficial' | 'fanart' | 'renako' | 'mai' | 'ajisai' | 'grupo' | 'todos';
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: 'Figura' | 'Merch' | 'Bebida' | 'Música' | 'Libro';
  description: string;
  isNew?: boolean;
}

export const cardsData: Character[] = [
  {
    id: 1,
    name: 'Renako Amaori',
    title: 'Renako Amaori',
    role: 'Protagonista Indecisa',
    shortText: 'La chica que anhela una vida normal pero atrae el caos romántico.',
    description: 'Una chica que solo quiere una vida tranquila de preparatoria, pero termina en un lío amoroso.',
    image: renakoImg,
    imgSrc: renakoImg,
    birthday: '3 de Marzo',
    likes: ['Dormir', 'Videojuegos', 'Paz mental'],
    fullDescription: 'Renako dejó atrás su pasado solitario para debutar en la preparatoria, pero su ansiedad social y la confesión de Mai complicaron todo.',
    variant: 'renako'
  },
  {
    id: 2,
    name: 'Mai Ouzuka',
    title: 'Mai Ouzuka',
    role: 'Superestrella Escolar',
    shortText: 'La estrella perfecta de la escuela con un amor pesado.',
    description: 'La chica perfecta del instituto que es secretamente muy intensa en el amor.',
    image: maiImg,
    imgSrc: maiImg,
    birthday: '31 de Agosto',
    likes: ['Renako', 'Renako', 'Ropa de Renako'],
    fullDescription: 'Mai parece la chica perfecta: rica, guapa y exitosa. Pero en el fondo es insegura y depende emocionalmente de Renako.',
    variant: 'mai'
  },
  {
    id: 3,
    name: 'Ajisai Sena',
    title: 'Ajisai Sena',
    role: 'Ángel de la Clase',
    shortText: 'El ángel guardián que mantiene unido al grupo.',
    description: 'Amable y considerada, pero con sus propios secretos y sentimientos.',
    image: ajisaiImg,
    imgSrc: ajisaiImg,
    birthday: '12 de Diciembre',
    likes: ['Ayudar a otros', 'Cosas bonitas'],
    fullDescription: 'Ajisai es el pegamento del grupo. Siempre amable y dispuesta a escuchar. Sin embargo, tiene sus propios deseos...',
    variant: 'ajisai'
  }
];

export const cardData = cardsData;

export const galleryData: GalleryImage[] = [
  { id: 101, url: groupImg, alt: 'Key Visual Anime', category: 'grupo' },
  { id: 102, url: renakoImg, alt: 'Renako Character Visual', category: 'renako' },
  { id: 103, url: maiImg, alt: 'Mai Character Visual', category: 'mai' },
  { id: 104, url: ajisaiImg, alt: 'Ajisai Character Visual', category: 'ajisai' },
  { id: 105, url: lnImg, alt: 'Watanare Scene', category: 'oficial' },
];

export const allGalleryImages = galleryData;

export const productsData: Product[] = [
  {
    id: 101,
    name: 'Renako Amaori - 1/7 Scale Figure',
    price: 159.99,
    image: renakoImg,
    category: 'Figura',
    description: 'Figura detallada de Renako con su uniforme escolar. Expresión de pánico incluida.',
    isNew: true
  },
  {
    id: 102,
    name: 'Mai Ouzuka - 1/7 Scale Figure',
    price: 169.99,
    image: maiImg,
    category: 'Figura',
    description: 'Elegante figura de Mai Ouzuka. Captura su aura de "Darling" perfecta.',
    isNew: true
  },
  {
    id: 103,
    name: 'Ajisai Sena - 1/7 Scale Figure',
    price: 159.99,
    image: ajisaiImg,
    category: 'Figura',
    description: 'La adorable Ajisai en su pose característica. Incluye base de flores.',
  },
  {
    id: 201,
    name: 'Watanare Light Novel Vol. 1',
    price: 15.00,
    image: lnImg,
    category: 'Libro',
    description: 'El comienzo de todo. ¿Amantes o amigas? ¡Decide tú!',
  },
  {
    id: 301,
    name: 'Watanare Official Fanbook',
    price: 45.00,
    image: groupImg,
    category: 'Libro',
    description: 'Arte conceptual, entrevistas y bocetos exclusivos del anime.',
    isNew: true
  }
];