Ext.define('App.view.filebrowser.FileBrowserController', {
    extend  : 'Ext.app.ViewController',
    alias   : 'controller.filebrowser',

    onItemClick : function(tree, r){

        var fileBrowser = tree.up('filebrowser');
        var fileName = fileBrowser.down('textfield[name=fileName]');

        if(r.get('leaf')){
            fileName.setValue(r.get('text'));
            fileName.setEditable(false);
            return;
        }

        fileName.setEditable(true);

    },


    savePageContent : function(path, name, content,success,error,always) {
        this.fireEvent('savepagecontent',path,name,content,success, error,always);
    },


    onSave : function(b) {

        var path,name,fb, me = this;
        try {
            fb   = b.up('filebrowser');
            path = fb.down('treepanel').getSelection()[0].get('data').path;
            name = fb.down('textfield[name=fileName]').getValue();
        }catch(e){
            Message.growl.error('Unable to save file!');
            return;
        }

        var page = fb.getPage();
        var content = page.getContent();

        path = '{0}/{1}'.format(path,name);

        this.savePageContent(path,name,content,function(){
            fb.close();
            page.save(path,name);
            me.fireEvent('reloadmyspace');
        });

    }


});