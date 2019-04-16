var lang = 'en';
let weblink = 'http://ec2-18-188-88-0.us-east-2.compute.amazonaws.com:8080/';
let webtitle = 'Globalization of Science';



var waypoints;


function loadJS() {
    $('.urlField').val(weblink);

    let warnDevs = ['Tablet','Smart-TV','Other non-Mobile','Other Mobile','Robot','App','Smartphone','Feature Phone'];
    if (warnDevs.includes(WURFL.form_factor)) {
        showModal('modSpecialDevice');
    }

    let banDevs = [];
    if (banDevs.includes(WURFL.form_factor)) {
        showModal('modRozliseni');
        $('#modalWrap').off('click');
    }


    sizes = setSizes();

    waypoints = waypointing();

    // checkResolution();

    generateApp('#app');

    dragify();

    shareLinks();

    generateMap('#map');

}
function checkResolution() {
    w = $(window).width();

    if (w<999) {
        showModal('modRozliseni');
        $('#modalWrap').off('click');
    }
}

function showCopyLink() {
    showModal('modCopyLink')
}

function dragify() {

    function moveAll(evt) {
        $('.draggable').css('left',$(this).css('left'));
    }
    drags = $( ".draggable" );
    drags.draggable({
        handle: ".dragButton" ,
        stop: moveAll
    });
    let leftpos = ($(window).width() - sizes.header.width > sizes.boxwidth) ? sizes.header.width + sizes.chart.left: $(window).width() - sizes.boxwidth - 20;
    drags.css('left',leftpos);

}

function generateApp(selector) {
    $(selector).append($('<div />', {id:'appCont'}));

    generateControls(selector + ' #appCont');

    generateCharts(selector + ' #appCont');


}

