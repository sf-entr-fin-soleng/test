<template>
	<section class="cFamilyTreeInputForm">
		<Header title="Family Tree"/>
		<pre v-if="debug">{{ $route.params }}</pre>

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
				aura:id="form1" 
				submit="{!c.OnSubmit}" 
				parent="{!this}" 
				displaySubmitButton="false">
				<div class="igforms-client-details slds-col slds-size_1-of-1 slds-form slds-form_compound cFormValidator">
					<fieldset class="slds-form-element">
						<!-- <legend class="slds-form-element__label slds-form-element__legend">Adding Family Member</legend> -->
						<div class="slds-form-element__group slds-grid slds-col slds-gutters slds-wrap slds-size_10-of-12 slds-grid_align-center">
							<div class="slds-form-element__row slds-col slds-size_1-of-1">
								<div class="slds-col slds-size_1-of-2">
									<FormField 
										aura:id="form1-field" 
										label="First Name" 
										required="true" 
										value="{!v.node.firstName}" 
										type="text" 
										maxlength="30" />
								</div>
								<div class="slds-col slds-size_1-of-2">
									<FormField 
										aura:id="form1-field" 
										label="Last Name" 
										required="true" 
										value="{!v.node.lastName}" 
										update-on="keyup" />
								</div>
							</div>
							<div class="slds-form-element__row slds-col slds-size_1-of-1">

								<!-- Relationship picklist-->
								<div class="slds-col slds-size_1-of-2">
									<!-- <lightning:select 
										aura:id="form1-field" 
										required="true" 
										label="Relationship" 
										value="{!v.node.relationship}">
										<option 
											text="Select relationship type" 
											value="" 
											selected="{!v.node.relationship == ''}" />
										<aura:iteration 
											items="{!v.relationship}" 
											var="option" 
											index-var="index">
											<option 
												text="{!option}" 
												selected="{!option == v.node.relationship}" />
										</aura:iteration>
									</lightning:select> -->
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
								<aura:if is-true="{!v.showBirthday}">
									<div class="slds-col slds-size_1-of-4">
										<FormField 
											aura:id="form1-field" 
											label="Birthday" 
											required="true" 
											value="{!v.node.birthdate}" 
											type="date" 
											onchange="{!c.OnRecalcBirthdate}"/>
									</div>
									<aura:set attribute="else">
										<div class="slds-col slds-size_1-of-4">
											<FormField 
												aura:id="form1-field" 
												label="Age" 
												required="true" 
												value="{!v.node.age}" 
												type="number" 
												min="0" 
												max="200" 
												onchange="{!c.OnRecalcAge}"/>
										</div>
									</aura:set>
								</aura:if>

							</div>
						</div>
					</fieldset>
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

										<lightning:icon 
											icon-name="utility:chevrondown" 
											alternative-text="Connected" />
									</legend>
								</div>
							</div>
							<aura:if is-true="{!v.showAdditional}">
								<div class="slds-form-element__row slds-col slds-size_1-of-1">
									<div class="slds-col slds-size_1-of-2">
										<FormField 
											aura:id="form1-field" 
											label="Phone Number" 
											value="{!v.node.phone}" 
											type="tel" 
											formatter="phone"
											pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
									</div>
									<div class="slds-col slds-size_1-of-2">
										<FormField 
											aura:id="form1-field" 
											label="Email" 
											value="{!v.node.email}" 
											type="email" 
											pattern="[a-z0-9!'*+/=?^_`{|}~-]+(?:\.[a-z0-9!'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
										/>
									</div>
								</div>
								<div class="slds-form-element__row slds-col slds-size_1-of-1">
									<div class="slds-col slds-size_1-of-1">
										<lightning:textarea 
											value="{!v.node.notes}" 
											name="input3" 
											label="{!v.legend}" 
											placeholder="Add Notes" 
											class="textarea" />
									</div>
								</div>
								<div class="slds-form-element__row slds-col slds-size_1-of-1">
									<div class="slds-col slds-size_1-of-2">
										<fieldset class="slds-form-element">
											<legend class="slds-form-element__legend">
												Beneficiary
											</legend>
											<FormField 
												aura:id="form1-field" 
												type="checkbox" 
												checked="{!v.node.beneficiary}" 
												label="Yes, include as beneficiary" 
												name="input1" />
										</fieldset>
									</div>
									<div class="slds-col slds-size_1-of-2">
										<!-- <lightning:select 
											aura:id="form1-field" 
											label="Status" 
											value="{!v.node.status}">
											<option 
												text="Select relationship type" 
												value="" 
												selected="{!v.nodeStatus.selectedOption == ''}" />
											<aura:iteration 
												items="{!v.nodeStatus.options}" 
												var="option">
												<option 
													text="{!option}" 
													value="{!option}" 
													selected="{!option == v.nodeStatus.selectedOption}" />
											</aura:iteration>
										</lightning:select> -->
									</div>
								</div>
							</aura:if>
						</div>
					</fieldset>
				</div>


			</Form>


	</div></section>
</template>

<script>
import Header from '~/components/Header.vue'
import Form from '~/components/Form.vue'
import FormField from '~/components/FormField.vue'
export default {
	components: {
		Header,
		Form,
		FormField
	},
	data: function() {
		return {
			debug: true
		}
	}
}
</script>
