export interface ImportantDate {
  id: string;
  title: string;
  monthDay: string; //Формат "MM-DD" (наприклад "10-14")
  isFavorite?: boolean;
  category?: string; // "Річниця" | "День народження" | "Памʼятна дата"
}

export const INITIAL_IMPORTANT_DATES: ImportantDate[] = [
  {
    id: 'anniversary',
    title: 'Наша річниця',
    monthDay: '10-14',
    isFavorite: true,
    category: 'Річниця',
  },
  {
    id: 'katia-birthday',
    title: 'День народження Каті',
    monthDay: '03-08',
    isFavorite: true,
    category: 'День народження',
  },
  {
    id: 'first-date',
    title: 'День першого побачення',
    monthDay: '01-15',
    isFavorite: false,
    category: 'Памʼятна дата',
  },
  {
    id: 'oleg-birthday',
    title: 'День народження Олега',
    monthDay: '07-22',
    isFavorite: false,
    category: 'День народження',
  },
];
