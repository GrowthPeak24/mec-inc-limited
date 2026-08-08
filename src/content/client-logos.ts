import type { ClientLogo } from '@/types/content';

import ncb from '@/assets/logos/ncb.png';
import scotiabank from '@/assets/logos/scotiabank.png';
import scotiabankMark from '@/assets/logos/scotiabank-mark.png';
import nestle from '@/assets/logos/nestle.png';
import wisyncoEco from '@/assets/logos/wisynco-eco.png';
import lasco from '@/assets/logos/lasco-financial-services.png';
import honeyBun from '@/assets/logos/honey-bun.png';
import jps from '@/assets/logos/jps-partners.png';
import terraNova from '@/assets/logos/terra-nova.png';
import kingstonFreeport from '@/assets/logos/kingston-freeport-terminal.png';
import grl from '@/assets/logos/grl.png';
import mcintosh from '@/assets/logos/mcintosh-bedding.png';
import vcb from '@/assets/logos/vcb.png';
import hampden from '@/assets/logos/hampden-estate.png';
import fidelity from '@/assets/logos/fidelity-motors.png';
import bytesori from '@/assets/logos/bytesori.png';
import smartserv from '@/assets/logos/smartserv.png';
import youngChefs from '@/assets/logos/young-chefs.png';
import bigga from '@/assets/logos/bigga.png';
import zim from '@/assets/logos/zim-the-x-factor.png';
import oneOnOne from '@/assets/logos/one-on-one.png';
import fsc from '@/assets/logos/financial-services-commission.png';
import jca from '@/assets/logos/jamaica-customs-agency.png';
import vcbFoundation from '@/assets/logos/veronica-campbell-brown-foundation.png';
import ncbCapital from '@/assets/logos/ncb-capital-markets.png';

/** Order chosen for the marquee: heavy-hitter enterprise brands first,
 *  then partners, then longer-tail — so a viewer who only sees the first
 *  loop still recognises the credibility. Marquee duplicates the list
 *  exactly once in the DOM, so keeping this ~24 items keeps the track
 *  visually dense without exceeding one screen at 1440px. */
export const CLIENT_LOGOS = [
  { name: 'NCB', src: ncb, width: 96 },
  { name: 'Scotiabank', src: scotiabank, width: 160 },
  { name: 'Nestlé', src: nestle, width: 130 },
  { name: 'Wisynco', src: wisyncoEco, width: 140 },
  { name: 'LASCO Financial', src: lasco, width: 150 },
  { name: 'Honey Bun', src: honeyBun, width: 130 },
  { name: 'JPS', src: jps, width: 110 },
  { name: 'Terra Nova', src: terraNova, width: 120 },
  { name: 'Kingston Freeport Terminal', src: kingstonFreeport, width: 150 },
  { name: 'GRL', src: grl, width: 90 },
  { name: 'McIntosh Bedding', src: mcintosh, width: 150 },
  { name: 'Hampden Estate', src: hampden, width: 130 },
  { name: 'Fidelity Motors', src: fidelity, width: 150 },
  { name: 'NCB Capital Markets', src: ncbCapital, width: 160 },
  { name: 'Scotiabank Mark', src: scotiabankMark, width: 70 },
  { name: 'VCB', src: vcb, width: 110 },
  { name: 'VCB Foundation', src: vcbFoundation, width: 130 },
  { name: 'Financial Services Commission', src: fsc, width: 150 },
  { name: 'Jamaica Customs Agency', src: jca, width: 130 },
  { name: 'ZIM: The X-Factor', src: zim, width: 130 },
  { name: 'One on One', src: oneOnOne, width: 130 },
  { name: 'Bigga', src: bigga, width: 110 },
  { name: 'Young Chefs', src: youngChefs, width: 130 },
  { name: 'Bytesori', src: bytesori, width: 130 },
  { name: 'Smartserv', src: smartserv, width: 130 },
] as const satisfies readonly ClientLogo[];
