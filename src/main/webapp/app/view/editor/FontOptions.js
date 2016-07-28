Ext.define('App.view.editor.FontOptions',{
    extend : 'Ext.window.Window',
    xtype  : 'fontoptions',

    reference   : 'FontOptions',


    modal       : true,
    collapsible : true,
    animCollapse: true,
    maximizable : true,
    width       : 300,
    height      : 100,
    bodyPadding : 10,

    title : 'Font',

    page  : undefined,
    setPage : function(page){
        this.page = page;
        var fontSize = this.down('[name=fontSize]');
        fontSize.suspendEvents();
        fontSize.setValue(page.options.fontSize);
        fontSize.resumeEvents(true);
        return this;
    },

    items : [
        {
            fieldLabel  : 'Font Size',
            name        : 'fontSize',
            xtype       : 'numberfield',
            minValue    : 8,
            maxValue    : 25,
            value       : 16,
            step        : 1,
            editable    : false,
            flex        : 1,
            listeners   : {
                change : function(f, v){
                    this.up('fontoptions').page.setFontSize(v)
                }
            }
        }
    ]

});