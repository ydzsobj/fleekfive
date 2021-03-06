import _extends from "@babel/runtime/helpers/esm/extends";
import { createNamespace } from '../utils';
import Info from '../info';
import { ChildrenMixin } from '../mixins/relation';
import { route, routeProps } from '../utils/router';

var _createNamespace = createNamespace('sidebar-item'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

export default createComponent({
  mixins: [ChildrenMixin('vanSidebar')],
  props: _extends({}, routeProps, {
    info: [Number, String],
    title: String
  }),
  computed: {
    select: function select() {
      return this.index === +this.parent.activeKey;
    }
  },
  methods: {
    onClick: function onClick() {
      this.$emit('click', this.index);
      this.parent.$emit('input', this.index);
      this.parent.$emit('change', this.index);
      route(this.$router, this);
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("a", {
      "class": [bem({
        select: this.select
      }), 'van-hairline'],
      "on": {
        "click": this.onClick
      }
    }, [h("div", {
      "class": bem('text')
    }, [this.title, h(Info, {
      "attrs": {
        "info": this.info
      },
      "class": bem('info')
    })])]);
  }
});