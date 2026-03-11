import { NextRequest, NextResponse } from "next/server";

// Schema validation for email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // In production, integrate with your email service provider
    // Example integrations:
    // - ConvertKit: POST to https://api.convertkit.com/v3/forms/{form_id}/subscribe
    // - Mailchimp: POST to https://us1.api.mailchimp.com/3.0/lists/{list_id}/members
    // - Resend: Use the Resend API to add to audience
    
    // For now, log the subscription (replace with actual integration)
    console.log("[Newsletter] New subscription:", { email, source });

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to the newsletter!",
    });
  } catch (error) {
    console.error("[Newsletter] Subscription error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to subscribe. Please try again." },
      { status: 500 }
    );
  }
}
