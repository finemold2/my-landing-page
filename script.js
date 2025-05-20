// 언어 전환 기능
let currentLang = 'ko';

// 번역 데이터
const translations = {
    ko: {
        'nav-logo': 'todo 앱',
        'nav-features': '주요 기능',
        'nav-download': '다운로드',
        'nav-contact': '문의',
        'main-title': 'todo 앱',
        'main-slogan': '할 일 관리, ',
        'main-highlight': '이제는 즐겁게!',
        'main-desc': '무료, 쉽고, 세련된 할 일 관리의 시작',
        'features-title': '주요 기능',
        'feature1-title': '실제 할 일 관리',
        'feature1-desc1': '군더더기 거품 뺀 핵심 기능',
        'feature1-desc2': '직관적인 UI로 누구나 쉽게',
        'feature2-title': '완전 무료',
        'feature2-desc1': '모든 기능을 제한 없이',
        'feature2-desc2': '무료로 사용',
        'comics-title': '앱으로 달라지는 하루!',
        'download-title': 'todo 앱을 지금 바로 경험해보세요',
        'download-btn': '구글플레이에서 받기',
        'feedback-title': '사용 후기 및 개선 제안',
        'feedback-type-label': '유형',
        'feedback-type-placeholder': '선택해주세요',
        'feedback-type-review': '사용 후기',
        'feedback-type-suggestion': '기능 개선 제안',
        'feedback-content-label': '내용',
        'feedback-content-placeholder': '사용 후기나 개선하고 싶은 기능을 자유롭게 작성해주세요.',
        'feedback-email-label': '이메일 (선택사항)',
        'feedback-email-placeholder': '답변을 받으실 이메일을 입력해주세요',
        'feedback-submit': '제출하기',
        'download-alert': '앱 다운로드는 곧 제공될 예정입니다',
        'footer': '© 21st c. todo 앱 문의 devfinemold@gmail.com'
    },
    en: {
        'nav-logo': 'todo app',
        'nav-features': 'Features',
        'nav-download': 'Download',
        'nav-contact': 'Contact',
        'main-title': 'todo app',
        'main-slogan': 'Task Management, ',
        'main-highlight': 'Now with Joy!',
        'main-desc': 'Start your free, easy, and elegant task management',
        'features-title': 'Key Features',
        'feature1-title': 'Real Task Management',
        'feature1-desc1': 'Core features without the fluff',
        'feature1-desc2': 'Intuitive UI for everyone',
        'feature2-title': 'Completely Free',
        'feature2-desc1': 'All features without limits',
        'feature2-desc2': 'Use for free',
        'comics-title': 'How the App Changes Your Day!',
        'download-title': 'Experience todo app now',
        'download-btn': 'Get it on Google Play',
        'feedback-title': 'Feedback & Suggestions',
        'feedback-type-label': 'Type',
        'feedback-type-placeholder': 'Please select',
        'feedback-type-review': 'Review',
        'feedback-type-suggestion': 'Feature Suggestion',
        'feedback-content-label': 'Content',
        'feedback-content-placeholder': 'Please write your review or feature suggestions freely.',
        'feedback-email-label': 'Email (Optional)',
        'feedback-email-placeholder': 'Enter your email to receive a response',
        'feedback-submit': 'Submit',
        'download-alert': 'App download will be available soon',
        'footer': '© 21st c. todo app Contact devfinemold@gmail.com'
    }
};

document.getElementById('langToggle').addEventListener('click', function () {
    currentLang = currentLang === 'ko' ? 'en' : 'ko';
    updateLanguage();
});

function updateLanguage() {
    // 4컷만화 이미지 전환
    const comicsImages = document.querySelectorAll('.comics-img');
    comicsImages.forEach((img) => {
        const src = img.getAttribute('src');
        if (currentLang === 'en') {
            if (src.includes('4컷만화.png')) {
                img.setAttribute('src', 'src/4컷만화_eng.png');
            } else if (src.includes('4컷만화2.png')) {
                img.setAttribute('src', 'src/4컷만화2_eng.png');
            }
        } else {
            if (src.includes('4컷만화_eng.png')) {
                img.setAttribute('src', 'src/4컷만화.png');
            } else if (src.includes('4컷만화2_eng.png')) {
                img.setAttribute('src', 'src/4컷만화2.png');
            }
        }
    });

    // 텍스트 전환
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[currentLang][key];
            } else {
                element.textContent = translations[currentLang][key];
            }
        }
    });

    // placeholder 속성이 있는 요소들도 업데이트
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[currentLang][key]) {
            element.placeholder = translations[currentLang][key];
        }
    });
}

// 페이지 로드 시 초기 언어 설정
document.addEventListener('DOMContentLoaded', function () {
    updateLanguage();
});

document.querySelectorAll('.download-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        alert(translations[currentLang]['download-alert']);
    });
});

// 피드백 폼 제출 처리
document.getElementById('feedbackForm').addEventListener('submit', async function (e) {
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

// EmailJS 초기화
(function () {
    emailjs.init("YOUR_PUBLIC_KEY"); // EmailJS에서 발급받은 Public Key를 입력하세요
})();

// 이메일로 피드백 보내기
async function sendEmailFeedback() {
    const feedbackType = document.getElementById('feedbackType').value;
    const feedbackContent = document.getElementById('feedbackContent').value;
    const userEmail = document.getElementById('userEmail').value;

    if (!feedbackType || !feedbackContent) {
        alert('유형과 내용을 입력해주세요.');
        return;
    }

    try {
        const templateParams = {
            to_email: 'devfinemold@gmail.com',
            from_email: userEmail || 'anonymous@user.com',
            feedback_type: feedbackType,
            feedback_content: feedbackContent
        };

        const response = await emailjs.send(
            'YOUR_SERVICE_ID', // EmailJS에서 생성한 Service ID
            'YOUR_TEMPLATE_ID', // EmailJS에서 생성한 Template ID
            templateParams
        );

        if (response.status === 200) {
            alert('피드백이 성공적으로 전송되었습니다. 감사합니다!');
            document.getElementById('feedbackForm').reset();
        } else {
            throw new Error('이메일 전송 실패');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('피드백 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
} 