function waypointing() {
    function activatefix(selector) {
        $('.fixactive').removeClass('fixactive');
        $(selector).addClass('fixactive');
    };

    function fixBox(selector,parent,target,toppos) {
        element = $(parent+ ' ' +selector).detach();
        $(target).append(element);
        $(target  + ' ' + selector).css({top:toppos,'box-shadow':'0 0 0 0'})
    }

    function floatBox(selector,parent,target) {
        element = $(parent + ' ' + selector).detach();
        $(target).append(element);
        $(element).css({top:'0px','box-shadow': '0px 0px 20px 4px #d1d4d3'})
    }

    function updChart(selCountries,selFields,selMethods) {
        $('#ddl_countries').val()
    }


    // fixing menu and adding shadow
    waypoints = $('#menu').waypoint(function(direction) {
        if(direction === 'down') {
            $('#everything').append($('<div class="stickyshadow"></div>'));
            $('#menu').addClass('sticky');
            $('#menu').removeClass('floaty');
            $('#menuempty').css('display','block')
        } else {
            $('#menu').addClass('floaty');
            $('#menu').removeClass('sticky');
            $('#menuempty').css('display','none')
            $('.stickyshadow').remove();
        }});

    waypoints = $('#context').waypoint({handler:function(direction) {
            if (direction === 'down') {
                $('#mContext').addClass('storyPast')
            } else {
                $('#mContext').removeClass('storyPast')
            }},offset:'17%'});

    waypoints = $('#empt-app').waypoint({handler:function(direction) {
            if (direction === 'down') {
                $('#mApp').addClass('storyPast')
            } else {
                $('#mApp').removeClass('storyPast')
            }},offset:'17%'});




    waypoints = $('#big7').waypoint({handler:function(direction) {
            if (direction === 'down') {
                $('#mCountries').addClass('storyPast')
            } else {
                $('#mCountries').removeClass('storyPast')
            }},offset:'17%'});

    waypoints = $('#advanced').waypoint({handler:function(direction) {
            if (direction === 'down') {
                $('#mDisciplines').addClass('storyPast')
            } else {
                $('#mDisciplines').removeClass('storyPast')
            }},offset:'17%'});


    waypoints = $('#map').waypoint({handler:function(direction) {
            if (direction === 'down') {
                $('#mMap').addClass('storyPast')
            } else {
                $('#mMap').removeClass('storyPast')
            }},offset:'17%'});



    waypoints = $('#context').waypoint(function(direction) {
        if (direction === 'down') {
            activatefix('#app')
        } else {
            activatefix('#intro')
        }});

    waypoints = $('#transition').waypoint({handler:function(direction) {
            if (direction === 'down') {
                $('#mEast').addClass('storyPast')
            } else {
                $('#mEast').removeClass('storyPast')
            }},offset:'17%'});


    waypoints = $('#china').waypoint(function(direction) {
            if(direction === 'down') {
                $('#mChina').addClass('storyPast')
            } else {
                $('#mChina').removeClass('storyPast')
            }
        },
        {offset:'17%'}
    );

    waypoints = $('#russia').waypoint(function(direction) {
            if(direction === 'down') {
                $('#mRussia').addClass('storyPast')
            } else {
                $('#mRussia').removeClass('storyPast')
            }
        },
        {offset:'17%'}
    );
    waypoints = $('#conclusion').waypoint({handler:function(direction) {
            if (direction === 'down') {
                $('#mConclusion').addClass('storyPast')
            } else {
                $('#mConclusion').removeClass('storyPast')
            }},offset:'17%'});

    waypoints = $('#broad').waypoint(function(direction) {
            if(direction === 'down') {
                switchMultiSelect('countries',false);
                $('#ddl_countries select').val(['_ADV','_TRA','_DEV']).trigger('change',[false]);
                $('#ddl_methods select').val('euclid').trigger('change',[false]);
                $('#ddl_fields select').val('All').trigger('change',[true]);
            } else {
                switchMultiSelect('countries',false);
                $('#ddl_countries select').val(["AUS", "EGY", "DEU", "IDN", "ITA", "MEX", "NGA", "POL", "RUS"]).trigger('change',[false]);
                $('#ddl_fields select').val("All").trigger('change',[false]);
                $('#ddl_methods select').val('euclid').trigger('change',[false]);

                $('#ddl_countries select').trigger('change',[true]);
            }
        },        {offset:'60%'}
    );


    waypoints = $('#big7').waypoint(function(direction) {
            if(direction === 'down') {
                switchMultiSelect('countries',false);
                $('#ddl_countries select').val(["_EU", "BRA", "CHN", "IND", "JPN", "RUS", "USA"]).trigger('change',[false]);
                $('#ddl_methods select').val('euclid').trigger('change',[false]);
                $('#ddl_fields select').val('All').trigger('change',[true]);
            } else {
                switchMultiSelect('countries',false);
                $('#ddl_countries select').val(['_ADV','_TRA','_DEV']).trigger('change',[false]);
                $('#ddl_fields select').val("All").trigger('change',[false]);
                $('#ddl_methods select').val('euclid').trigger('change',[false]);

                $('#ddl_countries select').trigger('change',[true]);
            }
        },
        {offset:'60%'}
    );
    waypoints = $('#top5bottom5').waypoint(function(direction) {
            if(direction === 'down') {
                switchMultiSelect('countries',false);
                $('#ddl_countries select').val(['RUS','AZE','CUB','UKR','TJK','CHN','KAZ','BLR','UZB','ROU']).trigger('change',[false]);
                $('#ddl_methods select').val('euclid').trigger('change',[false]);
                $('#ddl_fields select').val("All").trigger('change',[true]);
            } else {
                switchMultiSelect('countries',false);
                $('#ddl_countries select').val(["_EU", "BRA", "CHN", "IND", "JPN", "RUS", "USA"]).trigger('change',[false]);
                $('#ddl_methods select').val('euclid').trigger('change',[false]);
                $('#ddl_fields select').val('All').trigger('change',[true]);
            }
        },
        {offset:'60%'}
    );


    waypoints = $('#advanced').waypoint(function(direction) {
            if(direction === 'down') {
                switchMultiSelect('fields',false);
                $('#ddl_countries select').val("_ADV").trigger('change',[false]);
                $('#ddl_methods select').val("euclid").trigger('change',[false]);
                $('#ddl_fields select').val(["top_Life", "top_Social", "top_Physical", "top_Health"]).trigger('change',[true]);
            } else {
                switchMultiSelect('countries',false);
                $('#ddl_countries select').val(['RUS','AZE','CUB','UKR','TJK','CHN','KAZ','BLR','UZB','ROU']).trigger('change',[false]);
                $('#ddl_methods select').val('euclid').trigger('change',[false]);
                $('#ddl_fields select').val("All").trigger('change',[true]);
            }
        },
        {offset:'60%'}
    );

    waypoints = $('#russia').waypoint(function(direction) {
            if(direction === 'down') {
                switchMultiSelect('fields',false);
                $('#ddl_countries select').val("RUS").trigger('change',[false]);
                $('#ddl_methods select').val("euclid").trigger('change',[false]);
                $('#ddl_fields select').val(["top_Life", "top_Social", "top_Physical", "top_Health"]).trigger('change',[true]);
            } else {
                switchMultiSelect('fields',false);
                $('#ddl_countries select').val("_ADV").trigger('change',[false]);
                $('#ddl_methods select').val("euclid").trigger('change',[false]);
                $('#ddl_fields select').val(["top_Life", "top_Social", "top_Physical", "top_Health"]).trigger('change',[true]);
            }
        },
        {offset:'60%'}
    );


    waypoints = $('#china').waypoint(function(direction) {
            if(direction === 'down') {
                switchMultiSelect('fields',false);
                $('#ddl_countries select').val("CHN").trigger('change',[false]);
                $('#ddl_methods select').val("euclid").trigger('change',[false]);
                $('#ddl_fields select').val(["top_Life", "top_Social", "top_Physical", "top_Health"]).trigger('change',[true]);
            } else {
                switchMultiSelect('fields',false);
                $('#ddl_countries select').val("RUS").trigger('change',[false]);
                $('#ddl_methods select').val("euclid").trigger('change',[false]);
                $('#ddl_fields select').val(["top_Life", "top_Social", "top_Physical", "top_Health"]).trigger('change',[true]);
            }
        },
        {offset:'60%'}
    );


    waypoints = $('#socialCentralWesternEurope').waypoint(function(direction) {
            if(direction === 'down') {
                switchMultiSelect('countries',false);
                $('#ddl_countries select').val(["AUT", "CZE", "DNK", "HUN", "NLD", "POL", "SVK", "SWE", "CHE"]).trigger('change',[false]);
                $('#ddl_methods select').val("euclid").trigger('change',[false]);
                $('#ddl_fields select').val("top_Social").trigger('change',[true]);
            } else {
                switchMultiSelect('fields',false);
                $('#ddl_countries select').val("CHN").trigger('change',[false]);
                $('#ddl_methods select').val("euclid").trigger('change',[false]);
                $('#ddl_fields select').val(["top_Life", "top_Social", "top_Physical", "top_Health"]).trigger('change',[true]);
            }
        },
        {offset:'60%'}
    );

    waypoints = $('#czechia').waypoint(function(direction) {
            if(direction === 'down') {
                switchMultiSelect('fields',false);
                $('#ddl_countries select').val("CZE").trigger('change',[false]);
                $('#ddl_methods select').val("euclid").trigger('change',[false]);
                $('#ddl_fields select').val(["top_Life", "top_Social", "top_Physical", "top_Health"]).trigger('change',[true]);
            } else {
                switchMultiSelect('countries',false);
                $('#ddl_countries select').val(["AUT", "CZE", "DNK", "HUN", "NLD", "POL", "SVK", "SWE", "CHE"]).trigger('change',[false]);
                $('#ddl_methods select').val("euclid").trigger('change',[false]);
                $('#ddl_fields select').val("top_Social").trigger('change',[true]);
            }
        },
        {offset:'60%'}
    );

    return waypoints;
}


