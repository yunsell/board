(function (window) {
    'use strict';

    let board = window.board || {};

    board.typeDef = {
        Year: [
            {id: 2020, text: '2020'},
            {id: 2021, text: '2021'},
            {id: 2022, text: '2022'},
            {id: 2023, text: '2023'},
            {id: 2024, text: '2024'},
            {id: 2025, text: '2025'},
            {id: 2026, text: '2026'},
            {id: 2027, text: '2027'},
            {id: 2028, text: '2028'},
            {id: 2029, text: '2029'},
            {id: 2030, text: '2030'},
        ],
        userType: [
            {id: 'US', text: '회원'},
            {id: 'CM', text: '기업'},
            {id: 'HM', text: '병원'},
            {id: 'PM', text: '내부'},
        ],
        registerType: [
            {id: '0', text: '미포함'},
            {id: '1', text: '포함'},
            {id: '2', text: '추가검사'},
            {id: 'A', text: '선택A'},
            {id: 'B', text: '선택B'},
            {id: 'C', text: '선택C'},
            {id: 'D', text: '선택D'},
            {id: 'E', text: '선택E'},
            {id: 'F', text: '선택F'},
        ],
        faqCategory: [
            {id: 'RESERVE', text: '검진예약'},
            {id: 'RESULT', text: '검진결과'},
            {id: 'CAUTION', text: '주의사항'},
            {id: 'ETC', text: '기타'},
        ],
    };

    window.board = board;
})(window);
