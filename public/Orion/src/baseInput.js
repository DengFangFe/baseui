(function() {
    "use strict";

    $.widget('rkui.baseInput', {
        options: {
            disabled: null, //是否不可用
            activeClass: 'rk-ui-state-active', //触发时状态
            disableClass: 'rk-ui-state-disable', //不可用状态
            errorClass: 'rk-ui-state-error', //错误时状态
            initClass: 'rk-ui-state-init', //初始化状态
            maxLength: '', //最大输入长度
            minLength: '', //最小输入长度
            require: false, //是否必填
            vilidataEvent: '', //验证事件
            type: 'text'
        },
        _create: function() {
            var me = this;
            var elem = me.element;
            var opt = me.options;
            elem.addClass(opt.initClass);

            if (opt.disabled) {
                elem.addClass(opt.disableClass);
            }
            me.bindEvent();
        },
        _init: function() {

        },
        valueVilidata: function() {
            var me = this;
            var elem = me.element;
            var opt = me.options;

            var value = elem.val();
            //必填验证
            if (opt.require && value.length === 0) {
                alert("内容不能为空");
                elem.addClass(opt.errorClass);
            }
            //最大输入长度限制
            if (opt.maxLength !== "" && value.length > opt.maxLength) {
                alert("超过最大输入长度" + opt.maxLength);
                elem.addClass(opt.errorClass);
            }
            //最小输入长度限制
            if (opt.minLength !== "" && value.length < opt.minLength) {
                alert("最少输入" + opt.minLengt + "字符");
                elem.addClass(opt.errorClass);
            }

        },
        bindEvent: function() {
            var me = this;
            var elem = me.element;
            var opt = me.options;

            elem.on('focus', function() {
                var that = $(this);
                if (that.hasClass(opt.errorClass)) {
                    that.removeClass(opt.errorClass);
                }
                that.addClass(opt.activeClass);
            });
            elem.on('blur', function() {
                var that = $(this);
                if (that.hasClass(opt.activeClass)) {
                    that.removeClass(opt.activeClass);
                }
            });
            //自定义事件触发验证
            if (opt.vilidataEvent !== "") {
                elem.on(opt.vilidataEvent, function() {
                    me.valueVilidata();
                });
            }


        }
    });
})();
