Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        },
        cart: {
            type: Array,
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
                :disabled="!inStock || cart.length == 0"
                :class="{ outOfStock: !inStock || cart.length == 0 }">Remove from Cart</button>

        <div>
            <h2>Reviews</h2>
            <p v-if="!reviews.length">No reviews yet.</p>
            <ul>
                <li v-for="review in reviews">{{ review }}</li>
            </ul>

        <product-review @review-submitted="addReview"></product-review>
    

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
            reviews: []
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
            },
            addReview(productReview) {
                this.reviews.push(productReview)
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
            },
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

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">

    <p v-if="!errors.length == 0">
        <b>Please correct the following error(s):</b>
        <ul>
            <li v-for="error in errors">{{ error }}</li>
        </ul>
    </p>

    <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name">
    </p>

    <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
    </p>

    <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>
    </p>

    <p>Would you recommend this product?</p>
    <label>
      Yes
      <input type="radio" value="Yes" v-model="recommendation"/>
    </label>
    <label>
      No
      <input type="radio" value="No" v-model="recommendation"/>
    </label>

    <p>
        <input type="submit" value="Submit">
    </p>

    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommendation: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            this.errors = []
            if (this.name && this.review && this.rating && this.recommendation) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommendation: this.recommendation
                }
                this.$emit('review-submitted', productReview);
                console.log(productReview)
                this.name = null;
                this.review = null;
                this.rating = null;
                this.recommendation = null;
            }
            else {
                if (!this.name) this.errors.push("Name required")
                if (!this.review) this.errors.push("Review required")
                if (!this.rating) this.errors.push("Rating required")
            }
        }
            
    }
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


