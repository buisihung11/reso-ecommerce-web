import {
  TProduct,
  ProductVariant,
  SelectedOptions,
  SelectedExtra,
} from './product';

export interface OrderDetail {
  product_id: number;
  quantity: number;
  parent_id?: number;
  total_amount?: number;
  discount?: number;
  final_amount?: number;
  product_name?: string;
  product_type?: number;
}

export interface CustomerCartInfo {
  phone: string;
  name: string;
  email: string;
  address: string;
  phone_receiver?: string;
  gender?: number;
  [key: string]: any;
}

export interface Payment {
  amount: number;
  type: number;
}

export type Cart = {
  items: CartItem[];
  total: number;
  totalItem: number;
  // vouchers
};

export type CartItem = Omit<TProduct, 'variants'> & {
  quantity: number;
  /**
   * if the product doesn't have variant this will be null
   * */
  selectedVariant?: ProductVariant | null;
  selectedModifiers?: SelectedOptions;
  selectedExtras?: SelectedExtra[];

  /** For combo */
  productChilds?: SelectedChoice[];
};

export type SelectedChoice = {
  groupId: number;
  products: CartItem[];
};

export interface CartPrepareRequest {
  order_details: OrderDetail[];
  store_id?: number;
  payments?: Payment[];
  customer?: CustomerCartInfo;
  booking_date?: Date;
  notes?: string;
  order_type?: number;
  return_url?: string;
  total_amount?: number;
  discount?: number;
  discount_order_detail?: number;
  final_amount?: number;
}

export interface CartPrepareResponse {
  check_in_date: Date;
  invoice_id: string;
  order_type: number;
  order_type_name: string;
  order_status: number;
  order_status_name: string;
  booking_date: Date;
  notes: string;
  order_details: OrderDetail[];
  customer: CustomerCartInfo;
  total_amount: number;
  discount: number;
  discount_order_detail: number;
  final_amount: number;
  payments: Payment[];
  store_id: number;
  store_code: string;
  store_name: string;
  store_address: string;
  count: number;
  return_url: string;
}
export type CheckoutOrderRequest = {
  order_details: OrderDetail[];
  payments: Payment[];
  customer: CustomerCartInfo;
  notes?: string;
  store_id?: number;
  booking_date?: Date;
  order_type?: number;
  return_url?: string;
};

export interface CheckoutPaymentResponse {
  amount: number;
  type: number;
  status: number;
  transaction_id: string;
}

export interface CheckoutResponse {
  check_in_date: Date;
  id: string;
  order_id: number;
  invoice_id: string;
  order_type: number;
  order_type_name: string;
  order_status: number;
  order_status_name: string;
  booking_date: Date;
  notes: string;
  order_details: OrderDetail[];
  customer: CustomerCartInfo;
  total_amount: number;
  discount: number;
  discount_order_detail: number;
  final_amount: number;
  payments: CheckoutPaymentResponse[];
  store_id: number;
  store_code: string;
  store_name: string;
  store_address: string;
  return_url: string;
}
