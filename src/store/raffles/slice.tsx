import { create } from "zustand";

const RAFFLES_KEY = "cogeme_local_raffles";

const readRaffles = (): Raffle[] => {
  try {
    return JSON.parse(localStorage.getItem(RAFFLES_KEY) ?? "[]") as Raffle[];
  } catch {
    return [];
  }
};

const writeRaffles = (raffles: Raffle[]) => {
  localStorage.setItem(RAFFLES_KEY, JSON.stringify(raffles));
};


interface RaffleStore {
  raffles: Raffle[];
  isLoading: boolean;
  error: string | null;
  fetchRaffles: (userId: string | undefined) => Promise<void>;
  addRaffle: (raffle: CreateRaffleType) => Promise<void>;
  updateRaffle: (
    id: string | undefined,
    updates: UpdateRaffleType
  ) => Promise<void>;
  deleteRaffleZ: (id: number) => Promise<void>;
  setRaffles: (raffles: Raffle[]) => void;
}

export const useRaffleStore = create<RaffleStore>((set) => ({
  raffles: [],
  isLoading: false,
  error: null,

  fetchRaffles: async () => {
    set({ isLoading: true, error: null });
    const raffles = readRaffles();
    set({ raffles, isLoading: false });
  },

  addRaffle: async (raffle) => {
    const current = readRaffles();
    const created = { ...raffle, id: Date.now(), loteria: "" } as Raffle;
    const raffles = [...current, created];
    writeRaffles(raffles);
    set({ raffles, error: null, isLoading: false });
  },

  updateRaffle: async (id, updates) => {
    const raffles = readRaffles().map((raffle) =>
      raffle.id === Number(id) ? { ...raffle, ...updates } : raffle,
    );
    writeRaffles(raffles);
    set({ raffles, error: null, isLoading: false });
  },

  setRaffles: (raffles) => {
    writeRaffles(raffles);
    set({ raffles });
  },

  deleteRaffleZ: async (id) => {
    const raffles = readRaffles().filter((raffle) => raffle.id !== id);
    writeRaffles(raffles);
    set({ raffles, error: null, isLoading: false });
  },
}));
