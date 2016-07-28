Ext.define('App.store.UserStore',{

    extend      : 'App.store.AjaxReadyStore',
    model       : 'App.model.UserModel',
    autoLoad    : false,

    sorters: [
        {
            property: 'name',
            direction:'ASC'
        }
    ],


    idField : 'username',
    messageDataProperty  : 'username',

    createSuccessMessage : 'Created user',
    createErrorMessage   : 'Failed to create user',

    updateSuccessMessage : 'Updated user',
    updateErrorMessage   : 'Failed to update user',

    deleteSuccessMessage : 'Deleted user',
    deleteErrorMessage   : 'Failed to delete user',


    constructor : function() {
        this.callParent(arguments);
        this.proxy.api= {
            create  : 'api/v1/users',
            read    : 'api/v1/users',
            update  : 'api/v1/users',
            destroy : 'api/v1/users'
        };

        this.readAndLoad();
    }
});