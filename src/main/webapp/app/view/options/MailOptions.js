Ext.define('App.view.options.MailOptions',{
    extend : 'Ext.form.Panel',
    xtype  : 'mailoptions',

    requires : [
        'App.view.plugin.BootstrapToggle'
    ],

    reference   : 'MailOptions',
    frame       : false,
    overflowY   : 'auto',

    fieldDefaults: {
        frame       : false,
        anchor      : '100%',
        labelAlign  : 'left',
        labelWidth  : 75
    },

    tbar : {
        name    : 'tbar',
        padding : '6 0 6 0',
        items: [
            {
                name : 'reload',
                text : 'Reload',
                iconCls : 'reload',
                disabled: true,
                handler : function(b){
                    b.up('mailoptions').init();
                }
            },
            {
                name : 'save',
                text : 'Save',
                iconCls : 'save',
                handler : 'onSaveMailOptions',
                formBind: true
            }
        ]
    },



    items : [
        {
            xtype   : 'hidden',
            name    : 'id',
            listeners : {
                change: function(f,v){
                    this.up('mailoptions')
                        .down('[name=tbar] button[name=reload]')
                        .setDisabled(false);
                }
            }
        },
        {
            padding     : '20 0 0 0',
            fieldLabel  : 'Active',
            name        : 'active',
            xtype       : 'bootstraptoggle'
        },
        {
            fieldLabel  : 'SMTP Host',
            name        : 'smtpHost',
            xtype       : 'textfield',
            allowBlank  : false
        },
        {
            fieldLabel  : 'SMTP Port',
            name        : 'smtpPort',
            xtype       : 'numberfield',
            minValue    : 1,
            maxValue    : 65535,
            value       : 25,
            allowBlank  : false

        },
        {
            fieldLabel  : 'Username',
            name        : 'smtpUsername',
            xtype       : 'textfield'
        },
        {
            fieldLabel  : 'Password',
            name        : 'smtpPassword',
            xtype       : 'textfield',
            inputType   : 'password'
        },
        {
            padding     : '30 0 0 0',
            fieldLabel  : 'Proxy',
            name        : 'proxy',
            xtype       : 'bootstraptoggle',
            hidden      : true
        },
        {
            fieldLabel  : 'Proxy Host',
            name        : 'proxyHost',
            xtype       : 'textfield',
            hidden      : true
        },
        {
            fieldLabel  : 'Proxy Port',
            name        : 'proxyPort',
            xtype       : 'numberfield',
            minvalue    : 1,
            maxValue    : 65535,
            value       : 80,
            hidden      : true
        }

    ],

    getValues : function(){
        var options = {
            active : undefined,
            id : undefined,
            smtpHost : undefined,
            smtpPort : undefined,
            smtpUsername : undefined,
            smtpPassword : undefined,
            proxy : false,
            proxyHost : undefined,
            proxyPort : undefined
        };

        options.id = this.down('[name=id]').getValue();
        options.active = this.down('[name=active]').getValue();
        options.smtpHost = this.down('[name=smtpHost]').getValue();
        options.smtpPort = this.down('[name=smtpPort]').getValue();
        options.smtpUsername = this.down('[name=smtpUsername]').getValue();
        options.smtpPassword = this.down('[name=smtpPassword]').getValue();
        options.proxy = this.down('[name=proxy]').getValue();
        options.proxyHost = this.down('[name=proxyHost]').getValue();
        options.proxyPort = this.down('[name=proxyPort]').getValue();

        return options;
    },

    setValues : function(options){

        this.down('[name=id]').setValue(options.id);
        this.down('[name=active]').setValue(options.active);
        this.down('[name=smtpHost]').setValue(options.smtpHost);
        this.down('[name=smtpPort]').setValue(options.smtpPort);
        this.down('[name=smtpUsername]').setValue(options.smtpUsername);
        this.down('[name=smtpPassword]').setValue(options.smtpPassword);
        this.down('[name=proxy]').setValue(options.proxy);
        this.down('[name=proxyHost]').setValue(options.proxyHost);
        this.down('[name=proxyPort]').setValue(options.proxyPort);

        return this;
    },

    constructor : function(){
        var me = this;
        me.callParent(arguments);
        me.init();
    },

    init : function(){

        var me= this;
        var promise = App.lib.Ajax.promiseMailServer();
        promise.success(function(recs){
            var r = recs[0];

            me.down('[name=id]').setValue(r.id);
            me.down('[name=active]').setValue(r.active);
            me.down('[name=smtpHost]').setValue(r.smtpHost);
            me.down('[name=smtpPort]').setValue(r.smtpPort);
            me.down('[name=smtpUsername]').setValue(r.smtpUsername);
            me.down('[name=smtpPassword]').setValue(r.smtpPassword);
            me.down('[name=proxy]').setValue(r.proxy);
            me.down('[name=proxyHost]').setValue(r.proxyHost);
            me.down('[name=proxyPort]').setValue(r.proxyPort);

        }).error(function(){
           Message.growl.error('Failed to get mail server details!');
        });
    }



});

