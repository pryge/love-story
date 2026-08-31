const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface Quote {
  id: string;
  text: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateQuoteDto {
  text: string;
}

export const quotesService = {
  async getQuotes(): Promise<Quote[]> {
    try {
      const res = await fetch(`${API_URL}/quotes`, {
        cache: 'no-store',
      });
      if (!res.ok) throw new Error('Failed to fetch quotes');
      const data = await res.json();
      if (Array.isArray(data)) {
        return data;
      }
      return [];
    } catch {
      return [];
    }
  },

  async createQuote(dto: CreateQuoteDto): Promise<Quote> {
    const res = await fetch(`${API_URL}/quotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });
    if (!res.ok) {
      throw new Error('Не вдалося створити цитату');
    }
    return res.json();
  },

  async updateQuote(id: string, dto: CreateQuoteDto): Promise<Quote> {
    const res = await fetch(`${API_URL}/quotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });
    if (!res.ok) {
      throw new Error('Не вдалося оновити цитату');
    }
    return res.json();
  },

  async deleteQuote(id: string): Promise<void> {
    const res = await fetch(`${API_URL}/quotes/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error('Не вдалося видалити цитату');
    }
  },
};
