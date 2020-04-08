import React from 'react';
import { Grid, Statistic } from 'semantic-ui-react';
import styles from './Earnings.module.scss';
import currency from '../../utils/currency';

interface Props {
  netIncome: number;
  withdrawn: number;
  availableForWithdrawal: number;
}

const EarningsSummary: React.FC<Props> = (props: Props) => {
  const { netIncome, withdrawn, availableForWithdrawal } = props;

  return (
    <Grid relaxed columns={3} className={styles.statWrapper} celled stackable>
      <Grid.Column textAlign="center">
        <Statistic>
          <Statistic.Label className={styles.label}>Net Income</Statistic.Label>
          <Statistic.Value>
            <span className={styles.statText}>{currency.format(netIncome)}</span>
          </Statistic.Value>
        </Statistic>
      </Grid.Column>
      <Grid.Column textAlign="center">
        <Statistic>
          <Statistic.Label className={styles.label}>Withdrawn</Statistic.Label>
          <Statistic.Value>
            <span className={styles.statText}>{currency.format(withdrawn)}</span>
          </Statistic.Value>
        </Statistic>
      </Grid.Column>
      <Grid.Column textAlign="center">
        <Statistic>
          <Statistic.Label className={styles.label}>Available for withdrawal</Statistic.Label>
          <Statistic.Value>
            <span className={styles.statText}>{currency.format(availableForWithdrawal)}</span>
          </Statistic.Value>
        </Statistic>
      </Grid.Column>
    </Grid>
  );
};

export default EarningsSummary;
