// ฐานข้อมูลวิชาจำลอง (มีเรื่องที่นั่งแล้ว)
const courses = [
    {
        id: 1,
        code: "CSC101",
        title: "Introduction to Programming",
        credits: 3,
        dayTime: "จันทร์ & พุธ 10:00 - 12:00",
        room: "11-201",
        building: "ตึก 11",
        instructor: "Dr. Smith",
        description: "เรียนรู้พื้นฐานการเขียนโปรแกรม โครงสร้างตัวแปร ลูป เงื่อนไข เหมาะสำหรับผู้เริ่มต้น",
        totalSeats: 40,
        registeredSeats: 39 // เหลือ 1 ที่
    },
    {
        id: 2,
        code: "MTH101",
        title: "Basic Mathematics",
        credits: 3,
        dayTime: "อังคาร & พฤหัส 08:00 - 10:00",
        room: "9-304",
        building: "ตึก 9",
        instructor: "Prof. Johnson",
        description: "คณิตศาสตร์พื้นฐานสำหรับการประยุกต์ใช้ในเทคโนโลยี ครอบคลุมเซต และแคลคูลัส",
        totalSeats: 30,
        registeredSeats: 30 // เต็มแล้ว
    },
    {
        id: 3,
        code: "IT205",
        title: "Advanced Database",
        credits: 3,
        dayTime: "ศุกร์ 13:00 - 16:00",
        room: "Lab 5-102",
        building: "ตึก 5",
        instructor: "Dr. Alice",
        description: "การออกแบบและจัดการฐานข้อมูลขั้นสูง เรียนรู้ภาษา SQL เชิงลึก",
        totalSeats: 25,
        registeredSeats: 10 // เหลือ 15 ที่
    },
    {
        id: 4,
        code: "ENG111",
        title: "English for Communication",
        credits: 2,
        dayTime: "พฤหัส 13:00 - 15:00",
        room: "11-405",
        building: "ตึก 11",
        instructor: "Aj. Sarah",
        description: "ฝึกทักษะการสื่อสารภาษาอังกฤษในชีวิตประจำวัน",
        totalSeats: 35,
        registeredSeats: 20
    }
];

// เก็บวิชาที่นักศึกษาลงทะเบียนไว้ (เก็บเป็น Array ของ ID)
let myRegisteredCourses = [];

// ฟังก์ชันสลับหน้า
function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

