export enum SelectType {
  SINGLE = 1,
  MULTIPLE = 2,
  SWATCH = 3,
}

export enum CombinationMode {
  FIXED = 0,
  CHOICE = 1,
}

export enum ProductTypeEnum {
  Single = 0,
  Room = 2,
  AdditionFee = 3,
  Extra = 5,
  General = 6,
  Detail = 7,
  CardPayment = 8,
  Combo = 1,
  Sample = 9,
  Complex = 10,
  CHARGES = 11,
}

export type TProduct = {
  product_id: number;
  product_name: string;
  /** HTML Format */
  description: string;
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
  product_in_menu?: ProductInMenu;
  product_image?: { id: number; image_url: string; description: string }[];
};

export type ProductInMenu = {
  product_id: number;
  product_name: string;
  cate_id:number
  cate_name: string;
  price1: number;
  price2: number;
  price3: number;
  price4: number;
  price5: number;
  price6: number;
  price7: number;
  price8: number;
  price9: number;
  price10: number;
  is_fixed_price?: boolean;
};

export type TProductDetail = TProduct & {
  extras?: TExtraGroup[];
  modifiers?: TModifier[];
};

export type TModifier = {
  id: number;
  title: string;
  select_type: number;
  display_index: number;
  cate_id: number;
  is_required: true;
  options: [
    {
      label: string;
      value: string;
    },
  ];
};

export type TExtraGroup = {
  id: number;
  cate_id: number;
  extra_cate_id: number;
  extra_cate_name: string;
  min_max: string;
  select_type: SelectType;
  extra_products: TProduct[];
};

export type ProductOption = {
  type?: 'select' | 'radio';
  id: string;
  display_name: string;
  values: string[];
};

export type ProductVariant = Omit<TProduct, 'options'> & {
  options?: { display_name: string; value: string; [key: string]: any }[];
  price?: number;
  product_in_menu?: ProductInMenu;
};

export type ProductCombo = Omit<TProduct, 'options'> & {
  groups: {
    id?: number;
    combination_mode: CombinationMode;
    name: string;
    default?: any;
    min?: any;
    max?: any;
    postion?: any;
    products: TProduct[];
  }[];
};

export type SelectedOptions = Record<string, string | null | undefined>;

export type SelectedExtra = {
  product_id: number;
  quantity: number;
  extra_id: number;
};

export type SelectedModifier = {
  value: number | string;
};

export type TProductQuery = Partial<{
  'product-name': string;
  'cat-id': string;
  'is-availble': boolean;
  price: string;
  sort: string;
}>;

export type TDerivedExtraGroup = TExtraGroup & {
  min: number;
  max: number;
  isOptional: boolean;
};
