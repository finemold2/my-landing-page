document.querySelectorAll('.download-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        alert('앱 다운로드는 곧 제공될 예정입니다!');
    });
}); 