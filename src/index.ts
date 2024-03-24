import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';

const dictionaryPath = './src/dictionary/';
const winningWordsPath = './src/winning_words/';

const winningWordsFiles: [[number, number], number, string][] = [
	[[0, 0.001169666645006], 18, 'ab.csv'],
	[[0.001169666645007, 0.002274351809734], 17, 'ad.csv'],
	[[0.002274351809735, 0.002339333290012], 1, 'ae.csv'],
	[[0.002339333290013, 0.002989148092793], 10, 'af.csv'],
	[[0.002989148092794, 0.003703944375852], 11, 'ag.csv'],
	[[0.003703944375853, 0.006563129508089001], 44, 'ak.csv'],
	[[0.006563129508090001, 0.009292351679770001], 42, 'al.csv'],
	[[0.009292351679771, 0.010851907206445001], 24, 'am.csv'],
	[[0.010851907206446, 0.015335629345635], 69, 'an.csv'],
	[[0.015335629345635999, 0.016765221911754], 22, 'ap.csv'],
	[[0.016765221911754998, 0.020469166287606998], 57, 'ar.csv'],
	[[0.020469166287607997, 0.021898758853725997], 22, 'as.csv'],
	[[0.021898758853726996, 0.023133406979009997], 19, 'at.csv'],
	[[0.023133406979010996, 0.025277795828187996], 33, 'au.csv'],
	[[0.025277795828188995, 0.025797647670412996], 8, 'aw.csv'],
	[[0.025797647670413995, 0.026187536552081996], 6, 'az.csv'],
	[[0.026187536552082995, 0.03333549938267499], 110, 'ba.csv'],
	[[0.03333549938267599, 0.03340048086295299], 1, 'bą.csv'],
	[[0.03340048086295399, 0.04113327701604899], 119, 'be.csv'],
	[[0.04113327701604999, 0.041588147377995995], 7, 'bę.csv'],
	[[0.041588147377996994, 0.04678666580024599], 80, 'bi.csv'],
	[[0.04678666580024699, 0.04873611020858999], 30, 'bl.csv'],
	[[0.04873611020859099, 0.05068555461693399], 30, 'bł.csv'],
	[[0.05068555461693499, 0.05347975826889299], 43, 'bo.csv'],
	[[0.05347975826889399, 0.053609721229448994], 2, 'bó.csv'],
	[[0.05360972122944999, 0.05919812853336699], 86, 'br.csv'],
	[[0.05919812853336799, 0.063421924751445], 65, 'bu.csv'],
	[[0.063421924751446, 0.063811813633114], 6, 'by.csv'],
	[[0.063811813633115, 0.064006758073948], 3, 'bz.csv'],
	[[0.064006758073949, 0.064786535837285], 12, 'ca.csv'],
	[[0.064786535837286, 0.068100591331469], 51, 'ce.csv'],
	[[0.06810059133146999, 0.06823055429202499], 2, 'cę.csv'],
	[[0.06823055429202599, 0.07745792449151799], 142, 'ch.csv'],
	[[0.07745792449151899, 0.08155175774903999], 63, 'ci.csv'],
	[[0.08155175774904098, 0.08168172070959598], 2, 'ck.csv'],
	[[0.08168172070959698, 0.08174670218987398], 1, 'cl.csv'],
	[[0.08174670218987498, 0.08187666515042998], 2, 'cm.csv'],
	[[0.08187666515043097, 0.08207160959126397], 3, 'cn.csv'],
	[[0.08207160959126497, 0.08311131327571397], 16, 'co.csv'],
	[[0.08311131327571497, 0.08317629475599198], 1, 'có.csv'],
	[[0.08317629475599297, 0.08447592436155398], 20, 'cu.csv'],
	[[0.08447592436155497, 0.08454090584183198], 1, 'cw.csv'],
	[[0.08454090584183298, 0.08486581324322298], 5, 'ćw.csv'],
	[[0.08486581324322398, 0.08688023913184498], 31, 'cy.csv'],
	[[0.08688023913184598, 0.09480797972577598], 122, 'cz.csv'],
	[[0.09480797972577698, 0.09630255377217298], 23, 'da.csv'],
	[[0.09630255377217398, 0.09636753525245098], 1, 'dą.csv'],
	[[0.09636753525245198, 0.10338553512248798], 108, 'de.csv'],
	[[0.10338553512248898, 0.10345051660276598], 1, 'dę.csv'],
	[[0.10345051660276698, 0.10462018324777199], 18, 'di.csv'],
	[[0.10462018324777299, 0.10475014620832798], 2, 'dl.csv'],
	[[0.10475014620832898, 0.10578984989277798], 16, 'dł.csv'],
	[[0.10578984989277898, 0.12028071999479899], 223, 'do.csv'],
	[[0.12028071999479999, 0.12521931249593599], 76, 'dr.csv'],
	[[0.12521931249593699, 0.12677886802261099], 24, 'du.csv'],
	[[0.12677886802261198, 0.127883553187339], 17, 'dw.csv'],
	[[0.12788355318734, 0.13269218272792], 74, 'dy.csv'],
	[[0.132692182727921, 0.13984014555851298], 110, 'dz.csv'],
	[[0.13984014555851398, 0.140554941841572], 11, 'dź.csv'],
	[[0.140554941841573, 0.141204756644353], 10, 'dż.csv'],
	[[0.141204756644354, 0.141399701085187], 3, 'ed.csv'],
	[[0.141399701085188, 0.14159464552602102], 3, 'ef.csv'],
	[[0.14159464552602202, 0.14289427513158304], 20, 'eg.csv'],
	[[0.14289427513158404, 0.14737799727077303], 69, 'ek.csv'],
	[[0.14737799727077402, 0.14932744167911702], 30, 'el.csv'],
	[[0.14932744167911802, 0.15095197868607002], 25, 'em.csv'],
	[[0.15095197868607102, 0.151796737929686], 13, 'en.csv'],
	[[0.151796737929687, 0.152641497173302], 13, 'ep.csv'],
	[[0.152641497173303, 0.153031386054971], 6, 'er.csv'],
	[[0.153031386054972, 0.154071089739421], 16, 'es.csv'],
	[[0.154071089739422, 0.154720904542202], 10, 'et.csv'],
	[[0.154720904542203, 0.155370719344983], 10, 'eu.csv'],
	[[0.155370719344984, 0.156020534147764], 10, 'ew.csv'],
	[[0.156020534147765, 0.15608551562804202], 1, 'ez.csv'],
	[[0.15608551562804301, 0.16050425628695403], 68, 'fa.csv'],
	[[0.16050425628695503, 0.16173890441223804], 19, 'fe.csv'],
	[[0.16173890441223904, 0.16602768211059404], 66, 'fi.csv'],
	[[0.16602768211059504, 0.16778218207810305], 27, 'fl.csv'],
	[[0.16778218207810405, 0.17077133017089705], 46, 'fo.csv'],
	[[0.17077133017089804, 0.17252583013840606], 27, 'fr.csv'],
	[[0.17252583013840705, 0.17402040418480305], 23, 'fu.csv'],
	[[0.17402040418480405, 0.17746442263954304], 53, 'ga.csv'],
	[[0.17746442263954404, 0.17778933004093403], 5, 'gą.csv'],
	[[0.17778933004093503, 0.17804925596204602], 4, 'gd.csv'],
	[[0.17804925596204701, 0.179933718890112], 29, 'ge.csv'],
	[[0.179933718890113, 0.180258626291503], 5, 'gę.csv'],
	[[0.180258626291504, 0.181428292936509], 18, 'gi.csv'],
	[[0.18142829293651, 0.182403015140681], 15, 'gl.csv'],
	[[0.182403015140682, 0.184742348430693], 36, 'gł.csv'],
	[[0.184742348430694, 0.18487231139124902], 2, 'gm.csv'],
	[[0.18487231139125002, 0.18552212619403002], 10, 'gn.csv'],
	[[0.18552212619403102, 0.18877120020793603], 50, 'go.csv'],
	[[0.18877120020793703, 0.18922607056988303], 7, 'gó.csv'],
	[[0.18922607056988403, 0.19598414451880802], 104, 'gr.csv'],
	[[0.19598414451880902, 0.196828903762424], 13, 'gu.csv'],
	[[0.196828903762425, 0.19799857040743002], 18, 'gw.csv'],
	[[0.19799857040743102, 0.200987718500224], 46, 'ha.csv'],
	[[0.200987718500225, 0.202482292546621], 23, 'he.csv'],
	[[0.202482292546622, 0.204431736954965], 30, 'hi.csv'],
	[[0.204431736954966, 0.207225940606924], 43, 'ho.csv'],
	[[0.207225940606925, 0.207290922087202], 1, 'hr.csv'],
	[[0.207290922087203, 0.208655533173043], 21, 'hu.csv'],
	[[0.208655533173044, 0.209045422054712], 6, 'hy.csv'],
	[[0.209045422054713, 0.20911040353499], 1, 'ib.csv'],
	[[0.209110403534991, 0.210410033140552], 20, 'id.csv'],
	[[0.210410033140553, 0.21099486646305501], 9, 'ig.csv'],
	[[0.210994866463056, 0.21105984794333302], 1, 'ik.csv'],
	[[0.21105984794333402, 0.21183962570667], 12, 'il.csv'],
	[[0.211839625706671, 0.214503866398073], 41, 'im.csv'],
	[[0.214503866398074, 0.222691532913116], 126, 'in.csv'],
	[[0.222691532913117, 0.223796218077844], 17, 'ir.csv'],
	[[0.223796218077845, 0.224511014360903], 11, 'is.csv'],
	[[0.224511014360904, 0.224900903242572], 6, 'iz.csv'],
	[[0.224900903242573, 0.228994736500094], 63, 'ja.csv'],
	[[0.228994736500095, 0.22912469946065], 2, 'ją.csv'],
	[[0.229124699460651, 0.232763662356225], 56, 'je.csv'],
	[[0.232763662356226, 0.23328351419845], 8, 'ję.csv'],
	[[0.233283514198451, 0.233868347520953], 9, 'jo.csv'],
	[[0.233868347520954, 0.23464812528429], 12, 'ju.csv'],
	[[0.234648125284291, 0.24861914354408599], 215, 'ka.csv'],
	[[0.24861914354408698, 0.24913899538631099], 8, 'ką.csv'],
	[[0.24913899538631198, 0.249203976866589], 1, 'kc.csv'],
	[[0.24920397686659, 0.249723828708814], 8, 'ke.csv'],
	[[0.249723828708815, 0.24985379166937], 2, 'kę.csv'],
	[[0.249853791669371, 0.249918773149648], 1, 'kh.csv'],
	[[0.249918773149649, 0.252777958281885], 44, 'ki.csv'],
	[[0.252777958281886, 0.25648190265773796], 57, 'kl.csv'],
	[[0.25648190265773896, 0.25771655078302197], 19, 'kł.csv'],
	[[0.25771655078302297, 0.2577815322633], 1, 'km.csv'],
	[[0.25778153226330097, 0.258106439664691], 5, 'kn.csv'],
	[[0.258106439664692, 0.28370914289427096], 394, 'ko.csv'],
	[[0.28370914289427196, 0.28377412437454896], 1, 'kó.csv'],
	[[0.28377412437454996, 0.28390408733510497], 2, 'kp.csv'],
	[[0.28390408733510597, 0.292416661251539], 131, 'kr.csv'],
	[[0.29241666125154, 0.29430112417960497], 29, 'ks.csv'],
	[[0.29430112417960597, 0.294755994541552], 7, 'kt.csv'],
	[[0.294755994541553, 0.298005068555458], 50, 'ku.csv'],
	[[0.298005068555459, 0.300409383325748], 37, 'kw.csv'],
	[[0.300409383325749, 0.302553772174926], 33, 'la.csv'],
	[[0.302553772174927, 0.30281369809603803], 4, 'lą.csv'],
	[[0.30281369809603903, 0.305737864708553], 45, 'ła.csv'],
	[[0.305737864708554, 0.30606277210994404], 5, 'łą.csv'],
	[[0.30606277210994504, 0.30963675352524106], 55, 'le.csv'],
	[[0.30963675352524206, 0.30976671648579707], 2, 'lę.csv'],
	[[0.30976671648579807, 0.30983169796607507], 1, 'łe.csv'],
	[[0.30983169796607607, 0.3098966794463531], 1, 'łg.csv'],
	[[0.3098966794463541, 0.3145103645461001], 71, 'li.csv'],
	[[0.3145103645461011, 0.3145753460263781], 1, 'łk.csv'],
	[[0.3145753460263791, 0.3146403275066561], 1, 'ln.csv'],
	[[0.3146403275066571, 0.3169796607966681], 36, 'lo.csv'],
	[[0.3169796607966691, 0.3178894015205621], 14, 'ło.csv'],
	[[0.3178894015205631, 0.3179543830008401], 1, 'łó.csv'],
	[[0.3179543830008411, 0.3180843459613961], 2, 'lś.csv'],
	[[0.3180843459613971, 0.31957892000779314], 23, 'lu.csv'],
	[[0.31957892000779414, 0.32042367925140913], 13, 'łu.csv'],
	[[0.32042367925141013, 0.32048866073168714], 1, 'lw.csv'],
	[[0.32048866073168814, 0.3210734940541901], 9, 'ły.csv'],
	[[0.3210734940541911, 0.3212034570147461], 2, 'łz.csv'],
	[[0.3212034570147471, 0.3338098641887011], 194, 'ma.csv'],
	[[0.3338098641887021, 0.33406979010981314], 4, 'mą.csv'],
	[[0.33406979010981414, 0.33426473455064715], 3, 'md.csv'],
	[[0.33426473455064815, 0.33881343817011517], 70, 'me.csv'],
	[[0.33881343817011617, 0.33946325297289615], 10, 'mę.csv'],
	[[0.33946325297289714, 0.33959321593345215], 2, 'mg.csv'],
	[[0.33959321593345315, 0.34934043797517017], 150, 'mi.csv'],
	[[0.34934043797517117, 0.3494054194554482], 1, 'mk.csv'],
	[[0.3494054194554492, 0.3497303268568392], 5, 'ml.csv'],
	[[0.3497303268568402, 0.3505101046201762], 12, 'mł.csv'],
	[[0.3505101046201772, 0.35122490090323516], 11, 'mn.csv'],
	[[0.35122490090323616, 0.35869777113521917], 115, 'mo.csv'],
	[[0.35869777113522017, 0.3590876600168882], 6, 'mó.csv'],
	[[0.3590876600168892, 0.3598674377802252], 12, 'mr.csv'],
	[[0.3598674377802262, 0.3599974007407812], 2, 'mś.csv'],
	[[0.3599974007407822, 0.3622067710702372], 34, 'mu.csv'],
	[[0.3622067710702382, 0.3631814932744092], 15, 'my.csv'],
	[[0.3631814932744102, 0.3632464747546872], 1, 'mż.csv'],
	[[0.3632464747546882, 0.3844304373253542], 326, 'na.csv'],
	[[0.3844304373253552, 0.3862499187731412], 28, 'ne.csv'],
	[[0.3862499187731422, 0.3865748261745322], 5, 'nę.csv'],
	[[0.3865748261745332, 0.4212099551627702], 533, 'ni.csv'],
	[[0.4212099551627712, 0.42484891805834524], 56, 'no.csv'],
	[[0.42484891805834624, 0.42491389953862324], 1, 'nó.csv'],
	[[0.42491389953862424, 0.42582364026251723], 14, 'nu.csv'],
	[[0.42582364026251823, 0.42588862174279524], 1, 'ny.csv'],
	[[0.42588862174279624, 0.43784521411396926], 184, 'ob.csv'],
	[[0.43784521411397026, 0.4403145103645383], 38, 'oc.csv'],
	[[0.4403145103645393, 0.4559750471115653], 241, 'od.csv'],
	[[0.4559750471115663, 0.4569497693157373], 15, 'of.csv'],
	[[0.4569497693157383, 0.4601988433296433], 50, 'og.csv'],
	[[0.4601988433296443, 0.4602638248099213], 1, 'oh.csv'],
	[[0.4602638248099223, 0.4606537136915903], 6, 'oj.csv'],
	[[0.4606537136915913, 0.4641627136266093], 54, 'ok.csv'],
	[[0.4641627136266103, 0.4650724543505033], 14, 'ol.csv'],
	[[0.4650724543505043, 0.4652673987913373], 3, 'oł.csv'],
	[[0.4652673987913383, 0.4658522321138403], 9, 'om.csv'],
	[[0.4658522321138413, 0.4659821950743963], 2, 'on.csv'],
	[[0.4659821950743973, 0.4722204171810963], 96, 'op.csv'],
	[[0.4722204171810973, 0.4754045097147243], 49, 'or.csv'],
	[[0.4754045097147253, 0.4822925466242053], 106, 'os.csv'],
	[[0.4822925466242063, 0.4832022873480993], 14, 'oś.csv'],
	[[0.4832022873481003, 0.4847618428747743], 24, 'ot.csv'],
	[[0.4847618428747753, 0.4853466761972773], 9, 'ow.csv'],
	[[0.4853466761972783, 0.4854116576775553], 1, 'ów.csv'],
	[[0.4854116576775563, 0.4862564169211713], 13, 'oz.csv'],
	[[0.4862564169211723, 0.4865163428422833], 4, 'oż.csv'],
	[[0.4865163428422843, 0.5014620833062513], 230, 'pa.csv'],
	[[0.5014620833062523, 0.5015920462668073], 2, 'pą.csv'],
	[[0.5015920462668083, 0.5019169536681983], 5, 'pc.csv'],
	[[0.5019169536681993, 0.5072454350510043], 82, 'pe.csv'],
	[[0.5072454350510053, 0.5080252128143413], 12, 'pę.csv'],
	[[0.5080252128143423, 0.5179673792968933], 153, 'pi.csv'],
	[[0.5179673792968943, 0.5223861199558053], 68, 'pl.csv'],
	[[0.5223861199558063, 0.5260900643316583], 57, 'pł.csv'],
	[[0.5260900643316593, 0.5262200272922143], 2, 'pn.csv'],
	[[0.5262200272922153, 0.5784001559555453], 803, 'po.csv'],
	[[0.5784001559555463, 0.5797647670413862], 21, 'pó.csv'],
	[[0.5797647670413872, 0.6381181363311382], 898, 'pr.csv'],
	[[0.6381181363311392, 0.6398726362986472], 27, 'ps.csv'],
	[[0.6398726362986482, 0.6400025992592032], 2, 'pt.csv'],
	[[0.6400025992592042, 0.6433816362336652], 52, 'pu.csv'],
	[[0.6433816362336662, 0.6439664695561682], 9, 'py.csv'],
	[[0.6439664695561692, 0.6485151731756362], 70, 'ra.csv'],
	[[0.6485151731756372, 0.6487750990967482], 4, 'rą.csv'],
	[[0.6487750990967492, 0.6488400805770262], 1, 'rd.csv'],
	[[0.6488400805770272, 0.6608616544284782], 185, 're.csv'],
	[[0.6608616544284792, 0.6615114692312593], 10, 'rę.csv'],
	[[0.6615114692312603, 0.6615764507115373], 1, 'ri.csv'],
	[[0.6615764507115383, 0.6826304503216483], 324, 'ro.csv'],
	[[0.6826304503216493, 0.6849048021313823], 35, 'ró.csv'],
	[[0.6849048021313833, 0.6871791539411163], 35, 'ru.csv'],
	[[0.6871791539411173, 0.6892585613100163], 32, 'ry.csv'],
	[[0.6892585613100173, 0.6922477094028103], 46, 'rz.csv'],
	[[0.6922477094028113, 0.6973162648645034], 78, 'sa.csv'],
	[[0.6973162648645044, 0.6979660796672844], 10, 'są.csv'],
	[[0.6979660796672854, 0.6997855611150714], 28, 'sc.csv'],
	[[0.6997855611150724, 0.7014100981220244], 25, 'śc.csv'],
	[[0.7014100981220254, 0.7053739684189894], 61, 'se.csv'],
	[[0.7053739684189904, 0.7056338943401014], 4, 'sę.csv'],
	[[0.7056338943401024, 0.7058288387809354], 3, 'sf.csv'],
	[[0.7058288387809364, 0.7059588017414914], 2, 'sh.csv'],
	[[0.7059588017414924, 0.7092078757553973], 50, 'si.csv'],
	[[0.7092078757553983, 0.7092728572356753], 1, 'sj.csv'],
	[[0.7092728572356763, 0.7186301903957244], 144, 'sk.csv'],
	[[0.7186301903957254, 0.7189550977971154], 5, 'sl.csv'],
	[[0.7189550977971164, 0.7226590421729684], 57, 'sł.csv'],
	[[0.7226590421729694, 0.7241536162193654], 23, 'śl.csv'],
	[[0.7241536162193664, 0.7253882643446493], 19, 'sm.csv'],
	[[0.7253882643446503, 0.7268828383910463], 23, 'śm.csv'],
	[[0.7268828383910473, 0.7270777828318803], 3, 'sn.csv'],
	[[0.7270777828318813, 0.7274026902332713], 5, 'śn.csv'],
	[[0.7274026902332723, 0.7292871531613373], 29, 'so.csv'],
	[[0.7292871531613383, 0.7411137825719553], 182, 'sp.csv'],
	[[0.7411137825719563, 0.7416986158944583], 9, 'śp.csv'],
	[[0.7416986158944593, 0.7417635973747363], 1, 'sq.csv'],
	[[0.7417635973747373, 0.7422184677366833], 7, 'sr.csv'],
	[[0.7422184677366843, 0.7433231529014113], 17, 'śr.csv'],
	[[0.7433231529014123, 0.7434531158619673], 2, 'ss.csv'],
	[[0.7434531158619683, 0.7589187081681603], 238, 'st.csv'],
	[[0.7589187081681613, 0.7624277081031793], 54, 'su.csv'],
	[[0.7624277081031803, 0.7630125414256823], 9, 'sw.csv'],
	[[0.7630125414256833, 0.7660666709987544], 47, 'św.csv'],
	[[0.7660666709987554, 0.7696406524140513], 55, 'sy.csv'],
	[[0.7696406524140523, 0.7886152446552623], 292, 'sz.csv'],
	[[0.7886152446552633, 0.7933588927155654], 73, 'ta.csv'],
	[[0.7933588927155664, 0.7935538371563994], 3, 'tc.csv'],
	[[0.7935538371564004, 0.7991422444603173], 86, 'te.csv'],
	[[0.7991422444603183, 0.7996620963025424], 8, 'tę.csv'],
	[[0.7996620963025434, 0.7997270777828204], 1, 'ti.csv'],
	[[0.7997270777828214, 0.7999220222236544], 3, 'tk.csv'],
	[[0.7999220222236554, 0.7999870037039324], 1, 'tl.csv'],
	[[0.7999870037039334, 0.8010267073883824], 16, 'tł.csv'],
	[[0.8010267073883834, 0.8038858925206195], 44, 'to.csv'],
	[[0.8038858925206205, 0.8132432256806685], 144, 'tr.csv'],
	[[0.8132432256806695, 0.8151926700890125], 30, 'tu.csv'],
	[[0.8151926700890135, 0.8162323737734626], 16, 'tw.csv'],
	[[0.8162323737734636, 0.8183767626226406], 33, 'ty.csv'],
	[[0.8183767626226416, 0.8196114107479245], 19, 'ub.csv'],
	[[0.8196114107479255, 0.8222756514393276], 41, 'uc.csv'],
	[[0.8222756514393286, 0.8240951328871146], 28, 'ud.csv'],
	[[0.8240951328871156, 0.8248099291701736], 11, 'ug.csv'],
	[[0.8248099291701746, 0.8248749106504516], 1, 'uh.csv'],
	[[0.8248749106504526, 0.8254597439729546], 9, 'uj.csv'],
	[[0.8254597439729556, 0.8272142439404636], 27, 'uk.csv'],
	[[0.8272142439404646, 0.8283189291051916], 17, 'ul.csv'],
	[[0.8283189291051926, 0.8288387809474166], 8, 'uł.csv'],
	[[0.8288387809474176, 0.8307232438754826], 29, 'um.csv'],
	[[0.8307232438754836, 0.8323477808824356], 25, 'un.csv'],
	[[0.8323477808824365, 0.8328026512443826], 7, 'uo.csv'],
	[[0.8328026512443836, 0.8360517252582885], 50, 'up.csv'],
	[[0.8360517252582895, 0.8380661511469105], 31, 'ur.csv'],
	[[0.8380661511469115, 0.8416401325622075], 55, 'us.csv'],
	[[0.8416401325622085, 0.8421599844044325], 8, 'uś.csv'],
	[[0.8421599844044335, 0.8437195399311075], 24, 'ut.csv'],
	[[0.8437195399311085, 0.8454090584183385], 26, 'uw.csv'],
	[[0.8454090584183395, 0.8467086880239004], 20, 'uz.csv'],
	[[0.8467086880239014, 0.8472935213464035], 9, 'uż.csv'],
	[[0.8472935213464045, 0.8473585028266815], 1, 'va.csv'],
	[[0.8473585028266825, 0.8474884657872375], 2, 've.csv'],
	[[0.8474884657872385, 0.8475534472675155], 1, 'vi.csv'],
	[[0.8475534472675165, 0.8519721879264275], 68, 'wa.csv'],
	[[0.8519721879264285, 0.8527519656897645], 12, 'wą.csv'],
	[[0.8527519656897655, 0.8530118916108765], 4, 'wb.csv'],
	[[0.8530118916108775, 0.8541815582558825], 18, 'wc.csv'],
	[[0.8541815582558835, 0.8547663915783855], 9, 'wd.csv'],
	[[0.8547663915783865, 0.8579504841120135], 49, 'we.csv'],
	[[0.8579504841120145, 0.8590551692767414], 17, 'wę.csv'],
	[[0.8590551692767424, 0.8593150951978534], 4, 'wg.csv'],
	[[0.8593150951978544, 0.8593800766781314], 1, 'wh.csv'],
	[[0.8593800766781324, 0.8706868542465245], 174, 'wi.csv'],
	[[0.8706868542465255, 0.8708817986873585], 3, 'wj.csv'],
	[[0.8708817986873595, 0.8712716875690275], 6, 'wk.csv'],
	[[0.8712716875690285, 0.8732211319773715], 30, 'wł.csv'],
	[[0.8732211319773725, 0.8733510949379275], 2, 'wm.csv'],
	[[0.8733510949379285, 0.8741308727012645], 12, 'wn.csv'],
	[[0.8741308727012655, 0.8766001689518336], 38, 'wo.csv'],
	[[0.8766001689518346, 0.8767951133926676], 3, 'wó.csv'],
	[[0.8767951133926686, 0.8784196503996206], 25, 'wp.csv'],
	[[0.8784196503996216, 0.8801091688868515], 26, 'wr.csv'],
	[[0.8801091688868525, 0.8863473909935515], 96, 'ws.csv'],
	[[0.8863473909935525, 0.8866722983949425], 5, 'wś.csv'],
	[[0.8866722983949435, 0.8874520761582796], 12, 'wt.csv'],
	[[0.8874520761582806, 0.8877120020793916], 4, 'wu.csv'],
	[[0.8877120020793926, 0.9221521866267957], 530, 'wy.csv'],
	[[0.9221521866267967, 0.9252712976801457], 48, 'wz.csv'],
	[[0.9252712976801467, 0.9630905192020117], 582, 'za.csv'],
	[[0.9630905192020127, 0.9632854636428457], 3, 'zą.csv'],
	[[0.9632854636428467, 0.9647800376892427], 23, 'ża.csv'],
	[[0.9647800376892437, 0.9650399636103547], 4, 'żą.csv'],
	[[0.9650399636103557, 0.9675092598609237], 38, 'zb.csv'],
	[[0.9675092598609247, 0.9716680745987237], 64, 'zd.csv'],
	[[0.9716680745987247, 0.9717330560790017], 1, 'źd.csv'],
	[[0.9717330560790027, 0.9741373708492918], 37, 'ze.csv'],
	[[0.9741373708492927, 0.9743323152901258], 3, 'zę.csv'],
	[[0.9743323152901268, 0.9756319448956877], 20, 'że.csv'],
	[[0.9756319448956887, 0.9777763337448657], 33, 'zg.csv'],
	[[0.9777763337448667, 0.9778413152251437], 1, 'zh.csv'],
	[[0.9778413152251447, 0.9795308337123747], 26, 'zi.csv'],
	[[0.9795308337123757, 0.9801156670348777], 9, 'zj.csv'],
	[[0.9801156670348787, 0.9803755929559897], 4, 'zl.csv'],
	[[0.9803755929559907, 0.9820651114432207], 26, 'zł.csv'],
	[[0.9820651114432217, 0.9821950744037767], 2, 'żł.csv'],
	[[0.9821950744037777, 0.9846643706543458], 38, 'zm.csv'],
	[[0.9846643706543468, 0.9847943336149018], 2, 'żm.csv'],
	[[0.9847943336149028, 0.9878484631879738], 47, 'zn.csv'],
	[[0.9878484631879748, 0.9880434076288078], 3, 'żn.csv'],
	[[0.9880434076288088, 0.9889531483527019], 14, 'zo.csv'],
	[[0.9889531483527029, 0.9894730001949269], 8, 'żo.csv'],
	[[0.9894730001949279, 0.9897329261160389], 4, 'żó.csv'],
	[[0.9897329261160399, 0.9914224446032699], 26, 'zr.csv'],
	[[0.9914224446032709, 0.9916173890441039], 3, 'źr.csv'],
	[[0.9916173890441049, 0.9916823705243819], 1, 'żr.csv'],
	[[0.9916823705243829, 0.9920072779257729], 5, 'zs.csv'],
	[[0.9920072779257739, 0.992527129767998], 8, 'zu.csv'],
	[[0.992527129767999, 0.992657092728554], 2, 'żu.csv'],
	[[0.992657092728555, 0.997790629670526], 79, 'zw.csv'],
	[[0.997790629670527, 0.997920592631082], 2, 'żw.csv'],
	[[0.997920592631083, 0.998115537071916], 3, 'zy.csv'],
	[[0.998115537071917, 0.999935018519703], 28, 'ży.csv'],
	[[0.999935018519704, 1], 1, 'zż.csv'],
];

