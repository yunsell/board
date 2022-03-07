<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>유저</title>
    <link href="https://cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css" rel="stylesheet"/>
</head>

<body>
<table id="tableUser">
    <thead>
    <tr>
        <th>ID</th>
        <th>이름</th>
        <th>수정</th>
        <th>삭제</th>
    </tr>
    </thead>
</table>
<a href="<c:url value="/user/create"/>">등록</a>
</body>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js"></script>
<script>
    $(function () {
        let tableUser = $('#tableUser').DataTable({
            ajax: {
                url: '<c:url value="/userlist"/>',
                dataSrc: '',
            },
            columns: [
                {data: 'userId'},
                {data: 'userName'},
                {
                    data: null,
                    orderable: false,
                    searchable: false,
                    defaultContent: '<button class="btn btn-xs btn-block btn-info">수정</button>',
                },
                {
                    data: null,
                    orderable: false,
                    searchable: false,
                    defaultContent: '<button class="btn btn-xs btn-block btn-danger">삭제</button>',
                }
            ],
        });

        $('#tableUser').on('click', 'button.btn-info', function () {
            let data = tableUser.row($(this).parents('tr')).data();
            location.href = '<c:url value="/user"/>/' + data.idxId + '/edit';
        });
        $('#tableUser').on('click', 'button.btn-danger', function () {
            let data = tableUser.row($(this).parents('tr')).data();
            deleteUser(data.idxId);
        });
    });

    <%--function deleteUser(idxId) {--%>
    <%--    if (confirm('정말로 삭제하시겠습니까?')) {--%>
    <%--        $.ajax({--%>
    <%--            method: 'DELETE',--%>
    <%--            url: '<c:url value="/user"/>/' + idxId,--%>
    <%--        }).then(function () {--%>
    <%--            location.href = '<c:url value="/user"/>';--%>
    <%--        });--%>
    <%--    }--%>
    <%--}--%>
</script>
</html>
