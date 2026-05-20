/**
 * HỆ THỐNG MEDICORE - MODULE XỬ LÝ DỮ LIỆU ĐỘNG
 */
let patientData = [
    { id: "P001", name: "Nguyen Van A", status: "stable", age: 45, heartRate: 80 },
    { id: "P002", name: "Tran Thi B", status: "critical", age: 60, heartRate: 130 },
    { id: "P003", name: "Le Van C", status: "stable", age: 30, heartRate: 75 },
    { id: "P004", name: "Pham Thi D", status: "critical", age: 72, heartRate: 45 }
];

// YÊU CẦU 1: THUẬT TOÁN TÌM KIẾM (Search)
function findPatientById(dataArray, targetId) {
    for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i].id === targetId) {
            return dataArray[i];
        }
    }
    return null;
}

// YÊU CẦU 2: THUẬT TOÁN LỌC (Filter)
function filterCriticalPatients(dataArray) {
    let result = [];

    for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i].status === "critical") {
            result.push(dataArray[i]);
        }
    }

    return result;
}

// YÊU CẦU 3: THUẬT TOÁN THỐNG KÊ (Aggregate)
function calculateHospitalStats(dataArray) {
    let criticalCount = 0;
    let totalHeartRate = 0;
    let totalPatients = dataArray.length;

    for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i].status === "critical") {
            criticalCount++;
        }
        totalHeartRate += dataArray[i].heartRate;
    }

    let averageHeartRate = totalPatients > 0 ? (totalHeartRate / totalPatients) : 0;

    return {
        totalPatients, criticalCount,
        averageHeartRate: Math.round(averageHeartRate)
    };
}

console.log("=== KẾT QUẢ KIỂM TRA HỆ THỐNG MEDICORE ===");
console.log("-----------------------------------------");

// 1. Test hàm tìm kiếm (findPatientById)
console.log("1. KIỂM TRA THUẬT TOÁN TÌM KIẾM:");
let searchId1 = "P002";
let foundPatient = findPatientById(patientData, searchId1);
console.log(`- Tìm kiếm bệnh nhân có ID là "${searchId1}":`, foundPatient);

let searchId2 = "P999";
let notFoundPatient = findPatientById(patientData, searchId2);
console.log(`- Tìm kiếm bệnh nhân không tồn tại ("${searchId2}"):`, notFoundPatient);
console.log("-----------------------------------------");

// 2. Test hàm lọc dữ liệu (filterCriticalPatients)
console.log("2. KIỂM TRA THUẬT TOÁN LỌC (BỆNH NHÂN NGUY KỊCH):");
let criticalList = filterCriticalPatients(patientData);
console.log("- Danh sách bệnh nhân có trạng thái 'critical':");
console.table(criticalList); // Sử dụng console.table để hiển thị dạng bảng trực quan hơn
console.log("-----------------------------------------");

// 3. Test hàm thống kê (calculateHospitalStats)
console.log("3. KIỂM TRA THUẬT TOÁN THỐNG KÊ HỆ THỐNG:");
let stats = calculateHospitalStats(patientData);
console.log("- Kết quả thống kê tổng quan:");
console.log(`  + Tổng số bệnh nhân: ${stats.totalPatients}`);
console.log(`  + Số ca nguy kịch (critical): ${stats.criticalCount}`);
console.log(`  + Nhịp tim trung bình toàn viện: ${stats.averageHeartRate} bpm`);
console.log("-----------------------------------------");

// ==========================================
// CHỨNG MINH TÍNH ĐỘNG CỦA THUẬT TOÁN
// ==========================================

console.log("=== THỜI ĐIỂM 1: DỮ LIỆU BAN ĐẦU (4 BỆNH NHÂN) ===");
console.log("- Tìm kiếm P005:", findPatientById(patientData, "P005")); // Sẽ ra null
console.log("- Số lượng ca 'critical':", filterCriticalPatients(patientData).length); // Sẽ ra 2
console.log("- Thống kê tổng quan:", calculateHospitalStats(patientData));
// Thống kê lúc đầu: { totalPatients: 4, criticalCount: 2, averageHeartRate: 83 }

console.log("\n--------------------------------------------------\n");

// HÀNH ĐỘNG: Thêm 2 bệnh nhân mới vào hệ thống (1 stable, 1 critical)
console.log(">>> LỆNH: Thêm bệnh nhân P005 và P006 vào hệ thống...");
patientData.push({ id: "P005", name: "Hoang Van E", status: "stable", age: 28, heartRate: 70 });
patientData.push({ id: "P006", name: "Vu Thi F", status: "critical", age: 65, heartRate: 145 });

console.log("\n--------------------------------------------------\n");

console.log("=== THỜI ĐIỂM 2: DỮ LIỆU ĐÃ CẬP NHẬT ĐỘNG (6 BỆNH NHÂN) ===");

// 1. Kiểm tra lại hàm Tìm kiếm với ID mới thêm
console.log("1. KIỂM TRA TÌM KIẾM ĐỘNG:");
let foundNewPatient = findPatientById(patientData, "P005");
console.log("- Tìm kiếm bệnh nhân mới 'P005':", foundNewPatient);
// Kết quả: Đã tìm thấy Hoang Van E thay vì trả về null như trước.

// 2. Kiểm tra lại hàm Lọc bệnh nhân nguy kịch
console.log("\n2. KIỂM TRA LỌC ĐỘNG:");
let newCriticalList = filterCriticalPatients(patientData);
console.log(`- Số lượng ca nguy kịch mới: ${newCriticalList.length} (Tăng từ 2 lên 3)`);
console.table(newCriticalList);
// Kết quả: Đã tự động "bắt" thêm bệnh nhân Vu Thi F (P006).

// 3. Kiểm tra lại hàm Thống kê
console.log("\n3. KIỂM TRA THỐNG KÊ ĐỘNG:");
let newStats = calculateHospitalStats(patientData);
console.log("- Kết quả thống kê mới tự động cập nhật:");
console.log(`  + Tổng số bệnh nhân: ${newStats.totalPatients} (Trước đó: 4)`);
console.log(`  + Số ca nguy kịch: ${newStats.criticalCount} (Trước đó: 2)`);
console.log(`  + Nhịp tim trung bình mới: ${newStats.averageHeartRate} bpm (Trước đó: 83 bpm)`);