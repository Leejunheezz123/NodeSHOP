// kakao 우편번호 모듈
$("#btPostcode").click(openPostcode);
function openPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      var f = document.userForm;
      var road = data.address;
      var jibun = data.jibunAddress;
      var post = data.zonecode;
      f.addrPost.value = post;
      f.addrRoad.value = road;
      f.addrJibun.value = jibun;
    },
  }).open();
}
