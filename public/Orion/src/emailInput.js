(function() {
    "use strict";

    $.widget('rkui.emailInput', $.rkui.baseInput, {
        options: {
            type: 'email',
            emailRegText: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
        },
        _create: function() {
            var me = this;
            me._super();
            me._bindEvent();
        },
        _init: function() {

        },
        _validataEmail: function(value) {
            var me = this;
            var opt = me.options;
            var vilidataResult;

            if (opt.emailRegText.test(value)) {
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

            //邮箱校验
            elem.on('blur', function(event) {
                var that = $(this);
                var last = event.timeStamp;
                setTimeout(function() {
                    var value = $.trim(that.val());
                    if (last - event.timeStamp === 0) {
                        if (!me._validataEmail(value)) {
                            alert("邮箱格式不正确");
                            that.val('');
                            that.addClass(opt.errorClass);
                        }
                    }
                }, 1000);
            });
        }
    });
})();
