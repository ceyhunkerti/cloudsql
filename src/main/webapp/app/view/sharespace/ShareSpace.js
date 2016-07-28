
Ext.define('App.view.sharespace.ShareSpace',{

    extend  : 'Ext.panel.Panel',
    requires: [
        'App.view.sharespace.ShareSpaceModel',
        'App.view.sharespace.ShareByMe',
        'App.view.sharespace.ShareByOthers',
        'App.view.sharespace.ShareSpaceController'
    ],

    xtype : 'sharespace',
    viewModel: {
        type: 'sharespace'
    },

    iconCls: 'share-blue',
    layout : 'card',
    controller : 'sharespace',
    reference  : 'ShareSpace',


    tbar: [
        {
            iconCls : 'reload',
            name    : 'reload',
            handler : 'onReloadShareSpace'
        },'-',
        {
            xtype       : 'textfield',
            emptyText   : 'Search...',
            flex        : 1
        }
    ],


    bbar: [
        Ext.create('Ext.form.ComboBox', {
            store: Ext.create('App.store.statics.ShareTypeStore'),
            queryMode: 'local',
            name : 'shareType',
            flex : 1,
            value: 0,
            displayField: 'text',
            valueField  : 'value',
            editable : false,
            reference: 'ShareType',
            listeners: {
                change : 'onShareTypeChange'
            }
        })
    ],

    listeners : {

        activate : function(t) {
            t.setIconCls('share-white');
            t.up('navigator').setIconCls('share-blue');
            t.up('navigator').setTitle(this.getViewModel().data.title);
            this.fireEvent('loadsharestore');
        },
        deactivate : function(t) {
            t.setIconCls('share-blue');
        },
        'loadsharestore' : 'loadShareStore'


    },

    activeItem : 0,

    items : [
        {
            xtype : 'sharebyme'     /* 0 */
        },
        {
            xtype : 'sharebyothers' /* 1 */
        }
    ]

});