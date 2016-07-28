Ext.define('App.store.MaskStore',{
    extend : 'App.store.AjaxReadyStore',
    storeId: 'MaskStore',


    model    : 'App.model.MaskModel',
    autoLoad : false,

    sorters: [
        {
            property: 'connectionName',
            direction:'ASC'
        },
        {
            property: 'tableName',
            direction:'ASC'
        },
        {
            property: 'columnName',
            direction:'ASC'
        }
    ],

    constructor : function(){
        this.callParent(arguments);
        this.proxy.api = {
            update  : 'api/v1/mask',
            create  : 'api/v1/mask',
            read    : 'api/v1/mask',
            destroy : 'api/v1/mask'
        };

        this.readAndLoad();
    }


});
