Ext.define('App.model.UserModel',{
    extend : 'Ext.data.Model',

    idProperty:'username',

    fields : [

        {name : 'username', type : 'string'},
        {name : 'password', type : 'string'},
        {name : 'name'    , type : 'string'},
        {name : 'email'   , type : 'string'},
        {name : 'role'    , type : 'string'},
        {name : 'active'  , type : 'boolean'}
    ]

});