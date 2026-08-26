export interface GreetingParts {
  prefix: string;
  accent: string;
}

export const getGreetingPartsByHour = (
  hour: number = new Date().getHours(),
): GreetingParts => {
  if (hour >= 5 && hour < 12) {
    return {
      prefix: 'Доброго ранку,',
      accent: 'Киця 🌸',
    };
  }
  if (hour >= 12 && hour < 18) {
    return {
      prefix: 'Чудового дня,',
      accent: 'моя принцеса 💖',
    };
  }
  return {
    prefix: 'Затишного вечора,',
    accent: 'кохана 🌙',
  };
};
