var a = [1, 2, 3, 4, 5];
var b = ['a', 'b', 'c', 'd']
var c = a.concat(b, true); //(9) [1, 2, 3, 4, 5, "a", "b", "c", "d",true]
//join构造成一个字符串，先把array中的每个元素构造成字符串，接着用一个separator分隔符把他们连接在一起，默认的separator是一个逗号，想要做到无间隔的连接，可以使用空字符串作为separator
var a = ['a', 'b', 'c'];
a.push('d');
var c = a.join(''); //"abcd"
var d = a.join('.'); //"a.b.c.d"
var f = a.join('!'); //"a!b!c!d"
var e = a.join(',') //"a,b,c,d"

var a = ['a', 'b', 'c'];
var b = a.pop(); //'c'

Array.method('pop', function() {
	return this.splice(this.length - 1, 1)[0];
})

//push会修改array
var a = ['a', 'b', 'c']; //(5) ["a", "b", "c", Array(3), true]
var b = ['x', 'y', 'z'];
var c = a.push(b, true); //5

Array.method('push', function() {
	this.splice.apply(this, [this.length, 0].concat(Array.prototype.slice.apply(arguments)));
	return this.length;
})

var a = [1, 2, 3, 4, 5]; //5,4,3,2,1
var b = a.reverse(); //5,4,3,2,1

var a = ['a', 'b', 'c']; //['b','c']
var c = a.shift(); //'a'

Array.method('shift', function() {
	return this.splice(0, 1)[0];
})

var a = ['a', 'b', 'c'];
var b = a.slice(0, 1); //'a'
var c = a.slice(1); //['b','c']
var d = a.slice(1, 2); //'b'

var a = ['c', 'de', 'zw', 'a'];
var b = a.sort(); //var a = ['c','de','zw','a'];

var a = [32, 1, 43, 5, 3];
var b = a.sort(function(a1, a2) {
	return a1 - a2
}) //(5) [1, 3, 5, 32, 43]

//字符串排序
var aa = ['ss', 'bb', 'a', 4, 8, 15, 16, 23, 42]
aa.sort(function(a, b) {
	if(a === b) {
		return 0;
	}
	if(typeof a === typeof b) {
		return a < b ? -1 : 1;
	}
	return typeof a < typeof b ? -1 : 1;
}) //(9) [4, 8, 15, 16, 23, 42, "a", "bb", "ss"]

var by = function(name) { //接受一个成员名字符串作为参数
	return function(o, p) {
		var a, b;
		if(typeof o === 'object' && typeof p === 'object' && o && p) {
			a = o[name];
			b = p[name];
			if(a === b) {
				return 0;
			}
			if(typeof a === typeof b) {
				return a < b ? -1 : 1;
			}
			return typeof a < typeof b ? -1 : 1;
		} else {
			throw {
				name: 'error',
				massage: 'expected an object when sorting' + name
			}
		}
	}
} //并返回一个可以用来对包含该成员的对象数组进行排序和比较函数
var nums = [{
		first: 'joe',
		last: 'besser'
	},
	{
		first: 'moe',
		last: 'howard'
	},
	{
		first: 'joe',
		last: 'derita'
	},
	{
		first: 'shemp',
		last: 'howard'
	},
	{
		first: 'larry',
		last: 'fine'
	},
	{
		first: 'curly',
		last: 'howard'
	},
]
nums.sort(by('first'));
//{first: "curly", last: "howard"}
//{first: "joe", last: "besser"}
//{first: "joe", last: "derita"}
//{first: "larry", last: "fine"}
//{first: "moe", last: "howard"}
//{first: "shemp", last: "howard"}

nums.sort(by('first')).sort(by('last')); //同上,优化

var by = function(name, minor) {
	return function(o, p) {
		var a, b;
		if(o && p && typeof o === 'object' && typeof p === 'object') {
			a = o[name];
			b = p[name];
			if(a === b) {
				return typeof minor === 'function' ? minor(o, p) : 0;
			}
			if(typeof a === typeof b) {
				return a < b ? -1 : 1;
			}
			return typeof a < typeof b ? -1 : 1;
		} else {
			throw {
				name: 'error',
				message: 'excepted an object when sorting by' + name
			}
		}
	}
}
nums.sort(by('last', by('first')));

var a = ['a', 'b', 'c']; //(4) ["a", "ache", "bug", "c"]
var r = a.splice(1, 1, 'ache', 'bug'); //["b"]

Array.method('splice', function(start, deleteCount) {
	var max = Math.max,
		min = Math.min,
		delta,
		element,
		insertCount = max(arguments.length - 2, 0),
		k = 0,
		len = this.length;
	new_len,
	result = [],
		shift_count;

	start = start || 0;
	if(start < 0) {
		start += len;
	}
	start = max(min(start, len), 0);
	deleteCount = max(min(typeof deleteCount === 'number' ? deleteCount : len, len - start), 0);
	delta = insertCount - deleteCount;
	new_len = len + delta;
	while(k < deleteCount) {
		element = this[start + k];
		if(element !== undefined) {
			result[k] = element;
		}
		k += 1;
	}
	shift_count = len - start - deleteCount;
	if(delta < 0) {
		k = start + insertCount;
		while(shift_count) {
			this[k] = this[k = delta];
			k++;
			shift_count--;
		}
		this.length = new_len;
	} else if(delta > 0) {
		k = 1;
		while(shift_count) {
			this[new_len - k] = this[len - k];
			k++;
			shift_count--;
		}
		this.length = new_len;
	}
	for(k = 0; k < insertCount; k++) {
		this[start + k] = arguments[k + 2];
	}
	return result;
})

