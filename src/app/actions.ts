'use server';

import { Resend } from 'resend';

// Server-side only
const resend = new Resend(process.env.RESEND_API_KEY);
const ownerEmail = process.env.OWNER_EMAIL || 'your-email@example.com';

/**
 * Server action to send the owner notification email
 */
export async function sendOwnerNotificationAction(userName: string, userEmail: string) {
  if (!process.env.RESEND_API_KEY) {
    console.error('Missing RESEND_API_KEY environment variable');
    return { error: 'Email configuration missing' };
  }

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
    return { error: 'Failed to send owner notification' };
  }
}

/**
 * Server action to send the user email with the e-book link
 */
export async function sendUserEmailAction(userName: string, userEmail: string, ebookUrl: string) {
  if (!process.env.RESEND_API_KEY) {
    console.error('Missing RESEND_API_KEY environment variable');
    return { error: 'Email configuration missing' };
  }

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
    return { error: 'Failed to send user email' };
  }
} 