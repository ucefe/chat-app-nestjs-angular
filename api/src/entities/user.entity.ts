import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Message } from './message.entity';


@Entity({ name: 'user' })
export class User extends BaseEntity {

  @Column({ type: 'varchar', length: 30 })
  name: string;
  
  @OneToMany(() =>  Message, (message) => message.user, { onDelete: 'SET NULL' })
  messages: Message[];
}
