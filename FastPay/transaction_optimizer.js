/**
 * HỆ THỐNG QUÉT GIAO DỊCH - FASTPAY
 */

// 1. Hàm sinh chuỗi ngẫu nhiên làm ID
function generateId(prefix, length = 6) {
    return prefix + Math.random().toString(36).substring(2, 2 + length).toUpperCase();
}

// 2. TỰ ĐỘNG TẠO MẢNG 100 GIAO DỊCH
let transactions = [];
const statuses = ["completed", "pending", "failed"];

for (let i = 1; i <= 100; i++) {
    transactions.push({
        id: `T-${i}`,
        userId: generateId("U", 4),
        amount: Math.floor(Math.random() * 900) + 100,
        status: statuses[Math.floor(Math.random() * statuses.length)]
    });
}

// 3. Tạo ra khoảng 10 cặp trùng lặp dữ liệu (userId và amount giống nhau)
let numDuplicates = 10;
let usedIndices = new Set();

for (let k = 0; k < numDuplicates; k++) {
    let srcIndex = Math.floor(Math.random() * 50);
    let destIndex = Math.floor(Math.random() * 50) + 50;

    if (!usedIndices.has(srcIndex) && !usedIndices.has(destIndex)) {
        transactions[destIndex].userId = transactions[srcIndex].userId;
        transactions[destIndex].amount = transactions[srcIndex].amount;

        usedIndices.add(srcIndex);
        usedIndices.add(destIndex);
    }
}

console.log(`Đã khởi tạo thành công: ${transactions.length} phần tử.`);

// --- CÁC HÀM XỬ LÝ HỆ THỐNG ---

function processPending(data) {
    let i = 0;
    while (i < data.length) {
        if (data[i].status === "pending") {
            // Ẩn log console này đi khi test số lượng lớn để tránh làm chậm trình duyệt
            // console.log("Đang xử lý giao dịch:", data[i].id); 
            i++;
        } else {
            i++;
        }
    }
}

function findDuplicates(data) {
    let duplicateIds = [];
    let loopCount = 0;

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length; j++) {
            loopCount++;
            if (data[i].userId === data[j].userId && data[i].amount === data[j].amount) {
                if (!duplicateIds.includes(data[i].id)) {
                    duplicateIds.push(data[i].id);
                }
                if (!duplicateIds.includes(data[j].id)) {
                    duplicateIds.push(data[j].id);
                }
            }
        }
    }
    console.log(`Số vòng lặp đã chạy (j = i + 1): ${loopCount}`);
    return duplicateIds;
}


// ==================== ĐO THỜI GIAN CHẠY ====================

console.log("\n--- Bắt đầu xử lý pending ---");
console.time("Thời gian xử lý Pending");
processPending(transactions);
console.timeEnd("Thời gian xử lý Pending");

console.log("\n--- Bắt đầu tìm trùng lặp ---");
console.time("Thời gian tìm trùng lặp");
let duplicates = findDuplicates(transactions);
console.timeEnd("Thời gian tìm trùng lặp");

console.log("Các ID bị trùng lặp tìm thấy:", duplicates);