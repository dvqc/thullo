export type members = {
  id: string;
  img: string;
};
export type Badge = {
  id: string;
  name: string;
};
export type Item = {
  title: string;
  id: number;
  badges: Badge[];
};
export type list = {
  title: string;
  items: Item[];
};
