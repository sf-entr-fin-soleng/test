<template>
	<div>
		<nuxt-link to="/">Home</nuxt-link>
		<nuxt-link :to="'/goals/' + id">Goals</nuxt-link>
		<nuxt-link :to="'/prospect/info/' + id">Edit</nuxt-link>
	</div>
	
</template>

<script>
export default {
	async asyncData({ store, params }) {
		const prospect = await store.dispatch(
			`prospect/fetchProspect`,
			params.id
		)

		return { prospect }
	},

	data: function() {
		return {
			id: this.$route.params.id
		}
	}
}
</script>
