import types from '../type'
import Api from '../../api/language'

const state = {
	currentLan: '',
	lanList: [],
	lanPackage: {}
}

const getters = {
	[types.G_lan]: state => state.currentLan,
	[types.G_lanList]: state => state.lanList,
	[types.G_lanPack]: state => state.lanPackage
}

const mutations = {
	[types.M_lan] (state, lan) {
		state.currentLan = lan
	},
	[types.M_lanList] (state, lanList) {
		state.lanList = lanList
	}
}
const actions = {
	[types.A_lanList] ({commit}) {
		Api()
			.then((res) => {
				const data = res.data.data
				console.log(data)
				commit(types.M_lanList, data)
			})
			.catch((err) => {
				console.log(err)
			})
	},
	[types.A_lan] ({commit}, lan) {
		commit(types.M_lan, lan)
	}

}

export default {
	state,
	getters,
	mutations,
	actions
}
