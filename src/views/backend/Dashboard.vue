<template>
  <div>
    <AdminNavbar />
    <Alert />
    <div class="container-fluid">
      <div class="row">
        <Sidebar></Sidebar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar';
import AdminNavbar from '@/components/AdminNavbar';
import Alert from '@/components/Alert';

export default {
  components: {
    Sidebar,
    AdminNavbar,
    Alert,
  },
};
</script>
