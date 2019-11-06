import React, { Component } from 'react';

import { Header } from './Header';
import { Footer } from './Footer';
import { Body } from './Body';
import { GroupedBody } from './GroupedBody';
import { buildState } from './buildState';
import { StyledDataTable } from './StyledDataTable';

const contexts = ['header', 'body', 'footer'];

const normalizeProp = (prop, context) => {
  if (prop) {
    if (prop[context]) return prop[context];
    if (contexts.some(c => prop[c])) return undefined;
    return prop;
  }
  return undefined;
};

class DataTable extends Component {
  static defaultProps = {
    columns: [],
    data: [],
    step: 50,
  };

  state = {};

  static getDerivedStateFromProps(nextProps, prevState) {
    return buildState(nextProps, prevState);
  }

  onFiltering = property => {
    this.setState({ filtering: property });
  };

  onFilter = (property, value) => {
    /* eslint-disable-next-line react/prop-types */
    const { onSearch } = this.props;
    const { filters } = this.state;
    const nextFilters = { ...filters };
    nextFilters[property] = value;
    this.setState({ filters: nextFilters });

    // Let caller know about search, if interested
    if (onSearch) {
      onSearch(nextFilters);
    }
  };

  onSort = property => () => {
    const { sort } = this.state;
    const ascending =
      sort && property === sort.property ? !sort.ascending : true;
    this.setState({ sort: { property, ascending } });
  };

  onToggleGroup = groupValue => () => {
    const { groupState } = this.state;
    const { groupBy } = this.props;
    const nextGroupState = { ...groupState };
    nextGroupState[groupValue] = {
      ...nextGroupState[groupValue],
      expanded: !nextGroupState[groupValue].expanded,
    };
    this.setState({ groupState: nextGroupState });
    if (groupBy.onExpand) {
      const expandedKeys = Object.keys(nextGroupState).filter(
        k => nextGroupState[k].expanded,
      );
      groupBy.onExpand(expandedKeys);
    }
  };

  onToggleGroups = () => {
    const { groupState } = this.state;
    const { groupBy } = this.props;
    const expanded =
      Object.keys(groupState).filter(k => !groupState[k].expanded).length === 0;
    const nextGroupState = {};
    Object.keys(groupState).forEach(k => {
      nextGroupState[k] = { ...groupState[k], expanded: !expanded };
    });
    this.setState({ groupState: nextGroupState });
    if (groupBy.onExpand) {
      const expandedKeys = Object.keys(nextGroupState).filter(
        k => nextGroupState[k].expanded,
      );
      groupBy.onExpand(expandedKeys);
    }
  };

  onResize = property => width => {
    const { widths } = this.state;
    const nextWidths = { ...(widths || {}) };
    nextWidths[property] = width;
    this.setState({ widths: nextWidths });
  };

  render() {
    const {
      background,
      border,
      /* eslint-disable-next-line react/prop-types */
      columns,
      data: propsData,
      groupBy,
      onMore,
      replace,
      pad,
      resizeable,
      rowProps,
      size,
      sortable,
      step,
      onClickRow, // removing unknown DOM attributes
      onSearch, // removing unknown DOM attributes
      ...rest
    } = this.props;
    const {
      data,
      filtering,
      filters,
      footerValues,
      groups,
      groupState,
      primaryProperty,
      showFooter,
      sort,
      widths,
    } = this.state;

    if (size && resizeable) {
      console.warn('DataTable cannot combine "size" and "resizeble".');
    }

    return (
      <StyledDataTable {...rest}>
        <Header
          background={normalizeProp(background, 'header')}
          border={normalizeProp(border, 'header')}
          columns={columns}
          filtering={filtering}
          filters={filters}
          groups={groups}
          groupState={groupState}
          pad={normalizeProp(pad, 'header')}
          size={size}
          sort={sort}
          widths={widths}
          onFiltering={this.onFiltering}
          onFilter={this.onFilter}
          onResize={resizeable ? this.onResize : undefined}
          onSort={sortable ? this.onSort : undefined}
          onToggle={this.onToggleGroups}
        />
        {groups ? (
          <GroupedBody
            background={normalizeProp(background, 'body')}
            border={normalizeProp(border, 'body')}
            columns={columns}
            groupBy={groupBy.property ? groupBy.property : groupBy}
            groups={groups}
            groupState={groupState}
            pad={normalizeProp(pad, 'body')}
            primaryProperty={primaryProperty}
            onToggle={this.onToggleGroup}
          />
        ) : (
          <Body
            background={normalizeProp(background, 'body')}
            border={normalizeProp(border, 'body')}
            columns={columns}
            data={data}
            onMore={onMore}
            replace={replace}
            onClickRow={onClickRow}
            pad={normalizeProp(pad, 'body')}
            primaryProperty={primaryProperty}
            rowProps={rowProps}
            size={size}
            step={step}
          />
        )}
        {showFooter && (
          <Footer
            background={normalizeProp(background, 'footer')}
            border={normalizeProp(border, 'footer')}
            columns={columns}
            footerValues={footerValues}
            groups={groups}
            pad={normalizeProp(pad, 'footer')}
            primaryProperty={primaryProperty}
            size={size}
          />
        )}
      </StyledDataTable>
    );
  }
}

let DataTableDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  DataTableDoc = require('./doc').doc(DataTable);
}
const DataTableWrapper = DataTableDoc || DataTable;

export { DataTableWrapper as DataTable };
