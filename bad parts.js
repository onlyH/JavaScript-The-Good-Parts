'' == '0' //false
0 == '' //true
0 == '0' //true
false == 'false' //false
false == '0' //true
false == undefined //false
false == null //false
null == undefined //true
'\t\r\n' == 0 //true

'' === '0' //false
0 === '' //false
0 === '0' //false
false === 'false' //false
false === '0' //false
false === undefined //false
false === null //false
null === undefined //false
'\t\r\n' === 0 //false

//避免使用with,eval,setTimeout,setInterval函数,他们接受字符串参数或者函数参数,当传递的是字符串参数时,会像eval那样去处理,避免使用字符串参数

//new Boolean(false)会返回一个对象,该对象有一个valueOf方法会返回被包装的值,不要使用,new Boolean,new Number,new String..new Object,new Array可使用{},[]

//new运算符创建一个继承于其运算数的原型的新对象,然后调用该运算数,把新创建的对象绑定给this,这给运算数一个机会在返回给请求者前自定义新创建的对象,如果忘记使用此new运算符,会得到一个普通的函数调用,并且this被绑定到全局对象,而不是新创建的对象,意味着当你的函数尝试去初始化新成员属性时它将会污染全局变量