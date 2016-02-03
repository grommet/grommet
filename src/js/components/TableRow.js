// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react';
import classnames from 'classnames';

const CLASS_ROOT = 'table-row';

const TableRow = props => {
  let classes = classnames(
    CLASS_ROOT,
    props.className,
    {
      [`${CLASS_ROOT}--selected`]: props.selected,
      [`${CLASS_ROOT}--selectable`]: props.onClick
    }
  );

  return (
    <tr className={classes} onClick={props.onClick}>
      {props.children}
    </tr>
  );
};

TableRow.propTypes = {
  onClick: PropTypes.func,
  selected: PropTypes.bool
};

TableRow.displayName = 'TableRow';

export default TableRow;
