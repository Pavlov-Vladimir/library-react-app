import { ReviewSchema } from "@/entities/Review";

export interface DetailBookSchema {
  id: number;
  title: string;
  author: string;
  genre: string;
  rating: number;
  reviewsNumber: number;
  cover: string | null;
  content: string;
  reviews: ReviewSchema[];
}
