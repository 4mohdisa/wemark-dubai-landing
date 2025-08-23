import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Email API route called
  
  try {
    const { name, email, phone, message, formType } = await request.json();
    
    // Server-side validation
    if (!name || !email || !phone) {
      // Validation failed: missing required fields
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      // Validation failed: invalid email format
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Phone validation (basic)
    const phoneRegex = /^[\+]?[\d\s\-\(\)]+$/;
    if (!phoneRegex.test(phone)) {
      // Validation failed: invalid phone format
      return NextResponse.json({ error: 'Invalid phone format' }, { status: 400 });
    }

    const emailContent = `
      <h2>New ${formType || 'Lead'} Form Submission - dubaipropertyinvestors.com.au</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
      <p><strong>Form Type:</strong> ${formType || 'General Lead'}</p>
      <p><strong>Source:</strong> dubaipropertyinvestors.com.au</p>
      <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
    `;

    // Sending email via Resend...
    
    // Initialize Resend with API key check
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      // RESEND_API_KEY environment variable is not set
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }
    
    const resend = new Resend(apiKey);
    
    const { data, error } = await resend.emails.send({
      from: 'leads@dubaipropertyinvestors.com.au',
      to: ['mohdisa233@gmail.com'],
      subject: `dubaipropertyinvestors.com.au - New ${formType || 'Lead'} from ${name}`,
      html: emailContent,
    });

    if (error) {
      // Resend error occurred
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    // Email sent successfully

    return NextResponse.json({ success: true, data });
    
  } catch (error) {
    // Email API error occurred
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}