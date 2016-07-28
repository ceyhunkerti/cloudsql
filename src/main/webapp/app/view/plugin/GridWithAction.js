
Ext.define('App.view.plugin.GridWithAction', {
    extend  : 'Ext.grid.Panel',
    xtype   : 'gridwithaction',

    requires: [
        'Ext.grid.*'
        //'Ext.ux.grid.FiltersFeature'
    ],

    frame           : false,
    deferRowRender  : true,
    columnLines     : true,

    features: [

    ],

    viewConfig: {
        loadingText :   "Loading...",
        markDirty   : false,
        /**
         * This is added for a quick workaround for the issue
         * EXTJSIV-12373 - Check if this is totally fixed in main
         * api releases.
         */
        mouseOverOutBuffer : false
    },

    constructor : function() {

        this.callParent(arguments);
        this.on('itemmouseenter', function(g, r, item){
            var icons = Ext.fly(item).query('.x-action-col-icon');
            Ext.each(icons, function(icon){
                if(icon.className.indexOf('static') > -1) return;
                Ext.get(icon).removeCls('x-hidden');
            });
        });

        this.on('itemmouseleave',function(g, r, item ) {


            var icons = Ext.fly(item).query('.x-action-col-icon');
            Ext.each(icons, function(icon){
                if(icon.className.indexOf('static') > -1) return;
                Ext.get(icon).addCls('x-hidden');
            });
        });
    }

});