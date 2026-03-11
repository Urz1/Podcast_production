import { NextRequest, NextResponse } from "next/server";

// Schema validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function validateContactForm(data: unknown): { valid: boolean; error?: string } {
  if (!data || typeof data !== "object") {
    return { valid: false, error: "Invalid request body" };
  }

  const form = data as Partial<ContactFormData>;

  if (!form.name || form.name.trim().length < 2) {
    return { valid: false, error: "Name must be at least 2 characters" };
  }

  if (!form.email || !isValidEmail(form.email)) {
    return { valid: false, error: "Please enter a valid email address" };
  }

  if (!form.subject || form.subject.trim().length < 3) {
    return { valid: false, error: "Subject must be at least 3 characters" };
  }

  if (!form.message || form.message.trim().length < 10) {
    return { valid: false, error: "Message must be at least 10 characters" };
  }

  return { valid: true };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate form data
    const validation = validateContactForm(body);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = body as ContactFormData;

    // In production, send email or store in database
    // Example integrations:
    // - Resend: Use Resend API to send email notification
    // - SendGrid: Use SendGrid API
    // - Database: Store in Supabase/Neon for follow-up
    
    console.log("[Contact] New message:", { name, email, subject, message: message.substring(0, 100) });

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    });
  } catch (error) {
    console.error("[Contact] Form submission error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
