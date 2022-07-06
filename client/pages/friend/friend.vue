<template>
	<view class="friend">
		<button type="primary" @click="handleAddFriend">添加好友</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			handleAddFriend() {
				uni.navigateTo({
					url:"/pages/search/search"
				})
			}
		}
	}
</script>

<style>

</style>
