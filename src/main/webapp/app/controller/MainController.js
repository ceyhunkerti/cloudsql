Ext.define('App.controller.MainController',{
    extend: 'Ext.app.Controller',

    views : [
        'App.view.shareit.ShareIt',
        'App.view.users.Users',
        'App.view.connections.Connections',
        'App.view.masks.Masks',
        'App.view.options.Options',
        'App.view.filebrowser.FileBrowser',
        'App.view.editor.FontOptions',
        'App.view.desc.table.TableDesc',
        'App.view.changepassword.ChangePassword'
    ],

    refs : [
        {
            ref     : 'shareIt',
            xtype   : 'shareit',
            selector: 'shareit',
            autoCreate : true
        },
        {
            ref     : 'users',
            xtype   : 'users',
            selector: 'users',
            autoCreate : true
        },
        {
            ref     : 'connections',
            xtype   : 'connections',
            selector: 'connections',
            autoCreate : true
        },
        {
            ref     : 'masks',
            xtype   : 'masks',
            selector: 'masks',
            autoCreate : true
        },
        {
            ref     : 'options',
            xtype   : 'app-options',
            selector: 'app-options',
            autoCreate : true
        },
        {
            ref     : 'fileBrowser',
            xtype   : 'filebrowser',
            selector: 'filebrowser',
            autoCreate : true
        },
        {
            ref     : 'fontOptions',
            xtype   : 'fontoptions',
            selector: 'fontoptions',
            autoCreate : true
        },
        {
            ref     : 'tableDesc',
            xtype   : 'tabledesc',
            selector: 'tabledesc',
            autoCreate : true
        },
        {

            ref     : 'changePassword',
            xtype   : 'changepassword',
            selector: 'changepassword',
            autoCreate : true

        }
    ],


    init: function() {

        this.control({
            'menu[name=superOptions]' : {
                click : function(m, i){

                    switch(i.name) {
                        case 'signOut' : this.signOut(); break;
                        case 'changePassword' : this.changePassword(); break;
                    }
                }
            }
        });

        this.listen({
            controller: {
                '*': {
                    'shareit:show'          : this.onShowShareIt,
                    'users:show'            : this.onShowUsers,
                    'connections:show'      : this.onShowConnections,
                    'masks:show'            : this.onShowMasks,
                    'options:show'          : this.onShowOptions,
                    'editor:showfilebrowser': this.onShowFileBrowser,
                    'editor:showfontoptions': this.onShowFontOptions,
                    'editor:descobject'     : this.onDescObject,
                    'editor:descquery'      : this.onDescQuery
                }
            }
        });
    },

    signOut : function(){
        window.location.href = window.location.href.replace('home','logout');
    },

    changePassword : function(){
        var w = this.getChangePassword().show();
        w.down('button[name=save]').on('click',function(b) {
            Toolbox.showWait('Changing password ...');
            var oldPassword = w.down('[name=oldPassword]').getValue();
            var newPassword = w.down('[name=newPassword]').getValue();
            var promise =
                App.lib.Ajax.promiseChangeMyPassword(oldPassword, newPassword);

            promise.success(function () {
                w.close();
                Message.growl.success('Changed password.');
            }).error(function (e, m, x) {
                Message.growl.error('Failed to change password! ' + x);
            }).always(function () {
                Ext.MessageBox.hide();
            });
        });
    },

    onDescQuery : function(con,query){
        var me = this;
        var promise = Ajax.promiseQueryDesc(con, query);
        promise.success(function(r){
            me.showTableDesc(r);
        }).error(function(e){
            Message.growl.warning("Unable to describe query");
        });
    },

    /* this only works for tables for now */
    onDescObject : function(con, object) {
        var me = this;
        var promise = Ajax.promiseObjectDesc(con, object);

        promise.success(function(r){
            console.log(r);
            switch (r.objectType){
                case Constants.objectType.TABLE : me.showTableDesc(r.meta); break;
                default : Message.growl.warning("Undefined object " + object);
            }

        }).error(function(){
            Message.growl.warning("Undefined object " + object);
        });

    },

    showTableDesc : function(table){
        var w = this.getTableDesc().loadAndShow(table);
    },


    onShowFontOptions : function(page) {
        var w = this.getFontOptions()
            .show()
            .setPage(page);
    },

    onShowFileBrowser : function(page){
        this.getFileBrowser()
            .setPage(page)
            .show();
    },

    onShowOptions : function() {
        var w = this.getOptions().show();
    },

    onShowMasks : function(){
        var w = this.getMasks().show();
    },

    onShowConnections : function(){
        var w = this.getConnections().show();
    },

    onShowShareIt : function(path) {
        this.getShareIt()
            .setPath(path)
            .show()
            .loadGuests(path);

    },

    onShowUsers : function() {
        var w = this.getUsers().show();
    }

});
