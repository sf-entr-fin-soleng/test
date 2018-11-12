<template>
	<div>
		<Header :title="title"/>
		<div class="cGoals_And_Concerns">
			<pre v-if="debug">{{ goals }}</pre>
			<GoalsTray 
				:debug="true"
				name="High Priority" 
				priority="high"
				@autosave="handleSave"/>
			<GoalsTray 
				:debug="true" 
				name="Medium Priority" 
				priority="medium"
				@autosave="handleSave"/>
			<GoalsTray 
				:debug="true" 
				name="Low Priority" 
				priority="low"
				@autosave="handleSave"/>
			<GoalsTray 
				:debug="false" 
				priority="none"
				@autosave="handleSave"/>
		</div>
	</div>
	
</template>

<script>
import { mapActions } from 'vuex'
import GoalsTray from '~/components/GoalsTray'
import Header from '~/components/Header'
import services from '~/services'
import types from '~/store/types'

export default {
	components: {
		GoalsTray,
		Header
	},

	async asyncData({ store, params }) {
		await store.dispatch(
			`${types.goal.prefix}/${types.goal.action.FETCH_GOALS}`,
			params.id
		)
	},

	data: function() {
		return { title: 'Goals & Concerns', debug: false }
	},

	methods: {
		handleSave: async function() {
			// await this.$store.dispatch(
			// 	'goal/' + types.goal.action.WRITE_DETAILS
			// )
		}
	}
}
</script>
