//js中函数就是对象,对象是'名／值'对的集合并拥有一个连接到原型对象的隐藏链接,对象字面量产生的对象连接到Obejct.prototype,函数对象链接到Function.prototype,原型对象本身连接到Obejct.prototype,每个函数在创建时附有两个附加的隐形属性:函数的上下文和实现函数行为的代码
//每个函数对象在创建时都有一个prototype属性,他的值拥有constructor属性且值为该函数的对象,函数可以被调用
/*
调用一个函数会暂停当前函数的执行,传递控制权和参数给新函数,除了声明时定义的形式参数,每个函数还接受两个附加的参数:this和arguments,this的值取决于调用模式:
方法调用: abc.method()
构造器: new abc()
apply:abc.apply() ／   abc.call()
直接调用:foo()
*/
var my = { //my为创建的对象
	value: 0, //value属性
	increment: function(inc) { //increment方法
		this.value += typeof inc === 'number' ? inc : 1;
	} //接收一个可选的参数，如果不是数字，默认1
}
my.increment();
console.log(my.value); //1
my.increment(2);
console.log(my.value); //3

my.double = function() {
	var that = this; //定义一个变量赋值为this
	var helper = function() {
		that.value = add(that.value, that.value);
	}
	helper(); //以函数的形式调用helper
}
//以方法的形式调用
my.double();
console.log(my.value)

//如果在一个函数前面带上new来调用，那么背地里将会创建一个连接到该函数的prototype成员的新对象，同时this会被绑定到那个新对象上，new前缀也会改变return语句的行为。
var qun = function(string) { //创建一个名为qun的构造器函数，构造一个带有status属性的对象
	this.status = string;
}
//给qun的所有实例提供一个名为get_status的公共方法
qun.prototype.get_status = function() {
	return this.status;
}
//构造一个qun实例
var mqun = new qun('confused');
console.log(mqun.get_status()) //confused

//apply,call
function abc(a, b) {
	console.log(a + b + this.x + this.y)
}
var c = {
	x: 3,
	y: 4
}
abc.apply(c, [1, 2]) //10
abc.call(c, 2, 3) //12
//arguments 
var sum = function() {
	var i, sum = 0;
	for(i = 0; i < arguments.length; i += 1) {
		sum += arguments[i];
	}
	return sum;
}
console.log(sum(1, 2, 3, 4, 5, 6, 7, 8, 9))
//arguments并不是一个真正的数组,它只是一个'类似数组'的对象,arguments拥有一个length属性,但他没有任何数组的方法。
//return可以使函数提前返回,当前return被执行时,函数立即返回而不再执行余下的语句,一个函数总会有 一个返回值,如果没有指定返回值,则返回undefined,new调用,则返回不是一个对象,而是this
var add = function(a, b) {
	if(typeof a !== 'number' || typeof b !== 'number') {
		throw {
			name: 'TypeError',
			massage: 'add needs numbers'
		}
	}
	return a + b;
}
//throw语句中断函数的执行,会抛出一个exception对象,该对象包含一个用来识别异常的name属性和一个描述性的massage属性,也可以添加其他的属性
var try_it = function() {
	try {
		add('seven');
	} catch(e) {
		console.log(e.name + ',' + e.massage)
	}
}
//通过给Function.prototype增加方法来使的该方法对所有的函数可用:
Function.prototype.method = function(name, func) { //增加一个method方法
	this.prototype[name] = func;
	return this
}
//提取数字中的整数部分,通过给Number.prototype增加一个integer方法
Number.method('integer', function() {
	return Math[this < 0 ? 'ceil' : 'floor'](this);
})
console.log((-10 / 3).integer());
//移除数组串首位空白的方法
String.Method('trim', function() {
	return this.replace(/^\s+|\s+$/g, '')
})
console.log('""' + "  meat ".trim() + '""');
//基本类型的原型使公用结构,所以在类库混用时小心,确定没有该方法时才添加
Function.prototype.method = function(name, func) {
	if(!this.prototype[name]) {
		this.prototype[name] = func;
	}
	return this;
}
//递归:直接或间接的调用自己
var walk_dom = function walk(node, func) {
	func(node);
	node = node.firstChild; //访问树的每一个节点
	while(node) {
		walk(node, func);
		node = node.nextSibling; //调用函数，依次传递每个节点给他，walk_dom调用自身去处理每一个节点
	}
}
var getElementByAttribute = function(att, value) {
	var results = [];
	walk_dom(document.body, function(node) {
		var actual = node.nodeType === 1 && node.getAttribute(att);
		if(typeof actual === 'string' && (actual === value || typeof value !== 'string')) {
			results.push(node)
		}
	})
	return results;
}
//构建尾递归的函数,返回自身调用的结果
var func = function func(i, a) {
	a = a || 1;
	if(i < 2) {
		return a;
	}
	return func(i - 1, a * i);
}
console.log(func(4));
//作用域的好处是内部函数可以访问外部函数的参数和变量（除了this和arguments）
var my = (function() {
	var value = 0;
	return {
		increment: function(inc) {
			value += typeof inc === 'number' ? inc : 1;
		}
		getValue: function() {
			return value;
		}
	}
}());
//通过调用的形式去初始化my,把调用该函数后返回的结果赋值给他，该函数会返回一个对象字面量.函数里定义来一个value变量,该变量对increment和getValue方法总是可用的,但函数的作用域使得它对其他的程序来说是不可见的，
var qun = function(status) {
	return {
		get_status: function() {
			return status;
		}
	}
}
var myqun = qun('amazed');
console.log(myqun.get_status());

