import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination } from 'semantic-ui-react';
import { UserRow } from './UserRow';
import { UserTableHeader } from './UserTableHeader';

export const UserTable = (props) => {
    if (!props.users) {
        return <React.Fragment />;
    }

    const userRows = props.users.map(
        (user, index) => <UserRow key={index} user={user} />
    );

    return (
        <React.Fragment>
            Total count: {props.totalCount}.
            <Table celled selectable sortable>
                <UserTableHeader
                    column={props.column}
                    direction={props.direction}
                    handleSort={props.handleSort}
                />
                <Table.Body>
                    {userRows}
                </Table.Body>

                <Table.Footer>
                </Table.Footer>
            </Table>
        </React.Fragment>
    )
}

UserTable.propTypes = {
    totalCount: PropTypes.number.isRequired
};