$( document ).ready(function() {

    callAPI();
    togglePages();
    onIntervalChangePage();

});

function callAPI() {
    
    $.ajax({
        url: 'http://www.mocky.io/v2/58fda6ce0f0000c40908b8c8',
        type: "GET",
        headers: {
            'Content-Type':'application/javascript'
        },
        dataType: 'json',
        success: renderItems,
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });

    setTimeout(callAPI, 180000);

} 

function renderItems(response) {

    let target = $('.widget-content'),
        itemsOnPage = 5,
        pageClass = '',
        counter = 1;

    if(response.hasOwnProperty('news') && typeof response.news !== 'undefined') {

        target.empty();

        $.each( response.news, function(index, item) {

            if(index % itemsOnPage === 0){
                pageClass = 'page-class-' + counter++;
            }
            
            let itemMarkup = `
                    <div class="widget-content-item ${ pageClass } ${ index < itemsOnPage ? 'current': ''  } ">
                        <span class="item-title">
                            <b> ${item.title} </b>
                        </span>
                        <span class="item-content">
                            ${item.details}
                        </span>
                    </div>    
                    `;

            target.append(itemMarkup);        
        });

    };
}

function togglePages() {

    $('.header-buttons a').click(function() {

        let tab_class= $(this).attr('data-page');
    
        $('.header-buttons a').removeClass('current');
        $('.widget-content-item').removeClass('current');
    
        $(this).addClass('current');
        $('.widget-content .' + tab_class).addClass('current');
    
    });
}

function onIntervalChangePage() {

    setInterval(function(){
        
        let nextButton = null;
        let currentButton = $('.header-buttons a.current');
        
        if(!currentButton.next().length) {
            nextButton = $('.header-buttons a')[0];
        } else {
            nextButton = currentButton.next();
        }

        $(nextButton).trigger('click');

    }, 3000);

}