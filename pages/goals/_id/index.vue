<template>
	<div>
		<Header :title="title"/>
		<div 
			class="igforms-priority slds-col slds-size_12-of-12 cGoals_And_Concerns" 
			@keyup.enter="handleNext">
			<pre v-if="debug">{{ goals }}</pre>
			<GoalsTray 
				name="High Priority" 
				priority="high"
			/>
			<GoalsTray 
				name="Medium Priority" 
				priority="medium"
			/>
			<GoalsTray 
				name="Low Priority" 
				priority="low"
			/>
			<hr>
			<p class="slds-align_absolute-center">Choose your Goals and Concerns</p>
			<GoalsTray 
				priority="none"
			/>

			<NavBar 
				next-label="Save"
				@click-prev="$router.push('/')" 
				@click-next="handleNext"/>
		</div>
	</div>
	
</template>

<script>
import { mapActions } from 'vuex'
import GoalsTray from '~/components/GoalsTray'
import NavBar from '~/components/NavBar'
import Header from '~/components/Header'
import services from '~/services'
import types from '~/store/types'

export default {
	components: {
		GoalsTray,
		Header,
		NavBar
	},

	async asyncData({ store, params }) {
		try {
			await store.dispatch(`goal/fetchGoals`, params.id)
		} catch (err) {
			throw err
		}
	},

	data: function() {
		return { title: 'Goals & Concerns', debug: false }
	},

	methods: {
		handleNext: function() {
			this.$store.dispatch('goal/writeDetails')
			this.$router.push('timeline')
		}
	}
}
</script>