var a = [1, 2, 3, 4, 5, 6]; //(9) [33, 22, 11, 1, 2, 3, 4, 5, 6]
var b = a.unshift(33, 22, 11); //9

Array.method('unshift', function() {
	this.splice.apply(this, [0, 0].concat(Array.prototype.slice.apply(arguments)));
	return this.length;
})
//apply方法调用function,传递一个会被绑定到this上的对象和一个可选的数组作为参数
Function.method('bind', function(that) {
	var method = this,
		slice = Array.apply(arguments, [1]);
	return function() {
		return method.apply(that, args.concat(slice.apply(arguments, [0])));
	}
})
var x = function() {
	return this.value;
}.bind({
	value: 666
});
alert(x()); //666

//toExponential方法把这个number转换成一个指数形式的字符串.小数值必须是在0-20:
console.log(Math.PI.toExponential(0));
console.log(Math.PI.toExponential(2));
console.log(Math.PI.toExponential(7));
console.log(Math.PI.toExponential(16));
console.log(Math.PI.toExponential());
/*
3e+0
3.14e+0
3.1415927e+0
3.1415926535897931e+0
3.141592653589793e+0
*/
//toFixed方法把number转换为十进制数形式的字符串,小数值0-20,默认0
console.log(Math.PI.toFixed(0));
console.log(Math.PI.toFixed(2));
console.log(Math.PI.toFixed(7));
console.log(Math.PI.toFixed(16));
console.log(Math.PI.toFixed());
/*
3
3.14
3.1415927
3.1415926535897931
3
*/

//toPercision方法把这个number转换为一个十进制数形式的字符串,精度0-21
console.log(Math.PI.toPrecision(2));
console.log(Math.PI.toPrecision(7));
console.log(Math.PI.toPrecision(16));
console.log(Math.PI.toPrecision());
/*
3.1
3.141593
3.141592653589793
3.141592653589793
*/
//toString()方法把number转换为一个字符串,值2-36,默认以10为基数,可以写成String(number);
console.log(Math.PI.toString(2));
console.log(Math.PI.toString(8));
console.log(Math.PI.toString(16));
console.log(Math.PI.toString());
/*
11.001001000011111101101010100010001000010110100011
3.1103755242102643
3.243f6a8885a3
3.141592653589793
*/

//Object.hasOwnProperty(name),object包含了一个名为name的属性,那么hasOwnProperty方法返回true,原型链中的同名属性不会被检查的,这个方法对name就是'hasOwnProperty'时不起作用,此时会返回false
var a = {
	number: true
}; //{number: true}
var b = Object.create(a); //{}
var t = a.hasOwnProperty('number'); //true
var u = b.hasOwnProperty('number'); //false
var d = b.number; //true

//charAt方法返回在string中pos位置处的字符,结果是字符串,小于0或大于等于字符串的长度，会返回空字符串
var name = 'Leccd';
var d = name.charAt(0); //L

String.method('charAt', function(pos) {
	return this.slice(pos, pos + 1)
})

//charCodeAt以整数形式表示的在string中pos位置醋的字符的字符码位,如果pos小于0或大于等于字符串的长度,返回NaN
var name = 'Leccd';
var d = name.charCodeAt(0); //76

var s = "c".concat('a', 't'); //'cat'

//indexOf方法查找另一个字符串,找到了,返回第一个匹配字符的位置,否则返回-1
var a = 'abcdabcd';
var p = a.indexOf('d'); //3
p = a.indexOf('a', 2); //4

var text = 'mississippi';
var p = text.lastIndexOf('ss'); //5
p = text.lastIndexOf('ss', 3); //2
p = text.lastIndexOf('ss', 6) //5

//localeCompare方法比较两个字符串,如果string<that,结果为负数,
var m = ['aaa', 'a', 'aa', 'A', 'Aa', 'AAA'];
m.sort(function(a, b) {
	return a.localeCompare(b);
})
//(6) ["a", "A", "aa", "Aa", "aaa", "AAA"]
//search方法和indexOf方法类似,接受一个正则表达式对象作为参数而不是一个字符串,匹配,返回第一个匹配的首字符位置,不匹配,-1,忽略g标识
var text = 'and in it he says " any damn fool could ';
var p = text.search(/["']/); //18

var text = 'and in it he says " any damn fool could ';
var p = text.slice(18); //"" any damn fool could "
var b = text.slice(0, 3); //"and"
var c = text.slice(-5); //"ould "
var d = text.slice(19, 32); //" any damn foo"

var d = '0123456789';
var a = d.split('', 5); //(5) ["0", "1", "2", "3", "4"]

var ip = '192.168.1.0';
var b = ip.split('.'); //(4) ["192", "168", "1", "0"]

var c = '|a|b|c'.split('|'); //(4) ["", "a", "b", "c"]
var d = 'last,first,middle';
var e = d.split(/\s*,\s*/); //(3) ["last", "first", "middle"]
var f = d.split(/\s*(,)\s*/) //(5) ["last", ",", "first", ",", "middle"]
var w = '|a|b|c'.split(/\|/); //(4) ["", "a", "b", "c"]

//substring 和slice方法一样,只是不能处理负数参数

//toLocaleLowerCase(),toLocaleUpperCase,返回一个新字符串,本地化的规则把这个string中的所有字母转换为小写格式(大写)

//toLowerCase,toUpperCase,返回一个新的字符串,所有字母都被转换为小写(大写)

//String.fromCharCode函数根据一串数字编码返回一个字符串
var a = String.fromCharCode(67, 97, 116); //"Cat"