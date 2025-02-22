$(document).ready(function () {
    const amenities = {};

    $("li input[type=checkbox]").change(function () {
        const amenityId = this.dataset.id;
        const amenityName = this.dataset.name;

        if (this.checked) {
            amenities[amenityId] = amenityName;
        } else {
            delete amenities[amenityId];
        }

        $(".amenities h4").text(Object.values(amenities).sort().join(", ") || '\u00A0');
    });
});
