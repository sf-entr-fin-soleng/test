<template>
	<section class="cFamilyTreeInputForm">

		<!-- Header -->
		<Header title="Family Tree"/>

		<!-- Deletion confirmation modal -->
		<modal 
			ref="delete-modal"
			@confirm="deleteNode">
			Are you sure you want to remove this node? The deletion of this
			record will also delete any dependent records such as children,
			externals, or family members that are associated with it.
		</modal>

		<!-- Debug pres -->
		<pre v-if="debug">PATH: {{ path }}</pre>
		<pre v-if="debug">NODE: {{ node }}</pre>
		<pre v-if="debug">RELATED_TO: {{ relatedTo }}</pre>
		<pre v-if="debug">PARAMS: {{ params }}</pre>
		<pre v-if="debug">STORE: {{ $store.state.familyTree.tree }}</pre>

		<!-- Body -->
		<div class="family-tree_header slds-size_12-of-12 slds_grid-align-center">
			<div class="questionnaire-header slds-col slds-size_12-of-12 slds_grid-align-center">
				<h2 class="slds-text-align_center">Adding a Family Member</h2>
				<div/>
			</div>
		</div>

		<div class="slds-grid slds-wrap slds-size_12-of-12">
			<div
				class="family-tree-form__add-picture-container slds-align_absolute-center slds-m-vertical_medium"
			>
				<div class="family-tree-form__add-picture"/>
				<div class="family-tree-form__add-plus slds-align_absolute-center">
					<span 
						class="slds-icon_container slds-icon-utility-announcement" 
						title="Description of icon when needed">
						<img 
							class="slds-icon slds-icon-text-default" 
							aria-hidden="true"
							src="~/assets/images/icons/plus-icon.svg">
						<span class="slds-assistive-text">Description of icon when needed</span>
					</span>
				</div>
			</div>
		</div>

		<div
			class="slds-grid slds-wrap slds-size_12-of-12 slds-grid_align-center igforms-utils__max-width--large"
		>
			<Form 
				id="node-form" 
				@form-submit="saveNode">
				<div
					class="igforms-client-details slds-col slds-size_1-of-1 slds-form slds-form_compound cFormValidator"
				>
					<fieldset class="slds-form-element">
						<div
							class="slds-form-element__group slds-grid slds-col slds-gutters slds-wrap slds-size_10-of-12 slds-grid_align-center"
						>
							<div class="slds-form-element__row slds-col slds-size_1-of-1">
								<div class="slds-col slds-size_1-of-2">
									<form-field
										v-model="node.firstName"
										label="First Name"
										required="true"
										type="text"
										maxlength="30"
									/>
								</div>
								<div class="slds-col slds-size_1-of-2">
									<form-field 
										v-model="node.lastName" 
										label="Last Name" 
										required="true"/>
								</div>
							</div>
							<div class="slds-form-element__row slds-col slds-size_1-of-1">
								<!-- Relationship picklist-->
								<div class="slds-col slds-size_1-of-2">
									<form-field
										v-model="node.relationship"
										root-type="select"
										label="Relationship"
										required
									>
										<option
											:selected="node.relationship.label === undefined"
											value
										>Select relationship type</option>
										<option
											v-for="relationship in relationships"
											v-if="relationship.type === params.filter"
											:key="relationship.label"
											:value="JSON.stringify(relationship)"
											:selected="node.relationship.label === relationship.label"
										>{{ relationship.label }}</option>
									</form-field>
								</div>

								<!-- Related to picklist-->
								<div class="slds-col slds-size_1-of-2">
									<form-field
										v-if="params.filter !== 'partner'"
										v-model="path"
										root-type="select"
										label="Related To"
										required
									>
										<option
											v-for="option in relatedTo"
											v-if="((`${option.label}` !== `${node.firstName} ${node.lastName}`) && 
											(option.type === 'all' || option.type.includes(params.filter)))"
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
								</div>

								<div 
									v-if="showBirthday" 
									class="slds-col slds-size_1-of-4">
									<form-field 
										v-model="node.birthdate" 
										label="Birthday" 
										required="true" 
										type="date"/>
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
						</div>
					</fieldset>
				</div>

				<div
					id="accordion"
					class="igforms-client-details slds-col slds-size_1-of-1 slds-form slds-form_compound cFormValidator"
				>
					<fieldset class="slds-form-element">
						<div
							class="slds-form-element__group slds-grid slds-col slds-gutters slds-wrap slds-size_10-of-12 slds-grid_align-center"
						>
							<div class="slds-form-element__row slds-col slds-size_1-of-1">
								<div class="slds-col slds-size_1-of-1">
									<legend
										class="family-tree-form_legend slds-form-element__label slds-form-element__legend slds-p-top_medium"
										onclick="{!c.OnToggleAccordion}"
										data-toggle="accordion"
									>
										Additional Details
										<span>(Optional)</span>

										<!-- <lightning:icon 
											icon-name="utility:chevrondown" 
                    						alternative-text="Connected" />-->
									</legend>
								</div>
							</div>
							<div class="slds-form-element__row slds-col slds-size_1-of-1">
								<div class="slds-col slds-size_1-of-2">
									<form-field
										v-model="node.phone"
										label="Phone Number"
										type="tel"
										formatter="phone"
										pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
									/>
								</div>
								<div class="slds-col slds-size_1-of-2">
									<form-field
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
										<legend class="slds-form-element__legend">Beneficiary</legend>
										<form-field
											v-model="node.beneficiary"
											:checked="node.beneficiary"
											type="checkbox"
											label="Yes, include as beneficiary"
										/>
									</fieldset>
								</div>
								<div class="slds-col slds-size_1-of-2">
									<form-field 
										v-model="node.status" 
										root-type="select" 
										label="Status">
										<option 
											value 
											label="Select an option...">Select an option...</option>
										<option
											v-for="(option, index) in status"
											:key="index"
											:value="option.value"
											:selected="option.value == node.status"
										>{{ option.label }}</option>
									</form-field>
								</div>
							</div>
						</div>
					</fieldset>
				</div>
			</Form>

			<NavBar
				:actions="navBarActions"
				:display-actions="true"
				@click-prev="$router.push('/family-tree/' + $store.state.prospect.prospect.id)"
				@click-next="$root.$emit('trigger-submit', { formId: 'node-form' })"
			/>
		</div>
	</section>
