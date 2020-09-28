import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MainComponent.scss';
import {
  getData,
  deleteItem,
  editItem,
  updateEntries
} from '../../store/table.actions';
import TableComponent from '../Table/TableComponent';
import _ from 'lodash';

class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      inputVal: ''
    };
  }

  componentDidMount() {
    this.props.getData();
  }

  handleSearch = e => {
    this.setState({ inputVal: e });
    this.props.updateEntries(e);
  };

  handleSort = (type, id) => {
    id = id.toLowerCase();

    let sortedUsersBy;

    sortedUsersBy = this.props.tableData.sort((a, b) =>
      type === 'down' ? (a[id] < b[id] ? 1 : -1) : a[id] > b[id] ? 1 : -1
    );

    this.setState({
      tableData: sortedUsersBy
    });
  };

  handleUpdate = (...data) => {
    this.props.editItem(data);
  };

  handleRemove = item => {
    this.props.deleteItem(item);
  };

  render() {
    return (
      <div className="table__container">
        <h1>List of Users</h1>
        <div className="search__container">
          <label>Search By: name, phone, email, city, zip</label>
          <input
            type="text"
            value={this.state.inputVal}
            onChange={e => {
              this.handleSearch(e.target.value);
            }}
          />
        </div>

        <TableComponent
          onSort={this.handleSort}
          onRemove={this.handleRemove}
          onUpdateItem={this.handleUpdate}
          dataUsers={this.props.tableData}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  let query = _.split(_.trim(state.tableData.searchTerm.toLowerCase()), ' ');

  let filterData = state.tableData.data.filter(item => {
    let row = _.join(
      [
        item.name,

        item.phone,
        item.email,
        item.address.street,
        item.address.city,
        item.address.zipcode
      ],
      ' '
    ).toLowerCase();
    let result = _.map(query, part => {
      if (part === '') return true;

      return row.indexOf(part) !== -1;
    });

    return _.reduce(
      result,
      (x, y) => {
        return x & y;
      },
      true
    );
  });

  return {
    tableData: filterData
  };
}

export default connect(
  mapStateToProps,
  { getData, deleteItem, editItem, updateEntries }
)(MainComponent);
