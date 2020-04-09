import React from 'react';
import { Grid, Table, Button } from 'semantic-ui-react';
import styles from './Earnings.module.scss';
import currency from '../../utils/currency';

interface Props {
  loadMoreEarnings: any;
  earnings: any;
  hasNextPage: boolean;
}

const EarningsTable: React.FC<Props> = (props: Props) => {
  const { hasNextPage, loadMoreEarnings, earnings } = props;

  let earningsData;

  if (Array.isArray(earnings) && earnings.length) {
    earningsData = earnings.map((post: any, i: any) => (
      <Table.Row key={post.id}>
        <Table.Cell>{post.date}</Table.Cell>
        <Table.Cell>{post.transactionType}</Table.Cell>
        <Table.Cell style={{ opacity: '0.5' }}>- {currency.format(post.serviceFee)}</Table.Cell>
        <Table.Cell textAlign="right" style={{ fontWeight: 'bold' }}>
          {currency.format(post.amount)}
        </Table.Cell>

        <Table.Cell textAlign="right" style={{ fontWeight: 'bold' }}>
          {currency.format(post.balance)}
        </Table.Cell>
      </Table.Row>
    ));
  } else {
    earningsData = (
      <Table.Row>
        <Table.Cell>No data to display</Table.Cell>
      </Table.Row>
    );
  }
  return (
    <>
      <Grid>
        <Grid.Column>
          <Table stackable compact size="small" striped className={styles.table}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Transaction Type</Table.HeaderCell>

                <Table.HeaderCell>Service Fee</Table.HeaderCell>
                <Table.HeaderCell textAlign="right">Amount</Table.HeaderCell>
                <Table.HeaderCell textAlign="right">Balance</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>{earningsData}</Table.Body>
          </Table>
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column>{hasNextPage && <Button onClick={loadMoreEarnings}>Load More</Button>}</Grid.Column>
      </Grid>
    </>
  );
};

export default EarningsTable;
