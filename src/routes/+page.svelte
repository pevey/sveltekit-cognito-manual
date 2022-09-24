<script>
	export let data
	let user = data?.user
</script>

<svelte:head>
	<title>SK Cognito Auth Example</title>
	<meta name="description" content="SvelteKit Cognito demo app" />
</svelte:head>

<p>Welcome!  You are logged in.  You would not see this page if you were not logged in.</p>
	
<p>Your session_id is {user.session_id}</p>

<p>
	<a href="/signout">
		<button type="button">Sign Out</button>
	</a>
</p>
