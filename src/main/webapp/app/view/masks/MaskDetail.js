Ext.define('App.view.masks.MaskDetail',{
    extend : 'Ext.form.Panel',
    xtype  : 'maskdetail',

    requires : [
        'App.view.pool.ConnectionCombo',
        'App.view.plugin.BootstrapToggle'
    ],

    reference   : 'MaskDetail',
    bodyPadding : 10,
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
            xtype : 'hidden',
            name  : 'id',
            value : undefined
        },
        {
            xtype : 'connectioncombo',
            name  : 'connectionId',
            fieldLabel  : 'Connection'
        },
        {
            fieldLabel : 'Table',
            name : 'tableName',
            xtype: 'textfield',
            emptyText   : '{Empty} | TableName | Schema.TableName'
        },
        {
            fieldLabel  : 'Column',
            name        : 'columnName',
            xtype       : 'textfield',
            allowBlank  : false
        },
        {
            xtype : 'fieldcontainer',
            layout: 'hbox',
            name  : 'maskTypeContainer',
            fieldLabel  : 'Mask Type',
            items : [
                {
                    flex        : 1,
                    name        : 'maskType',
                    xtype       : 'combo',
                    queryMode   : 'local',
                    editable    : false,
                    valueField  : 'value',
                    displayField: 'text',
                    allowBlank  : false,
                    listeners   : {
                        beforerender : function(c){
                            var s = Ext.getStore(Constants.store.MASK_TYPE);
                            c.bindStore(s);
                        },
                        change : function(f, v){
                            var detail = f.up('[name=maskTypeContainer]').down('[name=maskTypeDetail]');
                            var visible= (v===Constants.maskType.STARS_AFTER||v===Constants.maskType.STARS_BEFORE);
                            detail.setVisible(visible);
                            if(visible){
                                detail.setValue(1);
                            }
                        }
                    }
                },
                {
                    hidden : true,
                    padding: '0 0 0 10',
                    name : 'maskTypeDetail',
                    xtype: 'numberfield',
                    minValue   : 1,
                    maxValue   : 20,
                    value      : 1,
                    fieldLabel : '# of chars'
                }
            ]
        },
        {
            fieldLabel : 'Is Active?',
            xtype : 'bootstraptoggle',
            onText : 'Yes',
            offText: 'No',
            name : 'active'

        }
    ],

    tbar : {
        hidden: false,
        name  : 'tbar',
        items : [
            {
                name    : 'back',
                text    : 'Back',
                iconCls : 'previous',
                handler : 'onBackToMaskGrid'
            },
            {
                name : 'clear',
                text : 'Clear',
                iconCls : 'broom',
                handler : 'onClear'
            },
            {
                name : 'save',
                text : 'Save',
                iconCls : 'save',
                handler : 'onSaveButton',
                formBind: true
            }
        ]
    },

    getValues : function() {
        var mask = {
            id              : undefined,
            connection      : undefined,
            tableName       : undefined,
            columnName      : undefined,
            maskType        : undefined,
            maskTypeDetail  : undefined,
            active          : true
        };

        mask.id = this.down('[name=id]').getValue();
        mask.connection= {id:this.down('[name=connectionId]').getValue()};
        mask.tableName = this.down('[name=tableName]').getValue();
        mask.columnName= this.down('[name=columnName]').getValue();
        mask.maskType  = this.down('[name=maskType]').getValue();
        mask.maskTypeDetail = this.down('[name=maskTypeDetail]').getValue();
        mask.active    = this.down('[name=active]').getValue();


        return mask;
    },

    setValues : function(mask) {

        this.down('[name=id]').setValue(mask.id);
        if(mask.connection){
            this.down('[name=connectionId]').setValue(mask.connection['id']);
        }
        this.down('[name=tableName]').setValue(mask.tableName);
        this.down('[name=columnName]').setValue(mask.columnName);
        this.down('[name=maskType]').setValue(mask.maskType);
        this.down('[name=maskTypeDetail]').setValue(mask.maskTypeDetail);
        this.down('[name=active]').setValue(mask.active);

        return this;
    },

    clear :function(){
        this.getForm()._record = undefined;
        Ext.each(this.getForm().getFields().items, function(field){
            try {
                field.setValue(undefined);
            }catch (except){
            }

        });

        return this;
    },

    setReadOnly : function(readOnly) {
        readOnly = readOnly==undefined ? true : readOnly;
        var tbar = this.down('toolbar[name=tbar]');

        tbar.down('[name=clear]').setVisible(!readOnly);
        tbar.down('[name=save]').setVisible(!readOnly);

        Ext.each(this.getForm().getFields().items, function(field){
            field.setReadOnly(readOnly);
        });

        this.down('bootstraptoggle[name=active]').setReadOnly(readOnly);

        return this;
    }


});
