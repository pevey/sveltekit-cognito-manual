import { redirect } from '@sveltejs/kit'

import { PUBLIC_COGNITO_DOMAIN } from '$env/static/public'
import { PUBLIC_COGNITO_CLIENT_ID } from '$env/static/public'
import { PUBLIC_COGNITO_LOGOUT_URI } from '$env/static/public'

// There are lots of possible ways to implement signout.
// This example shows a simple route than can be called using a regular GET request 
// It will log out any logged in user when they navigate to this route

export const load = async function (event) {

    // delete the session from your database here
    
    event.cookies.set('session_id', '', { path: '/' });
    throw redirect(303, `https://${PUBLIC_COGNITO_DOMAIN}/logout?client_id=${PUBLIC_COGNITO_CLIENT_ID}&logout_uri=${PUBLIC_COGNITO_LOGOUT_URI}`);
}