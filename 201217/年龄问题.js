/**
 * 问：若姐妹俩的年龄之积是年龄之和的6倍，且年龄差不超过8岁，问妹妹的年龄
 */

function getAgeOfSister(multiple, threshold) {

	/**
	 该问题可转化为一道初中数学题：已知l,s为正整数，满足l*s=(l+s)*a且l-s<=b，问s是多少
	 解：
	 l*s = l*a + s*a
	 s = l*a/(l-a)
	 
	 l - l*a/(l-a) <=b
	 l *(1 - a/(l-a)) <=b
	 l <= b/(1-a/(l-a)) 
	 l <= b/((l-2a)/(l-a))
	 l <= b * (l - a) / (l - 2a)
	 l * (l - 2a) <= b * (l - a)
	 l * l - 2al <= bl - ab
	 l * l - (2a+b) * l + ab <= 0

	 delta = Math.pow(-(2a+b),2) - 4ab >= 0
   若不满足则无解。

	 a = 6 b = 8 delta = 400 - 4*6*8 = 208 > 0
	 l范围为 [Math.max((2a+b-Math.sqrt(delta)) /2,0) , (2a+b+Math.sqrt(delta))/2]
	 确定l值，进而确定s值

 */

	var tip = '没有符合此条件的姐妹';

	// delta小于0说明无解
	var delta = Math.pow(-(2 * multiple + threshold), 2) - 4 * multiple * threshold;
	if (delta < 0) return tip;

	// 姐姐的年龄阈值范围
	var min = Math.max(2 * multiple + threshold - Math.sqrt(delta) / 2, 0);
	var max = (2 * multiple + threshold + Math.sqrt(delta)) / 2;

	var elderSisterAge, sisterAge;
	var age = [];

	for (var i = Math.ceil(min); i < max; i++) {

		elderSisterAge = i;
		// 计算妹妹的年龄
		sisterAge = elderSisterAge * multiple / (elderSisterAge - multiple);

		// 妹妹年龄为正整数才算正常
		if (new RegExp(/^[1-9]\d*$/, 'g').test(sisterAge)) {
			age.push({
				'sister': sisterAge,
				'elderSister': elderSisterAge,
			})
		}
	}

	// 没有符合的姐妹年龄
	if (age.length === 0) {
		return tip;
	}

	return age;
}

console.time('getAgeOfSister');
console.log(getAgeOfSister(6, 8)); //[ { sister: 10, elderSister: 15 } ]
console.timeEnd('getAgeOfSister');