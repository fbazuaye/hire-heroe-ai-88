-- Create resumes table
CREATE TABLE public.resumes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  title TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  file_url TEXT,
  is_primary BOOLEAN DEFAULT false,
  ats_score INTEGER,
  last_analyzed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create interview_preparations table
CREATE TABLE public.interview_preparations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  company_name TEXT NOT NULL,
  position_title TEXT NOT NULL,
  interview_type TEXT DEFAULT 'behavioral',
  preparation_status TEXT DEFAULT 'planning',
  questions JSONB DEFAULT '[]',
  answers JSONB DEFAULT '{}',
  notes TEXT,
  interview_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create salary_insights table  
CREATE TABLE public.salary_insights (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  position_title TEXT NOT NULL,
  location TEXT NOT NULL,
  experience_level TEXT NOT NULL,
  salary_min INTEGER,
  salary_max INTEGER,
  currency TEXT DEFAULT 'USD',
  data_source TEXT,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create portfolio_items table
CREATE TABLE public.portfolio_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  technologies TEXT[],
  project_url TEXT,
  github_url TEXT,
  image_urls TEXT[],
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create career_goals table
CREATE TABLE public.career_goals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  title TEXT NOT NULL,
  description TEXT,
  target_position TEXT,
  target_company TEXT,
  target_salary INTEGER,
  deadline DATE,
  status TEXT DEFAULT 'active',
  progress INTEGER DEFAULT 0,
  milestones JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create learning_paths table
CREATE TABLE public.learning_paths (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  skill_name TEXT NOT NULL,
  current_level INTEGER DEFAULT 1,
  target_level INTEGER DEFAULT 5,
  learning_resources JSONB DEFAULT '[]',
  completed_resources TEXT[],
  estimated_hours INTEGER,
  progress INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create job_matches table
CREATE TABLE public.job_matches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  job_title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  job_description TEXT,
  job_url TEXT,
  location TEXT,
  salary_range TEXT,
  match_score INTEGER,
  missing_skills TEXT[],
  matching_skills TEXT[],
  application_status TEXT DEFAULT 'not_applied',
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create motivational_quotes table (separate from motivational_content)
CREATE TABLE public.motivational_quotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_text TEXT NOT NULL,
  author TEXT,
  category TEXT DEFAULT 'motivation',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_preparations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salary_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.motivational_quotes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for resumes
CREATE POLICY "Users can manage their own resumes" ON public.resumes
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for interview_preparations
CREATE POLICY "Users can manage their own interview preparations" ON public.interview_preparations
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for salary_insights
CREATE POLICY "Users can manage their own salary insights" ON public.salary_insights
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for portfolio_items
CREATE POLICY "Users can manage their own portfolio items" ON public.portfolio_items
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for career_goals
CREATE POLICY "Users can manage their own career goals" ON public.career_goals
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for learning_paths
CREATE POLICY "Users can manage their own learning paths" ON public.learning_paths
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for job_matches
CREATE POLICY "Users can manage their own job matches" ON public.job_matches
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for motivational_quotes (public read)
CREATE POLICY "Anyone can read motivational quotes" ON public.motivational_quotes
  FOR SELECT USING (is_active = true);

-- Add updated_at triggers
CREATE TRIGGER update_resumes_updated_at
  BEFORE UPDATE ON public.resumes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_interview_preparations_updated_at
  BEFORE UPDATE ON public.interview_preparations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_portfolio_items_updated_at
  BEFORE UPDATE ON public.portfolio_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_career_goals_updated_at
  BEFORE UPDATE ON public.career_goals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_learning_paths_updated_at
  BEFORE UPDATE ON public.learning_paths
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample motivational quotes
INSERT INTO public.motivational_quotes (quote_text, author, category) VALUES
('Success is not final, failure is not fatal: it is the courage to continue that counts.', 'Winston Churchill', 'motivation'),
('Your limitation—it''s only your imagination.', 'Anonymous', 'mindset'),
('Great things never come from comfort zones.', 'Anonymous', 'growth'),
('Don''t stop when you''re tired. Stop when you''re done.', 'Anonymous', 'persistence'),
('The expert in anything was once a beginner.', 'Helen Hayes', 'learning');