var fade = function(node) {
	var level = 1;
	var step = function() {
		var hex = level.toString(16)
		node.style.backgroundColor = '#fff' + hex + hex;
		if(level < 15) {
			level += 1;
			setTimeout(step, 100)
		}
	}
	setTimeout(step, 100)
}
fade(document.body);

var add = function(nodes) {
	var helper = function(i) {
		return function(e) {
			alert(i)
		}
	}
	for(var i = 0; i < nodes.length; i += 1) {
		node[i].onclick = helper(i)
	}
}
//同步请求会进入假死状态,所以最好用异步,提供一个当服务器的响应到达时随即触发的回调函数,异步函数立即返回,这样客户端就不会被阻塞
requset = prepare();
send_request(requset, function(response) {
	display(response);
})
//传递一个函数作为参数给send_requrest函数，一旦接收到响应，就会被调用。
//使用函数和闭包来构造模块,模块是一个提供接口却隐藏状态与现实的函数或对象,通过使用函数产生模块,摒弃全局变量的使用

//联级:返回this而不是undefined,在单独一条语句中一次调用同一个对象的很多方法,这些方法每一个都返回该对象,所以每次调用返回的结果可以被下一次调用所用
getElement('myBox')
	.move(350, 350)
	.width(100)
	.height(100)
	.color('red')
	.border('10px outset')
	.padding('4px')
	.appendText('please stand by')
	.on('mousedown', function(m) {
		this.startDrag(m, this.getNinth(m));
	})
	.on('mousemove', 'drag')
	.on('mouseup', 'stopDrag')
	.later(2000, function() {
		this
			.color('yellow')
			.setHTML('what hath god wraught')
			.slide(400, 40, 200, 200)
	})
	.tip('this box is resizeable');

Function.method('curry', function() {
	var slice = Array.prototype.slice;
	args = slice.apply(arguments);
	that = this;
	return function() {
		return that.apply(null, args.concat(slice.apply(arguments)));
	}
})

var fibonacci = function() {
	var memo = [0, 1];
	var fib = function(n) {
		var result = memo[n];
		if(typeof result !== 'number') {
			result = fib(n - 1) + fib(n - 2);
			memo[n] = result;
		}
		return result;
	}
	return fib;
}()

