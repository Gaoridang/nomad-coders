interface Tab {
  name: string;
  path: string;
  id: number;
}

export const tabs: Tab[] = [
  {
    name: "Populars",
    path: "",
    id: 1,
  },
  {
    name: "Playings",
    path: "now-playing",
    id: 2,
  },
  {
    name: "Comings",
    path: "coming-soon",
    id: 3,
  },
];
