import img1 from './assets/images/01.jpg';
import renako from './assets/images/renako.jpg';
import mai from './assets/images/mai.jpg';
import ajisai from './assets/images/ajisai.jpg';

export interface CharacterData {
  id: number;
  imgSrc: string;
  title: string;
  shortText: string;
  role: string;
  birthday: string;
  likes: string[];
  fullDescription: string;
  // Cambiamos el tipo para que coincida con tus clases CSS (.btn-renako, etc.)
  variant: 'renako' | 'mai' | 'ajisai';
}

export interface GalleryImage {
  id: number;
  url: string;
  title: string;
  alt: string;
  category: 'oficial' | 'fanart' | 'renako' | 'mai' | 'ajisai' | 'grupo';
}

// --- DATOS DE PERSONAJES ---
export const cardData: CharacterData[] = [
  {
    id: 1,
    imgSrc: renako,
    title: 'Renako Amaori',
    shortText: 'La chica que anhela una vida normal pero atrae el caos romántico.',
    role: 'Protagonista (Uke)',
    birthday: '25 de Septiembre',
    likes: ['Dormir', 'Videojuegos', 'Paz mental'],
    fullDescription: 'Renako dejó atrás su pasado solitario para debutar en la preparatoria, pero su ansiedad social y la confesión de Mai complicaron todo.',
    variant: 'renako' // <--- ESTO USARÁ TU CLASE .btn-renako
  },
  {
    id: 2,
    imgSrc: mai,
    title: 'Mai Ouzuka',
    shortText: 'La estrella perfecta de la escuela con un amor pesado.',
    role: 'Heroína Principal',
    birthday: '8 de Agosto',
    likes: ['Renako', 'Renako', 'Ropa de Renako'],
    fullDescription: 'Mai parece la chica perfecta: rica, guapa y exitosa. Pero en el fondo es insegura y depende emocionalmente de Renako.',
    variant: 'mai' // <--- ESTO USARÁ TU CLASE .btn-mai
  },
  {
    id: 3,
    imgSrc: ajisai,
    title: 'Ajisai Sena',
    shortText: 'El ángel guardián que mantiene unido al grupo.',
    role: 'Mediadora / Ángel',
    birthday: '12 de Febrero',
    likes: ['Ayudar a otros', 'Cosas bonitas'],
    fullDescription: 'Ajisai es el pegamento del grupo. Siempre amable y dispuesta a escuchar. Sin embargo, tiene sus propios deseos...',
    variant: 'ajisai' // <--- ESTO USARÁ TU CLASE .btn-ajisai
  },
];

// --- GALERÍA ---
const galleryModules = import.meta.glob('./assets/galeria_full/*.{png,jpg,jpeg,svg,webp}', { eager: true });

export const allGalleryImages: GalleryImage[] = Object.values(galleryModules).map((module: any, index) => {
  const cats: GalleryImage['category'][] = ['oficial', 'renako', 'mai', 'ajisai', 'grupo'];
  const randomCat = cats[index % cats.length];

  return {
    id: index + 1,
    url: module.default,
    title: `Ilustración #${index + 1}`,
    alt: `Arte de tipo ${randomCat}`,
    category: randomCat
  };
});

export const galleryData = [
  { id: 1, url: img1, alt: 'Ilustración Renako' },
  { id: 2, url: renako, alt: 'Renako Close up' },
  { id: 3, url: mai, alt: 'Mai Style' },
  { id: 4, url: ajisai, alt: 'Ajisai Smile' },
];