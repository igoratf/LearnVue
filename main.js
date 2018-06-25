var app = new Vue({
    el: '#app',
    data:{
        brand: 'Vue Master',    
        product: 'Product',
        description: 'It\'s freaking awesome',
        selectedVariant: 0,
        details: ['80% cotton, 20% polyester, 0% anything else'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: './assets/green-socks.png',
                variantQuantity: 2,
                onSale: true
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: './assets/blue-socks.png',
                variantQuantity: 0,
                onSale: false
            }
        ],
        cart: 0,
        onSale: true
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        removeFromCart() {
            if (this.cart > 0) {
                this.cart -= 1
            }
            
        },
        updateProduct(index) {
            this.selectedVariant = index;
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity;
        },
        sale() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' are on sale!'
            } else {
                return this.brand + ' ' + this.product + 'are not on sale!'
            }
        }
    }
})