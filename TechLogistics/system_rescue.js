function syncOrders() {
    const maxAttempts = 5;

    console.log("Bắt đầu đồng bộ...");

    for (let attempts = 1; attempts <= maxAttempts; attempts++) {
        let networkError = true; // Giả lập luôn bị lỗi mạng

        if (networkError) {
            console.log(`Lỗi mạng lần ${attempts}, thử lại...`);
            // Vòng lặp 'for' sẽ tự động tăng 'attempts' sau mỗi chu kỳ, không lo bị nghẽn
            continue;
        }

        console.log("Đồng bộ thành công!");
        break;
    }

    console.log("Kết thúc tiến trình đồng bộ.");
}

function findDuplicateOrdersOptimizedNested(orders) {
    let duplicates = [];
    let iterations = 0;

    for (let i = 0; i < orders.length; i++) {
        for (let j = i + 1; j < orders.length; j++) {
            iterations++;

            if (orders[i] === orders[j]) {
                // Đã phát hiện trùng lặp!
                if (!duplicates.includes(orders[i])) {
                    duplicates.push(orders[i]);
                }
                // NGẮT LẶP SỚM: Không cần kiểm tra các phần tử phía sau j nữa
                break;
            }
        }
    }
    console.log(`Số bước lặp thực tế (j = i + 1 + BREAK): ${iterations}`);
    return duplicates;
}

// Chạy thử nghiệm với dữ liệu mẫu

syncOrders();
const dummyOrders = ["VN123", "VN456", "VN789", "VN123", "VN999", "VN456"];
console.log("Kết quả:", findDuplicateOrdersOptimizedNested(dummyOrders));

