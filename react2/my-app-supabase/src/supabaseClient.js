import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xkbislljegipnzogttdm.supabase.co'
const supabaseKey = 'sb_publishable_6QCinHO8NV1uI6xAZg19SQ_mbhULfjD'
export const supabase = createClient(supabaseUrl,supabaseKey)