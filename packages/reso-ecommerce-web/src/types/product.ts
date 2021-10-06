export type TProduct = {
  product_id: number;
  product_name: string;
  pic_url: string;
  cate_name: string;
  cat_id?: any;
  is_available: boolean;
  code: string;
  product_type: number;
  images?: string[];
  price: number;
  priceSale: number;
  variants?: ProductVariant[];
  options?: ProductOption[];
};

export type ProductOption = {
  type?: 'select' | 'radio';
  id: string;
  displayName: string;
  values: ProductOptionValues[];
};

export type ProductOptionValues = {
  label: string;
  value: string;
};

export type ProductVariant = {
  id: string | number;
  options: { displayName: string; value: any; [key: string]: any }[];
};

export type SelectedOptions = Record<string, string | null>;
