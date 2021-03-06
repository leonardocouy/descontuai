function callPaymentProcess () {
	//PAY ATTENTION
	//ESSE METODO ESTÁ APONTANDO PARA PRODUÇÃO

	var code = '';

	var isOpenLightbox = PagSeguroLightbox(code, {
	    success : function(transactionCode) {
	    	//continuou
	        // alert("success - " + transactionCode);
	    },
	    abort : function() {}
	});

	// Redirecionando o cliente caso o navegador não tenha suporte ao Lightbox
	if (!isOpenLightbox){
	    location.href="https://pagseguro.uol.com.br/v2/checkout/payment.html?code="+code;
	}
}

// Gerador de alertas

function showAlert(message, alert_type) {
	$('#alert_placeholder').append(
		'<div id="alertdiv" class="alert '+ alert_type +'">' +
		'<a class="close" data-dismiss="alert">x</a>' +
		'<span>'+ message + '</span></div>');

	setTimeout(function() {
		$("#alertdiv").remove();
	}, 5000);
}

// Mascara para telefones celulares brasileiros
var SPMaskBehavior = function (val) {
  return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
},

spOptions = {
  onKeyPress: function(val, e, field, options) {
      field.mask(SPMaskBehavior.apply({}, arguments), options);
    }
};


$('#phone').mask(SPMaskBehavior, spOptions);


// Form validation and Contact POST

$('#contact-form').validator().on('submit', function (e) {
	$body = $("body");
	if (e.isDefaultPrevented()) {
	} else {
		e.preventDefault();

		var email = $('#email').val();
		var name = $('#name').val();
		var phone = $('#phone').val();
		var description = $('#description').val();

		var data = {
			email: email,
			name: name,
			phone: phone,
			description: description
		};

		$body.addClass("loading");
		$.ajax({
			url: '/api/v1/contact',
			data: JSON.stringify(data),
			type: 'POST',
			contentType: 'application/json',
			success: function(response){
				$("#contact-form")[0].reset();
				showAlert('Sua dúvida foi enviada! Em breve entraremos em contato!!', 'alert-success');
				$body.removeClass("loading");
			},
			error: function(error){
				showAlert('Ops, ocorreu algum erro, verifique se preencheu todos os campos corretamente.', 'alert-warning');
				$body.removeClass("loading");
			}
		});
   }
});


// Form validation and RegisterPOST

$('#register-form').validator().on('submit', function (e) {
	$body = $("body");
	if (e.isDefaultPrevented()) {
	} else {
		e.preventDefault();

		var email = $('#email').val();
		var name = $('#name').val();
		var phone = $('#phone').val();

		var data = {
			email: email,
			name: name,
			phone: phone,
			capture: 'True'
		};

		$body.addClass("loading");
		$.ajax({
			url: '/api/v1/contact',
			data: JSON.stringify(data),
			type: 'POST',
			contentType: 'application/json',
			success: function(response){
				$("#register-form")[0].reset();
				showAlert('Em breve entraremos em contato!!', 'alert-success')
				$body.removeClass("loading");
			},
			error: function(error){
				showAlert('Ops, ocorreu algum erro, verifique se preencheu todos os campos corretamente.', 'alert-warning')
				$body.removeClass("loading");
			}
		});
   }
});

