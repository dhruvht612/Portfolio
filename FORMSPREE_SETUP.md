# Formspree Contact Form Setup Guide

Your contact form is now configured to use Formspree! Follow these steps to complete the setup:

## Step 1: Create a Formspree Account

1. Go to [https://formspree.io](https://formspree.io)
2. Click **"Get Started"** or **"Sign Up"**
3. Create a free account (allows 50 submissions/month)

## Step 2: Create a New Form

1. After logging in, click **"+ New Form"**
2. Give your form a name (e.g., "Portfolio Contact Form")
3. Formspree will generate a unique Form ID for you
4. Your Form ID will look like: `xyzabc123`

## Step 3: Update Your Form Action

1. Open `index.html` in your code editor
2. Find line 3093 (search for `action="https://formspree.io/f/YOUR_FORM_ID"`)
3. Replace `YOUR_FORM_ID` with your actual Formspree Form ID
   
   **Example:**
   ```html
   <!-- Before -->
   <form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   
   <!-- After (with your actual ID) -->
   <form id="contact-form" action="https://formspree.io/f/xyzabc123" method="POST">
   ```

## Step 4: Test Your Form

1. Open your portfolio website
2. Go to the Contact section
3. Fill out and submit the form
4. Check your Formspree dashboard - you should see the submission
5. Check your email - you'll receive a notification (if enabled)

## Features Included

✅ **Form Validation** - Client-side validation for name, email, and message
✅ **AJAX Submission** - No page reload, smooth user experience
✅ **Spam Protection** - Honeypot field included (`_gotcha`)
✅ **Reply-To Field** - Uses `_replyto` so you can reply directly to submissions
✅ **Loading States** - Shows spinner and feedback messages
✅ **Success/Error Messages** - Clear user feedback

## Formspree Configuration (Optional)

In your Formspree dashboard, you can configure:

- **Email notifications** - Get notified when someone submits the form
- **Autoresponder** - Send automatic replies to form submitters
- **Custom redirect** - Redirect to a thank you page (if you want)
- **reCAPTCHA** - Add extra spam protection
- **Webhooks** - Integrate with other services

## Special Field Names

The form uses these Formspree-specific field names:

- `_replyto` - Email field for reply functionality
- `_gotcha` - Hidden honeypot field for spam protection
- `name` - Standard name field
- `message` - Standard message field

## Free Tier Limits

Formspree Free Plan includes:
- 50 submissions per month
- Email notifications
- Spam filtering
- File uploads (if needed)

If you need more submissions, check out their paid plans.

## Troubleshooting

**Form not working?**
1. Make sure you replaced `YOUR_FORM_ID` with your actual Form ID
2. Check browser console for errors
3. Verify your Formspree form is active in the dashboard
4. Make sure you've confirmed your email address with Formspree

**Not receiving emails?**
1. Check your spam folder
2. Verify email notifications are enabled in Formspree settings
3. Confirm your email address in Formspree

## Alternative: Using the Old Backend

If you prefer to keep using your custom Express backend instead of Formspree:

1. Revert the changes to `index.html` (remove `action` and `method` attributes)
2. Change email field name back from `_replyto` to `email`
3. Remove the honeypot field
4. Revert `script.js` to use the `/api/contact` endpoint

---

Need help? Visit [Formspree Documentation](https://help.formspree.io/)

