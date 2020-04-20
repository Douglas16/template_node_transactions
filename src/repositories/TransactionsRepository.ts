import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const SumIncome = this.transactions
      .filter(types => types.type === 'income')
      .map(values => values.value)
      .reduce(
        (ValueAccumulator, current): number => ValueAccumulator + current,
        0,
      );
    const sumOutcome = this.transactions
      .filter(types => types.type === 'outcome')
      .map(values => values.value)
      .reduce(
        (ValueAccumulator, current): number => ValueAccumulator + current,
        0,
      );

    const balance: Balance = {
      income: SumIncome,
      outcome: sumOutcome,
      total: SumIncome - sumOutcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