async function parseCsv(path: string, fileName: string): Promise<string[]> {
	const filePath = path + fileName;
	const file = Bun.file(filePath);
	const csvText = await file.text();
	const lines = csvText.split('\n').filter(line => line.trim() !== '');
	return lines;
}

const randomWord = async () => {
	const randomNum = +Math.random().toFixed(15);
	const winningWordsFile: [number, string] = binarySearchWinningWordFile(winningWordsFiles, randomNum);
	const chosenFileLength: number = winningWordsFile[0] as unknown as number;
	const chosenFile: string = winningWordsFile[1] as unknown as string;
	const chosenWord = await getWord(winningWordsPath, chosenFile, chosenFileLength);
	return chosenWord;
};

async function getWord(filePath: string, fileName: string, fileLength: number): Promise<string> {
	const loadedFile = await parseCsv(filePath, fileName);
	const randomIndex = Math.floor(Math.random() * fileLength);
	return loadedFile[randomIndex];
}

function binarySearchWinningWordFile(arr: [[number, number], number, string][], target: number): [number, string] {
	let left = 0;
	let right = 358;

	while (left <= right) {
		const mid = Math.floor((left + right) / 2);
		const guessStart = arr[mid][0][0];
		const guessEnd = arr[mid][0][1];

		//const comparison = guess.localeCompare(target);
		let comparison = 0;
		if (guessStart <= target && target < guessEnd) {
			comparison = 0;
		} else if (guessStart > target) {
			comparison = 1;
		} else {
			comparison = -1;
		}

		if (comparison === 0) {
			return [arr[mid][1] as number, arr[mid][2] as string];
		}

		if (comparison < 0) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}

	return [0, ''];
}

async function checkWord(word: string) {
	const fileName = word.slice(0, 2) + '.csv';
	const array = await parseCsv(dictionaryPath, fileName);
	const result = binarySearch(array, word);
	return result;
}

function binarySearch(arr: string[], target: string): boolean {
	let left = 0;
	let right = arr.length - 1;

	while (left <= right) {
		const mid = Math.floor((left + right) / 2);
		const guess = arr[mid];

		const comparison = guess.localeCompare(target);

		if (comparison === 0) {
			return true;
		}

		if (comparison < 0) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}

	return false;
}

const app = new Elysia();
app.use(cors());
app.get('/getword', async () => {
	const result = await randomWord();
	return { word: result };
});
app.post('/checkword', async req => {
	const result = await checkWord(req.body as string);
	return { message: result };
});
app.listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
