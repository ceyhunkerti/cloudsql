Ext.define('App.view.masks.Masks',{
    extend : 'Ext.window.Window',
    xtype  : 'masks',

    requires: [
        'App.view.masks.MaskController',
        'App.view.masks.MasksGrid',
        'App.view.masks.MaskDetail'
    ],

    controller  : 'masks',
    layout      : 'card',

    modal       : true,
    collapsible : true,
    animCollapse: true,
    maximizable : true,
    width       : 975,
    height      : 575,
    minWidth    : 300,
    minHeight   : 200,
    title       : 'Masks',

    activeItem : 0,
    items  : [
        {
            xtype  :'masksgrid'     /* 0 */
        },
        {
            xtype  :'maskdetail'    /* 1 */
        }
    ]



});