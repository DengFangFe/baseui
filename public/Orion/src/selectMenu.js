(function () {
    "use strict";
    $.widget('rkui.selectMenu',{
        options:{
            source:null,
            multiple:false,
            filter:true
        },
        _create:function () {
            var me = this;
            var elem = me.element;
            var opt = me.options;
            var addIcon = $('<a href="javascript:;" class="rk-ui-selectmenu-add"></a>');
            elem.addClass('single-selectMenu');
            elem.append(addIcon);
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

            //弹出下拉框ComboBox
            elem.on('click','a.rk-ui-selectmenu-add',function () {
               var that = $(this);
               var selectMenuComboBox = $('body').find('.rk-ui-selectmenu-combobox.rk-ui-single-selectmenu.rk-ui-selectmenu-open');
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
            var selectMenuComboBox = $('<div class="rk-ui-selectmenu-combobox rk-ui-single-selectmenu"></div>');
            if($('body').find('.rk-ui-selectmenu-combobox.rk-ui-single-selectmenu').size() > 0){
                $('.rk-ui-selectmenu-combobox.rk-ui-single-selectmenu').show();
                $('.rk-ui-selectmenu-combobox.rk-ui-single-selectmenu').addClass('rk-ui-selectmenu-open');
            }else{
                $('body').append(selectMenuComboBox);
                selectMenuComboBox.addClass('rk-ui-selectmenu-open');
                me._comboBoxSource();
            }
            var selectInput = $('.single-selectMenu').find('.rk-ui-selectmenu-input');
            var selectInputOffset = selectInput.offset();
            var selectInputWidth = elem.width();
            $(selectMenuComboBox).css({
                "left":selectInputOffset.left,
                "top":selectInputOffset.top + 30,
                "width":selectInputWidth
            });
            me._refreshComboBox();
            me._hideComboBox();
        },
        _hideComboBox:function () {
            var me = this;
            var elem = me.element;
            var opt = me.options;
            $(document).on("click", function (e) {
                if (!$(e.target).closest(".single-selectMenu .rk-ui-selectmenu-add").size()) {
                    $(".rk-ui-selectmenu-combobox.rk-ui-single-selectmenu").removeClass('rk-ui-selectmenu-open');
                    $(".rk-ui-selectmenu-combobox.rk-ui-single-selectmenu").hide();
                }
            });
        },
        _comboBoxSource:function () {
            var me = this;
            var elem = me.element;
            var opt = me.options;
            var json = {
                status: 0,
                data: [{
                    id: 10207,
                    "label": [
                        {
                            id:1,
                            value:"亲切",
                            pinyin:"qingqie"
                        },
                        {
                            id:2,
                            value:"服务态度好",
                            pinyin:"fuwutaiduhao"
                        },
                        {
                            id:3,
                            value:"效率高",
                            pinyin:"xiaolvgao"
                        }
                    ]
                }]
            };
            var source = opt.source || json;
            var list = source.data[0].label;
            var sourceContent = $('<ul class="rk-ui-selectmenu-content"></ul>');
            for(var i = 0,len = list.length; i < len; i++){
                    var html = '<li pinyin="'+list[i].pinyin+'" name="'+list[i].value+'">'+
                        '<a href="javascript:;" id="'+list[i].id+'" >'+list[i].value+'</a>'+
                        '</li>'
                    sourceContent.append(html);
            }
            if(opt.filter){
                me._filterComboBox();
            }
            $('.rk-ui-selectmenu-combobox.rk-ui-single-selectmenu').append(sourceContent);
            me._comboBoxSelectEvent(function () {
                me._hideComboBox();
            });
        },
        _comboBoxSelectEvent:function (callback) {
            var me = this;
            var elem = me.element;
            var opt = me.options;

            var comboBoxList = $('.rk-ui-selectmenu-combobox.rk-ui-single-selectmenu .rk-ui-selectmenu-content li');

            comboBoxList.on('click',function (i) {
                    var selectMenuInput = $('.single-selectMenu').find('.rk-ui-selectmenu-input');
                    selectMenuInput.val('');
                    var that = $(this);
                    var value = that.find('a').text();
                    var selectId = that.find('a').attr('id');
                    selectMenuInput.val(value);
                    selectMenuInput.attr('id',selectId);
                    $('.rk-ui-selectmenu-combobox.rk-ui-single-selectmenu').removeClass('rk-ui-selectmenu-open');
                    callback();
                })

        },
        _refreshComboBox:function () {
            var me = this;
            var elem = me.element;
            var opt = me.options;

            var selectId = $('.single-selectMenu').find('.rk-ui-selectmenu-input').attr('id');
            var comboBoxList = $('.rk-ui-selectmenu-combobox.rk-ui-single-selectmenu .rk-ui-selectmenu-content li');

            $.each(comboBoxList,function (o,el) {
                if($(el).find('a').attr('id') == selectId){
                    $(el).siblings().removeClass('selected');
                    $(el).addClass('selected');
                }
            })
        },
        _filterComboBox:function () {
            var me = this;
            var elem = me.element;
            var opt = me.options;

            var filterContent = $('<div class="rk-ui-filter-input"><input type="text" class="js-filter-input"></div>');
            $('.rk-ui-selectmenu-combobox.rk-ui-single-selectmenu').append(filterContent);
            me._filterEvent();
        },
        _filterEvent:function () {
            var me = this;
            var elem = me.element;
            var opt = me.options;

            var timeStamplast;
            $('.rk-ui-selectmenu-combobox.rk-ui-single-selectmenu').find('.js-filter-input').on('keyup', function(event) {
                var _this = $(this);
                timeStamplast = event.timeStamp;
                setTimeout(function() {
                    if (timeStamplast - event.timeStamp == 0) {
                        var filterValue = $.trim(_this.val());
                        var userNameList = $('.rk-ui-selectmenu-combobox.rk-ui-single-selectmenu').find(".rk-ui-selectmenu-content li");
                        userNameList.each(function(i) {
                            if (filterValue != "" && $(this).attr("pinyin").indexOf(filterValue) == -1 && $(this).attr("name").indexOf(filterValue) == -1) {
                                $(this).css('display', 'none');
                            }else{
                                $(this).css('display', 'inline-block');
                            }
                        })

                    }
                },300)

            });

        }
    });
})();