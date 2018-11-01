<template>
	<section>
		<div :class="['slds-form-element', valid ? '' : 'slds-has-error']">
			<label 
				class="slds-form-element__label" 
				for="text-input-id-1">{{ label }}</label>
			<div class="slds-form-element__control">
				<input
					ref="input" 
					:id="id"
					:value="value" 
					:type="type" 
					:min="min"
					:max="max"
					:step="step"
					:maxlength="maxlength"
					:required="required"
					:pattern="pattern"
					:checked="checked"
					:name="name"
					:class="['slds-input', classNames]"
					@blur="checkValidity($event)"
					@input="updateValue($event)"
				>
			</div>
			<div 
				v-if="!valid"
				role="alert" 
				class="slds-form-element__help" 
				lightning-input_input="">{{ errorMessage }}</div>
		</div>
	</section>
</template>

<script>
export default {
	props: {
		id: { type: String, default: undefined },
		classNames: { type: String, default: undefined },
		type: { type: String, default: 'string' },
		value: { type: null, default: undefined },
		name: { type: String, default: undefined },
		min: { type: Number, default: undefined },
		max: { type: Number, default: undefined },
		step: { type: Number, default: 1 },
		maxlength: { type: Number, default: undefined },
		checked: { type: Boolean, default: undefined },
		required: { type: Boolean, default: undefined },
		pattern: { type: String, default: undefined },
		label: { type: String, default: 'Input Field' },
		invalidMessage: { type: String, default: 'Invalid input detected.' },
		requiredMessage: { type: String, default: 'Complete this field.' },
		customValidation: { type: Function, default: undefined },
		filter: { type: Function, default: undefined }
	},
	data: function() {
		return {
			pristine: true,
			valid: true,
			errorMessage: ''
		}
	},

	mounted: function() {
		this.$parent.registerField(this)
	},

	methods: {
		checkValidity: async function(event) {
			if (!event) {
				event = { target: this.$refs.input }
			}

			const type = this.type.toLowerCase()
			this.pristine = false

			const hasValue = this.value && this.value.toString().length > 0

			// Standard HTML5 validity comes first
			this.valid = event.target.checkValidity()
			this.errorMessage =
				this.required && !hasValue
					? this.requiredMessage
					: this.invalidMessage

			// Check for custom validations
			if (this.customValidation) {
				try {
					await this.customValidation(event.target)
					this.valid = true
				} catch (err) {
					this.valid = false
					this.errorMessage = err
				}
			}
		},

		updateValue: function(event) {
			// @antonio.cordeiro
			// Due to parent's two way data binding with
			// v-model directive, input value is parsed
			// by vue and edge cases are handled before
			// the framework updates the binded property
			let value = event.target.value
			if (this.filter) value = this.filter(value)

			this.$emit('input', value)
			this.checkValidity(event)
		}
	}
}
</script>
