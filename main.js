Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">

    <div class="product-image">
        <img v-bind:src="image">
    </div>

    <div class="product-info">
        <h1>{{ title }}</h1>
        <p>{{ description }} here</p>
        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>
        <p>{{sale}}</p>
        <p>Shipping: {{  shipping }}</p>

        <product-details :details="details"></product-details>
        
        <div v-for="(variant, index) in variants"
             :key="variant.variantId"
             class="color-box"
             :style="{ backgroundColor: variant.variantColor }"
             @mouseover="updateProduct(index)">
        </div>
        
        <button v-on:click="addToCart"
                :disabled="!inStock"
                :class="{ outOfStock: !inStock }">Add to Cart</button>
        <button @click="removeFromCart"
                :disabled="!inStock"
                :class="{ outOfStock: !inStock }">Remove from Cart</button>
    

    </div>

    

</div>
    `,
    data() {
        return {
            brand: 'Vue Master',    
            product: 'Product',
            description: 'It\'s freaking awesome',
            selectedVariant: 0,
            details: ['80% cotton', '20% polyester', '0% anything else'],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: './assets/greensocks.jpg',
                    variantQuantity: 2,
                    onSale: true
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: './assets/bluesocks.jpg',
                    variantQuantity: 0,
                    onSale: false
                }
            ],
        }
    }
        ,
        methods: {
            addToCart() {
                this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
            },
            removeFromCart() {
                this.$emit('remove-from-cart')
                
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
            },
            shipping () {
                if (this.premium) {
                    return 'Free'
            }
                    return 2.99
        }
        }
})


Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <ul>
            <li v-for="detail in details">{{detail}}</li>
        </ul>
    `
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: [],
        onSale: true
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        removeFromCart() {
            if (this.cart.length > 0) {
                this.cart.pop();
            } else {
                alert('Cart is empty');
            }
        }
    }
})