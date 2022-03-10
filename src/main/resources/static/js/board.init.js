(function (window, dxUi) {
    'use strict';

    $(function () {
        $.ajaxSetup({
            cache: false,
            dataType: 'json',
            contentType: 'application/json',
        });
    });

    Date.prototype.toDateString = function () {
        return (
            this.getFullYear() + '-' + ('0' + (this.getMonth() + 1)).slice(-2) + '-' + ('0' + this.getDate()).slice(-2) + ' ' +
            ('0' + this.getHours()).slice(-2) + ':' + ('0' + this.getMinutes()).slice(-2) + ':' + ('0' + this.getSeconds()).slice(-2) + '.' +
            ('00' + this.getMilliseconds()).slice(-3)
        );
    };

    Date.prototype.removeTime = function () {
        this.setHours(0, 0, 0, 0);
        return this;
    };

    Date.prototype.removeSeconds = function () {
        this.setSeconds(0, 0);
        return this;
    };

    Date.prototype.addYears = function (years) {
        this.setFullYear(this.getFullYear() + years);
        return this;
    };

    Date.prototype.addMonths = function (months) {
        this.setMonth(this.getMonth() + months);
        return this;
    };

    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + days);
        return this;
    };

    DevExpress.localization.locale(navigator.language);

    dxUi.dxDateBox.defaultOptions({
        device: {
            deviceType: 'desktop',
        },
        options: {
            displayFormat: 'yyyy-MM-dd HH:mm:ss',
            type: 'datetime',
            useMaskBehavior: true,
            value: new Date(),
        },
    });

    dxUi.dxTextBox.defaultOptions({
        device: {
            deviceType: 'desktop',
        },
        options: {
            showClearButton: true,
        }
    });

    dxUi.dxNumberBox.defaultOptions({
        device: {
            deviceType: 'desktop',
        },
        options: {
            format: 'fixedPoint',
            showClearButton: true,
            step: 0,
        }
    });

    dxUi.dxSelectBox.defaultOptions({
        device: {
            deviceType: 'desktop',
        },
        options: {
            valueExpr: 'id',
            displayExpr: 'text',
        }
    });

    dxUi.dxTabs.defaultOptions({
        device: {
            deviceType: 'desktop',
        },
        options: {
            keyExpr: 'id',
            selectedIndex: 0,
        }
    });

    dxUi.dxLookup.defaultOptions({
        device: {
            deviceType: 'desktop',
        },
        options: {
            dropDownCentered: false,
        }
    });

    dxUi.dxDataGrid.defaultOptions({
        device: {
            deviceType: 'desktop',
        },
        options: {
            allowColumnReordering: false,
            allowColumnResizing: true,
            autoNavigateToFocusedRow: true,
            columnAutoWidth: true,
            columnMinWidth: 20,
            columnResizingMode: "nextColumn",
            customizeColumns: function (columns) {
                for (let column of columns) {
                    if (column.dataType === 'number') {
                        column.format = '#,###';
                        column.editorOptions = {step: 0,};
                    } else if (column.dataType === 'date') {
                        column.format = 'yyyy-MM-dd';
                    } else if (column.dataType === 'datetime') {
                        column.format = 'yyyy-MM-dd HH:mm:ss';
                    }
                }
            },
            // export: {enabled: true},
            groupPanel: {visible: false,},
            hoverStateEnabled: true,
            onToolbarPreparing: function (e) {
                e.toolbarOptions.visible = false;
            },
            onExporting: function (e) {
                let workbook = new ExcelJS.Workbook();
                let worksheet = workbook.addWorksheet('Sheet1');

                DevExpress.excelExporter.exportDataGrid({
                    "component": e.component,
                    "worksheet": worksheet,
                    "autoFilterEnabled": true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], {type: 'application/octet-stream'}), 'export.xlsx');
                    });
                });
                e.cancel = true;
            },
            paging: {
                enabled: true,
                pageSize: 20
            },
            pager: {
                visible: true,
                allowedPageSizes: [],
                showPageSizeSelector: true,
                showInfo: true,
                infoText: '전체 {2} 항목',
                showNavigationButtons: true,
            },
            rowAlternationEnabled: false,
            //scrolling: {columnRenderingMode: "virtual", mode: "virtual"},
            // scrolling: {mode: "virtual"},
            // searchPanel: {visible: true, width: 240},
            selection: {mode: "single"},
            showBorders: true,
            showColumnLines: true,
            showRowLines: true,
            stateStoring: {
                enabled: false,
                type: 'sessionStorage',
                ignoreColumnOptionNames: ["visibleIndex", "groupIndex"]
            },
        },
    });

    dxUi.dxTreeList.defaultOptions({
        device: {
            deviceType: 'desktop',
        },
        options: {
            allowColumnReordering: false,
            allowColumnResizing: true,
            autoExpandAll: true,
            autoNavigateToFocusedRow: true,
            //columnAutoWidth: true,
            columnMinWidth: 20,
            columnResizingMode: "nextColumn",
            customizeColumns: function (columns) {
                for (let column of columns) {
                    if (column.dataType === 'number') {
                        column.format = '#,###';
                        column.editorOptions = {step: 0,};
                    } else if (column.dataType === 'date') {
                        column.format = 'yyyy-MM-dd';
                    } else if (column.dataType === 'datetime') {
                        column.format = 'yyyy-MM-dd HH:mm:ss';
                    }
                }
            },
            export: {enabled: true},
            hoverStateEnabled: true,
            onExporting: function (e) {
                let workbook = new ExcelJS.Workbook();
                let worksheet = workbook.addWorksheet('Sheet1');

                DevExpress.excelExporter.exportDataGrid({
                    "component": e.component,
                    "worksheet": worksheet,
                    "autoFilterEnabled": true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], {type: 'application/octet-stream'}), 'export.xlsx');
                    });
                });
                e.cancel = true;
            },
            rowAlternationEnabled: false,
            scrolling: {Mode: "virtual"},
            searchPanel: {visible: true, width: 240},
            selection: {mode: "single"},
            showBorders: true,
            showColumnLines: true,
            showRowLines: true,
            stateStoring: {
                enabled: false,
                type: 'sessionStorage',
                ignoreColumnOptionNames: ["visibleIndex", "groupIndex"]
            },
        },
    });

    dxUi.dxHtmlEditor.defaultOptions({
        device: {
            deviceType: 'desktop',
        },
        options: {
            toolbar: {
                items: [
                    "undo", "redo", "separator",
                    {
                        name: "size",
                        options: {
                            valueExpr: 'id',
                            displayExpr: 'text',
                        },
                        acceptedValues: [
                            {id: '8pt', text: '8pt'},
                            {id: '10pt', text: '10pt'},
                            {id: '12pt', text: '12pt'},
                            {id: '14pt', text: '14pt'},
                            {id: '18pt', text: '18pt'},
                            {id: '24pt', text: '24pt'},
                            {id: '36pt', text: '36pt'},
                        ]
                    },
                    {
                        name: "font",
                        options: {
                            valueExpr: 'id',
                            displayExpr: 'text',
                        },
                        acceptedValues: [
                            {id: 'Arial', text: 'Arial'},
                            {id: 'Courier New', text: 'Courier New'},
                            {id: 'Georgia', text: 'Georgia'},
                            {id: 'Impact', text: 'Impact'},
                            {id: 'Lucida Console', text: 'Lucida Console'},
                            {id: 'Tahoma', text: 'Tahoma'},
                            {id: 'Times New Roman', text: 'Times New Roman'},
                            {id: 'Verdana', text: 'Verdana'},
                        ]
                    },
                    "separator", "bold", "italic", "strike", "underline", "separator",
                    "alignLeft", "alignCenter", "alignRight", "alignJustify", "separator",
                    "orderedList", "bulletList", "separator",
                    {
                        name: "header",
                        options: {
                            valueExpr: 'id',
                            displayExpr: 'text',
                        },
                        acceptedValues: [
                            {id: 'false', text: 'Normal text'},
                            {id: '1', text: 'Heading 1'},
                            {id: '2', text: 'Heading 2'},
                            {id: '3', text: 'Heading 3'},
                            {id: '4', text: 'Heading 4'},
                            {id: '5', text: 'Heading 5'},
                        ]
                    }, "separator",
                    "color", "background", "separator",
                    "link", "image", "separator",
                    "clear", "codeBlock", "blockquote", "separator",
                    "insertTable", "deleteTable",
                    "insertRowAbove", "insertRowBelow", "deleteRow",
                    "insertColumnLeft", "insertColumnRight", "deleteColumn"
                ]
            },
            mediaResizing: {
                enabled: true
            }
        },
    });

    let board = window.board || {};

    board.notify = function (message, type, displayTime) {
        if (type === undefined) {
            type = 'info';
        }

        if (displayTime === undefined) {
            displayTime = 2000;
        }

        dxUi.notify(message, type, displayTime);
    };

    board.openMenu = function (menuId) {
        let menu = $('#' + menuId);
        menu.css({color: 'black'});
        menu.parent().addClass('open active').css({backgroundColor: 'white'});
        menu.parent().parent().css({display: 'block'});
        menu.parent().parent().parent().find('.arrow').addClass('open active');
        menu.parent().parent().parent().addClass('open active');
    };

    board.numberWithCommas = function (number) {
        return Number(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    board.phoneWithHyphen = function (phone) {
        if (!phone) {
            return '';
        }
        return phone.replace(/\D/g, '').replace(/(^02|^050\d|^0\d{2}|\d*)(\d*)(\d{4})/, '$1-$2-$3').replace('--', '-');
    };

    window.board = board;
})(window, DevExpress.ui);
