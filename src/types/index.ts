import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "~/server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;

export type Member = RouterOutput["boards"]["getById"]["team"][0];
export type Board = RouterOutput["boards"]["getById"];
export type Task = RouterOutput["lists"]["getById"]["tasks"]["0"];
export type List = RouterOutput["boards"]["getById"]["lists"]["0"];

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
