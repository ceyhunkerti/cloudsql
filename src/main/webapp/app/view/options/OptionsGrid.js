Ext.define('App.view.options.OptionsGrid',{
    extend : 'Ext.grid.Panel',
    xtype  : 'optionsgrid',


    selModel: {
        mode: 'SINGLE',
        ignoreRightMouseSelection: true
    },

    hideHeaders : true,
    columnLines : false,
    rowLines    : false,

    bind : {
        store : '{options}'
    },

    listeners : {
        selectionchange: 'onOptionCategorySelection'
    },


    columns : [
        {
            name        : 'name',
            flex        : 1,
            dataIndex   : 'name',
            cls         : 'x-grid-cell-inner x-grid-cell-inner-treecolumn',
            renderer    : function(value, metadata, record) {
                metadata.style = "padding:15px 0 5 23px;";

                return '{0} {1} {2} {3}'.format(
                    '<img src="{0}">'.format(record.get('img')),
                    '<span style="padding-left:10px">',
                    value,
                    '</span>'
                );
            }
        }
    ]


});