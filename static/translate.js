function translate() {
    var append_anchor = $("#append_anchor");
    //clean up all elements we added before
    append_anchor.empty();
    var search_phrase = $("#id_e").val();
    search_phrase = search_phrase.trim();
    if (search_phrase === ""){
        return;
    }
    $.getJSON($SCRIPT_ROOT + '/api/translate', {
        trans_expression: search_phrase
    },
    function(data) {
        var trans_pairs = data.result; // give data a expressive name
        $.each(trans_pairs, function(item) {
            var trans_table = `<tr>
                                <td>${trans_pairs[item][0]}</td>
                                <td>${trans_pairs[item][1]}</td>
                               </tr>`;
            append_anchor.append(trans_table);
        });
    });
};

$(function() {
    // 绑定click事件
    $('#translate').bind('click', translate);
});
