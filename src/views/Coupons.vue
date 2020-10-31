<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <!-- 大範圍操作按鈕 -->
    <div class="text-right mt-4">
      <button
        class="btn btn-outline-primary mr-1"
        @click="tempCoupons = []"
        v-if="tempCoupons.length !== 0"
      >
        清除選取
      </button>
      <button
        class="btn btn-primary mr-1"
        @click="tempCoupons = [...coupons]"
        v-else
      >
        全部選取
      </button>

      <button class="btn btn-primary mr-1" @click="copyCoupons()">
        批量複製
      </button>
      <button class="btn btn-primary mr-1" @click="openDeleteCouponsModal()">
        批量刪除
      </button>
      <button class="btn btn-primary" @click="openModal()">
        建立優惠卷
      </button>
    </div>
    <!-- 產品列表 -->
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="80">選取</th>
          <th width="auto">名稱</th>
          <th width="200">折扣百分比</th>
          <th width="200">到期日</th>
          <th width="100">是否啟用</th>
          <th width="180">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                :value="item"
                v-model="tempCoupons"
              />
            </div>
          </td>
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}</td>
          <td>{{ changeTimestamp(item.due_date) }}</td>
          <td>
            <span v-if="item.is_enabled == 1" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button
              class="btn btn-outline-primary btn-sm mr-1"
              @click="openModal(item)"
            >
              編輯
            </button>
            <button
              class="btn btn-outline-primary btn-sm mr-1"
              @click="copyCoupon(item)"
            >
              複製
            </button>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="openDeleteCouponModal(item.id)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- updateCouponModal -->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="requestMethods == 'post'">新增優惠卷</span>
              <span v-else>編輯優惠卷</span>
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
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                    v-model="tempCoupon.title"
                  />
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">優惠碼</label>
                    <input
                      type="text"
                      class="form-control"
                      :disabled="requestMethods === 'put'"
                      id="category"
                      placeholder="請輸入優惠碼"
                      v-model="tempCoupon.code"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="percent">折扣百分比</label>
                    <input
                      min="1"
                      max="100"
                      type="number"
                      class="form-control"
                      id="percent"
                      placeholder="請輸入折扣百分比"
                      v-model="tempCoupon.percent"
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="origin_price">到期日</label>
                    <form class="form-inline">
                      <input
                        min="1911"
                        max="2100"
                        type="number"
                        class="form-control mb-2 mr-sm-2"
                        id="expiryDateYear"
                        placeholder="請輸入年"
                        v-model="tempCoupon.dueDateYear"
                        @blur="blurHandler('Year')"
                      />
                      <input
                        min="1"
                        max="12"
                        type="number"
                        class="form-control mb-2 mr-sm-2"
                        id="expiryDateMonth"
                        placeholder="請輸入月"
                        v-model="tempCoupon.dueDateMonth"
                        @blur="blurHandler('Month')"
                      />
                      <input
                        min="1"
                        max="31"
                        type="number"
                        class="form-control mb-2 mr-sm-2"
                        id="expiryDateDay"
                        placeholder="請輸入日"
                        v-model="tempCoupon.dueDateDay"
                        @blur="blurHandler('Day')"
                      />
                    </form>
                  </div>
                </div>
                <hr />
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempCoupon.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- deleteCouponModal -->
    <div
      class="modal fade"
      id="deleteCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="deleteCouponModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteCouponModalLabel">
              刪除產品
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
            請確認是否要刪除此產品？
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteCoupon(deleteCouponId)"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- deleteCouponsModal -->
    <div
      class="modal fade"
      id="deleteCouponsModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="deleteCouponsModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteCouponsModalLabel">
              批量刪除產品
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
            請確認是否要刪除已選取的所有產品？
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteCoupons()"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
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
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  data() {
    return {
      coupons: [],
      tempCoupon: {
        code: '',
        dueDateDay: '1',
        dueDateMonth: '1',
        dueDateYear: '2000',
        is_enabled: 0,
        percent: 100,
        title: '',
        due_date: 0,
      },
      tempCoupons: [],
      requestMethods: '',
      deleteCouponId: '',
      isLoading: false,
      status: {
        fileUploading: false,
        openModalName: '',
        enterAllow: false,
      },
      currentPage: 1,
      pagination: {},
    };
  },
  computed: {
    dueDate() {
      let dateObj = new Date(
        parseInt(this.tempCoupon.dueDateYear),
        parseInt(this.tempCoupon.dueDateMonth) - 1,
        parseInt(this.tempCoupon.dueDateDay)
      );
      return Number(dateObj) / 1000;
    },
  },
  methods: {
    blurHandler(id) {
      this.tempCoupon[`dueDateDay${id}`] = document.getElementById(
        `expiryDate${id}`
      ).value;
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
    clickPagination(page) {
      this.currentPage = page;
      this.getCoupons();
    },
    getCoupons() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${vm.currentPage}`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.coupons = response.data.coupons;
        vm.pagination = { ...response.data.pagination };
        vm.isLoading = false;
        vm.status.enterAllow = true;
        vm.status.openModalName = '';
      });
    },
    cleanModalInput() {
      this.tempCoupon.code = '';
      this.tempCoupon.dueDateDay = '1';
      this.tempCoupon.dueDateMonth = '1';
      this.tempCoupon.dueDateYear = '2000';
      this.tempCoupon.is_enabled = 0;
      this.tempCoupon.percent = '100';
      this.tempCoupon.title = '';
      this.tempCoupon.id = null;
    },
    openModal(couponData = false) {
      $('#couponModal').modal('show');
      if (couponData) {
        this.status.openModalName = '編輯';
        this.requestMethods = 'put';
        this.cleanModalInput();
        this.tempCoupon = { ...couponData };
        this.tempCoupon.dueDateYear = this.changeTimestamp(
          couponData.due_date
        ).split('/')[0];
        this.tempCoupon.dueDateMonth = this.changeTimestamp(
          couponData.due_date
        ).split('/')[1];
        this.tempCoupon.dueDateDay = this.changeTimestamp(
          couponData.due_date
        ).split('/')[2];
      } else {
        this.status.openModalName = '建立新商品';
        this.requestMethods = 'post';
        this.cleanModalInput();
      }
    },
    finshAllModalInput() {
      // const { due_date, percent, title, is_enabled } = this.tempCoupon;
      // if (
      //   title != '' &&
      //   category != '' &&
      //   origin_price != '' &&
      //   price != '' &&
      //   unit != '' &&
      //   imageUrl != '' &&
      //   description != '' &&
      //   content != ''
      // ) {
      //   return true;
      // } else {
      //   return false;
      // }
    },
    updateCoupon() {
      // this.finshAllModalInput()
      if (true) {
        if (this.requestMethods == 'put') {
          // 編輯
          const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${this.tempCoupon.id}`;
          const vm = this;
          const { title, is_enabled, percent } = vm.tempCoupon;
          const data = {
            data: {
              title,
              is_enabled,
              percent,
              due_date: vm.dueDate,
            },
          };
          vm.$http.put(api, data).then((response) => {
            const { success } = response.data;
            if (success) {
              $('#couponModal').modal('hide');
              vm.cleanModalInput();
              vm.getCoupons();
            } else {
              vm.getCoupons();
            }
          });
        } else {
          //新增
          const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
          const vm = this;
          const { title, is_enabled, percent, code } = vm.tempCoupon;
          const data = {
            data: {
              title,
              is_enabled,
              percent,
              code,
              due_date: vm.dueDate,
            },
          };
          this.$http.post(api, data).then((response) => {
            const { success } = response.data;
            if (success) {
              $('#couponModal').modal('hide');
              this.cleanModalInput();
              this.getCoupons();
            } else {
              this.getCoupons();
            }
          });
        }
      }
    },
    deleteCoupon(couponId) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${couponId}`;
      this.$http.delete(api).then((response) => {
        const { success } = response.data;
        if (success) {
          $('#deleteCouponModal').modal('hide');
          this.getCoupons();
        } else {
          this.getCoupons();
        }
      });
    },
    copyCoupon(couponData) {
      this.isLoading = true;
      const { title, is_enabled, percent, code, due_date } = couponData;
      this.cleanModalInput();
      this.tempCoupon = { ...couponData };
      this.tempCoupon.dueDateYear = this.changeTimestamp(due_date).split(
        '/'
      )[0];
      this.tempCoupon.dueDateMonth = this.changeTimestamp(due_date).split(
        '/'
      )[1];
      this.tempCoupon.dueDateDay = this.changeTimestamp(due_date).split('/')[2];

      this.requestMethods = 'post';
      this.updateCoupon();
    },
    copyCoupons() {
      const tempCouponsAmount = this.tempCoupons.length;
      if (tempCouponsAmount !== 0) {
        let successAmount = 0;
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
        const vm = this;
        vm.isLoading = true;
        this.tempCoupons.forEach((coupon) => {
          const { title, is_enabled, percent, code, due_date } = coupon;
          this.cleanModalInput();
          this.tempCoupon = { ...coupon };
          this.tempCoupon.dueDateYear = this.changeTimestamp(due_date).split(
            '/'
          )[0];
          this.tempCoupon.dueDateMonth = this.changeTimestamp(due_date).split(
            '/'
          )[1];
          this.tempCoupon.dueDateDay = this.changeTimestamp(due_date).split(
            '/'
          )[2];
          this.$http.post(api, { data: this.tempCoupon }).then((response) => {
            const { success } = response.data;
            if (success) {
              successAmount += 1;
              if (successAmount == tempCouponsAmount) {
                this.getCoupons();
              }
            } else {
              this.getCoupons();
            }
          });
        });
        this.tempCoupons = [];
      } else {
        this.$bus.$emit('message:push', '請至少勾選一個商品', 'danger');
      }
    },
    openDeleteCouponModal(couponId) {
      $('#deleteCouponModal').modal('show');
      this.status.openModalName = '刪除';
      this.deleteCouponId = couponId;
    },
    openDeleteCouponsModal() {
      const tempCouponsAmount = this.tempCoupons.length;
      if (tempCouponsAmount !== 0) {
        $('#deleteCouponsModal').modal('show');
        this.status.openModalName = '批量刪除';
      } else {
        this.$bus.$emit('message:push', '請至少勾選一個商品', 'danger');
      }
    },
    deleteCoupons() {
      const tempCouponsAmount = this.tempCoupons.length;
      if (tempCouponsAmount !== 0) {
        let successAmount = 0;
        const vm = this;
        vm.isLoading = true;
        $('#deleteCouponsModal').modal('hide');
        this.tempCoupons.forEach((coupon) => {
          const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${coupon.id}`;
          this.$http.delete(api).then((response) => {
            const { success } = response.data;
            if (success) {
              successAmount += 1;
              if (successAmount == tempCouponsAmount) {
                this.getCoupons();
              }
            } else {
              this.getCoupons();
            }
          });
        });
        this.tempCoupons = [];
      } else {
        this.$bus.$emit('message:push', '請至少勾選一個商品', 'danger');
      }
    },
  },
  mounted() {
    const vm = this;
    window.addEventListener('keydown', function(event) {
      if (
        event.keyCode === 13 &&
        event.ctrlKey === true &&
        vm.status.enterAllow == true
      ) {
        if (
          vm.status.openModalName == '建立新商品' ||
          vm.status.openModalName == '編輯'
        ) {
          vm.status.enterAllow = false;
          vm.updateCoupon();
        }
        if (vm.status.openModalName == '刪除') {
          vm.status.enterAllow = false;
          vm.deleteCoupon(vm.deleteCouponId);
        }

        if (vm.status.openModalName == '批量刪除') {
          vm.status.enterAllow = false;
          vm.deleteCoupons();
        }
      }
    });
  },
  created() {
    this.getCoupons();
  },
};
</script>
