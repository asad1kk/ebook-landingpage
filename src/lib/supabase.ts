import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials. Please check your environment variables.');
}

console.log('Initializing Supabase with URL:', supabaseUrl);
console.log('Anon key present:', !!supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Subscriber = {
  id?: string;
  full_name: string;
  email: string;
  created_at?: string;
};

// Function to add a new subscriber
export async function addSubscriber(subscriber: Omit<Subscriber, 'id' | 'created_at'>) {
  console.log('Adding subscriber:', subscriber);
  
  try {
    // Test the Supabase connection
    const { data: testData, error: testError } = await supabase
      .from('subscribers')
      .select('count(*)')
      .limit(1);
    
    if (testError) {
      console.error('Error connecting to Supabase:', testError);
      throw new Error(`Supabase connection error: ${testError.message}`);
    }
    
    console.log('Supabase connection successful:', testData);
    
    // Try a simpler insert
    const { data, error } = await supabase
      .from('subscribers')
      .insert([subscriber]);

    if (error) {
      console.error('Error adding subscriber:', error);
      
      // Check if it's a duplicate key error
      if (error.code === '23505') {
        console.log('Subscriber already exists, treating as success');
        return { id: 'existing', ...subscriber };
      }
      
      throw new Error(`Error adding subscriber: ${error.message}`);
    }

    console.log('Subscriber added successfully:', data);
    return data?.[0] || subscriber;
  } catch (error) {
    console.error('Unexpected error in addSubscriber:', error);
    throw error;
  }
} 