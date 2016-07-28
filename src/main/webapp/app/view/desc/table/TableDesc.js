Ext.define('App.view.desc.table.TableDesc', {
    extend  : 'Ext.window.Window',
    xtype   : 'tabledesc',

    requires  : [
        'App.view.desc.table.TableDescController',
        'App.view.desc.table.TableColumnsGrid',
        'App.view.desc.table.TableDescModel'
    ],

    controller  : 'tabledesc',

    viewModel: {
        type : 'tabledesc'
    },

    modal       : true,
    collapsible : true,
    animCollapse: true,
    maximizable : true,
    width       : 975,
    height      : 575,
    minWidth    : 300,
    minHeight   : 200,
    layout      : 'fit',
    title       : 'Desc : ',



    items : [
        {
            xtype : 'tabpanel',
            tabPosition: 'bottom',
            header: false,
            items : [{
                xtype : 'tablecolumnsgrid'
            }]
        }
    ],

    loadAndShow : function(table){
        try {
            var columnsStore = this.lookupViewModel().getStore('columns');
            columnsStore.loadData(table.columns);
            this.setTitle(table.name);
            this.show();
            return this;
        }catch (except){
            console.log(except);
            Message.growl.error('Unable to prepare object metadata!');
        }

    }




});