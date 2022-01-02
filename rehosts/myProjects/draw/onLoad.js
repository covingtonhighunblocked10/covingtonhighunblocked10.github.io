$(document).ready(runDraw)

function runDraw() {
    $("#canvas").hover(mouseEnter, mouseLeave)
    $(document).on('mousedown', handleMouseDown);
    $(document).on('mouseup', handleMouseUp);
    $(document).on('mousemove', handleMouseMove);
    //$(document).on('click', handleMouseClick)
}