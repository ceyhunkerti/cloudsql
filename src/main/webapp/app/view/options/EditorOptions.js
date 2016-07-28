Ext.define('App.view.options.EditorOptions',{
    extend : 'Ext.form.Panel',
    xtype  : 'editoroptions',

    requires : [
        'App.view.plugin.BootstrapToggle'
    ],

    reference   : 'EditorOptions',
    frame       : false,
    overflowY   : 'auto',

    fieldDefaults: {
        frame       : false,
        anchor      : '100%',
        labelAlign  : 'left',
        labelWidth  : 75
    },

    items : [
        {
            fieldLabel  : 'Theme',
            name        : 'theme',
            xtype       : 'combo',
            displayField: 'name',
            valueField  : 'val',
            editable    : false,
            queryMode   : 'local',
            emptyText   : 'Select a theme ...',
            value       : 'clouds',
            bind : {
                store : '{themes}'
            },
            listeners : {
                change: 'onChangeTheme'
            }
        },
        {
            fieldLabel  : 'Font Size',
            name        : 'fontSize',
            xtype       : 'numberfield',
            minValue    : 8,
            maxValue    : 25,
            value       : 16,
            step        : 1,
            editable    : false,
            listeners : {
                change: 'onChangeFontSize'
            }
        },
        {
            fieldLabel  : 'Mask Color',
            name        : 'maskColor',
            xtype       : 'combo',
            displayField: 'name',
            valueField  : 'val',
            editable    : false,
            queryMode   : 'local',
            emptyText   : 'Select a color ...',
            value       : '#FCC9B9',
            bind : {
                store : '{colors}'
            },
            listConfig: {
                getInnerTpl: function() {
                    var tpl = '<div class="x-combo-list-item" style="background-color:{val};color:#ffffff;">{name}</div>';
                    return tpl;
                }
            },
            listeners : {
                change: 'onChangeMaskColor'
            }
        },
        {
            xtype  : 'bootstraptoggle',
            name   : 'lineNumbers',
            onText : 'Yes',
            offText: 'No',
            fieldLabel: 'Show Line Numbers?',
            listeners : {
                change: 'onShowLineNumbers'
            }
        }
    ],

    constructor : function(){
        var me = this;
        me.callParent(arguments);
        App.lib.User.getOptions().suspendSync();
        me.init();
        Ext.defer(function(){
            App.lib.User.getOptions().resumeSync();
        },400);
    },

    init : function(){

        var me= this,editor = App.lib.User.getEditorOptions();

        me.down('[name=theme]').setValue(editor.getTheme());
        me.down('[name=fontSize]').setValue(editor.getFontSize());
        me.down('[name=maskColor]').setValue(editor.getMaskColor());
        me.down('[name=lineNumbers]').setValue(editor.getShowLineNumbers());
    }





});

