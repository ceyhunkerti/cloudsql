Ext.define('App.store.ShareByOthersStore',{

    extend  : 'Ext.data.TreeStore',
    requires: [
        'App.model.UserFileSystemModel'
    ],
    model   : 'App.model.UserFileSystemModel',
    storeId : 'ShareByOthersStore',
    alias   : 'store.ShareByOthersStore',

    autoLoad: true,

    proxy: {
        type: 'rest',
        url : 'api/v1/file/shared/others',
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
