export const load = async function ({ locals }) {
	// locals.user is set in hooks/index.js
	if (locals.user) {
		return {
			user: locals.user
		}
	}
}