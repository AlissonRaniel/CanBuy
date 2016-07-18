(function(window,document){

	window.onload = function(){

		var canBuy 			= 	document.getElementById('canBuy');
		var response 		= 	document.getElementById('response');
		var currentSite;
		// executaa ação caso seja clicado no boção buscar
		//canBuy.onclick = function()
		//{
			var url = "http://sistemas.procon.sp.gov.br/evitesite/list/evitesite.php?action=list&jtStartIndex=0&jtPageSize=600&jtSorting=strSite%20ASC";
			ajaxGetRequest(url,createList);				
		//}

		chrome.tabs.query({'active': true}, function (tabs) {
			currentSite = tabs[0].url;
		});
		
		// compara a lista dos sites do procon com o site atual
		function createList(json)
		{
			response.innerHTML	=	null;
			var contEquals = 0;
			var siteName;
			
			if(json != null) {
				for(var i = 0; i < json.TotalRecordCount; i++){
					
					siteName = json.Records[i].strSite;	
					if(currentSite != null) {
						if(currentSite.indexOf(siteName) >= 0 ){
							contEquals++;
							break;
						}
					}
				}
			}
			
			if(contEquals > 0) {
				response.innerHTML = "<center><p style='color:#ff1a00;'>SITE N&Atilde;O CONFI&Aacute;VEL, POIS SE ENCONTRA NA LISTA NEGRA DO PROCON !</p></center><img src='icon/errado.png' /><p style='font-size:10px;'>para visualizar a lista completa <a href='http://sistemas.procon.sp.gov.br/evitesite/list/evitesites.php' target='_blank' >clique aqui</a><p>";
			} else {
				response.innerHTML = "<center><p style='color:#8fc400;' >SITE N&Atilde;O SE ENCONTRA NA LISTA NEGRA DO PROCON !</p></center><img src='icon/certo.png' /><p style='font-size:10px;'>para visualizar a lista completa <a href='http://sistemas.procon.sp.gov.br/evitesite/list/evitesites.php' target='_blank'>clique aqui</a><p>";
			}
		}

		// função para a execução do ajax
		function ajaxGetRequest(url,callback)
		{
			var req = new XMLHttpRequest();
			req.open("GET",url,true);
			req.onreadystatechange  = function(data)
			{
				if(req.readyState == 4 && req.status == 200)
					callback(JSON.parse(req.responseText)) 
				else 
					callback(null)
			}
			req.send(null);
		}
	}
})(window,document);