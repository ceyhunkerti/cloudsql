Ext.define('App.view.sharespace.ShareByMe', {

    extend: 'Ext.tree.Panel',
    xtype: 'sharebyme',
    requires: [],

    rootVisible: false,
    useArrows: false,
    bodyStyle: {border: 0},
    hideHeaders: true,
    animate: false,


    listeners : {

        itemclick : 'onShareByMeItemClick',
        itemcontextmenu : 'onShareByMeContextMenu',
        scope : 'controller'
    },


    constructor: function () {
        var me = this;
        me.store = Ext.getStore(Constants.store.SHARE_BY_ME);
        this.callParent(arguments);
    }

});