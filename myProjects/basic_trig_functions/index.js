$(document).ready(runTrig)

function runTrig() {
    //for translating coordinates on a plane using degrees, use the formula tan(y/x)
    //The change in y would be the opposite and the change in x would be the adjacent
    var triangle = {
        total_angle: 180,
        angles: 3,
        sides: 3,
    }
    var menus = {
        find_side: ""
    }
    var calcs = {
        tangent: function (num) {
            return (Math.tan(num));
        },
        cosine: function (num) {
            return (Math.cos(num));
        },
        sine: function (num) {
            return (Math.sin(num));
        },
        arc: {
            tangent: function (num) {
                return (Math.atan(num))
            },
            cosine: function (num) {
                return (Math.acos(num))
            },
            sine: function (num) {
                return (Math.asin(num))
            },
        },
        rad_to_deg: function (num) {
            return (num * 57.2958)
        },
    }

    function changeMenu(menu) {
        $("#menu_area").innerHtml(menus[menu].contents)
    }
}