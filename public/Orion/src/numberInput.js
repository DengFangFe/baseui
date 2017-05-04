(function() {
    "use strict";

    $.widget('rkui.numberInput', $.rkui.baseInput, {
        options: {
            numberRegText: /^[-+]?[0-9]+(\.[0-9]+)?$/, //正负数，小数
            hasPrefix: '', //前缀
            hasSuffix: '', //后缀
            type: 'number'
        },
        _create: function() {
            var me = this;
            me._super();
            me._bindEvent();
        },
        _init: function() {

        },
        getValue: function() {
            var me = this;
            var elem = me.element;
            var opt = me.options;
            var val = elem.val();
            if (val !== "" && opt.hasPrefix !== "" && val.indexOf(opt.hasPrefix) === -1) {
                val = opt.hasPrefix + val;
            } else {
                val = val;
            }
            if (val !== "" && opt.hasSuffix !== "" && val.indexOf(opt.hasSuffix) === -1) {
                val = val + opt.hasSuffix;
            } else {
                val = val;
            }
            return val;
        },
        setValue: function(val) {
            var me = this;
            var elem = me.element;
            var opt = me.options;

            if (opt.hasPrefix !== "") {
                elem.val(opt.hasPrefix + val);
            }
            if (opt.hasSuffix !== "") {
                elem.val(opt.hasSuffix + val);
            }
        },
        _vilidataNum: function(value) {
            var me = this;
            var opt = me.options;
            var vilidataResult;
            if (opt.numberRegText.test(value)) {
                vilidataResult = true;
            } else {
                vilidataResult = false;
            }
            return vilidataResult;
        },
        _bindEvent: function() {
            var me = this;
            var elem = me.element;
            var opt = me.options;

            //非数字判断
            elem.on('keyup', function(event) {
                var that = $(this);
                var last = event.timeStamp;
                setTimeout(function() {
                    var value = $.trim(that.val());
                    var len = value.length;
                    //获取值时，过滤掉前后缀
                    if (opt.hasPrefix !== "" && value.indexOf(opt.hasPrefix) > -1) {
                        value = value.substring(1, len);
                    }
                    if (opt.hasSuffix !== "" && value.indexOf(opt.hasSuffix) > -1) {
                        value = value.substring(0, len - 1);
                    }
                    if (last - event.timeStamp === 0) {
                        value = parseInt(value);
                        if (!me._vilidataNum(value)) {
                            alert("只能输入数字");
                            that.val('');
                            that.addClass(opt.errorClass);
                        }
                    }
                }, 1000);
            });
            elem.off('blur').on('blur', function() {
                var val = me.getValue();
                elem.val(val);
            });
        }
    });
})();
