Ext.define('App.view.editor.Connection',{
    extend  : 'Ext.tab.Panel',
    xtype   : 'connection',

    requires: [
        'App.view.editor.Page'
    ],

    iconCls     : 'broken-link-white',
    title       : 'New Connection',
    tabPosition : 'bottom',
    bodyPadding : 0,
    frame       : false,
    overflowY   : 'auto',
    layout      : 'fit',


    items : [
        {
            xtype  : 'app-page'
        },
        {
            iconCls     : 'plus',
            name        : 'addPage' ,
            sysActivate : true,
            listeners   : {
                activate: 'onAddPage'
            }
        }
    ],

    privates : {
        connection: undefined
    },

    getConnection : function(){
        return this.connection;
    },

    disconnect : function(){
        this.setIconCls('disconnected-white');
        this.connection = undefined;
    },

    connect : function(con) {
        this.setTitle(con.name);
        this.setIconCls('connected-white');
        this.connection = con;
        this.resetPages();
    },

    resetPages: function(){
        var pages =
            Ext.ComponentQuery.query('connection[title={0}] app-page'.format(this.getTitle()));

        for(var i = 0; i< pages.length; i++){
            pages[i].setConnection(this.getConnection().id);
        }
    },


    listeners : {


        activate : function(con) {
            if(this.getConnection()){
                con.setIconCls('connected-white');

            }else {
                con.setIconCls('disconnected-white');
            }
        },

        deactivate : function(con) {
            if(this.getConnection()) {
                con.setIconCls('connected');
            } else {
                con.setIconCls('disconnected');
            }
        }
    }

});