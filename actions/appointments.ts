"use server";

import { AppointmentUpdateProps } from "@/components/Dashboard/Beautician/UpdateAppointmentForm";
import NewAppointmentEmail from "@/components/Emails/new-appointment";
import { prismaClient } from "@/lib/db";
import { AppointmentProps, ServiceProps } from "@/types/types";
import { Appointment } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export async function createAppointment(data: AppointmentProps) {
  try {
    const beautician = await prismaClient.user.findUnique({
      where: {
        id: data.beauticianId,
      },
    });
    const newAppointment = await prismaClient.appointment.create({
      data,
    });
    const firstName = beautician?.name;
    const beauticianMail = beautician?.email;
    const link = `${baseUrl}/dashboard/beautician/appointments/view/${newAppointment.id}`;
    const message =
      "You have a new appointment scheduled. Please review and approve it by clicking the button below.";
    const sendMail = await resend.emails.send({
      from: "Zarlo App <info@zarloapp.com>",
      to: beauticianMail ?? "",
      subject: "New Appointment Approval Needed",
      react: NewAppointmentEmail({ firstName, link, message }),
    });
    revalidatePath("/dashboard/beautician/appointments");
    console.log(newAppointment);

    //Send the Email to the Beautician
    //
    return {
      data: newAppointment,
      status: 201,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}
export async function updateAppointment(id: string, data: AppointmentProps) {
  try {
    const updatedAppointment = await prismaClient.appointment.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/beautician/appointments");
    console.log(updatedAppointment);
    return {
      data: updatedAppointment,
      status: 201,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}
export async function updateAppointmentById(
  id: string,
  data: AppointmentUpdateProps
) {
  try {
    const updatedAppointment = await prismaClient.appointment.update({
      where: {
        id,
      },
      data,
    });
    const clientId = updatedAppointment.clientId;
    const client = await prismaClient.user.findUnique({
      where: {
        id: clientId,
      },
    });
    const firstName = client?.name;
    const beauticianMail = client?.email;
    const link = `${baseUrl}/dashboard/user/appointments/view/${updatedAppointment.id}`;
    const message =
      "Your appointment has been approved. You can View the Details here";
    const sendMail = await resend.emails.send({
      from: "Zarlo App <info@zarloapp.com>",
      to: beauticianMail ?? "",
      subject: "Appointment Approved",
      react: NewAppointmentEmail({ firstName, link, message }),
    });
    revalidatePath("/dashboard/beautician/appointments");
    revalidatePath("/dashboard/user/appointments");
    console.log(updatedAppointment);
    return {
      data: updatedAppointment,
      status: 201,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}

export async function getAppointments() {
  try {
    const appointments = await prismaClient.appointment.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return {
      data: appointments,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}
export async function getClientAppointments(clientId: string) {
  try {
    const appointments = await prismaClient.appointment.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        clientId,
      },
    });
    return {
      data: appointments,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}
export async function getAppointmentByClientId(clientId: string | undefined) {
  if (clientId) {
    try {
      const appointment = await prismaClient.appointment.findFirst({
        where: {
          clientId,
        },
      });
      if (!appointment) {
        return null;
      }
      return appointment as Appointment;
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error,
      };
    }
  }
}
export async function getBeauticianAppointments(beauticianId: string) {
  try {
    const appointments = await prismaClient.appointment.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        beauticianId,
      },
    });
    return {
      data: appointments,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}
export async function getAppointmentById(id: string) {
  try {
    if (id) {
      const appointment = await prismaClient.appointment.findUnique({
        where: {
          id,
        },
      });
      return appointment;
    }
  } catch (error) {
    console.log(error);
  }
}
export async function deleteAppointment(id: string) {
  try {
    await prismaClient.appointment.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard/beautician/appointments");
    return {
      ok: true,
      status: 200,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      status: 500,
      error,
    };
  }
}
