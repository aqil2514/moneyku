import type { ActionFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { createSupabaseServerClient } from '~/supabase.server'
export const loader = async ({ request }: ActionFunctionArgs) => {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  if (code) {
    const { supabaseClient, headers } = createSupabaseServerClient(request)
    const { error } = await supabaseClient.auth.exchangeCodeForSession(code)
    if (error) {
      return redirect('/sign-in')
    }
    return redirect('/dashboard', {
      headers,
    })
  }
  return new Response('Authentication faild', {
    status: 400,
  })
}