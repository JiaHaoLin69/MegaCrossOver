import { useEffect, useMemo, useState } from 'react';

const STORAGE_PREFIX = 'votes_';

const getStorageValue = (key: string) => {
  const raw = localStorage.getItem(key);
  const parsed = raw ? Number(raw) : 0;
  return Number.isFinite(parsed) ? parsed : 0;
};

export const usePersistentVote = (id: string | number) => {
  const storageKey = useMemo(() => `${STORAGE_PREFIX}${id}`, [id]);
  const [votes, setVotes] = useState<number>(() => getStorageValue(storageKey));

  useEffect(() => {
    localStorage.setItem(storageKey, votes.toString());
  }, [storageKey, votes]);

  const incrementVote = () => setVotes((prev) => prev + 1);

  return { votes, incrementVote };
};

export default usePersistentVote;
