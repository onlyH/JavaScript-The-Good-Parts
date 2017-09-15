var empty = [];
var numbers = [
	'zeor', 'one', 'two', 'three', 'four',
	'five', 'six', 'seven', 'eight', 'nine'
]
//继承Array.prototype，继承大量的方法，有length属性
empty[1]; //undefined
numbers[1]; //'one'
empty.length //0
numbers.length //10

var numbers = {
	'0': 'zero',
	'1': 'one',
	'2': 'two',
	'3': 'three',
	'4': 'four',
	'5': 'five'
}
//继承Object.prototype，没有length属性

var misc = [
	'string', 98.6, true, false, null, undefined, ['nested', 'array'], {
		object: true
	},
	NaN, Infinity
]

misc.length;

var myArray = [];
myArray.length; //0

myArray[1000000] = true;
myArray.length; //1000001

numbers.length = 3; //['zero','one','two']
numbers[numbers.length] = 'shi' //['zero','one','two','shi']
numbers.push('go') //['zero','one','two','shi','go']

delete numbers[2]; //['zero','one',undefined,'shi','go']
//第一个是序号,第二个是删除的个数
numbers.splice(2, 1); //['zero','one','shi','go']
//枚举
for(var i = 0; i < myArray.length; i += 1) {
	console.log(myArray[i])
}
//判断一个对象是否为数组
var is_array = function(value) {
	return Object.prototype.toString.apply(value) === '[object Array]'
}
//数组的方法被储存在Array.prototype里。和Object.prototype一样可以扩充
//添加方法,允许对数组进行计算
Array.method('reduce', function(f, value) {
	for(var i = 0; i < this.length; i += 1) {
		value = f(this[i], value)
	}
	return value;
})
var data = [4, 8, 15, 16, 23, 42];

var add = function(a, b) {
	return a + b;
}

var mult = function(a, b) {
	return a * b;
}
var sum = data.reduce(add, 0) //108

var product = data.reduce(mult, 1) //7418880

data.total = function() { //数组就是对象
	return this.reduce(add, 0)
}
total = data.total(); //108

Array.dim = function(dimension, initial) {
	var a = [];
	for(var i = 0; i < dimension.length; i++) {
		a[i] = initial;
	}
	return a;
}
var myarray = Array.dim(10, 0)

var my = {
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8]
}
my[2][1] //7

//创建二维数组必须要自己去创建那个第二维的数组
for(i = 0; i < n; i += 1) {
	my_array[i] = []
}

//一个空矩阵的每个单元会拥有一个初始化undefined,如果希望他有不同的值,需要设置
Array.matrix = function(m, n, initial) {
	var a, i, j, mat = [];
	for(i = 0; i < m; i++) {
		a = [];
		for(j = 0; j < n; j++) {
			a[j] = initial;
		}
		mat[i] = a;
	}
	return mat;
}
//构造一个用0填充的4*4矩阵
var mymatrix = Array.matrix(4, 4, 0);
console.log(mymatrix[3][3]); //0
//用来构造一个单位矩阵的方法
Array.identity = function(n) {
	var i, mat = Array.matrix(n, n, 0);
	for(i = 0; i < n; i++) {
		mat[i][i] = 1;
	}
	return mat;
}
mymatrix = Array.identity(4);
console.log(mymatrix[3][3]) //1