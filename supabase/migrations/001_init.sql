-- ============================================================
-- Sansa's Kitchen — Database Schema v1
-- Safe to run multiple times (idempotent).
-- Run in: https://supabase.com/dashboard/project/_/sql
-- ============================================================

-- ─── Profiles ─────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.profiles (
  id                  UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nickname            TEXT NOT NULL DEFAULT '',
  avatar_url          TEXT NOT NULL DEFAULT '',
  timezone            TEXT NOT NULL DEFAULT 'UTC',
  language            TEXT NOT NULL DEFAULT 'en',
  dietary_preferences TEXT[] NOT NULL DEFAULT '{}',
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, nickname)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'nickname', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ─── Pantry items ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.pantry_items (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  category   TEXT NOT NULL CHECK (category IN ('ingredient', 'seasoning', 'tool')),
  tags       TEXT[] NOT NULL DEFAULT '{}',
  quantity   NUMERIC,
  unit       TEXT,
  emoji      TEXT NOT NULL DEFAULT '',
  added_at   DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.pantry_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "pantry_select_own" ON public.pantry_items;
CREATE POLICY "pantry_select_own" ON public.pantry_items
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "pantry_insert_own" ON public.pantry_items;
CREATE POLICY "pantry_insert_own" ON public.pantry_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "pantry_update_own" ON public.pantry_items;
CREATE POLICY "pantry_update_own" ON public.pantry_items
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "pantry_delete_own" ON public.pantry_items;
CREATE POLICY "pantry_delete_own" ON public.pantry_items
  FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_pantry_user ON public.pantry_items(user_id);

-- ─── Diary entries ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.diary_entries (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date         DATE NOT NULL DEFAULT CURRENT_DATE,
  meal_type    TEXT NOT NULL CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  recipe_id    TEXT NOT NULL,
  recipe_name  TEXT NOT NULL,
  recipe_emoji TEXT NOT NULL DEFAULT '',
  notes        TEXT NOT NULL DEFAULT '',
  rating       SMALLINT NOT NULL DEFAULT 4 CHECK (rating >= 1 AND rating <= 5),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.diary_entries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "diary_select_own" ON public.diary_entries;
CREATE POLICY "diary_select_own" ON public.diary_entries
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "diary_insert_own" ON public.diary_entries;
CREATE POLICY "diary_insert_own" ON public.diary_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "diary_delete_own" ON public.diary_entries;
CREATE POLICY "diary_delete_own" ON public.diary_entries
  FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_diary_user ON public.diary_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_diary_date ON public.diary_entries(user_id, date);

-- ─── Favorite recipes ─────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.favorite_recipes (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipe_id  TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, recipe_id)
);

ALTER TABLE public.favorite_recipes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "fav_select_own" ON public.favorite_recipes;
CREATE POLICY "fav_select_own" ON public.favorite_recipes
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "fav_insert_own" ON public.favorite_recipes;
CREATE POLICY "fav_insert_own" ON public.favorite_recipes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "fav_delete_own" ON public.favorite_recipes;
CREATE POLICY "fav_delete_own" ON public.favorite_recipes
  FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_fav_user ON public.favorite_recipes(user_id);

-- ─── User settings ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.user_settings (
  user_id                UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  theme                  TEXT NOT NULL DEFAULT 'light' CHECK (theme IN ('light', 'dark')),
  notifications_enabled  BOOLEAN NOT NULL DEFAULT false,
  onboarding_completed   BOOLEAN NOT NULL DEFAULT false,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "settings_select_own" ON public.user_settings;
CREATE POLICY "settings_select_own" ON public.user_settings
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "settings_insert_own" ON public.user_settings;
CREATE POLICY "settings_insert_own" ON public.user_settings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "settings_update_own" ON public.user_settings;
CREATE POLICY "settings_update_own" ON public.user_settings
  FOR UPDATE USING (auth.uid() = user_id);

-- Auto-create settings on profile creation
CREATE OR REPLACE FUNCTION public.handle_new_settings()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_settings (user_id)
  VALUES (NEW.id)
  ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_profile_created ON public.profiles;
CREATE TRIGGER on_profile_created
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_settings();
