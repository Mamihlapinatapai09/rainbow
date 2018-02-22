export const getTest = ({commit}) => {
	const str = 'change home';
	commit('updateTest',str);
}