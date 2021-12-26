<template>
	<div class="stock-container">
		你好这里是{{message}}
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Option',
	data () {
		return {
			'message': '期权择时',
		}
	},
	components: {

	},
	computed: {
		...mapGetters([
			'name'
		])
	}
}
</script>

<style lang="scss" scoped>
</style>
