Function.prototype.method = function (name, func) {
    this.prototype[name] = func
    return this
}

String.method("deentityify", function(){
    var entity = {
        quot: '"',
        lt: '<',
        gt: '>'
    }
    return function(){
        return this.replace(/&([^&;]+);/g,
            function(a, b){
                var r = entity[b]
                return typeof r ==='string' ? r : a
            })
    }
}())

var x = "<h1>heading 1</h1>"
x.deentityify() 

var walk_the_DOM = function(node, func){
    func(node)
    node = node.firstChild
    while(node){
        walk_the_DOM(node, func)
        node = node.nextSibling
    }
}

var getElementsByAttribute = function (attr, value) {
    var results =[]

    walk_the_DOM(document.body, function (node) {
        var actual = node.nodeType === 1 && node.getAttribute(attr)
        if (typeof actual === 'string' &&
                (actual === value ||typeof value !== 'string')) {
            results.push(node)
        }
    })
    return results
}

var fade = function (node) {
    var level = 1
    var step = function () {
        var hex = level.toString(16)
        node.style.backgroundColor = '#ffff'+hex+hex
        if (level < 15) {
            level += 1
            setTimeout(step, 100)
        }
    }    
    setTimeout(step, 100)
}

var add_the_handlers = function (nodes) {
    var i
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].onclick = function (i) {
            return function (e) {
                alert(i)
            }
        }(i)
        
    }
}

var add = function(a, b){
    return a + b
}
// 级联 return thos;
// curry
Function.method('curry', function () {
    var slice = Array.prototype.slice,
        args = slice.apply(arguments),
        that = this
    return function(){
        return that.apply(null, args.concat(slice.apply(arguments)))
    }
})

add1 = add.curry(1)
console.log(add1(111))

var memoizer = function (memo, fundamental){
    var shell = function(n){
        var result = memo[n]
        if (typeof result !== 'number') {
            result = fundamental(shell, n)
            memo[n] = result
        }
        return result
    }
    return shell
}

var fibonacci = memoizer([0, 1], function(shell, n){
    return shell(n - 1) + shell(n - 2)
})
console.time('1')
console.log(fibonacci(1000))
console.timeEnd('1')
console.time('2')
console.log(fibonacci(1001))
console.timeEnd('2')
console.time('3')
console.log(fibonacci(5))
console.timeEnd('3')