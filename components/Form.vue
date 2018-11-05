<template>
	<section>
		<form
			:id="id"
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
	</section>
</template>

<script>
// Import component
import Loading from 'vue-loading-overlay'
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
	components: {},
	props: {
		id: { type: String, default: 'form1' }
	},
	data: function() {
		return {
			fields: []
		}
	},

	mounted: function() {
		// Root event bus
		this.$root.$on('trigger-submit', this.triggerSubmit)
		this.$root.$on('trigger-reset', this.triggerReset)
	},

	methods: {
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

			if (valid) console.log('Submitting form...')
			else console.log('[Error] Invalid form!')
		},

		// Trigger event listeners
		triggerSubmit(event) {
			if (event.formId === this.id)
				document.getElementById('hidden-submit').click()
		},

		triggerReset(event) {
			if (event.formId === this.id)
				document.getElementById('hidden-reset').click()
		}
	}
}
</script>
