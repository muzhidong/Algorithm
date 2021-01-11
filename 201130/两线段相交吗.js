/**
 * 几何算法：判断两线段是否相交。
 */

// 不相交的两线段端点连接，一定存在是用两线段作为两边的四边形，而相交的两线段端点连接，则不存在。
// FIXME:该算法不能处理大于平角的内角的四边形情况
function isTwoLineSegmentIntersecting(ls1 = {a, b}, ls2 = {c, d}) {

	// 线段1端点a
	var ax = ls1.a[0];
	var ay = ls1.a[1];
	// 线段1端点b
	var bx = ls1.b[0];
	var by = ls1.b[1];
	// 线段2端点c
	var cx = ls2.c[0];
	var cy = ls2.c[1];
	// 线段2端点d
	var dx = ls2.d[0];
	var dy = ls2.d[1];

	// 计算夹角
	function getAngel(sx, sy, ex, ey) {

		// 1.计算余弦值 = 数量积(两向量乘积和) / 向量a的模(模表示两点距离) / 向量b的模 
		var np = sx * ex + sy * ey;
		var va = Math.sqrt(Math.pow(sx, 2) + Math.pow(sy, 2));
		var vb = Math.sqrt(Math.pow(ex, 2) + Math.pow(ey, 2));
		var cos = np / va / vb;

		// 2.获取角度 = Math.acos(cos) * 180 / Math.PI
		return Math.acos(cos) * 180 / Math.PI;
	}

	// 只要有一种情况满足内角和为360，则判定两线段不相交
	// 端点连接情况1
	var a1 = getAngel(cx - ax, cy - ay, bx - ax, by - ay);
	var a2 = getAngel(ax - cx, ay - cy, dx - cx, dy - cy);
	var a3 = getAngel(ax - bx, ay - by, dx - bx, dy - by);
	var a4 = getAngel(cx - dx, cy - dy, bx - dx, by - dy);
	if (Math.round(a1 + a2 + a3 + a4) === 360) return false;

	// 端点连接情况2
	var a5 = getAngel(dx - ax, dy - ay, bx - ax, by - ay);
	var a6 = getAngel(bx - cx, by - cy, dx - cx, dy - cy);
	var a7 = getAngel(ax - bx, ay - by, cx - bx, cy - by);
	var a8 = getAngel(cx - dx, cy - dy, ax - dx, ay - dy);
	if (Math.round(a5 + a6 + a7 + a8) === 360) return false;

	return true;

}

// 解题思路源自：https://zhuanlan.zhihu.com/p/81599182
// 先选择一条线段，验证另一条线段的两个点不在这条线段的同一侧。然后选择另一条线段，用同样的方法进行验证。
function isTwoLineSegmentIntersecting2(ls1 = {a, b}, ls2 = {c, d}) {

	// 线段1端点a
	var ax = ls1.a[0];
	var ay = ls1.a[1];
	// 线段1端点b
	var bx = ls1.b[0];
	var by = ls1.b[1];
	// 线段2端点c
	var cx = ls2.c[0];
	var cy = ls2.c[1];
	// 线段2端点d
	var dx = ls2.d[0];
	var dy = ls2.d[1];

	// 向量叉乘
	function crossMul(x1, y1, x2, y2) {
		return x1 * y2 - x2 * y1;
	}

	// 若(ca x cd) * (cb x cd) <= 0 且 (ac x ab) * (ad x ab) <= 0，说明相交，否则不相交。其中，x表示叉乘，*表示普通乘法
	// ca x cd
	var v1 = crossMul(ax - cx, ay - cy, dx - cx, dy - cy);
	// cb x cd
	var v2 = crossMul(bx - cx, by - cy, dx - cx, dy - cy);

	// ac x ab
	var v3 = crossMul(cx - ax, cy - ay, bx - ax, by - ay);
	// ad x ab
	var v4 = crossMul(dx - ax, dy - ay, bx - ax, by - ay);

	return v1 * v2 <= 0 && v3 * v4 <= 0;
}

var a = [0, 0];
var b = [1, 1];
var c = [2, 1];
var d = [3, 0];

console.time('isTwoLineSegmentIntersecting');
console.log(`两线段{(${a.join(',')}),(${b.join(',')})},{(${c.join(',')}),(${d.join(',')})}${isTwoLineSegmentIntersecting({a,b},{c,d})?'':'不'}相交`);
console.timeEnd('isTwoLineSegmentIntersecting');

console.time('isTwoLineSegmentIntersecting2');
console.log(`两线段{(${a.join(',')}),(${b.join(',')})},{(${c.join(',')}),(${d.join(',')})}${isTwoLineSegmentIntersecting2({a,b},{c,d})?'':'不'}相交`);
console.timeEnd('isTwoLineSegmentIntersecting2');