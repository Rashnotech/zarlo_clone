"use client";

import { Pencil, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SpecialtyProps } from "./SpecialtyForm";
import { deleteService } from "@/actions/services";
import { deleteSpecialty } from "@/actions/specialities";
import toast from "react-hot-toast";
import { Speciality } from "@prisma/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
export default function SpecialtyCard({
  specialty,
}: {
  specialty: Speciality;
}) {
  async function handleDelete(id: string) {
    await deleteSpecialty(id);
    toast.success("Specialty Deleted Successfully");
  }
  return (
    <div className="border mb-2 border-gray-100 shadow-sm text-xs bg-white py-3 px-4 w-full rounded-md dark:text-slate-900 flex items-center gap-4 justify-between">
      <h2>{specialty.title}</h2>
      <div className="flex">
        <Link
          className="text-yellow-400"
          href={`/dashboard/specialties/update/${specialty.slug}`}
        >
          <Pencil className="w- h-4" />
        </Link>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="text-red-600">
              <Trash className="w- h-4" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-red-600">
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                Specialty
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(specialty.id)}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
