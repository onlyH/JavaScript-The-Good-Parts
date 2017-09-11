//简单类型number,string,undefined,null,boolean。除了这些都是对象。对象是属性的容器，其中每个属性都拥有名字和值，属性的名字可以是包括空字符串在内的任意字符串，属性值可以是除了undefined值意外的任何值
//对象字面量
var a = {};
var c = {
	'first': 'lee',
	'last': 'dee'
}

var cc = {
	airline: 'oce',
	number: 32,
	departure: {
		time: 2017 - 3 - 4,
		city: 'usa'
	},
	arrival: {
		time: 2017 - 4 - 2,
		city: 'los'
	}
};

//检索对象中的值：[],.表示，||运算符可以用来填充默认值，尝试检索一个undefined值将会导致TypeError，通过&&运算符可以避免错误。
//对象中的值可以通过赋值语句来更新,如果属性名已经存在于对象中,那么这个属性的值被替换,如果对象之前并没有拥有那个属性名,那么该属性就被扩充到对象中
cc.age = 12;
//对象通过引用来传递值,他们永远不会被拷贝
var x = stooge;
x.nickname = 'lee';
var nick = stooge.nickname;
//x和stooge是指向同一个对象的引用，所以nick为lee

var a = {},
	b = {},
	c = {};
//a,b,c每个都引用一个不同的空对象

a = b = c = {};
//a,b,c都引用同一个空对象

//每个对象都连接到一个原型对象,并且可以继承属性,所有通过对象字面量创建的对象都连接到Obejct.prototype这个js中标准的对象当创建一个新对象时,可以选择某个对象作为他的原型,给Object增加一个beget方法，这个方法创建一个使用原对象作为其原型的新对象。
if(typeof Object.beget !== 'function') {
	Object.beget = function(o) {
		var F = function() {};
		F.prototype = o;
		return new F();
	}
}
var another_stooge = Object.beget(stooge);
//原型链接在更新时是不起作用的，当我们对某个对象做出改变的时候，不会触及到该对象的原型。
//原型链接只有在检索值的时候才被用到,如果尝试去获取对象的某个属性值,且该对象没有此属性名,那么js就会从原型对象中获取属性值,如果那个原型对象也没有该属性,那么再从他的原型中寻找,知道该过程最后到达终点Object.prototype,如果想要的属性完全不存在于原型链中,那么结果就是undefined,这个过程称为委托,原型关系是一种动态关系,添加一个属性到原型中,该属性会立即对所有基于该原型创建的对象可见.
//检查对象并且确定对象有什么属性--typeof，原型链中的任何属性也会产生一个值：
typeof flight.toString //'function'
typeof flight.constructor //'function'
//如果对象拥有独有的属性,hasOwnProperty方法,返回true,不会检查原型链
fligth.hasOwnProperty('number');
//for in 可用来遍历一个对象中的所有属性名,但是顺序不确定,该枚举过程将会列出所有的属性,for 可以顺序,并且不会发掘出原型链中的属性
//delete运算符可以删除对象的属性,移除对象中确定包含的属性,不会触及原型链中的任何对象,删除对象的属性可能会让来自原型链中的属性浮现出来.
abc.name //'lee'
delete abc.name;
abc.name; //'ghh'
//减少全局变量污染==把多个全局变量整理在一个命名空间下
var abc = {};
abc.a = {
	'aaa': 'lee',
	'bbb': 23
}
abc.b = {
	name: 'gege',
	age: 43,
	c: {
		sa: 'dee',
		time: 2012
	},
	c: {
		city: 'usa',
		age: 54
	}
}