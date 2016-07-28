Ext.define('App.view.changepassword.ChangePassword',{
    extend      : 'Ext.window.Window',
    xtype       : 'changepassword',

    reference   : 'ChangePassword',


    modal       : true,
    collapsible : true,
    animCollapse: true,
    maximizable : true,
    width       : 400,
    height      : 175,
    layout      : 'fit',

    title       : 'Change Password',
    bodyPadding : 10,
    frame       : false,

    items   : [
        {
            xtype : 'form',
            name  : 'password',
            fieldDefaults: {
                frame       : false,
                anchor      : '100%',
                labelAlign  : 'left',
                labelWidth  : 150,
                allowBlank  : false
            },

            listeners : {
                validitychange : function(form, valid){
                    this.up('window').down('button[name=save]').setDisabled(!valid);
                }
            },

            items : [
                {
                    xtype : 'textfield',
                    inputType  : 'password',
                    name       : 'oldPassword',
                    fieldLabel : 'Old Password'
                },
                {
                    xtype : 'textfield',
                    inputType  : 'password',
                    name       : 'newPassword',
                    fieldLabel : 'New Password'
                },
                {
                    xtype : 'textfield',
                    inputType  : 'password',
                    name       : 'reNewPassword',
                    fieldLabel : 'Repeat New Password',
                    validator  : function(v){
                        if(!v){return false;}
                        if( this.getValue()==this.up('form[name=password]').down('textfield[name=newPassword]').getValue() ){
                            return true;
                        }

                        return false;
                    }
                }
            ]
        }
    ],

    buttons : [
        {
            name : 'cancel',
            text : 'Cancel'
        },
        {
            name : 'save',
            text : 'Save',
            disabled : true
        }
    ]

});
