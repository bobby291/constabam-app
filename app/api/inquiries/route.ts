
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { inquirySchema } from "@/lib/inquiry-validation";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    // Quietly accept bot submissions that fill the hidden honeypot.
    if (
      typeof body === "object" &&
      body !== null &&
      "website" in body &&
      typeof body.website === "string" &&
      body.website.trim().length > 0
    ) {
      return NextResponse.json({ success: true });
    }

    const result = inquirySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please check your inquiry details and try again.",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const inquiry = result.data;

    const { data, error } = await supabaseAdmin
      .from("inquiries")
      .insert({
        customer_name: inquiry.fullName,
        customer_email: inquiry.email,
        customer_phone: inquiry.phone,
        property_id: inquiry.propertyId,
        property_name: inquiry.property.name,
        check_in: inquiry.checkIn,
        check_out: inquiry.checkOut,
        payload: inquiry,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase inquiry insertion failed:", error);

      return NextResponse.json(
        {
          success: false,
          message: "We couldn't submit your inquiry. Please try again.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been submitted successfully.",
        inquiryId: data.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Inquiry API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}
