<script lang="ts">
    import { base } from '$app/paths';
</script>

<nav>
	<a href="{base}/">home</a>
	<a href="{base}/about">about</a>
</nav>

<slot />

export const prerender = true;