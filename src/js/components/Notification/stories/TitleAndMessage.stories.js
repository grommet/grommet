import React, { useState } from 'react';

import { Notification } from 'grommet';
import { Button } from '../../Button';
import { Box } from '../../Box';

const TitleAndMessageNotification = () => {
  const [visible, setVisible] = useState(false);

  const onOpen = () => setVisible(true);
  const onClose = () => setVisible(undefined);

  return (
    <>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ipsum
        recusandae quas tempore, pariatur obcaecati sunt quam neque dolores!
        Tenetur natus delectus rerum necessitatibus animi. Sapiente culpa
        pariatur consectetur veritatis, corporis voluptates repellendus deserunt
        ipsa. Qui incidunt dolorum sequi accusamus, impedit facere dolor quidem
        vetatibus. Reprehenderit voluptate nostrum, harum voluptatum animi ut
        asperiores pariatur velit officiis sed dolorem eos assumenda odio vitae,
        eius ea? Ab laudantium nostrum nihil corrupti assumenda soluta et
        laboriosam. Similique optio reiciendis, ea, neque voluptatibus quam
        quaerat adipisci, laboriosam quibusdam quos enim quae fuga laudantium
        impedit debitis iusto non esse error sunt. Doloribus maxime ipsum amet
        facilis neque! Quis inventore consequatur esse iusto! Fuga, tempore
        nulla? Officia mollitia, similique necessitatibus quas corporis non
        itaque, voluptatum neque temporibus tempora cum! Corrupti, at voluptatem
        soluta tempore sit iure earum quo unde ipsam labore, adipisci
        perspiciatis vel facilis similique aliquid nemo voluptatum porro
        expedita. Fuga ad qui facilis blanditiis reiciendis saepe nostrum ea,
        sit eveniet dolores consequatur laboriosam in suscipit ipsum est sunt?
        Porro, tempora. Error quas voluptate, in qui odit, quo ab mollitia
        quidem tempora officiis omnis velit ea dicta, cum explicabo aut
        excepturi nam ipsam voluptates illum. Soluta ea ut accusantium doloribus
        optio nam quaerat quo quos veniam dolor quae consectetur, voluptate
        laudantium inventore, esse ullam culpa? Expedita perspiciatis porro
        harum tempora corporis unde nesciunt veritatis sit ullam, quam magnam
        deleniti delectus vero voluptatum similique voluptates, esse nemo dolor.
        Et aperiam exercitationem odit voluptate culpa dolorum. Odio eveniet
        nihil laborum est? Provident cumque, obcaecati quae nesciunt laborum
        unde perferendis dolor dolore consequuntur eius dolorem, esse quidem
        similique quos omnis. Explicabo quaerat, esse cumque, laboriosam, minima
        consequuntur nihil consectetur harum quasi eligendi nam sequi possimus
        aut architecto labore aliquam nisi vitae eum distinctio veritatis.
        Expedita blanditiis ducimus quis officia atque iure illum voluptates,
        enim distinctio. Dignissimos officiis laudantium veniam quam ad quos,
        quasi mollitia eum nemo natus, totam eius asperiores, illo non! Quidem
        aperiam, asperiores beatae eum necessitatibus earum perferendis cum
        deserunt odio pariatur nihil . Voluptatum autem harum necessitatibus
        deserunt rerum. Blanditiis velit omnis ex debitis sapiente commodi
        maxime. Odio, illo aperiam consectetur totam, soluta ipsam ad at cumque,
        voluptatum quos dolor iste atque quibusdam numquam nostrum facilis vel
        eius quae earum exercitationem repellendus recusandae maiores? Itaque
        alias repellendus, iste sequi aliquam velit provident sunt maiores esse
        voluptates voluptatum! In hic error nostrum, iure sequi, necessitatibus,
        a expedita praesentium aliquam nemo est iste! Ad, illum? Ad, quod
        ratione officia omnis iure vel minus laudantium accusantium expedita
        explicabo quidem ullam facilis modi unde velit voluptatum placeat alias
        temporibus sequi? Ipsum itaque molestiae laborum, eum alias qui
        consectetur. Corporis, dolorum, laborum qui veritatis ut harum nisi
        assumenda beatae est aperiam tempora modi. Iste dignissimos, amet eius
        velit sed at neque iure modi obcaecati ipsa, beatae perferendis
        asperiores aut minima a adipisci hic veniam. Aperiam, eos. Soluta
        assumenda laudantium ab tempora, sunt voluptatum modi vitae minima alias
        officia doloremque ducimus, quas quis optio harum ullam ipsa, quaerat
        praesentium esse rerum cumque molestiae! Suscipit at, esse iste repellat
        modi deserunt reiciendis eaque, nisi ipsa unde similique? Quasi minus
        consequatur atque, temporibus debitis aspernatur quod id pariatur
        repellendus incidunt modi, laudantium doloribus quisquam dolore.
        Deserunt eaque in dolorum architecto odit voluptate? Tempore similique
        sint magni odit, saepe doloremque ut nisi fugit totam dolorum
        exercitationem rerum autem reprehenderit rem quis. Eum aliquam, id
        repellat repellendus accusantium quas sequi cum est voluptatibus magni,
        mollitia excepturi rerum provident aut eius inventore laboriosam dicta
        voluptatem corporis quidem, voluptates perferendis? Inventore in iure
        hic optio magnam pariatur, ad excepturi, ut quibusdam temporibus
        veritatis odit deserunt vitae earum? Quod iure quisquam illum ipsum enim
        optio provident facere reprehenderit qui! Maiores, praesentium. Natus
        soluta repellat dicta alias quasi ratione, culpa dignissimos commodi aut
        explicabo debitis, veritatis necessitatibus! Cupiditate omnis sequi
        consequuntur. Dolorem hic molestiae, vitae consequatur reiciendis
        nostrum, nihil eum, laboriosam magnam optio incidunt est ipsam dicta
        rerum? Dolorem alias facere perferendis corporis molestias excepturi
        amet consequuntur voluptatem magnam nostrum dolorum facilis suscipit
        quaerat iste maiores totam, laborum maxime, magni modi impedit eos
        assumenda. Fugiat odit libero, illum aliquid nam ad, eligendi nemo dicta
        dolore eaque debitis minus esse itaque a facere eius, veritatis eum
        culpa. Nisi, officia? Minus incidunt molestiae laborum, doloribus
        facilis porro minima dolorem esse, quidem error voluptatibus quibusdam
        repudiandae nulla. At ab sequi reiciendis tempora consequatur
        perspiciatis ipsam fugiat minus sint, perferendis praesentium, vero nam.
        Porro, aperiam. Similique non quo expedita sapiente facere doloribus in
        aliquam, delectus possimus autem dolorum blanditiis soluta repudiandae
        quam totam id? Iure veniam fugiat cum rem doloremque dolorum consectetur
        exercitationem, ratione impedit animi unde odio officiis reiciendis ut
        laboriosam quasi saepe corporis et quam quis quidem alias hic quae.
        Ipsam quam delectus sequi, dolorem culpa quo doloribus eligendi optio
        quisquam quasi? Molestias illo eligendi accusamus velit? Dicta molestiae
        assumenda impedit fuga non doloribus minima sunt, ipsum quis. Magnam
        velit voluptas accusantium placeat dolor iure voluptatibus consectetur
        quis rerum reprehenderit! Similique unde laboriosam error veniam non
        laudantium voluptate, qui consectetur nihil excepturi officiis. Dolorem,
        similique. Doloribus, aliquid? Exercitationem libero labore tempore
        beatae architecto. Quas inventore ut labore magni sit molestiae?
        Doloribus molestias eligendi obcaecati deserunt unde inventore ducimus
        mollitia voluptas, nisi labore quam ipsam, amet quo, et itaque numquam.
        Ratione esse eius, saepe atque reprehenderit cupiditate laboriosam
        laudantium asperiores vitae fuga quod perferendis. Aliquid corporis
        exercitationem eius reiciendis, fugiat quasi tenetur beatae blanditiis
        vero minus, sit expedita velit quis eligendi earum? Saepe molestias
        quod, praesentium pariatur perferendis nulla voluptatem aperiam et quis
        expedita quibusdam quidem quos minus facilis dolor, asperiores
        recusandae totam, labore sed adipisci! Esse hic ducimus beatae deserunt,
        autem numquam saepe maiores ratione id sit, labore quod nihil unde nam
        commodi voluptatibus possimus sit! Quisquam veritatis incidunt dolorum
        rerum molestiae laboriosam aspernatur quod perspiciatis? Ut sint quo
        velit pariatur maiores nostrum. Possimus voluptatibus dolore harum
        accusamus corrupti. Fugiat ducimus ratione fuga incidunt minima ab porro
        repudiandae vitae ea dolores rerum eius exercitationem earum, nihil enim
        nulla eaque tempore perferendis eligendi esse magnam hic ullam dicta
        ipsam? Quo nostrum voluptatem, atque dolores unde explicabo quidem quia
        sint excepturi eaque maxime labore itaque quibusdam fuga culpa repellat
        debitis accusantium esse magni a. Impedit, facere accusamus. Culpa nihil
        eos fuga minima in autem rerum rem ipsa est vero accusamus labore,
        corrupti distinctio esse! Recusandae possimus placeat eos, vel minus
        assumenda unde eligendi distinctio accusantium necessitatibus vitae
        dolor cumque at alias perspiciatis, error veniam tenetur quo consequatur
        porro architecto! Enim similique nulla debitis eos eligendi ex,
        voluptatum beatae labore reiciendis eveniet ea explicabo adipisci
        praesentium earum dolore. Fuga omnis, cupiditate laborum optio inventore
        explicabo. Blanditiis, culpa! Suscipit quisquam, facilis, velit
        recusandae praesentium accusantium illum at temporibus minima eveniet
        enim molestiae quia veritatis voluptate doloremque tenetur! Tenetur
        magnam consectetur eos sapiente sit recusandae, voluptatum fugiat
        deleniti voluptate commodi tempore nulla, odio officiis voluptas
        architecto eius, dignissimos iste! Sit, dolore ex vitae deleniti
        consequatur aperiam dignissimos optio recusandae magni, quis natus!
        Animi nulla neque facilis possimus at. Numquam a suscipit enim nostrum
        ipsam provident harum, culpa amet accusamus, optio eligendi aut alias
        deserunt quos rem ipsum. Architecto et pariatur consequuntur provident
        dolor voluptatem obcaecati dolores ipsam eaque, tempore illum unde, vel
        soluta necessitatibus recusandae veniam corporis sunt facilis maiores.
        Perferendis nemo corrupti veritatis mollitia consectetur voluptate ut
        facilis accusantium neque. Eaque, doloremque? Architecto ab magni iure
        illum optio ducimus amet distinctio praesentium porro voluptates
        corrupti animi officiis, debitis nobis numquam error dicta. Quo, ab!
        Cumque, ipsa quia. Repellat ad tempore enim fuga mollitia modi ipsam est
        sequi alias. Sit dicta saepe libero enim excepturi magnam, accusantium
        corporis id quas atque pariatur hic cupiditate est earum? Velit tempora
        id quasi, esse asperiores obcaecati iusto, ex cum at nemo ullam
        aspernatur voluptatum aliquid distinctio totam non accusantium vero sed
        voluptatibus perferendis laboriosam vel blanditiis omnis numquam?
        Molestias autem tempora possimus laborum sunt voluptatum, labore soluta
        blanditiis cupiditate animi sint distinctio, maiores perferendis.
        Mollitia rerum itaque, quas consequuntur debitis ipsa culpa sed, dicta,
        non cum enim! Officiis dolore dolor, eaque magnam inventore
        exercitationem voluptate. Eum similique porro ullam eos deserunt numquam
        itaque cupiditate corrupti minus! Non illo, aperiam aspernatur soluta
        pariatur harum ad doloremque? Vero earum voluptate impedit, quas autem
        repellat voluptatibus voluptatum, magnam assumenda, numquam similique
        accusamus. Unde illum, dolor illo alias mollitia quos nulla rem
        praesentium repudiandae officia? Adipisci labore et cupiditate
        blanditiis aliquid harum expedita tempore consectetur autem, doloribus
        deserunt eos assumenda deleniti odit hic animi rem repudiandae cum
        magni? Soluta quibusdam unde libero earum qui, repellat exercitationem
        nobis aperiam, fugit cupiditate saepe. Fugit id suscipit ducimus.
        Officiis totam molestias sit accusamus, officia quibusdam voluptates?
        Dicta hic suscipit rerum vitae sequi minima enim deserunt ratione,
        numquam, velit inventore praesentium aperiam exercitationem dolor eius,
        cupiditate commodi adipisci maiores voluptate. Cum vitae placeat, rerum
        nemo impedit alias soluta debitis quia nostrum unde possimus, sapiente
        dolor? Delectus velit distinctio ex cupiditate unde, voluptatum
        veritatis maxime ipsum quos provident sunt nulla. Dolorum magnam quam
        nesciunt, reprehenderit impedit corporis deserunt, optio nostrum debitis
        quibusdam deleniti voluptatem aperiam assumenda? Ullam laborum eos ipsa
        nobis tempora culpa delectus beatae saepe ex, excepturi itaque nesciunt
        aliquid blanditiis placeat sunt, doloribus minus atque, enim quo dolorum
        inventore iure! Cum culpa porro odio consequuntur dolores animi
        asperiores vitae debitis odit quod corrupti labore quas, totam dicta
        obcaecati molestias reiciendis recusandae maiores placeat nulla quae.
        Sequi cumque rem nulla eos eligendi delectus optio nam, mollitia minima
        fuga quos placeat, aspernatur eius distinctio ratione vel molestias ad.
        Soluta dolores, eius quis, aspernatur ut odit perferendis iure
        voluptatibus velit tempora quam itaque accusantium alias illum? Corrupti
        voluptatem, esse vitae nobis asperiores nostrum sed deleniti eveniet
        recusandae facilis ullam dolor, ducimus harum aperiam, in voluptates
        nihil ratione vel. Quasi quam explicabo delectus, repellat, excepturi
        perspiciatis beatae veniam, soluta eius ex dolorem! Exercitationem ipsum
        accusantium explicabo id suscipit libero eius dolorem dicta, eligendi
        perferendis eaque optio unde nesciunt quam, nihil officiis ipsam hic
        veritatis doloribus rem recusandae placeat voluptates saepe temporibus.
        Molestiae consequuntur sit itaque nostrum iure fugiat ipsam quasi,
        inventore, explicabo excepturi a dicta dolores, recusandae iusto qui
        autem soluta in impedit amet corrupti ullam vitae laboriosam accusantium
        tenetur! Perferendis reiciendis accusantium beatae culpa corrupti
        voluptatum alias dolores nihil, repudiandae blanditiis esse recusandae
        cum inventore? Praesentium rem tempora totam ipsum aliquam modi
        distinctio doloremque beatae sapiente obcaecati tempore odio placeat
        cumque blanditiis, et iusto aspernatur porro molestias temporibus quia?
        Ratione at nesciunt cum saepe, laudantium voluptatem ut, unde ipsum
        deleniti expedita ipsa maxime dolore incidunt mollitia deserunt? Quia
        eius explicabo quidem nam voluptas doloremque laboriosam voluptatum
        velit quas assumenda! Eum similique necessitatibus temporibus iusto.
        Asperiores, mollitia? Non voluptates dolorum fugit quis ducimus incidunt
        nemo debitis minima fugiat magnam officiis ipsa id placeat consequuntur
        aspernatur maiores sit quae facilis, nihil quam voluptatibus
        perferendis. Natus ex in voluptates odio, tempora maxime non
        necessitatibus iste illo cum minima ullam culpa inventore deleniti
        mollitia voluptas voluptatibus dolores temporibus saepe ducimus
        sapiente! Ducimus ipsam esse labore officia expedita non, cupiditate
        nisi sint eum mollitia placeat dolore perspiciatis autem veniam
        veritatis suscipit reiciendis animi error assumenda libero laudantium
        praesentium voluptates. Totam, ea, autem distinctio iure facilis, qui
        quaerat pariatur temporibus modi minus quos vitae reprehenderit? Animi
        dicta quibusdam eaque, repellat aperiam ducimus reprehenderit, itaque
        quos a, commodi obcaecati ratione! Necessitatibus eius officiis tempora
        explicabo reprehenderit voluptates suscipit unde. Quo rem numquam ad
        repellat, vitae iusto nostrum consequuntur, suscipit, a dignissimos eum
        veniam optio laudantium voluptas et nesciunt distinctio aliquid ratione
        cupiditate fuga ducimus minima! Tenetur ab quia unde molestias cum hic
        aperiam eum, a, tempora rerum voluptate odit tempore totam ut neque.
        Voluptates quidem porro, voluptatem blanditiis cum fugit iure animi
        optio voluptate ipsam omnis perferendis, quibusdam ullam neque
        dignissimos? Velit blanditiis in architecto dolor laudantium repellat
        necessitatibus alias sit dolore voluptates mollitia, reprehenderit
        labore nulla accusantium tempora consequatur id quidem cumque porro
        nihil officia possimus deleniti amet. Libero culpa commodi magni vitae
        perferendis in accusantium sapiente voluptatibus, adipisci, unde
        similique fugit? Qui quasi eaque natus magni inventore. Molestias et
        rerum, eos dolor quidem labore magni enim aut inventore nobis ipsa
        quisquam tempora, repellendus quis repellat facilis totam laborum iure
        voluptatum doloremque tempore, similique eligendi perferendis
        cupiditate? Animi atque ratione placeat autem quos. Saepe obcaecati
        consequuntur cum magnam nam beatae iste aliquam non quia deleniti
        nesciunt laboriosam expedita qui tempore architecto, ducimus voluptates!
        Excepturi nisi expedita et repudiandae dignissimos quo numquam odit
        amet, iusto perspiciatis quaerat distinctio sunt alias ex veniam
        placeat, obcaecati tempore ratione, quidem error vero asperiores optio
        voluptatibus quas! Vel dicta cum sapiente? Porro distinctio voluptates,
        id exercitationem repellat iusto possimus fugit suscipit, molestiae
        veniam at cumque similique corporis ratione et sunt architecto
        voluptatibus explicabo neque nisi ipsam deleniti itaque sint amet.
        Maiores molestias, possimus accusantium iste ut eligendi fuga autem
        temporibus aliquam laudantium totam dolorum minus delectus odio quidem
        odit exercitationem adipisci repudiandae quasi. Error recusandae atque
        pariatur exercitationem quam eos aut, neque iste cum, aperiam tempore
        obcaecati sequi, a harum soluta repellat magnam ullam quidem accusamus
        facilis ad! Esse, quisquam nihil debitis in delectus veritatis quos
        nostrum architecto facilis repellendus id minus maxime sapiente
        laboriosam excepturi odit perferendis veniam voluptates aperiam minima
        eos voluptas, unde asperiores repellat. Quod unde voluptatibus maiores
        ex cupiditate. Maiores nostrum temporibus autem rerum, voluptatum animi
        placeat earum doloremque aspernatur expedita ut sunt ipsa quam doloribus
        ad aperiam ullam fugit, sint quis dignissimos nisi officia laudantium
        et. Nisi, doloremque ad reprehenderit quam id pariatur beatae distinctio
        quisquam veritatis non voluptatum, aliquam rerum nemo qui cumque
        voluptatem praesentium repellendus! Maiores perspiciatis, nemo vero
        reprehenderit provident expedita necessitatibus voluptates sequi nihil
        architecto magnam suscipit consequuntur, placeat ad voluptate? Eius
        quidem porro incidunt distinctio, molestiae at fuga excepturi ut, vitae
        nostrum minus esse est quia voluptatem ipsa laborum omnis repellat
        accusantium provident. Quos earum ipsa, nam provident praesentium
        voluptatibus iste ratione veritatis pariatur deleniti quae ipsum
        corrupti a, accusantium nisi dicta mollitia modi possimus velit facere
        minima repellendus sapiente. Laboriosam incidunt libero nemo dolores
        maxime? Provident laborum nesciunt soluta blanditiis nam atque sit, eum
        obcaecati maiores magnam molestias et nobis ipsa aliquid officiis ipsum
        necessitatibus qui animi quibusdam recusandae aliquam ad. Quidem
        nesciunt cum optio, est odit dolore sint porro omnis quibusdam aliquid
        tempora eum voluptates cumque sequi numquam minus, fugiat iusto quod
        blanditiis. Similique consectetur in autem maxime, minima ad quos.
        Cupiditate veniam, magnam cumque est consequatur cum tenetur animi
        tempora natus? Quam neque architecto iste laudantium excepturi ducimus,
        soluta sit delectus vero. Fuga corporis provident, tempora omnis
        incidunt cupiditate voluptas obcaecati dolorem beatae? Repudiandae
        aliquid voluptate officiis incidunt! Veritatis dolorum, et repellat
        consectetur recusandae beatae iusto nam, sed eveniet at expedita?
        Maiores ducimus quod expedita fugit soluta facere quos reprehenderit
        dolor reiciendis voluptatem, cupiditate doloremque quibusdam dolorem
        itaque? Tempora blanditiis enim ad. Placeat nemo magnam saepe eaque
        veritatis commodi laudantium maxime fugit recusandae aliquid quas
        tenetur impedit corporis totam ex velit qui, dolorum labore et culpa
        temporibus quis officia ipsa sunt! Placeat perferendis unde odio
        maiores, distinctio dolorum vero suscipit iste voluptate iure doloremque
        debitis libero voluptates recusandae doloribus similique ullam amet nam
      </p>
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
      <p>
        {' '}
        corporis enim illo. Quibusdam in laboriosam accusantium ullam optio
        eligendi aliquam labore expedita, harum ab dolorem maxime quidem ea
        minus fuga! Soluta delectus similique, harum excepturi illo dolorem
        dolores deleniti, quos labore debitis ratione! Quae, dolores consectetur
        cum sapiente et quaerat consequatur est saepe blanditiis itaque
        provident nobis earum quos officia nulla beatae culpa reprehenderit
        voluptates. Sint, optio repudiandae aliquam, dolores ab dignissimos
        eveniet adipisci doloribus cupiditate vitae nostrum aliquid suscipit
        aspernatur fugit? Animi harum dolores hic consequatur facere quas
        laborum repudiandae, quisquam nemo, consectetur ullam eos, labore
        facilis perspiciatis vero impedit veniam? Maiores expedita, consequatur,
        ipsa inventore nostrum, accusamus quidem ea incidunt nulla dolorem
        deserunt quos eveniet vel cumque culpa quaerat voluptatibus? Odit esse
        mollitia molestias tempore delectus magnam distinctio, laborum modi iste
        quisquam quidem officiis facere non asperiores optio porro incidunt
        expedita dolores quibusdam necessitatibus illum, itaque iure ex?
        Reprehenderit ipsum id expedita mollitia molestiae minus odit ea alias
        voluptatem ab impedit at, consequatur blanditiis perspiciatis! Voluptas
        sequi, repellendus pariatur eum nulla eveniet ratione sed quod hic
        aliquam laboriosam mollitia suscipit necessitatibus beatae alias!
        Repellat autem harum ad voluptatem quae, in illum quisquam saepe, ut
        voluptatum laborum voluptate earum et consequuntur dignissimos
        voluptatibus corporis accusantium? Exercitationem quo minima eligendi
        aperiam maiores, animi, quam laborum alias, fugit labore numquam!
        Consequuntur perferendis laudantium dolor excepturi explicabo iure, non
        similique, voluptatibus sapiente voluptates, dolores minima perspiciatis
        voluptate? Hic suscipit sed explicabo quaerat accusantium cupiditate
        beatae iure? Nisi facilis fugit laborum. Ullam aperiam ipsum laudantium
        dignissimos vitae minima, provident quod quidem illum unde delectus quas
        id eaque, veniam, excepturi similique accusantium accusamus consequatur
        quis beatae laboriosam quasi qui molestias. Assumenda vel accusamus cum,
        similique fugit quos, pariatur enim sit id ducimus placeat dolorem
        architecto quia nisi voluptatum corrupti libero modi. Ducimus dolores
        enim quos reprehenderit quaerat, optio id? Quas laborum sapiente
        provident magnam ad odit saepe aliquam iusto minus fuga? Veritatis
        necessitatibus quibusdam dolores, asperiores hic, quae repellendus,
        laboriosam odio quidem optio reiciendis fugit aut aperiam beatae itaque
        magnam. Fugiat nostrum excepturi quisquam minus maiores voluptate
        reiciendis ipsa accusantium doloremque recusandae rerum, delectus
        impedit eum totam adipisci. Incidunt sapiente illum et recusandae
        accusantium sunt molestias libero provident laborum, quia nostrum
        voluptatem architecto cumque aspernatur sint consequatur reprehenderit
        odio! Sit dolor autem debitis quis voluptatum corrupti voluptatibus
        possimus, reprehenderit iste impedit velit similique eius odit veritatis
        cupiditate ab non blanditiis vel quibusdam earum molestiae totam! Porro
        est, sint accusantium tempore voluptas reiciendis, mollitia temporibus
        recusandae earum velit ut veritatis ipsum, illum animi ipsa tempora
        dolore fuga quae pariatur esse. Perspiciatis odio sequi exercitationem
        officiis numquam, atque consectetur fugit quae explicabo sit dolore,
        sint tenetur dolorum itaque, accusantium amet minima. Eaque cum fugit
        corrupti culpa accusantium quos aliquam! Maxime id dignissimos sunt
        error, fugiat laudantium! Quo inventore architecto amet ipsa eaque
        deserunt excepturi repellat maxime officiis, blanditiis voluptatibus
        molestias adipisci commodi aliquam error cum qui, quas eveniet pariatur
        harum, praesentium fugiat. Atque accusantium mollitia, ad aliquam
        tempora pariatur nobis? Aspernatur eius eveniet magni nobis. Dolores
        illum dolorem exercitationem odit libero provident obcaecati commodi sed
        quibusdam nisi, sunt natus earum vel fuga repellendus quo necessitatibus
        nostrum perferendis doloribus ullam ducimus eius, ipsam cupiditate
        labore? Consequatur, illo et laboriosam, aliquam unde quam corrupti
        officiis ut eius odio itaque assumenda voluptatum quod incidunt
        suscipit. Est, deserunt impedit? Accusantium quia labore modi velit iure
        aut! Quam consectetur rerum tenetur pariatur laborum eaque accusamus
        sunt deleniti praesentium ducimus dolore fugit sapiente accusantium
        maxime debitis, ex eos distinctio illo excepturi natus sequi? Recusandae
        blanditiis architecto voluptatibus dicta deleniti voluptatum repellendus
        doloremque molestias unde nulla suscipit reprehenderit, sint saepe ut
        numquam ab, voluptate ex? Odio, aliquam voluptas. Possimus voluptatum
        inventore amet eaque quae voluptatibus blanditiis, cumque sit mollitia
        consectetur quas delectus velit, consequuntur animi soluta minima, ipsa
        aperiam quibusdam cum in illum quod similique repudiandae quo. A autem
        quo ipsum nesciunt molestiae voluptate, quisquam ratione et sunt
        explicabo ullam harum earum repellendus in? Rem eum praesentium, tempore
        in quidem dolor omnis deleniti! Consectetur aliquid architecto quaerat
        error soluta doloremque provident, itaque accusantium rem nostrum natus
        culpa laudantium repudiandae perspiciatis mollitia molestiae corporis
        voluptatum distinctio, id commodi dolores assumenda. Iste optio debitis
        nam vitae, corrupti delectus similique sit ipsam perspiciatis!
        Recusandae mollitia eligendi praesentium accusantium cupiditate nulla
        labore dolorum veritatis similique, suscipit iste, in accusamus
        voluptatum sequi, aliquam corporis velit molestiae. Atque perferendis
        similique, itaque consequatur magni nemo dolorum nihil temporibus fugit
        totam! Nesciunt, soluta incidunt. Sequi ut sed nostrum temporibus
        tempore dicta veniam. Obcaecati, esse, natus vero atque quasi nisi
        optio, earum inventore sit ea reiciendis! Inventore dolorem at
        recusandae iure nesciunt eaque eum quibusdam suscipit tempore
        laudantium! Error, a dolorum debitis et ratione quidem impedit
        consequatur quaerat iste molestiae dignissimos mollitia in neque
        laboriosam doloremque quis quo dolores excepturi iure. Hic asperiores
        deserunt nihil, voluptatem debitis quia alias facere dolores tempore
        fugiat? Totam molestiae id, temporibus dolor soluta quae? Cupiditate
        corrupti deleniti cumque quae ea mollitia culpa voluptates? Ducimus
        possimus nesciunt consequatur a qui eaque optio.
      </p>
    </>
  );
};

export const Toast = () => <TitleAndMessageNotification />;

Toast.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Visualizations/Notification/Toast',
};
