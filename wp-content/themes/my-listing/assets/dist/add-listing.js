!function(e){"function"==typeof define&&define.amd?define("addListing",e):e()}(function(){"use strict";jQuery(function(t){t(".file-upload-field.multiple-uploads .job-manager-uploaded-files").sortable({helper:"clone",appendTo:document.body}),t('.c27-work-hours .day-wrapper .work-hours-type input[type="radio"]').on("change",function(e){t(this).val();t(this).parents(".day-wrapper").removeClass(["day-status-enter-hours","day-status-closed-all-day","day-status-open-all-day","day-status-by-appointment-only"].join(" ")).addClass("day-status-"+t(this).val())})}),jQuery(function(i){var e,o,n={};!function(){var e=i("#submit-job-form .form-section-wrapper");if(!(e.length<=1)){var d=70*window.innerHeight/100,r=5*window.innerHeight/100;i(window).on("scroll",MyListing.Helpers.debounce(function(){var o=[];e.each(function(e,t){var n=t.getBoundingClientRect(),a=d-n.top,i=r-n.top;0<=a&&o.push({el:t,diff:a,max_diff:i})}),e.removeClass("active"),n.Nav.clearAll();var t=!1;o.reverse().forEach(function(e){if(!t)return e.el.classList.add("active"),t=!0,void n.Nav.highlight(e.el.id);e.max_diff<=0&&(e.el.classList.add("active"),n.Nav.highlight(e.el.id))})},20)).scroll()}}(),e=i("#submit-job-form .form-section-wrapper:not(#form-section-submit)"),(o=i(".add-listing-nav")).length&&(n.Nav={clearAll:function(){o.find("li").removeClass("active")},highlight:function(e){var t=o.find("#"+e+"-nav");t.length&&t.addClass("active")}},e.length<=1?o.hide():e.each(function(e,t){var n=i(this).find(".pf-head h5").html();if("string"==typeof n){var a=i('<li id="'+i(this).attr("id")+'-nav"><a href="#"><i><span></span></i>'+n+"</a></li>");a.click(function(e){e.preventDefault(),i("html, body").animate({scrollTop:i(t).offset().top-5*window.innerHeight/100-90})}),o.find("ul").append(a)}}))}),jQuery(function(k){k(".event-picker").each(function(){var t=k(this),e=t.data("dates"),o=t.data("key"),n=t.data("limit"),d="no"!==t.data("timepicker"),M=t.data("l10n"),r=t.find(".dates-list"),a=t.find(".date-add-new"),i=e.length+1,s=t.find(".datetpl").text();function l(){var e=t.find(".single-date").length;n<=e?a.hide():a.show(),e<1&&c()}function c(){u({start:"",end:"",repeat:!1,frequency:2,unit:"weeks",until:moment().add(1,"years").locale("en").format("YYYY-MM-DD"),index:i++})}function u(e){var t=k(s.replace(/{date}/g,o+"["+e.index+"]")),f=t.find(".is-recurring input"),p=t.find(".date-start input"),m=t.find(".date-end input"),g=t.find(".repeat-frequency input"),h=t.find(".repeat-unit"),v=t.find(".repeat-message"),y=t.find(".repeat-end input");function n(){if(f.prop("checked")){var e=p.val(),t=m.val(),n=y.val(),a=parseInt(g.val(),10),i=h.find("input:checked").val();if(e.length&&t.length&&n.length&&a){e=moment(e),t=moment(t),(n=moment(n)).set({hour:23,minute:59,second:59}),"weeks"===i&&(i="days",a*=7),"years"===i&&(i="months",a*=12);for(var o=Math.abs(e.diff(n,i)),d=Math.floor(o/a),r=[],s=1;s<Math.min(d+1,6);s++){var l=e.clone().add(a*s,i),c=t.clone().add(a*s,i);r.push("".concat(l.format(CASE27.l10n.datepicker.format)," - ").concat(c.format(CASE27.l10n.datepicker.format)))}var u=M.next_five.replace("%d",d);d<1?u=M.no_recurrences:d<5&&(u=M.next_recurrences),v.show().html("<span>".concat(u,"</span><ul><li>").concat(r.join("</li><li>"),"</li></ul>"))}else v.hide()}}p.val(e.start),m.val(e.end),f.prop("checked",e.repeat),g.val(e.frequency),h.find('input[value="'.concat(e.unit,'"]')).prop("checked",!0),y.val(e.until),e.repeat&&t.find(".recurrence").addClass("is-open"),f.on("change",function(){n(),k(this).prop("checked")?t.find(".recurrence").addClass("is-open"):t.find(".recurrence").removeClass("is-open")});new MyListing.Datepicker(p,{timepicker:d});var a=new MyListing.Datepicker(m,{timepicker:d}),i=new MyListing.Datepicker(y);e.start&&t.find(".date-start").removeClass("date-empty"),e.end&&t.find(".date-end").removeClass("date-empty"),p.on("datepicker:change",function(e){a.setMinDate(moment(e.detail.value)),i.setMinDate(moment(e.detail.value)),n(),e.detail.value?t.find(".date-start").removeClass("date-empty"):t.find(".date-start").addClass("date-empty")}),m.on("datepicker:change",function(e){n(),e.detail.value?t.find(".date-end").removeClass("date-empty"):t.find(".date-end").addClass("date-empty")}),y.on("datepicker:change",n),g.on("input",n),h.find("input").on("change",n),n(),r.append(t)}e.forEach(function(e,t){u({start:e.start,end:e.end,repeat:e.repeat,frequency:e.repeat?e.frequency:2,unit:e.repeat?e.unit:"weeks",until:e.repeat?e.until:moment(e.start).add(1,"years").locale("en").format("YYYY-MM-DD"),index:t})}),e.length||c(),a.click(function(e){e.preventDefault(),u({start:"",end:"",repeat:!1,frequency:2,unit:"weeks",until:moment().add(1,"years").locale("en").format("YYYY-MM-DD"),index:i++}),l()}),k(this).on("click",".remove-date",function(e){e.preventDefault(),k(this).parents(".single-date").remove(),l()}),l()})}),jQuery(function(v){MyListing.Maps&&MyListing.Maps.loaded&&(v(".repeater-custom").each(function(e,t){var g=parseInt(v(t).data("max"),10),h=v(t).find(".add-location");v(t).repeater({initEmpty:!0,ready:function(e){},hide:function(e){e(),v("div[data-repeater-item] > .location-field-wrapper").length>=g?h.hide():h.show()},show:function(){var e=this;v(e).show();var t=v("div[data-repeater-item] > .location-field-wrapper");t.length>=g?h.hide():h.show(),v(t).attr("data-index",t.length-1),v(t).find(".location-picker-custom-map").attr("id",t.length-1),new MyListing.Maps.Map(v(e).find(".c27-custom-map").get(0)),new MyListing.Maps.Autocomplete(v(e).find(".address-field").get(0));var n=v(e).find(".location-field-wrapper"),a=v(e).find(".location-picker-custom-map").attr("id"),i=MyListing.Maps.getInstance(a).instance;v(e).find(".cts-custom-get-location").on("click",function(e){e.preventDefault();var t=jQuery(jQuery(this).parents(".repeater-item"));t.find(".cts-custom-get-location").length&&(i&&MyListing.Geocoder.setMap(i.instance),MyListing.Geocoder.getUserLocation({receivedAddress:function(e){if(t.find(".address-field").val(e.address),t.find(".address-field").data("autocomplete"))return t.find(".address-field").data("autocomplete").fireChangeEvent(e)}}))});var o=n.data("options"),d=n.find(".location-coords"),r=n.find(".latitude-input"),s=n.find(".longitude-input"),l=n.find(".address-field"),c=n.find('.lock-pin input[type="checkbox"]'),u=n.find(".enter-coordinates-toggle > span"),f=new MyListing.Maps.Marker({position:m(),map:i,template:{type:"traditional"}});function p(){var e=m();f.setPosition(e),i.panTo(e),""!==r.val().trim()&&""!==s.val().trim()&&(r.val(e.getLatitude()),s.val(e.getLongitude()))}function m(){return r.val().trim()&&s.val().trim()?new MyListing.Maps.LatLng(r.val(),s.val()):new MyListing.Maps.LatLng(o["default-lat"],o["default-lng"])}i.addListener("click",function(e){if(!c.prop("checked")){var t=i.getClickPosition(e);f.setPosition(t),r.val(t.getLatitude()),s.val(t.getLongitude()),MyListing.Geocoder.geocode(t.toGeocoderFormat(),function(e){e&&l.val(e.address)})}}),l.on("autocomplete:change",function(e){if(!c.prop("checked")&&e.detail.place&&e.detail.place.latitude&&e.detail.place.longitude){var t=new MyListing.Maps.LatLng(e.detail.place.latitude,e.detail.place.longitude);f.setPosition(t),r.val(e.detail.place.latitude),s.val(e.detail.place.longitude),i.panTo(t)}}),i.addListenerOnce("idle",function(e){i.setZoom(o["default-zoom"])}),c.on("change",function(e){i.trigger("resize"),i.setCenter(m())}).change(),u.click(function(e){d.toggleClass("hide")}),r.blur(p),s.blur(p)}}).setList(v(t).data("list"))}),jQuery(".field-type-location .address-field").each(function(e,t){new MyListing.Maps.Autocomplete(t)}),jQuery(".cts-custom-get-location").each(function(e,t){jQuery(t).on("click",function(e){e.preventDefault();var t=jQuery(jQuery(this).parent(".repeater-item")),n=null;t.find(".cts-custom-get-location").length&&((n=MyListing.Maps.getInstance(jQuery(this)))&&MyListing.Geocoder.setMap(n.instance),MyListing.Geocoder.getUserLocation({receivedAddress:function(e){if(t.find(".cts-custom-get-location").val(e.address),t.find(".cts-custom-get-location").data("autocomplete"))return t.find(".cts-custom-get-location").data("autocomplete").fireChangeEvent(e)}}))})}))}),jQuery(function(t){t(".file-upload-field").on("click touchstart",".job-manager-remove-uploaded-file",function(){return t(this).closest(".job-manager-uploaded-file").remove(),!1}),t("#submit-job-form").on("submit",function(e){t(".add-listing-loader").show().removeClass("loader-hidden")})})});
