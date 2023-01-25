import { sveltekit } from '@sveltejs/kit/vite'
import basicSsl from '@vitejs/plugin-basic-ssl'

const config = {
	plugins: [sveltekit(), basicSsl()]
};

export default config;
