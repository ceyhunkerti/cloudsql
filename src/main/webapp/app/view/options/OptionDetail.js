Ext.define('App.view.options.OptionDetail',{
    extend : 'Ext.form.Panel',
    xtype  : 'optiondetail',

    requires : [
        'App.view.plugin.BootstrapToggle',
        'App.view.options.EditorOptions',
        'App.view.options.MailOptions'
    ],

    reference   : 'OptionDetail',
    bodyPadding : 10,
    frame       : false,
    overflowY   : 'auto',
    layout      : 'card',

    fieldDefaults: {
        frame       : false,
        anchor      : '100%',
        labelAlign  : 'left',
        labelWidth  : 75
    },

    items : [
        {
            xtype : 'editoroptions'
        },
        {
            xtype : 'mailoptions'
        }
    ]



});

