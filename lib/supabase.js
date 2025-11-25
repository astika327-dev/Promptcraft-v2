/**
 * Supabase Client Configuration
 * Untuk authentication dan database operations
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Please add them to .env.local');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || '',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    },
  }
);

/**
 * Auth Helper Functions
 */

// Sign up with email and password
export async function signUp(email, password, metadata = {}) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Sign up error:', error);
    return { data: null, error };
  }
}

// Sign in with email and password
export async function signIn(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Sign in error:', error);
    return { data: null, error };
  }
}

// Sign in with OAuth (Google, GitHub, etc.)
export async function signInWithOAuth(provider) {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('OAuth sign in error:', error);
    return { data: null, error };
  }
}

// Sign out
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Sign out error:', error);
    return { error };
  }
}

// Get current user
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return { user, error: null };
  } catch (error) {
    console.error('Get user error:', error);
    return { user: null, error };
  }
}

// Get current session
export async function getSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return { session, error: null };
  } catch (error) {
    console.error('Get session error:', error);
    return { session: null, error };
  }
}

// Reset password
export async function resetPassword(email) {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Reset password error:', error);
    return { data: null, error };
  }
}

// Update password
export async function updatePassword(newPassword) {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Update password error:', error);
    return { data: null, error };
  }
}

// Update user metadata
export async function updateUserMetadata(metadata) {
  try {
    const { data, error } = await supabase.auth.updateUser({
      data: metadata,
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Update metadata error:', error);
    return { data: null, error };
  }
}

/**
 * Database Helper Functions
 */

// Save prompt to database
export async function savePrompt(userId, input, generatedPrompt) {
  try {
    const { data, error } = await supabase
      .from('prompts')
      .insert([
        {
          user_id: userId,
          input_text: input,
          generated_prompt: generatedPrompt,
        },
      ])
      .select();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Save prompt error:', error);
    return { data: null, error };
  }
}

// Get user's prompt history
export async function getPromptHistory(userId, limit = 10) {
  try {
    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Get prompt history error:', error);
    return { data: null, error };
  }
}

// Delete prompt
export async function deletePrompt(promptId) {
  try {
    const { error } = await supabase
      .from('prompts')
      .delete()
      .eq('id', promptId);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Delete prompt error:', error);
    return { error };
  }
}

// Get templates from marketplace
export async function getTemplates(filters = {}) {
  try {
    let query = supabase
      .from('templates')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters.category) {
      query = query.eq('category', filters.category);
    }

    if (filters.search) {
      query = query.ilike('title', `%${filters.search}%`);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Get templates error:', error);
    return { data: null, error };
  }
}

// Get single template
export async function getTemplate(templateId) {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('id', templateId)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Get template error:', error);
    return { data: null, error };
  }
}

// Create template
export async function createTemplate(userId, templateData) {
  try {
    const { data, error } = await supabase
      .from('templates')
      .insert([
        {
          user_id: userId,
          ...templateData,
        },
      ])
      .select();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Create template error:', error);
    return { data: null, error };
  }
}

// Subscribe to auth state changes
export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
}

export default supabase;
