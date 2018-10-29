<template>
	<section>
		<Header :title="title"/>
		<SearchBar/>
		<div class="slds-grid slds-wrap slds-col slds-size_12-of-12 slds-grid_align-center">
			<Datatable 
				:rows="prospects"
				:columns="columns"/>
		</div>
		<Paginator 
			:record-count="prospects[0] ? parseInt(prospects[0].totalCount) : 0" 
			@page-change="handlePageChange"/>
	</section>
</template>

<script>
import Header from '~/components/Header.vue'
import Datatable from '~/components/Datatable.vue'
import SearchBar from '~/components/SearchBar.vue'
import Paginator from '~/components/Paginator.vue'

export default {
	components: {
		Header,
		Datatable,
		SearchBar,
		Paginator
	},

	async asyncData({ app }) {
		try {
			const prospects = await app.$axios.$get('/api/prospect/getAll.json')
			return { prospects }
		} catch (err) {
			console.error(err)
		}
	},

	data: function() {
		return {
			title: 'Address Book',
			loading: false,
			columns: [
				{ label: 'First Name', value: 'firstName' },
				{ label: 'Last Name', value: 'lastName' },
				{ label: 'Phone', value: 'phone' },
				{ label: 'Email', value: 'email' }
			]
		}
	},

	methods: {
		handlePageChange: async function(currentPage, totalPages, perPage) {
			try {
				const offset = (currentPage - 1) * perPage
				const prospects = await this.$axios.$get(
					`/api/prospect/getAll.json?offset=${offset}&perPage=${perPage}`
				)

				this.prospects = prospects
			} catch (err) {
				console.error(err)
			}
		}
	}
}
</script>

<style>
.container {
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
}

.title {
	font-family: 'Quicksand', 'Source Sans Pro', -apple-system,
		BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
		sans-serif;
	display: block;
	font-weight: 300;
	font-size: 100px;
	color: #35495e;
	letter-spacing: 1px;
}

.subtitle {
	font-weight: 300;
	font-size: 42px;
	color: #526488;
	word-spacing: 5px;
	padding-bottom: 15px;
}

.links {
	padding-top: 15px;
}
</style>
