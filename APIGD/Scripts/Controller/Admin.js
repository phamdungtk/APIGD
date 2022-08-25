
var app = angular.module("MyAdmin", ['ngFileUpload', 'angularUtils.directives.dirPagination']);
//if (!window.localStorage.getItem('iduser')) {
//    localStorage.setItem('iduser', null);
//}
app.controller("LoginCtrl", function ($scope, $http) {
    
    $scope.login = function () {
        localStorage.setItem('iduser',null);
        var data = "https://localhost:7058/api/Auth/login";
        console.log($scope.login)
        $http.get(data).then(function (d) {
            $scope.NguoiDung = d.data; debugger
            for (var i = 0; i < $scope.NguoiDung.length; i++) {
                localStorage.setItem('iduser', $scope.users[i].id);
            } 
            if (localStorage.getItem('iduser') == "null") {
                alert("Tài khoản không chính xác");
            }
            else {
                alert("Đăng nhập thành công");
                window.location.href = "/Category_Management/Index";
            }
           
        });
       
    }
})

app.controller("OrderCtrl", function ($scope, $http) {
    //if (localStorage.getItem('iduser') == "null") {
    //    window.location.href = "/Users/login";
    //}
    //else {
    var data = "https://localhost:7058/api/Invoice/GetAll";
        $http.get(data).then(function (d) {
            $scope.listorder = d.data;
        });
        
        $scope.DeleteOrder = function (mahd) {
            debugger
            if (confirm("Bạn có muốn xóa sản phẩm này không ?") == true) {
                var datahd = "https://localhost:7058/api/Invoice/delete-Invoice/" + mahd; debugger
                console.log(datahd)
                $http({
                    method: 'DELETE',
                    /*data: $scope.DeleteProduct,*/
                    url: datahd,
                }).then(function () {
                    alert("đã Xoá thành công");
                    window.location.reload();
                });
            }
        }
        $scope.GetDetail = function (id) {
            localStorage.setItem('maDonHang', id);
            window.location.href = '/Order/detailorder';
        }
        $scope.LoadDetailOrder = function () {
            var datadt = "https://localhost:7058/api/InvoiceDetails/get-InvoiceDetails-by-id/" + localStorage.getItem('maDonHang');debugger
            $http.get(datadt).then(function (d) {
                $scope.listdtorder = d.data;debugger
            });
        }
        $scope.DeleteOrderDetail = function (id) {
            if (confirm("Bạn có muốn xóa ct hoá đơn này không ?") == true) {
                var dataordl = "https://localhost:7058/api/InvoiceDetails/delete-InvoiceDetails/" + id;
                $http.post(dataordl).then(function () {
                    alert("Đã xóa thành công !");
                    window.location.reload();
                });
            }
        }
        $scope.EditOrder = function (id) {
            localStorage.setItem('edit_order', id);
            window.location.href = '/Order/editorder';
        }
        $scope.LoadOrderByID = function () {
            var dataed = "https://localhost:7058/api/InvoiceDetails/get-InvoiceDetails-by-id/" + localStorage.getItem('edit_order');
            $http.get(dataed).then(function (d) {
                $scope.dataedit = d.data;
            });
        }
        $scope.UpdateDetail = function (id, sl) {
            var eddt = "https://localhost:7058/api/Invoice/update-Invoice/";
            updatedtail = {};
            updatedtail.id = parseInt(id);
            updatedtail.so_luong = parseInt(sl);
            $http({
                method: 'POST',
                url: eddt,
                data: updatedtail,

            }).then(function (d) {
                alert("Cập nhật thành công !");
            });
        }
        $scope.UpdateOrder = function (e) {
            var edit = "https://localhost:7058/api/Invoice/update-Invoice/";
            updateorder = {};
            updateorder.maDonHang = e.maDonHang;
            updateorder.tenKhachHang = e.tenKhachHang;
            updateorder.sdt = e.sdt;
            updateorder.diaChi = e.diaChi;
            updateorder.ghiChu = e.ghiChu;
            //updateorder.orderdate = e.orderdate;
            /*updateorder.trang_thai = parseInt(e.trang_thai);*/

            if (confirm("Xác nhận sửa !") == true) {
                $http({
                    method: 'POST',
                    url: edit,
                    data: updateorder,
                }).then(function (d) {
                    alert("Cập nhập đơn hàng thành công !");
                    window.location.href = '/Order/order';
                });
            }
        }
   /* }*/
   
});
app.controller("CategoryCtrl", function ($scope, $http) {
    //if (localStorage.getItem('iduser') == "null") {
    //    window.location.href = "/Users/login";
    //}
    //else {
        var data = "https://localhost:7058/api/Category/Get_All";
        $http.get(data).then(function (d) {
            $scope.listloaisp = d.data;

        });
        var datact = "https://localhost:7058/api/Manufacturer/Get_All";
        $http.get(datact).then(function (d) {
            $scope.listmh = d.data;

        });

        $scope.DeleteCate = function (maloai) {
            debugger
            if (confirm("Bạn có muốn xóa sản phẩm này không ?") == true) {
                var datalsp = "https://localhost:7058/api/Category/delete-category/" + maloai; debugger
                console.log(datalsp)
                $http({
                    method: 'DELETE',
                    /*data: $scope.DeleteProduct,*/
                    url: datalsp,
                }).then(function () {
                    alert("đã Xoá thành công");
                    window.location.reload();
                });
            }
        }
        //$scope.UpdateStatus = function (lct) {
        //    var dataudst = "http://localhost:50980/api/Category/update-status-cate/" + lct.id + "/" + lct.category_status;
        //    $http.post(dataudst).then(function () {
        //        alert("Cập nhật thành công !");
        //        window.location.reload();
        //    });
        //}
        $scope.SaveCate = function (ct) {
            //if (ct.category_status == true) {
            //    $scope.category_status = 0;
            //}
            //if (ct.category_status == false) {
            //    $scope.category_status = 1;
            //}
            var upcate = "https://localhost:7058/api/Category/update-category/";
            updatecate = {};
            updatecate.MaLoai = ct.maLoai;
            updatecate.MaHang = ct.maHang;
            updatecate.TenLoai = ct.tenLoai;
            updatecate.Mota = ct.moTa;
            $http({
                method: 'POST',
                data: updatecate,
                url: upcate,
            }).then(function (d) {
                alert("đã sửa thành công !");
                window.location.href = '/Category_Management/Index';
            });
        }
        $scope.UpdateCate = function (id) {
            localStorage.setItem('editcateid', id);
            window.location.href = '/Category_Management/EditCate';
        }
        $scope.LoadCateByID = function () {
            var datagetcate = "https://localhost:7058/api/Category/get-category-by-id" + "/" + localStorage.getItem('editcateid');
            $http.get(datagetcate).then(function (res) {
                $scope.getdata = res.data;
            });
        };
        $scope.AddCate = function (ct) {
            cate = {};
            cate.MaHang = parseInt(ct.maHang);
            cate.TenLoai = ct.tenLoai;
            cate.Mota = ct.moTa; debugger

            if (confirm("Bạn có muốn thêm loại sản phẩm này không ?") == true) {
                var add = "https://localhost:7058/api/Category/create-category/";
                $http({
                    method: 'POST',
                    data: cate,
                    url: add,
                }).then(function () {
                    alert("đã thêm thành công");
                    window.location.href = '/Category_Management/Index';
                });
            }
        }
  /*  }*/
   
});
app.controller("ProductCtrl", function ($scope, $http, Upload) {
    //if (localStorage.getItem('iduser') == "null") {
    //    window.location.href = "/Users/login";
    //}
    /*else {*/
        var data = "https://localhost:7058/api/Products/Get-All";
        $http.get(data).then(function (d) {
            $scope.listsp = d.data;
        });
        $scope.DeleteProduct = function (masp) {
            debugger
            if (confirm("Bạn có muốn xóa sản phẩm này không ?") == true) {
                var datadlllll = "https://localhost:7058/api/Products/delete-product/" + masp; debugger
                console.log(datadlllll)
                $http({
                    method: 'DELETE',
                    /*data: $scope.DeleteProduct,*/
                    url: datadlllll,
                }).then(function () {
                    alert("đã Xoá thành công");
                    window.location.reload();
                });             
            }
        }

        $scope.UpdateProduct = function (id) {
            localStorage.setItem('editproductid', id);
            window.location.href = '/Product_Management/UpdateProduct';
        }
        $scope.LoadProductByID = function () {
            var getproid = "https://localhost:7058/api/Products/get-product-by-id/" + localStorage.getItem('editproductid');
            $http.get(getproid).then(function (d) {
                $scope.pro = d.data;
            });
        };
        $scope.SaveProduct = function (p) {
            var uppro = "https://localhost:7058/api/Products/update-product";
            updatepro = {};
            updatepro.maCamera = p.maCamera;
            updatepro.maLoai = p.maLoai;
            updatepro.tenCamera = p.tenCamera;
            if ($scope.hinhAnh == null) {
                updatepro.hinhAnh = p.hinhAnh;
            }
            else {
                updatepro.hinhAnh = $scope.hinhAnh;
            }
           
            updatepro.doPhanGiai = p.doPhanGiai;
            updatepro.chip = p.chip;           
            updatepro.ongKinh = p.ongKinh;
            updatepro.tamQuanSat = p.tamQuanSat;
            updatepro.nguonDien = p.nguonDien;
            updatepro.soLuong = p.soLuong;
            updatepro.gia = p.gia;
            $http({
                method: 'POST',
                data: updatepro,
                url: uppro,
            }).then(function (d) {
                alert("đã sửa thành công !");
                window.location.href = '/Product_Management/Index';
            })
        }

        $scope.UploadFiles = function (file) {
            $scope.SelectedFiles = file;
            if ($scope.SelectedFiles && $scope.SelectedFiles.length) {
                Upload.upload({
                    url: '/Product_Management/Upload',
                    data: { files: $scope.SelectedFiles }
                }).then(function (d) {
                    $scope.hinhAnh = d.data[0];
                });
            }
        }
        var datact = "https://localhost:7058/api/Category/Get_All";
        $http.get(datact).then(function (d) {
            $scope.listloaidt = d.data;

        });
        $scope.AddProduct = function (pr) {
            var addpr = "https://localhost:7058/api/Products/create-Product/";

            prd = {};
            prd.MaLoai = parseInt(pr.maLoai);
            prd.TenCamera = pr.tenCamera;
            prd.HinhAnh = $scope.hinhAnh;
            prd.DoPhanGiai = pr.doPhanGiai;
            prd.Chip = pr.chip;
            prd.OngKinh = pr.ongKinh;
            prd.TamQuanSat = pr.tamQuanSat;
            prd.NguonDien = pr.nguonDien;
            prd.Gia = pr.gia;
            //prd.CameraHot = pr.cameraHot;
            prd.SoLuong = pr.soLuong; debugger
            $http({
                method: 'POST',
                data: prd,
                url: addpr,
            }).then(function () {
                alert("đã thêm thành công");
                window.location.href = '/Product_Management/Index';
            });
        }
   /* }*/
});
