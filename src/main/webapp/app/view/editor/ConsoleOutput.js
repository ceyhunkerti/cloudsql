Ext.define('App.view.editor.ConsoleOutput',{
    extend : 'Ext.panel.Panel',
    xtype  : 'consoleoutput',
    iconCls: 'ink',

    layout : 'fit',

    overflowY: 'scroll',
    bodyPadding : '0 0 0 5',

    items  : [
        {
            xtype : 'displayfield',
            value : '',
            name  : 'display'
        }
    ],


    listeners : {

        activate : function(page) {
            page.setIconCls('ink-white');
        },

        deactivate : function(page) {
            page.setIconCls('ink');
        }
    },

    logSql : function(sql) {
        var log = '<span style="color:#26A65B;font-weight:bold;">sql></span> {0}'
            .format(sql);
        this.appendLog(log);
    },

    appendLog : function(log){
        var display = this.down('[name=display]');
        var val = display.getValue();
        val =   log + '<br/>' + val ;
        display.setValue(val);
    },


    logResult: function(recordCount, start, end){
        var endDate = moment(end).format('YYYY-MM-DD HH:mm:ss SSS');
        var log = '<span style="color:#D24D57;font-weight:bold;">[{0}]</span> {1} record(s) retrieved in {2} ms'
            .format(endDate, recordCount, end-start);
        this.appendLog(log);
    },

    constructor : function() {

        this.callParent(arguments);
        var display = this.down('[name=display]');
        var me = this;

        display.on('afterrender', function(){
            var id = display.getId();
            $('#{0}'.format(id)).contextmenu( function(e) {
                e.preventDefault();
                var menu = Ext.create('Ext.menu.Menu',{
                    items : [
                        {
                            name    : 'clear',
                            iconCls : 'broom',
                            text    : 'Clear'
                        }
                    ]
                });
                menu.showAt([e.pageX, e.pageY]);
                menu.on('click',function(m, i){
                    switch (i.name) {
                        case 'clear' : display.setValue('');break;
                    }
                });

            });

        });

    }



});