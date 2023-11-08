export function formatNumberWithCommas(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export const formatMoney = (str: string) => {
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
