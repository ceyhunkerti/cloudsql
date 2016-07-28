Ext.define('App.store.statics.MaskTypeStore',{
    extend : 'Ext.data.Store',

    autoLoad : true,
    fields: [
        {name:'text', type:'string'},
        {name:'value',type:'string'}
    ],

    data  : [
        {text : 'All Stars', value: Constants.maskType.ALL_STARS},
        {text : 'Stars Before', value:Constants.maskType.STARS_BEFORE},
        {text : 'Stars After', value:Constants.maskType.STARS_AFTER},
        {text : 'Cryptic', value:Constants.maskType.CRYPTIC}
    ]

});