// 1. เรนเดอร์รายการวิชา
function renderCourseList() {
    const container = document.getElementById('course-list-container');
    container.innerHTML = '';

    courses.forEach(course => {
        const isRegistered = myRegisteredCourses.includes(course.id);
        const isFull = course.registeredSeats >= course.totalSeats;
        
        let statusHtml = '';
        if (isRegistered) {
            statusHtml = `<span class="status-badge status-registered">ลงทะเบียนแล้ว</span>`;
        } else if (isFull) {
            statusHtml = `<span class="status-badge status-full">ที่นั่งเต็ม</span>`;
        } else {
            const seatsLeft = course.totalSeats - course.registeredSeats;
            statusHtml = `<span class="status-badge status-available">ว่าง ${seatsLeft} ที่</span>`;
        }

        const card = document.createElement('div');
        card.className = 'course-card';
        card.innerHTML = `
            <h3>${course.code} - ${course.title}</h3>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <p style="margin:0;">${course.credits} Credits</p>
                ${statusHtml}
            </div>
            <div class="course-card-actions">
                <button class="btn-secondary" onclick="viewCourseDetail(${course.id})">ดูรายละเอียด</button>
                <button class="btn-primary" style="padding: 8px 15px; width: auto;" 
                    ${(isFull || isRegistered) ? 'disabled' : ''} 
                    onclick="registerCourse(${course.id})">
                    Register
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// 2. ดูรายละเอียดวิชา
function viewCourseDetail(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    const isRegistered = myRegisteredCourses.includes(course.id);
    const isFull = course.registeredSeats >= course.totalSeats;
    const seatsLeft = course.totalSeats - course.registeredSeats;

    let seatStatusText = isFull ? "<span style='color:red;'>เต็มแล้ว</span>" : `ว่าง ${seatsLeft} ที่`;

    const detailContainer = document.getElementById('course-detail-content');
    detailContainer.innerHTML = `
        <h3>${course.code} ${course.title}</h3>
        <div class="detail-item"><strong>หน่วยกิต:</strong> <span>${course.credits}</span></div>
        <div class="detail-item"><strong>วัน/เวลา:</strong> <span>${course.dayTime}</span></div>
        <div class="detail-item"><strong>ห้องเรียน:</strong> <span>${course.room} (อาคาร ${course.building})</span></div>
        <div class="detail-item"><strong>อาจารย์:</strong> <span>${course.instructor}</span></div>
        
        <div class="seat-info">
            ที่นั่งทั้งหมด ${course.totalSeats} | ลงแล้ว ${course.registeredSeats} <br>
            สถานะ: <span>${seatStatusText}</span>
        </div>

        <div class="course-desc">
            <strong>คำอธิบายรายวิชา:</strong><br>
            ${course.description}
        </div>
    `;

    const actionContainer = document.getElementById('detail-action-container');
    if (isRegistered) {
        actionContainer.innerHTML = `<button class="btn-primary" disabled style="background:#1565c0;">คุณลงทะเบียนวิชานี้แล้ว</button>`;
    } else if (isFull) {
        actionContainer.innerHTML = `<button class="btn-primary" disabled>ที่นั่งเต็มแล้ว</button>`;
    } else {
        actionContainer.innerHTML = `<button class="btn-primary" onclick="registerCourse(${course.id})">ลงทะเบียนเรียน (Register)</button>`;
    }

    switchScreen('screen-coursedetail');
}

// 3. ฟังก์ชันลงทะเบียน
function registerCourse(courseId) {
    const courseIndex = courses.findIndex(c => c.id === courseId);
    if (courseIndex > -1) {
        // เพิ่มจำนวนคนลงทะเบียน
        courses[courseIndex].registeredSeats += 1;
        // บันทึกว่านักศึกษาคนนี้ลงแล้ว
        myRegisteredCourses.push(courseId);
        
        // อัปเดตหน้าแสดงผลใหม่
        renderCourseList(); 
        switchScreen('screen-result');
    }
}

// 4. เรนเดอร์หน้าตารางเรียน (สรุปหน่วยกิต และวิชา)
function renderMySchedule() {
    const listContainer = document.getElementById('my-courses-list');
    const totalCreditsEl = document.getElementById('total-credits');
    
    listContainer.innerHTML = '';
    let totalCredits = 0;

    if (myRegisteredCourses.length === 0) {
        listContainer.innerHTML = '<div class="empty-schedule">คุณยังไม่ได้ลงทะเบียนเรียนวิชาใดๆ</div>';
        totalCreditsEl.innerText = '0';
        return;
    }

    // ดึงข้อมูลวิชาที่ลงทะเบียนแล้วมาแสดง
    myRegisteredCourses.forEach(id => {
        const course = courses.find(c => c.id === id);
        if (course) {
            totalCredits += course.credits;
            
            const card = document.createElement('div');
            card.className = 'schedule-card';
            card.innerHTML = `
                <h4>${course.code} ${course.title} (${course.credits} CR)</h4>
                <p>🕒 ${course.dayTime}</p>
                <p>📍 ห้อง ${course.room} | 👨‍🏫 ${course.instructor}</p>
            `;
            listContainer.appendChild(card);
        }
    });

    totalCreditsEl.innerText = totalCredits;
}

// เริ่มต้นการทำงานเมื่อเปิดเว็บ
window.onload = () => {
    renderCourseList();
};
