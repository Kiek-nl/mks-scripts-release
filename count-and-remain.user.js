// ==UserScript==
// @name            Count and remain
// @version         1.14
// @downloadURL     https://github.com/Kiek-nl/mks-scripts-release/raw/master/count-and-remain.user.js
// @updateURL       https://github.com/Kiek-nl/mks-scripts-release/raw/master/count-and-remain.user.js
// @description     Script om te zien welke voertuigen aanrijdend zijn en welke nog nodig zijn
// @author          Kiek
// @include         https://www.meldkamerspel.com/*
// @include         https://politie.meldkamerspel.com/*
// @grant           none
// @namespace       
// ==/UserScript==

setlocalstorageitems();
setnavitems();
var runscript = false;
runscript = checkurl();

if(runscript){
var tst = 0;
var rv = 0;
var hv = 0;
var daovd = 0;
var dahod = 0;
var co = 0;
var daags = 0;
var ab = 0;
var pmwvd = 0;
var davl = 0;
var sl = 0;
var afoosc = 0;
var ct = 0;
var wo = 0;
var woa = 0;

var nh = 0;
var meflex = 0;
var meco = 0;
var hond = 0;
var ovdp = 0;
var ato = 0;
var atc = 0;
var atm = 0;
var polheli = 0;
var dbbike = 0;
var dbav = 0

var ambu = 0;
var zambu = 0;
var rr = 0;
var ovdg = 0;
var mmt = 0;

var nhneeds = 0;
var ovdpneeds = 0;
var meflexneeds = 0;
var meconeeds = 0;
var hondneeds = 0;
var atoneeds = 0;
var atcneeds = 0;
var atmneeds = 0;
var polhelineeds = 0;
var dbbikeneeds = 0;

var tsneeds = 0;
var rvneeds = 0;
var hvneeds = 0;
var daovdneeds = 0;
var dahodneeds = 0;
var coneeds = 0;
var daagsneeds = 0;
var abneeds = 0;
var pmwvdneeds = 0;
var davlneeds = 0;
var slneeds = 0;
var afooscneeds = 0;
var ctneeds = 0;
var woneeds = 0;
var woaneeds = 0;

var ambuneeds = 0;

if($('#mission_vehicle_driving > tbody > tr').length > 0){

    $('#mission_vehicle_driving > tbody > tr').each(function() {
      var getvehicletypeid = $(this).find("td:eq(1) a").attr('vehicle_type_id');

      if( $(this).find("td:eq(3)").attr('id') === undefined){
        if(localStorage.getItem('modeFromothermissionshow') == 'on'){
          check_vehicle_type(getvehicletypeid);
        }
      }else{
          check_vehicle_type(getvehicletypeid);
      }
    });

    if(localStorage.getItem('modeOntheway') == 'on'){
      var showtext = setmissingtext('onway');
      if(Array.isArray(showtext)){
        if(showtext[1] != ''){
          $('#missing_text').after('<div class="alert alert-warning" id="vehicleambuodw">Geneeskundevoertuigen onderweg: '+ showtext[1] +'</div>');
        }
        if(showtext[0] != ''){
          $('#missing_text').after('<div class="alert alert-info" id="vehicleodw">Voertuigen onderweg: '+ showtext[0] +'</div>');
        }
      }else{
        if(showtext != ''){
          $('#missing_text').after('<div class="alert alert-info" id="vehicleodw">Voertuigen onderweg: '+ showtext +'</div>');
        }
      }
    }

    if(localStorage.getItem('modeRemain') == 'on'){
        var vehicleonlocation = $('#mission_vehicle_at_mission > tbody > tr > td').length;
        var getmissingmessage = $('#missing_text').text().replace(/Benodigde voertuigen:/g, '')
        var missingarray = getmissingmessage.split(",");
        if($.isArray(missingarray)){
            $.each(missingarray, function(index, value) {
                var numbers_onway = value.replace(/[^0-9]/g,'');
                var text_onway = value.replace(/\d+/g, '');
                var vehiclename = $.trim(text_onway);
                vehiclename = vehiclename.replace('.', '');
                check_vehicle_name(vehiclename,numbers_onway);
            });
        }else{
            var numbers_onway = getmissingmessage.replace(/[^0-9]/g,'');
            var text_onway = getmissingmessage.replace(/\d+/g, '');
            var vehiclename = $.trim(text_onway);
            vehiclename = vehiclename.replace('.', '');
            check_vehicle_name(vehiclename,numbers_onway);
        }

        var setmissingtextactive = '';
        if(localStorage.getItem('modeShowneedenter') == 'on'){
            var removeandsetenter = setmissingtext('needs').replace(/, /g, '<br>');
            var setenterback = removeandsetenter.replace('Slangenwagen<br>watertankwagen of gelijkwaardige haakarmbak', 'Slangenwagen, watertankwagen of gelijkwaardige haakarmbak');
            setmissingtextactive = '<br>'+setenterback;
        }else{
            setmissingtextactive = setmissingtext('needs');
        }

        if(nhneeds > 0 || dbbikeneeds > 0 || polhelineeds > 0 || hondneeds > 0 || atoneeds > 0 || atcneeds > 0 || atmneeds > 0 || ovdpneeds > 0 || meconeeds > 0 || meflexneeds > 0 || tsneeds > 0 || rvneeds > 0 || hvneeds > 0 || daovdneeds > 0 || dahodneeds > 0 || coneeds > 0 || abneeds > 0 || daagsneeds > 0 || pmwvdneeds > 0 || slneeds > 0 || afooscneeds > 0 || ctneeds > 0 || woneeds > 0 || woaneeds > 0 || ambuneeds > 0|| davlneeds > 0){
            $('#missing_text').after('<div class="alert alert-warning" id="vehicleneeds">Voertuigen nodig: '+ setmissingtextactive +'</div>');
        }else{
            $('#missing_text').after('<div class="alert alert-warning" id="vehicleneeds">Alle benodigde voertuigen zijn onderweg of de benodigde voertuigen zijn nog onbekend</div>');
        }
    }
}
}

