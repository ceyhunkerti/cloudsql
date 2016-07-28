Ext.define('App.store.ShareByMeStore',{

    extend  : 'Ext.data.TreeStore',
    requires: [
        'App.model.UserFileSystemModel'
    ],
    model   : 'App.model.UserFileSystemModel',
    storeId : 'ShareByMeStore',
    alias   : 'store.ShareByMeStore',

    autoLoad: true,

    proxy: {
        type: 'rest',
        url : 'api/v1/file/shared/me',
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
