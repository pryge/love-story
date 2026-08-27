import { ImportantDate, INITIAL_IMPORTANT_DATES } from '@/components/modules/kitty/widgets/KittyOurDates/kittyOurDates.constants';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface CreateDateDto {
  title: string;
  monthDay: string;
  isFavorite?: boolean;
  category?: string;
}

export const datesService = {
  async getDates(): Promise<ImportantDate[]> {
    try {
      const res = await fetch(`${API_URL}/dates`, {
        cache: 'no-store',
      });
      if (!res.ok) throw new Error('Failed to fetch dates');
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
      return INITIAL_IMPORTANT_DATES;
    } catch {
      return INITIAL_IMPORTANT_DATES;
    }
  },

  async createDate(dto: CreateDateDto): Promise<ImportantDate> {
    const res = await fetch(`${API_URL}/dates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });
    if (!res.ok) {
      throw new Error('Не вдалося створити дату');
    }
    return res.json();
  },

  async updateDate(id: string, dto: CreateDateDto): Promise<ImportantDate> {
    const res = await fetch(`${API_URL}/dates/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });
    if (!res.ok) {
      throw new Error('Не вдалося оновити дату');
    }
    return res.json();
  },

  async deleteDate(id: string): Promise<void> {
    const res = await fetch(`${API_URL}/dates/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error('Не вдалося видалити дату');
    }
  },
};

