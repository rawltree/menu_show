var $ = ready = window.ready = function(fn){  
    if(document.addEventListener){//兼容非IE  
        document.addEventListener("DOMContentLoaded",function(){  
            //注销事件，避免反复触发  
            document.removeEventListener("DOMContentLoaded",arguments.callee,false);  
            fn();//调用参数函数  
        },false);  
    }else if(document.attachEvent){//兼容IE  
        document.attachEvent("onreadystatechange",function(){  
            if(document.readyState==="complete"){  
                document.detachEvent("onreadystatechange",arguments.callee);  
                fn();  
            }  
        });  
    }  
}  

$(function(){
    // menu.click
    var menu = document.getElementsByClassName("menu")[0]
    menu_click(menu)
}) 

function menu_click(d) {
    d.onclick = function(e) {
        var e = e || window.event;
        var target = e.srcElement || e.target;

        if (target.tagName === 'LI') {
            // 判断菜单是已经选中的
            if (hasClass(target, 'enable')) {
                jump_hash(target)
                return 'do nothing'
            }
            //修改menu样式
            removeClass(target, 'disabled')
            var enable = findChild(d, 'enable')
            if (enable == null) {
                throw{
                    name:'initError',
                    message:'生成的菜单错误'
                }
            }
            removeClass(enable, 'enable')
            addClass(enable, 'disabled')
            addClass(target, 'enable')
            //切换类别菜单显示
            //考虑使用#锚点的方式，菜单可以继续上下拖动
            //href#menu
            jump_hash(target)   //js跳转 可能需要改用scroll函数 ，还能加入一点动画效果
                                //case：点击后跳转，操作后再次点击原来的类别菜单不会更新，因为hash没有变化 
        }
    }
}

function jump_hash(t) {
    var span = t.firstElementChild
    var hash = span.dataset.hash
    if (hash === undefined) {
        throw{
            name:'hashError',
            message:'类别生成错误'
        }
    }
    window.location.hash = hash
}
function findChild(obj, cls) {
    var ul = obj.firstElementChild
    var child = ul.firstElementChild
    while (child){
        if (hasClass(child, cls)) {
            return child
        }
        child = child.nextSibling
        if (child.tagName !== 'LI') {
            child = child.nextSibling
        }
    }
    return null
}

function hasClass(obj, cls) {  
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))  
}  
  
function addClass(obj, cls) {  
    if (!this.hasClass(obj, cls)) obj.className += " " + cls 
}  
  
function removeClass(obj, cls) {  
    if (hasClass(obj, cls)) {  
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
        obj.className = obj.className.replace(reg, ' ') 
    }  
}  
  
function toggleClass(obj,cls){  
    if(hasClass(obj,cls)){  
        removeClass(obj, cls);  
    }else{  
        addClass(obj, cls);  
    }  
}

//添加、删除菜的选择后在chosed变量上处理数据
//网页重新加载的时候需要保留数据的化考虑在localStorage储存
var chosed = {}

