let arr=[];

function obj(){
    this.hello="test";
}

let first=new obj();
let second=new obj();
arr.push(first);
arr.push(second);
console.log(arr[0].hello);