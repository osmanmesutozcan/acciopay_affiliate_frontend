type Locale = "en" | "cn" | "sg" | "zh";
type InputType = "select" | "checkbox";
type Currency = "USD" | "SGD";
type ProductType = "configurable";
type VerificationType = "pending" | "pass" | "rejected" | "require_action" | "approved" | "disapproved" | "reopen";
type VerificationStepsCompletedType = "singpass" | "upload" | "identity" | "email";
type TransactionStatusType =
  | "ongoing_payment"
  | "pending"
  | "pending_payment"
  | "processing"
  | "completed"
  | "canceled"
  | "closed"
  | "fraud";

type InvoiceStateType = "paid" | "pending" | "refunded";
export type AmbassadorVerificationStatus = "approved" | "disapproved" | "not_applied" | "pending";
export enum AutoPaymentMethod {
  GIRO = "giro",
}

export interface ISpecsAttribute {
  id: number;
  code: string;
  name: string;
  options: {
    id: number;
    admin_name: string;
    label: string;
    swatch_value: any | null;
  }[];
  swatch_type: any | null;
  type: InputType;
  created_at: Date;
  updated_at: Date;
}

export interface ICurrency {
  code: Currency;
  created_at: null | Date;
  id: number;
  name: string;
  symbol: string;
  updated_at: null | Date;
}

export interface IVariant {
  id: number;
  sku: string;
  type: string;
  name: string;
  url_key: string;
  price: string;
  formated_price: string;
  in_stock: boolean;
  map: {
    [key: string]: number | string;
  };
}

export interface IBrand {
  id: number;
  label: string;
}

export interface IProductMoreInfo {
  id: number;
  code: string;
  label: string;
  value: string;
  admin_name: string;
  type: InputType;
}

export interface IProductFlat {
  id: number;
  sku: string;
  product_number: "";
  name: string;
  description: string;
  url_key: string;
  new: number;
  featured: number;
  status: number;
  thumbnail: any | null;
  price: any | null;
  cost: any | null;
  special_price: any | null;
  special_price_from: any | null;
  special_price_to: any | null;
  weight: any | null;
  color: any | null;
  color_label: any | null;
  size: number;
  size_label: string;
  locale: Locale;
  channel: "default" | any; //FIX
  product_id: number;
  parent_id: null | any; //FIX
  visible_individually: number;
  min_price: string;
  max_price: string;
  short_description: string;
  meta_title: string;
  meta_keywords: string;
  meta_description: string;
  width: any | null;
  height: any | null;
  depth: any | null;
  brand: number;
  brand_label: string;
  created_at: Date;
  updated_at: Date;
}

export interface IProductDetail {
  id: number;
  sku: string;
  type: ProductType;
  name: string;
  url_key: string;
  price: string;
  formated_price: string;
  currency?: ICurrency;
  short_description: string;
  description: string;
  images: (IImageUrls & {
    id: number;
    path: "product/1/F4raENfoJ6ZEvjRvfWtM6GNlrQEgMdIvmgbp9s3O.webp";
    url: "http://acciopay_backend.test/storage/product/1/F4raENfoJ6ZEvjRvfWtM6GNlrQEgMdIvmgbp9s3O.webp";
  })[];
  videos: [];
  base_image: IImageUrls;
  created_at: Date;
  updated_at: Date;
  reviews: IProductReviews;
  in_stock: boolean;
  is_saved: boolean;
  is_wishlisted: boolean;
  is_item_in_cart: boolean;
  show_quantity_changer: boolean;
  product_flats: IProductFlat[];
  more_information: IProductMoreInfo[];
  variants: IVariant[];
  super_attributes: ISpecsAttribute[];
}

export interface ICategory {
  id: number;
  code: null | any; //FIX
  name: string;
  slug: string;
  display_mode: "products_and_description" | any; //FIX
  description: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  status: number; //FIX
  image_url: string;
  created_at: Date;
  updated_at: Date;
  category_icon_path: null | any; //FIX
  additional: any | null; //FIX
}

