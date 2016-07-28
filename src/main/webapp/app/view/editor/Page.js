Ext.define('App.view.editor.Page',{
    extend : 'Ext.panel.Panel',
    xtype  : 'app-page',

    requires : [
        'App.view.plugin.AceEditor',
        'App.view.editor.Console',
        'App.view.pool.ConnectionCombo'
    ],

    name   : 'page',

    privates : {
        /* path of the document if it is saved */
        path    : undefined,
        fileName: undefined,
        snapshot: ''
    },

    isDirty : function() {
        return !(this.getContent() === this.snapshot)
    },

    getPath : function(){
        return this.path;
    },
    setPath : function(path){
        this.path = path;
        return this;
    },

    setFileName : function(fileName) {
        this.fileName = fileName;
        return this;
    },
    getFileName : function(){
        return this.fileName;
    },

    save : function(path,name){

        path = !path ? this.getPath()   : path;
        name = !name ? this.getFileName() : name;

        this.path = path;
        this.fileName = name;

        this.setTitle(name);
        this.snapshot = this.getContent();
        this.down('button[name=save]').setDisabled(!this.isDirty());
        this.setIconCls('file-white');

        return this;
    },

    options : {
        fontSize : App.lib.User.getEditorOptions().getFontSize(),
        theme    : App.lib.User.getEditorOptions().getTheme()
    },


    title   : 'New Page',
    iconCls : 'file',
    layout  : 'border',



    tbar : {
        name : 'tbar',
        items: [
            {
                iconCls : 'menu',
                name    : 'menu',
                menu : [
                    {
                        text : 'Font',
                        name : 'font',
                        handler : 'onShowFontOptions'
                    },
                    {
                        name : 'theme',
                        text : 'Theme',
                        iconCls : 'theme',
                        menu : [
                            {
                                group   : 'theme',
                                checked : false,
                                val     : 'chrome',
                                text    : 'Chrome',
                                handler : function(i){
                                    this.up('app-page').setTheme(i.val);
                                }
                            },
                            {
                                group   : 'theme',
                                checked : false,
                                val     : 'clouds',
                                text    : 'Clouds',
                                handler : function(i){
                                    this.up('app-page').setTheme(i.val);
                                }
                            },
                            {
                                group   : 'theme',
                                checked : false,
                                val     : 'github',
                                text    : 'GitHub',
                                handler : function(i){
                                    this.up('app-page').setTheme(i.val);
                                }
                            },
                            {
                                group   : 'theme',
                                checked : false,
                                val     : 'chaos',
                                text    : 'Chaos',
                                handler : function(i){
                                    this.up('app-page').setTheme(i.val);
                                }
                            },
                            {
                                group   : 'theme',
                                checked : false,
                                val     : 'tomorrow_night_eighties',
                                text    : '80s Night',
                                handler : function(i){
                                    this.up('app-page').setTheme(i.val);
                                }
                            },
                            {
                                group   : 'theme',
                                checked : false,
                                val     : 'solarized_dark',
                                text    : 'Solarized Dark',
                                handler : function(i){
                                    this.up('app-page').setTheme(i.val);
                                }
                            }
                        ]
                    },
                    {
                        name : 'showConsole',
                        xtype: 'menucheckitem',
                        checked : true,
                        text : 'Show Console',
                        listeners : {
                            checkchange : function(item, checked){
                                item.up('app-page[name=page]')
                                    .down('console')
                                    .setVisible(checked);
                            }
                        }
                    },'-',
                    {
                        name    : 'closePage',
                        text    : 'Close Page',
                        handler : 'onClosePage'
                    },'-',
                    {
                        name : 'closeConnection',
                        text : 'Close Connection',
                        handler : function(){
                            var con = this.up('connection');
                            this.lookupController().onCloseConnection(con);
                        }
                    }
                ]
            },'-',
            {
                iconCls : 'broom',
                disabled: true,
                name : 'clear',
                text : 'Clear',
                handler : 'onEditorClear'
            },
            {
                iconCls : 'save',
                disabled: true,
                name : 'save',
                text : 'Save',
                handler : 'onSavePage'
            },'-',
            {
                iconCls : 'run',
                disabled: true,
                name    : 'run',
                text    : 'Run',
                handler : function(b) {
                    this.lookupController()
                        .onExecuteQuery(b.up('[name=page]').down('aceeditor'));
                }
            },
            '->',
            {
                /* trick trick */

                name  : 'connectionCombo',
                xtype : 'connectioncombo',
                width : 300,
                listeners : {
                    change: 'onChangeConnection'
                }
            }
        ]
    },


    listeners : {
        'savepage'      : 'onSavePage',
        'descquery'     : 'onDescQuery',
        'descword'      : 'onDescWord',
        'editorchange'  : 'onEditorChange',
        'executequery'  : 'onExecuteQuery',
        activate : function(page) {
            if(this.isDirty()){
                page.setIconCls('file-dirty');
                return;
            }
            page.setIconCls('file-white');
        },

        deactivate : function(page) {
            if(this.isDirty()){
                page.setIconCls('file-dirty');
                return;
            }
            page.setIconCls('file');
        },

        add : function (c, i) {
            if (i.xtype == 'bordersplitter') {
                i.height = 3;
            }
        }
    },

    items : [

        {
            xtype : 'aceeditor',
            region: 'center'
        },
        {
            xtype : 'console',
            region: 'south',
            height: 200,
            split : true
        }
    ],

    loadContentByPath : function(path) {

        var me = this;
        path ? path : this.path;
        if(!path) return;

        var ace = this.down('aceeditor');
        var promise = App.lib.Ajax.promiseFileContent(path);

        promise
            .success(function(content){
                ace.setValue(content);
                me.snapshot = content;
            })
            .error(function(){
                Message.growl.error('Failed to load content for path {0}'.format(path));
            });
    },

    resetConnectionSelection : function(){
        var con = this.up('connection').getConnection();
        if(con){
            var combo = this.down('combo[name=connectionCombo]');
            combo.setValue(con.id);
        }
    },

    setConnection : function(id) {
        if(id){
            var combo = this.down('combo[name=connectionCombo]');
            combo.suspendEvents();
            combo.setValue(id);
            combo.resumeEvents(true);
        }
    },

    getContent : function(){
        return this.down('aceeditor').getValue();
    },

    consoleLog : function(log) {
    },

    setFontSize: function(size){
        this.options.fontSize= size;
        this.down('aceeditor').setFontSize(size);
    },

    setTheme : function(theme){
        this.options.theme= theme;
        this.down('aceeditor').setTheme(theme);
    },

    isTheme : function(theme){
        return this.options.theme == theme;
    }

});
