// ==UserScript==
// @name            Count and remain
// @namespace       http://tampermonkey.net/
// @version         1.4
// @description     Script om te zien welke voertuigen aanrijdend zijn en welke nog nodig zijn
// @author          Kiek
// @match           https://www.meldkamerspel.com/missions/*
// @grant           none
// ==/UserScript==


// hieronder kun je aangeven wat je wilt zien: wat er nog nodig is of wat er onderweg is
var modeRemain = true;
var modeOntheway = false;

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
        check_vehicle_type(getvehicletypeid);
    });

    if(modeOntheway){
        if(ambu > 0 || zambu > 0 ||rr > 0 || ovdg > 0 || mmt > 0){
            $('#missing_text').after('<div class="alert alert-warning" id="vehicleambuodw">Geneeskundevoertuigen onderweg: '+ (ambu > 0 ? ambu + ' Ambulance, ': '') +' '+ (zambu > 0 ? zambu + ' Zorgambulance, ': '') +' '+ (rr > 0 ? rr + ' Rapid Responder, ': '') +' '+ (ovdg > 0 ? ovdg + ' Officier van Dienst Geneeskunde, ': '') +' '+ (mmt > 0 ? mmt + ' MMT auto en/of Heli, ': '') +'</div>');
        }

        if(nh > 0 || polheli > 0 || hond > 0 || ato > 0 || atc > 0 || atm > 0 || ovdp > 0 || meco > 0 || meflex > 0 || tst > 0 || rv > 0 || hv > 0 || daovd > 0 || dahod > 0 || co > 0 || ab > 0 || daags > 0 || pmwvd > 0 || sl > 0 || afoosc > 0 || ct > 0 || wo > 0 || woa > 0){
            $('#missing_text').after('<div class="alert alert-info" id="vehicleodw">Voertuigen onderweg: '+ (nh > 0 ? nh + ' Noodhulpeenheden, ': '') +' '+ (polheli > 0 ? polheli + ' Politiehelikopter, ': '') +' '+ (ovdp > 0 ? ovdp + ' Officieren van Dienst - Politie, ': '') +' '+ (tst > 0 ? tst + ' Tankautospuiten, ': '') +' '+ (rv > 0 ? rv + ' Redvoertuigen, ': '') +' '+ (hv > 0 ? hv + ' Hulpverleningsvoertuig, ': '') +' '+ (ab > 0 ? ab + ' Adembeschermingsvoertuig of haakarmbak, ': '') +' '+ (sl > 0 ? sl + ' Slangenwagen, watertankwagen of gelijkwaardige haakarmbak, ': '') +' '+ (wo > 0 ? wo + ' Waterongevallenvoertuigen / Oppervlaktereddingsteams, ': '') +' '+ (woa > 0 ? woa + ' Waterongevallenaanhangers, ': '') +' '+ (daovd > 0 ? daovd + ' Officieren van Dienst - Brandweer, ': '') +' '+ (ct > 0 ? ct + ' Crashtenders, ': '') +' '+ (afoosc > 0 ? afoosc + ' AFO/OSCs, ': '') +' '+ (hond > 0 ? hond + ' Hondengeleiders, ': '') +' '+ (ato > 0 ? ato + ' AT-Operator, ': '') +' '+ (atc > 0 ? atc + ' AT-Commandant, ': '') +' '+ (atm > 0 ? atm + ' AT-Materiaalwagen, ': '') +' '+ (meflex > 0 ? meflex + ' ME Groepsvoertuigen, ': '') +' '+ (meco > 0 ? meco + ' ME Commandovoertuigen, ': '') +' '+ (dahod > 0 ? dahod + ' Hoofd Officieren van Dienst, ': '') +' '+ (co > 0 ? co + ' Commandowagens, ': '') +' '+ (pmwvd > 0 ? pmwvd + ' Verkenningseenheden, ': '') +' '+ (daags > 0 ? daags + ' Adviseurs Gevaarlijke Stoffen, ': '') +' '+ (davl > 0 ? davl + ' Voorlichters, ': '') +'</div>');
        }
    }

    if(modeRemain){
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
        if(nhneeds > 0 || polhelineeds > 0 || hondneeds > 0 || atoneeds > 0 || atcneeds > 0 || atmneeds > 0 || ovdpneeds > 0 || meconeeds > 0 || meflexneeds > 0 || tsneeds > 0 || rvneeds > 0 || hvneeds > 0 || daovdneeds > 0 || dahodneeds > 0 || coneeds > 0 || abneeds > 0 || daagsneeds > 0 || pmwvdneeds > 0 || slneeds > 0 || afooscneeds > 0 || ctneeds > 0 || woneeds > 0 || woaneeds > 0 || ambuneeds > 0||davlneeds > 0){
            $('#missing_text').after('<div class="alert alert-warning" id="vehicleneeds">Voertuigen nodig: '+ (nhneeds > 0 ? nhneeds + ' Noodhulpeenheden, ': '') +' '+ (polhelineeds > 0 ? polhelineeds + ' Politiehelikopter, ': '') +' '+ (ovdpneeds > 0 ? ovdpneeds + ' Officieren van Dienst - Politie, ': '') +' '+ (tsneeds > 0 ? tsneeds + ' Tankautospuiten, ': '') +' '+ (rvneeds > 0 ? rvneeds + ' Redvoertuigen, ': '') +' '+ (hvneeds > 0 ? hvneeds + ' Hulpverleningsvoertuig, ': '') +' '+ (abneeds > 0 ? abneeds + ' Adembeschermingsvoertuig of haakarmbak, ': '') +' '+ (slneeds > 0 ? slneeds + ' Slangenwagen, watertankwagen of gelijkwaardige haakarmbak, ': '') +' '+ (woneeds > 0 ? woneeds + ' Waterongevallenvoertuigen / Oppervlaktereddingsteams, ': '') +' '+ (woaneeds > 0 ? woaneeds + ' Waterongevallenaanhangers, ': '') +' '+ (daovdneeds > 0 ? daovdneeds + ' Officieren van Dienst - Brandweer, ': '') +' '+ (ctneeds > 0 ? ctneeds + ' Crashtenders, ': '') +' '+ (afooscneeds > 0 ? afooscneeds + ' AFO/OSCs, ': '') +' '+ (hondneeds > 0 ? hondneeds + ' Hondengeleiders, ': '') +' '+ (atoneeds > 0 ? atoneeds + ' AT-Operator, ': '') +' '+ (atcneeds > 0 ? atcneeds + ' AT-Commandant, ': '') +' '+ (atmneeds > 0 ? atmneeds + ' AT-Materiaalwagen, ': '') +' '+ (meflexneeds > 0 ? meflexneeds + ' ME Groepsvoertuigen, ': '') +' '+ (meconeeds > 0 ? meconeeds + ' ME Commandovoertuigen, ': '') +' '+ (dahodneeds > 0 ? dahodneeds + ' Hoofd Officieren van Dienst, ': '') +' '+ (coneeds > 0 ? coneeds + ' Commandowagens, ': '') +' '+ (pmwvdneeds > 0 ? pmwvdneeds + ' Verkenningseenheden, ': '') +' '+ (daagsneeds > 0 ? daagsneeds + ' Adviseurs Gevaarlijke Stoffen, ': '') +' '+ (davlneeds > 0 ? davlneeds + ' Voorlichters, ': '') +' '+ (ambuneeds > 0 ? ambuneeds + ' Ambulances, ': '') +'</div>');
        }else{
            $('#missing_text').after('<div class="alert alert-warning" id="vehicleneeds">Alle benodigde voertuigen zijn onderweg of de benodigde voertuigen zijn nog onbekend</div>');
        }
    }
}else{

}

function check_vehicle_name(vehicle_name,numbers_onway){
    switch(vehicle_name){
        case 'Noodhulpeenheden':
        case 'Noodhulpeenheid':
            nhneeds = numbers_onway - nh;
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
            woaneeds = numbers_onway - woa;
            break;
        case "Officieren van Dienst - Brandweer":
        case "Officier van Dienst - Brandweer":
            daovdneeds = numbers_onway - daovd;
            break;
        case 'Crashtenders':
        case 'Crashtender':
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
        nh++;
        break;
    case '47':
    case '48':
        nh++;
        hond++;
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
