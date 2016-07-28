Ext.define('App.view.connections.ConnectionDetail',{
    extend : 'Ext.form.Panel',
    xtype  : 'connectiondetail',

    bodyPadding : 10,
    frame       : false,
    overflowY   : 'auto',

    fieldDefaults: {
        frame       : false,
        anchor      : '100%',
        labelAlign  : 'left',
        labelWidth  : 75
    },

    reference : 'ConnectionDetail',

    items : [
        {
            xtype : 'hidden',
            name  : 'id'
        },
        {
            name        : 'name',
            xtype       : 'textfield',
            fieldLabel  : 'Connection Name',
            allowBlank  : false
        },
        {
            xtype       : 'textfield',
            name        : 'username',
            fieldLabel  : 'Username'
        },
        {
            xtype       : 'textfield',
            name        : 'password',
            fieldLabel  : 'Password',
            inputType   : 'password'
        },
        {
            xtype       : 'textfield',
            name        : 'url',
            fieldLabel  : 'Url',
            emptyText   : 'i.e. { jdbc:mysql://localhost }',
            allowBlank  : false
        }
    ],

    tbar : {
        name  : 'tbar',
        items : [
            {
                name : 'test',
                text : 'Test',
                iconCls : 'test-tube',
                handler : 'onTestConnection',
                formBind: true
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
                handler : 'onSaveConnection',
                formBind: true
            }
        ]
    },

    clear :function(){
        this.getForm()._record = undefined;
        Ext.each(this.getForm().getFields().items, function(field){
            field.setValue(undefined);
        });

        return this;
    },

    setRadOnly : function(readOnly) {

        readOnly = readOnly == undefined ? true : readOnly;

        this.down('toolbar[name=tbar] [name=clear]').setVisible(!readOnly);
        this.down('toolbar[name=tbar] [name=save]').setVisible(!readOnly);

        Ext.each(this.getForm().getFields().items, function(field){
            field.setReadOnly(readOnly);
        });


        return this;
    },

    getValues : function() {
        var con = {
            id       : undefined,
            name     : undefined,
            username : undefined,
            password : undefined,
            url      : undefined
        };

        con.id = this.down('[name=id]').getValue();
        con.name = this.down('[name=name]').getValue();
        con.username = this.down('[name=username]').getValue();
        con.password = this.down('[name=password]').getValue();
        con.url = this.down('[name=url]').getValue();

        return con;
    },

    setValues : function(con) {

        this.down('[name=id]').setValue(con.id);
        this.down('[name=name]').setValue(con.name);
        this.down('[name=username]').setValue(con.username);
        this.down('[name=password]').setValue(con.password);
        this.down('[name=url]').setValue(con.url);

        return this;
    }



});