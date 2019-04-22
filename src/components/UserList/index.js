import React, { Component } from 'react';
import { Container, Segment } from 'semantic-ui-react';
import './UserList.scss';
import UserFilter from './UserFilter';
import { UserTable } from './UserTable';
import _ from 'lodash';

class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            _sort: 'username',
            _order: null,
            q: '',
            totalCount: 0,
            loading: false
        };

        this.loadData = this.loadData.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.onSubmitFilter = this.onSubmitFilter.bind(this);

        /*for (var i = 1; i <= 100; i++) {
            var s = '';
            if (i % 3 === 0) {
                s = 'Fizz';
            }
            if (i % 5 === 0) {
                s = 'Buzz';
            }
            if (i % 3 === 0 && i % 5 === 0) {
                s = 'FizzBuzz';
            }
            console.log(i + ':' + s);
        }*/

        /*
        console.log((/([a-z])\1/i).test("isogram"));
        */

        /*
        console.log("I have never seen a thin person drinking Diet Coke.".replace(/[aeiou]/ig,''));
        */
    }

    hasRepeatedLetters(str) {
        var patt = /^([a-z])\1+$/;
        var result = patt.test(str);
        return result;
    }

    directionConverter(order) {
        if (order === 'asc') {
            return 'ascending';
        } else if (order === 'desc') {
            return 'descending';
        } else {
            return null;
        }
    }

    handleSort(clickedColumn) {
        const { _sort, _order } = this.state;

        let newOrder = _order === 'asc' ? 'desc' : 'asc';
        if (_sort !== clickedColumn) {
            newOrder = 'asc';
        }

        this.setState({
            _sort: clickedColumn,
            _order: newOrder
        });

        this.loadData({
            _sort: clickedColumn,
            _order: newOrder
        });
    }

    componentDidMount() {
        this.loadData({});
    }

    onSubmitFilter(filter) {
        if (filter !== this.state.q) {
            this.setState({ q: filter, loading: true }, () => {
                this.loadData({ q: filter });
            });

        }
    }

    filterUsers(users, query) {
        return users.filter(user => {
            if (user.username.indexOf(query) !== -1 ||
            user.email.indexOf(query) !== -1 ||
            user.age.toString().indexOf(query) !== -1) {
                return true;
            }

            return false;
        });
    }

    loadData(params) {
        let query = this.state.q;

        fetch('users.json').then(response => {
            if (response.ok) {
                response.json().then(data => {
                    let filterData = this.filterUsers(data.users, query);

                    if (params._order !== undefined) {
                        debugger;
                        filterData = _.orderBy(filterData, [params._sort],[params._order]);
                    }

                    this.setState({ users: filterData, totalCount: filterData.length });
                })
            } else {
                response.json().then(error => {
                    console.log(`Failed to load data: ${error.message}`);
                });
            }
            this.setState({ loading: false });
        });
    }

    render() {
        return (
            <Container style={{ padding: '2em 0em' }}>
                <Segment>
                    <UserFilter
                        filter={this.state.q}
                        totalCount={this.state.totalCount}
                        onSubmitFilter={this.onSubmitFilter}
                        loading={this.state.loading}
                    />
                    <UserTable
                        users={this.state.users}
                        totalCount={this.state.totalCount}
                        column={this.state._sort}
                        direction={this.directionConverter(this.state._order)}
                        handleSort={this.handleSort}
                    />
                </Segment>
            </Container>
        );
    }
}

export default UserList;