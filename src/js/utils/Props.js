import pick from 'lodash/object/pick';
import keys from 'lodash/object/keys';

export default {
  pick(props, comp) {
    return pick(props, keys(comp.propTypes));
  }
};
