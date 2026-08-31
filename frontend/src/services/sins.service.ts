const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface Sin {
  id: string;
  title: string;
  severity: string;
  hint?: string;
  isForgiven: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateSinDto {
  title: string;
  severity?: string;
  hint?: string;
  isForgiven?: boolean;
}

export const sinsService = {
  async getSins(): Promise<Sin[]> {
    try {
      const res = await fetch(`${API_URL}/sins`, {
        cache: 'no-store',
      });
      if (!res.ok) throw new Error('Failed to fetch sins');
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  },

  async createSin(dto: CreateSinDto): Promise<Sin> {
    const res = await fetch(`${API_URL}/sins`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });
    if (!res.ok) {
      throw new Error('Не вдалося створити провину');
    }
    return res.json();
  },

  async updateSin(id: string, dto: CreateSinDto): Promise<Sin> {
    const res = await fetch(`${API_URL}/sins/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });
    if (!res.ok) {
      throw new Error('Не вдалося оновити провину');
    }
    return res.json();
  },

  async forgiveSin(id: string): Promise<Sin> {
    const res = await fetch(`${API_URL}/sins/${id}/forgive`, {
      method: 'PUT',
    });
    if (!res.ok) {
      throw new Error('Не вдалося пробачити провину');
    }
    return res.json();
  },

  async deleteSin(id: string): Promise<void> {
    const res = await fetch(`${API_URL}/sins/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error('Не вдалося видалити провину');
    }
  },
};
