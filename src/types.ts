export type OrderStatus = "gotten" | "process" | "problem" | "ready";

export interface Order {
  id: number;
  title: string;
  price_in_rubs: number;
  email: string | null;
  status: OrderStatus;
  customer_id: number;
  user_id: string;
  created_at: string;
};

export interface OrderInsert {
  title: string;
  price_in_rubs: number;
  email?: string | null;
  status?: OrderStatus;
  customer_id: number;
  user_id: string;
};

export interface OrderUpdate {
  title?: string;
  price_in_rubs?: number;
  email?: string | null;
  status?: OrderStatus;
  customer_id?: number;
};

export interface Customer {
  id: number;
  avatar_url: string | null;
  title: string;
  email: string | null;
  come_from: string | null;
  user_id: string;
  created_at: string;
};

export interface CustomerInsert {
  avatar_url?: string | null;
  title: string;
  email?: string | null;
  come_from?: string | null;
  user_id: string;
};

export interface CustomerUpdate {
  avatar_url?: string | null;
  title?: string;
  email?: string | null;
  come_from?: string | null;
};

export interface Comment {
  id: number;
  text: string;
  order_id: number;
  user_id: number; // ID заказчика из customers
  created_at: string;
};

export interface CommentInsert {
  text: string;
  order_id: number;
  user_id: number; // customer.id
};

export interface Feedback {
  id: number;
  rating: number;
  text: string;
  user_id: string;
  created_at: string;
};

export interface FeedbackInsert {
  rating: number;
  text: string;
  user_id: string; // передаём из auth.uid()
};