import { Model, Table, Column, PrimaryKey, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import ProductModel from "../../../product/repository/sequelize/product.model";
import OrderModel from "./order.model";

@Table({
    tableName: "order_items",
    timestamps: false,
})
export default class OrderItemModel extends Model {
    @PrimaryKey
    @Column({ type: DataType.STRING, allowNull: false })
    declare id: string;

    @Column({ type: DataType.STRING, allowNull: false })
    declare name: string;

    @ForeignKey(() => ProductModel)
    @Column({ type: DataType.STRING, allowNull: false })
    declare product_id: string;

    @BelongsTo(() => ProductModel)
    declare product: ProductModel;

    @ForeignKey(() => OrderModel)
    @Column({ type: DataType.STRING, allowNull: false })
    declare order_id: string;

    @BelongsTo(() => OrderModel)
    declare order: OrderModel;

    @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
    declare price: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    declare quantity: number;
}