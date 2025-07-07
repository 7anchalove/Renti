# Supabase Setup Guide

This guide will help you connect your Renti website to your Supabase project.

## Step 1: Get Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Settings** > **API**
3. Copy your **Project URL** and **anon public** key

## Step 2: Create Environment Variables

1. Create a `.env.local` file in your project root
2. Add the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace `your_supabase_project_url` and `your_supabase_anon_key` with your actual values.

## Step 3: Set Up Authentication in Supabase

1. In your Supabase dashboard, go to **Authentication** > **Settings**
2. Configure your authentication settings:
   - Enable email confirmations (optional)
   - Set up redirect URLs for your domain
   - Configure email templates

## Step 4: Create Database Tables (Optional)

If you want to store user profiles or other data, create the necessary tables in your Supabase database:

```sql
-- Example: Create a profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Create policy to allow users to update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create policy to allow users to insert their own profile
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
```

## Step 5: Run the Development Server

```bash
npm run dev
```

Your website should now be connected to Supabase! Users can:
- Sign up with email and password
- Sign in with their credentials
- Sign out from the header
- See their authentication status in the header

## Features Included

- ✅ Supabase client configuration
- ✅ Authentication context provider
- ✅ Login page with Supabase auth
- ✅ Register page with Supabase auth
- ✅ Header with authentication status
- ✅ Sign out functionality
- ✅ Toast notifications for auth actions

## Next Steps

1. Customize the authentication flow as needed
2. Add user profile management
3. Implement database operations for your rental items
4. Set up Row Level Security policies
5. Configure email templates in Supabase

## Troubleshooting

- Make sure your environment variables are correctly set
- Check that your Supabase project is active
- Verify that authentication is enabled in your Supabase project
- Check the browser console for any error messages 