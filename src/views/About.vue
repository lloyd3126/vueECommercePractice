<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <nav>
      <div v-if="scrollNum > 1">
        <div :class="{ box: true, 'box-color': scrollNum > 5 }"></div>
        <MainNavbarFixed />
      </div>
    </nav>
    <header>
      <div class="cover" :style="{ 'background-image': `url(${coverImgUrl})` }">
        <i class="fas fa-angle-double-down" v-if="scrollNum < 1"></i>
      </div>
    </header>
    <section id="news-section">
      <div class="container">
        <div class="row justify-content-center d-flex">
          <div class="col-xl-9 col-12">
            <h3 class="text-center mt-5 mb-3" style="letter-spacing: 2px;">
              最新消息
            </h3>
            <ul id="msgUl">
              <li>
                <a :href="`${publicPath}#/shop?tag=coupon`" class="d-flex">
                  <p class="dateTxt mr-3">2020/11/01</p>
                  <p class="msgTxt">
                    老闆就愛跟風，2020/11/11 AM 11:11:11 限時限量釋出 11 張 1.1
                    折全品項優惠卷。
                  </p>
                </a>
              </li>
              <li>
                <a :href="`${publicPath}#/shop?tag=coupon`" class="d-flex">
                  <p class="dateTxt mr-3">2020/10/01</p>
                  <p class="msgTxt">
                    雙十節檔期，國旗造型、國父造型蛋糕各 10 個預約開放中。
                  </p>
                </a>
              </li>
              <li>
                <a :href="`${publicPath}#/shop?tag=coupon`" class="d-flex">
                  <p class="dateTxt mr-3">2020/09/25</p>
                  <p class="msgTxt">
                    中秋佳節月圓人團圓，柚子口味蛋糕限時銷售。
                  </p>
                </a>
              </li>
              <li>
                <a :href="`${publicPath}#/shop?tag=coupon`" class="d-flex">
                  <p class="dateTxt mr-3">2020/07/10</p>
                  <p class="msgTxt">
                    籌備一年終於開店了 94 爽，開幕慶 5 折優惠卷瘋搶
                  </p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section id="product-section">
      <div id="fragmentBanner" class="mt-5 mb-5">商品專區</div>
      <div class="container">
        <div class="row justify-content-center d-flex">
          <ul class="col-xl-10 col-12">
            <li class="card flex-lg-row mb-4">
              <div class="col-12 col-lg-5 p-0">
                <div
                  class="productImg"
                  :style="{ 'background-image': `url(${popularImgUrl})` }"
                >
                  <div class="black-cover"></div>
                </div>
              </div>
              <div class="col-12 col-lg-7 card-body p-lg-5 m-lg-3">
                <h5 class="card-title">熱門商品</h5>
                <p class="card-text">
                  店內最暢銷的熱門口味，想嘗試但怕踩雷的最佳選擇。
                </p>
                <a
                  :href="`${publicPath}#/shop?tag=popular`"
                  class="btn btn-primary"
                  >來去看看</a
                >
              </div>
            </li>
            <li class="card flex-lg-row-reverse mb-4">
              <div class="col-12 col-lg-5 p-0">
                <div
                  class="productImg"
                  :style="{ 'background-image': `url(${saleImgUrl})` }"
                >
                  <div class="black-cover"></div>
                </div>
              </div>
              <div class="col-12 col-lg-7 card-body p-lg-5 m-lg-3">
                <h5 class="card-title">特價商品</h5>
                <p class="card-text">
                  特價是想要推廣，更優惠的價錢推薦你相同品質的四分之一蛋糕。
                </p>
                <a
                  :href="`${publicPath}#/shop?tag=sale`"
                  class="btn btn-primary"
                  >手刀搶購去</a
                >
              </div>
            </li>
            <li class="card flex-lg-row mb-4">
              <div class="col-12 col-lg-5 p-0">
                <div
                  class="productImg"
                  :style="{ 'background-image': `url(${couponImgUrl})` }"
                >
                  <div class="black-cover"></div>
                </div>
              </div>
              <div class="col-12 col-lg-7 card-body p-lg-5 m-lg-3">
                <h5 class="card-title">優惠卷</h5>
                <p class="card-text">
                  下單前記得找找看有沒有能用的優惠卷！
                </p>
                <a
                  :href="`${publicPath}#/shop?tag=coupon`"
                  class="btn btn-primary"
                  >領阿哪次不領</a
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <footer class="page-footer font-small cyan darken-3 text-center mt-5">
      <!-- Footer Elements -->
      <div class="container">
        <!-- Grid row-->
        <div class="row">
          <!-- Grid column -->
          <div class="col-md-12 py-5">
            <div class="flex-center">
              <!-- Facebook -->
              <a
                class="facebook-ic"
                target="_blank"
                href="https://www.facebook.com/lloyd3126/"
              >
                <i
                  class="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x"
                >
                </i>
              </a>
              <!--Linkedin -->
              <a
                class="linkdin-ic"
                target="_blank"
                href="https://www.linkedin.com/in/lloyd3126/"
              >
                <i
                  class="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x"
                >
                </i>
              </a>
              <!--google -->
              <a class="google-ic" href="mailto: lloyd3126@gmail.com">
                <i class="fab fa-google fa-lg white-text mr-md-5 mr-3 fa-2x">
                </i>
              </a>
              <!--Github-->
              <a
                class="github-ic"
                target="_blank"
                href="https://github.com/lloyd3126"
              >
                <i class="fab fa-github fa-lg white-text fa-2x"> </i>
              </a>
            </div>
          </div>
          <!-- Grid column -->
        </div>
        <!-- Grid row-->
      </div>
      <!-- Footer Elements -->

      <!-- Copyright -->
      <div class="footer-copyright text-center pt-3 ">
        <a href="https://github.com/lloyd3126/"> 陳重年 Chen Chung Nien</a>
        © 2020 Copyright
      </div>
      <div class="footer-copyright text-center pb-3">
        <a href="https://www.freepik.com/vectors/background">
          Background vector created by freepik - www.freepik.com</a
        >
      </div>
      <!-- Copyright -->
    </footer>
  </div>
