# E-Book Landing Page

A modern, responsive landing page designed to collect visitor information in exchange for a free e-book. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Responsive, mobile-first design
- Lead capture form with validation
- Automatic email delivery of e-book
- Integration with Supabase for data storage
- Deployment-ready for Vercel

## Getting Started

### Prerequisites

- Node.js 14.x or later
- npm or yarn
- Supabase account (free tier works)
- Email service account (EmailJS, SendGrid, etc.)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd e-book-landing-page
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with your configuration:
   ```
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   
   # Email Service Configuration 
   EMAIL_API_KEY=your-email-api-key
   EMAIL_SERVICE_ID=your-email-service-id
   EMAIL_TEMPLATE_ID=your-email-template-id
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This project is ready for deployment on Vercel:

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Create a new project on Vercel and connect it to your repository
3. Add the environment variables in the Vercel project settings
4. Deploy!

## Back-end Setup

### Supabase

1. Create a new Supabase project
2. Create a `subscribers` table with the following columns:
   - `id` (uuid, primary key)
   - `full_name` (text, not null)
   - `email` (text, not null)
   - `created_at` (timestamp with timezone, default: now())
3. Copy your project URL and anon key to the environment variables

### Email Service

Configure your chosen email service (EmailJS, SendGrid, etc.) according to their documentation and update the environment variables as needed.

## Customization

- Update the e-book information in the landing page components
- Replace placeholder text with your actual content
- Add your own PDF e-book link to the email template
- Customize the design by modifying the Tailwind configuration and component styling

## License

[MIT](https://choosealicense.com/licenses/mit/) 