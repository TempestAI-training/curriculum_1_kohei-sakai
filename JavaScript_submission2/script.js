const N = Number(window.prompt("人数を入力してください"));
const array = [];

for(let i=1;i<=N;i++) {
    let x = Number(window.prompt(`${i}人目の点数を入力してください`));
    array.push(x);
}

function assignGrades(array) {
    newArray = array.map((el) => {
        return el >= 80 ? 'A':
        el >= 60 ? 'B':
        el >= 40 ? 'C':
        el >= 20 ? 'D':
        'E'
    });
    return newArray;
}

console.log(assignGrades(array));