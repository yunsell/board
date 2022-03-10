// 뒤로가기시 경고

window.addEventListener('beforeunload', function (event) {
    // 표준에 따라 기본 동작 방지
    event.preventDefault();
    // Chrome에서는 returnValue 설정이 필요함
    event.returnValue = '';
});

window.onbeforeunload = function (e) {
    var dialogText = 'Dialog text here';
    e.returnValue = dialogText;
    return e;
};
