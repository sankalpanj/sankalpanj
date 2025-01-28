import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { z } from "zod";

export const subscriptionProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  amount: z.number(),
  currency: z.string(),
  productId: z.string(),
});

export const productDetailsSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  type: z.string(),
  category: z.string(),
  create_time: z.string(),
  update_time: z.string(),
  links: z.array(
    z.object({
      href: z.string(),
      rel: z.string(),
      method: z.string(),
    })
  ),
  planId: z.string(),
});

export type SubscriptionProduct = z.infer<typeof subscriptionProductSchema>;
export type ProductDetails = z.infer<typeof productDetailsSchema>;

export const subscriptionProducts: SubscriptionProduct[] = [
  {
    id: "prod_OXpKsZ9wmKl60",
    name: "Basic Donation",
    description: "Support our cause with a $60 donation",
    amount: 60,
    currency: "USD",
    productId: "PROD-35B91111X0382492M",
  },
  {
    id: "prod_OXpMnP8vkRt80",
    name: "Supporter Donation",
    description: "Support our cause with an $80 donation",
    amount: 80,
    currency: "USD",
    productId: "PROD-7BJ87715BC484680S",
  },
  {
    id: "prod_OXpPqR7ujWv100",
    name: "Champion Donation",
    description: "Support our cause with a $100 donation",
    amount: 100,
    currency: "USD",
    productId: "PROD-2HS76960KM954601C",
  },
];

export const productDetails: Record<string, ProductDetails> = {
  "PROD-35B91111X0382492M": {
    id: "PROD-35B91111X0382492M",
    name: "MEMBERSHIP DONATION",
    description: "Sankalpa organisation membership donation",
    type: "SERVICE",
    category: "CHARITY",
    create_time: "2025-01-23T11:46:15Z",
    update_time: "2025-01-23T11:46:15Z",
    links: [
      {
        href: "https://api.sandbox.paypal.com/v1/catalogs/products/PROD-35B91111X0382492M",
        rel: "self",
        method: "GET",
      },
      {
        href: "https://api.sandbox.paypal.com/v1/catalogs/products/PROD-35B91111X0382492M",
        rel: "edit",
        method: "PATCH",
      },
    ],
    planId: "P-0NR55682A35058432M6JFIHA",
  },
  "PROD-7BJ87715BC484680S": {
    id: "PROD-7BJ87715BC484680S",
    name: "MEMBERSHIP DONATION",
    description: "Sankalpa organisation membership donation",
    type: "SERVICE",
    category: "CHARITY",
    create_time: "2025-01-23T11:47:45Z",
    update_time: "2025-01-23T11:47:45Z",
    links: [
      {
        href: "https://api.sandbox.paypal.com/v1/catalogs/products/PROD-7BJ87715BC484680S",
        rel: "self",
        method: "GET",
      },
      {
        href: "https://api.sandbox.paypal.com/v1/catalogs/products/PROD-7BJ87715BC484680S",
        rel: "edit",
        method: "PATCH",
      },
    ],
    planId: "P-0NR55682A35058432M6JFIHA",
  },
  "PROD-2HS76960KM954601C": {
    id: "PROD-2HS76960KM954601C",
    name: "MEMBERSHIP DONATION",
    description: "Sankalpa organisation membership donation",
    type: "SERVICE",
    category: "CHARITY",
    create_time: "2025-01-23T11:48:35Z",
    update_time: "2025-01-23T11:48:35Z",
    links: [
      {
        href: "https://api.sandbox.paypal.com/v1/catalogs/products/PROD-2HS76960KM954601C",
        rel: "self",
        method: "GET",
      },
      {
        href: "https://api.sandbox.paypal.com/v1/catalogs/products/PROD-2HS76960KM954601C",
        rel: "edit",
        method: "PATCH",
      },
    ],
    planId: "P-0NR55682A35058432M6JFIHA",
  },
};
