Ext.define('App.view.options.OptionsModel',{
    extend : 'Ext.app.ViewModel',

    alias: 'viewmodel.options',

    data: {
        title  : 'Options'
    },

    stores : {
        colors  : {
            autoLoad : true,
            fields: [
                {name : 'val',  type : 'string'},
                {name : 'name', type : 'string'}
            ],
            data : [
                {name : 'CHERRY BLOSSOM COLOR', val : '#FCC9B9'},
                {name : 'WASHED-OUT CRIMSON', val : '#FFB3A7'},
                {name : 'CHESTNUT ROSE', val : '#D24D57'},
                {name : 'PICTON BLUE', val : '#59ABE3'},
                {name : 'FLORAL LEAF-COLORED', val : '#FFB94E'},
                {name : 'CREAM CAN', val : '#F5D76E'},
                {name : 'OCEAN GREEN', val : '#4DAF7C'},
                {name : 'JUNGLE GREEN', val : '#26C281'},
                {name : 'GOSSIP', val : '#87D37C'},
                {name : 'THIN COLOR', val : '#A87CA0'},
                {name : 'PUMICE', val : '#D2D7D3'},
                {name : 'SILVER SAND', val : '#BDC3C7'}
            ]
        },
        options : {
            autoLoad : true,
            fields: [
                {name : 'val',  type : 'string'},
                {name : 'name', type : 'string'},
                {name : 'img' , type : 'string'}
            ],
            data  : [
                {val : Constants.id.options.EDITOR, name : 'Editor', img : "resources/img/edit-file-16.png"},
                {val : Constants.id.options.MAIL,   name : 'Mail',   img : "resources/img/email-16.png"}
            ],
            filters: [
                function(item) {
                    if(App.lib.User.hasRole(Constants.role.ADMIN)){
                        return true;
                    }
                    if(item.val === Constants.id.options.MAIL){
                        return false;
                    }

                    return true;
                }
            ]
        },
        themes : {
            autoLoad: true,
            fields: [
                {name: 'val', type: 'string'},
                {name: 'name', type: 'string'}
            ],

            data: [
                {name: 'Chrome', val: 'chrome'},
                {name: 'Clouds', val: 'clouds'},
                {name: 'GitHub', val: 'github'},
                {name: 'Chaos',  val: 'chaos'},
                {name: '80s Night', val: 'tomorrow_night_eighties'},
                {name: 'Solarized Dark', val: 'solarized_dark'}
            ]
        }

    }
});
