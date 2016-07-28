Ext.define('App.view.shareit.ShareItController', {
    extend: 'Ext.app.ViewController',

    requires: [
    ],

    alias: 'controller.shareit',

    init: function() {
        this.control({
            'shareit': {
                'addguest'   : this.onShare,
                'removeguest': this.onShare
            }
        });
    },

    onShare : function(path, guests) {
        App.lib.Ajax.share(path, guests);
    }



});