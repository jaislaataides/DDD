import { Model, Table, Column, PrimaryKey, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import CustomerModel from "./customer.model";

@Table({
    tableName: "orders",
    timestamps: false,
})
export default class OrderModel extends Model {
    @PrimaryKey
    @Column({ type: DataType.STRING, allowNull: false })
    declare id: string;

    @ForeignKey(() => CustomerModel)
    @Column({ type: DataType.STRING, allowNull: false })
    declare customer_id: string;

    @BelongsTo(() => CustomerModel)
    declare customer: CustomerModel;

    @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
    declare total: number;

    @HasMany(() => {
        const { default: OrderItemModel } = require("./order-item.model");
        return OrderItemModel;
    })
    declare items: any[];
}