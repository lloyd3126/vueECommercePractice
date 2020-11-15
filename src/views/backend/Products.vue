<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <!-- 大範圍操作按鈕 -->
    <div class="text-right mt-4">
      <button
        class="btn btn-outline-primary mr-1"
        @click="tempProducts = []"
        v-if="tempProducts.length !== 0"
      >
        清除選取
      </button>
      <button
        class="btn btn-primary mr-1"
        @click="tempProducts = [...products]"
        v-else
      >
        全部選取
      </button>

      <button class="btn btn-primary mr-1" @click="copyProducts()">
        批量複製
      </button>
      <button class="btn btn-primary mr-1" @click="openDeleteProductsModal()">
        批量刪除
      </button>
      <button class="btn btn-primary" @click="openModal()">
        建立新商品
      </button>
    </div>
    <!-- 產品列表 -->
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="80">選取</th>
          <th width="120">分類</th>
          <th width="auto">產品名稱</th>
          <th width="80">原價</th>
          <th width="80">售價</th>
          <th width="100">是否啟用</th>
          <th width="180">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                :value="item"
                v-model="tempProducts"
              />
            </div>
          </td>
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{ item.origin_price | currency }}</td>
          <td class="text-right">{{ item.price | currency }}</td>
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
              @click="copyProduct(item)"
            >
              複製
            </button>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="openDeleteProductModal(item.id)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- updateProductModal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="requestMethods == 'post'">新增產品</span>
              <span v-else>編輯產品</span>
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
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile"
                    >或 上傳圖片
                    <i
                      class="fas fa-spinner fa-spin"
                      v-if="status.fileUploading"
                    ></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadFile"
                  />
                </div>
                <img
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid"
                  alt=""
                  :src="tempProduct.imageUrl"
                />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                    v-model="tempProduct.title"
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
                      v-model="tempProduct.category"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入單位"
                      v-model="tempProduct.unit"
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
                      v-model="tempProduct.origin_price"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      placeholder="請輸入售價"
                      v-model="tempProduct.price"
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
                    v-model="tempProduct.description"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder="請輸入產品說明內容"
                    v-model="tempProduct.content"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
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
            <button
              type="button"
              class="btn btn-primary"
              @click="updateProduct"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- deleteProductModal -->
    <div
      class="modal fade"
      id="deleteProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="deleteProductModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteProductModalLabel">
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
              @click="deleteProduct(deleteProductId)"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- deleteProductsModal -->
    <div
      class="modal fade"
      id="deleteProductsModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="deleteProductsModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteProductsModalLabel">
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
              @click="deleteProducts()"
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
      products: [],
      tempProduct: {
        title: '',
        category: '',
        origin_price: '',
        price: '',
        imageUrl: '',
        description: '',
        content: '',
        is_enabled: 0,
      },
      tempProducts: [],
      requestMethods: '',
      deleteProductId: '',
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
  methods: {
    clickPagination(page) {
      this.currentPage = page;
      this.getProducts();
    },
    getProducts() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${vm.currentPage}`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.products = response.data.products;
        vm.pagination = { ...response.data.pagination };
        vm.isLoading = false;
        vm.status.enterAllow = true;
        vm.status.openModalName = '';
      });
    },
    cleanModalInput() {
      this.tempProduct.title = '';
      this.tempProduct.category = '';
      this.tempProduct.origin_price = '';
      this.tempProduct.price = '';
      this.tempProduct.imageUrl = '';
      this.tempProduct.description = '';
      this.tempProduct.content = '';
      this.tempProduct.is_enabled = 0;
    },
    openModal(productData = false) {
      $('#productModal').modal('show');
      if (productData) {
        this.status.openModalName = '編輯';
        this.requestMethods = 'put';
        this.tempProduct = { ...productData };
      } else {
        this.status.openModalName = '建立新商品';
        this.requestMethods = 'post';
        this.cleanModalInput();
      }
    },
    finshAllModalInput() {
      const {
        title,
        category,
        origin_price,
        price,
        unit,
        imageUrl,
        description,
        content,
        is_enabled,
      } = this.tempProduct;
      if (
        title != '' &&
        category != '' &&
        origin_price != '' &&
        price != '' &&
        unit != '' &&
        imageUrl != '' &&
        description != '' &&
        content != ''
      ) {
        return true;
      } else {
        return false;
      }
    },
    updateProduct() {
      if (this.finshAllModalInput()) {
        if (this.requestMethods == 'put') {
          // 編輯
          const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${this.tempProduct.id}`;
          const vm = this;
          this.$http.put(api, { data: vm.tempProduct }).then((response) => {
            const { success } = response.data;
            if (success) {
              $('#productModal').modal('hide');
              this.cleanModalInput();
              this.getProducts();
            } else {
              this.getProducts();
            }
          });
        } else {
          //新增
          const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
          const vm = this;
          this.$http.post(api, { data: vm.tempProduct }).then((response) => {
            const { success } = response.data;
            if (success) {
              $('#productModal').modal('hide');
              this.cleanModalInput();
              this.getProducts();
            } else {
              this.getProducts();
            }
          });
        }
      }
    },
    deleteProduct(productId) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${productId}`;
      this.$http.delete(api).then((response) => {
        const { success } = response.data;
        if (success) {
          $('#deleteProductModal').modal('hide');
          this.getProducts();
        } else {
          this.getProducts();
        }
      });
    },
    uploadFile() {
      const uploadedFile = this.$refs.files.files[0];
      const vm = this;
      vm.status.fileUploading = true;
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;
      const headers = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      this.$http.post(api, formData, headers).then((response) => {
        const { data } = response;
        if (data.success) {
          vm.$set(vm.tempProduct, 'imageUrl', data.imageUrl);
          vm.status.fileUploading = false;
          this.$bus.$emit('message:push', '圖片上傳成功', 'success');
        } else {
          vm.status.fileUploading = false;
          if (typeof response.data.message == 'string') {
            this.$bus.$emit('message:push', response.data.message, 'danger');
          } else {
            this.$bus.$emit('message:push', '檔案過大', 'danger');
          }
        }
      });
    },
    copyProduct(productData) {
      this.isLoading = true;
      const {
        title,
        category,
        origin_price,
        price,
        imageUrl,
        description,
        content,
        is_enabled,
      } = productData;
      this.tempProduct = {
        title,
        category,
        origin_price,
        price,
        imageUrl,
        description,
        content,
        is_enabled,
      };
      this.requestMethods = 'post';
      this.updateProduct();
    },
    copyProducts() {
      const tempProductsAmount = this.tempProducts.length;
      if (tempProductsAmount !== 0) {
        let successAmount = 0;
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
        const vm = this;
        vm.isLoading = true;
        this.tempProducts.forEach((product) => {
          this.$http.post(api, { data: product }).then((response) => {
            const { success } = response.data;
            if (success) {
              successAmount += 1;
              if (successAmount == tempProductsAmount) {
                this.getProducts();
              }
            } else {
              this.getProducts();
            }
          });
        });
        this.tempProducts = [];
      } else {
        this.$bus.$emit('message:push', '請至少勾選一個商品', 'danger');
      }
    },
    openDeleteProductModal(productId) {
      $('#deleteProductModal').modal('show');
      this.status.openModalName = '刪除';
      this.deleteProductId = productId;
    },
    openDeleteProductsModal() {
      const tempProductsAmount = this.tempProducts.length;
      if (tempProductsAmount !== 0) {
        $('#deleteProductsModal').modal('show');
        this.status.openModalName = '批量刪除';
      } else {
        this.$bus.$emit('message:push', '請至少勾選一個商品', 'danger');
      }
    },
    deleteProducts() {
      const tempProductsAmount = this.tempProducts.length;
      if (tempProductsAmount !== 0) {
        let successAmount = 0;
        const vm = this;
        vm.isLoading = true;
        $('#deleteProductsModal').modal('hide');
        this.tempProducts.forEach((product) => {
          const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${product.id}`;
          this.$http.delete(api).then((response) => {
            const { success } = response.data;
            if (success) {
              successAmount += 1;
              if (successAmount == tempProductsAmount) {
                this.getProducts();
              }
            } else {
              this.getProducts();
            }
          });
        });
        this.tempProducts = [];
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
          vm.updateProduct();
        }
        if (vm.status.openModalName == '刪除') {
          vm.status.enterAllow = false;
          vm.deleteProduct(vm.deleteProductId);
        }

        if (vm.status.openModalName == '批量刪除') {
          vm.status.enterAllow = false;
          vm.deleteProducts();
        }
      }
    });
  },
  created() {
    this.getProducts();
  },
};
</script>
