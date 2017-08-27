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