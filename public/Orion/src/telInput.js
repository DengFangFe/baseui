(function() {
    "use strict";

    $.widget('rkui.telInput', $.rkui.baseInput, {
        options: {
            type: 'tel',
            telRegText: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/
        },
        _create: function() {
            var me = this;
            me._super();
            me._bindEvent();
        },
        _init: function() {

        },
        _vilidataTel: function(value) {
            var me = this;
            var opt = me.options;
            var vilidataResult;
            if (opt.telRegText.test(value)) {
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
                        if (!me._vilidataTel(value)) {
                            alert("固定电话格式不正确");
                            that.val('');
                            that.addClass(opt.errorClass);
                        }
                    }
                }, 1000);
            });
        }
    });
})();
