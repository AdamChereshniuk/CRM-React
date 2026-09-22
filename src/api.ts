import type { Order, OrderInsert, OrderUpdate, Customer, CustomerInsert, Comment, CommentInsert, CustomerUpdate } from "./types";
import type { Feedback, FeedbackInsert } from "./types";
import supabase from "./supabase";

// ─── Заказы ───────────────────────────────────────────
export async function getOrders(): Promise<Order[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Пользователь не авторизован");

  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      customers:customer_id (
        id,
        title,
        email,
        avatar_url
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
};

export async function addOrder(order: OrderInsert): Promise<Order> {
  const { data, error } = await supabase
    .from("orders")
    .insert(order)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export async function updateOrder(id: number, updates: OrderUpdate) {
  const { data, error } = await supabase
    .from("orders")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
};

// export async function updateOrder(id: number, updates: OrderUpdate) {
//   const { data, error } = await supabase
//     .from("orders")
//     .update(updates)
//     .eq("id", id)
//     .select();

//   if (error) throw error;
//   return data;
// };

export async function removeOrder(id: number): Promise<void> {
  const { error } = await supabase
    .from("orders")
    .delete()
    .eq("id", id);

  if (error) throw error;
};

// ─── Заказчики ─────────────────────────────────────────
export async function getCustomers(): Promise<Customer[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Пользователь не авторизован");

  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
};

export async function addCustomer(customer: CustomerInsert): Promise<Customer> {
  const { data, error } = await supabase
    .from("customers")
    .insert(customer)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export async function updateCustomer(
  id: number,
  updates: CustomerUpdate
): Promise<Customer> {
  const { data, error } = await supabase
    .from("customers")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export async function removeCustomer(id: number): Promise<void> {
  const { error } = await supabase
    .from("customers")
    .delete()
    .eq("id", id);

  if (error) throw error;
};

// ─── Комментарии ───────────────────────────────────────
export async function getComments(orderId: number): Promise<Comment[]> {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("order_id", orderId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data ?? [];
};

export async function addComment(comment: CommentInsert): Promise<Comment> {
  const { data, error } = await supabase
    .from("comments")
    .insert(comment)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export async function removeComment(id: number): Promise<void> {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", id);

  if (error) throw error;
};

export async function getFeedbacks(): Promise<Feedback[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Не авторизован");

  const { data, error } = await supabase
    .from("feedback")
    .select()
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
};

export async function addFeedback(rating: number, text: string): Promise<Feedback> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Не авторизован");

  const payload: FeedbackInsert = { rating, text, user_id: user.id };

  const { data, error } = await supabase
    .from("feedback")
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export async function updateFeedback(id: number, updates: Partial<Feedback>): Promise<Feedback> {
  const { data, error } = await supabase
    .from("feedback")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export async function removeFeedback(id: number): Promise<void> {
  const { error } = await supabase
    .from("feedback")
    .delete()
    .eq("id", id);

  if (error) throw error;
};