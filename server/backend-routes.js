module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var Router = __webpack_require__(2);
	var Route = Router.Route;

	var IntlMixin = __webpack_require__(3);

	var Docs = __webpack_require__(11);
	var Home = __webpack_require__(64);
	var Introduction = __webpack_require__(82);
	var Design = __webpack_require__(84);
	var Develop = __webpack_require__(130);

	var DocsRouter = React.createClass({
	  displayName: 'DocsRouter',

	  mixins: [IntlMixin],
	  render: function render() {
	    return React.createElement(Docs, null);
	  }
	});

	module.exports = function (rootPath) {
	  return React.createElement(
	    Route,
	    { name: 'docs', path: rootPath, handler: DocsRouter },
	    React.createElement(Route, { name: 'home', path: rootPath, handler: Home }),
	    React.createElement(Route, { name: 'introduction', handler: Introduction }),
	    Design.routes(),
	    Develop.routes()
	  );
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var supportedLocales = ['en-US', 'pt-BR'];

	function localesSupported() {
	  return global.Intl && supportedLocales.every(function (locale) {
	    return Intl.NumberFormat.supportedLocalesOf(locale)[0] === locale && Intl.DateTimeFormat.supportedLocalesOf(locale)[0] === locale;
	  });
	}

	if (!localesSupported()) {
	  __webpack_require__(4);
	  __webpack_require__(5);
	  __webpack_require__(6);
	  Intl.NumberFormat = IntlPolyfill.NumberFormat;
	  Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
	}

	var React = __webpack_require__(1);
	var ReactIntl = __webpack_require__(7);
	var IntlMixin = ReactIntl.IntlMixin;
	var FormattedDate = ReactIntl.FormattedDate;

	module.exports = {
	  mixins: [IntlMixin],

	  getChildContext: function getChildContext() {
	    if (!this.props.locales && !this.context.locales) {
	      this.context.locales = 'en-US';
	    }

	    if (!this.props.messages && !this.context.messages) {
	      try {
	        this.context.messages = __webpack_require__(8)("./" + (this.props.locales || this.context.locales || 'en-US'));
	      } catch (e) {
	        this.context.messages = __webpack_require__(9);
	      }
	    }
	  },

	  getGrommetFormattedDate: function getGrommetFormattedDate(date) {
	    return React.createElement(FormattedDate, {
	      value: new Date(date),
	      weekday: 'long',
	      day: 'numeric',
	      month: 'long',
	      year: 'numeric',
	      hour: 'numeric',
	      minute: 'numeric',
	      second: 'numeric' });
	  },

	  getGrommetIntlMessage: function getGrommetIntlMessage(messageKey) {
	    var message = messageKey;
	    if (messageKey) {
	      try {
	        message = this.getIntlMessage(messageKey);
	      } catch (e) {
	        message = messageKey;
	      }
	    }
	    return message;
	  }
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("intl");

/***/ },
/* 5 */
/***/ function(module, exports) {

	IntlPolyfill.__addLocaleData({locale:"en-US",date:{ca:["gregory","buddhist","chinese","coptic","dangi","ethioaa","ethiopic","generic","hebrew","indian","islamic","islamicc","japanese","persian","roc"],hourNo0:true,hour12:true,formats:{medium:"{1}, {0}",availableFormats:{"E":"ccc",EHm:"E HH:mm",EHms:"E HH:mm:ss",Ed:"d E",Ehm:"E h:mm a",Ehms:"E h:mm:ss a",Gy:"y G",GyMMM:"MMM y G",GyMMMEd:"E, MMM d, y G",GyMMMd:"MMM d, y G","H":"HH",Hm:"HH:mm",Hms:"HH:mm:ss",Hmsv:"HH:mm:ss v",Hmv:"HH:mm v","M":"L",MEd:"E, M/d",MMM:"LLL",MMMEd:"E, MMM d",MMMd:"MMM d",Md:"M/d","d":"d","h":"h a",hm:"h:mm a",hms:"h:mm:ss a",hmsv:"h:mm:ss a v",hmv:"h:mm a v",ms:"mm:ss","y":"y",yM:"M/y",yMEd:"E, M/d/y",yMMM:"MMM y",yMMMEd:"E, MMM d, y",yMMMd:"MMM d, y",yMd:"M/d/y",yQQQ:"QQQ y",yQQQQ:"QQQQ y"},dateFormats:{full:"EEEE, MMMM d, y",long:"MMMM d, y",medium:"MMM d, y",short:"M/d/yy"},timeFormats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"}},calendars:{buddhist:{months:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],short:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],long:["January","February","March","April","May","June","July","August","September","October","November","December"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["BE"],short:["BE"],long:["BE"]},dayPeriods:{am:"AM",pm:"PM"}},chinese:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12"],short:["Mo1","Mo2","Mo3","Mo4","Mo5","Mo6","Mo7","Mo8","Mo9","Mo10","Mo11","Mo12"],long:["Month1","Month2","Month3","Month4","Month5","Month6","Month7","Month8","Month9","Month10","Month11","Month12"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},dayPeriods:{am:"AM",pm:"PM"}},coptic:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12","13"],short:["Tout","Baba","Hator","Kiahk","Toba","Amshir","Baramhat","Baramouda","Bashans","Paona","Epep","Mesra","Nasie"],long:["Tout","Baba","Hator","Kiahk","Toba","Amshir","Baramhat","Baramouda","Bashans","Paona","Epep","Mesra","Nasie"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["ERA0","ERA1"],short:["ERA0","ERA1"],long:["ERA0","ERA1"]},dayPeriods:{am:"AM",pm:"PM"}},dangi:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12"],short:["Mo1","Mo2","Mo3","Mo4","Mo5","Mo6","Mo7","Mo8","Mo9","Mo10","Mo11","Mo12"],long:["Month1","Month2","Month3","Month4","Month5","Month6","Month7","Month8","Month9","Month10","Month11","Month12"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},dayPeriods:{am:"AM",pm:"PM"}},ethiopic:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12","13"],short:["Meskerem","Tekemt","Hedar","Tahsas","Ter","Yekatit","Megabit","Miazia","Genbot","Sene","Hamle","Nehasse","Pagumen"],long:["Meskerem","Tekemt","Hedar","Tahsas","Ter","Yekatit","Megabit","Miazia","Genbot","Sene","Hamle","Nehasse","Pagumen"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["ERA0","ERA1"],short:["ERA0","ERA1"],long:["ERA0","ERA1"]},dayPeriods:{am:"AM",pm:"PM"}},ethioaa:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12","13"],short:["Meskerem","Tekemt","Hedar","Tahsas","Ter","Yekatit","Megabit","Miazia","Genbot","Sene","Hamle","Nehasse","Pagumen"],long:["Meskerem","Tekemt","Hedar","Tahsas","Ter","Yekatit","Megabit","Miazia","Genbot","Sene","Hamle","Nehasse","Pagumen"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["ERA0"],short:["ERA0"],long:["ERA0"]},dayPeriods:{am:"AM",pm:"PM"}},generic:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12"],short:["M01","M02","M03","M04","M05","M06","M07","M08","M09","M10","M11","M12"],long:["M01","M02","M03","M04","M05","M06","M07","M08","M09","M10","M11","M12"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["ERA0","ERA1"],short:["ERA0","ERA1"],long:["ERA0","ERA1"]},dayPeriods:{am:"AM",pm:"PM"}},gregory:{months:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],short:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],long:["January","February","March","April","May","June","July","August","September","October","November","December"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["B","A","BCE","CE"],short:["BC","AD","BCE","CE"],long:["Before Christ","Anno Domini","Before Common Era","Common Era"]},dayPeriods:{am:"AM",pm:"PM"}},hebrew:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12","13","7"],short:["Tishri","Heshvan","Kislev","Tevet","Shevat","Adar I","Adar","Nisan","Iyar","Sivan","Tamuz","Av","Elul","Adar II"],long:["Tishri","Heshvan","Kislev","Tevet","Shevat","Adar I","Adar","Nisan","Iyar","Sivan","Tamuz","Av","Elul","Adar II"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["AM"],short:["AM"],long:["AM"]},dayPeriods:{am:"AM",pm:"PM"}},indian:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12"],short:["Chaitra","Vaisakha","Jyaistha","Asadha","Sravana","Bhadra","Asvina","Kartika","Agrahayana","Pausa","Magha","Phalguna"],long:["Chaitra","Vaisakha","Jyaistha","Asadha","Sravana","Bhadra","Asvina","Kartika","Agrahayana","Pausa","Magha","Phalguna"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["Saka"],short:["Saka"],long:["Saka"]},dayPeriods:{am:"AM",pm:"PM"}},islamic:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12"],short:["Muh.","Saf.","Rab. I","Rab. II","Jum. I","Jum. II","Raj.","Sha.","Ram.","Shaw.","Dhuʻl-Q.","Dhuʻl-H."],long:["Muharram","Safar","Rabiʻ I","Rabiʻ II","Jumada I","Jumada II","Rajab","Shaʻban","Ramadan","Shawwal","Dhuʻl-Qiʻdah","Dhuʻl-Hijjah"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["AH"],short:["AH"],long:["AH"]},dayPeriods:{am:"AM",pm:"PM"}},islamicc:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12"],short:["Muh.","Saf.","Rab. I","Rab. II","Jum. I","Jum. II","Raj.","Sha.","Ram.","Shaw.","Dhuʻl-Q.","Dhuʻl-H."],long:["Muharram","Safar","Rabiʻ I","Rabiʻ II","Jumada I","Jumada II","Rajab","Shaʻban","Ramadan","Shawwal","Dhuʻl-Qiʻdah","Dhuʻl-Hijjah"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["AH"],short:["AH"],long:["AH"]},dayPeriods:{am:"AM",pm:"PM"}},japanese:{months:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],short:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],long:["January","February","March","April","May","June","July","August","September","October","November","December"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["Taika (645-650)","Hakuchi (650-671)","Hakuhō (672-686)","Shuchō (686-701)","Taihō (701-704)","Keiun (704-708)","Wadō (708-715)","Reiki (715-717)","Yōrō (717-724)","Jinki (724-729)","Tempyō (729-749)","Tempyō-kampō (749-749)","Tempyō-shōhō (749-757)","Tempyō-hōji (757-765)","Temphō-jingo (765-767)","Jingo-keiun (767-770)","Hōki (770-780)","Ten-ō (781-782)","Enryaku (782-806)","Daidō (806-810)","Kōnin (810-824)","Tenchō (824-834)","Jōwa (834-848)","Kajō (848-851)","Ninju (851-854)","Saiko (854-857)","Tennan (857-859)","Jōgan (859-877)","Genkei (877-885)","Ninna (885-889)","Kampyō (889-898)","Shōtai (898-901)","Engi (901-923)","Enchō (923-931)","Shōhei (931-938)","Tengyō (938-947)","Tenryaku (947-957)","Tentoku (957-961)","Ōwa (961-964)","Kōhō (964-968)","Anna (968-970)","Tenroku (970-973)","Ten-en (973-976)","Jōgen (976-978)","Tengen (978-983)","Eikan (983-985)","Kanna (985-987)","Ei-en (987-989)","Eiso (989-990)","Shōryaku (990-995)","Chōtoku (995-999)","Chōhō (999-1004)","Kankō (1004-1012)","Chōwa (1012-1017)","Kannin (1017-1021)","Jian (1021-1024)","Manju (1024-1028)","Chōgen (1028-1037)","Chōryaku (1037-1040)","Chōkyū (1040-1044)","Kantoku (1044-1046)","Eishō (1046-1053)","Tengi (1053-1058)","Kōhei (1058-1065)","Jiryaku (1065-1069)","Enkyū (1069-1074)","Shōho (1074-1077)","Shōryaku (1077-1081)","Eiho (1081-1084)","Ōtoku (1084-1087)","Kanji (1087-1094)","Kaho (1094-1096)","Eichō (1096-1097)","Shōtoku (1097-1099)","Kōwa (1099-1104)","Chōji (1104-1106)","Kashō (1106-1108)","Tennin (1108-1110)","Ten-ei (1110-1113)","Eikyū (1113-1118)","Gen-ei (1118-1120)","Hoan (1120-1124)","Tenji (1124-1126)","Daiji (1126-1131)","Tenshō (1131-1132)","Chōshō (1132-1135)","Hoen (1135-1141)","Eiji (1141-1142)","Kōji (1142-1144)","Tenyō (1144-1145)","Kyūan (1145-1151)","Ninpei (1151-1154)","Kyūju (1154-1156)","Hogen (1156-1159)","Heiji (1159-1160)","Eiryaku (1160-1161)","Ōho (1161-1163)","Chōkan (1163-1165)","Eiman (1165-1166)","Nin-an (1166-1169)","Kaō (1169-1171)","Shōan (1171-1175)","Angen (1175-1177)","Jishō (1177-1181)","Yōwa (1181-1182)","Juei (1182-1184)","Genryuku (1184-1185)","Bunji (1185-1190)","Kenkyū (1190-1199)","Shōji (1199-1201)","Kennin (1201-1204)","Genkyū (1204-1206)","Ken-ei (1206-1207)","Shōgen (1207-1211)","Kenryaku (1211-1213)","Kenpō (1213-1219)","Shōkyū (1219-1222)","Jōō (1222-1224)","Gennin (1224-1225)","Karoku (1225-1227)","Antei (1227-1229)","Kanki (1229-1232)","Jōei (1232-1233)","Tempuku (1233-1234)","Bunryaku (1234-1235)","Katei (1235-1238)","Ryakunin (1238-1239)","En-ō (1239-1240)","Ninji (1240-1243)","Kangen (1243-1247)","Hōji (1247-1249)","Kenchō (1249-1256)","Kōgen (1256-1257)","Shōka (1257-1259)","Shōgen (1259-1260)","Bun-ō (1260-1261)","Kōchō (1261-1264)","Bun-ei (1264-1275)","Kenji (1275-1278)","Kōan (1278-1288)","Shōō (1288-1293)","Einin (1293-1299)","Shōan (1299-1302)","Kengen (1302-1303)","Kagen (1303-1306)","Tokuji (1306-1308)","Enkei (1308-1311)","Ōchō (1311-1312)","Shōwa (1312-1317)","Bunpō (1317-1319)","Genō (1319-1321)","Genkyō (1321-1324)","Shōchū (1324-1326)","Kareki (1326-1329)","Gentoku (1329-1331)","Genkō (1331-1334)","Kemmu (1334-1336)","Engen (1336-1340)","Kōkoku (1340-1346)","Shōhei (1346-1370)","Kentoku (1370-1372)","Bunchũ (1372-1375)","Tenju (1375-1379)","Kōryaku (1379-1381)","Kōwa (1381-1384)","Genchũ (1384-1392)","Meitoku (1384-1387)","Kakei (1387-1389)","Kōō (1389-1390)","Meitoku (1390-1394)","Ōei (1394-1428)","Shōchō (1428-1429)","Eikyō (1429-1441)","Kakitsu (1441-1444)","Bun-an (1444-1449)","Hōtoku (1449-1452)","Kyōtoku (1452-1455)","Kōshō (1455-1457)","Chōroku (1457-1460)","Kanshō (1460-1466)","Bunshō (1466-1467)","Ōnin (1467-1469)","Bunmei (1469-1487)","Chōkyō (1487-1489)","Entoku (1489-1492)","Meiō (1492-1501)","Bunki (1501-1504)","Eishō (1504-1521)","Taiei (1521-1528)","Kyōroku (1528-1532)","Tenmon (1532-1555)","Kōji (1555-1558)","Eiroku (1558-1570)","Genki (1570-1573)","Tenshō (1573-1592)","Bunroku (1592-1596)","Keichō (1596-1615)","Genwa (1615-1624)","Kan-ei (1624-1644)","Shōho (1644-1648)","Keian (1648-1652)","Shōō (1652-1655)","Meiryaku (1655-1658)","Manji (1658-1661)","Kanbun (1661-1673)","Enpō (1673-1681)","Tenwa (1681-1684)","Jōkyō (1684-1688)","Genroku (1688-1704)","Hōei (1704-1711)","Shōtoku (1711-1716)","Kyōhō (1716-1736)","Genbun (1736-1741)","Kanpō (1741-1744)","Enkyō (1744-1748)","Kan-en (1748-1751)","Hōryaku (1751-1764)","Meiwa (1764-1772)","An-ei (1772-1781)","Tenmei (1781-1789)","Kansei (1789-1801)","Kyōwa (1801-1804)","Bunka (1804-1818)","Bunsei (1818-1830)","Tenpō (1830-1844)","Kōka (1844-1848)","Kaei (1848-1854)","Ansei (1854-1860)","Man-en (1860-1861)","Bunkyū (1861-1864)","Genji (1864-1865)","Keiō (1865-1868)","M","T","S","H"],short:["Taika (645-650)","Hakuchi (650-671)","Hakuhō (672-686)","Shuchō (686-701)","Taihō (701-704)","Keiun (704-708)","Wadō (708-715)","Reiki (715-717)","Yōrō (717-724)","Jinki (724-729)","Tempyō (729-749)","Tempyō-kampō (749-749)","Tempyō-shōhō (749-757)","Tempyō-hōji (757-765)","Temphō-jingo (765-767)","Jingo-keiun (767-770)","Hōki (770-780)","Ten-ō (781-782)","Enryaku (782-806)","Daidō (806-810)","Kōnin (810-824)","Tenchō (824-834)","Jōwa (834-848)","Kajō (848-851)","Ninju (851-854)","Saiko (854-857)","Tennan (857-859)","Jōgan (859-877)","Genkei (877-885)","Ninna (885-889)","Kampyō (889-898)","Shōtai (898-901)","Engi (901-923)","Enchō (923-931)","Shōhei (931-938)","Tengyō (938-947)","Tenryaku (947-957)","Tentoku (957-961)","Ōwa (961-964)","Kōhō (964-968)","Anna (968-970)","Tenroku (970-973)","Ten-en (973-976)","Jōgen (976-978)","Tengen (978-983)","Eikan (983-985)","Kanna (985-987)","Ei-en (987-989)","Eiso (989-990)","Shōryaku (990-995)","Chōtoku (995-999)","Chōhō (999-1004)","Kankō (1004-1012)","Chōwa (1012-1017)","Kannin (1017-1021)","Jian (1021-1024)","Manju (1024-1028)","Chōgen (1028-1037)","Chōryaku (1037-1040)","Chōkyū (1040-1044)","Kantoku (1044-1046)","Eishō (1046-1053)","Tengi (1053-1058)","Kōhei (1058-1065)","Jiryaku (1065-1069)","Enkyū (1069-1074)","Shōho (1074-1077)","Shōryaku (1077-1081)","Eiho (1081-1084)","Ōtoku (1084-1087)","Kanji (1087-1094)","Kaho (1094-1096)","Eichō (1096-1097)","Shōtoku (1097-1099)","Kōwa (1099-1104)","Chōji (1104-1106)","Kashō (1106-1108)","Tennin (1108-1110)","Ten-ei (1110-1113)","Eikyū (1113-1118)","Gen-ei (1118-1120)","Hoan (1120-1124)","Tenji (1124-1126)","Daiji (1126-1131)","Tenshō (1131-1132)","Chōshō (1132-1135)","Hoen (1135-1141)","Eiji (1141-1142)","Kōji (1142-1144)","Tenyō (1144-1145)","Kyūan (1145-1151)","Ninpei (1151-1154)","Kyūju (1154-1156)","Hogen (1156-1159)","Heiji (1159-1160)","Eiryaku (1160-1161)","Ōho (1161-1163)","Chōkan (1163-1165)","Eiman (1165-1166)","Nin-an (1166-1169)","Kaō (1169-1171)","Shōan (1171-1175)","Angen (1175-1177)","Jishō (1177-1181)","Yōwa (1181-1182)","Juei (1182-1184)","Genryuku (1184-1185)","Bunji (1185-1190)","Kenkyū (1190-1199)","Shōji (1199-1201)","Kennin (1201-1204)","Genkyū (1204-1206)","Ken-ei (1206-1207)","Shōgen (1207-1211)","Kenryaku (1211-1213)","Kenpō (1213-1219)","Shōkyū (1219-1222)","Jōō (1222-1224)","Gennin (1224-1225)","Karoku (1225-1227)","Antei (1227-1229)","Kanki (1229-1232)","Jōei (1232-1233)","Tempuku (1233-1234)","Bunryaku (1234-1235)","Katei (1235-1238)","Ryakunin (1238-1239)","En-ō (1239-1240)","Ninji (1240-1243)","Kangen (1243-1247)","Hōji (1247-1249)","Kenchō (1249-1256)","Kōgen (1256-1257)","Shōka (1257-1259)","Shōgen (1259-1260)","Bun-ō (1260-1261)","Kōchō (1261-1264)","Bun-ei (1264-1275)","Kenji (1275-1278)","Kōan (1278-1288)","Shōō (1288-1293)","Einin (1293-1299)","Shōan (1299-1302)","Kengen (1302-1303)","Kagen (1303-1306)","Tokuji (1306-1308)","Enkei (1308-1311)","Ōchō (1311-1312)","Shōwa (1312-1317)","Bunpō (1317-1319)","Genō (1319-1321)","Genkyō (1321-1324)","Shōchū (1324-1326)","Kareki (1326-1329)","Gentoku (1329-1331)","Genkō (1331-1334)","Kemmu (1334-1336)","Engen (1336-1340)","Kōkoku (1340-1346)","Shōhei (1346-1370)","Kentoku (1370-1372)","Bunchū (1372-1375)","Tenju (1375-1379)","Kōryaku (1379-1381)","Kōwa (1381-1384)","Genchū (1384-1392)","Meitoku (1384-1387)","Kakei (1387-1389)","Kōō (1389-1390)","Meitoku (1390-1394)","Ōei (1394-1428)","Shōchō (1428-1429)","Eikyō (1429-1441)","Kakitsu (1441-1444)","Bun-an (1444-1449)","Hōtoku (1449-1452)","Kyōtoku (1452-1455)","Kōshō (1455-1457)","Chōroku (1457-1460)","Kanshō (1460-1466)","Bunshō (1466-1467)","Ōnin (1467-1469)","Bunmei (1469-1487)","Chōkyō (1487-1489)","Entoku (1489-1492)","Meiō (1492-1501)","Bunki (1501-1504)","Eishō (1504-1521)","Taiei (1521-1528)","Kyōroku (1528-1532)","Tenmon (1532-1555)","Kōji (1555-1558)","Eiroku (1558-1570)","Genki (1570-1573)","Tenshō (1573-1592)","Bunroku (1592-1596)","Keichō (1596-1615)","Genwa (1615-1624)","Kan-ei (1624-1644)","Shōho (1644-1648)","Keian (1648-1652)","Shōō (1652-1655)","Meiryaku (1655-1658)","Manji (1658-1661)","Kanbun (1661-1673)","Enpō (1673-1681)","Tenwa (1681-1684)","Jōkyō (1684-1688)","Genroku (1688-1704)","Hōei (1704-1711)","Shōtoku (1711-1716)","Kyōhō (1716-1736)","Genbun (1736-1741)","Kanpō (1741-1744)","Enkyō (1744-1748)","Kan-en (1748-1751)","Hōryaku (1751-1764)","Meiwa (1764-1772)","An-ei (1772-1781)","Tenmei (1781-1789)","Kansei (1789-1801)","Kyōwa (1801-1804)","Bunka (1804-1818)","Bunsei (1818-1830)","Tenpō (1830-1844)","Kōka (1844-1848)","Kaei (1848-1854)","Ansei (1854-1860)","Man-en (1860-1861)","Bunkyū (1861-1864)","Genji (1864-1865)","Keiō (1865-1868)","Meiji","Taishō","Shōwa","Heisei"],long:["Taika (645-650)","Hakuchi (650-671)","Hakuhō (672-686)","Shuchō (686-701)","Taihō (701-704)","Keiun (704-708)","Wadō (708-715)","Reiki (715-717)","Yōrō (717-724)","Jinki (724-729)","Tempyō (729-749)","Tempyō-kampō (749-749)","Tempyō-shōhō (749-757)","Tempyō-hōji (757-765)","Temphō-jingo (765-767)","Jingo-keiun (767-770)","Hōki (770-780)","Ten-ō (781-782)","Enryaku (782-806)","Daidō (806-810)","Kōnin (810-824)","Tenchō (824-834)","Jōwa (834-848)","Kajō (848-851)","Ninju (851-854)","Saiko (854-857)","Tennan (857-859)","Jōgan (859-877)","Genkei (877-885)","Ninna (885-889)","Kampyō (889-898)","Shōtai (898-901)","Engi (901-923)","Enchō (923-931)","Shōhei (931-938)","Tengyō (938-947)","Tenryaku (947-957)","Tentoku (957-961)","Ōwa (961-964)","Kōhō (964-968)","Anna (968-970)","Tenroku (970-973)","Ten-en (973-976)","Jōgen (976-978)","Tengen (978-983)","Eikan (983-985)","Kanna (985-987)","Ei-en (987-989)","Eiso (989-990)","Shōryaku (990-995)","Chōtoku (995-999)","Chōhō (999-1004)","Kankō (1004-1012)","Chōwa (1012-1017)","Kannin (1017-1021)","Jian (1021-1024)","Manju (1024-1028)","Chōgen (1028-1037)","Chōryaku (1037-1040)","Chōkyū (1040-1044)","Kantoku (1044-1046)","Eishō (1046-1053)","Tengi (1053-1058)","Kōhei (1058-1065)","Jiryaku (1065-1069)","Enkyū (1069-1074)","Shōho (1074-1077)","Shōryaku (1077-1081)","Eiho (1081-1084)","Ōtoku (1084-1087)","Kanji (1087-1094)","Kaho (1094-1096)","Eichō (1096-1097)","Shōtoku (1097-1099)","Kōwa (1099-1104)","Chōji (1104-1106)","Kashō (1106-1108)","Tennin (1108-1110)","Ten-ei (1110-1113)","Eikyū (1113-1118)","Gen-ei (1118-1120)","Hoan (1120-1124)","Tenji (1124-1126)","Daiji (1126-1131)","Tenshō (1131-1132)","Chōshō (1132-1135)","Hoen (1135-1141)","Eiji (1141-1142)","Kōji (1142-1144)","Tenyō (1144-1145)","Kyūan (1145-1151)","Ninpei (1151-1154)","Kyūju (1154-1156)","Hogen (1156-1159)","Heiji (1159-1160)","Eiryaku (1160-1161)","Ōho (1161-1163)","Chōkan (1163-1165)","Eiman (1165-1166)","Nin-an (1166-1169)","Kaō (1169-1171)","Shōan (1171-1175)","Angen (1175-1177)","Jishō (1177-1181)","Yōwa (1181-1182)","Juei (1182-1184)","Genryuku (1184-1185)","Bunji (1185-1190)","Kenkyū (1190-1199)","Shōji (1199-1201)","Kennin (1201-1204)","Genkyū (1204-1206)","Ken-ei (1206-1207)","Shōgen (1207-1211)","Kenryaku (1211-1213)","Kenpō (1213-1219)","Shōkyū (1219-1222)","Jōō (1222-1224)","Gennin (1224-1225)","Karoku (1225-1227)","Antei (1227-1229)","Kanki (1229-1232)","Jōei (1232-1233)","Tempuku (1233-1234)","Bunryaku (1234-1235)","Katei (1235-1238)","Ryakunin (1238-1239)","En-ō (1239-1240)","Ninji (1240-1243)","Kangen (1243-1247)","Hōji (1247-1249)","Kenchō (1249-1256)","Kōgen (1256-1257)","Shōka (1257-1259)","Shōgen (1259-1260)","Bun-ō (1260-1261)","Kōchō (1261-1264)","Bun-ei (1264-1275)","Kenji (1275-1278)","Kōan (1278-1288)","Shōō (1288-1293)","Einin (1293-1299)","Shōan (1299-1302)","Kengen (1302-1303)","Kagen (1303-1306)","Tokuji (1306-1308)","Enkei (1308-1311)","Ōchō (1311-1312)","Shōwa (1312-1317)","Bunpō (1317-1319)","Genō (1319-1321)","Genkyō (1321-1324)","Shōchū (1324-1326)","Kareki (1326-1329)","Gentoku (1329-1331)","Genkō (1331-1334)","Kemmu (1334-1336)","Engen (1336-1340)","Kōkoku (1340-1346)","Shōhei (1346-1370)","Kentoku (1370-1372)","Bunchū (1372-1375)","Tenju (1375-1379)","Kōryaku (1379-1381)","Kōwa (1381-1384)","Genchū (1384-1392)","Meitoku (1384-1387)","Kakei (1387-1389)","Kōō (1389-1390)","Meitoku (1390-1394)","Ōei (1394-1428)","Shōchō (1428-1429)","Eikyō (1429-1441)","Kakitsu (1441-1444)","Bun-an (1444-1449)","Hōtoku (1449-1452)","Kyōtoku (1452-1455)","Kōshō (1455-1457)","Chōroku (1457-1460)","Kanshō (1460-1466)","Bunshō (1466-1467)","Ōnin (1467-1469)","Bunmei (1469-1487)","Chōkyō (1487-1489)","Entoku (1489-1492)","Meiō (1492-1501)","Bunki (1501-1504)","Eishō (1504-1521)","Taiei (1521-1528)","Kyōroku (1528-1532)","Tenmon (1532-1555)","Kōji (1555-1558)","Eiroku (1558-1570)","Genki (1570-1573)","Tenshō (1573-1592)","Bunroku (1592-1596)","Keichō (1596-1615)","Genwa (1615-1624)","Kan-ei (1624-1644)","Shōho (1644-1648)","Keian (1648-1652)","Shōō (1652-1655)","Meiryaku (1655-1658)","Manji (1658-1661)","Kanbun (1661-1673)","Enpō (1673-1681)","Tenwa (1681-1684)","Jōkyō (1684-1688)","Genroku (1688-1704)","Hōei (1704-1711)","Shōtoku (1711-1716)","Kyōhō (1716-1736)","Genbun (1736-1741)","Kanpō (1741-1744)","Enkyō (1744-1748)","Kan-en (1748-1751)","Hōryaku (1751-1764)","Meiwa (1764-1772)","An-ei (1772-1781)","Tenmei (1781-1789)","Kansei (1789-1801)","Kyōwa (1801-1804)","Bunka (1804-1818)","Bunsei (1818-1830)","Tenpō (1830-1844)","Kōka (1844-1848)","Kaei (1848-1854)","Ansei (1854-1860)","Man-en (1860-1861)","Bunkyū (1861-1864)","Genji (1864-1865)","Keiō (1865-1868)","Meiji","Taishō","Shōwa","Heisei"]},dayPeriods:{am:"AM",pm:"PM"}},persian:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12"],short:["Farvardin","Ordibehesht","Khordad","Tir","Mordad","Shahrivar","Mehr","Aban","Azar","Dey","Bahman","Esfand"],long:["Farvardin","Ordibehesht","Khordad","Tir","Mordad","Shahrivar","Mehr","Aban","Azar","Dey","Bahman","Esfand"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["AP"],short:["AP"],long:["AP"]},dayPeriods:{am:"AM",pm:"PM"}},roc:{months:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],short:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],long:["January","February","March","April","May","June","July","August","September","October","November","December"]},days:{narrow:["S","M","T","W","T","F","S"],short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],long:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},eras:{narrow:["Before R.O.C.","Minguo"],short:["Before R.O.C.","Minguo"],long:["Before R.O.C.","Minguo"]},dayPeriods:{am:"AM",pm:"PM"}}}},number:{nu:["latn"],patterns:{decimal:{positivePattern:"{number}",negativePattern:"-{number}"},currency:{positivePattern:"{currency}{number}",negativePattern:"-{currency}{number}"},percent:{positivePattern:"{number}%",negativePattern:"-{number}%"}},symbols:{latn:{decimal:".",group:",",nan:"NaN",percent:"%",infinity:"∞"}},currencies:{AUD:"A$",BRL:"R$",CAD:"CA$",CNY:"CN¥",EUR:"€",GBP:"£",HKD:"HK$",ILS:"₪",INR:"₹",JPY:"¥",KRW:"₩",MXN:"MX$",NZD:"NZ$",TWD:"NT$",USD:"$",VND:"₫",XAF:"FCFA",XCD:"EC$",XOF:"CFA",XPF:"CFPF"}}});

/***/ },
/* 6 */
/***/ function(module, exports) {

	IntlPolyfill.__addLocaleData({locale:"pt-BR",date:{ca:["gregory","buddhist","chinese","coptic","dangi","ethioaa","ethiopic","generic","hebrew","indian","islamic","islamicc","japanese","persian","roc"],hourNo0:true,hour12:false,formats:{medium:"{1} {0}",availableFormats:{"E":"ccc",EHm:"E, HH:mm",EHms:"E, HH:mm:ss",Ed:"E, d",Ehm:"E, h:mm a",Ehms:"E, h:mm:ss a",Gy:"y G",GyMMM:"MMM 'de' y G",GyMMMEd:"E, d 'de' MMM 'de' y G",GyMMMd:"d 'de' MMM 'de' y G","H":"HH",Hm:"HH:mm",Hms:"HH:mm:ss",Hmsv:"HH:mm:ss v",Hmv:"HH:mm v","M":"L",MEd:"E, dd/MM",MMM:"LLL",MMMEd:"E, d 'de' MMM",MMMd:"d 'de' MMM",MMdd:"dd/MM",Md:"d/M","d":"d","h":"h a",hm:"h:mm a",hms:"h:mm:ss a",hmsv:"h:mm:ss a v",hmv:"h:mm a v",ms:"mm:ss","y":"y",yM:"MM/y",yMEd:"E, dd/MM/y",yMM:"MM/y",yMMM:"MMM 'de' y",yMMMEd:"E, d 'de' MMM 'de' y",yMMMd:"d 'de' MMM 'de' y",yMd:"dd/MM/y",yQQQ:"y QQQ",yQQQQ:"y QQQQ"},dateFormats:{full:"EEEE, d 'de' MMMM 'de' y",long:"d 'de' MMMM 'de' y",medium:"d 'de' MMM 'de' y",short:"dd/MM/yy"},timeFormats:{full:"HH:mm:ss zzzz",long:"HH:mm:ss z",medium:"HH:mm:ss",short:"HH:mm"}},calendars:{buddhist:{months:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],short:["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],long:["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"]},days:{narrow:["D","S","T","Q","Q","S","S"],short:["dom","seg","ter","qua","qui","sex","sáb"],long:["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"]},eras:{narrow:["BE"],short:["BE"],long:["BE"]},dayPeriods:{am:"AM",pm:"PM"}},chinese:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12"],short:["Mês 1","Mês 2","Mês 3","Mês 4","Mês 5","Mês 6","Mês 7","Mês 8","Mês 9","Mês 10","Mês 11","Mês 12"],long:["Mês 1","Mês 2","Mês 3","Mês 4","Mês 5","Mês 6","Mês 7","Mês 8","Mês 9","Mês 10","Mês 11","Mês 12"]},days:{narrow:["D","S","T","Q","Q","S","S"],short:["dom","seg","ter","qua","qui","sex","sáb"],long:["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"]},dayPeriods:{am:"AM",pm:"PM"}},coptic:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12","13"],short:["Tout","Baba","Hator","Kiahk","Toba","Amshir","Baramhat","Baramouda","Bashans","Paona","Epep","Mesra","Nasie"],long:["Tout","Baba","Hator","Kiahk","Toba","Amshir","Baramhat","Baramouda","Bashans","Paona","Epep","Mesra","Nasie"]},days:{narrow:["D","S","T","Q","Q","S","S"],short:["dom","seg","ter","qua","qui","sex","sáb"],long:["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"]},eras:{narrow:["ERA0","ERA1"],short:["ERA0","ERA1"],long:["ERA0","ERA1"]},dayPeriods:{am:"AM",pm:"PM"}},dangi:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12"],short:["Mês 1","Mês 2","Mês 3","Mês 4","Mês 5","Mês 6","Mês 7","Mês 8","Mês 9","Mês 10","Mês 11","Mês 12"],long:["Mês 1","Mês 2","Mês 3","Mês 4","Mês 5","Mês 6","Mês 7","Mês 8","Mês 9","Mês 10","Mês 11","Mês 12"]},days:{narrow:["D","S","T","Q","Q","S","S"],short:["dom","seg","ter","qua","qui","sex","sáb"],long:["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"]},dayPeriods:{am:"AM",pm:"PM"}},ethiopic:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12","13"],short:["Meskerem","Tekemt","Hedar","Tahsas","Ter","Yekatit","Megabit","Miazia","Genbot","Sene","Hamle","Nehasse","Pagumen"],long:["Meskerem","Tekemt","Hedar","Tahsas","Ter","Yekatit","Megabit","Miazia","Genbot","Sene","Hamle","Nehasse","Pagumen"]},days:{narrow:["D","S","T","Q","Q","S","S"],short:["dom","seg","ter","qua","qui","sex","sáb"],long:["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"]},eras:{narrow:["ERA0","ERA1"],short:["ERA0","ERA1"],long:["ERA0","ERA1"]},dayPeriods:{am:"AM",pm:"PM"}},ethioaa:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12","13"],short:["Meskerem","Tekemt","Hedar","Tahsas","Ter","Yekatit","Megabit","Miazia","Genbot","Sene","Hamle","Nehasse","Pagumen"],long:["Meskerem","Tekemt","Hedar","Tahsas","Ter","Yekatit","Megabit","Miazia","Genbot","Sene","Hamle","Nehasse","Pagumen"]},days:{narrow:["D","S","T","Q","Q","S","S"],short:["dom","seg","ter","qua","qui","sex","sáb"],long:["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"]},eras:{narrow:["ERA0"],short:["ERA0"],long:["ERA0"]},dayPeriods:{am:"AM",pm:"PM"}},generic:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12"],short:["M01","M02","M03","M04","M05","M06","M07","M08","M09","M10","M11","M12"],long:["M01","M02","M03","M04","M05","M06","M07","M08","M09","M10","M11","M12"]},days:{narrow:["D","S","T","Q","Q","S","S"],short:["dom","seg","ter","qua","qui","sex","sáb"],long:["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"]},eras:{narrow:["ERA0","ERA1"],short:["ERA0","ERA1"],long:["ERA0","ERA1"]},dayPeriods:{am:"AM",pm:"PM"}},gregory:{months:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],short:["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],long:["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"]},days:{narrow:["D","S","T","Q","Q","S","S"],short:["dom","seg","ter","qua","qui","sex","sáb"],long:["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"]},eras:{narrow:["a.C.","d.C.","AEC","EC"],short:["a.C.","d.C.","AEC","EC"],long:["Antes de Cristo","Ano do Senhor","Antes da Era Comum","Era Comum"]},dayPeriods:{am:"AM",pm:"PM"}},hebrew:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12","13","7"],short:["Tishri","Heshvan","Kislev","Tevet","Shevat","Adar I","Adar","Nisan","Iyar","Sivan","Tamuz","Av","Elul","Adar II"],long:["Tishri","Heshvan","Kislev","Tevet","Shevat","Adar I","Adar","Nisan","Iyar","Sivan","Tamuz","Av","Elul","Adar II"]},days:{narrow:["D","S","T","Q","Q","S","S"],short:["dom","seg","ter","qua","qui","sex","sáb"],long:["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"]},eras:{narrow:["AM"],short:["AM"],long:["AM"]},dayPeriods:{am:"AM",pm:"PM"}},indian:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12"],short:["Chaitra","Vaisakha","Jyaistha","Asadha","Sravana","Bhadra","Asvina","Kartika","Agrahayana","Pausa","Magha","Phalguna"],long:["Chaitra","Vaisakha","Jyaistha","Asadha","Sravana","Bhadra","Asvina","Kartika","Agrahayana","Pausa","Magha","Phalguna"]},days:{narrow:["D","S","T","Q","Q","S","S"],short:["dom","seg","ter","qua","qui","sex","sáb"],long:["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"]},eras:{narrow:["Saka"],short:["Saka"],long:["Saka"]},dayPeriods:{am:"AM",pm:"PM"}},islamic:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12"],short:["Muh.","Saf.","Rab. I","Rab. II","Jum. I","Jum. II","Raj.","Sha.","Ram.","Shaw.","Dhuʻl-Q.","Dhuʻl-H."],long:["Muharram","Safar","Rabiʻ I","Rabiʻ II","Jumada I","Jumada II","Rajab","Shaʻban","Ramadan","Shawwal","Dhuʻl-Qiʻdah","Dhuʻl-Hijjah"]},days:{narrow:["D","S","T","Q","Q","S","S"],short:["dom","seg","ter","qua","qui","sex","sáb"],long:["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"]},eras:{narrow:["AH"],short:["AH"],long:["AH"]},dayPeriods:{am:"AM",pm:"PM"}},islamicc:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12"],short:["Muh.","Saf.","Rab. I","Rab. II","Jum. I","Jum. II","Raj.","Sha.","Ram.","Shaw.","Dhuʻl-Q.","Dhuʻl-H."],long:["Muharram","Safar","Rabiʻ I","Rabiʻ II","Jumada I","Jumada II","Rajab","Shaʻban","Ramadan","Shawwal","Dhuʻl-Qiʻdah","Dhuʻl-Hijjah"]},days:{narrow:["D","S","T","Q","Q","S","S"],short:["dom","seg","ter","qua","qui","sex","sáb"],long:["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"]},eras:{narrow:["AH"],short:["AH"],long:["AH"]},dayPeriods:{am:"AM",pm:"PM"}},japanese:{months:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],short:["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],long:["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"]},days:{narrow:["D","S","T","Q","Q","S","S"],short:["dom","seg","ter","qua","qui","sex","sáb"],long:["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"]},eras:{narrow:["Taika (645-650)","Hakuchi (650-671)","Hakuhō (672-686)","Shuchō (686-701)","Taihō (701-704)","Keiun (704-708)","Wadō (708-715)","Reiki (715-717)","Yōrō (717-724)","Jinki (724-729)","Tempyō (729-749)","Tempyō-kampō (749-749)","Tempyō-shōhō (749-757)","Tempyō-hōji (757-765)","Temphō-jingo (765-767)","Jingo-keiun (767-770)","Hōki (770-780)","Ten-ō (781-782)","Enryaku (782-806)","Daidō (806-810)","Kōnin (810-824)","Tenchō (824-834)","Jōwa (834-848)","Kajō (848-851)","Ninju (851-854)","Saiko (854-857)","Tennan (857-859)","Jōgan (859-877)","Genkei (877-885)","Ninna (885-889)","Kampyō (889-898)","Shōtai (898-901)","Engi (901-923)","Enchō (923-931)","Shōhei (931-938)","Tengyō (938-947)","Tenryaku (947-957)","Tentoku (957-961)","Ōwa (961-964)","Kōhō (964-968)","Anna (968-970)","Tenroku (970-973)","Ten-en (973-976)","Jōgen (976-978)","Tengen (978-983)","Eikan (983-985)","Kanna (985-987)","Ei-en (987-989)","Eiso (989-990)","Shōryaku (990-995)","Chōtoku (995-999)","Chōhō (999-1004)","Kankō (1004-1012)","Chōwa (1012-1017)","Kannin (1017-1021)","Jian (1021-1024)","Manju (1024-1028)","Chōgen (1028-1037)","Chōryaku (1037-1040)","Chōkyū (1040-1044)","Kantoku (1044-1046)","Eishō (1046-1053)","Tengi (1053-1058)","Kōhei (1058-1065)","Jiryaku (1065-1069)","Enkyū (1069-1074)","Shōho (1074-1077)","Shōryaku (1077-1081)","Eiho (1081-1084)","Ōtoku (1084-1087)","Kanji (1087-1094)","Kaho (1094-1096)","Eichō (1096-1097)","Shōtoku (1097-1099)","Kōwa (1099-1104)","Chōji (1104-1106)","Kashō (1106-1108)","Tennin (1108-1110)","Ten-ei (1110-1113)","Eikyū (1113-1118)","Gen-ei (1118-1120)","Hoan (1120-1124)","Tenji (1124-1126)","Daiji (1126-1131)","Tenshō (1131-1132)","Chōshō (1132-1135)","Hoen (1135-1141)","Eiji (1141-1142)","Kōji (1142-1144)","Tenyō (1144-1145)","Kyūan (1145-1151)","Ninpei (1151-1154)","Kyūju (1154-1156)","Hogen (1156-1159)","Heiji (1159-1160)","Eiryaku (1160-1161)","Ōho (1161-1163)","Chōkan (1163-1165)","Eiman (1165-1166)","Nin-an (1166-1169)","Kaō (1169-1171)","Shōan (1171-1175)","Angen (1175-1177)","Jishō (1177-1181)","Yōwa (1181-1182)","Juei (1182-1184)","Genryuku (1184-1185)","Bunji (1185-1190)","Kenkyū (1190-1199)","Shōji (1199-1201)","Kennin (1201-1204)","Genkyū (1204-1206)","Ken-ei (1206-1207)","Shōgen (1207-1211)","Kenryaku (1211-1213)","Kenpō (1213-1219)","Shōkyū (1219-1222)","Jōō (1222-1224)","Gennin (1224-1225)","Karoku (1225-1227)","Antei (1227-1229)","Kanki (1229-1232)","Jōei (1232-1233)","Tempuku (1233-1234)","Bunryaku (1234-1235)","Katei (1235-1238)","Ryakunin (1238-1239)","En-ō (1239-1240)","Ninji (1240-1243)","Kangen (1243-1247)","Hōji (1247-1249)","Kenchō (1249-1256)","Kōgen (1256-1257)","Shōka (1257-1259)","Shōgen (1259-1260)","Bun-ō (1260-1261)","Kōchō (1261-1264)","Bun-ei (1264-1275)","Kenji (1275-1278)","Kōan (1278-1288)","Shōō (1288-1293)","Einin (1293-1299)","Shōan (1299-1302)","Kengen (1302-1303)","Kagen (1303-1306)","Tokuji (1306-1308)","Enkei (1308-1311)","Ōchō (1311-1312)","Shōwa (1312-1317)","Bunpō (1317-1319)","Genō (1319-1321)","Genkyō (1321-1324)","Shōchū (1324-1326)","Kareki (1326-1329)","Gentoku (1329-1331)","Genkō (1331-1334)","Kemmu (1334-1336)","Engen (1336-1340)","Kōkoku (1340-1346)","Shōhei (1346-1370)","Kentoku (1370-1372)","Bunchũ (1372-1375)","Tenju (1375-1379)","Kōryaku (1379-1381)","Kōwa (1381-1384)","Genchũ (1384-1392)","Meitoku (1384-1387)","Kakei (1387-1389)","Kōō (1389-1390)","Meitoku (1390-1394)","Ōei (1394-1428)","Shōchō (1428-1429)","Eikyō (1429-1441)","Kakitsu (1441-1444)","Bun-an (1444-1449)","Hōtoku (1449-1452)","Kyōtoku (1452-1455)","Kōshō (1455-1457)","Chōroku (1457-1460)","Kanshō (1460-1466)","Bunshō (1466-1467)","Ōnin (1467-1469)","Bunmei (1469-1487)","Chōkyō (1487-1489)","Entoku (1489-1492)","Meiō (1492-1501)","Bunki (1501-1504)","Eishō (1504-1521)","Taiei (1521-1528)","Kyōroku (1528-1532)","Tenmon (1532-1555)","Kōji (1555-1558)","Eiroku (1558-1570)","Genki (1570-1573)","Tenshō (1573-1592)","Bunroku (1592-1596)","Keichō (1596-1615)","Genwa (1615-1624)","Kan-ei (1624-1644)","Shōho (1644-1648)","Keian (1648-1652)","Shōō (1652-1655)","Meiryaku (1655-1658)","Manji (1658-1661)","Kanbun (1661-1673)","Enpō (1673-1681)","Tenwa (1681-1684)","Jōkyō (1684-1688)","Genroku (1688-1704)","Hōei (1704-1711)","Shōtoku (1711-1716)","Kyōhō (1716-1736)","Genbun (1736-1741)","Kanpō (1741-1744)","Enkyō (1744-1748)","Kan-en (1748-1751)","Hōryaku (1751-1764)","Meiwa (1764-1772)","An-ei (1772-1781)","Tenmei (1781-1789)","Kansei (1789-1801)","Kyōwa (1801-1804)","Bunka (1804-1818)","Bunsei (1818-1830)","Tenpō (1830-1844)","Kōka (1844-1848)","Kaei (1848-1854)","Ansei (1854-1860)","Man-en (1860-1861)","Bunkyū (1861-1864)","Genji (1864-1865)","Keiō (1865-1868)","M","T","S","H"],short:["Taika (645-650)","Hakuchi (650-671)","Hakuhō (672-686)","Shuchō (686-701)","Taihō (701-704)","Keiun (704-708)","Wadō (708-715)","Reiki (715-717)","Yōrō (717-724)","Jinki (724-729)","Tempyō (729-749)","Tempyō-kampō (749-749)","Tempyō-shōhō (749-757)","Tempyō-hōji (757-765)","Temphō-jingo (765-767)","Jingo-keiun (767-770)","Hōki (770-780)","Ten-ō (781-782)","Enryaku (782-806)","Daidō (806-810)","Kōnin (810-824)","Tenchō (824-834)","Jōwa (834-848)","Kajō (848-851)","Ninju (851-854)","Saiko (854-857)","Tennan (857-859)","Jōgan (859-877)","Genkei (877-885)","Ninna (885-889)","Kampyō (889-898)","Shōtai (898-901)","Engi (901-923)","Enchō (923-931)","Shōhei (931-938)","Tengyō (938-947)","Tenryaku (947-957)","Tentoku (957-961)","Ōwa (961-964)","Kōhō (964-968)","Anna (968-970)","Tenroku (970-973)","Ten-en (973-976)","Jōgen (976-978)","Tengen (978-983)","Eikan (983-985)","Kanna (985-987)","Ei-en (987-989)","Eiso (989-990)","Shōryaku (990-995)","Chōtoku (995-999)","Chōhō (999-1004)","Kankō (1004-1012)","Chōwa (1012-1017)","Kannin (1017-1021)","Jian (1021-1024)","Manju (1024-1028)","Chōgen (1028-1037)","Chōryaku (1037-1040)","Chōkyū (1040-1044)","Kantoku (1044-1046)","Eishō (1046-1053)","Tengi (1053-1058)","Kōhei (1058-1065)","Jiryaku (1065-1069)","Enkyū (1069-1074)","Shōho (1074-1077)","Shōryaku (1077-1081)","Eiho (1081-1084)","Ōtoku (1084-1087)","Kanji (1087-1094)","Kaho (1094-1096)","Eichō (1096-1097)","Shōtoku (1097-1099)","Kōwa (1099-1104)","Chōji (1104-1106)","Kashō (1106-1108)","Tennin (1108-1110)","Ten-ei (1110-1113)","Eikyū (1113-1118)","Gen-ei (1118-1120)","Hoan (1120-1124)","Tenji (1124-1126)","Daiji (1126-1131)","Tenshō (1131-1132)","Chōshō (1132-1135)","Hoen (1135-1141)","Eiji (1141-1142)","Kōji (1142-1144)","Tenyō (1144-1145)","Kyūan (1145-1151)","Ninpei (1151-1154)","Kyūju (1154-1156)","Hogen (1156-1159)","Heiji (1159-1160)","Eiryaku (1160-1161)","Ōho (1161-1163)","Chōkan (1163-1165)","Eiman (1165-1166)","Nin-an (1166-1169)","Kaō (1169-1171)","Shōan (1171-1175)","Angen (1175-1177)","Jishō (1177-1181)","Yōwa (1181-1182)","Juei (1182-1184)","Genryuku (1184-1185)","Bunji (1185-1190)","Kenkyū (1190-1199)","Shōji (1199-1201)","Kennin (1201-1204)","Genkyū (1204-1206)","Ken-ei (1206-1207)","Shōgen (1207-1211)","Kenryaku (1211-1213)","Kenpō (1213-1219)","Shōkyū (1219-1222)","Jōō (1222-1224)","Gennin (1224-1225)","Karoku (1225-1227)","Antei (1227-1229)","Kanki (1229-1232)","Jōei (1232-1233)","Tempuku (1233-1234)","Bunryaku (1234-1235)","Katei (1235-1238)","Ryakunin (1238-1239)","En-ō (1239-1240)","Ninji (1240-1243)","Kangen (1243-1247)","Hōji (1247-1249)","Kenchō (1249-1256)","Kōgen (1256-1257)","Shōka (1257-1259)","Shōgen (1259-1260)","Bun-ō (1260-1261)","Kōchō (1261-1264)","Bun-ei (1264-1275)","Kenji (1275-1278)","Kōan (1278-1288)","Shōō (1288-1293)","Einin (1293-1299)","Shōan (1299-1302)","Kengen (1302-1303)","Kagen (1303-1306)","Tokuji (1306-1308)","Enkei (1308-1311)","Ōchō (1311-1312)","Shōwa (1312-1317)","Bunpō (1317-1319)","Genō (1319-1321)","Genkyō (1321-1324)","Shōchū (1324-1326)","Kareki (1326-1329)","Gentoku (1329-1331)","Genkō (1331-1334)","Kemmu (1334-1336)","Engen (1336-1340)","Kōkoku (1340-1346)","Shōhei (1346-1370)","Kentoku (1370-1372)","Bunchū (1372-1375)","Tenju (1375-1379)","Kōryaku (1379-1381)","Kōwa (1381-1384)","Genchū (1384-1392)","Meitoku (1384-1387)","Kakei (1387-1389)","Kōō (1389-1390)","Meitoku (1390-1394)","Ōei (1394-1428)","Shōchō (1428-1429)","Eikyō (1429-1441)","Kakitsu (1441-1444)","Bun-an (1444-1449)","Hōtoku (1449-1452)","Kyōtoku (1452-1455)","Kōshō (1455-1457)","Chōroku (1457-1460)","Kanshō (1460-1466)","Bunshō (1466-1467)","Ōnin (1467-1469)","Bunmei (1469-1487)","Chōkyō (1487-1489)","Entoku (1489-1492)","Meiō (1492-1501)","Bunki (1501-1504)","Eishō (1504-1521)","Taiei (1521-1528)","Kyōroku (1528-1532)","Tenmon (1532-1555)","Kōji (1555-1558)","Eiroku (1558-1570)","Genki (1570-1573)","Tenshō (1573-1592)","Bunroku (1592-1596)","Keichō (1596-1615)","Genwa (1615-1624)","Kan-ei (1624-1644)","Shōho (1644-1648)","Keian (1648-1652)","Shōō (1652-1655)","Meiryaku (1655-1658)","Manji (1658-1661)","Kanbun (1661-1673)","Enpō (1673-1681)","Tenwa (1681-1684)","Jōkyō (1684-1688)","Genroku (1688-1704)","Hōei (1704-1711)","Shōtoku (1711-1716)","Kyōhō (1716-1736)","Genbun (1736-1741)","Kanpō (1741-1744)","Enkyō (1744-1748)","Kan-en (1748-1751)","Hōryaku (1751-1764)","Meiwa (1764-1772)","An-ei (1772-1781)","Tenmei (1781-1789)","Kansei (1789-1801)","Kyōwa (1801-1804)","Bunka (1804-1818)","Bunsei (1818-1830)","Tenpō (1830-1844)","Kōka (1844-1848)","Kaei (1848-1854)","Ansei (1854-1860)","Man-en (1860-1861)","Bunkyū (1861-1864)","Genji (1864-1865)","Keiō (1865-1868)","Meiji","Taishō","Shōwa","Heisei"],long:["Taika (645-650)","Hakuchi (650-671)","Hakuhō (672-686)","Shuchō (686-701)","Taihō (701-704)","Keiun (704-708)","Wadō (708-715)","Reiki (715-717)","Yōrō (717-724)","Jinki (724-729)","Tempyō (729-749)","Tempyō-kampō (749-749)","Tempyō-shōhō (749-757)","Tempyō-hōji (757-765)","Temphō-jingo (765-767)","Jingo-keiun (767-770)","Hōki (770-780)","Ten-ō (781-782)","Enryaku (782-806)","Daidō (806-810)","Kōnin (810-824)","Tenchō (824-834)","Jōwa (834-848)","Kajō (848-851)","Ninju (851-854)","Saiko (854-857)","Tennan (857-859)","Jōgan (859-877)","Genkei (877-885)","Ninna (885-889)","Kampyō (889-898)","Shōtai (898-901)","Engi (901-923)","Enchō (923-931)","Shōhei (931-938)","Tengyō (938-947)","Tenryaku (947-957)","Tentoku (957-961)","Ōwa (961-964)","Kōhō (964-968)","Anna (968-970)","Tenroku (970-973)","Ten-en (973-976)","Jōgen (976-978)","Tengen (978-983)","Eikan (983-985)","Kanna (985-987)","Ei-en (987-989)","Eiso (989-990)","Shōryaku (990-995)","Chōtoku (995-999)","Chōhō (999-1004)","Kankō (1004-1012)","Chōwa (1012-1017)","Kannin (1017-1021)","Jian (1021-1024)","Manju (1024-1028)","Chōgen (1028-1037)","Chōryaku (1037-1040)","Chōkyū (1040-1044)","Kantoku (1044-1046)","Eishō (1046-1053)","Tengi (1053-1058)","Kōhei (1058-1065)","Jiryaku (1065-1069)","Enkyū (1069-1074)","Shōho (1074-1077)","Shōryaku (1077-1081)","Eiho (1081-1084)","Ōtoku (1084-1087)","Kanji (1087-1094)","Kaho (1094-1096)","Eichō (1096-1097)","Shōtoku (1097-1099)","Kōwa (1099-1104)","Chōji (1104-1106)","Kashō (1106-1108)","Tennin (1108-1110)","Ten-ei (1110-1113)","Eikyū (1113-1118)","Gen-ei (1118-1120)","Hoan (1120-1124)","Tenji (1124-1126)","Daiji (1126-1131)","Tenshō (1131-1132)","Chōshō (1132-1135)","Hoen (1135-1141)","Eiji (1141-1142)","Kōji (1142-1144)","Tenyō (1144-1145)","Kyūan (1145-1151)","Ninpei (1151-1154)","Kyūju (1154-1156)","Hogen (1156-1159)","Heiji (1159-1160)","Eiryaku (1160-1161)","Ōho (1161-1163)","Chōkan (1163-1165)","Eiman (1165-1166)","Nin-an (1166-1169)","Kaō (1169-1171)","Shōan (1171-1175)","Angen (1175-1177)","Jishō (1177-1181)","Yōwa (1181-1182)","Juei (1182-1184)","Genryuku (1184-1185)","Bunji (1185-1190)","Kenkyū (1190-1199)","Shōji (1199-1201)","Kennin (1201-1204)","Genkyū (1204-1206)","Ken-ei (1206-1207)","Shōgen (1207-1211)","Kenryaku (1211-1213)","Kenpō (1213-1219)","Shōkyū (1219-1222)","Jōō (1222-1224)","Gennin (1224-1225)","Karoku (1225-1227)","Antei (1227-1229)","Kanki (1229-1232)","Jōei (1232-1233)","Tempuku (1233-1234)","Bunryaku (1234-1235)","Katei (1235-1238)","Ryakunin (1238-1239)","En-ō (1239-1240)","Ninji (1240-1243)","Kangen (1243-1247)","Hōji (1247-1249)","Kenchō (1249-1256)","Kōgen (1256-1257)","Shōka (1257-1259)","Shōgen (1259-1260)","Bun-ō (1260-1261)","Kōchō (1261-1264)","Bun-ei (1264-1275)","Kenji (1275-1278)","Kōan (1278-1288)","Shōō (1288-1293)","Einin (1293-1299)","Shōan (1299-1302)","Kengen (1302-1303)","Kagen (1303-1306)","Tokuji (1306-1308)","Enkei (1308-1311)","Ōchō (1311-1312)","Shōwa (1312-1317)","Bunpō (1317-1319)","Genō (1319-1321)","Genkyō (1321-1324)","Shōchū (1324-1326)","Kareki (1326-1329)","Gentoku (1329-1331)","Genkō (1331-1334)","Kemmu (1334-1336)","Engen (1336-1340)","Kōkoku (1340-1346)","Shōhei (1346-1370)","Kentoku (1370-1372)","Bunchū (1372-1375)","Tenju (1375-1379)","Kōryaku (1379-1381)","Kōwa (1381-1384)","Genchū (1384-1392)","Meitoku (1384-1387)","Kakei (1387-1389)","Kōō (1389-1390)","Meitoku (1390-1394)","Ōei (1394-1428)","Shōchō (1428-1429)","Eikyō (1429-1441)","Kakitsu (1441-1444)","Bun-an (1444-1449)","Hōtoku (1449-1452)","Kyōtoku (1452-1455)","Kōshō (1455-1457)","Chōroku (1457-1460)","Kanshō (1460-1466)","Bunshō (1466-1467)","Ōnin (1467-1469)","Bunmei (1469-1487)","Chōkyō (1487-1489)","Entoku (1489-1492)","Meiō (1492-1501)","Bunki (1501-1504)","Eishō (1504-1521)","Taiei (1521-1528)","Kyōroku (1528-1532)","Tenmon (1532-1555)","Kōji (1555-1558)","Eiroku (1558-1570)","Genki (1570-1573)","Tenshō (1573-1592)","Bunroku (1592-1596)","Keichō (1596-1615)","Genwa (1615-1624)","Kan-ei (1624-1644)","Shōho (1644-1648)","Keian (1648-1652)","Shōō (1652-1655)","Meiryaku (1655-1658)","Manji (1658-1661)","Kanbun (1661-1673)","Enpō (1673-1681)","Tenwa (1681-1684)","Jōkyō (1684-1688)","Genroku (1688-1704)","Hōei (1704-1711)","Shōtoku (1711-1716)","Kyōhō (1716-1736)","Genbun (1736-1741)","Kanpō (1741-1744)","Enkyō (1744-1748)","Kan-en (1748-1751)","Hōryaku (1751-1764)","Meiwa (1764-1772)","An-ei (1772-1781)","Tenmei (1781-1789)","Kansei (1789-1801)","Kyōwa (1801-1804)","Bunka (1804-1818)","Bunsei (1818-1830)","Tenpō (1830-1844)","Kōka (1844-1848)","Kaei (1848-1854)","Ansei (1854-1860)","Man-en (1860-1861)","Bunkyū (1861-1864)","Genji (1864-1865)","Keiō (1865-1868)","Meiji","Taishō","Shōwa","Heisei"]},dayPeriods:{am:"AM",pm:"PM"}},persian:{months:{narrow:["1","2","3","4","5","6","7","8","9","10","11","12"],short:["Farvardin","Ordibehesht","Khordad","Tir","Mordad","Shahrivar","Mehr","Aban","Azar","Dey","Bahman","Esfand"],long:["Farvardin","Ordibehesht","Khordad","Tir","Mordad","Shahrivar","Mehr","Aban","Azar","Dey","Bahman","Esfand"]},days:{narrow:["D","S","T","Q","Q","S","S"],short:["dom","seg","ter","qua","qui","sex","sáb"],long:["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"]},eras:{narrow:["AP"],short:["AP"],long:["AP"]},dayPeriods:{am:"AM",pm:"PM"}},roc:{months:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],short:["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],long:["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"]},days:{narrow:["D","S","T","Q","Q","S","S"],short:["dom","seg","ter","qua","qui","sex","sáb"],long:["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"]},eras:{narrow:["Antes de R.O.C.","R.O.C."],short:["Antes de R.O.C.","R.O.C."],long:["Antes de R.O.C.","R.O.C."]},dayPeriods:{am:"AM",pm:"PM"}}}},number:{nu:["latn"],patterns:{decimal:{positivePattern:"{number}",negativePattern:"-{number}"},currency:{positivePattern:"{currency}{number}",negativePattern:"-{currency}{number}"},percent:{positivePattern:"{number}%",negativePattern:"-{number}%"}},symbols:{latn:{decimal:",",group:".",nan:"NaN",percent:"%",infinity:"∞"}},currencies:{AUD:"AU$",BRL:"R$",CAD:"CA$",CNY:"CN¥",EUR:"€",GBP:"£",HKD:"HK$",ILS:"₪",INR:"₹",JPY:"JP¥",KRW:"₩",MXN:"MX$",NZD:"NZ$",PTE:"Esc.",THB:"฿",TWD:"NT$",USD:"US$",VND:"₫",XAF:"FCFA",XCD:"EC$",XOF:"CFA",XPF:"CFPF"}}});

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("react-intl");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./en-US": 9,
		"./en-US.js": 9,
		"./pt-BR": 10,
		"./pt-BR.js": 10
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 8;


/***/ },
/* 9 */
/***/ function(module, exports) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	module.exports = {
	  IndexFilters: {
	    filters: '{quantity, plural,\n  =0 {Filters}\n  =1 {one filter}\n  other {# filters}\n}'
	  },
	  Active: 'Active',
	  Alerts: 'Alerts',
	  All: 'All',
	  Category: 'Category',
	  Cleared: 'Cleared',
	  Completed: 'Completed',
	  created: 'Created',
	  Critical: 'Critical',
	  Disabled: 'Disabled',
	  Error: 'Error',
	  Filter: 'Filter',
	  Footer: 'Footer',
	  'Grommet Logo': 'Grommet Logo',
	  loginInvalidPassword: 'Please provide Username and Password.',
	  'Log In': 'Log In',
	  Logout: 'Logout',
	  'Main Content': 'Main Content',
	  model: 'Model',
	  modified: 'Modified',
	  Name: 'Name',
	  OK: 'OK',
	  Password: 'Password',
	  'Remember me': 'Remember me',
	  Resource: 'Resource',
	  Running: 'Running',
	  Search: 'Search',
	  'Skip to': 'Skip to',
	  State: 'State',
	  Status: 'Status',
	  Tasks: 'Tasks',
	  Time: 'Time',
	  Total: 'Total',
	  Unknown: 'Unknown',
	  Username: 'Username',
	  uri: 'URI',
	  Warning: 'Warning'
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	module.exports = {
	  IndexFilters: {
	    filters: '{quantity, plural,\n  =0 {Filtros}\n  =1 {um filtro}\n  other {# filtros}\n}'
	  },
	  Active: 'Ativos',
	  Alerts: 'Alertas',
	  All: 'Todos',
	  Category: 'Categoria',
	  Cleared: 'Livre',
	  Completed: 'Completado',
	  created: 'Criado',
	  Critical: 'Crítico',
	  Disabled: 'Desabilitado',
	  Error: 'Erro',
	  Filter: 'Filtro',
	  Footer: 'Rodapé',
	  'Grommet Logo': 'Gromment Logomarca',
	  loginInvalidPassword: 'Por favor, informe Usuário e Senha.',
	  'Log In': 'Logar',
	  Logout: 'Deslogar',
	  'Main Content': 'Conteúdo Principal',
	  model: 'Modelo',
	  modified: 'Modificado',
	  Name: 'Nome',
	  OK: 'OK',
	  Password: 'Senha',
	  'Remember me': 'Lembrar Usuário',
	  Resource: 'Recurso',
	  Running: 'Executando',
	  Search: 'Buscar',
	  'Skip to': 'Saltar para',
	  State: 'Estado',
	  Status: 'Situaçāo',
	  Tasks: 'Tarefas',
	  Time: 'Data',
	  Total: 'Total',
	  Unknown: 'Desconhecido',
	  Username: 'Usuário',
	  uri: 'URI',
	  Warning: 'Alerta'
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var App = __webpack_require__(12);
	var RouteHandler = __webpack_require__(2).RouteHandler;

	var Docs = React.createClass({
	  displayName: 'Docs',

	  contextTypes: {
	    router: React.PropTypes.func.isRequired
	  },

	  render: function render() {
	    return React.createElement(
	      App,
	      { className: 'docs' },
	      React.createElement(RouteHandler, null)
	    );
	  }

	});

	module.exports = Docs;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var SkipLinks = __webpack_require__(13);

	var IntlMixin = __webpack_require__(3);
	var Locale = __webpack_require__(62);

	var App = React.createClass({
	  displayName: 'App',

	  propTypes: {
	    centered: React.PropTypes.bool
	  },

	  mixins: [IntlMixin],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      centered: true
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      lang: 'en-US'
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    var lang = Locale.getCurrentLocale();
	    if (this.props.lang) {
	      lang = this.props.lang;
	    }

	    if (!document.documentElement.getAttribute('lang')) {
	      document.documentElement.setAttribute('lang', lang);
	    }

	    this.setState({ lang: lang });
	  },

	  render: function render() {
	    var classes = ["app"];
	    if (this.props.centered) {
	      classes.push("app--centered");
	    }
	    if (this.props.inline) {
	      classes.push("app--inline");
	    }

	    if (this.props.className) {
	      classes.push(this.props.className);
	    }

	    //remove this when React 0.14 is released. This is required because context props are not being propagated to children.
	    var children = React.Children.map(this.props.children, (function (child) {
	      return React.isValidElement(child) ? React.cloneElement(child, this.getChildContext()) : child;
	    }).bind(this));

	    return React.createElement(
	      'div',
	      { lang: this.state.lang, className: classes.join(' ') },
	      React.createElement(SkipLinks, null),
	      children
	    );
	  }
	});

	module.exports = App;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Layer = __webpack_require__(14);
	var Menu = __webpack_require__(17);
	var DOM = __webpack_require__(57);
	var IntlMixin = __webpack_require__(3);

	var SkipLinks = React.createClass({
	  displayName: 'SkipLinks',

	  mixins: [IntlMixin],

	  getInitialState: function getInitialState() {
	    return { anchors: [], showLayer: false };
	  },

	  componentDidMount: function componentDidMount() {
	    this._updateAnchors();
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
	    this.setState({ routeChanged: true });
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    if (this.state.routeChanged) {
	      this.setState({ routeChanged: false }, this._updateAnchors);
	    }
	  },

	  _updateAnchors: function _updateAnchors() {
	    var anchorElements = document.querySelectorAll('[data-skip-label]');

	    var anchors = Array.prototype.map.call(anchorElements, function (anchorElement) {
	      return {
	        id: anchorElement.getAttribute('id'),
	        label: anchorElement.getAttribute('data-skip-label')
	      };
	    });

	    this.setState({ anchors: anchors });
	  },

	  _onFocus: function _onFocus() {
	    if (!this.state.showLayer) {
	      this.setState({ showLayer: true });
	    }
	  },

	  _onBlur: function _onBlur() {
	    var skipLinksLayer = this.refs.skipLinksLayer.getDOMNode();
	    var activeElement = document.activeElement;
	    if (!DOM.isDescendant(skipLinksLayer, activeElement)) {
	      this.setState({ showLayer: false });
	    }
	  },

	  _onClick: function _onClick(destId) {
	    return function (event) {
	      var dest = document.getElementById(destId);
	      dest.focus();
	    };
	  },

	  render: function render() {
	    var anchorElements = this.state.anchors.map((function (anchor, index) {
	      return React.createElement(
	        'a',
	        { tabIndex: '0',
	          href: '#' + anchor.id,
	          onFocus: this._onFocus,
	          onBlur: this._onBlur,
	          onClick: this._onClick(anchor.id),
	          key: anchor.id,
	          'aria-label': this.getGrommetIntlMessage('Skip to') + ' ' + anchor.label },
	        anchor.label
	      );
	    }).bind(this));

	    return React.createElement(
	      'div',
	      { className: 'skip-links' },
	      React.createElement(
	        Layer,
	        { hidden: !this.state.showLayer },
	        React.createElement(
	          'div',
	          { ref: 'skipLinksLayer' },
	          React.createElement(
	            'h2',
	            null,
	            this.getGrommetIntlMessage('Skip to'),
	            ':'
	          ),
	          React.createElement(
	            Menu,
	            { direction: 'row' },
	            anchorElements
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = SkipLinks;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var CloseIcon = __webpack_require__(15);
	var KeyboardAccelerators = __webpack_require__(16);

	var CLASS_ROOT = "layer";

	var LayerOverlay = React.createClass({
	  displayName: 'LayerOverlay',

	  propTypes: {
	    align: React.PropTypes.oneOf(['center', 'top', 'bottom', 'left', 'right']),
	    closer: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.bool]),
	    flush: React.PropTypes.bool,
	    hidden: React.PropTypes.bool,
	    peek: React.PropTypes.bool,
	    onClose: React.PropTypes.func,
	    router: React.PropTypes.func
	  },

	  childContextTypes: {
	    router: React.PropTypes.func
	  },

	  mixins: [KeyboardAccelerators],

	  getChildContext: function getChildContext() {
	    return { router: this.props.router };
	  },

	  componentDidMount: function componentDidMount() {
	    if (this.props.onClose) {
	      this.startListeningToKeyboard({ esc: this.props.onClose });
	    }
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    var appElement = document.querySelectorAll('div.app')[0];
	    if (appElement) {
	      // unit tests don't have an app
	      appElement.classList.remove('app--layered');
	      window.scroll(0, this._appScrollY);
	    }
	  },

	  render: function render() {
	    var classes = [CLASS_ROOT];
	    if (this.props.align) {
	      classes.push(CLASS_ROOT + "--align-" + this.props.align);
	    }
	    if (this.props.flush) {
	      classes.push(CLASS_ROOT + "--flush");
	    }
	    if (this.props.hidden) {
	      classes.push(CLASS_ROOT + "--hidden");
	    }
	    if (this.props.peek) {
	      classes.push(CLASS_ROOT + "--peek");
	    }
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }

	    var closer = null;
	    if (this.props.closer) {
	      classes.push(CLASS_ROOT + "--closeable");

	      if (true === this.props.closer) {
	        closer = React.createElement(
	          'div',
	          { className: CLASS_ROOT + "__closer",
	            onClick: this.props.onClose },
	          React.createElement(CloseIcon, null)
	        );
	      } else {
	        closer = React.createElement(
	          'div',
	          { className: CLASS_ROOT + "__closer" },
	          this.props.closer
	        );
	      }
	    }

	    return React.createElement(
	      'div',
	      { ref: 'background', className: classes.join(' ') },
	      React.createElement(
	        'div',
	        { className: CLASS_ROOT + "__container" },
	        closer,
	        this.props.children
	      )
	    );
	  }
	});

	var Layer = React.createClass({
	  displayName: 'Layer',

	  propTypes: {
	    align: React.PropTypes.oneOf(['center', 'top', 'bottom', 'left', 'right']),
	    closer: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.bool]),
	    flush: React.PropTypes.bool,
	    hidden: React.PropTypes.bool,
	    peek: React.PropTypes.bool,
	    onClose: React.PropTypes.func
	  },

	  contextTypes: {
	    router: React.PropTypes.func
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      align: 'center'
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    this._addOverlay();
	    this._renderOverlay();
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    this._renderOverlay();
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    this._removeOverlay();
	  },

	  _addOverlay: function _addOverlay() {
	    var overlay = document.createElement('div');
	    if (overlay.classList) {
	      overlay.classList.add('layer__overlay');
	    } else {
	      // unit test version
	      overlay.className = 'layer__overlay';
	    }
	    this._overlay = document.body.insertBefore(overlay, document.body.firstChild);
	    this._overlay = overlay;
	  },

	  _renderOverlay: function _renderOverlay() {
	    var content = React.createElement(LayerOverlay, _extends({}, this.props, { router: this.context.router }));
	    React.render(content, this._overlay);
	    if (this.props.hidden) {
	      if (this._overlay.classList) {
	        this._overlay.classList.add('layer__overlay--hidden');
	      } else {
	        this._overlay.className = 'layer__overlay layer__overlay--hidden';
	      }
	    } else {
	      if (this._overlay.classList) {
	        this._overlay.classList.remove('layer__overlay--hidden');
	      } else {
	        this._overlay.className = 'layer__overlay';
	      }
	    }
	  },

	  _removeOverlay: function _removeOverlay() {
	    React.unmountComponentAtNode(this._overlay);
	    document.body.removeChild(this._overlay);
	    this._overlay = null;
	  },

	  render: function render() {
	    return React.createElement('span', null);
	  }

	});

	module.exports = Layer;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);

	var Clear = React.createClass({
	  displayName: 'Clear',

	  render: function render() {
	    var className = 'control-icon control-icon-clear';
	    if (this.props.className) {
	      className += ' ' + this.props.className;
	    }
	    return React.createElement(
	      'svg',
	      { className: className, viewBox: '0 0 48 48', version: '1.1' },
	      React.createElement(
	        'g',
	        { fill: 'none' },
	        React.createElement('line', { strokeWidth: '2', x1: '14', y1: '14', x2: '34', y2: '34' }),
	        React.createElement('line', { strokeWidth: '2', x1: '14', y1: '34', x2: '34', y2: '14' })
	      )
	    );
	  }

	});

	module.exports = Clear;

/***/ },
/* 16 */
/***/ function(module, exports) {

	// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

	// Allow callers to use key labels instead of key code numbers.
	// This makes their code easier to read.
	'use strict';

	var KEYS = {
	  backspace: 8,
	  tab: 9,
	  enter: 13,
	  esc: 27,
	  escape: 27,
	  space: 32,
	  left: 37,
	  up: 38,
	  right: 39,
	  down: 40,
	  comma: 188,
	  shift: 16
	};

	var _keyboardAccelerators = {};
	var _listenersCounter = 0;
	var _listeners = [];
	var _isKeyboardAcceleratorListening = false;

	var _onKeyboardAcceleratorKeyPress = function _onKeyboardAcceleratorKeyPress(e) {
	  var key = e.keyCode ? e.keyCode : e.which;
	  for (var i = _listenersCounter - 1; i >= 0; i--) {
	    var id = _listeners[i];
	    var handlers = _keyboardAccelerators[id].handlers;
	    var downs = _keyboardAccelerators[id].downs;
	    if (handlers.hasOwnProperty(key) && !downs[KEYS.shift]) {
	      var ret = handlers[key](e);
	      if (ret) {
	        break;
	      }
	    }
	    downs[e.keyCode] = true;
	  }
	};

	var _onKeyboardAcceleratorKeyUp = function _onKeyboardAcceleratorKeyUp(e) {
	  for (var i = _listenersCounter - 1; i >= 0; i--) {
	    var id = _listeners[i];
	    var handlers = _keyboardAccelerators[id].handlers;
	    var downs = _keyboardAccelerators[id].downs;
	    if (downs[KEYS.shift] && downs[KEYS.left] && handlers.shiftLeft) {
	      handlers.shiftLeft(e);
	    } else if (downs[KEYS.shift] && downs[KEYS.right] && handlers.shiftRight) {
	      handlers.shiftRight(e);
	    }
	    downs[e.keyCode] = false;
	  }
	};

	// KeyboardAccelerators is a mixin for handling keyboard events.
	// Add listeners using startListeningToKeyboard().
	// Remove listeners using stopListeningToKeyboard().
	// When the component that includes this is unmounted, the keyboard event
	// listener is removed automatically.
	var KeyboardAccelerators = {
	  _initKeyboardAccelerators: function _initKeyboardAccelerators() {
	    var id = this.getDOMNode().getAttribute('data-reactid');
	    _keyboardAccelerators[id] = {
	      handlers: {},
	      listening: false,
	      downs: []
	    };
	  },

	  _getKeyboardAcceleratorHandlers: function _getKeyboardAcceleratorHandlers() {
	    var id = this.getDOMNode().getAttribute('data-reactid');
	    return _keyboardAccelerators[id].handlers;
	  },

	  _getDowns: function _getDowns() {
	    var id = this.getDOMNode().getAttribute('data-reactid');
	    return _keyboardAccelerators[id].downs;
	  },

	  _isComponentListening: function _isComponentListening() {
	    var id = this.getDOMNode().getAttribute('data-reactid');
	    for (var i = 0; i < _listenersCounter; i++) {
	      if (_listeners[i] === id) {
	        return true;
	      }
	    }
	    return false;
	  },

	  _subscribeComponent: function _subscribeComponent() {
	    var id = this.getDOMNode().getAttribute('data-reactid');
	    _listeners[_listenersCounter] = id;
	    _listenersCounter++;
	  },

	  _unsubscribeComponent: function _unsubscribeComponent() {
	    var id = this.getDOMNode().getAttribute('data-reactid');
	    var i = 0;
	    for (; i < _listenersCounter; i++) {
	      if (_listeners[i] == id) {
	        break;
	      }
	    }
	    for (; i < _listenersCounter - 1; i++) {
	      _listeners[i] = _listeners[i + 1];
	    }
	    _listenersCounter--;
	    _listeners[_listenersCounter] = null;
	    delete _keyboardAccelerators[id];
	  },

	  // Add handlers for specific keys.
	  // This function can be called multiple times, existing handlers will
	  // be replaced, new handlers will be added.
	  startListeningToKeyboard: function startListeningToKeyboard(handlers) {
	    this._initKeyboardAccelerators();
	    var keys = 0;
	    for (var key in handlers) {
	      if (handlers.hasOwnProperty(key)) {
	        var keyCode = key;
	        if (KEYS.hasOwnProperty(key)) {
	          keyCode = KEYS[key];
	        }
	        keys += 1;
	        this._getKeyboardAcceleratorHandlers()[keyCode] = handlers[key];
	      }
	    }

	    if (keys > 0) {
	      if (!_isKeyboardAcceleratorListening) {
	        window.addEventListener("keydown", _onKeyboardAcceleratorKeyPress);
	        window.addEventListener("keyup", _onKeyboardAcceleratorKeyUp);
	        _isKeyboardAcceleratorListening = true;
	      }
	      if (!this._isComponentListening()) {
	        this._subscribeComponent();
	      }
	    }
	  },

	  // Remove handlers for all keys or specific keys.
	  // If no argument is passed in, all handlers are removed.
	  // This function can be called multiple times, only the handlers
	  // specified will be removed.
	  stopListeningToKeyboard: function stopListeningToKeyboard(handlers) {
	    if (!this._isComponentListening()) {
	      return;
	    }
	    if (handlers) {
	      for (var key in handlers) {
	        if (handlers.hasOwnProperty(key)) {
	          var keyCode = key;
	          if (KEYS.hasOwnProperty(key)) {
	            keyCode = KEYS[key];
	          }
	          delete this._getKeyboardAcceleratorHandlers()[keyCode];
	        }
	      }
	    }

	    var keyCount = 0;
	    for (var keyHandler in this._getKeyboardAcceleratorHandlers()) {
	      if (this._getKeyboardAcceleratorHandlers().hasOwnProperty(keyHandler)) {
	        keyCount += 1;
	      }
	    }

	    if (!handlers || 0 === keyCount) {
	      this._initKeyboardAccelerators();
	      this._unsubscribeComponent();
	    }

	    if (_listenersCounter === 0) {
	      window.removeEventListener("keydown", _onKeyboardAcceleratorKeyPress);
	      window.removeEventListener("keyup", _onKeyboardAcceleratorKeyUp);
	      _isKeyboardAcceleratorListening = false;
	    }
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    this.stopListeningToKeyboard();
	  }
	};

	module.exports = KeyboardAccelerators;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var merge = __webpack_require__(18);
	var pick = __webpack_require__(51);
	var keys = __webpack_require__(44);
	var KeyboardAccelerators = __webpack_require__(16);
	var Drop = __webpack_require__(56);
	var Responsive = __webpack_require__(58);
	var Box = __webpack_require__(59);
	var MoreIcon = __webpack_require__(60);
	var DropCaretIcon = __webpack_require__(61);

	var CLASS_ROOT = "menu";

	// We have a separate module for the drop component so we can transfer the router context.
	var MenuDrop = React.createClass({
	  displayName: 'MenuDrop',

	  propTypes: merge({
	    control: React.PropTypes.node,
	    dropAlign: Drop.alignPropType,
	    dropColorIndex: React.PropTypes.string,
	    id: React.PropTypes.string.isRequired,
	    large: React.PropTypes.bool,
	    onClick: React.PropTypes.func.isRequired,
	    router: React.PropTypes.func,
	    small: React.PropTypes.bool
	  }, Box.propTypes),

	  childContextTypes: {
	    router: React.PropTypes.func
	  },

	  mixins: [KeyboardAccelerators],

	  getChildContext: function getChildContext() {
	    return { router: this.props.router };
	  },

	  componentDidMount: function componentDidMount() {
	    this._keyboardHandlers = {
	      up: this._onUpKeyPress,
	      down: this._onDownKeyPress
	    };
	    this.startListeningToKeyboard(this._keyboardHandlers);
	    var menuItems = this.refs.navContainer.getDOMNode().childNodes;
	    for (var i = 0; i < menuItems.length; i++) {
	      var classes = menuItems[i].className.toString();
	      var tagName = menuItems[i].tagName.toLowerCase();
	      // want to skip items of the menu that are not focusable.
	      if (tagName !== 'button' && tagName !== 'a' && classes.indexOf('check-box') === -1) {
	        continue;
	      }
	      menuItems[i].setAttribute('role', 'menuitem');

	      if (!menuItems[i].getAttribute('id')) {
	        menuItems[i].setAttribute('id', menuItems[i].getAttribute('data-reactid'));
	      }
	      // aria-selected informs AT which menu item is selected for that menu container.
	      menuItems[i].setAttribute('aria-selected', classes.indexOf('active'));
	    }
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    this.stopListeningToKeyboard(this._keyboardHandlers);
	  },

	  _onUpKeyPress: function _onUpKeyPress(event) {
	    event.preventDefault();
	    var menuItems = this.refs.navContainer.getDOMNode().childNodes;
	    if (!this.activeMenuItem) {
	      var lastMenuItem = menuItems[menuItems.length - 1];
	      this.activeMenuItem = lastMenuItem;
	    } else if (this.activeMenuItem.previousSibling) {
	      this.activeMenuItem = this.activeMenuItem.previousSibling;
	    }

	    var classes = this.activeMenuItem.className.split(/\s+/);
	    var tagName = this.activeMenuItem.tagName.toLowerCase();
	    // want to skip items of the menu that are not focusable.
	    if (tagName !== 'button' && tagName !== 'a' && classes.indexOf('check-box') === -1) {
	      if (this.activeMenuItem === menuItems[0]) {
	        return true;
	      } else {
	        // If this item is not focusable, check the next item.
	        return this._onUpKeyPress(event);
	      }
	    }

	    this.activeMenuItem.focus();
	    this.refs.menuDrop.getDOMNode().setAttribute('aria-activedescendant', this.activeMenuItem.getAttribute('id'));
	    // Stops KeyboardAccelerators from calling the other listeners. Works limilar to event.stopPropagation().
	    return true;
	  },

	  _onDownKeyPress: function _onDownKeyPress(event) {
	    event.preventDefault();
	    var menuItems = this.refs.navContainer.getDOMNode().childNodes;
	    if (!this.activeMenuItem) {
	      this.activeMenuItem = menuItems[0];
	    } else if (this.activeMenuItem.nextSibling) {
	      this.activeMenuItem = this.activeMenuItem.nextSibling;
	    }

	    var classes = this.activeMenuItem.className.split(/\s+/);
	    var tagName = this.activeMenuItem.tagName.toLowerCase();
	    // want to skip items of the menu that are not focusable.
	    if (tagName !== 'button' && tagName !== 'a' && classes.indexOf('check-box') === -1) {
	      if (this.activeMenuItem === menuItems[menuItems.length - 1]) {
	        return true;
	      } else {
	        // If this item is not focusable, check the next item.
	        return this._onDownKeyPress(event);
	      }
	    }

	    this.activeMenuItem.focus();
	    this.refs.menuDrop.getDOMNode().setAttribute('aria-activedescendant', this.activeMenuItem.getAttribute('id'));
	    // Stops KeyboardAccelerators from calling the other listeners. Works limilar to event.stopPropagation().
	    return true;
	  },

	  render: function render() {
	    var classes = [CLASS_ROOT + "__drop"];
	    var other = pick(this.props, keys(Box.propTypes));

	    var first = this.props.control;
	    var second = React.createElement(
	      Box,
	      _extends({ ref: 'navContainer', tag: 'nav' }, other),
	      this.props.children
	    );
	    if (this.props.dropAlign.bottom) {
	      first = second;
	      second = this.props.control;
	    }
	    if (this.props.dropAlign.right) {
	      classes.push(CLASS_ROOT + "__drop--align-right");
	    }
	    if (this.props.dropColorIndex) {
	      classes.push("background-color-index-" + this.props.dropColorIndex);
	    }
	    if (this.props.large) {
	      classes.push(CLASS_ROOT + "__drop--large");
	    }
	    if (this.props.small) {
	      classes.push(CLASS_ROOT + "__drop--small");
	    }

	    return React.createElement(
	      'div',
	      { ref: 'menuDrop', id: this.props.id, className: classes.join(' '),
	        onClick: this.props.onClick },
	      first,
	      second
	    );
	  }
	});

	var Menu = React.createClass({
	  displayName: 'Menu',

	  propTypes: merge({
	    closeOnClick: React.PropTypes.bool,
	    collapse: React.PropTypes.bool, // deprecated, remove in 0.5
	    dropAlign: Drop.alignPropType,
	    dropColorIndex: React.PropTypes.string,
	    icon: React.PropTypes.node,
	    inline: React.PropTypes.bool,
	    label: React.PropTypes.string,
	    large: React.PropTypes.bool,
	    primary: React.PropTypes.bool,
	    small: React.PropTypes.bool
	  }, Box.propTypes),

	  contextTypes: {
	    router: React.PropTypes.func
	  },

	  mixins: [KeyboardAccelerators],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      closeOnClick: true,
	      direction: 'column',
	      dropAlign: { top: 'top', left: 'left' },
	      pad: 'none',
	      small: false,
	      responsive: true
	    };
	  },

	  getInitialState: function getInitialState() {
	    if (this.props.hasOwnProperty('collapse')) {
	      console.log('The Grommet Menu "collapse" property is deprecated. Please use "inline" instead.'); // TODO: remove this message in version 0.4.0
	    }
	    var inline;
	    if (this.props.hasOwnProperty('inline')) {
	      inline = this.props.inline;
	    } else {
	      inline = !this.props.label && !this.props.icon;
	    }
	    return {
	      // state may be 'collapsed', 'focused' or 'expanded' (active).
	      state: 'collapsed',
	      inline: inline,
	      dropId: 'menuDrop'
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    if (this.refs.control) {
	      var controlElement = this.refs.control.getDOMNode();
	      this.setState({
	        dropId: 'menu-drop-' + controlElement.getAttribute('data-reactid')
	      });

	      controlElement.setAttribute('role', 'menu');
	      var expanded = this.state.state === 'expanded';
	      controlElement.setAttribute('aria-expanded', expanded);
	      if (this.props.label) {
	        controlElement.setAttribute('aria-label', this.props.label);
	      } else if (this.props.icon) {
	        try {
	          var icon = controlElement.getElementsByClassName('control-icon')[0];
	          if (!icon.getAttribute('id')) {
	            icon.setAttribute('id', icon.getAttribute('data-reactid'));
	          }
	          controlElement.setAttribute('aria-labelledby', icon.getAttribute('id'));
	        } catch (exception) {
	          console.log('Unable to add aria-label to Menu component.');
	        }
	      }
	    }

	    if (this.props.inline && this.props.responsive) {
	      this._responsive = Responsive.start(this._onResponsive);
	    }
	  },

	  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
	    // Set up keyboard listeners appropriate to the current state.

	    var activeKeyboardHandlers = {
	      esc: this._onClose
	    };
	    var focusedKeyboardHandlers = {
	      space: this._onOpen,
	      down: this._onOpen
	    };

	    switch (this.state.state) {
	      case 'collapsed':
	        this.stopListeningToKeyboard(focusedKeyboardHandlers);
	        this.stopListeningToKeyboard(activeKeyboardHandlers);
	        document.removeEventListener('click', this._onClose);
	        if (this._drop) {
	          this._drop.remove();
	          this._drop = null;
	        }
	        break;
	      case 'focused':
	        this.stopListeningToKeyboard(activeKeyboardHandlers);
	        this.startListeningToKeyboard(focusedKeyboardHandlers);
	        break;
	      case 'expanded':
	        this.stopListeningToKeyboard(focusedKeyboardHandlers);
	        this.startListeningToKeyboard(activeKeyboardHandlers);
	        if (prevState.state !== 'expanded') {
	          document.addEventListener('click', this._onClose);
	          this._drop = Drop.add(this.refs.control.getDOMNode(), this._renderDrop(), this.props.dropAlign);
	          this._drop.container.focus();
	        }
	        this._drop.render(this._renderDrop());
	        break;
	    }
	    if (this.refs.control) {
	      var controlElement = this.refs.control.getDOMNode();
	      var expanded = this.state.state === 'expanded';
	      controlElement.setAttribute('aria-expanded', expanded);
	    }
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    document.removeEventListener('click', this._onClose);
	    if (this._drop) {
	      this._drop.remove();
	    }
	    if (this._responsive) {
	      this._responsive.stop();
	    }
	  },

	  _onOpen: function _onOpen(event) {
	    event.preventDefault();
	    this.setState({ state: 'expanded' });
	  },

	  _onClose: function _onClose() {
	    this.setState({ state: 'collapsed' });
	    if (document.activeElement === this.getDOMNode()) {
	      this.setState({ state: 'focused' });
	    } else {
	      this.getDOMNode().focus();
	    }
	  },

	  _onFocusControl: function _onFocusControl() {
	    this.setState({ state: 'focused' });
	  },

	  _onBlurControl: function _onBlurControl() {
	    if (this.state.state === 'focused') {
	      this.setState({ state: 'collapsed' });
	    }
	  },

	  _onSink: function _onSink(event) {
	    event.stopPropagation();
	    // need to go native to prevent closing via document
	    event.nativeEvent.stopImmediatePropagation();
	  },

	  _onResponsive: function _onResponsive(small) {
	    // deactivate if we change resolutions
	    var newState = this.state.state;
	    if (this.state.state === 'expanded') {
	      newState = 'focused';
	    }
	    if (small) {
	      this.setState({ inline: false, active: newState });
	    } else {
	      this.setState({
	        inline: this.props.inline,
	        active: newState,
	        state: 'collapsed'
	      });
	    }
	  },

	  _renderControl: function _renderControl() {
	    var result = null;
	    var icon = null;
	    var controlClassName = CLASS_ROOT + "__control";

	    var classes = [controlClassName];

	    if (this.props.icon) {
	      classes.push(controlClassName + "--labelled");
	      icon = this.props.icon;
	    } else {
	      classes.push(controlClassName + "--fixed-label");
	      icon = React.createElement(MoreIcon, null);
	    }

	    if (this.props.label) {
	      result = React.createElement(
	        'div',
	        { className: classes.join(' ') },
	        React.createElement(
	          'div',
	          { className: controlClassName + "-icon" },
	          icon
	        ),
	        React.createElement(
	          'span',
	          { tabIndex: '-1', className: controlClassName + "-label" },
	          this.props.label
	        ),
	        React.createElement(DropCaretIcon, { className: controlClassName + "-drop-icon" })
	      );
	    } else {
	      result = React.createElement(
	        'div',
	        { className: controlClassName },
	        icon
	      );
	    }
	    return result;
	  },

	  _renderDrop: function _renderDrop() {
	    var other = pick(this.props, keys(Box.propTypes));

	    var controlContents = React.createElement(
	      'div',
	      { onClick: this._onClose },
	      this._renderControl()
	    );

	    var onClick;
	    if (this.props.closeOnClick) {
	      onClick = this._onClose;
	    } else {
	      onClick = this._onSink;
	    }
	    return React.createElement(
	      MenuDrop,
	      _extends({ tabIndex: '-1', router: this.context.router,
	        dropAlign: this.props.dropAlign,
	        dropColorIndex: this.props.dropColorIndex,
	        small: this.props.small,
	        large: this.props.large
	      }, other, {
	        onClick: onClick,
	        id: this.state.dropId,
	        control: controlContents }),
	      this.props.children
	    );
	  },

	  _classes: function _classes(prefix) {
	    var classes = [prefix];

	    if (this.props.direction) {
	      classes.push(prefix + "--" + this.props.direction);
	    }
	    if (this.props.large) {
	      classes.push(prefix + "--large");
	    }
	    if (this.props.small) {
	      classes.push(prefix + "--small");
	    }
	    if (this.props.primary) {
	      classes.push(prefix + "--primary");
	    }

	    return classes;
	  },

	  render: function render() {
	    var classes = this._classes(CLASS_ROOT);
	    if (this.state.inline) {
	      classes.push(CLASS_ROOT + "--inline");
	    } else {
	      classes.push(CLASS_ROOT + "--controlled");
	      if (this.props.label) {
	        classes.push(CLASS_ROOT + "--labelled");
	      }
	    }
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }

	    if (this.state.inline) {
	      var other = pick(this.props, keys(Box.propTypes));

	      return React.createElement(
	        Box,
	        _extends({ tag: 'nav' }, other, { className: classes.join(' '), onClick: this._onClose }),
	        this.props.children
	      );
	    } else {

	      var controlContents = this._renderControl();

	      return React.createElement(
	        'div',
	        { ref: 'control', className: classes.join(' '),
	          tabIndex: '0',
	          onClick: this._onOpen,
	          onFocus: this._onFocusControl,
	          onBlur: this._onBlurControl },
	        controlContents
	      );
	    }
	  }
	});

	module.exports = Menu;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseMerge = __webpack_require__(19),
	    createAssigner = __webpack_require__(46);

	/**
	 * Recursively merges own enumerable properties of the source object(s), that
	 * don't resolve to `undefined` into the destination object. Subsequent sources
	 * overwrite property assignments of previous sources. If `customizer` is
	 * provided it's invoked to produce the merged values of the destination and
	 * source properties. If `customizer` returns `undefined` merging is handled
	 * by the method instead. The `customizer` is bound to `thisArg` and invoked
	 * with five arguments: (objectValue, sourceValue, key, object, source).
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {*} [thisArg] The `this` binding of `customizer`.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * var users = {
	 *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
	 * };
	 *
	 * var ages = {
	 *   'data': [{ 'age': 36 }, { 'age': 40 }]
	 * };
	 *
	 * _.merge(users, ages);
	 * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
	 *
	 * // using a customizer callback
	 * var object = {
	 *   'fruits': ['apple'],
	 *   'vegetables': ['beet']
	 * };
	 *
	 * var other = {
	 *   'fruits': ['banana'],
	 *   'vegetables': ['carrot']
	 * };
	 *
	 * _.merge(object, other, function(a, b) {
	 *   if (_.isArray(a)) {
	 *     return a.concat(b);
	 *   }
	 * });
	 * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
	 */
	var merge = createAssigner(baseMerge);

	module.exports = merge;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayEach = __webpack_require__(20),
	    baseMergeDeep = __webpack_require__(21),
	    isArray = __webpack_require__(29),
	    isArrayLike = __webpack_require__(24),
	    isObject = __webpack_require__(33),
	    isObjectLike = __webpack_require__(28),
	    isTypedArray = __webpack_require__(41),
	    keys = __webpack_require__(44);

	/**
	 * The base implementation of `_.merge` without support for argument juggling,
	 * multiple sources, and `this` binding `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates values with source counterparts.
	 * @returns {Object} Returns `object`.
	 */
	function baseMerge(object, source, customizer, stackA, stackB) {
	  if (!isObject(object)) {
	    return object;
	  }
	  var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
	      props = isSrcArr ? undefined : keys(source);

	  arrayEach(props || source, function (srcValue, key) {
	    if (props) {
	      key = srcValue;
	      srcValue = source[key];
	    }
	    if (isObjectLike(srcValue)) {
	      stackA || (stackA = []);
	      stackB || (stackB = []);
	      baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
	    } else {
	      var value = object[key],
	          result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	          isCommon = result === undefined;

	      if (isCommon) {
	        result = srcValue;
	      }
	      if ((result !== undefined || isSrcArr && !(key in object)) && (isCommon || (result === result ? result !== value : value === value))) {
	        object[key] = result;
	      }
	    }
	  });
	  return object;
	}

	module.exports = baseMerge;

/***/ },
/* 20 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	"use strict";

	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.exports = arrayEach;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayCopy = __webpack_require__(22),
	    isArguments = __webpack_require__(23),
	    isArray = __webpack_require__(29),
	    isArrayLike = __webpack_require__(24),
	    isPlainObject = __webpack_require__(34),
	    isTypedArray = __webpack_require__(41),
	    toPlainObject = __webpack_require__(42);

	/**
	 * A specialized version of `baseMerge` for arrays and objects which performs
	 * deep merges and tracks traversed objects enabling objects with circular
	 * references to be merged.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {string} key The key of the value to merge.
	 * @param {Function} mergeFunc The function to merge values.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates values with source counterparts.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
	  var length = stackA.length,
	      srcValue = source[key];

	  while (length--) {
	    if (stackA[length] == srcValue) {
	      object[key] = stackB[length];
	      return;
	    }
	  }
	  var value = object[key],
	      result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	      isCommon = result === undefined;

	  if (isCommon) {
	    result = srcValue;
	    if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
	      result = isArray(value) ? value : isArrayLike(value) ? arrayCopy(value) : [];
	    } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      result = isArguments(value) ? toPlainObject(value) : isPlainObject(value) ? value : {};
	    } else {
	      isCommon = false;
	    }
	  }
	  // Add the source value to the stack of traversed objects and associate
	  // it with its merged value.
	  stackA.push(srcValue);
	  stackB.push(result);

	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
	  } else if (result === result ? result !== value : value === value) {
	    object[key] = result;
	  }
	}

	module.exports = baseMergeDeep;

/***/ },
/* 22 */
/***/ function(module, exports) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	"use strict";

	function arrayCopy(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	module.exports = arrayCopy;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArrayLike = __webpack_require__(24),
	    isObjectLike = __webpack_require__(28);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is classified as an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	    return isObjectLike(value) && isArrayLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	}

	module.exports = isArguments;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getLength = __webpack_require__(25),
	    isLength = __webpack_require__(27);

	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	module.exports = isArrayLike;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseProperty = __webpack_require__(26);

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	module.exports = getLength;

/***/ },
/* 26 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	"use strict";

	function baseProperty(key) {
	  return function (object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;

/***/ },
/* 27 */
/***/ function(module, exports) {

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	'use strict';

	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;

/***/ },
/* 28 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	'use strict';

	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getNative = __webpack_require__(30),
	    isLength = __webpack_require__(27),
	    isObjectLike = __webpack_require__(28);

	/** `Object#toString` result references. */
	var arrayTag = '[object Array]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function (value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};

	module.exports = isArray;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isNative = __webpack_require__(31);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	module.exports = getNative;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isFunction = __webpack_require__(32),
	    isObjectLike = __webpack_require__(28);

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' + fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = isNative;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(33);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 which returns 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}

	module.exports = isFunction;

/***/ },
/* 33 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	'use strict';

	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseForIn = __webpack_require__(35),
	    isArguments = __webpack_require__(23),
	    isObjectLike = __webpack_require__(28);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * **Note:** This method assumes objects created by the `Object` constructor
	 * have no inherited enumerable properties.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  var Ctor;

	  // Exit early for non `Object` objects.
	  if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isArguments(value)) || !hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor))) {
	    return false;
	  }
	  // IE < 9 iterates inherited properties before own properties. If the first
	  // iterated property is an object's own property then there are no inherited
	  // enumerable properties.
	  var result;
	  // In most environments an object's own properties are iterated before
	  // its inherited properties. If the last iterated property is an object's
	  // own property then there are no inherited enumerable properties.
	  baseForIn(value, function (subValue, key) {
	    result = key;
	  });
	  return result === undefined || hasOwnProperty.call(value, result);
	}

	module.exports = isPlainObject;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseFor = __webpack_require__(36),
	    keysIn = __webpack_require__(39);

	/**
	 * The base implementation of `_.forIn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForIn(object, iteratee) {
	  return baseFor(object, iteratee, keysIn);
	}

	module.exports = baseForIn;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var createBaseFor = __webpack_require__(37);

	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toObject = __webpack_require__(38);

	/**
	 * Creates a base function for `_.forIn` or `_.forInRight`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function (object, iteratee, keysFunc) {
	    var iterable = toObject(object),
	        props = keysFunc(object),
	        length = props.length,
	        index = fromRight ? length : -1;

	    while (fromRight ? index-- : ++index < length) {
	      var key = props[index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(33);

	/**
	 * Converts `value` to an object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  return isObject(value) ? value : Object(value);
	}

	module.exports = toObject;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArguments = __webpack_require__(23),
	    isArray = __webpack_require__(29),
	    isIndex = __webpack_require__(40),
	    isLength = __webpack_require__(27),
	    isObject = __webpack_require__(33);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = length && isLength(length) && (isArray(object) || isArguments(object)) && length || 0;

	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;

	  while (++index < length) {
	    result[index] = index + '';
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) && !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keysIn;

/***/ },
/* 40 */
/***/ function(module, exports) {

	/** Used to detect unsigned integer values. */
	'use strict';

	var reIsUint = /^\d+$/;

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = typeof value == 'number' || reIsUint.test(value) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	module.exports = isIndex;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isLength = __webpack_require__(27),
	    isObjectLike = __webpack_require__(28);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
	}

	module.exports = isTypedArray;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseCopy = __webpack_require__(43),
	    keysIn = __webpack_require__(39);

	/**
	 * Converts `value` to a plain object flattening inherited enumerable
	 * properties of `value` to own properties of the plain object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {Object} Returns the converted plain object.
	 * @example
	 *
	 * function Foo() {
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.assign({ 'a': 1 }, new Foo);
	 * // => { 'a': 1, 'b': 2 }
	 *
	 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	 * // => { 'a': 1, 'b': 2, 'c': 3 }
	 */
	function toPlainObject(value) {
	  return baseCopy(value, keysIn(value));
	}

	module.exports = toPlainObject;

/***/ },
/* 43 */
/***/ function(module, exports) {

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @returns {Object} Returns `object`.
	 */
	"use strict";

	function baseCopy(source, props, object) {
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];
	    object[key] = source[key];
	  }
	  return object;
	}

	module.exports = baseCopy;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getNative = __webpack_require__(30),
	    isArrayLike = __webpack_require__(24),
	    isObject = __webpack_require__(33),
	    shimKeys = __webpack_require__(45);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	var keys = !nativeKeys ? shimKeys : function (object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if (typeof Ctor == 'function' && Ctor.prototype === object || typeof object != 'function' && isArrayLike(object)) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};

	module.exports = keys;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArguments = __webpack_require__(23),
	    isArray = __webpack_require__(29),
	    isIndex = __webpack_require__(40),
	    isLength = __webpack_require__(27),
	    keysIn = __webpack_require__(39);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;

	  var allowIndexes = !!length && isLength(length) && (isArray(object) || isArguments(object));

	  var index = -1,
	      result = [];

	  while (++index < propsLength) {
	    var key = props[index];
	    if (allowIndexes && isIndex(key, length) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = shimKeys;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bindCallback = __webpack_require__(47),
	    isIterateeCall = __webpack_require__(49),
	    restParam = __webpack_require__(50);

	/**
	 * Creates a `_.assign`, `_.defaults`, or `_.merge` function.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return restParam(function (object, sources) {
	    var index = -1,
	        length = object == null ? 0 : sources.length,
	        customizer = length > 2 ? sources[length - 2] : undefined,
	        guard = length > 2 ? sources[2] : undefined,
	        thisArg = length > 1 ? sources[length - 1] : undefined;

	    if (typeof customizer == 'function') {
	      customizer = bindCallback(customizer, thisArg, 5);
	      length -= 2;
	    } else {
	      customizer = typeof thisArg == 'function' ? thisArg : undefined;
	      length -= customizer ? 1 : 0;
	    }
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, customizer);
	      }
	    }
	    return object;
	  });
	}

	module.exports = createAssigner;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var identity = __webpack_require__(48);

	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (thisArg === undefined) {
	    return func;
	  }
	  switch (argCount) {
	    case 1:
	      return function (value) {
	        return func.call(thisArg, value);
	      };
	    case 3:
	      return function (value, index, collection) {
	        return func.call(thisArg, value, index, collection);
	      };
	    case 4:
	      return function (accumulator, value, index, collection) {
	        return func.call(thisArg, accumulator, value, index, collection);
	      };
	    case 5:
	      return function (value, other, key, object, source) {
	        return func.call(thisArg, value, other, key, object, source);
	      };
	  }
	  return function () {
	    return func.apply(thisArg, arguments);
	  };
	}

	module.exports = bindCallback;

/***/ },
/* 48 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	"use strict";

	function identity(value) {
	  return value;
	}

	module.exports = identity;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArrayLike = __webpack_require__(24),
	    isIndex = __webpack_require__(40),
	    isObject = __webpack_require__(33);

	/**
	 * Checks if the provided arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
	    var other = object[index];
	    return value === value ? value === other : other !== other;
	  }
	  return false;
	}

	module.exports = isIterateeCall;

/***/ },
/* 50 */
/***/ function(module, exports) {

	/** Used as the `TypeError` message for "Functions" methods. */
	'use strict';

	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/Web/JavaScript/Reference/Functions/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.restParam(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function restParam(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? func.length - 1 : +start || 0, 0);
	  return function () {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        rest = Array(length);

	    while (++index < length) {
	      rest[index] = args[start + index];
	    }
	    switch (start) {
	      case 0:
	        return func.call(this, rest);
	      case 1:
	        return func.call(this, args[0], rest);
	      case 2:
	        return func.call(this, args[0], args[1], rest);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = rest;
	    return func.apply(this, otherArgs);
	  };
	}

	module.exports = restParam;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseFlatten = __webpack_require__(52),
	    bindCallback = __webpack_require__(47),
	    pickByArray = __webpack_require__(54),
	    pickByCallback = __webpack_require__(55),
	    restParam = __webpack_require__(50);

	/**
	 * Creates an object composed of the picked `object` properties. Property
	 * names may be specified as individual arguments or as arrays of property
	 * names. If `predicate` is provided it's invoked for each property of `object`
	 * picking the properties `predicate` returns truthy for. The predicate is
	 * bound to `thisArg` and invoked with three arguments: (value, key, object).
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {Function|...(string|string[])} [predicate] The function invoked per
	 *  iteration or property names to pick, specified as individual property
	 *  names or arrays of property names.
	 * @param {*} [thisArg] The `this` binding of `predicate`.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * var object = { 'user': 'fred', 'age': 40 };
	 *
	 * _.pick(object, 'user');
	 * // => { 'user': 'fred' }
	 *
	 * _.pick(object, _.isString);
	 * // => { 'user': 'fred' }
	 */
	var pick = restParam(function (object, props) {
	  if (object == null) {
	    return {};
	  }
	  return typeof props[0] == 'function' ? pickByCallback(object, bindCallback(props[0], props[1], 3)) : pickByArray(object, baseFlatten(props));
	});

	module.exports = pick;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayPush = __webpack_require__(53),
	    isArguments = __webpack_require__(23),
	    isArray = __webpack_require__(29),
	    isArrayLike = __webpack_require__(24),
	    isObjectLike = __webpack_require__(28);

	/**
	 * The base implementation of `_.flatten` with added support for restricting
	 * flattening and specifying the start index.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {boolean} [isDeep] Specify a deep flatten.
	 * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, isDeep, isStrict, result) {
	  result || (result = []);

	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    var value = array[index];
	    if (isObjectLike(value) && isArrayLike(value) && (isStrict || isArray(value) || isArguments(value))) {
	      if (isDeep) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, isDeep, isStrict, result);
	      } else {
	        arrayPush(result, value);
	      }
	    } else if (!isStrict) {
	      result[result.length] = value;
	    }
	  }
	  return result;
	}

	module.exports = baseFlatten;

/***/ },
/* 53 */
/***/ function(module, exports) {

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	"use strict";

	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	module.exports = arrayPush;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toObject = __webpack_require__(38);

	/**
	 * A specialized version of `_.pick` which picks `object` properties specified
	 * by `props`.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {string[]} props The property names to pick.
	 * @returns {Object} Returns the new object.
	 */
	function pickByArray(object, props) {
	  object = toObject(object);

	  var index = -1,
	      length = props.length,
	      result = {};

	  while (++index < length) {
	    var key = props[index];
	    if (key in object) {
	      result[key] = object[key];
	    }
	  }
	  return result;
	}

	module.exports = pickByArray;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseForIn = __webpack_require__(35);

	/**
	 * A specialized version of `_.pick` which picks `object` properties `predicate`
	 * returns truthy for.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Object} Returns the new object.
	 */
	function pickByCallback(object, predicate) {
	  var result = {};
	  baseForIn(object, function (value, key, object) {
	    if (predicate(value, key, object)) {
	      result[key] = value;
	    }
	  });
	  return result;
	}

	module.exports = pickByCallback;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var DOM = __webpack_require__(57);

	/*
	 * Drop is a utility for rendering components like drop down menus layered above
	 * their initiating controls.
	 */

	var VERTICAL_ALIGN_OPTIONS = ['top', 'bottom'];
	var HORIZONTAL_ALIGN_OPTIONS = ['right', 'left'];

	var Drop = {

	  // How callers can validate a property for drop alignment which will be passed to add().
	  alignPropType: React.PropTypes.shape({
	    top: React.PropTypes.oneOf(VERTICAL_ALIGN_OPTIONS),
	    bottom: React.PropTypes.oneOf(VERTICAL_ALIGN_OPTIONS),
	    left: React.PropTypes.oneOf(HORIZONTAL_ALIGN_OPTIONS),
	    right: React.PropTypes.oneOf(HORIZONTAL_ALIGN_OPTIONS)
	  }),

	  // Add a drop component.
	  //
	  // control - DOM element to anchor the overlay on
	  // content - React node to render
	  // align -
	  // {
	  //    top: top|bottom
	  //    bottom: top|bottom
	  //    left: left|right
	  //    right: left|right
	  // }

	  add: function add(control, content, align) {
	    // validate align
	    if (align && align.top && VERTICAL_ALIGN_OPTIONS.indexOf(align.top) === -1) {
	      console.warn("Warning: Invalid align.top value '" + align.top + "' supplied to Drop," + "expected one of [" + VERTICAL_ALIGN_OPTIONS.join(',') + "]");
	    }
	    if (align && align.bottom && VERTICAL_ALIGN_OPTIONS.indexOf(align.bottom) === -1) {
	      console.warn("Warning: Invalid align.bottom value '" + align.bottom + "' supplied to Drop," + "expected one of [" + VERTICAL_ALIGN_OPTIONS.join(',') + "]");
	    }
	    if (align && align.left && HORIZONTAL_ALIGN_OPTIONS.indexOf(align.left) === -1) {
	      console.warn("Warning: Invalid align.left value '" + align.left + "' supplied to Drop," + "expected one of [" + HORIZONTAL_ALIGN_OPTIONS.join(',') + "]");
	    }
	    if (align && align.right && HORIZONTAL_ALIGN_OPTIONS.indexOf(align.right) === -1) {
	      console.warn("Warning: Invalid align.right value '" + align.right + "' supplied to Drop," + "expected one of [" + HORIZONTAL_ALIGN_OPTIONS.join(',') + "]");
	    }

	    // initialize data
	    var drop = {
	      control: control,
	      align: {
	        top: align.top,
	        bottom: align.bottom,
	        left: align.left,
	        right: align.right
	      }
	    };
	    if (!drop.align.top && !drop.align.bottom) {
	      drop.align.top = "top";
	    }
	    if (!drop.align.left && !drop.align.right) {
	      drop.align.left = "left";
	    }

	    // setup DOM
	    drop.container = document.createElement('div');
	    if (drop.container.classList) {
	      drop.container.classList.add('drop');
	    } else {
	      // unit test version
	      drop.container.className += ' drop';
	    }
	    document.body.appendChild(drop.container);
	    React.render(content, drop.container);

	    drop.scrollParents = DOM.findScrollParents(drop.control);
	    drop.place = this._place.bind(this, drop);
	    drop.render = this._render.bind(this, drop);
	    drop.remove = this._remove.bind(this, drop);

	    drop.scrollParents.forEach(function (scrollParent) {
	      scrollParent.addEventListener('scroll', drop.place);
	    });
	    window.addEventListener('resize', drop.place);

	    // position content
	    this._place(drop);

	    return drop;
	  },

	  _render: function _render(drop, content) {
	    React.render(content, drop.container);
	    // in case content changed, re-place
	    setTimeout(this._place.bind(this, drop), 1);
	  },

	  _remove: function _remove(drop) {
	    drop.scrollParents.forEach(function (scrollParent) {
	      scrollParent.removeEventListener('scroll', drop.place);
	    });
	    window.removeEventListener('resize', drop.place);

	    React.unmountComponentAtNode(drop.container);
	    document.body.removeChild(drop.container);
	  },

	  _place: function _place(drop) {
	    var control = drop.control;
	    var container = drop.container;
	    var align = drop.align;
	    var controlRect = control.getBoundingClientRect();
	    var containerRect = container.getBoundingClientRect();
	    var windowWidth = window.innerWidth;
	    var windowHeight = window.innerHeight;

	    // clear prior styling
	    container.style.left = '';
	    container.style.width = '';
	    container.style.top = '';

	    var width = Math.min(Math.max(controlRect.width, containerRect.width), windowWidth);
	    var left;
	    var top;

	    if (align.left) {
	      if ('left' === align.left) {
	        left = controlRect.left;
	      } else if ('right' === align.left) {
	        left = controlRect.left - width;
	      }
	    } else if (align.right) {
	      if ('left' === align.right) {
	        left = controlRect.left - width;
	      } else if ('right' === align.right) {
	        left = controlRect.left + controlRect.width - width;
	      }
	    }
	    if (left + width > windowWidth) {
	      left -= left + width - windowWidth;
	    } else if (left < 0) {
	      left = 0;
	    }

	    if (align.top) {
	      if ('top' === align.top) {
	        top = controlRect.top;
	      } else if ('bottom' === align.top) {
	        top = controlRect.top + controlRect.height;
	      }
	    } else if (align.bottom) {
	      if ('top' === align.bottom) {
	        top = controlRect.top - containerRect.height;
	      } else if ('bottom' === align.bottom) {
	        top = controlRect.top + controlRect.height - containerRect.height;
	      }
	    }
	    if (top + containerRect.height > windowHeight) {
	      // For now, just slide up so we can see it.
	      // TODO: when we don't want to cover the control, like with SearchInput and Calendar,
	      // add bottom margin to the control to allow the user to scroll down if needed.
	      if (align.top === 'bottom') {
	        top = controlRect.top - containerRect.height;
	      } else {
	        top = Math.max(controlRect.bottom - containerRect.height, top - (top + containerRect.height - windowHeight));
	      }
	    } else if (top < 0) {
	      top = 0;
	    }

	    container.style.left = '' + left + 'px';
	    container.style.width = '' + width + 'px';
	    container.style.top = '' + top + 'px';
	  }
	};

	module.exports = Drop;

/***/ },
/* 57 */
/***/ function(module, exports) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	"use strict";

	module.exports = {
	  findScrollParents: function findScrollParents(element) {
	    var result = [];
	    var parent = element.parentNode;
	    while (parent) {
	      // account for border the lazy way for now
	      if (parent.scrollHeight > parent.offsetHeight + 10) {
	        result.push(parent);
	      }
	      parent = parent.parentNode;
	    }
	    if (result.length === 0) {
	      result.push(document);
	    }
	    return result;
	  },

	  isDescendant: function isDescendant(parent, child) {
	    var node = child.parentNode;
	    while (node != null) {
	      if (node == parent) {
	        return true;
	      }
	      node = node.parentNode;
	    }
	    return false;
	  }
	};

/***/ },
/* 58 */
/***/ function(module, exports) {

	// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

	/*
	 * Responsive is a utility for tracking the display size.
	 * It aligns with CSS media queries.
	 */

	'use strict';

	var SMALL_WIDTH_EM = 44.9375; // align with _settings.responsive.scss

	function _smallSize() {
	  var fontSize = '16px';
	  // unit tests don't have getComputedStyle
	  if (window.getComputedStyle) {
	    fontSize = window.getComputedStyle(document.documentElement).fontSize;
	  }
	  return SMALL_WIDTH_EM * parseFloat(fontSize);
	}

	var Responsive = {

	  // Track responsive sizing.
	  //
	  // Example:
	  // inside componentDidMount()
	  //   this._responsive = Responsive.start(this._onResponsive);
	  // inside componentWillUnmount()
	  //   this._responsive.stop()

	  start: function start(func) {
	    var responsive = {
	      func: func,
	      timer: null,
	      small: null,
	      smallSize: _smallSize()
	    };
	    responsive.onResize = this._onResize.bind(this, responsive);
	    responsive.layout = this._check.bind(this, responsive);
	    responsive.stop = this._stop.bind(this, responsive);
	    window.addEventListener('resize', responsive.onResize);
	    responsive.layout();
	    return responsive;
	  },

	  _stop: function _stop(responsive) {
	    clearTimeout(responsive.timer);
	    window.removeEventListener('resize', responsive.onResize);
	  },

	  _onResize: function _onResize(responsive) {
	    // debounce
	    clearTimeout(responsive.timer);
	    responsive.timer = setTimeout(responsive.layout, 50);
	  },

	  _check: function _check(responsive) {
	    if (window.innerWidth < responsive.smallSize) {
	      if (!responsive.small) {
	        responsive.small = true;
	        responsive.func(true);
	      }
	    } else {
	      if (false !== responsive.small) {
	        responsive.small = false;
	        responsive.func(false);
	      }
	    }
	  }
	};

	module.exports = Responsive;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var keys = __webpack_require__(44);

	var CLASS_ROOT = "box";

	var Box = React.createClass({
	  displayName: 'Box',

	  propTypes: {
	    align: React.PropTypes.oneOf(['start', 'center', 'end']),
	    appCentered: React.PropTypes.bool,
	    backgroundImage: React.PropTypes.string,
	    colorIndex: React.PropTypes.string,
	    containerClassName: React.PropTypes.string,
	    direction: React.PropTypes.oneOf(['row', 'column']),
	    full: React.PropTypes.oneOf([true, 'horizontal', 'vertical', false]),
	    onClick: React.PropTypes.func,
	    justify: React.PropTypes.oneOf(['start', 'center', 'between', 'end']),
	    pad: React.PropTypes.oneOfType([React.PropTypes.oneOf(['none', 'small', 'medium', 'large']), React.PropTypes.shape({
	      horizontal: React.PropTypes.oneOf(['none', 'small', 'medium', 'large']),
	      vertical: React.PropTypes.oneOf(['none', 'small', 'medium', 'large'])
	    })]),
	    reverse: React.PropTypes.bool,
	    responsive: React.PropTypes.bool,
	    separator: React.PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
	    tag: React.PropTypes.string,
	    textAlign: React.PropTypes.oneOf(['left', 'center', 'right']),
	    texture: React.PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      direction: 'column',
	      pad: 'none',
	      tag: 'div',
	      responsive: true
	    };
	  },

	  _addPropertyClass: function _addPropertyClass(classes, prefix, property, classProperty) {
	    var choice = this.props[property];
	    var propertyPrefix = classProperty || property;
	    if (choice) {
	      if (typeof choice === 'string') {
	        classes.push(prefix + '--' + propertyPrefix + '-' + choice);
	      } else if (typeof choice === 'object') {
	        keys(choice).forEach(function (key) {
	          classes.push(prefix + '--' + propertyPrefix + '-' + key + '-' + choice[key]);
	        });
	      } else {
	        classes.push(prefix + '--' + propertyPrefix);
	      }
	    }
	  },

	  render: function render() {
	    var classes = [CLASS_ROOT];
	    var containerClasses = [CLASS_ROOT + "__container"];
	    this._addPropertyClass(classes, CLASS_ROOT, 'flush');
	    this._addPropertyClass(classes, CLASS_ROOT, 'full');
	    this._addPropertyClass(classes, CLASS_ROOT, 'direction');
	    this._addPropertyClass(classes, CLASS_ROOT, 'justify');
	    this._addPropertyClass(classes, CLASS_ROOT, 'align');
	    this._addPropertyClass(classes, CLASS_ROOT, 'reverse');
	    this._addPropertyClass(classes, CLASS_ROOT, 'responsive');
	    this._addPropertyClass(classes, CLASS_ROOT, 'pad');
	    this._addPropertyClass(classes, CLASS_ROOT, 'separator');
	    this._addPropertyClass(classes, CLASS_ROOT, 'textAlign', 'text-align');

	    if (this.props.appCentered) {
	      this._addPropertyClass(containerClasses, CLASS_ROOT + "__container", 'full');
	      if (this.props.colorIndex) {
	        containerClasses.push("background-color-index-" + this.props.colorIndex);
	      }
	      if (this.props.containerClassName) {
	        containerClasses.push(this.props.containerClassName);
	      }
	    } else {
	      if (this.props.colorIndex) {
	        classes.push("background-color-index-" + this.props.colorIndex);
	      }
	    }

	    if (this.props.className) {
	      classes.push(this.props.className);
	    }

	    var style = {};
	    if (this.props.texture) {
	      style.backgroundImage = this.props.texture;
	    } else if (this.props.backgroundImage) {
	      style.background = this.props.backgroundImage + " no-repeat center center";
	      style.backgroundSize = "cover";
	    }

	    if (this.props.appCentered) {
	      return React.createElement(
	        'div',
	        { className: containerClasses.join(' '), style: style,
	          onClick: this.props.onClick },
	        React.createElement(
	          this.props.tag,
	          { className: classes.join(' ') },
	          this.props.children
	        )
	      );
	    } else {
	      return React.createElement(
	        this.props.tag,
	        { className: classes.join(' '), style: style,
	          onClick: this.props.onClick },
	        this.props.children
	      );
	    }
	  }

	});

	module.exports = Box;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);

	var More = React.createClass({
	  displayName: 'More',

	  render: function render() {
	    var className = 'control-icon control-icon-more';
	    if (this.props.className) {
	      className += ' ' + this.props.className;
	    }
	    return React.createElement(
	      'svg',
	      { className: className, viewBox: '0 0 48 48', version: '1.1' },
	      React.createElement(
	        'g',
	        { fill: 'none' },
	        React.createElement('rect', { x: '23', y: '23', strokeWidth: '2', width: '2', height: '2' }),
	        React.createElement('rect', { x: '15', y: '23', strokeWidth: '2', width: '2', height: '2' }),
	        React.createElement('rect', { x: '31', y: '23', strokeWidth: '2', width: '2', height: '2' })
	      )
	    );
	  }

	});

	module.exports = More;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);

	var DropCaret = React.createClass({
	  displayName: 'DropCaret',

	  render: function render() {
	    var className = 'control-icon control-icon-drop-caret';
	    if (this.props.className) {
	      className += ' ' + this.props.className;
	    }
	    return React.createElement(
	      'svg',
	      { className: className, viewBox: '0 0 48 48', version: '1.1' },
	      React.createElement(
	        'g',
	        { fill: 'none' },
	        React.createElement('polyline', { strokeWidth: '2', strokeMiterlimit: '10', points: '34,19 24,29 14,19 ' })
	      )
	    );
	  }

	});

	module.exports = DropCaret;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
	'use strict';

	var merge = __webpack_require__(18);
	var Cookies = __webpack_require__(63);
	var fallbackLocale = 'en-US';

	function normalizeLocale(locale) {
	  var locales = locale.replace(/_/g, '-').split('-');
	  var normalizedLocale = locales[0];
	  if (locales.length > 1) {
	    normalizedLocale += '-' + locales[1].toUpperCase();
	  }

	  return normalizedLocale;
	}

	module.exports = {
	  getCurrentLocale: function getCurrentLocale() {
	    var cookieLanguages = Cookies.get('languages');
	    var locale = cookieLanguages ? JSON.parse(cookieLanguages)[0] : undefined;
	    if (!locale) {
	      locale = window.navigator.languages ? window.navigator.languages[0] : window.navigator.language || window.navigator.userLanguage;
	    }

	    return normalizeLocale(locale || fallbackLocale);
	  },

	  getLocaleData: function getLocaleData(appLocale) {
	    var locale = this.getCurrentLocale();
	    var grommetMessages;
	    try {
	      grommetMessages = __webpack_require__(8)("./" + locale);
	    } catch (e) {
	      console.warn(locale + ' not supported, fallback to English has been applied.');
	      locale = fallbackLocale;
	      grommetMessages = __webpack_require__(9);
	    }

	    var messages = merge(grommetMessages, appLocale || {});

	    return {
	      locale: locale,
	      messages: messages
	    };
	  }
	};

/***/ },
/* 63 */
/***/ function(module, exports) {

	// (C) Copyright 2015 Hewlett-Packard Development Company, L.P.

	// Slightly modified version of the Mozilla Developer Network version.
	// renamed the module and the functions.

	/*\
	|*|
	|*|  :: cookies.js ::
	|*|
	|*|  A complete cookies reader/writer framework with full unicode support.
	|*|
	|*|  Revision #1 - September 4, 2014
	|*|
	|*|  https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
	|*|  https://developer.mozilla.org/User:fusionchess
	|*|
	|*|  This framework is released under the GNU Public License, version 3 or later.
	|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
	|*|
	|*|  Syntaxes:
	|*|
	|*|  * Cookies.set(name, value[, end[, path[, domain[, secure]]]])
	|*|  * Cookies.get(name)
	|*|  * Cookies.remove(name[, path[, domain]])
	|*|  * Cookies.has(name)
	|*|  * Cookies.keys()
	|*|
	\*/

	"use strict";

	var Cookies = {
	  get: function get(sKey) {
	    if (!sKey) {
	      return null;
	    }
	    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
	  },
	  set: function set(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
	    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
	      return false;
	    }
	    var sExpires = "";
	    if (vEnd) {
	      switch (vEnd.constructor) {
	        case Number:
	          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
	          break;
	        case String:
	          sExpires = "; expires=" + vEnd;
	          break;
	        case Date:
	          sExpires = "; expires=" + vEnd.toUTCString();
	          break;
	      }
	    }
	    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
	    return true;
	  },
	  remove: function remove(sKey, sPath, sDomain) {
	    if (!this.has(sKey)) {
	      return false;
	    }
	    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
	    return true;
	  },
	  has: function has(sKey) {
	    if (!sKey) {
	      return false;
	    }
	    return new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie);
	  },
	  keys: function keys() {
	    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
	    for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
	      aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
	    }
	    return aKeys;
	  }
	};

	module.exports = Cookies;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var Article = __webpack_require__(65);
	var DocsHeader = __webpack_require__(68);
	var Footer = __webpack_require__(72);
	var Section = __webpack_require__(73);
	var Headline = __webpack_require__(74);
	var Tiles = __webpack_require__(75);
	var Tile = __webpack_require__(80);
	var Menu = __webpack_require__(17);
	var Button = __webpack_require__(81);
	var Link = __webpack_require__(2).Link;
	var GrommetLogo = __webpack_require__(71);

	var HomeSection = React.createClass({
	  displayName: 'HomeSection',

	  render: function render() {
	    return React.createElement(
	      Section,
	      _extends({}, this.props, {
	        appCentered: true, justify: 'center', align: 'center', full: true,
	        textCentered: true, pad: { vertical: "large" } }),
	      this.props.children
	    );
	  }
	});

	var Home = React.createClass({
	  displayName: 'Home',

	  _onClick: function _onClick() {
	    // no-op
	  },

	  render: function render() {
	    return React.createElement(
	      Article,
	      { className: 'home', scrollStep: true },
	      React.createElement(DocsHeader, { float: true }),
	      React.createElement(
	        HomeSection,
	        { texture: 'url(img/home_intro.png)', primary: true },
	        React.createElement(GrommetLogo, { large: true, a11yTitle: '' }),
	        React.createElement(
	          Headline,
	          { large: true },
	          'Grommet'
	        ),
	        React.createElement(
	          Headline,
	          { small: true },
	          'The most advanced open source UX framework for enterprise applications.'
	        )
	      ),
	      React.createElement(
	        HomeSection,
	        { colorIndex: 'neutral-1' },
	        React.createElement(
	          Headline,
	          null,
	          'Create once and deliver everywhere.'
	        ),
	        React.createElement(
	          Headline,
	          { small: true },
	          'Application experiences that look great while solving problems.'
	        ),
	        React.createElement(
	          Menu,
	          { direction: 'row', justify: 'center' },
	          React.createElement(
	            Link,
	            { to: 'design' },
	            React.createElement(Button, { label: 'See more examples', onClick: this._onClick, large: true, primary: true })
	          ),
	          React.createElement(
	            Link,
	            { to: 'develop_getstarted' },
	            React.createElement(Button, { label: 'Test our demo app', onClick: this._onClick, large: true })
	          )
	        ),
	        React.createElement('p', null),
	        React.createElement('img', { src: 'img/home_scale.png', alt: 'Tablet and Phone' })
	      ),
	      React.createElement(
	        HomeSection,
	        { colorIndex: 'neutral-2', texture: 'url(img/home_features.png)' },
	        React.createElement(
	          Headline,
	          null,
	          'So little gets you sooooooo much!'
	        ),
	        React.createElement(
	          Headline,
	          { small: true },
	          'We’ve tried it all in enterprise and we think we’ve got a good foundation.'
	        ),
	        React.createElement(
	          Menu,
	          { direction: 'row', justify: 'center' },
	          React.createElement(
	            Link,
	            { to: 'develop_architecture' },
	            React.createElement(Button, { label: 'Our architecture', onClick: this._onClick, large: true, primary: true })
	          ),
	          React.createElement(
	            Link,
	            { to: 'develop_getstarted' },
	            React.createElement(Button, { label: 'How to use', onClick: this._onClick, large: true })
	          )
	        )
	      ),
	      React.createElement(
	        HomeSection,
	        { texture: 'url(img/home_design.png)' },
	        React.createElement(
	          Headline,
	          null,
	          'Ready for your Design Workflow.'
	        ),
	        React.createElement(
	          Headline,
	          { small: true },
	          'All the resources you could possibly need! Sticker sheets, Stencils, PSDs, and more.'
	        ),
	        React.createElement(
	          Menu,
	          { direction: 'row', justify: 'center' },
	          React.createElement(
	            Link,
	            { to: 'design' },
	            React.createElement(Button, { label: 'Start designing', onClick: this._onClick, large: true, primary: true })
	          ),
	          React.createElement(
	            Link,
	            { to: 'design_resources' },
	            React.createElement(Button, { label: 'All resources', onClick: this._onClick, large: true })
	          )
	        ),
	        React.createElement(
	          'p',
	          null,
	          'or, grab your favorite sticker sheet:'
	        ),
	        React.createElement(
	          Tiles,
	          { small: true, fill: true },
	          React.createElement(
	            Tile,
	            { align: 'center' },
	            React.createElement('img', { src: 'img/Adobe_Illustrator.png', title: 'Adobe Illustrator' }),
	            React.createElement(
	              'label',
	              null,
	              'Adobe Illustrator'
	            )
	          ),
	          React.createElement(
	            Tile,
	            { align: 'center' },
	            React.createElement('img', { src: 'img/Adobe_Photoshop.png', title: 'Adobe Photoshop' }),
	            React.createElement(
	              'label',
	              null,
	              'Adobe Photoshop'
	            )
	          ),
	          React.createElement(
	            Tile,
	            { align: 'center' },
	            React.createElement('img', { src: 'img/Sketch.png', title: 'Sketch' }),
	            React.createElement(
	              'label',
	              null,
	              'Sketch'
	            )
	          ),
	          React.createElement(
	            Tile,
	            { align: 'center' },
	            React.createElement('img', { src: 'img/Axure.png', title: 'Axure' }),
	            React.createElement(
	              'label',
	              null,
	              'Axure'
	            )
	          ),
	          React.createElement(
	            Tile,
	            { align: 'center' },
	            React.createElement('img', { src: 'img/Balsamiq.png', title: 'Balsamiq' }),
	            React.createElement(
	              'label',
	              null,
	              'Balsamiq'
	            )
	          )
	        )
	      ),
	      React.createElement(
	        HomeSection,
	        { colorIndex: 'neutral-3' },
	        React.createElement(
	          Headline,
	          null,
	          'Develop your next project with Grommet.'
	        ),
	        React.createElement(
	          Headline,
	          { small: true },
	          'Let’s get an application on your local environment!'
	        ),
	        React.createElement(
	          Menu,
	          { direction: 'row', justify: 'center' },
	          React.createElement(
	            Link,
	            { to: 'develop_getstarted' },
	            React.createElement(Button, { label: 'Start project', onClick: this._onClick, large: true, primary: true })
	          ),
	          React.createElement(
	            Link,
	            { to: 'develop_tutorial' },
	            React.createElement(Button, { label: 'View tutorial', onClick: this._onClick, large: true })
	          )
	        ),
	        React.createElement(
	          'p',
	          null,
	          'or, just copy and paste into terminal:'
	        ),
	        React.createElement(
	          'div',
	          { className: 'console' },
	          React.createElement(
	            'h2',
	            null,
	            'Hello Grommet!'
	          ),
	          React.createElement(
	            'p',
	            null,
	            'The easiest way to learn a new framework is by writing a simple application on top of it. Grommet depends on ',
	            React.createElement(
	              'a',
	              { href: 'https://nodejs.org/',
	                target: '_blank' },
	              'Node'
	            ),
	            ' and ',
	            React.createElement(
	              'a',
	              { href: 'http://gulpjs.com/',
	                target: '_blank' },
	              'Gulp'
	            ),
	            '.'
	          ),
	          React.createElement(
	            'pre',
	            null,
	            React.createElement(
	              'code',
	              null,
	              "$ npm install -g grommet\n$ grommet init sample-app"
	            )
	          )
	        )
	      ),
	      React.createElement(
	        HomeSection,
	        null,
	        React.createElement(
	          Headline,
	          null,
	          'Built with the best stuff.'
	        ),
	        React.createElement(
	          Headline,
	          { small: true },
	          'The tools you know and love, all packaged together in one easy-to-use solution.'
	        ),
	        React.createElement(
	          Menu,
	          { direction: 'row', justify: 'center' },
	          React.createElement(
	            'a',
	            { href: 'https://github.com/HewlettPackard/grommet' },
	            React.createElement(Button, { label: 'View project on Github', onClick: this._onClick, large: true, primary: true })
	          )
	        ),
	        React.createElement(
	          'p',
	          null,
	          'or, check out their sites, they have some cool stuff too...'
	        ),
	        React.createElement(
	          Tiles,
	          { small: true, fill: true, flush: false },
	          React.createElement(
	            Tile,
	            null,
	            React.createElement(
	              'a',
	              { href: 'http://www.w3.org/TR/html5/' },
	              React.createElement('img', { src: 'img/HTML5.png', title: 'HTML5' })
	            )
	          ),
	          React.createElement(
	            Tile,
	            null,
	            React.createElement(
	              'a',
	              { href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3' },
	              React.createElement('img', { src: 'img/CSS3.png', title: 'CSS3' })
	            )
	          ),
	          React.createElement(
	            Tile,
	            null,
	            React.createElement(
	              'a',
	              { href: 'https://nodejs.org' },
	              React.createElement('img', { src: 'img/NodeJS.png', title: 'NodeJS' })
	            )
	          ),
	          React.createElement(
	            Tile,
	            null,
	            React.createElement(
	              'a',
	              { href: 'https://github.com/inuitcss' },
	              React.createElement('img', { src: 'img/InuitCSS.png', title: 'InuitCSS' })
	            )
	          ),
	          React.createElement(
	            Tile,
	            null,
	            React.createElement(
	              'a',
	              { href: 'http://facebook.github.io/react/' },
	              React.createElement('img', { src: 'img/reactjs.png', title: 'ReactJS' })
	            )
	          ),
	          React.createElement(
	            Tile,
	            null,
	            React.createElement(
	              'a',
	              { href: 'http://gulpjs.com' },
	              React.createElement('img', { src: 'img/gulp.png', title: 'Gulp' })
	            )
	          ),
	          React.createElement(
	            Tile,
	            null,
	            React.createElement(
	              'a',
	              { href: 'http://webpack.github.io' },
	              React.createElement('img', { src: 'img/webpack.png', title: 'Webpack' })
	            )
	          )
	        )
	      ),
	      React.createElement(
	        HomeSection,
	        { colorIndex: 'neutral-2' },
	        React.createElement(
	          Headline,
	          null,
	          'Let’s keep in touch!'
	        ),
	        React.createElement(
	          Headline,
	          { small: true },
	          'Follow us on the Grommet blog to get the latest updates.'
	        ),
	        React.createElement(
	          Menu,
	          { direction: 'row', justify: 'center' },
	          React.createElement(
	            Link,
	            { to: 'develop_getstarted' },
	            React.createElement(Button, { label: 'Grommet blog', onClick: this._onClick, large: true, primary: true })
	          )
	        ),
	        React.createElement(
	          'p',
	          null,
	          'We also pop our heads out at these place as well...'
	        ),
	        React.createElement(
	          Tiles,
	          { fill: true },
	          React.createElement(
	            Tile,
	            null,
	            React.createElement(
	              'a',
	              { href: 'http://grommet.io/slackin' },
	              React.createElement('img', { src: 'img/slack.png', title: 'Slack' }),
	              React.createElement(
	                'div',
	                null,
	                'grommet'
	              )
	            )
	          ),
	          React.createElement(
	            Tile,
	            null,
	            React.createElement(
	              'a',
	              { href: 'https://twitter.com/grommetux' },
	              React.createElement('img', { src: 'img/twitter.png', title: 'Twitter' }),
	              React.createElement(
	                'div',
	                null,
	                '@grommetux'
	              )
	            )
	          ),
	          React.createElement(
	            Tile,
	            null,
	            React.createElement(
	              'a',
	              { href: 'https://www.facebook.com/grommetux' },
	              React.createElement('img', { src: 'img/facebook.png', title: 'Facebook' }),
	              React.createElement(
	                'div',
	                null,
	                'grommetux'
	              )
	            )
	          ),
	          React.createElement(
	            Tile,
	            null,
	            React.createElement(
	              'a',
	              { href: 'https://vimeo.com/grommetux' },
	              React.createElement('img', { src: 'img/vimeo.png', title: 'Vimeo' }),
	              React.createElement(
	                'div',
	                null,
	                'grommetux'
	              )
	            )
	          ),
	          React.createElement(
	            Tile,
	            null,
	            React.createElement(
	              'a',
	              { href: 'http://youtube.com' },
	              React.createElement('img', { src: 'img/youtube.png', title: 'Youtube' }),
	              React.createElement(
	                'div',
	                null,
	                'grommetux'
	              )
	            )
	          )
	        )
	      ),
	      React.createElement(
	        Footer,
	        { className: 'docs__footer',
	          appCentered: true, direction: 'column', align: 'center', pad: 'large',
	          colorIndex: 'grey-1' },
	        React.createElement(
	          'h3',
	          null,
	          'Build your ideas with Grommet!'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'This work is licensed under the ',
	          React.createElement(
	            'a',
	            { href: 'http://creativecommons.org/licenses/by/4.0/legalcode' },
	            'Creative Commons Attribution 4.0 International License'
	          ),
	          '.'
	        ),
	        React.createElement(
	          Menu,
	          { label: 'Theme' },
	          React.createElement(
	            'a',
	            { href: '/docs/', className: this.props.theme === 'generic' ? 'active' : '' },
	            'Grommet'
	          ),
	          React.createElement(
	            'a',
	            { href: '/docs/hpe/', className: this.props.theme === 'hpe' ? 'active' : '' },
	            'HPE'
	          ),
	          React.createElement(
	            'a',
	            { href: '/docs/hpinc/', className: this.props.theme === 'hpinc' ? 'active' : '' },
	            'HPInc'
	          ),
	          React.createElement(
	            'a',
	            { href: '/docs/aruba/', className: this.props.theme === 'aruba' ? 'active' : '' },
	            'Aruba'
	          )
	        )
	      )
	    );
	  }

	});

	module.exports = Home;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var merge = __webpack_require__(18);
	var pick = __webpack_require__(51);
	var keys = __webpack_require__(44);
	var Box = __webpack_require__(59);
	var KeyboardAccelerators = __webpack_require__(16);
	var DOM = __webpack_require__(57);
	var Scroll = __webpack_require__(66);
	var SkipLinkAnchor = __webpack_require__(67);

	var CLASS_ROOT = "article";

	var Article = React.createClass({
	  displayName: 'Article',

	  propTypes: merge({
	    scrollStep: React.PropTypes.bool,
	    primary: React.PropTypes.bool
	  }, Box.propTypes),

	  mixins: [KeyboardAccelerators],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      pad: 'none',
	      direction: 'column'
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    if (this.props.scrollStep) {
	      this._markInactive();
	      var articleElement = this.refs.component.getDOMNode();
	      this._scrollParent = DOM.findScrollParents(articleElement)[0];
	      document.addEventListener('wheel', this._onWheel);
	      this._scrollParent.addEventListener('scroll', this._onScroll);
	      this.startListeningToKeyboard({
	        up: this._onUp,
	        down: this._onDown
	      });
	    }
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    if (this.props.scrollStep) {
	      document.removeEventListener('wheel', this._onWheel);
	      clearInterval(this._scrollToTimer);
	      this._scrollParent.removeEventListener('scroll', this._onScroll);
	      clearTimeout(this._scrollTimer);
	      this.stopListeningToKeyboard({
	        up: this._onUp,
	        down: this._onDown
	      });
	    }
	  },

	  _markInactive: function _markInactive() {
	    var articleElement = this.refs.component.getDOMNode();
	    var sections = articleElement.querySelectorAll('.section.box--full');
	    for (var i = 0; i < sections.length; i += 1) {
	      var section = sections[i];
	      var rect = section.getBoundingClientRect();
	      if (rect.top > window.innerHeight - 10) {
	        section.classList.add('section--inactive');
	      } else {
	        section.classList.remove('section--inactive');
	      }
	    }
	  },

	  _onScroll: function _onScroll(event) {
	    clearTimeout(this._scrollTimer);
	    this._scrollTimer = setTimeout(this._markInactive, 50);
	  },

	  _onWheel: function _onWheel(event) {
	    if (Math.abs(event.deltaY) > 100) {
	      clearInterval(this._scrollTimer);
	    } else if (event.deltaY > 5) {
	      this._onDown();
	    } else if (event.deltaY < -5) {
	      this._onUp();
	    }
	  },

	  _onDown: function _onDown(event) {
	    if (event) {
	      event.preventDefault();
	    }
	    var articleElement = this.refs.component.getDOMNode();
	    var sections = articleElement.querySelectorAll('.section.box--full');
	    for (var i = 0; i < sections.length; i += 1) {
	      var section = sections[i];
	      var rect = section.getBoundingClientRect();
	      // 10 is for fuzziness
	      if (rect.bottom > 10 && (event || rect.bottom < window.innerHeight)) {
	        Scroll.scrollBy(this._scrollParent, 'scrollTop', rect.bottom);
	        break;
	      }
	    }
	  },

	  _onUp: function _onUp(event) {
	    if (event) {
	      event.preventDefault();
	    }
	    var articleElement = this.refs.component.getDOMNode();
	    var sections = articleElement.querySelectorAll('.section.box--full');
	    for (var i = 0; i < sections.length; i += 1) {
	      var section = sections[i];
	      var rect = section.getBoundingClientRect();
	      // -10 is for fuzziness
	      if ((rect.top >= -10 || i === sections.length - 1) && (event || rect.top < window.innerHeight)) {
	        if (i > 0) {
	          section = sections[i - 1];
	          rect = section.getBoundingClientRect();
	          Scroll.scrollBy(this._scrollParent, 'scrollTop', rect.top);
	        }
	        break;
	      }
	    }
	  },

	  render: function render() {
	    var classes = [CLASS_ROOT];
	    var other = pick(this.props, keys(Box.propTypes));
	    if (this.props.scrollStep) {
	      classes.push(CLASS_ROOT + "--scroll-step");
	    }
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }

	    var skipLinkAnchor = null;
	    if (this.props.primary) {
	      skipLinkAnchor = React.createElement(SkipLinkAnchor, { label: 'Main Content' });
	    }
	    return React.createElement(
	      Box,
	      _extends({ ref: 'component', tag: 'article' }, other, { className: classes.join(' ') }),
	      skipLinkAnchor,
	      this.props.children
	    );
	  }
	});

	module.exports = Article;

/***/ },
/* 66 */
/***/ function(module, exports) {

	// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

	/*
	 * Scroll provides smooth scrolling.
	 */

	"use strict";

	var SCROLL_STEPS = 25;

	var Scroll = {

	  _easeInOutQuad: function _easeInOutQuad(t) {
	    return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
	  },

	  // component: component to scroll
	  // property: 'scrollTop' | 'scrollLeft'
	  // delta: amount to scroll

	  scrollBy: function scrollBy(component, property, delta) {
	    clearInterval(this._scrollToTimer);
	    var start = component[property];
	    var position = start + delta;
	    var step = 1;
	    this._scrollToTimer = setInterval((function () {
	      var next;
	      var easing = this._easeInOutQuad(step / SCROLL_STEPS);
	      if (position > start) {
	        next = Math.min(position, Math.max(component[property], Math.round(start + (position - start) * easing)));
	      } else {
	        next = Math.max(position, Math.min(component[property], Math.round(start - (start - position) * easing)));
	      }
	      component[property] = next;
	      step += 1;
	      if (step > SCROLL_STEPS) {
	        // we're done
	        clearInterval(this._scrollToTimer);
	      }
	    }).bind(this), 8);
	  }
	};

	module.exports = Scroll;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var IntlMixin = __webpack_require__(3);

	var SkipLinkAnchor = React.createClass({
	  displayName: 'SkipLinkAnchor',

	  propTypes: {
	    label: React.PropTypes.string.isRequired
	  },

	  mixins: [IntlMixin],

	  render: function render() {
	    var id = 'skip-link-' + this.props.label.toLowerCase().replace(/ /g, '_');
	    return React.createElement('a', { tabIndex: '-1', id: id, 'data-skip-label': this.getGrommetIntlMessage(this.props.label), className: 'skip-link-anchor' });
	  }

	});

	module.exports = SkipLinkAnchor;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Header = __webpack_require__(69);
	var Title = __webpack_require__(70);
	var Box = __webpack_require__(59);
	var GrommetLogo = __webpack_require__(71);
	var Menu = __webpack_require__(17);
	var Link = __webpack_require__(2).Link;

	var DocsHeader = React.createClass({
	  displayName: 'DocsHeader',

	  propTypes: {
	    float: React.PropTypes.bool
	  },

	  render: function render() {
	    return React.createElement(
	      Header,
	      { fixed: false, float: this.props.float, large: true,
	        appCentered: true, justify: 'between' },
	      React.createElement(
	        Title,
	        { responsive: false },
	        React.createElement(
	          Link,
	          { to: 'docs' },
	          React.createElement(
	            Box,
	            { align: 'center', direction: 'row' },
	            React.createElement(GrommetLogo, { small: true, a11yTitle: '' }),
	            'Grommet'
	          )
	        )
	      ),
	      React.createElement(
	        Menu,
	        { direction: 'row', responsive: false },
	        React.createElement(
	          Link,
	          { id: 'design-link', to: 'design' },
	          'Design'
	        ),
	        React.createElement(
	          Link,
	          { id: 'develop-link', to: 'develop' },
	          'Develop'
	        )
	      )
	    );
	  }
	});

	module.exports = DocsHeader;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var merge = __webpack_require__(18);
	var pick = __webpack_require__(51);
	var keys = __webpack_require__(44);
	var Box = __webpack_require__(59);

	var CLASS_ROOT = "header";

	var Header = React.createClass({
	  displayName: 'Header',

	  propTypes: merge({
	    fixed: React.PropTypes.bool,
	    float: React.PropTypes.bool,
	    large: React.PropTypes.bool,
	    small: React.PropTypes.bool,
	    splash: React.PropTypes.bool,
	    strong: React.PropTypes.bool,
	    tag: React.PropTypes.string
	  }, Box.propTypes),

	  getDefaultProps: function getDefaultProps() {
	    return {
	      pad: 'none',
	      direction: 'row',
	      align: 'center',
	      responsive: false,
	      tag: 'header'
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    if (this.props.fixed) {
	      this._alignMirror();
	      window.addEventListener('resize', this._onResize);
	    }
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    if (this.props.fixed) {
	      this._alignMirror();
	    }
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    if (this.props.fixed) {
	      window.removeEventListener('resize', this._onResize);
	    }
	  },

	  _onResize: function _onResize() {
	    this._alignMirror();
	  },

	  _alignMirror: function _alignMirror() {
	    var contentElement = this.refs.content.getDOMNode();
	    var mirrorElement = this.refs.mirror.getDOMNode();

	    // constrain fixed content to the width of the mirror
	    var mirrorRect = mirrorElement.getBoundingClientRect();
	    contentElement.style.width = '' + Math.floor(mirrorRect.width) + 'px';

	    // align the mirror height with the content's height
	    var contentRect = contentElement.getBoundingClientRect();
	    mirrorElement.style.height = '' + Math.floor(contentRect.height) + 'px';
	  },

	  render: function render() {
	    var classes = [CLASS_ROOT];
	    var containerClasses = [CLASS_ROOT + "__container"];
	    var other = pick(this.props, keys(Box.propTypes));
	    if (this.props.fixed) {
	      containerClasses.push(CLASS_ROOT + "__container--fixed");
	    }
	    if (this.props.float) {
	      classes.push(CLASS_ROOT + "--float");
	      containerClasses.push(CLASS_ROOT + "__container--float");
	    }
	    if (this.props.large) {
	      classes.push(CLASS_ROOT + "--large");
	    }
	    if (this.props.small) {
	      classes.push(CLASS_ROOT + "--small");
	    }
	    if (this.props.splash) {
	      classes.push(CLASS_ROOT + "--splash");
	    }
	    if (this.props.strong) {
	      classes.push(CLASS_ROOT + "--strong");
	    }
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }

	    if (this.props.fixed) {
	      return React.createElement(
	        'div',
	        { className: containerClasses.join(' ') },
	        React.createElement('div', { ref: 'mirror', className: CLASS_ROOT + "__mirror" }),
	        React.createElement(
	          'div',
	          { className: CLASS_ROOT + "__wrapper" },
	          React.createElement(
	            Box,
	            _extends({ ref: 'content', tag: this.props.header }, other, { className: classes.join(' ') }),
	            this.props.children
	          )
	        )
	      );
	    } else {
	      return React.createElement(
	        Box,
	        _extends({ tag: this.props.header }, other, { className: classes.join(' '),
	          containerClassName: containerClasses.join(' ') }),
	        this.props.children
	      );
	    }
	  }

	});

	module.exports = Header;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Box = __webpack_require__(59);

	var CLASS_ROOT = "title";

	var Title = React.createClass({
	  displayName: 'Title',

	  propTypes: {
	    onClick: React.PropTypes.func,
	    responsive: React.PropTypes.bool
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      responsive: true
	    };
	  },

	  render: function render() {
	    var classes = [CLASS_ROOT];
	    if (this.props.responsive) {
	      classes.push(CLASS_ROOT + "--responsive");
	    }
	    if (this.props.onClick) {
	      classes.push(CLASS_ROOT + "--interactive");
	    }
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }

	    return React.createElement(
	      Box,
	      { align: 'center', direction: 'row', responsive: false,
	        className: classes.join(' '), onClick: this.props.onClick },
	      this.props.children
	    );
	  }

	});

	module.exports = Title;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var CLASS_ROOT = "logo-icon";
	var IntlMixin = __webpack_require__(3);

	var Grommet = React.createClass({
	  displayName: 'Grommet',

	  propTypes: {
	    small: React.PropTypes.bool,
	    large: React.PropTypes.bool,
	    a11yTitle: React.PropTypes.string
	  },

	  mixins: [IntlMixin],

	  getDefaultProps: function getDefaultProps() {
	    return { a11yTitle: 'Grommet' };
	  },

	  render: function render() {
	    var classes = [CLASS_ROOT];
	    if (this.props.small) {
	      classes.push(CLASS_ROOT + "--small");
	    }
	    if (this.props.large) {
	      classes.push(CLASS_ROOT + "--large");
	    }
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }
	    var logoTitleId = 'grommet-logo-title';
	    return React.createElement(
	      'svg',
	      { className: classes.join(' '), viewBox: '0 0 140 140', version: '1.1', role: 'img', 'aria-labelledby': logoTitleId },
	      React.createElement(
	        'title',
	        { id: logoTitleId },
	        this.getGrommetIntlMessage(this.props.a11yTitle)
	      ),
	      React.createElement('path', { role: 'presentation', d: 'M119.49603,20.5014878 L100.989057,39.0094878 C105.89805,43.9184878 109.859044,49.7734878 111.669042,55.3734878 C122.692025,89.4684878 93.3250687,120.604488 59.5321185,112.820488 C44.9911399,109.470488 30.5211612,94.9984878 27.1751661,80.4564878 C20.432176,51.1514878 42.9571429,25.1854878 71.2931012,25.9974878 L93.3090687,3.98048778 C86.0960794,1.43348778 78.3420908,0.0304877767 70.2641027,0.000487776719 C32.014159,-0.141512223 0.549205302,30.7384878 0.00720609982,68.9844878 C-0.547793083,108.124488 31.0271604,140.024488 70.045103,139.999488 C108.802046,139.975488 140,108.756488 140,70.0004878 C140,50.6694878 132.164012,33.1694878 119.49603,20.5014878 L119.49603,20.5014878 Z', fill: '#8C50FF' }),
	      React.createElement('path', { role: 'presentation', d: 'M27.1736636,80.457549 C30.5194807,94.999549 44.98869,109.472549 59.5288954,112.821549 C93.3190487,120.605549 122.685444,89.469549 111.663046,55.374549 C109.852145,49.774549 105.891362,43.918549 100.98363,39.010549 L69.9953234,70.000549 L100.083679,70.001549 C100.083679,86.762549 86.3804279,100.322549 69.5663468,100.089549 C53.4302287,99.865549 40.23095,86.746549 39.9119674,70.611549 C39.7429767,62.061549 43.140791,54.304549 48.7174862,48.725549 L48.6404904,48.648549 L71.2872528,25.998549 C42.9548011,25.186549 20.4310321,51.152549 27.1736636,80.457549 L27.1736636,80.457549 Z', fill: '#333333' })
	    );
	  }

	});

	module.exports = Grommet;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var merge = __webpack_require__(18);
	var pick = __webpack_require__(51);
	var keys = __webpack_require__(44);
	var Box = __webpack_require__(59);
	var SkipLinkAnchor = __webpack_require__(67);

	var CLASS_ROOT = "footer";

	var Footer = React.createClass({
	  displayName: 'Footer',

	  propTypes: merge({
	    large: React.PropTypes.bool,
	    small: React.PropTypes.bool,
	    float: React.PropTypes.bool
	  }, Box.propTypes),

	  getDefaultProps: function getDefaultProps() {
	    return {
	      pad: 'none',
	      direction: 'row',
	      responsive: false
	    };
	  },

	  render: function render() {
	    var classes = [CLASS_ROOT];
	    var containerClasses = [CLASS_ROOT + "__container"];
	    var other = pick(this.props, keys(Box.propTypes));
	    if (this.props.large) {
	      classes.push(CLASS_ROOT + "--large");
	    }
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }
	    if (this.props.float) {
	      classes.push(CLASS_ROOT + "--float");
	      containerClasses.push(CLASS_ROOT + "__container--float");
	    }

	    return React.createElement(
	      Box,
	      _extends({ tag: 'footer' }, other, { className: classes.join(' '),
	        containerClassName: containerClasses.join(' ') }),
	      React.createElement(SkipLinkAnchor, { label: 'Footer' }),
	      this.props.children
	    );
	  }

	});

	module.exports = Footer;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var Box = __webpack_require__(59);
	var SkipLinkAnchor = __webpack_require__(67);
	var merge = __webpack_require__(18);

	var CLASS_ROOT = "section";

	var Section = React.createClass({
	  displayName: 'Section',

	  propTypes: merge(Box.propTypes, {
	    primary: React.PropTypes.bool
	  }),

	  getDefaultProps: function getDefaultProps() {
	    return { pad: { vertical: 'medium' } };
	  },

	  render: function render() {
	    var classes = [CLASS_ROOT];
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }

	    var skipLinkAnchor = null;
	    if (this.props.primary) {
	      skipLinkAnchor = React.createElement(SkipLinkAnchor, { label: 'Main Content' });
	    }

	    return React.createElement(
	      Box,
	      _extends({ tag: 'section' }, this.props, { className: classes.join(' ') }),
	      skipLinkAnchor,
	      this.props.children
	    );
	  }

	});

	module.exports = Section;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	"use strict";

	var React = __webpack_require__(1);

	var CLASS_ROOT = "headline";

	var Headline = React.createClass({
	  displayName: "Headline",

	  propTypes: {
	    colorIndex: React.PropTypes.string,
	    large: React.PropTypes.bool,
	    small: React.PropTypes.bool,
	    strong: React.PropTypes.bool
	  },

	  render: function render() {
	    var classes = [CLASS_ROOT];
	    if (this.props.large) {
	      classes.push(CLASS_ROOT + "--large");
	    }
	    if (this.props.small) {
	      classes.push(CLASS_ROOT + "--small");
	    }
	    if (this.props.strong) {
	      classes.push(CLASS_ROOT + "--strong");
	    }
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }

	    return React.createElement(
	      "div",
	      { className: classes.join(' ') },
	      this.props.children
	    );
	  }

	});

	module.exports = Headline;

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var SpinningIcon = __webpack_require__(76);
	var LeftIcon = __webpack_require__(77);
	var RightIcon = __webpack_require__(78);
	var Scroll = __webpack_require__(66);
	var InfiniteScroll = __webpack_require__(79);

	var CLASS_ROOT = "tiles";

	var Tiles = React.createClass({
	  displayName: 'Tiles',

	  propTypes: {
	    direction: React.PropTypes.oneOf(['row', 'column']),
	    fill: React.PropTypes.bool,
	    flush: React.PropTypes.bool,
	    onMore: React.PropTypes.func,
	    size: React.PropTypes.oneOf(['small', 'medium', 'large']),
	    small: React.PropTypes.bool
	  },

	  mixins: [InfiniteScroll],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      flush: true,
	      fill: false,
	      small: false
	    };
	  },

	  _onLeft: function _onLeft() {
	    var tiles = this.refs.tiles.getDOMNode();
	    Scroll.scrollBy(tiles, 'scrollLeft', -tiles.offsetWidth);
	  },

	  _onRight: function _onRight() {
	    var tiles = this.refs.tiles.getDOMNode();
	    Scroll.scrollBy(tiles, 'scrollLeft', tiles.offsetWidth);
	  },

	  _onScrollHorizontal: function _onScrollHorizontal() {
	    // debounce
	    clearTimeout(this._scrollTimer);
	    this._scrollTimer = setTimeout(this._layout, 50);
	  },

	  _onWheel: function _onWheel(event) {
	    if (Math.abs(event.deltaX) > 100) {
	      clearInterval(this._scrollTimer);
	    } else if (event.deltaX > 5) {
	      this._onRight();
	    } else if (event.deltaX < -5) {
	      this._onLeft();
	    }
	  },

	  _layout: function _layout() {
	    if ('row' === this.props.direction) {
	      // determine if we have more tiles than room to fit
	      var tiles = this.refs.tiles.getDOMNode();
	      // 20 is to allow some fuzziness as scrollbars come and go
	      this.setState({
	        overflow: tiles.scrollWidth > tiles.offsetWidth + 20,
	        overflowStart: tiles.scrollLeft <= 20,
	        overflowEnd: tiles.scrollLeft >= tiles.scrollWidth - tiles.offsetWidth
	      });

	      // mark any tiles that might be clipped
	      var rect = tiles.getBoundingClientRect();
	      var children = tiles.querySelectorAll('.tile');
	      for (var i = 0; i < children.length; i += 1) {
	        var child = children[i];
	        var childRect = child.getBoundingClientRect();
	        // 12 accounts for padding
	        if (childRect.left + 12 < rect.left || childRect.right - 12 > rect.right) {
	          child.classList.add('tile--eclipsed');
	        } else {
	          child.classList.remove('tile--eclipsed');
	        }
	      }
	    }
	  },

	  _onResize: function _onResize() {
	    // debounce
	    clearTimeout(this._resizeTimer);
	    this._resizeTimer = setTimeout(this._layout, 50);
	  },

	  getInitialState: function getInitialState() {
	    return { overflow: false };
	  },

	  _trackHorizontalScroll: function _trackHorizontalScroll() {
	    if (this.state.overflow && !this._tracking) {
	      var tiles = this.refs.tiles.getDOMNode();
	      tiles.addEventListener('scroll', this._onScrollHorizontal);
	      this._tracking = true;
	    }
	  },

	  componentDidMount: function componentDidMount() {
	    if (this.props.onMore) {
	      this.startListeningForScroll(this.refs.more.getDOMNode(), this.props.onMore);
	    }
	    if ('row' === this.props.direction) {
	      window.addEventListener('resize', this._onResize);
	      document.addEventListener('wheel', this._onWheel);
	      this._trackHorizontalScroll();
	      this._layout();
	    }
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    this.stopListeningForScroll();
	    if (this.props.onMore) {
	      this.startListeningForScroll(this.refs.more.getDOMNode(), this.props.onMore);
	    }
	    if ('row' === this.props.direction) {
	      this._trackHorizontalScroll();
	    }
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    if (this.props.onMore) {
	      this.stopListeningForScroll();
	    }
	    if ('row' === this.props.direction) {
	      window.removeEventListener('resize', this._onResize);
	      document.removeEventListener('wheel', this._onWheel);
	      if (this._tracking) {
	        var tiles = this.refs.tiles.getDOMNode();
	        tiles.removeEventListener('scroll', this._onScrollHorizontal);
	      }
	    }
	  },

	  // children should be an array of Tile
	  render: function render() {
	    var classes = [CLASS_ROOT];
	    if (this.props.fill) {
	      classes.push(CLASS_ROOT + "--fill");
	    }
	    if (this.props.flush) {
	      classes.push(CLASS_ROOT + "--flush");
	    }
	    if (this.props.size) {
	      classes.push(CLASS_ROOT + "--" + this.props.size);
	    } else if (this.props.small) {
	      classes.push(CLASS_ROOT + "--small");
	    }
	    if (this.props.direction) {
	      classes.push(CLASS_ROOT + "--direction-" + this.props.direction);
	    }
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }

	    var more = null;
	    if (this.props.onMore) {
	      classes.push(CLASS_ROOT + "--moreable");
	      more = React.createElement(
	        'div',
	        { ref: 'more', className: CLASS_ROOT + "__more" },
	        React.createElement(SpinningIcon, null)
	      );
	    }

	    var contents = React.createElement(
	      'div',
	      { ref: 'tiles', className: classes.join(' ') },
	      this.props.children,
	      more
	    );

	    if (this.state.overflow) {
	      classes.push(CLASS_ROOT + "--overflowed");
	      if (!this.state.overflowStart) {
	        var left = React.createElement(
	          'div',
	          { className: CLASS_ROOT + "__left", onClick: this._onLeft },
	          React.createElement(LeftIcon, null)
	        );
	      }
	      if (!this.state.overflowEnd) {
	        var right = React.createElement(
	          'div',
	          { className: CLASS_ROOT + "__right", onClick: this._onRight },
	          React.createElement(RightIcon, null)
	        );
	      }

	      contents = React.createElement(
	        'div',
	        { className: CLASS_ROOT + "__container" },
	        left,
	        contents,
	        right
	      );
	    }

	    return contents;
	  }

	});

	module.exports = Tiles;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	"use strict";

	var React = __webpack_require__(1);

	var CLASS_ROOT = "icon-spinning";

	var Spinning = React.createClass({
	  displayName: "Spinning",

	  render: function render() {
	    var classes = [CLASS_ROOT];
	    if (this.props.small) {
	      classes.push(CLASS_ROOT + "--small");
	    }
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }
	    return React.createElement(
	      "svg",
	      { className: classes.join(' '), viewBox: "0 0 48 48", version: "1.1" },
	      React.createElement("circle", { stroke: "#ddd", strokeWidth: "4", strokeDasharray: "24px 8px", fill: "none", cx: "24", cy: "24", r: "20" }),
	      React.createElement("circle", { stroke: "#333", strokeWidth: "4", strokeDasharray: "24px 104px", fill: "none", cx: "24", cy: "24", r: "20" })
	    );
	  }

	});

	module.exports = Spinning;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);

	var Left = React.createClass({
	  displayName: 'Left',

	  render: function render() {
	    var className = 'control-icon control-icon-left';
	    if (this.props.className) {
	      className += ' ' + this.props.className;
	    }
	    return React.createElement(
	      'svg',
	      { className: className, viewBox: '0 0 48 48', version: '1.1' },
	      React.createElement(
	        'g',
	        { fill: 'none' },
	        React.createElement('polyline', { strokeWidth: '2', points: '20.9,34 13,24 21,14 ' }),
	        React.createElement('path', { strokeWidth: '2', d: 'M13.3,24C36,24,36,24,36,24' })
	      )
	    );
	  }

	});

	module.exports = Left;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);

	var Right = React.createClass({
	  displayName: 'Right',

	  render: function render() {
	    var className = 'control-icon control-icon-right';
	    if (this.props.className) {
	      className += ' ' + this.props.className;
	    }
	    return React.createElement(
	      'svg',
	      { className: className, viewBox: '0 0 48 48', version: '1.1' },
	      React.createElement(
	        'g',
	        { fill: 'none' },
	        React.createElement('polyline', { strokeWidth: '2', points: '27.1,14 35,24 27,34' }),
	        React.createElement('path', { strokeWidth: '2', d: 'M34.7,24C12,24,12,24,12,24' })
	      )
	    );
	  }

	});

	module.exports = Right;

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

	"use strict";

	var DOM = __webpack_require__(57);

	var SCROLL_MORE_DELAY = 2000; // when the user scrolls
	var SCROLL_MORE_INITIAL_DELAY = 200; // when we start out at the bottom already

	var InfiniteScroll = {

	  _infiniteScroll: {
	    indicatorElement: null,
	    scrollParent: null,
	    onEnd: null
	  },

	  _onScroll: function _onScroll() {
	    // delay a bit to ride out quick users
	    clearTimeout(this._infiniteScroll.scrollTimer);
	    this._infiniteScroll.scrollTimer = setTimeout((function () {
	      // are we at the bottom?
	      var parentRect = this._infiniteScroll.scrollParent.getBoundingClientRect();
	      var indicatorRect = this._infiniteScroll.indicatorElement.getBoundingClientRect();
	      if (indicatorRect.bottom <= parentRect.bottom) {
	        this._infiniteScroll.onEnd();
	      }
	    }).bind(this), SCROLL_MORE_DELAY);
	  },

	  startListeningForScroll: function startListeningForScroll(indicatorElement, onEnd) {
	    this._infiniteScroll.onEnd = onEnd;
	    this._infiniteScroll.indicatorElement = indicatorElement;
	    this._infiniteScroll.scrollParent = DOM.findScrollParents(indicatorElement)[0];
	    this._infiniteScroll.scrollParent.addEventListener("scroll", this._onScroll);
	    // check in case we're already at the bottom
	    if (this._infiniteScroll.scrollParent === document) {
	      this._infiniteScroll.scrollTimer = setTimeout(onEnd, SCROLL_MORE_INITIAL_DELAY);
	    }
	  },

	  stopListeningForScroll: function stopListeningForScroll() {
	    if (this._infiniteScroll.scrollParent) {
	      clearTimeout(this._infiniteScroll.scrollTimer);
	      this._infiniteScroll.scrollParent.removeEventListener("scroll", this._onScroll);
	      this._infiniteScroll.scrollParent = null;
	    }
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    this.stopListeningForScroll();
	  }
	};

	module.exports = InfiniteScroll;

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var merge = __webpack_require__(18);
	var pick = __webpack_require__(51);
	var keys = __webpack_require__(44);
	var Box = __webpack_require__(59);

	var CLASS_ROOT = "tile";

	var Tile = React.createClass({
	  displayName: 'Tile',

	  propTypes: merge({
	    selected: React.PropTypes.bool,
	    status: React.PropTypes.string,
	    wide: React.PropTypes.bool
	  }, Box.propTypes),

	  getDefaultProps: function getDefaultProps() {
	    return {
	      pad: 'none',
	      direction: 'column',
	      align: 'center'
	    };
	  },

	  render: function render() {
	    var classes = [CLASS_ROOT];
	    var other = pick(this.props, keys(Box.propTypes));
	    if (this.props.status) {
	      classes.push(CLASS_ROOT + "--status-" + this.props.status.toLowerCase());
	    }
	    if (this.props.wide) {
	      classes.push(CLASS_ROOT + "--wide");
	    }
	    if (this.props.onClick) {
	      classes.push(CLASS_ROOT + "--selectable");
	    }
	    if (this.props.selected) {
	      classes.push(CLASS_ROOT + "--selected");
	    }
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }

	    return React.createElement(
	      Box,
	      _extends({ className: classes.join(' ') }, other, { onClick: this.props.onClick }),
	      this.props.children
	    );
	  }

	});

	module.exports = Tile;

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);

	var CLASS_ROOT = "button";

	var Button = React.createClass({
	  displayName: 'Button',

	  propTypes: {
	    accent: React.PropTypes.bool,
	    label: React.PropTypes.string.isRequired,
	    large: React.PropTypes.bool,
	    onClick: React.PropTypes.func,
	    primary: React.PropTypes.bool,
	    type: React.PropTypes.oneOf(['button', 'reset', 'submit']),
	    id: React.PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      type: "button"
	    };
	  },

	  render: function render() {
	    var classes = [CLASS_ROOT];
	    if (this.props.primary) {
	      classes.push(CLASS_ROOT + "--primary");
	    }
	    if (this.props.accent) {
	      classes.push(CLASS_ROOT + "--accent");
	    }
	    if (!this.props.onClick) {
	      classes.push(CLASS_ROOT + "--disabled");
	    }
	    if (this.props.large) {
	      classes.push(CLASS_ROOT + "--large");
	    }
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }

	    return React.createElement(
	      'button',
	      { id: this.props.id, type: this.props.type, className: classes.join(' '),
	        onClick: this.props.onClick },
	      this.props.label
	    );
	  }

	});

	module.exports = Button;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Article = __webpack_require__(65);
	var DocsHeader = __webpack_require__(68);
	var Section = __webpack_require__(73);
	var TBD = __webpack_require__(83);

	var Introduction = React.createClass({
	  displayName: 'Introduction',

	  render: function render() {
	    return React.createElement(
	      Article,
	      null,
	      React.createElement(DocsHeader, null),
	      React.createElement(
	        Section,
	        { colorIndex: 'neutral-1', primary: true },
	        React.createElement(
	          'h1',
	          null,
	          'Introduction'
	        )
	      ),
	      React.createElement(
	        Section,
	        null,
	        React.createElement(TBD, null)
	      )
	    );
	  }
	});

	module.exports = Introduction;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);

	var TBD = React.createClass({
	  displayName: 'TBD',

	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: "tbd" },
	      'TBD'
	    );
	  }

	});

	module.exports = TBD;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Router = __webpack_require__(2);
	var Route = Router.Route;
	var RouteHandler = Router.RouteHandler;
	var Link = Router.Link;

	var Article = __webpack_require__(65);
	var DocsHeader = __webpack_require__(68);
	var Section = __webpack_require__(73);
	var DocsSplit = __webpack_require__(85);
	var DocsMenu = __webpack_require__(89);
	var Menu = __webpack_require__(17);
	var Button = __webpack_require__(81);

	//var Introduction = require('./Introduction');
	var Philosophy = __webpack_require__(90);
	var Basics = __webpack_require__(91);
	var Patterns = __webpack_require__(117);
	var Showcase = __webpack_require__(127);
	var Login = __webpack_require__(128);
	var TBD = __webpack_require__(83);
	var Resources = __webpack_require__(129);

	var CONTENTS = [
	//{route: "design_introduction", label: 'Introduction', component: Introduction},
	{ route: "design_philosophy", label: 'Philosophy', component: Philosophy,
	  contents: [{ label: 'Best Practices', id: 'best-practices' }, { label: 'Usability', id: 'usability' }, { label: 'Interactions', id: 'interactions' }, { label: 'Mobile', id: 'mobile' }, { label: 'Accessibility', id: 'accessibility' }] }, { route: "design_basics", label: 'Basics', component: Basics,
	  contents: [{ label: 'Color', id: 'color' }, { label: 'Text', id: 'text' }, { label: 'Typography', id: 'typography' }, { label: 'Writing Style', id: 'writing-style' }, { label: 'Date and Time', id: 'date-time' }, { label: 'Capitalization', id: 'capitalization' }, { label: 'Icons', id: 'icons' }] }, { route: "design_patterns", label: 'Patterns', component: Patterns,
	  contents: [{ route: "design_login", label: 'Login', component: Login }, { route: "design_header", label: 'Header', component: TBD }, { route: "design_dashboard", label: 'Dashboard', component: TBD }, { route: "design_search", label: 'Search', component: TBD }]
	}, { route: "design_showcase", label: 'Showcase', component: Showcase,
	  contents: [{ id: "hpsw-analytics", label: 'Analytics' }, { id: "hpsw-big-data", label: 'Big Data' }, { id: "hpsw-cloud-analytics", label: 'Cloud Analytics' }, { id: "hpsw-business-analytics", label: 'IT Business Analytics' }, { id: "hpsw-login", label: 'Login' }, { id: "oneview-dashboard", label: 'OneView Dashboard' }, { id: "oneview-detail-page", label: 'OneView Detail Page' }, { id: "hpsw-ops-dashboard", label: 'Ops Dashboard' }, { id: "propel-dashboard", label: 'Propel Dashboard' }, { id: "propel-prod-detail", label: 'Propel Product Detail' }, { id: "hpsw-service-anywhere", label: 'Service Anywhere' }, { id: "hpsw-web-inspect", label: 'Web Inspect' }]
	}, { route: "design_resources", label: 'Resources', component: Resources }];

	var Design = React.createClass({
	  displayName: 'Design',

	  _onClick: function _onClick() {
	    // no-op
	  },

	  render: function render() {
	    return React.createElement(
	      Article,
	      null,
	      React.createElement(DocsHeader, null),
	      React.createElement(
	        Section,
	        { appCentered: true, colorIndex: 'neutral-1', primary: true },
	        React.createElement(
	          'h1',
	          null,
	          'Design'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'This application style guide was created by the designers at Hewlett Packard Enterprise. The guide covers the general design principles as well as specific design guidelines. You\'ll also find downloadable assets for the basic elements of the application style. These are meant to help designers quickly begin designing applications based on these styles and patterns. Finally, we\'ve also created a web-based development platform that enables developers to quickly begin implementing enterprise applications.'
	        ),
	        React.createElement(
	          Menu,
	          { direction: 'row' },
	          React.createElement(
	            Link,
	            { to: 'design_resources' },
	            React.createElement(Button, { id: 'resources-button', label: 'Resources', onClick: this._onClick, primary: true })
	          )
	        )
	      ),
	      React.createElement(
	        Section,
	        { appCentered: true },
	        React.createElement(
	          'h2',
	          null,
	          'Contents'
	        ),
	        React.createElement(DocsMenu, { direction: 'row', contents: CONTENTS })
	      )
	    );
	  }
	});

	var DesignDocument = React.createClass({
	  displayName: 'DesignDocument',

	  render: function render() {
	    var title = React.createElement(
	      Link,
	      { to: 'design' },
	      'Design'
	    );
	    return React.createElement(
	      DocsSplit,
	      { title: title, contents: CONTENTS },
	      React.createElement(RouteHandler, null)
	    );
	  }
	});

	var Empty = React.createClass({
	  displayName: 'Empty',

	  render: function render() {
	    return React.createElement('div', null);
	  }
	});

	function createContentRoutes(contents) {
	  var result = [];
	  contents.forEach(function (content) {

	    var handler = content.component || Empty;
	    result.push(React.createElement(Route, { key: content.label, name: content.route,
	      path: content.label.toLowerCase().replace(/ /g, "-"),
	      handler: handler }));

	    if (content.hasOwnProperty('contents')) {
	      result = result.concat(createContentRoutes(content.contents));
	    }
	  });
	  return result;
	}

	Design.routes = function () {
	  var routes = createContentRoutes(CONTENTS);
	  return [React.createElement(Route, { key: 'top', name: 'design', handler: Design }), React.createElement(
	    Route,
	    { key: 'docs', path: 'design', handler: DesignDocument },
	    routes
	  )];
	};

	module.exports = Design;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Link = __webpack_require__(2).Link;
	var Split = __webpack_require__(86);
	var Sidebar = __webpack_require__(87);
	var Article = __webpack_require__(65);
	var Header = __webpack_require__(69);
	var Title = __webpack_require__(70);
	var Menu = __webpack_require__(17);
	var DocsFooter = __webpack_require__(88);
	var GrommetLogo = __webpack_require__(71);
	var CloseIcon = __webpack_require__(15);
	var DocsMenu = __webpack_require__(89);
	var DOM = __webpack_require__(57);

	var DocsSplit = React.createClass({
	  displayName: 'DocsSplit',

	  propTypes: {
	    contents: React.PropTypes.arrayOf(React.PropTypes.object),
	    onChange: React.PropTypes.func,
	    title: React.PropTypes.node.isRequired
	  },

	  getInitialState: function getInitialState() {
	    return { showMenu: true, responsive: 'multiple' };
	  },

	  componentDidMount: function componentDidMount() {
	    this._scrollToAnchor();
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    this._scrollToAnchor();
	  },

	  _scrollToAnchor: function _scrollToAnchor() {
	    if (this.refs.doc) {
	      var doc = this.refs.doc.getDOMNode();
	      var hash = window.location.hash.slice(1);
	      if (hash) {
	        var anchor = doc.querySelectorAll('[id=' + hash + ']')[0];
	        var scrollParent = DOM.findScrollParents(anchor)[0];
	        scrollParent.scrollTop = anchor.offsetTop;
	      } else {
	        doc.scrollTop = 0;
	      }
	    }
	  },

	  _onResponsive: function _onResponsive(responsive) {
	    this.setState({ responsive: responsive });
	    if ('multiple' === responsive) {
	      this.setState({ showMenu: true });
	    }
	    if ('single' === responsive) {
	      this.setState({ showMenu: false });
	    }
	  },

	  _onMenuOpen: function _onMenuOpen() {
	    this.setState({ showMenu: true });
	  },

	  _onMenuClick: function _onMenuClick() {
	    if ('single' === this.state.responsive) {
	      this.setState({ showMenu: false });
	    }
	    // allow time for hash to change
	    setTimeout(this._scrollToAnchor, 1);
	    if (this.props.onChange) {
	      this.props.onChange();
	    }
	  },

	  _renderTitle: function _renderTitle() {
	    return React.createElement(
	      Title,
	      { responsive: false },
	      React.createElement(
	        Link,
	        { to: 'docs' },
	        React.createElement(GrommetLogo, { small: true })
	      ),
	      this.props.title
	    );
	  },

	  _renderMenu: function _renderMenu() {
	    var title = this._renderTitle();
	    var closer;
	    if ('single' === this.state.responsive) {
	      closer = React.createElement(
	        Menu,
	        { direction: 'row' },
	        React.createElement(
	          'span',
	          { onClick: this._onMenuClick },
	          React.createElement(CloseIcon, null)
	        )
	      );
	    }
	    return React.createElement(
	      Sidebar,
	      { small: true },
	      React.createElement(
	        Header,
	        { justify: 'between', large: true, pad: { horizontal: 'medium' } },
	        title,
	        closer
	      ),
	      React.createElement(DocsMenu, { direction: 'column', contents: this.props.contents,
	        onClick: this._onMenuClick })
	    );
	  },

	  _renderDoc: function _renderDoc() {
	    var header;
	    if ('single' === this.state.responsive) {
	      var title = this._renderTitle();
	      header = React.createElement(
	        Header,
	        { justify: 'between', large: true },
	        title,
	        React.createElement(
	          Menu,
	          { direction: 'row', responsive: false },
	          React.createElement(
	            'a',
	            { onClick: this._onMenuOpen },
	            'Contents'
	          )
	        )
	      );
	    } else {
	      header = React.createElement(Header, { large: true });
	    }
	    return React.createElement(
	      Article,
	      { primary: true, ref: 'doc', pad: { horizontal: 'medium' } },
	      header,
	      this.props.children,
	      React.createElement(DocsFooter, { centered: false })
	    );
	  },

	  render: function render() {
	    var left;
	    var right;
	    if (this.state.showMenu) {
	      left = this._renderMenu();
	      if ('multiple' === this.state.responsive) {
	        right = React.createElement(
	          'div',
	          null,
	          this._renderDoc()
	        );
	      }
	    } else {
	      left = this._renderDoc();
	    }

	    return React.createElement(
	      Split,
	      { flex: 'right', fixed: false, onResponsive: this._onResponsive },
	      left,
	      right
	    );
	  }
	});

	module.exports = DocsSplit;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);

	var CLASS_ROOT = "split";

	var Split = React.createClass({
	  displayName: 'Split',

	  propTypes: {
	    fixed: React.PropTypes.bool,
	    flex: React.PropTypes.oneOf(['left', 'right', 'both']),
	    separator: React.PropTypes.bool,
	    stack: React.PropTypes.oneOf(['left', 'right'])
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      fixed: true,
	      flex: 'both'
	    };
	  },

	  getInitialState: function getInitialState() {
	    return { responsive: null };
	  },

	  componentDidMount: function componentDidMount() {
	    // figure out the break width
	    this._breakWidth = 720; // default
	    // CSS stores the break width in a hidden pseudo element
	    var splitElement = this.refs.split.getDOMNode();
	    var after = window.getComputedStyle(splitElement, ':after');
	    if (after) {
	      this._breakWidth = after.getPropertyValue('width');
	    }

	    window.addEventListener('resize', this._onResize);
	    this._layout();
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    window.removeEventListener('resize', this._onResize);
	  },

	  _onResize: function _onResize() {
	    // debounce
	    clearTimeout(this._resizeTimer);
	    this._resizeTimer = setTimeout(this._layout, 50);
	  },

	  _setResponsive: function _setResponsive(responsive) {
	    if (this.state.responsive !== responsive) {
	      this.setState({ responsive: responsive });
	      if (this.props.onResponsive) {
	        this.props.onResponsive(responsive);
	      }
	    }
	  },

	  _layout: function _layout() {
	    var splitElement = this.refs.split.getDOMNode();
	    if (splitElement.offsetWidth < this._breakWidth) {
	      this._setResponsive('single');
	    } else {
	      this._setResponsive('multiple');
	    }
	  },

	  render: function render() {
	    var classes = [CLASS_ROOT];
	    if (this.props.flex) {
	      classes.push(CLASS_ROOT + "--flex-" + this.props.flex);
	    }
	    if (this.props.fixed) {
	      classes.push(CLASS_ROOT + "--fixed");
	    }
	    if (this.props.separator) {
	      classes.push(CLASS_ROOT + "--separator");
	    }
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }

	    return React.createElement(
	      'div',
	      { ref: 'split', className: classes.join(' ') },
	      this.props.children
	    );
	  }
	});

	module.exports = Split;

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	"use strict";

	var React = __webpack_require__(1);

	var CLASS_ROOT = "sidebar";

	var Sidebar = React.createClass({
	  displayName: "Sidebar",

	  propTypes: {
	    colorIndex: React.PropTypes.string,
	    fixed: React.PropTypes.bool,
	    primary: React.PropTypes.bool,
	    small: React.PropTypes.bool
	  },

	  getDefaultProps: function getDefaultProps() {
	    return { primary: false };
	  },

	  render: function render() {
	    var classes = [CLASS_ROOT];
	    if (this.props.primary) {
	      classes.push(CLASS_ROOT + "--primary");
	    }
	    if (this.props.fixed) {
	      classes.push(CLASS_ROOT + "--fixed");
	    }
	    if (this.props.small) {
	      classes.push(CLASS_ROOT + "--small");
	    }
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }

	    return React.createElement(
	      "div",
	      { className: classes.join(' ') },
	      this.props.children
	    );
	  }

	});

	module.exports = Sidebar;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Footer = __webpack_require__(72);

	var DocsFooter = React.createClass({
	  displayName: 'DocsFooter',

	  propTypes: {
	    centered: React.PropTypes.bool,
	    colorIndex: React.PropTypes.string
	  },

	  render: function render() {
	    return React.createElement(
	      Footer,
	      { colorIndex: this.props.colorIndex, centered: this.props.centered,
	        large: true, pad: { vertical: "large" } },
	      this.props.children,
	      React.createElement(
	        'div',
	        null,
	        'This work is licensed under the ',
	        React.createElement(
	          'a',
	          { href: 'http://creativecommons.org/licenses/by/4.0/legalcode' },
	          'Creative Commons Attribution 4.0 International License'
	        ),
	        '.'
	      )
	    );
	  }
	});

	module.exports = DocsFooter;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Link = __webpack_require__(2).Link;
	var Menu = __webpack_require__(17);

	var DocsMenu = React.createClass({
	  displayName: 'DocsMenu',

	  propTypes: {
	    contents: React.PropTypes.arrayOf(React.PropTypes.object),
	    direction: React.PropTypes.oneOf(['column', 'row']),
	    onClick: React.PropTypes.func
	  },

	  contextTypes: {
	    router: React.PropTypes.func.isRequired
	  },

	  _renderMenuItems: function _renderMenuItems(contents, router, context) {
	    var items = contents.map((function (content, index) {
	      var item;

	      if (content.route || context) {
	        var routeName = content.route || context.route;
	        var href = router.makeHref(routeName);
	        if (content.id) {
	          href += '#' + content.id;
	        }
	        item = React.createElement(
	          Link,
	          { key: content.label, to: href, onClick: this.props.onClick },
	          content.label
	        );
	        //item = <a key={content.label} href={href}>{content.label}</a>;
	      } else {
	          item = content.label;
	        }

	      if (!context) {
	        item = React.createElement(
	          'h3',
	          { key: content.label },
	          item
	        );
	      }

	      var subItems;
	      if (content.hasOwnProperty('contents')) {
	        subItems = this._renderMenuItems(content.contents, router, content);
	      }

	      if (!context || subItems) {
	        return React.createElement(
	          Menu,
	          { key: content.label, direction: 'column', align: 'start' },
	          item,
	          subItems
	        );
	      } else {
	        return item;
	      }
	    }).bind(this));

	    return items;
	  },

	  render: function render() {
	    var menuItems = this._renderMenuItems(this.props.contents, this.context.router, null);
	    var pad = 'row' === this.props.direction ? 'none' : { horizontal: 'medium' };
	    return React.createElement(
	      Menu,
	      { direction: this.props.direction, align: 'start', justify: 'between', pad: pad },
	      menuItems
	    );
	  }
	});

	module.exports = DocsMenu;

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	"use strict";

	var React = __webpack_require__(1);
	var Router = __webpack_require__(2);
	var Link = Router.Link;

	module.exports = React.createClass({
	  displayName: "exports",

	  render: function render() {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "header",
	        null,
	        React.createElement(
	          "h1",
	          null,
	          "Philosophy"
	        )
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "p",
	          null,
	          "Our philosophy of user experience design is based on understanding our users, and understanding their needs.  These principles serve as the design rationale for the style guide and the accompanying implementation. With any list of this nature, there is always more that could be added. Indeed a small library of books has been written on this topic. We hope these serve as the footing of your next project."
	        )
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "a",
	          { className: "reference", id: "best-practices" },
	          " "
	        ),
	        React.createElement(
	          "h2",
	          null,
	          "Best Practices"
	        ),
	        React.createElement(
	          "dl",
	          null,
	          React.createElement(
	            "dt",
	            null,
	            "Know your users"
	          ),
	          React.createElement(
	            "dd",
	            null,
	            "It's critically important that you know your users.  Get to know some of them on a personal level such that you are able to generalize their behavior and the rational for their work practices and decisions."
	          ),
	          React.createElement(
	            "dt",
	            null,
	            "Your users are not like you"
	          ),
	          React.createElement(
	            "dd",
	            null,
	            "You are likely an advanced user of your application and are aware of every detail of an application.  That can lead to elevated expectations of your users."
	          ),
	          React.createElement(
	            "dt",
	            null,
	            "All users are not the same"
	          ),
	          React.createElement(
	            "dd",
	            null,
	            "Different users have different background and goals.  Each user has a set of previous experiences that influence their expectations of your application."
	          ),
	          React.createElement(
	            "dt",
	            null,
	            "Let the user take control"
	          ),
	          React.createElement(
	            "dd",
	            null,
	            "Provide ways for users to experience work with purpose and efficiency by eliminating their pain points and allow them to craft their experience."
	          ),
	          React.createElement(
	            "dt",
	            null,
	            "Content over chrome"
	          ),
	          React.createElement(
	            "dd",
	            null,
	            "You can have a gorgeous interface but if your content is hidden or the interactions are clumsy you are missing the point. Focus on the things that will deliver the greatest value to your user."
	          ),
	          React.createElement(
	            "dt",
	            null,
	            "Don’t drown the user in data"
	          ),
	          React.createElement(
	            "dd",
	            null,
	            "Carefully choose what you present to your users. If there is too much information available they may miss the relevant details."
	          ),
	          React.createElement(
	            "dt",
	            null,
	            "Innovate with intention"
	          ),
	          React.createElement(
	            "dd",
	            null,
	            "Let your innovation shine through but remember that your product will be used by users who are using other products in a portfolio of applications.  You do not want your application to feel or behave differently in the core areas of navigation and interaction."
	          ),
	          React.createElement(
	            "dt",
	            null,
	            "Consistency across the application"
	          ),
	          React.createElement(
	            "dd",
	            null,
	            "Use common elements described in this style guide throughout your application. Users prefer repetition and are comfortable with familiar patterns."
	          ),
	          React.createElement(
	            "dt",
	            null,
	            "Tell a story and use metaphors"
	          ),
	          React.createElement(
	            "dd",
	            null,
	            "Stories are irresistible to humans. Telling a story will help users connect with your product.  Metaphors help users quickly establish a mental model of your product."
	          ),
	          React.createElement(
	            "dt",
	            null,
	            "There are no user errors"
	          ),
	          React.createElement(
	            "dd",
	            null,
	            "Humans are error prone.  It is our job to design interfaces that expect human error and handle it robustly.  You should prevent errors wherever possible and clearly inform users of the consequences of a pending operation.  Use a friendly voice for system errors and take accountability for the interruption."
	          ),
	          React.createElement(
	            "dt",
	            null,
	            "Think about the entire user experience"
	          ),
	          React.createElement(
	            "dd",
	            null,
	            "Understand how your customers will interact with your product. Talk with different users to understand all the touch points. Consider creating a user journey for each persona. Share this deliverable with your team to leverage the impact of each person’s role in the project, increasing individual ownership and commitment."
	          )
	        )
	      ),
	      React.createElement(
	        "section",
	        { id: true },
	        React.createElement(
	          "a",
	          { className: "reference", id: "usability" },
	          " "
	        ),
	        React.createElement(
	          "h2",
	          null,
	          "Usability"
	        ),
	        React.createElement(
	          "dl",
	          null,
	          React.createElement(
	            "dt",
	            null,
	            "Use progressive disclosure to create depth of content"
	          ),
	          React.createElement(
	            "dd",
	            null,
	            "Minimize content and avoid clutter in the interface by presenting the user with only the elements that make sense at a given point in the experience. Then progressively grow the experience as necessary."
	          ),
	          React.createElement(
	            "dt",
	            null,
	            "Use simple messages"
	          ),
	          React.createElement(
	            "dd",
	            null,
	            "In user interfaces, massive amounts of text are usually treated as blocks of irrelevant information. If you want people to be aware of your content use short phrases or bullet points instead, or highlight important data and messages with proper styling."
	          ),
	          React.createElement(
	            "dt",
	            null,
	            "Provided tutorials vs. contextual help"
	          ),
	          React.createElement(
	            "dd",
	            null,
	            "Well designed tutorials enable your user to remember how the product works and they will need less hand holding while navigating through your interface."
	          )
	        )
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "a",
	          { className: "reference", id: "interactions" },
	          " "
	        ),
	        React.createElement(
	          "h2",
	          null,
	          "Interactions"
	        ),
	        React.createElement(
	          "dl",
	          null,
	          React.createElement(
	            "dt",
	            null,
	            "Use device appropriate gestures and interactions"
	          ),
	          React.createElement(
	            "dd",
	            null,
	            "Users expect interfaces to work naturally on their device. Delight your users by providing the expected interactions for the device they are using."
	          ),
	          React.createElement(
	            "dt",
	            null,
	            "Use animation to explain transitions and aid discovery"
	          ),
	          React.createElement(
	            "dd",
	            null,
	            "Animations should be natural and reinforce the user’s interaction with  your application.  They should not be distracting or disruptive."
	          )
	        )
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "a",
	          { className: "reference", id: "mobile" },
	          " "
	        ),
	        React.createElement(
	          "h2",
	          null,
	          "Mobile"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Mobile is not just different screen sizes. Mobile devices actually change the fundamental user user experience of common tasks. Embrace the devices and their native capabilities."
	        ),
	        React.createElement(
	          "dl",
	          null,
	          React.createElement(
	            "dt",
	            null,
	            "Think mobile first"
	          ),
	          React.createElement(
	            "dd",
	            null,
	            "Designing for mobile first is very beneficial even if your main focus is not on mobile. Doing so can help eliminate non-essential information while reinforcing the most important information."
	          ),
	          React.createElement(
	            "dt",
	            null,
	            "Consider new use cases"
	          ),
	          React.createElement(
	            "dd",
	            null,
	            "What are the scenarios where people will be using your application outside of the traditional desktop environment? Reevaluate the need to have some features and capabilities designed for smaller screens. Take advantage of the capabilities that mobile devices have to offer such as a camera and notifications when designing your application."
	          ),
	          React.createElement(
	            "dt",
	            null,
	            "New devices sizes"
	          ),
	          React.createElement(
	            "dd",
	            null,
	            "Do not plan your designs with a specific and unique resolution in mind. Consider that new devices are launched through the year. The more fluid your design is the better your application will behave, regardless of the resolution and density of the screen."
	          ),
	          React.createElement(
	            "dt",
	            null,
	            "New device capabilities: GPS, camera, accelerometer, etc."
	          ),
	          React.createElement(
	            "dd",
	            null,
	            "You can use these new capabilities to implement features that require geopositioning and location. Use the device orientation to provide a different view of the same screen or some related data."
	          ),
	          React.createElement(
	            "dt",
	            null,
	            "Gestures"
	          ),
	          React.createElement(
	            "dd",
	            null,
	            "Users become accustomed to gesture support on their platform. Swiping, pinching, zooming, and even multi-finger gestures are becoming commonplace in mobile applications."
	          ),
	          React.createElement(
	            "dt",
	            null,
	            "Appropriately sized tap targets"
	          ),
	          React.createElement(
	            "dd",
	            null,
	            "A fingertip is less precise than a mouse pointer therefore needs a larger target. When designing for mobile remember to increase the size of buttons, form elements and controls."
	          ),
	          React.createElement(
	            "dt",
	            null,
	            "No hover"
	          ),
	          React.createElement(
	            "dd",
	            null,
	            "Without the capacity to hover elements on a touch screen, be careful with the type of information or interaction that you associate with this action on the desktop version."
	          ),
	          React.createElement(
	            "dt",
	            null,
	            "A desktop experience is not a mobile experience"
	          ),
	          React.createElement(
	            "dd",
	            null,
	            "Consider the context in which people will be using your application. Desktop and mobile experiences are far from seamless. For example, if you have a secondary feature that is composed of several steps and interactions, you may leave this experience for the desktop version only."
	          ),
	          React.createElement(
	            "dt",
	            null,
	            "Selection is preferred over input controls"
	          ),
	          React.createElement(
	            "dd",
	            null,
	            "It is much easier to select a value from a pre-populated list than it is to input a value into a field using a (virtual) keyboard."
	          )
	        )
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "a",
	          { className: "reference", id: "accessibility" },
	          " "
	        ),
	        React.createElement(
	          "h2",
	          null,
	          "Accessibility"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Products that are accessible to all users are good for people, products, and business.  All users should be empowered with access and the ability to have a pleasant experience with your application."
	        ),
	        React.createElement(
	          "p",
	          null,
	          "We follow the ",
	          React.createElement(
	            "a",
	            { href: "http://www.w3.org/TR/WCAG20/" },
	            "Web Content Accessibility Guidelines (WCAG)"
	          ),
	          ".  By following this style guide and utilizing the accompanying implementation platform, you will be well on your way to satisfying the WCAG recommendations."
	        )
	      )
	    );
	  }
	});

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Section = __webpack_require__(73);

	var CONTROL_ICONS = [{ icon: 'Add' }, { icon: 'Clear', labels: ['Clear', 'Close', 'Remove'] }, { icon: 'Edit', labels: ['Edit', 'Settings', 'Actions'] }, { icon: 'More' }, { icon: 'DragHandle', labels: ['Drag handle'] }, { icon: 'DropCaret', labels: ['Drop caret'] }, { icon: 'Filter' }, { icon: 'Search' }, { icon: 'Calendar' }, { icon: 'Help' }, { icon: 'Left', labels: ['Left', 'Previous'] }, { icon: 'Right', labels: ['Right', 'Next'] }, { icon: 'Down' }, { icon: 'Up' }, { icon: 'Top' }, { icon: 'Person' }, { icon: 'World' }, { icon: 'Mail' }, { icon: 'Twitter' }, { icon: 'LinkedIn' }, { icon: 'Facebook' }];

	CONTROL_ICONS.forEach(function (item) {
	  item.component = __webpack_require__(92)("./" + item.icon);
	  if (!item.labels) {
	    item.labels = [item.icon];
	  }
	});

	var Spinning = __webpack_require__(76);
	var Status = __webpack_require__(106);

	var STATUS_ICONS = [{ component: Status, value: 'error', labels: ['Error', 'Critical'] }, { component: Status, value: 'warning', labels: ['Warning'] }, { component: Status, value: 'ok', labels: ['OK', 'Normal'] }, { component: Status, value: 'unknown', labels: ['Unknown'] }, { component: Status, value: 'disabled', labels: ['Disabled'] }, { component: Status, value: 'label', labels: ['Label', 'Table header'] }];

	var Basics = React.createClass({
	  displayName: 'Basics',

	  componentDidMount: function componentDidMount() {
	    var fontNameElement = this.refs.fontName.getDOMNode();
	    var fontFamily = window.getComputedStyle(fontNameElement).fontFamily;
	    fontNameElement.innerHTML = fontFamily.split(',')[0];
	  },

	  render: function render() {
	    var controlIcons = CONTROL_ICONS.map(function (item) {
	      var labels = item.labels.map(function (label) {
	        return React.createElement(
	          'span',
	          { key: label },
	          label
	        );
	      });
	      return React.createElement(
	        'div',
	        { key: item.labels[0], className: 'icon-tile' },
	        React.createFactory(item.component)(),
	        React.createElement(
	          'label',
	          null,
	          labels
	        )
	      );
	    });

	    var statusIcons = STATUS_ICONS.map(function (item) {
	      var labels = item.labels.map(function (label) {
	        return React.createElement(
	          'span',
	          { key: label },
	          label
	        );
	      });
	      return React.createElement(
	        'div',
	        { key: item.labels[0], className: 'icon-tile' },
	        React.createFactory(item.component)({ value: item.value, large: true }),
	        React.createFactory(item.component)({ value: item.value }),
	        React.createFactory(item.component)({ value: item.value, small: true }),
	        React.createElement(
	          'label',
	          null,
	          labels
	        )
	      );
	    });

	    return React.createElement(
	      'article',
	      null,
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Basics'
	        )
	      ),
	      React.createElement(
	        Section,
	        { appCentered: true, primary: true },
	        React.createElement(
	          'p',
	          null,
	          'Here you will find the core elements for the application style guide. The downloadable assets contain these core elements. Checkboxes, buttons, status icons and more are all described in these assets. Rather than documenting these in gory detail, we thought you would appreciate the brevity. We also think you really just want to see them anyway, so why waste your time?'
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement('a', { className: 'anchor', id: 'color' }),
	        React.createElement(
	          'h2',
	          null,
	          'Color'
	        ),
	        React.createElement(
	          'div',
	          { className: 'generic-branding' },
	          React.createElement(
	            'p',
	            null,
	            'These are the generic, or un-branded, colors. It is expected that applications will define their own brand color scheme.'
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'hpe-branding' },
	          React.createElement(
	            'p',
	            null,
	            'The Hewlett Packard Enterprise color palette is utilized in applications for the most part. However there are variances in the palette that apply specifically to applications.'
	          ),
	          React.createElement(
	            'p',
	            null,
	            'For application design the Hewlett Packard Enterprise orange/salmon accent color is modified to be more red so it can be used as a status indicator and it should not be used as an accent color in non-status contexts.'
	          ),
	          React.createElement(
	            'p',
	            null,
	            'Also, dark yellow color is added for use as a warning status color.'
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Primary'
	        ),
	        React.createElement('span', { className: 'swatch brand' }),
	        React.createElement(
	          'h3',
	          null,
	          'Accent'
	        ),
	        React.createElement('span', { className: 'swatch accent-1' }),
	        React.createElement('span', { className: 'swatch accent-2' }),
	        React.createElement('span', { className: 'swatch accent-3' }),
	        React.createElement(
	          'h3',
	          null,
	          'Neutral'
	        ),
	        React.createElement('span', { className: 'swatch neutral-1' }),
	        React.createElement('span', { className: 'swatch neutral-2' }),
	        React.createElement('span', { className: 'swatch neutral-3' }),
	        React.createElement('span', { className: 'swatch neutral-4' }),
	        React.createElement('span', { className: 'swatch neutral-5' }),
	        React.createElement(
	          'h3',
	          null,
	          'Status'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'These colors are used to convey status.'
	        ),
	        React.createElement('span', { className: 'swatch status-error' }),
	        React.createElement('span', { className: 'swatch status-warning' }),
	        React.createElement('span', { className: 'swatch status-ok' }),
	        React.createElement('span', { className: 'swatch status-unknown' }),
	        React.createElement(
	          'h3',
	          null,
	          'Graph'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'These colors are used to draw graphs and charts.'
	        ),
	        React.createElement('span', { className: 'swatch graph-1' }),
	        React.createElement('span', { className: 'swatch graph-2' }),
	        React.createElement('span', { className: 'swatch graph-3' }),
	        React.createElement('span', { className: 'swatch graph-4' }),
	        React.createElement('span', { className: 'swatch graph-5' }),
	        React.createElement('span', { className: 'swatch graph-6' })
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement('a', { className: 'anchor', id: 'text' }),
	        React.createElement(
	          'h2',
	          null,
	          'Text'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Text and Typography is arguably one of the most important elements of style to get right. Ironically, when done well the text styles and typography disappear from the users consciousness and they simply enjoy the beautiful and fluid experience. However, when done poorly, the typography can be a reason an application just doesn’t feel right. Everything from displeasing aesthetics, to unclear organization of information, to physical eye strain can result from an application with insufficient attention to this detail.'
	        ),
	        React.createElement('a', { className: 'anchor', id: 'typography' }),
	        React.createElement(
	          'h3',
	          null,
	          'Typography'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Applications use the ',
	          React.createElement(
	            'span',
	            { ref: 'fontName' },
	            'Arial'
	          ),
	          ' font.  The typographic scale and styles can be found in the attached assets.'
	        ),
	        React.createElement(
	          'h1',
	          { className: 'font-sample' },
	          'H1 font sample'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'font-sample' },
	          'H2 font sample'
	        ),
	        React.createElement(
	          'h3',
	          { className: 'font-sample' },
	          'H3 font sample'
	        ),
	        React.createElement(
	          'h4',
	          { className: 'font-sample' },
	          'H4 font sample'
	        ),
	        React.createElement(
	          'h5',
	          { className: 'font-sample' },
	          'H5 font sample'
	        ),
	        React.createElement('a', { className: 'anchor', id: 'writing-style' }),
	        React.createElement(
	          'h3',
	          null,
	          'Writing Style'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Applications should use a conversational tone and should not include excessive technical jargon.'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Here are some things we recommend you consider when writing for applications:'
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Do’s'
	        ),
	        React.createElement(
	          'ul',
	          null,
	          React.createElement(
	            'li',
	            null,
	            'Use simple yet complete sentences.'
	          ),
	          React.createElement(
	            'li',
	            null,
	            'Use correct punctuation.'
	          ),
	          React.createElement(
	            'li',
	            null,
	            'Use the present tense to describe problem states.'
	          ),
	          React.createElement(
	            'li',
	            null,
	            'Use past tense to describe events that occurred in the past.'
	          ),
	          React.createElement(
	            'li',
	            null,
	            'Use an active voice whenever possible.'
	          ),
	          React.createElement(
	            'li',
	            null,
	            'Passive voice is acceptable to describe some error conditions.'
	          ),
	          React.createElement(
	            'li',
	            null,
	            'Use descriptors to clarify terminology. For example, “Specify InflD when Detect is set to NO.” We instead recommend something along the lines of “Specify the InflD parameter when the Detect option is set to NO”.'
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Don’ts'
	        ),
	        React.createElement(
	          'ul',
	          null,
	          React.createElement(
	            'li',
	            null,
	            'Do not use UPPERCASE in text or exclamation points!!!!'
	          ),
	          React.createElement(
	            'li',
	            null,
	            'Do not make the user feel at fault.'
	          ),
	          React.createElement(
	            'li',
	            null,
	            'Do not anthropomorphize by implying that the programs or hardware can think or feel.'
	          ),
	          React.createElement(
	            'li',
	            null,
	            'Do not use colloquial words or phrases.'
	          ),
	          React.createElement(
	            'li',
	            null,
	            'Do not use terms that may be offensive in certain cultures.'
	          ),
	          React.createElement(
	            'li',
	            null,
	            'Do not compound several nouns without adding a preposition or subclause to clarify the meaning. For example, “Site Server LDAP Service directory server” should be changed to “Directory server for the LDAP Service of the Site Server”.'
	          ),
	          React.createElement(
	            'li',
	            null,
	            'Avoid the use of the word “bad”. Use more descriptive terms to tell the user as to what is wrong. For example, avoid messages such as “Bad size”. Instead, tell the user what criteria to use when specifying a size.'
	          ),
	          React.createElement(
	            'li',
	            null,
	            'Avoid the use of the word “please”. It can imply that a required action is optional.'
	          )
	        ),
	        React.createElement('a', { className: 'anchor', id: 'date-time' }),
	        React.createElement(
	          'h3',
	          null,
	          'Date and Time'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Date and time formats should generally be displayed in the user’s local timezone.  Any exceptions to this should include the timezone being used to display the time and date. In addition, dates and times shall always be localized to use the most recognizable format for the user’s locale. Here are examples of recommended date and time formats. Notice, that we use words like “Today” and “Yesterday” as it doesn’t force the user to remember today’s date to process the information.  In each of these examples, showing seconds is optional.'
	        ),
	        React.createElement(
	          'ol',
	          null,
	          React.createElement(
	            'li',
	            null,
	            'Today, since 12:00 am today:',
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'code',
	                  null,
	                  'Today <HH:MM[:SS] am|pm>'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'code',
	                  null,
	                  'Today 10:10:05 am'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'code',
	                  null,
	                  'Today 11:11 am'
	                )
	              )
	            )
	          ),
	          React.createElement(
	            'li',
	            null,
	            'Yesterday, since 12:00 am yesterday, before 12:00 am today:',
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'code',
	                  null,
	                  'Yesterday <HH:MM[:SS] am|pm>'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'code',
	                  null,
	                  'Yesterday 10:10:05 pm'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'code',
	                  null,
	                  'Yesterday 11:11 am'
	                )
	              )
	            )
	          ),
	          React.createElement(
	            'li',
	            null,
	            'This year, since 12:00 am this year, before yesterday:',
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'code',
	                  null,
	                  '<3 char month name> <day> <HH:MM[:SS] am/pm>'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'code',
	                  null,
	                  'Jan 28 10:10:05 am'
	                )
	              )
	            )
	          ),
	          React.createElement(
	            'li',
	            null,
	            'Last years messages, before 12:00 am this year:',
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'code',
	                  null,
	                  '<month> <day> <year> <HH:MM[:SS] am/pm>'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                '1-1-2014 10:10:05 am'
	              )
	            )
	          )
	        ),
	        React.createElement('a', { className: 'anchor', id: 'capitalization' }),
	        React.createElement(
	          'h3',
	          null,
	          'Capitalization'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'For the English language, we recommend using English title capitalization rules for titles (i.e. generally, capitalize the first letter of each word). Titles include the following user interface elements:'
	        ),
	        React.createElement(
	          'ul',
	          null,
	          React.createElement(
	            'li',
	            null,
	            'Page titles'
	          ),
	          React.createElement(
	            'li',
	            null,
	            'Panel titles'
	          ),
	          React.createElement(
	            'li',
	            null,
	            'Section headings'
	          ),
	          React.createElement(
	            'li',
	            null,
	            'Form section titles'
	          ),
	          React.createElement(
	            'li',
	            null,
	            'Table headers'
	          ),
	          React.createElement(
	            'li',
	            null,
	            'Dialog titles (reference rule #8: grammarbook.com)'
	          )
	        ),
	        React.createElement(
	          'h4',
	          null,
	          'Sentence Capitalization'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Capitalize only the first letter of data labels unless a word used in the data label otherwise deserves capitalization because of English capitalization rules (e.g. proper names, abbreviations, etc).'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Data labels include the following UI elements:'
	        ),
	        React.createElement(
	          'ul',
	          null,
	          React.createElement(
	            'li',
	            null,
	            'Radio button labels'
	          ),
	          React.createElement(
	            'li',
	            null,
	            'Checkbox labels'
	          ),
	          React.createElement(
	            'li',
	            null,
	            'Form property labels'
	          ),
	          React.createElement(
	            'li',
	            null,
	            'Panel property labels'
	          ),
	          React.createElement(
	            'li',
	            null,
	            'Button labels'
	          ),
	          React.createElement(
	            'li',
	            null,
	            'Action menu items'
	          ),
	          React.createElement(
	            'li',
	            null,
	            'Hyperlinks to actions'
	          ),
	          React.createElement(
	            'li',
	            null,
	            'Hint text'
	          ),
	          React.createElement(
	            'li',
	            null,
	            'Help text'
	          )
	        ),
	        React.createElement(
	          'h4',
	          null,
	          'Attributes'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Capitalize only the first letter of attributes unless a word used in the attribute otherwise deserves capitalization because of English capitalization rules (e.g. proper names, abbreviations, etc). User-entered attributes will retain the user’s capitalization.'
	        ),
	        React.createElement(
	          'h4',
	          null,
	          'Exceptions'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'The English language is full of exceptions, so we felt compelled. For attribute values which indicate the property or data field hasn’t been set or the location is intentionally left empty, we use the non-capitalized words or phrases such as “empty”, “none”, “not set”, “unassigned”, or “no alerts”.'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Some specific words and acronyms are always capitalized for branding or common industry recognition.'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Examples:'
	        ),
	        React.createElement(
	          'ul',
	          null,
	          React.createElement(
	            'li',
	            null,
	            'VLAN'
	          ),
	          React.createElement(
	            'li',
	            null,
	            'IPv4'
	          ),
	          React.createElement(
	            'li',
	            null,
	            'IPv6'
	          ),
	          React.createElement(
	            'li',
	            null,
	            'WWN'
	          )
	        ),
	        React.createElement(
	          'h4',
	          null,
	          'Capitalization in APIs'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Yes, our application users make use of our APIs, so it’s important to provide a familiar voice to our users, regardless of the interface they are using.'
	        ),
	        React.createElement(
	          'h5',
	          null,
	          'PascalCase'
	        ),
	        React.createElement(
	          'ul',
	          null,
	          React.createElement(
	            'li',
	            null,
	            'Schema names'
	          ),
	          React.createElement(
	            'li',
	            null,
	            'Schema enum values'
	          )
	        ),
	        React.createElement(
	          'h5',
	          null,
	          'camelCase'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'The following API elements should be rendered in camelCase:'
	        ),
	        React.createElement(
	          'ul',
	          null,
	          React.createElement(
	            'li',
	            null,
	            'Schema attribute names'
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement('a', { className: 'anchor', id: 'icons' }),
	        React.createElement(
	          'h2',
	          null,
	          'Icons'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Icons are used for inline controls. Users should be able to identify an icon’s function without any supporting text decoration. This is why we have a fairly small icon set. Text is used for non-iconifiable controls.'
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Controls'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Control icons have a larger hit area around them to work well on mobile platforms.'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          controlIcons
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Status'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Status icons come in multiple sizes for use in different contexts. They are differentiated both by color and by shape for accessibility. Typically, status icons are placed immediately to the left of the label indicating what object they are indicating the status of.'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          statusIcons
	        ),
	        React.createElement(
	          'p',
	          null,
	          'When something is occuring that could lead to a change in status, a changing icon is added next to the status icon. This changing icon is placed to the right of the status icon when laying out horizontally, and below when laying out vertically.'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            'div',
	            { className: 'icon-tile' },
	            React.createElement(
	              'div',
	              null,
	              React.createElement(Spinning, null)
	            ),
	            React.createElement(
	              'div',
	              null,
	              React.createElement(Spinning, { small: true })
	            ),
	            React.createElement(
	              'label',
	              null,
	              React.createElement(
	                'span',
	                null,
	                'Changing'
	              ),
	              React.createElement(
	                'span',
	                null,
	                'Loading'
	              )
	            )
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = Basics;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./Add": 93,
		"./Add.js": 93,
		"./Calendar": 94,
		"./Calendar.js": 94,
		"./Clear": 15,
		"./Clear.js": 15,
		"./Down": 95,
		"./Down.js": 95,
		"./DragHandle": 96,
		"./DragHandle.js": 96,
		"./DropCaret": 61,
		"./DropCaret.js": 61,
		"./Edit": 97,
		"./Edit.js": 97,
		"./Facebook": 98,
		"./Facebook.js": 98,
		"./Filter": 99,
		"./Filter.js": 99,
		"./Grommet": 71,
		"./Grommet.js": 71,
		"./Help": 100,
		"./Help.js": 100,
		"./Left": 77,
		"./Left.js": 77,
		"./LinkedIn": 101,
		"./LinkedIn.js": 101,
		"./Mail": 102,
		"./Mail.js": 102,
		"./More": 60,
		"./More.js": 60,
		"./Person": 103,
		"./Person.js": 103,
		"./Right": 78,
		"./Right.js": 78,
		"./Search": 104,
		"./Search.js": 104,
		"./SearchPlus": 105,
		"./SearchPlus.js": 105,
		"./Spinning": 76,
		"./Spinning.js": 76,
		"./Status": 106,
		"./Status.js": 106,
		"./Top": 113,
		"./Top.js": 113,
		"./Twitter": 114,
		"./Twitter.js": 114,
		"./Up": 115,
		"./Up.js": 115,
		"./World": 116,
		"./World.js": 116,
		"./status/Disabled": 110,
		"./status/Disabled.js": 110,
		"./status/ErrorStatus": 108,
		"./status/ErrorStatus.js": 108,
		"./status/Label": 112,
		"./status/Label.js": 112,
		"./status/OK": 107,
		"./status/OK.js": 107,
		"./status/Unknown": 111,
		"./status/Unknown.js": 111,
		"./status/Warning": 109,
		"./status/Warning.js": 109
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 92;


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);

	var Add = React.createClass({
	  displayName: 'Add',

	  propTypes: {
	    onClick: React.PropTypes.func
	  },

	  render: function render() {
	    var className = 'control-icon control-icon-add';
	    if (this.props.className) {
	      className += ' ' + this.props.className;
	    }
	    return React.createElement(
	      'svg',
	      { className: className, viewBox: '0 0 48 48', version: '1.1',
	        onClick: this.props.onClick },
	      React.createElement(
	        'g',
	        { fill: 'none' },
	        React.createElement('line', { strokeWidth: '2', x1: '24', y1: '14', x2: '24', y2: '34' }),
	        React.createElement('line', { strokeWidth: '2', x1: '14', y1: '24', x2: '34', y2: '24' })
	      )
	    );
	  }

	});

	module.exports = Add;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);

	var Calendar = React.createClass({
	  displayName: 'Calendar',

	  render: function render() {
	    var className = 'control-icon control-icon-calendar';
	    if (this.props.className) {
	      className += ' ' + this.props.className;
	    }
	    return React.createElement(
	      'svg',
	      { className: className, viewBox: '0 0 48 48', version: '1.1' },
	      React.createElement(
	        'g',
	        { fill: 'none', strokeWidth: '2' },
	        React.createElement('rect', { x: '13', y: '16', width: '22', height: '20' }),
	        React.createElement('path', { d: 'M17,16 L17,13' }),
	        React.createElement('path', { d: 'M31,16 L31,13' }),
	        React.createElement('path', { d: 'M13,23 L35,23' })
	      ),
	      React.createElement(
	        'g',
	        { stroke: 'none' },
	        React.createElement('rect', { x: '29', y: '30', width: '3', height: '3' })
	      )
	    );
	  }

	});

	module.exports = Calendar;

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);

	var Down = React.createClass({
	  displayName: 'Down',

	  render: function render() {
	    var className = 'control-icon control-icon-down';
	    if (this.props.className) {
	      className += ' ' + this.props.className;
	    }
	    return React.createElement(
	      'svg',
	      { className: className, viewBox: '0 0 48 48', version: '1.1' },
	      React.createElement(
	        'g',
	        { fill: 'none' },
	        React.createElement('polyline', { strokeWidth: '2', points: '34,27.1 24,35 14,27 ' }),
	        React.createElement('path', { strokeWidth: '2', d: 'M24,34.7C24,12,24,12,24,12' })
	      )
	    );
	  }

	});

	module.exports = Down;

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);

	var DragHandle = React.createClass({
	  displayName: 'DragHandle',

	  render: function render() {
	    var className = 'control-icon control-icon-drag-handle';
	    if (this.props.className) {
	      className += ' ' + this.props.className;
	    }
	    return React.createElement(
	      'svg',
	      { className: className, viewBox: '0 0 48 48', version: '1.1' },
	      React.createElement(
	        'g',
	        { stroke: 'none', strokeWidth: '1', fill: '#cccccc', fillRule: 'evenodd' },
	        React.createElement('rect', { x: '12', y: '12', width: '3', height: '3' }),
	        React.createElement('rect', { x: '18', y: '12', width: '3', height: '3' }),
	        React.createElement('rect', { x: '12', y: '18', width: '3', height: '3' }),
	        React.createElement('rect', { x: '18', y: '18', width: '3', height: '3' }),
	        React.createElement('rect', { x: '12', y: '24', width: '3', height: '3' }),
	        React.createElement('rect', { x: '18', y: '24', width: '3', height: '3' }),
	        React.createElement('rect', { x: '12', y: '30', width: '3', height: '3' }),
	        React.createElement('rect', { x: '18', y: '30', width: '3', height: '3' })
	      )
	    );
	  }

	});

	module.exports = DragHandle;

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);

	var Edit = React.createClass({
	  displayName: 'Edit',

	  render: function render() {
	    var className = 'control-icon control-icon-edit';
	    if (this.props.className) {
	      className += ' ' + this.props.className;
	    }
	    return React.createElement(
	      'svg',
	      { className: className, viewBox: '0 0 48 48', version: '1.1' },
	      React.createElement(
	        'g',
	        { fill: 'none' },
	        React.createElement('circle', { strokeWidth: '2', cx: '24', cy: '24', r: '9' }),
	        React.createElement('line', { strokeWidth: '2', x1: '24', y1: '11', x2: '24', y2: '15' }),
	        React.createElement('line', { strokeWidth: '2', x1: '33.2', y1: '14.8', x2: '30.3', y2: '17.6' }),
	        React.createElement('line', { strokeWidth: '2', x1: '37', y1: '24', x2: '33', y2: '24' }),
	        React.createElement('line', { strokeWidth: '2', x1: '33.2', y1: '33.2', x2: '30.3', y2: '30.4' }),
	        React.createElement('line', { strokeWidth: '2', x1: '24', y1: '37', x2: '24', y2: '33' }),
	        React.createElement('line', { strokeWidth: '2', x1: '14.8', y1: '33.2', x2: '17.7', y2: '30.4' }),
	        React.createElement('line', { strokeWidth: '2', x1: '11', y1: '24', x2: '15.2', y2: '24' }),
	        React.createElement('line', { strokeWidth: '2', x1: '14.8', y1: '14.8', x2: '17.7', y2: '17.6' })
	      )
	    );
	  }

	});

	module.exports = Edit;

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);

	var Facebook = React.createClass({
	  displayName: 'Facebook',

	  render: function render() {
	    var className = 'control-icon control-icon-facebook';
	    if (this.props.className) {
	      className += ' ' + this.props.className;
	    }
	    return React.createElement(
	      'svg',
	      { className: className, viewBox: '0 0 48 48', version: '1.1' },
	      React.createElement(
	        'g',
	        { stroke: 'none' },
	        React.createElement('path', { d: 'M26.1,35.9 L26.1,24.9 L29.8,24.9 L30.3,20.6 L26.1,20.6 L26.1,17.9 C26.1,16.7 26.4,15.8 28.2,15.8 L30.5,15.8 L30.5,12 C30.1,11.9 28.8,11.8 27.2,11.8 C23.9,11.8 21.7,13.8 21.7,17.4 L21.7,20.5 L18,20.5 L18,24.8 L21.7,24.8 L21.7,35.7 L26.1,35.7 L26.1,35.9 Z' })
	      )
	    );
	  }

	});

	module.exports = Facebook;

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var IntlMixin = __webpack_require__(3);

	var Filter = React.createClass({
	  displayName: 'Filter',

	  propTypes: {
	    a11yTitle: React.PropTypes.string,
	    notifications: React.PropTypes.number
	  },

	  mixins: [IntlMixin],

	  render: function render() {
	    var className = 'control-icon control-icon-filter';
	    var a11yTitle = this.getGrommetIntlMessage(this.props.a11yTitle);
	    if (this.props.className) {
	      className += ' ' + this.props.className;
	    }

	    if (typeof this.props.a11yTitle === "undefined") {
	      // this.props.a11yTitle emplty string is an acceptable value only if undefined
	      // should it use the default title value
	      a11yTitle = this.getGrommetIntlMessage('Filter');
	    }
	    var filterTitleId = 'ok-title';

	    var badge = null;
	    if (this.props.notifications) {
	      badge = React.createElement(
	        'g',
	        { className: 'control-icon__badge' },
	        React.createElement('circle', { stroke: 'none', cx: '37', cy: '11', r: '10' }),
	        React.createElement(
	          'text',
	          { x: '33.5', y: '16', fontSize: 16 },
	          this.props.notifications
	        )
	      );
	    }

	    return React.createElement(
	      'svg',
	      { role: 'image', className: className, 'aria-labelledby': filterTitleId, viewBox: '0 0 48 48', version: '1.1' },
	      React.createElement(
	        'title',
	        { id: filterTitleId },
	        a11yTitle
	      ),
	      React.createElement(
	        'g',
	        { fill: 'none' },
	        React.createElement('polygon', { role: 'presentation', strokeWidth: '2', points: '14,15 24,27 34,15 \t' }),
	        React.createElement('line', { strokeWidth: '2', x1: '24', y1: '27', x2: '24', y2: '34' })
	      ),
	      badge
	    );
	  }

	});

	module.exports = Filter;

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);

	var Help = React.createClass({
	  displayName: 'Help',

	  render: function render() {
	    var className = 'control-icon control-icon-help';
	    if (this.props.className) {
	      className += ' ' + this.props.className;
	    }
	    return React.createElement(
	      'svg',
	      { className: className, viewBox: '0 0 48 48', version: '1.1' },
	      React.createElement(
	        'g',
	        { fill: 'none' },
	        React.createElement('path', { strokeWidth: '2', d: 'M17,18c0-4,3.4-7,7-7c3.5,0,7,2.7,7,7s-3.6,7-7,7v6' }),
	        React.createElement('line', { strokeWidth: '2', x1: '24', y1: '37', x2: '24', y2: '35' })
	      )
	    );
	  }

	});

	module.exports = Help;

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);

	var LinkedIn = React.createClass({
	  displayName: 'LinkedIn',

	  render: function render() {
	    var className = 'control-icon control-icon-linked-in';
	    if (this.props.className) {
	      className += ' ' + this.props.className;
	    }
	    return React.createElement(
	      'svg',
	      { className: className, viewBox: '0 0 48 48', version: '1.1' },
	      React.createElement(
	        'g',
	        { stroke: 'none' },
	        React.createElement('path', { d: 'M17.4,36 L12.4,36 L12.4,20 L17.4,20 L17.4,36 L17.4,36 Z M14.9,17.8 C13.3,17.8 12,16.5 12,14.9 C12,13.3 13.3,12 14.9,12 C16.5,12 17.8,13.3 17.8,14.9 C17.8,16.5 16.5,17.8 14.9,17.8 L14.9,17.8 Z M36,36 L31,36 L31,28.2 C31,26.3 31,24 28.4,24 C25.8,24 25.4,26 25.4,28.1 L25.4,36 L20.4,36 L20.4,20 L25.2,20 L25.2,22.2 L25.3,22.2 C26,20.9 27.6,19.6 30,19.6 C35,19.6 36,22.9 36,27.2 L36,36 L36,36 Z' })
	      )
	    );
	  }

	});

	module.exports = LinkedIn;

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);

	var Mail = React.createClass({
	  displayName: 'Mail',

	  render: function render() {
	    var className = 'control-icon control-icon-mail';
	    if (this.props.className) {
	      className += ' ' + this.props.className;
	    }
	    return React.createElement(
	      'svg',
	      { className: className, viewBox: '0 0 48 48', version: '1.1' },
	      React.createElement(
	        'g',
	        { fill: 'none', strokeWidth: '2' },
	        React.createElement('rect', { x: '12', y: '14', width: '24', height: '19.6' }),
	        React.createElement('path', { d: 'M12,17.3 L24,27.1 L36,17.3' }),
	        React.createElement('path', { d: 'M12.2,32.3 L20.7,23.8' }),
	        React.createElement('path', { d: 'M35.8,32.3 L27.3,23.8' })
	      )
	    );
	  }

	});

	module.exports = Mail;

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);

	var Person = React.createClass({
	  displayName: 'Person',

	  propTypes: {
	    onClick: React.PropTypes.func
	  },

	  render: function render() {
	    var className = 'control-icon control-icon-person';
	    if (this.props.className) {
	      className += ' ' + this.props.className;
	    }
	    return React.createElement(
	      'svg',
	      { className: className, viewBox: '0 0 48 48', version: '1.1',
	        onClick: this.props.onClick },
	      React.createElement(
	        'g',
	        { fill: 'none', strokeWidth: '2' },
	        React.createElement('circle', { cx: '24', cy: '18', r: '5' }),
	        React.createElement('path', { d: 'M33,36 L33,31 C33,26.6 29.4,23 25,23 L23,23 C18.6,23 15,26.6 15,31 L15,36' }),
	        React.createElement('path', { d: 'M20,36 L20,31' }),
	        React.createElement('path', { d: 'M28,36 L28,31' })
	      )
	    );
	  }

	});

	module.exports = Person;

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);

	var Search = React.createClass({
	  displayName: 'Search',

	  render: function render() {
	    var className = 'control-icon control-icon-search';
	    if (this.props.className) {
	      className += ' ' + this.props.className;
	    }
	    return React.createElement(
	      'svg',
	      { className: className, viewBox: '0 0 48 48', version: '1.1' },
	      React.createElement(
	        'g',
	        { fill: 'none' },
	        React.createElement('circle', { strokeWidth: '2', cx: '21.5', cy: '21.5', r: '9' }),
	        React.createElement('line', { strokeWidth: '2', x1: '35.5', y1: '35.5', x2: '27.8', y2: '27.8' })
	      )
	    );
	  }

	});

	module.exports = Search;

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);

	var SearchPlus = React.createClass({
	  displayName: 'SearchPlus',

	  render: function render() {
	    var className = 'control-icon control-icon-search-plus';
	    if (this.props.className) {
	      className += ' ' + this.props.className;
	    }
	    return React.createElement(
	      'svg',
	      { className: className, viewBox: '0 0 48 48', version: '1.1' },
	      React.createElement(
	        'g',
	        { strokeWidth: '4', fill: 'none', fillRule: 'evenodd' },
	        React.createElement('circle', { strokeWidth: '4', cx: '21', cy: '21', r: '7' }),
	        React.createElement('path', { d: 'M27.2,27 L34.2,36', strokeWidth: '4', strokeLinecap: 'round' }),
	        React.createElement('path', { d: 'M34,13 L34,19', strokeWidth: '2', strokeLinecap: 'round' }),
	        React.createElement('path', { d: 'M37,16 L31,16', strokeWidth: '2', strokeLinecap: 'round' })
	      )
	    );
	  }

	});

	module.exports = SearchPlus;

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var OK = __webpack_require__(107);
	var ErrorStatus = __webpack_require__(108);
	var Warning = __webpack_require__(109);
	var Disabled = __webpack_require__(110);
	var Unknown = __webpack_require__(111);
	var Label = __webpack_require__(112);

	var CLASS_ROOT = "status-icon";

	var Status = React.createClass({
	  displayName: 'Status',

	  propType: {
	    large: React.PropTypes.bool,
	    small: React.PropTypes.bool,
	    value: React.PropTypes.oneOf(['error', 'warning', 'ok', 'unknown', 'disabled']),
	    a11yTitle: React.PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return { value: 'unknown' };
	  },

	  render: function render() {
	    var classes = [CLASS_ROOT];
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }
	    if (this.props.small) {
	      classes.push(CLASS_ROOT + "--small");
	    }
	    if (this.props.large) {
	      classes.push(CLASS_ROOT + "--large");
	    }
	    var className = classes.join(' ');
	    var icon = React.createElement(
	      'span',
	      null,
	      '?'
	    );
	    switch (this.props.value.toLowerCase()) {
	      case 'ok':
	      case 'normal':
	        icon = React.createElement(OK, { className: className, a11yTitle: this.props.a11yTitle });
	        break;
	      case 'warning':
	        icon = React.createElement(Warning, { className: className, a11yTitle: this.props.a11yTitle });
	        break;
	      case 'error':
	      case 'critical':
	        icon = React.createElement(ErrorStatus, { className: className, a11yTitle: this.props.a11yTitle });
	        break;
	      case 'disabled':
	        icon = React.createElement(Disabled, { className: className, a11yTitle: this.props.a11yTitle });
	        break;
	      case 'unknown':
	        icon = React.createElement(Unknown, { className: className, a11yTitle: this.props.a11yTitle });
	        break;
	      case 'label':
	        icon = React.createElement(Label, { className: className, a11yTitle: this.props.a11yTitle });
	        break;
	    }
	    return icon;
	  }

	});

	module.exports = Status;

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var IntlMixin = __webpack_require__(3);

	var OK = React.createClass({
	  displayName: 'OK',

	  propTypes: {
	    a11yTitle: React.PropTypes.string
	  },

	  mixins: [IntlMixin],

	  render: function render() {
	    var className = 'status-icon status-icon-ok';
	    var a11yTitle = this.getGrommetIntlMessage(this.props.a11yTitle);
	    if (this.props.className) {
	      className += ' ' + this.props.className;
	    }
	    if (typeof this.props.a11yTitle === "undefined") {
	      // this.props.a11yTitle emplty string is an acceptable value only if undefined
	      // should it use the default title value
	      a11yTitle = this.getGrommetIntlMessage('OK');
	    }
	    var okTitleId = 'ok-title';
	    return React.createElement(
	      'svg',
	      { className: className, viewBox: '0 0 24 24', role: 'img', 'aria-labelledby': okTitleId, version: '1.1' },
	      React.createElement(
	        'title',
	        { id: okTitleId },
	        a11yTitle
	      ),
	      React.createElement(
	        'g',
	        { className: "status-icon__base" },
	        React.createElement('circle', { role: 'presentation', cx: '12', cy: '12', r: '12', stroke: 'none' })
	      ),
	      React.createElement(
	        'g',
	        { className: "status-icon__detail" },
	        React.createElement('path', { role: 'presentation', d: 'M10,17.4 L5.3,12.7 L6.7,11.3 L10,14.6 L17.3,7.3 L18.7,8.7 L10,17.4 Z', stroke: 'none' })
	      )
	    );
	  }

	});

	module.exports = OK;

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var IntlMixin = __webpack_require__(3);

	var ErrorStatus = React.createClass({
	  displayName: 'ErrorStatus',

	  propTypes: {
	    a11yTitle: React.PropTypes.string
	  },

	  mixins: [IntlMixin],

	  render: function render() {
	    var className = 'status-icon status-icon-error';
	    var a11yTitle = this.getGrommetIntlMessage(this.props.a11yTitle);
	    if (this.props.className) {
	      className += ' ' + this.props.className;
	    }
	    if (typeof a11yTitle === "undefined") {
	      // this.props.a11yTitle emplty string is an acceptable value. Only if undefined
	      // should use the default title value.
	      a11yTitle = this.getGrommetIntlMessage('Error');
	    }
	    var errorTitleId = 'error-title';
	    return React.createElement(
	      'svg',
	      { className: className, viewBox: '0 0 24 24', 'aria-labelledby': errorTitleId, role: 'img', version: '1.1' },
	      React.createElement(
	        'title',
	        { id: errorTitleId },
	        a11yTitle
	      ),
	      React.createElement(
	        'g',
	        { className: "status-icon__base", stroke: 'none' },
	        React.createElement('path', { role: 'presentation', d: 'M12,0 L24,12 L12,24 L0,12 Z' })
	      ),
	      React.createElement(
	        'g',
	        { className: "status-icon__detail", fill: 'none' },
	        React.createElement('path', { role: 'presentation', d: 'M8,8 L16,16', strokeWidth: '2' }),
	        React.createElement('path', { role: 'presentation', d: 'M8,16 L16,8', strokeWidth: '2' })
	      )
	    );
	  }

	});

	module.exports = ErrorStatus;

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var IntlMixin = __webpack_require__(3);

	var Warning = React.createClass({
	  displayName: 'Warning',

	  propTypes: {
	    a11yTitle: React.PropTypes.string
	  },

	  mixins: [IntlMixin],
	  render: function render() {
	    var className = 'status-icon status-icon-warning';
	    var a11yTitle = this.getGrommetIntlMessage(this.props.a11yTitle);
	    if (this.props.className) {
	      className += ' ' + this.props.className;
	    }
	    if (typeof this.props.a11yTitle === "undefined") {
	      // this.props.a11yTitle emplty string is an acceptable value. Only if undefined
	      // should use the default title value.
	      a11yTitle = this.getGrommetIntlMessage('Warning');
	    }
	    var warningTitleId = 'warning-title';
	    return React.createElement(
	      'svg',
	      { className: className, viewBox: '0 0 27 24', role: 'img', 'aria-labelledby': warningTitleId, version: '1.1' },
	      React.createElement(
	        'title',
	        { id: warningTitleId },
	        a11yTitle
	      ),
	      React.createElement(
	        'g',
	        { className: "status-icon__base" },
	        React.createElement('path', { role: 'presentation', d: 'M12,0 L0,22 L24,22 L12,0 L12,0 Z', stroke: 'none' })
	      ),
	      React.createElement(
	        'g',
	        { className: "status-icon__detail", strokeWidth: '2', transform: 'translate(11.000000, 8.000000)' },
	        React.createElement('path', { role: 'presentation', d: 'M1,0 L1,6', fill: 'none' }),
	        React.createElement('path', { role: 'presentation', d: 'M1,8 L1,10', fill: 'none' })
	      )
	    );
	  }

	});

	module.exports = Warning;

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var IntlMixin = __webpack_require__(3);

	var Disabled = React.createClass({
	  displayName: 'Disabled',

	  propTypes: {
	    a11yTitle: React.PropTypes.string
	  },

	  mixins: [IntlMixin],

	  render: function render() {
	    var className = 'status-icon status-icon-disabled';
	    var a11yTitle = this.getGrommetIntlMessage(this.props.a11yTitle);
	    if (this.props.className) {
	      className += ' ' + this.props.className;
	    }
	    if (typeof this.props.a11yTitle === "undefined") {
	      // this.props.a11yTitle emplty string is an acceptable value. Only if undefined
	      // should use the default title value.
	      a11yTitle = this.getGrommetIntlMessage('Disabled');
	    }
	    var disabledTitleId = 'disabled-title';
	    return React.createElement(
	      'svg',
	      { className: className, viewBox: '0 0 24 24', role: 'img', 'aria-labelledby': disabledTitleId, version: '1.1' },
	      React.createElement(
	        'title',
	        { id: disabledTitleId },
	        a11yTitle
	      ),
	      React.createElement(
	        'g',
	        { className: "status-icon__base" },
	        React.createElement('path', { role: 'presentation', stroke: 'none', d: 'M21,24 L3,24 C1.3,24 0,22.7 0,21 L0,3 C0,1.3 1.3,0 3,0 L21,0 C22.7,0 24,1.3 24,3 L24,21 C24,22.7 22.7,24 21,24 L21,24 Z' })
	      ),
	      React.createElement(
	        'g',
	        { className: "status-icon__detail", strokeWidth: '2' },
	        React.createElement('path', { d: 'M6,12 L18,12' })
	      )
	    );
	  }

	});

	module.exports = Disabled;

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var IntlMixin = __webpack_require__(3);

	var Unknown = React.createClass({
	  displayName: 'Unknown',

	  mixins: [IntlMixin],

	  render: function render() {
	    var className = 'status-icon status-icon-unknown';
	    var a11yTitle = this.getGrommetIntlMessage(this.props.a11yTitle);
	    if (this.props.className) {
	      className += ' ' + this.props.className;
	    }
	    if (typeof this.props.a11yTitle === "undefined") {
	      // this.props.a11yTitle emplty string is an acceptable value. Only if undefined
	      // should use the default title value.
	      a11yTitle = this.getGrommetIntlMessage('Unknown');
	    }
	    var unknownTitleId = 'unknown-title';
	    return React.createElement(
	      'svg',
	      { className: className, viewBox: '0 0 24 24', role: 'img', 'aria-labelledby': unknownTitleId, version: '1.1' },
	      React.createElement(
	        'title',
	        { id: unknownTitleId },
	        a11yTitle
	      ),
	      React.createElement(
	        'g',
	        { className: "status-icon__base" },
	        React.createElement('path', { role: 'presentation', d: 'M12,2 C17.5,2 22,6.5 22,12 C22,17.5 17.5,22 12,22 C6.5,22 2,17.5 2,12 C2,6.5 6.5,2 12,2 L12,2 Z M12,0 C5.4,0 0,5.4 0,12 C0,18.6 5.4,24 12,24 C18.6,24 24,18.6 24,12 C24,5.4 18.6,0 12,0 L12,0 L12,0 Z', stroke: 'none' })
	      ),
	      React.createElement(
	        'g',
	        { className: "status-icon__detail" },
	        React.createElement('path', { role: 'presentation', d: 'M9,10.4 C9,8.8 10.4,7.6 12,7.6 C13.6,7.6 14.9,9 15,10.4 C15,11.7 14.1,12.7 12.9,13.1 C12.4,13.2 12,13.7 12,14.2 L12,15.5', fill: 'none', strokeWidth: '2' }),
	        React.createElement('circle', { role: 'presentation', stroke: 'none', cx: '12', cy: '17.6', r: '1' })
	      )
	    );
	  }

	});

	module.exports = Unknown;

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);

	var Label = React.createClass({
	  displayName: 'Label',

	  render: function render() {
	    var className = 'status-icon status-icon-label';
	    if (this.props.className) {
	      className += ' ' + this.props.className;
	    }
	    return React.createElement(
	      'svg',
	      { className: className, viewBox: '0 0 24 24', version: '1.1' },
	      React.createElement(
	        'g',
	        { className: "status-icon__base" },
	        React.createElement('circle', { cx: '12', cy: '12', r: '12', stroke: 'none' })
	      )
	    );
	  }

	});

	module.exports = Label;

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);

	var Top = React.createClass({
	  displayName: 'Top',

	  render: function render() {
	    var className = 'control-icon control-icon-top';
	    if (this.props.className) {
	      className += ' ' + this.props.className;
	    }
	    return React.createElement(
	      'svg',
	      { className: className, viewBox: '0 0 48 48', version: '1.1' },
	      React.createElement(
	        'g',
	        { fill: 'none' },
	        React.createElement('polyline', { strokeWidth: '2', points: '14,20.9 24,13 34,21 ' }),
	        React.createElement('path', { strokeWidth: '2', d: 'M24,13.3C24,36,24,36,24,36' }),
	        React.createElement('line', { strokeWidth: '2', x1: '13', y1: '11', x2: '35', y2: '11' })
	      )
	    );
	  }

	});

	module.exports = Top;

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);

	var Twitter = React.createClass({
	  displayName: 'Twitter',

	  render: function render() {
	    var className = 'control-icon control-icon-twitter';
	    if (this.props.className) {
	      className += ' ' + this.props.className;
	    }
	    return React.createElement(
	      'svg',
	      { className: className, viewBox: '0 0 48 48', version: '1.1' },
	      React.createElement(
	        'g',
	        { stroke: 'none' },
	        React.createElement('path', { d: 'M36,16.8 C35.1,17.2 34.2,17.5 33.2,17.6 C34.2,17 35,16 35.4,14.9 C34.4,15.5 33.4,15.9 32.3,16.1 C31.4,15.1 30.1,14.5 28.7,14.5 C26,14.5 23.8,16.7 23.8,19.4 C23.8,19.8 23.8,20.2 23.9,20.5 C19.8,20.3 16.2,18.3 13.8,15.4 C13.2,16.1 13,17 13,17.9 C13,19.6 13.9,21.1 15.2,22 C14.4,22 13.6,21.8 13,21.4 C13,21.4 13,21.4 13,21.5 C13,23.9 14.7,25.9 16.9,26.3 C16.5,26.4 16.1,26.5 15.6,26.5 C15.3,26.5 15,26.5 14.7,26.4 C15.3,28.4 17.1,29.8 19.3,29.8 C17.6,31.1 15.5,31.9 13.2,31.9 C12.8,31.9 12.4,31.9 12,31.8 C14.2,33.2 16.8,34 19.5,34 C28.6,34 33.5,26.5 33.5,20 L33.5,19.4 C34.5,18.7 35.3,17.8 36,16.8 L36,16.8 Z' })
	      )
	    );
	  }

	});

	module.exports = Twitter;

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);

	var Up = React.createClass({
	  displayName: 'Up',

	  render: function render() {
	    var className = 'control-icon control-icon-up';
	    if (this.props.className) {
	      className += ' ' + this.props.className;
	    }
	    return React.createElement(
	      'svg',
	      { className: className, viewBox: '0 0 48 48', version: '1.1' },
	      React.createElement(
	        'g',
	        { fill: 'none' },
	        React.createElement('polyline', { strokeWidth: '2', points: '14,20.9 24,13 34,21 ' }),
	        React.createElement('path', { strokeWidth: '2', d: 'M24,13.3C24,36,24,36,24,36' })
	      )
	    );
	  }

	});

	module.exports = Up;

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);

	var World = React.createClass({
	  displayName: 'World',

	  render: function render() {
	    var className = 'control-icon control-icon-world';
	    if (this.props.className) {
	      className += ' ' + this.props.className;
	    }
	    return React.createElement(
	      'svg',
	      { className: className, viewBox: '0 0 48 48', version: '1.1' },
	      React.createElement(
	        'g',
	        { fill: 'none', strokeWidth: '2' },
	        React.createElement('circle', { cx: '24', cy: '24', r: '12' }),
	        React.createElement('ellipse', { cx: '24', cy: '24', rx: '5.5', ry: '12' }),
	        React.createElement('path', { d: 'M13.1,19.6 L34.9,19.6' }),
	        React.createElement('path', { d: 'M13.1,28.4 L34.9,28.4' })
	      )
	    );
	  }

	});

	module.exports = World;

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var LoginForm = __webpack_require__(118);
	var Header = __webpack_require__(69);
	var Title = __webpack_require__(70);
	var Menu = __webpack_require__(17);
	var Meter = __webpack_require__(122);
	var Search = __webpack_require__(124);
	var Logo = __webpack_require__(125);
	var Gravatar = __webpack_require__(126);
	var Link = __webpack_require__(2).Link;
	var Article = __webpack_require__(65);

	var Patterns = React.createClass({
	  displayName: 'Patterns',

	  render: function render() {

	    var genericSeries = [{ label: 'Used', value: 10, units: 'TB' }, { label: 'Available', value: 20, units: 'TB' }];

	    var statusSeries = [{ label: 'Error', value: 10, colorIndex: 'error' }, { label: 'Warning', value: 20, colorIndex: 'warning' }, { label: 'OK', value: 70, colorIndex: 'ok' }];

	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Patterns'
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'p',
	          null,
	          'Interaction design patterns are task driven workflows commonly used throughout a user interface.  Designers and developers should follow the design pattern guidance in order to create consistent user experiences across the product suite. Once a user is familiar with the design patterns of your application they will come to expect the same experience for the same tasks in other applications.'
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Login'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In diam risus, fermentum at nisl pellentesque, iaculis mattis nisl. Duis dapibus.',
	          React.createElement(
	            Link,
	            { to: 'design_login' },
	            'Read more'
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(LoginForm, { rememberMe: true, forgotPassword: React.createElement(
	              'a',
	              null,
	              'Forgot password?'
	            ) })
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Header'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In diam risus, fermentum at nisl pellentesque, iaculis mattis nisl. Duis dapibus.',
	          React.createElement(
	            Link,
	            { to: 'design_header' },
	            'Read more'
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Header,
	            null,
	            React.createElement(
	              'span',
	              null,
	              React.createElement(
	                Title,
	                null,
	                React.createElement(Logo, null),
	                ' Title'
	              ),
	              React.createElement(Search, { inline: true })
	            ),
	            React.createElement(
	              Menu,
	              { direction: 'left' },
	              React.createElement(Gravatar, { email: 'eric.soderberg@hp.com', size: 48 })
	            )
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Dashboard'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In diam risus, fermentum at nisl pellentesque, iaculis mattis nisl. Duis dapibus.',
	          React.createElement(
	            Link,
	            { to: 'design_dashboard' },
	            'Read more'
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Meter, { type: 'circle', series: genericSeries }),
	          React.createElement(Meter, { type: 'circle', series: statusSeries })
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Search'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In diam risus, fermentum at nisl pellentesque, iaculis mattis nisl. Duis dapibus.',
	          React.createElement(
	            Link,
	            { to: 'design_search' },
	            'Read more'
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Header,
	            null,
	            React.createElement(Search, { inline: true })
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = Patterns;

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Form = __webpack_require__(119);
	var FormField = __webpack_require__(120);
	var CheckBox = __webpack_require__(121);
	var Button = __webpack_require__(81);
	var IntlMixin = __webpack_require__(3);
	var CLASS_ROOT = "login-form";

	var LoginForm = React.createClass({
	  displayName: 'LoginForm',

	  propTypes: {
	    logo: React.PropTypes.node,
	    title: React.PropTypes.string,
	    usernameType: React.PropTypes.string,
	    rememberMe: React.PropTypes.bool,
	    forgotPassword: React.PropTypes.node,
	    errors: React.PropTypes.arrayOf(React.PropTypes.string),
	    onSubmit: React.PropTypes.func
	  },

	  mixins: [IntlMixin],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      errors: [],
	      usernameType: 'email'
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    this.refs.username.getDOMNode().focus();
	  },

	  _onSubmit: function _onSubmit(event) {
	    event.preventDefault();
	    var username = this.refs.username.getDOMNode().value.trim();
	    var password = this.refs.password.getDOMNode().value.trim();
	    if (this.props.onSubmit) {
	      this.props.onSubmit({ username: username, password: password });
	    }
	  },

	  render: function render() {
	    var classes = [CLASS_ROOT];

	    var errors = this.props.errors.map((function (error, index) {
	      return React.createElement(
	        'div',
	        { key: index, className: CLASS_ROOT + "__error" },
	        this.getGrommetIntlMessage(error)
	      );
	    }).bind(this));

	    var logo = null;
	    if (this.props.logo) {
	      logo = React.createElement(
	        'div',
	        { className: CLASS_ROOT + "__logo" },
	        this.props.logo
	      );
	    }

	    var title = null;
	    if (this.props.title) {
	      title = React.createElement(
	        'h1',
	        { className: CLASS_ROOT + "__title" },
	        this.props.title
	      );
	    }

	    var footer = null;
	    if (this.props.rememberMe || this.props.forgotPassword) {
	      var rememberMe = null;
	      if (this.props.rememberMe) {
	        rememberMe = React.createElement(CheckBox, { className: CLASS_ROOT + "__remember-me",
	          id: 'remember-me', label: this.getGrommetIntlMessage('Remember me') });
	      }
	      footer = React.createElement(
	        'div',
	        { className: CLASS_ROOT + "__footer" },
	        rememberMe,
	        this.props.forgotPassword
	      );
	    }

	    return React.createElement(
	      Form,
	      { className: classes.join(' '), onSubmit: this._onSubmit },
	      logo,
	      title,
	      React.createElement(
	        'fieldset',
	        null,
	        React.createElement(
	          FormField,
	          { htmlFor: 'username', label: this.getGrommetIntlMessage('Username') },
	          React.createElement('input', { id: 'username', ref: 'username', type: this.props.usernameType })
	        ),
	        React.createElement(
	          FormField,
	          { htmlFor: 'password', label: this.getGrommetIntlMessage('Password') },
	          React.createElement('input', { id: 'password', ref: 'password', type: 'password' })
	        )
	      ),
	      errors,
	      React.createElement(Button, { id: CLASS_ROOT + "__submit", className: CLASS_ROOT + "__submit", primary: true, strong: true,
	        label: this.getGrommetIntlMessage('Log In'),
	        onClick: this._onSubmit }),
	      footer
	    );
	  }

	});

	module.exports = LoginForm;

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var keys = __webpack_require__(44);

	var CLASS_ROOT = "form";

	var Form = React.createClass({
	  displayName: 'Form',

	  propTypes: {
	    compact: React.PropTypes.bool,
	    fill: React.PropTypes.bool,
	    flush: React.PropTypes.bool,
	    onSubmit: React.PropTypes.func,
	    pad: React.PropTypes.oneOfType([React.PropTypes.oneOf(['none', 'small', 'medium', 'large']), React.PropTypes.shape({
	      horizontal: React.PropTypes.oneOf(['none', 'small', 'medium', 'large']),
	      vertical: React.PropTypes.oneOf(['none', 'small', 'medium', 'large'])
	    })])
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      compact: false,
	      fill: false,
	      flush: true,
	      pad: 'none'
	    };
	  },

	  render: function render() {
	    var classes = [CLASS_ROOT];
	    if (this.props.compact) {
	      classes.push(CLASS_ROOT + "--compact");
	    }
	    if (this.props.fill) {
	      classes.push(CLASS_ROOT + "--fill");
	    }
	    if (this.props.pad) {
	      if (typeof this.props.pad === 'string') {
	        classes.push(CLASS_ROOT + "--pad-" + this.props.pad);
	      } else if (typeof this.props.pad === 'object') {
	        keys(this.props.pad).forEach(function (key) {
	          classes.push(CLASS_ROOT + '--pad-' + key + '-' + this.props.pad[key]);
	        });
	      }
	    }
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }
	    return React.createElement(
	      'form',
	      { className: classes.join(' '), onSubmit: this.props.onSubmit },
	      this.props.children
	    );
	  }

	});

	module.exports = Form;

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);

	var CLASS_ROOT = "form-field";

	var FormField = React.createClass({
	  displayName: 'FormField',

	  propTypes: {
	    error: React.PropTypes.string,
	    help: React.PropTypes.node,
	    hidden: React.PropTypes.bool,
	    htmlFor: React.PropTypes.string,
	    label: React.PropTypes.string,
	    required: React.PropTypes.bool
	  },

	  getInitialState: function getInitialState() {
	    return { focus: false };
	  },

	  componentDidMount: function componentDidMount() {
	    var contentsElement = this.refs.contents.getDOMNode();
	    var inputElements = contentsElement.querySelectorAll('input, textarea, select');
	    if (inputElements.length === 1) {
	      this._inputElement = inputElements[0];
	      this._inputElement.addEventListener('focus', this._onFocus);
	      this._inputElement.addEventListener('blur', this._onBlur);
	    }
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    if (this._inputElement) {
	      this._inputElement.removeEventListener('focus', this._onFocus);
	      this._inputElement.removeEventListener('blur', this._onBlur);
	      delete this._inputElement;
	    }
	  },

	  _onFocus: function _onFocus() {
	    this.setState({ focus: true });
	  },

	  _onBlur: function _onBlur() {
	    this.setState({ focus: false });
	  },

	  _onClick: function _onClick() {
	    if (this._inputElement) {
	      this._inputElement.focus();
	    }
	  },

	  render: function render() {
	    var classes = [CLASS_ROOT];
	    if (this.state.focus) {
	      classes.push(CLASS_ROOT + "--focus");
	    }
	    if (this.props.required) {
	      classes.push(CLASS_ROOT + "--required");
	    }
	    if (this.props.hidden) {
	      classes.push(CLASS_ROOT + "--hidden");
	    }
	    if (this.props.htmlFor) {
	      classes.push(CLASS_ROOT + "--text");
	    }

	    var error;
	    if (this.props.error) {
	      classes.push(CLASS_ROOT + "--error");
	      error = React.createElement(
	        'span',
	        { className: CLASS_ROOT + "__error" },
	        this.props.error
	      );
	    }
	    var help;
	    if (this.props.help !== null && this.props.help !== undefined) {
	      help = React.createElement(
	        'span',
	        { className: CLASS_ROOT + "__help" },
	        this.props.help
	      );
	    }

	    return React.createElement(
	      'div',
	      { className: classes.join(' '), onClick: this._onClick },
	      error,
	      React.createElement(
	        'label',
	        { className: CLASS_ROOT + "__label", htmlFor: this.props.htmlFor },
	        this.props.label
	      ),
	      help,
	      React.createElement(
	        'span',
	        { ref: 'contents', className: CLASS_ROOT + "__contents" },
	        this.props.children
	      )
	    );
	  }

	});

	module.exports = FormField;

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);

	var CLASS_ROOT = "check-box";

	var CheckBox = React.createClass({
	  displayName: 'CheckBox',

	  propTypes: {
	    checked: React.PropTypes.bool,
	    defaultChecked: React.PropTypes.bool,
	    disabled: React.PropTypes.bool,
	    id: React.PropTypes.string.isRequired,
	    label: React.PropTypes.string.isRequired,
	    name: React.PropTypes.string,
	    onChange: React.PropTypes.func,
	    ariaDescribedby: React.PropTypes.string,
	    toggle: React.PropTypes.bool
	  },

	  render: function render() {
	    var classes = [CLASS_ROOT];
	    var labelId = 'checkbox-label';
	    var hidden;
	    if (this.props.toggle) {
	      classes.push(CLASS_ROOT + "--toggle");
	    }
	    if (this.props.disabled) {
	      classes.push(CLASS_ROOT + "--disabled");
	      if (this.props.checked) {
	        hidden = React.createElement('input', { name: this.props.name, type: 'hidden', value: 'true' });
	      }
	    }
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }

	    return React.createElement(
	      'label',
	      { className: classes.join(' '),
	        'aria-describedby': this.props.ariaDescribedby,
	        'aria-lebelledby': labelId },
	      React.createElement('input', { tabIndex: '0', className: CLASS_ROOT + "__input",
	        id: this.props.id, name: this.props.name, type: 'checkbox',
	        disabled: this.props.disabled,
	        checked: this.props.checked,
	        defaultChecked: this.props.defaultChecked,
	        onChange: this.props.onChange }),
	      React.createElement(
	        'span',
	        { className: CLASS_ROOT + "__control" },
	        React.createElement(
	          'svg',
	          { className: CLASS_ROOT + "__control-check", viewBox: '0 0 24 24',
	            preserveAspectRatio: 'xMidYMid meet' },
	          React.createElement('path', { fill: 'none', d: 'M6,11.3 L10.3,16 L18,6.2' })
	        )
	      ),
	      hidden,
	      React.createElement(
	        'span',
	        { role: 'label', id: labelId, tabIndex: '-1', className: CLASS_ROOT + "__label" },
	        this.props.label
	      )
	    );
	  }

	});

	module.exports = CheckBox;

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Legend = __webpack_require__(123);

	var CLASS_ROOT = "meter";

	var BAR_LENGTH = 192;
	var BAR_THICKNESS = 24;
	var MID_BAR_THICKNESS = BAR_THICKNESS / 2;

	var CIRCLE_WIDTH = 192;
	var CIRCLE_RADIUS = 84;

	var ARC_HEIGHT = 144;

	var SPIRAL_THICKNESS = 24;
	// Allow for active value content next to a spiral meter
	var SPIRAL_TEXT_PADDING = 48;

	function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
	  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
	  return {
	    x: centerX + radius * Math.cos(angleInRadians),
	    y: centerY + radius * Math.sin(angleInRadians)
	  };
	}

	function arcCommands(centerX, centerY, radius, startAngle, endAngle) {
	  var start = polarToCartesian(centerX, centerY, radius, endAngle);
	  var end = polarToCartesian(centerX, centerY, radius, startAngle);
	  var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
	  var d = ["M", start.x, start.y, "A", radius, radius, 0, arcSweep, 0, end.x, end.y].join(" ");
	  return d;
	}

	function singleIndicatorCommands(centerX, centerY, radius, startAngle, endAngle, length) {
	  var point = polarToCartesian(centerX, centerY, radius - length, endAngle - 1);
	  var start = polarToCartesian(centerX, centerY, radius, endAngle - 1);
	  var d = ["M", start.x, start.y, "L", point.x, point.y].join(" ");
	  return d;
	}

	var Meter = React.createClass({
	  displayName: 'Meter',

	  propTypes: {
	    important: React.PropTypes.number,
	    large: React.PropTypes.bool, // DEPRECATED: remove in 0.5, use size
	    legend: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.shape({
	      total: React.PropTypes.bool,
	      placement: React.PropTypes.oneOf(['right', 'bottom'])
	    })]),
	    max: React.PropTypes.oneOfType([React.PropTypes.shape({
	      value: React.PropTypes.number.isRequired,
	      label: React.PropTypes.string
	    }), React.PropTypes.number]),
	    min: React.PropTypes.oneOfType([React.PropTypes.shape({
	      value: React.PropTypes.number.isRequired,
	      label: React.PropTypes.string
	    }), React.PropTypes.number]),
	    size: React.PropTypes.oneOf(['small', 'medium', 'large']),
	    series: React.PropTypes.arrayOf(React.PropTypes.shape({
	      label: React.PropTypes.string,
	      value: React.PropTypes.number.isRequired,
	      colorIndex: React.PropTypes.string,
	      important: React.PropTypes.bool,
	      onClick: React.PropTypes.func
	    })),
	    small: React.PropTypes.bool, // DEPRECATED: remove in 0.5, use size
	    threshold: React.PropTypes.number,
	    thresholds: React.PropTypes.arrayOf(React.PropTypes.shape({
	      label: React.PropTypes.string,
	      value: React.PropTypes.number.isRequired,
	      colorIndex: React.PropTypes.string
	    })),
	    type: React.PropTypes.oneOf(['bar', 'arc', 'circle', 'spiral']),
	    units: React.PropTypes.string,
	    value: React.PropTypes.number,
	    vertical: React.PropTypes.bool
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      type: 'bar'
	    };
	  },

	  getInitialState: function getInitialState() {
	    var state = this._stateFromProps(this.props);
	    if (state.placeLegend) {
	      state.legendPlacement = 'bottom';
	    }
	    state.initial = true;
	    return state;
	  },

	  componentDidMount: function componentDidMount() {
	    this._initialTimer = setTimeout(this._initialTimeout, 10);
	    window.addEventListener('resize', this._onResize);
	    this._onResize();
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
	    var state = this._stateFromProps(newProps);
	    this.setState(state);
	    this._onResize();
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    clearTimeout(this._initialTimer);
	    clearTimeout(this._resizeTimer);
	    window.removeEventListener('resize', this._onResize);
	  },

	  _initialTimeout: function _initialTimeout() {
	    this.setState({
	      initial: false,
	      activeIndex: this.state.importantIndex
	    });
	    clearTimeout(this._timeout);
	  },

	  _onActivate: function _onActivate(index) {
	    this.setState({ initial: false, activeIndex: index });
	  },

	  _onResize: function _onResize() {
	    // debounce
	    clearTimeout(this._resizeTimer);
	    this._resizeTimer = setTimeout(this._layout, 50);
	  },

	  _layout: function _layout() {
	    if (this.state.placeLegend) {
	      // legendPlacement based on available window orientation
	      var ratio = window.innerWidth / window.innerHeight;
	      if (ratio < 0.8) {
	        this.setState({ legendPlacement: 'bottom' });
	      } else if (ratio > 1.2) {
	        this.setState({ legendPlacement: 'right' });
	      }
	    }

	    if ('right' === this.state.legendPlacement) {
	      if (this.refs.legend) {
	        var graphicHeight = this.refs.activeGraphic.getDOMNode().offsetHeight;
	        var legendHeight = this.refs.legend.getDOMNode().offsetHeight;
	        this.setState({ tallLegend: legendHeight > graphicHeight });
	      }
	    }
	  },

	  _normalizeSeries: function _normalizeSeries(props, min, max, thresholds) {
	    var series = [];
	    if (props.series) {
	      series = props.series;
	    } else if (props.value || props.value === 0) {
	      series = [{ value: props.value, important: true }];
	    }

	    // set color index
	    if (series.length === 1 && props.thresholds) {
	      var item = series[0];
	      if (!item.colorIndex) {
	        // see which threshold color index to use
	        var cumulative = 0;
	        thresholds.some(function (threshold) {
	          cumulative += threshold.value;
	          if (item.value < cumulative) {
	            item.colorIndex = threshold.colorIndex || 'graph-1';
	            return true;
	          }
	        });
	      }
	    } else {
	      series.forEach(function (item, index) {
	        if (!item.colorIndex) {
	          item.colorIndex = 'graph-' + (index + 1);
	        }
	      });
	    }

	    return series;
	  },

	  _normalizeThresholds: function _normalizeThresholds(props, min, max) {
	    var thresholds = [];
	    if (props.thresholds) {
	      // Convert thresholds from absolute values to cummulative,
	      // so we can re-use the series drawing code.
	      var total = 0;
	      for (var i = 0; i < props.thresholds.length; i += 1) {
	        var threshold = props.thresholds[i];
	        thresholds.push({
	          label: threshold.label,
	          colorIndex: threshold.colorIndex
	        });
	        if (i > 0) {
	          thresholds[i - 1].value = threshold.value - total;
	          total += thresholds[i - 1].value;
	        }
	        if (i === props.thresholds.length - 1) {
	          thresholds[i].value = max.value - total;
	        }
	      }
	    } else if (props.threshold) {
	      var remaining = max.value - props.threshold;
	      thresholds = [{ value: props.threshold, colorIndex: 'unset' }, { value: remaining, colorIndex: 'error' }];
	    } else {
	      thresholds = [{ value: max.value, colorIndex: 'unset' }];
	    }
	    return thresholds;
	  },

	  _importantIndex: function _importantIndex(series) {
	    var result = null;
	    if (series.length === 1) {
	      result = 0;
	    }
	    if (this.props.hasOwnProperty('important')) {
	      result = this.props.important;
	    }
	    series.some(function (data, index) {
	      if (data.important) {
	        result = index;
	        return true;
	      }
	    });
	    return result;
	  },

	  // Normalize min or max to an object.
	  _terminal: function _terminal(terminal) {
	    if (typeof terminal === 'number') {
	      terminal = { value: terminal };
	    }
	    return terminal;
	  },

	  _seriesTotal: function _seriesTotal(series) {
	    var total = 0;
	    series.some(function (item) {
	      total += item.value;
	    });
	    return total;
	  },

	  _seriesMax: function _seriesMax(series) {
	    var max = 0;
	    series.some(function (item) {
	      max = Math.max(max, item.value);
	    });
	    return max;
	  },

	  _viewBoxDimensions: function _viewBoxDimensions(series) {
	    var viewBoxHeight;
	    var viewBoxWidth;
	    if ('arc' === this.props.type) {
	      if (this.props.vertical) {
	        viewBoxWidth = ARC_HEIGHT;
	        viewBoxHeight = CIRCLE_WIDTH;
	      } else {
	        viewBoxWidth = CIRCLE_WIDTH;
	        viewBoxHeight = ARC_HEIGHT;
	      }
	    } else if ('circle' === this.props.type) {
	      viewBoxWidth = CIRCLE_WIDTH;
	      viewBoxHeight = CIRCLE_WIDTH;
	    } else if ('bar' === this.props.type) {
	      if (this.props.vertical) {
	        viewBoxWidth = BAR_THICKNESS;
	        viewBoxHeight = BAR_LENGTH;
	      } else {
	        viewBoxWidth = BAR_LENGTH;
	        viewBoxHeight = BAR_THICKNESS;
	      }
	    } else if ('spiral' === this.props.type) {
	      // Give the graphic just a bit of breathing room
	      // by not ending the spirals right at the center. (+1)
	      viewBoxHeight = Math.max(CIRCLE_WIDTH, SPIRAL_THICKNESS * (series.length + 1) * 2);
	      viewBoxWidth = viewBoxHeight + 2 * SPIRAL_TEXT_PADDING;
	    }
	    return [viewBoxWidth, viewBoxHeight];
	  },

	  // Generates state based on the provided props.
	  _stateFromProps: function _stateFromProps(props) {
	    var total;
	    if (props.series && props.series.length > 1) {
	      total = this._seriesTotal(props.series);
	    } else if (props.max && props.max.value) {
	      total = props.max.value;
	    } else {
	      total = 100;
	    }
	    var seriesMax;
	    if (props.series && 'spiral' === props.type) {
	      seriesMax = this._seriesMax(props.series);
	    }
	    // Normalize min and max
	    var min = this._terminal(props.min || 0);
	    // Max could be provided in props or come from the total of
	    // a multi-value series.
	    var max = this._terminal(props.max || seriesMax || total);
	    // Normalize simple threshold prop to an array, if needed.
	    var thresholds = this._normalizeThresholds(props, min, max);
	    // Normalize simple value prop to a series, if needed.
	    var series = this._normalizeSeries(props, min, max, thresholds);
	    // Determine important index.
	    var importantIndex = this._importantIndex(series);
	    // Determine the viewBox dimensions
	    var viewBoxDimensions = this._viewBoxDimensions(series);

	    var state = {
	      importantIndex: importantIndex,
	      activeIndex: importantIndex,
	      series: series,
	      thresholds: thresholds,
	      min: min,
	      max: max,
	      total: total,
	      viewBoxWidth: viewBoxDimensions[0],
	      viewBoxHeight: viewBoxDimensions[1]
	    };

	    if ('arc' === this.props.type) {
	      state.startAngle = 60;
	      state.anglePer = total === 0 ? 0 : 240.0 / total;
	      if (this.props.vertical) {
	        state.angleOffset = 90;
	      } else {
	        state.angleOffset = 180;
	      }
	    } else if ('circle' === this.props.type) {
	      state.startAngle = 1;
	      state.anglePer = total === 0 ? 0 : 358.0 / total;
	      state.angleOffset = 180;
	    } else if ('bar' === this.props.type) {
	      state.scale = BAR_LENGTH / (max.value - min.value);
	    } else if ('spiral' === this.props.type) {
	      state.startAngle = 0;
	      state.anglePer = 270.0 / max.value;
	      state.angleOffset = 0;
	      // The last spiral ends out near but not quite at the edge of the view box.
	      state.startRadius = Math.max(CIRCLE_RADIUS, SPIRAL_THICKNESS * (series.length + 0.5)) - Math.max(0, series.length - 1) * SPIRAL_THICKNESS;
	    }

	    // normalize size
	    state.size = props.size || (props.small ? 'small' : props.large ? 'large' : null);

	    // legend
	    state.placeLegend = !(props.legend && props.legend.placement);
	    if (!state.placeLegend) {
	      state.legendPlacement = props.legend.placement;
	    }

	    return state;
	  },

	  _translateBarWidth: function _translateBarWidth(value) {
	    return Math.round(this.state.scale * value);
	  },

	  _barCommands: function _barCommands(start, distance) {
	    var commands;
	    if (this.props.vertical) {
	      commands = "M" + MID_BAR_THICKNESS + "," + (BAR_LENGTH - start) + " L" + MID_BAR_THICKNESS + "," + (BAR_LENGTH - (start + distance));
	    } else {
	      commands = "M" + start + "," + MID_BAR_THICKNESS + " L" + (start + distance) + "," + MID_BAR_THICKNESS;
	    }
	    return commands;
	  },

	  _renderBar: function _renderBar(series) {
	    var start = 0;
	    var minRemaining = this.state.min.value;
	    var classes;
	    var commands;

	    var paths = series.map(function (item, index) {
	      classes = [CLASS_ROOT + "__bar"];
	      if (index === this.state.activeIndex) {
	        classes.push(CLASS_ROOT + "__bar--active");
	      }
	      classes.push("color-index-" + item.colorIndex);

	      var value = item.value - minRemaining;
	      minRemaining = Math.max(0, minRemaining - item.value);
	      var distance = this._translateBarWidth(value);
	      commands = this._barCommands(start, distance);
	      start += distance;

	      return React.createElement('path', { key: index, className: classes.join(' '), d: commands,
	        onMouseOver: this._onActivate.bind(this, index),
	        onMouseOut: this._onActivate.bind(this, this.state.importantIndex),
	        onClick: item.onClick });
	    }, this);

	    if (paths.length === 0) {
	      classes = [CLASS_ROOT + "__bar"];
	      classes.push(CLASS_ROOT + "__bar--loading");
	      classes.push("color-index-loading");
	      commands = this._barCommands(0, BAR_LENGTH);
	      paths.push(React.createElement('path', { key: 'loading', className: classes.join(' '), d: commands }));
	    }

	    return paths;
	  },

	  _translateEndAngle: function _translateEndAngle(startAngle, value) {
	    return Math.min(360, Math.max(0, startAngle + this.state.anglePer * value));
	  },

	  _arcCommands: function _arcCommands(startAngle, endAngle) {
	    return arcCommands(CIRCLE_WIDTH / 2, CIRCLE_WIDTH / 2, CIRCLE_RADIUS, startAngle + this.state.angleOffset, endAngle + this.state.angleOffset);
	  },

	  _renderArcOrCircle: function _renderArcOrCircle(series) {
	    var startAngle = this.state.startAngle;
	    var classes;
	    var endAngle;
	    var commands;

	    var paths = series.map(function (item, index) {
	      var classes = [CLASS_ROOT + "__slice"];
	      if (index === this.state.activeIndex) {
	        classes.push(CLASS_ROOT + "__slice--active");
	      }
	      classes.push("color-index-" + item.colorIndex);
	      endAngle = this._translateEndAngle(startAngle, item.value);
	      commands = this._arcCommands(startAngle, endAngle);

	      startAngle = endAngle;

	      return React.createElement('path', { key: item.label || index, fill: 'none',
	        className: classes.join(' '), d: commands,
	        onMouseOver: this._onActivate.bind(this, index),
	        onMouseOut: this._onActivate.bind(this, this.state.importantIndex),
	        onClick: item.onClick });
	    }, this);

	    if (paths.length === 0) {
	      classes = [CLASS_ROOT + "__slice"];
	      classes.push(CLASS_ROOT + "__slice--loading");
	      classes.push("color-index-loading");
	      endAngle = this._translateEndAngle(this.state.startAngle, this.state.max.value);
	      commands = this._arcCommands(this.state.startAngle, endAngle);
	      paths.push(React.createElement('path', { key: 'loading', className: classes.join(' '), d: commands }));
	    }

	    return paths;
	  },

	  _spiralCommands: function _spiralCommands(startAngle, endAngle, radius) {
	    return arcCommands(this.state.viewBoxWidth / 2, this.state.viewBoxHeight / 2, radius, startAngle + this.state.angleOffset, endAngle + this.state.angleOffset);
	  },

	  _renderSpiral: function _renderSpiral(series) {
	    var startAngle = this.state.startAngle;
	    var radius = this.state.startRadius;
	    var classes;
	    var endAngle;
	    var commands;

	    var paths = series.map(function (item, index) {
	      var classes = [CLASS_ROOT + "__slice"];
	      if (index === this.state.activeIndex) {
	        classes.push(CLASS_ROOT + "__slice--active");
	      }
	      classes.push("color-index-" + item.colorIndex);
	      endAngle = this._translateEndAngle(startAngle, item.value);
	      commands = this._spiralCommands(startAngle, endAngle, radius);

	      radius += SPIRAL_THICKNESS;

	      return React.createElement('path', { key: item.label || index, fill: 'none',
	        className: classes.join(' '), d: commands,
	        onMouseOver: this._onActivate.bind(this, index),
	        onMouseOut: this._onActivate.bind(this, this.state.importantIndex),
	        onClick: item.onClick });
	    }, this);

	    if (paths.length === 0) {
	      classes = [CLASS_ROOT + "__slice"];
	      classes.push(CLASS_ROOT + "__slice--loading");
	      classes.push("color-index-loading");
	      endAngle = this._translateEndAngle(this.state.startAngle, this.state.max.value);
	      commands = this._spiralCommands(this.state.startAngle, endAngle, radius);
	      paths.push(React.createElement('path', { key: 'loading', className: classes.join(' '), d: commands }));
	    }

	    return paths;
	  },

	  _renderSingleIndicator: function _renderSingleIndicator(series) {
	    var seriesIndicator = null;
	    var startAngle = this.state.startAngle;
	    series.forEach(function (item, index) {
	      var endAngle = this._translateEndAngle(startAngle, item.value);

	      if (index === this.state.activeIndex) {
	        var length;
	        var x;
	        var y;
	        if ('arc' === this.props.type) {
	          length = CIRCLE_RADIUS;
	          x = CIRCLE_WIDTH / 2;
	          y = CIRCLE_WIDTH / 2;
	        } else {
	          length = CIRCLE_RADIUS * 0.60;
	          x = this.state.viewBoxWidth / 2;
	          y = this.state.viewBoxHeight / 2;
	        }
	        var indicatorCommands = singleIndicatorCommands(x, y, CIRCLE_RADIUS * 1.1, startAngle + this.state.angleOffset, endAngle + this.state.angleOffset, length);
	        seriesIndicator = React.createElement('path', { fill: 'none',
	          className: CLASS_ROOT + "__slice-indicator color-index-" + item.colorIndex,
	          d: indicatorCommands });
	      }

	      startAngle = endAngle;
	    }, this);

	    return seriesIndicator;
	  },

	  _renderActive: function _renderActive() {
	    var fields;
	    if (null === this.state.activeIndex) {
	      fields = { value: this.state.total, label: 'Total' };
	    } else {
	      var active = this.state.series[this.state.activeIndex];
	      fields = { value: active.value, label: active.label };
	    }
	    var units;
	    if (this.props.units) {
	      units = React.createElement(
	        'span',
	        { className: CLASS_ROOT + "__active-units large-number-font" },
	        this.props.units
	      );
	    }
	    return React.createElement(
	      'div',
	      { className: CLASS_ROOT + "__active" },
	      React.createElement(
	        'span',
	        { className: CLASS_ROOT + "__active-value large-number-font" },
	        fields.value,
	        units
	      ),
	      React.createElement(
	        'span',
	        { className: CLASS_ROOT + "__active-label" },
	        fields.label
	      )
	    );
	  },

	  _renderLabels: function _renderLabels(series) {
	    var x = this.state.viewBoxWidth / 2 - SPIRAL_THICKNESS / 2;
	    var y = SPIRAL_THICKNESS * 0.75 + SPIRAL_THICKNESS * (series.length - 1);
	    var labels = series.map(function (item, index) {
	      var classes = [CLASS_ROOT + "__label"];
	      if (index === this.state.activeIndex) {
	        classes.push(CLASS_ROOT + "__label--active");
	      }

	      var textX = x;
	      var textY = y;

	      y -= SPIRAL_THICKNESS;

	      return React.createElement(
	        'text',
	        { key: item.label || index, x: textX, y: textY,
	          textAnchor: 'end', fontSize: 16,
	          className: classes.join(' '),
	          onMouseOver: this._onActivate.bind(this, index),
	          onMouseOut: this._onActivate.bind(this, this.state.importantIndex),
	          onClick: item.onClick },
	        item.label
	      );
	    }, this);

	    return React.createElement(
	      'g',
	      { className: CLASS_ROOT + "__labels" },
	      labels
	    );
	  },

	  _renderLegend: function _renderLegend() {
	    return React.createElement(Legend, { ref: 'legend', className: CLASS_ROOT + "__legend",
	      series: this.state.series,
	      units: this.props.units,
	      activeIndex: this.state.activeIndex,
	      onActive: this._onActive });
	  },

	  render: function render() {
	    var classes = [CLASS_ROOT];
	    classes.push(CLASS_ROOT + "--" + this.props.type);
	    if (this.props.vertical) {
	      classes.push(CLASS_ROOT + "--vertical");
	    }
	    if (this.state.size) {
	      classes.push(CLASS_ROOT + "--" + this.state.size);
	    }
	    if (this.state.series.length === 0) {
	      classes.push(CLASS_ROOT + "--loading");
	    } else if (this.state.series.length === 1) {
	      classes.push(CLASS_ROOT + "--single");
	    }
	    if (this.state.activeIndex !== null) {
	      classes.push(CLASS_ROOT + "--active");
	    }
	    if (this.state.tallLegend) {
	      classes.push(CLASS_ROOT + "--tall-legend");
	    }
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }

	    var values;
	    var thresholds;
	    var singleIndicator;
	    var labels;
	    var width;
	    var height;
	    if ('arc' === this.props.type || 'circle' === this.props.type) {
	      values = this._renderArcOrCircle(this.state.series);
	      thresholds = this._renderArcOrCircle(this.state.thresholds);
	      if (this.state.series.length === 1) {
	        singleIndicator = this._renderSingleIndicator(this.state.series);
	      }
	    } else if ('bar' === this.props.type) {
	      values = this._renderBar(this.state.series);
	      thresholds = this._renderBar(this.state.thresholds);
	    } else if ('spiral' === this.props.type) {
	      values = this._renderSpiral(this.state.series);
	      if (this.state.series.length === 1) {
	        singleIndicator = this._renderSingleIndicator(this.state.series);
	      }
	      labels = this._renderLabels(this.state.series);
	      width = this.state.viewBoxWidth;
	      height = this.state.viewBoxHeight;
	    }

	    if (thresholds) {
	      thresholds = React.createElement(
	        'g',
	        { className: CLASS_ROOT + "__thresholds" },
	        thresholds
	      );
	    }

	    var minLabel;
	    if (this.state.min.label) {
	      minLabel = React.createElement(
	        'div',
	        { className: CLASS_ROOT + "__minmax-min" },
	        this.state.min.label
	      );
	    }
	    var maxLabel;
	    if (this.state.max.label) {
	      maxLabel = React.createElement(
	        'div',
	        { className: CLASS_ROOT + "__minmax-max" },
	        this.state.max.label
	      );
	    }
	    var minMax;
	    if (minLabel || maxLabel) {
	      minMax = React.createElement(
	        'div',
	        { className: CLASS_ROOT + "__minmax-container" },
	        React.createElement(
	          'div',
	          { className: CLASS_ROOT + "__minmax" },
	          minLabel,
	          maxLabel
	        )
	      );
	      classes.push(CLASS_ROOT + "--minmax");
	    }

	    var active = this._renderActive();

	    var legend;
	    if (this.props.legend) {
	      legend = this._renderLegend();
	      classes.push(CLASS_ROOT + "--legend-" + this.state.legendPlacement);
	    }

	    return React.createElement(
	      'div',
	      { className: classes.join(' ') },
	      React.createElement(
	        'div',
	        { ref: 'activeGraphic', className: CLASS_ROOT + "__active-graphic" },
	        React.createElement(
	          'div',
	          { className: CLASS_ROOT + "__labeled-graphic" },
	          React.createElement(
	            'svg',
	            { className: CLASS_ROOT + "__graphic",
	              viewBox: "0 0 " + this.state.viewBoxWidth + " " + this.state.viewBoxHeight,
	              preserveAspectRatio: 'xMidYMid meet', width: width, height: height },
	            thresholds,
	            React.createElement(
	              'g',
	              { className: CLASS_ROOT + "__values" },
	              values
	            ),
	            labels,
	            singleIndicator
	          ),
	          minMax
	        ),
	        active
	      ),
	      legend
	    );
	  }

	});

	module.exports = Meter;

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var IntlMixin = __webpack_require__(3);

	var CLASS_ROOT = "legend";

	var Legend = React.createClass({
	  displayName: 'Legend',

	  propTypes: {
	    activeIndex: React.PropTypes.number,
	    onActive: React.PropTypes.func,
	    series: React.PropTypes.arrayOf(React.PropTypes.shape({
	      label: React.PropTypes.string,
	      value: React.PropTypes.number,
	      units: React.PropTypes.string,
	      colorIndex: React.PropTypes.oneOfType([React.PropTypes.number, // 1-6
	      React.PropTypes.string // status
	      ]),
	      onClick: React.PropTypes.func
	    })).isRequired,
	    total: React.PropTypes.bool,
	    units: React.PropTypes.string,
	    value: React.PropTypes.number
	  },

	  mixins: [IntlMixin],

	  getInitialState: function getInitialState() {
	    return { activeIndex: this.props.activeIndex };
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
	    this.setState({ activeIndex: newProps.activeIndex });
	  },

	  _onActive: function _onActive(index) {
	    this.setState({ activeIndex: index });
	    if (this.props.onActive) {
	      this.props.onActive(index);
	    }
	  },

	  _itemColorIndex: function _itemColorIndex(item, index) {
	    return item.colorIndex || 'graph-' + (index + 1);
	  },

	  render: function render() {
	    var classes = [CLASS_ROOT];
	    if (this.props.series.length === 1) {
	      classes.push(CLASS_ROOT + "--single");
	    }
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }

	    var totalValue = 0;
	    var items = this.props.series.map(function (item, index) {
	      var legendClasses = [CLASS_ROOT + "__item"];
	      if (index === this.state.activeIndex) {
	        legendClasses.push(CLASS_ROOT + "__item--active");
	      }
	      var colorIndex = this._itemColorIndex(item, index);
	      totalValue += item.value;

	      var valueClasses = [CLASS_ROOT + "__item-value"];
	      if (1 === this.props.series.length) {
	        valueClasses.push("large-number-font");
	      }

	      var swatch;
	      if (item.hasOwnProperty('colorIndex')) {
	        swatch = React.createElement(
	          'svg',
	          { className: CLASS_ROOT + "__item-swatch color-index-" + colorIndex,
	            viewBox: '0 0 12 12' },
	          React.createElement('path', { className: item.className, d: 'M 5 0 l 0 12' })
	        );
	      }

	      var label;
	      if (item.hasOwnProperty('label')) {
	        label = React.createElement(
	          'span',
	          { className: CLASS_ROOT + "__item-label" },
	          item.label
	        );
	      }

	      var value;
	      if (item.hasOwnProperty('value')) {
	        value = React.createElement(
	          'span',
	          { className: valueClasses.join(' ') },
	          item.value,
	          React.createElement(
	            'span',
	            { className: CLASS_ROOT + "__item-units" },
	            this.props.units
	          )
	        );
	      }

	      return React.createElement(
	        'li',
	        { key: item.label || index, className: legendClasses.join(' '),
	          onClick: item.onClick,
	          onMouseOver: this._onActive.bind(this, index),
	          onMouseOut: this._onActive.bind(this, this.props.activeIndex) },
	        swatch,
	        label,
	        value
	      );
	    }, this);

	    var total = null;
	    if (this.props.total && this.props.series.length > 1) {
	      total = React.createElement(
	        'li',
	        { className: CLASS_ROOT + "__total" },
	        React.createElement(
	          'span',
	          { className: CLASS_ROOT + "__total-label" },
	          this.getGrommetIntlMessage('Total')
	        ),
	        React.createElement(
	          'span',
	          { className: CLASS_ROOT + "__total-value" },
	          totalValue,
	          React.createElement(
	            'span',
	            { className: CLASS_ROOT + "__total-units" },
	            this.props.units
	          )
	        )
	      );
	    }

	    return React.createElement(
	      'ol',
	      { className: classes.join(' ') },
	      items.reverse(),
	      total
	    );
	  }

	});

	module.exports = Legend;

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var KeyboardAccelerators = __webpack_require__(16);
	var Drop = __webpack_require__(56);
	var Responsive = __webpack_require__(58);
	var SearchIcon = __webpack_require__(104);
	var IntlMixin = __webpack_require__(3);

	var CLASS_ROOT = "search";

	var Search = React.createClass({
	  displayName: 'Search',

	  propTypes: {
	    defaultValue: React.PropTypes.string,
	    dropAlign: Drop.alignPropType,
	    dropColorIndex: React.PropTypes.string,
	    inline: React.PropTypes.bool,
	    large: React.PropTypes.bool,
	    onChange: React.PropTypes.func,
	    placeHolder: React.PropTypes.string,
	    responsive: React.PropTypes.bool,
	    suggestions: React.PropTypes.arrayOf(React.PropTypes.string),
	    value: React.PropTypes.string
	  },

	  mixins: [KeyboardAccelerators, IntlMixin],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      align: 'left',
	      inline: false,
	      placeHolder: 'Search',
	      dropAlign: { top: 'top', left: 'left' },
	      responsive: true
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      align: 'left',
	      controlFocused: false,
	      inline: this.props.inline,
	      dropActive: false,
	      activeSuggestionIndex: -1
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    if (this.props.inline && this.props.responsive) {
	      this._responsive = Responsive.start(this._onResponsive);
	    }
	  },

	  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {

	    // Set up keyboard listeners appropriate to the current state.

	    var activeKeyboardHandlers = {
	      esc: this._onRemoveDrop,
	      tab: this._onRemoveDrop,
	      up: this._onPreviousSuggestion,
	      down: this._onNextSuggestion,
	      enter: this._onEnter
	    };
	    var focusedKeyboardHandlers = {
	      space: this._onAddDrop
	    };

	    // the order here is important, need to turn off keys before turning on

	    if (!this.state.controlFocused && prevState.controlFocused) {
	      this.stopListeningToKeyboard(focusedKeyboardHandlers);
	    }

	    if (!this.state.dropActive && prevState.dropActive) {
	      document.removeEventListener('click', this._onRemoveDrop);
	      this.stopListeningToKeyboard(activeKeyboardHandlers);
	      if (this._drop) {
	        this._drop.remove();
	        this._drop = null;
	      }
	    }

	    if (this.state.controlFocused && !prevState.controlFocused) {
	      this.startListeningToKeyboard(focusedKeyboardHandlers);
	    }

	    if (this.state.dropActive && !prevState.dropActive) {
	      document.addEventListener('click', this._onRemoveDrop);
	      this.startListeningToKeyboard(activeKeyboardHandlers);

	      var baseElement = (this.refs.control ? this.refs.control : this.refs.input).getDOMNode();
	      this._drop = Drop.add(baseElement, this._renderDrop(), this.props.dropAlign);

	      document.getElementById('search-drop-input').focus();
	    }
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    document.removeEventListener('click', this._onRemoveDrop);
	    if (this._responsive) {
	      this._responsive.stop();
	    }
	  },

	  _onAddDrop: function _onAddDrop(event) {
	    event.preventDefault();
	    this.setState({ dropActive: true, activeSuggestionIndex: -1 });
	  },

	  _onRemoveDrop: function _onRemoveDrop() {
	    this.setState({ dropActive: false });
	  },

	  _onFocusControl: function _onFocusControl() {
	    this.setState({
	      controlFocused: true,
	      dropActive: true,
	      activeSuggestionIndex: -1
	    });
	  },

	  _onBlurControl: function _onBlurControl() {
	    this.setState({ controlFocused: false });
	  },

	  _onFocusInput: function _onFocusInput() {
	    this.refs.input.getDOMNode().select();
	    this.setState({
	      dropActive: !this.state.inline || this.props.suggestions,
	      activeSuggestionIndex: -1
	    });
	  },

	  _onBlurInput: function _onBlurInput() {
	    //this.setState({drop: false});
	  },

	  _onChangeInput: function _onChangeInput(event) {
	    this.setState({ activeSuggestionIndex: -1 });
	    if (this.props.onChange) {
	      this.props.onChange(event.target.value);
	    }
	  },

	  _onNextSuggestion: function _onNextSuggestion() {
	    var index = this.state.activeSuggestionIndex;
	    index = Math.min(index + 1, this.props.suggestions.length - 1);
	    this.setState({ activeSuggestionIndex: index });
	  },

	  _onPreviousSuggestion: function _onPreviousSuggestion() {
	    var index = this.state.activeSuggestionIndex;
	    index = Math.max(index - 1, 0);
	    this.setState({ activeSuggestionIndex: index });
	  },

	  _onEnter: function _onEnter() {
	    if (this.state.activeSuggestionIndex >= 0) {
	      var text = this.props.suggestions[this.state.activeSuggestionIndex];
	      if (this.props.onChange) {
	        this.props.onChange(text);
	      }
	    }
	    this._onRemoveDrop();
	  },

	  _onClickSuggestion: function _onClickSuggestion(item) {
	    if (this.props.onChange) {
	      this.props.onChange(item);
	    }
	    this._onRemoveDrop();
	  },

	  _onSink: function _onSink(event) {
	    event.stopPropagation();
	    event.nativeEvent.stopImmediatePropagation();
	  },

	  _onResponsive: function _onResponsive(small) {
	    if (small) {
	      this.setState({ inline: false });
	    } else {
	      this.setState({ inline: this.props.inline });
	    }
	  },

	  focus: function focus() {
	    var ref = this.refs.input || this.refs.control;
	    if (ref) {
	      ref.getDOMNode().focus();
	    }
	  },

	  _createControl: function _createControl() {
	    var controlClassName = CLASS_ROOT + "__control";
	    return React.createElement(
	      'div',
	      { className: controlClassName },
	      React.createElement(SearchIcon, null)
	    );
	  },

	  _classes: function _classes(prefix) {
	    var classes = [prefix];

	    if (this.state.inline) {
	      classes.push(prefix + "--inline");
	    } else {
	      classes.push(prefix + "--controlled");
	    }

	    return classes;
	  },

	  _renderDrop: function _renderDrop() {
	    var classes = this._classes(CLASS_ROOT + "__drop");
	    if (this.props.dropColorIndex) {
	      classes.push("background-color-index-" + this.props.dropColorIndex);
	    }
	    if (this.props.large) {
	      classes.push(CLASS_ROOT + "__drop--large");
	    }

	    var suggestions = null;
	    if (this.props.suggestions) {
	      suggestions = this.props.suggestions.map(function (item, index) {
	        var classes = [CLASS_ROOT + "__suggestion"];
	        if (index === this.state.activeSuggestionIndex) {
	          classes.push(CLASS_ROOT + "__suggestion--active");
	        }
	        return React.createElement(
	          'div',
	          { key: item,
	            className: classes.join(' '),
	            onClick: this._onClickSuggestion.bind(this, item) },
	          item
	        );
	      }, this);
	    }

	    var contents = React.createElement(
	      'div',
	      { className: CLASS_ROOT + "__drop-contents", onClick: this._onSink },
	      React.createElement('input', { id: 'search-drop-input', type: 'search',
	        defaultValue: this.props.defaultValue,
	        value: this.props.value,
	        className: CLASS_ROOT + "__input",
	        onChange: this._onChangeInput }),
	      React.createElement(
	        'div',
	        { className: CLASS_ROOT + "__suggestions" },
	        suggestions
	      )
	    );

	    if (!this.state.inline) {
	      var control = this._createControl();
	      var rightAlign = !this.props.dropAlign.left;
	      var first = rightAlign ? contents : control;
	      var second = rightAlign ? control : contents;

	      contents = React.createElement(
	        'div',
	        { className: CLASS_ROOT + "__drop-header" },
	        first,
	        second
	      );
	    }

	    return React.createElement(
	      'div',
	      { id: 'search-drop', className: classes.join(' ') },
	      contents
	    );
	  },

	  render: function render() {

	    var classes = this._classes(CLASS_ROOT);
	    if (this.props.large) {
	      classes.push(CLASS_ROOT + "--large");
	    }
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }

	    if (this.state.inline) {

	      var readOnly = this.props.suggestions ? true : false;

	      return React.createElement(
	        'div',
	        { className: classes.join(' ') },
	        React.createElement('input', { ref: 'input', type: 'search',
	          placeholder: this.getGrommetIntlMessage(this.props.placeHolder),
	          defaultValue: this.props.defaultValue,
	          value: this.props.value,
	          className: CLASS_ROOT + "__input",
	          readOnly: readOnly,
	          onFocus: this._onFocusInput,
	          onBlur: this._onBlurInput,
	          onChange: this._onChangeInput })
	      );
	    } else {

	      var controlContents = this._createControl();

	      return React.createElement(
	        'div',
	        { ref: 'control', className: classes.join(' '),
	          tabIndex: '0',
	          onClick: this._onAddDrop,
	          onFocus: this._onFocusControl,
	          onBlur: this._onBlurControl },
	        controlContents
	      );
	    }
	  }

	});

	module.exports = Search;

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);

	var Logo = React.createClass({
	  displayName: 'Logo',

	  render: function render() {
	    var className = [];
	    if (this.props.className) {
	      className += ' ' + this.props.className;
	    }
	    return React.createElement(
	      'svg',
	      { className: className, height: '27', viewBox: '0 0 30 27', version: '1.1' },
	      React.createElement(
	        'g',
	        { strokeWidth: '4', fill: 'none', fillRule: 'evenodd' },
	        React.createElement('rect', { stroke: '#4A4A4A', x: '9', y: '10', width: '19', height: '15' }),
	        React.createElement(
	          'g',
	          { className: 'doc-brand' },
	          React.createElement('rect', { x: '2', y: '2', width: '19', height: '15' })
	        )
	      )
	    );
	  }

	});

	module.exports = Logo;

/***/ },
/* 126 */
/***/ function(module, exports) {

	module.exports = require("react-gravatar");

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	"use strict";

	var React = __webpack_require__(1);
	var Router = __webpack_require__(2);
	var Link = Router.Link;

	module.exports = React.createClass({
	  displayName: "exports",

	  render: function render() {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "header",
	        null,
	        React.createElement(
	          "h1",
	          null,
	          "Showcase"
	        )
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "p",
	          null,
	          "The showcase offers a set of notional application designs that embody the elements of this style guide and implementation platform.  Each example in the showcase demonstrates a unique approach to meeting a user need.  You'll notice that while the examples in the showcase express unique value and differentiated capabilities, they are grounded in common interaction patterns and are aligned with a common brand."
	        )
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "a",
	          { className: "reference", id: "hpsw-analytics" },
	          " "
	        ),
	        React.createElement(
	          "h2",
	          null,
	          "Analytics"
	        ),
	        React.createElement("img", { src: "img/hpe-software-showcase2.png", title: "Analytics" })
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "a",
	          { className: "reference", id: "hpsw-big-data" },
	          " "
	        ),
	        React.createElement(
	          "h2",
	          null,
	          "Big Data"
	        ),
	        React.createElement("img", { src: "img/hpe-software-showcase6.png", title: "Big Data" })
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "a",
	          { className: "reference", id: "hpsw-cloud-analytics" },
	          " "
	        ),
	        React.createElement(
	          "h2",
	          null,
	          "Cloud Analytics"
	        ),
	        React.createElement("img", { src: "img/hpe-software-showcase7.png", title: "Cloud Analytics" })
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "a",
	          { className: "reference", id: "hpsw-business-analytics" },
	          " "
	        ),
	        React.createElement(
	          "h2",
	          null,
	          "IT Business Analytics"
	        ),
	        React.createElement("img", { src: "img/hpe-software-showcase1.png", title: "IT Business Analytics" })
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "a",
	          { className: "reference", id: "hpsw-login" },
	          " "
	        ),
	        React.createElement(
	          "h2",
	          null,
	          "Login"
	        ),
	        React.createElement("img", { src: "img/hpsw-login.png", title: "Login" })
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "a",
	          { className: "reference", id: "oneview-dashboard" },
	          " "
	        ),
	        React.createElement(
	          "h2",
	          null,
	          "OneView Dashboard"
	        ),
	        React.createElement("img", { src: "img/hpe_oneview_dashboard.svg", title: "OneView Dashboard" })
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "a",
	          { className: "reference", id: "oneview-detail-page" },
	          " "
	        ),
	        React.createElement(
	          "h2",
	          null,
	          "OneView Detail Page"
	        ),
	        React.createElement("img", { src: "img/hpe_oneview_details.svg", title: "OneView Detail Page" })
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "a",
	          { className: "reference", id: "hpsw-ops-dashboard" },
	          " "
	        ),
	        React.createElement(
	          "h2",
	          null,
	          "Ops Dashboard"
	        ),
	        React.createElement("img", { src: "img/hpe-software-showcase3.png", title: "Ops Dashboard" })
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "a",
	          { className: "reference", id: "propel-dashboard" },
	          " "
	        ),
	        React.createElement(
	          "h2",
	          null,
	          "Propel Dashboard"
	        ),
	        React.createElement("img", { src: "img/propel-shop-dashboard.png", title: "Propel Dashboard" })
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "a",
	          { className: "reference", id: "propel-prod-detail" },
	          " "
	        ),
	        React.createElement(
	          "h2",
	          null,
	          "Propel Product Detail"
	        ),
	        React.createElement("img", { src: "img/propel-shop-prod-detail.png", title: "Propel Product Detail" })
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "a",
	          { className: "reference", id: "hpsw-service-anywhere" },
	          " "
	        ),
	        React.createElement(
	          "h2",
	          null,
	          "Service Anywhere"
	        ),
	        React.createElement("img", { src: "img/hpe-software-showcase5.png", title: "Service Anywhere" })
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "a",
	          { className: "reference", id: "hpsw-web-inspect" },
	          " "
	        ),
	        React.createElement(
	          "h2",
	          null,
	          "Web Inspect"
	        ),
	        React.createElement("img", { src: "img/hpe-software-showcase4.png", title: "Web Inspect" })
	      )
	    );
	  }
	});

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	"use strict";

	var React = __webpack_require__(1);
	var Router = __webpack_require__(2);
	var Link = Router.Link;

	module.exports = React.createClass({
	  displayName: "exports",

	  render: function render() {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "header",
	        null,
	        React.createElement(
	          "h1",
	          null,
	          "Login"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Typically the first thing a user does on a login screen is enter their username. So it makes sense to place focus on the username field so that it is ready and active. There should be no cognitive effort required to use our login screen. Upon entering the page, focus is placed in the username field. The user can then mouse, tab on the keyboard, or tap to the password field."
	        ),
	        React.createElement("img", { src: "img/Login-form.svg", alt: "login form" })
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "h2",
	          null,
	          "Mobile"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "The mobile login page has the same look and feel, but is sized accordingly. The dialog portion of the screen occupies the full width of the screen. The footer information becomes stacked as necessary. There is no scrolling on the login page."
	        ),
	        React.createElement(
	          "p",
	          null,
	          "As shown in the examples, the login page on mobile should respond to the screen size and orientation appropriately. It is important to put the focus in the username field and the keyboard should be open. In addition, select the appropriate type of keyboard based on the format of your username field. If the format is an email address, open the email keyboard."
	        ),
	        React.createElement("img", { src: "img/Login-mobile.svg", alt: "login mobile" })
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "h2",
	          null,
	          "Expected elements"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "The company logo should be present on the login pages. Alternatively, if a product has an approved product logo, then it can be used instead of the company logo."
	        ),
	        React.createElement(
	          "p",
	          null,
	          "The product name or application name is also prominent on the login page, immediately below the logo. Next are the username and password fields. Finally, the Login button should big and visible. It should be the default button for the form so the user can press Enter on the keyboard to login."
	        ),
	        React.createElement("img", { src: "img/Login-elements.svg", alt: "login elements" })
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "h2",
	          null,
	          "Optional elements"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "The following fields are optional and can be used based on the needs of the application."
	        ),
	        React.createElement(
	          "h3",
	          null,
	          "Forgot username"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Allows a user to request assistance locating their username."
	        ),
	        React.createElement(
	          "h3",
	          null,
	          "Forgot password"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Allows the user to request assistance resetting their password."
	        ),
	        React.createElement(
	          "h3",
	          null,
	          "Remember me"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Allows a user to indicate they want the application to remember their login information to the extent allowed by the security requirements of the application."
	        ),
	        React.createElement(
	          "h3",
	          null,
	          "Sign up"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "For applications which allow users to sign up for access, this link should take them to a page that either creates an account or submits a request for an account to be created."
	        ),
	        React.createElement(
	          "h3",
	          null,
	          "Footer"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Contains the copyright, product version, terms of use, and privacy references."
	        ),
	        React.createElement(
	          "h3",
	          null,
	          "Background image"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Most applications should include a background image for visual appeal. However, if there are constraints, it is acceptable to use a solid light gray background."
	        )
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "h2",
	          null,
	          "Handling the Unexpected"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Should the user tap on the Login button before entering their username or password, red error messages should be displayed indicating one or both of the fields requires input."
	        ),
	        React.createElement(
	          "p",
	          null,
	          "In the case that the authentication sequence fails, for security reasons the error message cannot indicate which field was incorrectly entered. The message must simply state that the username or password were not recognized."
	        )
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "h2",
	          null,
	          "Variations"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Given the diverse nature of applications, there are a few variations available for the login page. Below, the example shows the login page without a background image. The background image is gratuitous and is not required. Applications that have limited space resources (such as embedded devices) may adopt such a style to keep the resource demands to a minimum."
	        ),
	        React.createElement("img", { src: "img/Login-no-background.svg", alt: "login no background" }),
	        React.createElement("img", { src: "img/Login-background.svg", alt: "login background" })
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "h2",
	          null,
	          "Accessibility"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "The user must be able to navigate the login page without the use of a pointing device on a desktop. If there is an error on input, there shall be red text that provides error feedback."
	        )
	      )
	    );
	  }
	});

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	"use strict";

	var React = __webpack_require__(1);
	var Router = __webpack_require__(2);
	var Link = Router.Link;

	module.exports = React.createClass({
	  displayName: "exports",

	  render: function render() {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "header",
	        null,
	        React.createElement(
	          "h1",
	          null,
	          "Resources"
	        )
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "p",
	          null,
	          "Here you will find the downloads for creating designs based on this application style guide.  Each of these provide the basic elements of the style including checkboxes, buttons, text fields, and status icons."
	        ),
	        React.createElement(
	          "p",
	          null,
	          "The following sections are divided by theme (Grommet, Hewlett-Packard Enterprise, and HP Inc). Each theme has all the resources for each design tool: ",
	          React.createElement(
	            "a",
	            { href: "http://www.adobe.com/products/illustrator.html" },
	            "Adobe Illustrator"
	          ),
	          ", ",
	          React.createElement(
	            "a",
	            { href: "http://bohemiancoding.com/sketch/" },
	            "Sketch"
	          ),
	          ", ",
	          React.createElement(
	            "a",
	            { href: "http://www.axure.com" },
	            "Axure"
	          ),
	          ", and ",
	          React.createElement(
	            "a",
	            { href: "http://www.balsamiq.com" },
	            "Balsamiq"
	          ),
	          "."
	        )
	      ),
	      React.createElement(
	        "section",
	        { id: "hpe" },
	        React.createElement(
	          "h2",
	          null,
	          "Hewlett Packard Enterprise"
	        ),
	        React.createElement(
	          "h4",
	          null,
	          "Adobe Illustrator"
	        ),
	        React.createElement(
	          "ul",
	          null,
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "a",
	              { id: "hpe-ai-general", href: "/assets/design/hpe/grommet-hpe-general.ai", target: "_blank" },
	              "General Sticker Sheet"
	            ),
	            " (",
	            React.createElement(
	              "a",
	              { id: "hpe-ai-general-pdf", href: "/assets/design/hpe/grommet-hpe-general.pdf", target: "_blank" },
	              "pdf"
	            ),
	            ")"
	          ),
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "a",
	              { id: "hpe-ai-classic", href: "/assets/design/hpe/grommet-hpe-classic.ai", target: "_blank" },
	              "Classic Sticker Sheet"
	            ),
	            " (",
	            React.createElement(
	              "a",
	              { id: "hpe-ai-classic-pdf", href: "/assets/design/hpe/grommet-hpe-classic.pdf", target: "_blank" },
	              "pdf"
	            ),
	            ")"
	          ),
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "a",
	              { id: "hpe-ai-app-templates", href: "/assets/design/hpe/grommet-hpe-app-templates.ai", target: "_blank" },
	              "Application Templates"
	            ),
	            " (",
	            React.createElement(
	              "a",
	              { id: "hpe-ai-app-templates-pdf", href: "/assets/design/hpe/grommet-hpe-app-templates.pdf", target: "_blank" },
	              "pdf"
	            ),
	            ")"
	          ),
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "a",
	              { id: "hpe-ai-icons", href: "/assets/design/hpe/grommet-hpe-icons.ai", target: "_blank" },
	              "Icon Sticker Sheet"
	            ),
	            " (",
	            React.createElement(
	              "a",
	              { id: "hpe-ai-icons-pdf", href: "/assets/design/hpe/grommet-hpe-icons.pdf", target: "_blank" },
	              "pdf"
	            ),
	            ")"
	          ),
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "a",
	              { id: "hpe-ai-master", href: "/assets/design/hpe/grommet-hpe-master.ai", target: "_blank" },
	              "Master Sticker Sheet"
	            ),
	            " - all of the above (",
	            React.createElement(
	              "a",
	              { id: "hpe-ai-master-pdf", href: "/assets/design/hpe/grommet-hpe-master.pdf", target: "_blank" },
	              "pdf"
	            ),
	            ")"
	          )
	        ),
	        React.createElement(
	          "h4",
	          null,
	          "Sketch"
	        ),
	        React.createElement(
	          "ul",
	          null,
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "a",
	              { id: "hpe-sk-general", href: "/assets/design/hpe/grommet-hpe-general.sketch", target: "_blank" },
	              "Sketch Sticker Sheet"
	            )
	          )
	        ),
	        React.createElement(
	          "h4",
	          null,
	          "Axure"
	        ),
	        React.createElement(
	          "ul",
	          null,
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "a",
	              { id: "hpe-ax-general", href: "/assets/design/hpe/grommet-hpe-axure.rplib", target: "_blank" },
	              "Axure Stencils"
	            )
	          )
	        ),
	        React.createElement(
	          "h4",
	          null,
	          "Balsamiq"
	        ),
	        React.createElement(
	          "ul",
	          null,
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "a",
	              { id: "hpe-bq-general", href: "/assets/design/hpe/grommet-hpe-balsamiq.bmpr", target: "_blank" },
	              "Balsamiq Assets"
	            )
	          )
	        )
	      ),
	      React.createElement(
	        "section",
	        { id: "hpi" },
	        React.createElement(
	          "h2",
	          null,
	          "HP Inc."
	        ),
	        React.createElement(
	          "h4",
	          null,
	          "Adobe Illustrator"
	        ),
	        React.createElement(
	          "ul",
	          null,
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "a",
	              { id: "hpi-ai-general", href: "/assets/design/hpi/grommet-hpi-general.ai", target: "_blank" },
	              "General Sticker Sheet"
	            ),
	            " (",
	            React.createElement(
	              "a",
	              { id: "hpi-ai-general-pdf", href: "/assets/design/hpi/grommet-hpi-general.pdf", target: "_blank" },
	              "pdf"
	            ),
	            ")"
	          )
	        )
	      ),
	      React.createElement(
	        "section",
	        { id: "grommet" },
	        React.createElement(
	          "h2",
	          null,
	          "Grommet"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Coming soon..."
	        )
	      )
	    );
	  }
	});

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Router = __webpack_require__(2);
	var Route = Router.Route;
	var RouteHandler = Router.RouteHandler;
	var Link = Router.Link;

	var Article = __webpack_require__(65);
	var DocsHeader = __webpack_require__(68);
	var Section = __webpack_require__(73);
	var DocsSplit = __webpack_require__(85);
	var DocsMenu = __webpack_require__(89);
	var Menu = __webpack_require__(17);
	var Button = __webpack_require__(81);

	var HelloWorld = __webpack_require__(131);
	var Tutorial = __webpack_require__(132);
	var ModularGrommet = __webpack_require__(133);
	var GetStarted = __webpack_require__(134);
	var Architecture = __webpack_require__(135);
	var Integration = __webpack_require__(136);
	var Accessibility = __webpack_require__(137);

	var ActionsDoc = __webpack_require__(146);
	var AnchorDoc = __webpack_require__(147);
	var AppDoc = __webpack_require__(149);
	var ArticleDoc = __webpack_require__(150);
	var BoxDoc = __webpack_require__(151);
	var ButtonDoc = __webpack_require__(152);
	var CalendarDoc = __webpack_require__(153);
	var CarouselDoc = __webpack_require__(156);
	var ChartDoc = __webpack_require__(158);
	var CheckBoxDoc = __webpack_require__(161);
	var DashboardDoc = __webpack_require__(162);
	var DistributionDoc = __webpack_require__(163);
	var DocumentDoc = __webpack_require__(165);
	var FooterDoc = __webpack_require__(167);
	var FormDoc = __webpack_require__(168);
	var FormFieldDoc = __webpack_require__(176);
	var HeaderDoc = __webpack_require__(177);
	var LayerDoc = __webpack_require__(178);
	var ListDoc = __webpack_require__(179);
	var LoginFormDoc = __webpack_require__(182);
	var MapDoc = __webpack_require__(183);
	var MenuDoc = __webpack_require__(185);
	var MeterDoc = __webpack_require__(186);
	var NavigationDoc = __webpack_require__(187);
	var RadioButtonDoc = __webpack_require__(188);
	var RestDoc = __webpack_require__(189);
	var RestWatchDoc = __webpack_require__(190);
	var SearchDoc = __webpack_require__(191);
	var SearchInputDoc = __webpack_require__(192);
	var SectionDoc = __webpack_require__(193);
	var SidebarDoc = __webpack_require__(194);
	var SplitDoc = __webpack_require__(195);
	var StatusDoc = __webpack_require__(196);
	var TableDoc = __webpack_require__(197);
	var TilesDoc = __webpack_require__(198);
	var TitleDoc = __webpack_require__(199);
	var TopologyDoc = __webpack_require__(200);

	//hjjs configuration
	var hljs = __webpack_require__(202);
	hljs.registerLanguage('bash', __webpack_require__(203));
	hljs.registerLanguage('xml', __webpack_require__(204));
	hljs.registerLanguage('javascript', __webpack_require__(205));
	hljs.registerLanguage('scss', __webpack_require__(206));

	var CONTENTS = [{ label: 'Guides',
	  contents: [{ route: 'develop_helloworld', label: 'Hello World', component: HelloWorld }, { route: 'develop_getstarted', label: 'Get Started', component: GetStarted }, { route: 'develop_tutorial', label: 'Tutorial', component: Tutorial }, { route: 'develop_modulargrommet', label: 'Modular Grommet', component: ModularGrommet }]
	}, { label: 'Patterns',
	  contents: [{ route: 'develop_dashboard', label: 'Dashboard', component: DashboardDoc }, { route: 'develop_navigation', label: 'Navigation', component: NavigationDoc }, { route: 'develop_actions', label: 'Actions', component: ActionsDoc }]
	}, { label: 'Components',
	  contents: [{ route: 'develop_anchor', label: 'Anchor', component: AnchorDoc }, { route: 'develop_app', label: 'App', component: AppDoc }, { route: 'develop_article', label: 'Article', component: ArticleDoc }, { route: 'develop_box', label: 'Box', component: BoxDoc }, { route: 'develop_button', label: 'Button', component: ButtonDoc }, { route: 'develop_calendar', label: 'Calendar', component: CalendarDoc }, { route: 'develop_carousel', label: 'Carousel', component: CarouselDoc }, { route: 'develop_chart', label: 'Chart', component: ChartDoc }, { route: 'develop_check-box', label: 'CheckBox', component: CheckBoxDoc }, { route: 'develop_distribution', label: 'Distribution', component: DistributionDoc }, { route: 'develop_document', label: 'Document', component: DocumentDoc }, { route: 'develop_footer', label: 'Footer', component: FooterDoc }, { route: 'develop_form', label: 'Form', component: FormDoc }, { route: 'develop_form-field', label: 'FormField', component: FormFieldDoc }, { route: 'develop_header', label: 'Header', component: HeaderDoc }, { route: 'develop_layer', label: 'Layer', component: LayerDoc }, { route: 'develop_list', label: 'List', component: ListDoc }, { route: 'develop_login-form', label: 'LoginForm', component: LoginFormDoc }, { route: 'develop_map', label: 'Map', component: MapDoc }, { route: 'develop_menu', label: 'Menu', component: MenuDoc }, { route: 'develop_meter', label: 'Meter', component: MeterDoc }, { route: 'develop_radio-button', label: 'RadioButton', component: RadioButtonDoc }, { route: 'develop_search', label: 'Search', component: SearchDoc }, { route: 'develop_search-input', label: 'SearchInput', component: SearchInputDoc }, { route: 'develop_section', label: 'Section', component: SectionDoc }, { route: 'develop_sidebar', label: 'Sidebar', component: SidebarDoc }, { route: 'develop_split', label: 'Split', component: SplitDoc }, { route: 'develop_status', label: 'Status', component: StatusDoc }, { route: 'develop_table', label: 'Table', component: TableDoc }, { route: 'develop_tiles', label: 'Tiles', component: TilesDoc }, { route: 'develop_title', label: 'Title', component: TitleDoc }, { route: 'develop_topology', label: 'Topology', component: TopologyDoc }]
	}, { label: 'Utils',
	  contents: [{ route: 'develop_rest', label: 'Rest', component: RestDoc }, { route: 'develop_rest-watch', label: 'RestWatch', component: RestWatchDoc }]
	}, { label: 'Reference',
	  contents: [{ route: 'develop_architecture', label: 'Architecture', component: Architecture }, { route: 'develop_integration', label: 'Integration', component: Integration }, { route: 'develop_accessibility', label: 'Accessibility', component: Accessibility }]
	}];

	var Develop = React.createClass({
	  displayName: 'Develop',

	  _onClick: function _onClick() {
	    // no-op
	  },

	  render: function render() {
	    return React.createElement(
	      Article,
	      null,
	      React.createElement(DocsHeader, null),
	      React.createElement(
	        Section,
	        { primary: true, appCentered: true, colorIndex: 'neutral-2' },
	        React.createElement(
	          'h1',
	          null,
	          'Develop'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Grommet was created to give developers and designers alike access to tools that otherwise are out of reach of most product teams. Grommet’s goal is to assist in creating experiences that work accross the many different interaction methods and screen sizes.'
	        ),
	        React.createElement(
	          Menu,
	          { direction: 'row' },
	          React.createElement(
	            Link,
	            { to: 'develop_helloworld' },
	            React.createElement(Button, { label: 'Hello Grommet!', onClick: this._onClick, primary: true })
	          ),
	          React.createElement(
	            Link,
	            { to: 'develop_getstarted' },
	            React.createElement(Button, { label: 'Get Started', onClick: this._onClick })
	          ),
	          React.createElement(
	            Link,
	            { to: 'develop_tutorial' },
	            React.createElement(Button, { label: 'Tutorial', onClick: this._onClick })
	          ),
	          React.createElement(
	            Link,
	            { to: 'develop_modulargrommet' },
	            React.createElement(Button, { label: 'Modular Grommet', onClick: this._onClick })
	          )
	        )
	      ),
	      React.createElement(
	        Section,
	        { appCentered: true },
	        React.createElement(
	          'h2',
	          null,
	          'Contents'
	        ),
	        React.createElement(DocsMenu, { direction: 'row', contents: CONTENTS })
	      )
	    );
	  }
	});

	var DevelopDocument = React.createClass({
	  displayName: 'DevelopDocument',

	  componentDidMount: function componentDidMount() {
	    setTimeout(this._highlightCode, 1);
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    setTimeout(this._highlightCode, 1);
	  },

	  _highlightCode: function _highlightCode() {
	    var domNode = this.getDOMNode();
	    var nodes = domNode.querySelectorAll('pre code');
	    for (var i = 0; i < nodes.length; i++) {
	      hljs.highlightBlock(nodes[i]);
	    }
	  },

	  render: function render() {
	    var title = React.createElement(
	      Link,
	      { to: 'develop' },
	      'Develop'
	    );
	    return React.createElement(
	      DocsSplit,
	      { title: title, contents: CONTENTS, onChange: this._highlightCode },
	      React.createElement(RouteHandler, null)
	    );
	  }
	});

	function createContentRoutes(contents) {
	  var result = [];
	  contents.forEach(function (content) {
	    result.push(React.createElement(Route, { key: content.label, name: content.route,
	      path: content.label.toLowerCase().replace(/ /g, "-"),
	      handler: content.component }));
	    if (content.hasOwnProperty('contents')) {
	      result = result.concat(createContentRoutes(content.contents));
	    }
	  });
	  return result;
	}

	Develop.routes = function () {
	  var routes = createContentRoutes(CONTENTS);
	  return [React.createElement(Route, { key: 'top', name: 'develop', handler: Develop }), React.createElement(
	    Route,
	    { key: 'docs', path: 'develop', handler: DevelopDocument },
	    routes
	  )];
	};

	module.exports = Develop;

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	"use strict";

	var React = __webpack_require__(1);
	var Router = __webpack_require__(2);
	var Link = Router.Link;

	module.exports = React.createClass({
	  displayName: "exports",

	  render: function render() {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "header",
	        null,
	        React.createElement(
	          "h1",
	          null,
	          "Hello World"
	        )
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "p",
	          null,
	          "The easiest way to learn a framework is by writing a simple application.  In this section you will access the Grommet source from our server and you will be able to experiment with Grommet using just an HTML file and your browser.  You'll use hosted JavaScript files in this exercise which is not meant to be used in production."
	        ),
	        React.createElement(
	          "p",
	          null,
	          "To get started, create a new HTML file on your computer and copy and paste the following code:"
	        ),
	        React.createElement(
	          "pre",
	          null,
	          React.createElement(
	            "div",
	            { className: "docs__code-heading" },
	            React.createElement(
	              "a",
	              { href: "https://gist.githubusercontent.com/alansouzati/b5f370835a80b541ebe2/raw/ee16b4035118a6d6e7b1804c9c8ba1b4b761309b/grommet_hello_world.html", target: "_blank" },
	              "raw"
	            )
	          ),
	          React.createElement(
	            "code",
	            { className: "html" },
	            "<!DOCTYPE html>",
	            React.createElement("br", null),
	            "<html>",
	            React.createElement("br", null),
	            "<head>",
	            React.createElement("br", null),
	            "  <meta charset=\"UTF-8\">",
	            React.createElement("br", null),
	            "  <title>Hello World!</title>",
	            React.createElement("br", null),
	            "  <link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:400italic,400,700' rel='stylesheet' type='text/css'>",
	            React.createElement("br", null),
	            "  <link href='http://grommet.io/assets/latest/css/grommet.min.css' rel='stylesheet' type='text/css'>",
	            React.createElement("br", null),
	            "  <script src=\"https://cdnjs.cloudflare.com/ajax/libs/react/0.13.1/react.js\"></script>",
	            React.createElement("br", null),
	            "  <script src=\"https://cdnjs.cloudflare.com/ajax/libs/react/0.13.1/JSXTransformer.js\"></script>",
	            React.createElement("br", null),
	            "  <script src=\"http://grommet.io/assets/latest/grommet.min.js\"></script>",
	            React.createElement("br", null),
	            "</head>",
	            React.createElement("br", null),
	            "<body>",
	            React.createElement("br", null),
	            "  <div id=\"content\"></div>",
	            React.createElement("br", null),
	            "  <script type=\"text/jsx\">",
	            React.createElement("br", null),
	            React.createElement("br", null),
	            "    var HelloWorldDashboard = React.createClass(",
	            "{",
	            React.createElement("br", null),
	            "      render: function () ",
	            "{",
	            React.createElement("br", null),
	            "        return (",
	            React.createElement("br", null),
	            "          <Grommet.Tiles>",
	            React.createElement("br", null),
	            "            <Grommet.Tile align=\"start\">",
	            React.createElement("br", null),
	            "              <p>Hello from a Grommet page!</p>",
	            React.createElement("br", null),
	            "              <p>Now, come back to the <a href=\"http://grommet.io/docs/documentation#understanding-grommet\">Hello World</a> guide to continue your Grommet exploration.</p>",
	            React.createElement("br", null),
	            "            </Grommet.Tile>",
	            React.createElement("br", null),
	            "          </Grommet.Tiles>",
	            React.createElement("br", null),
	            "        );",
	            React.createElement("br", null),
	            "      ",
	            "}",
	            React.createElement("br", null),
	            "    ",
	            "}",
	            ");",
	            React.createElement("br", null),
	            React.createElement("br", null),
	            "    var App = React.createClass(",
	            "{",
	            React.createElement("br", null),
	            "      render: function() ",
	            "{",
	            React.createElement("br", null),
	            "        return (",
	            React.createElement("br", null),
	            "          <Grommet.App>",
	            React.createElement("br", null),
	            "            <Grommet.Header direction=\"row\" justify=\"between\" large=",
	            "{",
	            "true",
	            "}",
	            " pad=",
	            "{{",
	            "horizontal: 'medium'",
	            "}}",
	            ">",
	            React.createElement("br", null),
	            "              <Grommet.Title>Hello World</Grommet.Title>",
	            React.createElement("br", null),
	            "            </Grommet.Header>",
	            React.createElement("br", null),
	            "            <Grommet.Section pad=",
	            "{{",
	            "horizontal: 'medium'",
	            "}}",
	            ">",
	            React.createElement("br", null),
	            "              <HelloWorldDashboard />",
	            React.createElement("br", null),
	            "            </Grommet.Section>",
	            React.createElement("br", null),
	            "          </Grommet.App>",
	            React.createElement("br", null),
	            "        );",
	            React.createElement("br", null),
	            "      ",
	            "}",
	            React.createElement("br", null),
	            "    ",
	            "}",
	            ");",
	            React.createElement("br", null),
	            React.createElement("br", null),
	            "    var element = document.getElementById('content');",
	            React.createElement("br", null),
	            "    React.render(React.createElement(App), element);",
	            React.createElement("br", null),
	            "  </script>",
	            React.createElement("br", null),
	            "</body>",
	            React.createElement("br", null),
	            "</html>"
	          )
	        ),
	        React.createElement(
	          "p",
	          null,
	          "If you open this HTML in your browser you should see the following:",
	          React.createElement("img", { src: "img/sample-helloworld.png", title: "Sample of Hello World dashboard" })
	        )
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "a",
	          { className: "reference", id: "understanding-grommet" },
	          " "
	        ),
	        React.createElement(
	          "h2",
	          null,
	          "Understanding Grommet"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "In the example above you used 5 Grommet components: ",
	          React.createElement("link", { to: "develop_app" }),
	          "App, ",
	          React.createElement("link", { to: "develop_header" }),
	          "Header, ",
	          React.createElement("link", { to: "develop_title" }),
	          "Title, ",
	          React.createElement("link", { to: "develop_section" }),
	          "Section, and ",
	          React.createElement("link", { to: "develop_tiles" }),
	          "Tiles. All of these are implemented using a mobile-first design approach. To test the responsiveness of your sample application, let's replace the existing Tiles by this:"
	        ),
	        React.createElement(
	          "pre",
	          null,
	          React.createElement(
	            "div",
	            { className: "docs__code-heading" },
	            React.createElement(
	              "a",
	              { href: "https://gist.githubusercontent.com/alansouzati/339b4e9b901c064605de/raw/c3fc1c9851b356130891bda866ef6357097e2a53/grommet_hello_world_extension.html", target: "_blank" },
	              "raw"
	            )
	          ),
	          React.createElement(
	            "code",
	            { className: "html" },
	            "<Grommet.Tiles>",
	            React.createElement("br", null),
	            "  <Grommet.Tile>",
	            React.createElement("br", null),
	            "    <Grommet.Header>",
	            React.createElement("br", null),
	            "      <h3>I'm First</h3>",
	            React.createElement("br", null),
	            "    </Grommet.Header>",
	            React.createElement("br", null),
	            "    <p>Do I win a prize?</p>",
	            React.createElement("br", null),
	            "  </Grommet.Tile>",
	            React.createElement("br", null),
	            "  <Grommet.Tile>",
	            React.createElement("br", null),
	            "    <Grommet.Header>",
	            React.createElement("br", null),
	            "      <h3>I'm Second</h3>",
	            React.createElement("br", null),
	            "    </Grommet.Header>",
	            React.createElement("br", null),
	            "    <p>So close.</p>",
	            React.createElement("br", null),
	            "  </Grommet.Tile>",
	            React.createElement("br", null),
	            "  <Grommet.Tile>",
	            React.createElement("br", null),
	            "    <Grommet.Header>",
	            React.createElement("br", null),
	            "      <h3>I'm Third</h3>",
	            React.createElement("br", null),
	            "    </Grommet.Header>",
	            React.createElement("br", null),
	            "    <p>I'm just glad to be here.</p>",
	            React.createElement("br", null),
	            "  </Grommet.Tile>",
	            React.createElement("br", null),
	            "</Grommet.Tiles>"
	          )
	        ),
	        React.createElement(
	          "p",
	          null,
	          "The updated application in a mobile browser should look like this:",
	          React.createElement("img", { src: "img/sample-helloworld-responsive.png", title: "Sample of Hello World responsive." })
	        )
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "h2",
	          null,
	          "Next Steps"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Now that you've already played with Grommet, we recommend that you check out the ",
	          React.createElement("link", { to: "develop_getstarted" }),
	          "Get Started page and learn how to install Grommet in your local environment."
	        )
	      )
	    );
	  }
	});

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	"use strict";

	var React = __webpack_require__(1);
	var Router = __webpack_require__(2);
	var Link = Router.Link;

	module.exports = React.createClass({
	  displayName: "exports",

	  render: function render() {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "header",
	        null,
	        React.createElement(
	          "h1",
	          null,
	          "Tutorial"
	        )
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "p",
	          null,
	          "In this exercise you will build a simple but interactive ",
	          React.createElement(
	            "a",
	            { href: "http://todomvc.com", target: "_blank" },
	            "TodoApp"
	          ),
	          " which demonstrates the following features:"
	        ),
	        React.createElement(
	          "ul",
	          null,
	          React.createElement(
	            "li",
	            null,
	            "A dashboard with the list of existing tasks"
	          ),
	          React.createElement(
	            "li",
	            null,
	            "Adding, removing, editing, and completing tasks"
	          ),
	          React.createElement(
	            "li",
	            null,
	            "Managing labels and assigning them to tasks"
	          )
	        ),
	        React.createElement("p", null),
	        React.createElement(
	          "p",
	          null,
	          "For this tutorial you will use the Bower distribution of Grommet. ",
	          React.createElement("link", { to: "develop_getstarted" }),
	          "Get Started page provides instructions on installing Grommet using Bower."
	        ),
	        React.createElement(
	          "p",
	          null,
	          "If you want to skip this step-by-step tutorial, you can download the full version of this exercise from ",
	          React.createElement(
	            "a",
	            { href: "https://github.com/HewlettPackard/grommet/tree/master/examples/todo-app", target: "_blank" },
	            "Github"
	          ),
	          "."
	        )
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "h2",
	          null,
	          "TodoApp Dashboard"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "In this section you will create the main page for the TodoApp: the Dashboard. It includes a summary of the existing tasks in a Donut component and the current list of tasks."
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Create a new HTML file on your computer and copy and paste the following code:"
	        ),
	        React.createElement(
	          "pre",
	          null,
	          React.createElement(
	            "div",
	            { className: "docs__code-heading" },
	            React.createElement(
	              "a",
	              { href: "https://gist.githubusercontent.com/alansouzati/fe5a069b4d0b1a313677/raw/41b55328d7639871ae2b75b68feb853dd366d51d/grommet_tutorial_bower.html", target: "_blank" },
	              "raw"
	            )
	          ),
	          React.createElement(
	            "code",
	            { className: "html" },
	            "<!DOCTYPE html>",
	            React.createElement("br", null),
	            "<html>",
	            React.createElement("br", null),
	            "<head>",
	            React.createElement("br", null),
	            "  <meta charset=\"UTF-8\">",
	            React.createElement("br", null),
	            "  <title>Todo App</title>",
	            React.createElement("br", null),
	            "  <link href=\"http://fonts.googleapis.com/css?family=Source+Sans+Pro:400italic,400,700\" rel=\"stylesheet\" type=\"text/css\">",
	            React.createElement("br", null),
	            "  <link href=\"bower_components/grommet/css/grommet-hpe.min.css\" rel=\"stylesheet\" type=\"text/css\">",
	            React.createElement("br", null),
	            "  <script src=\"bower_components/react/react.js\"></script>",
	            React.createElement("br", null),
	            "  <script src=\"bower_components/react/JSXTransformer.js\"></script>",
	            React.createElement("br", null),
	            "  <script src=\"bower_components/grommet/grommet.min.js\"></script>",
	            React.createElement("br", null),
	            "</head>",
	            React.createElement("br", null),
	            "<body>",
	            React.createElement("br", null),
	            "  <div id=\"content\"></div>",
	            React.createElement("br", null),
	            "  <script type=\"text/jsx\">",
	            React.createElement("br", null),
	            React.createElement("br", null),
	            "   function getLabel(label, count, colorIndex) ",
	            '{',
	            React.createElement("br", null),
	            "    return ",
	            '{',
	            React.createElement("br", null),
	            "      \"label\": label,",
	            React.createElement("br", null),
	            "      \"value\": count,",
	            React.createElement("br", null),
	            "      \"units\": count > 1 ? \"Tasks\" : 'Task',",
	            React.createElement("br", null),
	            "      \"colorIndex\": colorIndex",
	            React.createElement("br", null),
	            "    ",
	            '}',
	            ";",
	            React.createElement("br", null),
	            "   ",
	            '}',
	            React.createElement("br", null),
	            React.createElement("br", null),
	            "   var TodoAppDashboard = React.createClass(",
	            '{',
	            React.createElement("br", null),
	            React.createElement("br", null),
	            "    render: function () ",
	            '{',
	            React.createElement("br", null),
	            "     ",
	            React.createElement("br", null),
	            "     var tasksMap = ",
	            '{',
	            React.createElement("br", null),
	            "      error: 0,",
	            React.createElement("br", null),
	            "      ok: 0,",
	            React.createElement("br", null),
	            "      warning: 0",
	            React.createElement("br", null),
	            "     ",
	            '}',
	            ";",
	            React.createElement("br", null),
	            React.createElement("br", null),
	            "     var items = this.props.tasks.map(function(task) ",
	            '{',
	            React.createElement("br", null),
	            "      ",
	            React.createElement("br", null),
	            "      tasksMap[task.type] += 1;",
	            React.createElement("br", null),
	            React.createElement("br", null),
	            "      return (",
	            React.createElement("br", null),
	            "       <tr>",
	            React.createElement("br", null),
	            "         <td><Grommet.Icons.Status value=",
	            '{',
	            "task.type",
	            '}',
	            " small=",
	            '{',
	            "true",
	            '}',
	            " /></td>",
	            React.createElement("br", null),
	            "        <td>",
	            '{',
	            "task.item",
	            '}',
	            "</td>",
	            React.createElement("br", null),
	            "       </tr>",
	            React.createElement("br", null),
	            "      );",
	            React.createElement("br", null),
	            "     ",
	            '}',
	            ");",
	            React.createElement("br", null),
	            React.createElement("br", null),
	            "      return (",
	            React.createElement("br", null),
	            "        <Grommet.Tiles>",
	            React.createElement("br", null),
	            "         <Grommet.Tile>",
	            React.createElement("br", null),
	            "          <Grommet.Section centered=",
	            '{',
	            "true",
	            '}',
	            ">",
	            React.createElement("br", null),
	            "           <Grommet.Donut series=",
	            '{',
	            "[",
	            React.createElement("br", null),
	            "            getLabel('Fix Now', tasksMap.error, \"error\"),",
	            React.createElement("br", null),
	            "            getLabel('Remember', tasksMap.warning, \"warning\"),",
	            React.createElement("br", null),
	            "            getLabel('Enjoy', tasksMap.ok, \"ok\")",
	            React.createElement("br", null),
	            "           ]",
	            '}',
	            "/>",
	            React.createElement("br", null),
	            "          </Grommet.Section>",
	            React.createElement("br", null),
	            "         </Grommet.Tile>",
	            React.createElement("br", null),
	            "         <Grommet.Tile>",
	            React.createElement("br", null),
	            "          <Grommet.Header><h3>My Tasks:</h3></Grommet.Header>",
	            React.createElement("br", null),
	            "           <Grommet.Table>",
	            React.createElement("br", null),
	            "            <tbody>",
	            React.createElement("br", null),
	            "             ",
	            '{',
	            "items",
	            '}',
	            React.createElement("br", null),
	            "            </tbody>",
	            React.createElement("br", null),
	            "           </Grommet.Table>",
	            React.createElement("br", null),
	            "         </Grommet.Tile>",
	            React.createElement("br", null),
	            "        </Grommet.Tiles>",
	            React.createElement("br", null),
	            "      );",
	            React.createElement("br", null),
	            "    ",
	            '}',
	            React.createElement("br", null),
	            "  ",
	            '}',
	            ");",
	            React.createElement("br", null),
	            React.createElement("br", null),
	            "  var App = React.createClass(",
	            '{',
	            React.createElement("br", null),
	            "   getInitialState: function() ",
	            '{',
	            React.createElement("br", null),
	            "    return ",
	            '{',
	            React.createElement("br", null),
	            "     tasks: [",
	            React.createElement("br", null),
	            "       ",
	            '{',
	            React.createElement("br", null),
	            "        type: 'error',",
	            React.createElement("br", null),
	            "        item: 'The coffee pot needs to be cleaned.'",
	            React.createElement("br", null),
	            "       ",
	            '}',
	            ",",
	            React.createElement("br", null),
	            "       ",
	            '{',
	            React.createElement("br", null),
	            "        type: 'ok',",
	            React.createElement("br", null),
	            "        item: 'It\\'s going to be a sunny day tomorrow.'",
	            React.createElement("br", null),
	            "       ",
	            '}',
	            ",",
	            React.createElement("br", null),
	            "       ",
	            '{',
	            React.createElement("br", null),
	            "        type: 'warning',",
	            React.createElement("br", null),
	            "        item: 'Don\\'t forget your anniversary in two weeks.'",
	            React.createElement("br", null),
	            "       ",
	            '}',
	            ",",
	            React.createElement("br", null),
	            "       ",
	            '{',
	            React.createElement("br", null),
	            "        type: 'warning',",
	            React.createElement("br", null),
	            "        item: 'Pay my late bills.'",
	            React.createElement("br", null),
	            "       ",
	            '}',
	            ",",
	            React.createElement("br", null),
	            "       ",
	            '{',
	            React.createElement("br", null),
	            "        type: 'ok',",
	            React.createElement("br", null),
	            "        item: 'Go to the Sharks game tomorrow.'",
	            React.createElement("br", null),
	            "       ",
	            '}',
	            ",",
	            React.createElement("br", null),
	            "       ",
	            '{',
	            React.createElement("br", null),
	            "        type: 'ok',",
	            React.createElement("br", null),
	            "        item: 'Go to Santa Cruz, it\\'s summer time.'",
	            React.createElement("br", null),
	            "       ",
	            '}',
	            ",",
	            React.createElement("br", null),
	            "      ]",
	            React.createElement("br", null),
	            "    ",
	            '}',
	            ";",
	            React.createElement("br", null),
	            "   ",
	            '}',
	            ",",
	            React.createElement("br", null),
	            "    render: function() ",
	            '{',
	            React.createElement("br", null),
	            "      return (",
	            React.createElement("br", null),
	            "        <Grommet.App centered=",
	            '{',
	            "false",
	            '}',
	            ">",
	            React.createElement("br", null),
	            "          <Grommet.Header primary=",
	            '{',
	            "true",
	            '}',
	            ">",
	            React.createElement("br", null),
	            "            <Grommet.Title>Todo App</Grommet.Title>",
	            React.createElement("br", null),
	            "          </Grommet.Header>",
	            React.createElement("br", null),
	            "          <TodoAppDashboard tasks=",
	            '{',
	            "this.state.tasks",
	            '}',
	            " />",
	            React.createElement("br", null),
	            "        </Grommet.App>",
	            React.createElement("br", null),
	            "      );",
	            React.createElement("br", null),
	            "    ",
	            '}',
	            React.createElement("br", null),
	            "  ",
	            '}',
	            ");",
	            React.createElement("br", null),
	            React.createElement("br", null),
	            "  var element = document.getElementById('content');",
	            React.createElement("br", null),
	            "  React.render(React.createElement(App), element);",
	            React.createElement("br", null),
	            "  </script>",
	            React.createElement("br", null),
	            "</body>",
	            React.createElement("br", null),
	            "</html>"
	          )
	        ),
	        React.createElement(
	          "p",
	          null,
	          "If you open this HTML file in your browser you should see the following:",
	          React.createElement("img", { src: "img/todo-app-dashboard.png", title: "Sample of Hello World dashboard" })
	        ),
	        React.createElement(
	          "p",
	          null,
	          "In the head tag of this markup React, JSXTransformer, and Grommet are loaded. Check out the ",
	          React.createElement("link", { to: "develop_architecture" }),
	          "Architecture page if you're curious to understand better about Grommet technology stack."
	        ),
	        React.createElement(
	          "p",
	          null,
	          "The body tag has two main containers. The ",
	          React.createElement(
	            "i",
	            null,
	            "content"
	          ),
	          " div where React will load the Grommet components, and the script tag with the dashboard code in JSX format that will be further compiled by JSXTransformer."
	        ),
	        React.createElement(
	          "p",
	          null,
	          "The best way to understand this script tag is by reading it from the bottom to the top. The last line of the script renders ",
	          React.createElement(
	            "i",
	            null,
	            "App"
	          ),
	          " component inside the main container. This component has a set of tasks as the initial state where 6 samples tasks are already provided (you'll remove that later in this exercise). The render function of this component loads the Grommet App with a Header (including the Title) and the TodoAppDashboard as the body. The TodoAppDashboard component has the set of tasks as a property and the render function includes two main Tiles. The first Tile is the Donut with the summary of the current tasks, and the second one is the actual list of tasks displayed in a simple table."
	        )
	      )
	    );
	  }
	});

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	"use strict";

	var React = __webpack_require__(1);
	var Router = __webpack_require__(2);
	var Link = Router.Link;

	module.exports = React.createClass({
	  displayName: "exports",

	  render: function render() {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "header",
	        null,
	        React.createElement(
	          "h1",
	          null,
	          "Modular Grommet"
	        )
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "p",
	          null,
	          "This page will provide you with recommendations for creating a modular application using Grommet."
	        ),
	        React.createElement(
	          "p",
	          null,
	          "In this exercise you will use the NPM version of Grommet. The ",
	          React.createElement("link", { to: "develop_getstarted" }),
	          "Get Started page provides instructions on installing Grommet with NPM."
	        )
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "h2",
	          null,
	          "Application Structure"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "As your application grows, you will likely feel the need to divide your code into smaller modules. Dividing your code into modules is a common strategy for large-scale projects as it helps with parallel development and debugging. As a result, we recommend you structure your Grommet application as follows:"
	        ),
	        React.createElement(
	          "pre",
	          null,
	          React.createElement(
	            "code",
	            { className: "bash" },
	            "/sample-app\n  /src\n    /js\n      /actions\n      /constants\n      /components\n      /stores\n      index.js\n    /scss\n    index.html\n  gulpfile.js\n  package.json\n"
	          )
	        ),
	        React.createElement("p", null),
	        React.createElement(
	          "ul",
	          null,
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "b",
	              null,
	              "package.json"
	            ),
	            ": required project descriptor for NPM. Used to describe project information and dependencies."
	          ),
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "b",
	              null,
	              "gulpfile.js"
	            ),
	            ": describes the tasks available for the application that can be executed by Gulp."
	          ),
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "b",
	              null,
	              "src/js/index.js"
	            ),
	            ": main project source file that will connect CommonJS modules containing the application features."
	          ),
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "b",
	              null,
	              "src/js/actions"
	            ),
	            ": possible Flux actions that can be executed in your app."
	          ),
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "b",
	              null,
	              "src/js/constants"
	            ),
	            ": all constants of the application."
	          ),
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "b",
	              null,
	              "src/js/components"
	            ),
	            ": all the ReactJS components used in your application."
	          ),
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "b",
	              null,
	              "src/js/stores"
	            ),
	            ": possible Flux stores that will handle back-end communication."
	          ),
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "b",
	              null,
	              "src/scss"
	            ),
	            ": Sass folder that contains Grommet stylesheets."
	          ),
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "b",
	              null,
	              "src/index.html"
	            ),
	            ": main html file to load the application single-page script."
	          )
	        ),
	        React.createElement("p", null),
	        React.createElement(
	          "p",
	          null,
	          "If you use the ",
	          React.createElement(
	            "code",
	            null,
	            "grommet"
	          ),
	          " command, it will generate your project following the recommended structure.  Grommet also includes a set of Gulp tasks that are intended to enable a highly productive developer experience and creation of production-ready apps."
	        )
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "h2",
	          null,
	          "Predefined Gulp Tasks"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "These Gulp tasks are available for you to run in the root folder of your application."
	        ),
	        React.createElement(
	          "ul",
	          null,
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "b",
	              null,
	              "gulp dev"
	            ),
	            ": starts-up a dev server with ",
	            React.createElement(
	              "a",
	              { href: "https://github.com/webpack/docs/wiki/hot-module-replacement-with-webpack", target: "_blank" },
	              "hot module replacement"
	            ),
	            " enabled."
	          ),
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "b",
	              null,
	              "gulp dist"
	            ),
	            ": generates a minified version of the project and places it under the ",
	            React.createElement(
	              "code",
	              null,
	              "dist"
	            ),
	            " folder. The content will be ready to deploy in an application server of your choice."
	          ),
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "b",
	              null,
	              "gulp jslint"
	            ),
	            ": runs the ",
	            React.createElement(
	              "a",
	              { href: "http://www.jslint.com/", target: "_blank" },
	              "JavaScript linter"
	            ),
	            " for all the files under ",
	            React.createElement(
	              "code",
	              null,
	              "src/js"
	            ),
	            "."
	          ),
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "b",
	              null,
	              "gulp scsslint"
	            ),
	            ": runs the Sass linter for all the files under ",
	            React.createElement(
	              "code",
	              null,
	              "src/scss"
	            ),
	            ".",
	            React.createElement(
	              "ul",
	              null,
	              React.createElement(
	                "li",
	                null,
	                "This task is disabled by default because it requires ",
	                React.createElement(
	                  "a",
	                  { href: "http://rubyinstaller.org/", target: "_blank" },
	                  "Ruby"
	                ),
	                " and ",
	                React.createElement(
	                  "a",
	                  { href: "https://github.com/brigade/scss-lint", target: "_blank" },
	                  "scss-lint"
	                ),
	                " to be installed.  Install these dependencies and then add the ",
	                React.createElement(
	                  "code",
	                  null,
	                  "scsslint: true"
	                ),
	                " option to your gulpfile.js to enable Sass linting."
	              )
	            )
	          ),
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "b",
	              null,
	              "gulp sync"
	            ),
	            ": synchronizes the content of the dist folder with the remote server.",
	            React.createElement(
	              "ul",
	              null,
	              React.createElement(
	                "li",
	                null,
	                "Only executed if ",
	                React.createElement(
	                  "code",
	                  null,
	                  "sync"
	                ),
	                " option is provided in the gulpfile.js. The sync object schema follows:",
	                React.createElement("p", null),
	                React.createElement(
	                  "pre",
	                  null,
	                  React.createElement(
	                    "code",
	                    { className: "json" },
	                    "sync: {\n  hostname: 'fullly.qualified.domain.name',\n  username: 'username',\n  remoteDestination: '/absolute/path/on/remote/host'\n}"
	                  )
	                ),
	                React.createElement("p", null)
	              )
	            )
	          )
	        ),
	        React.createElement("p", null)
	      )
	    );
	  }
	});

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	"use strict";

	var React = __webpack_require__(1);
	var Router = __webpack_require__(2);
	var Link = Router.Link;

	module.exports = React.createClass({
	  displayName: "exports",

	  render: function render() {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "header",
	        null,
	        React.createElement(
	          "h1",
	          null,
	          "Get Started"
	        )
	      ),
	      React.createElement(
	        "section",
	        { id: "introduction" },
	        React.createElement(
	          "p",
	          null,
	          "Welcome to Grommet get started page. Here you will find instructions on how to install Grommet in your local environment."
	        )
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "h2",
	          null,
	          "Get Dependencies"
	        ),
	        React.createElement(
	          "ol",
	          null,
	          React.createElement(
	            "li",
	            null,
	            "Install ",
	            React.createElement(
	              "a",
	              { href: "http://git-scm.com/", target: "_blank" },
	              "Git"
	            ),
	            ". For Windows, you may like ",
	            React.createElement(
	              "a",
	              { href: "http://msysgit.github.io/", target: "_blank" },
	              "Git for Windows"
	            ),
	            "."
	          ),
	          React.createElement(
	            "li",
	            null,
	            "Install ",
	            React.createElement(
	              "a",
	              { href: "https://nodejs.org/", target: "_blank" },
	              "Node.js"
	            ),
	            " ",
	            React.createElement(
	              "i",
	              null,
	              "(at least Node 0.10+ and NPM 1.4.x+ required)"
	            )
	          ),
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "p",
	              null,
	              "Setup your NPM proxy (only required if you're behind a proxy server)."
	            ),
	            React.createElement(
	              "pre",
	              null,
	              React.createElement(
	                "code",
	                { className: "bash" },
	                'npm config set proxy http://\{host\}:\{port\}',
	                React.createElement("br", null),
	                'npm config set https-proxy https://\{host\}:\{port\}'
	              )
	            ),
	            React.createElement(
	              "p",
	              null,
	              "If you find problems on downloading packages through https proxy, try using http protocol in your https-proxy variable, as in:"
	            ),
	            React.createElement(
	              "pre",
	              null,
	              React.createElement(
	                "code",
	                { className: "bash" },
	                'npm config set https-proxy http://\{host\}:\{port\}',
	                React.createElement("br", null)
	              )
	            )
	          )
	        ),
	        React.createElement(
	          "h2",
	          null,
	          "Get Going"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "You can install Grommet using either of the methods below."
	        ),
	        React.createElement(
	          "h4",
	          null,
	          "NPM"
	        ),
	        React.createElement(
	          "ol",
	          null,
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "p",
	              null,
	              "Install Gulp globally (make sure to run as an admin)."
	            ),
	            React.createElement(
	              "pre",
	              null,
	              React.createElement(
	                "code",
	                { className: "bash" },
	                'npm install -g gulp'
	              )
	            )
	          ),
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "p",
	              null,
	              "Install Grommet globally (make sure to run as an admin)."
	            ),
	            React.createElement(
	              "pre",
	              null,
	              React.createElement(
	                "code",
	                { className: "bash" },
	                'npm install -g grommet'
	              )
	            )
	          ),
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "p",
	              null,
	              "Use the Grommet generator to bootstrap your new app"
	            ),
	            React.createElement(
	              "pre",
	              null,
	              React.createElement(
	                "code",
	                { className: "bash" },
	                'grommet init sample-app',
	                React.createElement("br", null),
	                'cd sample-app'
	              )
	            )
	          ),
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "p",
	              null,
	              "Start a development server with hot reload enabled"
	            ),
	            React.createElement(
	              "pre",
	              null,
	              React.createElement(
	                "code",
	                { className: "bash" },
	                'gulp dev'
	              )
	            )
	          ),
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "p",
	              null,
	              "Open http://localhost:9000/webpack-dev-server/"
	            ),
	            React.createElement(
	              "p",
	              null,
	              "At this point you should be able to see the application dashboard running."
	            )
	          ),
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "p",
	              null,
	              "Checkout the ",
	              React.createElement("link", { to: "develop_modulargrommet" }),
	              "Modular Grommet page to understand the application structure better."
	            )
	          )
	        ),
	        React.createElement(
	          "h4",
	          null,
	          "Bower"
	        ),
	        React.createElement(
	          "ol",
	          null,
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "p",
	              null,
	              "Install ",
	              React.createElement(
	                "a",
	                { href: "http://bower.io/", target: "_blank" },
	                "Bower"
	              ),
	              " ",
	              React.createElement(
	                "i",
	                null,
	                "(at least 1.x required)"
	              )
	            ),
	            React.createElement(
	              "pre",
	              null,
	              React.createElement(
	                "code",
	                { className: "bash" },
	                'npm install -g bower'
	              )
	            )
	          ),
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "p",
	              null,
	              "Create environment variable with your proxy settings (only required if you're behind a proxy server)"
	            ),
	            React.createElement(
	              "p",
	              null,
	              React.createElement(
	                "b",
	                null,
	                "Windows"
	              )
	            ),
	            React.createElement(
	              "pre",
	              null,
	              React.createElement(
	                "code",
	                { className: "bash" },
	                'set HTTPS_PROXY=https://\{host\}:\{port\}'
	              )
	            ),
	            React.createElement(
	              "p",
	              null,
	              React.createElement(
	                "b",
	                null,
	                "Linux/OS X"
	              )
	            ),
	            React.createElement(
	              "pre",
	              null,
	              React.createElement(
	                "code",
	                { className: "bash" },
	                'export HTTPS_PROXY=https://\{host\}:\{port\}'
	              )
	            )
	          ),
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "p",
	              null,
	              "Install Grommet"
	            ),
	            React.createElement(
	              "pre",
	              null,
	              React.createElement(
	                "code",
	                { className: "bash" },
	                'bower install grommet'
	              )
	            ),
	            React.createElement(
	              "p",
	              null,
	              "At this point, a ",
	              React.createElement(
	                "i",
	                null,
	                "bower_components"
	              ),
	              " folder will be created which contains Grommet and its dependencies."
	            )
	          ),
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "p",
	              null,
	              "Open sample application in the browser"
	            ),
	            React.createElement(
	              "pre",
	              null,
	              React.createElement(
	                "code",
	                { className: "bash" },
	                "bower_components/grommet/sample-grommet.html"
	              )
	            ),
	            " ",
	            React.createElement(
	              "p",
	              null,
	              "You can now play with Grommet using local Bower."
	            )
	          ),
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "p",
	              null,
	              "Checkout the ",
	              React.createElement("link", { to: "develop_tutorial" }),
	              "Tutorial page to understand this sample app better."
	            )
	          )
	        )
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "h2",
	          null,
	          "Next Steps"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "We recommend that you check out the ",
	          React.createElement("link", { to: "develop_architecture" }),
	          "Architecture page and learn how Grommet works internally."
	        )
	      )
	    );
	  }
	});

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	"use strict";

	var React = __webpack_require__(1);
	var Router = __webpack_require__(2);
	var Link = Router.Link;

	module.exports = React.createClass({
	  displayName: "exports",

	  render: function render() {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "header",
	        null,
	        React.createElement(
	          "h1",
	          null,
	          "Architecture"
	        )
	      ),
	      React.createElement(
	        "section",
	        null,
	        React.createElement(
	          "a",
	          { className: "reference", id: "technology-stack" },
	          " "
	        ),
	        React.createElement(
	          "h2",
	          null,
	          "Technology Stack"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Grommet is based on ",
	          React.createElement(
	            "a",
	            { href: "http://reactjs.com", target: "_blank" },
	            "ReactJS"
	          ),
	          " which provides great features in JavaScript for building user interfaces. You'll also use a JavaScript syntax extension called ",
	          React.createElement(
	            "a",
	            { href: "https://facebook.github.io/react/docs/jsx-in-depth.html", target: "_blank" },
	            "JSX"
	          ),
	          "."
	        ),
	        React.createElement(
	          "p",
	          null,
	          "We expect that you have at least a basic understanding on these technologies to be able to master Grommet, in addition to JavaScript of course. In terms of cascading style sheets (css), Grommet provides everything you need to quickly create applications based on the application ",
	          React.createElement("link", { to: "design" }),
	          "Style Guide. Under the hood, you'll find ",
	          React.createElement(
	            "a",
	            { href: "http://inuitcss.com/", target: "_blank" },
	            "InuitCSS"
	          ),
	          " and ",
	          React.createElement(
	            "a",
	            { href: "http://sass-lang.com/", target: "_blank" },
	            "Sass"
	          ),
	          " to compile the style sheets. But, don't worry, you are not expected to write a lot of CSS when using Grommet.  We've done that for you.  But if you would like to contribute, please do so!"
	        )
	      )
	    );
	  }
	});

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	/*** IMPORTS FROM imports-loader ***/
	"use strict";

	var React = __webpack_require__(1);
	var Router = __webpack_require__(2);
	var Link = Router.Link;

	module.exports = React.createClass({
	  displayName: "exports",

	  render: function render() {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "header",
	        null,
	        React.createElement(
	          "h1",
	          null,
	          "Integration"
	        )
	      ),
	      React.createElement(
	        "section",
	        { id: "integration" },
	        React.createElement(
	          "p",
	          null,
	          "Grommet's modular design enables you to use the parts of Grommet applicable to your application.  There are several ways you can benefit from using Grommet based on the needs of your users and your application.  The options range from referencing the style guide and its basic elements to complete adoption of the platform."
	        ),
	        React.createElement(
	          "h3",
	          null,
	          "Style Guide"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Your team references the ",
	          React.createElement("link", { to: "design" }),
	          "Grommet style guide with an emphasis on brand alignment, primarily around the logo, font, and color palette.  If your application is not in a position to begin adopting a new platform, this option may be the most appropriate option.  You may find the ",
	          React.createElement(
	            "a",
	            { href: "https://github.com/HewlettPackard/grommet/tree/master/src/scss/grommet-core", target: "_blank" },
	            "Grommet CSS"
	          ),
	          " elements a useful reference."
	        ),
	        React.createElement(
	          "h3",
	          null,
	          "Style Sheets"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Your application uses the ",
	          React.createElement(
	            "a",
	            { href: "https://github.com/HewlettPackard/grommet/tree/master/src/scss/grommet-core", target: "_blank" },
	            "Grommet CSS"
	          ),
	          " elements to ensure styling of components is aligned.  Your application's DOM structure will likely need to change to align with the DOM structure expected by the Grommet CSS."
	        ),
	        React.createElement(
	          "h3",
	          null,
	          "Components"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Your application leverages the ",
	          React.createElement("link", { to: "develop_app" }),
	          "Grommet components with the accompanying markup, styling, and images.  This model is appropriate in several situations:"
	        ),
	        React.createElement(
	          "ul",
	          null,
	          React.createElement(
	            "li",
	            null,
	            "Your application is new or is being refactored to use the Grommet components."
	          ),
	          React.createElement(
	            "li",
	            null,
	            "Your application uses AngularJS and you want to use Grommet components for the \"view\" in your MVC architecture."
	          ),
	          React.createElement(
	            "li",
	            null,
	            "Your application is being updated to use Grommet components in replacing portions of the user interface based on legacy technologies such as Adobe Flex or Java Applets."
	          )
	        ),
	        React.createElement(
	          "h3",
	          null,
	          "Application"
	        ),
	        React.createElement(
	          "p",
	          null,
	          "Your application is new or is being rewritten to use the Grommet components and a set of common services for features as search, associations, and dashboards."
	        )
	      )
	    );
	  }
	});

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Article = __webpack_require__(65);
	var Section = __webpack_require__(73);
	var Table = __webpack_require__(138);
	var Status = __webpack_require__(106);

	var Accessibility = React.createClass({
	  displayName: 'Accessibility',

	  _onClick: function _onClick() {
	    // no-op
	  },

	  render: function render() {
	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Accessibility'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Accessibility guidelines.'
	        )
	      ),
	      React.createElement(
	        Section,
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Accessibility features in Grommet'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'This section describes the Grommet guidelines for developing accessible applications.'
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Icons'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'The icon components can be read by screen readers. The default textual description for icons can be overridden by setting the a11yTitle. The default title or a11yTitle attribute use localization if it exist.'
	        ),
	        React.createElement(
	          'h4',
	          null,
	          'Example:'
	        ),
	        React.createElement(
	          Table,
	          null,
	          React.createElement(
	            'caption',
	            null,
	            'Example of Icons with different values'
	          ),
	          React.createElement(
	            'thead',
	            null,
	            React.createElement(
	              'tr',
	              null,
	              React.createElement(
	                'th',
	                null,
	                'Icon'
	              ),
	              React.createElement(
	                'th',
	                null,
	                'Description'
	              )
	            )
	          ),
	          React.createElement(
	            'tbody',
	            null,
	            React.createElement(
	              'tr',
	              null,
	              React.createElement(
	                'td',
	                null,
	                React.createElement(Status, { value: 'error' })
	              ),
	              React.createElement(
	                'td',
	                null,
	                React.createElement(
	                  'pre',
	                  null,
	                  React.createElement(
	                    'code',
	                    { className: 'html' },
	                    "<Status value=\"error\">"
	                  )
	                )
	              )
	            ),
	            React.createElement(
	              'tr',
	              null,
	              React.createElement(
	                'td',
	                null,
	                React.createElement(Status, { value: 'error', a11yTitle: 'critical' })
	              ),
	              React.createElement(
	                'td',
	                null,
	                React.createElement(
	                  'pre',
	                  null,
	                  React.createElement(
	                    'code',
	                    { className: 'html' },
	                    "<Status value=\"error\" a11yTitle=\"critical\">"
	                  )
	                )
	              )
	            )
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Menu'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'The Grommet Menu component also supports screen readers. By default, the Menu component assumes the "menu" role and the focusable children passed to this component receive the "menuitem" role. The user can navigate the Menu by using either the tab or arrow keys.'
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Lang attribute'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'If the lang attribute is not explicitly set in the html element, Grommet will specify the lang attribute according to the user browser’s locale. In addition to the html element, lang attribute can be set on other elements like App.'
	        ),
	        React.createElement(
	          'h4',
	          null,
	          'Example'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<App lang=\"en-US\">\n  ...\n</App>"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Skip Links'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Grommet has skip links that make it easy to skip repetitive content. Grommet skip links have two locations: Skip to Main Content and Skip to Footer. To set the "Skip to Main Content" link in Grommet, an attribute primary="true" needs to be added to the main content element. The "Skip to Footer" link is added by default with the Footer component. '
	        ),
	        React.createElement(
	          'h4',
	          null,
	          'Example:'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<App>\n" + "  <Article>\n" + "    <Header>\n" + "      <h1>Title</h1>\n" + "    </Header>\n" + "    <Section primary={true}>\n" + "      <h2>Heading</h2>\n" + "      <p>Lorem ipsum ...</p>\n" + "    </Section>\n" + "  </Article>\n" + "</App>"
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = Accessibility;

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var isEqual = __webpack_require__(139);
	var SpinningIcon = __webpack_require__(76);
	var InfiniteScroll = __webpack_require__(79);

	var CLASS_ROOT = "table";
	var SELECTED_CLASS = CLASS_ROOT + "__row--selected";

	var Table = React.createClass({
	  displayName: 'Table',

	  propTypes: {
	    selection: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.arrayOf(React.PropTypes.number)]),
	    onMore: React.PropTypes.func,
	    scrollable: React.PropTypes.bool,
	    selectable: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.oneOf(['multiple'])]),
	    onSelect: React.PropTypes.func
	  },

	  mixins: [InfiniteScroll],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      scrollable: false,
	      selectable: false
	    };
	  },

	  getInitialState: function getInitialState() {
	    return { selection: this._normalizeSelection(this.props.selection) };
	  },

	  componentDidMount: function componentDidMount() {
	    this._alignSelection();
	    if (this.props.scrollable) {
	      this._buildMirror();
	      this._alignMirror();
	    }
	    if (this.props.onMore) {
	      this.startListeningForScroll(this.refs.more.getDOMNode(), this.props.onMore);
	    }
	    window.addEventListener('resize', this._onResize);
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
	    if (newProps.hasOwnProperty('selection')) {
	      this.setState({ selection: this._normalizeSelection(newProps.selection) });
	    }
	  },

	  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
	    if (!isEqual(this.state.selection, prevState.selection)) {
	      this._alignSelection();
	    }
	    if (this.props.scrollable) {
	      this._alignMirror();
	    }
	    this.stopListeningForScroll();
	    if (this.props.onMore) {
	      this.startListeningForScroll(this.refs.more.getDOMNode(), this.props.onMore);
	    }
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    if (this.props.onMore) {
	      this.stopListeningForScroll();
	    }
	    window.removeEventListener('resize', this._onResize);
	  },

	  _normalizeSelection: function _normalizeSelection(selection) {
	    var result;
	    if (undefined === selection || null === selection) {
	      result = [];
	    } else if (typeof selection === 'number') {
	      result = [selection];
	    } else {
	      result = selection;
	    }
	    return result;
	  },

	  _clearSelected: function _clearSelected() {
	    var rows = this.refs.table.getDOMNode().querySelectorAll("." + SELECTED_CLASS);
	    for (var i = 0; i < rows.length; i++) {
	      rows[i].classList.remove(SELECTED_CLASS);
	    }
	  },

	  _alignSelection: function _alignSelection() {
	    this._clearSelected();
	    if (null !== this.state.selection) {
	      var tbody = this.refs.table.getDOMNode().querySelectorAll('tbody')[0];
	      this.state.selection.forEach(function (rowIndex) {
	        tbody.childNodes[rowIndex].classList.add(SELECTED_CLASS);
	      });
	    }
	  },

	  _onClick: function _onClick(event) {
	    if (!this.props.selectable) {
	      return;
	    }

	    var element = event.target;
	    while (element.nodeName !== 'TR') {
	      element = element.parentNode;
	    }

	    var parentElement = element.parentNode;
	    if (element && parentElement.nodeName === 'TBODY') {

	      var index;
	      for (index = 0; index < parentElement.childNodes.length; index++) {
	        if (parentElement.childNodes[index] === element) {
	          break;
	        }
	      }

	      var selection = this.state.selection.slice(0);
	      var selectionIndex = selection.indexOf(index);

	      if ('multiple' === this.props.selectable && event.shiftKey) {

	        // select from nearest selected item to the currently selected item
	        var closestIndex = -1;
	        selection.forEach(function (selectIndex, arrayIndex) {
	          if (-1 === closestIndex) {
	            closestIndex = selectIndex;
	          } else if (Math.abs(index - selectIndex) < Math.abs(index - closestIndex)) {
	            closestIndex = selectIndex;
	          }
	        });
	        for (var i = index; i !== closestIndex;) {
	          selection.push(i);
	          if (closestIndex < index) {
	            i -= 1;
	          } else {
	            i += 1;
	          }
	        }
	        // remove text selection
	        window.getSelection().removeAllRanges();
	      } else if (('multiple' === this.props.selectable || -1 !== selectionIndex) && (event.ctrlKey || event.metaKey)) {

	        // toggle
	        if (-1 === selectionIndex) {
	          element.classList.add(SELECTED_CLASS);
	          selection.push(index);
	        } else {
	          element.classList.remove(SELECTED_CLASS);
	          selection.splice(selectionIndex, 1);
	        }
	      } else {

	        this._clearSelected();
	        selection = [index];
	        element.classList.add(SELECTED_CLASS);
	      }

	      this.setState({ selection: selection });

	      if (this.props.onSelect) {
	        // notify caller that the selection has changed
	        if (selection.length === 1) {
	          selection = selection[0];
	        }
	        this.props.onSelect(selection);
	      }
	    }
	  },

	  _onResize: function _onResize() {
	    this._alignMirror();
	  },

	  _buildMirror: function _buildMirror() {
	    var tableElement = this.refs.table.getDOMNode();
	    var cells = tableElement.querySelectorAll('thead tr th');
	    var mirrorElement = this.refs.mirror.getDOMNode();
	    var mirrorRow = mirrorElement.querySelectorAll('thead tr')[0];
	    for (var i = 0; i < cells.length; i++) {
	      mirrorRow.appendChild(cells[i].cloneNode(true));
	    }
	  },

	  _alignMirror: function _alignMirror() {
	    if (this.refs.mirror) {
	      var tableElement = this.refs.table.getDOMNode();
	      var cells = tableElement.querySelectorAll('thead tr th');
	      var mirrorElement = this.refs.mirror.getDOMNode();
	      var mirrorCells = mirrorElement.querySelectorAll('thead tr th');

	      var rect = tableElement.getBoundingClientRect();
	      mirrorElement.style.width = '' + Math.floor(rect.right - rect.left) + 'px';

	      var height = 0;
	      for (var i = 0; i < cells.length; i++) {
	        rect = cells[i].getBoundingClientRect();
	        mirrorCells[i].style.width = '' + Math.floor(rect.right - rect.left) + 'px';
	        mirrorCells[i].style.height = '' + Math.floor(rect.bottom - rect.top) + 'px';
	        height = Math.max(height, Math.floor(rect.bottom - rect.top));
	      }
	      mirrorElement.style.height = '' + height + 'px';
	    }
	  },

	  render: function render() {
	    var classes = [CLASS_ROOT];
	    if (this.props.selectable) {
	      classes.push(CLASS_ROOT + "--selectable");
	    }
	    if (this.props.scrollable) {
	      classes.push(CLASS_ROOT + "--scrollable");
	    }
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }

	    var mirror = null;
	    if (this.props.scrollable) {
	      mirror = React.createElement(
	        'table',
	        { ref: 'mirror', className: CLASS_ROOT + "__mirror" },
	        React.createElement(
	          'thead',
	          null,
	          React.createElement('tr', null)
	        )
	      );
	    }

	    var more = null;
	    if (this.props.onMore) {
	      more = React.createElement(
	        'div',
	        { ref: 'more', className: CLASS_ROOT + "__more" },
	        React.createElement(SpinningIcon, null)
	      );
	    }

	    return React.createElement(
	      'div',
	      { ref: 'container', className: classes.join(' ') },
	      mirror,
	      React.createElement(
	        'table',
	        { ref: 'table', className: CLASS_ROOT + "__table", onClick: this._onClick },
	        this.props.children
	      ),
	      more
	    );
	  }

	});

	module.exports = Table;

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIsEqual = __webpack_require__(140),
	    bindCallback = __webpack_require__(47);

	/**
	 * Performs a deep comparison between two values to determine if they are
	 * equivalent. If `customizer` is provided it's invoked to compare values.
	 * If `customizer` returns `undefined` comparisons are handled by the method
	 * instead. The `customizer` is bound to `thisArg` and invoked with up to
	 * three arguments: (value, other [, index|key]).
	 *
	 * **Note:** This method supports comparing arrays, booleans, `Date` objects,
	 * numbers, `Object` objects, regexes, and strings. Objects are compared by
	 * their own, not inherited, enumerable properties. Functions and DOM nodes
	 * are **not** supported. Provide a customizer function to extend support
	 * for comparing other values.
	 *
	 * @static
	 * @memberOf _
	 * @alias eq
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize value comparisons.
	 * @param {*} [thisArg] The `this` binding of `customizer`.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var other = { 'user': 'fred' };
	 *
	 * object == other;
	 * // => false
	 *
	 * _.isEqual(object, other);
	 * // => true
	 *
	 * // using a customizer callback
	 * var array = ['hello', 'goodbye'];
	 * var other = ['hi', 'goodbye'];
	 *
	 * _.isEqual(array, other, function(value, other) {
	 *   if (_.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/)) {
	 *     return true;
	 *   }
	 * });
	 * // => true
	 */
	function isEqual(value, other, customizer, thisArg) {
	  customizer = typeof customizer == 'function' ? bindCallback(customizer, thisArg, 3) : undefined;
	  var result = customizer ? customizer(value, other) : undefined;
	  return result === undefined ? baseIsEqual(value, other, customizer) : !!result;
	}

	module.exports = isEqual;

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIsEqualDeep = __webpack_require__(141),
	    isObject = __webpack_require__(33),
	    isObjectLike = __webpack_require__(28);

	/**
	 * The base implementation of `_.isEqual` without support for `this` binding
	 * `customizer` functions.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || !isObject(value) && !isObjectLike(other)) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
	}

	module.exports = baseIsEqual;

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var equalArrays = __webpack_require__(142),
	    equalByTag = __webpack_require__(144),
	    equalObjects = __webpack_require__(145),
	    isArray = __webpack_require__(29),
	    isTypedArray = __webpack_require__(41);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing objects.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
	 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = objToString.call(object);
	    if (objTag == argsTag) {
	      objTag = objectTag;
	    } else if (objTag != objectTag) {
	      objIsArr = isTypedArray(object);
	    }
	  }
	  if (!othIsArr) {
	    othTag = objToString.call(other);
	    if (othTag == argsTag) {
	      othTag = objectTag;
	    } else if (othTag != objectTag) {
	      othIsArr = isTypedArray(other);
	    }
	  }
	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;

	  if (isSameTag && !(objIsArr || objIsObj)) {
	    return equalByTag(object, other, objTag);
	  }
	  if (!isLoose) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  // For more information on detecting circular references see https://es5.github.io/#JO.
	  stackA || (stackA = []);
	  stackB || (stackB = []);

	  var length = stackA.length;
	  while (length--) {
	    if (stackA[length] == object) {
	      return stackB[length] == other;
	    }
	  }
	  // Add `object` and `other` to the stack of traversed objects.
	  stackA.push(object);
	  stackB.push(other);

	  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);

	  stackA.pop();
	  stackB.pop();

	  return result;
	}

	module.exports = baseIsEqualDeep;

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arraySome = __webpack_require__(143);

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing arrays.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var index = -1,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
	    return false;
	  }
	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index],
	        result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;

	    if (result !== undefined) {
	      if (result) {
	        continue;
	      }
	      return false;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (isLoose) {
	      if (!arraySome(other, function (othValue) {
	        return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
	      })) {
	        return false;
	      }
	    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = equalArrays;

/***/ },
/* 143 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	"use strict";

	function arraySome(array, predicate) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;

/***/ },
/* 144 */
/***/ function(module, exports) {

	/** `Object#toString` result references. */
	'use strict';

	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    stringTag = '[object String]';

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag) {
	  switch (tag) {
	    case boolTag:
	    case dateTag:
	      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
	      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
	      return +object == +other;

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case numberTag:
	      // Treat `NaN` vs. `NaN` as equal.
	      return object != +object ? other != +other : object == +other;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings primitives and string
	      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
	      return object == other + '';
	  }
	  return false;
	}

	module.exports = equalByTag;

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var keys = __webpack_require__(44);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isLoose) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  var skipCtor = isLoose;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key],
	        result = customizer ? customizer(isLoose ? othValue : objValue, isLoose ? objValue : othValue, key) : undefined;

	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
	      return false;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (!skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor && ('constructor' in object && 'constructor' in other) && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = equalObjects;

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Article = __webpack_require__(65);

	var ActionsDoc = React.createClass({
	  displayName: 'ActionsDoc',

	  render: function render() {
	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Actions'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'TBD'
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Example'
	        ),
	        React.createElement('div', { className: 'example' })
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Details'
	        ),
	        React.createElement(
	          'div',
	          { className: 'tbd' },
	          'TBD'
	        )
	      )
	    );
	  }
	});

	module.exports = ActionsDoc;

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Article = __webpack_require__(65);
	var Section = __webpack_require__(73);
	var Anchor = __webpack_require__(148);

	var AnchorDoc = React.createClass({
	  displayName: 'AnchorDoc',

	  _onClick: function _onClick() {
	    // no-op
	  },

	  render: function render() {
	    var inline = ["<Anchor href=\"...\">label</Anchor"].join("\n");
	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Anchor'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'A button. We have a separate component from the browser base so we can style it.'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            inline
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Options'
	        ),
	        React.createElement(
	          'dl',
	          null,
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'href          ',
	              "{location}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Hyperlink reference to place in the anchor.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'onClick        ',
	              "{func}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Click handler.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'primary        true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether this is a primary anchor.'
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Example'
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Default'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Anchor,
	            { href: '', onClick: this._onClick },
	            'Text'
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Anchor href=\"\" onClick={this._onClick}>Text</Anchor>"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Primary'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Anchor,
	            { href: '', primary: true, onClick: this._onClick },
	            'Text'
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Anchor href=\"\" label=\"Text\" primary={true} onClick={this._onClick} />"
	          )
	        )
	      ),
	      React.createElement(
	        Section,
	        { colorIndex: 'neutral-1', pad: 'medium' },
	        React.createElement(
	          'h3',
	          null,
	          'Colored context'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Anchor,
	            { href: '', onClick: this._onClick },
	            'Text'
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Anchor,
	            { href: '', primary: true, onClick: this._onClick },
	            'Text'
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = AnchorDoc;

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var RightIcon = __webpack_require__(78);

	var CLASS_ROOT = "anchor";

	var Anchor = React.createClass({
	  displayName: 'Anchor',

	  propTypes: {
	    href: React.PropTypes.string.isRequired,
	    onClick: React.PropTypes.func,
	    primary: React.PropTypes.bool
	  },

	  render: function render() {
	    var classes = [CLASS_ROOT];
	    var icon;
	    if (this.props.primary) {
	      classes.push(CLASS_ROOT + "--primary");
	      icon = React.createElement(RightIcon, null);
	    }
	    if (!this.props.onClick) {
	      classes.push(CLASS_ROOT + "--disabled");
	    }
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }

	    return React.createElement(
	      'a',
	      { className: classes.join(' '),
	        href: this.props.href,
	        onClick: this.props.onClick },
	      icon,
	      this.props.children
	    );
	  }

	});

	module.exports = Anchor;

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var Article = __webpack_require__(65);
	var App = __webpack_require__(12);
	var Header = __webpack_require__(69);
	var Title = __webpack_require__(70);

	var inline = "<App>\n" + "  ...\n" + "</App>";

	var AppDoc = React.createClass({
	  displayName: 'AppDoc',

	  render: function render() {
	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'App'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Grommet main container, usually containing Header and Footer.'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            inline
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Options'
	        ),
	        React.createElement(
	          'dl',
	          null,
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'centered  true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether to centralize or not the content inside the container. Default is true.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'inline  true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether to render the app relative to the container (inline) or to the browser window. Default is false.'
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Examples'
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'App, header with title'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            App,
	            { inline: true },
	            React.createElement(
	              Header,
	              null,
	              React.createElement(
	                Title,
	                null,
	                'My App'
	              )
	            )
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<App>\n  <Header>\n    <Title>\n      My App\n    </Title>\n  </Header>\n  ...\n</App>"
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = AppDoc;

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Link = __webpack_require__(2).Link;
	var Article = __webpack_require__(65);
	var Header = __webpack_require__(69);
	var Section = __webpack_require__(73);

	var ArticleDoc = React.createClass({
	  displayName: 'ArticleDoc',

	  render: function render() {
	    var inline = ["<Article>", "  <Header>", "    <h1>{title}</h1>", "  </Header>", "  <Section>", "    <h2>{header}</h2>", "    <p>{content}</p>", "  </Section>", "</Article>"].join('\n');

	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Article'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Styles standard HTML5 markup for use in articles.'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            inline
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Options'
	        ),
	        React.createElement(
	          'dl',
	          null,
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'primary      true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether it should be treated as main content or not. Used for Accessibility.'
	          )
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Options for ',
	          React.createElement(
	            Link,
	            { to: 'develop_box' },
	            'Box'
	          ),
	          ' area also available.'
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Example'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Article,
	            null,
	            React.createElement(
	              Header,
	              null,
	              React.createElement(
	                'h1',
	                null,
	                'Title'
	              )
	            ),
	            React.createElement(
	              Section,
	              null,
	              React.createElement(
	                'h2',
	                null,
	                'Heading'
	              ),
	              React.createElement(
	                'p',
	                null,
	                'Lorem ipsum ...'
	              )
	            )
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = ArticleDoc;

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Article = __webpack_require__(65);
	var Box = __webpack_require__(59);

	var BoxDoc = React.createClass({
	  displayName: 'BoxDoc',

	  render: function render() {
	    var inline = "<Box>\n  ...\n</Box>";
	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Box'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'General purpose flexible box layout. This does not support all of the',
	          React.createElement(
	            'a',
	            { href: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/' },
	            'flexbox capabilities'
	          ),
	          '.'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            inline
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Options'
	        ),
	        React.createElement(
	          'dl',
	          null,
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'align        start|center|end'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'How to align the contents along the cross axis.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'appCentered  true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether the box background should stretch across an App that is centered.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'colorIndex   ',
	              "{category}-{index}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'The color identifier to use for the background color. For example: ',
	            React.createElement(
	              'code',
	              null,
	              '"neutral-1"'
	            )
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'direction    row|column'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'The orientation to layout the child components in.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'full         true|horizontal|vertical|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether the width and/or height should take the full viewport size.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'onClick      ',
	              "{func}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Optional click handler.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'justify      start|center|between|end'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'How to align the contents along the main axis.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'pad          ',
	              "none|small|medium|large|{...}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'The amount of padding to put around the contents. An object can be specified to distinguish horizontal and vertical padding: ',
	            React.createElement(
	              'code',
	              null,
	              "{horizontal: none|small|medium|large, vertical: none|small|medium|large}"
	            ),
	            '.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'reverse      true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether to reverse the order of the child components.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'responsive   true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether children laid out in a row direction should be switched to a column layout when the display area narrows.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'separator   top|bottom|left|right'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Add a separator.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'tag          ',
	              "{text}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'The DOM tag to use for the element.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'texture      ',
	              "{url}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'A texture image to apply to the background.'
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Examples'
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Default'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Box,
	            null,
	            React.createElement(
	              'div',
	              null,
	              'first'
	            ),
	            React.createElement(
	              'div',
	              null,
	              'second'
	            )
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Box> ..."
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Row'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Box,
	            { direction: 'row' },
	            React.createElement(
	              'div',
	              null,
	              'first'
	            ),
	            React.createElement(
	              'div',
	              null,
	              'second'
	            )
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Box direction=\"row\"> ..."
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Kitchen sink'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Box,
	            { direction: 'row', align: 'center', colorIndex: 'neutral-1', justify: 'between',
	              pad: 'large', reverse: true, tag: 'aside' },
	            React.createElement(
	              'div',
	              null,
	              'first'
	            ),
	            React.createElement(
	              'div',
	              null,
	              'second'
	            )
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Box direction=\"row\" align=\"center\" colorIndex=\"neutral-1\"\n  justify=\"between\" reverse={true} tag=\"aside\"> ..."
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = BoxDoc;

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Article = __webpack_require__(65);
	var Section = __webpack_require__(73);
	var Button = __webpack_require__(81);

	var ButtonDoc = React.createClass({
	  displayName: 'ButtonDoc',

	  _onClick: function _onClick() {
	    // no-op
	  },

	  render: function render() {
	    var inline = ["<Button label=\"Item 1\">"].join("\n");
	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Button'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'A button. We have a separate component from the browser base so we can style it.'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            inline
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Options'
	        ),
	        React.createElement(
	          'dl',
	          null,
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'accent         true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether this is an accent button.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'label          ',
	              "{text}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Label text to place in the button.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'onClick        ',
	              "{func}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Click handler. Not providing an onClick function causes the control to be disabled.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'primary        true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether this is a primary button. There should be at most one per page or screen.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'large          true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether this is a large button. Defaults to false.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'type           button|reset|submit'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'The type of button. Set the type to ',
	            React.createElement(
	              'code',
	              null,
	              'submit'
	            ),
	            'for the default button on forms.  Defaults to ',
	            React.createElement(
	              'code',
	              null,
	              'button'
	            ),
	            '.'
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Example'
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Default'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Button, { label: 'Action', onClick: this._onClick })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Button label=\"Action\" onClick={...} />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Primary'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Button, { label: 'Action', primary: true, onClick: this._onClick })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Button label=\"Action\" primary={true} onClick={...} />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Accent'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Button, { label: 'Action', accent: true, onClick: this._onClick })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Button label=\"Action\" accent={true} onClick={...} />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Large'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Button, { label: 'Action', onClick: this._onClick, large: true })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Button label=\"Action\" onClick={...} large={true} />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Disabled'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Button, { label: 'Action' })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Button label=\"Action\" />"
	          )
	        )
	      ),
	      React.createElement(
	        Section,
	        { colorIndex: 'neutral-1', pad: 'medium' },
	        React.createElement(
	          'h3',
	          null,
	          'Colored context'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Button, { label: 'Default', onClick: this._onClick })
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Button, { label: 'Primary', primary: true, onClick: this._onClick })
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Button, { label: 'Accent', accent: true, onClick: this._onClick })
	        )
	      )
	    );
	  }
	});

	module.exports = ButtonDoc;

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Article = __webpack_require__(65);
	var Calendar = __webpack_require__(154);

	var CalendarDoc = React.createClass({
	  displayName: 'CalendarDoc',

	  getInitialState: function getInitialState() {
	    return { value: new Date().toISOString().slice(0, 10) };
	  },

	  _onChange: function _onChange(value) {
	    this.setState({ value: value });
	  },

	  render: function render() {
	    var inline = "<Calendar onChange={...} />";
	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Calendar'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'An input field for a date.'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            inline
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Options'
	        ),
	        React.createElement(
	          'dl',
	          null,
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'id            ',
	              "{string}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'The id attribute of the input.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'name          ',
	              "{string}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'The name attribute of the input.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'onChange      ',
	              "function ({string}) {...}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Function that will be called when the user types some text into the input or selects a date from the drop down.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'value         ',
	              "{string}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'What text to put in the input.'
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Examples'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Calendar, { id: 'item1', name: 'item-1',
	            onChange: this._onChange, value: this.state.value })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Calendar value={...} onChange={...} />"
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = CalendarDoc;

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var moment = __webpack_require__(155);
	var KeyboardAccelerators = __webpack_require__(16);
	var Drop = __webpack_require__(56);
	var CalendarIcon = __webpack_require__(94);
	var PreviousIcon = __webpack_require__(77);
	var NextIcon = __webpack_require__(78);
	var Header = __webpack_require__(69);
	var Menu = __webpack_require__(17);
	var Title = __webpack_require__(70);

	var CLASS_ROOT = "calendar";

	var Calendar = React.createClass({
	  displayName: 'Calendar',

	  propTypes: {
	    id: React.PropTypes.string,
	    name: React.PropTypes.string,
	    onChange: React.PropTypes.func,
	    value: React.PropTypes.string
	  },

	  mixins: [KeyboardAccelerators],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      value: moment().format('YYYY-MM-DD')
	    };
	  },

	  getInitialState: function getInitialState() {
	    var state = this._stateFromProps(this.props);
	    state.dropActive = false;
	    return state;
	  },

	  componentDidMount: function componentDidMount() {
	    this._activation(this.state.dropActive);
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
	    var state = this._stateFromProps(newProps);
	    this.setState(state);
	  },

	  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
	    // Set up keyboard listeners appropriate to the current state.
	    if (!this.state.dropActive && prevState.dropActive) {
	      this._activation(this.state.dropActive);
	    }
	    if (this.state.dropActive && !prevState.dropActive) {
	      this._activation(this.state.dropActive);
	    }
	    if (this.state.dropActive) {
	      this._drop.render(this._renderDrop());
	    }
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    this._activation(false);
	  },

	  _onInputChange: function _onInputChange(event) {
	    if (this.props.onChange) {
	      this.props.onChange(event.target.value);
	    }
	  },

	  _onOpen: function _onOpen(event) {
	    event.preventDefault();
	    this.setState({ dropActive: true });
	  },

	  _onClose: function _onClose() {
	    this.setState({ dropActive: false });
	  },

	  _onClickDay: function _onClickDay(date) {
	    if (this.props.onChange) {
	      this.props.onChange(moment(date).format('YYYY-MM-DD'));
	    }
	  },

	  _onPrevious: function _onPrevious(event) {
	    event.preventDefault();
	    event.stopPropagation();
	    if (event.nativeEvent && event.nativeEvent.stopImmediatePropagation) {
	      event.nativeEvent.stopImmediatePropagation();
	    }
	    this.setState({
	      reference: this.state.reference.subtract(1, 'month'),
	      current: this.state.reference
	    });
	  },

	  _onNext: function _onNext(event) {
	    event.preventDefault();
	    event.stopPropagation();
	    if (event.nativeEvent && event.nativeEvent.stopImmediatePropagation) {
	      event.nativeEvent.stopImmediatePropagation();
	    }
	    this.setState({
	      reference: this.state.reference.add(1, 'month'),
	      current: this.state.reference
	    });
	  },

	  _onNextDay: function _onNextDay(event) {
	    event.preventDefault();
	    event.stopPropagation();
	    var nextDay = moment(this.state.current).add(1, 'days');

	    if (!nextDay.isSame(this.state.reference, 'month')) {
	      this.setState({ reference: this.state.reference.add(1, 'month'), current: nextDay });
	    } else {
	      this.setState({ current: nextDay });
	    }
	  },

	  _onPreviousDay: function _onPreviousDay(event) {
	    event.preventDefault();
	    event.stopPropagation();
	    var previousDay = moment(this.state.current).subtract(1, 'days');
	    if (!previousDay.isSame(this.state.reference, 'month')) {
	      this.setState({ reference: this.state.reference.subtract(1, 'month'), current: previousDay });
	    } else {
	      this.setState({ current: previousDay });
	    }
	  },

	  _onNextWeek: function _onNextWeek(event) {
	    event.preventDefault();
	    event.stopPropagation();
	    var nextWeek = moment(this.state.current).add(1, 'week');

	    if (!nextWeek.isSame(this.state.reference, 'month')) {
	      this.setState({ reference: this.state.reference.add(1, 'month'), current: nextWeek });
	    } else {
	      this.setState({ current: nextWeek });
	    }
	  },

	  _onPreviousWeek: function _onPreviousWeek(event) {
	    event.preventDefault();
	    event.stopPropagation();
	    var previousWeek = moment(this.state.current).subtract(1, 'week');
	    if (!previousWeek.isSame(this.state.reference, 'month')) {
	      this.setState({ reference: this.state.reference.subtract(1, 'month'), current: previousWeek });
	    } else {
	      this.setState({ current: previousWeek });
	    }
	  },

	  _onSelectDate: function _onSelectDate(event) {
	    event.preventDefault();
	    event.stopPropagation();
	    this._onClickDay(this.state.current);
	    this._onClose();
	  },

	  _activation: function _activation(dropActive) {

	    var listeners = {
	      esc: this._onClose,
	      tab: this._onClose,
	      right: this._onNextDay,
	      left: this._onPreviousDay,
	      down: this._onNextWeek,
	      up: this._onPreviousWeek,
	      shiftLeft: this._onPrevious,
	      shiftRight: this._onNext,
	      enter: this._onSelectDate,
	      space: this._onSelectDate
	    };

	    if (dropActive) {

	      document.addEventListener('click', this._onClose);
	      this.startListeningToKeyboard(listeners);

	      this._drop = Drop.add(this.refs.component.getDOMNode(), this._renderDrop(), { top: 'bottom', left: 'left' });
	    } else {

	      document.removeEventListener('click', this._onClose);
	      this.stopListeningToKeyboard(listeners);

	      if (this._drop) {
	        this._drop.remove();
	        this._drop = null;
	      }
	    }
	  },

	  _stateFromProps: function _stateFromProps(props) {
	    var result = {
	      current: null,
	      reference: moment().startOf('day')
	    };
	    var date = moment(props.value);
	    if (date.isValid()) {
	      result.current = moment(date).startOf('day');
	      result.reference = moment(date).startOf('day');
	    }
	    return result;
	  },

	  _renderDrop: function _renderDrop() {
	    var weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	    var headerCells = weekDays.map(function (day) {
	      return React.createElement(
	        'th',
	        { key: day },
	        day
	      );
	    });

	    var reference = this.state.reference;
	    var start = moment(reference).startOf('month').startOf('week');
	    var end = moment(reference).endOf('month').endOf('week');
	    var date = moment(start);
	    var rows = [];

	    while (date.valueOf() <= end.valueOf()) {
	      var days = [];
	      for (var i = 0; i < 7; i += 1) {
	        var classes = [CLASS_ROOT + "__day"];
	        if (this.state.current && date.isSame(this.state.current)) {
	          classes.push(CLASS_ROOT + "__day--active");
	        }
	        if (!date.isSame(reference, 'month')) {
	          classes.push(CLASS_ROOT + "__day--other-month");
	        }
	        days.push(React.createElement(
	          'td',
	          { key: date.valueOf() },
	          React.createElement(
	            'div',
	            { className: classes.join(' '),
	              onClick: this._onClickDay.bind(this, moment(date)) },
	            date.date()
	          )
	        ));
	        date.add(1, 'days');
	      }
	      rows.push(React.createElement(
	        'tr',
	        { key: date.valueOf() },
	        days
	      ));
	    }

	    return React.createElement(
	      'div',
	      { id: CLASS_ROOT + "-drop", className: CLASS_ROOT + "__drop",
	        onClick: this._onClose },
	      React.createElement(
	        Header,
	        { justify: 'between' },
	        React.createElement(
	          Menu,
	          { responsive: false },
	          React.createElement(
	            'span',
	            { className: CLASS_ROOT + "__previous", onClick: this._onPrevious },
	            React.createElement(PreviousIcon, null)
	          )
	        ),
	        React.createElement(
	          Title,
	          { className: CLASS_ROOT + "__title", responsive: false },
	          this.state.reference.format('MMMM YYYY')
	        ),
	        React.createElement(
	          Menu,
	          { responsive: false },
	          React.createElement(
	            'span',
	            { className: CLASS_ROOT + "__next", onClick: this._onNext },
	            React.createElement(NextIcon, null)
	          )
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: CLASS_ROOT + "__grid" },
	        React.createElement(
	          'table',
	          null,
	          React.createElement(
	            'thead',
	            null,
	            React.createElement(
	              'tr',
	              null,
	              headerCells
	            )
	          ),
	          React.createElement(
	            'tbody',
	            null,
	            rows
	          )
	        )
	      )
	    );
	  },

	  render: function render() {
	    var classes = [CLASS_ROOT];
	    if (this.state.dropActive) {
	      classes.push(CLASS_ROOT + "--active");
	    }
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }

	    return React.createElement(
	      'div',
	      { ref: 'component', className: classes.join(' ') },
	      React.createElement('input', { className: CLASS_ROOT + "__input",
	        id: this.props.id, ref: 'calendarInput', name: this.props.name,
	        value: this.props.value,
	        onChange: this._onInputChange }),
	      React.createElement(
	        'div',
	        { className: CLASS_ROOT + "__control", onClick: this._onOpen },
	        React.createElement(CalendarIcon, null)
	      )
	    );
	  }

	});

	module.exports = Calendar;

/***/ },
/* 155 */
/***/ function(module, exports) {

	module.exports = require("moment");

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Article = __webpack_require__(65);
	var Carousel = __webpack_require__(157);

	var TileDoc = React.createClass({
	  displayName: 'TileDoc',

	  render: function render() {
	    var inline = "<Carousel>\n" + "  <img />\n" + "  <img />\n" + "  ...\n" + "</Carousel>";

	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Carousel'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Image carousel.'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            inline
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Example'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Carousel,
	            null,
	            React.createElement('img', { src: 'img/carousel-1.png' }),
	            React.createElement('img', { src: 'img/carousel-2.png' })
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Carousel>\n  <img />\n    ...\n</Carousel>"
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = TileDoc;

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	"use strict";

	var React = __webpack_require__(1);

	var CLASS_ROOT = "carousel";

	var Carousel = React.createClass({
	  displayName: "Carousel",

	  propTypes: {
	    auto: React.PropTypes.bool,
	    single: React.PropTypes.bool
	  },

	  getDefaultProps: function getDefaultProps() {
	    return { single: true };
	  },

	  getInitialState: function getInitialState() {
	    return { activeIndex: 0, priorIndex: 0, sequence: 1 };
	  },

	  _onSelect: function _onSelect(index) {
	    if (index !== this.state.activeIndex) {
	      this.setState({
	        activeIndex: index,
	        priorIndex: this.state.activeIndex,
	        sequence: this.state.sequence += 1
	      });
	    }
	  },

	  // children should be an array of Tile
	  render: function render() {
	    var classes = [CLASS_ROOT];
	    classes.push(CLASS_ROOT + "--toggle-" + this.state.sequence % 2);
	    if (this.props.single) {
	      classes.push(CLASS_ROOT + "--single");
	    }
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }

	    var index = -1;
	    var activeChild;
	    var priorChild;
	    var controls = React.Children.map(this.props.children, function (child) {
	      index += 1;
	      var controlClasses = [CLASS_ROOT + "__control"];
	      if (index === this.state.activeIndex) {
	        controlClasses.push(CLASS_ROOT + "__control--active");
	        activeChild = child;
	      } else if (index === this.state.priorIndex) {
	        priorChild = child;
	      }
	      return React.createElement(
	        "svg",
	        { className: controlClasses.join(' '), viewBox: "0 0 24 24", version: "1.1",
	          onClick: this._onSelect.bind(this, index) },
	        React.createElement("circle", { cx: 12, cy: 12, r: 6 })
	      );
	    }, this);

	    return React.createElement(
	      "div",
	      { className: classes.join(' ') },
	      React.createElement(
	        "div",
	        { className: CLASS_ROOT + "__prior" },
	        priorChild
	      ),
	      React.createElement(
	        "div",
	        { className: CLASS_ROOT + "__active" },
	        activeChild
	      ),
	      React.createElement(
	        "div",
	        { className: CLASS_ROOT + "__controls" },
	        controls
	      )
	    );
	  }

	});

	module.exports = Carousel;

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var stringify = __webpack_require__(159);
	var moment = __webpack_require__(155);
	var Article = __webpack_require__(65);
	var Chart = __webpack_require__(160);
	var Tiles = __webpack_require__(75);
	var Tile = __webpack_require__(80);

	var inline = "<Chart ... />";

	var series = [{ label: 'first', values: [[8, 1], [7, 2], [6, 3], [5, 2], [4, 3], [3, 3], [2, 2], [1, 4]],
	  colorIndex: "graph-1" }, { label: 'second', values: [[8, 4], [7, 2], [6, 3], [5, 4], [4, 3], [3, 0], [2, 1], [1, 0]],
	  colorIndex: "graph-2" }];

	var singleSeries = [{ values: [[8, 1], [7, 2], [6, 3], [5, 2], [4, 3], [3, 3], [2, 2], [1, 4]],
	  colorIndex: "graph-1" }];

	var seriesXAxis = [{ label: 'May 22', value: series[0].values[0][0] }, { label: 'May 21', value: series[0].values[1][0] }, { label: 'May 20', value: series[0].values[2][0] }, { label: 'May 19', value: series[0].values[3][0] }, { label: 'May 18', value: series[0].values[4][0] }, { label: 'May 17', value: series[0].values[5][0] }, { label: 'May 16', value: series[0].values[6][0] }, { label: 'May 15', value: series[0].values[7][0] }];

	var dateSeries = [{ label: 'first', values: [[new Date(Date.parse("2015-05-22")), 4], [new Date(Date.parse("2015-05-21")), 2], [new Date(Date.parse("2015-05-20")), 3], [new Date(Date.parse("2015-05-19")), 3], [new Date(Date.parse("2015-05-18")), 2], [new Date(Date.parse("2015-05-17")), 1], [new Date(Date.parse("2015-05-16")), 4], [new Date(Date.parse("2015-05-15")), 2]], colorIndex: "graph-1" }];

	var dateSeriesXAxis = [{ label: 'May 22', value: dateSeries[0].values[0][0] }, { label: 'May 21', value: dateSeries[0].values[1][0] }, { label: 'May 20', value: dateSeries[0].values[2][0] }, { label: 'May 19', value: dateSeries[0].values[3][0] }, { label: 'May 18', value: dateSeries[0].values[4][0] }, { label: 'May 17', value: dateSeries[0].values[5][0] }, { label: 'May 16', value: dateSeries[0].values[6][0] }, { label: 'May 15', value: dateSeries[0].values[7][0] }];

	var thresholds = [{ label: 'OK', value: 0, colorIndex: 'ok' }, { label: 'Warning', value: 3, colorIndex: 'warning' }, { label: 'Error', value: 4, colorIndex: 'error' }];

	var secondsSeries = [{ label: 'first', values: [], colorIndex: "graph-1" }];

	function buildSecondsSeries() {
	  var now = moment();
	  for (var i = 0; i < 90; i += 5) {
	    secondsSeries[0].values.push([moment(now).subtract(i, 'seconds').unix(), Math.ceil(Math.random() * 5)]);
	  }
	}

	var ChartDoc = React.createClass({
	  displayName: 'ChartDoc',

	  componentDidMount: function componentDidMount() {
	    buildSecondsSeries();
	    this._timer = setInterval((function () {
	      secondsSeries[0].values.unshift([moment().unix(), Math.ceil(Math.random() * 5)]);
	      secondsSeries[0].values.pop();
	      this.forceUpdate();
	    }).bind(this), 5000);
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    clearInterval(this._timer);
	    secondsSeries[0].values = [];
	  },

	  render: function render() {
	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Chart'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Shows a graphical data chart.'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            inline
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Options'
	        ),
	        React.createElement(
	          'dl',
	          null,
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'important   ',
	              "{number}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'The index of the series data that the legend should correspond to, if any.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'large       true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Larger sized version. Deprecated, use ',
	            React.createElement(
	              'code',
	              null,
	              'size'
	            ),
	            '.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'legend      ',
	              "{position: overlay|after, total: true|false}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether to show a legend, where to place it, and whether to show a total value.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'max         ',
	              "{number}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'The largest possible value. Defaults to the largest y value in the series data.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'min         ',
	              "{number}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'The smallest possible value. Defaults to the smallest y value in the series data.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'points      true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'For line and area charts, whether to draw individual data points.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'series       ',
	              "[{...}]"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'An array of: ',
	            React.createElement(
	              'code',
	              null,
	              "{label: <string>, colorIndex: <string>, values: [[x,y], ...]}"
	            ),
	            '. The x values can be either numbers or Date objects. The y values should be numbers.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'size         small|medium|large'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'The height of the Chart. Defaults to ',
	            React.createElement(
	              'code',
	              null,
	              'medium'
	            ),
	            '.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'small        true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Smaller sized version. Deprecated, use ',
	            React.createElement(
	              'code',
	              null,
	              'size'
	            ),
	            '.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'smooth       true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'For line and area charts, smooth the drawing.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'sparkline    true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Sparkline sized version.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'threshold    ',
	              "{number}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Optional threshold value.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'type         line|bar|area'
	            )
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'thresholds   ',
	              "[{value: , label: , colorIndex: }, ...]"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'An array of objects describing thresholds.'
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether to draw a line graph, bar graph, or area graph.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'units        ',
	              "{string}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Optional units to include.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'xAxis        ',
	              "{placement: top|bottom: data: [{string}, ...]}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Optional xAxis placement and labels.'
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Examples'
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Line'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Chart, { series: singleSeries, min: 0, max: 5, threshold: 3 })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Chart threshold={2} series={" + stringify(singleSeries) + "} />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Bar'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Chart, { series: singleSeries, min: 0, threshold: 3, type: 'bar' })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Chart type=\"bar\" threshold={2}\n" + " series={" + stringify(singleSeries) + "} />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Area'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Chart, { series: singleSeries, min: 0, max: 5, threshold: 3, type: 'area' })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Chart type=\"area\" threshold={3}\n" + " series={" + stringify(singleSeries) + "} />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Bar, Legend, xAxis, and Units'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Chart, { series: series, min: 0, threshold: 3, type: 'bar', legend: {},
	            xAxis: seriesXAxis,
	            units: 'TB' })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Chart type=\"bar\" threshold={3} legend={{}} units=\"TB\"\n" + " xAxis={" + stringify(seriesXAxis) + "}\n" + " series={" + stringify(series) + "} />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Area, Legend, xAxis, Units, Points, and Thresholds'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Chart, { series: series, min: 0, max: 5, threshold: 3,
	            type: 'area', legend: {}, points: true,
	            xAxis: { placement: 'bottom', data: seriesXAxis },
	            units: 'TB',
	            thresholds: thresholds })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Chart type=\"bar\" threshold={3}\n" + " legend={{}} points={true} units=\"TB\"\n" + " xAxis={{placement: \"bottom\",\n" + "   data:" + stringify(seriesXAxis) + "}}\n" + " series={" + stringify(series) + "}\n" + " thresholds={" + stringify(thresholds) + "} />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Small'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Chart, { series: series, min: 0, threshold: 3, type: 'bar', legend: {},
	            xAxis: seriesXAxis,
	            units: 'TB', small: true })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Chart type=\"bar\" small={true} threshold={3}\n" + " legend={{}} units=\"TB\"\n xAxis={" + stringify(seriesXAxis) + "}\n" + " series={" + stringify(series) + "} />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Large, Legend total'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Chart, { series: series, min: 0, threshold: 3, type: 'bar',
	            legend: { total: true },
	            xAxis: seriesXAxis,
	            units: 'TB', large: true })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Chart type=\"bar\" small={true} threshold={3}\n" + " legend={{total: true}} units=\"TB\"\n" + " xAxis={" + stringify(seriesXAxis) + "}\n" + " series={" + stringify(series) + "} />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Sparkline, Bar'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Chart, { series: singleSeries, min: 0, type: 'bar', sparkline: true }),
	          singleSeries[0].values[0][0]
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Chart type=\"bar\" sparkline={true}\n" + " series={" + stringify(singleSeries) + "} />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Sparkline, Area'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Chart, { series: singleSeries, min: 0, type: 'area', sparkline: true }),
	          singleSeries[0].values[0][0]
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Chart type=\"area\" sparkline={true}\n" + " series={" + stringify(singleSeries) + "} />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Dates, Smooth'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Chart, { series: dateSeries, min: 0, max: 5, threshold: 3,
	            type: 'area', smooth: true, legend: {},
	            xAxis: dateSeriesXAxis })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Chart type=\"area\" smooth={true} threshold={3}\n" + " legend={{}}\n" + " xAxis={" + stringify(dateSeriesXAxis) + "}\n" + " series={" + stringify(dateSeries) + "} />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Ticker'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Chart, { series: secondsSeries, min: 0, max: 5, threshold: 3,
	            type: 'bar', legend: {} })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Chart type=\"bar\" threshold={3}\n" + " legend={{}} series={...} />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Tiles'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Tiles,
	            null,
	            React.createElement(
	              Tile,
	              null,
	              React.createElement(Chart, { series: singleSeries, min: 0, threshold: 3, type: 'bar',
	                xAxis: seriesXAxis, units: 'TB', max: 6,
	                legend: { position: 'after' } })
	            ),
	            React.createElement(
	              Tile,
	              null,
	              React.createElement(Chart, { series: series, min: 0, threshold: 3, type: 'bar',
	                xAxis: seriesXAxis, units: 'TB',
	                legend: { position: 'after' } })
	            ),
	            React.createElement(
	              Tile,
	              null,
	              React.createElement(Chart, { series: series, min: 0, threshold: 3, type: 'area',
	                xAxis: seriesXAxis, units: 'TB',
	                legend: { position: 'after' } })
	            ),
	            React.createElement(
	              Tile,
	              null,
	              React.createElement(Chart, { series: series, min: 0, threshold: 3, type: 'line',
	                xAxis: seriesXAxis, units: 'TB',
	                legend: { position: 'after' } })
	            )
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Tile>\n<Chart type=\"...\" threshold={3} legend={{position: after}} units=\"TB\"\n" + " xAxis={" + stringify(seriesXAxis) + "}\n" + " series={" + stringify(series) + "} />\n</Tile>"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Small, Loading'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Chart, { series: [], min: 0, threshold: 3, type: 'bar', legend: {},
	            xAxis: [],
	            units: 'TB', small: true })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Chart type=\"bar\" small={true} threshold={3}\n" + " legend={{}} units=\"TB\"\n xAxis={[]}\n" + " series={[]} />"
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = ChartDoc;

/***/ },
/* 159 */
/***/ function(module, exports) {

	// Copyright 2014 Simon Lydell
	// X11 (“MIT”) Licensed. (See LICENSE.)

	"use strict";

	function stringify(obj, options) {
	  options = options || {};
	  var indent = JSON.stringify([1], null, get(options, "indent", 2)).slice(2, -3);
	  var maxLength = indent === "" ? Infinity : get(options, "maxLength", 80);

	  return (function _stringify(obj, currentIndent, reserved) {
	    if (obj && typeof obj.toJSON === "function") {
	      obj = obj.toJSON();
	    }

	    var string = JSON.stringify(obj);

	    if (string === undefined) {
	      return string;
	    }

	    var length = maxLength - currentIndent.length - reserved;

	    if (string.length <= length) {
	      var prettified = prettify(string);
	      if (prettified.length <= length) {
	        return prettified;
	      }
	    }

	    if (typeof obj === "object" && obj !== null) {
	      var nextIndent = currentIndent + indent;
	      var items = [];
	      var delimiters;
	      var comma = function comma(array, index) {
	        return index === array.length - 1 ? 0 : 1;
	      };

	      if (Array.isArray(obj)) {
	        for (var index = 0; index < obj.length; index++) {
	          items.push(_stringify(obj[index], nextIndent, comma(obj, index)) || "null");
	        }
	        delimiters = "[]";
	      } else {
	        Object.keys(obj).forEach(function (key, index, array) {
	          var keyPart = JSON.stringify(key) + ": ";
	          var value = _stringify(obj[key], nextIndent, keyPart.length + comma(array, index));
	          if (value !== undefined) {
	            items.push(keyPart + value);
	          }
	        });
	        delimiters = "{}";
	      }

	      if (items.length > 0) {
	        return [delimiters[0], indent + items.join(",\n" + nextIndent), delimiters[1]].join("\n" + currentIndent);
	      }
	    }

	    return string;
	  })(obj, "", 0);
	}

	// Note: This regex matches even invalid JSON strings, but since we’re
	// working on the output of `JSON.stringify` we know that only valid strings
	// are present (unless the user supplied a weird `options.indent` but in
	// that case we don’t care since the output would be invalid anyway).
	var stringOrChar = /("(?:[^"]|\\.)*")|[:,]/g;

	function prettify(string) {
	  return string.replace(stringOrChar, function (match, string) {
	    if (string) {
	      return match;
	    }
	    return match + " ";
	  });
	}

	function get(options, name, defaultValue) {
	  return name in options ? options[name] : defaultValue;
	}

	module.exports = stringify;

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Legend = __webpack_require__(123);

	var CLASS_ROOT = "chart";

	var DEFAULT_WIDTH = 384;
	var DEFAULT_HEIGHT = 192;
	var XAXIS_HEIGHT = 24;
	var YAXIS_WIDTH = 12;
	var BAR_PADDING = 2;
	var MIN_LABEL_WIDTH = 48;
	var SPARKLINE_STEP_WIDTH = 6;
	var SPARKLINE_BAR_PADDING = 1;
	var POINT_RADIUS = 6;

	var Chart = React.createClass({
	  displayName: 'Chart',

	  propTypes: {
	    important: React.PropTypes.number,
	    large: React.PropTypes.bool,
	    legend: React.PropTypes.shape({
	      position: React.PropTypes.oneOf(['over', 'after']),
	      total: React.PropTypes.bool
	    }),
	    max: React.PropTypes.number,
	    min: React.PropTypes.number,
	    points: React.PropTypes.bool,
	    series: React.PropTypes.arrayOf(React.PropTypes.shape({
	      label: React.PropTypes.string,
	      values: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.object // Date
	      ]))).isRequired,
	      colorIndex: React.PropTypes.string
	    })).isRequired,
	    size: React.PropTypes.oneOf(['small', 'medium', 'large']),
	    small: React.PropTypes.bool,
	    smooth: React.PropTypes.bool,
	    sparkline: React.PropTypes.bool,
	    threshold: React.PropTypes.number,
	    thresholds: React.PropTypes.arrayOf(React.PropTypes.shape({
	      label: React.PropTypes.string,
	      value: React.PropTypes.number.isRequired,
	      colorIndex: React.PropTypes.string
	    })),
	    type: React.PropTypes.oneOf(['line', 'bar', 'area']),
	    units: React.PropTypes.string,
	    xAxis: React.PropTypes.oneOfType(React.PropTypes.arrayOf(React.PropTypes.shape({
	      value: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.object // Date
	      ]).isRequired,
	      label: React.PropTypes.string.isRequired
	    })), React.PropTypes.shape({
	      placement: React.PropTypes.oneOf(['top', 'bottom']),
	      data: React.PropTypes.arrayOf(React.PropTypes.shape({
	        value: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.object // Date
	        ]).isRequired,
	        label: React.PropTypes.string.isRequired
	      }).isRequired)
	    }))
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      min: 0,
	      type: 'line'
	    };
	  },

	  getInitialState: function getInitialState() {
	    return this._stateFromProps(this.props, DEFAULT_WIDTH, DEFAULT_HEIGHT);
	  },

	  componentDidMount: function componentDidMount() {
	    window.addEventListener('resize', this._onResize);
	    this._onResize();
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
	    var state = this._stateFromProps(newProps, this.state.width, this.state.height);
	    this.setState(state);
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    this._layout();
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    clearTimeout(this._resizeTimer);
	    window.removeEventListener('resize', this._onResize);
	  },

	  _onMouseOver: function _onMouseOver(xIndex) {
	    this.setState({ activeXIndex: xIndex });
	  },

	  _onMouseOut: function _onMouseOut() {
	    this.setState({ activeXIndex: this.state.defaultXIndex });
	  },

	  _onResize: function _onResize() {
	    // debounce
	    clearTimeout(this._resizeTimer);
	    this._resizeTimer = setTimeout(this._layout, 50);
	  },

	  // Performs some initial calculations to make subsequent calculations easier.
	  _bounds: function _bounds(series, xAxisArg, width, height) {
	    // normalize xAxis
	    var xAxis;
	    if (xAxisArg) {
	      if (xAxisArg.data) {
	        xAxis = xAxisArg;
	      } else {
	        xAxis = {
	          data: xAxisArg,
	          placement: 'top'
	        };
	      }
	    } else {
	      xAxis = { data: [] };
	    }

	    // analyze series data
	    var minX = null;
	    var maxX = null;
	    var minY = null;
	    var maxY = null;

	    series.forEach(function (item) {
	      item.values.forEach(function (value, xIndex) {
	        var x = value[0];
	        var y = value[1];

	        if (null === minX) {
	          minX = x;
	          maxX = x;
	          minY = y;
	          maxY = y;
	        } else {
	          minX = Math.min(minX, x);
	          maxX = Math.max(maxX, x);
	          minY = Math.min(minY, y);
	          maxY = Math.max(maxY, y);
	        }
	        if (xIndex >= xAxis.data.length) {
	          xAxis.data.push({ value: x, label: '' });
	        }
	      });
	    });

	    if (null === minX) {
	      minX = 0;
	      maxX = 1;
	      minY = 0;
	      maxY = 100;
	    }

	    if ('bar' === this.props.type) {
	      xAxis.data.forEach(function (obj, xIndex) {
	        var sumY = 0;
	        series.forEach(function (item) {
	          sumY += item.values[xIndex][1];
	        });
	        maxY = Math.max(maxY, sumY);
	      });
	    }

	    if (this.props.threshold) {
	      minY = Math.min(minY, this.props.threshold);
	      maxY = Math.max(maxY, this.props.threshold);
	    }
	    if (this.props.thresholds) {
	      this.props.thresholds.forEach(function (obj) {
	        maxY = Math.max(maxY, obj.value);
	      });
	    }
	    if (this.props.hasOwnProperty('min')) {
	      minY = this.props.min;
	    }
	    if (this.props.hasOwnProperty('max')) {
	      maxY = this.props.max;
	    }
	    var spanX = maxX - minX;
	    var spanY = maxY - minY;

	    if (this.props.sparkline) {
	      width = spanX * (SPARKLINE_STEP_WIDTH + SPARKLINE_BAR_PADDING);
	    }

	    var graphWidth = width;
	    var graphHeight = height;
	    if (this.props.thresholds) {
	      graphWidth -= YAXIS_WIDTH;
	    }
	    if (xAxis.placement) {
	      graphHeight -= XAXIS_HEIGHT;
	    }
	    var graphTop = 'top' === xAxis.placement ? XAXIS_HEIGHT : 0;
	    // graphBottom is the bottom graph Y value
	    var graphBottom = 'bottom' === xAxis.placement ? height - XAXIS_HEIGHT : height;

	    var graphLeft = 0;
	    var graphRight = graphWidth;
	    if (this.props.points) {
	      graphLeft += POINT_RADIUS + 2;
	      graphRight -= POINT_RADIUS + 2;
	    }

	    var scaleX = graphWidth / spanX;
	    var xStepWidth = Math.round(graphWidth / (xAxis.data.length - 1));
	    if ('bar' === this.props.type) {
	      // allow room for bar width for last bar
	      scaleX = graphWidth / (spanX + spanX / (xAxis.data.length - 1));
	      xStepWidth = Math.round(graphWidth / xAxis.data.length);
	    }
	    var scaleY = graphHeight / spanY;
	    var barPadding = Math.max(BAR_PADDING, Math.round(xStepWidth / 8));
	    if (this.props.sparkline) {
	      xStepWidth = SPARKLINE_STEP_WIDTH;
	      barPadding = SPARKLINE_BAR_PADDING;
	    }

	    var result = {
	      minX: minX,
	      maxX: maxX,
	      minY: minY,
	      maxY: maxY,
	      spanX: spanX,
	      spanY: spanY,
	      scaleX: scaleX,
	      scaleY: scaleY,
	      graphWidth: graphWidth,
	      graphHeight: graphHeight,
	      graphTop: graphTop,
	      graphBottom: graphBottom,
	      graphLeft: graphLeft,
	      graphRight: graphRight,
	      xStepWidth: xStepWidth,
	      barPadding: barPadding,
	      xAxis: xAxis
	    };

	    return result;
	  },

	  // Aligns the legend with the current position of the cursor, if any.
	  _alignLegend: function _alignLegend() {
	    if (this.state.activeXIndex >= 0 && this.refs.cursor) {
	      var bounds = this.state.bounds;
	      var cursorElement = this.refs.cursor.getDOMNode();
	      var cursorRect = cursorElement.getBoundingClientRect();
	      var element = this.refs.chart.getDOMNode();
	      var rect = element.getBoundingClientRect();
	      var legendElement = this.refs.legend.getDOMNode();
	      var legendRect = legendElement.getBoundingClientRect();

	      var left = cursorRect.left - rect.left - legendRect.width - 1;
	      // if the legend would be outside the graphic, orient it to the right.
	      if (left < 0) {
	        left += legendRect.width + 2;
	      }

	      legendElement.style.left = '' + left + 'px ';
	      legendElement.style.top = '' + bounds.graphTop + 'px ';
	    }
	  },

	  // Adjusts the legend position and set the width, height, and
	  // redo the bounds calculations.
	  // Called whenever the browser resizes or new properties arrive.
	  _layout: function _layout() {
	    if (this.props.legend && 'below' !== this.props.legend.position) {
	      this._alignLegend();
	    }
	    var element = this.refs.chart.getDOMNode();
	    var rect = element.getBoundingClientRect();
	    if (rect.width !== this.state.width || rect.height !== this.state.height) {
	      var bounds = this._bounds(this.props.series, this.props.xAxis, rect.width, rect.height);
	      var width = rect.width;
	      if (this.props.sparkline) {
	        width = bounds.graphWidth;
	      }
	      this.setState({
	        width: width,
	        height: rect.height,
	        bounds: bounds
	      });
	    }
	  },

	  // Generates state based on the provided props.
	  _stateFromProps: function _stateFromProps(props, width, height) {
	    var bounds = this._bounds(props.series, props.xAxis, width, height);
	    var defaultXIndex = -1;
	    if (props.series && props.series.length > 0) {
	      defaultXIndex = 0;
	    }
	    if (props.hasOwnProperty('important')) {
	      defaultXIndex = props.important;
	    }
	    var activeXIndex = defaultXIndex;
	    if (this.state && this.state.activeXIndex >= 0) {
	      activeXIndex = this.state.activeXIndex;
	    }
	    // normalize size
	    var size = props.size || (props.small ? 'small' : props.large ? 'large' : null);
	    return {
	      bounds: bounds,
	      defaultXIndex: defaultXIndex,
	      activeXIndex: activeXIndex,
	      width: width,
	      height: height,
	      size: size
	    };
	  },

	  // Translates X value to X coordinate.
	  _translateX: function _translateX(x) {
	    var bounds = this.state.bounds;
	    return Math.max(bounds.graphLeft, Math.min(bounds.graphRight, Math.round((x - bounds.minX) * bounds.scaleX)));
	  },

	  // Translates Y value to Y coordinate.
	  _translateY: function _translateY(y) {
	    var bounds = this.state.bounds;
	    // leave room for line width since strokes are aligned to the center
	    return Math.max(1, bounds.graphBottom - Math.max(1, this._translateHeight(y)));
	  },

	  // Translates Y value to graph height.
	  _translateHeight: function _translateHeight(y) {
	    var bounds = this.state.bounds;
	    return Math.round((y - bounds.minY) * bounds.scaleY);
	  },

	  // Translates X and Y values to X and Y coordinates.
	  _coordinates: function _coordinates(point) {
	    return [this._translateX(point[0]), this._translateY(point[1])];
	  },

	  // Uses the provided colorIndex or provides one based on the seriesIndex.
	  _itemColorIndex: function _itemColorIndex(item, seriesIndex) {
	    return item.colorIndex || 'graph-' + (seriesIndex + 1);
	  },

	  // Determines what the appropriate control coordinates are on
	  // either side of the coordinate at the specified index.
	  // This calculation is a simplified smoothing function that
	  // just looks at whether the line through this coordinate is
	  // ascending, descending or not. Peaks, valleys, and flats are
	  // treated the same.
	  _controlCoordinates: function _controlCoordinates(coordinates, index) {
	    var current = coordinates[index];
	    // Use previous and next coordinates when available, otherwise use
	    // the current coordinate for them.
	    var previous = current;
	    if (index > 0) {
	      previous = coordinates[index - 1];
	    }
	    var next = current;
	    if (index < coordinates.length - 1) {
	      next = coordinates[index + 1];
	    }

	    // Put the control X coordinates midway between the coordinates.
	    var deltaX = (current[0] - previous[0]) / 2;
	    var deltaY;

	    // Start with a flat slope. This works for peaks, valleys, and flats.
	    var first = [current[0] - deltaX, current[1]];
	    var second = [current[0] + deltaX, current[1]];

	    if (previous[1] < current[1] && current[1] < next[1]) {
	      // Ascending, use the minimum positive slope.
	      deltaY = Math.min((current[1] - previous[1]) / 2, (next[1] - current[1]) / 2);
	      first[1] = current[1] - deltaY;
	      second[1] = current[1] + deltaY;
	    } else if (previous[1] > current[1] && current[1] > next[1]) {
	      // Descending, use the minimum negative slope.
	      deltaY = Math.min((previous[1] - current[1]) / 2, (current[1] - next[1]) / 2);
	      first[1] = current[1] + deltaY;
	      second[1] = current[1] - deltaY;
	    }
	    return [first, second];
	  },

	  // Converts the series data into paths for line or area types.
	  _renderLinesOrAreas: function _renderLinesOrAreas() {
	    var bounds = this.state.bounds;
	    var values = this.props.series.map(function (item, seriesIndex) {

	      // Get all coordinates up front so they are available
	      // if we are drawing a smooth chart.
	      var coordinates = item.values.map(function (value) {
	        return this._coordinates(value);
	      }, this);

	      var colorIndex = this._itemColorIndex(item, seriesIndex);
	      var commands = null;
	      var controlCoordinates = null;
	      var previousControlCoordinates = null;
	      var points = [];

	      // Build the commands for this set of coordinates.
	      coordinates.forEach(function (coordinate, index) {
	        if (this.props.smooth) {
	          controlCoordinates = this._controlCoordinates(coordinates, index);
	        }
	        if (0 === index) {
	          commands = "M" + coordinate.join(',');
	        } else {
	          if (this.props.smooth) {
	            // Use the previous right control coordinate and the current
	            // left control coordinate. We do this because we calculate
	            // the left and right sides for a particular index together,
	            // so the path is smooth but the SVG C command needs the
	            // right one from the previous index and the left one from
	            // the current index.
	            commands += " C" + previousControlCoordinates[1].join(',') + " " + controlCoordinates[0].join(',') + " " + coordinate.join(',');
	          } else {
	            commands += " L" + coordinate.join(',');
	          }
	        }

	        if (this.props.points && !this.props.sparkline) {
	          var x = Math.max(POINT_RADIUS + 1, Math.min(bounds.graphWidth - (POINT_RADIUS + 1), coordinate[0]));
	          points.push(React.createElement('circle', { className: CLASS_ROOT + "__values-point color-index-" + colorIndex,
	            cx: x, cy: coordinate[1], r: POINT_RADIUS }));
	        }

	        previousControlCoordinates = controlCoordinates;
	      }, this);

	      var linePath;
	      if ('line' === this.props.type || this.props.points) {
	        var classes = [CLASS_ROOT + "__values-line", "color-index-" + colorIndex];
	        linePath = React.createElement('path', { fill: 'none', className: classes.join(' '), d: commands });
	      }

	      var areaPath;
	      if ('area' === this.props.type) {
	        // For area charts, close the path by drawing down to the bottom
	        // and across to the bottom of where we started.
	        var close = 'L' + coordinates[coordinates.length - 1][0] + ',' + bounds.graphBottom + 'L' + coordinates[0][0] + ',' + bounds.graphBottom + 'Z';
	        var areaCommands = commands + close;
	        var classes = [CLASS_ROOT + "__values-area", "color-index-" + colorIndex];

	        areaPath = React.createElement('path', { stroke: 'none', className: classes.join(' '), d: areaCommands });
	      }

	      return React.createElement(
	        'g',
	        { key: seriesIndex },
	        areaPath,
	        linePath,
	        points
	      );
	    }, this);

	    return values;
	  },

	  // Converts the series data into rects for bar types.
	  _renderBars: function _renderBars() {
	    var bounds = this.state.bounds;

	    var values = bounds.xAxis.data.map(function (obj, xIndex) {
	      var baseY = bounds.minY;
	      var stepBars = this.props.series.map(function (item, seriesIndex) {

	        var colorIndex = item.colorIndex || 'graph-' + (seriesIndex + 1);
	        var value = item.values[xIndex];
	        var stepBarHeight = this._translateHeight(value[1]);
	        var stepBarBase = this._translateHeight(baseY);
	        baseY += value[1];

	        var classes = [CLASS_ROOT + "__values-bar", "color-index-" + colorIndex];
	        if (!this.props.legend || xIndex === this.state.activeXIndex) {
	          classes.push(CLASS_ROOT + "__values-bar--active");
	        }

	        return React.createElement('rect', { key: item.label || seriesIndex,
	          className: classes.join(' '),
	          x: this._translateX(value[0]) + bounds.barPadding,
	          y: this.state.height - (stepBarHeight + stepBarBase),
	          width: bounds.xStepWidth - 2 * bounds.barPadding,
	          height: stepBarHeight });
	      }, this);

	      return React.createElement(
	        'g',
	        { key: xIndex },
	        stepBars
	      );
	    }, this);

	    return values;
	  },

	  // Converts the threshold value into a line.
	  _renderThreshold: function _renderThreshold() {
	    var y = this._translateY(this.props.threshold);
	    var commands = 'M0,' + y + 'L' + this.state.width + ',' + y;
	    return React.createElement(
	      'g',
	      { className: CLASS_ROOT + "__threshold" },
	      React.createElement('path', { fill: 'none', d: commands })
	    );
	  },

	  _labelPosition: function _labelPosition(value, bounds) {
	    var x = this._translateX(value);
	    var startX = x;
	    var anchor;
	    if ('line' === this.props.type || 'area' === this.props.type) {
	      // Place the text in the middle for line and area type charts.
	      anchor = 'middle';
	      startX = x - MIN_LABEL_WIDTH / 2;
	    }
	    if (x <= 0) {
	      // This is the first data point, align the text to the left edge.
	      x = 0;
	      startX = x;
	      anchor = 'start';
	    }
	    if (x >= bounds.graphWidth - MIN_LABEL_WIDTH) {
	      // This is the last data point, align the text to the right edge.
	      x = bounds.graphWidth;
	      startX = x - MIN_LABEL_WIDTH;
	      anchor = 'end';
	    } else if ('bar' === this.props.type) {
	      x += bounds.barPadding;
	      startX = x;
	    }
	    return { x: x, anchor: anchor, startX: startX, endX: startX + MIN_LABEL_WIDTH };
	  },

	  _labelOverlaps: function _labelOverlaps(pos1, pos2) {
	    return pos1 && pos2 && pos1.endX > pos2.startX && pos1.startX < pos2.endX;
	  },

	  // Converts the xAxis labels into texts.
	  _renderXAxis: function _renderXAxis() {
	    var bounds = this.state.bounds;
	    var labelY;
	    if ('bottom' === bounds.xAxis.placement) {
	      labelY = this.state.height - Math.round(XAXIS_HEIGHT * 0.3);
	    } else {
	      labelY = Math.round(XAXIS_HEIGHT * 0.6);
	    }
	    var priorPosition = null;
	    var activePosition = null;
	    if (this.state.activeXIndex >= 0) {
	      activePosition = this._labelPosition(bounds.xAxis.data[this.state.activeXIndex].value, bounds);
	    }
	    var lastPosition = null;
	    if (bounds.xAxis.data.length > 0) {
	      lastPosition = this._labelPosition(bounds.xAxis.data[bounds.xAxis.data.length - 1].value, bounds);
	    }

	    var labels = bounds.xAxis.data.map(function (obj, xIndex) {
	      var classes = [CLASS_ROOT + "__xaxis-index"];
	      if (xIndex === this.state.activeXIndex) {
	        classes.push(CLASS_ROOT + "__xaxis-index--active");
	      }
	      var position = this._labelPosition(obj.value, bounds);

	      // Ensure we don't overlap labels. But, make sure we show the first and
	      // last ones.
	      if (this._labelOverlaps(position, activePosition) || xIndex !== 0 && xIndex !== bounds.xAxis.data.length - 1 && (this._labelOverlaps(position, priorPosition) || this._labelOverlaps(position, lastPosition))) {
	        classes.push(CLASS_ROOT + "__xaxis-index--eclipse");
	      } else {
	        priorPosition = position;
	      }

	      return React.createElement(
	        'g',
	        { key: xIndex, className: classes.join(' ') },
	        React.createElement(
	          'text',
	          { x: position.x, y: labelY,
	            textAnchor: position.anchor, fontSize: 16 },
	          obj.label
	        )
	      );
	    }, this);

	    return React.createElement(
	      'g',
	      { ref: 'xAxis', className: CLASS_ROOT + "__xaxis" },
	      labels
	    );
	  },

	  // Vertical bars for thresholds.
	  _renderYAxis: function _renderYAxis() {
	    var bounds = this.state.bounds;
	    var start = bounds.minY;
	    var end;
	    var width = Math.max(4, YAXIS_WIDTH / 2);

	    var bars = this.props.thresholds.map(function (item, index) {
	      var classes = [CLASS_ROOT + "__bar"];
	      classes.push("color-index-" + (item.colorIndex || 'graph-' + (index + 1)));
	      if (index < this.props.thresholds.length - 1) {
	        end = this.props.thresholds[index + 1].value;
	      } else {
	        end = bounds.maxY;
	      }
	      var height = this._translateHeight(end - start);
	      var y = this._translateY(end);
	      start = end;

	      return React.createElement('rect', { key: index,
	        className: classes.join(' '),
	        x: this.state.width - width,
	        y: y,
	        width: width,
	        height: height });
	    }, this);

	    return React.createElement(
	      'g',
	      { ref: 'yAxis', className: CLASS_ROOT + "__yaxis" },
	      bars
	    );
	  },

	  // Create vertical rects for each X data point.
	  // These are used to track the mouse hover.
	  _renderXBands: function _renderXBands(layer) {
	    var className = CLASS_ROOT + "__" + layer;
	    var bounds = this.state.bounds;

	    var bands = bounds.xAxis.data.map(function (obj, xIndex) {
	      var classes = [className + "-xband"];
	      if (xIndex === this.state.activeXIndex) {
	        classes.push(className + "-xband--active");
	      }

	      // For bar charts, the band is left aligned with the bars.
	      var x = this._translateX(obj.value);
	      if ('line' === this.props.type || 'area' === this.props.type) {
	        // For line and area charts, the band is centered.
	        x -= bounds.xStepWidth / 2;
	      }

	      var onMouseOver;
	      var onMouseOut;
	      if ('front' === layer) {
	        onMouseOver = this._onMouseOver.bind(this, xIndex);
	        onMouseOut = this._onMouseOut.bind(this, xIndex);
	      }

	      return React.createElement(
	        'g',
	        { key: xIndex, className: classes.join(' '),
	          onMouseOver: onMouseOver, onMouseOut: onMouseOut },
	        React.createElement('rect', { className: className + "-xband-background",
	          x: x, y: 0, width: bounds.xStepWidth, height: this.state.height })
	      );
	    }, this);

	    return React.createElement(
	      'g',
	      { ref: layer, className: className },
	      bands
	    );
	  },

	  // Converts the active X index to a line.
	  _renderCursor: function _renderCursor() {
	    var bounds = this.state.bounds;
	    var value = this.props.series[0].values[this.state.activeXIndex];
	    var coordinates = this._coordinates(value);
	    if ('bar' === this.props.type) {
	      coordinates[0] += this.state.bounds.barPadding;
	    }
	    // Offset it just a little if it is at an edge.
	    var x = Math.max(1, Math.min(coordinates[0], this.state.bounds.graphWidth - 1));
	    var line = React.createElement('line', { fill: 'none', x1: x, y1: bounds.graphTop, x2: x, y2: bounds.graphBottom });

	    var points;
	    if (this.props.points) {
	      // for area and line charts, include a dot at the intersection
	      if ('line' === this.props.type || 'area' === this.props.type) {
	        points = this.props.series.map(function (item, seriesIndex) {
	          value = item.values[this.state.activeXIndex];
	          coordinates = this._coordinates(value);
	          var colorIndex = this._itemColorIndex(item, seriesIndex);
	          return React.createElement('circle', { className: CLASS_ROOT + "__cursor-point color-index-" + colorIndex,
	            cx: x, cy: coordinates[1], r: Math.round(POINT_RADIUS * 1.2) });
	        }, this);
	      }
	    }

	    return React.createElement(
	      'g',
	      { ref: 'cursor', className: CLASS_ROOT + "__cursor" },
	      line,
	      points
	    );
	  },

	  // Builds a Legend appropriate for the currently active X index.
	  _renderLegend: function _renderLegend() {
	    var activeSeries = this.props.series.map(function (item) {
	      var datum = {
	        value: item.values[this.state.activeXIndex][1],
	        units: item.units
	      };
	      // only show label and swatch if we have more than one series
	      if (this.props.series.length > 1) {
	        datum.label = item.label;
	        datum.colorIndex = item.colorIndex;
	      }
	      return datum;
	    }, this);
	    var classes = [CLASS_ROOT + "__legend", CLASS_ROOT + "__legend--" + (this.props.legend.position || 'overlay')];

	    return React.createElement(Legend, { ref: 'legend', className: classes.join(' '),
	      series: activeSeries,
	      total: this.props.legend.total,
	      units: this.props.units });
	  },

	  render: function render() {
	    var classes = [CLASS_ROOT];
	    classes.push(CLASS_ROOT + "--" + this.props.type);
	    if (this.state.size) {
	      classes.push(CLASS_ROOT + "--" + this.state.size);
	    }
	    if (this.props.sparkline) {
	      classes.push(CLASS_ROOT + "--sparkline");
	    }

	    var values = [];
	    if ('line' === this.props.type || 'area' === this.props.type) {
	      values = this._renderLinesOrAreas();
	    } else if ('bar' === this.props.type) {
	      values = this._renderBars();
	    }

	    if (values.length === 0) {
	      classes.push(CLASS_ROOT + "--loading");
	      var valueClasses = [CLASS_ROOT + "__values"];
	      valueClasses.push(CLASS_ROOT + "__values--loading");
	      valueClasses.push("color-index-loading");
	      var commands = "M0," + this.state.height / 2 + " L" + this.state.width + "," + this.state.height / 2;
	      values.push(React.createElement(
	        'g',
	        { key: 'loading' },
	        React.createElement('path', { stroke: 'none', className: valueClasses.join(' '), d: commands })
	      ));
	    }

	    var threshold = null;
	    if (this.props.threshold) {
	      threshold = this._renderThreshold();
	    }

	    var cursor = null;
	    var legend = null;
	    if (this.props.legend && this.state.activeXIndex >= 0 && this.props.series[0].values.length > 0) {
	      cursor = this._renderCursor();
	      legend = this._renderLegend();
	    }

	    var xAxis = null;
	    if (this.props.xAxis) {
	      xAxis = this._renderXAxis();
	    }

	    var yAxis = null;
	    if (this.props.thresholds) {
	      yAxis = this._renderYAxis();
	    }

	    var frontBands = null;
	    if (this.props.legend) {
	      frontBands = this._renderXBands('front');
	    }

	    return React.createElement(
	      'div',
	      { className: classes.join(' ') },
	      React.createElement(
	        'svg',
	        { ref: 'chart', className: CLASS_ROOT + "__graphic",
	          viewBox: "0 0 " + this.state.width + " " + this.state.height,
	          preserveAspectRatio: 'none' },
	        xAxis,
	        yAxis,
	        React.createElement(
	          'g',
	          { className: CLASS_ROOT + "__values" },
	          values
	        ),
	        frontBands,
	        threshold,
	        cursor
	      ),
	      legend
	    );
	  }

	});

	module.exports = Chart;

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Article = __webpack_require__(65);
	var CheckBox = __webpack_require__(121);

	var CheckBoxDoc = React.createClass({
	  displayName: 'CheckBoxDoc',

	  getInitialState: function getInitialState() {
	    return { checked: false };
	  },

	  _onChange: function _onChange() {
	    this.setState({ checked: !this.state.checked });
	  },

	  render: function render() {
	    var inline = ["<CheckBox id=\"item2\" label=\"Item 1\">"].join("\n");
	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'CheckBox'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'A check box in a web form. We have a separate component from the browser base so we can style it.'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            inline
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Options'
	        ),
	        React.createElement(
	          'dl',
	          null,
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'checked         true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Same as React ',
	            "<input checked= >",
	            '.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'defaultChecked  true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Same as React ',
	            "<input defaultChecked= >",
	            '.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'disabled        true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Same as React ',
	            "<input disabled= >",
	            '. Also adds a hidden input element with the same name so form submissions work.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'id              ',
	              "{text}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'The DOM id attribute value to use for the underlying',
	            "<input>",
	            ' element.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'label           ',
	              "{text}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Label text to place next to the control.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'name            ',
	              "{text}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'The DOM name attribute value to use for the underlying',
	            "<input>",
	            ' element.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'onChange        ',
	              "{func}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Same as React ',
	            "<input onChange= >",
	            '.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'toggle         true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether to visualize it as a toggle switch.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'ariaDescribedby ',
	              "{text}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Optional attribute to enhance accessibility in case the checkbox is used inside a context.'
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Example'
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Basic'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(CheckBox, { id: 'item2', name: 'item2', label: 'Item 2',
	            checked: this.state.checked, onChange: this._onChange })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<CheckBox id=\"item2\" name=\"item2\" label=\"Item 2\" />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Toggle'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(CheckBox, { id: 'item3', name: 'item3', label: 'Item 3', toggle: true })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<CheckBox id=\"item3\" name=\"item3\" label=\"Item 3\" toggle={true} />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Disabled'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(CheckBox, { id: 'item4', name: 'item4', label: 'Item 4', disabled: true, checked: this.state.checked })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<CheckBox id=\"item4\" name=\"item4\" label=\"Item 4\" disabled=\{true\} />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Disabled Toggle'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(CheckBox, { id: 'item5', name: 'item5', label: 'Item 5', toggle: true,
	            disabled: true, checked: this.state.checked })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<CheckBox id=\"item5\" name=\"item5\" label=\"Item 5\" toggle={true} disabled={true} />"
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = CheckBoxDoc;

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Article = __webpack_require__(65);
	var Title = __webpack_require__(70);
	var Header = __webpack_require__(69);
	var Search = __webpack_require__(124);
	var Gravatar = __webpack_require__(126);
	var Tiles = __webpack_require__(75);
	var Tile = __webpack_require__(80);
	var Chart = __webpack_require__(160);
	var Meter = __webpack_require__(122);

	var dateSeries = [{ label: 'first', values: [[new Date(Date.parse("2015-05-22")), 4], [new Date(Date.parse("2015-05-21")), 2], [new Date(Date.parse("2015-05-20")), 3], [new Date(Date.parse("2015-05-19")), 3], [new Date(Date.parse("2015-05-18")), 2]], colorIndex: "graph-4" }];
	var dateSeriesXAxis = [{ label: 'May 22', value: dateSeries[0].values[0][0] }, { label: 'May 21', value: dateSeries[0].values[1][0] }, { label: 'May 20', value: dateSeries[0].values[2][0] }, { label: 'May 19', value: dateSeries[0].values[3][0] }, { label: 'May 18', value: dateSeries[0].values[4][0] }];

	var DashboardDoc = React.createClass({
	  displayName: 'DashboardDoc',

	  render: function render() {
	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Dashboard'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'The dashboard shows the most important information in the simplest way possible. Content on the dashboard provides direct navigation to further detail.'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Typically it is the initial content shown after logging in. And, because the content is navigable, the dashboard functions well as a home page.'
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Example'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Header,
	            null,
	            React.createElement(
	              'span',
	              null,
	              React.createElement(
	                Title,
	                null,
	                React.createElement(
	                  'span',
	                  null,
	                  'App'
	                )
	              ),
	              React.createElement(Search, { inline: true })
	            ),
	            React.createElement(Gravatar, { email: '', 'default': 'mm' })
	          ),
	          React.createElement(
	            Tiles,
	            { fill: true, flush: false },
	            React.createElement(
	              Tile,
	              { wide: true },
	              React.createElement(Chart, { series: dateSeries, min: 0, max: 5, threshold: 2,
	                type: 'area', smooth: true, legend: true, small: true,
	                xAxis: dateSeriesXAxis })
	            ),
	            React.createElement(
	              Tile,
	              null,
	              React.createElement(
	                Header,
	                { small: true },
	                React.createElement(
	                  'h4',
	                  null,
	                  'Utilization'
	                )
	              ),
	              React.createElement(Meter, { value: 40, type: 'arc', units: 'TB' })
	            ),
	            React.createElement(
	              Tile,
	              null,
	              React.createElement(
	                Header,
	                { small: true },
	                React.createElement(
	                  'h4',
	                  null,
	                  'Throughput'
	                )
	              ),
	              React.createElement(Meter, { value: 80, type: 'arc', units: 'GB/s' })
	            )
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Details'
	        ),
	        React.createElement(
	          'div',
	          { className: 'tbd' },
	          'TBD'
	        )
	      )
	    );
	  }
	});

	module.exports = DashboardDoc;

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var stringify = __webpack_require__(159);
	var Article = __webpack_require__(65);
	var Distribution = __webpack_require__(164);

	var inline = "<Distribution series={[...]} />";

	var series = [{ label: 'First', value: 40 }, { label: 'Second', value: 30 }, { label: 'Third', value: 20 }, { label: 'Fourth', value: 10 }];

	var seriesEmpty = [{ label: 'First', value: 4 }, { label: 'Second', value: 3 }, { label: 'Third', value: 1 }, { label: 'Fourth', value: 0 }];

	var iconSeries = [{ label: 'Female', value: 60, icon: {
	    width: 36, height: 36,
	    svgElement: React.createElement(
	      'g',
	      { fill: 'none', strokeWidth: 1 },
	      React.createElement('path', { d: 'M20,36 L20,32' }),
	      React.createElement('path', { d: 'M24,13 C21.2,13 19,15.2 19,18 C19,22 15.9,23.9 15.9,23.9 C15.9,23.9 16.6,26 20,26 L21,26 C18.2,26 16,28.2 16,31 L16,36' }),
	      React.createElement('path', { d: 'M28,32 L28,36' }),
	      React.createElement('path', { d: 'M32,36 L32,31 C32,28.2 29.9,26 27.1,26 L27,26 C30.4,26 32.1,23.9 32.1,23.9 C32.1,23.9 29,22 29,18 C29,15.2 26.7,13 24,13' })
	    ) }
	}, { label: 'Male', value: 40, icon: {
	    width: 36, height: 36,
	    svgElement: React.createElement(
	      'g',
	      { fill: 'none', strokeWidth: 1 },
	      React.createElement('circle', { cx: '24', cy: '18', r: '5' }),
	      React.createElement('path', { d: 'M33,36 L33,31 C33,26.6 29.4,23 25,23 L23,23 C18.6,23 15,26.6 15,31 L15,36' }),
	      React.createElement('path', { d: 'M20,36 L20,31' }),
	      React.createElement('path', { d: 'M28,36 L28,31' })
	    ) }
	}];
	var iconSeriesDoc = iconSeries.map(function (item) {
	  return {
	    label: item.label,
	    value: item.value,
	    icon: {
	      width: item.icon.width,
	      height: item.icon.height,
	      svgElement: "<JSX SVG element>"
	    }
	  };
	});

	var DistributionDoc = React.createClass({
	  displayName: 'DistributionDoc',

	  render: function render() {
	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Distribution'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Shows a graphic of relatively sized items.'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            inline
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Options'
	        ),
	        React.createElement(
	          'dl',
	          null,
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'large       true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Larger sized version. Deprecated, use ',
	            React.createElement(
	              'code',
	              null,
	              'size'
	            ),
	            '.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'legend      true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether to show a legend.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'legendTotal true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether to show a total in the legend.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'series     ',
	              "[{value: , label: , colorIndex: , onClick: , icon: }, ...]"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'An array of objects describing the data.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'size         small|medium|large'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'The height of the Distribution. Defaults to ',
	            React.createElement(
	              'code',
	              null,
	              'medium'
	            ),
	            '.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'small        true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Smaller sized version. Deprecated, use ',
	            React.createElement(
	              'code',
	              null,
	              'size'
	            ),
	            '.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'units       ',
	              "{string}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Optional units to display next to the value label.'
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Examples'
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Basic'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Distribution, { series: series })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Distribution\n " + "series={" + stringify(series, null, '  ') + "}  />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Legend'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Distribution, { legend: true, series: series })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Distribution legend={true}\n " + "series={" + stringify(series, null, '  ') + "}  />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Small'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Distribution, { small: true, series: series })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Distribution small={true}\n " + "series={" + stringify(series, null, '  ') + "}  />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Large'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Distribution, { large: true, series: series })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Distribution large={true}\n " + "series={" + stringify(series, null, '  ') + "}  />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Empty series'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Distribution, { series: seriesEmpty })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Distribution large={true}\n " + "series={" + stringify(seriesEmpty, null, '  ') + "}  />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Icon'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Distribution, { series: iconSeries, units: '%' })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Distribution\n " + "series={" + stringify(iconSeriesDoc, null, '  ') + "}  />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Loading'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Distribution, null)
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Distribution />"
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = DistributionDoc;

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Legend = __webpack_require__(123);

	var CLASS_ROOT = "distribution";

	var DEFAULT_WIDTH = 400;
	var DEFAULT_HEIGHT = 200;

	var Distribution = React.createClass({
	  displayName: 'Distribution',

	  propTypes: {
	    large: React.PropTypes.bool,
	    legend: React.PropTypes.bool,
	    legendTotal: React.PropTypes.bool,
	    series: React.PropTypes.arrayOf(React.PropTypes.shape({
	      label: React.PropTypes.string,
	      value: React.PropTypes.number.isRequired,
	      colorIndex: React.PropTypes.string,
	      important: React.PropTypes.bool,
	      onClick: React.PropTypes.func,
	      icon: {
	        width: React.PropTypes.number,
	        height: React.PropTypes.number,
	        svgElement: React.PropTypes.node
	      }
	    })),
	    size: React.PropTypes.oneOf(['small', 'medium', 'large']),
	    small: React.PropTypes.bool,
	    units: React.PropTypes.string,
	    vertical: React.PropTypes.bool
	  },

	  getInitialState: function getInitialState() {
	    var state = this._stateFromProps(this.props);
	    state.legendPosition = 'bottom';
	    state.width = DEFAULT_WIDTH;
	    state.height = DEFAULT_HEIGHT;
	    return state;
	  },

	  componentDidMount: function componentDidMount() {
	    this._initialTimer = setTimeout(this._initialTimeout, 10);
	    window.addEventListener('resize', this._onResize);
	    this._onResize();
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
	    var state = this._stateFromProps(newProps);
	    state.width = this.state.width;
	    state.height = this.state.height;
	    this.setState(state);
	    this._onResize();
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    clearTimeout(this._resizeTimer);
	    window.removeEventListener('resize', this._onResize);
	  },

	  _onResize: function _onResize() {
	    // debounce
	    clearTimeout(this._resizeTimer);
	    this._resizeTimer = setTimeout(this._layout, 50);
	  },

	  _layout: function _layout() {
	    // legendPosition based on available window orientation
	    var ratio = window.innerWidth / window.innerHeight;
	    if (ratio < 0.8) {
	      this.setState({ legendPosition: 'bottom' });
	    } else if (ratio > 1.2) {
	      this.setState({ legendPosition: 'right' });
	    }

	    var graphic = this.refs.graphic.getDOMNode();
	    var rect = graphic.getBoundingClientRect();
	    if (rect.width !== this.state.width || rect.height !== this.state.height) {
	      this.setState({
	        width: rect.width,
	        height: rect.height
	      });
	    }

	    // adjust box label positions
	    var container = this.refs.container.getDOMNode();
	    var labels = container.querySelectorAll('.distribution__label');
	    for (var i = 0; i < labels.length; i += 1) {
	      var label = labels[i];
	      label.style.top = null;
	      label.style.left = null;
	      var boxIndex = label.getAttribute('data-box-index');
	      var box = container.querySelectorAll('[data-index="' + boxIndex + '"]')[0];
	      var boxRect = box.getBoundingClientRect();
	      var labelRect = label.getBoundingClientRect();
	      label.style.top = boxRect.top - rect.top + boxRect.height / 2 - labelRect.height / 2 + 'px';
	      label.style.left = boxRect.left - rect.left + boxRect.width / 2 - labelRect.width / 2 + 'px';
	    }
	  },

	  _seriesTotal: function _seriesTotal(series) {
	    var total = 0;
	    series.some(function (item) {
	      total += item.value;
	    });
	    return total;
	  },

	  // Generates state based on the provided props.
	  _stateFromProps: function _stateFromProps(props) {
	    var total;
	    if (props.series) {
	      total = this._seriesTotal(props.series);
	    } else {
	      total = 100;
	    }

	    // normalize size
	    var size = props.size || (props.small ? 'small' : props.large ? 'large' : null);

	    var state = {
	      total: total,
	      size: size
	    };

	    return state;
	  },

	  _itemColorIndex: function _itemColorIndex(item, index) {
	    return item.colorIndex || 'graph-' + (index + 1);
	  },

	  _renderLegend: function _renderLegend() {
	    return React.createElement(Legend, { className: CLASS_ROOT + "__legend",
	      series: this.props.series,
	      units: this.props.units,
	      activeIndex: this.state.activeIndex,
	      onActive: this._onActive });
	  },

	  render: function render() {
	    var classes = [CLASS_ROOT];
	    classes.push(CLASS_ROOT + "--legend-" + this.state.legendPosition);
	    if (this.state.size) {
	      classes.push(CLASS_ROOT + "--" + this.state.size);
	    }
	    if (this.props.vertical) {
	      classes.push(CLASS_ROOT + "--vertical");
	    }
	    if (!this.props.series || this.props.series.length === 0) {
	      classes.push(CLASS_ROOT + "--loading");
	    }
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }

	    var legend = null;
	    if (this.props.legend) {
	      legend = this._renderLegend();
	    }

	    var boxes = [];
	    var labels = [];
	    if (this.props.series) {
	      var areaPer = this.state.width * this.state.height / this.state.total;
	      var origin = [0, 0];
	      var across = false;
	      boxes = this.props.series.filter(function (item) {
	        return item.value > 0;
	      }).map(function (item, index) {
	        var boxClasses = [CLASS_ROOT + "__box"];
	        var iconClasses = [CLASS_ROOT + "__icons"];
	        var labelClasses = [CLASS_ROOT + "__label"];
	        var colorIndex = this._itemColorIndex(item, index);
	        boxClasses.push("color-index-" + colorIndex);
	        iconClasses.push("color-index-" + colorIndex);
	        var x = origin[0];
	        var y = origin[1];
	        var width, height;
	        if (across) {
	          width = this.state.width - x;
	          height = areaPer * item.value / width;
	          across = false;
	          origin[1] += height;
	        } else {
	          height = this.state.height - y;
	          width = areaPer * item.value / height;
	          across = true;
	          origin[0] += width;
	        }

	        var text = '' + item.value;
	        if (this.props.units) {
	          text += ' ' + this.props.units;
	        }
	        if (item.label) {
	          text += ' ' + item.label;
	        }

	        var contents;
	        if (item.icon) {
	          labelClasses.push(CLASS_ROOT + "__label--icons");
	          var icons = [];
	          // fill box with icons
	          var iconX = 0;
	          var iconY = 0;
	          var iconIndex = 1;
	          while (iconY < height - item.icon.height) {
	            while (iconX < width - item.icon.width) {
	              icons.push(React.createElement(
	                'g',
	                { key: iconIndex,
	                  transform: "translate(" + (x + iconX) + "," + (y + iconY) + ")" },
	                item.icon.svgElement
	              ));
	              iconX += item.icon.width;
	              iconIndex += 1;
	            }
	            iconY += item.icon.height;
	            iconX = 0;
	          }
	          contents = React.createElement(
	            'g',
	            { className: iconClasses.join(' ') },
	            icons
	          );
	        } else {
	          contents = React.createElement('rect', { className: boxClasses.join(' '), x: x, y: y, width: width, height: height });
	        }

	        if (width < 144 || height < 144) {
	          labelClasses.push(CLASS_ROOT + "__label--small");
	        }

	        labels.push(React.createElement(
	          'div',
	          { key: index, className: labelClasses.join(' '), 'data-box-index': index },
	          React.createElement(
	            'span',
	            { className: CLASS_ROOT + "__label-value" },
	            item.value,
	            React.createElement(
	              'span',
	              { className: CLASS_ROOT + "__label-units" },
	              this.props.units
	            )
	          ),
	          React.createElement(
	            'span',
	            { className: CLASS_ROOT + "__label-label", y: 24 },
	            item.label
	          )
	        ));

	        return React.createElement(
	          'g',
	          { key: index, 'data-index': index },
	          contents
	        );
	      }, this);
	    }

	    if (boxes.length === 0) {
	      classes.push(CLASS_ROOT + "--loading");
	      var loadingClasses = [CLASS_ROOT + "__loading-indicator"];
	      loadingClasses.push("color-index-loading");
	      var commands = "M0," + this.state.height / 2 + " L" + this.state.width + "," + this.state.height / 2;
	      boxes.push(React.createElement(
	        'g',
	        { key: 'loading' },
	        React.createElement('path', { stroke: 'none', className: loadingClasses.join(' '), d: commands })
	      ));
	    }

	    return React.createElement(
	      'div',
	      { ref: 'container', className: classes.join(' ') },
	      React.createElement(
	        'svg',
	        { ref: 'graphic', className: CLASS_ROOT + "__graphic",
	          viewBox: "0 0 " + this.state.width + " " + this.state.height,
	          preserveAspectRatio: 'none' },
	        boxes
	      ),
	      labels,
	      legend
	    );
	  }

	});

	module.exports = Distribution;

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Article = __webpack_require__(65);
	var GrommetDocument = __webpack_require__(166);

	var DocumentDoc = React.createClass({
	  displayName: 'DocumentDoc',

	  render: function render() {
	    var inline = ["<Document>", "  <header>", "    <h1>{title}</h1>", "    <p>{description}</p>", "  </header>", "  <section>", "    <h2>{header}</h2>", "    <p>{content}</p>", "  </section>", "</Document>"].join('\n');

	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Document'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'NOTE: This component is deprecated and will be removed soon. It has been superseded by the Article component.'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Styles standard HTML5 markup for use in documentation.'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            inline
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Example'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            GrommetDocument,
	            null,
	            React.createElement(
	              'header',
	              null,
	              React.createElement(
	                'h1',
	                null,
	                'Title'
	              ),
	              React.createElement(
	                'p',
	                null,
	                'Lorem ipsum ...'
	              )
	            ),
	            React.createElement(
	              'section',
	              null,
	              React.createElement(
	                'h2',
	                null,
	                'Header'
	              ),
	              React.createElement(
	                'p',
	                null,
	                'Lorem ipsum ...'
	              )
	            )
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = DocumentDoc;

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var KeyboardAccelerators = __webpack_require__(16);
	var DOM = __webpack_require__(57);

	var CLASS_ROOT = "document";
	var SCROLL_STEPS = 25;

	var GrommetDocument = React.createClass({
	  displayName: 'GrommetDocument',

	  propTypes: {
	    flush: React.PropTypes.bool,
	    full: React.PropTypes.bool
	  },

	  mixins: [KeyboardAccelerators],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      flush: true
	    };
	  },

	  getInitialState: function getInitialState() {
	    return { scrollTop: 0 };
	  },

	  componentDidMount: function componentDidMount() {
	    console.warn('Warning: Grommet Document is deprecated. It has been superceded by Grommet Article.');
	    if (this.props.full) {
	      this._markInactive();
	      var doc = this.refs.document.getDOMNode();
	      this._scrollParent = DOM.findScrollParents(doc)[0];
	      document.addEventListener('wheel', this._onWheel);
	      this._scrollParent.addEventListener('scroll', this._onScroll);
	      this.startListeningToKeyboard({
	        up: this._onUp,
	        down: this._onDown
	      });
	    }
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    if (this.props.full) {
	      document.removeEventListener('wheel', this._onWheel);
	      clearInterval(this._scrollToTimer);
	      this._scrollParent.removeEventListener('scroll', this._onScroll);
	      clearTimeout(this._scrollTimer);
	      this.stopListeningToKeyboard({
	        up: this._onUp,
	        down: this._onDown
	      });
	    }
	  },

	  _easeInOutQuad: function _easeInOutQuad(t) {
	    return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
	  },

	  _scrollTo: function _scrollTo(delta) {
	    clearInterval(this._scrollToTimer);
	    var start = this._scrollParent.scrollTop;
	    var position = start + delta;
	    var step = 1;
	    this._scrollToTimer = setInterval((function () {
	      var next;
	      var easing = this._easeInOutQuad(step / SCROLL_STEPS);
	      if (position > start) {
	        next = Math.min(position, Math.max(this._scrollParent.scrollTop, Math.round(start + (position - start) * easing)));
	      } else {
	        next = Math.max(position, Math.min(this._scrollParent.scrollTop, Math.round(start - (start - position) * easing)));
	      }
	      this._scrollParent.scrollTop = next;
	      step += 1;
	      if (step > SCROLL_STEPS) {
	        // we're done
	        clearInterval(this._scrollToTimer);
	      }
	    }).bind(this), 8);
	  },

	  _markInactive: function _markInactive() {
	    var doc = this.refs.document.getDOMNode();
	    var sections = doc.querySelectorAll('.section--full');
	    for (var i = 0; i < sections.length; i += 1) {
	      var section = sections[i];
	      var rect = section.getBoundingClientRect();
	      if (rect.top > window.innerHeight - 10) {
	        section.classList.add('section--inactive');
	      } else {
	        section.classList.remove('section--inactive');
	      }
	    }
	  },

	  _onScroll: function _onScroll(event) {
	    clearTimeout(this._scrollTimer);
	    this._scrollTimer = setTimeout(this._markInactive, 50);
	  },

	  _onWheel: function _onWheel(event) {
	    if (Math.abs(event.deltaY) > 100) {
	      clearInterval(this._scrollTimer);
	    } else if (event.deltaY > 5) {
	      this._onDown();
	    } else if (event.deltaY < -5) {
	      this._onUp();
	    }
	  },

	  _onDown: function _onDown(event) {
	    if (event) {
	      event.preventDefault();
	    }
	    var doc = this.refs.document.getDOMNode();
	    var sections = doc.querySelectorAll('.section--full');
	    for (var i = 0; i < sections.length; i += 1) {
	      var section = sections[i];
	      var rect = section.getBoundingClientRect();
	      if (rect.bottom > 0 && (event || rect.bottom < window.innerHeight)) {
	        this._scrollTo(rect.bottom);
	        break;
	      }
	    }
	  },

	  _onUp: function _onUp(event) {
	    if (event) {
	      event.preventDefault();
	    }
	    var doc = this.refs.document.getDOMNode();
	    var sections = doc.querySelectorAll('.section--full');
	    for (var i = 0; i < sections.length; i += 1) {
	      var section = sections[i];
	      var rect = section.getBoundingClientRect();
	      if ((rect.top >= 0 || i === sections.length - 1) && (event || rect.top < window.innerHeight)) {
	        section = sections[i - 1];
	        rect = section.getBoundingClientRect();
	        this._scrollTo(rect.top);
	        break;
	      }
	    }
	  },

	  render: function render() {
	    var classes = [CLASS_ROOT];
	    if (this.props.flush) {
	      classes.push(CLASS_ROOT + "--flush");
	    }
	    if (this.props.full) {
	      classes.push(CLASS_ROOT + "--full");
	    }

	    return React.createElement(
	      'div',
	      { ref: 'document', className: classes.join(' ') },
	      React.createElement(
	        'div',
	        { className: CLASS_ROOT + "__content" },
	        this.props.children
	      )
	    );
	  }
	});

	module.exports = GrommetDocument;

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Link = __webpack_require__(2).Link;
	var Article = __webpack_require__(65);
	var Footer = __webpack_require__(72);
	var Menu = __webpack_require__(17);
	var Button = __webpack_require__(81);

	var FooterDoc = React.createClass({
	  displayName: 'FooterDoc',

	  _onClick: function _onClick() {
	    // no-op
	  },

	  render: function render() {
	    var inline = "<Footer>\n  ...\n</Footer>";
	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Footer'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Put things at the bottom.'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            inline
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Options'
	        ),
	        React.createElement(
	          'dl',
	          null,
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'large       true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Larger sized version.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'small       true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Smaller sized version.'
	          )
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Options for ',
	          React.createElement(
	            Link,
	            { to: 'develop_box' },
	            'Box'
	          ),
	          ' area also available.'
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Examples'
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Form footer'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Footer,
	            null,
	            React.createElement(
	              Menu,
	              { direction: 'row' },
	              React.createElement(Button, { label: 'OK', primary: true, onClick: this._onClick }),
	              React.createElement(Button, { label: 'Cancel', onClick: this._onClick })
	            )
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Footer> ..."
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Form footer right'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Footer,
	            { justify: 'end' },
	            React.createElement(
	              Menu,
	              { direction: 'row', justify: 'end' },
	              React.createElement(Button, { label: 'Cancel', onClick: this._onClick }),
	              React.createElement(Button, { label: 'OK', primary: true, onClick: this._onClick })
	            )
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Footer justify=\"end\"> ..."
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = FooterDoc;

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Article = __webpack_require__(65);
	var FullForm = __webpack_require__(169);
	var AddUserForm = __webpack_require__(173);
	var ConfirmationForm = __webpack_require__(175);

	var FormDoc = React.createClass({
	  displayName: 'FormDoc',

	  _onSubmit: function _onSubmit(event) {
	    event.preventDefault();
	  },

	  _onCancel: function _onCancel(event) {
	    event.preventDefault();
	  },

	  render: function render() {
	    var inline = ["<Form onSubmit={...}>", "  <Header>...</Header>", "  <fieldset>", "    <FormField>", "      <label htmlFor=\"item1\">Item 1</label>", "      <input id=\"item1\" />", "    </FormField>", "    ...", "  </fieldset>", "  <Footer>...</Footer>", "</Form>"].join("\n");
	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Form'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'A web form.'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            inline
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Options'
	        ),
	        React.createElement(
	          'dl',
	          null,
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'compact   true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether to render the form in a compact style.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'onSubmit  ',
	              "{func}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'A function called when the user submits the form.'
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Example'
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Regular'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(FullForm, { prefix: 'a-', onSubmit: this._onSubmit, onCancel: this._onCancel })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Form onSubmit={...}> ..."
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Compact'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(FullForm, { prefix: 'b-', onSubmit: this._onSubmit, compact: true, onCancel: this._onCancel })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Form onSubmit={...} compact={true}> ..."
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Add User'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(AddUserForm, { prefix: 'a-', onSubmit: this._onSubmit, onCancel: this._onCancel })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Form onSubmit={...}> ..."
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Confirmation'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(ConfirmationForm, { prefix: 'a-', onSubmit: this._onSubmit, onCancel: this._onCancel })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Form onSubmit={...}> ..."
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = FormDoc;

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Form = __webpack_require__(119);
	var FormFields = __webpack_require__(170);
	var FormField = __webpack_require__(120);
	var Header = __webpack_require__(69);
	var Menu = __webpack_require__(17);
	var CheckBox = __webpack_require__(121);
	var RadioButton = __webpack_require__(171);
	var SearchInput = __webpack_require__(172);
	var Table = __webpack_require__(138);
	var Footer = __webpack_require__(72);
	var Button = __webpack_require__(81);
	var Calendar = __webpack_require__(154);

	var FullForm = React.createClass({
	  displayName: 'FullForm',

	  propTypes: {
	    compact: React.PropTypes.bool,
	    onCancel: React.PropTypes.func,
	    onSubmit: React.PropTypes.func,
	    prefix: React.PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return { prefix: 'ff' };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      rangeValue: 10,
	      searchInput: { suggestions: this._searchInputSuggestions },
	      calendarDate: new Date().toISOString().slice(0, 10)
	    };
	  },

	  _searchInputSuggestions: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'],

	  _onChangeRange: function _onChangeRange(event) {
	    this.setState({ rangeValue: event.target.value });
	  },

	  _onChange: function _onChange(event) {
	    console.log('!!! FullForm changed', event.target, 'to', event.target.value);
	  },

	  _onSearchInputChange: function _onSearchInputChange(value) {
	    console.log('!!! FullForm _onSearchInputChange', value);
	    this.setState({
	      searchInput: {
	        value: value,
	        suggestions: this._searchInputSuggestions
	      }
	    });
	  },

	  _onCalendarChange: function _onCalendarChange(value) {
	    console.log('!!! FullForm _onCalendarChange', value);
	    this.setState({ calendarDate: value });
	  },

	  _onSearch: function _onSearch(text) {
	    var searchInput = this.state.searchInput;
	    var regexp = new RegExp('^' + text);
	    searchInput.suggestions = this._searchInputSuggestions.filter(function (value) {
	      return regexp.test(value);
	    });
	    this.setState({ searchInput: searchInput });
	  },

	  render: function render() {
	    var p = this.props.prefix;

	    return React.createElement(
	      Form,
	      { onSubmit: this.props.onSubmit, compact: this.props.compact },
	      React.createElement(
	        Header,
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Edit'
	        )
	      ),
	      React.createElement(
	        FormFields,
	        null,
	        React.createElement(
	          'fieldset',
	          null,
	          React.createElement(
	            'legend',
	            null,
	            'First section'
	          ),
	          React.createElement(
	            FormField,
	            { label: 'Item 1', htmlFor: p + "item1", help: 'something helpful' },
	            React.createElement('input', { id: p + "item1", name: 'item-1', type: 'text', onChange: this._onChange })
	          ),
	          React.createElement(
	            FormField,
	            null,
	            React.createElement(CheckBox, { id: p + "item2", name: 'item-2', label: 'Item 2',
	              onChange: this._onChange })
	          ),
	          React.createElement(
	            FormField,
	            { label: 'Item 3' },
	            React.createElement(RadioButton, { id: p + "item3-1", name: 'item-3', label: 'first',
	              onChange: this._onChange }),
	            React.createElement(RadioButton, { id: p + "item3-2", name: 'item-3', label: 'second',
	              onChange: this._onChange })
	          ),
	          React.createElement(
	            FormField,
	            { label: 'Item 4', htmlFor: p + "item4",
	              error: 'something\'s wrong' },
	            React.createElement('textarea', { id: p + "item4", name: 'item-4' })
	          ),
	          React.createElement(
	            FormField,
	            { label: 'Item 5', htmlFor: p + "item5" },
	            React.createElement(SearchInput, { id: p + "item5", name: 'item-5',
	              value: this.state.searchInput.value,
	              suggestions: this.state.searchInput.suggestions,
	              onChange: this._onSearchInputChange,
	              onSearch: this._onSearchInputSearch })
	          ),
	          React.createElement(
	            FormField,
	            { label: 'Item 6', htmlFor: p + "item6",
	              help: React.createElement(
	                'a',
	                null,
	                'learn more ...'
	              ) },
	            React.createElement(
	              'select',
	              { id: p + "item6", name: 'item-6' },
	              React.createElement(
	                'option',
	                null,
	                'first'
	              ),
	              React.createElement(
	                'option',
	                null,
	                'second'
	              ),
	              React.createElement(
	                'option',
	                null,
	                'third'
	              )
	            )
	          ),
	          React.createElement(
	            FormField,
	            { label: 'Item 10', htmlFor: p + "item10" },
	            React.createElement(Calendar, { id: p + "item10", name: 'item-10',
	              value: this.state.calendarDate,
	              onChange: this._onCalendarChange })
	          )
	        ),
	        React.createElement(
	          'fieldset',
	          null,
	          React.createElement(
	            'legend',
	            null,
	            'Another section'
	          ),
	          React.createElement(
	            'p',
	            null,
	            'Some informational text.'
	          ),
	          React.createElement(
	            FormField,
	            { label: 'Item 7' },
	            React.createElement(
	              Table,
	              { selectable: true, defaultSelection: 0 },
	              React.createElement(
	                'tbody',
	                null,
	                React.createElement(
	                  'tr',
	                  null,
	                  React.createElement(
	                    'td',
	                    null,
	                    'first'
	                  ),
	                  React.createElement(
	                    'td',
	                    null,
	                    '123'
	                  )
	                ),
	                React.createElement(
	                  'tr',
	                  null,
	                  React.createElement(
	                    'td',
	                    null,
	                    'second'
	                  ),
	                  React.createElement(
	                    'td',
	                    null,
	                    '456'
	                  )
	                ),
	                React.createElement(
	                  'tr',
	                  null,
	                  React.createElement(
	                    'td',
	                    null,
	                    'third'
	                  ),
	                  React.createElement(
	                    'td',
	                    null,
	                    '789'
	                  )
	                )
	              )
	            )
	          ),
	          React.createElement(
	            FormField,
	            { label: 'Item 8', htmlFor: p + "item8" },
	            React.createElement('input', { id: p + "item8", name: 'item-8', type: 'number',
	              min: '1', max: '20', step: '1', defaultValue: '10' })
	          ),
	          React.createElement(
	            FormField,
	            { label: 'Item 9', htmlFor: p + "item9", help: this.state.rangeValue },
	            React.createElement('input', { id: p + "item9", name: 'item-9', type: 'range',
	              min: '1', max: '20', defaultValue: '10',
	              onChange: this._onChangeRange })
	          )
	        )
	      ),
	      React.createElement(
	        Footer,
	        { pad: { vertical: 'medium' } },
	        React.createElement(
	          Menu,
	          { direction: 'right' },
	          React.createElement(Button, { label: 'OK', primary: true, strong: true, onClick: this.props.onSubmit }),
	          React.createElement(Button, { label: 'Cancel', onClick: this.props.onCancel })
	        )
	      )
	    );
	  }
	});

	module.exports = FullForm;

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);

	var FormFields = React.createClass({
	  displayName: 'FormFields',

	  render: function render() {
	    var classes = ["form-fields"];
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }
	    return React.createElement(
	      'div',
	      { className: classes.join(' ') },
	      this.props.children
	    );
	  }

	});

	module.exports = FormFields;

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	"use strict";

	var React = __webpack_require__(1);

	var CLASS_ROOT = "radio-button";

	var RadioButton = React.createClass({
	  displayName: "RadioButton",

	  propTypes: {
	    checked: React.PropTypes.bool,
	    disabled: React.PropTypes.bool,
	    defaultChecked: React.PropTypes.bool,
	    id: React.PropTypes.string.isRequired,
	    label: React.PropTypes.string.isRequired,
	    name: React.PropTypes.string,
	    onChange: React.PropTypes.func,
	    value: React.PropTypes.string
	  },

	  render: function render() {
	    var classes = [CLASS_ROOT];
	    if (this.props.disabled) {
	      classes.push(CLASS_ROOT + "--disabled");
	    }
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }
	    return React.createElement(
	      "label",
	      { className: classes.join(' ') },
	      React.createElement("input", { className: CLASS_ROOT + "__input",
	        id: this.props.id, name: this.props.name, type: "radio",
	        disabled: this.props.disabled,
	        checked: this.props.checked,
	        defaultChecked: this.props.defaultChecked,
	        value: this.props.value,
	        onChange: this.props.onChange }),
	      React.createElement("span", { className: CLASS_ROOT + "__control" }),
	      React.createElement(
	        "span",
	        { className: CLASS_ROOT + "__label" },
	        this.props.label
	      )
	    );
	  }

	});

	module.exports = RadioButton;

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var KeyboardAccelerators = __webpack_require__(16);
	var Drop = __webpack_require__(56);
	var SearchIcon = __webpack_require__(104);

	var CLASS_ROOT = "search-input";

	var SearchInput = React.createClass({
	  displayName: 'SearchInput',

	  propTypes: {
	    defaultValue: React.PropTypes.oneOfType([React.PropTypes.shape({
	      label: React.PropTypes.string,
	      value: React.PropTypes.string
	    }), React.PropTypes.string]),
	    id: React.PropTypes.string,
	    name: React.PropTypes.string,
	    onChange: React.PropTypes.func,
	    placeHolder: React.PropTypes.string,
	    suggestions: React.PropTypes.arrayOf(React.PropTypes.oneOfType([React.PropTypes.shape({
	      label: React.PropTypes.string,
	      value: React.PropTypes.string
	    }), React.PropTypes.string])),
	    value: React.PropTypes.oneOfType([React.PropTypes.shape({
	      label: React.PropTypes.string,
	      value: React.PropTypes.string
	    }), React.PropTypes.string])
	  },

	  mixins: [KeyboardAccelerators],

	  getInitialState: function getInitialState() {
	    return {
	      dropActive: false,
	      defaultValue: this.props.defaultValue,
	      value: this.props.value,
	      activeSuggestionIndex: -1
	    };
	  },

	  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
	    // Set up keyboard listeners appropriate to the current state.

	    var activeKeyboardHandlers = {
	      esc: this._onRemoveDrop,
	      tab: this._onRemoveDrop,
	      up: this._onPreviousSuggestion,
	      down: this._onNextSuggestion,
	      enter: this._onEnter
	    };
	    var focusedKeyboardHandlers = {
	      down: this._onAddDrop
	    };

	    // the order here is important, need to turn off keys before turning on

	    if (!this.state.focused && prevState.focused) {
	      this.stopListeningToKeyboard(focusedKeyboardHandlers);
	    }

	    if (!this.state.dropActive && prevState.dropActive) {
	      document.removeEventListener('click', this._onRemoveDrop);
	      this.stopListeningToKeyboard(activeKeyboardHandlers);
	      if (this._drop) {
	        this._drop.remove();
	        this._drop = null;
	      }
	    }

	    if (this.state.focused && !prevState.focused) {
	      this.startListeningToKeyboard(focusedKeyboardHandlers);
	    }

	    if (this.state.dropActive && !prevState.dropActive) {
	      document.addEventListener('click', this._onRemoveDrop);
	      this.startListeningToKeyboard(activeKeyboardHandlers);

	      this._drop = Drop.add(this.refs.component.getDOMNode(), this._renderDrop(), { top: 'bottom', left: 'left' });
	    } else if (this.state.dropActive && prevState.dropActive) {
	      this._drop.render(this._renderDrop());
	    }
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    document.removeEventListener('click', this._onRemoveDrop);
	  },

	  _onInputChange: function _onInputChange(event) {
	    this.setState({ dropActive: true, activeSuggestionIndex: -1 });
	    this.props.onChange(event.target.value, false);
	  },

	  _onAddDrop: function _onAddDrop(event) {
	    event.preventDefault();
	    this.setState({ dropActive: true, activeSuggestionIndex: -1 });
	  },

	  _onRemoveDrop: function _onRemoveDrop() {
	    this.setState({ dropActive: false });
	  },

	  _onNextSuggestion: function _onNextSuggestion() {
	    var index = this.state.activeSuggestionIndex;
	    index = Math.min(index + 1, this.props.suggestions.length - 1);
	    this.setState({ activeSuggestionIndex: index });
	  },

	  _onPreviousSuggestion: function _onPreviousSuggestion() {
	    var index = this.state.activeSuggestionIndex;
	    index = Math.max(index - 1, 0);
	    this.setState({ activeSuggestionIndex: index });
	  },

	  _onEnter: function _onEnter() {
	    this.setState({ dropActive: false });
	    if (this.state.activeSuggestionIndex >= 0) {
	      var suggestion = this.props.suggestions[this.state.activeSuggestionIndex];
	      this.setState({ value: suggestion });
	      this.props.onChange(suggestion, true);
	    }
	  },

	  _onClickSuggestion: function _onClickSuggestion(suggestion) {
	    this.setState({ value: suggestion, dropActive: false });
	    this.props.onChange(suggestion, true);
	  },

	  _onFocus: function _onFocus() {
	    this.refs.input.getDOMNode().select();
	    this.setState({
	      focused: true,
	      dropActive: false,
	      activeSuggestionIndex: -1
	    });
	  },

	  _valueText: function _valueText(value) {
	    var text = '';
	    if (value) {
	      if ('string' === typeof value) {
	        text = value;
	      } else {
	        text = value.label || value.value;
	      }
	    }
	    return text;
	  },

	  _renderDrop: function _renderDrop() {
	    var suggestions = null;
	    if (this.props.suggestions) {
	      suggestions = this.props.suggestions.map(function (suggestion, index) {
	        var classes = [CLASS_ROOT + "__suggestion"];
	        if (index === this.state.activeSuggestionIndex) {
	          classes.push(CLASS_ROOT + "__suggestion--active");
	        }
	        return React.createElement(
	          'li',
	          { key: this._valueText(suggestion),
	            className: classes.join(' '),
	            onClick: this._onClickSuggestion.bind(this, suggestion) },
	          this._valueText(suggestion)
	        );
	      }, this);
	    }

	    return React.createElement(
	      'ol',
	      { className: CLASS_ROOT + "__suggestions", onClick: this._onRemoveDrop },
	      suggestions
	    );
	  },

	  render: function render() {
	    var classes = [CLASS_ROOT];
	    if (this.state.active) {
	      classes.push(CLASS_ROOT + "--active");
	    }
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }

	    return React.createElement(
	      'div',
	      { ref: 'component', className: classes.join(' ') },
	      React.createElement('input', { ref: 'input', className: CLASS_ROOT + "__input",
	        id: this.props.id, name: this.props.name,
	        value: this._valueText(this.props.value),
	        defaultValue: this._valueText(this.props.defaultValue),
	        placeholder: this.props.placeHolder,
	        onChange: this._onInputChange,
	        onFocus: this._onFocus }),
	      React.createElement(
	        'div',
	        { className: CLASS_ROOT + "__control", onClick: this._onAddDrop },
	        React.createElement(SearchIcon, null)
	      )
	    );
	  }

	});

	module.exports = SearchInput;

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Form = __webpack_require__(119);
	var FormFields = __webpack_require__(170);
	var FormField = __webpack_require__(120);
	var Header = __webpack_require__(69);
	var Menu = __webpack_require__(17);
	var CheckBox = __webpack_require__(121);
	var RadioButton = __webpack_require__(171);
	var Footer = __webpack_require__(72);
	var Button = __webpack_require__(81);
	var Validator = __webpack_require__(174);

	var AddUserForm = React.createClass({
	  displayName: 'AddUserForm',

	  propTypes: {
	    compact: React.PropTypes.bool,
	    onCancel: React.PropTypes.func,
	    onSubmit: React.PropTypes.func,
	    prefix: React.PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return { prefix: 'auf' };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      user: {
	        login: '',
	        name: '',
	        password: '',
	        role: 'specialized',
	        backupAdmin: false,
	        networkAdmin: false,
	        serverAdmin: false,
	        storageAdmin: false,
	        email: '',
	        officePhone: '',
	        mobilePhone: ''
	      },
	      validation: { errors: {} },
	      submitting: false
	    };
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    var errors = document.querySelectorAll('.form-field--error');
	    if (errors.length > 0) {
	      var input = errors[0].querySelectorAll('input')[0];
	      if (input) {
	        input.focus();
	      }
	    }
	  },

	  _validate: function _validate(submitting) {
	    var user = this.state.user;

	    var rules = [{ field: 'login', test: !user.login, message: 'required' }, { field: 'password', tests: [{ test: !user.password, message: 'required' }, { test: user.password.length < 8, message: 'must be at least 8 characters' }] }];

	    var validation = Validator.validate(rules);

	    if (submitting) {
	      this.setState({ validation: validation });
	    }

	    return validation.valid;
	  },

	  _onSubmit: function _onSubmit(event) {
	    event.preventDefault();
	    var valid = this._validate(true);
	    if (valid) {
	      this.props.onSubmit();
	    }
	  },

	  _onChange: function _onChange(event) {
	    console.log('!!! AddUserForm changed', event.target, 'to', event.target.value);
	    var user = this.state.user;
	    user[event.target.getAttribute('name')] = event.target.value;
	    this.setState({ user: user });
	    this._validate(false);
	  },

	  _onChangeCheckBox: function _onChangeCheckBox(event) {
	    console.log('!!! AddUserForm checkbox changed', event.target, 'to', event.target.checked);
	    var user = this.state.user;
	    user[event.target.getAttribute('name')] = event.target.checked;
	    this.setState({ user: user });
	    this._validate(false);
	  },

	  render: function render() {
	    var p = this.props.prefix;
	    var user = this.state.user;
	    var errors = this.state.validation.errors;

	    return React.createElement(
	      Form,
	      { onSubmit: this._onSubmit, compact: this.props.compact },
	      React.createElement(
	        Header,
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Add User'
	        )
	      ),
	      React.createElement(
	        FormFields,
	        null,
	        React.createElement(
	          'fieldset',
	          null,
	          React.createElement(
	            FormField,
	            { label: 'Login name', htmlFor: p + "login", error: errors.login },
	            React.createElement('input', { id: p + "login", name: 'login', type: 'text',
	              value: user.login, onChange: this._onChange })
	          ),
	          React.createElement(
	            FormField,
	            { label: 'Full name', htmlFor: p + "name", error: errors.name },
	            React.createElement('input', { id: p + "name", name: 'name', type: 'text',
	              value: user.name, onChange: this._onChange })
	          ),
	          React.createElement(
	            FormField,
	            { label: 'Password', htmlFor: p + "password", error: errors.password },
	            React.createElement('input', { id: p + "password", name: 'password', type: 'password',
	              value: user.password, onChange: this._onChange })
	          )
	        ),
	        React.createElement(
	          'fieldset',
	          null,
	          React.createElement(
	            'legend',
	            null,
	            'Role'
	          ),
	          React.createElement(
	            FormField,
	            null,
	            React.createElement(RadioButton, { id: p + "role-specialized", name: 'role', label: 'Specialized',
	              value: 'specialized', checked: user.role === 'specialized',
	              onChange: this._onChange }),
	            React.createElement(
	              FormField,
	              { hidden: user.role !== 'specialized' },
	              React.createElement(CheckBox, { id: p + "sub-role-backup", name: 'backupAdmin',
	                label: 'Backup administrator',
	                checked: user.backupAdmin, onChange: this._onChangeCheckBox }),
	              React.createElement(CheckBox, { id: p + "sub-role-network", name: 'networkAdmin',
	                label: 'Network administrator',
	                checked: user.networkAdmin, onChange: this._onChangeCheckBox }),
	              React.createElement(CheckBox, { id: p + "sub-role-server", name: 'serverAdmin',
	                label: 'Server administrator',
	                checked: user.serverAdmin, onChange: this._onChangeCheckBox }),
	              React.createElement(CheckBox, { id: p + "sub-role-storage", name: 'storageAdmin',
	                label: 'Storage administrator',
	                checked: user.storageAdmin, onChange: this._onChangeCheckBox })
	            )
	          ),
	          React.createElement(
	            FormField,
	            null,
	            React.createElement(RadioButton, { id: p + "role-full", name: 'role', label: 'Full',
	              value: 'full', checked: user.role === 'full',
	              onChange: this._onChange })
	          ),
	          React.createElement(
	            FormField,
	            null,
	            React.createElement(RadioButton, { id: p + "role-read-only", name: 'role', label: 'Read only',
	              value: 'read-only', checked: user.role === 'read-only',
	              onChange: this._onChange })
	          )
	        ),
	        React.createElement(
	          'fieldset',
	          null,
	          React.createElement(
	            'legend',
	            null,
	            'Contact'
	          ),
	          React.createElement(
	            FormField,
	            { label: 'Email', htmlFor: p + "email" },
	            React.createElement('input', { id: p + "email", name: 'email', type: 'text',
	              value: user.email, onChange: this._onChange })
	          ),
	          React.createElement(
	            FormField,
	            { label: 'Office phone', htmlFor: p + "office-phone" },
	            React.createElement('input', { id: p + "office-phone", name: 'office-phone', type: 'text',
	              value: user.officePhone, onChange: this._onChange })
	          ),
	          React.createElement(
	            FormField,
	            { label: 'Mobile phone', htmlFor: p + "mobile-phone" },
	            React.createElement('input', { id: p + "mobile-phone", name: 'mobile-phone', type: 'text',
	              value: user.mobilePhone, onChange: this._onChange })
	          )
	        )
	      ),
	      React.createElement(
	        Footer,
	        { pad: { vertical: 'medium' } },
	        React.createElement(
	          Menu,
	          null,
	          React.createElement(Button, { label: 'Add', primary: true, strong: true, onClick: this._onSubmit })
	        )
	      )
	    );
	  }
	});

	module.exports = AddUserForm;

/***/ },
/* 174 */
/***/ function(module, exports) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	module.exports = {
	  validate: function validate(rules) {
	    var result = {
	      valid: true,
	      errors: {},
	      firstError: null
	    };

	    rules.forEach(function (rule) {
	      if (rule.hasOwnProperty('test')) {
	        if (rule.test) {
	          result.errors[rule.field] = rule.message;
	          result.valid = false;
	          result.firstError = result.firstError || rule.field;
	        }
	      } else if (rule.hasOwnProperty('tests')) {
	        rule.tests.some(function (test) {
	          if (test.test) {
	            result.errors[rule.field] = test.message;
	            result.valid = false;
	            result.firstError = result.firstError || rule.field;
	            return true;
	          }
	        });
	      }
	    });

	    return result;
	  }
	};

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Form = __webpack_require__(119);
	var FormFields = __webpack_require__(170);
	var FormField = __webpack_require__(120);
	var Header = __webpack_require__(69);
	var Menu = __webpack_require__(17);
	var CheckBox = __webpack_require__(121);
	var Footer = __webpack_require__(72);
	var Button = __webpack_require__(81);

	var ConfirmationForm = React.createClass({
	  displayName: 'ConfirmationForm',

	  propTypes: {
	    compact: React.PropTypes.bool,
	    onCancel: React.PropTypes.func,
	    onSubmit: React.PropTypes.func,
	    prefix: React.PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return { prefix: 'cf' };
	  },

	  getInitialState: function getInitialState() {
	    return { acknowledged: false, error: null };
	  },

	  _onSubmit: function _onSubmit(event) {
	    event.preventDefault();
	    if (this.state.acknowledged) {
	      this.props.onSubmit();
	    } else {
	      this.setState({ error: 'required' });
	    }
	  },

	  _onChangeCheckBox: function _onChangeCheckBox(event) {
	    var acknowledged = event.target.checked;
	    this.setState({ acknowledged: acknowledged });
	    if (acknowledged) {
	      this.setState({ error: null });
	    }
	  },

	  render: function render() {
	    var p = this.props.prefix;

	    return React.createElement(
	      Form,
	      { onSubmit: this._onSubmit, compact: this.props.compact },
	      React.createElement(
	        Header,
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Confirmation'
	        )
	      ),
	      React.createElement(
	        FormFields,
	        null,
	        React.createElement(
	          'fieldset',
	          null,
	          React.createElement(
	            'p',
	            null,
	            'You must acknowledge the destructive aspects of this action.'
	          ),
	          React.createElement(
	            FormField,
	            { error: this.state.error },
	            React.createElement(CheckBox, { id: p + "agree", name: 'agree',
	              label: 'I acknowledge that I may lose data.',
	              onChange: this._onChangeCheckBox })
	          )
	        )
	      ),
	      React.createElement(
	        Footer,
	        { pad: { vertical: 'medium' } },
	        React.createElement(
	          Menu,
	          null,
	          React.createElement(Button, { label: 'Destroy', primary: true, strong: true,
	            onClick: this._onSubmit })
	        )
	      )
	    );
	  }
	});

	module.exports = ConfirmationForm;

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Article = __webpack_require__(65);
	var FormField = __webpack_require__(120);
	var CheckBox = __webpack_require__(121);
	var RadioButton = __webpack_require__(171);

	var FormFieldDoc = React.createClass({
	  displayName: 'FormFieldDoc',

	  render: function render() {
	    var inline = ["<FormField label=\"Item 1\" htmlFor=\"item1\">", "  <input id=\"item1\" />", "</FormField>"].join("\n");
	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'FormField'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'A field in a web form.'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            inline
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Options'
	        ),
	        React.createElement(
	          'dl',
	          null,
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'error  ',
	              "{text}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Validation errors.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'help   ',
	              "{text}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Helpful text.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'htmlFor   ',
	              "{id}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Id of the input element that the label should be associated with.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'label  ',
	              "{text}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Label for the field.'
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Example'
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Text input'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            FormField,
	            { label: 'Item 1', htmlFor: 'item1' },
	            React.createElement('input', { id: 'item1', type: 'text' })
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<FormField label=\"Item 1\" htmlFor=\"item1\">\n  <input id=\"\{id\}\" type=\"text\"/>\n</FormField>"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Text input with errors'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            FormField,
	            { label: 'Item 1', htmlFor: 'item1', error: 'error text' },
	            React.createElement('input', { id: 'item1', type: 'text' })
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<FormField label=\"Item 1\" htmlFor=\"item1\" error=\"error text\">\n  <input id=\"\{id\}\" type=\"text\"/>\n</FormField>"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Checkbox'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            FormField,
	            { label: '' },
	            React.createElement(CheckBox, { id: 'item2', label: 'Item 2' })
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<FormField>\n  <CheckBox id=\"\{item2\}\" label=\"Item 2\"/>\n</FormField>"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'RadioButton with help'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            FormField,
	            { label: 'item 1', help: 'help text' },
	            React.createElement(RadioButton, { id: 'item3-1', label: 'choice 1', name: 'choice' }),
	            React.createElement(RadioButton, { id: 'item3-2', label: 'choice 2', name: 'choice' })
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<FormField help=\"help text\">\n  <RadioButton id=\"\{item3-1\}\" label=\"choice 1\" name=\"choice\"/>\n  <RadioButton id=\"\{item3-2\}\" label=\"choice 2\" name=\"choice\"/>\n</FormField>"
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = FormFieldDoc;

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Link = __webpack_require__(2).Link;
	var Article = __webpack_require__(65);
	var Header = __webpack_require__(69);
	var Menu = __webpack_require__(17);
	var Search = __webpack_require__(124);
	var Title = __webpack_require__(70);
	var Edit = __webpack_require__(97);
	var Logo = __webpack_require__(125);

	var HeaderDoc = React.createClass({
	  displayName: 'HeaderDoc',

	  render: function render() {
	    var inline = "<Header>\n  <Link to={route}>{label}</Link>\n  ...\n</Header>";
	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Header'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Combines Title and Menu elements responsively.'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            inline
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Options'
	        ),
	        React.createElement(
	          'dl',
	          null,
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'fixed       true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether the header is fixed on the page, typically so content below it will scroll under it.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'float       true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether the header floats above content underneath it.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'large       true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Larger sized version.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'small       true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Smaller sized version.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'splash      true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether to render it in a style suitable for a splash screen.'
	          )
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Options for ',
	          React.createElement(
	            Link,
	            { to: 'develop_box' },
	            'Box'
	          ),
	          ' area also available.'
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Examples'
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Title and Search'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Header,
	            null,
	            React.createElement(
	              Title,
	              null,
	              'Title'
	            ),
	            React.createElement(Search, { inline: true })
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Header> ..."
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Title, inline Menu, and Search'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Header,
	            { justify: 'between' },
	            React.createElement(
	              Title,
	              null,
	              'Title'
	            ),
	            React.createElement(
	              Menu,
	              { direction: 'row', align: 'center', responsive: false },
	              React.createElement(
	                'a',
	                { href: '#', className: 'active' },
	                'First'
	              ),
	              React.createElement(
	                'a',
	                { href: '#' },
	                'Second'
	              ),
	              React.createElement(
	                'a',
	                { href: '#' },
	                'Third'
	              ),
	              React.createElement(Search, { dropAlign: { right: "right" } })
	            )
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Header> ..."
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Logo, title and icon Menu'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Header,
	            { justify: 'between' },
	            React.createElement(
	              Title,
	              null,
	              React.createElement(Logo, null),
	              ' Title'
	            ),
	            React.createElement(
	              Menu,
	              { icon: React.createElement(Edit, null), dropAlign: { right: "right" } },
	              React.createElement(
	                'a',
	                { href: '#', className: 'active' },
	                'First'
	              ),
	              React.createElement(
	                'a',
	                { href: '#' },
	                'Second'
	              ),
	              React.createElement(
	                'a',
	                { href: '#' },
	                'Third'
	              )
	            )
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Header> ..."
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Large'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Header,
	            { large: true, justify: 'between' },
	            React.createElement(
	              Title,
	              null,
	              React.createElement(Logo, null),
	              ' Title'
	            ),
	            React.createElement(
	              Menu,
	              { icon: React.createElement(Edit, null), dropAlign: { right: "right" } },
	              React.createElement(
	                'a',
	                { href: '#', className: 'active' },
	                'First'
	              ),
	              React.createElement(
	                'a',
	                { href: '#' },
	                'Second'
	              ),
	              React.createElement(
	                'a',
	                { href: '#' },
	                'Third'
	              )
	            )
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Header large={true}> ..."
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Small'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Header,
	            { small: true, justify: 'between' },
	            React.createElement(
	              Title,
	              null,
	              React.createElement(Logo, null),
	              ' Title'
	            ),
	            React.createElement(
	              Menu,
	              { icon: React.createElement(Edit, null), dropAlign: { right: "right" } },
	              React.createElement(
	                'a',
	                { href: '#', className: 'active' },
	                'First'
	              ),
	              React.createElement(
	                'a',
	                { href: '#' },
	                'Second'
	              ),
	              React.createElement(
	                'a',
	                { href: '#' },
	                'Third'
	              )
	            )
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Header small={true}> ..."
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Title menu and icon Menu'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Header,
	            { large: true, justify: 'between' },
	            React.createElement(
	              Title,
	              { onClick: function () {} },
	              React.createElement(Logo, null),
	              ' Title'
	            ),
	            React.createElement(
	              Menu,
	              { icon: React.createElement(Edit, null), dropAlign: { right: "right" } },
	              React.createElement(
	                'a',
	                { href: '#', className: 'active' },
	                'First'
	              ),
	              React.createElement(
	                'a',
	                { href: '#' },
	                'Second'
	              ),
	              React.createElement(
	                'a',
	                { href: '#' },
	                'Third'
	              )
	            )
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Header large={true}> ..."
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Tag, Separator'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Header,
	            { tag: 'h4', separator: 'top' },
	            'Heading Text'
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Header tag=\"h4\" separator=\"top\" pad={{vertical: 'small'}}> ..."
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = HeaderDoc;

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Article = __webpack_require__(65);
	var Layer = __webpack_require__(14);
	var Header = __webpack_require__(69);
	var Form = __webpack_require__(119);
	var FormFields = __webpack_require__(170);
	var FullForm = __webpack_require__(169);
	var AddUserForm = __webpack_require__(173);
	var ConfirmationForm = __webpack_require__(175);

	var LayerDoc = React.createClass({
	  displayName: 'LayerDoc',

	  getInitialState: function getInitialState() {
	    return {
	      active: null,
	      align: 'center'
	    };
	  },

	  _onOpen: function _onOpen(which, align) {
	    this.setState({ active: which, align: align });
	  },

	  _onClose: function _onClose(event) {
	    if (event) {
	      event.preventDefault();
	    }
	    this.setState({ active: null });
	  },

	  render: function render() {
	    var inline = "<Layer>\n  ...\n</Layer>";

	    var activeLayer = null;
	    if (this.state.active) {
	      var form;
	      switch (this.state.active) {
	        case 'simple':
	          activeLayer = React.createElement(
	            Layer,
	            { onClose: this._onClose, closer: true, flush: true,
	              align: this.state.align },
	            React.createElement(
	              Form,
	              null,
	              React.createElement(
	                Header,
	                null,
	                React.createElement(
	                  'h2',
	                  null,
	                  'Title'
	                )
	              ),
	              React.createElement(
	                FormFields,
	                null,
	                React.createElement(
	                  'p',
	                  null,
	                  'This is a simple dialog.'
	                )
	              )
	            )
	          );
	          break;
	        case 'mixed':
	          form = React.createElement(FullForm, { onCancel: this._onClose, onSubmit: this._onClose });
	          break;
	        case 'add user':
	          form = React.createElement(AddUserForm, { onCancel: this._onClose, onSubmit: this._onClose });
	          break;
	        case 'confirmation':
	          form = React.createElement(ConfirmationForm, { onCancel: this._onClose, onSubmit: this._onClose });
	          break;
	      }
	      if (!activeLayer) {
	        activeLayer = React.createElement(
	          Layer,
	          { onClose: this._onClose, closer: true, flush: true, align: this.state.align },
	          form
	        );
	      }
	    }

	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Layer'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'A modal overlay, often containing a ',
	          React.createElement(
	            'a',
	            null,
	            'Form'
	          ),
	          '.'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            inline
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Options'
	        ),
	        React.createElement(
	          'dl',
	          null,
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'align    center|top|bottom|left|right'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Which direction the layer contents should emanate from.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'closer   ',
	              "true|false|{node}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Adds a visible control to close the layer. If the caller provides a node, it is the caller\'s responsibility to listen to events from the node.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'flush    true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether the contents are flush with the edges or not. Defaults to false.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'hidden   true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether the contents are rendered offscreen. Defaults to false.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'peek     true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether the hidden contents are shown just a bit. Defaults to false.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'onClose  ',
	              "function () {...}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Function that will be called when the user clicks on the closer control. Clicking the closer control does not automatically cause the Layer to be removed. The recipient of this callback can still decide whether to continue rendering the Layer or not.'
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Examples'
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Simple'
	        ),
	        React.createElement(
	          'button',
	          { onClick: this._onOpen.bind(this, 'simple', 'top') },
	          'Simple'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Layer> ..."
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Edit'
	        ),
	        React.createElement(
	          'button',
	          { onClick: this._onOpen.bind(this, 'mixed', 'right') },
	          'Edit'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Layer> ..."
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Add User'
	        ),
	        React.createElement(
	          'button',
	          { onClick: this._onOpen.bind(this, 'add user', 'right') },
	          'Add User'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Layer> ..."
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Confirmation'
	        ),
	        React.createElement(
	          'button',
	          { onClick: this._onOpen.bind(this, 'confirmation', 'right') },
	          'Confirmation'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Layer> ..."
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Edit, left'
	        ),
	        React.createElement(
	          'button',
	          { onClick: this._onOpen.bind(this, 'mixed', 'left') },
	          'Edit'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Layer align=\"left\"> ..."
	          )
	        )
	      ),
	      activeLayer
	    );
	  }
	});

	module.exports = LayerDoc;

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Article = __webpack_require__(65);
	var List = __webpack_require__(180);

	var SCHEMA = [{ attribute: 'uid', uid: true }, { attribute: 'face', image: true }, { attribute: 'name', primary: true }, { attribute: 'mood', secondary: true }];

	var DATA = [{ uid: 1, face: '', name: 'Alan', mood: 'happy' }, { uid: 2, face: '', name: 'Bryan', mood: 'calm' }, { uid: 3, face: '', name: 'Chris', mood: 'cool' }, { uid: 4, face: '', name: 'Eric', mood: 'odd' }];

	var ListDoc = React.createClass({
	  displayName: 'ListDoc',

	  render: function render() {
	    var inline = ["<List ... />"].join('\n');

	    var schema = ["{", "  attribute: name,", "  default:   string|node", "  image:     true|false,", "  label:     image label,", "  primary:   true|false,", "  secondary: true|false,", "  timestamp: true|false,", "  uid:       true|false", "}"].join('\n');

	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'List'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'List of things.'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            inline
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Options'
	        ),
	        React.createElement(
	          'dl',
	          null,
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'data        ',
	              "[{...}, ...]"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'The data set.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'large       true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Larger sized version.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'onMore      ',
	              "function () {...}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Function that will be called when more data is needed.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'onSelect    ',
	              "function (datum) {...}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Function that will be called when the user selects an item.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'schema        ',
	              "[{...}, ...]"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'An array of objects describing the data.',
	            React.createElement(
	              'code',
	              null,
	              schema
	            )
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'selected    ',
	              "uid|[uid, ...]"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'The currently selected items.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'small       true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Smaller sized version.'
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Examples'
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Default'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(List, { schema: SCHEMA, data: DATA })
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Small'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(List, { schema: SCHEMA, data: DATA, small: true })
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Large'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(List, { schema: SCHEMA, data: DATA, large: true })
	        )
	      )
	    );
	  }
	});

	module.exports = ListDoc;

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var ListItem = __webpack_require__(181);
	var SpinningIcon = __webpack_require__(76);
	var InfiniteScroll = __webpack_require__(79);
	var IntlMixin = __webpack_require__(3);

	var CLASS_ROOT = "list";

	var List = React.createClass({
	  displayName: 'List',

	  propTypes: {
	    data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
	    emptyIndicator: React.PropTypes.node,
	    large: React.PropTypes.bool,
	    onMore: React.PropTypes.func,
	    onSelect: React.PropTypes.func,
	    schema: React.PropTypes.arrayOf(React.PropTypes.shape({
	      attribute: React.PropTypes.string,
	      'default': React.PropTypes.node,
	      image: React.PropTypes.bool,
	      label: React.PropTypes.string,
	      primary: React.PropTypes.bool,
	      secondary: React.PropTypes.bool,
	      timestamp: React.PropTypes.bool,
	      uid: React.PropTypes.bool
	    })).isRequired,
	    selected: React.PropTypes.oneOfType([React.PropTypes.string, // uid
	    React.PropTypes.arrayOf(React.PropTypes.string)]),
	    small: React.PropTypes.bool
	  },

	  mixins: [InfiniteScroll, IntlMixin],

	  getDefaultProps: function getDefaultProps() {
	    return { small: false };
	  },

	  componentDidMount: function componentDidMount() {
	    if (this.props.onMore) {
	      this.startListeningForScroll(this.refs.more.getDOMNode(), this.props.onMore);
	    }
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    this.stopListeningForScroll();
	    if (this.props.onMore) {
	      this.startListeningForScroll(this.refs.more.getDOMNode(), this.props.onMore);
	    }
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    if (this.props.onMore) {
	      this.stopListeningForScroll();
	    }
	  },

	  _onClickItem: function _onClickItem(item) {
	    if (this.props.onSelect) {
	      this.props.onSelect(item);
	    }
	  },

	  _renderValue: function _renderValue(item, scheme) {
	    var result;
	    var value = item[scheme.attribute] || scheme['default'];
	    if (scheme.image) {
	      if (typeof value === 'string') {
	        result = React.createElement('img', { src: value, alt: scheme.label || 'image' });
	      } else {
	        result = value;
	      }
	    } else if (scheme.timestamp) {
	      result = this.getGrommetFormattedDate(value);
	    } else {
	      result = value;
	    }
	    return result;
	  },

	  render: function render() {
	    var classes = [CLASS_ROOT];
	    if (true) {
	      classes.push(CLASS_ROOT + "--fill");
	    }
	    if (true) {
	      classes.push(CLASS_ROOT + "--flush");
	    }
	    if (this.props.small) {
	      classes.push(CLASS_ROOT + "--small");
	    }
	    if (this.props.large) {
	      classes.push(CLASS_ROOT + "--large");
	    }
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }

	    var items = this.props.data.map(function (item) {
	      var uid;
	      var image;
	      var primary;
	      var secondary;
	      var selected;
	      var onClick;

	      this.props.schema.forEach(function (scheme) {
	        if (scheme.image) {
	          image = this._renderValue(item, scheme);
	        } else if (scheme.primary) {
	          primary = this._renderValue(item, scheme);
	        } else if (scheme.secondary) {
	          secondary = this._renderValue(item, scheme);
	        }
	        if (scheme.uid) {
	          uid = item[scheme.attribute];
	          if (uid === this.props.selected) {
	            selected = true;
	          }
	        }
	      }, this);

	      if (this.props.onSelect) {
	        onClick = this._onClickItem.bind(this, item);
	      }

	      return React.createElement(ListItem, { key: uid, image: image, label: primary,
	        annotation: secondary, selected: selected,
	        onClick: onClick });
	    }, this);

	    var more;
	    if (this.props.onMore) {
	      classes.push(CLASS_ROOT + "--moreable");
	      more = React.createElement(
	        'li',
	        { ref: 'more', className: CLASS_ROOT + "__more" },
	        React.createElement(SpinningIcon, null)
	      );
	    }

	    var empty;
	    if (this.props.data.length === 0) {
	      empty = React.createElement(
	        'li',
	        { className: CLASS_ROOT + "__empty" },
	        this.props.emptyIndicator
	      );
	    }

	    return React.createElement(
	      'ul',
	      { className: classes.join(' ') },
	      empty,
	      items,
	      more
	    );
	  }

	});

	module.exports = List;

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	"use strict";

	var React = __webpack_require__(1);

	var CLASS_ROOT = "list-item";

	var ListItem = React.createClass({
	  displayName: "ListItem",

	  propTypes: {
	    annotation: React.PropTypes.node,
	    image: React.PropTypes.node,
	    label: React.PropTypes.node,
	    onClick: React.PropTypes.func,
	    selected: React.PropTypes.bool
	  },

	  render: function render() {
	    var classes = [CLASS_ROOT];
	    if (this.props.onClick) {
	      classes.push(CLASS_ROOT + "--selectable");
	    }
	    if (this.props.selected) {
	      classes.push(CLASS_ROOT + "--selected");
	    }
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }

	    return React.createElement(
	      "li",
	      { className: classes.join(' '), onClick: this.props.onClick },
	      React.createElement(
	        "span",
	        { className: CLASS_ROOT + "__image" },
	        this.props.image
	      ),
	      React.createElement(
	        "span",
	        { className: CLASS_ROOT + "__text" },
	        React.createElement(
	          "span",
	          { className: CLASS_ROOT + "__label" },
	          this.props.label
	        ),
	        React.createElement(
	          "span",
	          { className: CLASS_ROOT + "__annotation" },
	          this.props.annotation
	        )
	      )
	    );
	  }

	});

	module.exports = ListItem;

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Article = __webpack_require__(65);
	var LoginForm = __webpack_require__(118);
	var Logo = __webpack_require__(125);

	var LoginFormDoc = React.createClass({
	  displayName: 'LoginFormDoc',

	  render: function render() {
	    var inline = "<LoginForm onSubmit={...} />";
	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'LoginForm'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'The form used to log in.'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            inline
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Options'
	        ),
	        React.createElement(
	          'dl',
	          null,
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'usernameType           ',
	              "{string}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'The type of username input text|',
	            React.createElement(
	              'strong',
	              null,
	              'email'
	            )
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'errors          ',
	              "[{message}, ...]"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'An array of error messages. Use this if there is a failure to log in.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'forgotPassword  ',
	              "{component}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'A link that would take the user to a new page.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'logo            ',
	              "{component}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'A logo component.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'onSubmit        ',
	              "function ({username: ..., password: ...}) {...}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Function that will be called with the username and password provided.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'rememberMe      true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether to include a remember me input.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'title           ',
	              "{string}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'The product name.'
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Examples'
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Simple'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(LoginForm, null)
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<LoginForm onSubmit={...}/>"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Full'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(LoginForm, { logo: React.createElement(Logo, null), title: 'Product Name',
	            rememberMe: true, forgotPassword: React.createElement(
	              'a',
	              null,
	              'Forgot password?'
	            ),
	            errors: ["Invalid username or password."] })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<LoginForm\n  logo={<Logo />}\n  title=\"Product Name\"\n  rememberMe={true}\n  forgotPassword={<a>...</a>}\n  onSubmit={...}\n  errors={[\"Invalid username or password.\"]}\n/>"
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = LoginFormDoc;

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Article = __webpack_require__(65);
	var GrommetMap = __webpack_require__(184);

	var MapDoc = React.createClass({
	  displayName: 'MapDoc',

	  render: function render() {
	    var inline = "<Map value={70} total={100} units=\"GB\" />";

	    var data = {
	      categories: [{ id: "category-1", label: "First category", items: [{ id: "item-1-1", node: "First item" }, { id: "item-1-2", node: "Second item" }, { id: "item-1-3", node: "Third item" }] }, { id: "category-2", label: "Second category", items: [{ id: "item-2-1", node: "Fourth item" }, { id: "item-2-2", node: "Fifth item" }] }, { id: "category-3", label: "Third category", items: [{ id: "item-3-1", node: "Sixth item" }, { id: "item-3-2", node: "Seventh item" }] }],
	      links: [{ parentId: "item-1-1", childId: "item-2-2" }, { parentId: "item-1-2", childId: "item-2-2" }, { parentId: "item-1-2", childId: "item-2-1" }, { parentId: "item-2-2", childId: "item-3-1" }, { parentId: "item-2-1", childId: "item-3-2" }]
	    };

	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Map'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Shows a linear meter graphic.'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            inline
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Options'
	        ),
	        React.createElement(
	          'dl',
	          null,
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'data     ',
	              "{\n    categories: [{id: , label: , items: [id: , node: ]}, ...],\n    links: [{parentId: , childId: }, ...]\n}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'An array of objects describing the data.'
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Examples'
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Simple'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(GrommetMap, { data: data })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Map data={...} />"
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = MapDoc;

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);

	var CLASS_ROOT = "map";

	var ResourceMap = React.createClass({
	  displayName: 'ResourceMap',

	  propTypes: {
	    data: React.PropTypes.shape({
	      categories: React.PropTypes.arrayOf(React.PropTypes.shape({
	        id: React.PropTypes.string,
	        label: React.PropTypes.node,
	        items: React.PropTypes.arrayOf(React.PropTypes.shape({
	          id: React.PropTypes.string,
	          node: React.PropTypes.node
	        }))
	      })),
	      links: React.PropTypes.arrayOf(React.PropTypes.shape({
	        parentId: React.PropTypes.string,
	        childId: React.PropTypes.string
	      }))
	    }).isRequired
	  },

	  getInitialState: function getInitialState() {
	    return { canvasWidth: 100, canvasHeight: 100 };
	  },

	  componentDidMount: function componentDidMount() {
	    window.addEventListener('resize', this._onResize);
	    this._layout();
	    clearTimeout(this._drawTimer);
	    this._drawTimer = setTimeout(this._draw, 50);
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    this._layout();
	    clearTimeout(this._drawTimer);
	    this._drawTimer = setTimeout(this._draw, 50);
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    window.removeEventListener('resize', this._onResize);
	  },

	  _coords: function _coords(id, canvasRect) {
	    var element = document.getElementById(id);
	    var rect = element.getBoundingClientRect();
	    return [rect.left - canvasRect.left + rect.width / 2, rect.top - canvasRect.top + rect.height / 2];
	  },

	  _draw: function _draw() {
	    var canvasElement = this.refs.canvas.getDOMNode();
	    var highlightCanvasElement = this.refs.highlightCanvas.getDOMNode();
	    // don't draw if we don't have a canvas to draw on, such as a unit test
	    if (canvasElement.getContext) {
	      var context = canvasElement.getContext('2d');
	      var highlightContext = highlightCanvasElement.getContext('2d');
	      var canvasRect = canvasElement.getBoundingClientRect();
	      context.clearRect(0, 0, canvasRect.width, canvasRect.height);
	      highlightContext.clearRect(0, 0, canvasRect.width, canvasRect.height);

	      context.strokeStyle = '#000000';
	      context.lineWidth = 1;
	      highlightContext.strokeStyle = '#000000';
	      highlightContext.lineWidth = 2;

	      this.props.data.links.forEach(function (link) {
	        var parentCoords = this._coords(link.parentId, canvasRect);
	        var childCoords = this._coords(link.childId, canvasRect);

	        if (this.state.activeId === link.parentId || this.state.activeId === link.childId) {
	          highlightContext.beginPath();
	          highlightContext.moveTo(parentCoords[0], parentCoords[1]);
	          highlightContext.lineTo(childCoords[0], childCoords[1]);
	          highlightContext.stroke();
	        } else {
	          context.beginPath();
	          context.moveTo(parentCoords[0], parentCoords[1]);
	          context.lineTo(childCoords[0], childCoords[1]);
	          context.stroke();
	        }
	      }, this);
	    }
	  },

	  _layout: function _layout() {
	    var mapElement = this.refs.map.getDOMNode();
	    if (mapElement.scrollWidth !== this.state.canvasWidth || mapElement.scrollHeight !== this.state.canvasHeight) {
	      this.setState({
	        canvasWidth: mapElement.scrollWidth,
	        canvasHeight: mapElement.scrollHeight
	      });
	    }
	  },

	  _onResize: function _onResize() {
	    // debounce
	    clearTimeout(this._layoutTimer);
	    this._layoutTimer = setTimeout(this._layout, 50);
	  },

	  _onEnter: function _onEnter(id) {
	    this.setState({ activeId: id });
	  },

	  _onLeave: function _onLeave() {
	    this.setState({ activeId: null });
	  },

	  _renderItems: function _renderItems(items) {
	    return items.map(function (item, index) {
	      var classes = [CLASS_ROOT + "__item"];
	      var active = this.state.activeId === item.id || this.props.data.links.some(function (link) {
	        return (link.parentId === item.id || link.childId === item.id) && (link.parentId === this.state.activeId || link.childId === this.state.activeId);
	      }, this);
	      if (active) {
	        classes.push(CLASS_ROOT + "__item--active");
	      }
	      return React.createElement(
	        'li',
	        { key: index, id: item.id, className: classes.join(' '),
	          onMouseEnter: this._onEnter.bind(this, item.id),
	          onMouseLeave: this._onLeave.bind(this, item.id) },
	        item.node
	      );
	    }, this);
	  },

	  _renderCategories: function _renderCategories(categories) {
	    var result = categories.map(function (category) {
	      return React.createElement(
	        'li',
	        { key: category.id, className: CLASS_ROOT + "__category" },
	        React.createElement(
	          'ul',
	          { className: CLASS_ROOT + "__category-items" },
	          this._renderItems(category.items)
	        ),
	        React.createElement(
	          'div',
	          { className: CLASS_ROOT + "__category-label" },
	          category.label
	        )
	      );
	    }, this);
	    return result;
	  },

	  render: function render() {
	    var classes = [CLASS_ROOT];
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }

	    var categories = [];
	    if (this.props.data.categories) {
	      categories = this._renderCategories(this.props.data.categories);
	    }

	    return React.createElement(
	      'div',
	      { ref: 'map', className: classes.join(' ') },
	      React.createElement('canvas', { ref: 'canvas', className: CLASS_ROOT + "__canvas",
	        width: this.state.canvasWidth, height: this.state.canvasHeight }),
	      React.createElement('canvas', { ref: 'highlightCanvas', className: CLASS_ROOT + "__canvas " + CLASS_ROOT + "__canvas--highlight",
	        width: this.state.canvasWidth, height: this.state.canvasHeight }),
	      React.createElement(
	        'ol',
	        { className: CLASS_ROOT + "__categories" },
	        categories
	      )
	    );
	  }

	});

	module.exports = ResourceMap;

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Link = __webpack_require__(2).Link;
	var Article = __webpack_require__(65);
	var Menu = __webpack_require__(17);
	var EditIcon = __webpack_require__(97);
	var FilterIcon = __webpack_require__(99);
	var CheckBox = __webpack_require__(121);
	var Button = __webpack_require__(81);

	var MenuDoc = React.createClass({
	  displayName: 'MenuDoc',

	  _onClick: function _onClick() {
	    // no-op
	  },

	  render: function render() {
	    var inline = "<Menu>\n  <Link to={route}>{label}</Link>\n  ...\n</Menu>";
	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Menu'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Presents a list of choices responsively.'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            inline
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Options'
	        ),
	        React.createElement(
	          'dl',
	          null,
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'closeOnClick  true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Indicates whether the opened menu drop down should close when clicked. Default is true.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'inline        true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Indicates whether the menu should be shown inline or a control shown to open it in a drop down. If false, the specified label or icon will be shown, if neither are specified, a default icon will be shown.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'dropAlign     ',
	              "{left: left|right, right: left|right, top: top|bottom, bottom: top|bottom}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Where to place the drop down. At most one of left or right and one of top or bottom should be specified.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'icon          ',
	              "{icon}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Indicates that the menu should be collapsed and the icon shown as a control top open it.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'label         ',
	              "{text}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Indicates that the menu should be collapsed and the label shown as a control top open it.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'responsive   true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether an inline menu should be automatically switched to a control + drop down when the window size is reduced.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'small         true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Indicates that the menu should be rendered in a small size.'
	          )
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Options for ',
	          React.createElement(
	            Link,
	            { to: 'develop_box' },
	            'Box'
	          ),
	          ' area also available.'
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Examples'
	        ),
	        React.createElement(
	          'h3',
	          null,
	          '(column, inline)'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Menu,
	            null,
	            React.createElement(
	              'a',
	              { href: '#', className: 'active' },
	              'First'
	            ),
	            React.createElement(
	              'a',
	              { href: '#' },
	              'Second'
	            ),
	            React.createElement(
	              'a',
	              { href: '#' },
	              'Third'
	            )
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Menu> ..."
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'row, (inline)'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Menu,
	            { direction: 'row' },
	            React.createElement(
	              'a',
	              { href: '#', className: 'active' },
	              'First'
	            ),
	            React.createElement(
	              'a',
	              { href: '#' },
	              'Second'
	            ),
	            React.createElement(
	              'a',
	              { href: '#' },
	              'Third'
	            )
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Menu direction=\"row\"> ..."
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'row, end, (inline)'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Menu,
	            { direction: 'row', justify: 'end' },
	            React.createElement(
	              'a',
	              { href: '#', className: 'active' },
	              'First'
	            ),
	            React.createElement(
	              'a',
	              { href: '#' },
	              'Second'
	            ),
	            React.createElement(
	              'a',
	              { href: '#' },
	              'Third'
	            )
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Menu direction=\"row\" justify=\"end\"> ..."
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'label, (not inline, down)'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Menu,
	            { label: 'Label' },
	            React.createElement(
	              'a',
	              { href: '#', className: 'active' },
	              'First'
	            ),
	            React.createElement(
	              'a',
	              { href: '#' },
	              'Second'
	            ),
	            React.createElement(
	              'a',
	              { href: '#' },
	              'Third'
	            )
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Menu label=\"Label\"> ..."
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'not inline, (icon, down)'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Menu,
	            { inline: false },
	            React.createElement(
	              'a',
	              { href: '#', className: 'active' },
	              'First'
	            ),
	            React.createElement(
	              'a',
	              { href: '#' },
	              'Second'
	            ),
	            React.createElement(
	              'a',
	              { href: '#' },
	              'Third'
	            )
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Menu inline={false}> ..."
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'icon, (not inline, down)'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Menu,
	            { icon: React.createElement(EditIcon, null) },
	            React.createElement(
	              'a',
	              { href: '#', className: 'active' },
	              'First'
	            ),
	            React.createElement(
	              'a',
	              { href: '#' },
	              'Second'
	            ),
	            React.createElement(
	              'a',
	              { href: '#' },
	              'Third'
	            )
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Menu icon={<EditIcon />}> ..."
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'icon, (not inline, down), do not close on click, pad'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Menu,
	            { icon: React.createElement(FilterIcon, null), closeOnClick: false, pad: 'medium' },
	            React.createElement(CheckBox, { id: 'check-1', label: 'first' }),
	            React.createElement(CheckBox, { id: 'check-2', label: 'second' }),
	            React.createElement(CheckBox, { id: 'check-3', label: 'third' })
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Menu icon={<FilterIcon />} closeOnClick={false} pad=\"medium\"> ..."
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'not inline, up'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Menu,
	            { inline: false, dropAlign: { bottom: "bottom" } },
	            React.createElement(
	              'a',
	              { href: '#', className: 'active' },
	              'First'
	            ),
	            React.createElement(
	              'a',
	              { href: '#' },
	              'Second'
	            ),
	            React.createElement(
	              'a',
	              { href: '#' },
	              'Third'
	            )
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Menu inline={false} dropAlign={{bottom: \"bottom\"}}> ..."
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'not inline, small'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Menu,
	            { inline: false, small: true },
	            React.createElement(
	              'a',
	              { href: '#', className: 'active' },
	              'First'
	            ),
	            React.createElement(
	              'a',
	              { href: '#' },
	              'Second'
	            ),
	            React.createElement(
	              'a',
	              { href: '#' },
	              'Third'
	            )
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Menu inline={false} small={true}> ..."
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'button bar'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Menu,
	            { direction: 'row' },
	            React.createElement(Button, { label: 'Button 1', onClick: this._onClick }),
	            React.createElement(Button, { label: 'Button 2', onClick: this._onClick }),
	            React.createElement(Button, { label: 'Button 3', onClick: this._onClick })
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Menu direction=\"row\"> ..."
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = MenuDoc;

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var stringify = __webpack_require__(159);
	var Article = __webpack_require__(65);
	var Meter = __webpack_require__(122);
	var FormField = __webpack_require__(120);
	var RadioButton = __webpack_require__(171);

	var inline = "<Meter value={70} total={100} units=\"GB\" />";

	var simpleValue = 40;
	var simpleMin = { value: 0, label: '0 GB' };
	var simpleMax = { value: 80, label: '80 GB' };
	var simpleThreshold = 75;
	var simpleUnits = 'GB';

	var thresholds = [{ label: 'OK', value: 0, colorIndex: 'ok' }, { label: 'Warning', value: 60, colorIndex: 'warning' }, { label: 'Error', value: 70, colorIndex: 'error' }];

	var series = [{ label: 'Gen 7', value: 50 }, { label: 'Gen 8', value: 200 }, { label: 'Gen 9', value: 100 }, { label: 'Gen 10', value: 300 }, { label: 'Gen 11', value: 100 }];

	var statusSeries = [{ label: 'OK', value: 70, colorIndex: 'ok' }, { label: 'Warning', value: 15, colorIndex: 'warning' }, { label: 'Error', value: 5, colorIndex: 'error' }];
	var statusSeriesMax = 90;

	var storageSeries = [{ label: 'Physical', value: 700 }, { label: 'Subscribed', value: 1200 }, { label: 'Allocated', value: 500 }];

	var MeterDoc = React.createClass({
	  displayName: 'MeterDoc',

	  getInitialState: function getInitialState() {
	    return { simpleValue: simpleValue };
	  },

	  _onChangeSimpleValue: function _onChangeSimpleValue(event) {
	    this.setState({ simpleValue: parseInt(event.target.value) });
	  },

	  _onChangeSize: function _onChangeSize(size) {
	    this.setState({ size: size });
	  },

	  render: function render() {
	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Meter'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Shows a bar, arc, or circular meter graphic.'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            inline
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Options'
	        ),
	        React.createElement(
	          'dl',
	          null,
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'important   ',
	              "{number}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'The index of the series data that the active label should correspond to, if any.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'large       true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Larger sized version. Deprecated, use ',
	            React.createElement(
	              'code',
	              null,
	              'size'
	            ),
	            '.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'legend      ',
	              "{placement: right|bottom, total: true|false}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether to show a legend. If showing, whether to include a total, and where to place it. If placement is not specified, it will be placed to match the aspect ratio of the window.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'max         ',
	              "{value: , label: }|{number}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'The largest possible value. Defaults to 100.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'min         ',
	              "{value: , label: }|{number}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'The smallest possible value. Defaults to 0.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'series     ',
	              "[{value: , label: , colorIndex: , important: , onClick: }, ...]"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'An array of objects describing the data. Either this or the ',
	            React.createElement(
	              'code',
	              null,
	              'value'
	            ),
	            ' property must be provided.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'size         small|medium|large'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'The size of the Meter. Defaults to ',
	            React.createElement(
	              'code',
	              null,
	              'medium'
	            ),
	            '. Currently, the ',
	            React.createElement(
	              'code',
	              null,
	              'spiral'
	            ),
	            ' type Meter does not respond to this property.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'small        true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Smaller sized version. Deprecated, use ',
	            React.createElement(
	              'code',
	              null,
	              'size'
	            ),
	            '.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'threshold   ',
	              "{number}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Optional threshold value.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'thresholds     ',
	              "[{value: , label: , colorIndex: }, ...]"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'An array of objects describing thresholds.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'type         bar|arc|circle|spiral'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether to draw a bar, an arc, a circle, or a spiral.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'units       ',
	              "{string}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Optional units to display next to the value label.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'value       ',
	              "{number}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'The current value.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'vertical       true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether to orient a bar or arc Meter vertically.'
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Examples'
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Bar'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Meter, { value: this.state.simpleValue, size: this.state.size })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Meter value={" + this.state.simpleValue + "} />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Bar, Vertical'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Meter, { value: this.state.simpleValue, size: this.state.size, vertical: true })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Meter value={" + this.state.simpleValue + "} vertical={true} />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Arc'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Meter, { value: this.state.simpleValue, size: this.state.size, type: 'arc' })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Meter value={" + this.state.simpleValue + "} type=\"arc\" />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Arc, Vertical'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Meter, { value: this.state.simpleValue, size: this.state.size, type: 'arc', vertical: true })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Meter value={" + this.state.simpleValue + "} type=\"arc\" vertical={true} />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Circle'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Meter, { value: this.state.simpleValue, size: this.state.size, type: 'circle' })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Meter value={" + this.state.simpleValue + "} type=\"circle\" />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Spiral'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Meter, { value: this.state.simpleValue, size: this.state.size, type: 'spiral' })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Meter value={" + this.state.simpleValue + "} type=\"spiral\" />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Bar, Min, Max, Units, Threshold'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Meter, { value: this.state.simpleValue, size: this.state.size,
	            min: simpleMin, max: simpleMax, threshold: simpleThreshold,
	            units: simpleUnits })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Meter value={" + this.state.simpleValue + "}\n" + " min={" + stringify(simpleMin) + "}\n" + " max={" + stringify(simpleMax) + "}\n" + " threshold={" + simpleThreshold + "}\n" + " units=\"" + simpleUnits + "\" />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Bar, Min, Max, Units, Thresholds, Vertical'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Meter, { value: this.state.simpleValue, size: this.state.size,
	            min: simpleMin, max: simpleMax, threshold: simpleThreshold,
	            units: simpleUnits, vertical: true })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Meter value={" + this.state.simpleValue + "}\n" + " min={" + stringify(simpleMin) + "}\n" + " max={" + stringify(simpleMax) + "}\n" + " threshold={" + simpleThreshold + "}\n" + " units=\"" + simpleUnits + "\" vertical={true} />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Arc, Min, Max, Units, Thresholds'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Meter, { type: 'arc', value: this.state.simpleValue, size: this.state.size,
	            min: simpleMin, max: simpleMax, thresholds: thresholds,
	            units: simpleUnits })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Meter type=\"arc\" value={" + this.state.simpleValue + "}\n" + " min={" + stringify(simpleMin) + "}\n" + " max={" + stringify(simpleMax) + "}\n" + " thresholds={" + stringify(thresholds) + "}\n" + " units=\"" + simpleUnits + "\" />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Arc, Min, Max, Units, Thresholds, Vertical'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Meter, { type: 'arc', value: this.state.simpleValue, size: this.state.size,
	            min: simpleMin, max: simpleMax, threshold: simpleThreshold,
	            units: simpleUnits, vertical: true })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Meter type=\"arc\" value={" + this.state.simpleValue + "}\n" + " min={" + stringify(simpleMin) + "}\n" + " max={" + stringify(simpleMax) + "}\n" + " threshold={" + simpleThreshold + "}\n" + " units=\"" + simpleUnits + "\" vertical={true} />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Circle, Min, Max, Units, Threshold'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Meter, { type: 'circle', value: this.state.simpleValue, size: this.state.size,
	            min: simpleMin, max: simpleMax, threshold: simpleThreshold,
	            units: simpleUnits })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Meter type=\"circle\" value={" + this.state.simpleValue + "}\n" + " min={" + stringify(simpleMin) + "}\n" + " max={" + stringify(simpleMax) + "}\n" + " threshold={" + simpleThreshold + "}\n" + " units=\"" + simpleUnits + "\" />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Bar, Series, Legend'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Meter, { legend: true, series: series, size: this.state.size })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Meter legend={true}\n " + "series={" + stringify(series) + "}  />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Bar, Series, Legend, Vertical'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Meter, { legend: true, series: series, size: this.state.size, vertical: true })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Meter legend={true}\n" + " series={" + stringify(series) + "}\n" + " vertical={true} />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Arc, Series, Legend'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Meter, { type: 'arc', legend: true, series: series, size: this.state.size })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Meter type=\"arc\" legend={true}\n " + "series={" + stringify(series) + "} />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Arc, Series, Legend, Vertical, Units'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Meter, { type: 'arc', legend: true, series: storageSeries, size: this.state.size, vertical: true, units: 'TB' })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Meter type=\"arc\" legend={true} units=\"TB\"\n " + "series={" + stringify(storageSeries) + "}\n" + " vertical={true} />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Circle, Series, Legend'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Meter, { type: 'circle', legend: true, series: series, size: this.state.size })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Meter type=\"circle\" legend={true}\n " + "series={" + stringify(series) + "} />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Spiral, Series, Status'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Meter, { type: 'spiral', series: statusSeries, size: this.state.size, max: statusSeriesMax })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Meter type=\"spiral\" max={" + statusSeriesMax + "}\n " + "series={" + stringify(statusSeries) + "} />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Spiral, Series, Storage'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Meter, { type: 'spiral', series: storageSeries, size: this.state.size, units: 'TB' })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Meter type=\"spiral\" units=\"TB\"\n " + "series={" + stringify(storageSeries) + "} />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Bar, Small'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Meter, { value: this.state.simpleValue, size: 'small' })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Meter value={" + this.state.simpleValue + "} size=\"small\" />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Arc, Small'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Meter, { value: this.state.simpleValue, type: 'arc', size: 'small' })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Meter value={" + this.state.simpleValue + "} type=\"arc\" size=\"small\" />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Circle, Small'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Meter, { value: this.state.simpleValue, type: 'circle', size: 'small' })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Meter value={" + this.state.simpleValue + "} type=\"circle\" size=\"small\" />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Bar, Large'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Meter, { value: this.state.simpleValue, size: 'large' })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Meter value={" + this.state.simpleValue + "} size=\"large\" />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Arc, Large'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Meter, { value: this.state.simpleValue, type: 'arc', size: 'large' })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Meter value={" + this.state.simpleValue + "} type=\"arc\" size=\"large\" />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Circle, Large'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Meter, { value: this.state.simpleValue, type: 'circle', size: 'large' })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Meter value={" + this.state.simpleValue + "} type=\"circle\" size=\"large\" />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Bar, Loading'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Meter, { value: undefined, size: this.state.size })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Meter value={undefined} />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Arc, Loading'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Meter, { value: undefined, size: this.state.size, type: 'arc' })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Meter value={undefined} type=\"arc\" />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Spiral, Loading'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Meter, { value: undefined, size: this.state.size, type: 'spiral' })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Meter value={undefined} type=\"spiral\" />"
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          FormField,
	          { label: 'Value', htmlFor: 'value', help: this.state.simpleValue },
	          React.createElement('input', { id: 'value', name: 'value', type: 'range',
	            min: '0', max: '80', value: this.state.simpleValue,
	            onChange: this._onChangeSimpleValue })
	        ),
	        React.createElement(
	          FormField,
	          { label: 'Size' },
	          React.createElement(RadioButton, { id: 'size-small', name: 'size', label: 'Small',
	            checked: 'small' === this.state.size,
	            onChange: this._onChangeSize.bind(this, 'small') }),
	          React.createElement(RadioButton, { id: 'size-medium', name: 'size', label: 'Medium',
	            checked: 'medium' === this.state.size,
	            onChange: this._onChangeSize.bind(this, 'medium') }),
	          React.createElement(RadioButton, { id: 'size-large', name: 'size', label: 'Large',
	            checked: 'large' === this.state.size,
	            onChange: this._onChangeSize.bind(this, 'large') })
	        )
	      )
	    );
	  }
	});

	module.exports = MeterDoc;

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Article = __webpack_require__(65);
	var Sidebar = __webpack_require__(87);
	var Header = __webpack_require__(69);
	var Footer = __webpack_require__(72);
	var Title = __webpack_require__(70);
	var Menu = __webpack_require__(17);
	var CloseIcon = __webpack_require__(15);
	var Gravatar = __webpack_require__(126);
	var Search = __webpack_require__(124);

	var NavigationDoc = React.createClass({
	  displayName: 'NavigationDoc',

	  render: function render() {
	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Navigation'
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Primary menu'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'A primary navigation menu provides top level navigation to sub-areas of the application. When real estate allows, it can remain open for quick, frequent access.'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Sidebar,
	            { primary: true },
	            React.createElement(
	              Header,
	              { large: true, flush: false },
	              React.createElement(
	                Title,
	                null,
	                React.createElement(
	                  'span',
	                  null,
	                  'App'
	                )
	              ),
	              React.createElement(
	                Menu,
	                null,
	                React.createElement(
	                  'div',
	                  null,
	                  React.createElement(CloseIcon, null)
	                )
	              )
	            ),
	            React.createElement(
	              Menu,
	              { direction: 'column', flush: false },
	              React.createElement(
	                'a',
	                null,
	                'First area'
	              ),
	              React.createElement(
	                'a',
	                null,
	                'Second area'
	              ),
	              React.createElement(
	                'a',
	                null,
	                'Third area'
	              )
	            ),
	            React.createElement(
	              Footer,
	              null,
	              React.createElement(
	                Menu,
	                { icon: React.createElement(Gravatar, { email: '', 'default': 'mm' }), dropAlign: { bottom: 'bottom' } },
	                React.createElement(
	                  'a',
	                  null,
	                  'Logout'
	                )
	              )
	            )
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Search'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Search is both a primary navigation capability from the dashboard page and an integral part of reducing content lists to enable simple navigation to a particular item.'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Header,
	            null,
	            React.createElement(
	              'span',
	              null,
	              React.createElement(
	                Title,
	                null,
	                'App'
	              ),
	              React.createElement(Search, { inline: true })
	            ),
	            React.createElement(
	              Menu,
	              null,
	              React.createElement(Gravatar, { email: '', 'default': 'mm' })
	            )
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = NavigationDoc;

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Article = __webpack_require__(65);
	var RadioButton = __webpack_require__(171);

	var RadioButtonDoc = React.createClass({
	  displayName: 'RadioButtonDoc',

	  getInitialState: function getInitialState() {
	    return { choice: 'choice-1' };
	  },

	  _onChange: function _onChange(choice) {
	    this.setState({ choice: choice });
	  },

	  render: function render() {
	    var inline = ["<RadioButton id=\"item2\" label=\"Item 1\">"].join("\n");
	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'RadioButton'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'A radio button in a web form. We have a separate component from the browser base so we can style it.'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            inline
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Options'
	        ),
	        React.createElement(
	          'dl',
	          null,
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'checked         true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Same as React ',
	            "<input checked= >",
	            '.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'defaultChecked  true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Same as React ',
	            "<input defaultChecked= >",
	            '.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'disabled        true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Same as React ',
	            "<input disabled= >",
	            '.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'id              ',
	              "{text}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'The DOM id attribute value to use for the underlying',
	            "<input>",
	            ' element.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'label           ',
	              "{text}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Label text to place next to the control.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'name            ',
	              "{text}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'The DOM name attribute value to use for the underlying',
	            "<input>",
	            ' element.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'onChange        ',
	              "{func}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Same as React ',
	            "<input onChange= >",
	            '.'
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Example'
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Basic'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(RadioButton, { id: 'choice1-1', name: 'choice1', label: 'Choice 1',
	            checked: this.state.choice === 'choice-1',
	            onChange: this._onChange.bind(this, 'choice-1') }),
	          React.createElement(RadioButton, { id: 'choice1-2', name: 'choice1', label: 'Choice 2',
	            checked: this.state.choice === 'choice-2',
	            onChange: this._onChange.bind(this, 'choice-2') })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<RadioButton id=\"\{choice1-1\}\" name=\"choice\" label=\"Choice 1\"/>"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Disabled'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(RadioButton, { id: 'choice2-1', name: 'choice2', label: 'Choice 1',
	            checked: this.state.choice === 'choice-1', disabled: true,
	            onChange: this._onChange.bind(this, 'choice-1') }),
	          React.createElement(RadioButton, { id: 'choice2-2', name: 'choice2', label: 'Choice 2',
	            checked: this.state.choice === 'choice-2', disabled: true,
	            onChange: this._onChange.bind(this, 'choice-2') })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<RadioButton id=\"\{choice1-1\}\" name=\"choice\" label=\"Choice 1\" disabled={true}/>"
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = RadioButtonDoc;

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Article = __webpack_require__(65);

	var RestDoc = React.createClass({
	  displayName: 'RestDoc',

	  render: function render() {
	    var inline = ["Rest", "  .get('/rest/index/resources', params)", "  .end(this._onResponse);"].join('\n');

	    var example = ["var Component = React.createClass({", "  ...", "  _onResponse: function (err, res) {", "    if (err && err.timeout > 1000) {", "      this.setState({error: 'Timeout', result: {}});", "    } else if (res.status === 400) {", "      Actions.logout();", "    } else if (!res.ok) {", "      this.setState({error: res.body || res.text, result: {}});", "    } else {", "      var result = res.body;", "      this.setState({result: result, error: null});", "    }", "  },", "  _getData: function () {", "    Rest.get('/rest/index/resources', this.state.options.params)", "      .end(this._onResponse);", "  },", "  ...", "});"].join('\n');

	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Rest'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Perform REST calls. Uses ',
	          React.createElement(
	            'a',
	            { href: 'https://github.com/visionmedia/superagent' },
	            'superagent'
	          ),
	          ' under the hood.'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'javascript' },
	            inline
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Methods'
	        ),
	        React.createElement(
	          'dl',
	          null,
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'del (uri)'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Delete the resource indicated by the uri.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'get (uri, object)'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Get the resource indicated by the uri and optional query parameters. The second argument will be converted into a query string.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'head (uri, object)'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Chek the resource indicated by the uri and optional query parameters. The second argument will be converted into a query string.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'patch (uri, data)'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Update some of the resource indicated by the uri with the provided data.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'post (uri, data)'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Create a resource under the indicated uri with the provided data.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'put (uri, data)'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Create or update the resource indicated by the uri with the provided data.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'setHeader (name, value)'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Set a default HTTP header.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'setHeaders (object)'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Set multiple HTTP headers.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'setTimeout'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Set the default request timeout.'
	          )
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Note, the object returned from head, get, patch, post, put, and del is the superagent request object. You must call ',
	          React.createElement(
	            'code',
	            null,
	            'end()'
	          ),
	          ' to actually perform the request.'
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Example'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'javascript' },
	            example
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = RestDoc;

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Article = __webpack_require__(65);

	var RestWatchDoc = React.createClass({
	  displayName: 'RestWatchDoc',

	  render: function render() {
	    var inline = ["var requestId = RestWatch.start('/rest/index/resources', params,\n  this._onResponse);"].join('\n');

	    var example = ["var Component = React.createClass({", "  ...", "  _onUpdate: function (result) {", "    this.setState({result: result});", "  },", "  _getData: function () {", "    this._request = RestWatch.start('/rest/index/resources',", "      this.state.options.params, this._onUpdate);", "  },", "  ...", "});"].join('\n');

	    var message = ["{", "  id: <id string>,", "  url: <url string>,", "  params: <params object>", "}"].join('\n');

	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'RestWatch'
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'p',
	          null,
	          'Attempts to use WebSocket to receive asynchronous updates of changes in responses to REST calls. If WebSocket is not available, it falls back to polling REST requests to the server every 10 seconds. For asynchronous WebSocket support, it relies on the server side supporting web sockets and supporting the interaction protocol used by RestWatch.'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'javascript' },
	            inline
	          )
	        ),
	        React.createElement(
	          'p',
	          null,
	          'WebSocket messages sent to the server are JSON and look like this:'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'javascript' },
	            message
	          )
	        ),
	        React.createElement(
	          'p',
	          null,
	          'RestWatch is resilient to the server restarting. If the connection is lost, RestWatch will poll every five seconds trying to re-establish the connection. When the connection is restored, all active watching is automatically resumed.'
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Methods'
	        ),
	        React.createElement(
	          'dl',
	          null,
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'initialize'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Initiate a connection to the server. This is optional as the ',
	            React.createElement(
	              'code',
	              null,
	              'start()'
	            ),
	            ' method will perform this if needed.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'start  (url, params, function (data) ',
	              ')'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Start watching the response to the REST request defined by the specified url and parameters. When updates are received, the handler function is called with the data returned from the server. This returns an opaque requestId object that must be used for corresponding calls to ',
	            React.createElement(
	              'code',
	              null,
	              'stop()'
	            ),
	            '.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'stop   (requestId)'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Stop watching the response to the REST request defined by the specified url and parameters.'
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Example'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'javascript' },
	            example
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = RestWatchDoc;

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Article = __webpack_require__(65);
	var Search = __webpack_require__(124);

	var SearchDoc = React.createClass({
	  displayName: 'SearchDoc',

	  getInitialState: function getInitialState() {
	    return { value: "ite" };
	  },

	  _onChange: function _onChange(value) {
	    this.setState({ value: value });
	  },

	  render: function render() {
	    var inline = "<Search onChange={...} />";
	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Search'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'A responsive search control.'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            inline
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Options'
	        ),
	        React.createElement(
	          'dl',
	          null,
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'defaultValue  ',
	              "{string}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'What text to start with in the input.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'dropAlign     ',
	              "{left: left|right, right: left|right, top: top|bottom, bottom: top|bottom}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Where to place the drop down. At most one of left or right and one of top or bottom should be specified.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'inline        true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Indicates that the search input should always be visible.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'onChange      ',
	              "function ({text}) {...}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Function that will be called when the user types some text.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'placeHolder   ',
	              "{string}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Placeholder text to use when the input is empty.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'suggestions   [',
	              "{string}",
	              ', ...]'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Suggestions'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'value  ',
	              "{string}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'What text to show in the input.'
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Examples'
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Default'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Search, null)
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Search />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Left'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Search, { dropAlign: { right: 'right' } })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Search dropAlign={{right: \"right\"}} />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Suggestions and Default Value'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Search, { defaultValue: this.state.value,
	            suggestions: ['item 1', 'item 2', 'item 3'],
	            onChange: this._onChange })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Search defaultValue=\"" + this.state.value + "\" suggestions={...} />"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Inline'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Search, { inline: true })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Search inline={true}/>"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Inline, Default Value, and Suggestions'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Search, { inline: true, value: this.state.value,
	            suggestions: ['item 1', 'item 2', 'item 3'],
	            onChange: this._onChange })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Search inline={true} value=\"" + this.state.value + "\" suggestions={[...]}/>"
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = SearchDoc;

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Article = __webpack_require__(65);
	var SearchInput = __webpack_require__(172);

	var SearchInputDoc = React.createClass({
	  displayName: 'SearchInputDoc',

	  getInitialState: function getInitialState() {
	    return { value: "one", suggestions: this._values };
	  },

	  _values: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'],

	  _onChange: function _onChange(value, selected) {
	    if (selected) {
	      this.setState({ value: value, suggestions: this._values });
	    } else {
	      var regexp = new RegExp('^' + value);
	      var suggestions = this._values.filter(function (val) {
	        return regexp.test(val);
	      });
	      this.setState({ value: value, suggestions: suggestions });
	    }
	  },

	  render: function render() {
	    var inline = "<SearchInput onChange={...} onSearch={...} />";
	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'SearchInput'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'An input field with a search control.'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            inline
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Options'
	        ),
	        React.createElement(
	          'dl',
	          null,
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'defaultValue  ',
	              "{value: , label: }|{string}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'What text to start with in the input.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'id            ',
	              "{string}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'The id attribute of the input.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'name          ',
	              "{string}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'The name attribute of the input.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'onChange      ',
	              "function ({value: , label: }|{string}, selected) {...}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Function that will be called when the user types some text into the input. selected will be true when the user has chosen one of the suggestions.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'placeHolder   ',
	              "{string}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Placeholder text to use when the input is empty.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'suggestions   ',
	              "[{value: , label: }|{string}, ...]"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Suggestions'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'value         ',
	              "{value: , label: }|{string}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'What text to put in the input.'
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Example'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(SearchInput, { id: 'item2', name: 'item-2',
	            value: this.state.value, onChange: this._onChange,
	            onSearch: this._onSearch,
	            suggestions: this.state.suggestions })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<SearchInput value=\"" + this.state.value + "\" />"
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = SearchInputDoc;

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var Link = __webpack_require__(2).Link;
	var Article = __webpack_require__(65);
	var Section = __webpack_require__(73);
	var Menu = __webpack_require__(17);

	var inline = "<Section>\n" + "  ...\n" + "</Section>";

	var SectionDoc = React.createClass({
	  displayName: 'SectionDoc',

	  render: function render() {
	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Section'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Responsively grouping related contents inside a page.'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            inline
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Options'
	        ),
	        React.createElement(
	          'dl',
	          null,
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'primary      true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether it should be treated as main content or not. Used for Accessibility.'
	          )
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Options for ',
	          React.createElement(
	            Link,
	            { to: 'develop_box' },
	            'Box'
	          ),
	          ' are also available.'
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Examples'
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Menu and Document'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Section,
	            { direction: 'right' },
	            React.createElement(
	              Menu,
	              null,
	              React.createElement(
	                'span',
	                null,
	                'Link 1'
	              ),
	              React.createElement(
	                'span',
	                null,
	                'Link 2'
	              )
	            ),
	            React.createElement(
	              Article,
	              null,
	              React.createElement(
	                'h2',
	                null,
	                'Sample Content'
	              )
	            )
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Section direction=\"right\">\n  <Menu>\n    ...\n  </Menu>\n  <Document>\n    <h2>\n      Sample Content\n    </h2>\n  </Document>\n</Section>"
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = SectionDoc;

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var Article = __webpack_require__(65);
	var Sidebar = __webpack_require__(87);

	var inline = "<Sidebar>\n" + "  ...\n" + "</Sidebar>";

	var SidebarDoc = React.createClass({
	  displayName: 'SidebarDoc',

	  render: function render() {
	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Sidebar'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'A full height, fixed width container.'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            inline
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Options'
	        ),
	        React.createElement(
	          'dl',
	          null,
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'primary  true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether this is the primary application sidebar or not.'
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Example'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Sidebar,
	            { primary: true },
	            React.createElement(
	              'p',
	              null,
	              'Sample Content'
	            )
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Sidebar primary={true}>\n  <p>\n    Sample Content One\n  </p>\n</Sidebar>"
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = SidebarDoc;

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var Article = __webpack_require__(65);
	var Split = __webpack_require__(86);

	var inline = "<Split>\n" + "  ...\n" + "</Split>";

	var SplitDoc = React.createClass({
	  displayName: 'SplitDoc',

	  render: function render() {
	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Split'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'A full height container with two children laid out horizontally.'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            inline
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Options'
	        ),
	        React.createElement(
	          'dl',
	          null,
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'flex      both|left|right'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Which side to give flexible space to. The default value is \'both\'.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'separator  true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether to include a separator between the children.'
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Example'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Split,
	            null,
	            React.createElement(
	              'p',
	              null,
	              'Sample Content One'
	            ),
	            React.createElement(
	              'p',
	              null,
	              'Sample Content Two'
	            )
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Split>\n  <p>\n    Sample Content One\n  </p>\n</Split>"
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = SplitDoc;

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var Article = __webpack_require__(65);
	var Status = __webpack_require__(106);

	var inline = "<Status value=\"...\" />";

	var StatusDoc = React.createClass({
	  displayName: 'StatusDoc',

	  render: function render() {
	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Status'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'A status icon.'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            inline
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Options'
	        ),
	        React.createElement(
	          'dl',
	          null,
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'large       true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Larger sized version.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'small       true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Smaller sized version.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'value       error|warning|ok|disabled|unknown'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Which status to indicate.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'a11yTitle  ',
	              "{title}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Accessibility Title. If not set uses the default title of the status icon.'
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Example'
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'OK'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Status, { value: 'ok' })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Status value=\"ok\">"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Error'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Status, { value: 'error', a11yTitle: 'critical' })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Status value=\"error\" a11yTitle=\"critical\">"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Warning'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Status, { value: 'warning' })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Status value=\"warning\">"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Disabled'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Status, { value: 'disabled' })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Status value=\"disabled\">"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Unknown'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(Status, { value: 'unknown' })
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Status value=\"unknown\">"
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = StatusDoc;

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Article = __webpack_require__(65);
	var Table = __webpack_require__(138);

	var TableDoc = React.createClass({
	  displayName: 'TableDoc',

	  getInitialState: function getInitialState() {
	    return {
	      singleSelection: [0]
	    };
	  },

	  // single selection is managed by the caller via state.singleSelection
	  _onSingleSelect: function _onSingleSelect(selection) {
	    this.setState({ singleSelection: selection });
	  },

	  // multiple selection is managed by the Table
	  _onMultipleSelect: function _onMultipleSelect(selection) {
	    // no-op
	  },

	  render: function render() {
	    var inline = ["<Table>", "  <thead>", "    <tr>", "      <th>...</th>", "      <th>...</th>", "    </tr>", "  </thead>", "  <tbody>", "    <tr>", "      <td>...</td>", "      <td>...</td>", "    </tr>", "  </tbody>", "</Table>"].join('\n');

	    var tableHeader = React.createElement(
	      'thead',
	      null,
	      React.createElement(
	        'tr',
	        null,
	        React.createElement(
	          'th',
	          null,
	          'header 1'
	        ),
	        React.createElement(
	          'th',
	          null,
	          'header 2'
	        )
	      )
	    );

	    var tableBody = React.createElement(
	      'tbody',
	      null,
	      React.createElement(
	        'tr',
	        null,
	        React.createElement(
	          'td',
	          null,
	          'first'
	        ),
	        React.createElement(
	          'td',
	          null,
	          'note 1'
	        )
	      ),
	      React.createElement(
	        'tr',
	        null,
	        React.createElement(
	          'td',
	          null,
	          'second'
	        ),
	        React.createElement(
	          'td',
	          null,
	          'note 2'
	        )
	      ),
	      React.createElement(
	        'tr',
	        null,
	        React.createElement(
	          'td',
	          null,
	          'third'
	        ),
	        React.createElement(
	          'td',
	          null,
	          'note 3'
	        )
	      )
	    );

	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Table'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Table using standard HTML5 markup.'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            inline
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Options'
	        ),
	        React.createElement(
	          'dl',
	          null,
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'onMore        ',
	              "function () {...}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Function that will be called when more data is needed. When this callback is provided, it is an indication that more data could be added if the user scrolls to the bottom of the table. When present, Table will add a spinner to the bottom of the table and listen for the user scrolling down such that it becomes visible. When the user scrolls to the bottom, this callback will be called. The expectation is that the the caller will add the next chunk of data into the table.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'onSelect      ',
	              "function (selection) {...}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Function that will be called when the user selects a row.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'scrollable    true|false'
	            )
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'selectable    true|false|multiple'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether rows are selectable. ',
	            React.createElement(
	              'code',
	              null,
	              'multiple'
	            ),
	            ' indicates that multiple rows may be selected'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'selection     number|[number, ...]'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'The currently selected item(s).'
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Examples'
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Simple'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Table,
	            null,
	            tableBody
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Selectable'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Table,
	            { selectable: true, selection: this.state.singleSelection, onSelect: this._onSingleSelect },
	            tableHeader,
	            tableBody
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Multi-select'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Table,
	            { selectable: 'multiple', onSelect: this._onMultipleSelect },
	            tableHeader,
	            tableBody
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = TableDoc;

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Article = __webpack_require__(65);
	var Tiles = __webpack_require__(75);
	var Tile = __webpack_require__(80);
	var Header = __webpack_require__(69);
	var Footer = __webpack_require__(72);
	var Menu = __webpack_require__(17);
	var Edit = __webpack_require__(97);

	var TileDoc = React.createClass({
	  displayName: 'TileDoc',

	  render: function render() {
	    var inline = "<Tiles>\n" + "  <Tile>\n" + "    <Header>\n" + "      ...\n" + "    </Header>\n" + "    ...\n" + "    <Footer>\n" + "      ...\n" + "    </Footer>\n" + "  </Tile>\n" + "  ...\n" + "</Tiles>";

	    var richTiles = [];
	    var index = 1;
	    while (index <= 8) {
	      richTiles.push(React.createElement(
	        Tile,
	        { key: index },
	        React.createElement(
	          Header,
	          { tag: 'h4', textAlign: 'center' },
	          "Tile " + index
	        ),
	        'hello',
	        React.createElement(
	          Footer,
	          null,
	          React.createElement('span', null),
	          React.createElement(
	            Menu,
	            { icon: React.createElement(Edit, null), dropAlign: { bottom: 'bottom', right: 'right' } },
	            React.createElement(
	              'a',
	              null,
	              'action 1'
	            ),
	            React.createElement(
	              'a',
	              null,
	              'action 2'
	            ),
	            React.createElement(
	              'a',
	              null,
	              'action 3'
	            )
	          )
	        )
	      ));
	      index += 1;
	    }

	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Tile(s)'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Lay out equivalently sized tiles of content.'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            inline
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Options'
	        ),
	        React.createElement(
	          'dl',
	          null,
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'fill        true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether the contents expand to fill all of the available space.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'flush       true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether the contents are flush with the left and right edges or not. Defaults to true.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'small       true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Smaller sized version.'
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Examples'
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Simple'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Tiles,
	            null,
	            React.createElement(
	              Tile,
	              null,
	              'First'
	            ),
	            React.createElement(
	              Tile,
	              null,
	              'Second'
	            ),
	            React.createElement(
	              Tile,
	              null,
	              'Third'
	            )
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Tiles>\n  <Tile>\n    ...\n  </Tile>\n  ...\n</Tiles>"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Headers and Footers'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Tiles,
	            null,
	            richTiles
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Tiles>\n  <Tile>\n    ...\n  </Tile>\n  ...\n</Tiles>"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Fill'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Tiles,
	            { fill: true },
	            richTiles
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Tiles fill={true}>\n  ...\n</Tiles>"
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Row'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Tiles,
	            { fill: true, direction: 'row' },
	            richTiles
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Tiles fill={true} direction=\"row\">\n  ...\n</Tiles>"
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = TileDoc;

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var Article = __webpack_require__(65);
	var Title = __webpack_require__(70);

	var inline = "<Title>\n" + "  ...\n" + "</Title>";

	var TitleDoc = React.createClass({
	  displayName: 'TitleDoc',

	  render: function render() {
	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Title'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Title component usually rendered inside the Header.'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            inline
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Options'
	        ),
	        React.createElement(
	          'dl',
	          null,
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'onClick        ',
	              "{func}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Click handler.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'responsive   true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether to only display the logo when the display area narrows.'
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Examples'
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Title, simple'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Title,
	            null,
	            'Sample Title'
	          )
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            "<Title>\n  Sample Title\n</Title>"
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = TitleDoc;

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Article = __webpack_require__(65);
	var Topology = __webpack_require__(201);

	var TopologyDoc = React.createClass({
	  displayName: 'TopologyDoc',

	  render: function render() {
	    var inline = "<Topology links={[...]}>\n" + "  <Topology.Parts>\n" + "    <Topology.Part>\n" + "      ...\n" + "    </Topology.Part>\n" + "    ...\n" + "  </Topology.Parts>\n" + "</Topology>";

	    return React.createElement(
	      Article,
	      { primary: true },
	      React.createElement(
	        'header',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'Topology'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Visualize structure and connectivity.'
	        ),
	        React.createElement(
	          'pre',
	          null,
	          React.createElement(
	            'code',
	            { className: 'html' },
	            inline
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Options'
	        ),
	        React.createElement(
	          'dl',
	          null,
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'links       ',
	              "[{...}]"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'An array of: ',
	            React.createElement(
	              'code',
	              null,
	              "{ids: [<id>, ...], colorIndex: <string>}"
	            ),
	            '. The ids should reference id properties of contained Topology.Part components.'
	          )
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Available Sub Components'
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Toplogy.Part'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'An individual part. I Part can contain Parts or another Part.'
	        ),
	        React.createElement(
	          'h4',
	          null,
	          'Options'
	        ),
	        React.createElement(
	          'dl',
	          null,
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'align        start|center|between|end|stretch'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'How to align the contents along the cross axis.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'demarcate    true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether or not to visually demarcate the boundaries of the Part.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'direction    row|column'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'The orientation to layout any child components in.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'id           ',
	              "{id}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'The id of this part. The id should at least be unique within the Topology.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'justify      start|center|between|end'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'How to align the contents along the main axis.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'label        ',
	              "{label}"
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'The label of this part. This could be a part name or number, for example.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'reverse      true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether to reverse the order of the child components.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'status       error|warning|ok|disabled|unknown'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'If provided, adds the corresponding status icon.'
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Toplogy.Parts'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'A container for Part components. It is provided purely to assist with Part layout.'
	        ),
	        React.createElement(
	          'h4',
	          null,
	          'Options'
	        ),
	        React.createElement(
	          'dl',
	          null,
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'direction    row|column'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'The orientation to layout the child components in.'
	          ),
	          React.createElement(
	            'dt',
	            null,
	            React.createElement(
	              'code',
	              null,
	              'uniform    true|false'
	            )
	          ),
	          React.createElement(
	            'dd',
	            null,
	            'Whether or not to all children should be the same size.'
	          )
	        ),
	        React.createElement(
	          'h3',
	          null,
	          'Toplogy.Label'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'A label. It provides finer control over how Part labels are rendered.'
	        )
	      ),
	      React.createElement(
	        'section',
	        null,
	        React.createElement(
	          'h2',
	          null,
	          'Examples'
	        ),
	        React.createElement(
	          'div',
	          { className: 'example' },
	          React.createElement(
	            Topology,
	            { links: [{ colorIndex: "graph-1", ids: ["s1p1", "s2p1"] }, { colorIndex: "graph-1", ids: ["s1p2", "s2p2"] }, { colorIndex: "graph-2", ids: ["em1p2", "em2p1"] }, { colorIndex: "graph-2", ids: ["em2p2", "em3p1"] }, { colorIndex: "graph-2", ids: ["em3p2", "em4p1"] }, { colorIndex: "graph-2", ids: ["em4p2", "em1p1"] }] },
	            React.createElement(
	              Topology.Parts,
	              { direction: 'row' },
	              React.createElement(
	                Topology.Part,
	                { className: 'rack', direction: 'column' },
	                React.createElement(
	                  Topology.Part,
	                  { className: 'switch', direction: 'column' },
	                  React.createElement(
	                    Topology.Parts,
	                    { direction: 'row' },
	                    React.createElement(Topology.Part, { id: 's1p1', status: 'ok', label: '1',
	                      direction: 'column', demarcate: false }),
	                    React.createElement(Topology.Part, { id: 's1p2', status: 'ok', label: '2',
	                      direction: 'column', demarcate: false }),
	                    React.createElement(Topology.Part, { id: 's1p3', status: 'ok', label: '3',
	                      direction: 'column', demarcate: false }),
	                    React.createElement(Topology.Part, { id: 's1p4', status: 'ok', label: '4',
	                      direction: 'column', demarcate: false }),
	                    React.createElement(Topology.Part, { id: 's1p5', status: 'ok', label: '5',
	                      direction: 'column', demarcate: false }),
	                    React.createElement(Topology.Part, { id: 's1p6', status: 'ok', label: '6',
	                      direction: 'column', demarcate: false }),
	                    React.createElement(Topology.Part, { id: 's1p7', status: 'ok', label: '7',
	                      direction: 'column', demarcate: false }),
	                    React.createElement(Topology.Part, { id: 's1p8', status: 'ok', label: '8',
	                      direction: 'column', demarcate: false })
	                  ),
	                  React.createElement(
	                    Topology.Label,
	                    null,
	                    'HP 3100 SI'
	                  )
	                ),
	                React.createElement(
	                  Topology.Part,
	                  { className: 'enclosure', direction: 'column' },
	                  React.createElement(Topology.Part, { className: 'em',
	                    label: 'HP Virtual Connect FlexFabric-20/40 F8 Module' }),
	                  React.createElement(Topology.Part, { className: 'em',
	                    label: 'HP Virtual Connect FlexFabric-20/40 F8 Module' }),
	                  React.createElement(
	                    Topology.Parts,
	                    { direction: 'row' },
	                    React.createElement(
	                      Topology.Part,
	                      { className: 'em' },
	                      React.createElement(
	                        Topology.Parts,
	                        { direction: 'column' },
	                        React.createElement(Topology.Part, { id: 'em1p1', status: 'ok', label: '1',
	                          demarcate: false, align: 'center' }),
	                        React.createElement(Topology.Part, { id: 'em1p2', status: 'ok', label: '2',
	                          demarcate: false, align: 'center' })
	                      )
	                    ),
	                    React.createElement(Topology.Part, { className: 'fan', status: 'ok', label: '1', align: 'center' }),
	                    React.createElement(Topology.Part, { className: 'fan' }),
	                    React.createElement(Topology.Part, { className: 'fan', status: 'ok', label: '3', align: 'center' })
	                  ),
	                  React.createElement(Topology.Part, { className: 'em',
	                    label: 'HP Virtual Connect FlexFabric-20/40 F8 Module' }),
	                  React.createElement(
	                    Topology.Parts,
	                    { direction: 'row' },
	                    React.createElement(
	                      Topology.Part,
	                      { className: 'em' },
	                      React.createElement(
	                        Topology.Parts,
	                        { direction: 'column' },
	                        React.createElement(Topology.Part, { id: 'em2p1', status: 'ok', label: '1',
	                          demarcate: false, align: 'center' }),
	                        React.createElement(Topology.Part, { id: 'em2p2', status: 'ok', label: '2',
	                          demarcate: false, align: 'center' })
	                      )
	                    ),
	                    React.createElement(Topology.Part, { className: 'fan', status: 'ok', label: '4', align: 'center' }),
	                    React.createElement(Topology.Part, { className: 'fan', status: 'ok', label: '5', align: 'center' }),
	                    React.createElement(Topology.Part, { className: 'fan', status: 'ok', label: '6', align: 'center' })
	                  )
	                )
	              ),
	              React.createElement(
	                Topology.Part,
	                { className: 'rack', direction: 'column' },
	                React.createElement(
	                  Topology.Part,
	                  { className: 'switch', direction: 'column' },
	                  React.createElement(
	                    Topology.Parts,
	                    { direction: 'row' },
	                    React.createElement(Topology.Part, { id: 's2p1', status: 'ok', label: '1',
	                      direction: 'column', demarcate: false }),
	                    React.createElement(Topology.Part, { id: 's2p2', status: 'ok', label: '2',
	                      direction: 'column', demarcate: false }),
	                    React.createElement(Topology.Part, { id: 's2p3', status: 'ok', label: '3',
	                      direction: 'column', demarcate: false }),
	                    React.createElement(Topology.Part, { id: 's2p4', status: 'ok', label: '4',
	                      direction: 'column', demarcate: false }),
	                    React.createElement(Topology.Part, { id: 's2p5', status: 'ok', label: '5',
	                      direction: 'column', demarcate: false }),
	                    React.createElement(Topology.Part, { id: 's2p6', status: 'ok', label: '6',
	                      direction: 'column', demarcate: false }),
	                    React.createElement(Topology.Part, { id: 's2p7', status: 'ok', label: '7',
	                      direction: 'column', demarcate: false }),
	                    React.createElement(Topology.Part, { id: 's2p8', status: 'ok', label: '8',
	                      direction: 'column', demarcate: false }),
	                    React.createElement(Topology.Part, { id: 's2p9', status: 'ok', label: '9',
	                      direction: 'column', demarcate: false }),
	                    React.createElement(Topology.Part, { id: 's2p10', status: 'ok', label: '10',
	                      direction: 'column', demarcate: false })
	                  ),
	                  React.createElement(
	                    Topology.Label,
	                    null,
	                    'HP 5920AF-24XG'
	                  ),
	                  React.createElement(
	                    Topology.Parts,
	                    { direction: 'row' },
	                    React.createElement(Topology.Part, { id: 's2p11', status: 'ok', label: '11',
	                      direction: 'column', demarcate: false, reverse: true }),
	                    React.createElement(Topology.Part, { id: 's2p12', status: 'ok', label: '12',
	                      direction: 'column', demarcate: false, reverse: true }),
	                    React.createElement(Topology.Part, { id: 's2p13', status: 'ok', label: '13',
	                      direction: 'column', demarcate: false, reverse: true }),
	                    React.createElement(Topology.Part, { id: 's2p14', status: 'ok', label: '14',
	                      direction: 'column', demarcate: false, reverse: true }),
	                    React.createElement(Topology.Part, { id: 's2p15', status: 'ok', label: '15',
	                      direction: 'column', demarcate: false, reverse: true }),
	                    React.createElement(Topology.Part, { id: 's2p16', status: 'ok', label: '16',
	                      direction: 'column', demarcate: false, reverse: true }),
	                    React.createElement(Topology.Part, { id: 's2p17', status: 'ok', label: '17',
	                      direction: 'column', demarcate: false, reverse: true }),
	                    React.createElement(Topology.Part, { id: 's2p18', status: 'ok', label: '18',
	                      direction: 'column', demarcate: false, reverse: true }),
	                    React.createElement(Topology.Part, { id: 's2p19', status: 'ok', label: '19',
	                      direction: 'column', demarcate: false, reverse: true }),
	                    React.createElement(Topology.Part, { id: 's2p20', status: 'ok', label: '20',
	                      direction: 'column', demarcate: false, reverse: true })
	                  )
	                ),
	                React.createElement(
	                  Topology.Part,
	                  { className: 'enclosure', direction: 'column' },
	                  React.createElement(
	                    Topology.Parts,
	                    { direction: 'row' },
	                    React.createElement(
	                      Topology.Part,
	                      { className: 'em' },
	                      React.createElement(
	                        Topology.Parts,
	                        { direction: 'column' },
	                        React.createElement(Topology.Part, { id: 'em3p1', status: 'ok', label: '1',
	                          demarcate: false, align: 'center' }),
	                        React.createElement(Topology.Part, { id: 'em3p2', status: 'ok', label: '2',
	                          demarcate: false, align: 'center' })
	                      )
	                    ),
	                    React.createElement(Topology.Part, { className: 'fan', status: 'ok', label: '1', align: 'center' }),
	                    React.createElement(Topology.Part, { className: 'fan', status: 'ok', label: '2', align: 'center' }),
	                    React.createElement(Topology.Part, { className: 'fan', status: 'ok', label: '3', align: 'center' })
	                  ),
	                  React.createElement(Topology.Part, { className: 'em',
	                    label: 'HP Virtual Connect FlexFabric-20/40 F8 Module' }),
	                  React.createElement(
	                    Topology.Parts,
	                    { direction: 'row' },
	                    React.createElement(
	                      Topology.Part,
	                      { className: 'em' },
	                      React.createElement(
	                        Topology.Parts,
	                        { direction: 'column' },
	                        React.createElement(Topology.Part, { id: 'em4p1', status: 'ok', label: '1',
	                          demarcate: false, align: 'center' }),
	                        React.createElement(Topology.Part, { id: 'em4p2', status: 'ok', label: '2',
	                          demarcate: false, align: 'center' })
	                      )
	                    ),
	                    React.createElement(Topology.Part, { className: 'fan', status: 'ok', label: '4', align: 'center' }),
	                    React.createElement(Topology.Part, { className: 'fan', status: 'ok', label: '5', align: 'center' }),
	                    React.createElement(Topology.Part, { className: 'fan', status: 'ok', label: '6', align: 'center' })
	                  )
	                )
	              )
	            )
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = TopologyDoc;

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

	'use strict';

	var React = __webpack_require__(1);
	var Status = __webpack_require__(106);

	var CLASS_ROOT = "topology";

	var Label = React.createClass({
	  displayName: 'Label',

	  render: function render() {
	    return React.createElement(
	      'span',
	      { className: CLASS_ROOT + "__label" },
	      this.props.children
	    );
	  }
	});

	var Part = React.createClass({
	  displayName: 'Part',

	  propTypes: {
	    align: React.PropTypes.oneOf(['start', 'center', 'between', 'end', 'stretch']),
	    demarcate: React.PropTypes.bool,
	    direction: React.PropTypes.oneOf(['row', 'column']).isRequired,
	    id: React.PropTypes.string,
	    justify: React.PropTypes.oneOf(['start', 'center', 'between', 'end']),
	    label: React.PropTypes.string,
	    reverse: React.PropTypes.bool,
	    status: React.PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      demarcate: true,
	      direction: 'row',
	      justify: 'center',
	      align: 'stretch'
	    };
	  },

	  render: function render() {
	    var classes = [CLASS_ROOT + "__part"];
	    classes.push(CLASS_ROOT + "__part--direction-" + this.props.direction);
	    classes.push(CLASS_ROOT + "__part--justify-" + this.props.justify);
	    classes.push(CLASS_ROOT + "__part--align-" + this.props.align);
	    if (this.props.demarcate) {
	      classes.push(CLASS_ROOT + "__part--demarcate");
	    }
	    if (this.props.reverse) {
	      classes.push(CLASS_ROOT + "__part--reverse");
	    }
	    // handle undefined children
	    var realChildren = 0;
	    React.Children.forEach(this.props.children, function (child) {
	      if (child) {
	        realChildren += 1;
	      }
	    });
	    if (!this.props.status && !this.props.label && realChildren === 0) {
	      classes.push(CLASS_ROOT + "__part--empty");
	    }
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }

	    var status;
	    if (this.props.status) {
	      status = React.createElement(Status, { value: this.props.status, small: true });
	    }
	    var label;
	    if (this.props.label) {
	      label = React.createElement(
	        Label,
	        null,
	        this.props.label
	      );
	    }

	    return React.createElement(
	      'div',
	      { className: classes.join(' '), id: this.props.id,
	        onMouseEnter: this.props.onMouseEnter,
	        onMouseLeave: this.props.onMouseLeave },
	      status,
	      label,
	      this.props.children
	    );
	  }
	});

	var Parts = React.createClass({
	  displayName: 'Parts',

	  propTypes: {
	    align: React.PropTypes.oneOf(['start', 'center', 'between', 'end', 'stretch']),
	    direction: React.PropTypes.oneOf(['row', 'column']).isRequired,
	    uniform: React.PropTypes.bool
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      direction: 'column'
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    this._makeUniform();
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    this._makeUniform();
	  },

	  _makeUniform: function _makeUniform() {
	    if (this.props.uniform) {
	      var parts = this.refs.component.getDOMNode().children;
	      // clear old basis
	      for (var i = 0; i < parts.length; i += 1) {
	        parts[i].style.webkitFlexBasis = null;
	        parts[i].style.flexBasis = null;
	      }
	      // find max
	      var max = 0;
	      for (var i = 0; i < parts.length; i += 1) {
	        if ('column' === this.props.direction) {
	          max = Math.max(max, parts[i].offsetHeight);
	        } else {
	          max = Math.max(max, parts[i].offsetWidth);
	        }
	      }
	      // set basis
	      for (var i = 0; i < parts.length; i += 1) {
	        parts[i].style.webkitFlexBasis = '' + max + 'px';
	        parts[i].style.flexBasis = '' + max + 'px';
	      }
	    }
	  },

	  render: function render() {
	    var classes = [CLASS_ROOT + "__parts"];
	    classes.push(CLASS_ROOT + "__parts--direction-" + this.props.direction);
	    if (this.props.align) {
	      classes.push(CLASS_ROOT + "__parts--align-" + this.props.align);
	    }
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }
	    return React.createElement(
	      'div',
	      { ref: 'component', className: classes.join(' ') },
	      this.props.children
	    );
	  }
	});

	var Topology = React.createClass({
	  displayName: 'Topology',

	  propTypes: {
	    links: React.PropTypes.arrayOf(React.PropTypes.shape({
	      colorIndex: React.PropTypes.string,
	      ids: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
	    })),
	    linkOffset: React.PropTypes.number
	  },

	  statics: {
	    Parts: Parts,
	    Part: Part,
	    Label: Label
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      links: [],
	      linkOffset: 18
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      canvasWidth: 100,
	      canvasHeight: 100,
	      highlighting: false,
	      highlights: {}
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    var topology = React.findDOMNode(this.refs.topology);
	    topology.addEventListener('mousemove', this._onMouseMove);
	    topology.addEventListener('mouseleave', this._onMouseLeave);
	    window.addEventListener('resize', this._onResize);
	    this._layout();
	    this._cacheLinkIds(this.props.links);
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
	    this._cacheLinkIds(newProps.links);
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    this._layout();
	    this._draw();
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    var topology = React.findDOMNode(this.refs.topology);
	    topology.removeEventListener('mousemove', this._onMouseMove);
	    topology.removeEventListener('mouseleave', this._onMouseLeave);
	    clearTimeout(this._resizeTimer);
	    window.removeEventListener('resize', this._onResize);
	  },

	  _coords: function _coords(id, canvasRect) {
	    var result;
	    var element = document.getElementById(id);
	    if (!element) {
	      console.log('!!! Topology is unable to find the link target with id:', id);
	      result = [0, 0];
	    } else {
	      var rect = element.getBoundingClientRect();
	      // see if the element has a status child, use that if it does
	      var statusElements = element.querySelectorAll('.status-icon');
	      if (statusElements.length === 1) {
	        rect = statusElements[0].getBoundingClientRect();
	      }
	      result = [rect.left - canvasRect.left + rect.width / 2, rect.top - canvasRect.top + rect.height / 2];
	    }
	    return result;
	  },

	  _draw: function _draw() {
	    var canvasElement = this.refs.canvas.getDOMNode();
	    // don't draw if we don't have a canvas to draw on, such as a unit test
	    if (canvasElement.getContext) {
	      var context = canvasElement.getContext('2d');
	      var canvasRect = canvasElement.getBoundingClientRect();
	      context.clearRect(0, 0, canvasRect.width, canvasRect.height);
	      var linkOffset = this.props.linkOffset;

	      this.props.links.forEach(function (link, linkIndex) {

	        var key = this.refs[link.colorIndex];
	        var style = window.getComputedStyle(React.findDOMNode(key));
	        var color = style.getPropertyValue('background-color');
	        context.strokeStyle = color;
	        context.lineWidth = 2;
	        if (this.state.highlighting) {
	          context.lineWidth = 1;
	        }
	        context.lineCap = 'round';
	        var p1 = this._coords(link.ids[0], canvasRect);
	        if (this.state.highlights[link.ids[0]]) {
	          context.lineWidth = 4;
	        }

	        link.ids.forEach(function (id, idIndex) {
	          if (idIndex > 0) {
	            var p2 = this._coords(id, canvasRect);
	            var delta = [Math.abs(p1[0] - p2[0]), Math.abs(p1[1] - p2[1])];
	            context.beginPath();
	            context.moveTo(p1[0], p1[1]);
	            var cp1 = undefined;
	            var cp2 = undefined;

	            if (this.state.highlights[id]) {
	              context.lineWidth = 4;
	            }

	            if (delta[0] > delta[1]) {
	              // larger X delta
	              cp1 = [p1[0], Math.min(p1[1], p2[1]) + Math.max(linkOffset, delta[1] / 2) + linkIndex * 2];
	              cp2 = [p2[0], cp1[1]];
	            } else {
	              // larger Y delta or equal
	              var cp1xDelta = Math.max(linkOffset, delta[0] / 2 + linkIndex * 2);
	              if (p1[0] > p2[0]) {
	                cp1 = [p2[0] + cp1xDelta, p1[1]];
	              } else {
	                cp1 = [p1[0] - cp1xDelta, p1[1]];
	              }
	              cp2 = [cp1[0], p2[1]];
	            }

	            context.bezierCurveTo(cp1[0], cp1[1], cp2[0], cp2[1], p2[0], p2[1]);
	            context.stroke();
	          }
	        }, this);
	      }, this);
	    }
	  },

	  _layout: function _layout() {
	    var element = this.refs.contents.getDOMNode();
	    if (element.scrollWidth !== this.state.canvasWidth || element.scrollHeight !== this.state.canvasHeight) {
	      this.setState({
	        canvasWidth: element.scrollWidth,
	        canvasHeight: element.scrollHeight
	      });
	    }
	  },

	  _onResize: function _onResize() {
	    // debounce
	    clearTimeout(this._resizeTimer);
	    this._resizeTimer = setTimeout(this._layout, 50);
	  },

	  _highlight: function _highlight(element) {
	    var topology = React.findDOMNode(this.refs.topology);
	    var highlighting = false;
	    var highlights = {};
	    while (element && element !== topology) {
	      var id = element.getAttribute('id');
	      if (id && this.state.linkIds[id]) {
	        // see if we are linking to this id
	        highlighting = true;
	        highlights[id] = true;
	      }
	      element = element.parentNode;
	    }
	    this.setState({ highlighting: highlighting, highlights: highlights });
	  },

	  _onMouseMove: function _onMouseMove(event) {
	    // debounce
	    clearTimeout(this._mouseMoveTimer);
	    this._mouseMoveTimer = setTimeout(this._highlight.bind(this, event.target), 100);
	  },

	  _onMouseLeave: function _onMouseLeave() {
	    this.setState({ highlights: {} });
	  },

	  _cacheLinkIds: function _cacheLinkIds(links) {
	    // Remember which ids are used in links. This makes highlighting faster.
	    var linkIds = {};
	    links.forEach(function (link) {
	      link.ids.forEach(function (id) {
	        linkIds[id] = true;
	      });
	    });
	    this.setState({ linkIds: linkIds });
	  },

	  render: function render() {
	    var classes = [CLASS_ROOT];
	    if (this.props.className) {
	      classes.push(this.props.className);
	    }

	    var colorKeys = [];
	    var colors = {};
	    this.props.links.forEach(function (link) {
	      if (link.colorIndex && !colors[link.colorIndex]) {
	        colorKeys.push(React.createElement('div', { key: link.colorIndex, ref: link.colorIndex,
	          className: "background-color-index-" + link.colorIndex }));
	        colors[link.colorIndex] = true;
	      }
	    });

	    return React.createElement(
	      'div',
	      { ref: 'topology', className: classes.join(' ') },
	      React.createElement('canvas', { ref: 'canvas', className: CLASS_ROOT + "__canvas",
	        width: this.state.canvasWidth, height: this.state.canvasHeight }),
	      React.createElement(
	        'div',
	        { ref: 'contents', className: CLASS_ROOT + "__contents" },
	        this.props.children
	      ),
	      React.createElement(
	        'div',
	        { className: CLASS_ROOT + "__color-key" },
	        colorKeys
	      )
	    );
	  }

	});

	module.exports = Topology;

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	/*
	Syntax highlighting with language autodetection.
	https://highlightjs.org/
	*/

	'use strict';

	(function (factory) {

	  // Setup highlight.js for different environments. First is Node.js or
	  // CommonJS.
	  if (true) {
	    factory(exports);
	  } else {
	    // Export hljs globally even when using AMD for cases when this script
	    // is loaded with others that may still expect a global hljs.
	    window.hljs = factory({});

	    // Finally register the global hljs with AMD.
	    if (typeof define === 'function' && define.amd) {
	      define('hljs', [], function () {
	        return window.hljs;
	      });
	    }
	  }
	})(function (hljs) {

	  /* Utility functions */

	  function escape(value) {
	    return value.replace(/&/gm, '&amp;').replace(/</gm, '&lt;').replace(/>/gm, '&gt;');
	  }

	  function tag(node) {
	    return node.nodeName.toLowerCase();
	  }

	  function testRe(re, lexeme) {
	    var match = re && re.exec(lexeme);
	    return match && match.index == 0;
	  }

	  function isNotHighlighted(language) {
	    return (/^(no-?highlight|plain|text)$/i.test(language)
	    );
	  }

	  function blockLanguage(block) {
	    var i,
	        match,
	        length,
	        classes = block.className + ' ';

	    classes += block.parentNode ? block.parentNode.className : '';

	    // language-* takes precedence over non-prefixed class names
	    match = /\blang(?:uage)?-([\w-]+)\b/i.exec(classes);
	    if (match) {
	      return getLanguage(match[1]) ? match[1] : 'no-highlight';
	    }

	    classes = classes.split(/\s+/);
	    for (i = 0, length = classes.length; i < length; i++) {
	      if (getLanguage(classes[i]) || isNotHighlighted(classes[i])) {
	        return classes[i];
	      }
	    }
	  }

	  function inherit(parent, obj) {
	    var result = {},
	        key;
	    for (key in parent) result[key] = parent[key];
	    if (obj) for (key in obj) result[key] = obj[key];
	    return result;
	  }

	  /* Stream merging */

	  function nodeStream(node) {
	    var result = [];
	    (function _nodeStream(node, offset) {
	      for (var child = node.firstChild; child; child = child.nextSibling) {
	        if (child.nodeType == 3) offset += child.nodeValue.length;else if (child.nodeType == 1) {
	          result.push({
	            event: 'start',
	            offset: offset,
	            node: child
	          });
	          offset = _nodeStream(child, offset);
	          // Prevent void elements from having an end tag that would actually
	          // double them in the output. There are more void elements in HTML
	          // but we list only those realistically expected in code display.
	          if (!tag(child).match(/br|hr|img|input/)) {
	            result.push({
	              event: 'stop',
	              offset: offset,
	              node: child
	            });
	          }
	        }
	      }
	      return offset;
	    })(node, 0);
	    return result;
	  }

	  function mergeStreams(original, highlighted, value) {
	    var processed = 0;
	    var result = '';
	    var nodeStack = [];

	    function selectStream() {
	      if (!original.length || !highlighted.length) {
	        return original.length ? original : highlighted;
	      }
	      if (original[0].offset != highlighted[0].offset) {
	        return original[0].offset < highlighted[0].offset ? original : highlighted;
	      }

	      /*
	      To avoid starting the stream just before it should stop the order is
	      ensured that original always starts first and closes last:
	       if (event1 == 'start' && event2 == 'start')
	        return original;
	      if (event1 == 'start' && event2 == 'stop')
	        return highlighted;
	      if (event1 == 'stop' && event2 == 'start')
	        return original;
	      if (event1 == 'stop' && event2 == 'stop')
	        return highlighted;
	       ... which is collapsed to:
	      */
	      return highlighted[0].event == 'start' ? original : highlighted;
	    }

	    function open(node) {
	      function attr_str(a) {
	        return ' ' + a.nodeName + '="' + escape(a.value) + '"';
	      }
	      result += '<' + tag(node) + Array.prototype.map.call(node.attributes, attr_str).join('') + '>';
	    }

	    function close(node) {
	      result += '</' + tag(node) + '>';
	    }

	    function render(event) {
	      (event.event == 'start' ? open : close)(event.node);
	    }

	    while (original.length || highlighted.length) {
	      var stream = selectStream();
	      result += escape(value.substr(processed, stream[0].offset - processed));
	      processed = stream[0].offset;
	      if (stream == original) {
	        /*
	        On any opening or closing tag of the original markup we first close
	        the entire highlighted node stack, then render the original tag along
	        with all the following original tags at the same offset and then
	        reopen all the tags on the highlighted stack.
	        */
	        nodeStack.reverse().forEach(close);
	        do {
	          render(stream.splice(0, 1)[0]);
	          stream = selectStream();
	        } while (stream == original && stream.length && stream[0].offset == processed);
	        nodeStack.reverse().forEach(open);
	      } else {
	        if (stream[0].event == 'start') {
	          nodeStack.push(stream[0].node);
	        } else {
	          nodeStack.pop();
	        }
	        render(stream.splice(0, 1)[0]);
	      }
	    }
	    return result + escape(value.substr(processed));
	  }

	  /* Initialization */

	  function compileLanguage(language) {

	    function reStr(re) {
	      return re && re.source || re;
	    }

	    function langRe(value, global) {
	      return new RegExp(reStr(value), 'm' + (language.case_insensitive ? 'i' : '') + (global ? 'g' : ''));
	    }

	    function compileMode(mode, parent) {
	      if (mode.compiled) return;
	      mode.compiled = true;

	      mode.keywords = mode.keywords || mode.beginKeywords;
	      if (mode.keywords) {
	        var compiled_keywords = {};

	        var flatten = function flatten(className, str) {
	          if (language.case_insensitive) {
	            str = str.toLowerCase();
	          }
	          str.split(' ').forEach(function (kw) {
	            var pair = kw.split('|');
	            compiled_keywords[pair[0]] = [className, pair[1] ? Number(pair[1]) : 1];
	          });
	        };

	        if (typeof mode.keywords == 'string') {
	          // string
	          flatten('keyword', mode.keywords);
	        } else {
	          Object.keys(mode.keywords).forEach(function (className) {
	            flatten(className, mode.keywords[className]);
	          });
	        }
	        mode.keywords = compiled_keywords;
	      }
	      mode.lexemesRe = langRe(mode.lexemes || /\b\w+\b/, true);

	      if (parent) {
	        if (mode.beginKeywords) {
	          mode.begin = '\\b(' + mode.beginKeywords.split(' ').join('|') + ')\\b';
	        }
	        if (!mode.begin) mode.begin = /\B|\b/;
	        mode.beginRe = langRe(mode.begin);
	        if (!mode.end && !mode.endsWithParent) mode.end = /\B|\b/;
	        if (mode.end) mode.endRe = langRe(mode.end);
	        mode.terminator_end = reStr(mode.end) || '';
	        if (mode.endsWithParent && parent.terminator_end) mode.terminator_end += (mode.end ? '|' : '') + parent.terminator_end;
	      }
	      if (mode.illegal) mode.illegalRe = langRe(mode.illegal);
	      if (mode.relevance === undefined) mode.relevance = 1;
	      if (!mode.contains) {
	        mode.contains = [];
	      }
	      var expanded_contains = [];
	      mode.contains.forEach(function (c) {
	        if (c.variants) {
	          c.variants.forEach(function (v) {
	            expanded_contains.push(inherit(c, v));
	          });
	        } else {
	          expanded_contains.push(c == 'self' ? mode : c);
	        }
	      });
	      mode.contains = expanded_contains;
	      mode.contains.forEach(function (c) {
	        compileMode(c, mode);
	      });

	      if (mode.starts) {
	        compileMode(mode.starts, parent);
	      }

	      var terminators = mode.contains.map(function (c) {
	        return c.beginKeywords ? '\\.?(' + c.begin + ')\\.?' : c.begin;
	      }).concat([mode.terminator_end, mode.illegal]).map(reStr).filter(Boolean);
	      mode.terminators = terminators.length ? langRe(terminators.join('|'), true) : { exec: function exec() /*s*/{
	          return null;
	        } };
	    }

	    compileMode(language);
	  }

	  /*
	  Core highlighting function. Accepts a language name, or an alias, and a
	  string with the code to highlight. Returns an object with the following
	  properties:
	   - relevance (int)
	  - value (an HTML string with highlighting markup)
	   */
	  function highlight(name, value, ignore_illegals, continuation) {

	    function subMode(lexeme, mode) {
	      for (var i = 0; i < mode.contains.length; i++) {
	        if (testRe(mode.contains[i].beginRe, lexeme)) {
	          return mode.contains[i];
	        }
	      }
	    }

	    function endOfMode(_x, _x2) {
	      var _again = true;

	      _function: while (_again) {
	        var mode = _x,
	            lexeme = _x2;
	        _again = false;

	        if (testRe(mode.endRe, lexeme)) {
	          while (mode.endsParent && mode.parent) {
	            mode = mode.parent;
	          }
	          return mode;
	        }
	        if (mode.endsWithParent) {
	          _x = mode.parent;
	          _x2 = lexeme;
	          _again = true;
	          continue _function;
	        }
	      }
	    }

	    function isIllegal(lexeme, mode) {
	      return !ignore_illegals && testRe(mode.illegalRe, lexeme);
	    }

	    function keywordMatch(mode, match) {
	      var match_str = language.case_insensitive ? match[0].toLowerCase() : match[0];
	      return mode.keywords.hasOwnProperty(match_str) && mode.keywords[match_str];
	    }

	    function buildSpan(classname, insideSpan, leaveOpen, noPrefix) {
	      var classPrefix = noPrefix ? '' : options.classPrefix,
	          openSpan = '<span class="' + classPrefix,
	          closeSpan = leaveOpen ? '' : '</span>';

	      openSpan += classname + '">';

	      return openSpan + insideSpan + closeSpan;
	    }

	    function processKeywords() {
	      if (!top.keywords) return escape(mode_buffer);
	      var result = '';
	      var last_index = 0;
	      top.lexemesRe.lastIndex = 0;
	      var match = top.lexemesRe.exec(mode_buffer);
	      while (match) {
	        result += escape(mode_buffer.substr(last_index, match.index - last_index));
	        var keyword_match = keywordMatch(top, match);
	        if (keyword_match) {
	          relevance += keyword_match[1];
	          result += buildSpan(keyword_match[0], escape(match[0]));
	        } else {
	          result += escape(match[0]);
	        }
	        last_index = top.lexemesRe.lastIndex;
	        match = top.lexemesRe.exec(mode_buffer);
	      }
	      return result + escape(mode_buffer.substr(last_index));
	    }

	    function processSubLanguage() {
	      var explicit = typeof top.subLanguage == 'string';
	      if (explicit && !languages[top.subLanguage]) {
	        return escape(mode_buffer);
	      }

	      var result = explicit ? highlight(top.subLanguage, mode_buffer, true, continuations[top.subLanguage]) : highlightAuto(mode_buffer, top.subLanguage.length ? top.subLanguage : undefined);

	      // Counting embedded language score towards the host language may be disabled
	      // with zeroing the containing mode relevance. Usecase in point is Markdown that
	      // allows XML everywhere and makes every XML snippet to have a much larger Markdown
	      // score.
	      if (top.relevance > 0) {
	        relevance += result.relevance;
	      }
	      if (explicit) {
	        continuations[top.subLanguage] = result.top;
	      }
	      return buildSpan(result.language, result.value, false, true);
	    }

	    function processBuffer() {
	      return top.subLanguage !== undefined ? processSubLanguage() : processKeywords();
	    }

	    function startNewMode(mode, lexeme) {
	      var markup = mode.className ? buildSpan(mode.className, '', true) : '';
	      if (mode.returnBegin) {
	        result += markup;
	        mode_buffer = '';
	      } else if (mode.excludeBegin) {
	        result += escape(lexeme) + markup;
	        mode_buffer = '';
	      } else {
	        result += markup;
	        mode_buffer = lexeme;
	      }
	      top = Object.create(mode, { parent: { value: top } });
	    }

	    function processLexeme(buffer, lexeme) {

	      mode_buffer += buffer;
	      if (lexeme === undefined) {
	        result += processBuffer();
	        return 0;
	      }

	      var new_mode = subMode(lexeme, top);
	      if (new_mode) {
	        result += processBuffer();
	        startNewMode(new_mode, lexeme);
	        return new_mode.returnBegin ? 0 : lexeme.length;
	      }

	      var end_mode = endOfMode(top, lexeme);
	      if (end_mode) {
	        var origin = top;
	        if (!(origin.returnEnd || origin.excludeEnd)) {
	          mode_buffer += lexeme;
	        }
	        result += processBuffer();
	        do {
	          if (top.className) {
	            result += '</span>';
	          }
	          relevance += top.relevance;
	          top = top.parent;
	        } while (top != end_mode.parent);
	        if (origin.excludeEnd) {
	          result += escape(lexeme);
	        }
	        mode_buffer = '';
	        if (end_mode.starts) {
	          startNewMode(end_mode.starts, '');
	        }
	        return origin.returnEnd ? 0 : lexeme.length;
	      }

	      if (isIllegal(lexeme, top)) throw new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.className || '<unnamed>') + '"');

	      /*
	      Parser should not reach this point as all types of lexemes should be caught
	      earlier, but if it does due to some bug make sure it advances at least one
	      character forward to prevent infinite looping.
	      */
	      mode_buffer += lexeme;
	      return lexeme.length || 1;
	    }

	    var language = getLanguage(name);
	    if (!language) {
	      throw new Error('Unknown language: "' + name + '"');
	    }

	    compileLanguage(language);
	    var top = continuation || language;
	    var continuations = {}; // keep continuations for sub-languages
	    var result = '',
	        current;
	    for (current = top; current != language; current = current.parent) {
	      if (current.className) {
	        result = buildSpan(current.className, '', true) + result;
	      }
	    }
	    var mode_buffer = '';
	    var relevance = 0;
	    try {
	      var match,
	          count,
	          index = 0;
	      while (true) {
	        top.terminators.lastIndex = index;
	        match = top.terminators.exec(value);
	        if (!match) break;
	        count = processLexeme(value.substr(index, match.index - index), match[0]);
	        index = match.index + count;
	      }
	      processLexeme(value.substr(index));
	      for (current = top; current.parent; current = current.parent) {
	        // close dangling modes
	        if (current.className) {
	          result += '</span>';
	        }
	      }
	      return {
	        relevance: relevance,
	        value: result,
	        language: name,
	        top: top
	      };
	    } catch (e) {
	      if (e.message.indexOf('Illegal') != -1) {
	        return {
	          relevance: 0,
	          value: escape(value)
	        };
	      } else {
	        throw e;
	      }
	    }
	  }

	  /*
	  Highlighting with language detection. Accepts a string with the code to
	  highlight. Returns an object with the following properties:
	   - language (detected language)
	  - relevance (int)
	  - value (an HTML string with highlighting markup)
	  - second_best (object with the same structure for second-best heuristically
	    detected language, may be absent)
	   */
	  function highlightAuto(text, languageSubset) {
	    languageSubset = languageSubset || options.languages || Object.keys(languages);
	    var result = {
	      relevance: 0,
	      value: escape(text)
	    };
	    var second_best = result;
	    languageSubset.forEach(function (name) {
	      if (!getLanguage(name)) {
	        return;
	      }
	      var current = highlight(name, text, false);
	      current.language = name;
	      if (current.relevance > second_best.relevance) {
	        second_best = current;
	      }
	      if (current.relevance > result.relevance) {
	        second_best = result;
	        result = current;
	      }
	    });
	    if (second_best.language) {
	      result.second_best = second_best;
	    }
	    return result;
	  }

	  /*
	  Post-processing of the highlighted markup:
	   - replace TABs with something more useful
	  - replace real line-breaks with '<br>' for non-pre containers
	   */
	  function fixMarkup(value) {
	    if (options.tabReplace) {
	      value = value.replace(/^((<[^>]+>|\t)+)/gm, function (match, p1 /*..., offset, s*/) {
	        return p1.replace(/\t/g, options.tabReplace);
	      });
	    }
	    if (options.useBR) {
	      value = value.replace(/\n/g, '<br>');
	    }
	    return value;
	  }

	  function buildClassName(prevClassName, currentLang, resultLang) {
	    var language = currentLang ? aliases[currentLang] : resultLang,
	        result = [prevClassName.trim()];

	    if (!prevClassName.match(/\bhljs\b/)) {
	      result.push('hljs');
	    }

	    if (prevClassName.indexOf(language) === -1) {
	      result.push(language);
	    }

	    return result.join(' ').trim();
	  }

	  /*
	  Applies highlighting to a DOM node containing code. Accepts a DOM node and
	  two optional parameters for fixMarkup.
	  */
	  function highlightBlock(block) {
	    var language = blockLanguage(block);
	    if (isNotHighlighted(language)) return;

	    var node;
	    if (options.useBR) {
	      node = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
	      node.innerHTML = block.innerHTML.replace(/\n/g, '').replace(/<br[ \/]*>/g, '\n');
	    } else {
	      node = block;
	    }
	    var text = node.textContent;
	    var result = language ? highlight(language, text, true) : highlightAuto(text);

	    var originalStream = nodeStream(node);
	    if (originalStream.length) {
	      var resultNode = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
	      resultNode.innerHTML = result.value;
	      result.value = mergeStreams(originalStream, nodeStream(resultNode), text);
	    }
	    result.value = fixMarkup(result.value);

	    block.innerHTML = result.value;
	    block.className = buildClassName(block.className, language, result.language);
	    block.result = {
	      language: result.language,
	      re: result.relevance
	    };
	    if (result.second_best) {
	      block.second_best = {
	        language: result.second_best.language,
	        re: result.second_best.relevance
	      };
	    }
	  }

	  var options = {
	    classPrefix: 'hljs-',
	    tabReplace: null,
	    useBR: false,
	    languages: undefined
	  };

	  /*
	  Updates highlight.js global options with values passed in the form of an object
	  */
	  function configure(user_options) {
	    options = inherit(options, user_options);
	  }

	  /*
	  Applies highlighting to all <pre><code>..</code></pre> blocks on a page.
	  */
	  function initHighlighting() {
	    if (initHighlighting.called) return;
	    initHighlighting.called = true;

	    var blocks = document.querySelectorAll('pre code');
	    Array.prototype.forEach.call(blocks, highlightBlock);
	  }

	  /*
	  Attaches highlighting to the page load event.
	  */
	  function initHighlightingOnLoad() {
	    addEventListener('DOMContentLoaded', initHighlighting, false);
	    addEventListener('load', initHighlighting, false);
	  }

	  var languages = {};
	  var aliases = {};

	  function registerLanguage(name, language) {
	    var lang = languages[name] = language(hljs);
	    if (lang.aliases) {
	      lang.aliases.forEach(function (alias) {
	        aliases[alias] = name;
	      });
	    }
	  }

	  function listLanguages() {
	    return Object.keys(languages);
	  }

	  function getLanguage(name) {
	    name = name.toLowerCase();
	    return languages[name] || languages[aliases[name]];
	  }

	  /* Interface definition */

	  hljs.highlight = highlight;
	  hljs.highlightAuto = highlightAuto;
	  hljs.fixMarkup = fixMarkup;
	  hljs.highlightBlock = highlightBlock;
	  hljs.configure = configure;
	  hljs.initHighlighting = initHighlighting;
	  hljs.initHighlightingOnLoad = initHighlightingOnLoad;
	  hljs.registerLanguage = registerLanguage;
	  hljs.listLanguages = listLanguages;
	  hljs.getLanguage = getLanguage;
	  hljs.inherit = inherit;

	  // Common regexps
	  hljs.IDENT_RE = '[a-zA-Z]\\w*';
	  hljs.UNDERSCORE_IDENT_RE = '[a-zA-Z_]\\w*';
	  hljs.NUMBER_RE = '\\b\\d+(\\.\\d+)?';
	  hljs.C_NUMBER_RE = '(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)'; // 0x..., 0..., decimal, float
	  hljs.BINARY_NUMBER_RE = '\\b(0b[01]+)'; // 0b...
	  hljs.RE_STARTERS_RE = '!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~';

	  // Common modes
	  hljs.BACKSLASH_ESCAPE = {
	    begin: '\\\\[\\s\\S]', relevance: 0
	  };
	  hljs.APOS_STRING_MODE = {
	    className: 'string',
	    begin: '\'', end: '\'',
	    illegal: '\\n',
	    contains: [hljs.BACKSLASH_ESCAPE]
	  };
	  hljs.QUOTE_STRING_MODE = {
	    className: 'string',
	    begin: '"', end: '"',
	    illegal: '\\n',
	    contains: [hljs.BACKSLASH_ESCAPE]
	  };
	  hljs.PHRASAL_WORDS_MODE = {
	    begin: /\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such)\b/
	  };
	  hljs.COMMENT = function (begin, end, inherits) {
	    var mode = hljs.inherit({
	      className: 'comment',
	      begin: begin, end: end,
	      contains: []
	    }, inherits || {});
	    mode.contains.push(hljs.PHRASAL_WORDS_MODE);
	    mode.contains.push({
	      className: 'doctag',
	      begin: "(?:TODO|FIXME|NOTE|BUG|XXX):",
	      relevance: 0
	    });
	    return mode;
	  };
	  hljs.C_LINE_COMMENT_MODE = hljs.COMMENT('//', '$');
	  hljs.C_BLOCK_COMMENT_MODE = hljs.COMMENT('/\\*', '\\*/');
	  hljs.HASH_COMMENT_MODE = hljs.COMMENT('#', '$');
	  hljs.NUMBER_MODE = {
	    className: 'number',
	    begin: hljs.NUMBER_RE,
	    relevance: 0
	  };
	  hljs.C_NUMBER_MODE = {
	    className: 'number',
	    begin: hljs.C_NUMBER_RE,
	    relevance: 0
	  };
	  hljs.BINARY_NUMBER_MODE = {
	    className: 'number',
	    begin: hljs.BINARY_NUMBER_RE,
	    relevance: 0
	  };
	  hljs.CSS_NUMBER_MODE = {
	    className: 'number',
	    begin: hljs.NUMBER_RE + '(' + '%|em|ex|ch|rem' + '|vw|vh|vmin|vmax' + '|cm|mm|in|pt|pc|px' + '|deg|grad|rad|turn' + '|s|ms' + '|Hz|kHz' + '|dpi|dpcm|dppx' + ')?',
	    relevance: 0
	  };
	  hljs.REGEXP_MODE = {
	    className: 'regexp',
	    begin: /\//, end: /\/[gimuy]*/,
	    illegal: /\n/,
	    contains: [hljs.BACKSLASH_ESCAPE, {
	      begin: /\[/, end: /\]/,
	      relevance: 0,
	      contains: [hljs.BACKSLASH_ESCAPE]
	    }]
	  };
	  hljs.TITLE_MODE = {
	    className: 'title',
	    begin: hljs.IDENT_RE,
	    relevance: 0
	  };
	  hljs.UNDERSCORE_TITLE_MODE = {
	    className: 'title',
	    begin: hljs.UNDERSCORE_IDENT_RE,
	    relevance: 0
	  };

	  return hljs;
	});

/***/ },
/* 203 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (hljs) {
	  var VAR = {
	    className: 'variable',
	    variants: [{ begin: /\$[\w\d#@][\w\d_]*/ }, { begin: /\$\{(.*?)}/ }]
	  };
	  var QUOTE_STRING = {
	    className: 'string',
	    begin: /"/, end: /"/,
	    contains: [hljs.BACKSLASH_ESCAPE, VAR, {
	      className: 'variable',
	      begin: /\$\(/, end: /\)/,
	      contains: [hljs.BACKSLASH_ESCAPE]
	    }]
	  };
	  var APOS_STRING = {
	    className: 'string',
	    begin: /'/, end: /'/
	  };

	  return {
	    aliases: ['sh', 'zsh'],
	    lexemes: /-?[a-z\.]+/,
	    keywords: {
	      keyword: 'if then else elif fi for while in do done case esac function',
	      literal: 'true false',
	      built_in:
	      // Shell built-ins
	      // http://www.gnu.org/software/bash/manual/html_node/Shell-Builtin-Commands.html
	      'break cd continue eval exec exit export getopts hash pwd readonly return shift test times ' + 'trap umask unset ' +
	      // Bash built-ins
	      'alias bind builtin caller command declare echo enable help let local logout mapfile printf ' + 'read readarray source type typeset ulimit unalias ' +
	      // Shell modifiers
	      'set shopt ' +
	      // Zsh built-ins
	      'autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles ' + 'compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate ' + 'fc fg float functions getcap getln history integer jobs kill limit log noglob popd print ' + 'pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit ' + 'unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof ' + 'zpty zregexparse zsocket zstyle ztcp',
	      operator: '-ne -eq -lt -gt -f -d -e -s -l -a' // relevance booster
	    },
	    contains: [{
	      className: 'shebang',
	      begin: /^#![^\n]+sh\s*$/,
	      relevance: 10
	    }, {
	      className: 'function',
	      begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
	      returnBegin: true,
	      contains: [hljs.inherit(hljs.TITLE_MODE, { begin: /\w[\w\d_]*/ })],
	      relevance: 0
	    }, hljs.HASH_COMMENT_MODE, hljs.NUMBER_MODE, QUOTE_STRING, APOS_STRING, VAR]
	  };
	};

/***/ },
/* 204 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (hljs) {
	  var XML_IDENT_RE = '[A-Za-z0-9\\._:-]+';
	  var PHP = {
	    begin: /<\?(php)?(?!\w)/, end: /\?>/,
	    subLanguage: 'php'
	  };
	  var TAG_INTERNALS = {
	    endsWithParent: true,
	    illegal: /</,
	    relevance: 0,
	    contains: [PHP, {
	      className: 'attribute',
	      begin: XML_IDENT_RE,
	      relevance: 0
	    }, {
	      begin: '=',
	      relevance: 0,
	      contains: [{
	        className: 'value',
	        contains: [PHP],
	        variants: [{ begin: /"/, end: /"/ }, { begin: /'/, end: /'/ }, { begin: /[^\s\/>]+/ }]
	      }]
	    }]
	  };
	  return {
	    aliases: ['html', 'xhtml', 'rss', 'atom', 'xsl', 'plist'],
	    case_insensitive: true,
	    contains: [{
	      className: 'doctype',
	      begin: '<!DOCTYPE', end: '>',
	      relevance: 10,
	      contains: [{ begin: '\\[', end: '\\]' }]
	    }, hljs.COMMENT('<!--', '-->', {
	      relevance: 10
	    }), {
	      className: 'cdata',
	      begin: '<\\!\\[CDATA\\[', end: '\\]\\]>',
	      relevance: 10
	    }, {
	      className: 'tag',
	      /*
	      The lookahead pattern (?=...) ensures that 'begin' only matches
	      '<style' as a single word, followed by a whitespace or an
	      ending braket. The '$' is needed for the lexeme to be recognized
	      by hljs.subMode() that tests lexemes outside the stream.
	      */
	      begin: '<style(?=\\s|>|$)', end: '>',
	      keywords: { title: 'style' },
	      contains: [TAG_INTERNALS],
	      starts: {
	        end: '</style>', returnEnd: true,
	        subLanguage: 'css'
	      }
	    }, {
	      className: 'tag',
	      // See the comment in the <style tag about the lookahead pattern
	      begin: '<script(?=\\s|>|$)', end: '>',
	      keywords: { title: 'script' },
	      contains: [TAG_INTERNALS],
	      starts: {
	        end: '\<\/script\>', returnEnd: true,
	        subLanguage: ['actionscript', 'javascript', 'handlebars']
	      }
	    }, PHP, {
	      className: 'pi',
	      begin: /<\?\w+/, end: /\?>/,
	      relevance: 10
	    }, {
	      className: 'tag',
	      begin: '</?', end: '/?>',
	      contains: [{
	        className: 'title', begin: /[^ \/><\n\t]+/, relevance: 0
	      }, TAG_INTERNALS]
	    }]
	  };
	};

/***/ },
/* 205 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (hljs) {
	  return {
	    aliases: ['js'],
	    keywords: {
	      keyword: 'in of if for while finally var new function do return void else break catch ' + 'instanceof with throw case default try this switch continue typeof delete ' + 'let yield const export super debugger as async await',
	      literal: 'true false null undefined NaN Infinity',
	      built_in: 'eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent ' + 'encodeURI encodeURIComponent escape unescape Object Function Boolean Error ' + 'EvalError InternalError RangeError ReferenceError StopIteration SyntaxError ' + 'TypeError URIError Number Math Date String RegExp Array Float32Array ' + 'Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array ' + 'Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require ' + 'module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect ' + 'Promise'
	    },
	    contains: [{
	      className: 'pi',
	      relevance: 10,
	      begin: /^\s*['"]use (strict|asm)['"]/
	    }, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, { // template string
	      className: 'string',
	      begin: '`', end: '`',
	      contains: [hljs.BACKSLASH_ESCAPE, {
	        className: 'subst',
	        begin: '\\$\\{', end: '\\}'
	      }]
	    }, hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, {
	      className: 'number',
	      variants: [{ begin: '\\b(0[bB][01]+)' }, { begin: '\\b(0[oO][0-7]+)' }, { begin: hljs.C_NUMBER_RE }],
	      relevance: 0
	    }, { // "value" container
	      begin: '(' + hljs.RE_STARTERS_RE + '|\\b(case|return|throw)\\b)\\s*',
	      keywords: 'return throw case',
	      contains: [hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, hljs.REGEXP_MODE, { // E4X / JSX
	        begin: /</, end: />\s*[);\]]/,
	        relevance: 0,
	        subLanguage: 'xml'
	      }],
	      relevance: 0
	    }, {
	      className: 'function',
	      beginKeywords: 'function', end: /\{/, excludeEnd: true,
	      contains: [hljs.inherit(hljs.TITLE_MODE, { begin: /[A-Za-z$_][0-9A-Za-z$_]*/ }), {
	        className: 'params',
	        begin: /\(/, end: /\)/,
	        excludeBegin: true,
	        excludeEnd: true,
	        contains: [hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE]
	      }],
	      illegal: /\[|%/
	    }, {
	      begin: /\$[(.]/ // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
	    }, {
	      begin: '\\.' + hljs.IDENT_RE, relevance: 0 // hack: prevents detection of keywords after dots
	    },
	    // ECMAScript 6 modules import
	    {
	      beginKeywords: 'import', end: '[;$]',
	      keywords: 'import from as',
	      contains: [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE]
	    }, { // ES6 class
	      className: 'class',
	      beginKeywords: 'class', end: /[{;=]/, excludeEnd: true,
	      illegal: /[:"\[\]]/,
	      contains: [{ beginKeywords: 'extends' }, hljs.UNDERSCORE_TITLE_MODE]
	    }],
	    illegal: /#/
	  };
	};

/***/ },
/* 206 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (hljs) {
	  var IDENT_RE = '[a-zA-Z-][a-zA-Z0-9_-]*';
	  var VARIABLE = {
	    className: 'variable',
	    begin: '(\\$' + IDENT_RE + ')\\b'
	  };
	  var FUNCTION = {
	    className: 'function',
	    begin: IDENT_RE + '\\(',
	    returnBegin: true,
	    excludeEnd: true,
	    end: '\\('
	  };
	  var HEXCOLOR = {
	    className: 'hexcolor', begin: '#[0-9A-Fa-f]+'
	  };
	  var DEF_INTERNALS = {
	    className: 'attribute',
	    begin: '[A-Z\\_\\.\\-]+', end: ':',
	    excludeEnd: true,
	    illegal: '[^\\s]',
	    starts: {
	      className: 'value',
	      endsWithParent: true, excludeEnd: true,
	      contains: [FUNCTION, HEXCOLOR, hljs.CSS_NUMBER_MODE, hljs.QUOTE_STRING_MODE, hljs.APOS_STRING_MODE, hljs.C_BLOCK_COMMENT_MODE, {
	        className: 'important', begin: '!important'
	      }]
	    }
	  };
	  return {
	    case_insensitive: true,
	    illegal: '[=/|\']',
	    contains: [hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, FUNCTION, {
	      className: 'id', begin: '\\#[A-Za-z0-9_-]+',
	      relevance: 0
	    }, {
	      className: 'class', begin: '\\.[A-Za-z0-9_-]+',
	      relevance: 0
	    }, {
	      className: 'attr_selector',
	      begin: '\\[', end: '\\]',
	      illegal: '$'
	    }, {
	      className: 'tag', // begin: IDENT_RE, end: '[,|\\s]'
	      begin: '\\b(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|frame|frameset|(h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)\\b',
	      relevance: 0
	    }, {
	      className: 'pseudo',
	      begin: ':(visited|valid|root|right|required|read-write|read-only|out-range|optional|only-of-type|only-child|nth-of-type|nth-last-of-type|nth-last-child|nth-child|not|link|left|last-of-type|last-child|lang|invalid|indeterminate|in-range|hover|focus|first-of-type|first-line|first-letter|first-child|first|enabled|empty|disabled|default|checked|before|after|active)'
	    }, {
	      className: 'pseudo',
	      begin: '::(after|before|choices|first-letter|first-line|repeat-index|repeat-item|selection|value)'
	    }, VARIABLE, {
	      className: 'attribute',
	      begin: '\\b(z-index|word-wrap|word-spacing|word-break|width|widows|white-space|visibility|vertical-align|unicode-bidi|transition-timing-function|transition-property|transition-duration|transition-delay|transition|transform-style|transform-origin|transform|top|text-underline-position|text-transform|text-shadow|text-rendering|text-overflow|text-indent|text-decoration-style|text-decoration-line|text-decoration-color|text-decoration|text-align-last|text-align|tab-size|table-layout|right|resize|quotes|position|pointer-events|perspective-origin|perspective|page-break-inside|page-break-before|page-break-after|padding-top|padding-right|padding-left|padding-bottom|padding|overflow-y|overflow-x|overflow-wrap|overflow|outline-width|outline-style|outline-offset|outline-color|outline|orphans|order|opacity|object-position|object-fit|normal|none|nav-up|nav-right|nav-left|nav-index|nav-down|min-width|min-height|max-width|max-height|mask|marks|margin-top|margin-right|margin-left|margin-bottom|margin|list-style-type|list-style-position|list-style-image|list-style|line-height|letter-spacing|left|justify-content|initial|inherit|ime-mode|image-orientation|image-resolution|image-rendering|icon|hyphens|height|font-weight|font-variant-ligatures|font-variant|font-style|font-stretch|font-size-adjust|font-size|font-language-override|font-kerning|font-feature-settings|font-family|font|float|flex-wrap|flex-shrink|flex-grow|flex-flow|flex-direction|flex-basis|flex|filter|empty-cells|display|direction|cursor|counter-reset|counter-increment|content|column-width|column-span|column-rule-width|column-rule-style|column-rule-color|column-rule|column-gap|column-fill|column-count|columns|color|clip-path|clip|clear|caption-side|break-inside|break-before|break-after|box-sizing|box-shadow|box-decoration-break|bottom|border-width|border-top-width|border-top-style|border-top-right-radius|border-top-left-radius|border-top-color|border-top|border-style|border-spacing|border-right-width|border-right-style|border-right-color|border-right|border-radius|border-left-width|border-left-style|border-left-color|border-left|border-image-width|border-image-source|border-image-slice|border-image-repeat|border-image-outset|border-image|border-color|border-collapse|border-bottom-width|border-bottom-style|border-bottom-right-radius|border-bottom-left-radius|border-bottom-color|border-bottom|border|background-size|background-repeat|background-position|background-origin|background-image|background-color|background-clip|background-attachment|background-blend-mode|background|backface-visibility|auto|animation-timing-function|animation-play-state|animation-name|animation-iteration-count|animation-fill-mode|animation-duration|animation-direction|animation-delay|animation|align-self|align-items|align-content)\\b',
	      illegal: '[^\\s]'
	    }, {
	      className: 'value',
	      begin: '\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b'
	    }, {
	      className: 'value',
	      begin: ':', end: ';',
	      contains: [FUNCTION, VARIABLE, HEXCOLOR, hljs.CSS_NUMBER_MODE, hljs.QUOTE_STRING_MODE, hljs.APOS_STRING_MODE, {
	        className: 'important', begin: '!important'
	      }]
	    }, {
	      className: 'at_rule',
	      begin: '@', end: '[{;]',
	      keywords: 'mixin include extend for if else each while charset import debug media page content font-face namespace warn',
	      contains: [FUNCTION, VARIABLE, hljs.QUOTE_STRING_MODE, hljs.APOS_STRING_MODE, HEXCOLOR, hljs.CSS_NUMBER_MODE, {
	        className: 'preprocessor',
	        begin: '\\s[A-Za-z0-9_.-]+',
	        relevance: 0
	      }]
	    }]
	  };
	};

/***/ }
/******/ ]);