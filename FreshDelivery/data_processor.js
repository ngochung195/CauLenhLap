// let orderList = [
//     { id: 101, amount: 150000, status: "pending" },
//     { id: 102, amount: 200000, status: "pending" },
//     { id: 103, amount: 50000, status: "pending" }
// ];

const orderList = [
    // --- KHỐI 1: Đơn hàng hợp lệ (Dùng để đối chiếu) ---
    { id: 1, amount: 100000, status: "pending" },
    { id: 2, amount: 250000, status: "pending" },
    { id: 3, amount: 50000, status: "pending" },

    // --- KHỐI 2: Dị thường về "amount" (Tiền tệ) ---
    { id: 4, amount: -50000, status: "pending" },      // Số âm (Dễ làm sai lệch tổng doanh thu)
    { id: 5, amount: 0, status: "pending" },           // Bằng 0
    { id: 6, amount: "150000", status: "pending" },    // Chuỗi số (Cẩn thận bị cộng chuỗi: "0" + "150000")
    { id: 7, amount: "Không có tiền", status: "pending" }, // Chuỗi chữ (Dễ gây ra NaN)
    { id: 8, amount: NaN, status: "pending" },         // Giá trị NaN trực tiếp
    { id: 9, amount: Infinity, status: "pending" },    // Vô cực (Bảo đảm phá nát hàm tính tổng)
    { id: 10, amount: undefined, status: "pending" },  // Thuộc tính amount bị undefined
    { id: 11, amount: null, status: "pending" },       // Thuộc tính amount bị null

    // --- KHỐI 3: Dị thường về cấu trúc Object đơn hàng ---
    null,                                              // Phần tử hoàn toàn là null (Gây lỗi: Cannot read properties of null)
    undefined,                                         // Phần tử hoàn toàn là undefined
    {},                                                // Object rỗng không có thuộc tính nào
    [],                                                // Mảng rỗng nằm lạc loài trong mảng object
    "Một chuỗi lạc loài",                               // Sai hẳn kiểu dữ liệu của phần tử
    12345,                                             // Số lạc loài

    // --- KHỐI 4: Dị thường về Id ---
    { id: null, amount: 120000, status: "pending" },
    { id: "ID_BỊ_TRÙNG", amount: 90000, status: "pending" },
    { id: "ID_BỊ_TRÙNG", amount: 80000, status: "pending" }, // Trùng ID
    { id: 12, amount: 70000, status: "pending" },

    // --- KHỐI 5: Dị thường về Status ---
    { id: 13, amount: 60000, status: null },           // Status là null
    { id: 14, amount: 110000, status: undefined },      // Status là undefined
    { id: 15, amount: 30000, status: "CANCELED" },     // Trạng thái lạ không phải pending
    { id: 16, amount: 45000, status: "" },             // Trạng thái chuỗi rỗng

    // --- KHỐI 6: Khối dữ liệu hợp lệ xen kẽ để test vòng lặp tiếp tục chạy tốt ---
    { id: 17, amount: 200000, status: "pending" },
    { id: 18, amount: 150000, status: "pending" },
    { id: 19, amount: 85000, status: "pending" },
    { id: 20, amount: 95000, status: "pending" },

    // --- KHỐI 7: Object bị lồng sâu hoặc sai lệch schema ---
    { id: 21, amount: { value: 50000 }, status: "pending" }, // amount lại là một object khác
    { id: 22, AMOUNT: 300000, status: "pending" },      // Viết hoa sai tên thuộc tính (AMOUNT)
    { id: 23, status: "pending" },                     // Thiếu hoàn toàn thuộc tính amount
    { id: 24, id_don_hang: 24, amount: 20000 },        // Sai hoàn toàn cấu trúc key

    // --- KHỐI 8: Thêm dữ liệu hợp lệ cho đủ số lượng 50 ---
    { id: 25, amount: 100000, status: "pending" },
    { id: 26, amount: 120000, status: "pending" },
    { id: 27, amount: 130000, status: "pending" },
    { id: 28, amount: 140000, status: "pending" },
    { id: 29, amount: 150000, status: "pending" },
    { id: 30, amount: 160000, status: "pending" },
    { id: 31, amount: 170000, status: "pending" },
    { id: 32, amount: 180000, status: "pending" },
    { id: 33, amount: 190000, status: "pending" },
    { id: 34, amount: 200000, status: "pending" },
    { id: 35, amount: 210000, status: "pending" },
    { id: 36, amount: 220000, status: "pending" },
    { id: 37, amount: 230000, status: "pending" },
    { id: 38, amount: 240000, status: "pending" },
    { id: 39, amount: 250000, status: "pending" },
    { id: 40, amount: 260000, status: "pending" },
    { id: 41, amount: 270000, status: "pending" },
    { id: 42, amount: 280000, status: "pending" },
    { id: 43, amount: 290000, status: "pending" },
    { id: 44, amount: 300000, status: "pending" },
    { id: 45, amount: 310000, status: "pending" },
    { id: 46, amount: 320000, status: "pending" },
    { id: 47, amount: 330000, status: "pending" },
    { id: 48, amount: 340000, status: "pending" },
    { id: 49, amount: 350000, status: "pending" },
    { id: 50, amount: 400000, status: "pending" }
];

