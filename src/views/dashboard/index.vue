<template>
	<div class="dashboard-editor-container">
		<github-corner class="github-corner" />
		<div class="dashboard-text">{{ name }} 欢迎你!</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import GithubCorner from '@/components/GithubCorner'

export default {
	name: 'Dashboard',
	components: {
		GithubCorner
	},
	computed: {
		...mapGetters([
			'name'
		])
	}
}
</script>

<style lang="scss" scoped>
.dashboard {
	&-container {
		margin: 30px;
	}
	&-text {
		font-size: 30px;
		line-height: 46px;
	}
}

.dashboard-editor-container {
	padding: 32px;
	background-color: rgb(240, 242, 245);
	position: relative;

	.github-corner {
		position: absolute;
		top: 0px;
		border: 0;
		right: 0;
	}
}
</style>
