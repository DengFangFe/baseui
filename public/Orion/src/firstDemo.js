(function() {
    "use strict";

    $.widget('rk-ui.firstDemo', {
        options: {},
        _create: function() {

        },
        _init: function() {
            var me = this;
            var elem = me.element;

            elem.on('click', function() {
                elem.html('clicked!');
            });
        }
    });
})();
