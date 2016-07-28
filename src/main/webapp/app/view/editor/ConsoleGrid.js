Ext.define('App.view.editor.ConsoleGrid',{
    extend : 'Ext.grid.Panel',
    xtype  : 'consolegrid',

    columnLines : true,
    columns     : [],
    store       : Ext.create('Ext.data.Store',{
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        }
    }),

    viewConfig : {
        enableTextSelection: true
    },


    locked  : false,
    frame   : false,
    plugins : 'bufferedrenderer',
    deferRowRender : true,

    load : function(d) {
        var data   = d.data,
            me = this,
            store = me.getStore(d),
            columns = me.getColumns(d.columns);

        if(data.length > 0) {
            me.reconfigure(store, columns);
        } else {
            me.store.removeAll();
            me.reconfigure(undefined,columns);
        }

    },

    getStore : function(d) {
        var fields = [],
            columns = d.columns,
            data = d.data;

        for(var i =0; i< columns.length; i++) {
            fields.push({
                name : columns[i].name,
                type : 'auto'
            });
        }

        var store =
            Ext.create('Ext.data.Store',{
                autoDestroy : true,
                fields  : fields,
                autoLoad: true,
                data    : data,
                proxy: {
                    type: 'memory',
                    reader: {
                        type: 'json'
                    }
                }
            });


        if(data && data.length > 0) {
            store.loadData(data);
        }

        return store;
    },

    lock : function() {
        this.locked = true;
        this.setLoading(true);
    },

    release : function() {
        this.locked = false;
        this.setLoading(false);
    },

    isLocked: function() {
        return this.locked;
    },

    getColumns : function(cols) {
        var columns = [];

        for(var i=0; i< cols.length; i++) {

            columns.push({
                text      : cols[i].name,
                dataIndex : cols[i].name,
                flex      : 1,
                renderer  : function(v, m, r, rowIdx, colIdx){
                    if(cols[colIdx].masked){
                        m.style = "background-color:{0};".format(User.getOptions().editor.getMaskColor());
                    }
                    return v;
                }
            });
        }
        return columns;
    },


    listeners : {

        activate : function(grid) {
            grid.setIconCls('grid-white');
        },

        deactivate : function(grid) {
            grid.setIconCls('grid');
        }
    }

});
