/*eslint-disable*/
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Video' })
export class Video {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    description:string;

    @Column()
    file_path:string;

    @Column()
    delete_yn:string;
}