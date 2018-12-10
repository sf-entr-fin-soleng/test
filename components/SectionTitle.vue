<template>
	<div class="questionnaire-header slds-col slds-size_12-of-12 slds_grid-align-center">
		<h2 class="slds-text-align_center">{{ sectionTitle }}</h2>
		<div/>
		<a 
			v-if="showSkip" 
			@click="$emit('skip')">Skip</a>
	</div>
</template>

<script>
export default {
	props: {
		showSkip: {
			type: Boolean,
			default: false
		},
		sectionTitle: {
			type: String,
			default: 'Section'
		}
	},
	data: function() {
		return {}
	}
}
</script>
