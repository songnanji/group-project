var apiBase = 'http://localhost:8080'; // Spring Boot 서버 주소

function preflight() {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', reqListener);
    xhr.open('POST', `${apiBase}/api/login`, true); // 경로를 /api/login으로 수정
    xhr.withCredentials = true;
    xhr.setRequestHeader('Ping-Other', 'pingpong');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ username: 'exampleUser', password: 'examplePassword' })); // 로그인 요청 예시
}
