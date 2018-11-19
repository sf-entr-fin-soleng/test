<template>
	<section class="cFamilyTreeInputForm">
		<Header title="Family Tree"/>
		<pre v-if="debug">{{ $route.params }}</pre>
		<pre v-if="debug">{{ familyTree }}</pre>
		<pre v-if="debug">{{ prospect }}</pre>
		<pre v-if="debug">{{ node }}</pre>

		<div class="family-tree_header slds-size_12-of-12 slds_grid-align-center">
			<div class="questionnaire-header slds-col slds-size_12-of-12 slds_grid-align-center">
				<h2 class="slds-text-align_center">Adding a Family Member</h2>
				<div/>
			</div>
		</div>

		<div class="slds-grid slds-wrap slds-size_12-of-12">
			<div class="family-tree-form__add-picture-container slds-align_absolute-center slds-m-vertical_medium">
				<div class="family-tree-form__add-picture"/>
				<div class="family-tree-form__add-plus slds-align_absolute-center">
					<!-- <lightning:icon 
						icon-name="utility:add" 
						alternative-text="plus icon" 
						size="xx-small" 
						variant="inverse" /> -->
				</div>
			</div>
		</div>


		<div class="slds-grid slds-wrap slds-size_12-of-12 slds-grid_align-center igforms-utils__max-width--large">
			<Form 
				id="node-form"
				@form-submit="saveNode">
				<div class="igforms-client-details slds-col slds-size_1-of-1 slds-form slds-form_compound cFormValidator">
					<fieldset class="slds-form-element">
						<div class="slds-form-element__group slds-grid slds-col slds-gutters slds-wrap slds-size_10-of-12 slds-grid_align-center">
							<div class="slds-form-element__row slds-col slds-size_1-of-1">
								<div class="slds-col slds-size_1-of-2">
									<FormField 
										v-model="node.firstName" 
										label="First Name" 
										required="true" 
										type="text" 
										maxlength="30" />
								</div>
								<div class="slds-col slds-size_1-of-2">
									<FormField 
										v-model="node.lastName" 
										label="Last Name" 
										required="true" 
									/>
								</div>
							</div>
							<div class="slds-form-element__row slds-col slds-size_1-of-1">
								<!-- Relationship picklist-->
								<div class="slds-col slds-size_1-of-2">
									<form-field
										v-model="node.relationship"
										root-type="select" 
										label="Relationship"
										required>
		
										<option
											:selected="node.relationship.label === undefined" 
											value=""> Select relationship type </option>
										<option 
											v-for="relationship in relationships"
											v-if="relationship.type === filter"
											:key="relationship.label"
											:value="JSON.stringify(relationship)" 
											:selected="node.relationship.label === relationship.label">{{ relationship.label }}</option>

									</form-field>
								</div>

								<!-- Related to picklist-->
								<div class="slds-col slds-size_1-of-2">
									<!-- <lightning:select 
										aura:id="form1-field" 
										disabled="{!v.info.filter.relationship == 'partner'}" 
										required="true" 
										label="Related To" 
										value="{!v.node.relatedTo}">
										<option 
											text="Select family member..." 
											value="" 
											selected="{!v.relatedTo.selectedOptionIndex == ''}" />
										<aura:iteration 
											items="{!v.relatedTo}" 
											var="option" 
											index-var="index">
											<option 
												text="{!option.label}" 
												value="{!option.value}" 
												selected="{!option.value == v.node.relatedTo}" />
										</aura:iteration>
									</lightning:select> -->
								</div>
							</div>

							<div class="slds-form-element__row slds-col slds-size_1-of-1">
								<div class="slds-col slds-size_1-of-4">
									<!-- <lightning:select 
										aura:id="form1-field" 
										label="Birthday or Age" 
										value="{!v.showBirthday}">
										<option 
											text="Birthday" 
											value="true" />
										<option 
											text="Age" 
											value="false" />
									</lightning:select> -->
								</div>
	
								<div 
									v-if="true"
									class="slds-col slds-size_1-of-4">
									<FormField 
										v-model="node.birthdate" 
										label="Birthday" 
										required="true" 
										type="date" 
									/>
								</div>
								<div 
									v-else 
									class="slds-col slds-size_1-of-4">
									<FormField 
										v-model="node.age" 
										label="Age" 
										required="true" 
										type="number" 
										min="0" 
										max="200" 
									/>
								</div>
							</div>
					</div></fieldset>
				</div>


				<div 
					id="accordion" 
					class="igforms-client-details slds-col slds-size_1-of-1 slds-form slds-form_compound cFormValidator">
					<fieldset class="slds-form-element">
						<div class="slds-form-element__group slds-grid slds-col slds-gutters slds-wrap slds-size_10-of-12 slds-grid_align-center">
							<div class="slds-form-element__row slds-col slds-size_1-of-1">
								<div class="slds-col slds-size_1-of-1">
									<legend 
										class="family-tree-form_legend slds-form-element__label slds-form-element__legend slds-p-top_medium" 
										onclick="{!c.OnToggleAccordion}"
										data-toggle="accordion">
										Additional Details 
										<span>(Optional)</span>

										<!-- <lightning:icon 
											icon-name="utility:chevrondown" 
											alternative-text="Connected" /> -->
									</legend>
								</div>
							</div>
							<div class="slds-form-element__row slds-col slds-size_1-of-1">
								<div class="slds-col slds-size_1-of-2">
									<FormField 
										v-model="node.phone" 
										label="Phone Number" 
										type="tel" 
										formatter="phone"
										pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
								</div>
								<div class="slds-col slds-size_1-of-2">
									<FormField 
										v-model="node.email" 
										label="Email" 
										type="email" 
										pattern="[a-z0-9!'*+/=?^_`{|}~-]+(?:\.[a-z0-9!'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
									/>
								</div>
							</div>
							<div class="slds-form-element__row slds-col slds-size_1-of-1">
								<div class="slds-col slds-size_1-of-1">
									<!-- <lightning:textarea 
										value="{!v.node.notes}" 
										name="input3" 
										label="{!v.legend}" 
										placeholder="Add Notes" 
										class="textarea" /> -->
								</div>
							</div>
							<div class="slds-form-element__row slds-col slds-size_1-of-1">
								<div class="slds-col slds-size_1-of-2">
									<fieldset class="slds-form-element">
										<legend class="slds-form-element__legend">
											Beneficiary
										</legend>
										<FormField 
											v-model="node.beneficiary"
											:checked="node.beneficiary"
											type="checkbox" 
											label="Yes, include as beneficiary" />
									</fieldset>
								</div>
								<div class="slds-col slds-size_1-of-2">
									
									<!-- TODO: Put status field here -->
								</div>
							</div>
						</div>
					</fieldset>
				</div>
			</Form>


			<NavBar 
				@click-prev="$router.push(-1)" 
				@click-next="$root.$emit('trigger-submit', { formId: 'node-form' })"/>
		</div>
	</section>
