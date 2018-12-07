<template>
	<!-- @antonio.cordeiro
		`novalidate` needs to be here in order for the HTML5 popups to be gone. 
		Unfortunately it also implies that the form will not trigger HTML5's
		.checkValidity on each input target, so we need to do it manually. -->
	<form
		:id="id"
		:class="this.class"
		novalidate
		@submit.prevent="submit">
		<slot/>
		<input 
			id="hidden-submit" 
			type="submit" 
			hidden>
		<input 
			id="hidden-reset" 
			type="reset" 
			hidden>
	</form>
</template>

<script>
export default {
	components: {},
	props: {
		id: { type: String, default: 'form1' },
		class: {
			type: String,
			default: 'slds-grid slds-wrap slds-size_10-of-12'
		}
	},
	data: function() {
		return {
			fields: []
		}
	},

	mounted: function() {
		// Root event bus
		// TODO: handle event bus in separate file
		this.$root.$off('trigger-submit')
		this.$root.$off('trigger-reset')

		this.$root.$on('trigger-submit', this.triggerSubmit)
		this.$root.$on('trigger-reset', this.triggerReset)
	},

	methods: {
		// Register child component into array
		registerField(field) {
			this.fields.push(field)
		},

		async submit(event) {
			event.preventDefault()
			// @antonio.cordeiro:
			// Mind you all of this is to disable the
			// stubborn HTML5 validation popup messages
			// but still keep the HTML5 validation methods

			// Force validity check before submit
			const checkFields = async () => {
				this.fields.forEach(async (field, index) => {
					// @antonio.cordeiro
					// fieldValidity is called without a target
					// parameter because we actually don't have one
					// we just have the component reference and
					// its values, but it doesn't contain the
					// html5 standard .checkValidity method
					await field.checkValidity()
				})
			}

			// @antonio.cordeiro
			// Now we support promises in case
			// the custom validation is not
			// a synchronous operation!
			await checkFields()

			const valid = this.fields.every(field => {
				return field.valid
			})

			if (valid) {
				this.$emit('form-submit')
			}
		},

		// Submit form trigger
		triggerSubmit(event) {
			// @antonio.cordeiro
			// Not to sure we need to abstract this
			// method even further since we are already
			// using .preventDefault()

			// If form id matches the id passed by
			// the container of the form (parent)
			if (event.formId === this.id)
				document.getElementById('hidden-submit').click()
		},

		// Reset form trigger
		triggerReset(event) {
			if (event.formId === this.id)
				document.getElementById('hidden-reset').click()
		}
	}
}
</script>
