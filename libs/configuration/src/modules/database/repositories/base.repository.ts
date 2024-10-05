import { assert } from 'console';
import { Repository, SelectQueryBuilder } from 'typeorm';

export abstract class BaseRepository<T> extends Repository<T> {
  getPagination(qb: SelectQueryBuilder<T>, { limit = 10, page = 1 }) {
    assert(typeof limit === 'number' && limit > 0, 'invalid limit');
    assert(typeof page === 'number' && page > 0, 'invalid page');
    qb.take(limit).offset(limit * page);
    return qb;
  }
}
