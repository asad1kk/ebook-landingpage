"use client";

import { Resend } from 'resend';

// You need to add this API key to your .env.local file
// RESEND_API_KEY=your_api_key_here
// OWNER_EMAIL=your_email_here
const resend = new Resend(process.env.RESEND_API_KEY);
const ownerEmail = process.env.OWNER_EMAIL || 'your-email@example.com';

/**
 * Sends a notification email to the owner when someone downloads the e-book
 */
export async function sendOwnerNotification(userName: string, userEmail: string) {
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // Use your verified domain in production
      to: ownerEmail,
      subject: `${userName} has downloaded your PDF!`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <h2>New E-book Download!</h2>
          <p>Someone has just downloaded your e-book:</p>
          <ul>
            <li><strong>Name:</strong> ${userName}</li>
            <li><strong>Email:</strong> ${userEmail}</li>
            <li><strong>Time:</strong> ${new Date().toLocaleString()}</li>
          </ul>
          <p>This user has been added to your subscribers database in Supabase.</p>
        </div>
      `,
    });

    console.log('Owner notification sent:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending owner notification:', error);
    throw error;
  }
}

/**
 * Sends an email to the user with the e-book PDF
 */
export async function sendUserEmail(userName: string, userEmail: string, ebookUrl: string) {
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // Use your verified domain in production
      to: userEmail,
      subject: 'Your Free E-Book Download!',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; color: #333;">
          <h2>Thank You, ${userName}!</h2>
          <p>Thank you for your interest in our e-book. Your download is ready!</p>
          
          <div style="margin: 30px 0; text-align: center;">
            <a href="${ebookUrl}" 
               style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;"
               target="_blank">
              Download Your E-Book
            </a>
          </div>
          
          <p>If the button above doesn't work, you can copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #4F46E5;">${ebookUrl}</p>
          
          <p style="margin-top: 30px; font-size: 14px; color: #666;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>
      `,
    });

    console.log('User email sent:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending user email:', error);
    throw error;
  }
}

// Keep the old sendEmail function for compatibility
export async function sendEmail({ to, name, subject }: { to: string; name: string; subject?: string; }) {
  // Use the new function instead
  return sendUserEmail(
    name, 
    to, 
    process.env.NEXT_PUBLIC_EBOOK_URL || 'https://datyiclsvdactlwepuyc.supabase.co/storage/v1/object/public/ebook//My%20Ebook.pdf'
  );
} 