function check_vehicle_name(vehicle_name,numbers_onway){
    switch(vehicle_name){
        case 'Noodhulpeenheden':
        case 'Noodhulpeenheid':
            nhneeds = numbers_onway - nh;
            break;
        case 'Biketeam':
        case 'Biketeams':
            dbbikeneeds = numbers_onway - dbbike;
            break;
        case 'Politiehelikopter':
            polhelineeds = numbers_onway - polheli;
            break;
        case 'Officieren van Dienst - Politie':
        case 'Officier van Dienst - Politie':
            ovdpneeds = numbers_onway - ovdp;
            break;
        case 'Tankautospuiten':
        case 'Tankautospuit':
            tsneeds = numbers_onway - tst;
            break;
        case 'Redvoertuigen':
        case 'Redvoertuig':
            rvneeds = numbers_onway - rv;
            break;
        case 'Hulpverleningsvoertuigen':
        case 'Hulpverleningsvoertuig':
        case 'Hulpverleningvoertuig':
            hvneeds = numbers_onway - hv;
            break;
        case 'Adembeschermingsvoertuig of haakarmbak':
        case 'Adembeschermingsvoertuig of haakarmbak':
            abneeds = numbers_onway - ab;
            break;
        case 'Slangenwagen':
            slneeds = numbers_onway - sl;
            break;
        case 'Waterongevallenvoertuigen / Oppervlaktereddingsteams':
        case 'Waterongevallenvoertuig / Oppervlaktereddingsteam':
            woneeds = numbers_onway - wo;
            break;
        case 'Waterongevallenaanhangers':
        case 'Waterongevallenaanhanger ':
        case 'Waterongevallenaanhanger':
            woaneeds = numbers_onway - woa;
            break;
        case "Officieren van Dienst - Brandweer":
        case "Officier van Dienst - Brandweer":
            daovdneeds = numbers_onway - daovd;
            break;
        case 'Crashtenders':
        case 'Crashtender':
        case 'Crashtender ':
            ctneeds = numbers_onway - ct;
            break;
        case "AFO/OSC's":
        case "AFO/OSC":
            afooscneeds = numbers_onway - afoosc;
            break;
        case "Hondengeleiders":
        case "Hondengeleider":
            hondneeds = numbers_onway - hond;
            break;
        case "ME Groepsvoertuigen":
        case "ME Groepsvoertuig":
            meflexneeds = numbers_onway - meflex;
            break;
        case "ME Commandovoertuigen":
        case "ME Commandovoertuig":
            meconeeds = numbers_onway - meco;
            break;
        case "Hoofd Officieren van Dienst":
        case "Hoofd Officier van Dienst":
            dahodneeds = numbers_onway - dahod;
            break;
        case "Commandowagens":
        case "Commandowagen":
            coneeds = numbers_onway - co;
            break;
        case "Waarschuwings- en Verkenningsdiensten":
        case "Waarschuwings- en Verkenningsdienst":
        case "Verkenningseenheden":
        case "Verkenningseenheid":
            pmwvdneeds = numbers_onway - pmwvd;
            break;
        case "Adviseurs Gevaarlijke Stoffen":
        case "Adviseur Gevaarlijke Stoffen":
            daagsneeds = numbers_onway - daags;
            break;
        case "Voorlichters":
        case "Voorlichter":
            davlneeds = numbers_onway - davl;
            break;
        case "AT Operator":
        case "AT Operators":
            atoneeds = numbers_onway - ato;
            break;
        case "AT Commandant":
        case "AT Commandanten":
            atcneeds = numbers_onway - atc;
            break;
        case "AT Materiaalwagen":
        case "AT Materiaalwagens":
            atmneeds = numbers_onway - atm;
            break;
        case "Ambulances":
        case "Ambulance":
            ambuneeds = numbers_onway - ambu;
            break;

    }
}

