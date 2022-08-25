
var app = angular.module("MyHome", ['angularUtils.directives.dirPagination']);
app.controller("HomeCtrl", function ($scope, $http) {
	var data = "https://localhost:7058/api/Category/Get_All";
	$http.get(data).then(function (d) {
		$scope.listloaidt = d.data;
	});
	$scope.GetProductCate = function (id) {
		
		window.location.href = '/product/index';
		localStorage.setItem('getprobycate', id);
	}
	$scope.FindProduct = function (tk) {
		localStorage.setItem('nameFind', tk.name);
		window.location.href = "/Product/FindProduct";
	}
	$scope.LoadFindProduct = function () {
		var find = "https://localhost:7058/api/Products/search/" + localStorage.getItem('nameFind');
		$http.get(find).then(function (d) {
			$scope.listFind = d.data;
		});
	}

	 
});

app.controller("NewCtrl", function ($scope, $http) {
	var data = "https://localhost:7058/api/Products/Get-All";
	$http.get(data).then(function (res) {
		$scope.listnew = res.data;
	});
	$scope.GetDetail = function (id) {
		localStorage.setItem('iddetail', id);
		window.location.href = '/product/ProductDetail';
    }
});
app.controller("ProDetail", function ($scope, $http) {
	$scope.LoadDetail = function () {

		var datad = "https://localhost:7058/api/Products/get-product-by-id/" + localStorage.getItem('iddetail');
		$http.get(datad).then(function (d) {
			$scope.dtl = d.data;debugger
		})
	}
	$scope.AddCart = function (item) {
		item.soLuong = 1;
		console.log(item.soLuong);
		var data;
		if (localStorage.getItem('cart') == null) {
			data = [item];
		} else {
			data = JSON.parse(localStorage.getItem('cart')) || [];
			let ok = true;
			for (let x of data) {
				if (x.maCamera == item.maCamera) {
					x.soLuong += 1;
					ok = false;
					break;
				}
			}
			if (ok) {
				data.push(item);
			}
		}
		localStorage.setItem('cart', JSON.stringify(data));debugger
		alert("Đã thêm giỏ hàng thành công");
    }
});
app.controller("CartCtrl", function ($http, $scope, $rootScope) {
	
	var data = JSON.parse(localStorage.getItem('cart')); debugger
	var tong = 0;
	for (var i = 0; i < data.length; i++) {
		tong = tong + (data[i].soLuong * data[i].gia);
	}
	$rootScope.tongTien = tong;

	$scope.LoadCart = function () {
		$scope.cart = data;
	}
	$scope.DeleteCart = function (id) {
		if (confirm("Bạn có muốn xóa sản phẩm này ra khỏi giỏ hàng ?") == true) {
			var index = data.findIndex(x => x.id == id);
			if (index >= 0) {
				data.splice(index, 1);
			}
			localStorage.setItem('cart', JSON.stringify(data));
		}
	}
	$scope.UpSL = function (id) {
		var index = data.findIndex(x => x.id == id);
		data[index].soLuong++;
		localStorage.setItem('cart', JSON.stringify(data));
	}
	$scope.DownSL = function (id) {
		var index = data.findIndex(x => x.id == id);
		if (data[index].soLuong >= 2) {
			data[index].soLuong -= 1;
		}
		localStorage.setItem('cart', JSON.stringify(data));
	}
		
	$scope.Check_out = function (donhang) {
		$scope.chitietdonhang = [];
		$scope.cart.forEach((item) => {
			var object = {
				'maCamera': item.maCamera,
				'soLuong': item.soLuong,
				'donGia': item.gia,

			};
			$scope.chitietdonhang.push(object);debugger
		})
		$scope.donhang = {
			'maKhachHang': 1,
			'sdt': donhang.sdt,
			'diaChi': donhang.diaChi,
			'tenKhachHang': donhang.tenKhachHang,
			'ngayTao': new Date().toISOString(),
			'tongTien': $rootScope.tongTien,
			'trangThaiDonHang': "Chưa xác nhận",
			'trangThaiVanChuyen': "Chưa xác nhận",
			'trangThaiThanhToan': "Chưa thanh toán",
			'ghiChu': donhang.ghiChu,
			'chitietdonhangs': $scope.chitietdonhang
		};
		var datacheckout = "https://localhost:7058/api/Invoice/create-Invoice";
		console.log($scope.donhang)
		$http({
			method: 'POST',
			data: $scope.donhang,
			url: datacheckout,
		}).then((d) => {
			alert("Đặt hàng thành công !");
			window.location.href = "/Cart/Cart";
		}).catch((e) => {
			alert("lỗi");
        })
		
	}	
	localStorage.setItem('cart', '[]');

});
app.controller("SpTT", function ($scope, $http) {
	var data = "https://localhost:7058/api/Products/get-product-related-by-id/"  + localStorage.getItem('iddetail');
	$http.get(data).then(function (res) {
		$scope.listnb = res.data;
	});
	$scope.GetDetail = function (id) {
		localStorage.setItem('iddetail', id);
		window.location.href = '/product/ProductDetail';
	}
});
app.controller("BLtrl", function ($scope, $http) {
	var data = "http://localhost:50980/api/Blog/get_all";
	$http.get(data).then(function (res) {
		$scope.listbl = res.data;
	});
	$scope.GetDetailbl = function (id) {
		localStorage.setItem('iddetailbl', id);
		window.location.href = '/Blog/BlogDetail';
	}
});
app.controller("ProDetailbl", function ($scope, $http) {
	$scope.LoadDetailbl = function () {
		var datad = "http://localhost:50980/api/Blog/get-BlogID/" + localStorage.getItem('iddetailbl');
		$http.get(datad).then(function (d) {
			$scope.ctbl = d.data;
		})
	}
});
app.controller("ProCateCtrl", function ($scope, $http, $rootScope) {
	$scope.LoadProductByCate = function () {

		var data = "https://localhost:7058/api/Category/get-category-by-id/" + localStorage.getItem('getprobycate');
		$http.get(data).then(function (pro) {
			$scope.listprocate = pro.data;
		});
	};
	$scope.LoadProductduoi2 = function (id) {
		var data = "http://localhost:50980/api/Product/get-2trieu/" + id;
		$http.get(data).then(function (pro) {
			$scope.listprocate = pro.data;
		});
	}
	$scope.GetDetail = function (id) {
		localStorage.setItem('iddetail', id);
		window.location.href = '/product/ProductDetail';
	}

});
