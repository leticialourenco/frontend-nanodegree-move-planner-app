
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    /* clear out old data before new request
    */
    $wikiElem.text("");
    $nytElem.text("");
   
    /* get the values of form inputs
    */
    var street = $('#street').val();
    var city = $('#city').val();
    /* edit greeting message
    */
    $greeting.text('You want to live at '+ street + ', ' + city + '?');
    /* load Google Streetview
    */
    var mapsUrl = 'https://maps.googleapis.com/maps/api/streetview?size=1200x600&location='+ street + '+' + city;
    $body.append('<img class="bgimg" src="'+ mapsUrl +'">');

    return false;
};

$('#form-container').submit(loadData);
