// VoiceMap — Reviews Store (Zustand)
import { create } from 'zustand';
import { Review } from '@/types';
import { MOCK_REVIEWS } from '@/data/mockData';

interface ReviewStore {
  reviews: Review[];
  setReviews: (reviews: Review[]) => void;
  addReview: (review: Review) => void;
  addReviews: (reviews: Review[]) => void;
  filterSentiment: 'all' | 'positive' | 'negative' | 'neutral';
  setFilterSentiment: (f: ReviewStore['filterSentiment']) => void;
  filteredReviews: () => Review[];
}

export const useReviewStore = create<ReviewStore>((set, get) => ({
  reviews: MOCK_REVIEWS,
  filterSentiment: 'all',
  setReviews: (reviews) => set({ reviews }),
  addReview: (review) => set((s) => ({ reviews: [review, ...s.reviews] })),
  addReviews: (reviews) => set((s) => ({ reviews: [...reviews, ...s.reviews] })),
  setFilterSentiment: (f) => set({ filterSentiment: f }),
  filteredReviews: () => {
    const { reviews, filterSentiment } = get();
    if (filterSentiment === 'all') return reviews;
    return reviews.filter((r) => r.sentiment === filterSentiment);
  },
}));
