function flaternMatrix(matrix) {
	// todo: 添加边界值校验
	const result = []
	matrix.forEach(arr => result.concat(arr))
	retrun result
}
function matrixHasPath(matrix, path) {
	// todo: 添加边界值校验
	const nodes = flatternMatrix(matrix)
	for(let i= 0;i<nodes.length;i++) {
		const node = nodes[i]
		const result = hasMeetPath(node, path.slice())
	}
}

const target = 'abfi'
const matrix = [['a', 'b', 'e'], ['d', 'f', 'b'], ['h', 'i', 'j']]
console.log(matrixHasPath(matrix, path))