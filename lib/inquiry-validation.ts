
import { z } from "zod";

const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format.")
  .refine((value) => {
    const date = new Date(`${value}T00:00:00.000Z`);

    return (
      !Number.isNaN(date.getTime()) &&
      date.toISOString().slice(0, 10) === value
    );
  }, "Invalid calendar date.");

export const inquirySchema = z
  .object({
    fullName: z.string().trim().min(1).max(150),
    email: z.string().trim().email().max(254),
    phone: z.string().trim().min(1).max(50),
    address: z.string().max(500),

    propertyId: z.string().min(1).max(100),

    checkIn: dateSchema,
    checkOut: dateSchema,

    guests: z
      .string()
      .regex(/^[1-9]\d*$/, "Guest count must be a positive whole number.")
      .refine((value) => Number.isSafeInteger(Number(value))),

    purpose: z.string().trim().min(1).max(1000),

    localResident: z.string().min(1).max(100),
    specialNeeds: z.string().min(1).max(2000),
    bringingPets: z.string().min(1).max(100),
    readyToProceed: z.string().min(1).max(100),

    poolAccess: z.boolean(),

    paymentMethod: z.enum([
      "Chime",
      "Cash App",
      "Apple Pay",
      "USDT",
      "PayPal",
      "ETH",
      "OnePay",
      "E-Transfer",
      "Skrill",
      "Bank Wire Transfer",
      "Zelle",
    ]),

    message: z.string().max(5000),

    agreement: z.literal(true),
    website: z.string().max(200),

    property: z.object({
      id: z.string().min(1),
      name: z.string().min(1),
      city: z.string().min(1),
      state: z.string().min(1),
      rate: z.number().finite().nonnegative(),
    }),

    nights: z.number().int().positive(),
    nightlyRate: z.number().finite().nonnegative(),
    poolFee: z.number().finite().nonnegative(),
    subtotal: z.number().finite().nonnegative(),
    estimatedTotal: z.number().finite().nonnegative(),
    currency: z.literal("USD"),
  })
  .superRefine((data, ctx) => {
    if (data.propertyId !== data.property.id) {
      ctx.addIssue({
        code: "custom",
        path: ["propertyId"],
        message: "Property information does not match.",
      });
    }

    if (data.checkOut <= data.checkIn) {
      ctx.addIssue({
        code: "custom",
        path: ["checkOut"],
        message: "Check-out must be after check-in.",
      });
    }

    const start = new Date(`${data.checkIn}T00:00:00.000Z`);
    const end = new Date(`${data.checkOut}T00:00:00.000Z`);

    const expectedNights = Math.round(
      (end.getTime() - start.getTime()) / 86400000
    );

    if (data.nights !== expectedNights) {
      ctx.addIssue({
        code: "custom",
        path: ["nights"],
        message: "The submitted night count is invalid.",
      });
    }
  });

export type InquiryInput = z.infer<typeof inquirySchema>;
