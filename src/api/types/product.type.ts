export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface ProductType {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  images: string[];
  category: Category;
  brand: Brand;
  subcategory: Subcategory[];
  ratingsAverage: number;
  ratingsQuantity: number;
  sold: number;
  createdAt: string;
  updatedAt: string;
  priceAfterDiscount?: number;
  availableColors: string[];
}

export interface PromoBannerPropsType {
  tag: string;
  title: string;
  description: string;
  discount: string;
  code: string;
  buttonText: string;
  gradientClass: string;
  tagIcon: string;
}

export interface CartProduct {
  _id: string;
  count: number;
  price: number;
  product: ProductType;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartProduct[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface CartType {
  cartId: string;
  message: string;
  numOfCartItems: number;
  status: string;
  data: CartData;
}

export interface WishlistType {
  status: string;
  count: number;
  data: ProductType[];
}

export interface CartContextType {
  numOfCartItems: number;
  setNumOfCartItems: React.Dispatch<React.SetStateAction<number>>;
  productIDS: string[];
  setProductIDS: React.Dispatch<React.SetStateAction<string[]>>;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  getCart: () => Promise<void>;
}
export interface WishlistContextType {
  numOfWishlistItems: number;
  setNumOfWishlistItems: React.Dispatch<React.SetStateAction<number>>;
  itemsIDS: string[];
  setItemsIDS: React.Dispatch<React.SetStateAction<string[]>>;
}
export interface AddressType {
  name: string;
  city: string;
  details: string;
  phone: string;
  _id: string;
}
