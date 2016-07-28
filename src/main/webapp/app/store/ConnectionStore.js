Ext.define('App.store.ConnectionStore',{
    extend  : 'App.store.AjaxReadyStore',
    storeId : 'ConnectionStore',
    alias   : 'store.ConnectionStore',

    model   : 'App.model.ConnectionModel',
    autoLoad: false,


    sorters: [
        {
            property: 'name',
            direction:'ASC'
        }
    ],

    idField : 'id',
    messageDataProperty  : 'name',

    createSuccessMessage : 'Created connection',
    createErrorMessage   : 'Failed to create connection',

    updateSuccessMessage : 'Updated connection',
    updateErrorMessage   : 'Failed to update connection',

    deleteSuccessMessage : 'Deleted connection',
    deleteErrorMessage   : 'Failed to delete connection',

    constructor : function() {
        this.callParent(arguments);

        this.proxy.api = {
            update  : 'api/v1/connection',
            destroy : 'api/v1/connection',
            create  : 'api/v1/connection',
            read    : 'api/v1/connection'
        };

        this.readAndLoad();

    }


});
