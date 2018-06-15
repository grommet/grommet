import React, { Component } from 'react';
import { compose } from 'recompose';

import { Table } from '../Table';

import { withTheme } from '../hocs';

import Header from './Header';
import Footer from './Footer';
import Body from './Body';
import GroupedBody from './GroupedBody';
import buildState from './buildState';
import doc from './doc';

class DataTable extends Component {
  static defaultProps = {
    columns: [],
    data: [],
  }

  state = {}

  static getDerivedStateFromProps(nextProps, prevState) {
    return buildState(nextProps, prevState);
  }

  onFilter = (property, value) => {
    const nextFilters = { ...this.state.filters };
    nextFilters[property] = value;
    this.setState({ filters: nextFilters });
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
      columns, bodyProps, footerProps, groupBy, headerProps, resizeable, sortable,
     } = this.props;
    const {
      data, filters, footerValues, groups, groupState, primaryProperty,
      showFooter, sort, widths,
    } = this.state;

    return (
      <Table>
        <Header
          columns={columns}
          filters={filters}
          groups={groups}
          groupState={groupState}
          headerProps={headerProps}
          sort={sort}
          widths={widths}
          onFilter={this.onFilter}
          onResize={resizeable ? this.onResize : undefined}
          onSort={sortable ? this.onSort : undefined}
          onToggle={this.onToggleGroups}
        />
        {groups ?
          <GroupedBody
            bodyProps={bodyProps}
            columns={columns}
            groupBy={groupBy}
            groups={groups}
            groupState={groupState}
            primaryProperty={primaryProperty}
            onToggle={this.onToggleGroup}
          />
          :
          <Body
            bodyProps={bodyProps}
            columns={columns}
            data={data}
            primaryProperty={primaryProperty}
          />
        }
        {showFooter ? (
          <Footer
            columns={columns}
            footerProps={footerProps}
            footerValues={footerValues}
            groups={groups}
          />
        ) : null}
      </Table>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(DataTable);
}

export default compose(
  withTheme,
)(DataTable);
