const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const BakckendEndpoints = {
  AUTH: {
    LOGIN: `${API_BASE}/auth/login/`,
    REGISTER: `${API_BASE}/auth/register/`,
    LOGOUT: `${API_BASE}/auth/logout/`,
  },
  PRODUCT: {
    LIST_SELLER_PRODUCTS: `${API_BASE}/seller/products/`,
    CREATE_SELLER_PRODUCTS: `${API_BASE}/seller/products/create/`,
    DELETE_SELLER_PRODUCTS: `${API_BASE}/seller/products`,
    UPDATE_SELLER_PRODUCTS: `${API_BASE}/seller/products/`,
  },
  CATEGORY: {
    LIST_SELLER_CATEGORIES: `${API_BASE}/seller/categories/`,
    CREATE_SELLER_CATEGORIES: `${API_BASE}/seller/categories/`,
    DELETE_SELLER_CATEGORIES: `${API_BASE}/seller/categories`,
    UPDATE_SELLER_CATEGORIES: `${API_BASE}/seller/category/categories`,
  },
  ACCOUNT:{
    GET_ACCOUNT_DETAILS: `${API_BASE}/buyer/account/details/`,
    UPDATE_ACCOUNT_DETAILS: `${API_BASE}/buyer/account/update/`,
  },
  ORDERS: {
    LIST_SELLER_ORDERS: `${API_BASE}/seller/orders/`,
  },
  COUPONS: {
    LIST_SELLER_COUPONS: `${API_BASE}/seller/coupons/`,
  }
};
