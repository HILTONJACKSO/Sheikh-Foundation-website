import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { type, firstName, lastName, fullName, email, message, role } = body;

        // Validation
        if (!email || !message) {
            return NextResponse.json({ success: false, error: 'Email and message are required.' }, { status: 400 });
        }

        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '465'),
            secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: {
                // Do not fail on invalid certificates (useful for some mail hosts)
                rejectUnauthorized: false
            }
        });

        const senderName = type === 'volunteer' ? fullName : `${firstName} ${lastName}`;
        const subject = type === 'volunteer'
            ? `[VOLUNTEER] New Application from ${senderName}`
            : `[CONTACT] New Message from ${senderName}`;

        const html = type === 'volunteer' ? `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #153c1d; text-transform: uppercase;">New Volunteer Application</h2>
                <hr style="border: none; border-top: 1px solid #eee;" />
                <p><strong>Name:</strong> ${fullName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Interested Role:</strong> ${role}</p>
                <p><strong>Message:</strong></p>
                <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</div>
                <footer style="margin-top: 20px; font-size: 12px; color: #999;">
                    Submitted via Kouyateh Foundation Website
                </footer>
            </div>
        ` : `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #153c1d; text-transform: uppercase;">New Contact Message</h2>
                <hr style="border: none; border-top: 1px solid #eee;" />
                <p><strong>From:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</div>
                <footer style="margin-top: 20px; font-size: 12px; color: #999;">
                    Submitted via Kouyateh Foundation Website
                </footer>
            </div>
        `;

        // Send the email
        await transporter.sendMail({
            from: `"Website Form" <${process.env.SMTP_USER}>`,
            to: process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER || 'info@kouyatehfoundation.org',
            replyTo: email,
            subject: subject,
            html: html,
        });

        return NextResponse.json({ success: true, message: 'Your message has been sent successfully!' });
    } catch (error: any) {
        console.error('Email submission error:', error);
        return NextResponse.json({
            success: false,
            error: error.message || 'There was an error sending your message. Please try again later.'
        }, { status: 500 });
    }
}
