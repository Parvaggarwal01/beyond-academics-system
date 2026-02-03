import { createClient } from '@supabase/supabase-js';

// This script creates a demo user for testing
// Run with: npm run create-demo-user

const SUPABASE_URL = 'https://goruqhvklnddebdncfga.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY environment variable is required');
  console.log('\n📋 To get your service role key:');
  console.log('1. Go to: https://app.supabase.com/');
  console.log('2. Open your project');
  console.log('3. Settings > API > "service_role" key');
  console.log('4. Copy the key and run:');
  console.log('   SUPABASE_SERVICE_ROLE_KEY=your-key-here npm run create-demo-user');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createDemoUser() {
  console.log('🚀 Creating demo user...\n');

  const demoEmail = 'demo@vignan.edu';
  const demoPassword = 'Demo@2026';

  try {
    // Create auth user
    console.log('1️⃣ Creating authentication user...');
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: demoEmail,
      password: demoPassword,
      email_confirm: true,
      user_metadata: {
        full_name: 'Demo Student'
      }
    });

    if (authError) {
      if (authError.message.includes('already registered')) {
        console.log('⚠️  User already exists, fetching existing user...');
        const { data: existingUsers } = await supabase.auth.admin.listUsers();
        const existingUser = existingUsers?.users.find(u => u.email === demoEmail);
        
        if (existingUser) {
          console.log('✅ Found existing user:', existingUser.id);
          await createProfile(existingUser.id);
          return;
        }
      }
      throw authError;
    }

    console.log('✅ Auth user created:', authData.user.id);

    // Create profile
    await createProfile(authData.user.id);

    console.log('\n🎉 Demo user created successfully!');
    console.log('\n📧 Login credentials:');
    console.log('   Email:', demoEmail);
    console.log('   Password:', demoPassword);
    console.log('\n🌐 Test at: http://localhost:8081/login');
    
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

async function createProfile(userId: string) {
  console.log('2️⃣ Creating user profile...');
  
  const { error: profileError } = await supabase
    .from('profiles')
    .upsert({
      id: userId,
      full_name: 'Demo Student',
      registration_number: '12345678',
      school: 'School of Computer Science and Engineering',
      program: 'B.Tech Computer Science and Engineering',
      year: '3',
      section: 'A',
      email: 'demo@vignan.edu',
      father_name: 'Demo Father',
      mother_name: 'Demo Mother',
      transcript_eligible: true,
    }, {
      onConflict: 'id'
    });

  if (profileError) throw profileError;
  console.log('✅ Profile created');
}

createDemoUser();
