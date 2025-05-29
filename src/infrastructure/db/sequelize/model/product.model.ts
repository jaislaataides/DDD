import { Model, Table, Column, PrimaryKey, DataType } from "sequelize-typescript";

@Table({
    tableName: "products",
    timestamps: false,
})
export default class ProductModel extends Model {
    @PrimaryKey
    @Column({ type: DataType.STRING, allowNull: false })
    declare id: string;

    @Column({ type: DataType.STRING, allowNull: false })
    declare name: string;

    @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
    declare price: number;
}