<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <!-- 訂單列表 -->
    <table class="table mt-5">
      <thead>
        <tr>
          <th width="110">購買日期</th>
          <th width="300">電子信箱</th>
          <th width="auto">購買品項</th>
          <th width="100">應付金額</th>
          <th width="100">付款狀態</th>
          <th width="160">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ changeTimestamp(order.create_at) }}</td>
          <td>{{ order.user.email }}</td>
          <td>
            <!-- --- {{ products[item.product_id] }} -->
            <p class="m-0" v-for="item in order.products" :key="item.id">
              {{ item.product.title }}：{{ item.qty }} {{ item.product.unit }}
            </p>
          </td>
          <td class="text-right">{{ order.total | currency }}</td>
          <td v-if="order.is_paid == 'true'" style="color: green">已付款</td>
          <td v-else>尚未付款</td>
          <td>
            <button
              class="btn btn-outline-primary btn-sm mr-1"
              @click="openModal(order)"
            >
              編輯
            </button>
            <button
              class="btn btn-outline-primary btn-sm mr-1"
              @click="confirmOrder(order)"
            >
              確認付款
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分頁按鈕 -->
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li :class="{ 'page-item': true, disabled: !pagination.has_pre }">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="clickPagination(pagination.current_page - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <!-- active -->
        <li
          :class="{
            'page-item': true,
            active: page == pagination.current_page,
          }"
          v-for="page in pagination.total_pages"
          :key="page"
        >
          <a
            class="page-link"
            href="#"
            @click.prevent="clickPagination(page)"
            >{{ page }}</a
          >
        </li>
        <li :class="{ 'page-item': true, disabled: !pagination.has_next }">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="clickPagination(pagination.current_page + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
    <!-- updateOrderModal -->
    <div
      class="modal fade"
      id="orderModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>編輯訂單</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- orderInfo -->
            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="create_at">訂單建立日</label>
                <input
                  type="text"
                  class="form-control"
                  id="create_at"
                  :value="changeTimestamp(tempOrder.create_at)"
                  disabled
                />
              </div>
              <div class="form-group col-md-4">
                <label for="paid_date">付款完成日</label>
                <input
                  type="text"
                  class="form-control"
                  id="paid_date"
                  :value="changeTimestamp(tempOrder.paid_date)"
                  disabled
                  v-if="tempOrder.paid_date"
                />
                <input
                  type="text"
                  class="form-control"
                  id="no_create_at"
                  value="尚未付款"
                  disabled
                  v-else
                />
              </div>
              <div class="form-group col-md-4">
                <label for="exampleFormControlSelect1">修改付款狀態</label>
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  v-model="tempOrder.is_paid"
                >
                  <option value="true">已付款</option>
                  <option value="false">尚未付款</option>
                </select>
              </div>
            </div>
            <hr />
            <h6>購買品項</h6>
            <div class="form-row">
              <div
                class="form-group col-md-3 mb-1"
                v-for="item in tempOrder.products"
                :key="item.id"
              >
                <label :for="item.id"
                  >{{ item.product.title }}({{ item.product.unit }})</label
                >
                <input
                  min="0"
                  max="99"
                  type="number"
                  class="form-control"
                  :id="item.id"
                  v-model="item.qty"
                />
              </div>
            </div>
            <hr />
            <ValidationObserver
              v-slot="{ invalid }"
              class="row justify-content-center"
              ref="observer"
            >
              <form class="col-md-12" @submit.prevent="updateOrder(tempOrder)">
                <div class="form-group">
                  <label for="useremail">Email</label>
                  <ValidationProvider
                    rules="required|email"
                    v-slot="{ errors }"
                  >
                    <input
                      type="text"
                      :class="{ 'form-control': true, 'is-invalid': errors[0] }"
                      name="email"
                      id="useremail"
                      v-model="tempOrder.user.email"
                      placeholder="請輸入 Email"
                      required
                    />
                    <span class="text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                  <span class="text-danger"></span>
                </div>
                <div class="form-group">
                  <label for="username">收件人姓名</label>
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <input
                      type="text"
                      :class="{ 'form-control': true, 'is-invalid': errors[0] }"
                      name="name"
                      id="username"
                      v-model="tempOrder.user.name"
                      placeholder="輸入姓名"
                      required
                    />
                    <span class="text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="form-group">
                  <label for="usertel">收件人電話</label>
                  <ValidationProvider
                    rules="required|numeric"
                    v-slot="{ errors }"
                  >
                    <input
                      type="tel"
                      :class="{ 'form-control': true, 'is-invalid': errors[0] }"
                      name="tel"
                      id="usertel"
                      v-model="tempOrder.user.tel"
                      placeholder="請輸入電話"
                      required
                    />
                    <span class="text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="form-group">
                  <label for="useraddress">收件人地址</label>
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <input
                      type="text"
                      :class="{ 'form-control': true, 'is-invalid': errors[0] }"
                      name="address"
                      id="useraddress"
                      v-model="tempOrder.user.address"
                      placeholder="請輸入地址"
                      required
                    />
                    <span class="text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="form-group">
                  <label for="comment">留言</label>
                  <textarea
                    name=""
                    id="comment"
                    class="form-control"
                    cols="30"
                    rows="10"
                    v-model="tempOrder.message"
                  ></textarea>
                </div>
                <div class="text-right">
                  <button
                    type="button "
                    class="btn btn-outline-secondary mr-2"
                    data-dismiss="modal"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    :disabled="invalid"
                    class="btn btn-danger"
                  >
                    送出訂單
                  </button>
                </div>
              </form>
            </ValidationObserver>
            <!-- <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                    v-model="tempOrder.title"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      placeholder="請輸入分類"
                      v-model="tempOrder.category"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入單位"
                      v-model="tempOrder.unit"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      placeholder="請輸入原價"
                      v-model="tempOrder.origin_price"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      placeholder="請輸入售價"
                      v-model="tempOrder.price"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    placeholder="請輸入產品描述"
                    v-model="tempOrder.description"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder="請輸入產品說明內容"
                    v-model="tempOrder.content"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempOrder.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      tempOrder: {
        create_at: null,
        id: '',
        is_paid: false,
        message: '',
        paid_date: null,
        payment_method: '',
        products: {},
        total: 0,
        user: {
          address: '',
          email: '',
          name: '',
          tel: '',
        },
        num: 0,
      },
      orders: [],
      products: {},
      isLoading: false,
      currentPage: 1,
      pagination: {},
    };
  },
  computed: {},
  methods: {
    changeTimestamp(timestamp) {
      let date = new Date(timestamp * 1000);
      let dataValues = [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
      ];
      return `${dataValues[0]}/${dataValues[1]}/${dataValues[2]}`;
    },
    openModal(item) {
      this.tempOrder = item;
      // console.log(this.tempOrder);
      $('#orderModal').modal('show');
    },
    updateOrder(item) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/order/${item.id}`;
      const data = {
        data: item,
      };
      vm.$http.put(api, data).then((response) => {
        const { success, message } = response.data;
        if (success) {
          vm.$bus.$emit('message:push', message, 'success');
        } else {
          vm.$bus.$emit('message:push', message, 'danger');
        }
        vm.getOrders();
      });
    },
    clickPagination(page) {
      this.currentPage = page;
      this.getOrders();
    },
    getOrders() {
      $('#orderModal').modal('hide');
      this.tempOrder = {
        create_at: null,
        id: '',
        is_paid: false,
        message: '',
        paid_date: null,
        payment_method: '',
        products: {},
        total: 0,
        user: {
          address: '',
          email: '',
          name: '',
          tel: '',
        },
        num: 0,
      };
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${vm.currentPage}`;
      vm.$http.get(api).then((response) => {
        // console.log(response);
        vm.orders = response.data.orders;
        vm.pagination = { ...response.data.pagination };
        vm.isLoading = false;
      });
    },
    getProducts() {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products/`;
      this.$http.get(api).then((response) => {
        response.data.products.forEach(
          (product) => (vm.products[product.id] = { ...product })
        );
        this.getOrders();
      });
    },
    changeTimestamp(timestamp) {
      let date = new Date(timestamp * 1000);
      let dataValues = [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
      ];
      return `${dataValues[0]}/${dataValues[1]}/${dataValues[2]}`;
    },
    confirmOrder(item) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/order/${item.id}`;
      const data = {
        data: {
          ...item,
          is_paid: true,
        },
      };
      vm.$http.put(api, data).then((response) => {
        const { success, message } = response.data;
        if (success) {
          vm.$bus.$emit('message:push', message, 'success');
          vm.getOrders();
        } else {
          vm.$bus.$emit('message:push', message, 'danger');
          vm.getOrders();
        }
      });
    },
  },
  created() {
    this.getProducts();
    $('#orderModal').modal('hide');
  },
  mounted() {
    const vm = this;
    $('#orderModal').on('hidden.bs.modal', function(e) {
      vm.getOrders();
    });
  },
};
</script>
