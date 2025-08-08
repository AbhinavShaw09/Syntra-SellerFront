import { Coupon } from "@/types/discounts/coupon";

const mockCoupons: Coupon[] = [
    { id: "1", code: "SUMMER20", discountType: "percentage", value: 20, expiryDate: "2024-08-31" },
    { id: "2", code: "SAVE10", discountType: "fixed", value: 10, expiryDate: "2024-09-30" },
    { id: "3", code: "FALLSALE", discountType: "percentage", value: 15, expiryDate: "2024-10-31" },
];


export const fetchAllCoupons = async (token?: string): Promise<Coupon[]> => {
    console.log("Fetching coupons with token:", token);
    // In a real application, you would make an API call here.
    // For now, we're returning mock data.
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockCoupons);
        }, 500); // Simulate network delay
    });
};
