Ext.define('App.view.connections.ConnectionsGrid',{
    extend : 'App.view.plugin.GridWithAction',
    xtype  : 'connectionsgrid',

    enableColumnHide:false,
    columnLines : false,
    rowLines    : false,

    tbar : [
        {
            xtype : 'textfield',
            name  : 'search',
            flex  : 1,
            listeners : {
                change : 'onSearchConnections'
            }
        },
        {
            iconCls : 'reload',
            name    : 'reload',
            handler : 'onReloadConnections'
        },
        {
            xtype  : 'button',
            iconCls: 'plus',
            tooltip: 'New connection',
            handler: 'onAddConnection',
            hidden : !App.lib.User.hasRole(Constants.role.ADMIN)
        }
    ],


    columns : [
        {
            name      : 'name',
            dataIndex : 'name',
            flex      : 1,
            renderer  : function(v, m){
                m.style = "font-weight:bolder;";
                return v;
            }
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
            handler : 'onEditConnection',
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
            handler : 'onDeleteConnection',
            hidden  : !App.lib.User.hasRole(Constants.role.ADMIN)
        }
    ],

    listeners : {
        cellClick : 'onConnectionDetail'
    },


    constructor : function(){
        this.store = Ext.getStore(Constants.store.CONNECTION);
        this.callParent(arguments);
    }


});