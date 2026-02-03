# Demo User Setup Instructions

## Automatic Setup (Recommended)

To automatically create the demo user, you need your Supabase **service_role** key.

### Step 1: Get Your Service Role Key
1. Go to: https://app.supabase.com/
2. Select your project: `goruqhvklnddebdncfga`
3. Go to: **Settings** → **API**
4. Copy the **"service_role"** key (NOT the anon key)

### Step 2: Run the Script
```bash
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here npm run create-demo-user
```

Replace `your-service-role-key-here` with the actual service_role key you copied.

### Step 3: Test Login
Once the script completes successfully:
1. Go to: http://localhost:8081/login
2. Click: **"Auto-fill Demo Credentials"**
3. Click: **"Login"**

---

## Demo Credentials
- **Email:** demo@vignan.edu
- **Password:** Demo@2026

---

## Manual Setup (Alternative)

If you prefer to create the user manually:

1. **Create Auth User:**
   - Go to Supabase Dashboard → Authentication → Users
   - Click "Add user" → "Create new user"
   - Email: `demo@vignan.edu`
   - Password: `Demo@2026`
   - Copy the generated UUID

2. **Create Profile:**
   - Go to SQL Editor
   - Run the SQL from: `supabase/migrations/004_create_demo_user.sql`
   - Replace `USER_UUID_HERE` with the UUID you copied
