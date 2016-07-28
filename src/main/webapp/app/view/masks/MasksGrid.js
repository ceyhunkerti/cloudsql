Ext.define('App.view.masks.MasksGrid', {
    extend  : 'App.view.plugin.GridWithAction',
    xtype   : 'masksgrid',

    viewConfig : {
        enableTextSelection: true
    },

    tbar : {
        name : 'tbar',
        items: [
            {
                iconCls :'plus',
                name    : 'add',
                tooltip : 'New mask',
                handler : 'onAddMask',
                hidden  : !App.lib.User.hasRole(Constants.role.OPER)
            },'-',
            {
                name    : 'reload',
                iconCls : 'reload',
                tooltip : 'Reload',
                handler : 'onReloadMasks'
            },'-',
            {
                xtype : 'textfield',
                name  : 'search',
                flex  : 1,
                listeners : {
                    change : 'onMaskSearch'
                }
            }
        ]
    },

    columnLines : false,


    columns : [
        {
            text      : 'Connection',
            name      : 'connectionName',
            dataIndex : 'connectionName',
            flex      : 1
        },
        {
            text      : 'Column',
            name      : 'columnName',
            dataIndex : 'columnName',
            flex      : 1
        },
        {
            text      : 'Table',
            name      : 'tableName',
            dataIndex : 'tableName',
            flex      : 1
        },
        {
            text      : 'Mask Type',
            name      : 'maskType',
            dataIndex : 'maskTypeName',
            flex      : 1
        },
        {
            text      : 'Active',
            name      : 'active',
            dataIndex : 'active',
            hidden    : true,
            renderer  : function(v, m){
                var color = v ? '#26A65B' : '#D24D57';
                m.style = "color:{0};font-weight:bold;".format(color);
                return v ? 'Yes' : 'No';

            }
        },
        {
            name    : 'detail',
            xtype   : 'actioncolumn',
            iconCls : 'x-hidden',
            icon    : 'resources/img/details-16.png',
            sortable: false,
            resizable : false,
            width   : 30,
            menuDisabled : true,
            handler : 'onMaskDetail'
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
            handler : 'onEditMask',
            hidden  : !App.lib.User.hasRole(Constants.role.OPER)
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
            handler : 'onDeleteMask',
            hidden  : !App.lib.User.hasRole(Constants.role.OPER)
        }
    ],

    constructor : function(){
        this.store = Ext.getStore(Constants.store.MASK);
        this.callParent(arguments);
    }

});
