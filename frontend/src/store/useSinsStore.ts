import { create } from 'zustand';
import { sinsService, Sin, CreateSinDto } from '@/services/sins.service';

interface SinsState {
  sins: Sin[];
  isLoading: boolean;
  fetchSins: () => Promise<void>;
  createSin: (dto: CreateSinDto) => Promise<void>;
  forgiveSin: (id: string) => Promise<void>;
  deleteSin: (id: string) => Promise<void>;
}

export const useSinsStore = create<SinsState>((set, get) => ({
  sins: [],
  isLoading: false,

  fetchSins: async () => {
    set({ isLoading: true });
    const data = await sinsService.getSins();
    set({ sins: data, isLoading: false });
  },

  createSin: async (dto: CreateSinDto) => {
    await sinsService.createSin(dto);
    await get().fetchSins();
  },

  forgiveSin: async (id: string) => {
    await sinsService.forgiveSin(id);
    await get().fetchSins();
  },

  deleteSin: async (id: string) => {
    await sinsService.deleteSin(id);
    await get().fetchSins();
  },
}));