</template>

<script>
import Header from '~/components/Header.vue'
import Form from '~/components/Form.vue'
import FormField from '~/components/FormField.vue'
import NavBar from '~/components/NavBar.vue'
import Modal from '~/components/Modal.vue'
import moment from 'moment'
import { get } from 'lodash'

export default {
	components: {
		Header,
		Form,
		FormField,
		NavBar,
		Modal
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
		const path = `${root}${sub ? `.${sub}` : ''}${
			index !== undefined ? `.${index}` : ''
		}`

		// Client node model
		let node = {
			status: {},
			relationship: {}
		}

		// Make sure root and action are specified
		if (!root || !action) {
			this.$router.push('/')
		}
		// Else just fetch the node from the family
		// tree and combine with our base model
		else if (root && action === 'edit') {
			const treeNode = get(this.$store.state.familyTree.tree, path)
			if (treeNode) node = Object.assign(node, treeNode)
		}

		return {
			debug: false,
			params: { ...this.$route.params },
			node,
			path,
			showBirthday: false,

			// Provide labels and handlers
			// for the NavBar quick actions
			// Use () => notation so that
			// scope binding is correct
			navBarActions: [
				{
					label: 'Cancel',
					go: () => {
						this.$router.push('/')
					}
				},
				{
					label: 'Delete',
					go: () => {
						this.$refs['delete-modal'].show()
					}
				}
			]
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
				// Parents
				{ label: 'Mother', gender: 'Female', type: 'parents' },
				{ label: 'Father', gender: 'Male', type: 'parents' },
				{
					label: 'Parent - Not Specified',
					gender: 'Other',
					type: 'parents'
				},

				// Children / Grandchildren
				{ label: 'Daughter', gender: 'Female', type: 'children' },
				{ label: 'Son', gender: 'Male', type: 'children' },
				{
					label: 'Child - Not Specified',
					gender: 'Other',
					type: 'children'
				},
				{ label: 'Grandaughter', gender: 'Female', type: 'children' },
				{ label: 'Grandson', gender: 'Male', type: 'children' },
				{
					label: 'Grandchild - Not Specified',
					gender: 'Other',
					type: 'children'
				},

				// Partner
				{ label: 'Wife', gender: 'Female', type: 'partner' },
				{ label: 'Husband', gender: 'Male', type: 'partner' },
				{ label: 'Fiance', gender: 'Other', type: 'partner' },
				{ label: 'Spouse', gender: 'Other', type: 'partner' },
				{
					label: 'Partner - Not Specified',
					gender: 'Other',
					type: 'partner'
				},

				// Family
				{ label: 'Uncle', gender: 'Male', type: 'family' },
				{ label: 'Aunt', gender: 'Female', type: 'family' },
				{ label: 'Cousin', gender: 'Other', type: 'family' },
				{ label: 'Brother-In-Law', gender: 'Male', type: 'family' },
				{ label: 'Siste-In-Law', gender: 'Female', type: 'family' },
				{ label: 'In-Law', gender: 'Other', type: 'family' },

				// Externals
				{ label: 'Lawyer', gender: 'Other', type: 'externals' },
				{ label: 'Accountant', gender: 'Other', type: 'externals' },
				{
					label: 'Business Partner',
					gender: 'Other',
					type: 'externals'
				},
				{ label: 'Other', gender: 'Other', type: 'externals' }
			]
		},

		relatedTo: function() {
			const arr = []
			const tree = this.$store.state.familyTree.tree
			const filter = this.params.filter
			const relatedTo = this.params.path

			// Main tree keys
			const keys = {
				self: 'self',
				partner: 'partner',
				both: 'both'
			}

			// This is a map so that the client knows which
			// options to display in the 'relatedTo'picklist,
			// linking the node back to the tree correctly
			const mapping = {
				[keys.self]: 'all',
				[keys.partner]: 'all',
				[keys.both]: 'externals/children'
			}

			// Iterate through each key
			for (let key in keys) {
				const main = tree[key]
				if (main && main.lastName) {
					arr.push({
						label: `${main.firstName} ${main.lastName}`,
						path: `${key}${
							this.params.filter ? `.${this.params.filter}` : ''
						}${
							this.params.index !== undefined
								? `.${this.params.index}`
								: ''
						}`,
						type: mapping[key]
					})

					// If the node has children, only display them
					// whenever the filter is also 'children'
					// (this ensures we can add grandchildren)
					if (main.children && this.params.filter === 'children') {
						main.children.forEach((child, index) => {
							arr.push({
								label: `${child.firstName} ${child.lastName}`,
								path: `${key}.children.${index}.children`,
								type: mapping[key]
							})
						})
					}
				}
			}

			return arr
		}
	},

	watch: {
		showBirthday: function() {
			// Calculate birthday/age based on
			// which attribute the user has selected
			let birthdate = moment(this.node.birthdate)
			let age = this.node.age

			if (this.showBirthday && age) {
				birthdate = moment().subtract(age, 'years')
				this.node.birthdate = birthdate.format('YYYY-MM-DD')
			} else if (birthdate.isValid()) {
				age = moment().diff(birthdate, 'years')
				this.node.age = age
			}
		}
	},

	methods: {
		saveNode: async function(something) {
			// Rebuild old path
			const fromPath = `${this.params.root}${
				this.params.sub ? `.${this.params.sub}` : ''
			}${this.params.index !== undefined ? `.${this.params.index}` : ''}`

			// Has the node been assigned to a different part of the tree?
			const changedPath = fromPath != this.path

			// If paths have diverged...
			if (this.params.action === 'edit' && changedPath) {
				// ...delete old node reference
				this.$store.dispatch('familyTree/writeNode', {
					path: fromPath,
					node: this.node,
					isDelete: true,
					changedPath
				})
			}

			// Save node reference
			this.$store.dispatch('familyTree/writeNode', {
				path: this.path,
				node: this.node,
				changedPath
			})

			// Write result back to the server
			const result = await this.$store.dispatch(
				'familyTree/writeTree',
				this.prospect.id
			)

			// Go back to family tree overview
			this.$router.push('/family-tree/' + this.prospect.id)
		},

		deleteNode: async function() {
			// Fetch node's path as provided by the tree component
			const fromPath = `${this.params.root}${
				this.params.sub ? `.${this.params.sub}` : ''
			}${this.params.index !== undefined ? `.${this.params.index}` : ''}`

			// Delete that specific node
			this.$store.dispatch('familyTree/writeNode', {
				path: fromPath,
				isDelete: true
			})

			// Save the result back to the server
			const result = await this.$store.dispatch(
				'familyTree/writeTree',
				this.prospect.id
			)

			// Return to family-tree overview
			this.$router.push('/family-tree/' + this.prospect.id)
		}
	}
}
</script>
