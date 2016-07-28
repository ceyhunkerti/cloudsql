Ext.define('App.store.AjaxReadyStore',{
    extend  : 'Ext.data.Store',

    requires: ['App.lib.Toolbox'],

    alias   : 'store.AjaxReadyStore',
    storeId : 'AjaxReadyStore',
    autoLoad: false,
    autoSync: false,
    storeFilters : [],

    proxy: {
        type: 'rest',
        reader  : {
            type  : 'json'
        },
        writer  : {
            type  : 'json'
        },
        /** Mapping of action name to HTTP request method. */
        actionMethods: {
            create  : 'POST',
            read    : 'GET',
            update  : 'PUT',
            destroy : 'DELETE'
        },
        /**
         * Specific urls to call on CRUD action methods "create", "read", "update" and "destroy"
         */
        api: {
            create  : '',
            read    : '',
            update  : '',
            destroy : ''
        }
    },

    constructor:function() {
        var me = this;
        me.callParent(arguments);
        me.proxy.on('exception',function(){
            me.rejectChanges();
        });
    },

    listeners:{
        load :function(){
            var name = Ext.getClassName(this);
            console.log('Loaded {0} ({1})'.format(name, this.getCount()) );
        }
    },


    /**
     * Add new template plan
     *
     * @new
     * @param data module definition
     * @param callback callback function to execute after ajax call
     */
    addAndSync : function(data, success,error, allways) {

        var me = this;

        $.ajax({
            type    : 'POST',
            url     : me.proxy.api.create,
            contentType : 'application/json',
            dataType    : 'json',
            data        : JSON.stringify(data),
            success: function(d){
                me.add(d);
                me.commitChanges();
                if(!this.suppressMessages) {
                    App.lib.Message.growl.success(me.getCreateSuccessMessage(data));
                }
                if(success) {
                    success();
                }
            },
            error : function(x, e,m) {
                var message = me.getCreateErrorMessage();

                me.rejectChanges();
                if(!this.suppressMessages) {
                    if(x.status &&x.status == 400){
                        var response = JSON.parse(x.responseText);
                        var info = {
                            infoType: MessageType.ERROR,
                            name    : '',
                            info    : response.message
                        };

                        Message.ext.errorDetailed(message , info);
                    }else{
                        Message.growl.error(me.getCreateErrorMessage(data));
                    }
                }
                if(error){
                    error();
                }
            }
        }).always(function(){
            try {
                    if(allways) {
                        allways();
                    }
                Ext.MessageBox.hide();
            }catch(except) {
                console.log(except.message);
            }
        });

        return this;
    },


    /**
     * Update plan template
     *
     * @param {Object} data plan template
     * @param callback
     */
    updateAndSync : function(data, success, error, allways) {
        var me = this;

        var idField = this.idField || 'id';


        $.ajax({

            type    : 'PUT',
            async   : true,
            url     : me.proxy.api.update +'/'+data[idField],
            contentType : 'application/json',
            dataType    : 'json',
            data        : JSON.stringify(data),

            success: function(d){

                me.removeAt(me.findExact(idField,data[idField]));
                me.loadRawData(d,true);
                me.commitChanges();
                if(!me.suppressMessages) {
                    App.lib.Message.growl.success(me.getUpdateSuccessMessage(data));
                }
                me.fireEvent('updatestore',me,d);

                if(success){
                    success();
                }
            },
            error : function(x, e, m) {
                var message = me.getUpdateErrorMessage();

                me.rejectChanges();
                if(!me.suppressMessages) {
                    if(x.status &&x.status == 400){
                        var response = JSON.parse(x.responseText);
                        var info = {
                            infoType: MessageType.ERROR,
                            name    : '',
                            info    : response.message
                        };
                        App.lib.Message.ext.errorDetailed(message , info);
                    }else{
                        App.lib.Message.growl.error(me.getUpdateErrorMessage(data));
                    }
                }
                if(error){
                    error();
                }
            }
        }).always(function(){
            try {
                if(allways!=undefined) {
                    allways();
                }
                Ext.MessageBox.hide();
            }catch(except) {
                console.log(except.message);
            }
        });

        return this;
    },


    /**
     *
     * @param id
     * @param callback
     */
    removeAndSync : function(id, callback,params,successCallback) {
        var me = this;

        $.ajax({
            type    : 'DELETE',
            url     : me.proxy.api.destroy + '/' + id + me.getParams(params),
            success : function(r){
                me.removeAt(me.findExact('id',id));
                me.commitChanges();
                if(!me.suppressMessages) {
                    App.lib.Message.growl.success(me.getDeleteSuccessMessage());
                }

                if(successCallback) { successCallback();}
            },
            error   : function(x, e,m) {
                var message = me.getDeleteErrorMessage();

                me.rejectChanges();
                if(!me.suppressMessages) {
                    if(x.status && x.status == 400){

                        var response= JSON.parse(x.responseText);
                        var info  = {
                            infoType : MessageType.ERROR,
                            name     : message,
                            info     : response.message
                        };

                        App.lib.Message.ext.errorDetailed(message, info);

                    }else{
                        App.lib.Message.growl.error('{0} {1}'.format(message , m));
                    }
                }
            }
        }).always(function(){
            try {
                Ext.MessageBox.hide();
                if(callback!=undefined) { callback();}
            }catch(except) {
                console.log(except.message);
            }
        });

        return this;
    },



    readAndLoad : function(async, callback, params, append) {

        append = append || false;

        this.fireEvent('beforeload',this);

        var me = this;
        async = (async === undefined ? true : async);



        if(!this.proxy.api.read) {
            this.fireEvent('load',this,this.getRange());
            return;
        }

        console.log('Loading {0} from {1}{2}'.format( Ext.getClassName(this), this.proxy.api.read, me.getParams(params)) );

        me.stashFilters();

        $.ajax({
            type    : 'GET',
            async   : async,
            url     : me.proxy.api.read +  me.getParams(params),
            contentType : 'application/json',
            success: function(data){
                if(append) {
                    me.merge(data);
                }else{
                    me.loadData(data);
                }
                me.fireEvent('load',me);
                me.applyStashedFilters();
            },
            error : function(x, e,m) {
                //SCH.lib.Toolbox.showError(x.responseText);
            }
        }).always(function(){
            try {
                if(callback != undefined) { callback();}
            }catch(except) {
                console.log(except.message);
            }

            me.fireEvent('afterload',me);
        });

        return this;
    },

    merge : function(data) {
        var current = this.getRawData();

        var inCurrent = function(id){
            for(var i=0; i< current.length; i++){
                if(id === current[i].id) {
                    return true;
                }
            }
            return false;
        };

        for(var i =0; i<data.length; i++){
            if(!inCurrent(data[i].id)){
                this.add(data);
            }
        }
    },


    /**
     * override default load method
     * @override
     */
    load : function() {
        var me = this;
        this.readAndLoad();
        return this;
    },

    /**
     * override default reload method
     * @override
     */
    reload : function() {
        var me = this;
        this.readAndLoad();
    },

    stashFilters : function() {

        this.storeFilters = [];

        if(this.filters.items.length > 0) {
            Ext.apply(this.storeFilters,this.filters.items);
        } else {
            this.storeFilters = [];
        }
    },

    applyStashedFilters : function() {

        this.filters.items = [];

        if(this.storeFilters.length > 0) {
            this.addFilter(this.storeFilters);
        }
    },

    getRawData : function(useSnapshot) {

        if(useSnapshot && this.snapshot != undefined) {
            var store = this.snapshot;
            return Ext.Array.pluck(store.items, 'data');
        }
        return Ext.Array.pluck(this.data.items, 'data');
    },

    findByAttr : function(key, value) {

        var collection = this.data.items, result = [];

        if(this.snapshot) {
            collection = this.snapshot.items;
        }
        var data = Ext.Array.pluck(collection, 'data');

        for(var i=0; i< data.length; i++){
            if(!data[i][key]) {
                break;
            }else if(data[i][key] === value){
                result.push(data[i]);
            }
        }
        return result;
    },




    /**
     * get url parameters
     *
     * @param p parameter object
     * @returns {String} return url parameters
     */
    getParams : function(p) {

        var me = this;

        if(p === undefined) {
            p = me.proxy.extraParams;
        } else {
            me.proxy.extraParams = p;
        }

        return App.lib.Toolbox.getParams(p);
    },

    suppressMessages     : false,
    messageDataProperty  : undefined,

    createSuccessMessage : undefined,
    createErrorMessage   : undefined,

    updateSuccessMessage : undefined,
    updateErrorMessage   : undefined,

    deleteSuccessMessage : undefined,
    deleteErrorMessage   : undefined,


    getMessage : function(m, data){
        var message = m;
        if(this.messageDataProperty != undefined && data != undefined) {

            message = m + ' ' + data[this.messageDataProperty];
        }

        return message;
    },

    setCreateSuccessMessage : function(m){this.createSuccessMessage = m;},
    setCreateErrorMessage   : function(m){this.createErrorMessage = m;},

    getCreateSuccessMessage : function(data){
        var m = undefined;
        if(this.createSuccessMessage!=undefined) {
            m = this.createSuccessMessage;
        } else {
            m = 'Created record';
        }

        return this.getMessage(m, data);

    },

    getCreateErrorMessage   : function(data){
        var m = undefined;

        if(this.createErrorMessage != undefined) {
            m = this.createErrorMessage;
        }else {
            m = 'Failed to create record';
        }

        return this.getMessage(m, data);
    },

    setUpdateSuccessMessage : function(){this.updateSuccessMessage =m;},
    setUpdateErrorMessage   : function(){this.updateErrorMessage = m;},

    getUpdateSuccessMessage : function(data){
        var m = undefined;

        if(this.updateSuccessMessage != undefined) {
            m = this.updateSuccessMessage;
        }else {
            m = 'Updated record';
        }

        return this.getMessage(m, data);
    },

    getUpdateErrorMessage   : function(data){

        var m = undefined;
        if(this.updateErrorMessage != undefined) {
            m = this.updateErrorMessage;
        }else {
            m = 'Failed to update record';
        }

        return this.getMessage(m, data);
    },

    setDeleteSuccessMessage : function(){this.deleteSuccessMessage= m;},
    setDeleteErrorMessage : function(){this.deleteErrorMessage = m;},


    getDeleteSuccessMessage : function(){
        var m = undefined;
        if(this.deleteSuccessMessage != undefined) {
            m = this.deleteSuccessMessage;
        }else{
            m = 'Deleted record';
        }

        return this.getMessage(m);
    },

    getDeleteErrorMessage : function(){
        var m = undefined;
        if(this.deleteErrorMessage != undefined) {
            m= this.deleteErrorMessage;
        }else{
            m = 'Failed to delete record';
        }

        return this.getMessage(m);
    },

    findExact : function(property, value) {

        return this.data.findIndexBy(function(rec) {
            var a = rec.get(property);
            var b = value;

            if(typeof a === 'number' && typeof b === 'string') {
                a = a.toString();
            }
            return rec.isEqual(a, b);
        }, this, 0);
    }




});