function check_vehicle_type(typenumber){
  switch(typenumber){
    /* BRW */
    case '0':
    case '1':
    case '6':
    case '7':
    case '8':
    case '9':
    case '12':
    case '13':
    case '14':
    case '15':
    case '17':
       tst++;
       break;
    case '4':
    case '51':
        hv++;
        break;
    case '2':
    case '18':
        rv++;
        break;
    case '10':
    case '34':
    case '29':
    case '45':
        sl++;
        break;
    case '5':
    case '27':
        ab++;
        break;
    case '24':
        daags++;
        break;
    case '11':
        pmwvd++;
        break;
    case '3':
        daovd++;
        break;
    case '19':
        daovd++;
        dahod++;
        break;
    case '31':
    case '32':
        co++;
        break;
    case '56':
        davl++;
        break;
    /* Vliegtuig*/
    case '44':
        afoosc++;
        break;
    case '41':
    case '42':
    case '43':
        ct++;
        break;
    /* Water*/
    case '36':
        woa++;
        break;
    case '33':
    case '49':
        wo++;
        break;
    case '50':
        wo++;
        tst++;
        break;
    /* POL */
    case '22':
    case '25':
    case '46':
    case '59':
        nh++;
        break;
    case '47':
    case '48':
        nh++;
        hond++;
        break;
    case '60':
        dbbike++;
        nh++;
        break;

    case '35':
        ovdp++;
        break;
    case '39':
        meco++;
        break;
    case '40':
        meflex++;
        break;

    case '28':
        polheli++;
        break;

    case '53':
        atc++;
        break;
    case '54':
        ato++;
        break;
    case '55':
        atm++;
        break;
    case '58':
        dbav++;
        break;

    /* AMBU */
    case '16':
        ambu++;
        break;
    case '30':
        zambu++;
        break;
    case '52':
        rr++;
        break;
    case '38':
        ovdg++;
        break;
    case '57':
        rr++;
        ovdg++;
        break;
    case '23':
    case '37':
        mmt++;
        break;
  }
}

