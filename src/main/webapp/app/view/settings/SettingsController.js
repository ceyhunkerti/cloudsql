Ext.define('App.view.settings.SettingsController', {
    extend: 'Ext.app.ViewController',
    alias : 'controller.settings',

    onCellClick : function(g, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
        var id = record.get('val');

        switch(id) {
            case Constants.id.settings.USERS : this.fireEvent('users:show'); break;
            case Constants.id.settings.CONNECTIONS : this.fireEvent('connections:show'); break;
            case Constants.id.settings.MASK_MAKER  : this.fireEvent('masks:show'); break;
            case Constants.id.settings.OPTIONS : this.fireEvent('options:show'); break;
        }
    }


});