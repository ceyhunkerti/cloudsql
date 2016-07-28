Ext.define('App.model.MaskModel',{
    extend : 'Ext.data.Model',

    fields : [

        {
            name    : 'id',
            type    : 'int',
            persist : false
        },
        {
            name    : 'connection',
            type    : 'auto'
        },
        {
            name    : 'connectionId',
            type    : 'int',
            convert : function(v, r){
                if(r.get('connection')){
                    return r.get('connection').id;
                }
            }
        },
        {
            name    : 'connectionName',
            type    : 'string',
            persist : false,
            convert : function(v, r){
                if( r.get('connection') ){
                    return r.get('connection').name;
                }
            }
        },
        {
            name : 'tableName',
            type : 'string'
        },
        {
            name : 'columnName',
            type : 'string'
        },
        {
            name : 'maskType',
            type : 'string'
        },
        {
            name : 'maskTypeName',
            type : 'string',
            convert : function(v,r){
                return Constants.maskType.getTypeDescById(r.get('maskType'));
            }
        },
        {
            name : 'active',
            type : 'boolean'
        }
    ]



});