var memoizer = function(memo, formula) {
	var recur = function(n) {
		var result = memo[n];
		if(typeof result !== 'number') {
			result = formula(recur, n);
			memo[n] = result;
		}
		return result;
	}
	return recur;
}
/*
memoizer函数去的一个初始的memo函数和formula函数,返回一个管理memo存储和在需要时调用formula函数的recur函数,把这个函数和他的参数传递给formula函数
使用memoizer函数来定义fibonacci函数,提供出书哈的memo数组和formula函数:
*/
var fibonacci = memoizer([0, 1], function(recur, n) {
	return recur(n - 1) + recur(n - 2);
});
//eg
var factorial = memoizer([1, 1], function(recur, n) {
	return n * recur(n - 1);
})
//继承
//1,伪类
//当一个函数对象被创建时,Function构造器产生的函数对象会运行类似这样的代码:
this.prototype = {
	constructor: this
}
//构造器调用模式:new前缀去调用一个函数时,函数执行的方式会被修改,如果new运算符是一个方法而不是一个运算符:
Function.method('new', function() {
	//创建一个新对象，继承自构造器函数的原型对象
	var that = Object.create(this.prototype);
	//	调用构造器函数,绑定-this-到新对象
	var other = this.apply(that, arguments);
	//	如果它的返回值不是一个对象,就返回该新对象
	return(typeof other === 'object' && other) || that;
})
//定义一个构造器并扩充他的原型
var Mammal = function(name) {
	this.name = name;
}
Mammal.prototype.get_name = function() {
	return this.name;
}
Mammal.prototype.says = function() {
	return this.saying || '';
}
var myMammal = new Mammal('herb the mammal');
var name = myMammal.get_name();
//构造一个伪类来继承Mammal,这是通过定义他的constructor函数并替换它的prototype为一个Mammal的实例来实现的
var cat = function(name) {
	this.name = name;
	this.saying = 'meow';
}
//替换cat.prototype为一个新的Mammal实例
cat.prototype = new Mammal();
//扩充新原型对象,增加purr,get_name方法
cat.prototype.purr = function(n) {
	var i, s = '';
	for(i = 0; i < n; i += 1) {
		if(s) {
			s += '-';
		}
		s += 'r';
	}
	return s;
}
cat.prototype.get_name = function() {
	return this.says() + '' + this.name + '' + this.says();
}
var mycat = new cat('henrietta'); //'meow'
var says = mycat.says(); //'r-r-r-r-r'
var purr = mycat.purr(5); //'meow henrietta meow'
var name = mycat.get_name();
//隐藏一些细节,创建inherits方法
Function.method('inherits', function(parent) {
	this.prototype = new parent();
	return this;
})
var cat = function(name) {
		this.name = name;
		this.saying = 'meow';
	}
	.inherits(Mammal)
	.method('purr', function(n) {
		var i, s = '';
		for(i = 0; i < n; i += 1) {
			if(s) {
				s += '-';
			}
			s += 'r';
		}
		return s;
	})
	.method('get_name', function() {
		return this.says() + '' + this.name + '' + this.says;
	})
//对象说明符
var myObject = maker(f, l, m, c, s); //bad
var myObject = maker({
	first: f,
	middle: m,
	last: l,
	state: s,
	city: c
})
//原型
//用对象字面量去构造一个有用的对象
var myMammal = {
	name: 'herb the mammal',
	get_name: function() {
		return this.name;
	}
	says: function() {
		return this.saying || '';
	}
}
var mycat = Object.create(myMammal);
mycat.name = 'henrietta';
mycat.saying = 'meow';
mycat.purr = function(n) {
	var i, s = '';
	for(i = 0; i < n; i += 1) {
		if(s) {
			s += '-';
		}
		s += 'r'
	}
	return s;
}
mycat.get_name = function() {
	return this.says + '' + this.name + '';
}
//在遇到一个{时block函数被调用,parse函数将从scope中寻找符号,并且当它定义了一个新的符号时扩充scope
var block = function() {
	//	记住当前的作用域,构造一个包含了当前作用域中所有对象的新作用域
	var oldScope = scope;
	scope = Object.create(scope);
	//	传递左花括号作为参数调用advance
	advance('{');
	//	使用新的作用域进行解析
	parse(scope);
	//	传递右花括号作为参数调用advance并抛弃新作用域,恢复原来老的作用域
	advance('}');
	scope = oldScope;
}