function setmissingtext(showtype){
  var missiontext = '';
  var missiontext_genees = '';
  if(showtype == 'needs'){
    if(nhneeds > 0){
        if(nhneeds > 1){
            missiontext += nhneeds + ' Noodhulpeenheden, ';
        }else{
            missiontext += nhneeds + ' Noodhulpeenheid, ';
        }
    }
    if(polhelineeds > 0){
        if(polhelineeds > 1){
            missiontext += polhelineeds + ' Politiehelikopters, ';
        }else{
            missiontext += polhelineeds + ' Politiehelikopter, ';
        }
    }
    if(ovdpneeds > 0){
      if(ovdpneeds > 1){
        missiontext += ovdpneeds + ' Officieren van Dienst - Politie, ';
      }else{
        missiontext += ovdpneeds + ' Officier van Dienst - Politie, ';
      }
    }
    if(tsneeds > 0){
      if(tsneeds > 1){
        missiontext += tsneeds + ' Tankautospuiten, ';
      }else{
        missiontext += tsneeds + ' Tankautospuit, ';
      }
    }
    if(rvneeds > 0){
      if(rvneeds > 1){
        missiontext += rvneeds + ' Redvoertuigen, ';
      }else{
        missiontext += rvneeds + ' Redvoertuig, ';
      }
    }
    if(hvneeds > 0){
      if(hvneeds > 1){
        missiontext += hvneeds + ' Hulpverleningsvoertuig, ';
      }else{
        missiontext += hvneeds + ' Hulpverleningvoertuig, ';
      }
    }
    if(abneeds > 0){
      if(abneeds > 1){
        missiontext += abneeds + ' Adembeschermingsvoertuigen of haakarmbaken, ';
      }else{
        missiontext += abneeds + ' Adembeschermingsvoertuig of haakarmbak, ';
      }
    }
    if(slneeds > 0){
      if(slneeds > 1){
        missiontext += slneeds + ' Slangenwagen, watertankwagen of gelijkwaardige haakarmbak, ';
      }else{
        missiontext += slneeds + ' Slangenwagen, watertankwagen of gelijkwaardige haakarmbak, ';
      }
    }
    if(woneeds > 0){
      if(woneeds > 1){
        missiontext += woneeds + ' Waterongevallenvoertuigen / Oppervlaktereddingsteams, ';
      }else{
        missiontext += woneeds + ' Waterongevallenvoertuig / Oppervlaktereddingsteam, ';
      }
    }
    if(woaneeds > 0){
      if(woaneeds > 1){
        missiontext += woaneeds + ' Waterongevallenaanhangers, ';
      }else{
        missiontext += woaneeds + ' Waterongevallenaanhanger, ';
      }
    }
    if(daovdneeds > 0){
      if(daovdneeds > 1){
        missiontext += daovdneeds + ' Officieren van Dienst - Brandweer, ';
      }else{
        missiontext += daovdneeds + ' Officier van Dienst - Brandweer, ';
      }
    }
    if(ctneeds > 0){
      if(ctneeds > 1){
        missiontext += ctneeds + ' Crashtenders, ';
      }else{
        missiontext += ctneeds + ' Crashtender, ';
      }
    }
    if(afooscneeds > 0){
      if(afooscneeds > 1){
        missiontext += afooscneeds + " AFO/OSC's, ";
      }else{
        missiontext += afooscneeds + ' AFO/OSC, ';
      }
    }
    if(hondneeds > 0){
      if(hondneeds > 1){
        missiontext += hondneeds + " Hondengeleiders, ";
      }else{
        missiontext += hondneeds + ' Hondengeleider, ';
      }
    }
    if(atoneeds > 0){
      if(atoneeds > 1){
        missiontext += atoneeds + " AT-Operators, ";
      }else{
        missiontext += atoneeds + ' AT-Operator, ';
      }
    }
    if(atcneeds > 0){
      if(atcneeds > 1){
        missiontext += atcneeds + " AT-Commandanten, ";
      }else{
        missiontext += atcneeds + ' AT-Commandant, ';
      }
    }
    if(atmneeds > 0){
      if(atmneeds > 1){
        missiontext += atmneeds + " AT-Materiaalwagens, ";
      }else{
        missiontext += atmneeds + ' AT-Materiaalwagen, ';
      }
    }
    if(meflexneeds > 0){
      if(meflexneeds > 1){
        missiontext += meflexneeds + " ME Groepsvoertuigen, ";
      }else{
        missiontext += meflexneeds + ' ME Groepsvoertuig, ';
      }
    }
    if(meconeeds > 0){
      if(meconeeds > 1){
        missiontext += meconeeds + " ME Commandovoertuigen, ";
      }else{
        missiontext += meconeeds + ' ME Commandovoertuig, ';
      }
    }
    if(dahodneeds > 0){
      if(dahodneeds > 1){
        missiontext += dahodneeds + " Hoofd Officieren van Dienst, ";
      }else{
        missiontext += dahodneeds + ' Hoofd Officier van Dienst, ';
      }
    }
    if(coneeds > 0){
      if(coneeds > 1){
        missiontext += coneeds + " Commandowagens, ";
      }else{
        missiontext += coneeds + ' Commandowagen, ';
      }
    }
    if(pmwvdneeds > 0){
      if(pmwvdneeds > 1){
        missiontext += pmwvdneeds + " Verkenningseenheden, ";
      }else{
        missiontext += pmwvdneeds + ' Verkenningseenheid, ';
      }
    }
    if(daagsneeds > 0){
      if(daagsneeds > 1){
        missiontext += daagsneeds + " Adviseurs Gevaarlijke Stoffen, ";
      }else{
        missiontext += daagsneeds + ' Adviseur Gevaarlijke Stoffen, ';
      }
    }
    if(davlneeds > 0){
      if(davlneeds > 1){
        missiontext += davlneeds + " Voorlichters, ";
      }else{
        missiontext += davlneeds + ' Voorlichter, ';
      }
    }
    //if(localStorage.getItem('modeShowambuown') == 'off'){
      if(ambuneeds > 0){
        if(ambuneeds > 1){
          missiontext += ambuneeds + " Ambulances, ";
        }else{
          missiontext += ambuneeds + ' Ambulance, ';
        }
      }
    //}
    if(dbbikeneeds > 0){
      if(dbbikeneeds > 1){
        missiontext += dbbikeneeds + " Biketeams, ";
      }else{
        missiontext += dbbikeneeds + ' Biketeam, ';
      }
    }
  }

  if(showtype == 'onway'){
    if(nh > 0){
        if(nh > 1){
            missiontext += nh + ' Noodhulpeenheden, ';
        }else{
            missiontext += nh + ' Noodhulpeenheid, ';
        }
    }
    if(polheli > 0){
        if(polheli > 1){
            missiontext += polheli + ' Politiehelikopters, ';
        }else{
            missiontext += polheli + ' Politiehelikopter, ';
        }
    }
    if(ovdp > 0){
      if(ovdp > 1){
        missiontext += ovdp + ' Officieren van Dienst - Politie, ';
      }else{
        missiontext += ovdp + ' Officier van Dienst - Politie, ';
      }
    }
    if(tst > 0){
      if(tst > 1){
        missiontext += tst + ' Tankautospuiten, ';
      }else{
        missiontext += tst + ' Tankautospuit, ';
      }
    }
    if(rv > 0){
      if(rv > 1){
        missiontext += rv + ' Redvoertuigen, ';
      }else{
        missiontext += rv + ' Redvoertuig, ';
      }
    }
    if(hv > 0){
      if(hv > 1){
        missiontext += hv + ' Hulpverleningsvoertuig, ';
      }else{
        missiontext += hv + ' Hulpverleningvoertuig, ';
      }
    }
    if(ab > 0){
      if(ab > 1){
        missiontext += ab + ' Adembeschermingsvoertuigen of haakarmbaken, ';
      }else{
        missiontext += ab + ' Adembeschermingsvoertuig of haakarmbak, ';
      }
    }
    if(sl > 0){
      if(sl > 1){
        missiontext += sl + ' Slangenwagen, watertankwagen of gelijkwaardige haakarmbak, ';
      }else{
        missiontext += sl + ' Slangenwagen, watertankwagen of gelijkwaardige haakarmbak, ';
      }
    }
    if(wo > 0){
      if(wo > 1){
        missiontext += wo + ' Waterongevallenvoertuigen / Oppervlaktereddingsteams, ';
      }else{
        missiontext += wo + ' Waterongevallenvoertuig / Oppervlaktereddingsteam, ';
      }
    }
    if(woa > 0){
      if(woa > 1){
        missiontext += woa + ' Waterongevallenaanhangers, ';
      }else{
        missiontext += woa + ' Waterongevallenaanhanger, ';
      }
    }
    if(daovd > 0){
      if(daovd > 1){
        missiontext += daovd + ' Officieren van Dienst - Brandweer, ';
      }else{
        missiontext += daovd + ' Officier van Dienst - Brandweer, ';
      }
    }
    if(ct > 0){
      if(ct > 1){
        missiontext += ct + ' Crashtenders, ';
      }else{
        missiontext += ct + ' Crashtender, ';
      }
    }
    if(afoosc > 0){
      if(afoosc > 1){
        missiontext += afoosc + " AFO/OSC's, ";
      }else{
        missiontext += afoosc + ' AFO/OSC, ';
      }
    }
    if(hond > 0){
      if(hond > 1){
        missiontext += hond + " Hondengeleiders, ";
      }else{
        missiontext += hond + ' Hondengeleider, ';
      }
    }
    if(ato > 0){
      if(ato > 1){
        missiontext += ato + " AT-Operators, ";
      }else{
        missiontext += ato + ' AT-Operator, ';
      }
    }
    if(atc > 0){
      if(atc > 1){
        missiontext += atc + " AT-Commandanten, ";
      }else{
        missiontext += atc + ' AT-Commandant, ';
      }
    }
    if(atm > 0){
      if(atm > 1){
        missiontext += atm + " AT-Materiaalwagens, ";
      }else{
        missiontext += atm + ' AT-Materiaalwagen, ';
      }
    }
    if(meflex > 0){
      if(meflex > 1){
        missiontext += meflex + " ME Groepsvoertuigen, ";
      }else{
        missiontext += meflex + ' ME Groepsvoertuig, ';
      }
    }
    if(meco > 0){
      if(meco > 1){
        missiontext += meco + " ME Commandovoertuigen, ";
      }else{
        missiontext += meco + ' ME Commandovoertuig, ';
      }
    }
    if(dahod > 0){
      if(dahodneeds > 1){
        missiontext += dahod + " Hoofd Officieren van Dienst, ";
      }else{
        missiontext += dahod + ' Hoofd Officier van Dienst, ';
      }
    }
    if(co > 0){
      if(co > 1){
        missiontext += co + " Commandowagens, ";
      }else{
        missiontext += co + ' Commandowagen, ';
      }
    }
    if(pmwvd > 0){
      if(pmwvd > 1){
        missiontext += pmwvd + " Verkenningseenheden, ";
      }else{
        missiontext += pmwvd + ' Verkenningseenheid, ';
      }
    }
    if(daags > 0){
      if(daags > 1){
        missiontext += daags + " Adviseurs Gevaarlijke Stoffen, ";
      }else{
        missiontext += daags + ' Adviseur Gevaarlijke Stoffen, ';
      }
    }
    if(davl > 0){
      if(davl > 1){
        missiontext += davl + " Voorlichters, ";
      }else{
        missiontext += davl + ' Voorlichter, ';
      }
    }

    if(dbbike > 0){
      if(dbbike > 1){
        missiontext += dbbike + " Biketeams, ";
      }else{
        missiontext += dbbike + ' Biketeam, ';
      }
    }
    if(dbav > 0){
      if(dbav > 1){
        missiontext += dbav + " Dienstbussen Arrestantenvervoer, ";
      }else{
        missiontext += dbav + ' Dienstbus Arrestantenvervoer, ';
      }
    }

    if(ambu > 0){
      if(ambu > 1){
        missiontext_genees += ambu + " Ambulances, ";
      }else{
        missiontext_genees += ambu + ' Ambulance, ';
      }
    }
    if(zambu > 0){
      if(zambu > 1){
        missiontext_genees += zambu + " Zorgambulances, ";
      }else{
        missiontext_genees += zambu + ' Zorgambulance, ';
      }
    }
    if(rr > 0){
      if(rr > 1){
        missiontext_genees += rr + " Rapid Responders, ";
      }else{
        missiontext_genees += rr + ' Rapid Responder, ';
      }
    }
    if(ovdg > 0){
      if(ovdg > 1){
        missiontext_genees += ovdg + " Officieren van Dienst Geneeskunde, ";
      }else{
        missiontext_genees += ovdg + ' Officier van Dienst Geneeskunde, ';
      }
    }
    if(mmt > 0){
      if(mmt > 1){
        missiontext_genees += mmt + " MMT auto's en/of heli's, ";
      }else{
        missiontext_genees += mmt + ' MMT auto en/of Heli, ';
      }
    }

    if(localStorage.getItem('modeShowambuown') == 'off'){
      if(missiontext_genees != ''){
        missiontext += missiontext_genees;
      }
    }else{
      var return_missiontext = missiontext.slice(0, -2);
      if(missiontext_genees != ''){
        var return_missiontext_genees = missiontext_genees.slice(0, -2);
        var multiview = [return_missiontext,return_missiontext_genees];
        return multiview;
      }else{
        return return_missiontext;
      }
    }
  }

  var return_missiontextnow = missiontext.slice(0, -2);
  return return_missiontextnow;

}

