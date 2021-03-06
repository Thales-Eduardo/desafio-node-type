import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (!['income', 'outcome'].includes(type)) {
      throw new Error('type invalido, mude para: income ou outcome');
    }
    const { total } = this.transactionsRepository.getBalance();
    if (type === 'outcome' && total < value) {
      throw new Error('Você não tem saldo suficiente!');
    }
    const transactions = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transactions;
  }
}

export default CreateTransactionService;
