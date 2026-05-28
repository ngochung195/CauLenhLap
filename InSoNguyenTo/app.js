
let numbers;
do {
    numbers = Number(prompt("Số lượng số nguyên tố cần in"));

    if (isNaN(numbers) || numbers <= 0) {
        alert("Vui lòng nhập số nguyên dương hợp lệ!");
    }
} while (isNaN(numbers) || numbers <= 0);

let count = 0;

let number = 2;

let result = "";

while (count < numbers) {
    let isPrime = true;

    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) {
            isPrime = false;
            break;
        }
    }

    if (isPrime) {
        result += number + " ";
        count++;
    }

    number++;
}
document.getElementById('snt').innerHTML = result;

