/**
 * HỆ THỐNG XỬ LÝ GIAO DỊCH - TECHBANK
 * Đã đóng gói thành hàm để có thể truyền nhiều mảng dữ liệu khác nhau vào Test
 */
function analyzeTransactions(transArray) {
    // NHIỆM VỤ 1: Tính tổng tiền nhận vào (chỉ tính số dương).
    let totalIncome = 0;
    for (let i = 0; i < transArray.length; i++) {
        if (transArray[i] > 0) {
            totalIncome += transArray[i];
        }
    }

    // NHIỆM VỤ 2: Tìm giao dịch đáng ngờ đầu tiên (Giá trị > 10000) và DỪNG LẠI.
    let hasFraud = false;
    let fraudIndex = -1; // Mặc định là -1 nếu không có gian lận
    let i = 0;
    while (i < transArray.length) {
        if (transArray[i] > 10000) {
            hasFraud = true;
            fraudIndex = i; // Lưu lại vị trí tìm thấy để đối chiếu khi test
            break;
        }
        i++;
    }

    // NHIỆM VỤ 3: Gửi báo cáo lên Server. Nếu lỗi, thử lại tối đa 3 lần.
    let attempts = 0;
    let isSuccess = false;
    do {
        attempts += 1;
        isSuccess = (Math.random() > 0.8);
    } while (attempts < 3 && isSuccess == false);

    // Trả về một object chứa toàn bộ kết quả sau khi xử lý để hàm test đọc được
    return { totalIncome, hasFraud, fraudIndex, attempts };
}


// --- TIẾN TRÌNH CHẠY KIỂM THỬ (TEST SUITE) ---
console.log("=== BẮT ĐẦU KIỂM THỬ HỆ THỐNG TECHBANK ===\n");

// Test Case 1: Mảng mặc định
// ĐÃ SỬA: Gọi đúng tên hàm analyzeTransactions thay vì gọi mảng transactions
const test1 = analyzeTransactions([150, -50, 200, -10, 500, 15000, -200, 300]);
console.log("Test Case 1 (Mang mac dinh):");
console.log(`- Tong thu nhap thuc te: ${test1.totalIncome} USD (Ky vong: 16150) -> ${test1.totalIncome === 16150 ? 'PASS ✅' : 'FAIL ❌'}`);
console.log(`- Phat hien gian lan: ${test1.hasFraud} o vi tri ${test1.fraudIndex} -> ${test1.fraudIndex === 5 ? 'PASS ✅' : 'FAIL ❌'}`);
console.log(`- So lan thu gui bao cao: ${test1.attempts} lan.\n`);

// Test Case 2: Toàn giao dịch âm
const test2 = analyzeTransactions([-100, -200, -50]);
console.log("Test Case 2 (Toan giao dich am):");
console.log(`- Tong thu nhap thuc te: ${test2.totalIncome} USD (Ky vong: 0) -> ${test2.totalIncome === 0 ? 'PASS ✅' : 'FAIL ❌'}`);
console.log(`- Phat hien gian lan: ${test2.hasFraud} -> ${test2.hasFraud === false ? 'PASS ✅' : 'FAIL ❌'}\n`);

// Test Case 3: Không có giao dịch gian lận
const test3 = analyzeTransactions([500, 1000, 2000]);
console.log("Test Case 3 (Khong co gian lan):");
console.log(`- Phat hien gian lan: ${test3.hasFraud} -> ${test3.hasFraud === false ? 'PASS ✅' : 'FAIL ❌'}`);
console.log(`- Vi tri index quet: ${test3.fraudIndex} (Ky vong: -1) -> ${test3.fraudIndex === -1 ? 'PASS ✅' : 'FAIL ❌'}\n`);

// Test Case 4: Kiểm thử nghiêm ngặt số lần retry tối đa khi liên tục lỗi
const gocMathRandom = Math.random;
Math.random = () => 0.1; // Khóa cứng kết quả lỗi để test vòng lặp

const test4 = analyzeTransactions([100]);
console.log("Test Case 4 (Kiem tra gioi han Retry khi Server sap hoan toan):");
console.log(`- So lan co gang gui: ${test4.attempts} lan (Ky vong: 3) -> ${test4.attempts === 3 ? 'PASS ✅' : 'FAIL ❌'}`);

// Khôi phục lại hàm Math.random gốc
Math.random = gocMathRandom;

console.log("\n=== KE THUC QUA TRINH KIEM THU ===");