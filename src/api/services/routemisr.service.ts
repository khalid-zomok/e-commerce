import { Brand, Category, ProductType } from "../types/product.type";



export const getAllProducts = async (): Promise<ProductType[] | undefined> => {
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/products`,{
          cache:"force-cache"
        }
      );
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.log(err);

      return undefined;
    }
  };


  export const getSingleProduct = async (id:string) :Promise<ProductType | undefined> => {
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      );
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };


 export const getAllCategories = async (): Promise<Category[] | undefined> => {
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/categories`,
      );
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };

 export const getBrands = async (): Promise<Brand[] | undefined> => {
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/brands`,
      );
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };


 export const getAllSubCategories = async (): Promise<Category[] | undefined> => {
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/subcategories`,
      );
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };
 export const getSingleCategories = async (id:string): Promise<Category | undefined> => {
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
      );
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };
 export const getSingleBrandProducts = async (id:string): Promise<ProductType[] | undefined> => {
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`,
      );
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };
 export const getSingleBrand = async (id:string): Promise<Brand | undefined> => {
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
      );
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };


  export const getSingleCategoriesProducts = async (id:string): Promise<ProductType[] | undefined> => {
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/products?category=${id}`,
      );
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };

