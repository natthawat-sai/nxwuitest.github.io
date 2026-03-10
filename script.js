const courses = [
    { id: 1, code: "CSC101", title: "Introduction to Programming", credits: 3, dayTime: "จันทร์ & พุธ 10:00 - 12:00", room: "11-201", building: "ตึก 11", instructor: "Dr. Smith", description: "เรียนรู้พื้นฐานการเขียนโปรแกรม โครงสร้างตัวแปร ลูป เงื่อนไข เหมาะสำหรับผู้เริ่มต้น", totalSeats: 40, registeredSeats: 39 },
    { id: 2, code: "MTH101", title: "Basic Mathematics", credits: 3, dayTime: "อังคาร & พฤหัส 08:00 - 10:00", room: "9-304", building: "ตึก 9", instructor: "Prof. Johnson", description: "คณิตศาสตร์พื้นฐานสำหรับการประยุกต์ใช้ในเทคโนโลยี ครอบคลุมเซต และแคลคูลัส", totalSeats: 30, registeredSeats: 30 },
    { id: 3, code: "IT205", title: "Advanced Database", credits: 3, dayTime: "ศุกร์ 13:00 - 16:00", room: "Lab 5-102", building: "ตึก 5", instructor: "Dr. Alice", description: "การออกแบบและจัดการฐานข้อมูลขั้นสูง เรียนรู้ภาษา SQL เชิงลึก", totalSeats: 25, registeredSeats: 10 },
    { id: 4, code: "ENG111", title: "English for Communication", credits: 2, dayTime: "พฤหัส 13:00 - 15:00", room: "11-405", building: "ตึก 11", instructor: "Aj. Sarah", description: "ฝึกทักษะการสื่อสารภาษาอังกฤษในชีวิตประจำวัน", totalSeats: 35, registeredSeats: 20 }
];

let myRegisteredCourses = [];

function handleLogin() {
    let username = document.getElementById('username-input').value.trim();
    if (username === '') { username = 'Student'; }

    const usernameDisplays = document.querySelectorAll('.current-username');
    usernameDisplays.forEach(display => { display.innerText = username; });

    switchScreen('screen-courselist');
}

function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');

    const bottomNav = document.getElementById('bottom-nav');
    if (screenId === 'screen-login') {
        bottomNav.style.display = 'none';
    } else {
        bottomNav.style.display = 'flex'; 
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        
        if (screenId === 'screen-courselist' || screenId === 'screen-coursedetail' || screenId === 'screen-result') {
            document.getElementById('nav-home').classList.add('active');
        } else if (screenId === 'screen-schedule') {
            document.getElementById('nav-schedule').classList.add('active');
        }
    }
}

function logout() {
    document.getElementById('username-input').value = '';
    switchScreen('screen-login');
}

function renderCourseList() {
    const container = document.getElementById('course-list-container');
    container.innerHTML = '';

    courses.forEach(course => {
        const isRegistered = myRegisteredCourses.includes(course.id);
        const isFull = course.registeredSeats >= course.totalSeats;
        
        let statusHtml = '';
        if (isRegistered) {
            statusHtml = `<span class="status-badge status-registered">ลงแล้ว</span>`;
        } else if (isFull) {
            statusHtml = `<span class="status-badge status-full">เต็มแล้ว</span>`;
        } else {
            const seatsLeft = course.totalSeats - course.registeredSeats;
            statusHtml = `<span class="status-badge status-available">ว่าง ${seatsLeft} ที่</span>`;
        }

        const card = document.createElement('div');
        card.className = 'course-card';
        card.innerHTML = `
            <h3>${course.code} ${course.title}</h3>
            <div class="course-meta">
                <p>${course.credits} CR</p>
                ${statusHtml}
            </div>
            <div class="course-card-actions">
                <button class="btn-secondary" onclick="viewCourseDetail(${course.id})">รายละเอียด</button>
                <button class="btn-primary" style="padding: 10px 20px; width: auto; font-size: 0.9rem;" 
                    ${(isFull || isRegistered) ? 'disabled' : ''} 
                    onclick="registerCourse(${course.id})">
                    ลงทะเบียน
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

function viewCourseDetail(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    const isRegistered = myRegisteredCourses.includes(course.id);
    const isFull = course.registeredSeats >= course.totalSeats;
    const seatsLeft = course.totalSeats - course.registeredSeats;

    let seatStatusText = isFull ? "<span style='color:#e53e3e;'>ที่นั่งเต็มแล้ว</span>" : `เหลือ ${seatsLeft} ที่นั่ง`;

    document.getElementById('course-detail-content').innerHTML = `
        <h3 style="font-size:1.3rem; font-weight:700; color:#1a202c; margin: 10px 0 20px 0;">${course.code} <br><span style="color:#e60064; font-size:1.1rem;">${course.title}</span></h3>
        
        <div class="detail-item"><strong>หน่วยกิต</strong> <span>${course.credits} CR</span></div>
        <div class="detail-item"><strong>วัน/เวลา</strong> <span>${course.dayTime}</span></div>
        <div class="detail-item"><strong>สถานที่</strong> <span>ห้อง ${course.room} อาคาร ${course.building}</span></div>
        <div class="detail-item"><strong>ผู้สอน</strong> <span>${course.instructor}</span></div>
        
        <div class="seat-info">
            <p>สถานะการลงทะเบียน (${course.registeredSeats}/${course.totalSeats})</p>
            <span>${seatStatusText}</span>
        </div>

        <div class="course-desc">
            <strong>คำอธิบายรายวิชา</strong>
            ${course.description}
        </div>
    `;

    const actionContainer = document.getElementById('detail-action-container');
    if (isRegistered) {
        actionContainer.innerHTML = `<button class="btn-primary" disabled>คุณลงทะเบียนวิชานี้แล้ว</button>`;
    } else if (isFull) {
        actionContainer.innerHTML = `<button class="btn-primary" disabled>ที่นั่งเต็มแล้ว ไม่สามารถลงทะเบียนได้</button>`;
    } else {
        actionContainer.innerHTML = `<button class="btn-primary" onclick="registerCourse(${course.id})">ยืนยันลงทะเบียน</button>`;
    }

    switchScreen('screen-coursedetail');
}

function registerCourse(courseId) {
    const courseIndex = courses.findIndex(c => c.id === courseId);
    if (courseIndex > -1) {
        courses[courseIndex].registeredSeats += 1;
        myRegisteredCourses.push(courseId);
        renderCourseList(); 
        switchScreen('screen-result');
    }
}

function renderMySchedule() {
    const listContainer = document.getElementById('my-courses-list');
    const totalCreditsEl = document.getElementById('total-credits');
    
    listContainer.innerHTML = '';
    let totalCredits = 0;

    if (myRegisteredCourses.length === 0) {
        listContainer.innerHTML = '<div class="empty-schedule">คุณยังไม่มีวิชาเรียนในเทอมนี้</div>';
        totalCreditsEl.innerText = '0';
        return;
    }

    myRegisteredCourses.forEach(id => {
        const course = courses.find(c => c.id === id);
        if (course) {
            totalCredits += course.credits;
            const card = document.createElement('div');
            card.className = 'schedule-card';
            card.innerHTML = `
                <h4>${course.code} - ${course.title}</h4>
                <div class="schedule-meta">
                    <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    <span>${course.dayTime}</span>
                </div>
                <div class="schedule-meta">
                    <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <span>ห้อง ${course.room} | ผู้สอน: ${course.instructor}</span>
                </div>
            `;
            listContainer.appendChild(card);
        }
    });
    totalCreditsEl.innerText = totalCredits;
}

window.onload = () => { renderCourseList(); };
