(function (window) {
    'use strict';

    let board = window.board || {};

    /** @param _dxInstances : {btnAttach,btnCreate,btnDelete,btnEdit,btnList,btnSave,btnTargetSearch} */
    let _dxInstances = {};

    board.createDx = function (bReadOnly) {
        bReadOnly = !!bReadOnly;

        $('[data-board*="dx"]').each(function (index, item) {
            let id = $(item).attr('id');
            if (!id) {
                return;
            }

            let dataType = $(item).attr('data-board');
            let dataFormat = $(item).attr('data-board-format');

            _dxInstances[id] = ($(item)[dataType]())[dataType]('instance');
            _dxInstances[id].option({readOnly: bReadOnly});

            if (dataType === 'dxDataGrid' || dataType === 'dxTreeList') {
                _dxInstances[id].option({stateStoring: {storageKey: id,}});
            } else if (dataType === 'dxTextBox' && dataFormat === 'tel') {
                _dxInstances[id].option({
                    maxLength: 11,
                    onKeyPress: function (e) {
                        console.log(e.event.keyCode);
                        if (e.event.keyCode < 48 || e.event.keyCode > 57) {
                            e.event.preventDefault();
                        }
                    },
                    onFocusIn: function (e) {
                        let value = e.component.option('value');
                        value = value.replace(/-/g, '');
                        e.component.option('value', value);
                    },
                    onFocusOut: function (e) {
                        let value = e.component.option('value');
                        value = board.phoneWithHyphen(value);
                        e.component.option('value', value);
                    },
                });
            }
        });

        return _dxInstances;
    };

    board.valuesToDx = function (values) {
        let dotizedValues = board.dotize.convert(values);
        for (let id in dotizedValues) {
            if (!dotizedValues.hasOwnProperty(id)) {
                continue;
            }

            if (_dxInstances[id] && typeof _dxInstances[id].option === 'function') {
                if (_dxInstances[id].element().attr('data-board-format') === 'tel') {
                    _dxInstances[id].option({value: board.phoneWithHyphen(dotizedValues[id])});
                } else {
                    _dxInstances[id].option({value: dotizedValues[id]});
                }
            } else {
                _dxInstances[id] = dotizedValues[id];
            }
        }
    };

    board.dxToValues = function () {
        let values = {};

        for (let id in _dxInstances) {
            if (!_dxInstances.hasOwnProperty(id)) {
                continue;
            }

            if (_dxInstances[id] && typeof _dxInstances[id].option === 'function') {
                if (_dxInstances[id].option().value !== undefined) {
                    if (_dxInstances[id].element().attr('data-board-format') === 'tel') {
                        values[id] = _dxInstances[id].option().value.replace(/-/g, '');
                    } else {
                        values[id] = _dxInstances[id].option().value;
                    }
                }
            } else {
                values[id] = _dxInstances[id];
            }
        }

        return board.dotize.backward(values);
    }

    window.board = board;
})(window);
