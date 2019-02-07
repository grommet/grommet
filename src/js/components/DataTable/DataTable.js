import React, { Component } from 'react';

import { Header } from './Header';
import { Footer } from './Footer';
import { Body } from './Body';
import { GroupedBody } from './GroupedBody';
import { buildState } from './buildState';
import { StyledDataTable } from './StyledDataTable';

class DataTable extends Component {
  static defaultProps = {
    columns: [],
    data: [],
  };

  state = { checked: [] };

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
    const nextGroupState = { ...groupState };
    nextGroupState[groupValue] = {
      ...nextGroupState[groupValue],
      expanded: !nextGroupState[groupValue].expanded,
    };
    this.setState({ groupState: nextGroupState });
  };

  onToggleGroups = () => {
    const { groupState } = this.state;
    const expanded =
      Object.keys(groupState).filter(k => !groupState[k].expanded).length === 0;
    const nextGroupState = {};
    Object.keys(groupState).forEach(k => {
      nextGroupState[k] = { ...groupState[k], expanded: !expanded };
    });
    this.setState({ groupState: nextGroupState });
  };

  onResize = property => width => {
    const { widths } = this.state;
    const nextWidths = { ...(widths || {}) };
    nextWidths[property] = width;
    this.setState({ widths: nextWidths });
  };

  onSelect = datums => {
    const { checked } = this.state;
    const { primaryProperty } = this.props;
    let nextChecked = checked.slice(0); // clone array

    datums.forEach(datum => {
      const value = datum[primaryProperty];
      if (checked.indexOf(value) !== -1) {
        nextChecked = nextChecked.filter(item => item !== value);
      } else {
        nextChecked.push(value);
      }
    });
    this.setState({ checked: nextChecked });
  };

  onSelectAll = event => {
    const { data, primaryProperty } = this.props;
    this.setState({
      checked: event.target.checked
        ? data.map(datum => datum[primaryProperty])
        : [],
    });
  };

  render() {
    const {
      /* eslint-disable-next-line react/prop-types */
      columns,
      data: propsData,
      groupBy,
      onMore,
      resizeable,
      size,
      selectable,
      sortable,
      onSearch, // removing unknown DOM attributes
      onRowClick,
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
      checked,
    } = this.state;

    if (size && resizeable) {
      console.warn('DataTable cannot combine "size" and "resizeble".');
    }
    if (selectable && !primaryProperty) {
      console.warn('DataTable is selectable bit no primaryProperty is defined');
    }
    if (selectable && !columns.find(column => column.property === 'checkbox')) {
      console.warn(
        'DataTable is selectable but you did not define a corresponding column.',
      );
      columns.unshift({
        property: 'checkbox',
        align: 'start',
      });
    }

    const onClick = (event, datums) => {
      if (!Array.isArray(datums)) {
        this.onSelect([datums]);
      } else {
        this.onSelect(datums);
      }
      if (onRowClick) {
        onRowClick(event, datums);
      }
    };

    return (
      <StyledDataTable {...rest}>
        <Header
          columns={columns}
          filtering={filtering}
          filters={filters}
          groups={groups}
          groupState={groupState}
          size={size}
          sort={sort}
          widths={widths}
          headerChecked={checked.length === propsData.length}
          headerIndeterminate={
            checked.length > 0 && checked.length < propsData.length
          }
          onFiltering={this.onFiltering}
          onFilter={this.onFilter}
          onResize={resizeable ? this.onResize : undefined}
          onSort={sortable ? this.onSort : undefined}
          onToggle={this.onToggleGroups}
          onSelectAll={this.onSelectAll}
          selectable={selectable}
        />
        {groups ? (
          <GroupedBody
            columns={columns}
            groupBy={groupBy}
            groups={groups}
            groupState={groupState}
            checked={checked}
            primaryProperty={primaryProperty}
            onToggle={this.onToggleGroup}
            selectable={selectable}
            onRowClick={onRowClick}
            onSelect={onClick}
          />
        ) : (
          <Body
            columns={columns}
            data={data}
            onMore={onMore}
            checked={checked}
            primaryProperty={primaryProperty}
            size={size}
            selectable={selectable}
            onRowClick={onRowClick}
            onSelect={onClick}
          />
        )}
        {showFooter && (
          <Footer
            columns={columns}
            footerValues={footerValues}
            groups={groups}
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
  DataTableDoc = require('./doc').doc(DataTable); // eslint-disable-line global-require
}
const DataTableWrapper = DataTableDoc || DataTable;

export { DataTableWrapper as DataTable };
