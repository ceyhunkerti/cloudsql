Ext.define('App.view.editor.Editor',{
    extend  : 'Ext.tab.Panel',
    xtype   : 'app-editor',

    requires: [
        'App.view.editor.EditorController'
    ],

    controller : 'editor',

    items   : [
        {
            name : 'dummy',
            hidden : true
        },
        {
            iconCls     : 'plus',
            name        : 'addConnection' ,
            sysActivate : true,
            listeners   : {
                activate: 'onAddConnection'
            }
        }
    ],

    findPageWithPath : function(path)  {
        if(!path) return;
        var page =
            Ext.ComponentQuery.query('app-editor connection app-page[path={0}]'.format(path))[0];

        if(page && page.getPath()){
            return page;
        }
    }



});
