<template>
	<div 
		id="content" 
		class="cFamilyTreeOverview"
	>
		<pre v-if="debug">{{ familyTree }}</pre>
		<Header :title="title"/>

		<!-- Main Family Tree Div -->
		<div class="family-tree_page slds-grid slds-size_1-of-1 slds-wrap slds-grid_align-center">
			
			<!-- Header -->
			<section 
				v-if="!shouldDisplay('parents') && !shouldDisplay('children') 
				&& !shouldDisplay('family') && !shouldDisplay('externals')">
				<div class="family-tree_header slds-size_12-of-12 slds_grid-align-center">
					<div class="questionnaire-header slds-col slds-size_12-of-12 slds_grid-align-center">
						<h2 class="slds-text-align_center">Building Your Family Tree</h2>
						<div/>
					</div>
				</div>

				<!-- Header paragraph -->
				<div class="slds-grid slds-size_1-of-1 slds-grid_align-center">
					<div class="family-tree_intro slds-grid slds-col slds-wrap slds-size_8-of-12 slds-grid_align-center igforms-utils__max-width--large">
						<div class="slds-col slds-text-align_center slds-p-horizontal_medium">
							<p>
								Your Family Tree consists of more than immediate family. It encapsulates all of the key
								players
								in your financial life. Knowing
								this allows for a more complete picture when it comes to understanding and planning your
								financials.
							</p>
						</div>
					</div>
				</div>
			</section>

			<!-- Parents section -->
			<div 
				v-if="shouldDisplay('parents')" 
				class="family-tree_member-cols slds-grid slds-col slds-gutters slds-wrap slds-grid_align-center slds-size_12-of-12">
				<div class="slds-grid slds-col slds-size_1-of-1 slds-grid_align-center slds-wrap igforms-utils__max-width--large">
					<!-- For each main key with defined parents -->
					<div 
						v-for="(value, key) in familyTree"
						v-if="familyTree[key] && familyTree[key].parents && familyTree[key].parents.length >= 0"
						:key="key" 
						class="slds-grid slds-col slds-wrap slds-large-size_6-of-12 slds-medium-size_6-of-12 slds-small-size_1-of-1">
						<div class="slds-col slds-medium-size_1-of-1">
							<p class="family-tree_relation">
								{{ familyTree[key].firstName }}'s Parents
							</p>
						</div>

						<!-- Display parent node -->
						<div 
							v-for="parent in familyTree[key].parents" 
							:key="parent.lastName"
							class="slds-col slds-medium-size_1-of-2 slds-small-size_1-of-1">
							<a 
								href="#">
								<div class="family-tree_member-container">
									<div class="family-tree-member_letter-container">

										<div class="family-tree-member_letter_icon slds-align_absolute-center">
											<p>{{ parent.firstName[0] }}</p>
										</div>

									</div>
									<div class="family-tree-member_name-age-container">
										<p class="family-tree-member_name-age">
											{!item.firstName}&nbsp;
											<span>({!item.age})</span>
										</p>
										<p class="family-tree-member_label">({!item.relationship})</p>
									</div>
								</div>
							</a>
						</div>
	
						<!-- Add parents button section -->
						<div class="slds-col slds-medium-size_1-of-1 family-tree_add-member">
							<div>
								<a 
									href="#">
									<button class="slds-button slds-button_neutral">
										<img 
											src="{!$Resource.formspatternlib + '/formspatternlib/images/icons/plus-icon.svg'}"
											alternativeText="plus" 
											class="slds-p-right_x-small" >Parent
									</button>
									<p>Include all parents for {!v.shared.contact.firstName}</p>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div 
				v-else 
				class="family-tree_add-member_section-extra family-member-parent slds-grid slds-col slds-wrap slds-size_9-of-12 igforms-utils__max-width--large">
				<div class="family-tree_add-member slds-col slds-size_1-of-1">
					<div>
						<nuxt-link 
							:to="{name:'family-tree-id-node', params: { key: 'parents', relatedTo: 'self' }}">
							<button class="slds-button slds-button_neutral">
								<img 
									src="{!$Resource.formspatternlib + '/formspatternlib/images/icons/plus-icon.svg'}"
									alternativeText="plus" 
									class="slds-p-right_x-small" >Parent
							</button>
							<p>Include all parents</p>
						</nuxt-link>
					</div>
				</div>
			</div>

			<!-- Main section -->
			<div class="family-tree_clients slds-grid slds-col slds-size_1-of-1 slds-grid_align-center">
				<div class="slds-grid slds-col slds-size_9-of-12 slds-grid_align-center slds-wrap igforms-utils__max-width--large">
					<div class="family-tree_clients-picture-container">
						<!-- Node's first letter, firstName, and age -->
						<a 
							v-for="(value, key) in familyTree"
							v-if="familyTree[key] !== undefined && familyTree[key].firstName !== undefined"
							:key="key" 
							href="#">
							<div class="family-tree_clients-picture-border">
								<div class="family-tree_clients-picture slds-align_absolute-center">
									<p>{{ familyTree[key].firstName[0] }}</p>
								</div>
							</div>
							<p class="family-tree-member_name-age">
								{{ familyTree[key].firstName }}&nbsp;
								<span>({{ familyTree[key].age }})</span>
							</p>
						</a>
					</div>
				</div>
			</div>

			<!-- Children section -->
			<div 
				v-if="shouldDisplay('children')" 
				class="family-tree_member-cols slds-grid slds-col slds-gutters slds-wrap slds-grid_align-center slds-size_12-of-12">
				<div class="slds-grid slds-grid_align-center slds-wrap slds-size_1-of-1 igforms-utils__max-width--large">
					<div 
						v-for="(value, key) in familyTree"
						v-if="familyTree[key].children && familyTree[key].children.length >= 0"
						:key="key" 
						class="slds-col slds-large-size_4-of-12 slds-medium-size_1-of-3 slds-small-size_1-of-1">
						<div class="slds-col slds-size_1-of-1">
							<p class="family-tree_relation">
								<span v-if="familyTree[key].firstName">{{ familyTree[key].firstName }}'s OSM</span>
								<span v-else>Common</span>
								<span>Children</span>
							</p>

							<a 
								v-for="(child, index) in familyTree[key].children"
								:key="index"
								href="#">
								<div class="family-tree_member-container">
									<div class="family-tree-member_letter-container">
										<div class="family-tree-member_letter_icon slds-align_absolute-center">
											<p>{{ child.firstName[0] }}</p>
											<!-- <img 
												src="{!$Resource.formspatternlib + '/formspatternlib/images/familytree-spouse-icon.svg'}"
												alternativeText="spouse icon" 
												class="spouse-icon  info-icon" >
											<img 
												src="{!$Resource.formspatternlib + '/formspatternlib/images/familytree-beneficiary-icon.svg'}"
												alternativeText="beneficiary icon" 
												class="beneficiary-icon info-icon" > -->
										</div>
									</div>
									<div class="family-tree-member_name-age-container">
										<p class="family-tree-member_name-age">
											{{ child.firstName }}&nbsp;
											<span>({!item.age})</span>
										</p>
										<p class="family-tree-member_label">({!item.relationship} OSM)</p>
									</div>
								</div>
							</a>

							<!-- Loop through each grandchild start-->
							<a href="#">
								<div class="family-tree_member-container">
									<div class="family-tree-member_letter-container">
										<div class="family-tree-member_grandchild">
											<img 
												src="{!$Resource.formspatternlib + '/formspatternlib/images/familytree-beneficiary-icon.svg'}"
												alternativeText="beneficiary icon" 
												class="beneficiary-icon info-icon" >
										</div>
									</div>

									<div class="family-tree-member_name-age-container">
										<p class="family-tree-member_name-age">
											{!grandchild.firstName}&nbsp;
											<span>({!grandchild.age})</span>
										</p>
										<p class="family-tree-member_label">({!grandchild.relationship})</p>
									</div>
								</div>
							</a>
							<!-- Loop through each grandchild end -->

							<!-- Add children -->
							<div class="family-tree_add-member">
								<a href="#">
									<button class="slds-button slds-button_neutral">
										<img 
											src="{!$Resource.formspatternlib + '/formspatternlib/images/icons/plus-icon.svg'}"
											alternativeText="plus" 
											class="slds-p-right_x-small" >Child
									</button>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div 
				v-else 
				class="family-tree_add-member_section-extra family-member-parent slds-grid slds-col slds-wrap slds-size_9-of-12 igforms-utils__max-width--large">
				<div class="family-tree_add-member slds-col slds-size_1-of-1">
					<div>
						<a 
							href="#">
							<button class="slds-button slds-button_neutral">
								<img 
									src="{!$Resource.formspatternlib + '/formspatternlib/images/icons/plus-icon.svg'}"
									alternativeText="plus" 
									class="slds-p-right_x-small" >Child
							</button>
							<p>Include all children</p>
						</a>
					</div>
				</div>
			</div>

			<!-- Family members section -->
			<div 
				v-if="shouldDisplay('family')" 
				class="family-tree-accordion_container slds-grid slds-size_1-of-1 igforms-utils__outer-margin-blue">
				<div class="family-tree-accordion slds-grid slds-col slds-size_12-of-12 slds-form cFormValidator slds-grid_align-center igforms-utils__outer-margin-blue__inner">
					<fieldset class="slds-grid slds-col slds-grid_align-center slds-small-size_1-of-1 slds-medium-size_10-of-12 igforms-utils__max-width--large">
						<div class="slds-grid slds-col slds-gutters slds-wrap slds-grid_align-center">
							<div class="slds-grid slds-col slds-size_1-of-1 slds-grid_align-center slds-wrap">

								<!-- Loop thorugh each family member for self and partner -->
								<div 
									v-for="key in ['self', 'partner']"
									v-if="familyTree[key] && familyTree[key].family && familyTree[key].family.length > 0"
									:key="key"
									class="slds-col slds-small-size_1-of-1 slds-medium-size_1-of-2">
									<legend 
										class="family-tree-form_legend slds-form-element__label slds-form-element__legend"
									>
										{{ familyTree[key].firstName }}'s Family&nbsp;
									</legend>

									<div 
										v-for="member in familyTree[key].family"
										:key="member.firstName"
										class="slds-col slds-size_1-of-1">
										<a href="#">
											<div class="family-tree_accordion-member-block slds-clearfix">
												<div class="family-tree_accordion-icon-block slds-float_left slds-m-right_x-small">
													<img 
														src="{!$Resource.formspatternlib + '/formspatternlib/images/familytree-spouse-icon.svg'}"
														alternativeText="spouse icon" 
														class="spouse-icon  info-icon" >
													<img 
														src="{!$Resource.formspatternlib + '/formspatternlib/images/familytree-beneficiary-icon.svg'}"
														alternativeText="beneficiary icon" 
														class="beneficiary-icon info-icon" >
													<img 
														src="{!$Resource.formspatternlib + '/formspatternlib/images/familytree-kids-icon.svg'}"
														alternativeText="kids icon" 
														class="kids-icon info-icon" >
												</div>
												<div class="family-tree_accordion-details-block slds-float_left">
													<p class="family-tree-member_name-age">
														{{ member.firstName }}&nbsp;
														<span>({{ member.age }})</span>
													</p>
													<p class="family-tree-member_label">({{ member.relationship }})</p>
												</div>
											</div>
										</a>

										
									</div>
									<div class="family-tree_add-member slds-col slds-size_1-of-1">
										<div>
											<a 
												onclick="{!c.OnClickMember}" 
												data-relationship="family"
												data-path="family/new" 
												data-relatedTo="self">
												<button class="slds-button slds-button_neutral">
													<img 
														src="{!$Resource.formspatternlib + '/formspatternlib/images/icons/plus-icon.svg'}"
														alternativeText="plus" 
														class="slds-p-right_x-small" >Family
												</button>
												<p>Include all related family members</p>
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</fieldset>
				</div>
			</div>
			<div 
				v-else 
				class="family-tree_add-member_section-extra family-member-parent slds-grid slds-col slds-wrap slds-size_9-of-12 igforms-utils__max-width--large">
				<div class="family-tree_add-member slds-col slds-size_1-of-1">
					<div>
						<a 
							href="#">
							<button class="slds-button slds-button_neutral">
								<img 
									src="{!$Resource.formspatternlib + '/formspatternlib/images/icons/plus-icon.svg'}"
									alternativeText="plus" 
									class="slds-p-right_x-small" >Family
							</button>
							<p>Include all related family members</p>
						</a>
					</div>
				</div>
			</div>

			<!-- Loop through externals for self and partner, including
			externals listed under the 'both' key -->
			<div 
				v-if="shouldDisplay('externals')" 
				class="family-tree-accordion_container slds-grid slds-size_1-of-1 igforms-utils__outer-margin-blue">
				<div class="family-tree-accordion slds-grid slds-col slds-size_12-of-12 slds-form cFormValidator slds-grid_align-center igforms-utils__outer-margin-blue__inner">
					<fieldset class="slds-grid slds-col slds-grid_align-center slds-small-size_1-of-1 slds-medium-size_10-of-12 igforms-utils__max-width--large">
						<div class="slds-grid slds-col slds-gutters slds-wrap slds-grid_align-center">
							<div class="slds-grid slds-col slds-size_1-of-1 slds-grid_align-center slds-wrap">
								<div 
									v-for="key in ['self', 'partner']"
									v-if="familyTree[key] && familyTree[key].externals && familyTree[key].externals.length > 0"
									:key="key"
									class="slds-col slds-small-size_1-of-1 slds-medium-size_1-of-2">
									<legend 
										class="family-tree-form_legend slds-form-element__label slds-form-element__legend"
									>
										{{ familyTree[key].firstName }}'s Externals&nbsp;
									</legend>

									<!-- List externals for 'both' first -->
									<div 
										v-for="member in familyTree['both'].externals"
										:key="member.firstName"
										class="slds-col slds-size_1-of-1">
										<a href="#">
											<div class="family-tree_accordion-member-block slds-clearfix">
												<div class="family-tree_accordion-icon-block slds-float_left slds-m-right_x-small">
													<img 
														src="{!$Resource.formspatternlib + '/formspatternlib/images/familytree-spouse-icon.svg'}"
														alternativeText="spouse icon" 
														class="spouse-icon  info-icon" >
													<img 
														src="{!$Resource.formspatternlib + '/formspatternlib/images/familytree-beneficiary-icon.svg'}"
														alternativeText="beneficiary icon" 
														class="beneficiary-icon info-icon" >
													<img 
														src="{!$Resource.formspatternlib + '/formspatternlib/images/familytree-kids-icon.svg'}"
														alternativeText="kids icon" 
														class="kids-icon info-icon" >
												</div>
												<div class="family-tree_accordion-details-block slds-float_left">
													<p class="family-tree-member_name-age">
														{{ member.firstName }}&nbsp;
														<span>({{ member.age }})</span>
													</p>
													<p class="family-tree-member_label">({{ member.relationship }})</p>
												</div>
											</div>
										</a>
									</div>

									<!-- List externals specific to either 'self' or 'partner' keys -->
									<div 
										v-for="member in familyTree[key].externals"
										:key="member.firstName"
										class="slds-col slds-size_1-of-1">
										<a href="#">
											<div class="family-tree_accordion-member-block slds-clearfix">
												<div class="family-tree_accordion-icon-block slds-float_left slds-m-right_x-small">
													<img 
														src="{!$Resource.formspatternlib + '/formspatternlib/images/familytree-spouse-icon.svg'}"
														alternativeText="spouse icon" 
														class="spouse-icon  info-icon" >
													<img 
														src="{!$Resource.formspatternlib + '/formspatternlib/images/familytree-beneficiary-icon.svg'}"
														alternativeText="beneficiary icon" 
														class="beneficiary-icon info-icon" >
													<img 
														src="{!$Resource.formspatternlib + '/formspatternlib/images/familytree-kids-icon.svg'}"
														alternativeText="kids icon" 
														class="kids-icon info-icon" >
												</div>
												<div class="family-tree_accordion-details-block slds-float_left">
													<p class="family-tree-member_name-age">
														{{ member.firstName }}&nbsp;
														<span>({{ member.age }})</span>
													</p>
													<p class="family-tree-member_label">({{ member.relationship }})</p>
												</div>
											</div>
										</a>
									</div>

									<div class="family-tree_add-member slds-col slds-size_1-of-1">
										<div>
											<a href="#">
												<button class="slds-button slds-button_neutral">
													<img 
														src="{!$Resource.formspatternlib + '/formspatternlib/images/icons/plus-icon.svg'}"
														alternativeText="plus" 
														class="slds-p-right_x-small" >Family
												</button>
												<p>Include all related family members</p>
											</a>
										</div>
									</div>

								</div>
							</div>
						</div>
					</fieldset>
				</div>
			</div>
			<div 
				v-else 
				class="slds-grid slds-col slds-wrap slds-grid_align-center slds-size_1-of-1">
				<div class="family-tree_add-member_section-extra slds-grid slds-col slds-wrap slds-size_9-of-12 igforms-utils__max-width--large">
					<div class="family-tree_add-member slds-col slds-size_1-of-1">
						<div>
							<a href="#">
								<button class="slds-button slds-button_neutral">
									<img 
										src="{!$Resource.formspatternlib + '/formspatternlib/images/icons/plus-icon.svg'}"
										alternativeText="plus" 
										class="slds-p-right_x-small" >External
								</button>
								<p>Include all others affected by your finances</p>
							</a>

						</div>
					</div>
				</div>

			</div>
</div></div></template>

<script>
import Header from '~/components/Header.vue'
import { cloneDeep } from 'lodash'

export default {
	components: {
		Header
	},

	async asyncData({ app, store, params }) {
		if (!store.state.prospect.prospect.id) {
			await store.dispatch('prospect/fetchProspect', params.id)
		}

		await store.dispatch('familyTree/fetchTree')
	},

	data: function() {
		return {
			title: 'Family Tree',
			debug: true
		}
	},

	computed: {
		familyTree: function() {
			// @antonio.cordeiro
			// FIXME: Implement this on the backend, resolving any
			// nodes that can potentially be prospects/clients before
			// returning the tree data to the client

			const tree = cloneDeep(this.$store.state.familyTree.tree)
			tree.self = Object.assign(
				tree.self,
				this.$store.state.prospect.prospect
			)

			return tree
		}
	},

	methods: {
		shouldDisplay(path) {
			const tree = this.familyTree
			let valid = false

			for (let key in tree) {
				valid = tree[key] && tree[key][path].length > 0
				if (valid) break
			}

			return valid
		}
	}
}
</script>
