//下面是根据格雷码位数获取格雷码，如位数为1获取的格雷码为0,1，位数为2获取的格雷码为0,1,11,10
//	The gray code is a binary numeral system where two successive values differ in only one bit. 
//	Given a non-negative integer n representing the total number of bits in the code, print the sequence of gray code. A gray code sequence must begin with 0. 
//	For example, given n = 2, return [0,1,3,2]. Its gray code sequence is: 
//	00 - 0 
//	01 - 1 
//	11 - 3 
//	10 - 2

function grayCode(n){

	// n表示格雷码位数，必须为正整数
	if(!new RegExp(/[0]*[1-9]\d*/g).test(n)) return;

	// 默认格雷码初始为1位
	var result = ['0','1'];
	for(var i = 2; i <= n; i++){
		// 倒序遍历格雷码数组
		for(var j= result.length-1; j>=0; j--){
			// 每遍历一位，在其前补一
			result.push(`1${result[j]}`)
		}
		// 遍历完一次，补位
		result = result.map(code=>code.padStart(i,'0'))
	}

	return result;
	
}	

console.time('gray-code');
var result = grayCode(3);
var lines = result.length / 10;
for(var i = 0; i < lines + 1; i++){
	console.log(result.slice(i * 10, i * 10 + 10).join(','))
}
console.timeEnd('gray-code');