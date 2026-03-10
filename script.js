// ฟังก์ชันสลับหน้าจอ
function switchScreen(screenId) {
    // ซ่อนทุกหน้า
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));

    // แสดงหน้าเป้าหมาย
    document.getElementById(screenId).classList.add('active');
}

// ข้อมูลรายวิชาจำลอง (Mock Data)
const courses = [
    {
        id: 1,
        code: "CSC101",
        title: "Introduction to Programming",
        credits: 3,
        dayTime: "Mon & Wed 10:00 AM - 12:00 PM",
        room: "Room 11-201",
        building: "Building 11 (ตึก 11)",
        instructor: "Dr. Smith",
        description: "เรียนรู้พื้นฐานการเขียนโปรแกรม โครงสร้างตัวแปร ลูป เงื่อนไข และอัลกอริทึมเบื้องต้น เหมาะสำหรับผู้เริ่มต้นที่ไม่มีพื้นฐานมาก่อน"
    },
    {
        id: 2,
        code: "MTH101",
        title: "Basic Mathematics",
        credits: 3,
        dayTime: "Tue & Thu 08:00 AM - 10:00 AM",
        room: "Room 9-304",
        building: "Building 9 (ตึก 9)",
        instructor: "Prof. Johnson",
        description: "คณิตศาสตร์พื้นฐานสำหรับการประยุกต์ใช้ในคอมพิวเตอร์และเทคโนโลยี ครอบคลุมเรื่องตรรกศาสตร์ เซต และแคลคูลัสเบื้องต้น"
    },
    {
        id: 3,
        code: "IT205",
        title: "Advanced Database",
        credits: 3,
        dayTime: "Fri 01:00 PM - 04:00 PM",
        room: "Lab 5-102",
        building: "Building 5 (ตึก 5)",
        instructor: "Dr. Alice",
        description: "การออกแบบและจัดการฐานข้อมูลขั้นสูง เรียนรู้ภาษา SQL เชิงลึก และการปรับจูนประสิทธิภาพฐานข้อมูล"
    }
];

// เรนเดอร์หน้ารายการวิชา
function renderCourseList() {
    const container = document.getElementById('course-list-container');
    container.innerHTML = '';

    courses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.innerHTML = `
            <h3>${course.code} - ${course.title}</h3>
            <p>${course.credits} Credits</p>
            <div class="course-card-actions">
                <button class="btn-secondary" onclick="viewCourseDetail(${course.id})">View Detail</button>
                <button class="btn-primary" style="padding: 8px 15px; width: auto;" onclick="switchScreen('screen-result')">Register</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// ดูรายละเอียดวิชา
function viewCourseDetail(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    const detailContainer = document.getElementById('course-detail-content');
    detailContainer.innerHTML = `
        <h3>${course.code} ${course.title}</h3>
        <div class="detail-item"><strong>หน่วยกิต:</strong> ${course.credits} Credits</div>
        <div class="detail-item"><strong>วัน/เวลา:</strong> ${course.dayTime}</div>
        <div class="detail-item"><strong>ห้องเรียน:</strong> ${course.room}</div>
        <div class="detail-item"><strong>อาคาร:</strong> ${course.building}</div>
        <div class="detail-item"><strong>ผู้สอน:</strong> ${course.instructor}</div>
        <div class="course-desc">
            <strong>คำอธิบายรายวิชา:</strong><br>
            ${course.description}
        </div>
    `;

    switchScreen('screen-coursedetail');
}

// สร้างรายการวิชาทันทีเมื่อโหลดหน้าเว็บ
window.onload = () => {
    renderCourseList();
};
