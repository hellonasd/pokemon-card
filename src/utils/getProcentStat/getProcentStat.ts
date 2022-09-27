export const getProcentStat = (base_stat: number): number => {
  const maxHp = 255;
  const result = (base_stat / maxHp) * 100;
  return result;
};