export interface ICategoriesResponse {
  data: {
    id: number;
    code: null | any; //FIX
    name: "Root";
    slug: "root";
    display_mode: "products_and_description";
    description: "Root";
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
    status: number; //FIX
    image_url: string;
    created_at: Date;
    updated_at: Date;
    category_icon_path: null | any; //FIX
    additional: any | null; //FIX
    children: ICategory[];
  };
}

interface IImageUrls {
  small_image_url: string;
  medium_image_url: string;
  large_image_url: string;
  original_image_url: string;
}

interface IProductReviews {
  total: number;
  total_rating: number;
  average_rating: number;
  percentage: any[]; //FIX
}

export interface ICart {
  cart: {
    base_currency_code: Currency;
    base_discount: number;
    base_grand_total: number;
    base_interest_amount: string;
    base_interest_total: number;
    base_sub_total: number;
    base_tax_total: number;
    base_taxes: '{"0":0}';
    billing_address: any | null;
    cart_currency_code: Currency;
    channel: any | null;
    channel_currency_code: Currency;
    checkout_method: any | null;
    conversion_time: any | null;
    coupon_code: any | null;
    created_at: Date;
    customer: any | null;
    customer_email: any | null;
    customer_first_name: string;
    customer_last_name: string;
    discount: number;
    exchange_rate: any | null;
    formated_initial_total: string;
    formated_base_discount: string;
    formated_base_discounted_sub_total: string;
    formated_base_grand_total: string;
    formated_base_interest_amount: string;
    formated_base_interest_total: string;
    formated_base_sub_total: string;
    formated_base_tax_total: string;
    formated_base_taxes: '{"0":string}';
    formated_discount: string;
    formated_discounted_sub_total: string;
    formated_grand_total: string;
    formated_interest_amount: string;
    formated_interest_total: string;
    formated_sub_total: string;
    formated_tax_total: string;
    formated_taxes: '{"0":string}';
    global_currency_code: Currency;
    grand_total: number;
    id: number;
    interest_amount: string;
    interest_total: number;
    is_active: number;
    is_gift: number;
    is_guest: number;
    items: ICartItem[];
    items_count: number;
    items_qty: string;
    payment: any | null;
    selected_shipping_rate: any | null;
    shipping_address: any | null;
    shipping_method: any | null;
    sub_total: number;
    tax_total: number;
    taxes: '{"0":0}';
    updated_at: Date;
  };
}

export interface ICartItem {
  additional: {
    attributes: ISpecsAttribute[];
    is_buy_now: string; //fix
    product_id: string;
    quantity: number;
    selected_configurable_option: number;
  };
  base_discount_amount: number;
  base_interest_amount: string;
  base_interest_total: number;
  base_price: number;
  base_tax_amount: number;
  base_total: number;
  base_total_weight: string;
  child: any;
  coupon_code: any | null;
  created_at: Date;
  custom_price: number;
  discount_amount: number;
  discount_percent: string;
  formated_base_discount_amount: string;
  formated_base_interest_amount: string;
  formated_base_interest_total: string;
  formated_base_price: string;
  formated_base_tax_amount: string;
  formated_base_total: string;
  formated_custom_price: string;
  formated_discount_amount: string;
  formated_interest_amount: string;
  formated_interest_total: string;
  formated_price: string;
  formated_tax_amount: string;
  formated_total: string;
  formated_initial_total: string;
  formated_monthly_total: string;
  id: number;
  is_invalid: boolean;
  installment_initial_base_total: number;
  installment_initial_total: number;
  installment_monthly_base_total: number;
  installment_monthly_total: number;
  installments_max_allowed: number;
  installments_preferred: number;
  interest_amount: string;
  interest_percent: number;
  interest_total: number;
  name: string;
  price: number;
  product: IProductDetail;
  quantity: number;
  sku: string;
  tax_amount: number;
  tax_percent: string;
  total: number;
  total_weight: string;
  type: "configurable";
  updated_at: Date;
  weight: string;
}

