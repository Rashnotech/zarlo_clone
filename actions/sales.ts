"use server";

import { prismaClient } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface SaleProps {
  appointmentId: string;
  beauticianId: string;
  beauticianName: string;
  clientId: string;
  clientName: string;
  totalAmount: number;
}

export async function createSale(data: SaleProps) {
  try {
    const sale = await prismaClient.sale.create({
      data,
    });
    revalidatePath("/dashboard/beautician/sales");
    return sale;
  } catch (error) {
    console.error(error);
  }
}

export async function getBeauticianSales(beauticianId: string | undefined) {
  if (beauticianId)
    try {
      const sales = await prismaClient.sale.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          beauticianId,
        },
      });
      return sales;
    } catch (error) {
      console.error(error);
      return [];
    }
}

// New function to get all sales
export async function getSales() {
  try {
    const sales = await prismaClient.sale.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return sales;
  } catch (error) {
    console.error(error);
    return [];
  }
}
