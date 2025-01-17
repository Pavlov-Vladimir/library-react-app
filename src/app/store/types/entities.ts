export interface Book {
    id?: number;
    title: string;
    author: string;
    rating: number;
    reviewsNumber: number;
  };

export interface DetailBook {
  id: number;
  title: string;
  author: string;
  genre: string;
  rating: number;
  reviewsNumber: number;
  cover: string | null;
  content: string;
  reviews: Review[];
}

export interface Review {
    id: number;
    message: string;
    reviewer: string;
  }