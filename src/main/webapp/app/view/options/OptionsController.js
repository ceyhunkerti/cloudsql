Ext.define('App.view.options.OptionsController',{
    extend : 'Ext.app.ViewController',
    alias  : 'controller.options',

    onOptionCategorySelection : function(g, r){
        var me = this;
        try {
            switch(r[0].get('val')){
                case Constants.id.options.EDITOR: me.lookupReference('OptionDetail').layout.setActiveItem(0); break;
                case Constants.id.options.MAIL  : me.lookupReference('OptionDetail').layout.setActiveItem(1); break;
            }
        } catch(e){
            console.log(e);
        }

    },


    onChangeTheme : function(combo, val){
        User.getEditorOptions()
            .setTheme(val);
        this.fireEvent('changetheme', val);
    },

    onChangeFontSize : function(field, val) {
        User.getEditorOptions()
            .setFontSize(val);
        this.fireEvent('changefontsize', val);
    },

    onChangeMaskColor: function(field, val) {
        User.getEditorOptions()
            .setMaskColor(val);
    },

    onShowLineNumbers: function(visible) {
        User.getEditorOptions().setShowLineNumbers(visible);
        this.fireEvent('showlinenumbers',visible);
    },

    onSaveMailOptions: function(b){
        var v = this.lookupReference('MailOptions');
        var options = v.getValues();
        var success = function(){
            Message.growl.success('Saved mail server settings.');
        };
        var error = function(){
            Message.growl.error('Failed to save!');
        };

        if(!options.id){
            App.lib.Ajax.createMailServer(options,success,error);
        }else{
            App.lib.Ajax.updateMailServer(options,success,error);
        }

    }


});
