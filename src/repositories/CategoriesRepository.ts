import { EntityRepository, Repository } from 'typeorm';

import Category from '../models/Category';

interface Request {
  category: string;
}

@EntityRepository(Category)
class CategoriesRepository extends Repository<Category> {
  public async findOrCreate({ category }: Request): Promise<Category> {
    const findCategory = await this.findOne({
      where: { title: category },
    });

    if (findCategory) {
      return findCategory;
    }

    const createCategory = this.create({ title: category });

    await this.save(createCategory);

    return createCategory;
  }
}

export default CategoriesRepository;
