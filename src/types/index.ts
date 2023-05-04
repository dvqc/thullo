import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "~/server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;

export type Member = RouterOutput["board"]["getById"]["team"][0];

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
