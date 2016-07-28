Ext.define('App.store.UserFileSystemStore',{

    extend  : 'Ext.data.TreeStore',
    requires: [
        'App.model.UserFileSystemModel'
    ],
    model   : 'App.model.UserFileSystemModel',
    storeId : 'UserFileSystemStore',
    alias   : 'store.UserFileSystemStore',

    autoLoad: true,

    proxy: {
        type: 'rest',
        url : 'api/v1/file/my_files',
        reader  : {
            type  : 'json'
        }
    },

    folderSort: true,

    sorters: [{
        property    : 'text',
        direction   : 'ASC'
    }],

    listeners : {
        load : function(s) {
            var name = Ext.getClassName(this);
            console.log('Loaded {0} ({1})'.format(name, this.getCount()) );
        }
    }

});
