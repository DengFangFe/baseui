(function() {
    "use strict";

    $.widget('rkui.textarea', {
        options: {
            activeClass: 'rk-ui-state-active',
            disabledClass: 'rk-ui-state-disable',
            initClass: 'rk-ui-state-init',
            errorClass: 'rk-ui-state-error',
            width: 300,
            height: 50,
            maxLength: 500,
            minlength: null,
            autoHeight: true,
            showLable: true
        },
        _create: function() {
            var me = this;
            var elem = me.element;
            var opt = me.options;

            var textarea = elem.find('textarea');
            textarea.addClass(opt.initClass);
            elem.css({
                width: opt.width,
                height: opt.height
            });
            if (opt.autoHeight) {
                me._autoHeight();
            }
            me._bindEvent();
            me._showLabel();
        },
        _init: function() {

        },
        _autoHeight: function() {
            var me = this;
            var elem = me.element;

            var textarea = elem.find('textarea');
            var $this = textarea;
            if (!$this.attr('_initAdjustHeight')) {
                $this.attr('_initAdjustHeight', $this.outerHeight());
            }
            me._adjustH($this);
            me._adjustH($this).on('input', function() {
                me._adjustH($this);
            });
        },
        _adjustH: function(tag) {
            var $obj = tag;
            return $obj.css({ height: $obj.attr('_initAdjustHeight'), 'overflow-y': 'hidden' }).height(tag[0].scrollHeight);
        },
        _showLabel: function() {
            var me = this;
            var elem = me.element;
            var opt = me.options;

            me.size = 0;
            var labelElem = $('<div class="rk-ui-textarea-label"><span class="num">' + me.size + '</span><span>/</span><span>' + opt.maxLength + '</span></div>');
            if (opt.showLable) {
                elem.append(labelElem);
            }
            elem.find('textarea').on('keyup', function() {
                var textlength = $(this).val().length;
                me.size = textlength;
                elem.find('.num').text(me.size);
            });
        },
        _bindEvent: function() {
            var me = this;
            var elem = me.element;
            var opt = me.options;

            var textarea = elem.find('textarea');
            textarea.on('focus', function() {
                var $this = $(this);
                if ($this.addClass(opt.errorClass)) {
                    $this.removeClass(opt.errorClass);
                }
                $this.addClass(opt.activeClass);
            });
            textarea.on('blur', function() {
                var $this = $(this);
                if ($this.addClass(opt.activeClass)) {
                    $this.removeClass(opt.activeClass);
                }
            });

        }
    });
})();
