

/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('App.Application', {
    extend: 'Ext.app.Application',
    
    name: 'App',
    appFolder: 'app',

    requires : [
        'App.lib.Constants',
        'App.lib.Toolbox',
        'App.lib.Message',
        'App.lib.Ajax',
        'App.lib.User',
        'App.lib.AceScriptParser'
    ],

    controllers : [
        'MainController'
    ],

    stores: [
        'UserStore',
        'UserFileSystemStore',
        'ShareByMeStore',
        'ShareByOthersStore',
        'ConnectionStore',
        'MaskStore',
        'statics.ShareTypeStore',
        'statics.MaskTypeStore',
        'FileBrowserStore'
    ],
    
    launch: function () {
        $(document).bind('keydown', 'ctrl+s', function(e) {
            console.log('Ctrl+S');
            e.preventDefault();
            return false;
        });

        $(window).bind('beforeunload',function(){
            return 'Are you sure you want to leave?';
        });

    }
});
