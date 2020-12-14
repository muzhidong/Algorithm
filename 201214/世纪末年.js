// 问：若1999年的12月31日是星期五，问未来哪一个离我们最近的一个世纪末年（即xx99年）的12月31日正好是星期天（即星期日）？
// 获取最后一天是指定星期的最近世纪末年
function getTheEndOfCentury(endDay,startDay = 'friday',recursionNum = 0) {

	// 已知：1999年12月31日是星期五。

	// 数据默认值
	var days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
	var map = {
		'sunday': -1,
		'monday': -1,
		'tuesday': -1,
		'wednesday': -1,
		'thursday': -1,
		'friday': -1,
		'saturday': -1,
	};

	// 1.数据初始化
	var idx = days.indexOf(startDay);
	var i = 0;
	for(var key in map){
		if(i < idx){
			map[key] = 7 - idx + i;
		}else{
			map[key] = i - idx;
		}
		i++;
	}

	// 2.一个世纪后希望对应的星期除7取余的天数
	var remain = map[endDay];

	// 是否是闰年
	// 能整除4但不能整除100或能整除100且能整除400是闰年，否则为平年。
	function isLeapYear(year){
		return (year % 4 === 0 && year % 100 !== 0) || (year % 100 === 0 && year % 400 === 0);
	}

	// 3.计算接下来的一百年后实际除7取余的天数
	// 闰年有366天，有52个星期余2天；平年有365天，有52个星期余1天。
	var realRemain = 0;
	for(var j = 0; j < 100; j++){
		if(isLeapYear(j + (20 + recursionNum) * 100)){
			realRemain += 2;
		}else{
			realRemain += 1;
		}
	}
	realRemain %= 7;

	// 4.计算这一百年的最后一天是否满足，若满足直接返回世纪末年，否则递归下一个第一百年。
	if(realRemain === remain){
		return (20 + recursionNum) * 100 + 99;
	}else{
		// console.log(endDay,days[(idx + realRemain) % 7], recursionNum);
		return getTheEndOfCentury(endDay,days[(idx + realRemain) % 7], ++recursionNum);
	}

}
console.time('getTheEndOfCentury');
// 借此题说明，世纪末年最后一天不可能是星期一、星期三、星期六。
console.log(getTheEndOfCentury('sunday'));
console.timeEnd('getTheEndOfCentury');