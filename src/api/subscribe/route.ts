import { NextResponse } from 'next/server';
import { addSubscriber } from '@/lib/supabase';
import { sendOwnerNotificationAction, sendUserEmailAction } from '@/app/actions';

export async function POST(request: Request) {
  try {
    console.log('API route triggered');
    
    const body = await request.json();
    const { fullName, email } = body;
    
    console.log('Request body:', { fullName, email });
    
    if (!fullName || !email) {
      console.log('Missing required fields');
      return NextResponse.json(
        { error: 'Full name and email are required' },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format');
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Add subscriber to database
    console.log('Adding subscriber to database...');
    let subscriber;
    try {
      subscriber = await addSubscriber({
        full_name: fullName,
        email: email,
      });
      console.log('Subscriber added:', subscriber);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error adding subscriber to Supabase:', errorMessage);
      
      // We'll continue even if database fails - just log the error
      console.log('Continuing to email step despite database error');
    }
    
    // Send emails
    const ebookUrl = process.env.NEXT_PUBLIC_EBOOK_URL || 'https://datyiclsvdactlwepuyc.supabase.co/storage/v1/object/public/ebook//My%20Ebook.pdf';
    
    // 1. Send notification to owner
    let ownerEmailResult;
    try {
      ownerEmailResult = await sendOwnerNotificationAction(fullName, email);
      console.log('Owner notification result:', ownerEmailResult);
    } catch (error) {
      console.error('Error sending owner notification:', error);
      // Continue even if owner email fails
    }
    
    // 2. Send email with PDF to user
    let userEmailResult;
    try {
      userEmailResult = await sendUserEmailAction(fullName, email, ebookUrl);
      console.log('User email result:', userEmailResult);
    } catch (error) {
      console.error('Error sending user email:', error);
      // If user email fails, we'll return the download URL anyway
    }
    
    const emailSent = !!(userEmailResult?.success);
    const freeTierLimitation = !!(userEmailResult?.freeAccountLimitation);
    
    console.log('Request completed successfully');
    return NextResponse.json({
      success: true,
      subscriber,
      downloadUrl: ebookUrl,
      emailSent,
      freeTierLimitation,
      emailDetails: userEmailResult?.details
    });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Unexpected error in subscribe API route:', errorMessage);
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 