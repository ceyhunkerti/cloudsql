Ext.define('App.model.ConnectionModel',{
    extend : 'Ext.data.Model',
    idProperty : 'id',

    fields : [
        {name : 'id',       type : 'int'},
        {name : 'name',     type : 'string'},
        {name : 'username', type : 'string'},
        {name : 'password', type : 'string'},
        {name : 'url',      type : 'string'},
        {name : 'active',   type : 'boolean'}
    ]

});