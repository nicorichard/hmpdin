<script lang="ts">
    import { base } from '$app/paths';
</script>

<nav>
	<a href="{base}/">home</a>
	<a href="{base}/about">about</a>
</nav>

<slot />

// This can be false if you're using a fallback (i.e. SPA mode)
export const prerender = true;