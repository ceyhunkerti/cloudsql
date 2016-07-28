Ext.define('App.view.plugin.StatefulTree',{
    extend : 'Ext.tree.Panel',

    expanded    : [],

    findExpanded : function(node) {

        var me = this;
        if(node.isExpanded()){

            if(node.get('data')!= undefined) {
                this.expanded.push(node.get('data').path);
            }
        }
        node.eachChild(function(child) {
            me.findExpanded(child);
        });
    },

    saveTreeState : function(){
        var s = this.getStore();
        this.findExpanded(s.getRootNode());
    },

    reExpand : function(node){
        var me = this;

        if(node.get('data') != undefined) {
            for(var i = 0; i< me.expanded.length; i++) {
                if(me.expanded[i] === node.get('data').path){
                    me.expandNode(node);
                }
            }
        }

        node.eachChild(function(child) {
            me.reExpand(child);
        });
    },

    restoreTreeState : function() {
        this.reExpand(this.getStore().getRootNode());
    },

    constructor : function(){
        this.callParent(arguments);
    }

});