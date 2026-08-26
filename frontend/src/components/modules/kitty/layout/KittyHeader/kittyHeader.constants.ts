export const getGreetingByHour = (
  hour: number = new Date().getHours(),
): string => {
  if (hour >= 5 && hour < 12) {
    return "Доброго ранку, Киця 🌸";
  }
  if (hour >= 12 && hour < 18) {
    return "Чудового дня, моя принцеса 💖";
  }
  return "Затишного вечора, кохана 🌙";
};
