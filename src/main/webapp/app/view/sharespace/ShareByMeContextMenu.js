Ext.define('App.view.sharespace.ShareByMeContextMenu',{

    extend  : 'Ext.menu.Menu',
    xtype   : 'sharebymecontextmenu',

    items : [
        {
            name    : 'share',
            text    : 'Share',
            iconCls : 'share-blue'
        },
        {
            name    : 'stopShare',
            text    : 'Stop Sharing'
        }
    ]

});