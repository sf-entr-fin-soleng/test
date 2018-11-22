<template>
	<section class="cFamilyTreeInputForm">
		<Header title="Family Tree"/>
		<pre v-if="debug">{{ node }}</pre>
		<pre v-if="debug">{{ relatedTo }}</pre>
		<pre v-if="debug">{{ params }}</pre>
		<pre v-if="debug">{{ $store.state.familyTree.tree }}</pre>

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
											v-if="relationship.type === params.filter"
											:key="relationship.label"
											:value="JSON.stringify(relationship)" 
											:selected="node.relationship.label === relationship.label">{{ relationship.label }}</option>

									</form-field>
								</div>

								<!-- Related to picklist-->
								<div class="slds-col slds-size_1-of-2">
									<form-field
										v-model="params.path"
										root-type="select" 
										label="Related To"
										required>
										<option 
											v-for="option in relatedTo"
											:key="option.path"
											:value="option.path" 
										>{{ option.label }}</option>

									</form-field>
								</div>
							</div>

							<div class="slds-form-element__row slds-col slds-size_1-of-1">
								<div class="slds-col slds-size_1-of-4">
									<form-field
										v-model="showBirthday"
										root-type="select">
										<option value="true">Birthday</option>
										<option value="false">Age</option>
									</form-field>
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
									v-if="showBirthday"
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
									<form-field 
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
									<form-field
										v-model="node.notes"
										root-type="textarea"
										label="Notes"
										placeholder="Add notes..."
									/>
								</div>
							</div>
							<div class="slds-form-element__row slds-col slds-size_1-of-1">
								<div class="slds-col slds-size_1-of-2">
									<fieldset class="slds-form-element">
										<legend class="slds-form-element__legend">
											Beneficiary
										</legend>
										<form-field 
											v-model="node.beneficiary"
											:checked="node.beneficiary"
											type="checkbox" 
											label="Yes, include as beneficiary" />
									</fieldset>
								</div>
								<div class="slds-col slds-size_1-of-2">
									<form-field
										v-model="node.status"
										root-type="select"
										label="Status"
									>
										<option 
											value="" 
											label="Select an option...">Select an option...</option>
										<option 
											v-for="(option, index) in status" 
											:key="index" 
											:value="option.value"
											:selected="option.value == node.status">{{ option.label }}</option>
									</form-field>
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
		// Fetch prospect from id parameter and also
		// fetch the corresponding family tree
		await store.dispatch('prospect/fetchProspect', params.id)
		await store.dispatch(
			'familyTree/fetchTree',
			store.state.prospect.prospect.id
		)

		// Any node that is/should be a prospect
		// needs to be specified here so both the
		// tree and prospect information match
		await store.dispatch('familyTree/assignProspects', [
			{ prospect: store.state.prospect.prospect, path: 'self' }
		])
	},

	data: function() {
		// Route parameters
		let { id, action, root, sub, filter, index } = {
			...this.$route.params
		}

		// Construct path from parameters
		const path = `${root}.${sub}${index !== undefined ? `.${index}` : ''}`

		// Client node model
		let node = {
			status: {},
			relationship: {}
		}

		// If this is a new node, but no path has been
		// specified by the previous page, return
		if (action !== 'new' && (!root || !sub)) {
			this.$router.push('/')
		}
		// Else just fetch the node from the family
		// tree and combine with our base model
		else if (root && sub) {
			const treeNode = get(this.$store.state.familyTree.tree, path)
			if (treeNode) node = Object.assign(node, treeNode)
		}

		return {
			debug: true,
			params: { ...this.$route.params },
			node,
			path,
			showBirthday: false
		}
	},

	computed: {
		familyTree: function() {
			return this.$store.state.familyTree.tree
		},

		prospect: function() {
			return this.$store.state.prospect.prospect
		},

		status: function() {
			return [
				{ label: 'Deceased', value: 'deceased' },
				{ label: 'Excomunicated', value: 'off' }
			]
		},

		relationships: function() {
			return [
				{ label: 'Mother', gender: 'Female', type: 'parents' },
				{ label: 'Father', gender: 'Male', type: 'parents' },
				{
					label: 'Parent - Not Specified',
					gender: 'Other',
					type: 'parents'
				},
				{ label: 'Daughter', gender: 'Female', type: 'child' },
				{ label: 'Son', gender: 'Male', type: 'child' },
				{
					label: 'Child - Not Specified',
					gender: 'Other',
					type: 'child'
				},
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
		},

		relatedTo: function() {
			const arr = []
			const tree = this.$store.state.familyTree.tree
			const filter = this.params.filter
			const relatedTo = this.params.path

			const keys = {
				self: 'self',
				partner: 'partner',
				both: 'both'
			}

			const mapping = {
				[keys.self]: 'all',
				[keys.partner]: 'all',
				[keys.both]: 'external/child'
			}

			for (let key in keys) {
				const main = tree[key]
				if (main) {
					arr.push({
						label: `${main.firstName} ${main.lastName}`,
						path: `${key}.${this.params.filter}.${
							this.params.index
						}`,
						type: mapping[key]
					})
				}
			}

			if (filter === 'children') {
				for (let key in tree) {
					const node = tree[key]
					if (node.children) {
						node.children.forEach((child, index) => {
							arr.push({
								label: `${both.firstName} ${both.lastName}`,
								path: `${key}.children.${index}`,
								type: 'children'
							})
						})
					}
				}
			}

			return arr
		}
	},

	methods: {
		saveNode: async function(something) {
			console.log(this.path)

			this.$store.dispatch('familyTree/writeNode', {
				path: this.path,
				node: this.node
			})

			const result = await this.$store.dispatch(
				'familyTree/writeTree',
				this.prospect.id
			)

			this.$router.push('/family-tree/' + this.prospect.id)
		}
	}
}
</script>
