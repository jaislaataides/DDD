import { Model, Table, Column, PrimaryKey, DataType } from "sequelize-typescript";

@Table({
    tableName: "customers",
    timestamps: false,
})
export default class CustomerModel extends Model {
    @PrimaryKey
    @Column({ type: DataType.STRING, allowNull: false })
    declare id: string;

    @Column({ type: DataType.STRING, allowNull: false })
    declare name: string;

    @Column({ type: DataType.STRING, allowNull: true })
    declare email: string;

    @Column({ type: DataType.STRING, allowNull: true })
    declare street: string;

    @Column({ type: DataType.INTEGER, allowNull: true })
    declare number: number;

    @Column({ type: DataType.STRING, allowNull: true })
    declare zip: string;

    @Column({ type: DataType.STRING, allowNull: true })
    declare city: string;

    @Column({ type: DataType.INTEGER, allowNull: true })
    declare rewardPoints: number;

    @Column({ type: DataType.BOOLEAN, allowNull: true })
    declare active: boolean;
}