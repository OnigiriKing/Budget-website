const arr = [1,2,3, 2, 7, 2, 8, 5, 7, 9]
var qw = 2;
var str = "123"
var obj = {
    "haha": 1,
    "vee": 2
};
var a = arr.slice();

function calc(val) {
    console.log(this.value * val)
}

arr.forEach(function(curr){
    calc(qw);
})



console.log(Math.max.apply());


