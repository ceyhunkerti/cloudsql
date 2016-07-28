Ext.define('App.view.users.UsersController', {
    extend: 'Ext.app.ViewController',
    alias : 'controller.users',

    onClear : function(){
        this.lookupReference('UserDetail').clear();
    },

    onReloadUsers : function() {
        Ext.getStore(Constants.store.USER).readAndLoad();
    },

    onSearchUsers : function(f,v) {
        var text = v.toUpperCase(),
            store= Ext.getStore(Constants.store.USER);

        try {
            store.removeFilter('searchFilter');
        } catch (except) {
            console.log(except);
        }

        store.addFilter({
            id       : 'searchFilter',
            filterFn : function(rec) {
                var reg = new RegExp( ".*{0}.*".format(text) );
                if(    !text
                    || reg.test((rec.get('name')).toUpperCase())
                    || reg.test((rec.get('username')).toUpperCase())) {
                    return true;
                }
                return false;
            }});
    },

    onAddUser : function() {
        this.lookupReference('UserDetail')
            .clear()
            .setReadOnly(false);
    },

    onSaveUser : function(user) {
        var user = this.lookupReference('UserDetail').getValues();

        if(user.username.toLowerCase()=="su"){
            Meesage.growl.error('"su" is a special user. Choose a different one.');
            return;
        }
        var store = Ext.getStore(Constants.store.USER);

        if(store.getById(user.username)) {
            store.updateAndSync(user);
        }else {
            store.addAndSync(user);
        }
    },

    onEditUser : function(grid, rowIndex, colIndex,item ,e, r) {
        this.lookupReference('UserDetail')
            .setReadOnly(false)
            .setValues(r.data);
    },

    onDeleteUser : function(grid, rowIndex, colIndex,item ,e, r){
        Ext.getStore(Constants.store.USER).removeAndSync(r.get('username'));
    },

    onUserDetail: function(g, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex!=0) { return; }

        this.lookupReference('UserDetail')
            .setReadOnly(false)
            .setValues(record.data)
            .setReadOnly(true);
    }

});