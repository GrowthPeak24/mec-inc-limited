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
  { name: 'NCB', src: ncb },
  { name: 'Scotiabank', src: scotiabank },
  { name: 'Nestlé', src: nestle },
  { name: 'Wisynco', src: wisyncoEco },
  { name: 'LASCO Financial', src: lasco },
  { name: 'Honey Bun', src: honeyBun },
  { name: 'JPS', src: jps },
  { name: 'Terra Nova', src: terraNova },
  { name: 'Kingston Freeport Terminal', src: kingstonFreeport },
  { name: 'GRL', src: grl },
  { name: 'McIntosh Bedding', src: mcintosh },
  { name: 'Hampden Estate', src: hampden },
  { name: 'Fidelity Motors', src: fidelity },
  { name: 'NCB Capital Markets', src: ncbCapital },
  { name: 'Scotiabank Mark', src: scotiabankMark },
  { name: 'VCB', src: vcb },
  { name: 'VCB Foundation', src: vcbFoundation },
  { name: 'Financial Services Commission', src: fsc },
  { name: 'Jamaica Customs Agency', src: jca },
  { name: 'ZIM: The X-Factor', src: zim },
  { name: 'One on One', src: oneOnOne },
  { name: 'Bigga', src: bigga },
  { name: 'Young Chefs', src: youngChefs },
  { name: 'Bytesori', src: bytesori },
  { name: 'Smartserv', src: smartserv },
] as const satisfies readonly ClientLogo[];
