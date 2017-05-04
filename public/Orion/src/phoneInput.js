(function() {
    "use strict";

    $.widget('rkui.phoneInput', $.rkui.baseInput, {
        options: {
            type: 'phone',
            phoneRegText: /^1[34578]\d{9}$/
        },
        _create: function() {
            var me = this;
            me._super();
            me._bindEvent();
        },
        _init: function() {

        },
        _vilidataPhone: function(value) {
            var me = this;
            var opt = me.options;
            var vilidataResult;
            if (opt.phoneRegText.test(value)) {
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

            elem.on('blur', function(event) {
                var that = $(this);
                var last = event.timeStamp;
                setTimeout(function() {
                    var value = $.trim(that.val());
                    if (last - event.timeStamp === 0) {
                        if (!me._vilidataPhone(value)) {
                            alert("移动电话格式不正确");
                            that.val('');
                            that.addClass(opt.errorClass);
                        }
                    }
                }, 1000);
            });
        }
    });
})();
