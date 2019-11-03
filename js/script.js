

$("#selection").on("change", function(){
 //console.log("hello");
    const selected= $(this).val();
    $.ajax ({
        
        method: "GET",
        url:
        "https://api.nytimes.com/svc/topstories/v2/" +selected+
        ".json?api-key=shGq1U5v7Y9OnT5fmWGRNImpzizs7UgR",
        dataType: "JSON"
  })

    .done(function(data){

        const articleFilter = data.results.filter(function(filterSet) {
            return filterSet.multimedia[4] !== undefined;

        });
        // console.log(articleFilter);
    
    const cutArticle = articleFilter.slice(0, 12);
    
    //console.log(cutArticle);
    
        $.each(cutArticle, function(index, object){
         $("#articles").append(
            `<article class="news_article" style="background:url(${object.multimedia[4].url}")>
                <p class="news_copy">
                ${object.abstract}
                </p>
            </article>
            `
            
            ); 
        });//close each
        
})
    .fail(function(){
        console.log("error");
    });
});


