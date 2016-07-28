Ext.define('App.view.sharespace.ShareByOthers', {

    extend: 'Ext.tree.Panel',
    xtype: 'sharebyothers',
    requires: [],

    rootVisible: false,
    useArrows: false,
    bodyStyle: {border: 0},
    hideHeaders: true,
    animate: false,


    listeners : {

        itemclick : 'onShareByOthersItemClick',
        itemcontextmenu : 'onShareByOthersContextMenu',
        scope : 'controller'
    },


    constructor: function () {
        var me = this;
        me.store = Ext.getStore(Constants.store.SHARE_BY_OTHERS);
        this.callParent(arguments);
    }

});