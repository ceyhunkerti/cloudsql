Ext.define('App.view.desc.table.TableColumnsGrid',{
    extend : 'Ext.grid.Panel',
    xtype  : 'tablecolumnsgrid',

    title  : 'Columns',
    frame           : false,
    deferRowRender  : true,
    columnLines     : true,

    bind : {
        store : '{columns}'
    },

    columns: [
        {
            text : 'Name',
            dataIndex : 'name',
            flex : 2
        },
        {
            text : 'Data Type',
            dataIndex : 'dataType',
            flex : 2
        }
        //,{
        //    text : 'Size',
        //    dataIndex : 'size',
        //    flex : 1,
        //    hidden : true
        //}
    ]

});