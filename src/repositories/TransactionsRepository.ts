import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDto {
  title: string;
  value: number;
  type: 'income' | 'outcome';
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
    const totalIncome = this.transactions.reduce(
      (accumulator: number, income) => {
        if (income.type === 'income') {
          return accumulator + income.value;
        }

        return accumulator;
      },
      0,
    );

    const totalOutcome = this.transactions.reduce(
      (accumulator: number, outcome) => {
        if (outcome.type === 'outcome') {
          return accumulator + outcome.value;
        }

        return accumulator;
      },
      0,
    );

    const balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalIncome - totalOutcome,
    };

    return balance;
  }

  public create({ title, type, value }: TransactionDto): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