let drivers = 2;

function calculateTotal(orders) {
    let total = 0;
    for (let i = 0; i < orders.length; i++) {
        if (!orders[i] || typeof orders[i] !== 'object') continue;

        if (typeof orders[i].amount !== 'number' || orders[i].amount <= 0) {
            console.warn(`[Tính tổng] Bỏ qua đơn hàng lỗi ID: ${orders[i].id} do số tiền không hợp lệ.`);
            continue;
        }
        total += orders[i].amount;
    }
    return total;
}

function ship(orders, driversAvailable) {
    let i = 0;
    while (i < orders.length) {
        if (driversAvailable <= 0) {
            console.log(`[Ship] HẾT TÀI XẾ KHẢ DỤNG. Dừng điều phối đơn hàng.`);
            break;
        }

        let order = orders[i];

        if (!order || typeof order !== 'object' || order.status !== "pending") {
            console.warn(`[Ship] Bỏ qua phần tử lỗi hoặc đơn không ở trạng thái pending tại vị trí ${i}.`);
            i++;
            continue;
        }

        order.status = "processing";
        driversAvailable--;
        console.log(`[Ship] Đơn hàng ${order.id} đang xử lý. Tài xế còn lại: ${driversAvailable}`);

        i++;
    }
    return driversAvailable;
}

function fetchOrdersMock(isErrorScenario = false) {
    console.log("--> Đang kết nối và đọc dữ liệu...");
    return isErrorScenario ? [] : orderList;
}

function dataInitializationProcess(simulateError = false) {
    let retryCount = 0;
    const maxRetries = 3;
    let fetchedData = [];
    let isSuccess = false;

    do {
        fetchedData = fetchOrdersMock(simulateError);

        if (fetchedData && fetchedData.length > 0) {
            console.log("Lấy dữ liệu thành công!");
            isSuccess = true;
        } else {
            retryCount++;
            console.warn(`Dữ liệu trống hoặc lỗi! Đang thử lại lần ${retryCount}/${maxRetries}...`);
        }

    } while (!isSuccess && retryCount < maxRetries);

    if (isSuccess) {
        return fetchedData;
    } else {
        console.error("Thất bại: Đã thử lại 3 lần nhưng không thể lấy được dữ liệu.");
        return null;
    }
}

// --- CHẠY THỬ NGHIỆM ---

console.log("Tổng doanh thu trước khi ship:", calculateTotal(orderList));

ship(orderList, drivers);

console.log("Trạng thái đơn hàng sau khi điều phối tài xế:", orderList);

console.log("\n--- THỬ NGHIỆM 1: Trường hợp mạng ổn định (Thành công ngay từ lần đầu) ---");
let data1 = dataInitializationProcess(false);

console.log("\n--- THỬ NGHIỆM 2: Trường hợp lỗi hệ thống (Sẽ chạy do-while 1 lần đầu + 3 lần retry) ---");
let data2 = dataInitializationProcess(true);