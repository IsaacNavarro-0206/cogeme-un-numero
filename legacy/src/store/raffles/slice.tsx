import {
  CreateRaffle,
  DeleteRaffle,
  GetRaffles,
  UpdateRaffle,
} from "@/service/raffle";
import { create } from "zustand";

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

  fetchRaffles: async (userId) => {
    set({ isLoading: true });

    try {
      const response = await GetRaffles(userId);
      set({ raffles: response.data, error: null });
    } catch (error) {
      console.error("Error: ", error);

      set({ error: "Error al cargar las rifas" });
    } finally {
      set({ isLoading: false });
    }
  },

  addRaffle: async (raffle) => {
    set({ isLoading: true });

    try {
      const response = await CreateRaffle(raffle);

      set((state) => ({
        raffles: [...state.raffles, response.data],
        error: null,
      }));
    } catch (error) {
      console.error("Error: ", error);

      set({ error: "Error al crear la rifa" });
    } finally {
      set({ isLoading: false });
    }
  },

  updateRaffle: async (id, updates) => {
    set({ isLoading: true });

    try {
      const response = await UpdateRaffle(updates, id);

      set((state) => ({
        raffles: state.raffles.map((raffle) =>
          raffle.id === Number(id) ? response.data : raffle
        ),
        error: null,
      }));
    } catch (error) {
      console.error("Error: ", error);

      set({ error: "Error al actualizar la rifa" });
    } finally {
      set({ isLoading: false });
    }
  },

  setRaffles: (raffles) => set({ raffles }),

  deleteRaffleZ: async (id) => {
    set({ isLoading: true });

    try {
      await DeleteRaffle(id);

      set((state) => ({
        raffles: state.raffles.filter((raffle) => raffle.id !== id),
        error: null,
      }));
    } catch (error) {
      console.error("Error: ", error);

      set({ error: "Error al eliminar la rifa" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
