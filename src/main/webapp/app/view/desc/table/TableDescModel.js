Ext.define('App.view.desc.table.TableDescModel',{
    extend : 'Ext.app.ViewModel',

    alias: 'viewmodel.tabledesc',

    data: {
        title  : 'Options'
    },

    stores : {
        columns  : {
            autoLoad: false,
            fields: [
                {name: 'name', type: 'string'},
                {name: 'dataType', type: 'string'},
                {name: 'size', type : 'int'}
            ]
        }
    }
});
