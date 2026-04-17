// VoiceMap — Reviews Store (Zustand)
import { create } from 'zustand';
import { Review } from '@/types';
import { MOCK_REVIEWS } from '@/data/mockData';

interface ReviewStore {
  reviews: Review[];
  originalReviews: Review[];
  setTranslatedReviews: (reviews: Review[]) => void;
  setReviews: (reviews: Review[]) => void;
  addReview: (review: Review) => void;
  addReviews: (reviews: Review[]) => void;
  filterSentiment: 'all' | 'positive' | 'negative' | 'neutral';
  setFilterSentiment: (f: ReviewStore['filterSentiment']) => void;
  filteredReviews: () => Review[];
}

export const useReviewStore = create<ReviewStore>((set, get) => ({
  reviews: MOCK_REVIEWS,
  originalReviews: MOCK_REVIEWS,
  filterSentiment: 'all',
  setTranslatedReviews: (reviews) => set({ reviews }),
  setReviews: (reviews) => set({ reviews, originalReviews: reviews }),
  addReview: (review) => set((s) => ({ reviews: [review, ...s.reviews], originalReviews: [review, ...s.originalReviews] })),
  addReviews: (reviews) => set((s) => ({ reviews: [...reviews, ...s.reviews], originalReviews: [...reviews, ...s.originalReviews] })),
  setFilterSentiment: (f) => set({ filterSentiment: f }),
  filteredReviews: () => {
    const { reviews, filterSentiment } = get();
    if (filterSentiment === 'all') return reviews;
    return reviews.filter((r) => r.sentiment === filterSentiment);
  },
}));
