Ext.define('App.view.plugin.BootstrapToggle', {
    extend: 'Ext.form.FieldContainer',
    xtype : 'bootstraptoggle',
    name  : 'bootstrapToggle',
    layout: 'hbox',


    onText      : 'On',
    offText     : 'Off',
    toggleSize  : 'mini',
    onStyle     : 'primary',
    offStyle    : 'default',
    value       : true,
    element     : undefined,

    items :  [
        {
            xtype : 'container',
            html  : '<style>.toggle.btn.btn-xs.android{width: 100px !important;} ' +
                    '.toggle.android {border-radius: 0px;} ' +
                    '.toggle.android .toggle-handle { border-radius: 0px; }</style>' +
                    '<input id="{0}" name = "toggleWidget" data-style="android" type="checkbox">'.format(Ext.id())
        }
    ],

    setReadOnly : function(readOnly){

        readOnly = readOnly==undefined ? true : readOnly;

        var me= this;
        if(me.element) {
            if(readOnly){
                $(me.element).attr('disabled', 'disabled');
            }else{
                $(me.element).removeAttr("disabled");
            }
        } else{
            me.on('toggleready', function(){
                if(readOnly){
                    $(me.element).attr('disabled', 'disabled');
                }else{
                    $(me.element).removeAttr("disabled");
                }
            },me,{single:true});
        }
    },

    setValue : function(val){

        var me= this, v = val ? 'on' : 'off';

        if(me.element) {
            $(me.element).bootstrapToggle(v);
        } else{
            me.on('toggleready', function(){
                $(me.element).bootstrapToggle(v);
            },me,{single:true});
        }
    },

    getValue : function(){
        var me = this;
        return $(me.element).prop('checked');
    },

    constructor : function(config) {
        var me = this;
        this.callParent(arguments);

        this.down('container').on('afterrender', function(){

            var id = '#{0}'.format(me.getId());
            me.element = $('{0} {1}'.format(id, 'input[name="toggleWidget"]'));


            $(me.element).bootstrapToggle({
                on      : config.onText,
                off     : config.offText,
                size    : config.toggleSize ? config.toggleSize : 'mini',
                offstyle: config.offStyle,
                onstyle : config.onStyle
            });


            if(me.value) {
                $(me.element).bootstrapToggle('on');
            } else {
                $(me.element).bootstrapToggle('off');
            }

            $(me.element).change(function() {
                var checked = $(this).prop('checked');
                me.fireEvent('change', checked);
            });

            me.fireEvent('toggleready');
        });
    }




});
