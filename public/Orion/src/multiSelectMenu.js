(function() {
    "use strict";
    $.widget('rkui.multiSelectMenu', {
        options: {
            multiple: true,
        },
        _create: function () {
            var me = this;
            var elem = me.element;
            var opt = me.options;
            var addIcon = $('<a href="javascript:;" class="rk-ui-selectmenu-add"></a>');
            elem.addClass('multiple-selectMenu');
            elem.append(addIcon);
            me._bindEvent();
        },
        _comboBoxSource: function () {
            var me = this;
            var elem = me.element;
            var opt = me.options;
            var json = {
                status: 0,
                data: [{
                    id: 10207,
                    "label": [{
                        id: 1,
                        value: "亲切"
                    }, {
                        id: 2,
                        value: "服务态度好"
                    }, {
                        id: 3,
                        value: "效率高"
                    }]
                }]
            };
            var source = opt.source || json;
            var list = source.data[0].label;
            var selectMenuOperate = $('<div class="rk-ui-selectmenu-operate"><span class="rk-ui-selectmenu-all">全选</span><span      class="rk-ui-selectmenu-unall">全不选</span></div>')
            var sourceContent = $('<ul class="rk-ui-selectmenu-content"></ul>');
            for (var i = 0, len = list.length; i < len; i++) {
                var html = '<li>' +
                    '<input type="checkbox" class="rk-ui-selectmenu-input">' +
                    '<span id="' + list[i].id + '">' + list[i].value + '</span>' +
                    '</li>'
                sourceContent.append(html);
            }
            $('.rk-ui-selectmenu-combobox.rk-ui-multiple-selectmenu').append(selectMenuOperate);
            $('.rk-ui-selectmenu-combobox.rk-ui-multiple-selectmenu').append(sourceContent);
            me._comboBoxSelectEvent();
            me._hideComboBox();
            me._selectAll();
            me._unselectAll();
        },
        _comboBoxSelectEvent: function () {
            var me = this;
            var elem = me.element;
            var opt = me.options;

            var comboBoxList = $('.rk-ui-selectmenu-combobox.rk-ui-multiple-selectmenu .rk-ui-selectmenu-content li');
            comboBoxList.on('click', function (e) {
                e.stopPropagation();
                var that = $(this);
                that.toggleClass('selected');
                if (that.hasClass('selected')) {
                    var selectMenuInput = $('.multiple-selectMenu').find('.rk-ui-selectmenu-input');
                    var value = that.find('span').text();
                    var selectId = that.find('span').attr('id');
                    that.find('input').prop('checked', true);
                    var existValue = selectMenuInput.val();
                    if (existValue == "") {
                        selectMenuInput.val(value);
                    } else {
                        selectMenuInput.val(existValue + "," + value);
                    }
                    var existId = selectMenuInput.attr('id');
                    if (existId === undefined) {
                        selectMenuInput.attr('id', selectId);
                    } else {
                        selectMenuInput.attr('id', existId + ',' + selectId);
                    }
                } else {
                    var selectMenuInput = $('.multiple-selectMenu').find('.rk-ui-selectmenu-input');
                    var value = that.find('span').text();
                    var selectId = that.find('span').attr('id');
                    var inputValue = selectMenuInput.val();
                    var valueArray = inputValue.split(',');
                    var valueArray1 = [];
                    for (var i = 0, len = valueArray.length; i < len; i++) {
                        if (valueArray[i] != value) {
                            valueArray1.push(valueArray[i]);
                        }
                    }
                    console.log("valueArray", valueArray1);
                    valueArray1 = valueArray1.join(',');
                    that.find('input').prop('checked', false);
                    selectMenuInput.val(valueArray1);
                }


                $('.rk-ui-selectmenu-combobox').removeClass('rk-ui-selectmenu-open');
                // callback();
            })
        },
        _bindEvent:function () {
            var me = this;
            var elem = me.element;
            var opt = me.options;

            //弹出下拉框ComboBox
            elem.on('click','a.rk-ui-selectmenu-add',function () {
                var that = $(this);
                var selectMenuComboBox = $('body').find('.rk-ui-selectmenu-combobox.rk-ui-multiple-selectmenu.rk-ui-selectmenu-open');
                if(selectMenuComboBox.size() > 0){
                    selectMenuComboBox.hide();
                    selectMenuComboBox.removeClass('rk-ui-selectmenu-open');
                }else{
                    me._showComboBox();
                }
            });
        },
        _showComboBox:function () {
            var me = this;
            var elem = me.element;
            var opt = me.options;
            var selectMenuComboBox = $('<div class="rk-ui-selectmenu-combobox rk-ui-multiple-selectmenu"></div>');
            if($('body').find('.rk-ui-selectmenu-combobox.rk-ui-multiple-selectmenu').size() > 0){
                $('.rk-ui-selectmenu-combobox.rk-ui-multiple-selectmenu').show();
                $('.rk-ui-selectmenu-combobox.rk-ui-multiple-selectmenu').addClass('rk-ui-selectmenu-open');
            }else{
                $('body').append(selectMenuComboBox);
                selectMenuComboBox.addClass('rk-ui-selectmenu-open');
                me._comboBoxSource();
            }
            var selectInput = $('.multiple-selectMenu').find('.rk-ui-selectmenu-input');
            var selectInputOffset = selectInput.offset();
            var selectInputWidth = elem.width();
            $(selectMenuComboBox).css({
                "left":selectInputOffset.left,
                "top":selectInputOffset.top + 30,
                "width":selectInputWidth
            });
            // me._refreshComboBox();
        },
        _hideComboBox: function () {
            var me = this;
            var elem = me.element;
            var opt = me.options;

            $(document).on("click", function (e) {
                if (!$(e.target).closest(".multiple-selectMenu .rk-ui-selectmenu-add").size()) {
                    $(".rk-ui-selectmenu-combobox.rk-ui-multiple-selectmenu").removeClass('rk-ui-selectmenu-open');
                    $(".rk-ui-selectmenu-combobox.rk-ui-multiple-selectmenu").hide();
                }
            });
        },
        _comboBoxCheckbox: function () {
            var me = this;
            var elem = me.element;
            var opt = me.options;

            var checkbox = $('.rk-ui-selectmenu-combobox.rk-ui-multiple-selectmenu .rk-ui-selectmenu-content li').find('input[type="checkbox"]');

            checkbox.on('click', function (e) {
                alert(e);
            });
        },
        _selectAll: function () {
            var me = this;
            var elem = me.element;
            var opt = me.options;

            var comboBox = $('.rk-ui-selectmenu-combobox.rk-ui-multiple-selectmenu');
            comboBox.on('click', 'span.rk-ui-selectmenu-all', function (e) {
                e.stopPropagation();
                var comboBoxList = comboBox.find('li');
                comboBoxList.trigger('click');
            });
        },
        _unselectAll: function () {
            var me = this;
            var elem = me.element;
            var opt = me.options;

            var comboBox = $('.rk-ui-selectmenu-combobox.rk-ui-multiple-selectmenu');
            comboBox.on('click', 'span.rk-ui-selectmenu-unall', function (e) {
                e.stopPropagation();
                var comboBoxList = $('.rk-ui-selectmenu-combobox.rk-ui-multiple-selectmenu .rk-ui-selectmenu-content li');
                $.each(comboBoxList, function (i, el) {
                    $(el).find('[type="checkbox"]').prop('checked', false);
                    $(el).removeClass('selected');
                });
                elem.find('.rk-ui-selectmenu-input').val("");
            });
        },
        _refreshComboBox:function () {
            var me = this;
            var elem = me.element;
            var opt = me.options;

            var selectId = $('.multiple-selectMenu').find('.rk-ui-selectmenu-input').attr('id');
            var comboBoxList = $('.rk-ui-selectmenu-combobox.rk-ui-multiple-selectmenu .rk-ui-selectmenu-content li');

            $.each(comboBoxList,function (o,el) {
                if($(el).find('span').attr('id')== selectId){
                    $(el).siblings().removeClass('selected');
                    $(el).addClass('selected');
                }
            })
        },
    });
})();

