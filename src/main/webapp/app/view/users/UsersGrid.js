Ext.define('App.view.users.UsersGrid',{
    extend : 'App.view.plugin.GridWithAction',
    xtype  : 'usersgrid',

    enableColumnHide:false,
    columnLines : false,
    rowLines    : false,

    tbar : [
        {
            xtype : 'textfield',
            name  : 'search',
            flex  : 1,
            listeners : {
                change : 'onSearchUsers'
            }
        },
        {
            iconCls : 'reload',
            name    : 'reload',
            handler : 'onReloadUsers'
        },
        {
            xtype  : 'button',
            iconCls: 'plus',
            tooltip: 'New user',
            handler: 'onAddUser',
            hidden : !App.lib.User.hasRole(Constants.role.ADMIN)
        }
    ],


    columns : [
        {
            name      : 'name',
            dataIndex : 'name',
            flex      : 1
        },
        {
            name    : 'edit',
            xtype   : 'actioncolumn',
            iconCls : 'x-hidden',
            icon    : 'resources/img/pencil-16.png',
            sortable: false,
            resizable : false,
            width   : 30,
            menuDisabled : true,
            handler : 'onEditUser',
            hidden  : !App.lib.User.hasRole(Constants.role.ADMIN)
        },
        {
            name    : 'delete',
            xtype   : 'actioncolumn',
            icon    : 'resources/img/delete-16.png',
            iconCls : 'x-hidden',
            sortable: false,
            resizable : false,
            width   : 30,
            menuDisabled : true,
            handler : 'onDeleteUser',
            hidden  : !App.lib.User.hasRole(Constants.role.ADMIN)
        }
    ],

    listeners : {
        cellClick : 'onUserDetail'
    },


    constructor : function(){
        this.store = Ext.getStore(Constants.store.USER);
        this.callParent(arguments);
    }


});
