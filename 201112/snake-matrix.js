//	蛇形矩阵：为方阵，由1开始，数字由外到内递增。
//	编程，输入阶数，输出该阶数的蛇形矩阵。
// 举例：3阶蛇形矩阵，
//	1 2 3
//	8 9 4
//	7 6 5

function printSnakeMatrix(n) {

	// 1.初始化矩阵。阶数即边长，采用二维数组存储，用索引[y][x]表示坐标，一维是y轴，二维是x轴。
	var matrix = [];
	for (var m = 0; m < n; m++) {
		matrix.push([]);
	}

	// 2.按向右，向下，向左，向上的方向依序移动，不断递归，直到所有方向都走完。
	// 每次方向都要确定起点位置、终点位置或移动点数、移动方向

	// 数字值
	var num = 1;
	// 方向变化数
	var steps = n % 2 === 0 ? n / 2 * 4 : 1 + (n - 1) / 2 * 4;

	for (var i = 0; i < steps; i++) {

		//圈数，从0开始计起
		var circle = Math.floor(i / 4);

		// 向右
		if (i % 4 === 0) {
			// x y
			// 0 0   n-2 0 
			// 1 1   n-3 1
			for (var j = circle; j < n - 1 - circle; j++) {
				matrix[circle][j] = num++;
			}
		}
		// 向下
		if (i % 4 === 1) {
			// x  y
			// n-1 0  n-1 n-2
			// 1 n-2  n-3 n-3
			for (var j = circle; j < n - 1 - circle; j++) {
				matrix[j][n - 1 - circle] = num++;
			}
		}
		// 向左
		if (i % 4 === 2) {
			//  n-1 n-1  n-1 1
			//  n-2 n-2  n-2 2
			for (var j = n - 1 - circle; j > circle; j--) {
				matrix[n - 1 - circle][j] = num++;
			}
		}
		// 向上
		if (i % 4 === 3) {
			// n-1 0  1 0 
			// n-2 1  2 1
			for (var j = n - 1 - circle; j > circle; j--) {
				matrix[j][circle] = num++;
			}
		}
	}

	// 填上为非1的奇数阶的最后1个数字
	if (n !== 1 && n % 2 === 1) {
		matrix[(n - 1) / 2][(n - 1) / 2] = num;
	}

	// 打印矩阵
	for (var k = 0; k < n; k++) {
		var line = "";
		for (var j = 0; j < n; j++) {
			line += rightAlign(matrix[k][j], n);
		}
		console.log(line + String.fromCharCode('0x0D'));
	}

	// 辅助函数，右对齐
	function rightAlign(num, n) {
		var diff = (n * n + '').length - (num + '').length;
		if (diff > 0) {
			var char = '';
			for (var i = 0; i < diff; i++) {
				char += ' ';
			}
			return char + num + '  ';
		}
		return num + '  ';
	}
}

console.time('snake-matrix');
printSnakeMatrix(25);
console.timeEnd('snake-matrix');