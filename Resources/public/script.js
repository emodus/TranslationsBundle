Array.prototype.diff=function(t){return this.filter(function(a){return t.indexOf(a)<0})},$(document).ready(function(){function t(t,a){var n="";return $.each(a,function(t,a){n+='<option value="'+a+'">'+a+"</option>>"}),t.append(n),t}function a(t,a,n){a.append(n.prop("outerHTML")),t.prepend(a.prop("outerHTML")),$("#"+n.attr("id")).multiselect()}function n(){var t=[{data:"domain"},{data:"key"}];return $.each(p,function(a,n){t.push({data:"messages."+n+".message"})}),t.push({}),t}function e(t,a,n){if(t.html(""),"input"==n)a="[No message]"==a?"":a,t.append('<input class="translation-input" value="'+a+'">'),l=a,t.find("input").focus();else{a=""==a?"[No message]":l;var e=i(a);t.append('<span class="'+e+' translation-message">'+a+"</span>")}}function s(t){$("#tags-container .checkbox").html(""),c.forEach(function(a){$.inArray(a,t)>-1?o(a,!0):o(a,!1)})}function o(t,a){var n="";a&&(n='checked="checked"');var e='<label class="tag-choice"><input type="checkbox" '+n+' name="tags[]" value="'+t+'">'+t+"</label>";$("#tags-container .checkbox").append(e)}function r(t,a){var n="",e=null!=a.status&&"fresh"==a.status?"label-success":"label-danger",s="[No message]"==a.message?"":a.message;return n+='<label class="col-sm-2 control-label" for="translation_'+t+'">'+t+'</label><div class="col-sm-10"><input type="text" name="messages['+t+']" value="'+s+'" class="form-control"/></div>',n+='<label class="col-sm-2 control-label"></label><div class="col-sm-10 translation-form-div">Status: <span class="label '+e+' translation-message-status">'+a.status+"</span></div>"}function i(t){var a="";return"[No message]"==t&&(a="empty-message"),a}var l,c=[],d=[],p=[],u=[];$.ajax({url:Routing.generate("ongr_translations_list_get_initial_data"),success:function(t){p=t.locales,c=t.tags,d=t.domains;for(var a=[],n=2;n<t.locales.length+2;n++)a.push(n);u=a},async:!1});var m=$('<select multiple name="tags[]"/>').attr({id:"tag-select"}),h=$('<select multiple name="domains[]"/>').attr({id:"domain-select"}),g=$("#translations").DataTable({ajax:{url:Routing.generate("ongr_translations_list_get_translations"),data:function(){return{tags:$("#tag-select").val(),domains:$("#domain-select").val()}},dataSrc:""},stateSave:!0,scrollX:!0,columns:n(),columnDefs:[{targets:u,orderable:!1,render:function(t,a,n,e){t=null==t?"[No message]":t;var s=i(t);return'<span class="'+s+' translation-message">'+t+"</span>"}},{targets:-1,orderable:!1,render:function(t,a,n){return'<div class="action-containr"><a class="edit btn btn-primary btn-xs" data-toggle="modal" data-target="#setting-edit">Edit</a>&nbsp;<a class="history btn btn-warning btn-xs" data-name="'+n.name+'">History</a></div>'}}]});m=t(m,c),h=t(h,d);var f=$('<label class="tags-label">Tags: </label>'),v=$('<label class="domains-label">Domains: </label>'),b=$("#translations_filter");a(b,f,m),a(b,v,h),b.parent().removeClass("col-sm-6").addClass("col-sm-9"),$("#translations_length").parent().removeClass("col-sm-6").addClass("col-sm-3"),$("#translations tbody").on("click","span.translation-message",function(){e($(this).parent(),$(this).text(),"input")}),$("#translations tbody").on("keyup","input.translation-input",function(t){if([13,38,40].indexOf(t.keyCode)!=-1){var a=g.row($(this).parents("tr")).data(),n=g.column($(this).parents("td")).index(),s=$(g.column($(this).parents("td")).header()).html(),o=$(this).val(),r=this;l!=o&&($.ajax({url:Routing.generate("ongr_translations_api_update",{id:a.id}),data:'{"messages": {"'+s+'": "'+o+'"}}',method:"post",contentType:"application/json; charset=utf-8",dataType:"json"}),l=o);var i;switch(t.keyCode){case 13:e($(r).parent(),o,"span");break;case 38:i=$(r).parents("tr").prev().find("td")[n],e($(r).parent(),o,"span"),e($(i),$(i).find("span").text(),"input");break;case 40:i=$(r).parents("tr").next().find("td")[n],e($(r).parent(),o,"span"),e($(i),$(i).find("span").text(),"input")}}else 27==t.keyCode&&e($(this).parent(),$(this).val(),"span")}),$("#translations tbody").on("blur","input.translation-input",function(t){e($(this).parent(),$(this).val(),"span")}),$("#translations tbody").on("click","a.edit",function(){var t=g.row($(this).parents("tr")).data().id;$("#translation-id").val(t),$.get(Routing.generate("ongr_translations_api_get",{id:t}),function(t){$("#translation-name-input").val(t.key),$("#translation-domain-input").val(t.domain),$("#translation-created-at-input").val(t.createdAt),$("#translation-updated-at-input").val(t.updatedAt),$("#translation-description-input").val(t.description),$("#messages-container").html(""),s(t.tags);var a="",n=[];$.each(t.messages,function(t,e){n.push(t),a+=r(t,e)});var e=p.diff(n);e.length>0&&$.each(e,function(t,n){a+=r(n,{message:"",status:"fresh"})}),$("#messages-container").append(a)}),$("#translation-form-modal").modal()}),$("#translations tbody").on("click",".history",function(){var t=g.row($(this).parents("tr")).data(),a=$("#history-container");$("#history-key").text(t.key),a.html(""),$.get(Routing.generate("ongr_translations_api_history",{id:t.id}),function(t){return t instanceof Array&&t.length<1?void a.append("<h4>No history</h4>"):void $.each(t,function(t,n){var e=$('<div class="form-group"></div>'),s=$('<div class="col-sm-10"></div>'),o=$('<table class="table"></table>');o.append('<tr style="width: 50%"><th>Message</th><th style="width: 50%">Updated at</th></tr>'),e.append('<label class="col-sm-2 control-label">'+t+"</label>"),$.each(n,function(t,a){o.append("<tr><td>"+a.message+"</td><td>"+a.updatedAt+"</td></tr>")}),s.append(o),e.append(s),a.append(e)})}),$("#history-modal").modal()}),$("#translation-export").on("click",function(t){t.preventDefault(),$("#export-loading").show(),$(".export-dialog").hide();var a,n=$("#export-table"),e="<tr><th>Domain</th><th>Key</th><th>Locale</th><th>Message</th></tr>",s=e;n.html(""),$("#export-nothing-to-export-header").hide(),$("#export-modal").modal(),g.ajax.reload(function(){a=g.rows().data(),$.each(a,function(t,a){$.each(p,function(t,n){"undefined"!=typeof a.messages[n]&&"dirty"==a.messages[n].status&&(s+='<tr class="dirty-translaiton-row"><td>'+a.domain+"</td><td>"+a.key+"</td><td>"+n+"</td><td>"+a.messages[n].message+"</td></tr>")})}),$("#export-loading").hide(),s!=e?n.append(s):$("#export-nothing-to-export-header").show()})}),$("#export-submit").on("click",function(){$.post(Routing.generate("ongr_translations_api_export"),function(t){1==t.error?$("#export-error").show():($("#export-success").show(),$("#export-table").html(""),g.reload())})}),$("#add-new-tag-show-form").on("click",function(){$(this).hide(),$("#add-new-tag-container").show(),$("#add-new-tag-input").focus()}),$("#select-all-tags").on("click",function(){$('#tags-container .checkbox input[type="checkbox"]').prop("checked",!0)}),$("#add-new-tag").on("click",function(){var t=$("#add-new-tag-input"),a=t.val();o(a,!0),$("#tag-select").append("<option>"+a+"</option>").multiselect("destroy").multiselect(),c.push(a),t.val("")}),$("#tag-select").change(function(){g.ajax.reload()}),$("#domain-select").change(function(){g.ajax.reload()}),$("#translation-form-submit").on("click",function(t){t.preventDefault();var a=$("#translation-id").val(),n=$.deparam($("#translation-form").serialize());n=JSON.stringify(n),$.ajax({url:Routing.generate("ongr_translations_api_update",{id:a}),method:"post",data:n,contentType:"application/json; charset=utf-8",dataType:"json",success:function(t){0==t.error?(g.ajax.reload(),$("#translation-form-modal").modal("hide")):($("#translation-form-error-message").html(t.message),$("#translation-form-error").show())}})})});