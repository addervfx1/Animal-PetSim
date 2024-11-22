// item.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ItemType } from '../enum/itemType.enum';
import { User } from 'src/game/user/entities/user.entity';

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @Column()
    tipo: ItemType;

    @Column()
    preco: number;

    @Column()
    quantidade: number;

    @ManyToOne(() => User, (user) => user.items, { nullable: true })
    @JoinColumn({ name: "ANIMAL_ID" })
    user: User

    constructor(nome: string, descricao: string, tipo: ItemType, preco: number, quantidade: number) {
        this.nome = nome;
        this.descricao = descricao;
        this.tipo = tipo;
        this.preco = preco;
        this.quantidade = quantidade;
    }
}
