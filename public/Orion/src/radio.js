(function () {
    $.widget('rkui.radio',{
        options:{
          baseClass:'rk-ui-radio-default',
          hoverClass:'rk-ui-radio-hover',
          disabledClass:'rk-ui-radio-disabled',
          activedClass:'rk-ui-radio-actived',
          hiddenClass:'rk-ui-radio-hidden',
          fontClass:'rk-ui-radio-text',
          disabeld:false,
          actived:false
        },
        _create:function () {
          var me = this;
          var elem = me.element;
          var opt = me.options;

          elem.addClass(opt.hiddenClass);
          var lableDiv =  elem.siblings('label');
          var radioText = lableDiv.text();
          var textHtml = $('<span class="'+opt.fontClass+'">'+radioText+'</span>');
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

           $('.rk-ui-radio-base').off('click').on('click',function () {
                var that = $(this);
                if(that.hasClass(opt.activedClass)){
                    that.removeClass(opt.activedClass);
                }else{
                    that.addClass(opt.aoctivedClass);
                    that.parent().siblings('span').find('.rk-ui-radio-base').removeClass(opt.activedClass);
                }
            });
        },

    })
})();