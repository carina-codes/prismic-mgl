import { ButtonLink } from '@/components/ButtonLink';
import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';

type Props = {
  skater: Content.SkaterDocument;
  index: number;
}

export function Skater({skater, index}: Props) {
  return (
    <div className="skater">
      <PrismicNextImage field={skater.data.photo} alt="" className="w-100"/>
      <div className="skater-info">
        <h3>
          {skater.data.first_name} <br/>
          {skater.data.last_name}
        </h3>
        <ButtonLink field={skater.data.customizer_link}>
          Build their Board
        </ButtonLink>
      </div>
    </div>
  )
}