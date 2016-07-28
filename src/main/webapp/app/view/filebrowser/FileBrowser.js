Ext.define('App.view.filebrowser.FileBrowser',{
    extend : 'Ext.window.Window',
    xtype : 'filebrowser',

    requires    : ['App.view.filebrowser.FileBrowserController'],

    controller  : 'filebrowser',

    modal       : true,
    collapsible : true,
    animCollapse: true,
    maximizable : true,
    width       : 975,
    height      : 575,
    minWidth    : 300,
    minHeight   : 200,
    layout      : 'fit',
    bodyPadding : 10,
    title       : 'File Browser',

    page    : undefined,

    setPage : function(page){
        this.page = page;
        return this;
    },
    getPage : function(){
        return this.page;
    },
    items : [
        {
            xtype : 'treepanel',
            hideHeaders : true,
            tbar  : {
                name : 'tbar',
                items: [
                    {
                        labelWidth  : 75,
                        fieldLabel  : 'File Name',
                        xtype       : 'textfield',
                        name        : 'fileName',
                        flex        : 1,
                        allowBlank  : false
                    }
                ]
            },
            columns : [
                {
                    xtype : 'treecolumn',
                    text  : 'Name',
                    dataIndex : 'text',
                    flex  : 2
                },
                {
                    text : 'Path',
                    flex : 1,
                    dataIndex : 'text',
                    renderer : function(v, m, r) {
                        try {
                            var data = r.get('data');
                            if(data){
                                return data.path;
                            }
                        } catch(e){
                            console.log(e);
                        }
                    }
                }
            ],
            reload : function() {

                var me = this;
                var state = this.getState();
                this.store.reload();
                this.store.on('load',function(s){
                    me.applyState(state);
                });
            },
            listeners : {
                itemclick : 'onItemClick'
            }
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
            disabled : true,
            handler  : 'onSave'
        }
    ],

    constructor : function() {
        var me = this;
        me.callParent(arguments);
        var tree = me.down('treepanel');
        tree.bindStore(Ext.getStore('FileBrowserStore'));
        me.on('show',function(){
            Ext.getStore('FileBrowserStore').load();
        });

        var file = tree.down('[name=fileName]');
        file.on('dirtychange', function(f, isDirty){
            me.down('button[name=save]').setDisabled(!isDirty);
        });
    }



});