</template>

<script>
import Header from '~/components/Header.vue'
import Form from '~/components/Form.vue'
import FormField from '~/components/FormField.vue'
import NavBar from '~/components/NavBar.vue'

import { get } from 'lodash'

export default {
	components: {
		Header,
		Form,
		FormField,
		NavBar
	},

	asyncData: async function({ store, params }) {
		await store.dispatch('prospect/fetchProspect', params.id)
		await store.dispatch(
			'familyTree/fetchTree',
			store.state.prospect.prospect.id
		)
	},

	data: function() {
		let { id, action, path, filter } = {
			...this.$route.params
		}

		let node = {
			status: {},
			relationship: {}
		}

		if (action !== 'new' && path) {
			const treeNode = get(this.$store.state.familyTree.tree, path)
			if (treeNode) node = Object.assign(node, treeNode)
		} else if (!path) {
			this.$router.push('/')
		}

		const status = [
			{ label: 'Deceased', type: 'deceased' },
			{ label: 'Excomunicated', type: 'off' }
		]

		const relationships = [
			{ label: 'Mother', gender: 'Female', type: 'parent' },
			{ label: 'Father', gender: 'Male', type: 'parent' },
			{
				label: 'Parent - Not Specified',
				gender: 'Other',
				type: 'parent'
			},
			{ label: 'Daughter', gender: 'Female', type: 'child' },
			{ label: 'Son', gender: 'Male', type: 'child' },
			{ label: 'Child - Not Specified', gender: 'Other', type: 'child' },
			{ label: 'Grandaughter', gender: 'Female', type: 'grandchild' },
			{ label: 'Grandson', gender: 'Male', type: 'grandchild' },
			{
				label: 'Grandchild - Not Specified',
				gender: 'Other',
				type: 'grandchild'
			},
			{ label: 'Wife', gender: 'Female', type: 'partner' },
			{ label: 'Husband', gender: 'Male', type: 'partner' },
			{ label: 'Fiance', gender: 'Other', type: 'partner' },
			{ label: 'Spouse', gender: 'Other', type: 'partner' }
		]

		return {
			debug: true,
			relationships,
			status,
			filter: filter ? filter : 'partner',
			node,
			path
		}
	},

	computed: {
		familyTree: function() {
			return this.$store.state.familyTree.tree
		},

		prospect: function() {
			return this.$store.state.prospect.prospect
		}
	},

	methods: {
		saveNode: async function(something) {
			this.$store.dispatch('familyTree/writeNode', {
				path: this.path,
				node: this.node
			})

			const result = await this.$store.dispatch(
				'familyTree/writeTree',
				this.$store.state.prospect.prospect.id
			)

			this.$router.push(-1)
		}
	}
}
</script>
