Ext.define('App.view.users.UserDetail',{
    extend : 'Ext.form.Panel',
    xtype  : 'userdetail',

    requires : [
        'App.view.plugin.BootstrapToggle'
    ],

    reference   : 'UserDetail',
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
            name        : 'username',
            xtype       : 'textfield',
            fieldLabel  : 'User Name',
            allowBlank  : false,
            vtype       : 'alphanum'
        },
        {
            name        : 'name',
            xtype       : 'textfield',
            fieldLabel  : 'Name',
            allowBlank  : false
        },
        {
            xtype       : 'textfield',
            name        : 'email',
            fieldLabel  : 'Email',
            vtype       : 'email',
            allowBlank  : false
        },
        {
            xtype : 'combo',
            name  : 'role' ,
            editable     : false,
            fieldLabel   : 'Role',
            displayField : 'name',
            valueField   : 'name',
            value : 'GUEST',
            store : {
                xtype : 'store',
                fields: [{name:'name', type:'string'}],
                data  : [{name:'ADMIN'},{name:'OPER'},{name:'GUEST'}]
            }
        },
        {
            xtype  : 'bootstraptoggle',
            name   : 'active',
            onText : 'Yes',
            offText: 'No',
            fieldLabel : 'Is Active?'
        }
    ],

    tbar : {
        hidden: true,
        name  : 'tbar',
        items : [
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
                handler : 'onSaveUser',
                formBind: true
            }
        ]
    },

    getValues : function() {
        var user = {
            username : undefined,
            name     : undefined,
            password : undefined,
            email    : undefined,
            role     : undefined,
            active   : true
        };

        user.username = this.down('[name=username]').getValue();
        user.name = this.down('[name=name]').getValue();
        user.email = this.down('[name=email]').getValue();
        user.role = this.down('[name=role]').getValue();
        user.active = this.down('[name=active]').getValue();

        return user;
    },

    setValues : function(user) {
        this.down('[name=username]').setValue(user.username);
        this.down('[name=name]').setValue(user.name);
        this.down('[name=email]').setValue(user.email);
        this.down('[name=role]').setValue(user.role);
        this.down('[name=active]').setValue(user.active);

        return this;
    },

    clear :function(){
        this.getForm()._record = undefined;
        Ext.each(this.getForm().getFields().items, function(field){
            field.setValue('');
        });
        this.down('[name=role]').setValue('GUEST');

        return this;
    },

    setReadOnly : function(readOnly) {

        readOnly = readOnly==undefined ? true : readOnly;

        this.down('toolbar[name=tbar]').setVisible(!readOnly);

        Ext.each(this.getForm().getFields().items, function(field){
            field.setReadOnly(readOnly);
        });

        this.down('bootstraptoggle[name=active]').setReadOnly(readOnly);

        return this;
    }


});