function checkurl(){
  var url = window.location.pathname.split("/");
  $.each(url, function(index, value) {
    if(value == 'missions'){
    runscript = true;
    }
  });
  return runscript;
}

function setlocalstorageitems(){
    if(!localStorage.modeRemain){
        localStorage.setItem("modeRemain", 'on');
    }
    if(!localStorage.modeOntheway){
        localStorage.setItem("modeOntheway", 'on');
    }
    if(!localStorage.modeFromothermissionshow){
        localStorage.setItem("modeFromothermissionshow", 'off');
    }
    if(!localStorage.modeShowambuown){
        localStorage.setItem("modeShowambuown", 'off');
    }
    if(!localStorage.modeShowneedenter){
        localStorage.setItem("modeShowneedenter", 'off');
    }
}

function setnavitems(){
  var navstart = '<li id="setcountandremain" class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-road" aria-hidden="true"></span><span class="caret"></span></a><ul class="dropdown-menu">';
  var navend = '</ul></li>';
  var navRemain = '<li><a href="#" id="setModeRemain" data-moderemain="'+ localStorage.getItem('modeRemain') +'" >Toon benodigde voertuigen: <strong><span id="showmodeRemain">'+ (localStorage.getItem('modeRemain') == 'on' ? 'Aan' : 'Uit') +'</span></strong></a></li>';
  var navOntheway = '<li><a href="#" id="setModeOntheway" data-modeOntheway="'+ localStorage.getItem('modeOntheway') +'" >Toon voertuigen onderweg: <strong><span id="showmodeOntheway">'+ (localStorage.getItem('modeOntheway') == 'on' ? 'Aan' : 'Uit') +'</span></strong></a></li>';
  var navFromothermissionshow = '<li><a href="#" id="setModeFromothermissionshow" data-modeFromothermissionshow="'+ localStorage.getItem('modeFromothermissionshow') +'" >Toon doorgealarmeerde voertuigen: <strong><span id="showmodeFromothermissionshow">'+ (localStorage.getItem('modeFromothermissionshow') == 'on' ? 'Aan' : 'Uit') +'</span></strong></a></li>';
  var navShowambuown = '<li><a href="#" id="setModeShowambuown" data-modeShowambuown="'+ localStorage.getItem('modeShowambuown') +'" >Toon geneeskundige voertuigen apart: <strong><span id="showmodeShowambuown">'+ (localStorage.getItem('modeShowambuown') == 'on' ? 'Aan' : 'Uit') +'</span></strong></a></li>';
  var navShowneedenter = '<li><a href="#" id="setModeShowneedenter" data-modeShowneedenter="'+ localStorage.getItem('modeShowneedenter') +'" >Toon in lijst: <strong><span id="showmodeShowneedenter">'+ (localStorage.getItem('modeShowneedenter') == 'on' ? 'Aan' : 'Uit')+'</span></strong></a></li>';
  var navitems = navRemain+''+navOntheway+''+navFromothermissionshow+''+navShowambuown+''+navShowneedenter;
  var navshow = navstart+''+navitems+''+navend;
  $( "#main_navbar #navbar-main-collapse .navbar-right #news_li" ).after(navshow);
}

