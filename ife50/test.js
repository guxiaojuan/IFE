function f() {
    let a = 1
    a=2
    let b = g()
    a=3
    return b
    function g(){
        return a
    }
}
console.log(f())