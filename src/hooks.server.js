import { PUBLIC_COGNITO_DOMAIN } from '$env/static/public'
import { PUBLIC_COGNITO_CLIENT_ID } from '$env/static/public'
import { PUBLIC_COGNITO_REDIRECT_URI } from '$env/static/public'
import { COGNITO_CLIENT_SECRET } from '$env/static/private'

const tokenUrl = `https://${PUBLIC_COGNITO_DOMAIN}/oauth2/token`
const profileUrl = `https://${PUBLIC_COGNITO_DOMAIN}/oauth2/userInfo`

export const handle = async ({ event, resolve }) => {
    event.locals.session_id = event.cookies.get('session_id') // this will be overwritten by a new session_id if this is a callback

    // SESSION COOKIE EXISTS
	if (event.locals.session_id) {
		// We have a session cookie, so check againt the database see if it is valid.  
		// If not, or if it is expired, delete it
		// In this example, we skip that and just assume it is valid
		// Don't do this in production.  

		// You would want to pull your user info from a database and do something like
		// event.locals.user = user
		// In this example, we have user object with only the session id 

		event.locals.user = { session_id: event.locals.session_id }
		event.locals.authorized = true
	} 

    // SESSION COOKIE NOT FOUND OR WAS INVALID
	if ( (!event.locals.session_id) && event.url.searchParams.get('code') && event.url.searchParams.get('state') ) {
		// No valid session cookie, check to see if this is a callback
		const code = event.url.searchParams.get('code')
		const state = event.url.searchParams.get('state')
		const token = await getToken(code, state)
		if (token != null) {
            try {
                let user = await getUser(token)
                event.locals.session_id = crypto.randomUUID()
				// handle storing session in db and clearing deleting other sessions for the same user if desired
				// In this example, we skip that
				event.cookies.set('session_id', event.locals.session_id, { path: '/' });
				event.locals.user = { session_id: event.locals.session_id }
				event.locals.authorized = true
            } catch (error) {
                console.log('could not retrieve cognito user with the token')
            }
		}
	}
	return resolve(event);
}

const getToken = async (code, state) => {
    let authorization = Buffer.from(`${PUBLIC_COGNITO_CLIENT_ID}:${COGNITO_CLIENT_SECRET}`).toString('base64')
    // console.log(authorization)
	const res = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${authorization}`,
        },
        body: `grant_type=authorization_code&client_id=${PUBLIC_COGNITO_CLIENT_ID}&code=${code}&state=${state}&redirect_uri=${PUBLIC_COGNITO_REDIRECT_URI}`
    })
    if (res.ok) {
        const data = await res.json()
        return data.access_token
    } else {
        return null
    }
}

const getUser = async (token) => {
    const res = await fetch(profileUrl, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    if (res.ok) {
        return res.json()
    } else {
        return null
    }
}
