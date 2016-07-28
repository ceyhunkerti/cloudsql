Ext.define('App.view.pool.ConnectionCombo',{
    extend  : 'Ext.form.ComboBox',
    xtype   : 'connectioncombo',

    name        : 'connection',
    displayField: 'name',
    valueField  : 'id',
    editable    : false,
    queryMode   : 'local',
    emptyText   : 'Select Connection ...',


    constructor : function(){
        var me = this;
        me.store = Ext.getStore('ConnectionStore');
        me.callParent(arguments);
    }

});
