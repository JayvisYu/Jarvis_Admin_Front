<template>
	<div class="stock-container">
		你好这里是{{message}}
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'DigitalCurrency',
	data () {
		return {
			'message': '数字货币实盘监控',
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
