import Vue from 'vue'
import VueCurrencyFilter from 'vue-currency-filter'

/**
 * Formats a phone number.
 * Example: 123-456-7890 => (123) 456-7890
 *
 * @param {String} phone
 * @return {Void}
 */
Vue.filter('phone', function(phone) {
	if (phone) {
		phone = phone.toString()
		return phone
			.replace(/[^0-9]/g, '')
			.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
	}
})

Vue.use(VueCurrencyFilter, {
	symbol: '$',
	thousandsSeparator: ',',
	fractionCount: 2,
	fractionSeparator: '.',
	symbolPosition: 'front',
	symbolSpacing: true
})
