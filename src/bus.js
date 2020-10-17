import Vue from 'vue';
Vue.prototype.$bus = new Vue();


// 註冊在一個元件內
// -------------------------------------------
// 自定義名稱 'messsage:push'
// message: 傳入參數
// status: 樣式，預設值為 warning

// created() {
//     vm.$bus.$on('message:push', (message, status = 'warning') => {
//         vm.updateMessage(message, status);
//     });
// },

// methods: {
//     updateMessage(message, status) {
//         const timestamp = Math.floor(new Date() / 1000);
//         this.messages.push({
//             message,
//             status,
//             timestamp,
//         });
//         this.removeMessageWithTiming(timestamp);
//     }
// },


// 把資料傳入元件
// -------------------------------------------
// vm.$bus.$emit('message:push');
// vm.$bus.$emit('message:push', message, 'success');



