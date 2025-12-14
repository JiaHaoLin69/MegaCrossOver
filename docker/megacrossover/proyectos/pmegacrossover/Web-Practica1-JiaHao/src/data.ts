// Importaciones de imágenes para las Cards y Galería Principal
import img1 from './assets/images/01.jpg';
import img2 from './assets/images/02.jpg';
import img6 from './assets/images/06.jpeg';
import img8 from './assets/images/08.jpeg';
import img9 from './assets/images/09.jpeg';
import img10 from './assets/images/10.jpg';
import renako from './assets/images/renako.jpg';
import mai from './assets/images/mai.jpg';
import ajisai from './assets/images/ajisai.jpg';

// Definición de la interfaz para los datos de personajes
export interface CharacterData {
  id: number;
  imgSrc: string;
  title: string;
  text: string;
  fullDescription?: string;
  buttonLabel: string;
  variant: string;
}

// --- DATOS DE LAS TARJETAS (Página de Inicio y Detalles) ---
export const cardData: CharacterData[] = [
  { 
    id: 1, 
    imgSrc: renako, 
    title: 'Renako Amaori', 
    text: 'La chica que solo quería amigos normales y terminó en el centro de un harem yuri inesperado. Su ansiedad social es su encanto.', 
    fullDescription: 'Renako Amaori es la protagonista principal. Después de un pasado traumático con las amistades, decide reinventarse en la preparatoria. Sin embargo, su plan de una "vida normal" se desmorona cuando la chica más popular de la escuela se le confiesa. Sufre de ansiedad social pero tiene un corazón de oro.',
    buttonLabel: 'Ver Historia', 
    variant: 'primary' 
  },
  { 
    id: 2, 
    imgSrc: mai,
    title: 'Mai Ouzuka', 
    text: 'La ídolo perfecta de la escuela que, secretamente, es una chica pesada y locamente enamorada de su mejor amiga.', 
    fullDescription: 'Mai Ozu es la modelo y estrella de la escuela. Parece perfecta, pero en realidad es bastante torpe y tiene un amor obsesivo por Renako. Hará lo que sea para que Renako la elija a ella, incluso si eso significa competir contra otras chicas.',
    buttonLabel: 'Descubrir Secreto', 
    variant: 'success'
  },
  { 
    id: 3, 
    imgSrc: ajisai,
    title: 'Ajisai Sena', 
    text: 'El verdadero ángel del grupo. Siempre dispuesta a apoyar, aunque quizás sus sentimientos sean más profundos de lo que parecen.', 
    fullDescription: 'Ajisai es considerada un ángel por todos. Es amable, comprensiva y siempre sabe qué decir. Aunque apoya a Renako y Mai, muchos sospechan que guarda sus propios sentimientos profundos.',
    buttonLabel: 'Team Ajisai', 
    variant: 'warning' 
  },
];

// --- DATOS DE LA GALERÍA PEQUEÑA (Página de Inicio) ---
export const galleryData = [
    { id: 1, url: img10, alt: 'Arte Oficial Watanare' },
    { id: 2, url: img1, alt: 'Ilustración Renako' },
    { id: 3, url: img8, alt: 'Momento Clímax' },
    { id: 4, url: img9, alt: 'Escenario' },
];

// --- GALERÍA COMPLETA AUTOMÁTICA (Para /galeria) ---
// Utiliza Glob Import de Vite para leer todos los archivos de la carpeta
// Asegúrate de crear la carpeta: src/assets/galeria_full/ y poner tus imágenes ahí.

const galleryModules = import.meta.glob('./assets/galeria_full/*.{png,jpg,jpeg,svg,webp}', { eager: true });

export const allGalleryImages = Object.values(galleryModules).map((module: any, index) => {
  return {
    id: index + 1,
    url: module.default, // La URL procesada por Vite
    title: `Arte #${index + 1}`,
    alt: `Imagen de la galería número ${index + 1}`
  };
});