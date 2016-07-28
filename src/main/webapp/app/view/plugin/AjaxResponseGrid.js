Ext.define('App.view.plugin.AjaxResponseGrid', {
    extend  : 'Ext.grid.Panel',
    xtype   : 'ajaxresponsegrid',

    requires: [
        'Ext.grid.*'
    ],
    plugins : [{
        ptype: 'rowexpanderplus',
        rowBodyTpl : new Ext.XTemplate(
            '<p><b>Message : </b><br><span style="padding-left:5em;">{info}<span></p>',{})
    }],

    columns : [
        {
            menuDisabled: true,
            dataIndex   : 'infoType',
            width       : 36,
            renderer    : function(v,m){
                v = v.toUpperCase();
                var tag = '';
                switch(v) {
                    case MessageType.SUCCESS:   tag = 'success'; break;
                    case MessageType.ERROR:     tag = 'error-red'; break;
                    default : tag = 'error-red'; break;
                }

                m.css    =  m.css + ' '+tag+' ';
                m.tdAttr = 'data-qtip="' + v+ '"';
                return '';
            }
        },
        {
            text        : 'Name',
            dataIndex   : 'name',
            flex        : 1
        }
    ],

    loadData : function(data) {

        var raw = [];

        for(var i = 0; i<data.length; i++) {
            var d = { info : undefined };
            d.info = data[i];
            raw.push(d);
        }

        console.log(raw);
        this.store.loadRawData(raw);

    },

    constructor:function() {

        this.store = Ext.create('Ext.data.Store',{
            fields  : [
                {name    : 'infoType'},
                {
                    name:'name',
                    convert : function(v, r){
                        if(v === "" || v === undefined) {
                            var info = r.get('info');
                            if(info.length < 20) {
                                return info+'...';
                            }else {
                                return info.substr(0,20) +'...';
                            }
                        }
                        return v;
                    }
                },{name:'id'},{name:'info'}],
            autoLoad: false,
            proxy   : {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            }
        });

        this.callParent(arguments);
    },

    listeners : {
        afterrender : function(g) {
            // seems there is a bug in ext 4.3.x
            /*var e = g.plugins[0];
            for ( var i=0; i < g.store.getCount(); i++ ) {
                e.toggleRow( i, g.store.getAt(i));
            }*/
        }
    }


});
