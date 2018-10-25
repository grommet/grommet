import css from 'css';

export const createPortal = () => {
  // make sure to remove all body children
  document.body.innerHTML = '';
  document.body.appendChild(document.createElement('div'));
};

export const expectPortal = portalId => ({
  toMatchSnapshot: () => {
    const node = document.getElementById(portalId);
    if (node) {
      const styles = css.parse(
        document.getElementsByTagName('style')[0].innerHTML
      );
      styles.stylesheet.rules = styles.stylesheet.rules.filter(rule => {
        // skip everything that is not media or rule
        if (['media', 'rule'].indexOf(rule.type) < 0) {
          return false;
        }
        if (!rule.selectors) {
          return true;
        }
        const selector = rule.selectors.join('');
        return Array.from(node.classList).some(
          className => selector.indexOf(className) >= 0
        );
      });
      expect(document.getElementById(portalId)).toMatchSnapshot();
      expect(css.stringify(styles)).toMatchSnapshot();
    } else {
      fail(`${portalId} portal does not exist`);
    }
  },
});
