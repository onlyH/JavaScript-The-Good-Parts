//全局变量
var foo = value;
window.foo = value;
foo = value;

//parseInt是一个把字符串转换为整数的函数,遇到非数字时会停止解析,parseInt('16') === parseInt('16 tins'),如果第一个字符是0，字符串会基于八进制而不是十进制来求值，在八进制中，8和9不是数字，都会产生0作为结果，可以接受基数作为参数，parseInt('08',10) == 8,

typeof NaN === 'number' //不是数字
NaN === NaN //false
NaN !== NaN //true
isNaN(NaN); //true
isNaN(0); //false
isNaN('oops') //true
isNaN('0') //false
//typeof不能判别出null与对象,写一个判断,null为假值,而所有对象值为真
if(my_value && typeof my_value === 'object') { //my_value是一个对象或数组
	//...
}
//判断一个值是否可用数组的最佳办法是使用isFinite,会筛选掉NaN和Infinity
var isNumber = function isNumber(value) {
	return typeof value === 'number' && isFinite(value)
}
//typeof运算符不能辨别数组和对象,要判断一个值是否为数组,还需要检查他的constructor属性
if(my_value && typeof my_value === 'object' && my_value.constructor === Array) {
	//...my_value是一个数组
}
if(Object.prototype.toString.apply(my_value) === '[object Array]') {
	//my_value确实是一个数组，能分辨出arguments并不是一个数组
}

//假值,全部都是假，但是不可互换
值, 类型
0, Number
NaN, Number
'', String
false, Boolean
null, Object
undefined, Undefined

//hasOwnProperty方法被用做一个过滤器去避开for in语句的一个隐患,但它只是一个方法,不是运算符,所以在任何对象中,它可能被一个不同的函数甚至一个非函数的值所替换

//计算一段文本中每个单词出现的次数
var i;
var word;
var text = 'this orcale of confort has so pleased me,' + 'that when i am in heaven i shall desire' + 'to see that this child does,' + 'and praise my constructor';
var words = text.toLowerCase().split(/[\s,.]+/);
var count = {};
for(i = 0; i < words.length; i++) {
	word = words[i];
	if(typeof count[word] === 'number') {
		count++;
	} else {
		count[word] = 1;
	}
}