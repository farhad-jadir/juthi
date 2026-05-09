export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: 'hair' | 'skin' | 'bridal' | 'nails';
  image_url: string;
}

export interface Appointment {
  id: string;
  user_id: string | null;
  service_id: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  guest_name?: string | null;
  guest_phone?: string | null;
  guest_address?: string | null;
  created_at: string;
}

export interface Review {
  id: string;
  user_id: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string;
  phone?: string;
  is_admin: boolean;
}
