<script>
	import '../app.css'
	import { PUBLIC_COGNITO_DOMAIN } from '$env/static/public'
    import { PUBLIC_COGNITO_CLIENT_ID } from '$env/static/public'
    import { PUBLIC_COGNITO_REDIRECT_URI } from '$env/static/public'
	export let data
	const user = data?.user
    const state = crypto.randomUUID()
</script>

{#if user}

<main>
	<slot />
</main>

{:else}

	<a href="{`https://${PUBLIC_COGNITO_DOMAIN}/oauth2/authorize?response_type=code&client_id=${PUBLIC_COGNITO_CLIENT_ID}&redirect_uri=${PUBLIC_COGNITO_REDIRECT_URI}&scope=openid+email+profile&state=${state}`}">
		<button type="button">Sign In</button>
	</a>

{/if}