export interface IShoppingCartResponse {
  data: ICart;
}

export interface IAddressData {
  address1: string[];
  city: string;
  company_name: string;
  country: string;
  country_name: string;
  created_at: Date;
  first_name: string;
  id: number;
  name?: string;
  email: string;
  is_default: boolean;
  last_name: string;
  phone: string;
  postcode: string;
  state: string;
  updated_at: Date;
  vat_id: string;
}

export interface ICustomerData {
  email: string;
  legal_full_name: string;
  first_name: string;
  gender: string;
  group: { id: number; name: "General"; created_at: Date; updated_at: Date };
  created_at: null;
  id: number;
  last_name: string;
  name: string;
  phone: string;
  status: number;
  nric_fin: string;
  legal_address: {
    block: { value: string };
    building: { value: string };
    classification: string;
    country: { code: string; desc: string };
    floor: { value: string };
    lastupdated: string;
    postal: { value: string };
    source: string;
    street: { value: string };
    type: string;
    unit: { value: string };
  };
  verification: VerificationType;
  verification_method: "singpass";
  verification_steps_completed: null | VerificationStepsCompletedType[];
  notifications_count: number;
  credit_available: string;
  credit_capped: string;
  date_of_birth: string;
  ambassador_id_current: number;
  ambassador_id_old: number;
  ambassador_referral_code: string;
  ambassador_verification: AmbassadorVerificationStatus;
}

export interface IShipmentMethodData {
  code: string;
  description: string;
  method: string;
  method_title: string;
}

export interface IPaymentMethodData {
  description: string;
  method: string;
  method_title: string;
  sort: number;
}

export interface IInvoiceData {
  id: number;
  created_at: Date;
  invoice: {
    id: number;
    state: InvoiceStateType;
    created_at: Date;
  };
}

export interface IOrderItemData {
  id: number;
  installments_preferred: number;
  formated_initial_total: string;
  formated_monthly_total: string;
  initial_total?: number;
  monthly_total?: number;
  quantity: null;
  sku: string;
  type: "configurable";
  name: string;
  invoices: IInvoiceData[];
  installment_due_at: Date;
  product: {
    id: number;
    sku: string;
    type: "configurable";
    name: string;
    url_key: string;
    price: string;
    formated_price: string;
    short_description: string;
    description: string;
    images: (IImageUrls & {
      id: number;
      path: string;
      url: string;
    })[];
    videos: any[];
    base_image: IImageUrls;
    created_at: Date;
    updated_at: Date;
    reviews: { total: number; total_rating: number; average_rating: number; percentage: any[] };
    in_stock: boolean;
    is_saved: boolean;
    is_wishlisted: boolean;
    is_item_in_cart: boolean;
    show_quantity_changer: boolean;
    product_flats: IProductFlat[];
    more_information: IProductMoreInfo[];
    variants: IVariant[];
    super_attributes: ISpecsAttribute[];
  };
  additional: {
    token: string;
    locale: Locale;
    quantity: number;
    attributes: {
      [key: string]: { option_id: number; option_label: string; attribute_name: string };
    };
    product_id: string;
    installments_preferred: number;
    selected_configurable_option: number;
  };
}

export interface IOrderData {
  id: number;
  status: TransactionStatusType;
  created_at: Date;
  payment_method: string;
  items: IOrderItemData[];
  billing_address: IAddressData;
  shipping_address: IAddressData;
  shipments: {
    carrier_code: any;
    carrier_title: string;
    created_at: Date;
    customer: ICustomerData;
    email_sent: number;
    id: number;
    inventory_source: any;
    items: Partial<IProductDetail>[];
    status: any;
    total_qty: number;
    total_weight: number;
    track_number: String;
    updated_at: Date;
  }[];
}

export interface INotificationData {
  data: {
    description: string;
    title: string;
    type: "information" | "notice";
  };
  id: string;
  notifiable_id: number;
  notifiable_type: string;
  read_at: null | Date;
  type: string;
  created_at: Date;
  updated_at: Date;
}
