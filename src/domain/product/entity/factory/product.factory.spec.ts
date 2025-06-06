import ProductFactory from "./product.factory";

describe("Product factory unit tests", () => {
    it("should create a product type A", () => {
        const product = ProductFactory.create('a', 'Product a', 20);

        expect(product).toBeDefined();
        expect(product.id).toBeDefined();
        expect(product.name).toBe('Product a');
        expect(product.price).toBe(20);
        expect(product.constructor.name).toBe("Product");
    });

    it("should create a product type B", () => {
        const product = ProductFactory.create('b', 'Product b', 20);

        expect(product).toBeDefined();
        expect(product.id).toBeDefined();
        expect(product.name).toBe('Product b');
        expect(product.price).toBe(40);
        expect(product.constructor.name).toBe("ProductB");
    });

    it("should throw an error when type is not supported", () => {
        expect(() => ProductFactory.create('c', 'Product C', 60)).toThrow("Product type not supported");
    });
})