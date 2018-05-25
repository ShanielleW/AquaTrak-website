var geo_place = null;
var geo_autocomplete = null;
var geo_autocomplete2 = null;

// Autocomplete callback
function google_add_place() {
  geo_place = geo_autocomplete.getPlace();
  if (typeof geo_callback == 'function') {
    geo_callback(geo_place);
  }
}
function google_add_place2() {
  geo_place = geo_autocomplete2.getPlace();
  if (typeof geo_callback2 == 'function') {
    geo_callback2(geo_place);
  }
}


$(document).ready(function() {

  $.get('/api/humanity', function(data) {
    var humanity = data;
    $('form').each(function() {
      $(this).append('<input type="hidden" name="humanity" value="' + humanity + '" />');
    });
  });

  // Setup google loc field
  geo_autocomplete = new google.maps.places.Autocomplete(document.getElementById('geo_loc'), {types: ['geocode']});
  geo_autocomplete2 = new google.maps.places.Autocomplete(document.getElementById('geo_loc2'));
  geo_autocomplete.addListener('place_changed', google_add_place);
  geo_autocomplete2.addListener('place_changed', google_add_place2);
 
  // Stripe response handler
  var stripeResponseHandler = function(status, response) {
    var $form = $('#stripe-payment-form');
    if (response.error) {
      $form.find('.stripe-payment-errors').text(response.error.message);
      $form.find('button').prop('disabled', false);
    } else {
      $form.append($('<input type="hidden" name="stripe_token" />').val(response.id));
      $form.attr('action', '/cart/pay')
      $form.get(0).submit();
    }
    console.log(response)
    console.log(status)
  };

  // Stripe payment form handler
  $('#stripe-payment-form').submit(function(event) {
    var $form = $(this);
    $form.find('button').prop('disabled', true);
    Stripe.card.createToken($form, stripeResponseHandler);
    return false;
  }); 

  // Toggle something
  $('body').on('click', '.toggle', function() {
    var ttarget = $(this).attr('href');
    var rtext = $(this).attr('data-toggle');
    if (rtext) {
      $(this).attr('data-toggle', $(this).html());
      $(this).html(rtext);
    }
    $(ttarget).toggle('slow');
    return(false);
  });

  // Confirm something
  $('body').on('click', '.confirm', function() {
    if (confirm($(this).attr('data-msg') || 'Are you sure?')) {
      return true;
    }
    return false;
  });

});
