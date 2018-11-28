<template>
	
	<div :class="['slds-form-element', valid ? '' : 'slds-has-error']">
		<label 
			class="slds-form-element__label" 
			for="text-input-id-1">{{ label }}</label>

		<div class="slds-form-element__control">

			<!-- Traditional input -->
			<input
				v-if="rootType === 'input'"
				ref="input" 
				v-bind="$attrs"
				:value="value"
				:class="['slds-input', classNames]"
				@blur="updateOnBlur ? updateValue($event) : null"
				@keyup.prevent="updateOnKeyUp ? updateValue($event) : null"
				@mouseup.prevent="updateOnMouseUp ? updateValue($event) : null"
			>

			<!-- Picklist -->
			<select 
				v-if="rootType === 'select'" 
				ref="input"
				v-bind="$attrs"
				:value="value" 
				class="slds-select"
				@input="updateValue($event)">
				<!-- Default slot is allocated for picklists
				due to <select> looking for options right away -->
				<slot/>
			</select>

			<!-- Slider -->
			<div 
				v-if="rootType === 'slider'" 
				class="slds-slider">
				<input 
					ref="input" 
					v-bind="$attrs" 
					:value="value"
					:class="['slds-slider__range', classNames]"
					type="range"
					@input="updateValue($event)">
				<!-- Slot for any elements that should be displayed
				to the side of the slider -->
				<slot name="sliderValue"/>
			</div>

			<!-- Textarea -->
			<textarea 
				v-if="rootType === 'textarea'" 
				ref="input" 
				v-bind="$attrs" 
				:value="value" 
				:class="['slds-textarea', classNames]"
				@blur="updateOnBlur ? updateValue($event) : null"
				@keyup.prevent="updateOnKeyUp ? updateValue($event) : null"/>
		</div>
		<div 
			v-if="!valid"
			role="alert" 
			class="slds-form-element__help" 
			lightning-input_input="">{{ errorMessage }}</div>
	</div>
</template>

<script>
export default {
	inheritAttrs: false,

	props: {
		rootType: {
			type: String,
			default: 'input'
		},
		classNames: {
			type: String,
			default: undefined
		},
		value: {
			type: null,
			default: undefined
		},
		label: {
			type: String,
			default: 'Input Field'
		},
		invalidMessage: {
			type: String,
			default: 'Invalid input detected.'
		},
		requiredMessage: {
			type: String,
			default: 'Complete this field.'
		},
		customValidation: {
			type: Function,
			default: undefined
		},
		filter: {
			type: Function,
			default: undefined
		},
		updateOnBlur: {
			type: Boolean,
			default: true
		},
		updateOnKeyUp: {
			type: Boolean,
			default: true
		},
		updateOnMouseUp: {
			type: Boolean,
			default: true
		}
	},

	data: function() {
		return {
			valid: true,
			errorMessage: ''
		}
	},

	mounted: function() {
		// Tightly couples this component with parent component
		this.$parent.registerField(this)
	},

	methods: {
		checkValidity: async function(event) {
			// If no event is passed, fetch
			// the current <input> reference
			if (!event) {
				event = { target: this.$refs.input }
			}

			// Boolean to check whether or not
			// current input has something in it
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
					// @antonio.cordeiro
					// Supporting async validation actually
					// means that if we are calling a sync
					// method it needs to use `throw err`
					// in order for this block to run correctly

					// Resolve custom validation
					await this.customValidation(event.target)
					this.valid = true
				} catch (err) {
					// There was a validation error
					this.valid = false
					this.errorMessage = err
				}
			}
		},

		updateValue: function(event) {
			let value = event.target.value
			let parsed = {}

			// Try parsing it from the string
			try {
				parsed = JSON.parse(value)
			} catch (err) {
				parsed = value
			}

			// @antonio.cordeiro
			// Due to parent's two way data binding with
			// v-model directive, input value is parsed
			// by vue and edge cases are handled before
			// the framework updates the binded property
			if (this.filter) parsed = this.filter(parsed)

			// Update whatever property was binded
			// through the v-model directive and
			// check the field's validity
			this.$emit('input', parsed)
			this.checkValidity(event)
		}
	}
}
</script>
