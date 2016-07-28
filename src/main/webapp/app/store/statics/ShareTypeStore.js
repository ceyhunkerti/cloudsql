Ext.define('App.store.statics.ShareTypeStore',{
    extend : 'Ext.data.Store',

    autoLoad : true,
    fields: [
        {name:'text', type:'string'},
        {name:'value',type:'int'}
    ],
    data  : [
        {text:'Shared By Me'    , value:0},
        {text:'Shared By Others', value:1}
    ]

});