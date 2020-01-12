import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: 'Cook'})

export class Cook {
    @PrimaryGeneratedColumn() id: number;
    @Column({length: 64}) title: string;
    @Column({type: 'text'}) description: string;
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'}) createdAt: Date;
    @Column({type: 'tinyint', default: 0}) parentId: number;
}
