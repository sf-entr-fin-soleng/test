<template>
	<section>
		<pre>{{ inputs }}</pre>
		<div class="slds-col slds-size_1-of-2 cQuestionBoolean">
			<fieldset class="slds-form-element">
				<legend class="slds-col slds-form-element__legend slds-form-element__label slds-p-vertical_small"> {{ title }}</legend>
				<div class="slds-form-element__control">
					<div class="cQuestionnaire_BooleanInput slds-form-element__row slds-size_1-of-1 slds-checkbox_button-group slds-m-top_small">
						<span 
							v-for="input in inputs"
							:key="input.key"
							class="slds-col slds-button slds-checkbox_button slds-size_1-of-2">
							<input 
								:id="input.key"
								type="checkbox" 
							>
							<label 
								:for="input.key" 
								class="slds-checkbox_button__label slds-align_absolute-center">
								<span class="slds-checkbox_faux">{{ input.label }}</span>
							</label>
						</span>
					</div>
				</div>
			</fieldset>
		</div>
	</section>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
			default: 'textarea'
		},
		value: {
			type: null,
			default: null
		},
		inputs: {
			type: Array,
			default: () => []
		},
		title: {
			type: String,
			default: 'Question'
		}
	},

	data: function() {
		return {}
	}
}
</script>
