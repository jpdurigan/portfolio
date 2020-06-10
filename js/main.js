var listaTrabalhos = $(".tag");

$(function() {
	setarBotoes();
	alterarCores();
});

function setarBotoes() {
	var listaBotoes = $(".btn"), i;
	listaBotoes.hide();

	for (i = 0; i < listaBotoes.length; i++) {
		$("#menu-inferior").on("click", "#"+listaBotoes[i].id, {
			id: listaBotoes[i].id
		}, filtrarPor);
	}

	$("#menu-inferior").on("click", ".nome-click", abrirSite);
	$(".trabalhos").on("click", ".tag", mostrarMais);
}

function alterarCores() {
	var ArrayCores = ["#E0F7B2", "#F7F7F2", "#B7C9E1", "#E9C4CE", "#DAE6E7"];
	var corProv, i, num;

	for (i = 0; i < ArrayCores.length; i++) {
		num = Math.floor(Math.random() * i)
		corProv = ArrayCores[i]
		ArrayCores[i] = ArrayCores[num]
		ArrayCores[num] = corProv
	}

	for (i = 0; i < listaTrabalhos.length; i++) {
		num = i % ArrayCores.length;
		$(listaTrabalhos[i]).css("backgroundColor", ArrayCores[num]);
	}
}

function abrirSite() {
	var tempoAnimacao = 1000;
	animarCanivete(tempoAnimacao);
	setTimeout(function() {
		$(".btn").fadeIn();
		$(".container-logo").removeClass("container-logo-centralizado");
		$(".caixa-menu").removeClass("menu-aberto");
		$(".nome").removeClass("nome-click");
	}, tempoAnimacao);
}

function animarCanivete(tempoAnimacao) {
	$(".canivete").show();
	$("#abridor").css({"top": -80, "left": 18});
	$("#faca").css({"top": -154, "right": 50});
	$("#sacarolhas").css({"top": -110, "right": 50});
	$("#tesoura").css({"top": -165, "right": 80});

	$("#abridor").animate({
		"top": -127,
		"left": 6
	}, tempoAnimacao);
	animarRotacao("#abridor", 90, -5, tempoAnimacao);
	$("#faca").animate({
		"top": -206,
		"right": 25
	}, tempoAnimacao);
	animarRotacao("#faca", -90, -30, tempoAnimacao);
	$("#sacarolhas").animate({
		"top": -138,
		"right": 75
	}, tempoAnimacao);
	animarRotacao("#sacarolhas", -90, -60, tempoAnimacao);
	$("#tesoura").animate({
		"top": -235,
		"right": -24
	}, tempoAnimacao);
	animarRotacao("#tesoura", -90, 15, tempoAnimacao);
}

function filtrarPor( event ) {
	var i;
	var c = event.data.id;

	$("#menu-inferior").find(".ativo").toggleClass("ativo");
	$("#menu-inferior").find("#"+c).toggleClass("ativo");

	for (i = 0; i < listaTrabalhos.length; i++) {
		if ($(listaTrabalhos[i]).hasClass(c)) {
			$(listaTrabalhos[i]).addClass("show");
		} else {
			$(listaTrabalhos[i]).removeClass("show");
		}
	}
}

function mostrarMais( event ) {
	if ($(".trabalhos").has("expandido")) minimizarTrabalho();

	$(this).addClass("expandido");
	$(this).find("img").addClass("imagem-ativa");
	$(this).find(".titulo-trabalho").addClass("titulo-trabalho-ativo");
	
	event.stopPropagation();
	$("body").one("click", minimizarTrabalho);
}

function minimizarTrabalho() {
	var trabalhoAtivo = $(".expandido")
	trabalhoAtivo.removeClass("expandido");
	trabalhoAtivo.find("img").removeClass("imagem-ativa");
	trabalhoAtivo.find(".titulo-trabalho").removeClass("titulo-trabalho-ativo");
}

function animarRotacao(div, anguloInicial, anguloFinal, tempo) {
    var $elem = $(div);

    $({deg: anguloInicial}).animate({deg: anguloFinal}, {
        duration: tempo,
        step: function(now) {
            $elem.css({
                transform: 'rotate(' + now + 'deg) scale(0.5)'
            });
        }
    })
}
