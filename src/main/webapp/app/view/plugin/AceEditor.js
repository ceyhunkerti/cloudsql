Ext.define('App.view.plugin.AceEditor', {
    extend : 'Ext.container.Container',
    xtype  : 'aceeditor',

    editor : undefined,

    words     : [],
    snippets  : [],
    langTools : undefined,

    aceId : undefined,

    constructor : function() {
        var me = this;
        me.aceId= Ext.id();
        me.html = '<pre class="editor" id="{}"></pre>'.format(me.aceId),

        me.callParent(arguments);
        me.on('afterrender',function(){
            me.init(me.aceId);
        });

        me.enableBubble([
            'executequery',
            'editorchange',
            'descword',
            'descquery',
            'savepage'
        ]);
    },

    init : function(aceId) {
        var me = this;
        ace.require("ace/ext/language_tools");

        var editor  = ace.edit(aceId);

        editor.$blockScrolling = Infinity;

        this.editor = editor;
        var commands= editor.commands;

        commands.addCommand({
            name    : 'execute',
            bindKey : {
                win: 'Ctrl-Enter',
                mac: 'Command-Enter'
            },
            exec    : function(editor) {
                me.fireEvent('executequery', me);
            },
            readOnly: true
        });

        commands.addCommand({
            name    : 'descword',
            bindKey : {
                win: 'F4',
                mac: 'F4'
            },
            exec    : function(editor) {
                me.fireEvent('descword', me);
            },
            readOnly: true
        });

        commands.addCommand({
            name    : 'descquery',
            bindKey : {
                win: 'F6',
                mac: 'F6'
            },
            exec    : function(editor) {
                me.fireEvent('descquery', me);
            },
            readOnly: true
        });

        commands.addCommand({
            name    : 'savepage',
            bindKey : {
                win: 'Ctrl-s',
                mac: 'Ctrl-s'
            },
            exec    : function(editor) {
                me.fireEvent('savepage', me);
            },
            readOnly: true
        });


        editor.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true
        });

        editor.session.setMode("ace/mode/sql");


        editor.on("input", function() {
            var val = editor.getSession().getValue();
            me.fireEvent('editorchange', me,val);
        });

        editor.owner = me;


        this.initCompletions();

        var options =  User.getOptions();
        this.setFontSize(options.editor.getFontSize());
        this.setGutterVisible(options.editor.getShowLineNumbers());
        this.setTheme(options.editor.getTheme());
    },


    initCompletions : function(words) {
        var me = this;
        this.langTools = ace.require("ace/ext/language_tools");

        this.words = [
            { word : "task_instance",  value : "task_instance",  meta : "table" },
            { word : "task_template",  value : "task_template",  meta : "table" },
            { word : "task_execution", value : "task_execution", meta : "table"},
            { word : "plan_instance",  value : "plan_instance",  meta : "table"},
            { word : "plan_template",  value : "plan_template",  meta : "table"},
            { word : "scheduler",      value : "scheduler",      meta : "table"},
            { word : "module", value : "module", meta : "table" }
        ];

        this.snippets = [
            {
                caption : "s*",
                snippet : "select * from table_name",
                meta    : "snippet",
                type    : "snippet"
            }
        ];

        var repoCompleter = {
            getCompletions: function(editor, session, pos, prefix, callback) {
                if (prefix.length === 0) { callback(null, []); return }
                callback(null, me.words.concat(me.snippets));
            }
        };

        this.langTools.addCompleter(repoCompleter);
    },

    addCompletions : function(words) {

        var completions = [];

        for(var i =0; i< words.length; i++) {
            if(this.isWordsContainWord(words[i]['name'])){
                continue;
            }

            completions.push({
                word  : words[i]['name'].toLowerCase(),
                value : words[i]['name'].toLowerCase(),
                meta  : words[i]['type'].toLowerCase() });
        }

        var repoCompleter = {
            getCompletions: function(editor, session, pos, prefix, callback) {
                if (prefix.length === 0) {
                    callback(null, []); return
                }
                callback(null, completions);
            }
        };

        this.langTools.addCompleter(repoCompleter);
    },

    isWordsContainWord : function(word) {
        if(word) {
            word = word.toLowerCase();
            for(var i = 0; i< this.words.length; i++) {
                if(word === this.words[i].word.toLowerCase()) {
                    return true;
                }
            }
        }else {
            return true;
        }

        return false;
    },

    getEditor: function(){
        return this.editor;
    },

    getWords : function() {
        return this.words;
    },

    setFontFamily : function(family) {
    },

    setFontSize : function(size) {
        this.editor.setOptions({
            fontSize: '{0}pt'.format(size)
        });
    },

    setTabSize : function(size) {
        this.editor.getSession().setTabSize(size);
    },

    setTheme: function(theme) {
        this.editor.setTheme("ace/theme/{0}".format(theme));
    },

    setValue : function(val) {
        this.editor.getSession().setValue(val);
    },

    getValue : function(val) {
        return this.editor.getSession().getValue();
    },

    setGutterVisible : function(show) {
        this.getEditor().renderer.setShowGutter(show);
    },


    listeners : {
        resize : function() {
            if(this.editor) {
                this.editor.resize();
            }
        },
        activate: function()
        {
            if(this.editor) {
                this.editor.focus();
            }
        }
    }

});
