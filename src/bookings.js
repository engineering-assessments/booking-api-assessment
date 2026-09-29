import { randomUUID } from "node:crypto";
import { setTimeout as delay } from "node:timers/promises";
import { z } from "zod";

export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const bookingSchema = z.object({
  slotId: z.string({
    error: "A valid appointment is required."
  })
    .min(1, "A valid appointment is required.")
    .max(100, "A valid appointment is required."),

  name: z.string({
    error: "Enter a name up to 120 characters."
  })
    .trim()
    .min(1, "Enter a name up to 120 characters.")
    .max(120, "Enter a name up to 120 characters."),

  email: z.string({
    error: "Enter a valid email address."
  })
    .max(254, "Enter a valid email address.")
    .regex(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Enter a valid email address."
    )
    .transform((email) => email.trim().toLowerCase())
});

function validateInput(input) {
  if (
    !input ||
    typeof input !== "object" ||
    Array.isArray(input)
  ) {
    throw new HttpError(400, "A booking object is required.");
  }

  const result = bookingSchema.safeParse(input);

  if (!result.success) {
    throw new HttpError(400, result.error.issues[0].message);
  }

  return result.data;
}

// Represents an existing asynchronous eligibility integration.
// The real integration is outside the assessment's scope.
async function checkEligibility() {
  await delay(25);
  return true;
}

export async function createBooking(db, input) {
  const { slotId, name, email } = validateInput(input);

  const slot = db.prepare(`
    SELECT id, remaining
    FROM slots
    WHERE id = ?
  `).get(slotId);

  if (!slot) {
    throw new HttpError(404, "Appointment not found.");
  }

  if (slot.remaining <= 0) {
    throw new HttpError(409, "This appointment is fully booked.");
  }

  const eligible = await checkEligibility();

  if (!eligible) {
    throw new HttpError(403, "This booking cannot be accepted.");
  }

  const booking = {
    id: randomUUID(),
    slotId,
    createdAt: new Date().toISOString()
  };

  db.prepare(`
    INSERT INTO bookings (
      id,
      slot_id,
      resident_name,
      resident_email,
      created_at
    )
    VALUES (?, ?, ?, ?, ?)
  `).run(
    booking.id,
    slotId,
    name,
    email,
    booking.createdAt
  );

  db.prepare(`
    UPDATE slots
    SET remaining = remaining - 1
    WHERE id = ?
  `).run(slotId);

  return booking;
}