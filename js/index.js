$(document).ready(function(){

    var text = "Hello JavaScript";
    console.log(text);

    // var resultados = document.getElementById("results");
    // resultados.innerHTML = "Este é o JavaScript";

    var resultLists = $("#resultList");
    resultLists.text("This is JQuery");

    var toggleBtn = $("#toggleButton");

    toggleBtn.on("click", function(){
        resultLists.toggle();

        if(toggleBtn.text() == "Ocultar"){
            toggleBtn.text("Mostrar");
        }else{
            toggleBtn.text("Ocultar");
        }
    });

    $("#gitHubSearchForm").on("submit", function(e){
        
        e.preventDefault();
        var searchPhrase = $("#name").val();
        var useStar = $("#star").is(":checked");
        var lang = $("#lang").val();
        
        if(searchPhrase){
            resultLists.text("Pesquisando...");

            var gitHubSearch = "https://api.github.com/search/repositories?q=" + encodeURIComponent(searchPhrase);

            if(lang != "All"){
                gitHubSearch += "+language:" + encodeURIComponent(lang);
            }

            if(useStar){
                gitHubSearch += "&sort=stars";
            }

            $.get(gitHubSearch)
            .success(function(r){
                mostrarResultados(r.items);
            })

            .fail(function(err){
                console.log("Erro ao realizar a busca...");
            })

            .done(function(){
                /* ... */
            });
        }

        
    });

    


    // var results = [
    //     {
    //         // OL
    //         name: "JQuery", 
    //         language: "JavaScript",
    //         score: 4.5,
    //         showLog: function(){
    //             /*...*/
    //         },
    //         owner: {
    //             login: "Pedro",
    //             id: 123456
    //         }
    // }, {
    //         name: "JQuery UI",
    //         language: "JavaScript",
    //         score: 3.5,
    //         showLog: function(){
    //             /*...*/
    //         },
    //         owner: {
    //             login: "Lucas",
    //             id: 123654
    //         }
    //     }
    // ];
    
    

    function mostrarResultados(results){
        resultLists.empty();
        $.each(results, function(i, items){
            var newResults = 
                $("<div class='result'>"+
                    "<div class='title'>" + items.name + "</div>" +
                    "<div>Linguagem: " + items.language + "</div>" +
                    "<div>Proprietário: <a href='"+ items.html_url +"' target='_blank'>" + items.owner.login + "</a></div>" +
                "</div>");
            
            // newResults.hover(TRUE, FALSE);
            newResults.hover(
            function(){
                $(this).css("background-color", "lightgray");
            }, 
            function(){
                $(this).css("background-color", "transparent");
            });

            resultLists.append(newResults);
        });
    }
    for (i = 0 ; i < results.length; i++) {
        console.log("Curso: " + results[i].name + ", Linguagem: " + results[i].language);
    }

    // // Criar uma função
    // function showMsg(msg, more){
    //     console.log(msg);
        
    //     if(more){
    //         console.log(more);
    //     }
    // }

    // // Criar variavel do tipo função
    // var showIt = function(msg){
    //     console.log(msg);
    // }

    // // Criar uma função que recebi função
    // function showItThen(msg, callback){
    //     showIt(msg);
    //     callback();
    // }

    // showMsg("Chamando showMsg...");
    // showMsg("Chamando showMsg...", "Mais mesmo...");

    // showIt("Chamando showIt...");

    // showItThen("Chamando..", function(){
    //     console.log("Chamando callback...");
    // });
});