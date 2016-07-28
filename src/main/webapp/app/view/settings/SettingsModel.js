Ext.define('App.view.settings.SettingsModel',{

    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.settings',

    data: {
        title : 'Settings'
    },

    stores : {
        list : {
            autoLoad : true,
            fields: [
                {name : 'val',  type : 'string'},
                {name : 'name', type : 'string'},
                {name : 'img' , type : 'string'}
            ],
            data  : [
                {val : Constants.id.settings.USERS, name : 'Users', img : "resources/img/user-blue-16.png"},
                {val : Constants.id.settings.CONNECTIONS, name : 'Connections', img : "resources/img/connected-green-16.png"},
                {val : Constants.id.settings.MASK_MAKER, name : 'Mask Maker', img : "resources/img/mask-16.png"},
                {val : Constants.id.settings.OPTIONS, name : 'Options', img : "resources/img/wrench-16.png"}
            ]
        }
    }



});