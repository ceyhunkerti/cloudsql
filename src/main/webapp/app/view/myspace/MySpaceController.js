Ext.define('App.view.myspace.MySpaceController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'App.view.myspace.MySpaceContextMenu',
        'App.view.myspace.NameWindow'
    ],

    alias: 'controller.myspace',

    listen : {
        controller : {
            '*' : {
                'share' : function(path){ this.onShare(path); },
                'reloadmyspace' : function(){this.onReloadMySpace();}
            }
        }
    },


    onSearch : function(f, v){
        var store = Ext.getStore('UserFileSystemStore');

        if(!v || v.length<1){
            store.clearFilter();
            return;
        }
        var tree  = f.up('myspace');
        var promise = App.lib.Ajax.searchMySpace(v);


        promise.success(function(result){
            store.clearFilter();
            tree.expandAll();
            store.filter({
                filterFn: function(node){
                    var children = node.childNodes,
                        len = children && children.length,
                        visible=false;// = node.isLeaf() ? v.test(node.get('title')) : false,

                    if(node.isLeaf()) {
                        for(var i=0; i< result.length && !visible; i++ ) {
                            if(result[i]===node.get('data').path){
                                visible = true;
                            }
                        }
                    }
                    // We're visible if one of our child nodes is visible.
                    // No loop body here. We are looping only while the visible flag remains false.
                    // Child nodes are filtered before parents, so we can check them here.
                    // As soon as we find a visible child, this branch node must be visible.
                    for(var i = 0; i < len && !(visible = children[i].get('visible')); i++);

                    return visible;
                },
                id : 'mySpaceSearchFilter'
            });
        }).error(function(e){
            console.log(e);
        });



    },

    onReloadMySpace: function(){
        this.getView().reload();
    },

    onNavItemClick : function(v, r){
        if(!r.get('leaf')) return;

        var title = r.get('text'),path = r.get('data').path;
        this.fireEvent('loadineditor', title, path);
    },

    onNavItemContextMenu : function(view, record, item, index, e){
        var me = this;
        e.stopEvent();

        var menu = Ext.create('App.view.myspace.MySpaceContextMenu',{
            leaf:record.get('leaf')
        });
        menu.showAt(e.getXY());

        menu.on('click',function(m, i){
            switch(i.name){
                case 'delete'   : me.onFileDelete(record); break;
                case 'newFile'  : me.onNewFile(record);  break;
                case 'newFolder': me.onNewFolder(record); break;
                case 'rename'   : me.onRename(record); break;
                case 'share'    : me.onShare(record.get('data').path); break;
            }

        });

    },

    /**
     * deletes a file/folder by path
     *
     * @param path points to file or folder to be deleted
     */
    onFileDelete : function(record) {
        var path = record.get('data').path;
        var message = '{} will be DELETED. Are you sure?'.format(path);

        Ext.MessageBox.confirm('Confirm',message,
            function(b){
                if(b == 'yes') {
                    Ajax.deleteFile(path, function(){
                        Ext.getStore('UserFileSystemStore').reload();
                    });
                }
            });
    },

    /**
     * on new file click
     */
    onNewFile : function(record) {
        var me=this,
            w =
            Ext.create('App.view.myspace.NameWindow',{
                title : 'New File'
            }).show();
        var path = record.get('data').path;

        w.down('button[name=save]').on('click', function(b){
            var text = w.down('textfield[name=name]').getValue();
            var absPath = '{0}/{1}'.format(path,text);
            Ajax.createFile(absPath, function(){
                me.onReloadMySpace();
            }, function(){
                w.close();
            });

        });

    },

    onNewFolder : function(record) {
        var me=this,path = record.get('data').path;

        var w =
            Ext.create('App.view.myspace.NameWindow',{
                title : 'New Folder'
            }).show();

        w.down('button[name=save]').on('click', function(b){
            var text = w.down('textfield[name=name]').getValue();
            var absPath = '{0}/{1}'.format(path,text);
            Ajax.createFolder(absPath, function(){
                me.onReloadMySpace();
            }, function(){
                w.close();
            });

        });
    },

    onRename : function(r) {
        var me=this,path = r.get('data').path;
        var w =
            Ext.create('App.view.myspace.NameWindow',{
                title : 'Rename'
            })
                .show();

        w.down('textfield[name=name]').setValue(r.get('text'));

        w.down('button[name=save]').on('click', function(b){
            var text = w.down('textfield[name=name]').getValue();
            Ajax.rename(path,text, function(){
                me.onReloadMySpace();
            }, function(){
                w.close();
            });

        });
    },

    onShare : function(path) {
        console.log(path);
        this.fireEvent('shareit:show', path);
    }


});