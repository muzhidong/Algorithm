//实现2进制到36进制之间的任意数值转换
// TODO:负数、小数如何处理？

/**
 * 函数参数说明：
 * value 表示要转换的值
 * hex   表示要转换的进制
 * currentHex 表示当前值的进制
 */
function hexadecimalConversion(value, hex, currentHex = 10) {

	if (hex < 2 || hex > 36 || currentHex < 2 || currentHex > 36) return '参数不合理，进制取值是2-36之间。';

	if (!(/^[0-9A-Z]+$/g.test(value))) return;

	var str = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

	// 转换为10进制
	var newVal = 0;
	if (currentHex !== 10) {
		value += '';
		for (var i = 0, len = value.length; i < len; i++) {

			// newVal += str.indexOf(value.charAt(i)) * Math.pow(currentHex, len - 1 - i);
			newVal = str.indexOf(value.charAt(i)) + currentHex * newVal;
		}
	} else {
		newVal = value;
	}

	// 转换为hex进制
	if (hex === 10) return newVal;

	var quot, mod, result = [];
	do {

		mod = newVal % hex;
		result.unshift(str.charAt(mod));

		quot = Math.floor(newVal / hex);
		newVal = quot;

	} while (quot >= hex)
	result.unshift(quot);

	return result.join('');
}

console.time('hexadecimalConversion1');
var r1 = hexadecimalConversion(1200, 17);
console.log(r1);
console.log(hexadecimalConversion(r1, 10, 17));
console.timeEnd('hexadecimalConversion1');

console.time('hexadecimalConversion2');
var r2 = hexadecimalConversion(11200, 17, 3);
console.log(r2);
console.log(hexadecimalConversion(r2, 3, 17));
console.timeEnd('hexadecimalConversion2');