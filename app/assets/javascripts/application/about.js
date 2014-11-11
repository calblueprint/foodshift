$(document).foundation({
  tooltip: {
    selector : '.has-tip',
    additional_inheritable_classes : [],
    tooltip_class : '.tooltip',
    touch_close_text: 'Tap to Close',
    disable_for_touch: false,
    tip_template : function (selector, content) {
      return '<span data-selector="' + selector + '" class="'
        + Foundation.libs.tooltip.settings.tooltip_class.substring(1)
        + '">' + content + '<span class="nub"></span></span>';
    }
  }
});
