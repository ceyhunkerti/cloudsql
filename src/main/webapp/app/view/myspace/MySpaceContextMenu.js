Ext.define('App.view.myspace.MySpaceContextMenu',{

    extend  : 'Ext.menu.Menu',
    xtype   : 'myspacecontextmenu',

    constructor : function(config) {

        this.items   = [
            {
                name    : 'newFile',
                text    : 'New File',
                disabled: config.leaf
            },
            {
                name    : 'newFolder',
                text    : 'New Folder',
                iconCls : 'folder-green',
                disabled: config.leaf
            },'-',
            {
                name    : 'delete',
                text    : 'Delete',
                iconCls : 'delete'
            },
            {
                name    : 'rename',
                text    : 'Rename'
            },'-',
            {
                name    : 'share',
                text    : 'Share',
                iconCls : 'share-blue'
            }
        ];

        this.callParent(arguments);

    }

});