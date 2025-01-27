-- Enable RLS on the table if not already enabled
alter table "public"."content_sections" enable row level security;

-- Create policy to allow all operations (temporary for development)
create policy "Enable all operations for content_sections"
on "public"."content_sections"
for all
using (true)
with check (true);