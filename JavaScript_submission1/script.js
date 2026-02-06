const N = Number(window.prompt("自然数を入力してください"));
let sum_a = 0;
let sum_b = 0;
const p = document.createElement('p');

for(let i=1;i<=N;i++) {
    if(i%2==0) {
        sum_a += i;
    } else {
        sum_b += i;
    }
}
if(sum_a>sum_b){
    p.textContent=sum_a-sum_b;
} else {
    p.textContent=sum_b-sum_a;
}

document.body.appendChild(p);