Ext.define('App.view.users.Users', {
    extend: 'Ext.window.Window',
    xtype: 'users',

    requires  : [
        'App.view.users.UsersController',
        'App.view.users.UsersGrid',
        'App.view.users.UserDetail'
    ],

    controller  : 'users',

    modal       : true,
    collapsible : true,
    animCollapse: true,
    maximizable : true,
    width       : 975,
    height      : 575,
    minWidth    : 300,
    minHeight   : 200,
    layout      : 'border',
    title       : 'Users',

    items : [
        {
            xtype  : 'usersgrid',
            region      : 'west',
            width       : 300,
            split       : true,
            margins     : '0 0 0 0',
            collapsible : false,
            animCollapse: false,
            header      : false
        },
        {
            xtype  : 'userdetail',
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