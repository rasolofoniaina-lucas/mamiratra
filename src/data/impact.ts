// Update with measured results only. null is displayed as “À venir”.
export const impact = [
  { id: "prospects", value: 0, currency: false },
  { id: "clients", value: 0, currency: false },
  { id: "content", value: 0, currency: false },
  { id: "revenue", value: null, currency: true },
  { id: "profit", value: null, currency: true },
] as const;
