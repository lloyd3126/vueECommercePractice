<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="card border-0 ">
      <div class="position-absolute like-icon" @click="likeHandler">
        <i class="far fa-heart" v-if="!like"></i>
        <i class="fas fa-heart heart-color" v-else></i>
      </div>
      <a
        class="product-link"
        :href="`${publicPath}#/product/${product[0].title}`"
      >
        <div
          class="card-photo"
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
              <span class="badge badge-secondary mb-2">{{
                item.category
              }}</span>
              <span
                class="badge badge-danger mb-2 ml-1"
                v-if="item.origin_price !== item.price"
                >特價中</span
              >
              <h5>定價 {{ item.origin_price }} 元</h5>
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
              <span class="badge badge-secondary mb-2">{{
                item.category
              }}</span>
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
      </a>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  props: ['product', 'likeProducts'],
  data() {
    return {
      publicPath: process.env.BASE_URL,
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
        this.$bus.$emit(
          'message:push',
          `將${this.product[0].title}加入收藏`,
          'success'
        );
      } else {
        this.$emit('sendProductDataOut', this.product, 'unlike');
        this.$bus.$emit(
          'message:push',
          `將${this.product[0].title}移除收藏`,
          'danger'
        );
      }
    },
    getProduct(productName) {
      this.$router.push(`/product/${productName}`);
    },
    addCart(product_id, qty = 1) {
      const vm = this;
      const data = {
        data: { product_id, qty },
      };
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.isLoading = true;
      vm.$http.post(api, data).then((response) => {
        const { success } = response.data;
        if (success) {
          vm.isLoading = false;
          vm.$bus.$emit('cart:update');
          let temp = {};
          vm.product.map((e) => {
            if (e.category == '6吋') {
              temp[e.id] = ` ${qty} 個 6 吋${e.title}`;
            } else {
              temp[e.id] = ` ${qty} 個單片${e.title}`;
            }
          });
          vm.$bus.$emit(
            'message:push',
            `將${temp[product_id]}加入購物車`,
            'success'
          );
        }
      });
    },
  },
};
</script>

<style scope>
a.product-link,
a.product-link * {
  list-style: none;
  text-decoration-line: none;
}
.card {
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.card:hover {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.like-icon {
  color: #fff;
  font-size: 2rem;
  right: 10px;
  cursor: pointer;
}
.heart-color {
  color: #dc3545;
}
.card-photo {
  height: 150px;
  background-size: cover;
  background-position: center;
}
</style>
