// 测试
export const getTest = ({commit}) => {
	console.log(111)
	let str = 'change str'
	commit('updateTest',str);
}