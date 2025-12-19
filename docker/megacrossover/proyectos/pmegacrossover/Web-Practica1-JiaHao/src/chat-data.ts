// Importamos las imágenes existentes
import renako from './assets/images/renako.jpg';
import mai from './assets/images/mai.jpg';
import ajisai from './assets/images/ajisai.jpg';

export interface ChatNode {
    id: string;
    text: string;
    sender: 'character' | 'user';
    options?: ChatOption[]; // Solo si el sender es 'character' y espera respuesta
    nextId?: string; // Si no hay opciones, salta a este nodo automáticamente
    mood?: 'happy' | 'sad' | 'angry' | 'flustered';
}

export interface ChatOption {
    label: string;
    nextId: string;
    affectionPoints: number; // Puntos que da esta respuesta
}

export interface CharacterProfile {
    id: string;
    name: string;
    avatar: string;
    color: string;
    initialNode: string;
    status: string;
}

// --- PERFILES DE PERSONAJES ---
export const chatProfiles: CharacterProfile[] = [
    { id: 'renako', name: 'Renako Amaori', avatar: renako, color: '#ff8fa3', initialNode: 'start_renako', status: 'En pánico social...' },
    { id: 'mai', name: 'Mai Ouzuka', avatar: mai, color: '#f9ca24', initialNode: 'start_mai', status: 'Pensando en Renako ❤️' },
    { id: 'ajisai', name: 'Ajisai Sena', avatar: ajisai, color: '#c0a080', initialNode: 'start_ajisai', status: 'Disponible 😇' },
];

// --- ÁRBOLES DE DIÁLOGO (GUIÓN) ---
export const chatScenarios: Record<string, ChatNode> = {
    // === ESCENARIO RENAKO ===
    'start_renako': {
        id: 'start_renako',
        text: '¡E-Esto es una emergencia! 😱',
        sender: 'character',
        nextId: 'renako_1'
    },
    'renako_1': {
        id: 'renako_1',
        text: 'Mai me acaba de invitar a una cita "de amigas" pero trae flores... ¿Qué hago?',
        sender: 'character',
        options: [
            { label: '¡Huye mientras puedas!', nextId: 'renako_run', affectionPoints: 5 },
            { label: 'Acepta, seguro es amable.', nextId: 'renako_accept', affectionPoints: -2 },
        ]
    },
    'renako_run': {
        id: 'renako_run',
        text: '¡Exacto! Sabía que me entenderías. Me esconderé en el baño. 🏃‍♀️💨',
        sender: 'character',
        mood: 'happy'
    },
    'renako_accept': {
        id: 'renako_accept',
        text: '¿Estás loco? ¡Si acepto pensará que somos novias de verdad! (Más de lo que ya cree...)',
        sender: 'character',
        mood: 'flustered'
    },

    // === ESCENARIO MAI ===
    'start_mai': {
        id: 'start_mai',
        text: 'Renako no me contesta los mensajes... 😢',
        sender: 'character',
        nextId: 'mai_1'
    },
    'mai_1': {
        id: 'mai_1',
        text: '¿Crees que debería ir a su casa a ver si está bien? Llevo 10 minutos sin saber de ella.',
        sender: 'character',
        options: [
            { label: 'Espera un poco, Mai.', nextId: 'mai_wait', affectionPoints: -5 },
            { label: '¡Ve! Seguro te espera.', nextId: 'mai_go', affectionPoints: 10 },
        ]
    },
    'mai_wait': {
        id: 'mai_wait',
        text: 'Moo... eres aburrido. Pero supongo que tienes razón, no quiero asustarla. Solo un poco.',
        sender: 'character',
        mood: 'sad'
    },
    'mai_go': {
        id: 'mai_go',
        text: '¡Siiiii! ¡Sabía que eras un aliado del amor! Voy corriendo 🏃‍♀️💕',
        sender: 'character',
        mood: 'happy'
    },

    // === ESCENARIO AJISAI ===
    'start_ajisai': {
        id: 'start_ajisai',
        text: 'Hola 👋 ¿Tienes un momento?',
        sender: 'character',
        nextId: 'ajisai_1'
    },
    'ajisai_1': {
        id: 'ajisai_1',
        text: 'Estaba pensando en organizar una salida grupal para aliviar la tensión entre Mai y Renako. ¿Alguna idea?',
        sender: 'character',
        options: [
            { label: 'Ir al Karaoke', nextId: 'ajisai_karaoke', affectionPoints: 5 },
            { label: 'Dejarlas solas', nextId: 'ajisai_alone', affectionPoints: 0 },
        ]
    },
    'ajisai_karaoke': {
        id: 'ajisai_karaoke',
        text: '¡Buena idea! A Renako le gusta cantar cuando nadie la ve. Eres muy considerado 😇',
        sender: 'character',
        mood: 'happy'
    },
    'ajisai_alone': {
        id: 'ajisai_alone',
        text: 'Hmm, eso podría acabar en desastre... mejor las supervisamos de lejos jeje.',
        sender: 'character'
    }
};