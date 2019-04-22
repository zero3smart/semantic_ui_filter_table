import { Table } from 'semantic-ui-react';
import React from 'react';

export const UserTableHeader = (props) => {
    return (
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell
                    width={3}
                    sorted = {props.column === 'username' ? props.direction : null }
                    onClick={() => props.handleSort('username')}>
                    UserName
                </Table.HeaderCell>
                <Table.HeaderCell
                    width={3}
                    sorted = {props.column === 'email' ? props.direction : null }
                    onClick={() => props.handleSort('email')}>
                    Email
                </Table.HeaderCell>
                <Table.HeaderCell
                    width={2}
                    sorted = {props.column === 'age' ? props.direction : null }
                    onClick={() => props.handleSort('age')}>
                    Age
                </Table.HeaderCell>
            </Table.Row>
        </Table.Header>
    )
}