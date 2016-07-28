Ext.define('App.view.options.Options',{
    extend : 'Ext.window.Window',
    xtype  : 'app-options',

    requires : [
        'App.view.options.OptionsController',
        'App.view.options.OptionsModel',
        'App.view.options.OptionsGrid',
        'App.view.options.OptionDetail'

    ],

    controller  : 'options',

    viewModel: {
        type : 'options'
    },

    modal       : true,
    collapsible : true,
    animCollapse: true,
    maximizable : true,
    width       : 975,
    height      : 575,
    minWidth    : 300,
    minHeight   : 200,
    layout      : 'border',


    title : 'Options',
    titleTemplate   : 'Options - {0}',
    getTitleTemplate: function(){
        return this.titleTemplate;
    },

    items : [
        {
            xtype  : 'optionsgrid',
            region      : 'west',
            width       : 300,
            split       : true,
            margins     : '0 0 0 0',
            collapsible : false,
            animCollapse: false,
            header      : false
        },
        {
            xtype       : 'optiondetail',
            region      : 'center',
            margins     : '0 0 0 0',
            collapsible : false,
            animCollapse: false
        }
    ],

    listeners : {
        add : function (c, i) {
            if (i.xtype == 'bordersplitter') {
                i.width = 3;
            }
        }
    }


});