/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 */
Ext.define('App.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'App.view.main.MainController',
        'App.view.main.MainModel',

        'App.view.navigator.Navigator',
        'App.view.editor.Editor'
    ],

    xtype: 'app-main',
    
    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },

    items: [{
        xtype: 'navigator',
        region: 'west'
    },{
        region: 'center',
        xtype : 'app-editor'
    }],


    listeners : {
        add : function (c, i) {
            if (i.xtype == 'bordersplitter') {
                i.width = 3;
            }
        }
    }


});
