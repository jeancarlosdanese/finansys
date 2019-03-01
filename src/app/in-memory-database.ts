import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Category } from './pages/categories/shared/category.model';


export class InMemoryDatabase implements InMemoryDbService {

  createDb() {
    const categories: any = [
      { _id: '1', name: 'Moradia', description: 'Pagamento de contas da casa' },
      { _id: '2', name: 'Saúde', description: 'Plano de saúde e remédios' },
      { _id: '3', name: 'Lazer', description: 'Cinema, parques, praia, etc.' },
      { _id: '4', name: 'Salário', description: 'Recebimento de Salário' },
      { _id: '5', name: 'Freelas', description: 'Trabalhos como freelancer' }
    ];

    return { "categories": {items: categories} };
  }

}
