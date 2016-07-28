Ext.define('App.view.shareit.ShareIt',{

    xtype  : 'shareit',
    extend : 'Ext.window.Window',

    requires : [
        'App.view.shareit.ShareItController',
        'Ext.view.MultiSelector'
    ],

    controller : 'shareit',

    width   : 350,
    height  : 300,
    modal   : true,
    header  : false,
    layout  : 'fit',
    title   : 'Share',

    path  : undefined,
    items : [
        {
            xtype    : 'multiselector',
            title    : 'Share',
            fieldName: 'username',
            addToolText : 'Add users',
            removeRowText : 'x',
            viewConfig: {
                deferEmptyText: false,
                emptyText: 'No users selected'
            },
            tools : [{
                tooltip : 'Close window',
                type : 'close',
                handler : function(){
                    this.up('window').close();
                }
            }],
            search: {
                field: 'username',
                selectRecords : function (records) {

                    var searchGrid = this.lookupReference('searchGrid');
                    var store = searchGrid.store;
                    var recs = [];
                    for(var i = 0; i< records.length; i++) {
                        var idx = store.findExact('username',records[i].get('username'));
                        if(idx >-1) {
                            recs.push(store.getAt(idx));
                        }
                    }

                    if(recs.length <= 0 ) {
                        return;
                    }

                    return searchGrid.getSelectionModel().select(recs, true, true);
                },
                store:  {
                    autoLoad : true,
                    model    : 'App.model.UserModel',
                    proxy    : {
                        type: 'ajax',
                        url : 'api/v1/users/not_me'
                    }
                }
            }



        }
    ],

    loadGuests : function(path){
        var me = this
            ,selector = this.down('multiselector')
            ,promise  = Ajax.promiseGuestsOfPath(path);

        promise.then(function(r){
            if(r && r.length>0){
                selector.store.add(r);
            }
        },function(r){
            Message.growl.error('Failed to load guests of {0}'.format(path));
            console.log(r);
        }).always(function(){
            me.init();
        });


        return this;
    },

    constructor : function() {
        var me = this;
        me.callParent(arguments);
    },

    init : function() {

        var me = this;
        var s = me.down('multiselector').store;


        /* todo ask : what happened to event names as array ? ['add','remove'] */

        s.on('add', function(store, records){
            var path = me.getPath();
            var guests = [];
            s.each(function(r){
                guests.push(r.get('username'));
            });
            me.fireEvent('addguest', path, guests);
        });

        s.on('remove', function(store, records){
            var path = me.getPath();
            var guests = [];
            s.each(function(r){
                guests.push(r.get('username'));
            });
            me.fireEvent('removeguest', path, guests);
        });
    },

    getPath : function(){
        return this.path;
    },

    setPath : function(path){
        this.path = path;
        return this;
    }


});
