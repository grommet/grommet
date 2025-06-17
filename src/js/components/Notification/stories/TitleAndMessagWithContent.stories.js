import React, { useState } from 'react';

import { Notification } from 'grommet';
import { Button } from '../../Button';
import { Box } from '../../Box';

const TitleAndMessageWithContentNotification = () => {
  const [visible, setVisible] = useState(false);

  const onOpen = () => setVisible(true);
  const onClose = () => setVisible(undefined);

  return (
    <>
      <Box pad="large" justify="center">
        <Button label="Show Notification" onClick={onOpen} />
      </Box>
      {visible && (
        <Notification
          toast
          title="Status Title"
          message="Messages should be at max two lines of text."
          onClose={onClose}
        />
      )}

      <Box pad="large" justify="center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione placeat
        fugit corrupti autem illum tempore corporis explicabo facilis at?
        Veritatis similique reprehenderit rem consequatur ab doloribus omnis,
        voluptas, voluptatibus qui veniam architecto aliquid molestiae delectus
        quae perferendis accusamus deleniti rerum quis doloremque adipisci,
        maxime neque nemo expedita? Soluta quibusdam quidem dolorum fuga ipsa
        repudiandae magnam unde ea maxime. Exercitationem animi dolorum
        asperiores enim quasi. Nemo ducimus libero error beatae fuga facilis
        commodi doloribus sint debitis voluptates! Sequi doloribus officiis
        nemo, eos rem minima! At vitae consectetur, error maxime quam minus
        voluptatum a quibusdam hic quas iste eligendi in suscipit repellat
        deserunt, odio asperiores, sequi quidem recusandae. Mollitia, optio
        nostrum? Quis quos, ipsa pariatur hic quibusdam recusandae temporibus
        natus. Est commodi repellat tempore repellendus distinctio animi quam
        iusto possimus architecto alias vero vel nisi voluptate, neque officia
        ut similique illum voluptatem iste a modi dicta quasi accusantium ea.
        Sunt quo explicabo inventore blanditiis pariatur hic reprehenderit,
        totam corporis molestias porro placeat nihil vitae distinctio provident
        fugiat dicta culpa modi velit saepe adipisci? Labore quas, cum
        voluptatem quasi dicta earum! Nihil repellat dolorum laborum? Sequi
        corporis maxime alias enim cumque laudantium cupiditate, iste ipsa,
        neque optio nesciunt maiores. Quidem voluptatum cupiditate porro odio
        voluptas aspernatur. Exercitationem error totam quia! Modi quae, eaque
        tempore doloribus deleniti quam totam! Molestias nihil placeat odio
        repudiandae, numquam, sequi sit beatae, recusandae illum nostrum id.
        Tenetur officia provident eius non blanditiis voluptates itaque, qui
        consectetur nesciunt, sapiente iure, delectus expedita. Rerum expedita
        inventore ad sint tenetur culpa similique voluptate debitis consequatur
        consectetur architecto praesentium aliquid vel corporis incidunt,
        labore, earum magni vitae totam dignissimos? Molestias ullam nisi quas
        iste expedita dolores vel temporibus voluptatum reiciendis reprehenderit
        beatae amet quidem consequuntur vero itaque ratione omnis eius possimus
        ab ducimus enim, libero maiores? Consequuntur autem, quasi maiores et
        distinctio sed obcaecati placeat! Nisi ducimus, praesentium eligendi
        earum est ut nemo natus, rerum, veritatis vitae nulla impedit libero?
        Provident numquam quibusdam in libero voluptatibus! Ducimus, saepe
        quaerat similique architecto vel quo eligendi veritatis deleniti
        possimus earum necessitatibus rerum fugiat sapiente debitis illum fuga
        magni voluptates. Aperiam fugit sint, officia sit illum qui at ex, nobis
        minima minus doloribus? Ut dignissimos deleniti doloremque magni enim
        debitis eaque fugit vero facere ullam voluptate inventore, cum harum
        corporis in dolores quasi eligendi mollitia blanditiis illum alias
        accusantium! Incidunt maiores et saepe natus blanditiis vel, nobis
        recusandae esse cumque magni ipsum atque cupiditate nostrum, provident
        voluptatem voluptatum veniam. Sequi delectus eos cumque porro. Quidem
        totam distinctio vero fugiat nobis quia inventore soluta qui natus.
        Beatae quidem quas quae ipsum asperiores doloremque sunt minima cum.
        Veniam in maxime maiores aperiam esse nihil voluptates accusamus
        explicabo sint aliquam dicta sequi fugit suscipit quia dolore asperiores
        nostrum, alias voluptatem a optio ad sed illum fuga. Quo beatae
        repudiandae ipsa dolores, dolor ex? Rem quis nihil animi asperiores,
        praesentium suscipit deleniti consequatur fugit, blanditiis laudantium
        consectetur sunt officia dolorem corrupti cum reiciendis, expedita
        necessitatibus? Incidunt nisi repudiandae eveniet porro repellat eos
        velit enim ea iusto molestiae. Mollitia odio maiores suscipit illo animi
        amet ea molestias fugiat nemo unde, explicabo eos, non facere obcaecati
        nihil rerum est error commodi veritatis temporibus quos deserunt
        pariatur? Dignissimos ab exercitationem voluptate quo veritatis dicta
        ratione incidunt? Reprehenderit voluptate ab mollitia sint. Optio eius,
        asperiores similique omnis tempore neque assumenda dolorem facilis
        adipisci? Neque facere illo deleniti vitae accusantium saepe
        reprehenderit sit. Laudantium consequuntur consequatur doloribus
        corrupti architecto, inventore eum sapiente quaerat ipsa ipsum aliquid
        quos possimus ullam nulla doloremque nam, accusantium corporis assumenda
        enim ea obcaecati suscipit laborum quisquam! Quam molestiae eveniet eos,
        reprehenderit laborum tempore ad dolorem iure, temporibus fuga obcaecati
        ex voluptate velit quos praesentium ipsam accusamus odio aliquam fugiat
        commodi quod reiciendis ipsum. Expedita perspiciatis minima, nulla
        accusantium iusto doloribus? Harum porro saepe labore esse possimus
        delectus, modi assumenda dolore repudiandae autem optio aspernatur vero
        facilis hic tempora commodi culpa placeat repellendus fugiat voluptate
        dicta facere. Voluptate magni eaque quod blanditiis vitae dolor, atque
        magnam commodi. Reprehenderit blanditiis molestiae nihil, libero nemo
        eaque? Vero, nihil quos atque quas quidem, nobis maiores ad, numquam nam
        molestias cupiditate mollitia. Alias et cum adipisci minus quasi,
        aspernatur perferendis iste voluptates laboriosam consectetur debitis
        possimus sed incidunt doloremque deleniti quae fuga dicta hic voluptatum
        ex magnam dignissimos blanditiis. Consectetur recusandae odit quidem
        quisquam consequatur dolorum dolore, placeat eligendi similique?
        Repellendus dolor officia iusto. Sequi distinctio voluptatum
        perspiciatis voluptates atque adipisci, architecto, dolorem possimus ea
        consequuntur, officia libero? Nostrum voluptas ratione consequatur animi
        aliquid, possimus nulla excepturi fuga neque a deserunt asperiores
        tempora voluptate quibusdam, similique totam itaque libero, recusandae
        necessitatibus laborum. Dolorum nemo totam quos sapiente eos nihil
        blanditiis dicta est a minima! Nam sunt incidunt eligendi corrupti
        aliquid. Quis quaerat repellendus temporibus, recusandae nam et sit
        neque deleniti itaque dignissimos porro aliquam libero nulla ducimus
        ipsam sed omnis, ad reiciendis ipsa esse ea? Sapiente facere tempore
        temporibus placeat est cumque, quam harum sint blanditiis ipsam maiores
        ad alias soluta inventore! Quas ea soluta earum delectus nulla corrupti
        minima quos asperiores esse expedita est tempore magnam doloribus,
        aperiam, explicabo quaerat ipsam autem commodi animi, deleniti
        repellendus. Tempora adipisci quos ex magni doloremque. Exercitationem
        atque quam, fugiat cupiditate delectus ex mollitia sit quo eius, quaerat
        totam eveniet consectetur corporis porro recusandae qui quasi,
        reiciendis hic similique. Delectus, ipsum. Repudiandae quos culpa quae
        necessitatibus at sapiente beatae eaque in! Nostrum omnis esse ab
        dignissimos similique alias saepe veniam animi. Facilis ducimus harum
        animi neque deleniti saepe voluptatum temporibus ipsa ipsam, quae
        mollitia quidem quis delectus impedit corrupti aperiam. Ea accusantium a
        sapiente. Quis sunt aliquid nostrum, perferendis iusto eaque nemo
        similique et deserunt accusamus maiores reprehenderit iste voluptate
        officia doloremque magni architecto omnis reiciendis repellat error
        commodi! Ab hic ea autem laudantium. Commodi labore, quidem
        necessitatibus quae numquam illo aspernatur ut maxime? Quod
        exercitationem reprehenderit ipsam ad illum at fugiat nostrum temporibus
        neque assumenda? Dignissimos possimus rem velit repellendus cupiditate?
        Possimus non tempore nulla, necessitatibus fugiat inventore excepturi
        placeat pariatur dolorum maxime voluptate atque architecto dolore amet
        animi saepe consectetur. Delectus maiores ut perferendis unde
        repudiandae soluta repellendus natus esse nemo omnis illo ab vitae
        impedit modi voluptate accusantium maxime autem odit illum, rem
        voluptatibus harum suscipit iste? Hic sunt soluta necessitatibus ducimus
        in distinctio consequuntur modi voluptates? Aliquam repellendus facere,
        inventore repellat quae facilis. Accusamus assumenda cumque distinctio
        esse provident architecto voluptate? Suscipit, dicta. Suscipit mollitia
        dicta eaque debitis reprehenderit eligendi quisquam? Labore tempore,
        architecto voluptatibus atque placeat quidem quam non autem? Vitae
        perspiciatis dolor voluptatem, iure magni asperiores sunt molestias
        corrupti expedita ipsum placeat ratione obcaecati labore, commodi rerum
        cumque blanditiis dolore. Voluptas ipsam obcaecati quas assumenda sequi
        amet eaque repellat asperiores, rem enim pariatur sunt tenetur cumque
        perspiciatis? In, dolor totam porro neque ab laudantium quia voluptas
        tempore mollitia beatae a natus maxime doloremque eveniet vel sequi
        veritatis quam enim cumque tempora eligendi asperiores nesciunt ducimus!
        Exercitationem iusto ex, aut natus perferendis deleniti iste corporis
        nostrum adipisci! Sint placeat nostrum nesciunt, repellendus repellat
        earum non quae fuga quidem dicta, laudantium doloremque tenetur facilis
        nam veritatis dolore ullam voluptas autem. Asperiores incidunt
        consequuntur nostrum, explicabo perspiciatis commodi reiciendis eius
        libero officiis quas aspernatur labore, distinctio assumenda repudiandae
        molestiae minus tempora dicta exercitationem repellat ut dolore ratione
        id! Quidem ut quaerat aperiam consequuntur quis in dolore deleniti odio
        dolor vitae esse accusamus ad, laudantium nemo quibusdam fuga, autem
        dignissimos a et mollitia nam reiciendis. Deleniti praesentium eos
        mollitia enim excepturi tempore unde rerum illo, quas consequatur.
        Architecto velit atque iste modi molestias vel nostrum placeat
        necessitatibus quaerat ipsa laborum explicabo inventore cum nihil quam
        odio iure nisi voluptatibus, et eius laudantium ut? Quos rerum
        temporibus magnam voluptates reprehenderit quis suscipit corrupti
        corporis delectus optio velit voluptatibus labore magni maxime quam
        praesentium ducimus quidem soluta, facilis iusto. Animi, quod eius quos
        placeat vitae vero iste pariatur amet odio laudantium voluptatibus
        obcaecati sunt praesentium dignissimos dolor ducimus eos suscipit quis
        sapiente sit molestias magnam reiciendis, exercitationem officiis? Amet
        id, perspiciatis qui quos quia soluta enim labore, nihil reprehenderit
        veritatis dicta hic sequi doloribus quisquam obcaecati laudantium natus
        cupiditate porro ut error nobis molestiae dolorem sint eius! Beatae sunt
        voluptate necessitatibus cupiditate quisquam veritatis reprehenderit
        voluptatem deserunt ab inventore, nobis quae accusantium tempora
        eligendi. Eaque placeat voluptatum expedita iure, voluptatem quidem
        eveniet rem repudiandae. Assumenda corporis, doloremque ex repellat
        necessitatibus cumque tenetur minus earum? Iusto cupiditate a suscipit,
        nam quisquam rerum nulla laborum explicabo, odit fuga non at praesentium
        ex necessitatibus saepe inventore ea ut nisi dolorem et pariatur debitis
        voluptates quos? In, blanditiis iste repellat doloremque distinctio
        labore eveniet minus hic omnis cumque consectetur veniam temporibus
        nostrum vero obcaecati sapiente laudantium esse commodi earum
        reprehenderit voluptate, saepe quam nisi fugit. Consequatur in et amet
        omnis dolor numquam, tempore est cum dolorum corrupti eligendi harum ab
        sed labore nobis sunt vero deserunt? Dignissimos obcaecati debitis
        adipisci vero suscipit ex accusamus neque doloribus totam, vitae et,
        quia fugiat! Vitae voluptas commodi tempora eveniet assumenda, atque
        nulla, illo odit numquam temporibus maiores vero nobis, eligendi sed
        autem saepe odio. Officia nihil architecto et fuga modi cumque nisi esse
        facilis temporibus? Nisi minima magni suscipit accusamus sapiente, dicta
        quisquam tenetur, dolore porro maiores rem libero molestiae? Consequatur
        qui eaque nulla modi minima quae iusto dolorem recusandae dicta
        voluptas, similique, doloribus consequuntur? Officia modi harum quidem,
        laboriosam beatae earum tempore nisi. Quas, nostrum! Veniam quisquam
        voluptate, aliquam maiores, facilis soluta officiis illo esse veritatis
        ipsa perferendis deleniti, est ratione eos aliquid iure doloribus minus
        dolorum eligendi! Tenetur, dolore delectus, dolorum inventore ex et
        voluptatum itaque explicabo commodi, praesentium nemo! Non molestiae
        officiis doloremque assumenda illo neque perspiciatis mollitia amet.
        Sequi, qui et. Facere ducimus ut nihil saepe nemo non dolore nam
        quisquam possimus sapiente, culpa voluptatibus odio temporibus
        consectetur corrupti molestiae. Illo earum libero aperiam recusandae
        voluptate officiis magni inventore maxime minus eum, labore esse, atque
        nisi voluptatem. Assumenda, quaerat delectus temporibus voluptatem harum
        aut ipsum dolores ut corrupti ex nesciunt, eius dolorem recusandae.
        Quos, ducimus doloremque. Natus optio nisi maxime vero beatae fuga
        mollitia, dicta unde voluptas quod nemo ipsam. Autem omnis, dignissimos
        voluptatibus qui quo quibusdam ducimus quia eius est debitis vitae,
        voluptates quasi? Labore placeat cupiditate, delectus similique, nulla
        autem repellat perferendis veniam atque, quis et quae minus accusamus
        soluta deserunt id! Pariatur obcaecati distinctio corrupti repudiandae
        repellendus repellat? Ad inventore, perferendis est repudiandae sequi
        quasi consequuntur dignissimos quaerat eligendi quam recusandae aperiam
        nostrum minima, error suscipit expedita pariatur magni reprehenderit
        dicta veniam repellat nobis obcaecati impedit! Porro aut aliquid illum
        sit id explicabo error ab enim odit vel delectus in placeat consequatur,
        voluptatibus illo doloremque mollitia necessitatibus earum nam unde.
        Quia beatae suscipit ex nobis adipisci a ducimus! Porro voluptatibus
        impedit pariatur nostrum ipsa veritatis ex quos eum alias quaerat sint
        sequi laudantium quas, ea iure dolorem dolorum tempore. Dolorum, dicta
        quidem numquam quo ratione voluptates quod omnis exercitationem impedit,
        commodi recusandae dolore fugiat explicabo odio? Odit vero doloremque
        debitis, voluptas assumenda ullam consectetur eaque quis atque
        exercitationem molestias natus obcaecati quibusdam voluptatibus
        repudiandae maxime consequuntur tenetur esse molestiae pariatur
        cupiditate, beatae explicabo minima. Est corporis magnam et expedita
        impedit dolor illum. Vel perspiciatis dolores praesentium numquam est,
        inventore exercitationem mollitia quaerat nostrum iusto eligendi tempora
        accusamus provident tenetur quibusdam error? Ipsum laudantium provident
        harum vitae libero cumque, tempora nam reprehenderit, porro facere
        natus? Consequuntur labore blanditiis autem ullam adipisci nihil eveniet
        quaerat molestiae? Minima omnis provident voluptatum, rerum harum iure
        saepe temporibus optio dolor blanditiis, ipsam doloribus, hic autem ea
        perferendis suscipit minus modi itaque vero. Harum, illum expedita
        cupiditate hic laboriosam neque dolorum dolor repellat explicabo quas
        eos! Voluptate deleniti at nostrum quasi fuga, repudiandae porro
        explicabo consectetur et molestias corrupti incidunt sit voluptatem
        animi, veritatis dolor! A maxime quibusdam quidem provident
        exercitationem perspiciatis! Consequuntur cum eius quibusdam recusandae,
        voluptates aperiam architecto nisi perspiciatis, magni incidunt
        voluptatem dicta maxime et molestiae molestias? Dolores atque blanditiis
        omnis facilis officia autem deleniti, commodi vel dignissimos hic velit
        nisi distinctio vero minus molestias eos itaque aliquid obcaecati
        incidunt maxime laborum magnam ab. Reprehenderit adipisci minus
        necessitatibus dolor odit nisi consectetur magni deserunt? Consequatur,
        quisquam quia. Quasi vitae porro natus nisi inventore sequi mollitia
        corporis accusamus totam laudantium, quod officia omnis repellendus modi
        provident asperiores fugit nulla laborum hic ex quidem excepturi sunt
        quo? Quisquam libero pariatur consequatur? Soluta magnam consectetur
        expedita vero officiis praesentium et qui veritatis, laborum placeat
        quae non quam aut nesciunt ipsam numquam animi cumque temporibus
        corrupti. Eum consectetur quas quis dolorem expedita animi quidem
        aspernatur quia maiores, consequuntur illum delectus modi repellat
        cumque cum minus quibusdam voluptatum quos blanditiis. Iure, soluta
        atque, saepe quia doloribus at culpa commodi accusamus consequuntur
        ipsa, et praesentium amet velit rerum dolore rem modi incidunt similique
        optio ut eum asperiores. Expedita nostrum voluptatum esse omnis optio
        perferendis tenetur itaque adipisci assumenda molestiae aspernatur
        reprehenderit velit accusamus officiis ex dolorum repellendus provident
        enim odit amet natus, doloremque sint. At non nostrum itaque sint atque,
        labore deserunt dicta ipsa, vero molestiae velit amet molestias odit
        omnis voluptate. Impedit, ex! Recusandae at dolores cumque cum, quos
        corporis distinctio alias ipsam illo accusantium delectus obcaecati
        doloremque provident, ipsum itaque facilis beatae, autem ab
        consequuntur! A iste ab earum itaque ipsam qui laboriosam dignissimos
        harum ea impedit ullam blanditiis nemo nesciunt facilis aspernatur unde
        atque, reprehenderit odio vitae provident. Adipisci doloremque autem et
        sequi ducimus itaque distinctio, fugiat ex, corrupti non dicta
        aspernatur, animi laborum earum similique delectus ab neque. Asperiores,
        quae voluptate omnis, accusantium totam architecto porro nesciunt
        praesentium quos voluptas assumenda odio quasi illo sed? Laborum, sint.
        Porro quia, ducimus eaque quibusdam qui magni? Voluptatibus eveniet,
        unde ipsum tempore dicta sapiente quaerat quasi corrupti aspernatur
        veritatis perferendis quidem vitae fuga, commodi qui, tenetur ratione
        labore exercitationem a deleniti officia reprehenderit magni in.
        Repudiandae odio at, natus corporis incidunt minima numquam sunt eaque
        quisquam enim ipsam commodi accusamus inventore? Cum aspernatur
        provident iure architecto quia ut voluptas reiciendis amet dignissimos,
        repellendus sint inventore! Optio, cum. Quam perferendis, facere harum
        illum deleniti nihil veritatis, commodi hic culpa dicta beatae
        necessitatibus? Ex sunt ducimus nostrum earum illo iusto libero eveniet
        veniam hic saepe inventore atque, maxime magnam sit architecto corporis
        iure reiciendis consequuntur sint suscipit! Dolor sit officiis aut
        debitis aspernatur? Et veniam in omnis, cumque aperiam repellendus
        tenetur facilis voluptate perspiciatis debitis iure, unde quisquam
        voluptatibus eum obcaecati maiores, quia doloremque nam. Libero dolorem
        similique impedit quis laudantium, quos officiis eligendi corporis
        maiores minus perferendis dolores, blanditiis rem saepe, sunt
        accusantium aspernatur tenetur? Dicta, sequi suscipit? Accusamus dolore
        voluptatem placeat esse mollitia a eius perspiciatis eos iusto. Officia
        modi quidem, vel expedita doloribus quisquam commodi sequi. Delectus
        distinctio iure a accusantium sit odio dignissimos perferendis sequi
        repudiandae? Ea voluptatem, et voluptatum ipsum accusamus molestiae esse
        est error ab nostrum, sequi unde nesciunt sapiente iste. Cupiditate,
        aliquam. Neque porro harum recusandae sed, ea a velit atque labore esse
        sit! Quisquam perspiciatis repellendus voluptas hic? Quod omnis
        asperiores corporis. Saepe nisi sunt atque, odit modi molestiae itaque.
        Maxime tempore aut, cumque sint non mollitia nisi nostrum, dolor ratione
        et earum provident! Dolores, voluptas itaque. Animi fugit cum amet
        accusantium aliquam ipsa sed iusto quia consectetur commodi vel culpa
        quis ad fugiat reiciendis veniam, voluptatum mollitia repellendus
        laboriosam? Quisquam aliquid amet animi nemo voluptatum, a deserunt
        distinctio quod tempora qui fugit dolorem inventore obcaecati ut, magnam
        mollitia beatae. Veritatis consequatur eveniet eius ad autem commodi
        debitis. Cumque nobis cum voluptatibus sunt totam ab aperiam quos nulla
        ex a! Tenetur atque ipsum repellat saepe officia. Modi quae dicta
        officia a vero sed eaque veniam laboriosam numquam inventore consequatur
        autem placeat rerum natus illo mollitia aliquam vel exercitationem
        nostrum, ipsam reprehenderit velit reiciendis. Praesentium, corrupti
        adipisci nesciunt iste maiores quia, hic non ea atque placeat, earum
        odio natus dicta cumque. Laborum aut vero dolor distinctio blanditiis
        laudantium delectus qui alias eaque asperiores amet eligendi provident
        nobis expedita voluptates ea enim rem consequuntur quidem iste, maxime
        quasi culpa sunt. Tempore dignissimos nulla delectus architecto sunt.
        Hic quo, fuga, ratione velit architecto error eum tempore alias harum,
        voluptatum ex ipsum sint eos? Eligendi labore deleniti optio voluptatum
        suscipit eaque rerum reiciendis mollitia! Quaerat perspiciatis nostrum
        sunt, impedit velit repellendus aliquid laborum. Iusto labore voluptatum
        recusandae quae accusantium ipsa quas doloremque asperiores veniam
        pariatur ad, corrupti culpa architecto, inventore qui voluptatem! Quae
        fuga natus reiciendis dolores vel ullam unde quia aspernatur expedita
        repudiandae suscipit asperiores aut quod, rerum laboriosam dolorem
        maiores vero aperiam nesciunt itaque! Voluptatum aliquid nam iure
        eveniet ad aliquam necessitatibus labore, aut vero id sunt at recusandae
        veritatis expedita perspiciatis fuga repudiandae repellat consequuntur
        animi quo officiis ipsa corrupti laborum quis. Optio eaque odio
        architecto temporibus velit laudantium voluptas officiis totam saepe
        dolorum aliquid voluptatibus dolores animi tempore cum, nam dolore
        delectus? Ullam minima fuga ad repellat, delectus vero recusandae
        consequuntur excepturi modi sint magnam aliquam asperiores optio eos
        praesentium nemo voluptas veniam totam. Assumenda enim ratione
        laudantium at numquam necessitatibus obcaecati commodi consectetur
        doloribus eum recusandae facilis rerum tenetur similique deleniti
        tempore iusto, dicta sit tempora mollitia aut veniam! Placeat totam
        eveniet, recusandae rerum, cum asperiores iste quo odit tenetur qui
        numquam, eos corrupti. Eum et voluptatem quibusdam. Eius corporis
        inventore illo impedit esse quos. Amet eligendi iure voluptate quis,
        deserunt incidunt, cum illum reiciendis quo, iste repellendus pariatur.
        Error iusto sapiente nihil dicta ea. Excepturi iusto laudantium porro,
        sunt sequi dolorem voluptatem dolore temporibus nesciunt impedit
        dignissimos libero fugit exercitationem nihil in tempora sit sed nostrum
        possimus. Quis quisquam doloremque quod. Nostrum id saepe ullam tempora
        explicabo quaerat, blanditiis quas minima, quisquam obcaecati quis.
        Vitae corrupti nesciunt distinctio adipisci sit ipsa nostrum? At,
        molestiae ea. Quis ad numquam quos, illo ut, saepe architecto unde
        iusto, repellat id facilis facere quia sequi perferendis ab quaerat
        voluptas? Illum facilis ea, dolores nobis dolorum consequuntur! Animi
        quam quo, perferendis velit beatae suscipit porro repellendus veniam,
        consequuntur adipisci iusto! Excepturi debitis numquam dolor labore hic
        incidunt officia iste omnis error? Excepturi, laudantium at nulla
        repellendus assumenda quaerat repudiandae! Iste saepe sint delectus
        adipisci nobis at magnam. Architecto enim, tenetur est incidunt magnam
        adipisci repudiandae, commodi expedita, temporibus ratione voluptate
        voluptatem! Debitis mollitia, in veniam magni nam quam quos soluta.
        Molestias, quae.{' '}
      </Box>
    </>
  );
};

export const ToastWithContent = () => (
  <TitleAndMessageWithContentNotification />
);

ToastWithContent.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Visualizations/Notification/Toast With Content',
};
