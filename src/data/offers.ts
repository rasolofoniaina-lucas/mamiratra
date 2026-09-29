export type Offer = {
  id: "starter" | "boost" | "complete";
  price: number;
  photos: number;
  reels: number;
  visuals: number;
  featured: boolean;
};

export const offers: Offer[] = [
  { id: "starter", price: 20000, photos: 5, reels: 0, visuals: 1, featured: false },
  { id: "boost", price: 30000, photos: 8, reels: 1, visuals: 1, featured: true },
  { id: "complete", price: 40000, photos: 10, reels: 2, visuals: 2, featured: false },
];
