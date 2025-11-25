-- PromptCraft Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Prompts Table
-- Stores user-generated prompts
CREATE TABLE IF NOT EXISTS prompts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  input_text TEXT NOT NULL,
  generated_prompt TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_prompts_user_id ON prompts(user_id);
CREATE INDEX IF NOT EXISTS idx_prompts_created_at ON prompts(created_at DESC);

-- Templates Table
-- Stores marketplace templates
CREATE TABLE IF NOT EXISTS templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  prompt_template TEXT NOT NULL,
  category VARCHAR(100),
  price DECIMAL(10,2) DEFAULT 0.00,
  downloads INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0.00,
  rating_count INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_templates_user_id ON templates(user_id);
CREATE INDEX IF NOT EXISTS idx_templates_category ON templates(category);
CREATE INDEX IF NOT EXISTS idx_templates_created_at ON templates(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_templates_published ON templates(is_published);

-- Purchases Table
-- Tracks template purchases
CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  template_id UUID REFERENCES templates(id) ON DELETE CASCADE NOT NULL,
  price_paid DECIMAL(10,2) NOT NULL,
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, template_id)
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_template_id ON purchases(template_id);

-- Favorites Table
-- User's favorite templates
CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  template_id UUID REFERENCES templates(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, template_id)
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_template_id ON favorites(template_id);

-- Reviews Table
-- Template reviews and ratings
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  template_id UUID REFERENCES templates(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, template_id)
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_reviews_template_id ON reviews(template_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);

-- User Profiles Table (Extended user info)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR(255),
  avatar_url TEXT,
  bio TEXT,
  website VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Prompts Policies
CREATE POLICY "Users can view their own prompts"
  ON prompts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own prompts"
  ON prompts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own prompts"
  ON prompts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own prompts"
  ON prompts FOR DELETE
  USING (auth.uid() = user_id);

-- Templates Policies
CREATE POLICY "Anyone can view published templates"
  ON templates FOR SELECT
  USING (is_published = true OR auth.uid() = user_id);

CREATE POLICY "Users can insert their own templates"
  ON templates FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own templates"
  ON templates FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own templates"
  ON templates FOR DELETE
  USING (auth.uid() = user_id);

-- Purchases Policies
CREATE POLICY "Users can view their own purchases"
  ON purchases FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own purchases"
  ON purchases FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Favorites Policies
CREATE POLICY "Users can view their own favorites"
  ON favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own favorites"
  ON favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites"
  ON favorites FOR DELETE
  USING (auth.uid() = user_id);

-- Reviews Policies
CREATE POLICY "Anyone can view reviews"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews"
  ON reviews FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews"
  ON reviews FOR DELETE
  USING (auth.uid() = user_id);

-- Profiles Policies
CREATE POLICY "Anyone can view profiles"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Functions

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_prompts_updated_at
  BEFORE UPDATE ON prompts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_templates_updated_at
  BEFORE UPDATE ON templates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to update template rating
CREATE OR REPLACE FUNCTION update_template_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE templates
  SET 
    rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM reviews
      WHERE template_id = NEW.template_id
    ),
    rating_count = (
      SELECT COUNT(*)
      FROM reviews
      WHERE template_id = NEW.template_id
    )
  WHERE id = NEW.template_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update template rating when review is added/updated
CREATE TRIGGER update_template_rating_on_review
  AFTER INSERT OR UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_template_rating();

-- Function to increment template downloads
CREATE OR REPLACE FUNCTION increment_template_downloads(template_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE templates
  SET downloads = downloads + 1
  WHERE id = template_uuid;
END;
$$ LANGUAGE plpgsql;

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Sample Data (Optional - for testing)

-- Insert sample categories
INSERT INTO templates (user_id, title, description, prompt_template, category, price, is_published)
SELECT 
  auth.uid(),
  'Professional Logo Design',
  'Create stunning professional logos for any business',
  'Design a modern, professional logo for {business_type} that represents {values} with a {style} aesthetic. Use {color_scheme} colors.',
  'Design',
  4.99,
  true
WHERE EXISTS (SELECT 1 FROM auth.users LIMIT 1);

-- Views for analytics (Optional)

-- View for popular templates
CREATE OR REPLACE VIEW popular_templates AS
SELECT 
  t.*,
  p.full_name as author_name,
  COUNT(DISTINCT pu.id) as purchase_count,
  COUNT(DISTINCT f.id) as favorite_count
FROM templates t
LEFT JOIN profiles p ON t.user_id = p.id
LEFT JOIN purchases pu ON t.id = pu.template_id
LEFT JOIN favorites f ON t.id = f.template_id
WHERE t.is_published = true
GROUP BY t.id, p.full_name
ORDER BY purchase_count DESC, favorite_count DESC;

-- View for user statistics
CREATE OR REPLACE VIEW user_stats AS
SELECT 
  u.id,
  p.full_name,
  COUNT(DISTINCT t.id) as templates_created,
  COUNT(DISTINCT pr.id) as prompts_generated,
  COUNT(DISTINCT pu.id) as purchases_made,
  SUM(CASE WHEN t.is_published THEN 1 ELSE 0 END) as published_templates
FROM auth.users u
LEFT JOIN profiles p ON u.id = p.id
LEFT JOIN templates t ON u.id = t.user_id
LEFT JOIN prompts pr ON u.id = pr.user_id
LEFT JOIN purchases pu ON u.id = pu.user_id
GROUP BY u.id, p.full_name;

-- Grant permissions for views
GRANT SELECT ON popular_templates TO authenticated;
GRANT SELECT ON user_stats TO authenticated;
