Ext.define('App.view.sharespace.ShareSpaceController',{
    extend: 'Ext.app.ViewController',

    requires : [
        'App.view.sharespace.ShareByMeContextMenu'
    ],

    alias : 'controller.sharespace',

    onReloadShareSpace : function(){
        this.loadShareStore();
    },

    onShareTypeChange : function(c, n, o){
        this.getView().layout.setActiveItem(n);
    },

    loadShareStore : function(){
        var type = this.lookupReference('ShareType').getValue();
        switch(type) {
            case 0 : Ext.getStore(Constants.store.SHARE_BY_ME).reload(); break;
            case 1 : Ext.getStore(Constants.store.SHARE_BY_OTHERS).reload(); break;
        }
    },

    onShareByMeItemClick : function(tree, record){
        if(!record.get('leaf')) return;

        var title = record.get('text'),
            path  = record.get('data').path;
        this.fireEvent('loadineditor', title, path);
    },

    onShareByOthersItemClick : function(tree, record){
        if(!record.get('leaf')) {
            return;
        }
        var title = record.get('text');
        this.fireEvent('loadineditor', title);
    },


    onShareByMeContextMenu : function(view, record, item, index, e){
        var me = this;
        e.stopEvent();
        var menu = Ext.create('App.view.sharespace.ShareByMeContextMenu');
        menu.showAt(e.getXY());
        menu.on('click',function(m, i){
            console.log(record.get('data').path);
            switch(i.name) {
                case 'share'    : me.fireEvent('share',record.get('data').path); break;
                case 'stopShare': break;
            }
        });
    },

    onShareByOthersContextMenu : function(view, record, item, index, e){
        var me = this;
        e.stopEvent();
    }



});