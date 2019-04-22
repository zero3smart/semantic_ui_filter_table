import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export const UserRow = (props) => (
    <Table.Row>
        <Table.Cell>{props.user.username}</Table.Cell>
        <Table.Cell>{props.user.email}</Table.Cell>
        <Table.Cell>{props.user.age}</Table.Cell>
    </Table.Row>
);

UserRow.propTypes = {
    user: PropTypes.object.isRequired
}
