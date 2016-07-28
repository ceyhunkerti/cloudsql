Ext.define('App.view.connections.ConnectionsController',{
    extend : 'Ext.app.ViewController',
    alias  : 'controller.connections',


    onTestConnection : function() {
        var con = this.lookupReference('ConnectionDetail').getValues();
        Ajax.testConnection(con, function(){
            Message.growl.success('Success');
        });
    },

    onSearchConnections : function(f,v) {
        var text = v.toUpperCase(),
            store= Ext.getStore(Constants.store.CONNECTION);

        try {
            store.removeFilter('searchFilter');
        } catch (except){
            console.log(except);
        }

        store.addFilter({
            id       : 'searchFilter',
            filterFn : function(rec) {
                var reg = new RegExp( ".*{0}.*".format(text) );
                if(    !text
                    || reg.test((rec.get('name')).toUpperCase())
                    || reg.test((rec.get('url')).toUpperCase())) {
                    return true;
                }
                return false;
            }});
    },

    onClear : function(){
        this.lookupReference('ConnectionDetail').clear();
    },


    onConnectionDetail: function(g, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex!=0) { return; }

        this.lookupReference('ConnectionDetail')
            .setRadOnly(true)
            .setValues(record.data);
    },

    onReloadConnections : function(){
        Ext.getStore(Constants.store.CONNECTION).readAndLoad();
    },

    onEditConnection: function(grid, rowIndex, colIndex,item ,e, r){
        this.lookupReference('ConnectionDetail')
            .setRadOnly(false)
            .setValues(r.data);
    },

    onAddConnection : function(){
        this.lookupReference('ConnectionDetail')
            .clear()
            .setRadOnly(false);
    },

    onSaveConnection : function() {
        var con = this.lookupReference('ConnectionDetail').getValues();
        var store = Ext.getStore(Constants.store.CONNECTION);

        if(store.getById(con.id)) {
            Toolbox.showWait();
            store.updateAndSync(con);
        }else {
            Toolbox.showWait();
            store.addAndSync(con);
        }
    },

    onDeleteConnection : function(grid, rowIndex, colIndex,item ,e, r){
        Ext.getStore(Constants.store.CONNECTION).removeAndSync(r.get('id'));
    }


});