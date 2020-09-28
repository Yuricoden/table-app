import React, { Component } from 'react';
import './TableComponent.scss';

export default class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdate: false,
      currentId: null,
      cityValue: '',
      zipValue: ''
    };
  }

  sort = (type, item) => {
    this.props.onSort(type, item);
  };

  removeItem = item => {
    this.props.onRemove(item);
  };

  updateItem = item => {
    let { cityValue, zipValue } = this.state;
    this.setState({
      isUpdate: !this.state.isUpdate,
      currentId: item.id,
      cityValue: item.address.city,
      zipValue: item.address.zipcode
    });

    if (this.state.isUpdate) {
      this.props.onUpdateItem(item, cityValue, zipValue);
    }
  };

  editItem = (type, ev) => {
    this.setState({ [type]: ev.target.value });
  };

  render() {
    return (
      <table>
        <thead>
          <tr>
            {['ID', 'Name', 'Phone', 'Email', 'City', 'Zip', ''].map(
              (item, index) => {
                return (
                  <th key={index} className="col" scope="col">
                    <div>
                      {item.length === 0 ? null : (
                        <span
                          onClick={() => this.sort('up', item)}
                          className="arrow-up"
                        ></span>
                      )}

                      {item}

                      {item.length === 0 ? null : (
                        <span
                          onClick={() => this.sort('down', item)}
                          className="arrow-down"
                        ></span>
                      )}
                    </div>
                  </th>
                );
              }
            )}
          </tr>
        </thead>
        <tbody>
          {this.props.dataUsers.map(item => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <span>{item.name}</span>
                </td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>
                  {this.state.isUpdate && this.state.currentId === item.id ? (
                    <div>
                      <input
                        type="text"
                        style={{ width: '125px' }}
                        value={this.state.cityValue}
                        onChange={ev => this.editItem('cityValue', ev)}
                      />
                    </div>
                  ) : (
                    <span>{item.address.city}</span>
                  )}
                </td>
                <td>
                  {this.state.isUpdate && this.state.currentId === item.id ? (
                    <div>
                      <input
                        type="text"
                        style={{ width: '125px' }}
                        value={this.state.zipValue}
                        onChange={ev => this.editItem('zipValue', ev)}
                      />
                    </div>
                  ) : (
                    <span>{item.address.zipcode}</span>
                  )}
                </td>
                <td>
                  {this.state.isUpdate && this.state.currentId === item.id ? (
                    <i
                      style={{ cursor: 'pointer', marginRight: '10px' }}
                      onClick={() => this.updateItem(item)}
                      className="material-icons"
                    >
                      done
                    </i>
                  ) : (
                    <i
                      style={{ cursor: 'pointer', marginRight: '10px' }}
                      onClick={() => this.updateItem(item)}
                      className="material-icons"
                    >
                      edit
                    </i>
                  )}

                  <i
                    style={{ cursor: 'pointer' }}
                    onClick={() => this.removeItem(item)}
                    className="material-icons"
                  >
                    delete
                  </i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
