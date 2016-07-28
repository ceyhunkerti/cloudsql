Ext.define('App.view.settings.Settings',{

    extend  : 'Ext.grid.Panel',
    xtype   : 'settings',

    requires: [
        'App.view.settings.SettingsModel',
        'App.view.settings.SettingsController',
        'App.view.users.UserDetail'
    ],

    controller : 'settings',

    iconCls: 'settings-blue',

    viewModel: {
        type: 'settings'
    },

    bind : {
        store : '{list}'
    },

    selModel: {
        ignoreRightMouseSelection: true
    },

    hideHeaders : true,
    columnLines : false,
    rowLines    : false,
    padding     : '10 0 0 0',

    columns : [
        {
            name        : 'name',
            flex        : 1,
            dataIndex   : 'name',
            cls         : 'x-grid-cell-inner x-grid-cell-inner-treecolumn',
            renderer    : function(value, metadata, record) {
                metadata.style = "padding-left:23px;";

                return '{0} {1} {2} {3}'.format(
                    '<img src="{}">'.format(record.get('img')),
                    '<span style="padding-left:10px">',
                    value,
                    '</span>'
                );
            }
        }
    ],



    listeners : {

        cellclick: 'onCellClick',
        activate : function(t) {
            t.setIconCls('settings-white');
            t.up('navigator').setIconCls('settings-blue');
            t.up('navigator').setTitle(this.getViewModel().data.title);
        },
        deactivate : function(t) {
            t.setIconCls('settings-blue');
        }
    }

});