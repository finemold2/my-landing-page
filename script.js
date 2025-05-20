document.querySelectorAll('.download-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        alert('앱 다운로드는 곧 제공될 예정입니다');
    });
});

// 피드백 폼 제출 처리
document.getElementById('feedbackForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const feedbackType = document.getElementById('feedbackType').value;
    const feedbackContent = document.getElementById('feedbackContent').value;
    const userEmail = document.getElementById('userEmail').value;
    
    // Google Apps Script 웹 앱 URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwtHNdjQJDQMBcX9mU-PdnMz2U9vy3baRIcO7sxpJFUp0Rit7T-YcSM2CdGP_e3DMrlAg/exec';
    
    try {
        const response = await fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',  // CORS 이슈 해결을 위해 추가
            body: JSON.stringify({
                type: feedbackType,
                content: feedbackContent,
                email: userEmail
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        // 제출 후 폼 초기화
        this.reset();
        // 사용자에게 제출 완료 메시지 표시
        alert('피드백이 성공적으로 제출되었습니다. 감사합니다!');
        
    } catch (error) {
        console.error('Error:', error);
        alert('피드백 제출 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
}); 