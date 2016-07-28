Ext.define('App.view.myspace.MySpace',{
    extend : 'App.view.plugin.StatefulTree',
    xtype  : 'myspace',
    requires : [
        'App.view.myspace.MySpaceModel',
        'App.view.myspace.MySpaceController',
        'App.view.shareit.ShareIt'
    ],

    controller : 'myspace',

    stateful: true,

    viewModel: {
        type: 'myspace'
    },

    tbar: [
        {
            iconCls : 'reload',
            name    : 'reload',
            handler : 'onReloadMySpace'
        },'-',
        {
            xtype       : 'textfield',
            emptyText   : 'Search...',
            flex        : 1,
            listeners   : {
                change : 'onSearch'
            }
        }
    ],

    iconCls     : 'folder-white',
    rootVisible : false,
    useArrows   : false,
    bodyStyle   : {border:0},
    hideHeaders : true,
    animate     : true,


    listeners : {

        activate : function(t) {
            t.setIconCls('folder-white');
            t.up('navigator').setIconCls('folder-blue');
            t.up('navigator').setTitle(this.getViewModel().data.title);
        },
        deactivate : function(t) {
            t.setIconCls('folder-blue');
        },

        itemclick : 'onNavItemClick',
        itemcontextmenu : 'onNavItemContextMenu',
        scope : 'controller'
    },

    reload : function() {
        var me = this;
        this.saveTreeState();
        this.store.on('load',me.restoreTreeState,this,{single:true});
        this.store.reload();
    },

    constructor : function(){
        var me = this;

        if(App.lib.User.username != 'su'){
            me.store = Ext.getStore('UserFileSystemStore');
        }

        this.callParent(arguments);

    }

});