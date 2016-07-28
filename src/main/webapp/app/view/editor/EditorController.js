Ext.define('App.view.editor.EditorController',{
    extend : 'Ext.app.ViewController',
    alias  : 'controller.editor',

    requires : [
        'App.view.editor.Connection',
        'App.view.editor.Page'
    ],

    listen : {
        controller : {
            '*' : {
                'loadineditor'      : function(title, path){ this.loadInEditor(title,path); },
                'showlinenumbers'   : function(visible) { this.onShowLineNumbers(visible);},
                'changetheme'       : function(theme) { this.onChangeTheme(theme);},
                'changefontsize'    : function(sz) { this.onChangeFontSize(sz);},
                'savepagecontent'   : function(path, name, content, successCallback, errorCallback, alwaysCallback){
                    this.onSavePageContent(path, name, content, successCallback, errorCallback, alwaysCallback);
                }
            }
        }
    },

    onShowFontOptions : function(item){
        var page = item.up('app-page');
        this.fireEvent('editor:showfontoptions', page);
    },

    onClosePage: function(item) {
        var page = item.up('app-page[name=page]');
        var con  = page.up('connection');
        con.suspendEvents();

        var idx = con.items.indexOf(page);

        if(idx > 0){
            con.setActiveTab(idx-1);
        }else if(con.items.length==3){
            con.setActiveTab(idx+1);
        } else {
            this.onCloseConnection(con);
        }

        con.remove(page);
        con.resumeEvents(true);

    },

    onCloseConnection : function(con) {

        var editor  = con.up('app-editor');
        var dummyIdx= editor.items.indexOf(editor.down('[name=dummy]'));

        var idx = editor.items.indexOf(con);

        editor.suspendEvents();

        if(editor.items.length==3){
            editor.setActiveTab(dummyIdx);
        }else if(idx == 1){
            editor.setActiveTab(2);
        } else {
            editor.setActiveTab(idx-1);
        }

        editor.remove(con);

        editor.resumeEvents(true);
    },

    onSavePage : function(b){
        var page = b.up('app-page[name=page]');

        if(!page.getPath()){
            this.showFileBrowser(page);
        } else {
            this.onSavePageContent(page.getPath(), page.getFileName(), page.getContent(), function(){
                page.save();
            });
        }

    },

    showFileBrowser: function(page){
        this.fireEvent('editor:showfilebrowser',page);
    },

    onSavePageContent : function(path, name, content, success, error, always){
        App.lib.Ajax.saveFile(path,name,content,success,error, always);
    },

    onEditorClear  : function(b){
        b.up('app-page[name=page]')
            .down('aceeditor')
            .setValue('');
    },

    onDescQuery: function(aceeditor){
        var page = aceeditor.up('app-page[name=page]');
        var conId = page.down('combo[name=connectionCombo]').getValue();

        if(!conId){
            Message.growl.warning("Not connected!");
            return;
        }

        var query = App.lib.AceScriptParser.getQueryByEditor(aceeditor.getEditor());

        if(!query){
            return;
        }

        if(query){
            this.fireEvent('editor:descquery', conId, query);
        }
    },

    onDescWord : function(aceeditor){
        var page = aceeditor.up('app-page[name=page]');
        var conId = page.down('combo[name=connectionCombo]').getValue();
        var word = App.lib.AceScriptParser.getWordByEditor(aceeditor.getEditor());

        if(!conId){
            Message.growl.warning("Not connected!");
            return;
        }

        if(word){
            this.fireEvent('editor:descobject', conId, word);
        }

    },

    onExecuteQuery : function(aceeditor) {

        var conId;
        var query;
        var page = aceeditor.up('app-page[name=page]');

        var runButton = page.down('[name=tbar] button[name=run]');
        runButton.setDisabled(true);


        try {
            query = App.lib.AceScriptParser.getQueryByEditor(aceeditor.getEditor());
            conId = page.down('combo[name=connectionCombo]').getValue();

            if(!query){
                Message.growl.warning("Nothing to execute!");
                return;
            }

            if(!conId){
                Message.growl.error("Not connected!");
                return;
            }
            var con = Ext.getStore(Constants.store.CONNECTION).getById(conId);
            if(!con) {
                Message.growl.error("Unable to connect");
                return;
            }
        } catch(e) {
            console.log(e);
            Message.growl.error('Unable to execute query!');
        }


        var grid = page.down('consolegrid');
        var output =  page.down('consoleoutput');
        if(grid.isLocked()){
            Message.growl.warning('You can execute one query at a time!');
        }

        output.logSql(query);
        grid.lock();
        var promise = Ajax.promiseExecuteQuery(conId, query);

        promise.success(function(result){
            grid.load(result);
            output.logResult(result.recordCount, result.startTime,result.endTime);
        }).error(function(err,ajaxOptions, thrownError){
            try {
                Message.growl.error(thrownError);
            }catch(e) {
                console.log(e);
                Message.growl.error("Unable to execute query!");
            }
        }).always(function(){
            grid.release();
            runButton.setDisabled(false);
        });

    },

    onEditorChange : function(e, val) {

        var dirty= (val == undefined || val == '') ? false : true;
        var page = e.up('app-page[name=page]');
        var toolbar = page.down('toolbar[name=tbar]');
        var dirtyPage = page.isDirty();

        if(dirtyPage){
            page.setIconCls('file-dirty');
        } else{
            page.setIconCls('file-white');
        }


        toolbar.down('button[name=clear]').setDisabled(!dirty);
        toolbar.down('button[name=run]').setDisabled(!dirty);
        toolbar.down('button[name=save]').setDisabled(!dirtyPage);
    },

    onChangeConnection : function(combo, n, o) {

        var me = this;

        try {
            var con = Ext.getStore(Constants.store.CONNECTION).getById(n).data;
        }catch (e){
            console.log(e);
            Message.growl.error("Failed to connect!");
            return;
        }

        Ajax.testConnection(con, function(){
            combo.up('connection').connect(con);
        }, function(){
            combo.up('connection').disconnect();
        });

    },

    onShowLineNumbers : function(visible){
        var editors =
            Ext.ComponentQuery.query('app-editor connection app-page aceeditor');

        if(!editors) {
            Message.growl.error("Unable to change theme!");
            return;
        }

        for(var i=0; i< editors.length; i++) {
            editors[i].setGutterVisible(visible);
        }
    },

    onChangeTheme: function(theme) {
        var pages =
            Ext.ComponentQuery.query('app-editor connection app-page');

        if(!pages) {
            Message.growl.error("Unable to change theme!");
            return;
        }

        for(var i=0; i< pages.length; i++) {
            pages[i].setTheme(theme);
        }
    },

    onChangeFontSize : function(sz){
        var pages =
            Ext.ComponentQuery.query('app-editor connection app-page');

        if(!pages) {
            Message.growl.error("Unable to change font size!");
            return;
        }

        for(var i=0; i< pages.length; i++) {
            pages[i].setFontSize(sz);
        }
    },


    loadInEditor : function(fileName, path) {

        var v = this.getView(), con;
        var page= v.findPageWithPath(path);

        if(page) {

            con = page.up('connection');
            if(con) {
                v.setActiveTab(con);
                con.setActiveTab(page);
                return;
            }
        }

        con = v.getActiveTab();

        /* if there is no connection tab then create one */
        if( con.name === 'dummy') {
            var c = Ext.create('App.view.editor.Connection');
            v.insert(0,c);
            v.setActiveTab(c);
            con = c;
            page = con.getActiveTab();
            page.setTitle(fileName);
            page.setPath(path);
            page.setFileName(fileName)
        } else {
            page =
                Ext.create('App.view.editor.Page',{
                    title: fileName,
                    path : path,
                    fileName : fileName
                });

            con.insert(0, page);
            con.setActiveTab(page);
        }

        if(con.getConnection()){
            page.setConnection(con.getConnection().id);
        }

        page.loadContentByPath(path);
    },


    onAddConnection : function(plus){

        var v = this.getView();
        var c  = Ext.create( 'App.view.editor.Connection');
        v.insert(v.items.indexOf(plus),c);
        v.setActiveTab(c);
    },

    onAddPage : function(plus) {
        var con = this.getView().getActiveTab();
        var page  = Ext.create('App.view.editor.Page');
        con.insert(con.items.indexOf(plus),page);
        con.setActiveTab(page);
        page.resetConnectionSelection();

    }



});
