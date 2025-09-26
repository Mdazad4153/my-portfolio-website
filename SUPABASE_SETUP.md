# Supabase Setup Guide

This guide will help you set up Supabase for your portfolio website.

## 🚀 Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `portfolio-website` (or your preferred name)
   - **Database Password**: Create a strong password
   - **Region**: Choose the closest region to your users
6. Click "Create new project"
7. Wait for the project to be created (usually takes 1-2 minutes)

## 🔑 Step 2: Get Project Credentials

1. Once your project is ready, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **Anon/Public Key** (starts with `eyJ...`)

## 🗄️ Step 3: Set Up Database

1. Go to **SQL Editor** in your Supabase dashboard
2. Click "New Query"
3. Copy and paste the entire content from `database-schema.sql`
4. Click "Run" to execute the SQL commands
5. This will create all necessary tables and sample data

## ⚙️ Step 4: Configure Your Website

1. Open `supabase-config.js` in your project
2. Replace the placeholder values:

```javascript
const SUPABASE_CONFIG = {
    url: 'YOUR_SUPABASE_URL',        // Replace with your Project URL
    anonKey: 'YOUR_SUPABASE_ANON_KEY' // Replace with your Anon Key
};
```

## 🔒 Step 5: Set Up Row Level Security (Optional)

The database schema already includes RLS policies, but you can customize them:

1. Go to **Authentication** → **Policies**
2. Review the policies for each table
3. Modify as needed for your security requirements

## 📊 Step 6: Test the Integration

1. Open your website in a browser
2. Go to the Contact section
3. Fill out and submit the contact form
4. Check your Supabase dashboard:
   - Go to **Table Editor**
   - Select `contact_messages` table
   - You should see your test message

## 🎨 Step 7: Customize Content (Optional)

You can manage your portfolio content through Supabase:

### Projects
- Go to **Table Editor** → `projects`
- Add, edit, or delete projects
- Set `featured = true` for projects to show on homepage

### Blog Posts
- Go to **Table Editor** → `blog_posts`
- Add new blog posts
- Set `published = true` to make them visible

### Skills
- Go to **Table Editor** → `skills`
- Update proficiency levels
- Add new skills or categories

### Testimonials
- Go to **Table Editor** → `testimonials`
- Add client testimonials
- Set `approved = true` to display them

## 🔧 Advanced Configuration

### Custom Domain (Optional)
1. Go to **Settings** → **Custom Domains**
2. Add your custom domain
3. Update DNS records as instructed

### Authentication (Optional)
If you want to add admin functionality:
1. Go to **Authentication** → **Settings**
2. Configure email templates
3. Set up OAuth providers if needed

### Storage (Optional)
For file uploads (images, documents):
1. Go to **Storage**
2. Create buckets for different file types
3. Set up policies for public/private access

## 🚨 Troubleshooting

### Common Issues

**Contact form not working:**
- Check browser console for errors
- Verify Supabase credentials are correct
- Ensure RLS policies allow inserts

**Database connection failed:**
- Check if your project is paused
- Verify the URL and key are correct
- Check if there are any network restrictions

**Permission denied errors:**
- Review RLS policies
- Check if you're using the correct API key
- Ensure tables exist and have proper permissions

### Getting Help

- Check [Supabase Documentation](https://supabase.com/docs)
- Visit [Supabase Community](https://github.com/supabase/supabase/discussions)
- Contact support through your Supabase dashboard

## 📈 Monitoring

Monitor your Supabase usage:
1. Go to **Settings** → **Usage**
2. Check database size, API calls, and storage usage
3. Set up alerts for usage limits

## 🔄 Backup

Regular backups are automatically handled by Supabase, but you can:
1. Go to **Settings** → **Database**
2. Create manual backups if needed
3. Export data using the SQL editor

---

**Note**: Keep your API keys secure and never commit them to public repositories. Consider using environment variables for production deployments.

