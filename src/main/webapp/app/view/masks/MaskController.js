Ext.define('App.view.masks.MaskController',{
    extend : 'Ext.app.ViewController',
    alias  : 'controller.masks',


    onMaskDetail : function(grid, rowIndex, colIndex,item ,e, r){
        var me = this;
        var details = me.lookupReference('MaskDetail');
        me.getView().layout.setActiveItem(1);
        details.setReadOnly(false)
            .setValues(r.data)
            .setReadOnly(true);
    },

    onEditMask : function(grid, rowIndex, colIndex,item ,e, r){
        var me = this;
        me.getView().layout.setActiveItem(1);
        me.lookupReference('MaskDetail')
            .setReadOnly(false)
            .setValues(r.data);
    },

    onDeleteMask : function(grid, rowIndex, colIndex,item ,e, r){
        var id = r.get('id');
        if(id) {
            Ext.getStore(Constants.store.MASK).removeAndSync(id);
        }else{
            Message.growl.error('Unable to delete due to internal error!');
        }

    },

    onMaskSearch : function(f, text){
        var text = text.toUpperCase(),
            store= Ext.getStore(Constants.store.MASK);
        try {
            store.removeFilter('searchFilter');
        } catch (except) {
            console.log(except);
        }

        store.addFilter({
            id       : 'searchFilter',
            filterFn : function(rec) {
                var reg = new RegExp( ".*{0}.*".format(text) );
                if(    !text
                    || reg.test((rec.get('maskTypeName')).toUpperCase())
                    || reg.test((rec.get('connectionName')).toUpperCase())
                    || reg.test((rec.get('tableName')).toUpperCase())
                    || reg.test((rec.get('columnName')).toUpperCase())) {
                    return true;
                }
                return false;
            }});
    },

    saveMask : function(mask){
        var store = Ext.getStore(Constants.store.MASK);
        var me = this;
        if(mask.id){
            store.updateAndSync(mask, function(){
                me.getView().layout.setActiveItem(0);
                me.lookupReference('MaskDetail')
                    .clear()
                    .setReadOnly();
            });
        } else {
            store.addAndSync(mask,function(){
                me.onBackToMaskGrid();
            });
        }
    },

    onSaveButton : function(b) {
        var mask = b.up('maskdetail').getValues();
        this.saveMask(mask);
    },

    onClear : function(){
        this.lookupReference('MaskDetail').clear();
    },

    onReloadMasks : function(){
        Ext.getStore(Constants.store.MASK).readAndLoad();
    },

    onAddMask : function() {
        this.getView().layout.setActiveItem(1);
        this.lookupReference('MaskDetail')
            .clear()
            .setReadOnly(false);
    },

    onBackToMaskGrid : function(){
        this.getView().layout.setActiveItem(0);
        /* leave it clean */
        this.lookupReference('MaskDetail')
            .clear()
            .setReadOnly();
    }


});