Ext.define('App.view.navigator.Navigator',{
    extend  : 'Ext.tab.Panel',
    requires: [
        'App.view.navigator.NavigatorModel',
        'App.view.myspace.MySpace',
        'App.view.sharespace.ShareSpace',
        'App.view.settings.Settings'
    ],
    xtype   : 'navigator',
    viewModel: {
        type: 'navigator'
    },

    tabPosition : 'bottom',
    collapsible : true,
    animCollapse: true,
    name        : 'navigator',
    width       : 250,
    split       : true,
    layout      : 'fit',

    tools : [
        {
            type    : 'gear',
            tooltip : 'Additional options',
            handler: function(e, toolEl, panelHeader) {
                var m = Ext.create('Ext.menu.Menu',{
                    name : 'superOptions',
                    items: [
                        {
                            name : 'signOut',
                            text : 'Sign Out - {0} / {1}'.format(User.username,User.role),
                            iconCls : 'power-off'
                        },
                        {
                            name : 'changePassword',
                            text : 'Change Password',
                            hidden : User.username == 'su'
                        }
                    ]
                });
                m.showAt(e.getXY());
            }
        }
    ],

    items : [
        {
            xtype       : 'myspace',
            reference   : 'myspace',
            header      : false
        },
        {
            xtype       : 'sharespace',
            reference   : 'sharespace',
            header      : false
        },
        {
            xtype       : 'settings',
            reference   : 'settings',
            header      : false
        }
    ]




});
