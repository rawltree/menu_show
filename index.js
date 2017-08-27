// error
var add = function (a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw{
            name: 'TypeError',
            message: 'add require number input'
        }
    }
    return a + b
}

try {
    add("seven")
}catch(e){
    console.log(e.name)
}

Function.prototype.method = function (name, func) {
    this.prototype[name] = func
    return this
}
String.method('trim', function(){
    return this.replace(/^\s+|\s+$/g, '')
})
var neat = "aeknjkaw sd          "
var jhon = neat.trim()

add.method('say', function(){
    console.log("Function method")
    return 0
})

// add.say()
add.prototype.say()

fade(document.body)

add_the_handlers(document.body.children)