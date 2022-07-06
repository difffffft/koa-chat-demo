import Socket from "@/common/Socket.js"

const state = {
	socket: null,
};

const mutations = {
	INIT_SOCKET(state, email) {
		state.socket = new Socket("ws://192.168.2.21:3000/" + email)
	},
	DEL_SOCKET(state) {
		state.socket.close()
		state.socket = null
	},
};


const actions = {
	async connectSocket({
		dispatch,
		commit
	}, email) {
		commit('INIT_SOCKET', email);
	},

	async disconnectSocket({
		dispatch,
		commit
	}, data) {
		commit('DEL_SOCKET');
	},

};
const getters = {};
export default {
	state,
	mutations,
	actions,
	getters,
};
