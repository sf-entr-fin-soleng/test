<template>
	<section>
		<Header :title="title"/>
		<div class="igforms-timeline slds-grid slds-wrap slds-grid_align-center slds-size_12-of-12 igforms-utils__max-width--large">
			<div 
				v-for="(priority,key) in $store.state.goal.priorities" 
				v-if="key !== 'nil'"
				:key="key"
				class="igforms-timeline__lane slds-grid slds-wrap slds-size_10-of-12 slds-p-vertical--small">

				<div class="igforms-timeline__milestone-year igforms-timeline__milestone-year--0 slds-size_2-of-12"/>
				<div class="igforms-timeline__milestone-year igforms-timeline__milestone-year--5 slds-size_2-of-12"/>
				<div class="igforms-timeline__milestone-year igforms-timeline__milestone-year--10 slds-size_2-of-12"/>
				<div class="igforms-timeline__milestone-year igforms-timeline__milestone-year--15 slds-size_2-of-12"/>
				<div class="igforms-timeline__milestone-year igforms-timeline__milestone-year--20 slds-size_2-of-12"/>
				<div class="igforms-timeline__milestone-year igforms-timeline__milestone-year--25 slds-size_2-of-12">
					<div 
						v-for="detail in $store.state.goal.trays[priority].details"
						v-if="detail.timeframe === 10"
						:key="detail.goalId"
					>
					
						<div 
							v-if="detail.valid" 
							class="igforms-timeline__milestone">
							<div class="igforms-timeline__milestone--image ">
								<img :src="'/images/goals-concerns/cards/' + $store.state.goal.goals[detail.goalId].image +'.png'" >
							</div>
							<p>{{ $store.state.goal.goals[detail.goalId].name }}</p>
						</div>

					</div>
				</div>

				<h2 
					class="igforms-timeline__title-big" 
					style="text-transform:capitalize">{{ priority }}</h2>
			</div>
            
			<div class="igforms-timeline__scale slds-grid slds-wrap slds-size_10-of-12">
				<div class="igforms-timeline__scale-milestone slds-size_2-of-10">
					<div/>
					<p>2018</p>
				</div>
				<div class="igforms-timeline__scale-milestone igforms-timeline__scale-milestone--5 slds-size_2-of-12">
					<div/>
					<p>2023</p>
				</div>
				<div class="igforms-timeline__scale-milestone igforms-timeline__scale-milestone--10 slds-size_2-of-12">
					<div/>
					<p>2028</p>
				</div>
				<div class="igforms-timeline__scale-milestone igforms-timeline__scale-milestone--15 slds-size_2-of-12">
					<div/>
					<p>2033</p>
				</div>
				<div class="igforms-timeline__scale-milestone igforms-timeline__scale-milestone--20 slds-size_2-of-12">
					<div/>
					<p>2038</p>
				</div>
				<div class="igforms-timeline__scale-milestone igforms-timeline__scale-milestone--25 slds-size_2-of-12">
					<div/>
					<p>2043</p>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import Header from '~/components/Header.vue'
export default {
	components: {
		Header
	},
	data: function() {
		return {
			title: 'Timeline'
		}
	}
}
</script>
