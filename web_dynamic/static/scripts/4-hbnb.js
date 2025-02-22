$(document).ready(function () {
    let selectedAmenities = {}; 

    $('input[type="checkbox"]').change(function () {
        const amenityId = $(this).attr('data-id');
        const amenityName = $(this).attr('data-name');
        
        if ($(this).is(':checked')) {
            selectedAmenities[amenityId] = amenityName;
        } else {
            delete selectedAmenities[amenityId];
        }

        const amenitiesList = Object.values(selectedAmenities).join(', ');
        $('.amenities h4').text(amenitiesList || '\u00A0');
    });

    $.get("http://0.0.0.0:5001/api/v1/status/", function (data) {
        if (data.status === "OK") {
            $("#api_status").addClass("available");
        } else {
            $("#api_status").removeClass("available");
        }
    });

    function fetchPlaces(filters = {}) {
        $.ajax({
            url: "http://0.0.0.0:5001/api/v1/places_search/",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(filters),
            success: function (data) {
                $(".places").empty();
                data.forEach(place => {
                    const placeHTML = `
                        <article>
                            <div class="title_box">
                                <h2>${place.name}</h2>
                                <div class="price_by_night">$${place.price_by_night}</div>
                            </div>
                            <div class="information">
                                <div class="max_guest">${place.max_guest} Guest(s)</div>
                                <div class="number_rooms">${place.number_rooms} Bedroom(s)</div>
                                <div class="number_bathrooms">${place.number_bathrooms} Bathroom(s)</div>
                            </div>
                            <div class="description">${place.description}</div>
                        </article>`;
                    $(".places").append(placeHTML);
                });
            }
        });
    }

    fetchPlaces();

    $('button').click(function () {
        fetchPlaces({ amenities: Object.keys(selectedAmenities) });
    });
});
