<template>
	<div>
		<Header :title="title"/>
		<pre 
			v-if="debug" 
			style="background-color: #000000; color: limegreen; font-family: Consolas">{{ localProspect }}</pre>
		<Form 
			id="prospect-form"
			@form-submit="saveProspect">
			<div class="igforms-client-details slds-grid slds-col slds-size_1-of-1 slds-grid_align-center slds-form slds-form_compound cFormValidator">
				<fieldset class="slds-grid slds-size_1-of-1 slds-form-element slds-wrap">
					<div class="igforms-client-details-header_container slds-grid slds-grid_align-center slds-size_1-of-1">
						<div class="slds-grid slds-col slds-size_1-of-1 slds-grid_align-center igforms-utils__max-width--large">
							<legend class="igforms-client-details-header slds-form-element__label slds-form-element__legend slds-grid slds-medium-size_11-of-12">Contact
							Details</legend>
						</div>
					</div>
					<div class="slds-form-element__group slds-grid slds-col slds-gutters slds-wrap slds-medium-size_10-of-12 slds-large-size_10-of-12 slds-grid_align-center slds-p-top_x-large igforms-utils__max-width--large">
						<div class="slds-form-element__row slds-col slds-size_1-of-1">
							<div class="slds-col slds-size_1-of-2">
								<FormField 
									v-model="localProspect.firstName"
									:maxlength="20"
									label="First Name"
									type="text"/>
							</div>
							<div class="slds-col slds-size_1-of-2">
								<FormField 
									v-model="localProspect.lastName"
									:maxlength="20"
									:required="true"
									label="Last Name"
									type="text"/>
							</div>
						</div>
						<div class="slds-form-element__row slds-col slds-size_1-of-1">
							<div class="slds-col slds-size_1-of-2">
								<FormField 
									v-model="localProspect.phone"
									:maxlength="20"
									:filter="$options.filters.phone"
									label="Phone"
									type="phone"
									pattern="\(\d{3}\)\s\d{3}-\d{4}"
								/>
							</div>
							<div class="slds-col slds-size_1-of-2">
								<FormField 
									v-model="localProspect.email"
									:maxlength="50"
									:required="true"
									label="Email"
									type="email"
									pattern="[a-z0-9!'*+/=?^_`{|}~-]+(?:\.[a-z0-9!'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"/>
							</div>
						</div>
						<div class="slds-form-element__row slds-col slds-size_1-of-1">
							<div class="slds-col slds-size_1-of-2">
								<FormField 
									v-model="localProspect.occupation"
									:maxlength="20"
									:required="true"
									label="Occupation"
									type="text"/>
							</div>
						</div>
					</div>
				</fieldset>
			</div>
		</Form>

		<NavBar 
			@click-prev="$router.push('/')" 
			@click-next="$root.$emit('trigger-submit', { formId: 'prospect-form' })"/>

	</div>
</template>

<script>
import Header from '~/components/Header.vue'
import Form from '~/components/Form.vue'
import FormField from '~/components/FormField.vue'
import NavBar from '~/components/NavBar.vue'
import { mapActions } from 'vuex'
import types from '~/store/types'
import services from '~/services/'

export default {
	components: {
		Header,
		Form,
		FormField,
		NavBar
	},

	async asyncData({ store, params }) {
		const prospect = await store.dispatch(
			`${types.prospect.prefix}/${types.prospect.action.FETCH_PROSPECT}`,
			params.id
		)

		return { prospect }
	},

	data: function() {
		return {
			title: 'Add Prospect',
			testValue: 'My test Value',
			debug: true,
			localProspect: Object.assign(
				{},
				this.$store.state.prospect.prospect
			)
		}
	},

	methods: {
		saveProspect: async function() {
			try {
				const result = await this.$store.dispatch(
					`${types.prospect.prefix}/${
						types.prospect.action.SAVE_PROSPECT
					}`,
					this.localProspect
				)

				this.$router.push({
					name: 'index',
					params: { command: result.command }
				})
			} catch (err) {
				console.error(err)
			}
		}
	}
}
</script>
