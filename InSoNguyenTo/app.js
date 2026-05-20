let numbers = Number(prompt("Số lượng số nguyên tố cần in"));

let count = 0;

let N = 2;

let Kq = "";

while (count != numbers) {
    let nto = true;

    for (let i = 2; i <= Math.sqrt(N); i++) {
        if (N % i === 0) {
            nto = false;
            break;
        }
    }

    if (nto) {
        Kq += N + " ";
        count++;
    }

    N++;

    document.getElementById('snt').innerHTML = Kq;
}
