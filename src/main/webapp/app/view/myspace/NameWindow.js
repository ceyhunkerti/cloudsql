Ext.define('App.view.myspace.NameWindow',{
    extend: 'Ext.window.Window',
    xtype : 'namewindow',

    modal : true,

    bodyPadding : 5,
    frame   : false,
    layout  : 'fit',

    fieldDefaults: {
        anchor      : '100%'
    },

    reference : 'nameWindow',

    items : [
        {
            name  : 'name',
            xtype : 'textfield',
            flex  : 1,
            width : 250,
            allowBlank : false,
            listeners : {
                change : function(f, n, o, eOpts) {
                    var saveButton = this.up('window').down('button[name=save]');
                    saveButton.setDisabled(!f.isDirty()); // strange isn't it
                }
            }
        }
    ],

    buttons : [
        {
            name : 'cancel',
            text : 'Cancel',
            handler : function() {
                this.up('window').close();
            }
        },
        {
            disabled : true,
            name : 'save',
            text : 'Save'
        }
    ]

});