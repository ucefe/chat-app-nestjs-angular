import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';


@Entity({ name: 'message' })
export class Message extends BaseEntity {

  @Column({ type: 'varchar', length: 500 })
  messageContent: string;
  
  @ManyToOne(() => User, (user) => user.messages, { onDelete: 'SET NULL' })
  user: User;
}
