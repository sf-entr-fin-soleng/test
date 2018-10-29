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
import * as test from '~/assets/test.js'

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
			if (this.prospects[0])
				return `Showing ${offset + 1}-${
					offset + perPage > this.prospects[0].totalCount
						? this.prospects[0].totalCount
						: offset + perPage
				} of ${this.prospects[0].totalCount} ${
					term ? `for ${term}` : ``
				}`
			else return ''
		}
	},

	mounted: function() {
		const params = { ...this.searchParams }
		params.filterBy = this.columns.map(c => c.value).join(',')
		this.searchParams = params

		test.testFunction()
	},

	methods: {
		buildEndpointURL: function() {
			const params = { ...this.searchParams }
			let endpoint = `/api/prospect/getAll.json?perPage=
			${params.perPage}&offset=${params.offset}`

			if (params.term) {
				endpoint += `&filter=${params.term}&filterBy=${params.filterBy}`
			}

			if (params.order && params.orderBy) {
				endpoint += `&orderBy=${params.orderBy}&order=${params.order}`
			}

			return endpoint
		},

		handlePageChange: function(currentPage, totalPages, perPage) {
			this.searchParams.offset = (currentPage - 1) * perPage
			this.updateProspects()
		},

		handleSearch: function(searchTerm) {
			this.searchParams.term = searchTerm
			this.updateProspects()
		},

		handleTableSort: function(orderBy, order) {
			this.searchParams.orderBy = orderBy
			this.searchParams.order = order
			this.updateProspects()
		},

		updateProspects: async function() {
			try {
				const url = this.buildEndpointURL()
				this.prospects = await this.$axios.$get(url)
			} catch (error) {
				console.error(error)
			}
		}
	}
}
</script>
