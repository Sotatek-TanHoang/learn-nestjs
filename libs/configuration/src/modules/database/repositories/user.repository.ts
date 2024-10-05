import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { User } from '../entities/user.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(datsource: DataSource) {
    super(User, datsource.manager);
  }
}
