export type FeedbackType = "bug" | "feature" | "testimonial";

export interface FeedbackItem {
  id: number;
  type: FeedbackType;
  message: string;
  email: string | null;
  device_info: string | null;
  created_at: string;
}

export type FilterTab = "all" | FeedbackType;
