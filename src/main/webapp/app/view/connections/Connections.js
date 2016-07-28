Ext.define('App.view.connections.Connections',{
    extend: 'Ext.window.Window',
    xtype: 'connections',

    requires : [
        'App.view.connections.ConnectionsController',
        'App.view.connections.ConnectionsGrid',
        'App.view.connections.ConnectionDetail'
    ],

    controller : 'connections',

    modal       : true,
    collapsible : true,
    animCollapse: true,
    maximizable : true,
    width       : 975,
    height      : 575,
    minWidth    : 300,
    minHeight   : 200,
    layout      : 'border',
    title       : 'Connections',

    items : [
        {
            xtype  : 'connectionsgrid',
            region      : 'west',
            width       : 300,
            split       : true,
            margins     : '0 0 0 0',
            collapsible : false,
            animCollapse: false,
            header      : false
        },
        {
            xtype  : 'connectiondetail',
            region      : 'center',
            margins     : '0 0 0 0',
            collapsible : false,
            animCollapse: false
        }
    ],

    listeners : {
        add : function (c, i) {
            if (i.xtype == 'bordersplitter') {
                i.width = 3;
            }
        }
    }

});