Ext.define('App.view.editor.Console',{
    extend  : 'Ext.tab.Panel',
    xtype   : 'console',

    requires: [
        'App.view.editor.ConsoleGrid',
        'App.view.editor.ConsoleOutput'
    ],

    title   : 'Console',
    header      : false,
    frame       : false,
    overflowY   : 'auto',
    layout      : 'fit',



    items   : [
        {
            xtype : 'consolegrid'
        },
        {
            xtype : 'consoleoutput'
        }
    ]





});
