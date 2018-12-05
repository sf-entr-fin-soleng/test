<template>
	<div>
		<Header title="Digital Forms"/>

		<div class="igforms-overview slds-grid slds-wrap slds-col slds-grid_align-center slds-size_12-of-12 igforms-utils__outer-margin-blue">
			<div class="slds-grid slds-wrap slds-col slds-grid_align-center slds-size_12-of-12 igforms-utils__outer-margin-blue__inner utils__no-outer-border_top utils__no-outer-padding-top">
				<div class="igforms-overview_header slds-grid slds-wrap slds-size_1-of-1 slds-grid_align-center">
					<div class="slds-grid slds-wrap slds-size_11-of-12 igforms-utils__max-width--large">
						<h2 class="slds-p-vertical_medium">Client Goals <span>(Family Tree -
						Questionnaire - Goals &amp; Concerns - KYC)</span></h2>
					</div>
				</div>
				<div class="slds-grid slds-col slds-wrap slds-size_12-of-12 slds-grid_align-center slds-m-vertical_x-large igforms-utils__max-width--large">
					<div 
						v-for="item in modules" 
						:key="item.name"
						:to="item.href"
						class="igforms-dashboard_accordion-item slds-grid slds-size_11-of-12 slds-grid_align-center"
						@click="$router.push(item.href)">
						<div class="igforms-dashboard_accordion-content slds-grid slds-size_11-of-12 slds-p-vertical_medium">
							<div class="igforms-dashboard_accordion-title dashboard_accordion_status-complete">
								<p>
									{{ item.name }}
									<span>
										Last Updated {{ item.lastUpdated }}
									</span>
								</p>
							</div>
							<div class="igforms-dashboard_status slds-grid_vertical-align-center">
								<ul>
									<li>
										<a href="#">
											<span>
												<img 
													src="~assets/images/icons/print-icon.svg"
													alternativeText="print icon" >
												Print

											</span>
										</a>
									</li>
									<li>
										<a href="#">
											<span>
												<img 
													src="~assets/images/icons/email-icon.svg"
													alternativeText="email icon" >

												Email
											</span>
										</a>
									</li>
								</ul>
								<p>{{ item.status }}</p>
								<img 
									src="~assets/images/icons/arrow-icon.svg"
									alternativeText="arrow icon" 
									class="arrow-icon" >
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
import Header from '~/components/Header.vue'

export default {
	components: {
		Header
	},

	async asyncData({ store, params }) {
		const prospect = await store.dispatch(
			`prospect/fetchProspect`,
			params.id
		)

		const modules = [
			{
				name: 'Family Tree',
				href: '/family-tree/' + prospect.id,
				lastUpdate: '2018-01-01'
			},
			// {
			// 	name: 'Questionnaire',
			// 	href: `/questionnaire/QSN-01/${prospect.id}`,
			// 	lastUpdate: '2018-01-01'
			// },
			{
				name: 'Goals & Concerns',
				href: '/goals/' + prospect.id,
				lastUpdate: '2018-01-01'
			}
		]

		return { prospect, modules }
	},

	data: function() {
		return {
			id: this.$route.params.id
		}
	}
}
</script>
