jQuery(document).on('pagecreate', function() {
	var limpaHeader, criarHeader, criarFooter, criarListaPaises, limparFormulario, localStorageUtils;
	
	limparHeader = function() {
		var header;
		
		header = jQuery('[data-role="header"]');
		header.remove();
	};
	
	limparFooter = function() {
		var footer;
		
		footer = jQuery('[data-role="footer"]');
		footer.remove();
	};

	criarHeader = function() {
		var headerHTML, titulo;

		titulo = '&#8857;';
		headerHTML = '<div role="banner" class="ui-header ui-bar-a" data-role="header">' +
						'<h1 aria-level="1" role="heading" class="ui-title">' +  titulo + '</h1>' +
					 '</div>';

		jQuery('[data-role="page"]').prepend(headerHTML);
	};
	
	criarFooter = function() {
		var footerHTML, titulo;
		
		titulo = '';
		footerHTML = '<div role="contentinfo" class="ui-footer ui-bar-a" data-role="footer">' +
						'<h1 aria-level="1" role="heading" class="ui-title">' + titulo + '</h1>' +
					 '</div>';

		jQuery('[data-role="page"]').append(footerHTML);
	};
	
	criarListaPaises = function() {
			jQuery.getJSON('js/data/paises.json', function(response) {
			var objJSON, elementosLista, select;
			
			objJSON = response;
			options = '';
			select = jQuery('[name="pais"]');

			jQuery.each(objJSON, function(i) {
				options += '<option value="' + objJSON[i].code + '">' +
								objJSON[i].name +
						   '</option>';
			});
			
			select.prepend(options);
			select.selectmenu('refresh');
		});
	};
	
	limparFormulario = function() {
		var formulario;
		
		formulario = jQuery('.form-cadastro form');
		formulario.attr('class', '');
	};
	
	localStorageUtils = function() {
		var	salvar, remover;
		
		salvar = function(nomeCampo, seletorCampo) {
			var valor;

			valor = jQuery(seletorCampo);
			localStorage.setItem(nomeCampo, jQuery(seletorCampo).val());
		};
		
		remover = function(valor) {
			var valor;

			localStorage.removeItem(valor);
		};
	};
	
	limparHeader();
	limparFooter();
	criarHeader();
	//criarFooter();
	criarListaPaises();
	limparFormulario();
	localStorageUtils();

});