$("#setModeRemain").click(function(){
  if(localStorage.getItem('modeRemain') == 'on'){
      localStorage.setItem("modeRemain", 'off');
  }else{
      localStorage.setItem("modeRemain", 'on');
  }
  $("#showmodeRemain").html((localStorage.getItem('modeRemain') == 'on' ? 'Aan' : 'Uit'));

});
$("#setModeOntheway").click(function(){
  if(localStorage.getItem('modeOntheway') == 'on'){
      localStorage.setItem("modeOntheway", 'off');
  }else{
      localStorage.setItem("modeOntheway", 'on');
  }
  $("#showmodeOntheway").html((localStorage.getItem('modeOntheway') == 'on' ? 'Aan' : 'Uit'));
});
$("#setModeFromothermissionshow").click(function(){
  if(localStorage.getItem('modeFromothermissionshow') == 'on'){
      localStorage.setItem("modeFromothermissionshow", 'off');
  }else{
      localStorage.setItem("modeFromothermissionshow", 'on');
  }
  $("#showmodeFromothermissionshow").html((localStorage.getItem('modeFromothermissionshow') == 'on' ? 'Aan' : 'Uit'));
});
$("#setModeShowambuown").click(function(){
  if(localStorage.getItem('modeShowambuown') == 'on'){
      localStorage.setItem("modeShowambuown", 'off');
  }else{
      localStorage.setItem("modeShowambuown", 'on');
  }
  $("#showmodeShowambuown").html((localStorage.getItem('modeShowambuown') == 'on' ? 'Aan' : 'Uit'));
});
$("#setModeShowneedenter").click(function(){
  if(localStorage.getItem('modeShowneedenter') == 'on'){
      localStorage.setItem("modeShowneedenter", 'off');
  }else{
      localStorage.setItem("modeShowneedenter", 'on');
  }
  $("#showmodeShowneedenter").html((localStorage.getItem('modeShowneedenter') == 'on' ? 'Aan' : 'Uit'));
});
