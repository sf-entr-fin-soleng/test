<template>
	<section>
		<Header :title="title"/>
		<SearchBar @search-updated="handleSearch"/>
		<div class="slds-grid slds-wrap slds-col slds-size_12-of-12 slds-grid_align-center">
			<Datatable 
				:rows="prospects"
				:columns="columns"
				:result-label="paginationLabel"
				@sort-table="handleTableSort"/>
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
import services from '~/services'

export default {
	components: {
		Header,
		Datatable,
		SearchBar,
		Paginator
	},

	async asyncData({ app }) {
		try {
			const prospects = await app.$axios.$get(
				'api/prospect/getAll.json?offset=0&perPage=5'
			)
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
			],

			searchParams: {
				term: '',
				filterBy: '',
				offset: 0,
				perPage: 5,
				orderBy: '',
				order: 'asc'
			}
		}
	},

	computed: {
		paginationLabel: function() {
			const { offset, perPage, term } = { ...this.searchParams }
			const prospect = this.prospects[0]
			if (prospect)
				return `Showing ${offset + 1}-${
					offset + perPage > prospect.totalCount
						? prospect.totalCount
						: offset + perPage
				} of ${prospect.totalCount} ${term ? `for ${term}` : ``}`
			else return ''
		}
	},

	mounted: function() {
		const params = { ...this.searchParams }
		params.filterBy = this.columns.map(c => c.value).join(',')
		this.searchParams = params
	},

	methods: {
		handlePageChange: function(currentPage, totalPages, perPage) {
			this.searchParams.offset = (currentPage - 1) * perPage
			this.updateProspects()
		},

		handleSearch: function(searchTerm) {
			this.searchParams.term = searchTerm
			this.searchParams.offset = 0
			this.updateProspects()
		},

		handleTableSort: function(orderBy, order) {
			this.searchParams.orderBy = orderBy
			this.searchParams.order = order
			this.updateProspects()
		},

		updateProspects: async function() {
			try {
				this.prospects = await services.prospect.fetchProspects(
					this.searchParams
				)
			} catch (error) {
				console.error(error)
			}
		}
	}
}
</script>
