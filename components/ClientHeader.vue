<template>
	<section>
		<div class="igforms-client-header slds-grid slds-gutters slds-grid_align-center slds-col slds-size_12-of-12 slds-p-vertical_medium">
			<div class="slds-grid slds-size_1-of-1 slds-col igforms-utils__max-width--large">
				<div class=" slds-clearfix">
					<div class="igforms-client-header__info igforms-client-header__back-button slds-float_left slds-align_absolute-center">
						<!-- <button 
							class="slds-button slds-button_inverse"
							@click="$emit('click-prev', $event)">
							<i class="slds-button__icon slds-button__icon_left material-icons">
								navigate_before
							</i>
							Back
						</button> -->
						<p class="igforms-client-header__name-number">
							<strong>Client: {{ `${this.$store.state.prospect.prospect.firstName} ${this.$store.state.prospect.prospect.lastName}` }}</strong>
							<!-- <span>
								{{ this.$store.state.prospect.prospect.id.slice(0,5).toString().toUpperCase() }}
							</span> -->
						</p>
						<p>
							<a href="#"> {{ this.$store.state.prospect.prospect.email }}</a>
						</p>
					</div>
				</div>
			</div>

		</div>

		<!-- Navigation for Overview, Goals & Concerns, Family Tree, 10 Questions -->


		<div 
			v-if="displayModules" 
			class="igforms-client-header_navigation slds-grid slds-gutters slds-grid_align-center slds-col slds-size_12-of-12">
			<div class="slds-grid slds-size_1-of-1 slds-col igforms-utils__max-width--large">
				<ul class="igforms-utils__display--inline-block igforms-utils__margin--zero-auto">
					<li 
						v-for="module in modules" 
						:key="module.name"
						class="igforms-utils__display--inline-block">
						<nuxt-link
							:to="module.href"
							:class="['igforms-utils__display--inline-block']"
							role="button"> {{ module.name }}</nuxt-link>
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	props: {
		displayModules: {
			type: Boolean,
			default: true
		}
	},
	data: function() {
		const prospect = this.$store.state.prospect.prospect
		const modules = [
			{
				name: 'Dashboard',
				href: '/dashboard/' + prospect.id,
				lastUpdate: '2018-01-01'
			},
			{
				name: 'Family Tree',
				href: '/family-tree/' + prospect.id,
				lastUpdate: '2018-01-01'
			},
			{
				name: 'Questionnaire',
				href: `/questionnaire/QSN-01/${prospect.id}`,
				lastUpdate: '2018-01-01'
			},
			{
				name: 'Goals & Concerns',
				href: '/goals/' + prospect.id,
				lastUpdate: '2018-01-01'
			}
		]

		return {
			modules
		}
	}
}
</script>
