# Landing Page Context

This document provides a comprehensive brief for building the e‑book landing page. It describes the user experience, required integrations, and deployment details. Use this as input for Cursor AI to generate the implementation code.

---

## 1. Purpose & Goals

- **Primary Goal:** Collect visitor name and email in exchange for a free e‑book PDF.
- **Secondary Goals:**
  - Store leads in a database for future follow‑up.
  - Automatically send the e‑book without manual intervention.
  - Host on Vercel with a fast, responsive, and modern UI.

## 2. Target Audience

- Individuals interested in the e‑book topic (e.g., Minecraft fans).
- Casual visitors on Instagram, social media, or via paid ads.

## 3. Page Structure & Content

1. **Hero Section**
   - Headline introducing the free e‑book offer.
   - Brief subtitle highlighting value and benefits.
   - Call‑to‑Action (CTA) button that scrolls to the form.

2. **Lead Capture Form**
   - Fields:
     - Full Name (required)
     - Email Address (required)
   - Submit button labeled clearly (e.g., “Send My Free E‑Book”).
   - Inline validation and user feedback (e.g., error states, loading state).

3. **Success & Thank‑You Interaction**
   - On successful submission, display an on‑page confirmation message.
   - Inform the user to check their inbox for the PDF link.

4. **Optional Sections**
   - Testimonials or social proof.
   - Brief author bio or credentials.
   - Footer with links to privacy policy and social media.

## 4. Back‑End Integrations & Workflow

- **Database & API**
  - **Supabase** free tier for storing subscribers.
    - Table: `subscribers` with columns `id`, `full_name`, `email`, `created_at`.
  - Use a serverless function (Vercel Serverless or Supabase Edge Function) to:
    1. Validate and insert form data into Supabase.
    2. Trigger the email containing the PDF link.

- **Email Delivery**
  - Use a free-tier transactional email API (choose one):
    - EmailJS
    - SendGrid (100 emails/day free)
    - Mailgun (5,000/month free)
    - Postmark (100/month free)
  - Store API credentials as environment variables:
    - `EMAIL_API_KEY`
    - `EMAIL_SERVICE_ID` / `TEMPLATE_ID` (if applicable)

- **E‑Book Hosting**
  - Upload the PDF to a reliable storage/CDN (e.g., GitHub Releases, Supabase Storage, or any public URL).
  - Include the direct link in the email template.

## 5. Deployment & Environment

- **Host Static Assets & Front‑End** on Vercel (free tier).
- **Serverless Functions**
  - Deploy under `/api` routes in the same Vercel project.
  - Ensure environment variables are configured in Vercel Dashboard.

| Environment Variable       | Description                                |
| ------------------------- | ------------------------------------------ |
| `SUPABASE_URL`            | Public URL of the Supabase project         |
| `SUPABASE_ANON_KEY`       | Anonymous API key for Supabase             |
| `EMAIL_API_KEY`           | API key for the chosen email provider      |
| `EMAIL_SERVICE_ID`        | Email service identifier (if needed)       |
| `EMAIL_TEMPLATE_ID`       | Email template identifier for PDF delivery |

## 6. Design & User Experience

- **Responsive & Mobile‑First:** Ensure form and text scale gracefully.
- **Accessibility:** Proper labels, focus states, and ARIA attributes.
- **Branding & Styling:** Clean, modern layout; consistent typography; clear CTA colors.
- **Performance:** Optimize images, minify CSS/JS; use Vercel CDN.

## 7. Analytics & Tracking (Optional)

- Integrate a lightweight analytics solution (e.g., Google Analytics or Plausible).
- Track page views and form submissions as conversion events.

---

_End of Context.doc for Cursor AI._