function MoveOn(selector,adjust=100) {
    $('html,body').animate({
        scrollTop: $('#' +selector).offset().top - adjust
    })
}

function showMethodModal(method) {
    showModal('modMethods');
    displayMethod(method);
}

function showModal(modal) {
    $('.modalBackground').fadeIn(200,function() {$('#' + modal).addClass('modalActive')});
}

function hideModal() {
    $('.modalBackground').fadeOut(200,function() {});
    $('.modalActive').removeClass('modalActive')
}

function hideAndShowModal(modal) {
    hideModal();

    showModal(modal);
}

window.onclick = function(event) {
    modal = document.getElementById('modalWrap')
    if (event.target == modal) {
        id = $('.modalActive').attr('id')
        if(id != 'modRozliseni') {
            hideModal();
        }
    }
}

$(document).keyup(function(e) {
    if (e.keyCode === 27) {
        hideModal()
    }   // esc
});



function copyLink(copyInputSelector,copiedNoticeSelector) {
    $(copiedNoticeSelector).hide();
    /* Get the text field */
    var copyText = $(copyInputSelector)[0];

    /* Select the text field */
    copyText.select();

    /* Copy the text inside the text field */
    document.execCommand("copy");

    $(copiedNoticeSelector).fadeIn();
}


function shareLinks() {
    //link = window.location.href;


    //Facebook
    $('#fb').attr('href',"https://www.facebook.com/sharer/sharer.php?u=" + encodeURI(weblink));

    //Twitter
    $('#tw').attr('href',"https://twitter.com/intent/tweet?text=" + encodeURI(webtitle + ' ' + weblink) );

    //LinkedIn
    $('#li').attr('href',"http://www.linkedin.com/shareArticle?mini=true&url=" + encodeURI(weblink) + "&title=" + encodeURI(webtitle))

    $('#mail').attr('href',"mailto:?subject="+ encodeURIComponent(webtitle) + "&body=" + encodeURIComponent(weblink) )
}