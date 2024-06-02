import {  LoaderFunctionArgs } from '@remix-run/node'
import clientEndpoint from 'lib/client-endpoint'
import { authenticator } from '~/service/auth.server'

export const loader = ({ request }: LoaderFunctionArgs) => {
  console.log(clientEndpoint);
  return authenticator.authenticate('google', request, {
    successRedirect: '/transaction',
    failureRedirect: '/login',
  })
}