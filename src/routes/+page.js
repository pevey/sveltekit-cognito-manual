export function load ({ data }) {
    // we pass the user object forward to make it available to the client
    return {
        user: data?.user
    }
}