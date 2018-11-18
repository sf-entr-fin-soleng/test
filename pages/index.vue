<template>
	<section>
		<!-- <nuxt-link to="/prospect/add/a080i000000E7ZxAAK">Test</nuxt-link> -->

		<!-- Page header -->
		<Header :title="title"/>

		<!-- Search Bar -->
		<SearchBar @search-updated="handleSearch"/>

		<!-- Show 'created/updated' toast whenever
		$route has the specified parameter -->
		<div 
			v-if="this.$route.params.command" 
			class="kyc-toast kyc-toast_success slds-grid slds-col slds-size_12-of-12 slds-grid_align-center">
			<div class="slds-medium-size_11-of-12 igforms-utils__max-width--large">
				<div class="slds-col slds-text-align_center slds-p-vertical_medium">
					<p v-if="this.$route.params.command === 'INSERT'"><strong>New prospect profile created!</strong></p>
					<p v-if="this.$route.params.command === 'UPDATE'"><strong>Prospect profile updated successfully!</strong></p>
					<img 
						src=""
						alternativeText="checkmark" 
						class="igforms-utils__display--inline-block">
					<ul class="kyc-toast_items">
						<li>Client profile added to address book and CRM system</li>
					</ul>
				</div>
			</div>
		</div>

		<!-- Datatable -->
		<div class="slds-grid slds-wrap slds-col slds-size_12-of-12 slds-grid_align-center">
			<Datatable 
				:rows="prospects"
				:columns="columns"
				:result-label="paginationLabel"
				@sort-table="handleTableSort"
				@click-row="handleRowClick"/>
		</div>

		<!-- Add new profile button -->
		<div 
			style="margin-bottom: 24px" 
			class="slds-col slds-size_12-of-12 slds_grid-align-center slds-button slds-m-top_large slds-align_absolute-center add-profile_button">
			<button 
				class="slds-button slds-button_neutral" 
				@click="$router.push('/prospect/info')">
				<i class="slds-button__icon slds-button__icon_left material-icons">
					add
				</i>
			<span>New Profile</span></button>
		</div>

		<!-- Pagination -->
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

	async asyncData({ app, store }) {
		try {
			const prospects = await services.prospect.fetchProspects({
				perPage: 5,
				offset: 0
			})
			return { prospects }
		} catch (err) {
			console.error(err)
		}
	},

	data: function() {
		return {
			title: 'Address Book',
			loading: false,

			// Datatable  columns map containing
			// title and key value respectively
			columns: [
				{ label: 'First Name', value: 'firstName' },
				{ label: 'Last Name', value: 'lastName' },
				{ label: 'Phone', value: 'phone' },
				{ label: 'Email', value: 'email' }
			],

			// Filtering options for the list of prospects
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
		// @antonio.cordeiro
		// This whole thing has to exist in the parent
		// component because we don't want Datatable
		// to be coupled with our pagination component
		// and using an event bus for this is overkill
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
		// Once the component finished rendering
		// make sure to add the filter attribute
		// to the search parameters in the form of
		// a string (field1, field2, field3)
		const params = { ...this.searchParams }
		params.filterBy = this.columns.map(c => c.value).join(',')
		this.searchParams = params
	},

	methods: {
		// Paginator 'page-change' event
		handlePageChange: function(currentPage, totalPages, perPage) {
			this.searchParams.offset = (currentPage - 1) * perPage
			this.updateProspects()
		},

		// Search bar 'search-updated' event
		handleSearch: function(searchTerm) {
			this.searchParams.term = searchTerm
			this.searchParams.offset = 0
			this.updateProspects()
		},

		// Datatable 'sort-table' event
		handleTableSort: function(orderBy, order) {
			this.searchParams.orderBy = orderBy
			this.searchParams.order = order
			this.updateProspects()
		},

		// Datatable 'click-row' event
		handleRowClick: function(rowData) {
			this.$router.push({
				path: `/dashboard/${rowData.id ? rowData.id : ''}`
			})
		},

		// @antonio.cordeiro
		// Directly call prospect service here
		// because the list of prospects does not
		// need to be in sync with the app state
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
