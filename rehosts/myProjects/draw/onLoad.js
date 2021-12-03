$(document).ready(runDraw)

function runDraw() {
    $(document).on('mousedown', handleMouseDown);
    $(document).on('mouseup', handleMouseUp);
    $(document).on('mousemove', handleMouseMove);
    $("#canvas").hover(mouseEnter, mouseLeave)
    //$(document).on('click', handleMouseClick)
}
