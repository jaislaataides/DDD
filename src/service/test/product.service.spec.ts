import Product from "../../entities/product";
import ProductService from "../product.service";

describe('ProductService', () => {
  it('should change the price of all products', () => {
    const product1 = new Product("1", 'Product 1', 100);
    const product2 = new Product("2", 'Product 2', 200);
    const product3 = new Product("3", 'Product 3', 300);

    const products = [product1, product2, product3];

    ProductService.increasePrice(products, 100);

    expect(product1.price).toBe(200);
    expect(product2.price).toBe(400);
  });
});