</template>

<script>
import MainNavbarFixed from '@/components/MainNavbarFixed';

export default {
  components: {
    MainNavbarFixed,
  },
  data() {
    return {
      isLoading: false,
      publicPath: process.env.BASE_URL,
      coverImgUrl: './img/cover.jpg',
      couponImgUrl: './img/coupon_link.jpg',
      popularImgUrl: './img/popular_link.jpg',
      saleImgUrl: './img/sale_link.jpg',
      scrollNum: 0,
    };
  },
  methods: {
    handleScroll(event) {
      this.scrollNum = window.scrollY;
    },
    handleResize(event) {
      if (window.innerWidth < 1060 && window.innerWidth > 541) {
        this.coverImgUrl = './img/cover-md.jpg';
      } else if (window.innerWidth <= 540) {
        this.coverImgUrl = './img/cover-sm.jpg';
      } else {
        this.coverImgUrl = './img/cover.jpg';
      }
    },
  },
  created() {
    window.scrollTo(0, 0);
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
    if (window.innerWidth < 1060 && window.innerWidth > 541) {
      this.coverImgUrl = './img/cover-md.jpg';
    } else if (window.innerWidth <= 540) {
      this.coverImgUrl = './img/cover-sm.jpg';
    } else {
      this.coverImgUrl = './img/cover.jpg';
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>

<style scoped>
body {
  overflow-x: hidden;
}
.productImg {
  height: 30vh;
  background: no-repeat center;
  background-size: 100%;
  transition: all 0.2s linear;
}
.productImg:hover {
  background-size: 120%;
}
.productImg .black-cover {
  display: block;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  transition: all 0.2s linear;
}
.productImg .black-cover:hover {
  background-color: rgba(0, 0, 0, 0);
}

#fragmentBanner {
  height: 15vh;
  width: 100vw;
  background-color: #633b14;
  text-align: center;
  line-height: 15vh;
  font-size: 1.75rem;
  font-weight: bold;
  letter-spacing: 2px;
  color: #fff;
  text-shadow: 2px 2px 4px #000000;
  position: relative;
}
.dateTxt,
.msgTxt {
  font-size: 18px;
  margin: 15px 0;
}
.dateTxt {
  color: #633b14;
  font-weight: bold;
}
#msgUl {
  padding: 0;
}
#msgUl > li {
  border-bottom: 1px solid #000;
  list-style: none;
}
#msgUl > li > a {
  text-decoration-line: none;
  transition-duration: 0.15s;
}
#msgUl > li > a:hover {
  margin-left: -20px;
}

.box {
  width: 100vw;
  height: 53px;
  position: fixed;
  top: 0;
  z-index: 1;
  transition: 0.5s;
  background-color: rgba(255, 255, 255, 0);
}
.box-color {
  background-color: rgba(255, 255, 255, 1);
}
.cover {
  width: 100vw;
  height: 100vh;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  position: relative;
}
.cover i {
  color: #fff;
  position: absolute;
  left: 50%;
  top: 90%;
  font-size: 3rem;
  transform: translate(-50%, -50%);
  animation-name: example;
  animation-duration: 2s;
  animation-iteration-count: infinite;
}
@keyframes example {
  0% {
    top: 90%;
  }
  50% {
    top: 92%;
  }
  100% {
    top: 90%;
  }
}
.page-footer {
  background-color: #eee;
}
.footer-copyright,
.footer-copyright a {
  background-color: #222;
  color: #eee;
}
.hover-red {
  background-color: white;
  color: #212529;
  font-weight: 700;
  transition-duration: 0.15s;
  border: 1px solid #dee2e6;
  cursor: pointer;
  font-size: 0.6rem;
}
.hover-red:hover {
  background-color: #dc3545;
  color: white;
  border: 1px solid #dc3545;
}
.hover-red-active {
  background-color: #dc3545;
  color: white;
  border: 1px solid #dc3545;
}
.coupon-img {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
}
.coupon-img:hover {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
/* Extra small devices (portrait phones, less than 576px) */
/* No media query since this is the default in Bootstrap */

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 300px) {
  .box {
    height: 48.31px;
  }
  #fragmentBanner {
    height: 8vh;
    line-height: 8vh;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  .box {
    height: 48.31px;
  }
  #fragmentBanner {
    height: 8vh;
    line-height: 8vh;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .hover-red {
    font-size: 0.9rem;
  }
  .box {
    height: 48.31px;
  }
  #fragmentBanner {
    height: 10vh;
    line-height: 10vh;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  .box {
    height: 53px;
  }
  .productImg {
    height: 100%;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  .box {
    height: 53px;
  }
}
</style>
