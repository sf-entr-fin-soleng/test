<template>
	<div class="client-table slds-col slds-medium-size_10-of-12 igforms-utils__max-width--large">
		<div class="slds-clearfix slds-m-top_medium">
			<div class="slds-float_right slds-text-body_small slds-m-top_large slds-m-bottom_medium client-table-result-label">
				{{ resultLabel }}
			</div>
		</div>

		<!-- Do not show table unless there is actually something in it -->
		<table 
			v-if="rows.length > 0"
			class="slds-table slds-table_bordered slds-table_fixed-layout" 
			role="grid">
			<thead class="slds-p-vertical__medium">
				<tr class="slds-line-height_reset">
					<th 
						v-for="(col, index) in columns"
						:key="index"
						data-index="{!index}" 
						aria-sort="none" 
						class="slds-is-sortable slds-is-resizable  slds-has-button-menu"
						aria-label="Name" 
						@click="sort($event, col.value)"
					>
						{{ col.label }}
						<button class="slds-button slds-button_icon">
							<i 
								v-if="col.value === sortBy && orderBy === 'asc'" 
								class="slds-button__icon material-icons">arrow_upward</i>
							<i 
								v-else-if="col.value === sortBy && orderBy === 'desc'" 
								class="slds-button__icon material-icons">arrow_downward</i>
							<i 
								v-else
								class="slds-button__icon material-icons">sort</i>
						</button>
					</th>
					<th 
						aria-sort="none" 
						class="slds-is-sortable slds-is-resizable slds-has-button-menu" 
						aria-label="Stage" 
						scope="col" 
						style="width: 3.25rem"/>
				</tr>
			</thead>
			<tbody>
				<tr 
					v-for="(row, rowIndex) in rows"
					:key="rowIndex"
					class="slds-hint-parent"
					@click="click($event, row)">
					<td 
						v-for="(col, colIndex) in columns"
						:key="colIndex"
						role="gridcell"
					>
						{{ row[col.value] }}
					</td>
					<td role="gridcell">
						>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	props: {
		// @antonio.cordeiro
		// Array props need to be initialized
		// as the result of a factory function
		columns: {
			type: Array,
			default: () => []
		},
		rows: {
			type: Array,
			default: () => []
		},

		// @antonio.cordeiro
		// This label, within this component, does
		// nothing. It is up to the parent component
		// to change its contents.
		resultLabel: {
			type: String,
			default: 'Showing 0 of 0 results'
		}
	},

	data: function() {
		return {
			sortBy: '',
			orderBy: 'asc'
		}
	},

	methods: {
		// @antonio.cordeiro
		// Instead of puting the $emit event in the
		// template handler, I'm creating a method so any
		// edge cases can be handled beforehand...

		sort: function(event, key) {
			this.sortBy = key
			if (this.orderBy === 'asc') this.orderBy = 'desc'
			else this.orderBy = 'asc'

			this.$emit('sort-table', this.sortBy, this.orderBy)
		},

		click: function(event, row) {
			// ... even if not really needed
			this.$emit('click-row', row)
		}
	}
}
</script>
