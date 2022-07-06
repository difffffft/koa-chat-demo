<template>
	<view class="search">
		<view class="header">
			<input placeholder="请输入用户邮箱" v-model="email" />
			<view style="width: 24px;"></view>
			<button type="primary" @click="handleSearch">搜索</button>
		</view>
		<view class="user" v-show="user.email">
			<text>邮箱:{{user.email}}</text>
			<text>昵称:{{user.username}}</text>
			<button type="primary" @click="addFirend" :disabled="addStatus">添加</button>
		</view>
	</view>
</template>

<script>
	import {
		reqFindAllUser,
		reqAddFirend
	} from "@/api"
	export default {
		data() {
			return {
				addStatus: false,
				email: "",
				user: {
					email: "",
					username: "",
				}
			}
		},
		methods: {
			addFirend() {
				// this.addStatus = true
				uni.showToast({
					title: "已发送好友邀请",
					duration: 2000,
					icon: "success"
				});
				reqAddFirend({
					to: this.user.email
				}).then(res => {

				}).catch(err => {

				})
			},
			handleSearch() {
				reqFindAllUser({
					email: this.email
				}).then(res => {
					res = res[1].data
					if (res.code) {
						if (res.data) {
							this.user = res.data
						} else {
							uni.showToast({
								title: "没有此人",
								duration: 2000,
								icon: "error"
							});
						}
					} else {
						uni.showToast({
							title: res.msg,
							duration: 2000,
							icon: "error"
						});
					}
				}).catch(err => {
					uni.showToast({
						title: err,
						duration: 2000,
						icon: "error"
					});
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search {
		padding: 20px;

		.header {
			display: flex;

			input {
				flex: 1;
				height: 48px;
				border: 1px solid #666666;
				border-radius: 4px;
				padding-left: 24px;
			}

			button {
				border-radius: 999px;
				font-size: 14px;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.user {
			border: 1px solid #ccc;
			border-radius: 8px;
			padding: 20px;
			margin-top: 24px;
			width: 100%;
			display: flex;
			flex-direction: column;

			button {
				margin-top: 8px;
				width: 100%;
			}
		}

	}
</style>
