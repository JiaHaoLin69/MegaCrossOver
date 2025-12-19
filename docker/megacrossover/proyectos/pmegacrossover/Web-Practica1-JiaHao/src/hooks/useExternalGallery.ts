import { useEffect, useMemo, useState } from 'react';

export interface ExternalImage {
  id: string;
  title: string;
  imageUrl: string;
  source: string;
  character?: string;
}

export interface ExternalAnime {
  id: string;
  title: string;
  imageUrl: string;
  episodes?: number;
  score?: number;
  url?: string;
}

const fallbackImages: ExternalImage[] = [
  {
    id: 'fanmix-1',
    title: 'Renako bajo la lluvia de neón',
    imageUrl: 'https://images7.alphacoders.com/134/1348068.png',
    source: 'Ilustración oficial',
    character: 'Renako Amaori',
  },
  {
    id: 'fanmix-2',
    title: 'Mai en la noche de Tokio',
    imageUrl: 'https://images5.alphacoders.com/131/1314554.jpg',
    source: 'Fanart destacado',
    character: 'Mai Ouzuka',
  },
  {
    id: 'fanmix-3',
    title: 'Dueto de Renako y Mai',
    imageUrl: 'https://images2.alphacoders.com/131/1314543.png',
    source: 'Colección externa',
    character: 'Renako & Mai',
  },
  {
    id: 'fanmix-4',
    title: 'Paseo con Ajisai',
    imageUrl: 'https://images6.alphacoders.com/135/1357556.png',
    source: 'Fanbook comunitario',
    character: 'Ajisai Sena',
  },
  {
    id: 'fanmix-5',
    title: 'Trío protagonista',
    imageUrl: 'https://images8.alphacoders.com/135/1357558.jpg',
    source: 'Arte colaborativo',
    character: 'Renako, Mai, Ajisai',
  },
];

const fallbackAnime: ExternalAnime[] = [
  {
    id: 'fallback-1',
    title: 'Niehime to Kemono no Ou',
    imageUrl: 'https://cdn.myanimelist.net/images/anime/1365/123590.jpg',
    episodes: 24,
    score: 7.7,
    url: 'https://myanimelist.net/anime/54244/Niehime_to_Kemono_no_Ou',
  },
  {
    id: 'fallback-2',
    title: 'Sousou no Frieren',
    imageUrl: 'https://cdn.myanimelist.net/images/anime/1015/138006.jpg',
    episodes: 28,
    score: 9.1,
    url: 'https://myanimelist.net/anime/52991/Sousou_no_Frieren',
  },
  {
    id: 'fallback-3',
    title: 'Gotoubun no Hanayome',
    imageUrl: 'https://cdn.myanimelist.net/images/anime/1612/97886.jpg',
    episodes: 12,
    score: 7.7,
    url: 'https://myanimelist.net/anime/38101/5-toubun_no_Hanayome',
  },
];

export const useExternalGallery = () => {
  const [images, setImages] = useState<ExternalImage[]>(fallbackImages);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');

  useEffect(() => {
    const fetchImages = async () => {
      setStatus('loading');
      try {
        const response = await fetch('https://api.jikan.moe/v4/characters?page=1&limit=15&order_by=favorites&sort=desc');
        const payload = await response.json();
        const nextImages: ExternalImage[] = payload?.data?.map((character: any, index: number) => ({
          id: character.mal_id?.toString() ?? `ext-${index}`,
          title: character.name ?? 'Personaje destacado',
          imageUrl: character.images?.jpg?.image_url ?? character.images?.webp?.image_url ?? '',
          source: character.about ? 'Jikan / MAL' : 'Personaje popular',
          character: character.name,
        })) ?? [];

        if (nextImages.some((item) => item.imageUrl)) {
          setImages(nextImages);
          setStatus('ready');
        } else {
          setStatus('error');
        }
      } catch (error) {
        setStatus('error');
      }
    };

    fetchImages();
  }, []);

  const resolvedImages = useMemo(() => {
    if (status === 'ready') return images;
    if (status === 'loading') return images.slice(0, 9);
    return fallbackImages;
  }, [images, status]);

  return { images: resolvedImages, status };
};

export const useTrendingAnime = () => {
  const [animes, setAnimes] = useState<ExternalAnime[]>(fallbackAnime);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');

  useEffect(() => {
    const fetchAnime = async () => {
      setStatus('loading');
      try {
        const response = await fetch('https://api.jikan.moe/v4/top/anime?limit=9&filter=bypopularity');
        const payload = await response.json();

        const parsed: ExternalAnime[] = payload?.data?.map((item: any, index: number) => ({
          id: item.mal_id?.toString() ?? `anime-${index}`,
          title: item.title ?? 'Serie destacada',
          imageUrl: item.images?.jpg?.image_url ?? item.images?.webp?.image_url ?? '',
          episodes: item.episodes,
          score: item.score,
          url: item.url,
        })) ?? [];

        if (parsed.some((entry) => entry.imageUrl)) {
          setAnimes(parsed);
          setStatus('ready');
        } else {
          setStatus('error');
        }
      } catch (error) {
        setStatus('error');
      }
    };

    fetchAnime();
  }, []);

  const resolved = useMemo(() => {
    if (status === 'ready') return animes;
    if (status === 'loading') return animes.slice(0, 6);
    return fallbackAnime;
  }, [animes, status]);

  return { animes: resolved, status };
};
