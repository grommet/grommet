import React, { Component } from 'react';
import { compose } from 'recompose';

import { withTheme } from '../hocs';

import Header from './Header';
import Footer from './Footer';
import Body from './Body';
import GroupedBody from './GroupedBody';
import buildState from './buildState';
import doc from './doc';
import { StyledDataTable } from './StyledDataTable';

class DataTable extends Component {
  static defaultProps = {
    columns: [],
    data: [],
  }

  state = {}

  static getDerivedStateFromProps(nextProps, prevState) {
    return buildState(nextProps, prevState);
  }

  onFiltering = (property) => {
    this.setState({ filtering: property });
  }

  onFilter = (property, value) => {
    const { columns } = this.props;
    const nextFilters = { ...this.state.filters };
    nextFilters[property] = value;
    this.setState({ filters: nextFilters });

    // Let caller know about search, if interested
    columns.some((column) => {
      if (column.property === property) {
        if (column.onSearch) {
          column.onSearch(property, value);
        }
        return true;
      }
      return false;
    });
  }

  onSort = property => () => {
    const { sort } = this.state;
    const ascending = (sort && property === sort.property) ? !sort.ascending : true;
    this.setState({ sort: { property, ascending } });
  }

  onToggleGroup = groupValue => () => {
    const groupState = { ...this.state.groupState };
    groupState[groupValue] = {
      ...groupState[groupValue],
      expanded: !(groupState[groupValue].expanded),
    };
    this.setState({ groupState });
  }

  onToggleGroups = () => {
    const expanded = Object.keys(this.state.groupState)
      .filter(k => !this.state.groupState[k].expanded).length === 0;
    const groupState = {};
    Object.keys(this.state.groupState).forEach((k) => {
      groupState[k] = { ...this.state.groupState[k], expanded: !expanded };
    });
    this.setState({ groupState });
  }

  onResize = property => (width) => {
    const widths = { ...(this.state.widths || {}) };
    widths[property] = width;
    this.setState({ widths });
  }

  render() {
    const {
      columns, groupBy, onMore, resizeable, size, sortable, theme,
     } = this.props;
    const {
      data, filtering, filters, footerValues, groups, groupState, primaryProperty,
      showFooter, sort, widths,
    } = this.state;

    if (size && resizeable) {
      console.warn('DataTable cannot combine "size" and "resizeble".');
    }

    return (
      <StyledDataTable>
        <Header
          columns={columns}
          filtering={filtering}
          filters={filters}
          groups={groups}
          groupState={groupState}
          size={size}
          sort={sort}
          theme={theme}
          widths={widths}
          onFiltering={this.onFiltering}
          onFilter={this.onFilter}
          onResize={resizeable ? this.onResize : undefined}
          onSort={sortable ? this.onSort : undefined}
          onToggle={this.onToggleGroups}
        />
        {groups ?
          <GroupedBody
            columns={columns}
            groupBy={groupBy}
            groups={groups}
            groupState={groupState}
            primaryProperty={primaryProperty}
            theme={theme}
            onToggle={this.onToggleGroup}
          />
          :
          <Body
            columns={columns}
            data={data}
            onMore={onMore}
            primaryProperty={primaryProperty}
            size={size}
            theme={theme}
          />
        }
        {showFooter && (
          <Footer
            columns={columns}
            footerValues={footerValues}
            groups={groups}
            size={size}
            theme={theme}
          />
        )}
      </StyledDataTable>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(DataTable);
}

export default compose(
  withTheme,
)(DataTable);
