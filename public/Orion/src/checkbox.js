(function () {
    $.widget('rkui.checkbox',{
        options:{
            baseClass:'rk-ui-checkbox-default',
            hoverClass:'rk-ui-checkbox-hover',
            disabledClass:'rk-ui-checkbox-disabled',
            activedClass:'rk-ui-checkbox-actived',
            hiddenClass:'rk-ui-checkbox-hidden',
            fontClass:'rk-ui-checkbox-text',
            disabeld:false,
            actived:false
        },
        _create:function () {
            var me = this;
            var elem = me.element;
            var opt = me.options;

            elem.addClass(opt.hiddenClass);
            var lableDiv =  elem.siblings('label');
            var checkboxText = lableDiv.text();
            var textHtml = $('<span class="'+opt.fontClass+'">'+checkboxText+'</span>');
            lableDiv.addClass(opt.baseClass);
            lableDiv.empty().append(textHtml);

            me._bindEvent();
        },
        _init:function () {
            var me = this;
            var elem = me.element;
            var opt = me.options;
        },
        _bindEvent:function () {
            var me = this;
            var elem = me.element;
            var opt = me.options;

            $('.rk-ui-checkbox-default').off('click').on('click',function () {
                var that = $(this);
                if(that.hasClass(opt.activedClass)){
                    that.removeClass(opt.activedClass);
                }else{
                    that.addClass(opt.activedClass);
                    that.parent().siblings('span').find('.rk-ui-checkbox-base').removeClass(opt.activedClass);
                }
            });
        },

    })
})();