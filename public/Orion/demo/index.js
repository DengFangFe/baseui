$(function(){
    $('#input1').baseInput({
		require:true,
		vilidataEvent:'blur'
	});
    $('#input2').numberInput({
        hasPrefix:'$'
	});
    $('#input3').emailInput();
    $('#input4').telInput();
    $('#input5').phoneInput();
    $('#textarea1').textarea();
    $('#selectmenu1').selectMenu();

    //二维码生成
    var qrcode = new QRCode($(".qrBox")[0], {
        text: "http://www.baidu.com",
        width: 100,
        height: 100,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });

    $('.copyUrl').on('click', function(){
        var url = $('.qrBox').attr('title');
        console.log('链接已复制',url);
    });

    $('.showQR').on('click', function(){
        var url = $('.newUrl').val();
        qrcode.clear();
        qrcode.makeCode(url);
    });
});