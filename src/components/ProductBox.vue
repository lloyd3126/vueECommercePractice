<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="card border-0 shadow-sm">
      <div class="position-absolute like-icon" @click="likeHandler">
        <i class="far fa-heart" v-if="!like"></i>
        <i class="fas fa-heart" v-else style="color: #dc3545"></i>
      </div>
      <div
        style="height: 150px; background-size: cover; background-position: center"
        :style="{ backgroundImage: `url(${product[0].imageUrl})` }"
      ></div>
      <div class="card-body">
        <span
          class="badge badge-secondary float-right ml-2"
          v-for="item in product"
          :key="item.id"
          >{{ item.category }}</span
        >
        <h5 class="card-title">
          <a href="#" class="text-dark">{{ product[0].title }}</a>
        </h5>
        <p class="card-text">{{ product[0].content }}</p>
        <div class="d-flex justify-content-between align-items-baseline">
          <div v-for="item in product" :key="item.id">
            <span class="badge badge-secondary mb-2">{{ item.category }}</span>
            <span
              class="badge badge-danger mb-2 ml-1"
              v-if="item.origin_price !== item.price"
              >特價中</span
            >
            <div class="h5">定價 {{ item.origin_price }} 元</div>
          </div>
        </div>
      </div>
      <div class="card-footer d-flex">
        <button
          type="button"
          class="btn btn-outline-secondary btn-sm"
          @click="getProduct(product[0].title)"
        >
          <i class="fas fa-spinner fa-spin" v-if="status.dataLoading"></i>
          查看更多
        </button>
        <button
          class="btn btn-outline-danger dropdown-toggle btn-sm ml-auto"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i class="fas fa-spinner fa-spin" v-if="status.orderSending"></i>
          加到購物車
        </button>
        <div class="dropdown-menu">
          <a
            class="dropdown-item "
            href="#"
            v-for="item in product"
            :key="item.id"
            @click.prevent="addCart(item.id)"
          >
            <span class="badge badge-secondary mb-2">{{ item.category }}</span>
            <span
              class="badge badge-danger mb-2 ml-1"
              v-if="item.origin_price !== item.price"
            >
              現省 {{ item.origin_price - item.price }} 元</span
            >
            <h6 v-if="item.origin_price !== item.price">
              特價 {{ item.price }} 元
            </h6>

            <h6 v-if="item.origin_price == item.price">
              原價 {{ item.origin_price }} 元
            </h6>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  props: ['product', 'likeProducts'],
  data() {
    return {
      status: {
        dataLoading: false,
        orderSending: false,
      },
      isLoading: false,
      like: false,
    };
  },
  created() {
    this.like = Object.keys(this.likeProducts).includes(this.product[0].title);
  },
  methods: {
    likeHandler() {
      this.like = !this.like;
      if (this.like) {
        this.$emit('sendProductDataOut', this.product, 'like');
      } else {
        this.$emit('sendProductDataOut', this.product, 'unlike');
      }
    },
    getProduct(productName) {
      this.$router.push(`/product/${productName}`);
    },
    addCart(product_id, qty = 1) {
      const data = {
        data: { product_id, qty },
      };
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.isLoading = true;
      vm.$http.post(api, data).then((response) => {
        const { success } = response.data;
        if (success) {
          vm.isLoading = false;
          vm.$bus.$emit('cart:update');
        }
      });
    },
  },
};
</script>

<style scope>
.like-icon {
  color: #fff;
  font-size: 2rem;
  right: 10px;
  cursor: pointer;
}
</style>
